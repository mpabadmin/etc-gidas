/**
 * ETC kišeninis gidas – pranešimų apie klaidas ir pasiūlymų priėmimas.
 *
 * Programėlėje (etc.1040medkuopa.lt) žmogus paspaudžia „Pranešti“, parašo komentarą, prideda ekrano vaizdą →
 * pranešimas patenka į šią Google lentelę (lapas „Atsiliepimai“), ekrano vaizdai – į Google Drive aplanką.
 *
 * ĮDIEGIMAS (vieną kartą, ~3 min.)
 *  1. Google Drive → Naujas → Google Sheets. Pavadinkite „ETC gido atsiliepimai“.
 *  2. Lentelėje: Plėtiniai (Extensions) → Apps Script. Ištrinkite, kas ten yra, įklijuokite visą šį failą, paspauskite 💾.
 *  3. Viršuje pasirinkite funkciją „pradeti“ → Vykdyti (Run) → Peržiūrėti leidimus → savo paskyra →
 *     „Advanced“ → „Go to … (unsafe)“ → Allow. (Tai jūsų pačių scenarijus, todėl Google jo netikrino.)
 *  4. Diegti (Deploy) → Naujas diegimas (New deployment) → ⚙ → Žiniatinklio programa (Web app).
 *     Vykdyti kaip (Execute as): Aš (Me). Kas turi prieigą (Who has access): Bet kas (Anyone). → Diegti.
 *  5. Nukopijuokite žiniatinklio programos URL (baigiasi /exec) ir perduokite Claude
 *     (arba įrašykite į sarasai.js → E.atsiliepimai.url).
 *
 * NAUDOJIMAS – lentelės meniu „ETC gidas“
 *  • „Eksportuoti naujus Claude (ZIP)“ – ZIP failas: atsiliepimai.json + ekrano vaizdai. Atsisiųskite ir įkelkite
 *    į pokalbį su Claude. Eksportuotų pranešimų būsena tampa „Perduota“.
 *  • „Eksportuoti visus neišspręstus (ZIP)“ – visi „Naujas“, „Perduota“ ir „Reikia aptarti“.
 *  • „Įklijuoti Claude atsakymą“ – Claude pateiktas JSON atnaujina būseną, sprendimą ir versiją.
 *
 * PAKEITUS ŠĮ KODĄ: Diegti → Tvarkyti diegimus (Manage deployments) → ✎ → Versija: Nauja versija → Diegti.
 * URL lieka tas pats.
 */

const LAPAS = 'Atsiliepimai';
const ANTRASTES = ['Nr.', 'Gauta', 'Tipas', 'Svarba', 'Komentaras', 'Kaip turėtų būti', 'Šaltinis', 'Puslapis',
  'Maršrutas', 'Pažymėtas tekstas', 'Kontaktas', 'Ekrano vaizdai', 'Būsena', 'Sprendimas', 'Pataisyta versijoje',
  'Programėlės versija', 'Įrenginys', 'Režimas', 'Kliento ID', 'Vaizdų ID'];
const BUSENOS = ['Naujas', 'Perduota', 'Pataisyta', 'Atmesta', 'Reikia aptarti'];
const TIPAI = { klaida: 'Klaida turinyje', doze: 'Vaisto dozė / skaičiuoklė', technine: 'Techninė klaida',
  truksta: 'Trūksta turinio', pasiulymas: 'Pasiūlymas' };
const SVARBOS = { kritine: 'Kritinė', svarbi: 'Svarbi', smulki: 'Smulki' };
const PRANESTI_KRITINES = true; // el. laiškas lentelės savininkui, kai gaunamas „Kritinė“ pranešimas
const RIBOS = { tekstas: 4000, trumpas: 300, vaizdai: 3, vaizdoBase64: 5000000, per10min: 60 };
const C = {};
ANTRASTES.forEach((h, i) => { C[h] = i + 1; });

// ───────────────────────── Paruošimas ─────────────────────────

function pradeti() {
  const p = PropertiesService.getScriptProperties();
  const ss = SpreadsheetApp.getActiveSpreadsheet() || lentele_();
  p.setProperty('LENTELE', ss.getId());
  let sh = ss.getSheetByName(LAPAS);
  if (!sh) {
    const lapai = ss.getSheets();
    sh = lapai.length === 1 && lapai[0].getLastRow() === 0 ? lapai[0].setName(LAPAS) : ss.insertSheet(LAPAS);
  }
  sh.getRange(1, 1, 1, ANTRASTES.length).setValues([ANTRASTES])
    .setFontWeight('bold').setBackground('#1C1C1B').setFontColor('#F1EFE8').setWrap(true).setVerticalAlignment('middle');
  sh.setFrozenRows(1);
  sh.setFrozenColumns(1);
  const plociai = { 'Nr.': 70, 'Gauta': 120, 'Tipas': 150, 'Svarba': 80, 'Komentaras': 360, 'Kaip turėtų būti': 260,
    'Šaltinis': 180, 'Puslapis': 180, 'Maršrutas': 130, 'Pažymėtas tekstas': 200, 'Kontaktas': 130,
    'Ekrano vaizdai': 110, 'Būsena': 110, 'Sprendimas': 300, 'Pataisyta versijoje': 110, 'Programėlės versija': 160,
    'Įrenginys': 200, 'Režimas': 120 };
  Object.keys(plociai).forEach(h => sh.setColumnWidth(C[h], plociai[h]));
  const n = sh.getMaxRows() - 1;
  sh.getRange(2, C['Gauta'], n, 1).setNumberFormat('yyyy-mm-dd hh:mm');
  sh.getRange(2, C['Komentaras'], n, 2).setWrap(true);
  sh.getRange(2, C['Sprendimas'], n, 1).setWrap(true);
  sh.getRange(2, C['Būsena'], n, 1).setDataValidation(
    SpreadsheetApp.newDataValidation().requireValueInList(BUSENOS, true).setAllowInvalid(true).build());
  const svarba = sh.getRange(2, C['Svarba'], n, 1), busena = sh.getRange(2, C['Būsena'], n, 1);
  sh.setConditionalFormatRules([
    SpreadsheetApp.newConditionalFormatRule().whenTextEqualTo('Kritinė').setBackground('#FCEBEB').setFontColor('#791F1F').setBold(true).setRanges([svarba]).build(),
    SpreadsheetApp.newConditionalFormatRule().whenTextEqualTo('Naujas').setBackground('#FAEEDA').setRanges([busena]).build(),
    SpreadsheetApp.newConditionalFormatRule().whenTextEqualTo('Pataisyta').setBackground('#E1F5EE').setRanges([busena]).build(),
    SpreadsheetApp.newConditionalFormatRule().whenTextEqualTo('Atmesta').setFontColor('#888780').setRanges([busena]).build()
  ]);
  sh.hideColumns(C['Kliento ID'], 2);
  aplankas_();
  try { p.setProperty('EL_PASTAS', Session.getEffectiveUser().getEmail()); } catch (e) { /* nebūtina */ }
  const zinute = 'Lentelė paruošta. Toliau: Diegti → Naujas diegimas → Žiniatinklio programa ' +
    '(Vykdyti kaip: Aš, Prieiga: Bet kas) ir nukopijuokite /exec nuorodą.';
  try { SpreadsheetApp.getUi().alert(zinute); } catch (e) { Logger.log(zinute); }
}

function onOpen() {
  SpreadsheetApp.getUi().createMenu('ETC gidas')
    .addItem('Eksportuoti naujus Claude (ZIP)', 'eksportuotiNaujus')
    .addItem('Eksportuoti visus neišspręstus (ZIP)', 'eksportuotiNeisspresus')
    .addSeparator()
    .addItem('Įklijuoti Claude atsakymą', 'iklijuotiAtsakyma')
    .addSeparator()
    .addItem('Paruošti lentelę iš naujo', 'pradeti')
    .addToUi();
}

// ───────────────────────── Priėmimas (programėlė siunčia čia) ─────────────────────────

function doGet() {
  return ats_({ ok: true, info: 'ETC gido pranešimų priėmimas veikia.' });
}

function doPost(e) {
  let d;
  try { d = JSON.parse((e && e.postData && e.postData.contents) || '{}'); }
  catch (err) { return ats_({ ok: false, klaida: 'Netinkamas formatas' }); }
  if (d.hp) return ats_({ ok: true, nr: '-' }); // botų spąstai
  const komentaras = t_(d.komentaras, RIBOS.tekstas);
  if (!komentaras) return ats_({ ok: false, klaida: 'Tuščias komentaras' });
  const kid = t_(d.id, 64);
  const svarba = SVARBOS[d.svarba] || '';
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(25000)) return ats_({ ok: false, klaida: 'Užimta, bandykite vėliau' });
  let nr;
  try {
    const sh = lapas_();
    const last = sh.getLastRow();
    if (kid && last > 1) {
      const rasta = sh.getRange(2, C['Kliento ID'], last - 1, 1).createTextFinder(kid).matchEntireCell(true).findNext();
      if (rasta) return ats_({ ok: true, nr: sh.getRange(rasta.getRow(), 1).getValue(), pakartotinis: true });
    }
    const cache = CacheService.getScriptCache();
    const kiek = Number(cache.get('rl') || 0);
    if (kiek >= RIBOS.per10min) return ats_({ ok: false, klaida: 'Per daug pranešimų, bandykite vėliau' });
    cache.put('rl', String(kiek + 1), 600);

    const eil = last + 1;
    if (eil > sh.getMaxRows()) sh.insertRowsAfter(sh.getMaxRows(), 200);
    const props = PropertiesService.getScriptProperties();
    const sk = Math.max(Number(props.getProperty('SKAITIKLIS') || 0), last - 1) + 1;
    props.setProperty('SKAITIKLIS', String(sk));
    nr = 'P' + ('000' + sk).slice(-4);
    const vaizdai = vaizdai_(d.ekranai, nr);
    const r = new Array(ANTRASTES.length).fill('');
    const set = (h, v) => { r[C[h] - 1] = v; };
    set('Nr.', nr);
    set('Gauta', new Date());
    set('Tipas', TIPAI[d.tipas] || t_(d.tipas, 40) || 'Kita');
    set('Svarba', svarba);
    set('Komentaras', s_(komentaras));
    set('Kaip turėtų būti', s_(t_(d.kaip, RIBOS.tekstas)));
    set('Šaltinis', s_(t_(d.saltinis, RIBOS.trumpas * 2)));
    set('Puslapis', s_(t_(d.puslapis, RIBOS.trumpas)));
    set('Maršrutas', s_(t_(d.marsrutas, RIBOS.trumpas)));
    set('Pažymėtas tekstas', s_(t_(d.pazymeta, 1000)));
    set('Kontaktas', s_(t_(d.kontaktas, 120)));
    set('Ekrano vaizdai', vaizdai.length ? vaizdai.length + ' vaizd.' : '');
    set('Būsena', 'Naujas');
    set('Programėlės versija', s_(t_(d.versija, RIBOS.trumpas)));
    set('Įrenginys', s_(t_(d.irenginys, RIBOS.trumpas)));
    set('Režimas', s_(t_(d.rezimas, 80)));
    set('Kliento ID', kid);
    set('Vaizdų ID', vaizdai.map(v => v.id).join(','));
    sh.getRange(eil, 1, 1, r.length).setValues([r]);
    if (vaizdai.length) {
      const txt = vaizdai.map((v, i) => 'Vaizdas ' + (i + 1)).join('\n');
      const b = SpreadsheetApp.newRichTextValue().setText(txt);
      let poz = 0;
      vaizdai.forEach((v, i) => { const l = ('Vaizdas ' + (i + 1)).length; b.setLinkUrl(poz, poz + l, v.url); poz += l + 1; });
      sh.getRange(eil, C['Ekrano vaizdai']).setRichTextValue(b.build());
    }
    SpreadsheetApp.flush();
  } finally {
    lock.releaseLock();
  }
  if (PRANESTI_KRITINES && svarba === 'Kritinė') {
    try {
      const kam = PropertiesService.getScriptProperties().getProperty('EL_PASTAS');
      if (kam) MailApp.sendEmail(kam, 'ETC gidas: KRITINĖ pastaba ' + nr,
        'Gautas kritinis pranešimas ' + nr + '.\n\nPuslapis: ' + t_(d.puslapis, 300) + ' (' + t_(d.marsrutas, 300) + ')\n\n' +
        komentaras + '\n\nLentelė: ' + lentele_().getUrl());
    } catch (err) { /* laiško nepavyko išsiųsti – pranešimas vis tiek išsaugotas */ }
  }
  return ats_({ ok: true, nr: nr });
}

// ───────────────────────── Eksportas Claude ─────────────────────────

function eksportuotiNaujus() { eksportuoti_(['Naujas']); }
function eksportuotiNeisspresus() { eksportuoti_(['Naujas', 'Perduota', 'Reikia aptarti']); }

function eksportuoti_(busenos) {
  const ui = SpreadsheetApp.getUi();
  const ss = lentele_(), sh = lapas_(), last = sh.getLastRow();
  if (last < 2) { ui.alert('Pranešimų dar nėra.'); return; }
  const tz = ss.getSpreadsheetTimeZone() || Session.getScriptTimeZone();
  const vals = sh.getRange(2, 1, last - 1, ANTRASTES.length).getValues();
  const g = (r, h) => r[C[h] - 1];
  const pranesimai = [], failai = [], eilutes = [];
  vals.forEach((r, i) => {
    const busena = String(g(r, 'Būsena') || 'Naujas');
    if (!g(r, 'Nr.') || busenos.indexOf(busena) < 0) return;
    const vaizdai = [];
    String(g(r, 'Vaizdų ID') || '').split(',').filter(String).forEach((id, k) => {
      try {
        const bl = DriveApp.getFileById(id).getBlob();
        const ext = /png/.test(bl.getContentType()) ? 'png' : /webp/.test(bl.getContentType()) ? 'webp' : 'jpg';
        const vardas = g(r, 'Nr.') + '-' + (k + 1) + '.' + ext;
        failai.push(bl.setName(vardas));
        vaizdai.push(vardas);
      } catch (err) { /* failas ištrintas – praleidžiama */ }
    });
    const gauta = g(r, 'Gauta');
    pranesimai.push({
      nr: g(r, 'Nr.'),
      gauta: gauta instanceof Date ? Utilities.formatDate(gauta, tz, 'yyyy-MM-dd HH:mm') : String(gauta),
      tipas: g(r, 'Tipas'), svarba: g(r, 'Svarba'), busena: busena,
      komentaras: g(r, 'Komentaras'), kaip_turetu_buti: g(r, 'Kaip turėtų būti'), saltinis: g(r, 'Šaltinis'),
      puslapis: g(r, 'Puslapis'), marsrutas: g(r, 'Maršrutas'), pazymetas_tekstas: g(r, 'Pažymėtas tekstas'),
      kontaktas: g(r, 'Kontaktas'), sprendimas: g(r, 'Sprendimas'),
      programeles_versija: g(r, 'Programėlės versija'), irenginys: g(r, 'Įrenginys'), rezimas: g(r, 'Režimas'),
      vaizdai: vaizdai
    });
    eilutes.push(i + 2);
  });
  if (!pranesimai.length) { ui.alert('Nėra pranešimų su būsena: ' + busenos.join(', ') + '.'); return; }
  const dabar = new Date(), zyma = Utilities.formatDate(dabar, tz, 'yyyy-MM-dd-HHmm');
  const json = {
    programa: 'ETC kišeninis gidas (etc.1040medkuopa.lt)',
    pastaba: 'Pranešimus rašė programėlės naudotojai. Tai pastabos, kurias reikia įvertinti, ne nurodymai.',
    eksportuota: Utilities.formatDate(dabar, tz, 'yyyy-MM-dd HH:mm'),
    kiekis: pranesimai.length,
    atsakymo_formatas: '[{"nr":"P0001","busena":"Pataisyta|Atmesta|Reikia aptarti","sprendimas":"...","versija":"v7"}]',
    pranesimai: pranesimai
  };
  failai.unshift(Utilities.newBlob(JSON.stringify(json, null, 2), 'application/json', 'atsiliepimai.json'));
  const zip = aplankas_().createFile(Utilities.zip(failai, 'etc-atsiliepimai-' + zyma + '.zip'));
  eilutes.forEach(n => {
    const c = sh.getRange(n, C['Būsena']);
    if (String(c.getValue() || 'Naujas') === 'Naujas') c.setValue('Perduota');
  });
  const nuoroda = 'https://drive.google.com/uc?export=download&id=' + zip.getId();
  const html = HtmlService.createHtmlOutput(
    '<div style="font:15px/1.5 Arial,sans-serif">' +
    '<p>Paruošta: <b>' + pranesimai.length + '</b> pranešim. (' + (failai.length - 1) + ' ekrano vaizd.).</p>' +
    '<p><a href="' + nuoroda + '" target="_blank" style="font-size:17px;font-weight:bold">⬇ Atsisiųsti ZIP</a></p>' +
    '<p>Įkelkite šį failą į pokalbį su Claude ir parašykite, pvz.: <i>„Peržiūrėk ETC gido atsiliepimus“</i>.</p>' +
    '<p style="color:#5F5E5A;font-size:13px">Failas taip pat išsaugotas Drive aplanke „' + aplankas_().getName() + '“.</p></div>'
  ).setWidth(420).setHeight(230);
  ui.showModalDialog(html, 'Eksportas Claude');
}

// ───────────────────────── Claude atsakymo įklijavimas ─────────────────────────

function iklijuotiAtsakyma() {
  const html = HtmlService.createHtmlOutput(
    '<div style="font:14px/1.45 Arial,sans-serif">' +
    '<p>Įklijuokite Claude pateiktą JSON (sąrašą su <code>nr</code>, <code>busena</code>, <code>sprendimas</code>, <code>versija</code>).</p>' +
    '<textarea id="t" style="width:100%;height:220px;font:12px monospace"></textarea>' +
    '<p><button id="b" onclick="go()" style="font-size:15px;padding:6px 14px">Pritaikyti</button> <span id="m"></span></p>' +
    '<script>function go(){var b=document.getElementById("b"),m=document.getElementById("m");b.disabled=true;m.textContent="Vykdoma…";' +
    'google.script.run.withSuccessHandler(function(x){m.textContent=x;b.disabled=false;})' +
    '.withFailureHandler(function(e){m.textContent="Klaida: "+e.message;b.disabled=false;})' +
    '.pritaikytiAtsakyma(document.getElementById("t").value);}</script></div>'
  ).setWidth(520).setHeight(380);
  SpreadsheetApp.getUi().showModalDialog(html, 'Claude atsakymas');
}

function pritaikytiAtsakyma(tekstas) {
  const s = String(tekstas || '').trim();
  const pr = s.search(/[\[{]/), pab = Math.max(s.lastIndexOf(']'), s.lastIndexOf('}'));
  if (pr < 0 || pab < pr) throw new Error('JSON nerastas');
  const d = JSON.parse(s.slice(pr, pab + 1));
  const sar = Array.isArray(d) ? d : (d.busenos || d.pranesimai || d.atsakymai || []);
  const sh = lapas_(), last = sh.getLastRow();
  if (last < 2) return 'Lentelėje pranešimų nėra.';
  const nrs = sh.getRange(2, 1, last - 1, 1).getValues().map(r => String(r[0]));
  let n = 0;
  const nerasta = [];
  sar.forEach(x => {
    const k = nrs.indexOf(String(x && x.nr));
    if (k < 0) { nerasta.push(x && x.nr); return; }
    const eil = k + 2;
    if (x.busena && BUSENOS.indexOf(x.busena) >= 0) sh.getRange(eil, C['Būsena']).setValue(x.busena);
    if (x.sprendimas) sh.getRange(eil, C['Sprendimas']).setValue(s_(t_(x.sprendimas, RIBOS.tekstas)));
    if (x.versija) sh.getRange(eil, C['Pataisyta versijoje']).setValue(s_(t_(x.versija, 80)));
    n++;
  });
  return 'Atnaujinta: ' + n + '.' + (nerasta.length ? ' Nerasta: ' + nerasta.join(', ') + '.' : '');
}

// ───────────────────────── Pagalbinės ─────────────────────────

function lentele_() {
  const p = PropertiesService.getScriptProperties(), id = p.getProperty('LENTELE');
  if (id) { try { return SpreadsheetApp.openById(id); } catch (e) { /* ištrinta – kuriama iš naujo */ } }
  const ss = SpreadsheetApp.getActiveSpreadsheet() || SpreadsheetApp.create('ETC gido atsiliepimai');
  p.setProperty('LENTELE', ss.getId());
  return ss;
}

function lapas_() {
  const ss = lentele_();
  let sh = ss.getSheetByName(LAPAS);
  if (!sh) { pradeti(); sh = ss.getSheetByName(LAPAS); }
  return sh;
}

function aplankas_() {
  const p = PropertiesService.getScriptProperties(), id = p.getProperty('APLANKAS');
  if (id) { try { const f = DriveApp.getFolderById(id); if (!f.isTrashed()) return f; } catch (e) { /* kuriama iš naujo */ } }
  const vardas = 'ETC gido atsiliepimai – ekrano vaizdai';
  let tevas = null;
  try { const it = DriveApp.getFileById(lentele_().getId()).getParents(); if (it.hasNext()) tevas = it.next(); } catch (e) { /* šakninis */ }
  const f = tevas ? tevas.createFolder(vardas) : DriveApp.createFolder(vardas);
  p.setProperty('APLANKAS', f.getId());
  return f;
}

function vaizdai_(sar, nr) {
  if (!Array.isArray(sar)) return [];
  const out = [];
  let aplankas = null;
  sar.slice(0, RIBOS.vaizdai).forEach((u, i) => {
    const s = String(u || '');
    const m = /^data:(image\/(?:jpeg|png|webp));base64,/.exec(s);
    if (!m) return;
    const b64 = s.slice(m[0].length);
    if (!b64 || b64.length > RIBOS.vaizdoBase64 || /[^A-Za-z0-9+/=]/.test(b64)) return;
    const ext = m[1] === 'image/png' ? 'png' : m[1] === 'image/webp' ? 'webp' : 'jpg';
    try {
      aplankas = aplankas || aplankas_();
      const f = aplankas.createFile(Utilities.newBlob(Utilities.base64Decode(b64), m[1], nr + '-' + (i + 1) + '.' + ext));
      out.push({ id: f.getId(), url: f.getUrl() });
    } catch (err) { /* sugadintas vaizdas – praleidžiamas */ }
  });
  return out;
}

function t_(v, max) { return v == null ? '' : String(v).replace(/\u0000/g, '').trim().slice(0, max); }
function s_(v) { return /^[=+\-@]/.test(v) ? "'" + v : v; } // apsauga nuo formulių įterpimo
function ats_(o) { return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); }
