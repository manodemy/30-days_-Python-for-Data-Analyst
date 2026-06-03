const CACHE_NAME = 'manodemy-static-cache-v7';
const DYNAMIC_CACHE_NAME = 'manodemy-dynamic-cache-v7';

// Static assets to precache immediately
const PRECACHE_ASSETS = [
  '/favicon.ico',
  '/landing_v2/styles.css',
  '/notebook.css',
  '/notebook.js',
  '/voice.js',
  '/chart.js',
  '/supabase.js',
  '/landing_v2/reviews.js'
];

// Install Event - Pre-cache core files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('[Service Worker] Precaching core static assets');
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

  // 3. CACHE-FIRST Strategy for assets, styles, scripts, and fonts
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(event.request).then(response => {
        if (
          response.status === 200 &&
          (url.pathname.endsWith('.css') ||
           url.pathname.endsWith('.js') ||
           url.pathname.endsWith('.woff2') ||
           url.pathname.endsWith('.png') ||
           url.pathname.endsWith('.jpg') ||
           url.pathname.endsWith('.svg'))
        ) {
          const responseClone = response.clone();
          caches.open(DYNAMIC_CACHE_NAME).then(cache => {
            cache.put(event.request, responseClone);
          });
        }
        return response;
      });
    })
  );
});
