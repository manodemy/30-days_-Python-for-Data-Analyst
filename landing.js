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
