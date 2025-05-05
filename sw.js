const CACHE_NAME = 'plam-cache-v1'; // Nome do cache
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icons/icon_192x192.png', // Ícone de 192x192
  '/icons/icon_512x512.png', // Ícone de 512x512
  '/icon_180x180.png'
  '/sw.js',
  '/styles.css',  // Adicione aqui os arquivos CSS se necessário
  '/scripts.js',  // Adicione aqui seus arquivos JS se necessário
];

self.addEventListener('install', (event) => {
  // Realiza o cache durante a instalação do Service Worker
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Cache aberto e recursos armazenados');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('activate', (event) => {
  // Remove caches antigos quando o novo Service Worker é ativado
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            // Apaga caches antigos
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  // Intercepta as requisições e responde com o conteúdo cacheado se disponível
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        return response || fetch(event.request); // Se não encontrado no cache, faz uma requisição normal
      })
  );
});
