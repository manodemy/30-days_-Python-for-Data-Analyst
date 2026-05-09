// ═══════ MANODEMY — PRICE EDITOR & INTERACTIONS ═══════

// Navbar scroll shadow
const topBar = document.getElementById('topBar');
window.addEventListener('scroll', () => {
  topBar.classList.toggle('scrolled', window.scrollY > 10);
});

// Price Editor Toggle
const toggle = document.getElementById('priceToggle');
const editor = document.getElementById('priceEditor');
const closeBtn = document.getElementById('closeEditor');
const applyBtn = document.getElementById('applyPrice');

toggle.addEventListener('click', () => editor.classList.toggle('hidden'));
closeBtn.addEventListener('click', () => editor.classList.add('hidden'));

// Apply Price Changes
applyBtn.addEventListener('click', () => {
  const currency = document.getElementById('inputCurrency').value || '$';
  const price = document.getElementById('inputPrice').value;
  const original = document.getElementById('inputOriginal').value;
  const discount = original > 0 ? Math.round((1 - price / original) * 100) : 0;

  document.getElementById('priceNow').textContent = currency + price;
  document.getElementById('priceOld').textContent = currency + original;
  document.getElementById('discountBadge').textContent = discount + '% OFF';
  document.getElementById('buyPrice').textContent = currency + price;

  // Flash confirmation
  applyBtn.textContent = '✅ Applied!';
  setTimeout(() => { applyBtn.textContent = 'Apply Changes'; }, 1500);
});

// Smooth scroll-reveal animation
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.stat-card, .feature-card, .cta-btn, .pricing-box').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// ═══════ GEO-PRICING & PAYMENT LINKS ═══════
async function setupGeoPricing() {
  const buyBtns = document.querySelectorAll('.buy-btn');
  const priceNow = document.getElementById('priceNow');
  const priceOld = document.getElementById('priceOld');
  const discountBadge = document.getElementById('discountBadge');
  const buyPrice = document.getElementById('buyPrice');
  
  try {
    const response = await fetch('https://get.geojs.io/v1/ip/country.json');
    const data = await response.json();
    
    if (data.country === 'IN') {
      // Indian Pricing (INR)
      if (priceNow) priceNow.textContent = '₹1499';
      if (priceOld) priceOld.textContent = '₹4999';
      if (buyPrice) buyPrice.textContent = '₹1499';
      if (discountBadge) discountBadge.textContent = '70% OFF';
      
      // Update all Buy buttons to UPI/GPay
      buyBtns.forEach(btn => {
        // Change 'your-upi-id@okaxis' to your actual UPI ID
        btn.href = 'upi://pay?pa=your-upi-id@okaxis&pn=Manodemy&am=1499.00&cu=INR';
        btn.title = 'Pay with GPay / PhonePe / Paytm';
      });
    } else {
      // International Pricing (USD)
      if (priceNow) priceNow.textContent = '$19';
      if (priceOld) priceOld.textContent = '$69';
      if (buyPrice) buyPrice.textContent = '$19';
      if (discountBadge) discountBadge.textContent = '72% OFF';
      
      // Update all Buy buttons to PayPal
      buyBtns.forEach(btn => {
        // Change 'your-paypal-id' to your actual PayPal.me link
        btn.href = 'https://paypal.me/your-paypal-id/19USD';
        btn.title = 'Pay with PayPal';
      });
    }
  } catch (error) {
    console.error("Geo-pricing API failed. Using default USD.", error);
    buyBtns.forEach(btn => btn.href = 'https://paypal.me/your-paypal-id/19USD');
  }
}

// Run geo-pricing when DOM is ready
document.addEventListener('DOMContentLoaded', setupGeoPricing);

console.log("✅ landing.js loaded successfully");
console.log("✅ DOM ready check");
const googleBtnTest = document.getElementById("google-signin-btn");
console.log("✅ Google button found:", googleBtnTest);

// ═══════ LANDING LOGIN CARD INTERACTIVITY (SUPABASE) ═══════
const SUPABASE_URL = 'https://gvhnwmuyrwissgkumeif.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_x0gyXkcrCSaxSG23Zyi7qA__v1sBgOq';

let supabase = null;
try {
  if (window.supabase) {
    supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    console.log("✅ Supabase client initialized.");
  } else {
    console.error("❌ Supabase SDK not found on window object. Is the CDN script blocked?");
  }
} catch (e) {
  console.error("❌ Error initializing Supabase client:", e);
}

(async function initializeAuthentication() {
  const loginForm = document.getElementById('landingLoginForm');
  const btnGoogle = document.getElementById('google-signin-btn'); // Matches the updated ID
  const btnSubmit = document.getElementById('btnLandingSubmit');
  const linkForgot = document.getElementById('linkLandingForgot');
  const linkSignup = document.getElementById('linkLandingSignup');
  
  const loginCard = document.querySelector('.landing-login-card');
  const heroVisual = document.querySelector('.hero-visual');
  const inlineLogo = document.querySelector('.python-logo-inline');
  const buyBtn = document.querySelector('.buy-btn');

  // Animation Function
  const executeLoginAnimation = () => {
    if (!loginCard || loginCard.style.display === 'none') return;
    
    loginCard.classList.add('login-card-leaving');
    
    setTimeout(() => {
      loginCard.style.display = 'none';

      if (inlineLogo && heroVisual) {
        const firstRect = inlineLogo.getBoundingClientRect();
        heroVisual.appendChild(inlineLogo);
        inlineLogo.classList.remove('python-logo-inline');
        inlineLogo.classList.add('python-logo-hero');
        
        const lastRect = inlineLogo.getBoundingClientRect();
        const deltaX = firstRect.left - lastRect.left;
        const deltaY = firstRect.top - lastRect.top;
        const scaleW = firstRect.width / lastRect.width;
        const scaleH = firstRect.height / lastRect.height;
        
        const animation = inlineLogo.animate([
          { transform: `translate(${deltaX}px, ${deltaY}px) scale(${scaleW}, ${scaleH})`, filter: 'drop-shadow(0 0 20px rgba(0, 230, 246, 0.4))' },
          { transform: 'translate(0, 0) scale(1)', filter: 'drop-shadow(0 0 80px rgba(0, 230, 246, 0.8))' }
        ], { duration: 1200, easing: 'cubic-bezier(0.16, 1, 0.3, 1)', fill: 'forwards' });

        animation.onfinish = () => {
          inlineLogo.classList.add('float-hero-anim');
          if (buyBtn) {
            buyBtn.innerHTML = 'Go to Course →';
            buyBtn.href = 'day01.html';
          }
        };
      }
    }, 500);
  };

  const showInstantLoggedInState = () => {
    if (loginCard) loginCard.style.display = 'none';
    if (inlineLogo && heroVisual) {
      heroVisual.appendChild(inlineLogo);
      inlineLogo.classList.remove('python-logo-inline');
      inlineLogo.classList.add('python-logo-hero', 'float-hero-anim');
    }
    if (buyBtn) {
      buyBtn.innerHTML = 'Go to Course →';
      buyBtn.href = 'day01.html';
    }
  };

  // 1. Check Supabase Session on Load
  if (supabase) {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        localStorage.setItem('manodemy_auth', 'true');
        showInstantLoggedInState();
      } else if (localStorage.getItem('manodemy_auth') === 'true') {
        showInstantLoggedInState();
      }

      supabase.auth.onAuthStateChange((event, session) => {
        if (event === 'SIGNED_IN' && session) {
          localStorage.setItem('manodemy_auth', 'true');
          executeLoginAnimation();
        }
      });
    } catch (e) {
      console.error("Session check failed:", e);
      if (localStorage.getItem('manodemy_auth') === 'true') showInstantLoggedInState();
    }
  } else {
    if (localStorage.getItem('manodemy_auth') === 'true') showInstantLoggedInState();
  }

  // 2. Email & Password Login / Auto-Signup
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      if (!supabase) {
        alert("Authentication service is currently unavailable. Please check your connection or disable adblockers.");
        return;
      }
      
      const email = document.getElementById('landingEmail').value;
      const password = document.getElementById('landingPassword').value;
      
      btnSubmit.textContent = 'Authenticating...';
      btnSubmit.disabled = true;
      btnSubmit.style.opacity = '0.7';

      const { error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) {
        if (error.message.toLowerCase().includes('invalid login credentials')) {
          btnSubmit.textContent = 'Creating Account...';
          const { error: signUpError } = await supabase.auth.signUp({ email, password });
          if (signUpError) {
            console.error("Supabase Signup Error:", signUpError);
            alert('Signup Failed: ' + signUpError.message);
            btnSubmit.textContent = 'Start Learning →';
            btnSubmit.disabled = false;
            btnSubmit.style.opacity = '1';
            return;
          }
          btnSubmit.textContent = 'Account Created! Welcome...';
          localStorage.setItem('manodemy_auth', 'true');
          executeLoginAnimation();
          return;
        }
        
        console.error("Supabase Login Error:", error);
        alert('Login Failed: ' + error.message);
        btnSubmit.textContent = 'Start Learning →';
        btnSubmit.disabled = false;
        btnSubmit.style.opacity = '1';
        return;
      }

      btnSubmit.textContent = 'Success! Access Granted...';
      localStorage.setItem('manodemy_auth', 'true');
      executeLoginAnimation();
    });
  }

  // 3. Google OAuth Login
  if (btnGoogle) {
    btnGoogle.addEventListener('click', async (e) => {
      e.preventDefault();
      console.log("✅ Google button clicked");
      
      if (!supabase) {
        console.error("❌ Cannot sign in with Google because supabase client is null.");
        alert("Authentication service is currently unavailable.");
        return;
      }
      
      const originalText = btnGoogle.innerHTML;
      btnGoogle.innerHTML = 'Redirecting securely...';
      btnGoogle.disabled = true;
      btnGoogle.style.opacity = '0.7';
      
      try {
        console.log("✅ Calling supabase.auth.signInWithOAuth...");
        const { error } = await supabase.auth.signInWithOAuth({
          provider: 'google',
          options: {
            redirectTo: window.location.origin + window.location.pathname
          }
        });
        
        if (error) {
          console.error("❌ Supabase OAuth Error:", error);
          alert('Google Login Error: ' + error.message);
          btnGoogle.innerHTML = originalText;
          btnGoogle.disabled = false;
          btnGoogle.style.opacity = '1';
        }
      } catch (err) {
        console.error("❌ Unexpected error during OAuth flow:", err);
        btnGoogle.innerHTML = originalText;
        btnGoogle.disabled = false;
        btnGoogle.style.opacity = '1';
      }
    });
  } else {
    console.error("❌ Could not attach click listener: google-signin-btn not found in DOM");
  }

  if (linkForgot) {
    linkForgot.addEventListener('click', async (e) => {
      e.preventDefault();
      const email = prompt('Enter your registered email address to receive a password reset link:');
      if (email && supabase) {
        await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: window.location.origin + window.location.pathname,
        });
        alert('If an account exists, a secure reset link has been sent to that email.');
      }
    });
  }

  if (linkSignup) {
    linkSignup.addEventListener('click', (e) => {
      e.preventDefault();
      alert('Just enter an email and password in the form and click "Start Learning" to instantly create your account!');
    });
  }
})();

