'use strict';
const W_LIST = [50, 60, 70, 80, 90, 100, 120];
const ok = g => !(hide() && isDoc(g));
const tabBtn = (lb, r, on) => `<button class="${on ? 'on' : ''}" data-act="go" data-r="${r}">${esc(lb)}</button>`;
const ul = a => '<ul>' + a.map(x => '<li>' + esc(x) + '</li>').join('') + '</ul>';
const drugById = id => (E.vaistai || []).find(x => x.id === id);
const skillById = id => (E.igudziai || []).find(x => String(x.id) === String(id));
const pirmIdx = r => Math.max(0, (r.lists || []).findIndex(l => /-pir$/.test(l)));
const ratings = () => LS.get('etc-ivert', {});
const progBar = (n, tot) => `<div class="prog"><i style="width:${tot ? Math.round(n / tot * 100) : 0}%"></i></div>`;
// Paciento svoris: wNow() – nurodytas (0 – nenurodytas), wCalc() – skaičiavimui (nenurodžius – 80 kg)
const wNow = () => { const w = +LS.get('etc-svoris', 0); return w > 0 ? w : 0; };
const wCalc = () => wNow() || 80;
// Svoris – greiti lustai ir „Kitas…“ (bet koks 3–250 kg, skaičių klaviatūra); noNote – be „80 kg numatytas“ pastabos (skysčiai be svorio neskaičiuojami)
let wOther = false;
const wChips = (w, noNote) => '<div class="chips wch">' + W_LIST.map(x => `<button class="${x === w ? 'on' : ''}" data-act="w" data-w="${x}" aria-pressed="${x === w}">${x}</button>`).join('') +
  (w && W_LIST.indexOf(w) < 0 ? `<button class="on" data-act="w-other" aria-pressed="true" aria-label="Svoris ${w} kg – keisti">${w}</button>` : `<button data-act="w-other" aria-expanded="${wOther}">Kitas…</button>`) + '</div>' +
  (wOther ? '<div class="wother"><input class="inp" id="w-in" inputmode="decimal" placeholder="kg" aria-label="Svoris, kg" autocomplete="off"><button class="btn pri" data-act="w-ok">Gerai</button></div>' : '') +
  (w || noNote ? '' : '<p class="muted mt0">Svoris nenurodytas – dozės skaičiuojamos 80 kg (numatytas).</p>');
const rateBadge = (R, id) => R[id] ? `<span class="tag ${R[id] >= 3 ? 'grn' : 'amb'}">${R[id]} / 4</span>` : '';
const listDone = id => {
  const L = (E.sarasai || {})[id]; if (!L) return [0, 0];
  const d = ckAll()[id] || [], hd = hide(); let n = 0, t = 0;
  (L.items || []).forEach((it, i) => { if (it.h || (hd && isDoc(it.g))) return; t++; if (d.indexOf(i) >= 0) n++; });
  return [n, t];
};
const listRow = id => {
  const L = (E.sarasai || {})[id]; if (!L) return '';
  const [n, t] = listDone(id);
  return row(listRoute(id), L.title, '', n ? `<span class="tag ${n === t ? 'grn' : 'amb'}">${n} / ${t}</span>` : '');
};
function doseShort(v, w) {
  const d = (v.dozes || [])[0] || ((v.stulpeliai || [])[0] || { dozes: [] }).dozes[0]; if (!d) return v.klase || '';
  return d.k + ': ' + (d.c ? calc(d.c, w) + ' (' + w + ' kg)' + (d.c.alt ? ' · ' + d.c.alt : '') : d.d);
}
function tocHtml(html) {
  const hs = []; let i = 0;
  const out = html.replace(/<h3>([\s\S]*?)<\/h3>/g, (m, t) => { const id = 'h' + (i++); hs.push([id, strip(t)]); return `<h3 id="${id}">${t}</h3>`; });
  if (hs.length < 3) return html;
  return '<div class="toc">' + hs.map(([id, t]) => `<button data-act="toc" data-t="${id}">${esc(t)}</button>`).join('') + '</div>' + out;
}
const videos = a => (a || []).length ? '<h2>Vaizdo įrašai</h2>' + a.map(videoHtml).join('') : '';

const brand = () => '<div class="brand"><img class="lg-d" src="img/logo-balt.png" alt="LŠS Vilniaus 1040 medicinos šaulių kuopa"><img class="lg-l" src="img/logo-juod.png" alt="LŠS Vilniaus 1040 medicinos šaulių kuopa"></div>';
const installed = () => matchMedia('(display-mode: standalone)').matches || navigator.standalone;
const installRow = () => installed() ? '' : row('#/idiegimas', 'Įdiekite programėlę telefone', 'Android ir iPhone – 1 minutė, veikia be interneto');
// Įrankiai (tools.js): būsena rodoma po pavadinimu
const GRUPES = [['K', 'Komanda, apžiūra ir pervežimas'], ['A', 'A – kvėpavimo takai ir neurologija'], ['B', 'B – kvėpavimas, krūtinė, dubuo'], ['C', 'C – kraujavimas ir kraujotaka'], ['S', 'D/E – galva, antrinė apžiūra, žaizdos'], ['V', 'Vaistai ir skausmas']];
const grupesPav = g => (GRUPES.find(x => x[0] === g) || ['', ''])[1];
const skillOrder = () => GRUPES.reduce((a, [g]) => a.concat((E.igudziai || []).filter(s => s.grupe === g)), []).concat((E.igudziai || []).filter(s => !GRUPES.some(([g]) => g === s.grupe)));
const figHtml = f => `<figure class="fig"><a href="${esc(f.src)}" target="_blank" rel="noopener"><img loading="lazy" src="${esc(f.src)}" alt="${esc(f.cap)}"></a><figcaption>${esc(f.cap)}<small>Iliustracija: Joint Trauma System (Deployed Medicine)${f.orig ? ` · <a href="${esc(f.orig)}" target="_blank" rel="noopener">tccc.org.ua</a>` : ''}</small></figcaption></figure>`;

const V = {
  home() { return mode === 'field' ? V.homeField() : V.homeLearn(); },

  roles(field) {
    return '<div class="grid3">' + (E.vaidmenys || []).map(r =>
      `<a class="role ${r.cls || ''}" href="#/v/${r.id}?f=${field ? pirmIdx(r) : 0}"><b>${esc(r.id)}</b><small>${esc(r.sub || '')}</small>${field ? '<small class="rs">Pirminė apžiūra</small>' : ''}</a>`).join('') + '</div>';
  },

  // Įrankiai: plytelės – 10s triažas + Mascal (didesnės) · 9-Line + SITREP · GKS + Nudegimai · Kraujas + Kraujo transfuzija · Skiedimas.
  // MIST kortelė ir vaistų žymėjimas – paciento ekrane (apatinė navigacija „Pacientas“).
  toolTiles() {
    const st = m => { try { return m().status(); } catch (e) { return ''; } }; // tools.js gali būti neįkeltas
    const P = E.puslapiai || {}, nl = st(() => NL), gk = st(() => GK).replace(/^Paskutinė: /, ''), ts = st(() => TS);
    const t = (href, ti, b, sm, lb) => `<a class="tool" href="${href}" aria-label="${esc(lb)}: ${esc(sm)}"><span class="ti">${ti}</span><b>${b}</b><small>${esc(sm)}</small></a>`;
    const big = s => s.replace('class="tool"', 'class="tool big"');
    return '<div class="tools">' +
      big(t('#/tst', '10s', '10s triažas', ts, '10s triažas')) + big(t('#/mascal', 'MC', 'Mascal', st(() => MS), 'Mascal')) +
      t('#/9line', '9', '9-Line', nl, '9-Line MEDEVAC prašymas') + t('#/sitrep', 'SR', 'SITREP', st(() => SR), 'SITREP – padėties pranešimas') +
      t('#/gks', 'G', 'GKS', gk, 'GKS skaičiuoklė') + t('#/nudegimai', 'N', 'Nudegimai ir nušalimai', st(() => NB), 'Nudegimai ir nušalimai') + (P.kraujas ? t('#/p/kraujas', 'K', 'Kraujas', 'ABO ir RhD lentelė', 'Kraujo suderinamumas') : '') +
      t('#/pilnas-kraujas', 'KT', 'Kraujo transfuzija', st(() => KR), 'Kraujo transfuzija') + (P.skiedimas ? t('#/p/skiedimas', 'S', 'Skiedimas', 'Vaistų skiedimo lentelės', 'Vaistų skiedimas') : '') + '</div>';
  },

  escRows() {
    return (E.escape || []).map(id => {
      const L = (E.sarasai || {})[id];
      return L ? `<a class="row esc" href="#/s/${id}">${esc(L.title)}<span class="ar">›</span></a>` : '';
    }).join('');
  },

  // Mokymosi pradžia: įrankiai plytelėmis su piktogramomis (kaip March gide) – trys grupės
  learnTools() {
    const st = m => { try { return m().status(); } catch (e) { return ''; } };
    const ic = d => `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
    const t = (href, ti, b, sm, lb) => `<a class="tool" href="${href}" aria-label="${esc(lb)}: ${esc(sm)}"><span class="ti">${ti}</span><b>${b}</b><small>${esc(sm)}</small></a>`;
    const med = (href, ti, b, s, lb) => t(href, ti, b, s, lb);
    return '<h2>MEDEVAC įrankiai</h2><div class="tools">' +
      med('#/9line', '9', '9-Line', st(() => NL), '9-Line MEDEVAC prašymas') +
      med('#/mist', 'M', 'MIST', st(() => MC), 'MIST kortelė') +
      med('#/tst', '10s', '10s triažas', st(() => TS), '10s triažas') +
      med('#/sitrep', 'S', 'SITREP', st(() => SR), 'SITREP padėties pranešimas') + '</div>' +
      '<h2>Kiti įrankiai</h2><div class="tools">' +
      t('#/gks', ic('<circle cx="12" cy="12" r="9"/><path d="M8.5 14.5c1 1.2 2.2 1.8 3.5 1.8s2.5-.6 3.5-1.8M9 9.5h.01M15 9.5h.01"/>'), 'GKS', st(() => GK), 'GKS skaičiuoklė') +
      t('#/mascal', ic('<path d="M4 6h16M4 12h16M4 18h10"/>'), 'Mascal', st(() => MS), 'Mascal') +
      t('#/zymejimas', ic('<path d="M10.5 4.5a5 5 0 0 1 7 7l-6 6a5 5 0 0 1-7-7z"/><path d="M8 8l8 8"/>'), 'Vaistų žymėjimas', st(() => VZ), 'Vaistų žymėjimas') +
      t('#/nudegimai', ic('<path d="M12 3c2 3 5 5 5 9a5 5 0 0 1-10 0c0-2 1-3 2-4 0 2 1 3 2 3 0-3-1-5 1-8z"/>'), 'Nudegimai ir nušalimai', st(() => NB), 'Nudegimai ir nušalimai') +
      t('#/pilnas-kraujas', ic('<path d="M12 3c3 4 6 7 6 11a6 6 0 0 1-12 0c0-4 3-7 6-11z"/>'), 'Kraujo transfuzija', st(() => KR), 'Kraujo transfuzija') + '</div>' +
      '<h2>Treniruotė ir vertinimas</h2><div class="tools">' +
      t('#/scenarijai', ic('<path d="M8 5v14l11-7z"/>'), 'Scenarijai', st(() => SC), 'Treniruočių scenarijai') +
      t('#/korteles', ic('<rect x="3" y="7" width="13" height="13" rx="2"/><path d="M8 4h11a2 2 0 0 1 2 2v11"/>'), 'Dozių kortelės', st(() => FC), 'Dozių kortelės') +
      t('#/egzaminas', ic('<circle cx="12" cy="13" r="8"/><path d="M12 9v4l2 2M9 2h6"/>'), 'Egzaminas', st(() => EX), 'Egzaminuotojo režimas') + '</div>';
  },

  // Taikymo pradžia: bendri dalykai (Escape, vaidmenys, įrankiai, dažniausi sąrašai). Pacientas – apatinėje navigacijoje ir juostoje virš jos.
  homeField() {
    const L = typeof LU !== 'undefined' ? LU.top() : ['stop', 'antrine', 'kokybe'];
    return brand() + disclaimer() + REM.banners() +
      '<h2>Escape planas</h2>' + V.escRows() +
      '<h2>Mano vaidmuo – pirminė apžiūra</h2>' + V.roles(true) +
      '<h2>Įrankiai</h2>' + V.toolTiles() +
      `<h2>Dažni sąrašai${typeof LU !== 'undefined' && LU.used() ? ' · pagal naudojimą' : ''}</h2>` + L.map(listRow).join('') +
      installRow() + row('#/nustatymai', 'Nustatymai');
  },

  homeLearn() {
    const S = E.igudziai || [], R = ratings(), n = S.length, rated = S.filter(s => R[s.id]).length, good = S.filter(s => R[s.id] >= 3).length;
    return brand() + disclaimer() + REM.banners() +
      '<input type="search" id="q" placeholder="Paieška: vaistas, įgūdis, veiksmas" autocomplete="off">' +
      `<a class="card prog-card" href="#/igudziai"><b>Mano pažanga</b><div class="muted">Įsivertinta ${rated} / ${n} įgūdžių · atlieku (3–4) – ${good}</div>${progBar(rated, n)}</a>` +
      '<h2>Temos</h2>' + V.topicCards() +
      '<h2>Komandos vaidmenys</h2>' + V.roles(false) +
      V.learnTools() +
      '<h2>Viskas vienoje vietoje</h2>' +
      row('#/sarasai', 'Kontroliniai sąrašai', 'Escape planai, A, B, C, antrinė apžiūra, STOP') +
      row('#/igudziai', 'Įgūdžiai', n + ' įgūdžiai: žingsniai, svarbiausi priminimai, praktiniai video') +
      row('#/vaistai', 'Vaistai', 'Pagal paskirtį · TCCC 2026 ir PCS') +
      installRow() + row('#/nustatymai', 'Nustatymai');
  },

  topicCards() {
    const R = ratings();
    return '<div class="tgrid">' + (E.temos || []).map(t => {
      const ids = (t.igudziai || []).filter(id => { const s = skillById(id); return s && ok(s.kam); });
      const r = ids.filter(id => R[id]).length;
      return `<a class="tcard" href="#/tema/${t.id}"><span class="tz ${t.cls || ''}">${esc(t.zenklas)}</span><b>${esc(t.pav)}</b><small>${esc(t.sub)}</small>${ids.length ? '<small class="muted">Įgūdžiai: ' + r + ' / ' + ids.length + '</small>' + progBar(r, ids.length) : ''}</a>`;
    }).join('') + '</div>';
  },

  topics() { return '<h1>Temos</h1><p class="muted">Kiekviena tema sujungia mokymosi medžiagą, kontrolinius sąrašus, įgūdžius ir vaistus.</p>' + V.topicCards(); },

  topic(id) {
    const t = (E.temos || []).find(x => x.id === id);
    if (!t) return notFound();
    const P = E.puslapiai || {}, R = ratings();
    const sk = (t.igudziai || []).map(skillById).filter(s => s && ok(s.kam));
    const r = sk.filter(s => R[s.id]).length;
    let h = `<h1>${esc(t.pav)}</h1><p class="muted">${esc(t.sub)}</p>`;
    if (t.apie) h += '<div class="card">' + esc(t.apie) + '</div>';
    const pg = (t.puslapiai || []).filter(x => P[x]);
    if (pg.length) h += '<h2>Mokymosi medžiaga</h2>' + pg.map(x => row('#/p/' + x, P[x].title, P[x].sub)).join('');
    if (sk.length) h += `<h2>Įgūdžiai · įsivertinta ${r} / ${sk.length}</h2>` + progBar(r, sk.length) +
      sk.map(s => row('#/igudis/' + s.id, s.pav, '#' + s.id + ((s.video || []).length ? ' · ▶ ' + s.video.length : ''), rateBadge(R, s.id))).join('');
    const ls = (t.sarasai || []).filter(x => (E.sarasai || {})[x]);
    if (ls.length) h += '<h2>Kontroliniai sąrašai</h2>' + ls.map(listRow).join('');
    const dr = (t.vaistai || []).map(drugById).filter(v => v && ok(v.kam));
    if (dr.length) h += '<h2>Vaistai</h2>' + dr.map(v => row('#/vaistas/' + v.id, v.name, v.klase)).join('');
    if (t.id === 'vaistai') h += row('#/vaistai', 'Visi vaistai');
    return h;
  },

  lists() {
    const S = E.sarasai || {}, used = new Set();
    let h = '<h1>Kontroliniai sąrašai</h1>' + row('#/egzaminas', 'Egzaminuotojo režimas', EX.status()) + '<h2>Escape planai</h2>' + V.escRows();
    (E.escape || []).forEach(x => used.add(x));
    (E.vaidmenys || []).forEach(r => {
      h += `<h2>${esc(r.id)} – ${esc(r.sub || '')}</h2>` + (r.lists || []).map(l => { used.add(l); return listRow(l); }).join('');
    });
    const rest = Object.keys(S).filter(x => !used.has(x));
    if (rest.length) h += '<h2>Visai komandai</h2>' + rest.map(listRow).join('');
    return h + '<p class="muted">Žymėjimai priklauso dabartiniam sužeistajam; išvalyti – mygtukas „Išvalyti žymėjimus“ sąrašo apačioje.</p>';
  },

  role(id, f) {
    const r = (E.vaidmenys || []).find(x => x.id === id);
    if (!r || !(r.lists || []).length) return notFound();
    f = Math.min(Math.max(0, f | 0), r.lists.length - 1);
    const S = E.sarasai || {}, lid = r.lists[f];
    let h = `<h1>${esc(r.pav)}</h1>`;
    if (mode === 'learn' && r.aprasymas) h += `<details class="card"${f === 0 ? ' open' : ''}><summary><b>Vaidmuo</b></summary>${r.aprasymas}</details>`;
    h += '<div class="tabs ph">' + r.lists.map((l, i) => tabBtn((S[l] || {}).short || (S[l] || {}).title || l, `#/v/${id}?f=${i}`, i === f)).join('') + '</div>';
    if (S[lid] && S[lid].intro) h += '<p class="muted">' + br(S[lid].intro) + '</p>';
    h += renderList(lid);
    if (mode === 'learn') h += EX.entry(lid);
    if (f < r.lists.length - 1) h += `<button class="row" data-act="go" data-r="#/v/${id}?f=${f + 1}" style="margin-top:12px">Toliau: ${esc((S[r.lists[f + 1]] || {}).title || '')}<span class="ar">›</span></button>`;
    if (r.vadovas) h += '<h2>Komandos vado įrankiai</h2>' + V.escRows() + row('#/s/stop', 'STOP · 10 už 10') + row('#/s/komanda', 'Komandos darbas') + row('#/s/kokybe', 'Gydymo tikslai ir kokybė') + row('#/s/antrine', 'Antrinė apžiūra nuo galvos iki kojų');
    const tm = (E.temos || []).find(t => t.id === id.toLowerCase());
    if (mode === 'learn' && tm) h += '<h2>Mokytis</h2>' + row('#/tema/' + tm.id, tm.pav, 'Įgūdžiai, medžiaga ir vaistai');
    return h;
  },

  list(id) {
    const L = (E.sarasai || {})[id];
    if (!L) return notFound();
    let h = `<h1>${esc(L.title)}</h1>`;
    if (L.intro) h += '<p class="muted">' + br(L.intro) + '</p>';
    h += renderList(id);
    if (mode === 'learn') h += EX.entry(id);
    if ((E.escape || []).indexOf(id) >= 0) h += '<h2>Kiti Escape planai</h2>' + (E.escape || []).filter(x => x !== id).map(x => `<a class="row esc" href="#/s/${x}">${esc(E.sarasai[x].title)}<span class="ar">›</span></a>`).join('');
    return h;
  },

  drugs() {
    const D = (E.vaistai || []).filter(v => ok(v.kam)), w = wCalc(), field = mode === 'field';
    const G = E.vaistuGrupes || [{ id: undefined, pav: 'Vaistai' }];
    let h = '<h1>Vaistai</h1><p class="muted">Viena dozavimo schema – pagal TCCC 2026 gaires, gamintojo PCS ir ERC.</p>';
    if (!field) h += row('#/korteles', 'Dozių kortelės', FC.status());
    G.forEach(g => {
      const a = D.filter(v => v.grupe === g.id);
      if (!a.length) return;
      h += '<h2>' + esc(g.pav) + '</h2>' + a.map(v => row('#/vaistas/' + v.id, v.name, field ? doseShort(v, w) : v.klase,
        (v.tccc26 ? '<span class="tag grn">TCCC</span>' : '') + (v.kam && isDoc(v.kam) ? '<span class="tag red">Gydytojui</span>' : ''))).join('');
    });
    return h + (mode === 'learn' ? '<p class="muted">Žyma „TCCC“ – vaistas yra TCCC 2026 gairėse. Vaistai skiriami tik pagal kompetenciją ir mediko nurodymu.</p>' : '');
  },

  drug(id) {
    const v = drugById(id);
    if (!v) return notFound();
    const w = wCalc(), learn = mode === 'learn';
    const allD = (v.dozes || []).concat(...(v.stulpeliai || []).map(c => c.dozes));
    const doseHtml = d => `<div class="dose"><div class="lb">${esc(d.k)}${d.c ? ' · ' + esc(d.d) : ''}</div><div class="big">${esc(d.c ? calc(d.c, w) : d.d)}</div>${d.p ? '<div class="lb">' + br(d.p) + '</div>' : ''}</div>`;
    let h = `<h1>${esc(v.name)}</h1><p class="muted">${esc(v.klase || '')}</p>`;
    h += (v.tccc26 ? '<span class="tag grn">TCCC 2026</span>' : '') + (v.tipas === 'pagr' ? '<span class="tag">Kuopos kortelėje</span>' : '') + tag(v.kam);
    h += v.patvirtinta ? `<span class="tag grn">Patvirtino: ${esc(v.patvirtinta)}</span>` : '<span class="tag amb">Laukia mediko patvirtinimo</span>';
    if (v.ind) h += `<p class="ind">${esc(v.ind)}</p>`;
    if (allD.some(d => d.c)) h += '<h2>Paciento svoris, kg</h2>' + wChips(wNow());
    if ((v.dozes || []).length) h += '<h2>Dozė</h2>' + v.dozes.map(doseHtml).join('');
    if ((v.stulpeliai || []).length) h += '<div class="cols">' + v.stulpeliai.map(c => `<div class="col"><div class="colh"><b>${esc(c.pav)}</b>${c.sub ? '<small>' + esc(c.sub) + '</small>' : ''}</div>${c.dozes.map(doseHtml).join('')}</div>`).join('') + '</div>';
    const iw = v.ispejimai || [];
    if (iw.length) h += '<div class="warn wl"><b>Įspėjimai</b>' + (iw.length > 1 ? ul(iw) : '<div>' + esc(iw[0]) + '</div>') + '</div>';
    let more = '';
    if (v.kontra) more += `<div class="kv"><b>Kontraindikacijos</b><span>${esc(v.kontra)}</span></div>`;
    if (v.pradzia) more += `<div class="kv"><b>Veikimo pradžia</b><span>${br(v.pradzia)}</span></div>`;
    if (v.trukme) more += `<div class="kv"><b>Veikimo trukmė</b><span>${br(v.trukme)}</span></div>`;
    if (v.salutinis) more += `<div class="kv"><b>Šalutinis poveikis</b><span>${esc(v.salutinis)}</span></div>`;
    if (v.pakuote) more += `<div class="kv"><b>Pakuotė</b><span>${br(v.pakuote)}</span></div>`;
    if ((v.pastabos || []).length) more += '<h3>Pastabos</h3>' + ul(v.pastabos);
    if (v.saltinis) more += '<p class="muted" style="margin-top:10px">Šaltiniai: ' + esc(v.saltinis) + '</p>';
    if ((v.nuorodos || []).length) more += v.nuorodos.map(([t, u]) => `<a class="row" href="${esc(u)}" target="_blank" rel="noopener"><div>${esc(t)}</div><span class="ar">↗</span></a>`).join('');
    if (more) h += `<details class="alt"${learn ? ' open' : ''}><summary>Kontraindikacijos ir daugiau</summary>${more}</details>`;
    h += V.drugLt(v, learn);
    const alt = (v.alt || []).filter(a => !a.id || (drugById(a.id) && ok(drugById(a.id).kam)));
    if (alt.length) h += '<h2>Alternatyva</h2>' + alt.map(a => a.id ? row('#/vaistas/' + a.id, drugById(a.id).name, a.t) : `<p class="muted altx">${esc(a.t)}</p>`).join('') +
      (alt.some(a => a.id) ? '<p class="muted altn">Kitas vaistas tam pačiam tikslui – sprendžia skiriantysis; dozė – to vaisto puslapyje.</p>' : '');
    const sus = (v.susije || []).filter(s => !alt.some(a => a.id === s));
    if (sus.length) h += '<h2>Susiję vaistai</h2>' + sus.map(s => { const o = drugById(s); return o && ok(o.kam) ? row('#/vaistas/' + o.id, o.name, o.klase) : ''; }).join('');
    return h;
  },

  // Lietuvoje registruoti preparatai (VVKT VAPRIS) – papildoma vaisto aprašo skiltis
  drugLt(v, learn) {
    const L = v.lt; if (!L || !((L.p || []).length || L.ne || L.pa)) return '';
    const ST = { T: ['Tiekiamas', 'grn'], L: ['Lygiagretus importas', 'grn'], U: ['Be registracijos numerio', 'amb'], N: ['Netiekiamas', 'red'] };
    let h = (L.p || []).map(p => { const s = ST[p.s] || ['', '']; return `<div class="ltp"><div class="ltn"><b>${esc(p.n)}</b>${s[0] ? `<span class="tag ${s[1]}">${s[0]}</span>` : ''}</div><div class="ltd">${esc(p.d)}${p.r ? ' · ' + esc(p.r) : ''}</div></div>`; }).join('');
    if (L.ne) h += `<div class="ltp"><div class="ltn"><span class="tag red">Netiekiami</span></div><div class="ltd">${esc(L.ne)}</div></div>`;
    if (L.pa) h += `<p class="ltpa">${esc(L.pa)}</p>`;
    h += '<p class="muted ltsrc">VVKT vaistinių preparatų registras, tikrinta 2026-10-14. Tiekimas keičiasi – naudokite tai, kas yra jūsų komplekte, ir tikrinkite koncentraciją ant ampulės.</p>';
    return `<details class="alt lt"${learn ? ' open' : ''}><summary>Lietuvoje: preparatai ir pakuotės</summary>${h}</details>`;
  },

  skills(q) {
    const all = (E.igudziai || []).filter(s => ok(s.kam)), R = ratings();
    const F = [['', 'Visi'], ['K', 'Komanda'], ['A', 'A'], ['B', 'B'], ['C', 'C'], ['S', 'D/E'], ['V', 'Vaistai'], ['N', 'Neįsivertinti'], ['P', '▶ Video']];
    const f = q.f || '';
    const S = all.filter(s => !f || (f === 'N' ? !R[s.id] : f === 'P' ? (s.video || []).length : s.grupe === f));
    const rated = all.filter(s => R[s.id]).length;
    let h = `<h1>Įgūdžiai</h1><p class="muted">${all.length} įgūdžiai · įsivertinta ${rated}</p>` + progBar(rated, all.length);
    h += row('#/scenarijai', 'Treniruočių scenarijai', SC.status());
    h += '<div class="tabs">' + F.map(([k, l]) => tabBtn(l, '#/igudziai' + (k ? '?f=' + k : ''), k === f)).join('') + '</div>';
    GRUPES.forEach(([g, gp]) => {
      const a = S.filter(s => s.grupe === g);
      if (!a.length) return;
      h += '<h2>' + esc(gp) + '</h2>' + a.map(s => row('#/igudis/' + s.id, s.pav, '#' + s.id + ' · ' + (s.kam || '') + ((s.vaizdai || []).length ? ' · ▣ ' + s.vaizdai.length : '') + ((s.video || []).length ? ' · ▶ ' + s.video.length : ''), rateBadge(R, s.id))).join('');
    });
    return h + (S.length ? '' : '<p class="muted">Nėra įgūdžių pagal šį filtrą.</p>');
  },

  skill(id) {
    const s = skillById(id);
    if (!s) return notFound();
    const r = ratings()[s.id] || 0, learn = mode === 'learn';
    const all = skillOrder().filter(x => ok(x.kam)), i = all.indexOf(s);
    let h = `<h1>${esc(s.pav)}</h1><span class="tag">#${s.id}</span><span class="tag">${esc(grupesPav(s.grupe))}</span>` + tag(s.kam) + (s.id > 34 ? '<span class="tag">Papildomas</span>' : '');
    if (s.aprasas) h += `<p class="lead">${esc(s.aprasas)}</p>`;
    const skRefs = t => esc(t).replace(/#(\d{1,2})(?![\d])/g, (m, n) => { const k = skillById(+n); return k && ok(k.kam) ? `<a href="#/igudis/${n}">#${n}</a>` : m; });
    const ulr = a => '<ul>' + a.map(x => '<li>' + skRefs(x) + '</li>').join('') + '</ul>';
    if ((s.zingsniai || []).length) h += '<h2>Žingsniai</h2><ol class="steps">' + s.zingsniai.map(x => '<li>' + skRefs(x) + '</li>').join('') + '</ol>';
    if ((s.esme || []).length) h += '<div class="card esme"><b>Svarbu</b>' + ulr(s.esme) + '</div>';
    if ((s.klaidos || []).length) h += '<div class="warn wl"><b>Dažnos klaidos ir pavojai</b>' + ulr(s.klaidos) + '</div>';
    if ((s.vaizdai || []).length) h += '<div class="figs">' + s.vaizdai.map(figHtml).join('') + '</div>';
    h += videos(s.video);
    if (learn) {
      if (s.teorija || s.praktika) h += '<h2>Ką išmokti</h2>' + (s.teorija ? `<div class="kv"><b>Teorija</b><span>${br(s.teorija)}</span></div>` : '') + (s.praktika ? `<div class="kv"><b>Praktika</b><span>${br(s.praktika)}</span></div>` : '');
      if (s.aprasymas) h += '<div>' + s.aprasymas + '</div>';
    }
    const link = (lb, src, url) => url ? `<a class="row" href="${esc(url)}" target="_blank" rel="noopener"><div>${esc(lb)}<small>${esc(src || url)}</small></div><span class="ar">↗</span></a>` : (src ? `<p class="muted">${esc(lb)}: ${esc(src)}</p>` : '');
    if ((s.esmeSrc || []).length) h += '<p class="muted">Šaltiniai: ' + esc(s.esmeSrc.join('; ')) + '</p>';
    if (learn) h += link('Teorijos šaltinis', s.saltT, s.nuorT) + link('Praktikos šaltinis', s.saltP, s.nuorP);
    h += '<h2>Mano įsivertinimas</h2><div class="chips">' + [1, 2, 3, 4].map(x => `<button class="${x === r ? 'on' : ''}" data-act="rate" data-id="${s.id}" data-v="${x}">${x}</button>`).join('') + '</div>';
    h += '<p class="muted">1 – nežinau · 2 – žinau teoriją · 3 – atlieku su pagalba · 4 – atlieku savarankiškai</p>';
    const prev = all[i - 1], next = all[i + 1];
    h += '<div class="pn">' + (prev ? `<a class="btn" href="#/igudis/${prev.id}">‹ #${prev.id}</a>` : '<span></span>') + '<a class="btn" href="#/igudziai">Visi įgūdžiai</a>' + (next ? `<a class="btn" href="#/igudis/${next.id}">#${next.id} ›</a>` : '<span></span>') + '</div>';
    return h;
  },

  page(id) {
    const p = (E.puslapiai || {})[id];
    if (!p) return notFound();
    return `<h1>${esc(p.title)}</h1>` + (p.sub ? '<p class="muted">' + esc(p.sub) + '</p>' : '') + tocHtml(p.html || '') + videos(p.video) +
      (p.saltinis ? '<p class="muted" style="margin-top:12px">Šaltinis: ' + esc(p.saltinis) + '</p>' : '');
  },

  search(q) {
    return `<h1>Paieška</h1><input type="search" id="qs" placeholder="Vaistas, įgūdis, veiksmas" autocomplete="off" value="${esc(q)}"><div id="res">${results(q)}</div>`;
  },

  install() {
    let h = '<h1>Kaip įsidiegti programėlę</h1><p class="muted">Programėlė įsidiegia iš naršyklės – parduotuvės nereikia. Įdiegta ji atsidaro visame ekrane ir veikia be interneto.</p>';
    if (installed()) h += '<div class="card">Ši programėlė jau įdiegta šiame įrenginyje.</div>';
    else if (installEv) h += '<button class="btn" data-act="install" style="width:100%;margin:6px 0 10px">Įdiegti dabar</button>';
    h += '<h2>Android (Chrome)</h2><ol class="steps">' +
      '<li>Atidarykite <b>etc.1040medkuopa.lt</b> naršyklėje <b>Chrome</b>.</li>' +
      '<li>Jei apačioje pasirodo pasiūlymas „Įdiegti programą“ – paspauskite jį. Jei ne – viršuje dešinėje paspauskite meniu <b>⋮</b>.</li>' +
      '<li>Pasirinkite <b>„Įdiegti programą“</b> arba <b>„Pridėti prie pradžios ekrano“</b> ir patvirtinkite <b>„Įdiegti“</b>.</li>' +
      '<li>Ženkliukas <b>„ETC gidas“</b> atsiras pradžios ekrane ir programų sąraše.</li></ol>' +
      '<p class="muted">Samsung naršyklėje: meniu ☰ → „Pridėti puslapį prie“ → „Pradžios ekranas“.</p>' +
      '<h2>iPhone / iPad (Safari)</h2><ol class="steps">' +
      '<li>Atidarykite <b>etc.1040medkuopa.lt</b> naršyklėje <b>Safari</b>.</li>' +
      '<li>Paspauskite <b>„Bendrinti“</b> – kvadratą su rodykle aukštyn (naujesnėse iOS versijose pirmiausia paspauskite <b>⋯</b> šalia adreso juostos, tada „Bendrinti“).</li>' +
      '<li>Slinkite žemyn ir pasirinkite <b>„Įtraukti į pradžios ekraną“</b> (angl. „Add to Home Screen“).</li>' +
      '<li>Paspauskite <b>„Įtraukti“</b> viršuje dešinėje – ženkliukas atsiras pradžios ekrane.</li></ol>' +
      '<h2>Po įdiegimo</h2><ul><li>Pirmą kartą atidarykite su internetu – turinys išsisaugos telefone.</li><li>Programėlė atsinaujina pati, kai atidaroma su internetu. Jei reikia – Nustatymai → „Atnaujinti turinį“.</li><li>Vaizdo įrašams ir iliustracijoms iš TCCC reikia interneto.</li></ul>' +
      '<h2>Pasidalinkite</h2><p class="muted">Nuskenuokite telefono kamera:</p><img class="qr" src="img/qr.svg" alt="QR kodas: etc.1040medkuopa.lt"><p style="text-align:center"><b>etc.1040medkuopa.lt</b></p>';
    return h;
  },

  settings() {
    const b = (act, t, s) => `<button class="row" data-act="${act}"><div>${t}<small>${s}</small></div></button>`;
    const inst = matchMedia('(display-mode: standalone)').matches || navigator.standalone;
    let h = '<h1>Nustatymai</h1>' + GL.settingRow();
    h += `<div class="ck${hide() ? ' on' : ''}" data-act="hide"><span class="bx">✓</span><div style="flex:1">Slėpti tik gydytojui skirtus veiksmus ir vaistus<div class="muted">Lieka tai, ką atlieka komandos nariai.</div></div></div>`;
    h += '<h2>Pacientas</h2>' + (typeof MC !== 'undefined' && MC.profileView ? MC.profileView() : '') + row('#/pacientas', 'Paciento failas', 'Pacientų sąrašas, įvykių eiga, perdavimas QR') + b('new-pt', '+ Kitas sužeistasis', 'Ankstesni lieka sąraše; naujam – švarūs laikai, žymėjimai ir įrankiai') + REM.settings() + OP.settings();
    h += '<h2>Mokymasis</h2>' + row('#/korteles', 'Dozių kortelės', FC.status()) + row('#/egzaminas', 'Egzaminuotojo režimas', EX.status()) + b('reset-ivert', 'Ištrinti įsivertinimus', 'Visi 1–4 balai bus pašalinti');
    h += '<h2>Atsiliepimai</h2>' + b('fb', 'Pranešti apie klaidą ar pasiūlyti', 'Komentaras ir ekrano vaizdas – keliauja gido rengėjams');
    const nOut = FB.pending();
    if (nOut) h += b('fb-flush', 'Neišsiųsti pranešimai: ' + nOut, FB.configured() ? 'Siųsti dabar (reikia interneto)' : 'Bus išsiųsti, kai bus įjungtas priėmimas');
    h += '<h2>Programėlė</h2>';
    if (inst) h += '<p class="muted">Programėlė įdiegta ir veikia be interneto (vaizdo įrašams reikia interneto).</p>';
    else if (installEv) h += b('install', 'Įdiegti į telefoną', 'Atsiras ženkliukas pradžios ekrane');
    else h += row('#/idiegimas', 'Kaip įsidiegti telefone', 'Android ir iPhone instrukcija, QR kodas');
    h += b('upd', 'Atnaujinti turinį', 'Reikia interneto ryšio');
    h += '<h2>Apie</h2><p class="muted">Turinio versija: ' + esc(E.versija || '—') + '. Parengė 1040 medkuopa pagal European Trauma Course. Vaistų dozės – pagal TCCC 2026 gaires ir gamintojo PCS. Tai atminties priemonė, ne oficialus ETC vadovas.</p>';
    h += '<a class="row" href="https://publications.europeantraumacourse.com/view/845868233/" target="_blank" rel="noopener"><div>Oficialus ETC vadovas<small>publications.europeantraumacourse.com</small></div><span class="ar">↗</span></a>';
    h += '<a class="row" href="https://deployedmedicine.allogy.net/learner/collections/11" target="_blank" rel="noopener"><div>TCCC gairės<small>Deployed Medicine</small></div><span class="ar">↗</span></a>';
    return h;
  }
};
