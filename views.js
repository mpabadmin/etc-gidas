'use strict';
const W_LIST = [50, 60, 70, 80, 90, 100, 120];
const ok = g => !(hide() && isDoc(g));
const tabBtn = (lb, r, on) => `<button class="${on ? 'on' : ''}" data-act="go" data-r="${r}">${esc(lb)}</button>`;

const V = {
  home() { return mode === 'field' ? V.homeField() : V.homeLearn(); },

  roles() {
    return '<div class="grid3">' + (E.vaidmenys || []).map(r =>
      `<a class="role ${r.cls || ''}" href="#/v/${r.id}?f=0"><b>${esc(r.id)}</b><small>${esc(r.sub || '')}</small></a>`).join('') + '</div>';
  },

  escRows() {
    return (E.escape || []).map(id => {
      const L = (E.sarasai || {})[id];
      return L ? `<a class="row esc" href="#/s/${id}">${esc(L.title)}<span class="ar">›</span></a>` : '';
    }).join('');
  },

  homeField() {
    const P = E.puslapiai || {};
    return disclaimer() +
      '<h2>Escape planas</h2>' + V.escRows() +
      '<h2>Mano vaidmuo</h2>' + V.roles() +
      '<h2>Laikai</h2><div id="tm">' + timersHtml() + '</div>' +
      '<h2>Greitai</h2>' +
      row('#/vaistai', 'Vaistai ir dozės') +
      ((E.puslapiai || {}).tccc ? row('#/p/tccc', 'TCCC 2026: vaistai ir tikslai') : '') +
      row('#/s/stop', 'STOP · 10 už 10') +
      row('#/s/kokybe', 'Gydymo tikslai ir kokybė') +
      row('#/s/komanda', 'Komandos darbas') +
      (P.kraujas ? row('#/p/kraujas', 'Kraujo suderinamumas') : '') +
      (P.skiedimas ? row('#/p/skiedimas', 'Vaistų skiedimo lentelės') : '') +
      row('#/nustatymai', 'Nustatymai');
  },

  homeLearn() {
    const P = E.puslapiai || {}, S = E.sarasai || {};
    const n = (E.igudziai || []).length, rated = Object.keys(LS.get('etc-ivert', {})).length;
    return disclaimer() +
      '<input type="search" id="q" placeholder="Paieška: vaistas, įgūdis, veiksmas" autocomplete="off">' +
      '<h2>Komandos vaidmenys</h2>' + V.roles() +
      '<h2>Mokymosi temos</h2>' + Object.keys(P).map(id => row('#/p/' + id, P[id].title, P[id].sub)).join('') +
      '<h2>Įgūdžiai ir vaistai</h2>' +
      row('#/igudziai', 'Įgūdžiai', n + ' įgūdžiai · įsivertinta ' + rated + ' / ' + n) +
      row('#/vaistai', 'Vaistai', 'Pagrindiniai ir papildomi') +
      '<h2>Kontroliniai sąrašai</h2>' +
      (E.escape || []).concat(['atmist', 'antrine', 'stop', 'komanda', 'kokybe']).map(id => S[id] ? row('#/s/' + id, S[id].title) : '').join('') +
      row('#/nustatymai', 'Nustatymai');
  },

  role(id, f) {
    const r = (E.vaidmenys || []).find(x => x.id === id);
    if (!r || !(r.lists || []).length) return notFound();
    f = Math.min(Math.max(0, f | 0), r.lists.length - 1);
    const S = E.sarasai || {}, lid = r.lists[f];
    let h = `<h1>${esc(r.pav)}</h1><p class="muted">${esc(r.sub || '')}</p>`;
    if (mode === 'learn' && r.aprasymas) h += '<div class="card">' + r.aprasymas + '</div>';
    h += '<div class="tabs">' + r.lists.map((l, i) => tabBtn((S[l] || {}).short || (S[l] || {}).title || l, `#/v/${id}?f=${i}`, i === f)).join('') + '</div>';
    if (S[lid] && S[lid].intro) h += '<p class="muted">' + br(S[lid].intro) + '</p>';
    h += renderList(lid);
    if (f < r.lists.length - 1) h += `<button class="row" data-act="go" data-r="#/v/${id}?f=${f + 1}" style="margin-top:12px">Toliau: ${esc((S[r.lists[f + 1]] || {}).title || '')}<span class="ar">›</span></button>`;
    if (r.vadovas) h += '<h2>Komandos vado įrankiai</h2>' + V.escRows() + row('#/s/stop', 'STOP · 10 už 10') + row('#/s/komanda', 'Komandos darbas') + row('#/s/kokybe', 'Gydymo tikslai ir kokybė') + row('#/s/antrine', 'Antrinė apžiūra nuo galvos iki kojų');
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
    const D = (E.vaistai || []).filter(v => ok(v.kam));
    const grp = (t, a) => a.length ? '<h2>' + t + '</h2>' + a.map(v => row('#/vaistas/' + v.id, v.name, v.klase, v.kam && v.tipas !== 'pagr' ? tag(v.kam) : '')).join('') : '';
    return '<h1>Vaistai</h1>' +
      grp('Pagrindiniai (kuopos kortelės)', D.filter(v => v.tipas === 'pagr')) +
      grp('Papildomi (TCCC vadovas, ETC lentelės)', D.filter(v => v.tipas !== 'pagr')) +
      (mode === 'learn' ? '<p class="muted">Papildomi vaistai skirti tik pagal kompetenciją ir mediko nurodymu.</p>' : '');
  },

  drug(id) {
    const v = (E.vaistai || []).find(x => x.id === id);
    if (!v) return notFound();
    const w = LS.get('etc-svoris', 80), hasCalc = (v.dozes || []).some(d => d.c), learn = mode === 'learn';
    let h = `<h1>${esc(v.name)}</h1><p class="muted">${esc(v.klase || '')}</p>`;
    h += `<span class="tag">${v.tipas === 'pagr' ? 'Pagrindinis · kortelė' : 'Papildomas'}</span>` + tag(v.kam);
    h += v.patvirtinta ? `<span class="tag grn">Patvirtino: ${esc(v.patvirtinta)}</span>` : '<span class="tag amb">Laukia mediko patvirtinimo</span>';
    if (v.ind) h += `<div class="kv"><b>Indikacijos</b><span>${esc(v.ind)}</span></div>`;
    if (v.kontra) h += `<div class="kv"><b>Kontraindikacijos</b><span>${esc(v.kontra)}</span></div>`;
    if (hasCalc) h += '<h2>Paciento svoris, kg</h2><div class="chips">' + W_LIST.map(x => `<button class="${x === w ? 'on' : ''}" data-act="w" data-w="${x}">${x}</button>`).join('') + '</div>';
    (v.dozes || []).forEach(d => {
      h += `<div class="dose"><div class="lb">${esc(d.k)}${d.c ? ' · ' + esc(d.d) : ''}</div><div class="big">${esc(d.c ? calc(d.c, w) : d.d)}</div>${d.p ? '<div class="lb">' + br(d.p) + '</div>' : ''}</div>`;
    });
    if ((v.tccc || []).length) h += '<div class="dose tc"><div class="lb">TCCC gairės 2026</div><ul>' + v.tccc.map(x => '<li>' + esc(x) + '</li>').join('') + '</ul></div>';
    (v.ispejimai || []).forEach(x => { h += '<div class="warn">' + esc(x) + '</div>'; });
    if ((v.skiriasi || []).length) h += `<details class="warn"${learn ? ' open' : ''}><summary>Šaltiniai skiriasi (${v.skiriasi.length}) – sprendžia medikas</summary><ul>` + v.skiriasi.map(x => '<li>' + esc(x) + '</li>').join('') + '</ul></details>';
    if (v.pradzia) h += `<div class="kv"><b>Veikimo pradžia</b><span>${br(v.pradzia)}</span></div>`;
    if (v.trukme) h += `<div class="kv"><b>Veikimo trukmė</b><span>${br(v.trukme)}</span></div>`;
    if (learn) {
      if (v.salutinis) h += `<div class="kv"><b>Šalutinis poveikis</b><span>${esc(v.salutinis)}</span></div>`;
      if (v.pakuote) h += `<div class="kv"><b>Pakuotė</b><span>${br(v.pakuote)}</span></div>`;
      if ((v.pastabos || []).length) h += '<h3>Pastabos</h3><ul>' + v.pastabos.map(x => '<li>' + esc(x) + '</li>').join('') + '</ul>';
      if ((v.susije || []).length) h += '<h2>Susiję vaistai</h2>' + v.susije.map(s => { const o = (E.vaistai || []).find(x => x.id === s); return o ? row('#/vaistas/' + o.id, o.name, o.klase) : ''; }).join('');
    } else if (v.salutinis) {
      h += `<div class="kv"><b>Šalutinis</b><span>${esc(v.salutinis)}</span></div>`;
    }
    if (v.saltinis) h += '<p class="muted" style="margin-top:12px">Šaltinis: ' + esc(v.saltinis) + '</p>';
    if (learn && (v.nuorodos || []).length) h += '<h2>Šaltinių nuorodos</h2>' + v.nuorodos.map(([t, u]) => `<a class="row" href="${esc(u)}" target="_blank" rel="noopener"><div>${esc(t)}</div><span class="ar">↗</span></a>`).join('');
    return h;
  },

  skills() {
    const S = (E.igudziai || []).filter(s => ok(s.kam)), R = LS.get('etc-ivert', {});
    let h = '<h1>Įgūdžiai</h1>', last = '';
    S.forEach(s => {
      const g = s.sritis + (s.potema ? ' · ' + s.potema : '');
      if (g !== last) { h += '<h2>' + esc(g) + '</h2>'; last = g; }
      const badge = R[s.id] ? `<span class="tag ${R[s.id] >= 3 ? 'grn' : 'amb'}">${R[s.id]} / 4</span>` : '';
      h += row('#/igudis/' + s.id, s.pav, '#' + s.id + ' · ' + (s.kam || ''), badge);
    });
    return h;
  },

  skill(id) {
    const s = (E.igudziai || []).find(x => String(x.id) === String(id));
    if (!s) return notFound();
    const r = LS.get('etc-ivert', {})[s.id] || 0;
    let h = `<h1>${esc(s.pav)}</h1><span class="tag">#${s.id}</span><span class="tag">${esc(s.sritis + (s.potema ? ' · ' + s.potema : ''))}</span>` + tag(s.kam);
    h += (s.video || []).length ? s.video.map(videoHtml).join('') : (mode === 'learn' ? '<div class="card muted" style="text-align:center;margin-top:10px">Video dar nepridėtas</div>' : '');
    if (s.teorija) h += '<h3>Teorija – ką išmokti</h3><p>' + br(s.teorija) + '</p>';
    if (mode === 'learn' && s.aprasymas) h += '<div>' + s.aprasymas + '</div>';
    if (s.praktika) h += '<h3>Praktika – ką atlikti</h3><p>' + br(s.praktika) + '</p>';
    const link = (lb, src, url) => url ? `<a class="row" href="${esc(url)}" target="_blank" rel="noopener"><div>${esc(lb)}<small>${esc(src || url)}</small></div><span class="ar">↗</span></a>` : (src ? `<p class="muted">${esc(lb)}: ${esc(src)}</p>` : '');
    h += link('Teorijos šaltinis', s.saltT, s.nuorT) + link('Praktikos šaltinis', s.saltP, s.nuorP);
    if (s.pastabos) h += '<p class="muted">' + br(s.pastabos) + '</p>';
    h += '<h2>Mano įsivertinimas</h2><div class="chips">' + [1, 2, 3, 4].map(x => `<button class="${x === r ? 'on' : ''}" data-act="rate" data-id="${s.id}" data-v="${x}">${x}</button>`).join('') + '</div>';
    h += '<p class="muted">1 – nežinau · 2 – žinau teoriją · 3 – atlieku su pagalba · 4 – atlieku savarankiškai</p>';
    return h;
  },

  page(id) {
    const p = (E.puslapiai || {})[id];
    if (!p) return notFound();
    return `<h1>${esc(p.title)}</h1>` + (p.sub ? '<p class="muted">' + esc(p.sub) + '</p>' : '') + (p.html || '') +
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
    if (inst) h += '<p class="muted">Programėlė įdiegta ir veikia be interneto.</p>';
    else if (installEv) h += b('install', 'Įdiegti į telefoną', 'Atsiras ženkliukas pradžios ekrane');
    else h += '<div class="card">iPhone: Safari → „Bendrinti“ → „Įtraukti į pradžios ekraną“.<br>Android: Chrome → ⋮ → „Įdiegti programą“.</div>';
    h += b('upd', 'Atnaujinti turinį', 'Reikia interneto ryšio');
    h += '<h2>Apie</h2><p class="muted">Turinio versija: ' + esc(E.versija || '—') + '. Parengė 1040 medkuopa pagal European Trauma Course. Tai atminties priemonė, ne oficialus ETC vadovas.</p>';
    h += '<a class="row" href="https://publications.europeantraumacourse.com/view/845868233/" target="_blank" rel="noopener"><div>Oficialus ETC vadovas<small>publications.europeantraumacourse.com</small></div><span class="ar">↗</span></a>';
    return h;
  }
};
