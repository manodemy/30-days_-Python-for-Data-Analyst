"use strict";
/* Manodemy Landing v2.0 — Customer Reviews & Ratings Client Controller */

document.addEventListener('DOMContentLoaded', () => {
  // Global States
  let currentPage = 1;
  const pageSize = 6;
  let currentFilters = {
    search: '',
    rating: 'all',
    verifiedOnly: false,
    mediaOnly: false,
    sortBy: 'most_recent' // 'most_recent', 'highest', 'helpful'
  };
  let clientUuid = localStorage.getItem('manodemy_reviews_client_uuid');
  if (!clientUuid) {
    clientUuid = 'client-' + Math.random().toString(36).substring(2, 15) + '-' + Math.random().toString(36).substring(2, 15);
    localStorage.setItem('manodemy_reviews_client_uuid', clientUuid);
  }

  // Active user data from Supabase Auth
  let activeUser = null;

  // Supabase Client Initialization
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

  // DOM Cache
  const reviewsGrid = document.querySelector('.reviews-grid');
  const searchInput = document.querySelector('.rev-search-input');
  const ratingFilter = document.querySelector('.rev-select-dropdown');
  const sortFilter = document.querySelector('.reviews-toolbar .rev-select-dropdown:nth-of-type(2)'); // Wait, let's make sure selector is exact
  const verifiedCheckbox = document.getElementById('filter-verified');
  const mediaCheckbox = document.getElementById('filter-media');
  const paginationContainer = document.querySelector('.reviews-pagination');
  const writeReviewBtn = document.querySelector('.btn-write-review');
  const modalOverlay = document.querySelector('.rev-modal-overlay');
  const modalCloseBtn = document.querySelector('.btn-close-modal');
  const modalCancelBtn = document.querySelector('.btn-modal-cancel');
  const reviewForm = document.getElementById('rev-submit-form');
  const ratingSelectorStars = document.querySelectorAll('.rev-selector-stars svg');
  const ratingDesc = document.querySelector('.rev-selector-desc');
  const ratingInput = document.getElementById('rev-input-rating');
  const commentTextarea = document.getElementById('rev-input-comment');
  const charCounter = document.querySelector('.rev-char-counter');

  // Interactive Review Form Stars
  const starDescriptions = {
    1: "1 - Disappointing. Needs major work",
    2: "2 - Mediocre. Lacks active engagement",
    3: "3 - Average. Good concepts, but simple",
    4: "4 - Excellent! Highly structured and helpful",
    5: "5 - Mind-blowing! Best Python cohort ever"
  };

  if (ratingSelectorStars.length > 0) {
    ratingSelectorStars.forEach(star => {
      // Hover highlight
      star.addEventListener('mouseenter', () => {
        const hoverVal = parseInt(star.dataset.star, 10);
        highlightSelectorStars(hoverVal);
      });

      star.addEventListener('mouseleave', () => {
        const activeVal = parseInt(ratingInput.value || '0', 10);
        highlightSelectorStars(activeVal);
      });

      // Selection click
      star.addEventListener('click', () => {
        const selectVal = parseInt(star.dataset.star, 10);
        ratingInput.value = selectVal;
        highlightSelectorStars(selectVal);
        if (ratingDesc) {
          ratingDesc.textContent = starDescriptions[selectVal] || "";
        }
      });
    });
  }

  function highlightSelectorStars(rating) {
    ratingSelectorStars.forEach(star => {
      const starVal = parseInt(star.dataset.star, 10);
      if (starVal <= rating) {
        star.classList.add('active');
      } else {
        star.classList.remove('active');
      }
    });
  }

  // Comment Character Counter
  if (commentTextarea && charCounter) {
    commentTextarea.addEventListener('input', () => {
      const len = commentTextarea.value.length;
      charCounter.textContent = `${len}/1000`;
      if (len > 1000) {
        charCounter.style.color = 'var(--rose)';
      } else {
        charCounter.style.color = 'var(--ink-muted)';
      }
    });
  }

  // Modal Open/Close Transitions
  if (writeReviewBtn && modalOverlay) {
    writeReviewBtn.addEventListener('click', () => {
      // Pre-fill user session values if logged in
      if (activeUser) {
        const emailInput = document.getElementById('rev-input-email');
        const nameInput = document.getElementById('rev-input-name');
        if (emailInput && activeUser.email) emailInput.value = activeUser.email;
        if (nameInput && activeUser.user_metadata?.full_name) {
          nameInput.value = activeUser.user_metadata.full_name;
        }
      }
      modalOverlay.classList.add('active');
      document.body.style.overflow = 'hidden'; // Lock background scroll
    });
  }

  const closeModal = () => {
    if (modalOverlay) {
      modalOverlay.classList.remove('active');
      document.body.style.overflow = '';
      if (reviewForm) {
        reviewForm.reset();
        ratingInput.value = "";
        highlightSelectorStars(0);
        if (ratingDesc) ratingDesc.textContent = "Click a star to rate";
        if (charCounter) charCounter.textContent = "0/1000";
        // Reset Pros & Cons dynamic elements
        const prosContainer = document.getElementById('pros-tags-list');
        const consContainer = document.getElementById('cons-tags-list');
        if (prosContainer) prosContainer.innerHTML = '';
        if (consContainer) consContainer.innerHTML = '';
        // Reset Media Previews
        const mediaPreview = document.getElementById('media-previews');
        if (mediaPreview) mediaPreview.innerHTML = '';
      }
    }
  };

  modalCloseBtn?.addEventListener('click', closeModal);
  modalCancelBtn?.addEventListener('click', closeModal);
  modalOverlay?.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  // Pros & Cons Tags Controller
  setupTagListController('rev-input-pro', 'pros-tags-list');
  setupTagListController('rev-input-con', 'cons-tags-list');

  function setupTagListController(inputId, containerId) {
    const input = document.getElementById(inputId);
    const container = document.getElementById(containerId);
    if (!input || !container) return;

    const addTag = (text) => {
      const formatted = text.trim();
      if (!formatted) return;

      // Check if tag already exists
      const existing = Array.from(container.querySelectorAll('.rev-tag-item span')).map(s => s.textContent.toLowerCase());
      if (existing.includes(formatted.toLowerCase())) {
        input.value = '';
        return;
      }

      const tag = document.createElement('div');
      tag.className = 'rev-tag-item';
      tag.innerHTML = `
        <span>${formatted}</span>
        <button type="button" class="btn-remove-tag">&times;</button>
      `;

      tag.querySelector('.btn-remove-tag').addEventListener('click', () => {
        tag.remove();
      });

      container.appendChild(tag);
      input.value = '';
    };

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ',') {
        e.preventDefault();
        addTag(input.value);
      }
    });

    input.addEventListener('blur', () => {
      addTag(input.value);
    });
  }

  // Media URL Upload and Previews
  const mediaInput = document.getElementById('rev-input-media');
  const mediaPreviewsContainer = document.getElementById('media-previews');
  if (mediaInput && mediaPreviewsContainer) {
    const addMediaUrl = (url) => {
      const cleanUrl = url.trim();
      if (!cleanUrl) return;

      // Basic URL verification
      try {
        new URL(cleanUrl);
      } catch {
        alert("Please enter a valid HTTP/HTTPS media URL.");
        return;
      }

      // Check if already added
      const existing = Array.from(mediaPreviewsContainer.querySelectorAll('.media-preview-item')).map(el => el.dataset.url);
      if (existing.includes(cleanUrl)) {
        mediaInput.value = '';
        return;
      }

      const isVideo = cleanUrl.match(/\.(mp4|webm|ogg|mov)$/i) || cleanUrl.includes('youtube.com') || cleanUrl.includes('youtu.be');

      const item = document.createElement('div');
      item.className = 'media-preview-item';
      item.dataset.url = cleanUrl;

      if (isVideo) {
        item.innerHTML = `
          <div class="media-preview-icon video-icon">🎬</div>
          <button type="button" class="btn-remove-media">&times;</button>
        `;
      } else {
        item.innerHTML = `
          <img src="${cleanUrl}" alt="Preview" onerror="this.src='https://placehold.co/80x80/161c2d/00E6F6?text=Image';">
          <button type="button" class="btn-remove-media">&times;</button>
        `;
      }

      item.querySelector('.btn-remove-media').addEventListener('click', () => {
        item.remove();
      });

      mediaPreviewsContainer.appendChild(item);
      mediaInput.value = '';
    };

    mediaInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        addMediaUrl(mediaInput.value);
      }
    });

    const addMediaBtn = document.getElementById('btn-add-media');
    addMediaBtn?.addEventListener('click', () => {
      addMediaUrl(mediaInput.value);
    });
  }

  // Setup client storage tracking of voted actions
  const getVotedReviews = (type) => {
    try {
      return JSON.parse(localStorage.getItem(`manodemy_voted_${type}_reviews`) || '[]');
    } catch {
      return [];
    }
  };

  const addVotedReview = (type, reviewId) => {
    const voted = getVotedReviews(type);
    if (!voted.includes(reviewId)) {
      voted.push(reviewId);
      localStorage.setItem(`manodemy_voted_${type}_reviews`, JSON.stringify(voted));
    }
  };

  // Form Submission Logic
  if (reviewForm) {
    reviewForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      if (!sb) {
        alert("Reviews cannot be submitted right now. Database connection offline.");
        return;
      }

      const rating = parseInt(ratingInput.value || '0', 10);
      if (!rating) {
        alert("Please select a rating star!");
        return;
      }

      const name = document.getElementById('rev-input-name').value.trim();
      const email = document.getElementById('rev-input-email').value.trim();
      const title = document.getElementById('rev-input-title').value.trim();
      const comment = commentTextarea.value.trim();
      const cohortDate = document.getElementById('rev-input-cohort').value;
      const avatarUrl = document.getElementById('rev-input-avatar-url').value.trim();
      const recommend = document.getElementById('rev-input-recommend').checked;

      if (!name || !email || !title || !comment) {
        alert("Please fill in all required fields.");
        return;
      }

      const pros = Array.from(document.querySelectorAll('#pros-tags-list .rev-tag-item span')).map(s => s.textContent);
      const cons = Array.from(document.querySelectorAll('#cons-tags-list .rev-tag-item span')).map(s => s.textContent);
      const mediaUrls = Array.from(document.querySelectorAll('#media-previews .media-preview-item')).map(item => item.dataset.url);

      const submitBtn = reviewForm.querySelector('.btn-modal-submit');
      const originalBtnHtml = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg class="animate-spin" viewBox="0 0 24 24" style="width:16px; height:16px; margin-right:8px; animation: spin 1s linear infinite;">
          <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="4" style="opacity:0.25;"></circle>
          <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Submitting...
      `;

      try {
        const reviewPayload = {
          reviewer_name: name,
          reviewer_email: email,
          rating: rating,
          title: title,
          comment: comment,
          pros: pros,
          cons: cons,
          recommend: recommend,
          cohort_date: cohortDate || null,
          media_urls: mediaUrls,
          reviewer_avatar: avatarUrl || null,
          user_id: activeUser ? activeUser.id : null,
          status: 'approved' // Automatically approved, but can be moderated/flagged
        };

        const { data, error } = await sb.from('reviews').insert(reviewPayload).select();

        if (error) throw error;

        // Reset and close
        closeModal();

        // Show custom glassmorphic toast
        showSleekToast("Review Submitted Successfully!");

        // Reload data
        currentPage = 1;
        await refreshAllData();

      } catch (err) {
        console.error("Submission failed:", err);
        alert(`Failed to submit review: ${err.message || err}`);
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnHtml;
      }
    });
  }

  // Dynamic Beautiful Glassmorphic Colored Avatar Initials Background Color
  const getAvatarGradient = (name) => {
    const colors = [
      ['#00E6F6', '#0077f6'], // cyan to blue
      ['#FFB020', '#FF5500'], // gold to orange
      ['#10B981', '#059669'], // emerald to dark emerald
      ['#F43F5E', '#BE123C'], // rose to ruby
      ['#A855F7', '#6B21A8']  // purple to deep purple
    ];
    let sum = 0;
    for (let i = 0; i < name.length; i++) sum += name.charCodeAt(i);
    const grad = colors[sum % colors.length];
    return `linear-gradient(135deg, ${grad[0]}40 0%, ${grad[1]}20 100%)`;
  };

  const getAvatarBorderColor = (name) => {
    const colors = ['#00E6F6', '#FFB020', '#10B981', '#F43F5E', '#A855F7'];
    let sum = 0;
    for (let i = 0; i < name.length; i++) sum += name.charCodeAt(i);
    return colors[sum % colors.length] + '33';
  };

  const getAvatarTextColor = (name) => {
    const colors = ['#00E6F6', '#FFB020', '#10B981', '#F43F5E', '#A855F7'];
    let sum = 0;
    for (let i = 0; i < name.length; i++) sum += name.charCodeAt(i);
    return colors[sum % colors.length];
  };

  // Sleek Glassmorphic Toast Notification
  function showSleekToast(message) {
    const toast = document.createElement('div');
    toast.style.position = 'fixed';
    toast.style.bottom = '40px';
    toast.style.right = '40px';
    toast.style.background = 'linear-gradient(135deg, rgba(22, 28, 45, 0.9) 0%, rgba(11, 15, 25, 0.95) 100%)';
    toast.style.border = '1px solid rgba(0, 230, 246, 0.3)';
    toast.style.boxShadow = '0 10px 30px rgba(0, 230, 246, 0.15), 0 0 15px rgba(0, 230, 246, 0.05)';
    toast.style.borderRadius = '12px';
    toast.style.padding = '14px 24px';
    toast.style.color = '#fff';
    toast.style.fontFamily = 'var(--font-display)';
    toast.style.fontWeight = '700';
    toast.style.fontSize = '14px';
    toast.style.zIndex = '3000';
    toast.style.backdropFilter = 'blur(10px)';
    toast.style.webkitBackdropFilter = 'blur(10px)';
    toast.style.transform = 'translateY(20px)';
    toast.style.opacity = '0';
    toast.style.transition = 'all 400ms var(--ease)';
    toast.innerHTML = `
      <div style="display:flex; align-items:center; gap:8px;">
        <span style="color:var(--cyan); font-size:16px;">⚡</span>
        <span>${message}</span>
      </div>
    `;

    document.body.appendChild(toast);

    // Fade In
    requestAnimationFrame(() => {
      toast.style.transform = 'translateY(0)';
      toast.style.opacity = '1';
    });

    // Fade Out
    setTimeout(() => {
      toast.style.transform = 'translateY(20px)';
      toast.style.opacity = '0';
      setTimeout(() => {
        toast.style.remove();
      }, 400);
    }, 3500);
  }

  // Load and Aggregate Data Stats
  async function refreshStats() {
    if (!sb) return;

    try {
      // Fetch ratings and media status for all approved reviews to compile total statistics
      const { data, error } = await sb
        .from('reviews')
        .select('rating, is_verified, media_urls')
        .eq('status', 'approved');

      if (error) throw error;

      const totalReviews = data.length;
      let averageScore = 0;
      let scoreSum = 0;
      let verifiedCount = 0;
      let recommendationCount = 0;

      // Distribution array: index matches star rating (1-5)
      const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

      if (totalReviews > 0) {
        data.forEach(item => {
          scoreSum += item.rating;
          if (item.is_verified) verifiedCount++;
          distribution[item.rating] = (distribution[item.rating] || 0) + 1;
        });
        averageScore = parseFloat((scoreSum / totalReviews).toFixed(1));
      }

      // Render Statistics in DOM
      const massiveScoreEl = document.querySelector('.rev-score-massive');
      if (massiveScoreEl) {
        massiveScoreEl.innerHTML = `${averageScore || '0.0'} <span>/ 5</span>`;
      }

      // Render overall stars representation
      const starsRowEl = document.querySelector('.rev-stars-row');
      if (starsRowEl) {
        let starsHtml = '';
        const fullStars = Math.floor(averageScore);
        const hasHalf = averageScore % 1 >= 0.5;

        for (let i = 1; i <= 5; i++) {
          if (i <= fullStars) {
            // Full star SVG
            starsHtml += `<svg fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>`;
          } else if (i === fullStars + 1 && hasHalf) {
            // Half star SVG
            starsHtml += `<svg fill="currentColor" viewBox="0 0 20 20" style="position:relative;">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" style="color:var(--gold); clip-path: polygon(0 0, 50% 0, 50% 100%, 0 100%);"></path>
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" style="color:rgba(255,255,255,0.08); clip-path: polygon(50% 0, 100% 0, 100% 100%, 50% 100%); position:absolute; left:0; top:0;"></path>
            </svg>`;
          } else {
            // Empty star SVG
            starsHtml += `<svg fill="currentColor" viewBox="0 0 20 20" style="color:rgba(255, 255, 255, 0.08); filter:none;"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>`;
          }
        }
        starsRowEl.innerHTML = starsHtml;
      }

      const countSubEl = document.querySelector('.rev-count-sub');
      if (countSubEl) {
        countSubEl.textContent = `Based on ${totalReviews.toLocaleString()} reviews`;
      }

      // Update Distribution Bars
      for (let star = 5; star >= 1; star--) {
        const rowCount = distribution[star] || 0;
        const pct = totalReviews > 0 ? Math.round((rowCount / totalReviews) * 100) : 0;

        const rowEl = document.querySelector(`.rev-dist-row[data-rating="${star}"]`);
        if (rowEl) {
          const fillEl = rowEl.querySelector('.rev-dist-fill');
          const pctEl = rowEl.querySelector('.rev-dist-pct');

          if (fillEl) fillEl.style.width = `${pct}%`;
          if (pctEl) pctEl.textContent = `${pct}%`;
        }
      }

      // Update Trust Metrics Column
      const verifiedMetricVal = document.getElementById('metric-verified-users');
      if (verifiedMetricVal) {
        const verifiedPct = totalReviews > 0 ? Math.round((verifiedCount / totalReviews) * 100) : 100;
        verifiedMetricVal.textContent = `${verifiedPct}%`;
      }

    } catch (err) {
      console.error("Failed to load statistics:", err);
    }
  }

  // Fetch and Render Review Cards
  async function fetchReviews() {
    if (!sb) return;

    if (reviewsGrid) {
      reviewsGrid.innerHTML = `
        <div style="grid-column: 1/-1; display:flex; justify-content:center; align-items:center; padding: 4rem 2rem;">
          <svg class="animate-spin" viewBox="0 0 24 24" style="width:36px; height:36px; color:var(--cyan); animation: spin 1s linear infinite;">
            <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="4" style="opacity:0.25;"></circle>
            <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      `;
    }

    try {
      // Build filters using Postgrest query
      let query = sb
        .from('reviews')
        .select('*', { count: 'exact' })
        .eq('status', 'approved');

      // 1. Star Rating filter
      if (currentFilters.rating !== 'all') {
        const ratingNum = parseInt(currentFilters.rating, 10);
        query = query.eq('rating', ratingNum);
      }

      // 2. Verified Only filter
      if (currentFilters.verifiedOnly) {
        query = query.eq('is_verified', true);
      }

      // 3. Media Only filter
      if (currentFilters.mediaOnly) {
        query = query.neq('media_urls', '{}');
      }

      // 4. Keyword Text Search (Title/Comment search)
      if (currentFilters.search) {
        const searchWord = currentFilters.search.toLowerCase();
        // Since Postgres searches are better handled using ilike on columns,
        // we can filter using or(title.ilike.%search%,comment.ilike.%search%)
        query = query.or(`title.ilike.%${searchWord}%,comment.ilike.%${searchWord}%,reviewer_name.ilike.%${searchWord}%`);
      }

      // 5. Sort Order
      if (currentFilters.sortBy === 'most_recent') {
        query = query.order('created_at', { ascending: false });
      } else if (currentFilters.sortBy === 'highest') {
        query = query.order('rating', { ascending: false }).order('created_at', { ascending: false });
      } else if (currentFilters.sortBy === 'helpful') {
        query = query.order('helpful_count', { ascending: false }).order('created_at', { ascending: false });
      }

      // 6. Pagination limits
      const rangeStart = (currentPage - 1) * pageSize;
      const rangeEnd = rangeStart + pageSize - 1;
      query = query.range(rangeStart, rangeEnd);

      const { data, count, error } = await query;

      if (error) throw error;

      renderReviewsGrid(data);
      renderPagination(count);

    } catch (err) {
      console.error("Failed to fetch reviews:", err);
      if (reviewsGrid) {
        reviewsGrid.innerHTML = `
          <div class="rev-empty-state">
            <div class="rev-empty-icon">⚠️</div>
            <h3>Unable to Load Reviews</h3>
            <p>We had trouble connecting to the reviews database. Please reload or check back in a moment.</p>
          </div>
        `;
      }
    }
  }

  function renderReviewsGrid(reviews) {
    if (!reviewsGrid) return;

    if (!reviews || reviews.length === 0) {
      reviewsGrid.innerHTML = `
        <div class="rev-empty-state">
          <div class="rev-empty-icon">✍️</div>
          <h3>No Reviews Found</h3>
          <p>Be the first one to share your active coding learning path and experience with the community!</p>
        </div>
      `;
      return;
    }

    const helpfulVoted = getVotedReviews('helpful');
    const reportVoted = getVotedReviews('report');

    let cardsHtml = '';
    reviews.forEach(rev => {
      // Format Date
      const dateObj = new Date(rev.created_at);
      const formattedDate = dateObj.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });

      // Cohort string
      const cohortStr = rev.cohort_date ? `Cohort: ${rev.cohort_date}` : 'Self-Paced Learner';

      // Verified Learner indicator
      const verifiedBadgeHtml = rev.is_verified ? `
        <span class="badge-verified">
          <svg fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M6.267 3.455a.75.75 0 00-.708-.523H4.56a2.25 2.25 0 00-2.25 2.25v1.077c0 .29.17.554.435.683l2.66 1.33a.75.75 0 01.378.498l1.04 3.638a1.5 1.5 0 002.836-.055l1.07-3.21a.75.75 0 01.474-.474l3.21-1.07a1.5 1.5 0 00-.055-2.836l-3.638-1.04a.75.75 0 01-.498-.378l-1.33-2.66a.75.75 0 00-.683-.435v-.076z" clip-path="evenodd"></path><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"></path></svg>
          Verified Learner
        </span>
      ` : '';

      // Stars rendering
      let starsHtml = '';
      for (let i = 1; i <= 5; i++) {
        if (i <= rev.rating) {
          starsHtml += `<svg fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>`;
        } else {
          starsHtml += `<svg class="muted" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>`;
        }
      }

      // Pros/Cons lists
      let prosConsHtml = '';
      if ((rev.pros && rev.pros.length > 0) || (rev.cons && rev.cons.length > 0)) {
        prosConsHtml = `<div class="rev-pros-cons-grid">`;
        if (rev.pros && rev.pros.length > 0) {
          rev.pros.forEach(pro => {
            prosConsHtml += `
              <div class="rev-pro-block">
                <span class="rev-pro-indicator">PRO</span>
                <div>${pro}</div>
              </div>
            `;
          });
        }
        if (rev.cons && rev.cons.length > 0) {
          rev.cons.forEach(con => {
            prosConsHtml += `
              <div class="rev-con-block">
                <span class="rev-con-indicator">CON</span>
                <div>${con}</div>
              </div>
            `;
          });
        }
        prosConsHtml += `</div>`;
      }

      // Media Attachments
      let mediaHtml = '';
      if (rev.media_urls && rev.media_urls.length > 0) {
        mediaHtml = `<div style="display:flex; gap:8px; margin-top:8px; flex-wrap:wrap;">`;
        rev.media_urls.forEach(url => {
          const isVideo = url.match(/\.(mp4|webm|ogg|mov)$/i) || url.includes('youtube.com') || url.includes('youtu.be');
          if (isVideo) {
            mediaHtml += `
              <a href="${url}" target="_blank" style="position:relative; width:64px; height:64px; border-radius:8px; border:1px solid rgba(255,255,255,0.08); overflow:hidden; background:rgba(0,0,0,0.4); display:flex; align-items:center; justify-content:center; font-size:20px; text-decoration:none;">
                🎬
                <span style="position:absolute; bottom:2px; right:4px; font-size:8px; color:var(--cyan); font-weight:700; background:rgba(0,0,0,0.6); padding:1px 3px; border-radius:3px;">VIDEO</span>
              </a>
            `;
          } else {
            mediaHtml += `
              <a href="${url}" target="_blank" style="width:64px; height:64px; border-radius:8px; border:1px solid rgba(255,255,255,0.08); overflow:hidden; display:block;">
                <img src="${url}" alt="Attachment" style="width:100%; height:100%; object-fit:cover;" onerror="this.src='https://placehold.co/64x64/161c2d/00E6F6?text=Image';">
              </a>
            `;
          }
        });
        mediaHtml += `</div>`;
      }

      // Helpful indicator status
      const isHelpfulActive = helpfulVoted.includes(rev.id);
      const helpfulClass = isHelpfulActive ? 'active' : '';

      // Report status
      const isReportedActive = reportVoted.includes(rev.id);
      const reportClass = isReportedActive ? 'active' : '';

      // Recommendation indicator
      const recommendBadge = rev.recommend ? `
        <div class="rev-recommend-badge yes">
          <svg fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0110 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.746 3.746 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.745 3.745 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"></path></svg>
          <span>Recommends Course</span>
        </div>
      ` : `
        <div class="rev-recommend-badge no">
          <svg fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          <span>No Recommendation</span>
        </div>
      `;

      // Profile picture / Avatar setup
      let avatarHtml = '';
      if (rev.reviewer_avatar) {
        avatarHtml = `<img class="rev-avatar" src="${rev.reviewer_avatar}" alt="${rev.reviewer_name}" onerror="this.outerHTML='<div class=&quot;rev-avatar&quot; style=&quot;background:${getAvatarGradient(rev.reviewer_name)}; border-color:${getAvatarBorderColor(rev.reviewer_name)}; color:${getAvatarTextColor(rev.reviewer_name)}&quot;>${rev.reviewer_name.substring(0,2).toUpperCase()}</div>'">`;
      } else {
        avatarHtml = `
          <div class="rev-avatar" style="background: ${getAvatarGradient(rev.reviewer_name)}; border-color: ${getAvatarBorderColor(rev.reviewer_name)}; color: ${getAvatarTextColor(rev.reviewer_name)};">
            ${rev.reviewer_name.substring(0, 2).toUpperCase()}
          </div>
        `;
      }

      cardsHtml += `
        <div class="rev-card reveal visible" data-id="${rev.id}">
          <div class="rev-card-header">
            <div class="rev-user-info">
              ${avatarHtml}
              <div class="rev-user-meta">
                <div class="rev-user-name">
                  ${rev.reviewer_name}
                  ${verifiedBadgeHtml}
                </div>
                <div class="rev-user-cohort">${cohortStr}</div>
              </div>
            </div>
            <div class="rev-card-date">${formattedDate}</div>
          </div>
          
          <div class="rev-card-stars">
            ${starsHtml}
          </div>
          
          <div class="rev-card-title">${rev.title}</div>
          <div class="rev-card-comment">${rev.comment}</div>
          
          ${mediaHtml}
          ${prosConsHtml}
          
          <div class="rev-card-footer">
            ${recommendBadge}
            <div class="rev-actions-row">
              <button class="btn-rev-action helpful-btn ${helpfulClass}" data-id="${rev.id}">
                <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.601m-1.9-1.601h.008v.008H4.267v-.008zM6 18.75a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0z"></path></svg>
                <span>Helpful (<span class="helpful-count-number">${rev.helpful_count || 0}</span>)</span>
              </button>
              
              <button class="btn-rev-action flag-btn ${reportClass}" data-id="${rev.id}" title="Report as Inappropriate">
                <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-.005-10.499l-3.11.732a9 9 0 01-6.085-.711l-.108-.054a9 9 0 00-6.208-.682L3 4.5M3 15V4.5"></path></svg>
              </button>
            </div>
          </div>
        </div>
      `;
    });

    reviewsGrid.innerHTML = cardsHtml;

    // Attach Action Row Click Listeners
    reviewsGrid.querySelectorAll('.helpful-btn').forEach(btn => {
      btn.addEventListener('click', async () => {
        const id = btn.dataset.id;
        if (getVotedReviews('helpful').includes(id)) {
          alert("You've already found this review helpful.");
          return;
        }
        await handleVoteAction(id, 'helpful', btn);
      });
    });

    reviewsGrid.querySelectorAll('.flag-btn').forEach(btn => {
      btn.addEventListener('click', async () => {
        const id = btn.dataset.id;
        if (getVotedReviews('report').includes(id)) {
          alert("You've already reported this review.");
          return;
        }
        const confirmFlag = confirm("Are you sure you want to flag this review as inappropriate?");
        if (confirmFlag) {
          await handleVoteAction(id, 'report', btn);
        }
      });
    });
  }

  // Handle Helpful / Report Database Writing Actions
  async function handleVoteAction(reviewId, type, buttonEl) {
    if (!sb) return;

    // 1. Optimistic UI update
    buttonEl.classList.add('active');
    buttonEl.disabled = true;

    if (type === 'helpful') {
      const numberEl = buttonEl.querySelector('.helpful-count-number');
      if (numberEl) {
        const currentCount = parseInt(numberEl.textContent, 10) || 0;
        numberEl.textContent = currentCount + 1;
      }
    }

    try {
      // 2. Insert into review_votes (handles double click blocks via table constraint)
      const { error: voteErr } = await sb
        .from('review_votes')
        .insert({
          review_id: reviewId,
          client_uuid: clientUuid,
          vote_type: type
        });

      if (voteErr) throw voteErr;

      // 3. Update count on public.reviews
      // To bypass RLS and perform directly without transaction mismatch, we pull the exact record,
      // increment count, and commit update.
      const { data: currentRev, error: fetchErr } = await sb
        .from('reviews')
        .select('helpful_count, reported_count')
        .eq('id', reviewId)
        .single();

      if (fetchErr) throw fetchErr;

      const updates = {};
      if (type === 'helpful') {
        updates.helpful_count = (currentRev.helpful_count || 0) + 1;
      } else {
        updates.reported_count = (currentRev.reported_count || 0) + 1;
        // If reported count is heavily flagged, toggle pending flag
        if (updates.reported_count >= 5) {
          updates.status = 'flagged';
        }
      }

      const { error: updateErr } = await sb
        .from('reviews')
        .update(updates)
        .eq('id', reviewId);

      if (updateErr) throw updateErr;

      // Persist voted review status in browser storage
      addVotedReview(type, reviewId);

      if (type === 'report') {
        showSleekToast("Review Flagged for Moderation.");
        // Reload page to remove the flagged review if status was changed
        await fetchReviews();
      }

    } catch (err) {
      console.error(`Failed to record ${type} vote:`, err);
      // Revert optimistic state
      buttonEl.classList.remove('active');
      buttonEl.disabled = false;
      if (type === 'helpful') {
        const numberEl = buttonEl.querySelector('.helpful-count-number');
        if (numberEl) {
          const currentCount = parseInt(numberEl.textContent, 10) || 0;
          numberEl.textContent = Math.max(0, currentCount - 1);
        }
      }
    }
  }

  // Pagination UI Controller
  function renderPagination(totalCount) {
    if (!paginationContainer) return;

    if (!totalCount || totalCount <= pageSize) {
      paginationContainer.innerHTML = '';
      return;
    }

    const totalPages = Math.ceil(totalCount / pageSize);

    paginationContainer.innerHTML = `
      <button class="btn-pagination" id="btn-prev" ${currentPage === 1 ? 'disabled' : ''}>
        <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5"></path></svg>
      </button>
      <span>Page ${currentPage} of ${totalPages}</span>
      <button class="btn-pagination" id="btn-next" ${currentPage === totalPages ? 'disabled' : ''}>
        <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"></path></svg>
      </button>
    `;

    document.getElementById('btn-prev')?.addEventListener('click', async () => {
      if (currentPage > 1) {
        currentPage--;
        await fetchReviews();
        scrollToReviewsTop();
      }
    });

    document.getElementById('btn-next')?.addEventListener('click', async () => {
      if (currentPage < totalPages) {
        currentPage++;
        await fetchReviews();
        scrollToReviewsTop();
      }
    });
  }

  function scrollToReviewsTop() {
    const section = document.getElementById('testimonials');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // Refresh both analytics and matching card pages
  async function refreshAllData() {
    await Promise.all([
      refreshStats(),
      fetchReviews()
    ]);
  }

  // Dynamic Event Listener Hookups for Toolbar Controls
  if (searchInput) {
    let searchDebounce;
    searchInput.addEventListener('input', () => {
      clearTimeout(searchDebounce);
      searchDebounce = setTimeout(async () => {
        currentFilters.search = searchInput.value;
        currentPage = 1;
        await fetchReviews();
      }, 350);
    });
  }

  if (ratingFilter) {
    ratingFilter.addEventListener('change', async () => {
      currentFilters.rating = ratingFilter.value;
      currentPage = 1;
      await fetchReviews();
    });
  }

  if (sortFilter) {
    sortFilter.addEventListener('change', async () => {
      currentFilters.sortBy = sortFilter.value;
      currentPage = 1;
      await fetchReviews();
    });
  }

  if (verifiedCheckbox) {
    verifiedCheckbox.addEventListener('change', async () => {
      currentFilters.verifiedOnly = verifiedCheckbox.checked;
      currentPage = 1;
      await fetchReviews();
    });
  }

  if (mediaCheckbox) {
    mediaCheckbox.addEventListener('change', async () => {
      currentFilters.mediaOnly = mediaCheckbox.checked;
      currentPage = 1;
      await fetchReviews();
    });
  }

  // Handle active user enrollment session tracking silently
  (async () => {
    if (!sb) return;
    try {
      const { data: { session } } = await sb.auth.getSession();
      if (session) {
        activeUser = session.user;
      }
    } catch {
      // fail silently - fallback to guest mode
    }
  })();

  // View/Toggle Reviews Expand Controller
  const toggleBtn = document.getElementById('btnToggleReviews');
  const collapseArea = document.getElementById('reviewsCollapseArea');
  
  if (toggleBtn && collapseArea) {
    toggleBtn.addEventListener('click', () => {
      const isExpanded = collapseArea.classList.contains('expanded');
      
      if (isExpanded) {
        collapseArea.classList.remove('expanded');
        toggleBtn.classList.remove('active');
        toggleBtn.setAttribute('aria-expanded', 'false');
        toggleBtn.querySelector('span').textContent = 'View Reviews';
        
        // Smoothly scroll user to the reviews dashboard top when collapsing
        const dashboard = document.querySelector('.reviews-dashboard');
        if (dashboard) {
          dashboard.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      } else {
        collapseArea.classList.add('expanded');
        toggleBtn.classList.add('active');
        toggleBtn.setAttribute('aria-expanded', 'true');
        toggleBtn.querySelector('span').textContent = 'Hide Reviews';
        
        // Smoothly scroll down slightly so reviews content comes into viewport focus
        setTimeout(() => {
          collapseArea.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 150);
      }
    });
  }

  // Initial Load Trigger
  refreshAllData();
});
