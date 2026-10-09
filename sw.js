const VERSION = 'etc-gidas-v12';
const IMG = 'etc-gidas-img-1';
const FILES = ['./', './index.html', './core.js', './views.js', './fb.js', './vendor/html2canvas.min.js', './app.js', './sarasai.js', './vaistai.js', './igudziai.js', './manifest.webmanifest', './icon-192.png', './icon-512.png', './favicon-32.png', './favicon-64.png', './apple-touch-icon.png', './img/logo-balt.png', './img/logo-juod.png', './img/qr.svg', './img/tccc/tccc-cmc10__skill-card-ez-io-humerus-intraosseous-io-device-en.webp', './img/tccc/tccc-cmc11__skill-card-tactical-field-care-determining-blood-type-en.webp', './img/tccc/tccc-cmc13__skill-card-penetrating-eye-injury-en.webp', './img/tccc/tccc-cmc17__skill-card-impaled-object-en.webp', './img/tccc/tccc-cmc18__module-18-burns-12.webp', './img/tccc/tccc-cmc7__module-7-airway-management-in-tfc-13.webp', './img/tccc/tccc-cmc8__module-08-respiration-assessment-management-in-tfc-12.webp'];

self.addEventListener('install', e => {
  // cache: 'reload' – apeiti naršyklės HTTP talpyklą (GitHub Pages max-age 600), kad nauja versija gautų naujus failus
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(FILES.map(u => new Request(u, { cache: 'reload' })))));
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
  const net = (req.mode === 'navigate' ? fetch(req) : fetch(req, { cache: 'no-cache' })).then(res => {
    if (res && res.ok) {
      const copy = res.clone();
      return caches.open(VERSION).then(c => c.put(req, copy)).then(() => res);
    }
    return res;
  });
  e.respondWith(caches.match(req, { ignoreSearch: true }).then(c => c || net));
  e.waitUntil(net.then(() => {}, () => {}));
});
