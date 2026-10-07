'use strict';
const app = document.getElementById('app');
const backBtn = document.getElementById('back');
let depth = 0;
const dec = s => { try { return decodeURIComponent(s); } catch (e) { return s; } };
const newPt = () => '<button class="btn" data-act="new-pt" style="width:100%;margin-top:16px">Naujas pacientas – išvalyti žymėjimus</button>';

function route() {
  const raw = (location.hash || '#/').slice(1), qi = raw.indexOf('?'), q = {};
  const path = qi < 0 ? raw : raw.slice(0, qi);
  if (qi >= 0) raw.slice(qi + 1).split('&').forEach(kv => { const i = kv.indexOf('='); if (i > 0) q[kv.slice(0, i)] = dec(kv.slice(i + 1)); });
  return { p: path.split('/').filter(Boolean).map(dec), q };
}

function view(p, q) {
  switch (p[0]) {
    case undefined: return V.home();
    case 'v': return V.role(p[1], +q.f || 0) + newPt();
    case 's': return V.list(p[1]) + newPt();
    case 'vaistai': return V.drugs();
    case 'vaistas': return V.drug(p[1]);
    case 'igudziai': return V.skills(q);
    case 'temos': return V.topics();
    case 'tema': return V.topic(p[1]);
    case 'sarasai': return V.lists();
    case 'igudis': return V.skill(p[1]);
    case 'p': return V.page(p[1]);
    case 'paieska': return V.search(q.q || '');
    case 'nustatymai': return V.settings();
    default: return notFound();
  }
}

function render() {
  const { p, q } = route();
  document.body.className = mode;
  document.getElementById('mF').classList.toggle('on', mode === 'field');
  document.getElementById('mL').classList.toggle('on', mode === 'learn');
  backBtn.style.visibility = p.length ? 'visible' : 'hidden';
  const sec = { vaistai: 'vaistai', vaistas: 'vaistai', igudziai: 'igudziai', igudis: 'igudziai', temos: 'temos', tema: 'temos', p: 'temos', sarasai: 'sarasai', s: 'sarasai', v: 'sarasai' }[p[0]] || (p.length ? '' : 'home');
  document.querySelectorAll('#nav a').forEach(a => a.classList.toggle('on', a.dataset.s === sec));
  try { app.innerHTML = view(p, q); }
  catch (err) { console.error(err); app.innerHTML = '<h1>Klaida</h1><p class="muted">Nepavyko atidaryti puslapio. Patikrinkite turinio failus.</p>'; }
  if (p[0] === 'paieska') { const i = document.getElementById('qs'); if (i) { i.focus(); try { i.setSelectionRange(i.value.length, i.value.length); } catch (e) {} } }
}

function onNav(first) {
  const { p } = route(), s = history.state;
  depth = !p.length ? 0 : (s && s.d != null ? s.d : (first ? 0 : depth + 1));
  history.replaceState({ d: depth }, '');
  tmEdit = null;
  render();
  if (!first) scrollTo(0, 0);
}

function setMode(m) { if (m === mode) return; mode = m; LS.set('etc-rezimas', m); tmEdit = null; render(); }

addEventListener('hashchange', () => onNav(false));
backBtn.onclick = () => { if (depth > 0) history.back(); else location.replace('#/'); };
document.getElementById('mF').onclick = () => setMode('field');
document.getElementById('mL').onclick = () => setMode('learn');
document.getElementById('srch').onclick = () => { if (route().p[0] !== 'paieska') location.hash = '#/paieska'; };

app.addEventListener('click', e => {
  const el = e.target.closest('[data-act]');
  if (!el) return;
  const d = el.dataset;
  switch (d.act) {
    case 'ck': ckToggle(d.l, +d.i); el.classList.toggle('on'); updCount(el.closest('.cl')); if (navigator.vibrate) navigator.vibrate(15); break;
    case 'go': location.hash = d.r; break;
    case 'toc': { const t = document.getElementById(d.t); if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' }); break; }
    case 'yt': {
      const f = document.createElement('iframe');
      f.src = 'https://www.youtube-nocookie.com/embed/' + d.id + '?autoplay=1&rel=0';
      f.title = 'Vaizdo įrašas'; f.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen'; f.allowFullscreen = true;
      el.classList.remove('vthumb'); el.removeAttribute('style'); el.removeAttribute('data-act'); el.innerHTML = ''; el.appendChild(f);
      break;
    }
    case 'tm': tmEdit = d.k; updTimers(); break;
    case 'tm-now': setTm(Date.now()); break;
    case 'tm-set': {
      const v = (document.getElementById('tm-in') || {}).value;
      if (!v) break;
      const [hh, mm] = v.split(':').map(Number), t = new Date();
      t.setHours(hh, mm, 0, 0);
      if (t.getTime() > Date.now() + 5 * 60000) t.setDate(t.getDate() - 1);
      setTm(t.getTime()); break;
    }
    case 'tm-clr': setTm(null); break;
    case 'tm-x': tmEdit = null; updTimers(); break;
    case 'ok': LS.set('etc-ok', true); el.closest('.warn').remove(); break;
    case 'w': LS.set('etc-svoris', +d.w); render(); break;
    case 'rate': {
      const R = LS.get('etc-ivert', {}), v = +d.v;
      if (R[d.id] === v) delete R[d.id]; else R[d.id] = v;
      LS.set('etc-ivert', R); render(); break;
    }
    case 'new-pt': if (confirm('Naujas pacientas: išvalyti visus pažymėjimus ir laikus?')) { LS.set('etc-ck', {}); LS.set('etc-laikai', {}); render(); } break;
    case 'hide': LS.set('etc-slepti', !hide()); IDX = null; render(); break;
    case 'reset-ivert': if (confirm('Ištrinti visus įsivertinimus?')) { LS.set('etc-ivert', {}); render(); } break;
    case 'install': if (installEv) { installEv.prompt(); installEv.userChoice.finally(() => { installEv = null; render(); }); } break;
    case 'upd':
      if (!navigator.onLine) { alert('Atnaujinti galima tik su interneto ryšiu.'); break; }
      caches.keys().then(ks => Promise.all(ks.map(k => caches.delete(k)))).then(() => location.reload());
      break;
  }
});

app.addEventListener('keydown', e => { if (e.key === 'Enter' && e.target.dataset && e.target.dataset.act === 'yt') e.target.click(); });

app.addEventListener('input', e => {
  const t = e.target;
  if (t.id !== 'q' && t.id !== 'qs') return;
  let res = document.getElementById('res');
  if (!res) { res = document.createElement('div'); res.id = 'res'; t.after(res); }
  const v = t.value, empty = !v.trim();
  res.innerHTML = results(v);
  if (t.id === 'q') {
    Array.from(app.children).forEach(c => { if (c !== t && c !== res) c.style.display = empty ? '' : 'none'; });
    res.style.display = empty ? 'none' : '';
  } else history.replaceState(history.state, '', '#/paieska' + (empty ? '' : '?q=' + encodeURIComponent(v)));
});

setInterval(() => { if (!tmEdit) updTimers(); }, 30000);
document.addEventListener('visibilitychange', () => { if (!document.hidden && !tmEdit) updTimers(); });
addEventListener('beforeinstallprompt', e => { e.preventDefault(); installEv = e; if (route().p[0] === 'nustatymai') render(); });
if ('serviceWorker' in navigator) addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => {}));

onNav(true);
