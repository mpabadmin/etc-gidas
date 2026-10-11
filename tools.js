'use strict';
// ETC kišeninis gidas – įrankiai: 9 eilučių MEDEVAC prašymas (NL, perkelta iš March gido), vizuali MIST kortelė (MC),
// GKS skaičiuoklė (GK), Ten Second Triage rūšiavimas (TS). Bendri pagalbininkai: MGRS, kopijavimas, bendrinimas, skaitymo režimas.

// ───────── WGS84 → MGRS (8 skaitmenų = 10 m tikslumas) ─────────
function toMGRS(lat, lon, digits) {
  digits = digits || 4;
  if (!(lat >= -80 && lat <= 84) || !(lon >= -180 && lon <= 180)) return null;
  let zone = Math.floor((lon + 180) / 6) + 1;
  if (lon === 180) zone = 60;
  if (lat >= 56 && lat < 64 && lon >= 3 && lon < 12) zone = 32;
  if (lat >= 72) { if (lon >= 0 && lon < 9) zone = 31; else if (lon >= 9 && lon < 21) zone = 33; else if (lon >= 21 && lon < 33) zone = 35; else if (lon >= 33 && lon < 42) zone = 37; }
  const a = 6378137, f = 1 / 298.257223563, k0 = 0.9996, e2 = f * (2 - f), ep2 = e2 / (1 - e2);
  const p = lat * Math.PI / 180, l = lon * Math.PI / 180, l0 = ((zone - 1) * 6 - 180 + 3) * Math.PI / 180;
  const sp = Math.sin(p), cp = Math.cos(p), tp = Math.tan(p);
  const N = a / Math.sqrt(1 - e2 * sp * sp), T = tp * tp, C = ep2 * cp * cp, A = cp * (l - l0);
  const M = a * ((1 - e2 / 4 - 3 * e2 * e2 / 64 - 5 * e2 ** 3 / 256) * p - (3 * e2 / 8 + 3 * e2 * e2 / 32 + 45 * e2 ** 3 / 1024) * Math.sin(2 * p) +
    (15 * e2 * e2 / 256 + 45 * e2 ** 3 / 1024) * Math.sin(4 * p) - (35 * e2 ** 3 / 3072) * Math.sin(6 * p));
  const E = k0 * N * (A + (1 - T + C) * A ** 3 / 6 + (5 - 18 * T + T * T + 72 * C - 58 * ep2) * A ** 5 / 120) + 500000;
  let Nn = k0 * (M + N * tp * (A * A / 2 + (5 - T + 9 * C + 4 * C * C) * A ** 4 / 24 + (61 - 58 * T + T * T + 600 * C - 330 * ep2) * A ** 6 / 720));
  if (lat < 0) Nn += 10000000;
  const band = 'CDEFGHJKLMNPQRSTUVWXX'[Math.floor((lat + 80) / 8)];
  const set = ((zone - 1) % 6) + 1;
  const col = ['ABCDEFGH', 'JKLMNPQR', 'STUVWXYZ'][(set - 1) % 3][Math.floor(E / 100000) - 1];
  let ri = Math.floor(Nn / 100000) % 20;
  if (set % 2 === 0) ri = (ri + 5) % 20;
  const rowL = 'ABCDEFGHJKLMNPQRSTUV'[ri];
  const q = 10 ** (5 - digits);
  const es = String(Math.floor((E % 100000) / q)).padStart(digits, '0'), ns = String(Math.floor((Nn % 100000) / q)).padStart(digits, '0');
  return zone + band + ' ' + col + rowL + ' ' + es + ' ' + ns;
}

// ───────── bendri pagalbininkai ─────────
function toast(t) {
  let el = document.getElementById('toast');
  if (!el) { el = document.createElement('div'); el.id = 'toast'; el.setAttribute('role', 'status'); document.body.appendChild(el); }
  el.textContent = t; el.className = 'show';
  clearTimeout(toast.tm); toast.tm = setTimeout(() => { el.className = ''; }, 2600);
}
function copyText(t) {
  const done = () => toast('Nukopijuota');
  if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(t).then(done, () => fallback());
  fallback();
  function fallback() {
    const ta = document.createElement('textarea'); ta.value = t; ta.setAttribute('readonly', ''); ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta); ta.select();
    try { document.execCommand('copy'); done(); } catch (e) { toast('Nepavyko nukopijuoti'); }
    ta.remove();
  }
}
function shareText(title, t) {
  if (navigator.share) navigator.share({ title, text: t }).catch(() => {});
  else copyText(t);
}
function readMode(title, lines) {
  let el = document.getElementById('rd');
  if (!el) {
    el = document.createElement('div'); el.id = 'rd'; el.setAttribute('role', 'dialog'); el.setAttribute('aria-modal', 'true');
    el.addEventListener('click', e => { if (e.target.closest('[data-rd=x]')) closeRead(); });
    document.body.appendChild(el);
  }
  el.setAttribute('aria-label', title);
  el.innerHTML = `<div class="rdp"><div class="rdh"><b>${esc(title)}</b><button class="ib" data-rd="x" aria-label="Uždaryti"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg></button></div>` +
    lines.map(x => `<div class="rdl">${x}</div>`).join('') + '<p class="muted">Uždaryti – ✕ arba mygtukas „Atgal“.</p></div>';
  el.hidden = false; document.documentElement.classList.add('fbopen');
  try { history.pushState(Object.assign({}, history.state, { rd: 1 }), ''); } catch (e) {}
  const x = el.querySelector('[data-rd=x]'); if (x) x.focus();
}
function closeRead() {
  const el = document.getElementById('rd'); if (!el || el.hidden) return;
  el.hidden = true; document.documentElement.classList.remove('fbopen');
  if (history.state && history.state.rd) history.back();
}
addEventListener('keydown', e => { if (e.key === 'Escape') closeRead(); });
addEventListener('popstate', () => { const el = document.getElementById('rd'); if (el && !el.hidden && !(history.state && history.state.rd)) { el.hidden = true; document.documentElement.classList.remove('fbopen'); } });
const chip = (act, k, on, lb, extra) => `<button class="${on ? 'on' : ''}" data-act="${act}" data-k="${esc(k)}" aria-pressed="${!!on}"${extra || ''}>${lb}</button>`;
const stepper = (act, k, v, lb, sub) => `<div class="stp"><div><b>${lb}</b>${sub ? '<small>' + sub + '</small>' : ''}</div><button data-act="${act}" data-k="${k}" data-d="-1" aria-label="Mažiau: ${esc(lb)}">−</button><span class="sv">${v}</span><button data-act="${act}" data-k="${k}" data-d="1" aria-label="Daugiau: ${esc(lb)}">+</button></div>`;
const nowHM = () => hm(Date.now());
// Lietuviškos daugiskaitos formos: plural(3, ['žymė', 'žymės', 'žymių']) → '3 žymės'
const plural = (n, f) => n + ' ' + (n % 10 === 1 && n % 100 !== 11 ? f[0] : n % 10 >= 2 && (n % 100 < 10 || n % 100 >= 20) ? f[1] : f[2]);
const HM_RE = /^([01]\d|2[0-3]):[0-5]\d$/;

// ───────── 9 eilučių MEDEVAC (turinys ir MGRS – kaip March gide) ─────────
const NL = (() => {
  const KEY = 'etc-9line';
  const def = () => ({ peace: false, l1: '', freq: '', cs: '', sfx: '', p: { A: 0, B: 0, C: 0, D: 0, E: 0 }, eq: [], lit: 0, amb: 0, sec: '', wounds: '', mark: '', markTxt: '', nat: { A: 0, B: 0, C: 0, D: 0, E: 0 }, cbrn: [], terrain: '' });
  const get = () => {
    const raw = LS.get(KEY, {}), d = def(), s = Object.assign(d, raw && typeof raw === 'object' ? raw : {});
    ['l1', 'freq', 'cs', 'sfx', 'sec', 'wounds', 'mark', 'markTxt', 'terrain'].forEach(k => { if (typeof s[k] !== 'string') s[k] = s[k] == null ? '' : String(s[k]); });
    ['eq', 'cbrn'].forEach(k => { if (!Array.isArray(s[k])) s[k] = []; });
    s.lit = +s.lit || 0; s.amb = +s.amb || 0; s.peace = !!s.peace;
    s.p = Object.assign(def().p, s.p); s.nat = Object.assign(def().nat, s.nat); return s;
  };
  const save = s => LS.set(KEY, s);
  const PREC = [['A', 'Skubi', 'Urgent'], ['B', 'Skubi chirurginė', 'Urgent surgical'], ['C', 'Prioritetinė', 'Priority'], ['D', 'Įprastinė', 'Routine'], ['E', 'Patogumo', 'Convenience']];
  const EQ = [['A', 'Nereikia'], ['B', 'Gervė (hoist)'], ['C', 'Ištraukimo įranga'], ['D', 'Plaučių ventiliatorius']];
  const SEC = [['N', 'Priešo nėra'], ['P', 'Galimas priešas'], ['E', 'Priešas yra – artėti atsargiai'], ['X', 'Priešas yra – reikia ginkluotos palydos']];
  const MARK = [['A', 'Skydai'], ['B', 'Pirotechnika'], ['C', 'Dūmai'], ['D', 'Nežymima'], ['E', 'Kita']];
  const NAT = [['A', 'Savos ir sąjungininkų (koalicijos) pajėgos'], ['B', 'Savos šalies ir sąjungininkų civiliai'], ['C', 'Ne koalicijos kariai ar saugumo pajėgos'], ['D', 'Ne koalicijos civiliai'], ['E', 'Priešo kariai ar sulaikytieji']];
  const CBRN = [['N', 'Branduolinis'], ['B', 'Biologinis'], ['C', 'Cheminis'], ['R', 'Radiologinis (jei numato SOP)'], ['-', 'Nėra']];
  const counts = o => Object.keys(o).filter(k => o[k] > 0).map(k => k + o[k]).join(' BREAK ');
  const TITLES = ['Paėmimo vietos koordinatės', 'Dažnis, šaukinys, priesaga', 'Sužeistieji pagal skubumą', 'Specialioji įranga', 'Sužeistieji pagal tipą', 'Paėmimo vietos saugumas', 'Vietos žymėjimas', 'Pilietybė ir statusas', 'CBRN užterštumas'];

  function lines(s) {
    return [
      s.l1.trim().toUpperCase().replace(/\s+/g, ' '),
      [s.freq.trim(), s.cs.trim(), s.sfx.trim() ? 'priesaga ' + s.sfx.trim() : ''].filter(Boolean).join(', '),
      counts(s.p),
      s.eq.slice().sort().join(', '),
      [s.lit ? 'L' + s.lit : '', s.amb ? 'A' + s.amb : ''].filter(Boolean).join(' BREAK '),
      s.peace ? s.wounds.trim() : s.sec,
      s.mark ? s.mark + (s.markTxt.trim() ? ' – ' + s.markTxt.trim() : '') : '',
      counts(s.nat),
      s.peace ? s.terrain.trim() : (s.cbrn.indexOf('-') >= 0 ? 'Nėra' : s.cbrn.join(', '))
    ];
  }
  // Kodų reikšmės skaitymo režimui (mažu šriftu po kodu)
  const nm = (L, k) => (L.find(x => x[0] === k) || [k, k])[1];
  function meaning(s) {
    const cnt = (o, L) => Object.keys(o).filter(k => o[k] > 0).map(k => nm(L, k).toLowerCase() + ' ' + o[k]).join(', ');
    return [
      '', '', cnt(s.p, PREC.map(x => [x[0], x[1]])),
      s.eq.slice().sort().map(k => nm(EQ, k).toLowerCase()).join(', '),
      [s.lit ? 'neštuvuose ' + s.lit : '', s.amb ? 'vaikštantys ' + s.amb : ''].filter(Boolean).join(', '),
      s.peace ? '' : (s.sec ? nm(SEC, s.sec).toLowerCase() : ''),
      s.mark ? nm(MARK, s.mark).toLowerCase() : '',
      cnt(s.nat, NAT),
      s.peace ? '' : s.cbrn.filter(k => k !== '-').map(k => nm(CBRN, k).toLowerCase()).join(', ')
    ];
  }
  const titles = s => TITLES.map((t, i) => s.peace && i === 5 ? 'Sužalojimų skaičius ir tipas' : s.peace && i === 8 ? 'Vietovės aprašymas' : t);
  const text = s => '9-LINE MEDEVAC (' + nowHM() + ')\n' + lines(s).map((x, i) => (i + 1) + '. ' + (x || '—')).join('\n');
  function status() {
    const L = lines(get()), n = L.slice(0, 5).filter(Boolean).length, all = L.filter(Boolean).length;
    return all ? (n < 5 ? `Būtinos ${n}/5 · iš viso ${all}/9` : `Užpildyta ${all}/9 eilučių`) : 'Pildyti prašymą';
  }

  function card(n, s, body, hint) {
    const v = lines(s)[n - 1];
    return `<section class="nl${v ? ' ok' : ''}${n <= 5 ? ' req' : ''}"><div class="nlh"><span class="nn">${n}</span><b>${esc(titles(s)[n - 1])}</b>${n <= 5 ? '<small class="rq">būtina</small>' : ''}</div>${hint ? '<p class="muted">' + hint + '</p>' : ''}${body}</section>`;
  }

  // Skubumo kategorijų paaiškinimas (iš March gido „9 eilučių MEDEVAC prašymas ir MIST“, JTS CLS)
  const precHelp = () => '<details class="alt"><summary>Skubumo kategorijos (JTS CLS)</summary><div class="tw"><table><tr><th>Kategorija</th><th>Terminas</th><th>Pavyzdžiai</th></tr>' +
    '<tr><td><b>A – skubi</b> (Urgent)</td><td>&lt; 2 val. – gyvybei, galūnei ar regėjimui išsaugoti</td><td>Turniketai, sustabdytas kraujavimas, galvos smegenų trauma</td></tr>' +
    '<tr><td><b>B – skubi chirurginė</b> (Urgent surgical)</td><td>&lt; 2 val. iki artimiausio chirurgijos padalinio</td><td>Adatos dekompresija, krikotiroidotomija, didelis vidinis kraujavimas, sunki galvos trauma</td></tr>' +
    '<tr><td><b>C – prioritetinė</b> (Priority)</td><td>&lt; 4 val. arba būklė gali pablogėti iki skubios</td><td>Kompensuotas šokas, lūžis su išnykusiu distaliniu pulsu</td></tr>' +
    '<tr><td><b>D – įprastinė</b> (Routine)</td><td>&lt; 24 val.</td><td>Nubrozdinimai, smulkūs lūžiai, nušalimai</td></tr>' +
    '<tr><td><b>E – patogumo</b> (Convenience)</td><td>Mediciniškai nebūtina</td><td>Administracinis perkėlimas</td></tr></table></div>' +
    '<p class="muted">Terminai priklauso nuo doktrinos ir SOP: JTS CLS (2020) nurodo &lt; 2 val., kai kurios JAV ir NATO procedūros skubiai kategorijai numato 1 val. ar 90 min. Vadovaukitės savo vieneto SOP.</p></details>';

  function view() {
    const s = get(), L = lines(s), req = L.slice(0, 5).filter(Boolean).length;
    let h = '<h1>9 eilučių MEDEVAC prašymas</h1>';
    if (mode === 'learn') h += '<p class="muted">9 eilučių prašymas (9-Line MEDEVAC) – standartinis radijo pranešimas evakuacijos priemonei iškviesti. Pirmų 5 eilučių pakanka priemonei išsiųsti; 6–9 eilutes galima perduoti jai jau judant.</p>';
    h += `<div class="seg2" role="group" aria-label="Situacija">${chip('nl-peace', '0', !s.peace, 'Karo metu')}${chip('nl-peace', '1', s.peace, 'Taikos metu')}</div>`;
    h += `<div class="nlprog"><div class="prog"><i style="width:${req * 20}%"></i></div><small class="muted">Būtinos 1–5 eilutės: ${req} / 5. Prieš kviesdami surinkite visą informaciją; kodus ir ryšio saugumą – pagal SOP.</small></div>`;
    h += card(1, s, `<input class="inp" data-nl="l1" value="${esc(s.l1)}" placeholder="pvz. 35U LA 1234 5678" autocomplete="off" autocapitalize="characters" spellcheck="false" aria-label="Paėmimo vietos koordinatės (MGRS)"><button class="btn sm" data-act="nl-gps">📍 Mano vieta (GPS → MGRS)</button>`, '8 skaitmenų tinklelio koordinatė (MGRS). GPS koordinates patikrinkite žemėlapyje.');
    h += card(2, s, `<div class="in3"><input class="inp" data-nl="freq" value="${esc(s.freq)}" placeholder="Dažnis" inputmode="decimal" autocomplete="off" aria-label="Dažnis"><input class="inp" data-nl="cs" value="${esc(s.cs)}" placeholder="Šaukinys" autocomplete="off" aria-label="Šaukinys"><input class="inp" data-nl="sfx" value="${esc(s.sfx)}" placeholder="Priesaga" autocomplete="off" aria-label="Priesaga"></div>`, 'Paėmimo vietos (ne retransliatoriaus) dažnis.');
    h += card(3, s, PREC.map(([k, lt, en]) => stepper('nl-p', k, s.p[k], k + ' – ' + lt, en)).join('') + precHelp(), 'Kiekvienai kategorijai – sužeistųjų skaičius.');
    h += card(4, s, '<div class="opts">' + EQ.map(([k, t]) => chip('nl-eq', k, s.eq.indexOf(k) >= 0, k + ' – ' + t)).join('') + '</div>');
    h += card(5, s, stepper('nl-lit', 'lit', s.lit, 'L – neštuvuose', 'Litter') + stepper('nl-amb', 'amb', s.amb, 'A – vaikštantys', 'Ambulatory'));
    h += s.peace ? card(6, s, `<textarea class="inp" data-nl="wounds" rows="2" placeholder="pvz. 2 šautinės žaizdos, 1 lūžis" aria-label="Sužalojimų skaičius ir tipas">${esc(s.wounds)}</textarea>`)
      : card(6, s, '<div class="opts">' + SEC.map(([k, t]) => chip('nl-sec', k, s.sec === k, k + ' – ' + t)).join('') + '</div>');
    h += card(7, s, '<div class="opts">' + MARK.map(([k, t]) => chip('nl-mark', k, s.mark === k, k + ' – ' + t)).join('') + `</div><input class="inp" data-nl="markTxt" value="${esc(s.markTxt)}" placeholder="Patikslinimas, pvz. žali dūmai" autocomplete="off" aria-label="Žymėjimo patikslinimas">`);
    h += card(8, s, NAT.map(([k, t]) => stepper('nl-nat', k, s.nat[k], k + ' – ' + t)).join(''), 'Koalicijos versija (JTS kortelėje – JAV / ne JAV). Vadovaukitės vieneto SOP.');
    h += s.peace ? card(9, s, `<textarea class="inp" data-nl="terrain" rows="2" placeholder="pvz. lygus laukas, šiaurėje elektros linija" aria-label="Vietovės aprašymas">${esc(s.terrain)}</textarea>`)
      : card(9, s, '<div class="opts">' + CBRN.map(([k, t]) => chip('nl-cbrn', k, s.cbrn.indexOf(k) >= 0, (k === '-' ? '' : k + ' – ') + t)).join('') + '</div>');
    h += `<section class="outp"><div class="nlh"><b>Perduoti</b></div><pre id="nl-out">${esc(text(s))}</pre>` +
      '<div class="acts"><button class="btn pri" data-act="nl-read">Skaityti per radiją</button><button class="btn" data-act="nl-copy">Kopijuoti</button><button class="btn" data-act="nl-share">Bendrinti</button><button class="btn" data-act="nl-clear">Išvalyti</button></div></section>';
    h += row('#/mist', 'MIST kortelė', MC.status()) + row('#/igudis/46', 'Pasiruošimas pervežimui ir perdavimas', 'Įgūdis #46');
    return h;
  }

  function act(el) {
    const s = get(), d = el.dataset, k = d.k;
    switch (d.act) {
      case 'nl-peace': s.peace = k === '1'; break;
      case 'nl-p': s.p[k] = Math.max(0, Math.min(99, (s.p[k] || 0) + (+d.d))); break;
      case 'nl-nat': s.nat[k] = Math.max(0, Math.min(99, (s.nat[k] || 0) + (+d.d))); break;
      case 'nl-lit': s.lit = Math.max(0, Math.min(99, s.lit + (+d.d))); break;
      case 'nl-amb': s.amb = Math.max(0, Math.min(99, s.amb + (+d.d))); break;
      case 'nl-eq': { if (k === 'A') s.eq = s.eq.indexOf('A') >= 0 ? [] : ['A']; else { s.eq = s.eq.filter(x => x !== 'A'); const i = s.eq.indexOf(k); if (i >= 0) s.eq.splice(i, 1); else s.eq.push(k); } break; }
      case 'nl-sec': s.sec = s.sec === k ? '' : k; break;
      case 'nl-mark': s.mark = s.mark === k ? '' : k; break;
      case 'nl-cbrn': { if (k === '-') s.cbrn = s.cbrn.indexOf('-') >= 0 ? [] : ['-']; else { s.cbrn = s.cbrn.filter(x => x !== '-'); const i = s.cbrn.indexOf(k); if (i >= 0) s.cbrn.splice(i, 1); else s.cbrn.push(k); } break; }
      case 'nl-copy': return copyText(text(s));
      case 'nl-share': return shareText('9-Line MEDEVAC', text(s));
      case 'nl-read': { const M = meaning(s); return readMode('9-Line MEDEVAC', lines(s).map((x, i) => `<span class="rn">${i + 1}</span>${esc(x || '—')}<small>${esc(titles(s)[i])}${M[i] ? ' · ' + esc(M[i]) : ''}</small>`)); }
      case 'nl-clear': if (!confirm('Išvalyti visą 9-Line prašymą?')) return; LS.set(KEY, def()); render(); return;
      case 'nl-gps': return gps();
      default: return;
    }
    save(s); render();
  }

  function gps() {
    if (!navigator.geolocation) return toast('Šis įrenginys vietos nustatymo nepalaiko');
    toast('Nustatoma vieta…');
    navigator.geolocation.getCurrentPosition(pos => {
      const m = toMGRS(pos.coords.latitude, pos.coords.longitude, 4);
      if (!m) return toast('Šiai vietovei MGRS netaikomas');
      const s = get(); s.l1 = m; save(s); render();
      toast('Vieta nustatyta, tikslumas ±' + Math.round(pos.coords.accuracy) + ' m');
    }, err => toast(err.code === 1 ? 'Vietos nustatymas neleidžiamas – leiskite naršyklės nustatymuose' : 'Nepavyko nustatyti vietos'), { enableHighAccuracy: true, timeout: 20000, maximumAge: 30000 });
  }

  function onInput(t) {
    const s = get(); s[t.dataset.nl] = t.value; save(s);
    const o = document.getElementById('nl-out'); if (o) o.textContent = text(s);
    const sec = t.closest('section.nl'); if (sec) { const n = [...document.querySelectorAll('section.nl')].indexOf(sec); sec.classList.toggle('ok', !!lines(s)[n]); }
  }
  return { view, act, onInput, status, lines, text };
})();

// ───────── MIST kortelė (vizuali: kūno schema, požymių lentelė) ─────────
const MC = (() => {
  const KEY = 'etc-mist';
  const MECH = ['Šautinė žaizda', 'Skeveldros', 'Sprogimas', 'Bukas sužalojimas', 'Nudegimas', 'Kritimas', 'Eismo įvykis', 'Kita'];
  // Žymės: [raktas, raidė, pavadinimas, spalva, raidės spalva]
  const MK = [['Z', 'Ž', 'Žaizda', '#C2410C', '#fff'], ['K', 'K', 'Kraujavimas', '#C0182B', '#fff'], ['L', 'L', 'Lūžis', '#1D5FB4', '#fff'],
    ['N', 'N', 'Nudegimas', '#F2B705', '#1B1B1B'], ['A', 'A', 'Amputacija', '#6B2A8C', '#fff'], ['T', 'T', 'Turniketas', '#111111', '#fff']];
  const mkT = k => MK.find(x => x[0] === k) || MK[0];
  const TX = [['tq', 'Turniketas'], ['pack', 'Tamponavimas'], ['press', 'Spaudžiamasis tvarstis'], ['occl', 'Okliuzinis tvarstis'], ['dec', 'Dekompresija'],
    ['aw', 'Kvėpavimo takai'], ['iv', 'IV / IO'], ['txa', 'TXA'], ['blood', 'Kraujas'], ['ca', 'Kalcis'], ['an', 'Analgezija'], ['ab', 'Antibiotikai'],
    ['spl', 'Įtvaras'], ['hypo', 'Hipotermijos prevencija']];
  const AVPU = [['A', 'budrus'], ['V', 'balsas'], ['P', 'skausmas'], ['U', 'nereaguoja']];
  const SEX = [['V', 'Vyras'], ['M', 'Moteris']];
  const VF = ['t', 'av', 'hr', 'rr', 'bp', 'spo2', 'gcs', 'pain'];
  const blankF = () => ({ t: '', av: '', hr: '', rr: '', bp: '', spo2: '', gcs: '', pain: '' });
  const def = () => ({ id: '', sex: '', t0: '', mech: [], mechTxt: '', mk: [], injTxt: '', vit: [], f: blankF(), tx: [], tqT: '', txaT: '', txTxt: '' });
  const str = v => v == null ? '' : String(v);
  function get() {
    const raw = LS.get(KEY, null), s = Object.assign(def(), raw && typeof raw === 'object' ? raw : {});
    ['id', 'sex', 't0', 'mechTxt', 'injTxt', 'tqT', 'txaT', 'txTxt'].forEach(k => { s[k] = str(s[k]); });
    ['mech', 'mk', 'vit', 'tx'].forEach(k => { if (!Array.isArray(s[k])) s[k] = []; });
    s.f = Object.assign(blankF(), s.f && typeof s.f === 'object' ? s.f : {});
    s.mk = s.mk.filter(m => m && (m.s === 'f' || m.s === 'b') && isFinite(m.x) && isFinite(m.y)).map(m => ({ t: mkT(m.t)[0], s: m.s, x: +m.x, y: +m.y, tm: str(m.tm) }));
    s.vit = s.vit.filter(v => v && typeof v === 'object');
    return s;
  }
  const save = s => LS.set(KEY, s);
  let tool = 'Z', undo = [];
  const snap = s => { undo.push(JSON.stringify(s.mk)); if (undo.length > 30) undo.shift(); };

  // ── kūno siluetas: viewBox 0 0 120 250, centras x = 60; priekis – paciento dešinė ekrano kairėje ──
  const SHAPES = '<ellipse cx="60" cy="20" rx="12" ry="15"/><path d="M54 31h12l1.5 14h-15z"/>' +
    '<path d="M50 43.5C41 44 35.5 46.5 34 55L37.5 99C36.5 112 36.5 125 38 138L59 143H61L82 138C83.5 125 83.5 112 82.5 99L86 55C84.5 46.5 79 44 70 43.5Z"/>' +
    '<path d="M35 49C27 50.5 24.5 56 24 64L19.5 101L13.5 139H21.5L28 104L33.5 80Z"/><path d="M85 49C93 50.5 95.5 56 96 64L100.5 101L106.5 139H98.5L92 104L86.5 80Z"/>' +
    '<ellipse cx="17" cy="148" rx="5.5" ry="9.5"/><ellipse cx="103" cy="148" rx="5.5" ry="9.5"/>' +
    '<path d="M38 134L39.5 182L42.5 228H54L56 182L59.5 142Z"/><path d="M82 134L80.5 182L77.5 228H66L64 182L60.5 142Z"/>' +
    '<ellipse cx="47.5" cy="235" rx="7.5" ry="5"/><ellipse cx="72.5" cy="235" rx="7.5" ry="5"/>';
  // Apytikslė kūno sritis pagal koordinates (tokia pati geometrija kaip SHAPES)
  function region(sd, x, y) {
    const dx = x - 60, ad = Math.abs(dx), back = sd === 'b';
    const right = (dx < 0) === !back, side = right ? 'dešinė' : 'kairė', Side = right ? 'Dešinė' : 'Kairė', bk = back ? ', užpakalinė pusė' : '';
    if (y < 35.5) return { o: 1, t: back ? 'Galva, pakaušis' : 'Galva, veidas' };
    if (y < 45 && ad <= 8.5) return { o: 2, t: back ? 'Sprandas' : 'Kaklas' };
    const th = y < 55 ? 26 : y < 99 ? 26 - (y - 55) / 44 * 3.5 : 22.5;
    if ((y < 58 && ad > 17) || (y < 140 && ad > th) || (y >= 140 && ad > 30)) {
      const part = y < 58 ? 'petys' : y < 101 ? 'žastas' : y < 138 ? 'dilbis' : 'plaštaka';
      return { o: right ? 6 : 7, t: Side + ' ranka – ' + part + bk };
    }
    if (y < 140) {
      const nmT = y < 90 ? (back ? 'Nugara' : 'Krūtinė') : y < 117 ? (back ? 'Juosmuo' : 'Pilvas') : (back ? 'Sėdmenys' : 'Dubuo / kirkšnis');
      return { o: y < 90 ? 3 : y < 117 ? 4 : 5, t: nmT + ', ' + (ad <= 5 ? 'vidurio linija' : side + ' pusė') };
    }
    const part = y < 182 ? 'šlaunis' : y < 228 ? 'blauzda' : 'pėda';
    return { o: right ? 8 : 9, t: Side + ' koja – ' + part + bk };
  }
  const mkName = m => mkT(m.t)[2].toLowerCase() + (m.t === 'T' && m.tm ? ' ' + m.tm : '');
  function sortedMk(s) {
    return s.mk.map((m, i) => ({ m, i, r: region(m.s, m.x, m.y) }))
      .sort((a, b) => a.r.o - b.r.o || (a.m.s === b.m.s ? 0 : a.m.s === 'f' ? -1 : 1) || a.m.y - b.m.y);
  }
  function injText(s) {
    const g = [];
    sortedMk(s).forEach(({ m, r }) => { const l = g[g.length - 1]; if (l && l.t === r.t) l.a.push(mkName(m)); else g.push({ t: r.t, a: [mkName(m)] }); });
    return [g.map(x => x.t + ': ' + x.a.join(', ')).join('; '), s.injTxt.trim()].filter(Boolean).join('; ');
  }
  const markerSvg = (m, i) => {
    const T = mkT(m.t), lb = T[2] + ' – ' + region(m.s, m.x, m.y).t;
    return `<g class="mk" data-act="mc-mdel" data-k="${i}" role="button" tabindex="0" aria-label="Pašalinti žymę: ${esc(lb)}" transform="translate(${m.x} ${m.y})"><circle class="hit" r="11"/><circle class="dot" r="8" fill="${T[3]}"/><text y="3.6" fill="${T[4]}">${T[1]}</text></g>`;
  };
  function figure(s, sd) {
    const lab = sd === 'f' ? ['D', 'K'] : ['K', 'D'], nmF = sd === 'f' ? 'Priekis' : 'Nugara';
    return `<figure class="bfig"><svg viewBox="0 0 120 250" data-act="mc-body" data-s="${sd}" role="img" aria-label="Kūnas – ${nmF.toLowerCase()}. Bakstelėkite sužalojimo vietą.">` +
      `<g class="bo">${SHAPES}</g><g class="bf">${SHAPES}</g>` + (sd === 'b' ? '<path class="bsp" d="M60 47V130"/>' : '') +
      `<text class="blr" x="9" y="14">${lab[0]}</text><text class="blr" x="111" y="14">${lab[1]}</text>` +
      s.mk.map((m, i) => m.s === sd ? markerSvg(m, i) : '').join('') + `</svg><figcaption>${nmF}</figcaption></figure>`;
  }
  const bdg = k => { const T = mkT(k); return `<span class="bdg" style="--c:${T[3]};--fg:${T[4]}" aria-hidden="true">${T[1]}</span>`; };

  // ── požymiai: tikrinimas ir išdėstymas ──
  const sys = bp => parseInt(String(bp || '').split('/')[0], 10);
  const abn = (k, v) => {
    if (v === '' || v == null) return false;
    const n = k === 'bp' ? sys(v) : +v;
    switch (k) {
      case 'av': return v === 'P' || v === 'U';
      case 'hr': return n > 120 || n < 50;
      case 'rr': return n > 29 || n < 10;
      case 'bp': return n < 90;
      case 'spo2': return n < 92;
      case 'gcs': return /^\d+$/.test(v) ? n <= 8 : false;
      default: return false;
    }
  };
  function vitLine(v) {
    return [v.ts + ' –', v.av ? 'AVPU ' + v.av : '', v.hr ? 'ŠSD ' + v.hr : '', v.rr ? 'KD ' + v.rr : '', v.bp ? 'AKS ' + v.bp : '', v.spo2 ? 'SpO₂ ' + v.spo2 + ' %' : '',
      v.gcs ? (v.gcs === 'NT' ? 'GKS ' + (v.gcsD || 'NT') + ' (suma neskaičiuojama)' : 'GKS ' + v.gcs + (v.gcsD ? ' (' + v.gcsD + ')' : '')) : '', v.pain !== '' && v.pain != null ? 'skausmas ' + v.pain + '/10' : '']
      .filter(Boolean).join(', ').replace(' –,', ' –');
  }
  const ACR = /^(TXA|IV|IO)\b/;
  const lc = a => a.map((x, i) => i === 0 || ACR.test(x) ? x : x.toLowerCase()).join(', ');
  function txList(s) { return TX.filter(([k]) => s.tx.indexOf(k) >= 0).map(([k, t]) => k === 'tq' && s.tqT ? t + ' ' + s.tqT : k === 'txa' && s.txaT ? t + ' ' + s.txaT : t); }
  const sexName = s => (SEX.find(x => x[0] === s.sex) || ['', ''])[1].toLowerCase();
  function parts(s) {
    const hd = ['MIST' + (s.id.trim() ? ' – ' + s.id.trim() : ''), sexName(s)].filter(Boolean).join(' · ');
    const M = [lc(s.mech), s.mechTxt.trim()].filter(Boolean).join('; ') + (s.t0 ? (s.mech.length || s.mechTxt.trim() ? '; ' : '') + 'sužeista ' + s.t0 : '');
    const S = s.vit.slice().reverse().map(vitLine);
    return { hd, M: M || '—', I: injText(s) || '—', S: S.length ? S : ['—'], T: [lc(txList(s)), s.txTxt.trim()].filter(Boolean).join('; ') || '—' };
  }
  function text(s) { const P = parts(s); return [P.hd, 'M: ' + P.M, 'I: ' + P.I, 'S: ' + P.S.join('\n   '), 'T: ' + P.T].join('\n'); }
  function status() {
    const s = get(), a = [];
    if (s.id.trim()) a.push(s.id.trim());
    if (s.mk.length) a.push(plural(s.mk.length, ['žymė', 'žymės', 'žymių']));
    if (s.vit.length) a.push(plural(s.vit.length, ['matavimas', 'matavimai', 'matavimų']));
    if (!a.length && (s.mech.length || s.tx.length || s.t0)) a.push('Pildoma');
    return a.length ? a.join(' · ') : 'Vizuali sužeistojo kortelė';
  }

  function secHead(letter, title, sub) { return `<div class="mcl"><span class="lt">${letter}</span><b>${title}</b>${sub ? '<small>' + sub + '</small>' : ''}</div>`; }

  function view() {
    const s = get(), learn = mode === 'learn', T = LS.get('etc-laikai', {}), F = s.f;
    let h = '<h1>MIST kortelė</h1>';
    if (learn) h += '<p class="muted">MIST – struktūruotas sužeistojo perdavimas: <b>M</b> – mechanizmas ir laikas, <b>I</b> – sužalojimai, <b>S</b> – požymiai ir jų dinamika, <b>T</b> – suteiktas gydymas. Kortelė pildoma eigoje ir perskaitoma perduodant (žr. ATMIST).</p>';
    h += '<article class="mc" aria-label="MIST kortelė">';
    h += '<div class="mch"><b>MIST</b><span>sužeistojo kortelė</span></div>';
    // antraštė: ID, lytis, sužeidimo laikas
    h += `<div class="mcid"><div class="in2"><label>ID / šaukinys<input class="inp" data-mc="id" value="${esc(s.id)}" autocomplete="off" placeholder="pvz. Vilkas 2"></label>` +
      `<div><span class="lbl0">Lytis</span><div class="chips">${SEX.map(([k, t]) => chip('mc-sex', k, s.sex === k, t)).join('')}</div></div></div>` +
      `<div class="tline"><span>Sužeidimo laikas</span><input type="time" class="inp" data-mc="t0" value="${esc(s.t0)}" aria-label="Sužeidimo laikas">` +
      (T.trauma ? `<button class="btn sm" data-act="mc-t0" data-k="tm">⏱ Laikmatis ${hm(T.trauma)}</button>` : '') + '<button class="btn sm" data-act="mc-now" data-k="t0">Dabar</button></div>' +
      (T.trauma ? '' : '<p class="muted mt0">Traumos laikmatis nenustatytas (Pradžia → Laikai).</p>') + '</div>';
    // M
    h += '<section class="mcs sM">' + secHead('M', 'Mechanizmas', 'galima keli') +
      '<div class="opts">' + MECH.map(m => chip('mc-mech', m, s.mech.indexOf(m) >= 0, esc(m))).join('') + '</div>' +
      `<input class="inp" data-mc="mechTxt" value="${esc(s.mechTxt)}" placeholder="Patikslinimas (nebūtina)" autocomplete="off" aria-label="Mechanizmo patikslinimas"></section>`;
    // I
    h += '<section class="mcs sI">' + secHead('I', 'Sužalojimai', 'pasirinkite žymę ir bakstelėkite kūną') +
      '<div class="mtool" role="radiogroup" aria-label="Žymės tipas">' + MK.map(([k, , t]) => `<button class="${tool === k ? 'on' : ''}" data-act="mc-tool" data-k="${k}" role="radio" aria-checked="${tool === k}">${bdg(k)}<span>${t}</span></button>`).join('') + '</div>' +
      '<div class="bfigs">' + figure(s, 'f') + figure(s, 'b') + '</div>' +
      `<div class="acts"><button class="btn" data-act="mc-undo"${undo.length ? '' : ' disabled'}>↶ Atšaukti</button><button class="btn" data-act="mc-mclr"${s.mk.length ? '' : ' disabled'}>Išvalyti žymes</button></div>`;
    const SM = sortedMk(s);
    h += SM.length ? '<ul class="mlist" aria-label="Žymės pagal kūno sritį">' + SM.map(({ m, i, r }) =>
      `<li>${bdg(m.t)}<div class="mt"><b>${esc(r.t)}</b> – ${esc(mkT(m.t)[2].toLowerCase())}` +
      (m.t === 'T' ? `<label class="mtq">Uždėtas<input type="time" class="inp" data-mcm="${i}" value="${esc(m.tm)}"></label>` : '') + '</div>' +
      `<button class="x" data-act="mc-mdel" data-k="${i}" aria-label="Pašalinti: ${esc(mkT(m.t)[2] + ' – ' + r.t)}">×</button></li>`).join('') + '</ul>'
      : '<p class="muted">Pasirinkite žymės tipą ir bakstelėkite kūno schemoje. Bakstelėjus žymę – ji pašalinama. D – paciento dešinė, K – kairė.</p>';
    h += `<input class="inp" data-mc="injTxt" value="${esc(s.injTxt)}" placeholder="Kiti sužalojimai, patikslinimas (nebūtina)" autocomplete="off" aria-label="Sužalojimų patikslinimas"></section>`;
    // S
    const num = (k, lb, ph, im) => `<label>${lb}<input class="inp" data-mcf="${k}" value="${esc(F[k])}" inputmode="${im || 'numeric'}" placeholder="${ph}" autocomplete="off"></label>`;
    h += '<section class="mcs sS">' + secHead('S', 'Požymiai', 'kartokite kas 5–10 min') +
      `<div class="tline"><span>Laikas <small>(tuščia – dabar)</small></span><input type="time" class="inp" data-mcf="t" value="${esc(F.t)}" aria-label="Matavimo laikas"></div>` +
      '<div class="lbl">Sąmonė (AVPU)</div><div class="chips avpu">' + AVPU.map(([k, t]) => chip('mc-av', k, F.av === k, `<b>${k}</b><small>${t}</small>`, ` aria-label="${k} – ${t}"`)).join('') + '</div>' +
      '<div class="vgrid">' + num('hr', 'ŠSD', 'k./min') + num('rr', 'KD', 'k./min') + num('bp', 'AKS', '120/80', 'text') + num('spo2', 'SpO₂', '%') + num('gcs', 'GKS', '3–15') + num('pain', 'Skausmas', '0–10') + '</div>' +
      '<button class="btn pri" data-act="mc-vit">+ Matavimas</button>';
    if (s.vit.length) {
      const V = s.vit.map((v, i) => ({ v, i })).reverse();
      const rowV = (k, lb, fmtv) => `<tr><th scope="row">${lb}</th>` + V.map(({ v }) => `<td class="${abn(k, v[k]) ? 'ab' : ''}">${esc(fmtv ? fmtv(v) : v[k]) || '·'}</td>`).join('') + '</tr>';
      h += '<div class="vtw"><table class="vt"><thead><tr><th scope="col">Laikas</th>' + V.map(({ v }) => `<th scope="col">${esc(v.ts)}</th>`).join('') + '</tr></thead><tbody>' +
        rowV('av', 'AVPU') + rowV('hr', 'ŠSD') + rowV('rr', 'KD') + rowV('bp', 'AKS') + rowV('spo2', 'SpO₂') + rowV('gcs', 'GKS') + rowV('pain', 'Skausmas') +
        '<tr class="vdel"><th scope="row"><span class="vh">Ištrinti</span></th>' + V.map(({ v, i }) => `<td><button class="x" data-act="mc-vdel" data-k="${i}" aria-label="Ištrinti ${esc(v.ts)} matavimą">×</button></td>`).join('') + '</tr>' +
        '</tbody></table></div><p class="muted">Naujausias – kairėje. Raudonai – už orientacinių ribų (suaugusiajam).</p>';
    } else h += '<p class="muted">Dar nėra matavimų. Pirmą įrašykite kuo anksčiau – svarbiausia dinamika.</p>';
    h += '</section>';
    // T
    h += '<section class="mcs sT">' + secHead('T', 'Gydymas', 'pažymėkite, kas atlikta') +
      '<div class="opts">' + TX.map(([k, t]) => chip('mc-tx', k, s.tx.indexOf(k) >= 0, esc(t))).join('') + '</div>' +
      (s.tx.indexOf('tq') >= 0 ? `<div class="tline"><span>Turniketo laikas</span><input type="time" class="inp" data-mc="tqT" value="${esc(s.tqT)}" aria-label="Turniketo laikas"><button class="btn sm" data-act="mc-now" data-k="tqT">Dabar</button></div>` : '') +
      (s.tx.indexOf('txa') >= 0 ? `<div class="tline"><span>TXA laikas</span><input type="time" class="inp" data-mc="txaT" value="${esc(s.txaT)}" aria-label="TXA laikas"><button class="btn sm" data-act="mc-now" data-k="txaT">Dabar</button></div>` : '') +
      `<textarea class="inp" data-mc="txTxt" rows="2" placeholder="Vaistai, dozės, būdai ir laikai, pvz. ketaminas 25 mg IV 14:20" aria-label="Gydymo patikslinimas">${esc(s.txTxt)}</textarea></section>`;
    h += '</article>';
    h += `<section class="outp"><div class="nlh"><b>Perduoti</b></div><pre id="mc-out">${esc(text(s))}</pre>` +
      '<div class="acts"><button class="btn pri" data-act="mc-read">Skaityti</button><button class="btn" data-act="mc-copy">Kopijuoti</button><button class="btn" data-act="mc-share">Bendrinti</button></div>' +
      '<div class="acts"><button class="btn dng" data-act="mc-new">Naujas sužeistasis – išvalyti kortelę</button></div></section>';
    h += row('#/gks', 'GKS skaičiuoklė', GK.status()) + row('#/9line', '9-Line MEDEVAC', NL.status()) + row('#/s/atmist', 'ATMIST perdavimas', 'Kontrolinis sąrašas') + row('#/igudis/46', 'Pasiruošimas pervežimui ir perdavimas', 'Įgūdis #46');
    return h;
  }

  // Bakstelėjimas ant schemos → viewBox koordinatės; tik ant silueto (arba šalia – pritraukiama)
  function bodyPoint(svg, e) {
    const ctm = svg.getScreenCTM(); if (!ctm) return null;
    let p = svg.createSVGPoint(); p.x = e.clientX; p.y = e.clientY; p = p.matrixTransform(ctm.inverse());
    const shapes = svg.querySelectorAll('.bf > *');
    const inside = (x, y) => {
      const q = svg.createSVGPoint(); q.x = x; q.y = y;
      try { for (const sh of shapes) if (sh.isPointInFill(q)) return true; return false; } catch (err) { return true; }
    };
    if (!shapes.length || !shapes[0].isPointInFill || inside(p.x, p.y)) return { x: p.x, y: p.y };
    for (let r = 2; r <= 6; r += 2) for (let a = 0; a < 8; a++) {
      const x = p.x + r * Math.cos(a * Math.PI / 4), y = p.y + r * Math.sin(a * Math.PI / 4);
      if (inside(x, y)) return { x, y };
    }
    return null;
  }

  function act(el, e) {
    const s = get(), d = el.dataset, k = d.k;
    switch (d.act) {
      case 'mc-sex': s.sex = s.sex === k ? '' : k; break;
      case 'mc-t0': { const T = LS.get('etc-laikai', {}); if (!T.trauma) { toast('Traumos laikmatis nenustatytas'); return; } s.t0 = hm(T.trauma); toast('Sužeidimo laikas ' + s.t0); break; }
      case 'mc-now': s[k] = nowHM(); break;
      case 'mc-mech': { const i = s.mech.indexOf(k); if (i >= 0) s.mech.splice(i, 1); else s.mech.push(k); break; }
      case 'mc-tool': {
        tool = mkT(k)[0];
        app.querySelectorAll('.mtool button').forEach(b => { const on = b.dataset.k === tool; b.classList.toggle('on', on); b.setAttribute('aria-checked', on); });
        return;
      }
      case 'mc-body': {
        if (!e || (!e.clientX && !e.clientY)) return;
        const p = bodyPoint(el, e);
        if (!p) { toast('Bakstelėkite ant kūno silueto'); return; }
        snap(s);
        const m = { t: tool, s: d.s === 'b' ? 'b' : 'f', x: Math.round(p.x * 10) / 10, y: Math.round(p.y * 10) / 10, tm: '' };
        if (tool === 'T') {
          const T = LS.get('etc-laikai', {});
          m.tm = T.turn ? hm(T.turn) : nowHM();
          if (s.tx.indexOf('tq') < 0) s.tx.push('tq');
          if (!s.tqT) s.tqT = m.tm;
          toast('Turniketas ' + m.tm + ' – laiką galite pakeisti sąraše po schema');
        }
        s.mk.push(m);
        if (navigator.vibrate) navigator.vibrate(15);
        break;
      }
      case 'mc-mdel': { const i = +k; if (!(i >= 0 && i < s.mk.length)) return; snap(s); s.mk.splice(i, 1); break; }
      case 'mc-undo': { if (!undo.length) return; try { s.mk = JSON.parse(undo.pop()); } catch (err) { return; } break; }
      case 'mc-mclr': if (!s.mk.length) return; snap(s); s.mk = []; toast('Žymės išvalytos – galite atšaukti'); break;
      case 'mc-av': s.f.av = s.f.av === k ? '' : k; break;
      case 'mc-vit': {
        const f = s.f;
        if (!VF.slice(1).some(x => String(f[x]).trim() !== '')) { toast('Įveskite bent vieną požymį'); return; }
        const n = (v, lo, hi) => { v = String(v).trim(); return v === '' || (/^\d{1,3}$/.test(v) && +v >= lo && +v <= hi); };
        if (f.t && !HM_RE.test(f.t)) { toast('Laikas: pvz. 14:05'); return; }
        if (!n(f.hr, 0, 300)) { toast('ŠSD: skaičius 0–300'); return; }
        if (!n(f.rr, 0, 99)) { toast('KD: skaičius 0–99'); return; }
        if (!n(f.spo2, 0, 100)) { toast('SpO₂: skaičius 0–100'); return; }
        if (!n(f.gcs, 3, 15)) { toast('GKS: skaičius 3–15'); return; }
        if (!n(f.pain, 0, 10)) { toast('Skausmas: skaičius 0–10'); return; }
        if (String(f.bp).trim() && !/^\d{2,3}\s*\/\s*\d{2,3}$|^\d{2,3}$/.test(String(f.bp).trim())) { toast('AKS: pvz. 90/60 arba tik sistolinis, pvz. 90'); return; }
        const v = { ts: f.t || nowHM() };
        VF.slice(1).forEach(x => { v[x] = String(f[x] == null ? '' : f[x]).trim().replace(/\s*\/\s*/, '/'); });
        s.vit.push(v); s.f = Object.assign(blankF(), { av: f.av }); toast('Matavimas įrašytas ' + v.ts); break;
      }
      case 'mc-vdel': { const i = +k; if (!(i >= 0 && i < s.vit.length)) return; if (!confirm('Ištrinti ' + s.vit[i].ts + ' matavimą?')) return; s.vit.splice(i, 1); break; }
      case 'mc-tx': {
        const i = s.tx.indexOf(k);
        if (i >= 0) s.tx.splice(i, 1);
        else {
          s.tx.push(k);
          if (k === 'tq' && !s.tqT) { const T = LS.get('etc-laikai', {}); const tm = s.mk.find(m => m.t === 'T' && m.tm); s.tqT = tm ? tm.tm : T.turn ? hm(T.turn) : nowHM(); }
          if (k === 'txa' && !s.txaT) s.txaT = nowHM();
        }
        break;
      }
      case 'mc-copy': return copyText(text(s));
      case 'mc-share': return shareText('MIST', text(s));
      case 'mc-read': {
        const P = parts(s), L = (c, l, t) => `<span class="rn ${c}">${l}</span>${esc(t)}`;
        return readMode(P.hd, [L('rM', 'M', P.M), L('rI', 'I', P.I), L('rS', 'S', P.S.join('\n')), L('rT', 'T', P.T)]);
      }
      case 'mc-new': if (!confirm('Naujas sužeistasis: išvalyti visą MIST kortelę?')) return; undo = []; LS.set(KEY, def()); render(); scrollTo(0, 0); toast('Kortelė išvalyta'); return;
      default: return;
    }
    save(s); render();
  }

  function onInput(t) {
    const s = get(), d = t.dataset;
    if (d.mc) s[d.mc] = t.value;
    else if (d.mcf) s.f[d.mcf] = t.value;
    else if (d.mcm != null) {
      const m = s.mk[+d.mcm]; if (!m) return;
      if (s.tqT === m.tm || !s.tqT) s.tqT = t.value;
      m.tm = t.value;
    }
    save(s);
    const o = document.getElementById('mc-out'); if (o) o.textContent = text(s);
  }

  // GKS skaičiuoklė → S skiltis (naujas matavimas arba papildomas paskutinis to paties laiko)
  function addGcs(g) {
    const s = get(), last = s.vit[s.vit.length - 1];
    if (last && last.ts === g.ts && !last.gcs) { last.gcs = g.v; last.gcsD = g.d; }
    else s.vit.push({ ts: g.ts, av: '', hr: '', rr: '', bp: '', spo2: '', gcs: g.v, gcsD: g.d, pain: '' });
    save(s);
  }
  return { view, act, onInput, status, text, addGcs, region };
})();

// ───────── GKS (Glasgow) skaičiuoklė – GCS at 40 ─────────
const GK = (() => {
  const KEY = 'etc-gks';
  const G = [
    { k: 'e', lb: 'Akys', ab: 'A', o: [['4', 'Atsimerkia savaime'], ['3', 'Atsimerkia į garsą', 'kalbinamas'], ['2', 'Atsimerkia į spaudimą'], ['1', 'Neatsimerkia'], ['NT', 'Neįvertinama', 'pvz., uždarytos akys dėl patinimo']] },
    { k: 'v', lb: 'Kalba', ab: 'K', o: [['5', 'Orientuotas'], ['4', 'Sumišęs'], ['3', 'Pavieniai žodžiai'], ['2', 'Tik garsai'], ['1', 'Nėra'], ['NT', 'Neįvertinama', 'intubuotas']] },
    { k: 'm', lb: 'Motorika', ab: 'M', o: [['6', 'Vykdo komandas'], ['5', 'Lokalizuoja skausmą (spaudimą)'], ['4', 'Normali fleksija', 'atitraukia'], ['3', 'Patologinė fleksija'], ['2', 'Ekstenzija'], ['1', 'Nėra'], ['NT', 'Neįvertinama', 'pvz., paralyžius ar kitas trukdis']] }
  ];
  const PUP = [['0', 'Abu reaguoja'], ['1', 'Vienas nereaguoja'], ['2', 'Abu nereaguoja']];
  const def = () => ({ e: '', v: '', m: '', p: '', h: [] });
  const okv = (k, v) => v === '' || (G.find(g => g.k === k) || { o: [] }).o.some(o => o[0] === v);
  function get() {
    const raw = LS.get(KEY, null), s = Object.assign(def(), raw && typeof raw === 'object' ? raw : {});
    ['e', 'v', 'm', 'p'].forEach(k => { s[k] = s[k] == null ? '' : String(s[k]); });
    ['e', 'v', 'm'].forEach(k => { if (!okv(k, s[k])) s[k] = ''; });
    if (['', '0', '1', '2'].indexOf(s.p) < 0) s.p = '';
    if (!Array.isArray(s.h)) s.h = [];
    return s;
  }
  const save = s => LS.set(KEY, s);
  function calc(s) {
    const comp = 'A' + (s.e || '–') + ' K' + (s.v || '–') + ' M' + (s.m || '–');
    if (!s.e || !s.v || !s.m) return { done: false, comp };
    if ([s.e, s.v, s.m].indexOf('NT') >= 0) return { done: true, nt: true, comp };
    const tot = +s.e + +s.v + +s.m;
    return { done: true, tot, comp, gp: s.p !== '' ? tot - +s.p : null, sev: tot >= 13 ? 1 : tot >= 9 ? 2 : 3 };
  }
  const SEV = ['', 'Lengva (13–15)', 'Vidutinė (9–12)', 'Sunki (3–8) – ≤ 8: apsaugokite kvėpavimo takus'];
  const label = c => c.nt ? c.comp : 'GKS ' + c.tot + ' (' + c.comp + ')';
  const histLine = x => { const c = calc(x); return x.ts + ' – ' + label(c) + (c.gp != null ? ' · GKS-P ' + c.gp : ''); };
  function status() {
    const s = get(), x = s.h[0];
    return x ? 'Paskutinė: ' + histLine(x) : 'Glasgow komos skalė, GKS-P';
  }
  function resBox(s) {
    const c = calc(s);
    let h = `<div class="gres${c.done && !c.nt ? ' sev' + c.sev : ''}" id="gres" aria-live="polite">`;
    if (!c.done) h += `<div class="gt">GKS – <small>${esc(c.comp)}</small></div><div class="gsv">Pasirinkite akių, kalbos ir motorikos atsaką</div>`;
    else if (c.nt) h += `<div class="gt">${esc(c.comp)}</div><div class="gsv">Bendros sumos skaičiuoti negalima – perduokite komponentus</div>`;
    else h += `<div class="gt">${esc(label(c))}</div><div class="gsv">${esc(SEV[c.sev])}</div>` + (c.gp != null ? `<div class="gsv"><b>GKS-P ${c.gp}</b> (GKS ${c.tot} − vyzdžiai ${s.p})</div>` : '');
    return h + '</div>';
  }
  function view() {
    const s = get(), learn = mode === 'learn';
    let h = '<h1>GKS skaičiuoklė</h1><p class="muted">Glasgow komos skalė (GCS at 40). Vertinkite geriausią atsaką; perduokite ir komponentus, ne vien sumą.</p>';
    G.forEach(g => {
      h += `<section class="nl gsec" role="radiogroup" aria-label="${g.lb}"><div class="nlh"><span class="nn">${g.ab}</span><b>${g.lb}</b><small class="gsel">${s[g.k] ? g.ab + s[g.k] : ''}</small></div>` +
        g.o.map(([v, t, sub]) => `<button class="gopt${s[g.k] === v ? ' on' : ''}${v === 'NT' ? ' nt' : ''}" data-act="gk-set" data-g="${g.k}" data-k="${v}" role="radio" aria-checked="${s[g.k] === v}"><span class="gs">${v}</span><span>${esc(t)}${sub ? '<small>' + esc(sub) + '</small>' : ''}</span></button>`).join('') + '</section>';
    });
    const c = calc(s);
    h += '<section class="nl"><div class="nlh"><span class="nn">P</span><b>Vyzdžių reakcija</b><small class="muted">nebūtina</small></div>' +
      '<div class="opts">' + PUP.map(([k, t]) => chip('gk-p', k, s.p === k, esc(t) + ` <small>${k === '0' ? '0' : '−' + k}</small>`)).join('') + '</div>' +
      `<p class="muted">GKS-P = GKS − nereaguojančių vyzdžių skaičius (0–2)${c.done && !c.nt ? '' : '; rodoma, kai įvertinti visi trys komponentai'}.</p></section>`;
    h += resBox(s);
    h += '<div class="acts"><button class="btn pri" data-act="gk-save">Išsaugoti su laiku</button><button class="btn" data-act="gk-mist">Į MIST</button><button class="btn" data-act="gk-clr">Išvalyti</button></div>';
    if (s.h.length) h += '<h2>Istorija</h2><div class="vlist">' + s.h.map((x, i) => `<div class="vr"><span>${esc(histLine(x))}</span><button class="x" data-act="gk-hdel" data-k="${i}" aria-label="Ištrinti įrašą ${esc(x.ts)}">×</button></div>`).join('') + '</div>';
    if (learn) h += '<h2>Kaip vertinti</h2><div class="card esme"><ul>' +
      '<li><b>Patikrinkite</b> trukdžius: klausa, kalbos barjeras, intubacija, patinimas, sedacija, paralyžius.</li>' +
      '<li><b>Stebėkite</b>, ką pacientas daro savaime, tada <b>stimuliuokite</b>: pirmiausia garsas (kalbinkite, jei reikia – garsiai šaukite), tik tada fizinis stimulas.</li>' +
      '<li><b>Spaudimo stimulas</b> (iki 10 s, palaipsniui didinant jėgą): periferinis – <b>nago guolio</b> (piršto galiuko) spaudimas; centriniai – <b>trapecinio raumens</b> suspaudimas tarp nykščio ir pirštų arba <b>antakio – supraorbitalinės įdubos</b> spaudimas. Akims ir fleksijai vertinti – periferinis, lokalizacijai – centrinis stimulas.</li>' +
      '<li><b>Lokalizuoja</b> – ranka pakyla virš raktikaulio link stimulo galvoje ar kakle. <b>Normali fleksija</b> – greitas sulenkimas per alkūnę; <b>patologinė</b> – lėtas, stereotipinis, dilbis prie krūtinės, kumštis sugniaužtas.</li>' +
      '<li>Registruokite komponentus (pvz., A3 K4 M5); neįvertinamą komponentą žymėkite NT ir sumos neskaičiuokite.</li></ul></div>' +
      '<p class="muted">Šaltinis: Teasdale G. et al. The Glasgow Coma Scale at 40 years: standing the test of time. Lancet Neurol 2014; GKS-P – Brennan P. M. et al., J Neurosurg 2018.</p>' +
      '<a class="row" href="https://www.glasgowcomascale.org/" target="_blank" rel="noopener"><div>Glasgow Coma Scale<small>glasgowcomascale.org</small></div><span class="ar">↗</span></a>';
    h += row('#/mist', 'MIST kortelė', MC.status()) + row('#/igudis/12', 'Vyzdžiai, AVPU, galūnių simetrija ir GKS', 'Įgūdis #12');
    return h;
  }
  function act(el) {
    const s = get(), d = el.dataset, k = d.k;
    switch (d.act) {
      case 'gk-set': if (!okv(d.g, k)) return; s[d.g] = s[d.g] === k ? '' : k; break;
      case 'gk-p': s.p = s.p === k ? '' : k; break;
      case 'gk-clr': s.e = s.v = s.m = s.p = ''; break;
      case 'gk-save': {
        if (!calc(s).done) { toast('Įvertinkite visus tris komponentus'); return; }
        s.h.unshift({ ts: nowHM(), at: Date.now(), e: s.e, v: s.v, m: s.m, p: s.p }); s.h = s.h.slice(0, 12);
        toast('Išsaugota ' + s.h[0].ts); break;
      }
      case 'gk-hdel': { const i = +k; if (i >= 0 && i < s.h.length) s.h.splice(i, 1); break; }
      case 'gk-mist': {
        const c = calc(s), x = s.h[0];
        if (c.done && !(x && x.e === s.e && x.v === s.v && x.m === s.m && x.p === s.p)) { s.h.unshift({ ts: nowHM(), at: Date.now(), e: s.e, v: s.v, m: s.m, p: s.p }); s.h = s.h.slice(0, 12); }
        const y = s.h[0];
        if (!y) { toast('Pirmiausia įvertinkite visus tris komponentus'); return; }
        const cy = calc(y);
        MC.addGcs({ ts: y.ts, v: cy.nt ? 'NT' : String(cy.tot), d: cy.comp + (cy.gp != null ? ', GKS-P ' + cy.gp : '') });
        toast('Į MIST kortelę įrašyta: ' + histLine(y)); break;
      }
      default: return;
    }
    save(s);
    const y = scrollY; render(); scrollTo(0, y);
  }
  return { view, act, status, calc };
})();

// ───────── TST – Ten Second Triage (NHS England, 2023) ─────────
const TS = (() => {
  const KEY = 'etc-tst';
  // Algoritmas: NHS England Ten Second Triage tool (2023 m. balandis); Vassallo et al., Trauma 2023
  const Q = {
    q1: { n: '1 / 4', q: 'Vaikšto?', yes: { c: 'p3' }, no: 'q2', y: 'vaikšto', nn: 'nevaikšto' },
    q2: { n: '2 / 4', q: 'Gausus (masyvus) kraujavimas?', hint: 'TAIP – iškart: spaudimas, turniketas, tamponavimas.', yes: { c: 'p1', a: 'spaudimas, turniketas, tamponavimas' }, no: 'q3', y: 'gausus kraujavimas', nn: 'be gausaus kraujavimo' },
    q3: { n: '3 / 4', q: 'Kalba?', hint: 'Vaikas, kuris dar nekalba – atsakykite „NE“.', yes: 'q3a', no: 'q4', y: 'kalba', nn: 'nekalba' },
    q3a: { n: '3a', q: 'Penetruojantis liemens sužalojimas?', hint: 'Priekyje ar nugaroje.', yes: { c: 'p1' }, no: { c: 'p2' }, y: 'penetruojantis liemens sužalojimas', nn: 'be penetruojančio liemens sužalojimo' },
    q4: { n: '4 / 4', q: 'Kvėpuoja?', hint: 'Atverkite kvėpavimo takus, jei galite.', yes: { c: 'p1', a: 'stabili šoninė padėtis' }, no: { c: 'nb' }, y: 'kvėpuoja', nn: 'nekvėpuoja' }
  };
  const CAT = { p1: ['P1', 'Neatidėliotina', 'tp1'], p2: ['P2', 'Skubi', 'tp2'], p3: ['P3', 'Gali palaukti / vaikšto', 'tp3'], nb: ['NEKVĖPUOJA', 'Gaivinimas – tik jei leidžia ištekliai', 'tnb'] };
  const KS = ['p1', 'p2', 'p3', 'nb'];
  const STALE = 15 * 60e3; // po 15 min neveiklumo eiga pradedama nuo 1 klausimo (skaičiavimas lieka)
  let shownAt = 0;         // apsauga nuo atsitiktinio dvigubo bakstelėjimo
  const def = () => ({ st: 'q1', path: [], res: null, n: { p1: 0, p2: 0, p3: 0, nb: 0 } });
  function get(noStale) {
    const raw = LS.get(KEY, null), s = Object.assign(def(), raw && typeof raw === 'object' ? raw : {});
    if (!Q[s.st]) s.st = 'q1';
    if (!Array.isArray(s.path)) s.path = [];
    s.path = s.path.filter(p => p && Q[p.q]);
    s.n = Object.assign(def().n, s.n && typeof s.n === 'object' ? s.n : {});
    KS.forEach(k => { s.n[k] = Math.max(0, Math.min(999, parseInt(s.n[k], 10) || 0)); });
    if (s.res && !CAT[s.res.c]) s.res = null;
    if (!noStale && (s.st !== 'q1' || s.res || s.path.length) && !(s.at > Date.now() - STALE)) { s.st = 'q1'; s.path = []; s.res = null; save(s); }
    return s;
  }
  const save = s => LS.set(KEY, s);
  const total = s => KS.reduce((a, k) => a + s.n[k], 0);
  function status() {
    const s = get(), t = total(s);
    return t ? 'Iš viso ' + t + ' · ' + KS.filter(k => s.n[k]).map(k => (k === 'nb' ? 'Nekv.' : CAT[k][0]) + ' ' + s.n[k]).join(' · ') : 'Ten Second Triage – rūšiavimas per 10 s';
  }
  const why = s => s.path.map(p => p.a ? Q[p.q].y : Q[p.q].nn).join(' → ');

  function card(s) {
    if (s.res) {
      const C = CAT[s.res.c];
      return `<section class="tres ${C[2]}" aria-live="polite"><div class="trc">${C[0]}</div><div class="trn">${esc(C[1])}</div>` +
        (s.res.a ? `<div class="tra">Veiksmai: ${esc(s.res.a)}</div>` : '') + `<div class="trw">${esc(why(s))}</div>` +
        `<div class="trw">Pridėta prie skaičiavimo: ${C[0] === 'NEKVĖPUOJA' ? 'Nekvėpuoja' : C[0]} = ${s.n[s.res.c]}</div>` +
        `<button class="trnext" data-act="ts-next">Kitas sužeistasis ›</button><button class="btn tbk" data-act="ts-back">‹ Atgal – taisyti atsakymą</button></section>`;
    }
    const q = Q[s.st];
    return `<section class="tq" aria-live="polite"><div class="tqh"><span class="tqn">Klausimas ${q.n}</span>` +
      (s.path.length ? '<button class="btn sm" data-act="ts-back">‹ Atgal</button>' : '') + '</div>' +
      `<p class="tqq">${esc(q.q)}</p>${q.hint ? `<p class="tqs">${esc(q.hint)}</p>` : ''}` +
      `<div class="yn"><button class="yes" data-act="ts-ans" data-k="1">TAIP</button><button class="no" data-act="ts-ans" data-k="0">NE</button></div></section>`;
  }
  function tally(s) {
    return `<section class="nl tal"><div class="nlh"><b>Skaičiavimas</b><span class="ttot">Iš viso: <b>${total(s)}</b></span></div>` +
      KS.map(k => `<div class="tlr"><span class="tcat ${CAT[k][2]}">${k === 'nb' ? '✕' : CAT[k][0]}</span><span class="tln">${k === 'nb' ? 'Nekvėpuoja' : esc(CAT[k][1])}</span>` +
        `<button data-act="ts-inc" data-k="${k}" data-d="-1" aria-label="Mažiau: ${k === 'nb' ? 'Nekvėpuoja' : CAT[k][0]}">−</button><span class="sv">${s.n[k]}</span><button data-act="ts-inc" data-k="${k}" data-d="1" aria-label="Daugiau: ${k === 'nb' ? 'Nekvėpuoja' : CAT[k][0]}">+</button></div>`).join('') +
      '<div class="acts"><button class="btn dng" data-act="ts-reset">Nunulinti skaičiavimą</button></div></section>';
  }
  function flow(s) {
    const cur = s.res ? '' : s.st, fr = (id, q, sub, out) => `<div class="fr${cur === id || (id === 'q3' && cur === 'q3a') ? ' cur' : ''}"><div class="fq">${q}${sub ? '<small>' + sub + '</small>' : ''}</div><div class="fy">TAIP →</div>${out}</div>`;
    const no = '<div class="fn">NE ↓</div>';
    return '<section class="tfc" aria-label="TST schema"><div class="nlh"><b>Schema</b></div>' +
      fr('q1', '1. Vaikšto?', '', '<div class="fo tp3">P3<small>gali palaukti</small></div>') + no +
      fr('q2', '2. Gausus (masyvus) kraujavimas?', '', '<div class="fo tp1">P1<small>spaudimas, turniketas, tamponavimas</small></div>') + no +
      fr('q3', '3. Kalba?', 'nekalbantis vaikas – NE', '<div class="fo fsub">Penetruojantis liemens sužalojimas?<span><b class="tp1"><small>TAIP</small>P1</b><b class="tp2"><small>NE</small>P2</b></span></div>') + no +
      fr('q4', '4. Kvėpuoja?', 'atverkite kvėpavimo takus', '<div class="fo tp1">P1<small>stabili šoninė padėtis</small></div>') + no +
      '<div class="fr fend"><div class="fo tnb">NEKVĖPUOJA<small>gaivinimas – tik jei leidžia ištekliai</small></div></div></section>';
  }
  function view() {
    const s = get(), learn = mode === 'learn';
    let h = '<h1>TST – rūšiavimas per 10 sekundžių</h1>';
    shownAt = Date.now();
    h += card(s) + tally(s) + flow(s);
    if (learn) h += '<div class="card">Ten Second Triage (TST) – Jungtinės Karalystės civilinė masinių nelaimių rūšiavimo priemonė (NHS England, 2023), pakeitusi ankstesnį „triage sieve“. Ją gali taikyti bet kuris pirmasis atvykęs reaguotojas: keli paprasti klausimai, apie 10 sekundžių vienam sužeistajam, be fiziologinių matavimų. Mūsų darbe galioja vietinės SOP ir TCCC rūšiavimo kategorijos – TST yra pagalbinė atmintinė.</div>';
    h += '<div class="card"><b>Svarbu</b><ul class="tnotes"><li>Vaikas, kuris dar nekalba – atsakykite „nekalba“ (→ 4 klausimas).</li><li>TST nenaudoja fiziologinių matavimų (pulso, KD, kapiliarų prisipildymo).</li><li>Skirta vienam vertintojui.</li><li>Po rūšiavimo kartokite – pakartotinis rūšiavimas, būklė keičiasi.</li></ul></div>';
    if (learn) h += '<p class="muted">Šaltiniai: NHS England, Ten Second Triage tool (2023 m. balandis); Vassallo J. et al. The Ten Second Triage tool. Trauma 2023.</p>' +
      '<a class="row" href="https://www.england.nhs.uk/long-read/ten-second-triage-tool/" target="_blank" rel="noopener"><div>Ten Second Triage tool<small>NHS England</small></div><span class="ar">↗</span></a>' +
      '<a class="row" href="https://doi.org/10.1177/14604086231156219" target="_blank" rel="noopener"><div>Vassallo et al., Trauma 2023<small>doi 10.1177/14604086231156219</small></div><span class="ar">↗</span></a>';
    return h;
  }
  function act(el) {
    const s = get(true), d = el.dataset, k = d.k;
    if ((d.act === 'ts-ans' || d.act === 'ts-next' || d.act === 'ts-back') && Date.now() - shownAt < 450) return;
    s.at = Date.now();
    switch (d.act) {
      case 'ts-ans': {
        if (s.res) return;
        const q = Q[s.st], yes = k === '1', nx = yes ? q.yes : q.no;
        s.path.push({ q: s.st, a: yes ? 1 : 0 });
        if (typeof nx === 'string') s.st = nx;
        else { s.res = { c: nx.c, a: nx.a || '' }; s.n[nx.c] = Math.min(999, s.n[nx.c] + 1); if (navigator.vibrate) navigator.vibrate(40); }
        break;
      }
      case 'ts-back': {
        if (s.res) { s.n[s.res.c] = Math.max(0, s.n[s.res.c] - 1); s.res = null; }
        const p = s.path.pop(); if (p) s.st = p.q;
        break;
      }
      case 'ts-next': s.st = 'q1'; s.path = []; s.res = null; break;
      case 'ts-inc': if (!CAT[k]) return; s.n[k] = Math.max(0, Math.min(999, s.n[k] + (+d.d))); break;
      case 'ts-reset': if (!confirm('Nunulinti visą rūšiavimo skaičiavimą?')) return; s.n = def().n; break;
      default: return;
    }
    save(s);
    const y = scrollY; render(); shownAt = Date.now();
    if (d.act === 'ts-ans' || d.act === 'ts-next' || d.act === 'ts-back') { const c = app.querySelector('.tq, .tres'); if (c && c.getBoundingClientRect().top < 0) c.scrollIntoView({ block: 'start' }); else scrollTo(0, y); }
    else scrollTo(0, y);
  }
  return { view, act, status };
})();
