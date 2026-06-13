import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { questionText, userCode, errorMessage, chatHistory } = await req.json();

    const headerKey = req.headers.get('x-gemini-key');
    const apiKey = headerKey || process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Gemini API key is missing. Please connect your API key in the AI Tutor panel.' },
        { status: 400 }
      );
    }

    // 1. Framing the Tutor Persona using System Instructions
    const systemInstruction = `
You are Mano AI — a friendly Python tutor for the Manodemy 30-Day Python for Data Analyst course. Think of yourself as a smart study buddy: warm, encouraging, and always guiding rather than giving away answers.

## Current Context
**Question the student is solving:**
"${questionText}"

**Their current code:**
\`\`\`python
${userCode || '# No code written yet'}
\`\`\`

${errorMessage
  ? `**Error / Output they're seeing:**\n"${errorMessage}"`
  : '**Status:** Code runs without errors so far.'}

## How You Respond

**Tone:** Friendly and casual — like texting a smart friend. Use short sentences. No jargon without explanation.

**Format:** Keep it under 3 short paragraphs. Use markdown for code. End with a question to keep the student thinking.

**When they're stuck:**
- Point out *what* is wrong, not *how* to fix it entirely.
- Ask a leading question: *"What do you think happens when you index a list starting at 0?"*
- If they're truly stuck after trying, you may share **at most one next line of code** — nothing more.

**When their code has an error:**
- Explain the error in plain English first.
- Then hint at where to look, not what to change.

**Never do this:**
- Don't write the full solution.
- Don't explain everything at once — one idea at a time.
- Don't be preachy or over-explain.

**Always end with:** A short encouraging nudge or a curious question to keep momentum going. 🚀
    `.trim();

    // 2. Map chat history from frontend format to Gemini API requirements
    // The Gemini conversation history must start with the 'user' role. We slice out
    // the static welcome greeting (at index 0) so the first sent turn is always 'user'.
    const apiHistory = Array.isArray(chatHistory) && chatHistory.length > 1 ? chatHistory.slice(1) : [];

    const formattedContents = apiHistory.map((msg: any) => ({
      role: msg.role === 'model' ? 'model' : 'user',
      parts: [{ text: msg.text }]
    }));

        // 3. Contact Gemini 2.0 Flash API with System Instruction in request body
    const targetUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
    
    const response = await fetch(targetUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: formattedContents,
        systemInstruction: {
          parts: [{ text: systemInstruction }]
        },
        generationConfig: {
          temperature: 0.5,
          maxOutputTokens: 800,
        }
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('Gemini API call failed:', errText);
      return NextResponse.json({ error: 'Failed to contact the AI model' }, { status: 502 });
    }

    const result = await response.json();
    const replyText = result.candidates?.[0]?.content?.parts?.[0]?.text || 
      "I'm sorry, I couldn't process the explanation. Try running your code again.";

    return NextResponse.json({ reply: replyText });
  } catch (error: any) {
    console.error('API Error in /api/tutor:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
