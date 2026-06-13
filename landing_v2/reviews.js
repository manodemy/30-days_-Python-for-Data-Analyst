"use strict";
/* Manodemy Landing v2.0 — Customer Reviews & Ratings Client Controller
   Redesigned: Carousel layout, no filter/toolbar, instant submission display */

document.addEventListener('DOMContentLoaded', () => {

  // ─────────────────────────────────────────────────────────────
  //  State
  // ─────────────────────────────────────────────────────────────
  let activeUser = null;
  let allReviews = [];   // holds the full list rendered in the carousel

  // ─────────────────────────────────────────────────────────────
  //  Fallback data (shown when Supabase is offline)
  // ─────────────────────────────────────────────────────────────
  const fallbackReviews = [
    {
      id: "fallback-1",
      reviewer_name: "Priyah Sharma",
      reviewer_email: "priyah.sharma@infosys.com",
      reviewer_avatar: null,
      rating: 5,
      comment: "I was highly skeptical about a course with zero video content—I thought I would get bored and quit on day 3. But the interactive browser notebooks are completely addictive. The Pandas Data Wrangling module forced me to actually write code rather than passively watch a screen. By Day 20, I had built an end-to-end telemetry parser that impressed my team lead, and it directly helped me land my transition from QA into my current Junior Data Analyst role.",
      pros: ["Interactive notebooks", "Active coding", "Telemetry parser lab"],
      cons: ["Requires daily commitment"],
      recommend: true,
      is_verified: true,
      helpful_count: 24,
      media_urls: [],
      created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: "fallback-2",
      reviewer_name: "Marcus Vance",
      reviewer_email: "marcus.vance@stripe.com",
      reviewer_avatar: null,
      rating: 5,
      comment: "Honestly, I didn't think a $19 course could offer anything beyond basic syntax. I was wrong. The NumPy arrays and clean visualization modules are top-tier. The course skipped the typical fluff and threw me straight into active dataset manipulation. I used the final capstone framework to build an automated operations dashboard that now saves my team 8 hours of manual logging every week. Best ROI I've spent on my education this year.",
      pros: ["NumPy manipulation", "Clean visualization", "Automated operations dashboard"],
      cons: ["Very fast-paced"],
      recommend: true,
      is_verified: true,
      helpful_count: 19,
      media_urls: [],
      created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: "fallback-3",
      reviewer_name: "Aditi Nair",
      reviewer_email: "aditi.nair@tcs.com",
      reviewer_avatar: null,
      rating: 4,
      comment: "My biggest hesitation was that 30 days wouldn't be enough time to transition my skills while working a full-time engineering shift. The bite-sized daily Jupyter-style structure made it completely manageable. The data cleansing modules solved problems I was actively facing at work. I aced a technical screening last week because I could explain vectorization instead of using slow loops.",
      pros: ["Jupyter-style structure", "Data cleansing modules", "Bite-sized daily format"],
      cons: ["Math concepts can be intense"],
      recommend: true,
      is_verified: true,
      helpful_count: 15,
      media_urls: [],
      created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: "fallback-4",
      reviewer_name: "David Lindqvist",
      reviewer_email: "david.lindqvist@nordea.com",
      reviewer_avatar: null,
      rating: 5,
      comment: "I've been stuck in Udemy 'tutorial hell' for six months, finishing only 10% of courses before losing interest. Manodemy's gamified environment and instant browser terminal feedback broke that cycle. Using what I learned, I built a predictive portfolio dashboard that earned me an internal transfer interview. No video bloat is a massive feature, not a drawback.",
      pros: ["Gamified environment", "Jupyter feedback", "No video bloat"],
      cons: ["Needs internet access"],
      recommend: true,
      is_verified: true,
      helpful_count: 31,
      media_urls: [],
      created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: "fallback-5",
      reviewer_name: "Rahul Deshmukh",
      reviewer_email: "rahul.deshmukh@cognizant.com",
      reviewer_avatar: null,
      rating: 5,
      comment: "I doubted whether an online certification would carry any weight during my recruiting screenings. But the depth of the 750+ browser challenges gave me a portfolio of worked challenges that I could actively discuss. The performance optimization module taught me code execution profiling that set me apart in technical interviews. It's a rigorous, hands-on path that values competency over passive watching.",
      pros: ["750+ challenges", "Execution profiling", "Cryptographic certification"],
      cons: ["Requires deep conceptual focus"],
      recommend: true,
      is_verified: true,
      helpful_count: 27,
      media_urls: [],
      created_at: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString()
    }
  ];

  // ─────────────────────────────────────────────────────────────
  //  Supabase init
  // ─────────────────────────────────────────────────────────────
  const initSupabase = () => {
    if (!window.MANODEMY_CONFIG?.SUPA_URL || !window.MANODEMY_CONFIG?.SUPA_KEY) {
      console.warn("Supabase configuration missing.");
      return null;
    }
    try {
      return window.supabase?.createClient(
        window.MANODEMY_CONFIG.SUPA_URL,
        window.MANODEMY_CONFIG.SUPA_KEY
      );
    } catch (err) {
      console.error("Failed to initialize Supabase client:", err);
      return null;
    }
  };

  const sb = initSupabase();

  // ─────────────────────────────────────────────────────────────
  //  DOM refs — modal, form, stars
  // ─────────────────────────────────────────────────────────────
  const writeReviewBtn     = document.querySelector('.btn-write-review');
  const modalOverlay       = document.querySelector('.rev-modal-overlay');
  const modalCloseBtn      = document.querySelector('.btn-close-modal');
  const modalCancelBtn     = document.querySelector('.btn-modal-cancel');
  const reviewForm         = document.getElementById('rev-submit-form');
  const ratingSelectorStars = document.querySelectorAll('.rev-selector-stars svg');
  const ratingDesc         = document.querySelector('.rev-selector-desc');
  const ratingInput        = document.getElementById('rev-input-rating');
  const commentTextarea    = document.getElementById('rev-input-comment');
  const charCounter        = document.querySelector('.rev-char-counter');

  // Carousel DOM refs
  const carouselTrack = document.getElementById('revCarouselTrack');
  const carouselPrev  = document.getElementById('revCarouselPrev');
  const carouselNext  = document.getElementById('revCarouselNext');
  const carouselDots  = document.getElementById('revCarouselDots');

  // ─────────────────────────────────────────────────────────────
  //  Rating star selector (modal)
  // ─────────────────────────────────────────────────────────────
  const starDescriptions = {
    1: "1 - Disappointing. Needs major work",
    2: "2 - Mediocre. Lacks active engagement",
    3: "3 - Average. Good concepts, but simple",
    4: "4 - Excellent! Highly structured and helpful",
    5: "5 - Mind-blowing! Best Python cohort ever"
  };

  if (ratingSelectorStars.length > 0) {
    ratingSelectorStars.forEach(star => {
      star.addEventListener('mouseenter', () => {
        highlightSelectorStars(parseInt(star.dataset.star, 10));
      });
      star.addEventListener('mouseleave', () => {
        highlightSelectorStars(parseInt(ratingInput.value || '0', 10));
      });
      star.addEventListener('click', () => {
        const val = parseInt(star.dataset.star, 10);
        ratingInput.value = val;
        highlightSelectorStars(val);
        if (ratingDesc) ratingDesc.textContent = starDescriptions[val] || "";
      });
    });
  }

  function highlightSelectorStars(rating) {
    ratingSelectorStars.forEach(star => {
      star.classList.toggle('active', parseInt(star.dataset.star, 10) <= rating);
    });
  }

  if (commentTextarea && charCounter) {
    commentTextarea.addEventListener('input', () => {
      const len = commentTextarea.value.length;
      charCounter.textContent = `${len}/1000`;
      charCounter.style.color = len > 1000 ? 'var(--rose)' : 'var(--ink-muted)';
    });
  }

  // ─────────────────────────────────────────────────────────────
  //  Modal open/close
  // ─────────────────────────────────────────────────────────────
  if (writeReviewBtn && modalOverlay) {
    writeReviewBtn.addEventListener('click', () => {
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
    });
  }

  const closeModal = () => {
    if (!modalOverlay) return;
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
    if (reviewForm) {
      reviewForm.reset();
      ratingInput.value = "";
      highlightSelectorStars(0);
      if (ratingDesc) ratingDesc.textContent = "Click a star to rate";
      if (charCounter) charCounter.textContent = "0/1000";
      const prosContainer = document.getElementById('pros-tags-list');
      const consContainer = document.getElementById('cons-tags-list');
      if (prosContainer) prosContainer.innerHTML = '';
      if (consContainer) consContainer.innerHTML = '';
      const mediaPreview = document.getElementById('media-previews');
      if (mediaPreview) mediaPreview.innerHTML = '';
      pendingUploadFile = null;
      pendingUploadBase64 = null;
      const dz = document.getElementById('mediaDropzone');
      if (dz) dz.classList.remove('has-file');
      
      const roleInput = document.getElementById('rev-input-role');
      if (roleInput) roleInput.value = '';
    }
  };

  modalCloseBtn?.addEventListener('click', closeModal);
  modalCancelBtn?.addEventListener('click', closeModal);
  modalOverlay?.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  // ─────────────────────────────────────────────────────────────
  //  Tag list controller (pros / cons)
  // ─────────────────────────────────────────────────────────────
  setupTagListController('rev-input-pro', 'pros-tags-list');
  setupTagListController('rev-input-con', 'cons-tags-list');

  function setupTagListController(inputId, containerId) {
    const input     = document.getElementById(inputId);
    const container = document.getElementById(containerId);
    if (!input || !container) return;

    const addTag = (text) => {
      const formatted = text.trim();
      if (!formatted) return;
      const existing = Array.from(container.querySelectorAll('.rev-tag-item span')).map(s => s.textContent.toLowerCase());
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

  // ─────────────────────────────────────────────────────────────
  //  Media dropzone
  // ─────────────────────────────────────────────────────────────
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
          let width = img.width;
          let height = img.height;
          if (width > height) {
            if (width > maxDim) {
              height *= maxDim / width;
              width = maxDim;
            }
          } else {
            if (height > maxDim) {
              width *= maxDim / height;
              height = maxDim;
            }
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          
          pendingUploadBase64 = canvas.toDataURL('image/jpeg', 0.85);
          
          mediaPreviewsContainer.innerHTML = `
            <div class="media-preview-item" style="width:80px;height:80px;position:relative;">
              <img src="${pendingUploadBase64}" alt="Preview" style="width:100%;height:100%;object-fit:cover;border-radius:8px;">
              <button type="button" class="btn-remove-media" style="position:absolute;top:-8px;right:-8px;background:rgba(244,63,94,0.9);color:#fff;border:none;border-radius:50%;width:20px;height:20px;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:12px;z-index:2;">&times;</button>
            </div>`;
          mediaPreviewsContainer.querySelector('.btn-remove-media').addEventListener('click', (ev) => {
            ev.stopPropagation();
            pendingUploadFile = null;
            pendingUploadBase64 = null;
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
      e.preventDefault();
      dropzone.classList.remove('drag-over');
      if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
    });
  }

  // ─────────────────────────────────────────────────────────────
  //  Form submission
  // ─────────────────────────────────────────────────────────────
  const withTimeout = (promise, ms, errorMsg) => {
    let timeoutId;
    const timeoutPromise = new Promise((_, reject) => {
      timeoutId = setTimeout(() => reject(new Error(errorMsg)), ms);
    });
    return Promise.race([
      promise.then(
        (res) => {
          clearTimeout(timeoutId);
          return res;
        },
        (err) => {
          clearTimeout(timeoutId);
          throw err;
        }
      ),
      timeoutPromise
    ]);
  };

  if (reviewForm) {
    reviewForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!sb) { alert("Reviews cannot be submitted right now. Database connection offline."); return; }
      const rating = parseInt(ratingInput.value || '0', 10);
      if (!rating) { alert("Please select a rating star!"); return; }
      const name      = document.getElementById('rev-input-name').value.trim();
      const email     = document.getElementById('rev-input-email').value.trim();
      const role      = document.getElementById('rev-input-role').value.trim();
      const comment   = commentTextarea.value.trim();
      const recommend = document.getElementById('rev-input-recommend').checked;
      if (!name || !email || !comment || !role) { alert("Please fill in all required fields (Name, Email, Role, Feedback)."); return; }

      const pros = Array.from(document.querySelectorAll('#pros-tags-list .rev-tag-item span')).map(s => s.textContent);
      const cons = Array.from(document.querySelectorAll('#cons-tags-list .rev-tag-item span')).map(s => s.textContent);

      const submitBtn = reviewForm.querySelector('.btn-modal-submit');
      const origHtml  = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<svg class="animate-spin" viewBox="0 0 24 24" style="width:16px;height:16px;margin-right:8px;animation:spin 1s linear infinite"><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="4" style="opacity:.25"></circle><path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>Submitting...`;

      try {
        let avatarSource = pendingUploadBase64 || activeUser?.user_metadata?.avatar_url || activeUser?.user_metadata?.picture || null;
        const reviewPayload = {
          reviewer_name: name,
          reviewer_email: email,
          reviewer_role: role,
          rating,
          comment,
          pros,
          cons,
          recommend,
          media_urls: [],
          title: '',
          reviewer_avatar: avatarSource,
          user_id: activeUser ? activeUser.id : null,
          status: 'approved'
        };

        let data = null;
        let error = null;

        try {
          const res = await withTimeout(
            sb.from('reviews').insert(reviewPayload).select(),
            15000,
            "Database connection timed out. Please try again."
          );
          data = res.data;
          error = res.error;
        } catch (dbErr) {
          error = dbErr;
        }

        // Seamless fallback retry if reviewer_role column not in live database yet
        if (error && (error.message?.includes('reviewer_role') || String(error).includes('reviewer_role'))) {
          console.warn("reviewer_role column not found in database, retrying insert without role...");
          const fallbackPayload = { ...reviewPayload };
          delete fallbackPayload.reviewer_role;
          
          try {
            const retryRes = await withTimeout(
              sb.from('reviews').insert(fallbackPayload).select(),
              15000,
              "Database connection timed out. Please try again."
            );
            if (retryRes.error) throw retryRes.error;
            data = retryRes.data;
          } catch (retryErr) {
            throw retryErr;
          }
          
          showSleekToast("✨ Review submitted! (Admin: Run SQL migration for roles.)");
        } else if (error) {
          throw error;
        } else {
          showSleekToast("✨ Review submitted successfully!");
        }

        closeModal();

        // Optimistic UI Fallback: construct review client-side if no data was returned from the DB select
        const insertedReview = (data && data[0]) ? data[0] : {
          id: "local-" + Date.now(),
          reviewer_name: name,
          reviewer_email: email,
          reviewer_role: role,
          rating,
          comment,
          pros,
          cons,
          recommend,
          media_urls: [],
          reviewer_avatar: avatarSource,
          is_verified: activeUser && activeUser.email?.toLowerCase() === email.toLowerCase(),
          status: 'approved',
          created_at: new Date().toISOString(),
          helpful_count: 0
        };

        // Prepend the new review to the top of the carousel immediately
        allReviews.unshift(insertedReview);
        renderCarousel(allReviews);
        processAndRenderStats(allReviews);
      } catch (err) {
        console.error("Submission failed:", err);
        alert(`Failed to submit review: ${err.message || err}`);
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = origHtml;
      }
    });
  }

  // ─────────────────────────────────────────────────────────────
  //  Avatar helpers
  // ─────────────────────────────────────────────────────────────
  const AVATAR_COLORS = ['#00E6F6', '#FFB020', '#10B981', '#F43F5E', '#A855F7'];

  const nameHash = (name) => {
    let s = 0;
    for (let i = 0; i < name.length; i++) s += name.charCodeAt(i);
    return s;
  };

  const getAvatarGradient = (name) => {
    const pairs = [['#00E6F6','#0077f6'],['#FFB020','#FF5500'],['#10B981','#059669'],['#F43F5E','#BE123C'],['#A855F7','#6B21A8']];
    const g = pairs[nameHash(name) % pairs.length];
    return `linear-gradient(135deg, ${g[0]}40 0%, ${g[1]}20 100%)`;
  };
  const getAvatarBorderColor = (name) => AVATAR_COLORS[nameHash(name) % AVATAR_COLORS.length] + '33';
  const getAvatarTextColor   = (name) => AVATAR_COLORS[nameHash(name) % AVATAR_COLORS.length];

  // ─────────────────────────────────────────────────────────────
  //  Toast notification
  // ─────────────────────────────────────────────────────────────
  function showSleekToast(message) {
    const toast = document.createElement('div');
    Object.assign(toast.style, {
      position: 'fixed', bottom: '40px', right: '40px',
      background: 'linear-gradient(135deg, rgba(22,28,45,0.9) 0%, rgba(11,15,25,0.95) 100%)',
      border: '1px solid rgba(0,230,246,0.3)',
      boxShadow: '0 10px 30px rgba(0,230,246,0.15)',
      borderRadius: '12px', padding: '14px 24px',
      color: '#fff', fontFamily: 'var(--font-display)',
      fontWeight: '700', fontSize: '14px',
      zIndex: '3000', backdropFilter: 'blur(10px)',
      transform: 'translateY(20px)', opacity: '0',
      transition: 'all 400ms var(--ease)'
    });
    toast.innerHTML = `<div style="display:flex;align-items:center;gap:8px;"><span style="color:var(--cyan);font-size:16px;">⚡</span><span>${message}</span></div>`;
    document.body.appendChild(toast);
    requestAnimationFrame(() => { toast.style.transform = 'translateY(0)'; toast.style.opacity = '1'; });
    setTimeout(() => {
      toast.style.transform = 'translateY(20px)';
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 400);
    }, 3500);
  }

  // ─────────────────────────────────────────────────────────────
  //  Stats renderer
  // ─────────────────────────────────────────────────────────────
  function processAndRenderStats(data) {
    const total = data ? data.length : 0;
    let sum = 0, verifiedCount = 0;
    const dist = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

    if (total > 0) {
      data.forEach(item => {
        sum += item.rating;
        if (item.is_verified) verifiedCount++;
        dist[item.rating] = (dist[item.rating] || 0) + 1;
      });
    }

    const avg = total > 0 ? parseFloat((sum / total).toFixed(1)) : 0;

    const massiveEl = document.querySelector('.rev-score-massive');
    if (massiveEl) massiveEl.innerHTML = `${avg || '0.0'} <span>/ 5</span>`;

    const heroEl = document.getElementById('hero-average-rating');
    if (heroEl && avg > 0) heroEl.textContent = `${avg}/5 Student Rating`;

    const starsRowEl = document.querySelector('.rev-stars-row');
    if (starsRowEl) {
      let h = '';
      const full = Math.floor(avg);
      const half = avg % 1 >= 0.5;
      for (let i = 1; i <= 5; i++) {
        if (i <= full) {
          h += `<svg fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>`;
        } else if (i === full + 1 && half) {
          h += `<svg fill="currentColor" viewBox="0 0 20 20" style="position:relative"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" style="color:var(--gold);clip-path:polygon(0 0,50% 0,50% 100%,0 100%)"></path><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" style="color:rgba(255,255,255,0.08);clip-path:polygon(50% 0,100% 0,100% 100%,50% 100%);position:absolute;left:0;top:0"></path></svg>`;
        } else {
          h += `<svg fill="currentColor" viewBox="0 0 20 20" style="color:rgba(255,255,255,0.08)"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>`;
        }
      }
      starsRowEl.innerHTML = h;
    }

    const countSubEl = document.querySelector('.rev-count-sub');
    if (countSubEl) countSubEl.textContent = `Based on ${total.toLocaleString()} reviews`;

    for (let star = 5; star >= 1; star--) {
      const cnt = dist[star] || 0;
      const pct = total > 0 ? Math.round((cnt / total) * 100) : 0;
      const rowEl = document.querySelector(`.rev-dist-row[data-rating="${star}"]`);
      if (rowEl) {
        const fillEl = rowEl.querySelector('.rev-dist-fill');
        const pctEl  = rowEl.querySelector('.rev-dist-pct');
        if (fillEl) fillEl.style.width = `${pct}%`;
        if (pctEl)  pctEl.textContent  = `${pct}%`;
      }
    }
  }

  // Stats calculation logic is now handled in unified refreshAllData fetching.

  // ─────────────────────────────────────────────────────────────
  //  Card renderer (shared between grid legacy & carousel)
  // ─────────────────────────────────────────────────────────────
  function renderStarsSvg(rating) {
    let h = '';
    for (let i = 1; i <= 5; i++) {
      h += i <= rating
        ? `<svg fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>`
        : `<svg fill="currentColor" viewBox="0 0 20 20" style="color:rgba(255,255,255,0.08)"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>`;
    }
    return h;
  }

  function renderCard(rev) {
    const dateStr = new Date(rev.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    const verifiedHtml = rev.is_verified
      ? `<span class="badge-verified"><svg fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"></path></svg> Verified</span>`
      : '';

    const avatarHtml = rev.reviewer_avatar
      ? `<img class="rev-avatar" src="${rev.reviewer_avatar}" alt="${rev.reviewer_name}" referrerpolicy="no-referrer" onerror="this.outerHTML='<div class=\\'rev-avatar\\' style=\\'background:${getAvatarGradient(rev.reviewer_name)};border-color:${getAvatarBorderColor(rev.reviewer_name)};color:${getAvatarTextColor(rev.reviewer_name)}\\'>${rev.reviewer_name.substring(0,2).toUpperCase()}</div>'">`
      : `<div class="rev-avatar" style="background:${getAvatarGradient(rev.reviewer_name)};border-color:${getAvatarBorderColor(rev.reviewer_name)};color:${getAvatarTextColor(rev.reviewer_name)}">${rev.reviewer_name.substring(0,2).toUpperCase()}</div>`;

    const prosHtml = (rev.pros && rev.pros.length)
      ? rev.pros.map(p => `<span class="rev-tag rev-tag-pro"><svg fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"></path></svg>${p}</span>`).join('')
      : '';

    const consHtml = (rev.cons && rev.cons.length)
      ? rev.cons.map(c => `<span class="rev-tag rev-tag-con"><svg fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg>${c}</span>`).join('')
      : '';

    const recHtml = rev.recommend
      ? `<span class="rev-rec yes"><svg fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> Recommends</span>`
      : `<span class="rev-rec no"><svg fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> Not Recommended</span>`;

    const votedReviews = JSON.parse(localStorage.getItem('manodemy_helpful_votes') || '[]');
    const isVoted = votedReviews.includes(rev.id);
    const helpfulActive = isVoted ? 'active' : '';
    const helpfulText = rev.helpful_count || 0;
    
    const helpfulHtml = `
      <button class="rev-helpful-btn ${helpfulActive}" data-id="${rev.id}" data-count="${helpfulText}">
        <svg fill="${isVoted ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.91.688 2.053 1.703a11.208 11.208 0 01-.735 6.37 2.625 2.625 0 01-2.36 1.727H11.218a5.2 5.2 0 01-3.66-1.5l-3.21-3.21a.75.75 0 010-1.06l.983-.983A2.404 2.404 0 016.633 10.5z"></path>
          <path stroke-linecap="round" stroke-linejoin="round" d="M3 18v-6a9 9 0 011.8-5.4"></path>
        </svg>
        <span>Helpful (${helpfulText})</span>
      </button>
    `;

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
          ${helpfulHtml}
        </div>
      </div>`;
  }

  // ─────────────────────────────────────────────────────────────
  //  Carousel engine
  // ─────────────────────────────────────────────────────────────
  let activeDotIndex = 0;

  function renderCarousel(reviews) {
    if (!carouselTrack) return;

    if (!reviews || reviews.length === 0) {
      carouselTrack.innerHTML = `
        <div class="rev-empty" style="min-width:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:3rem 1rem;gap:1rem;">
          <span style="font-size:2.5rem;">✍️</span>
          <h3 style="color:var(--ink);font-size:1.2rem;">No Reviews Yet</h3>
          <p style="color:var(--ink-muted);">Be the first to share your experience.</p>
        </div>`;
      if (carouselDots) carouselDots.innerHTML = '';
      if (carouselPrev) carouselPrev.style.display = 'none';
      if (carouselNext) carouselNext.style.display = 'none';
      return;
    }

    // Render all cards
    carouselTrack.innerHTML = reviews.map(renderCard).join('');

    // Bind helpful buttons
    const helpfulButtons = carouselTrack.querySelectorAll('.rev-helpful-btn');
    helpfulButtons.forEach(btn => {
      btn.addEventListener('click', async (e) => {
        e.stopPropagation();
        const reviewId = btn.dataset.id;
        const votedReviews = JSON.parse(localStorage.getItem('manodemy_helpful_votes') || '[]');
        if (votedReviews.includes(reviewId)) {
          showSleekToast("You already voted this review as helpful!");
          return;
        }
        
        const currentCount = parseInt(btn.dataset.count || '0', 10);
        const newCount = currentCount + 1;
        
        // Update UI immediately
        btn.classList.add('active');
        btn.querySelector('span').textContent = `Helpful (${newCount})`;
        btn.dataset.count = newCount;
        const svg = btn.querySelector('svg');
        if (svg) {
          svg.setAttribute('fill', 'currentColor');
        }
        
        // Save to localStorage
        votedReviews.push(reviewId);
        localStorage.setItem('manodemy_helpful_votes', JSON.stringify(votedReviews));
        
        // Update in DB
        if (sb && !reviewId.startsWith('fallback-')) {
          try {
            await sb.from('reviews').update({ helpful_count: newCount }).eq('id', reviewId);
          } catch (err) {
            console.error("Failed to update helpful count in database:", err);
          }
        }
        showSleekToast("👍 Review marked as helpful!");
      });
    });

    // Build dots
    buildDots(reviews.length);

    // Arrow navigation
    bindArrows();

    // Drag-to-scroll (mouse)
    bindDragScroll();

    // Sync dots on scroll
    carouselTrack.addEventListener('scroll', onTrackScroll, { passive: true });

    // Initial arrow state
    updateArrows();
  }

  function buildDots(count) {
    if (!carouselDots) return;
    // One dot per visible "page" (card width ~380px + gap 24px = ~404px)
    const pageCount = Math.ceil(count / getCardsPerPage());
    carouselDots.innerHTML = '';
    for (let i = 0; i < pageCount; i++) {
      const dot = document.createElement('button');
      dot.className = 'rev-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', `Go to review page ${i + 1}`);
      dot.addEventListener('click', () => scrollToPage(i));
      carouselDots.appendChild(dot);
    }
  }

  function getCardsPerPage() {
    if (!carouselTrack) return 1;
    const w = carouselTrack.clientWidth;
    if (w >= 1100) return 3;
    if (w >= 700)  return 2;
    return 1;
  }

  function scrollToPage(pageIndex) {
    if (!carouselTrack) return;
    const card = carouselTrack.querySelector('.rev-card');
    if (!card) return;
    const cardW = card.offsetWidth + 24; // 24px gap
    carouselTrack.scrollTo({ left: pageIndex * cardW * getCardsPerPage(), behavior: 'smooth' });
  }

  function bindArrows() {
    if (carouselPrev) {
      carouselPrev.onclick = () => {
        const card = carouselTrack.querySelector('.rev-card');
        if (!card) return;
        carouselTrack.scrollBy({ left: -(card.offsetWidth + 24) * getCardsPerPage(), behavior: 'smooth' });
      };
    }
    if (carouselNext) {
      carouselNext.onclick = () => {
        const card = carouselTrack.querySelector('.rev-card');
        if (!card) return;
        carouselTrack.scrollBy({ left: (card.offsetWidth + 24) * getCardsPerPage(), behavior: 'smooth' });
      };
    }
  }

  function onTrackScroll() {
    updateArrows();
    updateActiveDot();
  }

  function updateArrows() {
    if (!carouselTrack) return;
    const atStart = carouselTrack.scrollLeft <= 4;
    const atEnd   = carouselTrack.scrollLeft + carouselTrack.clientWidth >= carouselTrack.scrollWidth - 4;
    if (carouselPrev) carouselPrev.classList.toggle('dimmed', atStart);
    if (carouselNext) carouselNext.classList.toggle('dimmed', atEnd);
  }

  function updateActiveDot() {
    if (!carouselTrack || !carouselDots) return;
    const card = carouselTrack.querySelector('.rev-card');
    if (!card) return;
    const cardW   = card.offsetWidth + 24;
    const perPage = getCardsPerPage();
    const page    = Math.round(carouselTrack.scrollLeft / (cardW * perPage));
    const dots    = carouselDots.querySelectorAll('.rev-dot');
    dots.forEach((d, i) => d.classList.toggle('active', i === page));
    activeDotIndex = page;
  }

  // Drag-to-scroll (mouse + touch swipe)
  function bindDragScroll() {
    if (!carouselTrack) return;
    let isDown = false, startX = 0, scrollLeft = 0;

    // Mouse Events
    carouselTrack.addEventListener('mousedown', (e) => {
      isDown = true;
      carouselTrack.classList.add('is-dragging');
      startX     = e.pageX - carouselTrack.offsetLeft;
      scrollLeft = carouselTrack.scrollLeft;
    });

    carouselTrack.addEventListener('mouseleave', () => { isDown = false; carouselTrack.classList.remove('is-dragging'); });
    carouselTrack.addEventListener('mouseup',    () => { isDown = false; carouselTrack.classList.remove('is-dragging'); });

    carouselTrack.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x    = e.pageX - carouselTrack.offsetLeft;
      const walk = (x - startX) * 1.2;
      carouselTrack.scrollLeft = scrollLeft - walk;
    });

    // Touch Events for Mobile Swiping
    carouselTrack.addEventListener('touchstart', (e) => {
      isDown = true;
      startX     = e.touches[0].pageX - carouselTrack.offsetLeft;
      scrollLeft = carouselTrack.scrollLeft;
    }, { passive: true });

    carouselTrack.addEventListener('touchend', () => {
      isDown = false;
    });

    carouselTrack.addEventListener('touchmove', (e) => {
      if (!isDown) return;
      const x    = e.touches[0].pageX - carouselTrack.offsetLeft;
      const walk = (x - startX) * 1.2;
      carouselTrack.scrollLeft = scrollLeft - walk;
    }, { passive: true });
  }

  // ─────────────────────────────────────────────────────────────
  //  Data fetching
  // ─────────────────────────────────────────────────────────────
  async function refreshAllData() {
    // Show loading spinner
    if (carouselTrack) {
      carouselTrack.innerHTML = `<div class="rev-carousel-loading"><svg viewBox="0 0 24 24" style="width:32px;height:32px;color:var(--cyan);animation:spin 1s linear infinite"><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="4" opacity=".25"/><path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg></div>`;
    }

    if (sb) {
      try {
        const { data, error } = await sb
          .from('reviews')
          .select('*')
          .eq('status', 'approved')
          .order('created_at', { ascending: false });
        if (error) throw error;
        allReviews = data || [];
      } catch (err) {
        console.warn('Reviews fetch failed, using fallback:', err);
        allReviews = [...fallbackReviews];
      }
    } else {
      allReviews = [...fallbackReviews];
    }

    // Process statistics and render stats dashboard on client side
    processAndRenderStats(allReviews);

    // Render the carousel containing all reviews
    renderCarousel(allReviews);
  }

  // ─────────────────────────────────────────────────────────────
  //  Auth session (populate form fields if logged in)
  // ─────────────────────────────────────────────────────────────
  (async () => {
    if (!sb) return;
    try {
      const { data: { session } } = await sb.auth.getSession();
      if (session) activeUser = session.user;
    } catch {}
  })();

  // ─────────────────────────────────────────────────────────────
  //  Boot
  // ─────────────────────────────────────────────────────────────
  refreshAllData();
});
