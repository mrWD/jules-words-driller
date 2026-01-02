const CACHE_NAME = 'language-learning-app-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/signup.html',
  '/choose-language.html',
  '/add-word-options.html',
  '/add-new-word.html',
  '/word-suggestion.html',
  '/my-words.html',
  '/learning-modes.html',
  '/progress.html',
  '/select-group-modal.html',
  '/js/main.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});
