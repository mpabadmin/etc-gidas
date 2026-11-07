'use strict';
// Priedai – kodas vienodas ETC ir March giduose (skiriasi tik TCFG iš tools.js):
// FC – dozių kortelės (kartojimas su intervalais); egzaminuotojo režimas (EX) pašalintas v56 – nepasiekiamas (#/egzaminas → Treniruotė),
// OP – duomenų apsauga (sužeistųjų duomenų ištrynimas, automatinis išvalymas), GL – pirštinių režimas.

const mmss = ms => { const t = Math.max(0, Math.round(ms / 1000)); return String(Math.floor(t / 60)).padStart(2, '0') + ':' + String(t % 60).padStart(2, '0'); };
const dtStr = ts => { const d = new Date(ts); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0') + ' ' + hm(ts); };
const keepY = () => { const y = scrollY; render(); scrollTo(0, y); };

// ───────── Dozių kortelės (FC): kasdien 5 kortelės iš vaistų skilties, Leitnerio dėžutės (kartojimas su intervalais) ─────────
const FC = (() => {
  const KEY = TCFG.pre + 'fc', INT = [0, 1, 2, 4, 8, 16], PER = 5;
  const day = () => { const d = new Date(); return Math.floor((d.getTime() - d.getTimezoneOffset() * 60000) / 864e5); };
  function st() {
    const o = LS.get(KEY, null), s = o && typeof o === 'object' && !Array.isArray(o) ? o : {};
    return { c: s.c && typeof s.c === 'object' && !Array.isArray(s.c) ? s.c : {}, d: +s.d || 0, n: +s.n || 0, y: +s.y || 0 };
  }
  const save = s => LS.set(KEY, s);
  const shownV = v => typeof ok !== 'function' || ok(v.kam != null ? v.kam : v.lygis);
  function cards() {
    const out = [];
    (E.vaistai || []).filter(v => shownV(v) && !v.ne26).forEach(v => { // ne TCCC 2026 (March opioidai) – dozių kortelėse nemokomi
      const add = (x, pre) => {
        if (!x || !String(x.d || '').trim() || !String(x.k || '').trim()) return;
        const k = (pre ? pre + ' · ' : '') + x.k;
        out.push({ id: v.id + '|' + k, v, k, d: String(x.d), p: String(x.p || '') });
      };
      (v.dozes || []).forEach(x => add(x));
      (v.stulpeliai || []).forEach(col => (col.dozes || []).forEach(x => add(x, col.pav)));
    });
    return out;
  }
  const shuffle = a => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  let q = null, i = 0, open = false, got = 0, again = {};
  function build() {
    const s = st(), t = day(), all = cards();
    const due = shuffle(all.filter(c => s.c[c.id] && +s.c[c.id].d <= t)).sort((a, b) => (+s.c[a.id].b || 1) - (+s.c[b.id].b || 1));
    q = due.concat(shuffle(all.filter(c => !s.c[c.id]))).slice(0, PER); i = 0; open = false; got = 0; again = {};
  }
  function counts() {
    const s = st(), t = day(), all = cards();
    return { all: all.length, due: all.filter(c => s.c[c.id] && +s.c[c.id].d <= t).length, fresh: all.filter(c => !s.c[c.id]).length, learned: all.filter(c => s.c[c.id] && +s.c[c.id].b >= 3).length, today: s.d === t ? s.n : 0, tomorrow: all.filter(c => s.c[c.id] && +s.c[c.id].d === t + 1).length };
  }
  function status() {
    const C = counts();
    if (!C.all) return 'Kortelių nėra';
    if (C.today && !C.due) return 'Šiandien atlikta ✓ · išmokta ' + C.learned + ' / ' + C.all;
    return C.due ? 'Laukia kartoti: ' + C.due : 'Naujų kortelių: ' + C.fresh + ' · išmokta ' + C.learned + ' / ' + C.all;
  }
  function view() {
    if (!q) build();
    const C = counts();
    let h = '<h1>Dozių kortelės</h1>';
    h += expl('<p class="muted">Kasdien 5 kortelės iš vaistų skilties: vaistas ir kelias – prisiminkite dozę, tada atverskite. „Žinojau“ – kortelė grįš vis rečiau (po 1, 2, 4, 8, 16 d.), „Nežinojau“ – rytoj ir dar kartą šiandien. Dozės – tos pačios kaip skiltyje Vaistai.</p>');
    if (!C.all) return h + '<p class="muted">Vaistų skiltyje kortelių nėra.</p>';
    if (!q.length) return h + `<div class="exres"><div class="big">Viskas ✓</div><div class="muted">Šiandien kartoti nebėra. Išmokta ${C.learned} / ${C.all}.</div></div>` + row('#/vaistai', 'Vaistai', 'Visa skiltis');
    if (i >= q.length) {
      const u = q.length - Object.keys(again).length;
      return h + `<div class="exres"><div class="big">${got} / ${u}</div><div>Iš pirmo karto žinojote ${got} iš ${u}.</div><div class="muted">Rytoj kartoti: ${C.tomorrow} · išmokta ${C.learned} / ${C.all} kortelių</div></div>` +
        '<button class="btn pri" data-act="fc-more">Dar 5 kortelės</button>' + row('#/vaistai', 'Vaistai', 'Visa skiltis') +
        '<div class="acts"><button class="btn dng" data-act="fc-reset">Pradėti iš naujo (ištrinti pažangą)</button></div>';
    }
    const c = q[i];
    h += `<div class="muted">Kortelė ${i + 1} / ${q.length}${C.due ? ' · laukia kartoti ' + C.due : ''}</div>`;
    h += `<div class="fcard"><div class="fq">Kokia dozė?</div><div class="fn">${esc(c.v.name)}</div><div class="fk">${esc(c.k)}</div>` +
      (open ? `<div class="fa">${esc(c.d)}${c.p ? '<small>' + esc(c.p) + '</small>' : ''}</div>` : '') + '</div>';
    h += open ? '<div class="fbtns"><button class="btn no" data-act="fc-no">Nežinojau</button><button class="btn yes" data-act="fc-yes">Žinojau</button></div>' + row('#/vaistas/' + c.v.id, 'Atidaryti vaistą', c.v.klase || '')
      : '<button class="btn pri" data-act="fc-show">Rodyti atsakymą</button>';
    return h;
  }
  function act(el) {
    const d = el.dataset;
    switch (d.act) {
      case 'fc-show': open = true; render(); return;
      case 'fc-yes': case 'fc-no': {
        if (!q || !q[i]) return;
        const s = st(), t = day(), c = q[i], r = s.c[c.id] || { b: 0 }, yes = d.act === 'fc-yes';
        if (yes) { if (!again[c.id]) got++; const b = Math.min((+r.b || 0) + 1, 5); s.c[c.id] = { b, d: t + INT[b] }; }
        else { s.c[c.id] = { b: 1, d: t + 1 }; if (!again[c.id]) { again[c.id] = 1; q.push(c); } }
        if (s.d !== t) { s.d = t; s.n = 0; }
        s.n++; save(s); i++; open = false; render(); scrollTo(0, 0); return;
      }
      case 'fc-more': build(); render(); scrollTo(0, 0); return;
      case 'fc-reset': if (!confirm('Ištrinti dozių kortelių pažangą?')) return; LS.set(KEY, {}); build(); render(); return;
    }
  }
  return { view, act, status, cards };
})();

// ───────── Duomenų apsauga (OP): visų sužeistųjų duomenų ištrynimas, automatinis išvalymas po nenaudojimo ─────────
const OP = (() => {
  const KEYS = ['mist', 'mist-v1', 'pt', 'laikai', 'ck', 'ck-sig', 'vz', 'nb', 'wbb', '9line', 'gks', 'tst', 'mascal', 'sitrep', 'rem-n', 'svoris'].map(k => TCFG.pre + k);
  const CFG = TCFG.pre + 'opsec', AKT = TCFG.pre + 'akt', FLAG = TCFG.pre + 'wiped';
  const hours = () => +((LS.get(CFG, {}) || {}).h) || 0;
  const has = () => KEYS.some(k => { try { return localStorage.getItem(k) != null; } catch (e) { return false; } });
  function wipe(auto) {
    KEYS.forEach(k => { try { localStorage.removeItem(k); } catch (e) {} });
    try { sessionStorage.setItem(FLAG, auto ? 'auto' : '1'); } catch (e) {}
    LS.set(AKT, Date.now());
    if (location.hash && location.hash !== '#/') history.replaceState(null, '', location.pathname + location.search + '#/');
    location.reload(); // išvalo ir atmintyje likusią būseną (atšaukimo istoriją ir pan.)
  }
  function check() { const h = hours(), a = +LS.get(AKT, 0) || 0; if (h && a && Date.now() - a > h * 3600e3 && has()) { wipe(true); return true; } return false; }
  let last = 0;
  const touch = () => { const n = Date.now(); if (n - last > 60000) { last = n; LS.set(AKT, n); } };
  function init() {
    let f = null; try { f = sessionStorage.getItem(FLAG); sessionStorage.removeItem(FLAG); } catch (e) {}
    if (check()) return;
    touch();
    ['click', 'input', 'keydown'].forEach(ev => document.addEventListener(ev, touch, true));
    document.addEventListener('visibilitychange', () => { if (!document.hidden) check(); });
    setInterval(check, 5 * 60000);
    if (f) setTimeout(() => toast(f === 'auto' ? 'Sužeistųjų duomenys ištrinti automatiškai (ilgai nenaudota)' : 'Visi sužeistųjų duomenys ištrinti'), 500);
  }
  function settings() {
    const h = hours();
    return '<h2>Duomenų apsauga</h2><p class="muted">Sužeistųjų duomenys laikomi tik šiame telefone. Vietoj vardų ir pavardžių rašykite šaukinį ar numerį.</p>' +
      '<button class="btn dng" data-act="op-wipe" style="width:100%">Ištrinti visų sužeistųjų duomenis</button>' +
      '<p class="muted">Automatiškai ištrinti, jei programėlė nenaudojama:</p><div class="seg2" role="group" aria-label="Automatinis ištrynimas">' +
      [[0, 'Išjungta'], [12, '12 val.'], [24, '24 val.'], [72, '3 d.']].map(([k, t]) => `<button class="${h === k ? 'on' : ''}" data-act="op-auto" data-k="${k}" aria-pressed="${h === k}">${t}</button>`).join('') + '</div>' +
      '<details class="alt"><summary>Kas ištrinama</summary><p class="muted">Nukentėjusiųjų kortelės, paciento failas, laikai, sąrašų žymėjimai, 9-Line, 10s triažas' + (typeof MS !== 'undefined' ? ', Mascal' : '') + (typeof VZ !== 'undefined' ? ', vaistų žymėjimas, nudegimai, šviežias kraujas' : '') + (typeof SR !== 'undefined' ? ', SITREP' : '') + '. Lieka: nustatymai, įsivertinimai, vertinimai ir dozių kortelės.</p></details>';
  }
  function act(el) {
    const d = el.dataset;
    if (d.act === 'op-wipe') { if (!has()) { toast('Sužeistųjų duomenų nėra'); return; } if (confirm('Ištrinti VISŲ sužeistųjų duomenis šiame telefone? To atšaukti negalima.')) wipe(false); return; }
    if (d.act === 'op-auto') { const h = [0, 12, 24, 72].indexOf(+d.k) >= 0 ? +d.k : 0; LS.set(CFG, { h }); touch(); keepY(); toast(h ? 'Bus ištrinta po ' + (h >= 72 ? '3 d.' : h + ' val.') + ' nenaudojimo' : 'Automatinis ištrynimas išjungtas'); }
  }
  return { init, settings, act, wipe, check, has, keys: KEYS };
})();

// ───────── Pirštinių režimas (GL): didesni mygtukai ir tarpai, „Atgal“ mygtukas apačioje ─────────
const GL = (() => {
  const K = TCFG.pre + 'pirstines';
  const on = () => !!LS.get(K, false);
  let fab = null;
  function upd() {
    if (!fab) {
      fab = document.createElement('button'); fab.id = 'glback'; fab.className = 'ib'; fab.type = 'button'; fab.setAttribute('aria-label', 'Atgal');
      fab.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M15 6l-6 6 6 6"/></svg>';
      fab.onclick = () => { const b = document.getElementById('back'); if (b) b.click(); };
      document.body.appendChild(fab);
    }
    const h = location.hash; fab.hidden = !on() || !h || h === '#' || h === '#/';
  }
  function apply() { document.documentElement.classList.toggle('gl', on()); upd(); }
  const settingRow = () => `<div class="ck${on() ? ' on' : ''}" data-act="gl-tg" role="checkbox" aria-checked="${on()}" tabindex="0"><span class="bx">✓</span><div class="t">Pirštinių režimas<div class="muted">Didesni mygtukai ir tarpai, mygtukas „Atgal“ ekrano apačioje – darbui su pirštinėmis ir viena ranka.</div></div></div>`;
  function act(el) { if (el.dataset.act !== 'gl-tg') return; LS.set(K, !on()); apply(); keepY(); toast(on() ? 'Pirštinių režimas įjungtas' : 'Pirštinių režimas išjungtas'); }
  addEventListener('hashchange', upd);
  return { apply, settingRow, act, on };
})();

// ───────── Vertinimo lapas (VL): instruktoriaus vertinimas T / N kiekvienam punktui, K punktai, pastabos, rezultatas ─────────
// Duomenys – E.vertinimai (pvz. March gide – CLS vertinimo lapas). Rezultatas „Įskaityta“ – tik kai visi K punktai „T“.
const VL = (() => {
  const KEY = TCFG.pre + 'vl';
  const obj = v => v && typeof v === 'object' && !Array.isArray(v) ? v : null;
  const sheets = () => E.vertinimai || [];
  const byId = id => sheets().find(x => x.id === id);
  function st() {
    const s = obj(LS.get(KEY, null)) || {}, c = obj(s.cur);
    return { cur: c && typeof c.id === 'string' ? { id: c.id, who: String(c.who || ''), ins: String(c.ins || ''), att: +c.att || 1, t0: +c.t0 || Date.now(), t1: +c.t1 || 0, a: obj(c.a) || {}, nt: obj(c.nt) || {}, notes: String(c.notes || ''), open: obj(c.open) || {} } : null, hist: Array.isArray(s.hist) ? s.hist.filter(obj).slice(0, 50) : [] };
  }
  const save = s => LS.set(KEY, s);
  // visi vertinami punktai: pagrindiniai ir papunkčiai (raktas „4“, „4a“)
  const rows = sh => sh.items.reduce((a, it) => { a.push({ key: it.n, n: it.n + '.', t: it.t, k: !!it.k, m: it.m || '', top: true }); (it.s || []).forEach(x => a.push({ key: it.n + x.n, n: x.n + '.', t: x.t, k: !!x.k, top: false, par: it.n })); return a; }, []);
  function result(c) {
    const sh = byId(c.id), R = rows(sh), K = R.filter(r => r.k);
    const kBad = K.filter(r => c.a[r.key] !== 'T'), nList = R.filter(r => c.a[r.key] === 'N'), empty = R.filter(r => !c.a[r.key]);
    return { sh, R, K, kBad, nList, empty, pass: !kBad.length, t: R.filter(r => c.a[r.key] === 'T').length };
  }
  const label = r => (r.top ? r.n : r.par + r.n) + ' ' + r.t;
  function textOf(c) {
    const X = result(c);
    return [X.sh.title.toUpperCase() + (c.att > 1 ? ' – ' + c.att + ' bandymas' : ''), 'Vardas (šaukinys): ' + (c.who || '—'), 'Instruktorius: ' + (c.ins || '—'), 'Data: ' + dtStr(c.t0),
      'REZULTATAS: ' + (X.pass ? 'ĮSKAITYTA' : 'NEĮSKAITYTA') + ' (K punktų atlikta ' + (X.K.length - X.kBad.length) + ' / ' + X.K.length + ')',
      'T: ' + X.t + ' · N: ' + X.nList.length + (X.empty.length ? ' · nepažymėta: ' + X.empty.length : ''),
      X.kBad.length ? 'Neatlikti K punktai: ' + X.kBad.map(label).join('; ') : '',
      X.nList.filter(r => !r.k).length ? 'Kiti „N“: ' + X.nList.filter(r => !r.k).map(label).join('; ') : '',
      Object.keys(c.nt).filter(k => String(c.nt[k]).trim()).map(k => { const r = X.R.find(x => x.key === k); return r ? 'Pastaba (' + (r.top ? r.n : r.par + r.n) + '): ' + c.nt[k].trim() : ''; }).filter(Boolean).join('\n'),
      c.notes.trim() ? 'Pastabos: ' + c.notes.trim() : ''].filter(Boolean).join('\n');
  }
  const status = () => { const s = st(); if (!sheets().length) return ''; return s.cur && !s.cur.t1 ? 'Vyksta: ' + (s.cur.who || 'vertinamasis') : s.hist.length ? 'Paskutinis: ' + (s.hist[0].pass ? 'įskaityta' : 'neįskaityta') + ' · ' + (s.hist[0].who || '') : 'T / N, K punktai, pastabos'; };
  const histRows = H => H.map(h => `<button class="row" data-act="vl-h" data-k="${esc(String(h.at))}"><div>${esc(h.who || 'be vardo')}<small>${esc(dtStr(h.at) + (h.ins ? ' · ' + h.ins : '') + (h.att > 1 ? ' · ' + h.att + ' bandymas' : ''))}</small></div><span class="tag ${h.pass ? 'grn' : 'red'}">${h.pass ? 'Įskaityta' : 'Neįskaityta'}</span></button>`).join('');
  function view(id) {
    const list = sheets(); if (!list.length) return notFound();
    const sh = byId(id) || list[0], s = st(), c = s.cur && s.cur.id === sh.id ? s.cur : null;
    let h = `<h1>${esc(sh.title)}</h1><p class="muted">${esc(sh.sub)}</p>`;
    if (!c) {
      h += `<div class="card"><label>Vardas (šaukinys)<input class="inp" id="vl-who" autocomplete="off"></label><label>Instruktorius<input class="inp" id="vl-ins" autocomplete="off" value="${esc(LS.get(TCFG.pre + 'vl-ins', ''))}"></label>` +
        `<div class="lbl">Bandymas</div><div class="seg2" role="group" aria-label="Bandymas">${[1, 2, 3].map(n => `<button data-act="vl-att" data-k="${n}" class="${n === 1 ? 'on' : ''}" aria-pressed="${n === 1}">${n}</button>`).join('')}</div>` +
        `<p class="muted mt0"><b>Vertinimas:</b> ${esc(sh.rule)}</p><button class="btn pri" data-act="vl-start" data-k="${esc(sh.id)}">Pradėti vertinimą</button></div>`;
      const H = s.hist.filter(x => x.id === sh.id);
      if (H.length) h += '<h2>Ankstesni vertinimai</h2>' + histRows(H.slice(0, 20));
      h += `<p class="muted">Šaltinis: ${esc(sh.src)}.</p>`;
      return h;
    }
    const X = result(c);
    if (!c.t1) {
      const done = X.R.length - X.empty.length;
      h += `<div class="exbar vlbar"><span class="exn"><b>${esc(c.who || 'Vertinamasis')}</b> · ${done} / ${X.R.length} · K: ${X.K.length - X.kBad.length} / ${X.K.length}</span><button class="btn sm" data-act="vl-end">Baigti</button></div>`;
      h += `<p class="muted mt0">${esc(sh.rule)} T – atliko, N – neatliko; ✎ – pastaba punktui.</p>`;
      h += '<div class="vl">' + X.R.map(r => {
        const a = c.a[r.key] || '', op = c.open[r.key] || String(c.nt[r.key] || '').trim();
        return `<div class="vlr${r.top ? ' top' : ''}${r.k ? ' kk' : ''}${a ? ' a' + a : ''}">` +
          `<div class="vlt">${r.m ? `<span class="vlm">${esc(r.m)}</span>` : ''}<b class="vln">${esc(r.n)}</b><span>${esc(r.t)}</span>${r.k ? '<span class="vlk" title="Kritinis punktas">K</span>' : ''}</div>` +
          `<div class="vlb"><button class="${a === 'T' ? 'on' : ''}" data-act="vl-a" data-k="${esc(r.key)}" data-v="T" aria-pressed="${a === 'T'}" aria-label="${esc(r.n)} atliko">T</button><button class="${a === 'N' ? 'on' : ''}" data-act="vl-a" data-k="${esc(r.key)}" data-v="N" aria-pressed="${a === 'N'}" aria-label="${esc(r.n)} neatliko">N</button><button class="vle${op ? ' on' : ''}" data-act="vl-nt" data-k="${esc(r.key)}" aria-label="Pastaba">✎</button></div>` +
          (op ? `<input class="inp vlin" data-vl="nt.${esc(r.key)}" value="${esc(c.nt[r.key] || '')}" placeholder="Pastaba" autocomplete="off">` : '') + '</div>';
      }).join('') + '</div>';
      h += `<label class="lbl">Pastabos</label><textarea class="inp" data-vl="notes" rows="3">${esc(c.notes)}</textarea>`;
      h += '<button class="btn pri" data-act="vl-end">Baigti ir rodyti rezultatą</button><div class="acts"><button class="btn dng" data-act="vl-cancel">Nutraukti be rezultato</button></div>';
      return h;
    }
    const li = (a, f) => '<ul class="exlst' + (f ? ' ' + f : '') + '">' + a.map(x => '<li>' + esc(x) + '</li>').join('') + '</ul>';
    h += `<div class="exres${X.pass ? '' : ' bad'}"><div class="muted">${esc([c.who || 'Vertinamasis nenurodytas', c.ins ? 'instruktorius ' + c.ins : '', dtStr(c.t0), c.att > 1 ? c.att + ' bandymas' : ''].filter(Boolean).join(' · '))}</div><div class="big">${X.pass ? 'Įskaityta' : 'Neįskaityta'}</div><div>K punktų atlikta: <b>${X.K.length - X.kBad.length} / ${X.K.length}</b> · T: ${X.t} · N: ${X.nList.length}${X.empty.length ? ' · nepažymėta: ' + X.empty.length : ''}</div></div>`;
    if (X.kBad.length) h += '<h2>Neatlikti K punktai</h2>' + li(X.kBad.map(label), 'krit');
    const nk = X.nList.filter(r => !r.k); if (nk.length) h += '<h2>Kiti „N“</h2>' + li(nk.map(label));
    const nts = Object.keys(c.nt).filter(k => String(c.nt[k]).trim()); if (nts.length || c.notes.trim()) h += '<h2>Pastabos</h2>' + li(nts.map(k => { const r = X.R.find(x => x.key === k); return (r ? (r.top ? r.n : r.par + r.n) + ' ' : '') + c.nt[k].trim(); }).concat(c.notes.trim() ? [c.notes.trim()] : []));
    h += '<div class="acts"><button class="btn" data-act="vl-copy">Kopijuoti</button><button class="btn" data-act="vl-share">Bendrinti</button></div><button class="btn pri" data-act="vl-new">Naujas vertinimas</button>';
    return h;
  }
  let att = 1;
  function act(el) {
    const d = el.dataset, s = st(), c = s.cur;
    switch (d.act) {
      case 'vl-att': att = +d.k || 1; el.parentNode.querySelectorAll('button').forEach(b => { const on = b === el; b.classList.toggle('on', on); b.setAttribute('aria-pressed', on); }); return;
      case 'vl-start': {
        if (!byId(d.k)) return;
        const w = document.getElementById('vl-who'), i = document.getElementById('vl-ins'), ins = i ? i.value.trim().slice(0, 60) : '';
        LS.set(TCFG.pre + 'vl-ins', ins);
        s.cur = { id: d.k, who: w ? w.value.trim().slice(0, 60) : '', ins, att, t0: Date.now(), t1: 0, a: {}, nt: {}, notes: '', open: {} }; att = 1; save(s); render(); scrollTo(0, 0); return;
      }
      case 'vl-a': {
        if (!c || c.t1) return;
        if (c.a[d.k] === d.v) delete c.a[d.k]; else c.a[d.k] = d.v;
        save(s); keepY(); if (navigator.vibrate) navigator.vibrate(12); return;
      }
      case 'vl-nt': if (!c || c.t1) return; c.open[d.k] = !c.open[d.k]; save(s); keepY(); { const f = app.querySelector(`[data-vl="nt.${d.k}"]`); if (f) f.focus(); } return;
      case 'vl-end': {
        if (!c || c.t1) return;
        const X = result(c);
        if (X.empty.length && !confirm('Baigti vertinimą? Nepažymėta punktų: ' + X.empty.length + (X.K.filter(r => !c.a[r.key]).length ? ', iš jų K: ' + X.K.filter(r => !c.a[r.key]).length : '') + '. Nepažymėti K punktai laikomi neatliktais.')) return;
        c.t1 = Date.now();
        const R = result(c);
        s.hist.unshift({ id: c.id, who: c.who, ins: c.ins, att: c.att, at: c.t0, pass: R.pass, text: textOf(c) }); s.hist = s.hist.slice(0, 50);
        save(s); render(); scrollTo(0, 0); return;
      }
      case 'vl-cancel': if (!confirm('Nutraukti vertinimą? Rezultatas nebus išsaugotas.')) return; s.cur = null; save(s); render(); return;
      case 'vl-new': s.cur = null; save(s); render(); scrollTo(0, 0); return;
      case 'vl-copy': if (c) copyText(textOf(c)); return;
      case 'vl-share': if (c) shareText('Vertinimas', textOf(c)); return;
      case 'vl-h': { const h = s.hist.find(x => String(x.at) === d.k); if (!h) return; const t = String(h.text || ''); return readMode('Vertinimas', t.split('\n').map(x => esc(x)), [['Kopijuoti', () => copyText(t)], ['Bendrinti', () => shareText('Vertinimas', t)]]); }
    }
  }
  function onInput(t) {
    const s = st(), c = s.cur; if (!c || c.t1) return; const p = t.dataset.vl;
    if (p === 'notes') c.notes = t.value; else if (p.indexOf('nt.') === 0) c.nt[p.slice(3)] = t.value;
    save(s);
  }
  return { view, act, onInput, status, has: () => sheets().length > 0 };
})();
