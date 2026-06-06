import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS OPTIONS pre-flight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // 1. Initialize Supabase client with Service Role Key to bypass RLS and read rubrics
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    // 2. Validate client Authorization token
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(JSON.stringify({ verified: false, error: 'Unauthorized: Missing Auth Header' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return new Response(JSON.stringify({ verified: false, error: 'Unauthorized: Invalid token' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // 3. Parse and validate request parameters
    const body = await req.json();
    const { dayId, cellId, userCode, stdout } = body;

    if (!dayId || !cellId || userCode === undefined || stdout === undefined) {
      return new Response(JSON.stringify({ verified: false, error: 'Bad Request: Missing parameters' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // 4. Fetch the grading rubric from DB
    const { data: rubric, error: dbError } = await supabase
      .from('grading_rubrics')
      .select('*')
      .eq('day_id', dayId)
      .eq('cell_id', cellId)
      .single();

    if (dbError || !rubric) {
      console.warn(`[Grading] Rubric not found for day ${dayId}, cell ${cellId}`);
      return new Response(JSON.stringify({ verified: false, error: 'Grading rubric not found' }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // 5. Ported Server-Side Validation logic
    const rawCode = userCode.trim();
    const cleanCode = rawCode.replace(/#.*/g, '').trim().toLowerCase();
    const outText = (stdout || '').trim().toLowerCase();

    let verified = false;
    let isPartialMatch = false;

    if (cleanCode.length > 0 && cleanCode !== 'pass') {
      verified = true; // assume correct, now verify requirements

      const questionText = (rubric.question_text || '').toLowerCase();

      // Check A: Expected string matches
      let expectedValue = rubric.expected_output ? rubric.expected_output.toLowerCase() : null;
      if (!expectedValue && questionText) {
        const expMatch = questionText.match(/expected:\s*([a-z0-9_.-]+)/);
        if (expMatch && expMatch[1]) {
          expectedValue = expMatch[1];
        }
      }

      if (expectedValue) {
        if (!outText || !outText.includes(expectedValue)) {
          verified = false;
        }
      }

      // Check B: Token overlap check (ignoring generics)
      if (verified && questionText) {
        const codeTokens = cleanCode.match(/[a-z0-9_]+/g) || [];
        let ignore = ['print', 'type', 'len', 'def', 'class', 'import', 'list', 'dict', 'set', 'tuple', 'int', 'float', 'str', 'bool', 'true', 'false'];
        if (rubric.ignore_tokens && Array.isArray(rubric.ignore_tokens)) {
          ignore = [...ignore, ...rubric.ignore_tokens.map((t: string) => t.toLowerCase())];
        }

        let hasOverlap = false;
        for (const token of codeTokens) {
          if (ignore.includes(token)) continue;
          const regex = new RegExp("\\b" + token + "\\b");
          if (regex.test(questionText)) {
            hasOverlap = true;
            break;
          }
        }

        // Symbolic math fallback
        let isSymbolicMath = false;
        if (!hasOverlap && /[+\-*/%<>=]/.test(cleanCode)) {
          if (questionText.includes('add ') || questionText.includes('divide') || questionText.includes('multiply') || questionText.includes('operator') || questionText.includes('arithmetic') || questionText.includes('compute')) {
            isSymbolicMath = true;
          }
        }

        if (!hasOverlap && !isSymbolicMath) {
          verified = false;
        }
      }

      // Check C: Explicit Regex Pattern check (if provided in rubric)
      if (verified && rubric.regex_pattern) {
        const rx = new RegExp(rubric.regex_pattern, 'i');
        if (!rx.test(cleanCode) && !rx.test(outText)) {
          verified = false;
        }
      }

      // Check D: Smart Penalties check
      if (verified && questionText) {
        const outLines = outText.split('\n').filter(l => l.trim().length > 0);
        let penalties = 0;

        // Requirement 1: type checks
        if ((questionText.includes('type') || questionText.includes('types')) && questionText.includes('print')) {
          if (!outText.includes('<class') && !cleanCode.includes('type(')) penalties++;
        }

        // Requirement 2: comment existence
        if (questionText.includes('explain') || questionText.includes('describe') || questionText.includes('why is')) {
          if (!rawCode.includes('#')) penalties++;
        }

        // Requirement 3: lines count
        if (questionText.includes('both results') || questionText.includes('print both') || questionText.includes('compute both')) {
          if (outLines.length < 2) penalties++;
        }

        // Requirement 4: distinct numbers check
        const qNumbers = questionText.match(/\b\d+\b/g) || [];
        const uniqueQNums = [...new Set(qNumbers)];
        if (uniqueQNums.length >= 2) {
          const codeNums = cleanCode.match(/\b\d+\b/g) || [];
          const usedQNums = uniqueQNums.filter(n => codeNums.includes(n));
          if (usedQNums.length < uniqueQNums.length && outLines.length < 2) {
            penalties++;
          }
        }

        if (penalties > 0) {
          verified = false;
          isPartialMatch = true;
        }
      }
    }

    if (!verified) {
      return new Response(JSON.stringify({ verified: false, marksAwarded: 0 }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // 6. Cryptographic Signature Generation
    const timestamp = Date.now().toString();
    const hmacSecret = Deno.env.get('HMAC_SECRET') || 'fallback_development_secret_only_for_testing_purposes';

    const keyBuf = new TextEncoder().encode(hmacSecret);
    const key = await crypto.subtle.importKey(
      "raw",
      keyBuf,
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    );

    // Message formula: user_id:day_id:cell_id:timestamp
    const message = `${user.id}:${dayId}:${cellId}:${timestamp}`;
    const msgBuf = new TextEncoder().encode(message);
    const sigBuf = await crypto.subtle.sign("HMAC", key, msgBuf);
    
    // Hex encode signature
    const signature = Array.from(new Uint8Array(sigBuf))
      .map(b => b.toString(16).padStart(2, "0"))
      .join("");

    return new Response(JSON.stringify({
      verified: true,
      signature,
      timestamp,
      marksAwarded: rubric.marks || 10
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (err) {
    console.error('[Verify API Error]:', err);
    return new Response(JSON.stringify({ verified: false, error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});
