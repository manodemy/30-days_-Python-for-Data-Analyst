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

// ═══════ LANDING LOGIN CARD INTERACTIVITY ═══════
document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('landingLoginForm');
  const btnGoogle = document.getElementById('btnLandingGoogle');
  const btnSubmit = document.getElementById('btnLandingSubmit');
  const linkForgot = document.getElementById('linkLandingForgot');
  const linkSignup = document.getElementById('linkLandingSignup');

  // Helper to simulate loading and stunning transition
  const simulateLoginAndRedirect = (btn, originalText) => {
    btn.textContent = 'Authenticating...';
    btn.style.opacity = '0.7';
    btn.disabled = true;
    
    const loginCard = document.querySelector('.landing-login-card');
    const heroVisual = document.querySelector('.hero-visual');
    const inlineLogo = document.querySelector('.python-logo-inline');

    setTimeout(() => {
      btn.textContent = 'Success! Access Granted...';
      localStorage.setItem('manodemy_auth', 'true');
      
      // 1. Fade out the login card completely
      loginCard.classList.add('login-card-leaving');
      
      setTimeout(() => {
        loginCard.style.display = 'none';

        if (inlineLogo && heroVisual) {
          // FLIP Animation Strategy
          // First: Get bounding rect of the inline logo where it currently is
          const firstRect = inlineLogo.getBoundingClientRect();
          
          // Move the logo into the hero visual area in the DOM
          heroVisual.appendChild(inlineLogo);
          
          // Swap its classes so it adopts the massive absolute positioning
          inlineLogo.classList.remove('python-logo-inline');
          inlineLogo.classList.add('python-logo-hero');
          
          // Last: Get bounding rect of where it has now naturally landed
          const lastRect = inlineLogo.getBoundingClientRect();
          
          // Invert: Calculate the difference
          const deltaX = firstRect.left - lastRect.left;
          const deltaY = firstRect.top - lastRect.top;
          const scaleW = firstRect.width / lastRect.width;
          const scaleH = firstRect.height / lastRect.height;
          
          // Play: Animate from the Inverted position to the natural position
          const animation = inlineLogo.animate([
            {
              transform: `translate(${deltaX}px, ${deltaY}px) scale(${scaleW}, ${scaleH})`,
              filter: 'drop-shadow(0 0 20px rgba(0, 230, 246, 0.4))'
            },
            {
              transform: 'translate(0, 0) scale(1)',
              filter: 'drop-shadow(0 0 80px rgba(0, 230, 246, 0.8))'
            }
          ], {
            duration: 1200,
            easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
            fill: 'forwards'
          });

          // Add the continuous floating animation once the FLIP completes
          animation.onfinish = () => {
            inlineLogo.classList.add('float-hero-anim');
            // Change the 'Buy Now' nav button to 'Go to Course'
            const buyBtn = document.querySelector('.buy-btn');
            if (buyBtn) {
              buyBtn.innerHTML = 'Go to Course →';
              buyBtn.href = 'day01.html';
            }
          };
        }
      }, 500); // wait for login card to vanish before moving the logo
    }, 1200);
  };

  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      simulateLoginAndRedirect(btnSubmit, 'Start Learning →');
    });
  }

  if (btnGoogle) {
    btnGoogle.addEventListener('click', () => {
      // Simulate Google OAuth popup
      const confirmed = confirm('Redirecting to Google Secure Sign-In. Continue?');
      if (confirmed) {
        simulateLoginAndRedirect(btnGoogle, 'Continue with Google');
      }
    });
  }

  if (linkForgot) {
    linkForgot.addEventListener('click', (e) => {
      e.preventDefault();
      prompt('Enter your registered email address to receive a password reset link:');
      alert('If an account exists, a reset link has been sent to that email.');
    });
  }

  if (linkSignup) {
    linkSignup.addEventListener('click', (e) => {
      e.preventDefault();
      alert('Redirecting to the comprehensive Registration Portal...');
      // In a real app, this would redirect to the registration page or open a modal
    });
  }
});

