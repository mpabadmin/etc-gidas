'use strict';
const E = window.ETC || {};
const LS = {
  get(k, d) { try { const v = localStorage.getItem(k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
};
let mode = LS.get('etc-rezimas', 'field');
let tmEdit = null, installEv = null, IDX = null;

const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const br = s => esc(s).replace(/\n/g, '<br>');
const fmt = x => String(x >= 100 ? Math.round(x) : x >= 1 ? Math.round(x * 10) / 10 : Math.round(x * 100) / 100).replace('.', ',');
const isDoc = g => /gydytoj/i.test(g || '');
const hide = () => LS.get('etc-slepti', false);
const tagCls = g => isDoc(g) ? 'red' : /kompetencij|medicinos/i.test(g || '') ? 'amb' : 'grn';
const tag = g => g ? `<span class="tag ${tagCls(g)}">${esc(g)}</span>` : '';
const row = (href, title, small, extra) => `<a class="row" href="${href}"><div>${esc(title)}${small ? '<small>' + esc(small) + '</small>' : ''}</div>${extra || ''}<span class="ar">›</span></a>`;
const notFound = () => '<h1>Nerasta</h1><p class="muted">Šio puslapio nėra. Grįžkite į pradžią.</p>';
const hm = ts => { const d = new Date(ts); return String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0'); };
const strip = h => String(h || '').replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();

function norm(s) {
  s = String(s || ''); let o = '';
  for (let i = 0; i < s.length; i++) {
    const n = s[i].toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    o += n.length === 1 ? n : (n[0] || ' ');
  }
  return o;
}

function hl(orig, toks) {
  const n = norm(orig), r = [];
  toks.forEach(t => { let p = n.indexOf(t); while (p >= 0 && t) { r.push([p, p + t.length]); p = n.indexOf(t, p + t.length); } });
  if (!r.length) return esc(orig);
  r.sort((a, b) => a[0] - b[0]);
  const m = [];
  r.forEach(x => { const l = m[m.length - 1]; if (l && x[0] <= l[1]) l[1] = Math.max(l[1], x[1]); else m.push(x.slice()); });
  let o = '', last = 0;
  m.forEach(([a, b]) => { o += esc(orig.slice(last, a)) + '<mark>' + esc(orig.slice(a, b)) + '</mark>'; last = b; });
  return o + esc(orig.slice(last));
}

function snippet(text, toks) {
  const n = norm(text); let p = -1;
  toks.forEach(t => { const q = n.indexOf(t); if (q >= 0 && (p < 0 || q < p)) p = q; });
  if (p < 0) return '';
  const a = Math.max(0, p - 40), b = Math.min(text.length, p + 100);
  return (a > 0 ? '…' : '') + hl(text.slice(a, b), toks) + (b < text.length ? '…' : '');
}

function calc(c, w) {
  if (c.hour) {
    const a = c.per * w, u = c.u || 'mg';
    return fmt(a) + ' ' + u + '/val.' + (c.conc ? ' = ' + fmt(a / c.conc) + ' ml/val.' : '');
  }
  if (c.minute) {
    const a = c.min * w, b = c.max * w;
    return fmt(a) + '–' + fmt(b) + ' mcg/min' + (c.conc ? ' = ' + fmt(a * 60 / c.conc) + '–' + fmt(b * 60 / c.conc) + ' ml/val.' : '');
  }
  let lo = (c.per != null ? c.per : c.min) * w, hi = c.max != null ? c.max * w : null;
  if (c.maxDose) { lo = Math.min(lo, c.maxDose); if (hi != null) hi = Math.min(hi, c.maxDose); }
  const u = c.u || 'mg';
  let s = hi != null ? fmt(lo) + '–' + fmt(hi) + ' ' + u : fmt(lo) + ' ' + u;
  if (c.conc) s += ' = ' + (hi != null ? fmt(lo / c.conc) + '–' + fmt(hi / c.conc) : fmt(lo / c.conc)) + ' ml';
  if (c.maxDose) s += ' (maks. ' + fmt(c.maxDose) + ' ' + u + ')';
  return s;
}

function listRoute(id) {
  for (const r of E.vaidmenys || []) { const i = (r.lists || []).indexOf(id); if (i >= 0) return '#/v/' + r.id + '?f=' + i; }
  return '#/s/' + id;
}

const ckAll = () => LS.get('etc-ck', {});
function ckToggle(id, i) {
  const all = ckAll(), a = all[id] || [], p = a.indexOf(i);
  if (p >= 0) a.splice(p, 1); else a.push(i);
  all[id] = a; LS.set('etc-ck', all);
}

function renderList(id) {
  const L = (E.sarasai || {})[id];
  if (!L) return '<p class="muted">Sąrašas nerastas.</p>';
  const done = ckAll()[id] || [], hd = hide();
  let n = 0, tot = 0, h = '';
  (L.items || []).forEach((it, i) => {
    if (it.h) { h += '<h3>' + esc(it.h) + '</h3>'; return; }
    if (hd && isDoc(it.g)) return;
    tot++;
    const on = done.indexOf(i) >= 0; if (on) n++;
    const sub = (it.s || []).length ? '<ul>' + it.s.map(x => '<li>' + esc(x) + '</li>').join('') + '</ul>' : '';
    const info = mode === 'learn' && it.i ? '<div class="muted">' + it.i + '</div>' : '';
    h += `<div class="ck${on ? ' on' : ''}${it.k ? ' key' : ''}" data-act="ck" data-l="${esc(id)}" data-i="${i}"><span class="bx">✓</span><div class="t">${esc(it.t)} ${tag(it.g)}${sub}${info}</div></div>`;
  });
  const pct = tot ? Math.round(n / tot * 100) : 0;
  return `<div class="cl"><div class="muted cnt">${n} / ${tot}</div><div class="prog"><i style="width:${pct}%"></i></div>${h}</div>`;
}

function updCount(box) {
  const all = box.querySelectorAll('.ck').length, n = box.querySelectorAll('.ck.on').length;
  box.querySelector('.cnt').textContent = n + ' / ' + all;
  box.querySelector('.prog i').style.width = (all ? Math.round(n / all * 100) : 0) + '%';
}

function timersHtml() {
  const T = LS.get('etc-laikai', {}), now = Date.now(), min = ts => Math.max(0, Math.floor((now - ts) / 60000));
  const card = (k, lb, val, st) => `<button class="card" style="flex:1;text-align:left;font:inherit;color:inherit;${st}" data-act="tm" data-k="${k}"><div class="muted">${lb}</div><div style="font-weight:700">${val}</div></button>`;
  const dl = T.trauma ? T.trauma + 3 * 3600e3 : 0;
  let h = '<div style="display:flex;gap:8px">';
  h += card('trauma', 'Trauma', T.trauma ? hm(T.trauma) + ' · ' + min(T.trauma) + ' min' : 'Nenurodyta', '');
  h += card('turn', 'Turniketas', T.turn ? hm(T.turn) + ' · ' + min(T.turn) + ' min' : 'Neuždėtas', T.turn ? 'background:var(--ambbg);color:var(--amb);border-color:var(--ambbg)' : '');
  h += `<div class="card" style="flex:1;${dl && now > dl ? 'background:var(--redbg);color:var(--red);border-color:var(--redbg)' : ''}"><div class="muted">TXA iki</div><div style="font-weight:700">${dl ? (now > dl ? 'Praėjo 3 val.' : hm(dl)) : '—'}</div></div>`;
  h += '</div>';
  if (tmEdit) h += `<div class="card"><div style="font-weight:600;margin-bottom:8px">${tmEdit === 'trauma' ? 'Traumos laikas' : 'Turniketo uždėjimo laikas'}</div><div style="display:flex;gap:8px;flex-wrap:wrap"><button class="btn" data-act="tm-now">Dabar</button><input type="time" id="tm-in"><button class="btn" data-act="tm-set">Nustatyti</button><button class="btn" data-act="tm-clr">Išvalyti</button><button class="btn" data-act="tm-x">Uždaryti</button></div></div>`;
  return h;
}
function updTimers() { const el = document.getElementById('tm'); if (el) el.innerHTML = timersHtml(); }
function setTm(ts) {
  const T = LS.get('etc-laikai', {});
  if (ts) T[tmEdit] = ts; else delete T[tmEdit];
  LS.set('etc-laikai', T); tmEdit = null; updTimers();
}

function disclaimer() {
  if (LS.get('etc-ok', false)) return '';
  return '<div class="warn"><b>Atminties priemonė.</b> Skirta ETC kursą baigusiems komandos nariams. Nepakeičia mokymų, protokolų ir mediko nurodymų. Dozes visada tikrinkite.<div style="margin-top:8px"><button class="btn" data-act="ok">Supratau</button></div></div>';
}

function videoHtml(v) {
  const u = v.url || '', m = u.match(/(?:youtu\.be\/|[?&]v=|shorts\/|embed\/)([\w-]{11})/);
  const cap = '<div class="vcap"><b>' + esc(v.title || 'Vaizdo įrašas') + '</b>' + (v.ch || v.note ? '<small>' + esc([v.ch, v.note].filter(Boolean).join(' · ')) + '</small>' : '') + '</div>';
  if (m) return `<div class="vbox"><div class="video vthumb" role="button" tabindex="0" data-act="yt" data-id="${m[1]}" aria-label="Paleisti: ${esc(v.title || 'video')}" style="background-image:url('https://i.ytimg.com/vi/${m[1]}/hqdefault.jpg')"><span class="play">▶</span></div>${cap}<a class="muted" href="https://www.youtube.com/watch?v=${m[1]}" target="_blank" rel="noopener">Atidaryti YouTube ↗</a></div>`;
  if (/\.(mp4|webm)(\?|$)/i.test(u)) return `<div class="vbox"><div class="video vthumb vmp4" role="button" tabindex="0" data-act="mp4" data-src="${esc(u)}" aria-label="Paleisti: ${esc(v.title || 'video')}"><span class="vt">${esc(v.title || 'Vaizdo įrašas')}</span><span class="play">▶</span></div>${cap}${v.page ? `<a class="muted" href="${esc(v.page)}" target="_blank" rel="noopener">Atidaryti tccc.org.ua ↗</a>` : ''}</div>`;
  return `<a class="row" href="${esc(u)}" target="_blank" rel="noopener">${esc(v.title || u)}<span class="ar">↗</span></a>`;
}

function buildIdx() {
  const I = [];
  const add = (kind, title, sub, text, r) => I.push({ kind, title, sub: sub || '', text: text || '', r, n: norm(title + ' ' + (sub || '') + ' ' + (text || '')), nt: norm(title), ns: norm(sub || '') });
  (E.vaistai || []).forEach(v => add('Vaistai', v.name, v.klase,
    [v.ind, v.kontra, (v.dozes || []).map(d => d.k + ' ' + d.d + ' ' + (d.p || '')).join(' '), v.salutinis, v.pakuote, (v.pastabos || []).join(' '), (v.ispejimai || []).join(' '), (v.stulpeliai || []).map(c => c.pav + ' ' + c.dozes.map(d => d.k + ' ' + d.d + ' ' + (d.p || '')).join(' ')).join(' ')].join(' '),
    '#/vaistas/' + v.id));
  (E.igudziai || []).forEach(s => add('Įgūdžiai', s.pav, '#' + s.id + ' · ' + s.sritis + ' · ' + (s.kam || ''),
    [s.aprasas, (s.esme || []).join(' '), (s.zingsniai || []).join(' '), (s.klaidos || []).join(' '), (s.tccc || []).join(' '), s.teorija, s.praktika, strip(s.aprasymas), (s.video || []).map(v => v.title).join(' ')].join(' '), '#/igudis/' + s.id));
  (E.temos || []).forEach(t => add('Mokymosi temos', t.pav, t.sub, t.apie, '#/tema/' + t.id));
  Object.keys(E.sarasai || {}).forEach(id => {
    const L = E.sarasai[id], r = listRoute(id);
    (L.items || []).forEach(it => { if (!it.h) add('Kontroliniai sąrašai', L.title, it.t, (it.s || []).join(' ') + ' ' + strip(it.i), r); });
  });
  Object.keys(E.puslapiai || {}).forEach(id => { const p = E.puslapiai[id]; add('Mokymosi temos', p.title, '', strip(p.html), '#/p/' + id); });
  return I;
}

function results(q) {
  const toks = norm(q).split(/\s+/).filter(Boolean);
  if (!toks.length) return '<p class="muted">Ieškokite vaisto, įgūdžio ar veiksmo. Lietuviškos raidės nebūtinos.</p>';
  IDX = IDX || buildIdx();
  const hits = IDX.filter(e => toks.every(t => e.n.indexOf(t) >= 0)).map(e => {
    let sc = 0;
    toks.forEach(t => { if (e.nt.indexOf(t) >= 0) sc += 10; if (e.nt.indexOf(t) === 0) sc += 5; if (e.ns.indexOf(t) >= 0) sc += 3; });
    return { e, sc };
  }).sort((a, b) => b.sc - a.sc);
  if (!hits.length) return '<p class="muted">Nieko nerasta.</p>';
  let h = '';
  ['Vaistai', 'Įgūdžiai', 'Kontroliniai sąrašai', 'Mokymosi temos'].forEach(k => {
    const a = hits.filter(x => x.e.kind === k);
    if (!a.length) return;
    h += `<h2>${k} · ${a.length}</h2>` + a.slice(0, 20).map(({ e }) => {
      const inHead = toks.every(t => (e.nt + ' ' + e.ns).indexOf(t) >= 0);
      const sn = inHead ? '' : snippet(e.text, toks);
      return `<a class="row" href="${e.r}"><div>${hl(e.title, toks)}<small>${e.sub ? hl(e.sub, toks) : ''}${sn ? '<br>' + sn : ''}</small></div><span class="ar">›</span></a>`;
    }).join('');
  });
  return h;
}
