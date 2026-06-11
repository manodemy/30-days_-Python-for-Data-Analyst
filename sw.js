const CACHE_NAME = 'manodemy-static-cache-v29';
const DYNAMIC_CACHE_NAME = 'manodemy-dynamic-cache-v29';

// Static assets to precache immediately (only truly stable assets)
const PRECACHE_ASSETS = [
  '/favicon.ico',
  '/icon-192x192.png',
  '/icon-512x512.png',
  '/chart.js',
  '/supabase.js',
  '/landing_v2/reviews.js'
];

// Install Event - Pre-cache stable assets only
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('[Service Worker] Precaching stable static assets');
      return cache.addAll(PRECACHE_ASSETS);
    }).then(() => self.skipWaiting())
  );
});

// Activate Event - Clean up stale caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME && key !== DYNAMIC_CACHE_NAME) {
            console.log('[Service Worker] Removing old cache:', key);
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Core app files that should ALWAYS be fetched fresh from network
const NETWORK_FIRST_PATHS = [
  '/notebook.css',
  '/notebook.js',
  '/hints.js',
  '/landing_v2/styles.css',
  '/voice.js',
  '/sw.js'
];

// Fetch Event - Dynamic routing and smart caching
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // 1. STRICT BYPASS: Do not cache transactions, auth requests, or dynamic API endpoints
  if (
    url.origin.includes('supabase.co') ||
    url.pathname.includes('/rest/v1/') ||
    url.pathname.includes('/auth/v1/') ||
    url.pathname.includes('/rpc/') ||
    url.pathname.includes('telemetry') ||
    url.pathname.includes('razorpay') ||
    url.pathname.includes('stripe') ||
    event.request.method !== 'GET'
  ) {
    return; // Pass through to network natively
  }

  // 2. NETWORK-FIRST Strategy for HTML pages (keeps curriculum & stats synced when online)
  if (event.request.headers.get('accept')?.includes('text/html') || url.pathname.endsWith('.html')) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          const responseClone = response.clone();
          caches.open(DYNAMIC_CACHE_NAME).then(cache => {
            cache.put(event.request, responseClone);
          });
          return response;
        })
        .catch(() => {
          return caches.match(event.request).then(cachedResponse => {
            if (cachedResponse) return cachedResponse;
            return caches.match('/landing_v2/index.html');
          });
        })
    );
    return;
  }

  // 3. NETWORK-FIRST: Core app CSS/JS (always get latest, fallback to cache offline)
  if (NETWORK_FIRST_PATHS.some(p => url.pathname === p || url.pathname.endsWith(p))) {
    event.respondWith(
      fetch(event.request, { cache: 'no-cache' })
        .then(response => {
          if (response.status === 200) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, responseClone));
          }
          return response;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // 4. CACHE-FIRST Strategy for stable assets (fonts, images, third-party libs, Next.js chunks)
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(event.request).then(response => {
        if (response.status === 200) {
          const isFont = url.pathname.endsWith('.woff2') || url.origin.includes('fonts.gstatic.com') || url.origin.includes('fonts.googleapis.com');
          const isImage = url.pathname.endsWith('.png') || url.pathname.endsWith('.jpg') || url.pathname.endsWith('.svg') || url.pathname.endsWith('.ico');
          const isStaticLib = url.origin.includes('cdnjs.cloudflare.com') || url.origin.includes('cdn.jsdelivr.net');
          const isNextChunk = url.pathname.includes('/_next/static/');

          if (isFont || isImage || isStaticLib || isNextChunk) {
            const responseClone = response.clone();
            caches.open(DYNAMIC_CACHE_NAME).then(cache => {
              cache.put(event.request, responseClone);
            });
          }
        }
        return response;
      });
    })
  );
});
