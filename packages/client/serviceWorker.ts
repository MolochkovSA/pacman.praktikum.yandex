/// <reference lib="webworker" />

const sw = self as unknown as ServiceWorkerGlobalScope;

const CACHE_NAME = 'pacman-cache-v1';
const URLS: string[] = [];

sw.addEventListener('install', (event: ExtendableEvent) => {
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

sw.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(cacheNames.filter((name) => name !== CACHE_NAME).map((name) => caches.delete(name)));
    })
  );
});

sw.addEventListener('fetch', (event: FetchEvent) => {
  const { request } = event;

  if (request.method !== 'GET' || !request.url.startsWith('http')) {
    event.respondWith(fetch(request));
    return;
  }

  const url = new URL(request.url);

  if (URLS.includes(url.pathname)) {
    event.respondWith(cacheFirst(request));
    return;
  }

  event.respondWith(networkFirst(request));
});

async function cacheFirst(request: Request) {
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

async function networkFirst(request: Request): Promise<Response> {
  try {
    const response = await fetch(request);

    if (request.method === 'GET' && response.status === 200 && response.type === 'basic') {
      const cache = await caches.open(CACHE_NAME);
      await cache.put(request, response.clone());
    }

    return response;
  } catch {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }

    return Response.error();
  }
}
