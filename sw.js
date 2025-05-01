cconst CACHE_NAME = "joia-cache-v1";
const urlsToCache = [
  "./index.html",
  "./manifest.json",
  "./style.css",
  "./icon-72x72.png",
  "./icon-96x96.png",
  "./icon-128x128.png",
  "./icon-144x144.png",
  "./icon-152x152.png",
  "./icon-192x192.png",
  "./icon-384x384.png",
  "./icon-512x512.png"
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request);
    })
  );
});
