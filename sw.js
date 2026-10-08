const VERSION = 'etc-gidas-v7';
const IMG = 'etc-gidas-img-1';
const FILES = ['./', './index.html', './core.js', './views.js', './fb.js', './vendor/html2canvas.min.js', './app.js', './sarasai.js', './vaistai.js', './igudziai.js', './manifest.webmanifest', './icon-192.png', './icon-512.png', './favicon-32.png', './favicon-64.png', './apple-touch-icon.png', './img/logo-balt.png', './img/logo-juod.png', './img/qr.svg'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(FILES)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== VERSION && k !== IMG).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request, url = new URL(req.url);
  // TCCC (tccc.org.ua) iliustracijos – talpinamos peržiūrėjus, kad veiktų be interneto
  if (req.method === 'GET' && url.hostname === 'tccc.org.ua' && /\.(jpe?g|png|webp)$/i.test(url.pathname)) {
    e.respondWith(caches.open(IMG).then(c => c.match(req).then(hit => hit || fetch(req).then(res => { if (res && (res.ok || res.type === 'opaque')) c.put(req, res.clone()); return res; }))));
    return;
  }
  if (req.method !== 'GET' || url.origin !== self.location.origin) return;
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
