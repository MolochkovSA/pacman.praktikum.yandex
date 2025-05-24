const CACHE_NAME = 'pacman-cache-v1';

const URLS = ['/', '/game', '/leaderboard', '/profile', '/signup', '/login'];

this.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(URLS);
      })
      .catch((err) => {
        console.log(err);
        throw err;
      })
  );
});

this.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(cacheNames.filter((name) => name !== CACHE_NAME).map((name) => caches.delete(name)));
    })
  );
});

this.addEventListener('fetch', (event) => {
  const { request } = event;

  event.respondWith(cacheFirst(request));
});

async function cacheFirst(request) {
  const cachedResponse = await caches.match(request);

  if (cachedResponse) {
    return cachedResponse;
  }

  const fetchRequest = request.clone();

  const response = await fetch(fetchRequest);

  if (!response || response.status !== 200 || response.type !== 'basic') {
    return response;
  }

  const responseToCache = response.clone();

  const cache = await caches.open(CACHE_NAME);

  await cache.put(request, responseToCache);

  return response;
}
