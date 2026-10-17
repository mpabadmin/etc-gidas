'use strict';
const app = document.getElementById('app');
const backBtn = document.getElementById('back');
let depth = 0;
let night = !!LS.get('etc-naktis', false); // naktinis raudonas režimas
const dec = s => { try { return decodeURIComponent(s); } catch (e) { return s; } };
// Sąrašo apačioje: išvalyti šio sąrašo žymėjimus (dabartinio sužeistojo; su „Atšaukti“). Naujas sužeistasis – juostos „+“.
const clrCk = (p, q) => { let id = ''; try { id = HCFG().listOf(p, q || {}); } catch (e) {} if (!id) return ''; const n = (ckAll()[id] || []).length;
  return `<button class="btn" data-act="ck-clr" data-l="${esc(id)}" style="width:100%;margin-top:16px"${n ? '' : ' disabled'}>Išvalyti žymėjimus${n ? ' (' + n + ')' : ''}</button>`; };
// „Išvalyti žymėjimus“ mygtuko būsena po žymėjimo (be perpiešimo)
const ckBtn = l => { const cb = app.querySelector('[data-act=ck-clr]'); if (!cb || cb.dataset.l !== l) return; const n = (ckAll()[l] || []).length; cb.disabled = !n; cb.textContent = 'Išvalyti žymėjimus' + (n ? ' (' + n + ')' : ''); };
// Seni maršrutai: MIST kortelė ir vaistų žymėjimas – paciento ekrane (MIST mokymosi režime lieka atskiras puslapis su paaiškinimais)
const REDIR = p => p[0] === 'zymejimas' ? '#/pacientas?t=vaistai' : p[0] === 'mist' && mode !== 'learn' ? '#/pacientas?t=kortele' : '';
const PT_BAR = ['zymejimas', 'nudegimai', 'pilnas-kraujas']; // įrankiai, virš kurių rodoma pacientų juosta
const FB_PAGES = ['v', 's', 'vaistai', 'vaistas', 'igudis', 'tema', 'p', '9line', 'mist', 'gks', 'tst', 'sitrep', 'zymejimas', 'nudegimai', 'pilnas-kraujas', 'scenarijai', 'mascal', 'pacientas', 'qr', 'qr-priimti', 'egzaminas', 'korteles', 'skenuoti', 'vertinimas'];
const fbLink = () => '<button class="btn fbrow" data-act="fb">Pastebėjote klaidą ar turite pasiūlymą? Praneškite</button>';

function route() {
  const raw = (location.hash || '#/').slice(1), qi = raw.indexOf('?'), q = {};
  const path = qi < 0 ? raw : raw.slice(0, qi);
  if (qi >= 0) raw.slice(qi + 1).split('&').forEach(kv => { const i = kv.indexOf('='); if (i > 0) q[kv.slice(0, i)] = dec(kv.slice(i + 1)); });
  return { p: path.split('/').filter(Boolean).map(dec), q };
}

function view(p, q) {
  switch (p[0]) {
    case undefined: return V.home();
    case 'v': return V.role(p[1], +q.f || 0) + clrCk(p, q);
    case 's': return V.list(p[1]) + clrCk(p, q);
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
    case 'idiegimas': return V.install();
    case '9line': return NL.view();
    case 'mist': return MC.view();
    case 'gks': return GK.view();
    case 'tst': return TS.view();
    case 'sitrep': return SR.view();
    case 'zymejimas': return VZ.view();
    case 'nudegimai': return NB.view();
    case 'mascal': return MS.view(q);
    case 'pilnas-kraujas': return KR.view();
    case 'scenarijai': return SC.view(p[1], q);
    case 'pacientas': return HUB.view(q);
    case 'qr': case 'qr-priimti': return QR.view(p[0]);
    case 'egzaminas': return EX.view(p[1]);
    case 'korteles': return FC.view();
    case 'vertinimas': return VL.view(p[1]);
    case 'skenuoti': return SK.view();
    default: return notFound();
  }
}

function render() {
  const { p, q } = route();
  document.body.className = night ? 'field night' : mode; // naktinis režimas – visada tamsi paletė + raudonas filtras
  document.getElementById('mF').classList.toggle('on', mode === 'field');
  document.getElementById('mL').classList.toggle('on', mode === 'learn');
  backBtn.style.display = p.length ? '' : 'none'; // pradžios ekrane vietoje „Atgal“ – atnaujinimo mygtukas dešinėje
  const ub = document.getElementById('upd'); if (ub) ub.style.display = p.length ? 'none' : '';
  const sec = { vaistai: 'vaistai', vaistas: 'vaistai', igudziai: 'igudziai', igudis: 'igudziai', temos: 'home', tema: 'home', p: 'home', sarasai: 'sarasai', s: 'sarasai', v: 'sarasai', '9line': 'home', mist: 'pacientas', gks: 'home', tst: 'home', sitrep: 'home', zymejimas: 'pacientas', nudegimai: 'home', mascal: 'home', 'pilnas-kraujas': 'home', scenarijai: 'igudziai', pacientas: 'pacientas', qr: 'pacientas', 'qr-priimti': 'pacientas', egzaminas: 'sarasai', korteles: 'vaistai', skenuoti: 'home', vertinimas: 'sarasai' }[p[0]] || (p.length ? '' : 'home');
  document.querySelectorAll('#nav a').forEach(a => a.classList.toggle('on', a.dataset.s === sec));
  try { PT.sync(); } catch (e) { console.error(e); }
  if (typeof DICT !== 'undefined') DICT.stop();
  let pb = ''; try { pb = HUB.bar(p[0]); } catch (e) { console.error(e); } // sužeistojo juosta virš apatinės navigacijos (ir atvertas langas)
  if (pb) document.body.classList.add('hasbar');
  if (pb && HUB.isOpen()) document.body.classList.add('hbopen');
  try { app.innerHTML = (PT_BAR.indexOf(p[0]) >= 0 ? PT.bar() : '') + view(p, q) + (FB_PAGES.indexOf(p[0]) >= 0 ? fbLink() : '') + pb; }
  catch (err) { console.error(err); app.innerHTML = '<h1>Klaida</h1><p class="muted">Nepavyko atidaryti puslapio. Patikrinkite turinio failus.</p>'; }
  try { HUB.nav(); } catch (e) { console.error(e); }
  // MIST sužeistųjų skirtukai: pasirinktas – matomas
  app.querySelectorAll('.ptabs').forEach(sc => { const b = sc.querySelector('button.on'), add = sc.querySelector('.add'); if (b && sc.scrollWidth > sc.clientWidth) { const av = sc.clientWidth - (add ? add.offsetWidth + 12 : 0); sc.scrollLeft = Math.max(0, b.offsetLeft - (av - b.offsetWidth) / 2); } });
  try { QR.after(p[0]); DICT.enhance(app); SK.after(p[0]); } catch (e) { console.error(e); }
  if (p[0] === 'paieska') { const i = document.getElementById('qs'); if (i) { i.focus(); try { i.setSelectionRange(i.value.length, i.value.length); } catch (e) {} } }
}

function onNav(first) {
  { const r = REDIR(route().p); if (r) { try { history.replaceState(history.state, '', r); } catch (e) { location.replace(r); return; } } }
  const { p, q } = route(), s = history.state;
  if (!(s && s.d != null)) { try { LU.onRoute(p, q); } catch (e) { console.error(e); } } // dažniausi sąrašai: tik naujas perėjimas (ne atgal / pirmyn / perkrovimas)
  HUB.close();
  depth = !p.length ? 0 : (s && s.d != null ? s.d : (first ? 0 : depth + 1));
  history.replaceState({ d: depth }, '');
  tmEdit = null;
  if (!first) VZ.close();
  render();
  if (!first) scrollTo(0, 0);
  HUB.after();
}

function setMode(m) { if (m === mode) return; mode = m; LS.set('etc-rezimas', m); tmEdit = null; render(); }

addEventListener('hashchange', () => onNav(false));
backBtn.onclick = () => { if (depth > 0) history.back(); else location.replace('#/'); };
document.getElementById('mF').onclick = () => setMode('field');
document.getElementById('mL').onclick = () => setMode('learn');
document.getElementById('fbb').onclick = () => FB.open();
document.getElementById('srch').onclick = () => { if (route().p[0] !== 'paieska') location.hash = '#/paieska'; };

app.addEventListener('click', e => {
  const el = e.target.closest('[data-act]');
  if (!el) return;
  const d = el.dataset;
  // Įrankiai (tools.js): 9-Line, MIST kortelė, GKS, TST
  if (/^nl-/.test(d.act)) { NL.act(el); return; }
  if (/^mc-/.test(d.act)) { MC.act(el, e); return; }
  if (/^gk-/.test(d.act)) { GK.act(el); return; }
  if (/^ts-/.test(d.act)) { TS.act(el); return; }
  if (/^sr-/.test(d.act)) { SR.act(el); return; }
  if (/^vz-/.test(d.act)) { VZ.act(el); return; }
  if (/^nb-/.test(d.act)) { NB.act(el); return; }
  if (/^ms-/.test(d.act)) { MS.act(el); return; }
  if (/^kr-/.test(d.act)) { KR.act(el, e); return; }
  if (/^sc-/.test(d.act)) { SC.act(el); return; }
  if (/^pt-/.test(d.act)) { PT.act(el); return; }
  if (/^hb-/.test(d.act)) { HUB.act(el); return; }
  if (/^rem-/.test(d.act)) { REM.act(el); return; }
  if (/^qr-/.test(d.act)) { QR.act(el); return; }
  if (/^ex-/.test(d.act)) { EX.act(el); return; }
  if (/^vl-/.test(d.act)) { VL.act(el); return; }
  if (/^sk-/.test(d.act)) { SK.act(el); return; }
  if (/^fc-/.test(d.act)) { FC.act(el); return; }
  if (/^op-/.test(d.act)) { OP.act(el); return; }
  if (/^gl-/.test(d.act)) { GL.act(el); return; }
  switch (d.act) {
    case 'ck': ckToggle(d.l, +d.i); el.classList.toggle('on'); updCount(el.closest('.cl')); ckBtn(d.l); if (navigator.vibrate) navigator.vibrate(15); break;
    case 'go': location.hash = d.r; break;
    case 'toc': { const t = document.getElementById(d.t); if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' }); break; }
    case 'mp4': {
      const v = document.createElement('video');
      v.src = d.src; v.controls = true; v.autoplay = true; v.playsInline = true; v.preload = 'auto';
      el.classList.remove('vthumb', 'vmp4'); el.removeAttribute('data-act'); el.innerHTML = ''; el.appendChild(v);
      break;
    }
    case 'yt': {
      const f = document.createElement('iframe');
      f.src = 'https://www.youtube-nocookie.com/embed/' + d.id + '?autoplay=1&rel=0';
      f.title = 'Vaizdo įrašas'; f.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen'; f.allowFullscreen = true;
      el.classList.remove('vthumb'); el.removeAttribute('style'); el.removeAttribute('data-act'); el.innerHTML = ''; el.appendChild(f);
      break;
    }
    case 'tm': MC.sheet('time', { field: d.k }); break; // laiko langas – tas pats visur (kartu su MIST kortele)
    case 'ck-clr': {
      const all = ckAll(), prev = all[d.l]; if (!prev || !prev.length) break;
      delete all[d.l]; LS.set('etc-ck', all); { const y = scrollY; render(); scrollTo(0, y); }
      toastAct('Žymėjimai išvalyti', 'Atšaukti', () => { const a = ckAll(); a[d.l] = prev; LS.set('etc-ck', a); const y = scrollY; render(); scrollTo(0, y); });
      break;
    }
    case 'ok': LS.set('etc-ok', true); el.closest('.warn').remove(); break;
    case 'w': LS.set('etc-svoris', +d.w); wOther = false; render(); break;
    case 'w-other': { wOther = !wOther; const y = scrollY; render(); scrollTo(0, y); if (wOther) { const i = document.getElementById('w-in'); if (i) i.focus(); } break; }
    case 'w-ok': { const i = document.getElementById('w-in'), v = i ? parseFloat(String(i.value).replace(',', '.')) : NaN; if (!(v >= 3 && v <= 250)) { toast('Svoris: 3–250 kg'); if (i) i.focus(); break; } LS.set('etc-svoris', Math.round(v)); wOther = false; toast('Svoris ' + Math.round(v) + ' kg – šiam pacientui'); const y = scrollY; render(); scrollTo(0, y); break; }
    case 'rate': {
      const R = LS.get('etc-ivert', {}), v = +d.v;
      if (R[d.id] === v) delete R[d.id]; else R[d.id] = v;
      LS.set('etc-ivert', R); render(); break;
    }
    case 'new-pt': { const prev = PT.list().cur; PT.add(); render(); PT.added(prev); break; } // kitas sužeistasis; ankstesni lieka sąraše
    case 'hide': LS.set('etc-slepti', !hide()); IDX = null; render(); break;
    case 'reset-ivert': if (confirm('Ištrinti visus įsivertinimus?')) { LS.set('etc-ivert', {}); render(); } break;
    case 'fb': FB.open(); break;
    case 'fb-flush':
      if (!FB.configured()) { alert('Pranešimų priėmimas dar neįjungtas. Pranešimai bus išsiųsti automatiškai, kai jis veiks.'); break; }
      if (!navigator.onLine) { alert('Nėra interneto ryšio.'); break; }
      el.disabled = true; FB.flush().then(n => { alert(n ? 'Išsiųsta: ' + n + '.' : 'Išsiųsti nepavyko – bandysime vėliau.'); render(); }); break;
    case 'install': if (installEv) { installEv.prompt(); installEv.userChoice.finally(() => { installEv = null; render(); }); } break;
    case 'upd':
      if (!navigator.onLine) { alert('Atnaujinti galima tik su interneto ryšiu.'); break; }
      caches.keys().then(ks => Promise.all(ks.map(k => caches.delete(k)))).then(() => location.reload());
      break;
  }
});

app.addEventListener('keydown', e => {
  if (e.key === 'Enter' && e.target && (e.target.id === 'w-in' || e.target.id === 'nb-ml' || e.target.id === 'hb-win')) { e.preventDefault(); const b = app.querySelector(e.target.id === 'w-in' ? '[data-act="w-ok"]' : e.target.id === 'hb-win' ? '[data-act="hb-wok"]' : '[data-act="nb-uo"]'); if (b) b.click(); return; }
  const t = e.target, a = t.dataset && t.dataset.act;
  if (e.key === 'Enter' && /^(yt|mp4)$/.test(a || '')) t.click();
  if ((e.key === 'Enter' || e.key === ' ') && (a === 'nb-r' || a === 'kr-ck' || a === 'ex-ck' || a === 'gl-tg')) { e.preventDefault(); t.dispatchEvent(new MouseEvent('click', { bubbles: true })); return; }
  if ((e.key === 'Enter' || e.key === ' ') && a === 'mc-mdel' && !(t instanceof HTMLButtonElement)) { e.preventDefault(); MC.act(t, e); } // SVG žymė
});

// Įrankių laukai: įvedimas be perpiešimo (time laukams – ir 'change', nes kai kurios naršyklės 'input' nesiunčia)
function toolInput(t) {
  const d = t.dataset || {};
  if (d.nl) { NL.onInput(t); return true; }
  if (d.sr) { SR.onInput(t); return true; }
  if (d.mc || d.mcf || d.mcm != null || d.mctq || d.mcp != null || d.mcr || d.mcas) { MC.onInput(t); return true; }
  if (d.vz) { VZ.onInput(t); return true; }
  if (d.kr) { KR.onInput(t); return true; }
  if (d.ms) { MS.onInput(t); return true; }
  if (d.sk != null) { SK.onInput(t); return true; }
  if (d.vl) { VL.onInput(t); return true; }
  return false;
}
app.addEventListener('change', e => { if (e.target.type === 'time') toolInput(e.target); });

app.addEventListener('input', e => {
  const t = e.target;
  if (toolInput(t)) return;
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

setInterval(() => { if (!tmEdit) updTimers(); VZ.tick(); KR.tick(); REM.tick(); HUB.tick(); }, 30000);
setTimeout(() => REM.tick(), 3000);
addEventListener('keydown', e => { if (e.key === 'Escape' && VZ.isOpen()) { VZ.close(); render(); } else if (e.key === 'Escape' && HUB.isOpen()) HUB.esc(); });
document.addEventListener('visibilitychange', () => { if (!document.hidden && !tmEdit) updTimers(); });
addEventListener('beforeinstallprompt', e => { e.preventDefault(); installEv = e; if (['nustatymai', 'idiegimas', undefined].indexOf(route().p[0]) >= 0) render(); });
if ('serviceWorker' in navigator) addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => {}));

OP.init(); GL.apply();
onNav(true);

// ───────── Atnaujinimas: mygtukas antraštėje (pradžios ekrane, šalia paieškos) ─────────
// Bakstelėjus – tikrinama, ar serveryje yra nauja versija (service worker update); radus – įdiegiama ir puslapis perkraunamas.
// Programėlė tikrina ir pati (atidarius ir grįžus po ≥ 30 min); radus naują versiją mygtukas pažymimas tašku.
const UPD = (() => {
  const btn = document.getElementById('upd');
  let busy = false, avail = false, last = 0, had = !!(navigator.serviceWorker && navigator.serviceWorker.controller), reloading = false;
  const ver = () => String((E && E.versija) || '').split(' (')[0];
  function mark(on) {
    avail = on; if (!btn) return;
    btn.classList.toggle('new', on);
    const t = on ? 'Yra nauja versija – bakstelėkite, kad atnaujintumėte' : 'Tikrinti, ar yra nauja versija';
    btn.setAttribute('aria-label', t); btn.title = t;
  }
  const getReg = () => 'serviceWorker' in navigator ? navigator.serviceWorker.getRegistration().catch(() => null) : Promise.resolve(null);
  function settle(r) { // laukiama, kol nauja versija įsidiegs ir pradės veikti (iki 15 s)
    return new Promise(res => {
      const w = r && (r.installing || r.waiting); if (!w) return res();
      const tm = setTimeout(res, 15000);
      w.addEventListener('statechange', () => { if (w.state === 'activated' || w.state === 'redundant') { clearTimeout(tm); res(); } });
    });
  }
  function reload() { reloading = true; toast('Atnaujinama…'); setTimeout(() => location.reload(), 350); }
  async function check(manual) {
    if (busy) return; busy = true;
    if (manual && btn) btn.classList.add('spin');
    try {
      const r = await getReg();
      if (!r) { if (manual) reload(); return; }
      if (manual && avail) { await settle(r); return reload(); }
      if (manual && navigator.onLine === false) { toast('Nėra interneto ryšio – patikrinti nepavyko'); return; }
      await r.update(); last = Date.now();
      if (r.installing || r.waiting) { mark(true); if (manual) { await settle(r); return reload(); } }
      else if (manual) toast('Naujausia versija · ' + ver());
    } catch (e) { if (manual) toast('Nepavyko patikrinti – nėra ryšio?'); }
    finally { busy = false; if (btn && !reloading) btn.classList.remove('spin'); }
  }
  if (btn) btn.onclick = () => check(true);
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.addEventListener('controllerchange', () => { if (had && !reloading) mark(true); had = true; });
    getReg().then(r => { if (r) r.addEventListener('updatefound', () => { if (had) mark(true); }); });
    addEventListener('load', () => setTimeout(() => check(false), 4000));
    document.addEventListener('visibilitychange', () => { if (!document.hidden && Date.now() - last > 30 * 60000) check(false); });
  }
  return { check, mark, available: () => avail };
})();

// ───────── Naktinis raudonas režimas (mėnulio mygtukas antraštėje; prisimenamas) ─────────
function applyNight() {
  const b = document.getElementById('night');
  if (b) { b.setAttribute('aria-pressed', night); b.title = night ? 'Išjungti naktinį režimą' : 'Naktinis raudonas režimas'; }
  const m = document.querySelector('meta[name="theme-color"]'); if (m) m.content = night ? '#000000' : '#1C1C1B';
}
document.getElementById('night').onclick = () => { night = !night; LS.set('etc-naktis', night); applyNight(); render(); };
applyNight();
