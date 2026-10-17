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
// Trukmė: „ką tik“, „prieš 12 min“, „prieš 2 val. 05 min“
const tmAgo = (ts, now) => { const m = Math.max(0, Math.floor(((now || Date.now()) - ts) / 60000)); return m < 1 ? 'ką tik' : 'prieš ' + (m < 60 ? m + ' min' : Math.floor(m / 60) + ' val. ' + String(m % 60).padStart(2, '0') + ' min'); };

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

// Laikai (paciento ekrane): trauma, turniketas – bakstelėjus atveriamas laiko langas (MC.sheet 'time', kartu su MIST kortele); TXA – riba 3 val. arba „Suleista“ (iš C lentelės ar vaistų žymėjimo)
function timersHtml() {
  const T = LS.get('etc-laikai', {}) || {}, now = Date.now(), min = ts => Math.max(0, Math.floor((now - ts) / 60000));
  let tqC = 0, txa = 0;
  try { const st = MC.state(), c = st.pts[st.cur], z = LS.get('etc-vz', null), te = z && Array.isArray(z.e) ? z.e.filter(e => e && e.v === 'txa').pop() : null;
    tqC = T.turn ? 0 : PT.hmTs(c.tqT); txa = te ? +te.t : ((c.tx || []).indexOf('txa') >= 0 || c.txaT ? PT.hmTs(c.txaT) || -1 : 0); } catch (e) {}
  const tq = T.turn || tqC, dl = T.trauma ? T.trauma + 3 * 3600e3 : 0;
  const card = (k, cls, lb, val, sub) => k
    ? `<button class="hbtm ${cls}" data-act="tm" data-k="${k}" aria-label="${lb}: ${val}${sub ? ', ' + sub : ''} – keisti"><small>${lb}</small><b>${val}</b><small>${sub}</small></button>`
    : `<div class="hbtm ${cls}"><small>${lb}</small><b>${val}</b>${sub ? '<small>' + sub + '</small>' : ''}</div>`;
  let h = '<div class="hbtms">' +
    card('trauma', '', 'Trauma', T.trauma ? hm(T.trauma) : '—', T.trauma ? tmAgo(T.trauma, now) : 'nustatyti') +
    card('turn', tq ? 'amb' : '', 'Turniketas', tq ? hm(tq) : '—', tq ? tmAgo(tq, now) : 'neuždėtas') +
    (txa ? card('', 'grn', 'TXA', 'Suleista', txa > 0 ? hm(txa) : '') : card('', dl && now > dl ? 'red' : '', 'TXA iki', dl ? (now > dl ? 'Praėjo' : hm(dl)) : '—', dl ? (now > dl ? '3 val. riba' : 'per 3 val.') : '')) + '</div>';
  return h;
}
function updTimers() { const el = document.getElementById('tm'); if (el) el.innerHTML = timersHtml(); }

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
    [v.ind, v.kontra, (v.dozes || []).map(d => d.k + ' ' + d.d + ' ' + (d.p || '')).join(' '), v.salutinis, v.pakuote, (v.pastabos || []).join(' '), (v.ispejimai || []).join(' '), (v.stulpeliai || []).map(c => c.pav + ' ' + c.dozes.map(d => d.k + ' ' + d.d + ' ' + (d.p || '')).join(' ')).join(' '),
      v.lt ? (v.lt.p || []).map(p => p.n).join(' ') + ' ' + (v.lt.ne || '') : ''].join(' '),
    '#/vaistas/' + v.id));
  (E.igudziai || []).forEach(s => add('Įgūdžiai', s.pav, '#' + s.id + ' · ' + s.sritis + ' · ' + (s.kam || ''),
    [s.aprasas, (s.esme || []).join(' '), (s.zingsniai || []).join(' '), (s.klaidos || []).join(' '), s.teorija, s.praktika, strip(s.aprasymas), (s.video || []).map(v => v.title).join(' ')].join(' '), '#/igudis/' + s.id));
  (E.temos || []).forEach(t => add('Mokymosi temos', t.pav, t.sub, t.apie, '#/tema/' + t.id));
  Object.keys(E.sarasai || {}).forEach(id => {
    const L = E.sarasai[id], r = listRoute(id);
    (L.items || []).forEach(it => { if (!it.h) add('Kontroliniai sąrašai', L.title, it.t, (it.s || []).join(' ') + ' ' + strip(it.i), r); });
  });
  Object.keys(E.puslapiai || {}).forEach(id => { const p = E.puslapiai[id]; add('Mokymosi temos', p.title, '', strip(p.html), '#/p/' + id); });
  // Įrankiai (tools.js)
  add('Įrankiai', 'MIST kortelė', 'Vizuali sužeistojo kortelė: mechanizmas, sužalojimai kūno schemoje, požymiai, gydymas', 'mist handover perdavimas sužeistasis keli sužeistieji kortelė atmist kūno schema žaizda turniketas', '#/mist');
  add('Įrankiai', '9-Line MEDEVAC', '9 eilučių evakuacijos prašymas su kodais', '9 line nine line 9line medevac evakuacija koordinatės mgrs gps skubumas urgent priority routine radijas', '#/9line');
  add('Įrankiai', 'GKS skaičiuoklė', 'Glasgow komos skalė (GCS at 40), GKS-P', 'gks glasgow gcs koma sąmonė akys kalba motorika vyzdžiai', '#/gks');
  add('Įrankiai', 'Mascal triažas', 'Sužeistųjų lenta masinio sužalojimo atveju: T1–T4, būsenos, suvestinė', 'mascal masinis sužalojimas triažas rūšiavimas t1 t2 t3 t4 immediate delayed minimal expectant sužeistųjų lenta', '#/mascal');
  add('Įrankiai', 'Nudegimų plotas', 'Devyneto taisyklė, % KPP, skysčiai', 'nudegimai nudegimas kpp devyneto taisyklė plotas skysčiai parkland lund browder', '#/nudegimai');
  add('Įrankiai', 'Kraujo transfuzija', 'Šviežias pilnas kraujas (vaikščiojantis kraujo bankas): donoras, paėmimas, perpylimas', 'kraujo transfuzija šviežias kraujas šviežias pilnas kraujas pilnas kraujas kraujo bankas wbb walking blood bank donoras perpylimas transfuzija ltowb', '#/pilnas-kraujas');
  add('Įrankiai', 'Treniruočių scenarijai', 'Klinikiniai atvejai su klausimais ir paaiškinimais', 'scenarijai scenarijus treniruotė viktorina testas klausimai', '#/scenarijai');
  add('Įrankiai', 'Vaistų žymėjimas', 'Suleisti vaistai: dozė, kelias, laikas; perkėlimas į MIST', 'vaistų žymėjimas suleista suleisti vaistai dozė laikas įrašas žurnalas ketaminas fentanilis txa', '#/zymejimas');
  add('Įrankiai', 'Nuskaityti popierinę kortelę', 'DD 1380 nuotrauka → MIST: langeliai, žymės, iškarpos', 'skenuoti nuskaityti nuotrauka fotografuoti popierinė kortelė dd1380 tccc card ocr atpažinimas', '#/skenuoti');
  add('Įrankiai', 'Dozių kortelės', 'Kasdien 5 kortelės: vaistas ir kelias – prisiminkite dozę', 'dozių kortelės korteles flashcards kartojimas dozės atmintis testas', '#/korteles');
  add('Įrankiai', 'Egzaminuotojo režimas', 'Kontrolinio sąrašo vertinimas su laiku ir kritiniais punktais', 'egzaminas egzaminuotojas vertinimas instruktorius laikmatis kritiniai punktai', '#/egzaminas');
  add('Įrankiai', '10S triažas', 'Ten Second Triage (TST) – rūšiavimas per 10 sekundžių', 'tst 10s 10 s 10 sekundžių ten second triage triažas rūšiavimas masinė nelaimė p1 p2 p3', '#/tst');
  add('Įrankiai', 'SITREP – padėties pranešimas', 'Padėties pranešimas vadui: 10 eilučių, DTG, MGRS, nuostoliai, logistika', 'sitrep padėties pranešimas situacijos ataskaita vadas dtg mgrs nuostoliai wia kia logistika ryšys prašymai', '#/sitrep');
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
  ['Įrankiai', 'Vaistai', 'Įgūdžiai', 'Kontroliniai sąrašai', 'Mokymosi temos'].forEach(k => {
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
