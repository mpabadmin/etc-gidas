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
const wChips = w => '<div class="chips">' + W_LIST.map(x => `<button class="${x === w ? 'on' : ''}" data-act="w" data-w="${x}">${x}</button>`).join('') + '</div>';
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
  const d = (v.dozes || [])[0]; if (!d) return v.klase || '';
  return d.k + ': ' + (d.c ? calc(d.c, w) + ' (' + w + ' kg)' : d.d);
}
function tocHtml(html) {
  const hs = []; let i = 0;
  const out = html.replace(/<h3>([\s\S]*?)<\/h3>/g, (m, t) => { const id = 'h' + (i++); hs.push([id, strip(t)]); return `<h3 id="${id}">${t}</h3>`; });
  if (hs.length < 3) return html;
  return '<div class="toc">' + hs.map(([id, t]) => `<button data-act="toc" data-t="${id}">${esc(t)}</button>`).join('') + '</div>' + out;
}
const videos = a => (a || []).length ? '<h2>Vaizdo įrašai</h2>' + a.map(videoHtml).join('') : '';

const V = {
  home() { return mode === 'field' ? V.homeField() : V.homeLearn(); },

  roles(field) {
    return '<div class="grid3">' + (E.vaidmenys || []).map(r =>
      `<a class="role ${r.cls || ''}" href="#/v/${r.id}?f=${field ? pirmIdx(r) : 0}"><b>${esc(r.id)}</b><small>${esc(r.sub || '')}</small>${field ? '<small class="rs">Pirminė apžiūra</small>' : ''}</a>`).join('') + '</div>';
  },

  escRows() {
    return (E.escape || []).map(id => {
      const L = (E.sarasai || {})[id];
      return L ? `<a class="row esc" href="#/s/${id}">${esc(L.title)}<span class="ar">›</span></a>` : '';
    }).join('');
  },

  homeField() {
    const P = E.puslapiai || {}, w = LS.get('etc-svoris', 80);
    const quick = ['txa', 'ketaminas', 'kalcis', 'paracetamolis', 'ondansetronas', 'nacl-hipert'].map(drugById).filter(v => v && ok(v.kam));
    return disclaimer() +
      '<h2>Escape planas</h2>' + V.escRows() +
      '<h2>Mano vaidmuo – pirminė apžiūra</h2>' + V.roles(true) +
      '<h2>Laikai</h2><div id="tm">' + timersHtml() + '</div>' +
      '<h2>Paciento svoris, kg</h2>' + wChips(w) +
      '<h2>Dažniausi vaistai</h2>' + quick.map(v => row('#/vaistas/' + v.id, v.name, doseShort(v, w), v.tccc26 ? '<span class="tag grn">TCCC</span>' : '')).join('') +
      row('#/vaistai', 'Visi vaistai', (E.vaistai || []).length + ' vaistai pagal paskirtį') +
      '<h2>Greitai</h2>' +
      row('#/s/stop', 'STOP · 10 už 10') +
      row('#/s/antrine', 'Antrinė apžiūra nuo galvos iki kojų') +
      row('#/s/kokybe', 'Gydymo tikslai ir kokybė') +
      (P.tccc ? row('#/p/tccc', 'TCCC 2026: vaistai ir tikslai') : '') +
      (P.kraujas ? row('#/p/kraujas', 'Kraujo suderinamumas') : '') +
      (P.skiedimas ? row('#/p/skiedimas', 'Vaistų skiedimo lentelės') : '') +
      row('#/nustatymai', 'Nustatymai');
  },

  homeLearn() {
    const S = E.igudziai || [], R = ratings(), n = S.length, rated = S.filter(s => R[s.id]).length, good = S.filter(s => R[s.id] >= 3).length;
    return disclaimer() +
      '<input type="search" id="q" placeholder="Paieška: vaistas, įgūdis, veiksmas" autocomplete="off">' +
      `<a class="card prog-card" href="#/igudziai"><b>Mano pažanga</b><div class="muted">Įsivertinta ${rated} / ${n} įgūdžių · atlieku (3–4) – ${good}</div>${progBar(rated, n)}</a>` +
      '<h2>Temos</h2>' + V.topicCards() +
      '<h2>Komandos vaidmenys</h2>' + V.roles(false) +
      '<h2>Viskas vienoje vietoje</h2>' +
      row('#/sarasai', 'Kontroliniai sąrašai', 'Escape planai, A, B, C, antrinė apžiūra, STOP') +
      row('#/igudziai', 'Įgūdžiai', n + ' įgūdžiai su esme, vaizdo įrašais ir šaltiniais') +
      row('#/vaistai', 'Vaistai', 'Pagal paskirtį · TCCC 2026 ir PCS') +
      row('#/nustatymai', 'Nustatymai');
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
    let h = '<h1>Kontroliniai sąrašai</h1><h2>Escape planai</h2>' + V.escRows();
    (E.escape || []).forEach(x => used.add(x));
    (E.vaidmenys || []).forEach(r => {
      h += `<h2>${esc(r.id)} – ${esc(r.sub || '')}</h2>` + (r.lists || []).map(l => { used.add(l); return listRow(l); }).join('');
    });
    const rest = Object.keys(S).filter(x => !used.has(x));
    if (rest.length) h += '<h2>Visai komandai</h2>' + rest.map(listRow).join('');
    return h + '<p class="muted">Žymėjimai išlieka, kol paspausite „Naujas pacientas“.</p>';
  },

  role(id, f) {
    const r = (E.vaidmenys || []).find(x => x.id === id);
    if (!r || !(r.lists || []).length) return notFound();
    f = Math.min(Math.max(0, f | 0), r.lists.length - 1);
    const S = E.sarasai || {}, lid = r.lists[f];
    let h = `<h1>${esc(r.pav)}</h1>`;
    if (mode === 'learn' && r.aprasymas) h += `<details class="card"${f === 0 ? ' open' : ''}><summary><b>Vaidmuo</b></summary>${r.aprasymas}</details>`;
    h += '<div class="tabs">' + r.lists.map((l, i) => tabBtn((S[l] || {}).short || (S[l] || {}).title || l, `#/v/${id}?f=${i}`, i === f)).join('') + '</div>';
    if (S[lid] && S[lid].intro) h += '<p class="muted">' + br(S[lid].intro) + '</p>';
    h += renderList(lid);
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
    if ((E.escape || []).indexOf(id) >= 0) h += '<h2>Kiti Escape planai</h2>' + (E.escape || []).filter(x => x !== id).map(x => `<a class="row esc" href="#/s/${x}">${esc(E.sarasai[x].title)}<span class="ar">›</span></a>`).join('');
    return h;
  },

  drugs() {
    const D = (E.vaistai || []).filter(v => ok(v.kam)), w = LS.get('etc-svoris', 80), field = mode === 'field';
    const G = E.vaistuGrupes || [{ id: undefined, pav: 'Vaistai' }];
    let h = '<h1>Vaistai</h1><p class="muted">Pagrindinės dozės – pagal TCCC 2026 gaires ir gamintojo PCS. Kuopos kortelė ir kiti vietiniai šaltiniai – vaisto puslapyje, atskiroje skiltyje.</p>';
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
    const w = LS.get('etc-svoris', 80), hasCalc = (v.dozes || []).some(d => d.c), learn = mode === 'learn';
    let h = `<h1>${esc(v.name)}</h1><p class="muted">${esc(v.klase || '')}</p>`;
    h += (v.tccc26 ? '<span class="tag grn">TCCC 2026</span>' : '<span class="tag">Nėra TCCC 2026</span>') +
      (v.tipas === 'pagr' ? '<span class="tag">Kuopos kortelėje</span>' : '') + tag(v.kam);
    h += v.patvirtinta ? `<span class="tag grn">Patvirtino: ${esc(v.patvirtinta)}</span>` : '<span class="tag amb">Laukia mediko patvirtinimo</span>';
    if (v.ind) h += `<p class="ind">${esc(v.ind)}</p>`;
    if (hasCalc) h += '<h2>Paciento svoris, kg</h2>' + wChips(w);
    h += '<h2>Dozė</h2>';
    (v.dozes || []).forEach(d => {
      h += `<div class="dose"><div class="lb">${esc(d.k)}${d.c ? ' · ' + esc(d.d) : ''}</div><div class="big">${esc(d.c ? calc(d.c, w) : d.d)}</div>${d.p ? '<div class="lb">' + br(d.p) + '</div>' : ''}</div>`;
    });
    const iw = v.ispejimai || [];
    if (iw.length) h += '<div class="warn wl"><b>Įspėjimai</b>' + (iw.length > 1 ? ul(iw) : '<div>' + esc(iw[0]) + '</div>') + '</div>';
    if (v.kontra) h += `<div class="kv"><b>Kontraindikacijos</b><span>${esc(v.kontra)}</span></div>`;
    if (v.pradzia) h += `<div class="kv"><b>Veikimo pradžia</b><span>${br(v.pradzia)}</span></div>`;
    if (v.trukme) h += `<div class="kv"><b>Veikimo trukmė</b><span>${br(v.trukme)}</span></div>`;
    if (!learn && v.salutinis) h += `<div class="kv"><b>Šalutinis</b><span>${esc(v.salutinis)}</span></div>`;
    if ((v.kortele || []).length) h += `<details class="alt"${learn ? ' open' : ''}><summary>Kuopos kortelė ir kiti šaltiniai (${v.kortele.length})</summary><p class="muted">Mažiau patikimi nei TCCC gairės ir PCS. Jei skiriasi – vadovaukitės aukščiau pateiktomis dozėmis; sprendžia medikas.</p>${ul(v.kortele)}</details>`;
    if (learn) {
      if (v.salutinis) h += `<div class="kv"><b>Šalutinis poveikis</b><span>${esc(v.salutinis)}</span></div>`;
      if (v.pakuote) h += `<div class="kv"><b>Pakuotė</b><span>${br(v.pakuote)}</span></div>`;
      if ((v.pastabos || []).length) h += '<h3>Pastabos</h3>' + ul(v.pastabos);
      if ((v.susije || []).length) h += '<h2>Susiję vaistai</h2>' + v.susije.map(s => { const o = drugById(s); return o && ok(o.kam) ? row('#/vaistas/' + o.id, o.name, o.klase) : ''; }).join('');
    } else if ((v.pastabos || []).length) {
      h += `<details class="alt"><summary>Pastabos (${v.pastabos.length})</summary>${ul(v.pastabos)}</details>`;
    }
    if (v.saltinis) h += '<p class="muted" style="margin-top:12px">Šaltiniai: ' + esc(v.saltinis) + '</p>';
    if (learn && (v.nuorodos || []).length) h += '<h2>Šaltinių nuorodos</h2>' + v.nuorodos.map(([t, u]) => `<a class="row" href="${esc(u)}" target="_blank" rel="noopener"><div>${esc(t)}</div><span class="ar">↗</span></a>`).join('');
    return h;
  },

  skills(q) {
    const all = (E.igudziai || []).filter(s => ok(s.kam)), R = ratings();
    const F = [['', 'Visi'], ['A', 'A'], ['B', 'B'], ['C', 'C'], ['S', 'Antrinė'], ['N', 'Neįsivertinti'], ['V', '▶ Su video']];
    const f = q.f || '';
    const grp = s => s.sritis === 'Antrinė apžiūra' ? 'S' : (s.potema || '').charAt(0);
    const S = all.filter(s => !f || (f === 'N' ? !R[s.id] : f === 'V' ? (s.video || []).length : grp(s) === f));
    const rated = all.filter(s => R[s.id]).length;
    let h = `<h1>Įgūdžiai</h1><p class="muted">Įsivertinta ${rated} / ${all.length}</p>` + progBar(rated, all.length);
    h += '<div class="tabs">' + F.map(([k, l]) => tabBtn(l, '#/igudziai' + (k ? '?f=' + k : ''), k === f)).join('') + '</div>';
    let last = '';
    S.forEach(s => {
      const g = s.sritis + (s.potema ? ' · ' + s.potema : '');
      if (g !== last) { h += '<h2>' + esc(g) + '</h2>'; last = g; }
      h += row('#/igudis/' + s.id, s.pav, '#' + s.id + ' · ' + (s.kam || '') + ((s.video || []).length ? ' · ▶ ' + s.video.length : ''), rateBadge(R, s.id));
    });
    return h + (S.length ? '' : '<p class="muted">Nėra įgūdžių pagal šį filtrą.</p>');
  },

  skill(id) {
    const s = skillById(id);
    if (!s) return notFound();
    const r = ratings()[s.id] || 0, learn = mode === 'learn';
    const all = (E.igudziai || []).filter(x => ok(x.kam)), i = all.indexOf(s);
    let h = `<h1>${esc(s.pav)}</h1><span class="tag">#${s.id}</span><span class="tag">${esc(s.sritis + (s.potema ? ' · ' + s.potema : ''))}</span>` + tag(s.kam);
    if ((s.esme || []).length) h += '<div class="card esme"><b>Esmė</b>' + ul(s.esme) + '</div>';
    if ((s.tccc || []).length) h += '<div class="dose tc"><div class="lb">TCCC gairės 2026</div>' + ul(s.tccc) + '</div>';
    h += videos(s.video);
    if (learn) {
      if (s.teorija || s.praktika) h += '<h2>Ką išmokti</h2>' + (s.teorija ? `<div class="kv"><b>Teorija</b><span>${br(s.teorija)}</span></div>` : '') + (s.praktika ? `<div class="kv"><b>Praktika</b><span>${br(s.praktika)}</span></div>` : '');
      if (s.aprasymas) h += '<div>' + s.aprasymas + '</div>';
    }
    const link = (lb, src, url) => url ? `<a class="row" href="${esc(url)}" target="_blank" rel="noopener"><div>${esc(lb)}<small>${esc(src || url)}</small></div><span class="ar">↗</span></a>` : (src ? `<p class="muted">${esc(lb)}: ${esc(src)}</p>` : '');
    if ((s.esmeSrc || []).length) h += '<p class="muted">Esmės šaltiniai: ' + esc(s.esmeSrc.join('; ')) + '</p>';
    if (learn) h += link('Teorijos šaltinis', s.saltT, s.nuorT) + link('Praktikos šaltinis', s.saltP, s.nuorP);
    if (s.pastabos) h += '<p class="muted">' + br(s.pastabos) + '</p>';
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

  settings() {
    const b = (act, t, s) => `<button class="row" data-act="${act}"><div>${t}<small>${s}</small></div></button>`;
    const inst = matchMedia('(display-mode: standalone)').matches || navigator.standalone;
    let h = '<h1>Nustatymai</h1>';
    h += `<div class="ck${hide() ? ' on' : ''}" data-act="hide"><span class="bx">✓</span><div style="flex:1">Slėpti tik gydytojui skirtus veiksmus ir vaistus<div class="muted">Lieka tai, ką atlieka komandos nariai.</div></div></div>`;
    h += '<h2>Pacientas</h2>' + b('new-pt', 'Naujas pacientas', 'Išvalo visus pažymėjimus ir laikus');
    h += '<h2>Mokymasis</h2>' + b('reset-ivert', 'Ištrinti įsivertinimus', 'Visi 1–4 balai bus pašalinti');
    h += '<h2>Programėlė</h2>';
    if (inst) h += '<p class="muted">Programėlė įdiegta ir veikia be interneto (vaizdo įrašams reikia interneto).</p>';
    else if (installEv) h += b('install', 'Įdiegti į telefoną', 'Atsiras ženkliukas pradžios ekrane');
    else h += '<div class="card">iPhone: Safari → „Bendrinti“ → „Įtraukti į pradžios ekraną“.<br>Android: Chrome → ⋮ → „Įdiegti programą“.</div>';
    h += b('upd', 'Atnaujinti turinį', 'Reikia interneto ryšio');
    h += '<h2>Apie</h2><p class="muted">Turinio versija: ' + esc(E.versija || '—') + '. Parengė 1040 medkuopa pagal European Trauma Course. Vaistų dozės – pagal TCCC 2026 gaires ir gamintojo PCS. Tai atminties priemonė, ne oficialus ETC vadovas.</p>';
    h += '<a class="row" href="https://publications.europeantraumacourse.com/view/845868233/" target="_blank" rel="noopener"><div>Oficialus ETC vadovas<small>publications.europeantraumacourse.com</small></div><span class="ar">↗</span></a>';
    h += '<a class="row" href="https://deployedmedicine.allogy.net/learner/collections/11" target="_blank" rel="noopener"><div>TCCC gairės<small>Deployed Medicine</small></div><span class="ar">↗</span></a>';
    return h;
  }
};
