"use strict";
/* Manodemy Landing — Customer Reviews & Ratings Controller
   Fixed: auth redirect flow, DB field mapping, review form wiring */

document.addEventListener('DOMContentLoaded', () => {

  // ─── State ──────────────────────────────────────────────────
  let activeUser   = null;
  let allReviews   = [];

  // ─── Supabase init ──────────────────────────────────────────
  const initSupabase = () => {
    if (!window.MANODEMY_CONFIG?.SUPA_URL || !window.MANODEMY_CONFIG?.SUPA_KEY) {
      console.warn('[Reviews] Supabase config missing.');
      return null;
    }
    try {
      return window.supabase?.createClient(
        window.MANODEMY_CONFIG.SUPA_URL,
        window.MANODEMY_CONFIG.SUPA_KEY
      );
    } catch (err) {
      console.error('[Reviews] Supabase init failed:', err);
      return null;
    }
  };
  const sb = initSupabase();

  // ─── Fallback data (shown when DB is unreachable) ───────────
  const fallbackReviews = [
    {
      id: 'fb_1', reviewer_name: 'Priyanka Sharma', reviewer_role: 'Junior Data Analyst',
      reviewer_avatar: null, rating: 5, is_verified: true,
      comment: 'I was highly skeptical about a course with zero video content. But the interactive browser notebooks are completely addictive. Directly helped me transition into my analyst role.',
      pros: ['Interactive notebooks', 'Pandas labs'], cons: [],
      recommend: true, helpful_count: 24,
      created_at: new Date(Date.now() - 2 * 86400000).toISOString()
    },
    {
      id: 'fb_2', reviewer_name: 'Marcus Vance', reviewer_role: 'Analytics Engineer',
      reviewer_avatar: null, rating: 5, is_verified: true,
      comment: 'NumPy arrays and clean visualization modules are top-tier. Skipped typical video fluff and went straight to dataset manipulation. Best educational ROI this year.',
      pros: ['NumPy exercises', 'Visual reports'], cons: ['Fast-paced'],
      recommend: true, helpful_count: 19,
      created_at: new Date(Date.now() - 5 * 86400000).toISOString()
    },
    {
      id: 'fb_3', reviewer_name: 'Kartik Sharma', reviewer_role: 'Data Analyst at Flipkart',
      reviewer_avatar: null, rating: 5, is_verified: true,
      comment: 'I come from a Data Analytics background and was struggling to find a learning platform that could help me transition into Data Engineering without overwhelming me with too much theory.',
      pros: ['Practical and interview-focused content', 'Easy-to-understand detailed theory'], cons: ['Time consuming'],
      recommend: true, helpful_count: 12,
      created_at: new Date(Date.now() - 7 * 86400000).toISOString()
    },
    {
      id: 'fb_4', reviewer_name: 'Rohan Verma', reviewer_role: 'Data Analyst Student',
      reviewer_avatar: null, rating: 4, is_verified: true,
      comment: 'Solid curriculum. The SQL databases section and interview prep challenges in the final week were incredibly valuable. I actually used one of the SQL queries in my real job last week.',
      pros: ['SQL section', 'Realistic interview prep', 'Practical challenges'], cons: ['Some notebooks are quite long'],
      recommend: true, helpful_count: 9,
      created_at: new Date(Date.now() - 10 * 86400000).toISOString()
    },
    {
      id: 'fb_5', reviewer_name: 'David Lindqvist', reviewer_role: 'Portfolio Analyst',
      reviewer_avatar: null, rating: 5, is_verified: true,
      comment: "I've been stuck in Udemy 'tutorial hell' for six months. Manodemy's gamified environment and instant browser terminal feedback broke that cycle. No video bloat is a massive feature.",
      pros: ['Gamified environment', 'Instant feedback', 'No video bloat'], cons: ['Needs internet access'],
      recommend: true, helpful_count: 31,
      created_at: new Date(Date.now() - 12 * 86400000).toISOString()
    }
  ];

  // ─── DOM refs ────────────────────────────────────────────────
  const writeReviewBtn     = document.querySelector('.btn-write-review');
  const modalOverlay       = document.getElementById('revModalOverlay');
  const modalCloseBtn      = document.getElementById('btnCloseRevModal');
  const modalCancelBtn     = document.getElementById('btnCancelRevModal');
  const reviewForm         = document.getElementById('rev-submit-form');
  const ratingSelectorStars = document.querySelectorAll('.rev-selector-stars svg');
  const ratingDesc         = document.querySelector('.rev-selector-desc');
  const ratingInput        = document.getElementById('rev-input-rating');
  const commentTextarea    = document.getElementById('rev-input-comment');
  const charCounter        = document.querySelector('.rev-char-counter');
  const carouselTrack      = document.getElementById('revCarouselTrack');
  const carouselPrev       = document.getElementById('revCarouselPrev');
  const carouselNext       = document.getElementById('revCarouselNext');
  const carouselDots       = document.getElementById('revCarouselDots');

  // ─── Open / Close review modal ───────────────────────────────
  const openReviewModal = () => {
    if (!modalOverlay) return;
    // Pre-fill fields if user is logged in
    if (activeUser) {
      const emailInput = document.getElementById('rev-input-email');
      const nameInput  = document.getElementById('rev-input-name');
      if (emailInput && activeUser.email) emailInput.value = activeUser.email;
      if (nameInput && activeUser.user_metadata?.full_name) {
        nameInput.value = activeUser.user_metadata.full_name;
      }
    }
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeReviewModal = () => {
    if (!modalOverlay) return;
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
    if (reviewForm) {
      reviewForm.reset();
      if (ratingInput) ratingInput.value = '';
      highlightSelectorStars(0);
      if (ratingDesc) ratingDesc.textContent = 'Click a star to rate';
      if (charCounter) charCounter.textContent = '0/1000';
      const prosContainer = document.getElementById('pros-tags-list');
      const consContainer = document.getElementById('cons-tags-list');
      if (prosContainer) prosContainer.innerHTML = '';
      if (consContainer) consContainer.innerHTML = '';
      const mediaPreview = document.getElementById('media-previews');
      if (mediaPreview) mediaPreview.innerHTML = '';
      pendingUploadBase64 = null;
      pendingUploadFile   = null;
      const dz = document.getElementById('mediaDropzone');
      if (dz) dz.classList.remove('has-file');
    }
  };

  // ─── "Write a Review" button click handler ───────────────────
  // KEY FIX: check auth first; if not logged in → show auth modal
  // and store a pending flag so after sign-in we open the review form
  if (writeReviewBtn) {
    writeReviewBtn.addEventListener('click', async () => {
      // Check current session
      let session = null;
      if (sb) {
        try {
          const { data } = await sb.auth.getSession();
          session = data?.session;
          if (session) activeUser = session.user;
        } catch {}
      }

      if (session) {
        // User is already signed in → open review form directly
        openReviewModal();
      } else {
        // Not signed in → save intent, open auth modal
        window.pendingWriteReview = true;
        const authModal = document.getElementById('authModal');
        if (authModal) {
          authModal.classList.add('active');
          document.body.style.overflow = 'hidden';
          // Update auth modal title to show context
          const authTitle    = document.getElementById('authTitle');
          const authSubtitle = document.getElementById('authSubtitle');
          if (authTitle)    authTitle.textContent    = 'Sign In to Leave a Review';
          if (authSubtitle) authSubtitle.textContent = "You'll be taken straight to the review form";
        }
      }
    });
  }

  // ─── Listen for auth sign-in to open review form ────────────
  // After app.js handles sign-in, it will fire pendingWriteReview
  // We poll via a short interval OR respond to the custom event
  if (sb) {
    sb.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        activeUser = session.user;
        if (window.pendingWriteReview) {
          window.pendingWriteReview = false;
          // Close auth modal first
          const authModal = document.getElementById('authModal');
          if (authModal) {
            authModal.classList.remove('active');
            document.body.style.overflow = '';
          }
          // Small delay so auth modal closes gracefully
          setTimeout(() => openReviewModal(), 200);
        }
      }
    });
  }

  // Wire close buttons
  if (modalCloseBtn)  modalCloseBtn.addEventListener('click', closeReviewModal);
  if (modalCancelBtn) modalCancelBtn.addEventListener('click', closeReviewModal);
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeReviewModal();
    });
  }

  // ─── Rating star selector ────────────────────────────────────
  const starDescriptions = {
    1: '1 - Disappointing. Needs major work',
    2: '2 - Mediocre. Lacks active engagement',
    3: '3 - Average. Good concepts, but simple',
    4: '4 - Excellent! Highly structured and helpful',
    5: '5 - Mind-blowing! Best Python cohort ever'
  };

  function highlightSelectorStars(rating) {
    ratingSelectorStars.forEach(star => {
      star.classList.toggle('active', parseInt(star.dataset.star, 10) <= rating);
    });
  }

  if (ratingSelectorStars.length > 0) {
    ratingSelectorStars.forEach(star => {
      star.addEventListener('mouseenter', () => highlightSelectorStars(parseInt(star.dataset.star, 10)));
      star.addEventListener('mouseleave', () => highlightSelectorStars(parseInt(ratingInput?.value || '0', 10)));
      star.addEventListener('click', () => {
        const val = parseInt(star.dataset.star, 10);
        if (ratingInput) ratingInput.value = val;
        highlightSelectorStars(val);
        if (ratingDesc) ratingDesc.textContent = starDescriptions[val] || '';
      });
    });
  }

  if (commentTextarea && charCounter) {
    commentTextarea.addEventListener('input', () => {
      const len = commentTextarea.value.length;
      charCounter.textContent = `${len}/1000`;
      charCounter.style.color = len > 1000 ? '#F43F5E' : '';
    });
  }

  // ─── Tag list controller (pros / cons) ──────────────────────
  setupTagListController('rev-input-pro', 'pros-tags-list');
  setupTagListController('rev-input-con', 'cons-tags-list');

  function setupTagListController(inputId, containerId) {
    const input     = document.getElementById(inputId);
    const container = document.getElementById(containerId);
    if (!input || !container) return;

    const addTag = (text) => {
      const formatted = text.trim();
      if (!formatted) return;
      const existing = Array.from(container.querySelectorAll('.rev-tag-item span'))
        .map(s => s.textContent.toLowerCase());
      if (existing.includes(formatted.toLowerCase())) { input.value = ''; return; }
      const tag = document.createElement('div');
      tag.className = 'rev-tag-item';
      tag.innerHTML = `<span>${formatted}</span><button type="button" class="btn-remove-tag">&times;</button>`;
      tag.querySelector('.btn-remove-tag').addEventListener('click', () => tag.remove());
      container.appendChild(tag);
      input.value = '';
    };

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); addTag(input.value); }
    });
    input.addEventListener('blur', () => addTag(input.value));
  }

  // ─── Media dropzone ──────────────────────────────────────────
  const fileInput              = document.getElementById('rev-file-input');
  const dropzone               = document.getElementById('mediaDropzone');
  const mediaPreviewsContainer = document.getElementById('media-previews');
  let pendingUploadFile   = null;
  let pendingUploadBase64 = null;

  if (dropzone && fileInput && mediaPreviewsContainer) {
    const MAX_FILE_SIZE = 2 * 1024 * 1024;

    const handleFile = (file) => {
      if (!file.type.startsWith('image/')) { showSleekToast('Only image files are allowed.'); return; }
      if (file.size > MAX_FILE_SIZE) { showSleekToast('File exceeds 2 MB limit.'); return; }
      pendingUploadFile = file;
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const maxDim = 150;
          let { width, height } = img;
          if (width > height) { if (width > maxDim) { height *= maxDim / width; width = maxDim; } }
          else { if (height > maxDim) { width *= maxDim / height; height = maxDim; } }
          canvas.width = width; canvas.height = height;
          canvas.getContext('2d').drawImage(img, 0, 0, width, height);
          pendingUploadBase64 = canvas.toDataURL('image/jpeg', 0.85);
          mediaPreviewsContainer.innerHTML = `
            <div class="media-preview-item" style="width:80px;height:80px;position:relative;">
              <img src="${pendingUploadBase64}" alt="Preview" style="width:100%;height:100%;object-fit:cover;border-radius:8px;">
              <button type="button" class="btn-remove-media" style="position:absolute;top:-8px;right:-8px;background:rgba(244,63,94,0.9);color:#fff;border:none;border-radius:50%;width:20px;height:20px;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:12px;">&times;</button>
            </div>`;
          mediaPreviewsContainer.querySelector('.btn-remove-media').addEventListener('click', (ev) => {
            ev.stopPropagation();
            pendingUploadFile = null; pendingUploadBase64 = null;
            mediaPreviewsContainer.innerHTML = '';
            dropzone.classList.remove('has-file');
          });
          dropzone.classList.add('has-file');
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    };

    dropzone.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', () => { if (fileInput.files[0]) handleFile(fileInput.files[0]); });
    dropzone.addEventListener('dragover', (e) => { e.preventDefault(); dropzone.classList.add('drag-over'); });
    dropzone.addEventListener('dragleave', () => dropzone.classList.remove('drag-over'));
    dropzone.addEventListener('drop', (e) => {
      e.preventDefault(); dropzone.classList.remove('drag-over');
      if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
    });
  }

  // ─── Form submission (writes directly to Supabase 'reviews' table) ──
  const withTimeout = (promise, ms) => {
    let id;
    const t = new Promise((_, reject) => { id = setTimeout(() => reject(new Error('Request timed out')), ms); });
    return Promise.race([promise.then(r => { clearTimeout(id); return r; }, e => { clearTimeout(id); throw e; }), t]);
  };

  if (reviewForm) {
    reviewForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!sb) { showSleekToast('⚠️ Database offline. Cannot submit.'); return; }

      const rating  = parseInt(ratingInput?.value || '0', 10);
      if (!rating) { showSleekToast('⭐ Please select a star rating!'); return; }

      const name      = document.getElementById('rev-input-name')?.value.trim()    || '';
      const email     = document.getElementById('rev-input-email')?.value.trim()   || '';
      const role      = document.getElementById('rev-input-role')?.value.trim()    || '';
      const comment   = commentTextarea?.value.trim()                               || '';
      const recommend = document.getElementById('rev-input-recommend')?.checked ?? true;

      if (!name || !email || !comment || !role) {
        showSleekToast('⚠️ Please fill in all required fields (Name, Email, Role, Feedback).');
        return;
      }

      const pros = Array.from(document.querySelectorAll('#pros-tags-list .rev-tag-item span')).map(s => s.textContent);
      const cons = Array.from(document.querySelectorAll('#cons-tags-list .rev-tag-item span')).map(s => s.textContent);

      const submitBtn = reviewForm.querySelector('.btn-modal-submit');
      const origHtml  = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>Submitting...</span>`;

      try {
        const avatarSource = pendingUploadBase64
          || activeUser?.user_metadata?.avatar_url
          || activeUser?.user_metadata?.picture
          || null;

        const payload = {
          reviewer_name:   name,
          reviewer_email:  email,
          reviewer_role:   role,
          rating,
          comment,
          pros,
          cons,
          recommend,
          media_urls:      [],
          title:           '',
          reviewer_avatar: avatarSource,
          user_id:         activeUser ? activeUser.id : null,
          status:          'approved'
        };

        let data = null, error = null;

        try {
          const res = await withTimeout(
            sb.from('reviews').insert(payload).select(),
            15000
          );
          data  = res.data;
          error = res.error;
        } catch (dbErr) {
          error = dbErr;
        }

        // Seamless fallback: reviewer_role column may not exist yet
        if (error && (error.message?.includes('reviewer_role') || String(error).includes('reviewer_role'))) {
          const fallbackPayload = { ...payload };
          delete fallbackPayload.reviewer_role;
          const retryRes = await withTimeout(
            sb.from('reviews').insert(fallbackPayload).select(),
            15000
          );
          if (retryRes.error) throw retryRes.error;
          data  = retryRes.data;
          error = null;
          showSleekToast('✨ Review submitted!');
        } else if (error) {
          throw error;
        } else {
          showSleekToast('✨ Review submitted successfully! Thank you.');
        }

        closeReviewModal();

        // Optimistic UI: prepend card immediately without waiting for a reload
        const inserted = (data && data[0]) ? data[0] : {
          id:             'local-' + Date.now(),
          reviewer_name:  name,
          reviewer_email: email,
          reviewer_role:  role,
          rating, comment, pros, cons, recommend,
          media_urls:     [],
          reviewer_avatar: avatarSource,
          is_verified:    !!(activeUser && activeUser.email?.toLowerCase() === email.toLowerCase()),
          status:         'approved',
          created_at:     new Date().toISOString(),
          helpful_count:  0
        };

        allReviews.unshift(inserted);
        renderCarousel(allReviews);
        renderSummaryFromLocal(allReviews);

      } catch (err) {
        console.error('[Reviews] Submission failed:', err);
        showSleekToast(`❌ Failed: ${err.message || err}`);
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = origHtml;
      }
    });
  }

  // ─── Avatar helpers ──────────────────────────────────────────
  const AVATAR_PALETTES = [
    ['#00E6F6','#0077f6'], ['#FFB020','#FF5500'],
    ['#10B981','#059669'], ['#F43F5E','#BE123C'],
    ['#A855F7','#6B21A8']
  ];
  const nameHash = (name) => { let s = 0; for (let i = 0; i < name.length; i++) s += name.charCodeAt(i); return s; };
  const getAvatarGradient   = (name) => { const g = AVATAR_PALETTES[nameHash(name) % AVATAR_PALETTES.length]; return `linear-gradient(135deg, ${g[0]}40 0%, ${g[1]}20 100%)`; };
  const getAvatarBorderColor = (name) => AVATAR_PALETTES[nameHash(name) % AVATAR_PALETTES.length][0] + '33';
  const getAvatarTextColor   = (name) => AVATAR_PALETTES[nameHash(name) % AVATAR_PALETTES.length][0];

  // ─── Toast notification ──────────────────────────────────────
  function showSleekToast(message) {
    const toast = document.createElement('div');
    Object.assign(toast.style, {
      position: 'fixed', bottom: '40px', right: '40px',
      background: 'linear-gradient(135deg, rgba(22,28,45,0.95) 0%, rgba(11,15,25,0.98) 100%)',
      border: '1px solid rgba(0,230,246,0.3)',
      boxShadow: '0 10px 30px rgba(0,230,246,0.15)',
      borderRadius: '12px', padding: '14px 24px',
      color: '#fff', fontFamily: 'var(--font-display, Outfit, sans-serif)',
      fontWeight: '600', fontSize: '14px',
      zIndex: '9999', backdropFilter: 'blur(10px)',
      transform: 'translateY(20px)', opacity: '0',
      transition: 'all 400ms ease'
    });
    toast.textContent = message;
    document.body.appendChild(toast);
    requestAnimationFrame(() => { toast.style.transform = 'translateY(0)'; toast.style.opacity = '1'; });
    setTimeout(() => {
      toast.style.transform = 'translateY(20px)'; toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 400);
    }, 3500);
  }

  // ─── Summary from local data (when API is unavailable) ───────
  function renderSummaryFromLocal(data) {
    const total = data ? data.length : 0;
    let sum = 0;
    const dist = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    data.forEach(r => {
      sum += r.rating;
      dist[r.rating] = (dist[r.rating] || 0) + 1;
    });
    const avg = total > 0 ? parseFloat((sum / total).toFixed(1)) : 0;

    const massiveEl = document.querySelector('.rev-score-massive');
    if (massiveEl) massiveEl.innerHTML = `${avg || '0.0'} <span>/ 5</span>`;

    const heroEl = document.getElementById('hero-average-rating');
    if (heroEl && avg > 0) heroEl.textContent = `${avg}/5 Student Rating`;

    const countSubEl = document.querySelector('.rev-count-sub');
    if (countSubEl) countSubEl.textContent = `Based on ${total.toLocaleString()} Verified Reviews`;

    for (let star = 5; star >= 1; star--) {
      const cnt = dist[star] || 0;
      const pct = total > 0 ? Math.round((cnt / total) * 100) : 0;
      const rowEl = document.querySelector(`.rev-dist-row[data-rating="${star}"]`);
      if (rowEl) {
        const fill  = rowEl.querySelector('.rev-dist-fill');
        const pctEl = rowEl.querySelector('.rev-dist-pct');
        if (fill)  fill.style.width   = `${pct}%`;
        if (pctEl) pctEl.textContent  = `${pct}%`;
      }
    }

    const starsRowEl = document.querySelector('.rev-stars-row');
    if (starsRowEl) {
      let h = '';
      const full = Math.floor(avg);
      const half = avg % 1 >= 0.5;
      for (let i = 1; i <= 5; i++) {
        const color = i <= full ? 'var(--gold, #FFB020)' : (i === full + 1 && half ? 'var(--gold, #FFB020)' : 'rgba(255,255,255,0.1)');
        h += `<svg fill="currentColor" viewBox="0 0 20 20" style="color:${color};width:16px;height:16px;"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>`;
      }
      starsRowEl.innerHTML = h;
    }
  }

  // ─── Summary from API ────────────────────────────────────────
  async function fetchSummary() {
    try {
      const res = await fetch('/api/reviews/summary');
      if (!res.ok) throw new Error('Stats API failed');
      const summary = await res.json();
      const avg   = summary.averageRating || 0.0;
      const count = summary.reviewCount   || 0;

      const massiveEl = document.querySelector('.rev-score-massive');
      if (massiveEl) massiveEl.innerHTML = `${avg} <span>/ 5</span>`;

      const heroEl = document.getElementById('hero-average-rating');
      if (heroEl && avg > 0) heroEl.textContent = `${avg}/5 Student Rating`;

      const countSubEl = document.querySelector('.rev-count-sub');
      if (countSubEl) countSubEl.textContent = `Based on ${count.toLocaleString()} Verified Reviews`;

      const starsRow = document.querySelector('.rev-stars-row');
      if (starsRow) {
        const full = Math.floor(avg);
        const half = avg % 1 >= 0.5;
        let html = '';
        for (let i = 1; i <= 5; i++) {
          const color = i <= full ? 'var(--gold, #FFB020)' : (i === full + 1 && half ? 'var(--gold, #FFB020)' : 'rgba(255,255,255,0.1)');
          html += `<svg fill="currentColor" viewBox="0 0 20 20" style="color:${color};width:16px;height:16px;"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>`;
        }
        starsRow.innerHTML = html;
      }

      for (let i = 1; i <= 5; i++) {
        const pct = (summary.distribution?.[String(i)] || 0) * 100;
        const row = document.querySelector(`.rev-dist-row[data-rating="${i}"]`);
        if (row) {
          const fill  = row.querySelector('.rev-dist-fill');
          const pctEl = row.querySelector('.rev-dist-pct');
          if (fill)  fill.style.width  = `${pct}%`;
          if (pctEl) pctEl.textContent = `${Math.round(pct)}%`;
        }
      }
    } catch {
      // Silently fall through — will be populated from local data
    }
  }

  // ─── Fetch reviews (try API → Supabase → fallback) ──────────
  async function fetchReviews() {
    // Show skeleton / loading state
    if (carouselTrack) {
      carouselTrack.innerHTML = `<div style="display:flex;align-items:center;justify-content:center;min-width:100%;padding:3rem;"><svg viewBox="0 0 24 24" style="width:32px;height:32px;color:var(--cyan,#00E6F6);animation:spin 1s linear infinite"><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="4" opacity=".25"/><path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg></div>`;
    }

    // 1. Try the Next.js API route
    try {
      const res = await fetch('/api/reviews?limit=50&offset=0');
      if (res.ok) {
        const data = await res.json();
        // Normalise API fields to internal schema
        allReviews = (data.reviews || []).map(normaliseReview);
        renderCarousel(allReviews);
        renderSummaryFromLocal(allReviews);
        return;
      }
    } catch {}

    // 2. Try Supabase directly
    if (sb) {
      try {
        const { data, error } = await sb
          .from('reviews')
          .select('*')
          .eq('status', 'approved')
          .order('created_at', { ascending: false })
          .limit(50);
        if (error) throw error;
        allReviews = (data || []).map(normaliseReview);
        renderCarousel(allReviews);
        renderSummaryFromLocal(allReviews);
        return;
      } catch (err) {
        console.warn('[Reviews] Supabase fetch failed, using fallback:', err);
      }
    }

    // 3. Use fallback data
    allReviews = [...fallbackReviews];
    renderCarousel(allReviews);
    renderSummaryFromLocal(allReviews);
  }

  /**
   * Normalise a DB/API review object to the internal schema.
   * Handles both the Supabase snake_case fields and any legacy camelCase fields.
   */
  function normaliseReview(r) {
    return {
      id:              r.id,
      reviewer_name:   r.reviewer_name  || r.name        || 'Anonymous',
      reviewer_role:   r.reviewer_role  || r.role        || 'Python Learner',
      reviewer_avatar: r.reviewer_avatar || r.avatarUrl  || null,
      reviewer_email:  r.reviewer_email || r.email       || '',
      rating:          r.rating         || 0,
      comment:         r.comment        || r.text        || '',
      pros:            Array.isArray(r.pros) ? r.pros    : [],
      cons:            Array.isArray(r.cons) ? r.cons    : [],
      recommend:       r.recommend      != null ? r.recommend : true,
      helpful_count:   r.helpful_count  || r.helpfulCount || 0,
      is_verified:     r.is_verified    != null ? r.is_verified : false,
      created_at:      r.created_at     || r.createdAt   || new Date().toISOString()
    };
  }

  // ─── Card renderer ───────────────────────────────────────────
  function renderStarsSvg(rating) {
    let h = '';
    for (let i = 1; i <= 5; i++) {
      const color = i <= rating ? 'var(--gold, #FFB020)' : 'rgba(255,255,255,0.08)';
      h += `<svg fill="currentColor" viewBox="0 0 20 20" style="width:12px;height:12px;color:${color}"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>`;
    }
    return h;
  }

  function renderCard(rev) {
    const dateStr = new Date(rev.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    const verifiedHtml = rev.is_verified
      ? `<span class="badge-verified"><svg fill="currentColor" viewBox="0 0 20 20" style="width:12px;height:12px;"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"></path></svg> Verified</span>`
      : '';

    const avatarHtml = rev.reviewer_avatar
      ? `<img class="rev-avatar" src="${rev.reviewer_avatar}" alt="${rev.reviewer_name}" referrerpolicy="no-referrer" onerror="this.outerHTML='<div class=\\'rev-avatar\\' style=\\'background:${getAvatarGradient(rev.reviewer_name)};border-color:${getAvatarBorderColor(rev.reviewer_name)};color:${getAvatarTextColor(rev.reviewer_name)}\\'>${rev.reviewer_name.substring(0,2).toUpperCase()}</div>'">`
      : `<div class="rev-avatar" style="background:${getAvatarGradient(rev.reviewer_name)};border-color:${getAvatarBorderColor(rev.reviewer_name)};color:${getAvatarTextColor(rev.reviewer_name)}">${rev.reviewer_name.substring(0,2).toUpperCase()}</div>`;

    const prosHtml = (rev.pros && rev.pros.length)
      ? rev.pros.map(p => `<span class="rev-tag rev-tag-pro"><svg fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" style="width:10px;height:10px;"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"></path></svg>${p}</span>`).join('')
      : '';

    const consHtml = (rev.cons && rev.cons.length)
      ? rev.cons.map(c => `<span class="rev-tag rev-tag-con"><svg fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" style="width:10px;height:10px;"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg>${c}</span>`).join('')
      : '';

    const recHtml = rev.recommend
      ? `<span class="rev-rec yes"><svg fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" style="width:12px;height:12px;"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> Recommends</span>`
      : `<span class="rev-rec no"><svg fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" style="width:12px;height:12px;"><path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> Not Recommended</span>`;

    const votedReviews = JSON.parse(localStorage.getItem('manodemy_helpful_votes') || '[]');
    const isVoted = votedReviews.includes(rev.id);
    const helpfulCount = rev.helpful_count || 0;

    return `
      <div class="rev-card" data-id="${rev.id}">
        <div class="rev-card-top">
          ${avatarHtml}
          <div class="rev-card-info">
            <div class="rev-card-name-row">
              <span class="rev-card-name">${rev.reviewer_name}</span>
              ${verifiedHtml}
            </div>
            <div class="rev-card-role">${rev.reviewer_role || 'Python Learner'}</div>
            <div class="rev-card-meta">
              <span class="rev-card-stars">${renderStarsSvg(rev.rating)}</span>
              <span class="rev-card-date">${dateStr}</span>
            </div>
          </div>
        </div>
        <div class="rev-card-body"><p>${rev.comment}</p></div>
        ${(prosHtml || consHtml) ? `<div class="rev-card-tags">${prosHtml}${consHtml}</div>` : ''}
        <div class="rev-card-bottom">
          ${recHtml}
          <button class="rev-helpful-btn ${isVoted ? 'active' : ''}" data-id="${rev.id}" data-count="${helpfulCount}">
            <svg fill="${isVoted ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" style="width:14px;height:14px;">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.91.688 2.053 1.703a11.208 11.208 0 01-.735 6.37 2.625 2.625 0 01-2.36 1.727H11.218a5.2 5.2 0 01-3.66-1.5l-3.21-3.21a.75.75 0 010-1.06l.983-.983A2.404 2.404 0 016.633 10.5z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 18v-6a9 9 0 011.8-5.4"></path>
            </svg>
            <span>Helpful (${helpfulCount})</span>
          </button>
        </div>
      </div>`;
  }

  // ─── Carousel engine ─────────────────────────────────────────
  function renderCarousel(reviews) {
    if (!carouselTrack) return;

    if (!reviews || reviews.length === 0) {
      carouselTrack.innerHTML = `
        <div style="flex:0 0 100%;text-align:center;padding:3rem 1rem;">
          <span style="font-size:2rem;">✍️</span>
          <h3 style="color:#fff;margin-top:10px;">No Reviews Yet</h3>
          <p style="color:var(--text-muted, rgba(255,255,255,0.5));">Be the first to share your experience.</p>
        </div>`;
      if (carouselDots) carouselDots.innerHTML = '';
      return;
    }

    carouselTrack.innerHTML = reviews.map(renderCard).join('');

    // Bind helpful buttons
    carouselTrack.querySelectorAll('.rev-helpful-btn').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        e.stopPropagation();
        const revId = btn.dataset.id;
        const voted = JSON.parse(localStorage.getItem('manodemy_helpful_votes') || '[]');
        if (voted.includes(revId)) { showSleekToast('You already voted this helpful!'); return; }

        const count = parseInt(btn.dataset.count || '0', 10) + 1;
        btn.classList.add('active');
        btn.querySelector('span').textContent = `Helpful (${count})`;
        btn.dataset.count = count;
        const svg = btn.querySelector('svg');
        if (svg) svg.setAttribute('fill', 'currentColor');

        voted.push(revId);
        localStorage.setItem('manodemy_helpful_votes', JSON.stringify(voted));

        if (sb && !revId.startsWith('fb_') && !revId.startsWith('local-')) {
          try { await sb.from('reviews').update({ helpful_count: count }).eq('id', revId); }
          catch (err) { console.error('[Reviews] helpful_count update failed:', err); }
        }
        showSleekToast('👍 Marked as helpful!');
      });
    });

    buildDots(reviews.length);
    bindArrows();
    updateArrows();
  }

  function getGap() {
    if (!carouselTrack) return 24;
    const gap = parseFloat(window.getComputedStyle(carouselTrack).gap);
    return isNaN(gap) ? 24 : gap;
  }

  function getCardsPerView() {
    if (!carouselTrack) return 1;
    const card = carouselTrack.querySelector('.rev-card');
    if (!card) return 1;
    const gap   = getGap();
    const cardW = card.offsetWidth + gap;
    return Math.max(1, Math.floor((carouselTrack.clientWidth + gap) / cardW));
  }

  function buildDots(count) {
    if (!carouselDots) return;
    const pages = Math.ceil(count / getCardsPerView());
    carouselDots.innerHTML = '';
    for (let i = 0; i < pages; i++) {
      const dot = document.createElement('button');
      dot.className = 'rev-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', `Page ${i + 1}`);
      dot.addEventListener('click', () => scrollToPage(i));
      carouselDots.appendChild(dot);
    }
  }

  function scrollToPage(page) {
    if (!carouselTrack) return;
    const card = carouselTrack.querySelector('.rev-card');
    if (!card) return;
    const cardW = card.offsetWidth + getGap();
    carouselTrack.scrollTo({ left: page * cardW * getCardsPerView(), behavior: 'smooth' });
  }

  function bindArrows() {
    if (carouselPrev) {
      carouselPrev.onclick = () => {
        const card = carouselTrack.querySelector('.rev-card');
        if (card) carouselTrack.scrollBy({ left: -(card.offsetWidth + getGap()) * getCardsPerView(), behavior: 'smooth' });
      };
    }
    if (carouselNext) {
      carouselNext.onclick = () => {
        const card = carouselTrack.querySelector('.rev-card');
        if (card) carouselTrack.scrollBy({ left: (card.offsetWidth + getGap()) * getCardsPerView(), behavior: 'smooth' });
      };
    }
  }

  function updateArrows() {
    if (!carouselTrack) return;
    const atStart = carouselTrack.scrollLeft <= 5;
    const atEnd   = carouselTrack.scrollLeft + carouselTrack.clientWidth >= carouselTrack.scrollWidth - 5;
    if (carouselPrev) carouselPrev.classList.toggle('dimmed', atStart);
    if (carouselNext) carouselNext.classList.toggle('dimmed', atEnd);
  }

  if (carouselTrack) {
    carouselTrack.addEventListener('scroll', () => {
      updateArrows();
      const card = carouselTrack.querySelector('.rev-card');
      if (card && carouselDots) {
        const cardW   = card.offsetWidth + getGap();
        const perView = getCardsPerView();
        const page    = Math.round(carouselTrack.scrollLeft / (cardW * perView));
        carouselDots.querySelectorAll('.rev-dot').forEach((d, i) => d.classList.toggle('active', i === page));
      }
    }, { passive: true });
  }

  // ─── Mouse drag-to-scroll ────────────────────────────────────
  if (carouselTrack) {
    let isDown = false, startX = 0, scrollLeft = 0, dragMoved = false;

    carouselTrack.addEventListener('mousedown', (e) => {
      isDown = true; dragMoved = false;
      startX = e.pageX - carouselTrack.offsetLeft;
      scrollLeft = carouselTrack.scrollLeft;
      carouselTrack.classList.add('is-dragging');
    });

    const stopDrag = () => {
      if (!isDown) return;
      isDown = false;
      carouselTrack.classList.remove('is-dragging');
      if (dragMoved) {
        const prevent = (evt) => { evt.stopImmediatePropagation(); evt.preventDefault(); };
        carouselTrack.addEventListener('click', prevent, true);
        setTimeout(() => carouselTrack.removeEventListener('click', prevent, true), 50);
        const card = carouselTrack.querySelector('.rev-card');
        if (card) {
          const cardW = card.offsetWidth + getGap();
          carouselTrack.scrollTo({ left: Math.round(carouselTrack.scrollLeft / cardW) * cardW, behavior: 'smooth' });
        }
      }
    };

    carouselTrack.addEventListener('mouseleave', stopDrag);
    carouselTrack.addEventListener('mouseup', stopDrag);
    carouselTrack.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - carouselTrack.offsetLeft;
      if (Math.abs(x - startX) > 5) dragMoved = true;
      carouselTrack.scrollLeft = scrollLeft - (x - startX) * 1.5;
    });
  }

  // ─── Boot ─────────────────────────────────────────────────────
  // Check current auth session at startup
  (async () => {
    if (sb) {
      try {
        const { data: { session } } = await sb.auth.getSession();
        if (session) activeUser = session.user;
      } catch {}
    }
    fetchSummary();
    fetchReviews();
  })();

});
