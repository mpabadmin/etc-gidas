const VERSION = 'etc-gidas-v1';
const FILES = ['./', './index.html', './core.js', './views.js', './app.js', './sarasai.js', './vaistai.js', './igudziai.js', './manifest.webmanifest', './icon.svg'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(FILES)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;
  const net = fetch(req).then(res => {
    if (res && res.ok) {
      const copy = res.clone();
      return caches.open(VERSION).then(c => c.put(req, copy)).then(() => res);
    }
    return res;
  });
  e.respondWith(caches.match(req, { ignoreSearch: true }).then(c => c || net));
  e.waitUntil(net.then(() => {}, () => {}));
});
