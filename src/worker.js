const cacheName = 'lemur-timer';

const urlsToCache = [
  '/',
  '/application.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(cacheName)
          .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) { return response; }
        return fetch(event.request);
      }
    )
  );
});
