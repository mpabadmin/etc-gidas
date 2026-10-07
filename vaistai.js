// ETC kišeninis gidas – VAISTAI
// Šaltinių hierarchija (vadovo sprendimas, 2026-10-08): pirmiausia tarptautiniai dokumentai –
//   1) TCCC gairės 2026-05-01 (CoTCCC, Deployed Medicine), 2) gamintojo PCS (preparato charakteristikų santrauka;
//   tikrinta JK eMC / EMA versija – sutikrinkite su turimo preparato VVKT PCS), 3) ERC / RCUK gairės.
// Kuopos vaistų kortelė, TCCC vadovas (M. Grinevičius) ir ETC lentelės laikomi mažiau patikimais:
//   jų duomenys pateikiami lauke „kortele“ (rodoma suskleista), o jei skiriasi – galioja „dozes“.
// Laukai: grupe – paskirtis (sąrašo grupavimui); tipas: 'pagr' – yra kuopos vaistų kortelėje, 'papild' – nėra;
//   tccc26: true – vaistas yra TCCC 2026 gairėse; kam – kas skiria; dozes – pagrindinės dozės (tarptautiniai šaltiniai);
//   kortele – kuopos kortelės / M. Grinevičiaus vadovo / ETC lentelių duomenys; nuorodos – [pavadinimas, URL].
// Patvirtinus mediko: įrašykite  patvirtinta: 'Vardas Pavardė, data'  – žyma „Laukia mediko patvirtinimo“ pasikeis.
// Skaičiuoklė (c): per – mg/kg; min/max – intervalas mg/kg; conc – mg/ml švirkšte (rodomi ml); u – vienetai;
//   minute: true – dozė mcg/kg/min, rodoma mcg/min ir ml/val. (conc – mcg/ml).
// Patikrinta pagal viešus šaltinius: 2026-10-08.
window.ETC = window.ETC || {};

(function () {
const KORTELE = 'Kuopos vaistų kortelė';
const GRIN = 'Trumpas TCCC vaistų vadovas (M. Grinevičius)';
const ETC_LENT = 'ETC įgūdžių lentelės (vaistai IV boliusu ir infuzomatu)';
const TCCC26 = 'TCCC gairės, 2026-05-01 (CoTCCC, Deployed Medicine)';
const ATP = 'ankstesnės TCCC gairės (ATP-P, JSOM)';
const TITRAVIMAS = 'Titravimas (TCCC vadovas, M. Grinevičius): geriau kelios mažesnės dozės nedideliais intervalais nei viena didelė; norimas efektas – skausmo sumažėjimas bent 3 balais (pvz., 8/10 → 5/10). TCCC 2026: tikslas – toleruojamas skausmas, išsaugant kvėpavimo takų praeinamumą, savarankišką kvėpavimą ir sąmonę, o ne visiškas skausmo pašalinimas ar gili sedacija.';

const L_TCCC26 = ['TCCC gairės 2026-05-01 (PDF, Deployed Medicine)', 'https://learning-media.allogy.com/api/v1/pdf/18ccfdfc-a076-47e9-8a34-376efdd81b43/contents'];
const L_DM = ['Deployed Medicine – TCCC kolekcija (reikia prisijungti)', 'https://deployedmedicine.allogy.net/learner/collections/11'];
const L_ATP24 = ['Ankstesnės TCCC gairės (ATP-P, JSOM) – analgezija', 'https://www.jsomonline.com/Library/Flipbook/ATPEng/files/basic-html/page24.html'];
const L_ATP25 = ['Ankstesnės TCCC gairės (ATP-P, JSOM) – naloksonas, ondansetronas', 'https://www.jsomonline.com/Library/Flipbook/ATPEng/files/basic-html/page25.html'];
const L_NG_NOKET = ['NextGen Combat Medic – kai nėra ketamino', 'https://nextgencombatmedic.com/2024/11/18/what-if-you-didnt-have-ketamine-as-a-68w-combat-medic'];
const pcs = (pav, id) => ['PCS – ' + pav + ' (JK eMC)', 'https://www.medicines.org.uk/emc/product/' + id + '/smpc'];

window.ETC.vaistuGrupes = [
  { id: 'kraujas', pav: 'Kraujavimas ir transfuzija' },
  { id: 'skausmas', pav: 'Skausmas ir sedacija' },
  { id: 'vemimas', pav: 'Pykinimas ir vėmimas' },
  { id: 'antibiotikai', pav: 'Antibiotikai' },
  { id: 'galva', pav: 'Galvos smegenų trauma' },
  { id: 'gaivinimas', pav: 'Kraujotaka ir intubacija' }
];

window.ETC.vaistai = [
  // ───────── KRAUJAVIMAS IR TRANSFUZIJA ─────────
  {
    id: 'txa', name: 'Traneksamo rūgštis (TXA)', klase: 'Antifibrinolitikas', grupe: 'kraujas', tipas: 'pagr', tccc26: true,
    ind: 'Kai tikėtina transfuzija: hemoraginis šokas, didelė amputacija, penetruojanti liemens trauma, stiprus kraujavimas. Taip pat – reikšminga galvos smegenų trauma ar pakitusi sąmonė po sprogimo / bukos traumos (TCCC 2026).',
    kontra: 'PCS: padidėjęs jautrumas; ūminė venų ar arterijų trombozė; fibrinolizė po vartojimo koaguliopatijos (DIK), išskyrus vyraujančią fibrinolizę su ūminiu sunkiu kraujavimu; traukulių anamnezė; negalima leisti intratekališkai, epidurališkai, intraventrikuliškai ar į galvos smegenis.',
    dozes: [
      { k: 'IV / IO (TCCC 2026)', d: '2 g lėtai IV / IO – kuo anksčiau, bet ne vėliau kaip per 3 val. nuo sužalojimo',
        p: 'Ampulės 500 mg / 5 ml: 4 ampulės = 20 ml (2 g).\nPCS: leisti ne greičiau kaip 1 ml/min (2 g ≈ 20 min).' }
    ],
    ispejimai: [
      'Ne vėliau nei per 3 val. nuo sužalojimo – vėliau skirti žalinga. Pradžios ekrane pažymėkite traumos laiką – kortelė „TXA iki“ parodys terminą.',
      'Per greita injekcija gali sukelti hipotenziją (PCS).',
      'Tik IV / IO. Į raumenis neleisti (PCS). Nemaišyti su krauju ir penicilino tirpalais (PCS).'
    ],
    kortele: [
      'Kuopos kortelė: 2 g IV per 3 val. nuo traumos – atitinka TCCC 2026. Kortelėje dar nurodyta: ampulės turiniu suvilgyti tvarstį ir tamponuoti gausiai kraujuojančią vietą (TCCC 2026 ir PCS šio būdo nenumato).',
      'TCCC vadovas (M. Grinevičius): kai nėra IV / IO – ta pati dozė į raumenis (PCS tai draudžia; TCCC 2026 – tik IV / IO). Taip pat pateikta 1 g per 10 min + 1 g per 8 val. schema (CRASH-2) – TCCC 2026 nurodo vienkartinę 2 g dozę.',
      'ETC lentelė: 2 g „greita infuzija“ 100–250 ml NaCl. Greitis – pagal PCS (ne greičiau kaip 100 mg/min).'
    ],
    salutinis: 'Pykinimas, vėmimas, viduriavimas, galvos skausmas, kraujospūdžio sumažėjimas (per greitai leidžiant), galimi traukuliai (ypač jei yra pasireiškę anksčiau).',
    pakuote: 'Ampulės 500 mg / 5 ml (100 mg/ml)',
    pastabos: ['Po pirmojo perpilto kraujo produkto – kalcis (TCCC 2026).', 'Gydymo kokybės kriterijus: pacientui skirta traneksamo rūgštis.'],
    susije: ['kalcis'],
    saltinis: TCCC26 + '; PCS (Cyklokapron); ' + KORTELE + '; ' + GRIN + '; ' + ETC_LENT + '; ETC vertinimo lapas',
    nuorodos: [L_TCCC26, L_DM, pcs('Cyklokapron (traneksamo rūgštis)', 1077), ['NextGen Combat Medic – Tranexamic Acid', 'https://nextgencombatmedic.com/2024/12/21/tranexamic-acid/']]
  },
  {
    id: 'kalcis', name: 'Kalcio gliukonatas 10 %', klase: 'Elektrolitai', grupe: 'kraujas', tipas: 'papild', tccc26: true, kam: 'Medicinos personalui',
    ind: 'Perpylus bet kokį kraujo produktą (įskaitant pilną kraują) – po pirmojo perpilto vieneto (TCCC 2026).',
    kontra: 'PCS: hiperkalcemija, hiperkalciurija, apsinuodijimas širdies glikozidais; vartojantiems širdies glikozidus (digoksiną) – kontraindikuotina, išskyrus gyvybei grėsmingą sunkią hipokalcemiją ar hiperkalemiją.',
    dozes: [
      { k: 'IV / IO (TCCC 2026)', d: '1 g kalcio: 30 ml 10 % kalcio gliukonato (arba 10 ml 10 % kalcio chlorido)',
        p: 'Po pirmojo perpilto kraujo produkto vieneto.\nPCS greitis: ne greičiau kaip 0,45 mmol kalcio per min – 30 ml 10 % kalcio gliukonato ne trumpiau kaip ~15 min.' }
    ],
    ispejimai: [
      'Nemaišyti ir neleisti ta pačia linija su natrio bikarbonatu ar fosfatais. Su ceftriaksonu nemaišyti ir neleisti vienu metu (net per skirtingas linijas ar vietas); esant hipovolemijai – nelašinti ir paeiliui (PCS).',
      'Ekstravazacija sukelia audinių nekrozę (PCS).'
    ],
    kortele: ['ETC lentelė: 3 g (30 ml 10 %) į 250 ml NaCl „greita infuzija“. Dozė atitinka TCCC (30 ml 10 % = 3 g kalcio gliukonato druskos); greitis – pagal PCS.'],
    pakuote: '10 % tirpalas (100 mg/ml kalcio gliukonato)',
    pastabos: [
      'TCCC „1 g kalcio“ – tai 30 ml 10 % kalcio gliukonato (3 g druskos) arba 10 ml 10 % kalcio chlorido (1 g druskos); abiem atvejais – apie 6,3–6,8 mmol kalcio (priklauso nuo preparato).',
      'Gydymo kokybės kriterijus: užtikrinamas kalcio kiekis esant kraujo transfuzijai.'
    ],
    susije: ['txa'],
    saltinis: TCCC26 + '; PCS (kalcio gliukonatas 10 %); ' + ETC_LENT + '; ETC vertinimo lapas',
    nuorodos: [L_TCCC26, L_DM, pcs('kalcio gliukonatas 10 %', 6264)]
  },

  // ───────── SKAUSMAS IR SEDACIJA ─────────
  {
    id: 'ketaminas', name: 'Ketaminas', klase: 'Nuskausminamieji', grupe: 'skausmas', tipas: 'pagr', tccc26: true,
    ind: 'Skausmas, kai sužeistasis negali tęsti užduoties (TCCC 2026, medicinos personalas). TCCC kovos paramedikams ir gydytojams – ir procedūrinei sedacijai.',
    kontra: 'Alergija. PCS: būklės, kai kraujospūdžio padidėjimas būtų pavojingas, eklampsija / preeklampsija, sunki koronarinė ar miokardo liga, insultas, galvos smegenų trauma (žr. įspėjimą – TCCC vertina kitaip).',
    dozes: [
      { k: 'IV / IO (TCCC 2026)', d: '0,2–0,3 mg/kg (arba 25 mg) · ml skiesto 5 mg/ml tirpalo', c: { min: 0.2, max: 0.3, conc: 5 },
        p: 'Leisti lėtai per 1 min. Kartoti kas 30 min pagal poreikį.\nSkiedimas: 1 ml (50 mg/ml) praskiesti iki 10 ml = 5 mg/ml; 25 mg = 5 ml.' },
      { k: 'IM (TCCC 2026)', d: '100 mg', p: '50 mg/ml – 2 ml; 100 mg/ml – 1 ml. Kartoti kas 30 min pagal poreikį.' },
      { k: 'Į nosį (TCCC 2026)', d: '50 mg', p: 'Naudoti 100 mg/ml koncentraciją (0,5 ml). Kartoti kas 30 min pagal poreikį.' }
    ],
    ispejimai: [
      'Tikslas – sumažėjęs skausmas arba atsiradęs nistagmas (TCCC 2026).',
      'Prieš skiriant užrašyti AVPU; pacientą nuginkluoti, apsvarstyti ryšio priemonių atjungimą. Stebėti kvėpavimo takus, kvėpavimą ir kraujotaką (TCCC 2026).',
      'Patikrinkite ampulės stiprumą (50 ar 100 mg/ml). IV skaičiuoklė – 5 mg/ml (1 ml 50 mg/ml praskiedus iki 10 ml); jei ampulė 100 mg/ml – 1 ml skiesti iki 20 ml.',
      'Greitai leidžiant į veną – laikina apnėja ir kraujospūdžio padidėjimas (PCS). Leisti per 1 min.',
      'Galvos smegenų ar akies trauma ketaminui nėra kliūtis (TCCC 2026), tačiau sedacija apsunkina neurologinį vertinimą. Gamintojo PCS galvos traumą nurodo kaip kontraindikaciją – sprendžia medikas.',
      'Nederinti su benzodiazepinais (TCCC 2026). Jei pacientas iš dalies disocijavęs – saugiau papildyti ketamino nei skirti benzodiazepino. Ketaminą paprastai saugu skirti jau gavusiam opioidų (TCCC 2026).',
      'Sumažėjus kvėpavimui po ketamino ar opioidų – kvėpavimo takus atverti „uostymo“ padėtimi; jei nepadeda – pagalbinė ventiliacija (TCCC 2026).'
    ],
    kortele: [
      'Kuopos kortelė: IV 0,25 mg/kg skiesto 5 mg/ml tirpalo, išliekant skausmui kartoti po 5–10 min iki nistagmo; IM 0,5–1 mg/kg neskiesto 50 mg/ml, kartoti po 20 min. TCCC 2026 kartoja kas 30 min, IM – fiksuota 100 mg dozė, į nosį – 50 mg (kortelėje šio būdo nėra).',
      'Kortelės pavyzdys (IV): iš ampulės 1 ml (50 mg) skiesti iki 10 ml, suleisti 5 ml (25 mg) – atitinka TCCC 2026 25 mg dozę.',
      'TCCC vadovas (M. Grinevičius): IV 0,1–0,3 mg/kg (praktiškai 10–20 mg kas 5–10 min arba 20–30 mg kas 20 min); IM 0,5–1 mg/kg (50–100 mg kas 20–30 min). Pikas: IV 1–2 min, IM 10–15 min.',
      'ETC lentelė (sedacija): 250 mg (5 ml × 50 mg/ml) + 5 ml NaCl (10 ml švirkštas) = 25 mg/ml; 1–2 mg/kg, esant šokui dozę mažinti 50 %. Infuzomatu: 500 mg + 40 ml NaCl (50 ml švirkštas) = 10 mg/ml, nuo 0,5 mg/kg/val. (~100 kg pacientui – maždaug nuo 5 ml/val.).'
    ],
    pradzia: '30 s – 1 min (į veną)\n2–5 min (į raumenis)',
    trukme: '10–20 min (į veną)\n20–30 min (į raumenis)',
    salutinis: 'Pykinimas, vėmimas, galvos svaigimas (dėl nistagmo), raumenų įsitempimas, sumišimas, haliucinacijos, disociacija iki visiško nereagavimo į aplinką (priklauso nuo dozės), kraujospūdžio ir pulso padidėjimas.',
    pakuote: 'Ampulės 250 mg / 5 ml (50 mg/ml)',
    pastabos: [
      'Kartu – kovinės žaizdos vaistų rinkinys (CWMP: paracetamolis, meloksikamas, suzetriginas), jei dar nevartotas (TCCC 2026).',
      'Esketaminas (jei prieinamas): 14 arba 28 mg į nosį vieną kartą (TCCC 2026).',
      'Procedūrinė sedacija (TCCC 2026, kovos paramedikai / gydytojai; būti pasiruošus užtikrinti kvėpavimo takus): 1–2 mg/kg lėtai IV / IO arba 300 mg (2–3 mg/kg) IM. Emergencijos reakcijai – svarstyti midazolamą 0,5–2 mg IV / IO.',
      'Mažiau slopina kvėpavimą ir kraujotaką nei opioidai. Nistagmas – nevalingi, ritmingi akių judesiai.',
      TITRAVIMAS
    ],
    susije: ['paracetamolis', 'meloksikamas', 'midazolamas', 'ondansetronas'],
    saltinis: TCCC26 + '; PCS (Ketalar); ' + KORTELE + '; ' + GRIN + '; ' + ETC_LENT,
    nuorodos: [L_TCCC26, L_DM, pcs('Ketalar (ketaminas)', 5202), ['NextGen Combat Medic – Ketamine Toolkit', 'https://nextgencombatmedic.com/2022/01/07/ketamine-toolkit/'], L_ATP24]
  },
  {
    id: 'paracetamolis', name: 'Paracetamolis', klase: 'Nuskausminamieji (CWMP)', grupe: 'skausmas', tipas: 'papild', tccc26: true, kam: 'Visiems (CWMP)',
    ind: 'Skausmas, kai sužeistasis gali tęsti užduotį – kovinės žaizdos vaistų rinkinio (CWMP) dalis. Negalinčiam tęsti užduoties – CWMP kartu su ketaminu (TCCC 2026).',
    kontra: 'PCS: padidėjęs jautrumas. Atsargiai – sunkus kepenų ar inkstų nepakankamumas, alkoholinė kepenų liga.',
    dozes: [
      { k: 'Per burną (TCCC 2026)', d: '1000–1300 mg kas 8 val.', p: 'Pvz., 2 × 650 mg prailginto atpalaidavimo tabletės (CWMP). Turint 500 mg tabletes – 2 tabletės (1000 mg).' }
    ],
    ispejimai: [
      'Nevartoti kartu su kitais paracetamolio turinčiais vaistais (PCS).',
      'PCS (500 mg tabletės): ne dažniau kaip kas 4 val., ne daugiau kaip 4 g per parą. TCCC schema – iki 3,9 g per parą.'
    ],
    salutinis: 'Retai – alerginės reakcijos. Perdozavus – kepenų pažeidimas.',
    pakuote: 'Tabletės 500 mg (CWMP – 650 mg prailginto atpalaidavimo)',
    pastabos: [
      'CWMP (TCCC 2026): paracetamolis 1000–1300 mg kas 8 val. + meloksikamas 15 mg kartą per parą + suzetriginas 100 mg vieną kartą, po to 50 mg kas 12 val. Suzetriginas registruotas JAV – ar prieinamas, tikrinkite.'
    ],
    susije: ['meloksikamas', 'ketaminas'],
    saltinis: TCCC26 + '; PCS (paracetamolis 500 mg)',
    nuorodos: [L_TCCC26, L_DM, pcs('paracetamolis 500 mg', 5164)]
  },
  {
    id: 'meloksikamas', name: 'Meloksikamas', klase: 'Nuskausminamieji (CWMP, NVNU)', grupe: 'skausmas', tipas: 'papild', tccc26: true, kam: 'Visiems (CWMP)',
    ind: 'Skausmas – kovinės žaizdos vaistų rinkinio (CWMP) dalis: kai sužeistasis gali tęsti užduotį; negalinčiam tęsti – CWMP (jei dar nevartotas) kartu su ketaminu (TCCC 2026).',
    kontra: 'PCS: padidėjęs jautrumas NVNU / aspirinui (astma, nosies polipai, angioedema, dilgėlinė); virškinamojo trakto kraujavimas ar perforacija (taip pat anksčiau nuo NVNU); aktyvi ar pasikartojanti opa; smegenų kraujavimas anamnezėje ar kiti kraujavimo sutrikimai; sunkus kepenų nepakankamumas; sunkus nedializuojamas inkstų nepakankamumas; sunkus širdies nepakankamumas; III nėštumo trimestras; < 16 m.',
    dozes: [
      { k: 'Per burną (TCCC 2026)', d: '15 mg kartą per parą', p: 'PCS: ne daugiau kaip 15 mg per parą; vartoti valgant.' }
    ],
    ispejimai: [
      'Hipovolemija (bet kokios kilmės) – inkstų pažeidimo rizikos veiksnys (PCS).',
      'Virškinamojo trakto kraujavimo, opų ar perforacijos rizika (PCS). Nevartoti kartu su kitais NVNU.'
    ],
    salutinis: 'Dispepsija, pykinimas, pilvo skausmas, viduriavimas.',
    pakuote: 'Tabletės 15 mg',
    pastabos: ['CWMP (TCCC 2026): paracetamolis + meloksikamas + suzetriginas. Jei dar nevartotas – ir negalinčiam tęsti užduoties, kartu su ketaminu.'],
    susije: ['paracetamolis', 'ketaminas'],
    saltinis: TCCC26 + '; PCS (meloksikamas 15 mg)',
    nuorodos: [L_TCCC26, L_DM, pcs('meloksikamas 15 mg', 101306)]
  },
  {
    id: 'morfinas', name: 'Morfinas', klase: 'Nuskausminamieji (opioidas)', grupe: 'skausmas', tipas: 'pagr',
    ind: 'Stiprus skausmas. TCCC 2026 morfino nebenumato – negalinčiam tęsti užduoties rekomenduoja ketaminą (arba esketaminą į nosį).',
    kontra: 'Alergija. PCS: ūminis kvėpavimo slopinimas, obstrukcinė kvėpavimo takų liga, galvos trauma, padidėjęs intrakranijinis spaudimas, smegenų edema, koma, traukulių ligos, MAO inhibitoriai (per 2 sav.), paralyžinis žarnų nepraeinamumas, feochromocitoma.',
    dozes: [
      { k: 'IV (PCS)', d: '2,5–15 mg, įprastai ne dažniau kaip kas 4 val.; dozė ir intervalas titruojami pagal atsaką',
        p: 'PCS: dozė ir intervalas titruojami, kol pasiekiamas nuskausminimas. Pradėti nuo mažesnės dozės.\nSkiedimas: 1 ml (10 mg) praskiesti iki 10 ml = 1 mg/ml.' },
      { k: 'IM (PCS)', d: '10 mg (5–20 mg) kas 4 val. pagal poreikį', p: 'Neskiesto 10 mg/ml – 1 ml (10 mg).' }
    ],
    ispejimai: [
      'Kvėpavimo slopinimas gali prasidėti nepasiekus norimo nuskausminimo arba tęstis ilgiau. Antagonistas – naloksonas. Skyrimą nutraukti, kai kvėpavimo dažnis < 10 k./min.',
      'Senyviems ir esant hipotenzijai / šokui – mažesnės dozės (PCS). Šoko ar kvėpavimo sutrikimo atveju TCCC rekomenduoja ketaminą.',
      'Nederinti su benzodiazepinais: sedacija, kvėpavimo slopinimas, koma, mirtis (PCS, TCCC 2026).'
    ],
    kortele: [
      'Kuopos kortelė: IV 2–5 mg, išliekant skausmui kartoti kas 10–15 min (titruojant iki efekto; pvz., 1 ml (10 mg) skiesti iki 10 ml, suleisti 2–3 ml). IM 5–10 mg kas 2 val., maks. 20 mg per 4 val. PCS IM kartoja kas 4 val. – sprendžia medikas.',
      'ETC lentelė: boliusas 0,1 mg/kg (100 kg – 10 mg), 10 mg + 9 ml NaCl = 1 mg/ml. Infuzomatu – 1 mg/ml, pradinis greitis 1–2 mg/val. (1–2 ml/val.).'
    ],
    pradzia: '5–10 min (į veną)\n10–30 min (į raumenis)',
    trukme: '3–5 val.',
    salutinis: 'Pykinimas, vėmimas, kvėpavimo slopinimas, kraujospūdžio sumažėjimas, sutrikusi žarnyno veikla.',
    pakuote: 'Ampulės 10 mg / 1 ml (10 mg/ml)',
    pastabos: [
      'NextGen Combat Medic: 10 mg morfino ≈ 100 mcg fentanilio; 0,1 mg/kg morfino ≈ 1 mcg/kg fentanilio.',
      TITRAVIMAS
    ],
    susije: ['naloksonas', 'ketaminas', 'ondansetronas'],
    saltinis: 'PCS (morfino sulfatas 10 mg/ml); ' + TCCC26 + '; ' + KORTELE + '; ' + ETC_LENT,
    nuorodos: [pcs('morfino sulfatas 10 mg/ml', 13178), L_TCCC26, L_ATP24, L_NG_NOKET]
  },
  {
    id: 'fentanilis', name: 'Fentanilis', klase: 'Nuskausminamieji (opioidas)', grupe: 'skausmas', tipas: 'papild', kam: 'Medicinos personalui',
    ind: 'Stiprus skausmas. TCCC 2026 fentanilio nebenumato (ankstesnėse TCCC gairėse buvo).',
    kontra: 'PCS: alergija opioidams, kvėpavimo slopinimas, obstrukcinė kvėpavimo takų liga, MAO inhibitoriai (per 2 sav.).',
    dozes: [
      { k: 'IV / IO (ankstesnės TCCC)', d: '50 mcg lėtai, kartoti kas 30 min pagal poreikį', p: 'Neskiesto 50 mcg/ml – 1 ml.' },
      { k: 'Į nosį (ankstesnės TCCC)', d: '100 mcg, kartoti kas 30 min pagal poreikį' },
      { k: 'IV / IO pagal kg (ankstesnės TCCC; ETC lentelė)', d: '0,5–1 mcg/kg · ml neskiesto 50 mcg/ml', c: { min: 0.5, max: 1, conc: 50, u: 'mcg' } }
    ],
    ispejimai: [
      'Kvėpavimo slopinimas, gali progresuoti iki apnėjos (PCS). Perdozavimo atveju – naloksonas.',
      'Leisti lėtai (NextGen Combat Medic – per 2 min): lėta injekcija padeda išvengti raumenų, taip pat krūtinės, rigidiškumo (PCS).',
      'Nederinti su benzodiazepinais (TCCC, PCS). Senyviems – mažesnė dozė (PCS).'
    ],
    kortele: [
      'TCCC vadovas (M. Grinevičius): 1–2 mcg/kg; praktiškai 25–50 mcg IV kas 10–15 min ar rečiau, titruojant. Veikimo trukmė – 30–60 min (PCS: 100 mcg nuskausmina apie 10–20 min).',
      'ETC lentelė: boliusas – 100 mcg (2 ml švirkštas), 50 mcg/ml, 0,5–1 mcg/kg. Infuzomatu – 1000 mcg + 30 ml NaCl (50 ml švirkštas) = 20 mcg/ml, 1–3 mcg/kg/val. (~100 kg pacientui – maždaug nuo 5 ml/val.).'
    ],
    pradzia: '1–2 min (į veną), pikas 2–5 min',
    trukme: '30–60 min (į veną)',
    salutinis: 'Kvėpavimo slopinimas, pykinimas, sedacija, raumenų rigidiškumas.',
    pakuote: '50 mcg/ml tirpalas',
    pastabos: [
      'NextGen Combat Medic: pradinė dozė paprastai ne didesnė kaip 100 mcg, toliau – po 25–50 mcg; šoko atveju opioidai šalinami lėčiau.',
      TITRAVIMAS
    ],
    susije: ['naloksonas', 'morfinas', 'ketaminas'],
    saltinis: ATP + '; PCS (fentanilis); NextGen Combat Medic; ' + GRIN + '; ' + ETC_LENT,
    nuorodos: [L_ATP24, pcs('fentanilis 50 mcg/ml', 100051), L_NG_NOKET]
  },
  {
    id: 'naloksonas', name: 'Naloksonas', klase: 'Opioidų antagonistas', grupe: 'skausmas', tipas: 'pagr',
    ind: 'Opioidų sukelto kvėpavimo slopinimo šalinimas.',
    kontra: 'Alergija.',
    dozes: [
      { k: 'IV – po nuskausminimo opioidais (PCS)', d: '0,1–0,2 mg; po to po 0,1 mg, tarp dozių laukti 2 min',
        p: 'Titruoti iki kvėpavimo dažnio > 10 k./min, išsaugant nuskausminimą.\nSkiedimas: 0,4 mg (1 ml) + 9 ml NaCl = 0,04 mg/ml; 0,1 mg = 2,5 ml.' },
      { k: 'IV / IM – perdozavimas (PCS)', d: '0,4–2 mg, kartoti kas 2–3 min',
        p: 'IM – kai IV neįmanoma. Jei po 10 mg nėra atsako – peržiūrėti diagnozę (PCS).' },
      { k: 'Į nosį (Nyxoid, PCS)', d: '1,8 mg į vieną šnervę', p: 'Nėra atsako – antra dozė po 2–3 min kita šnerve. Jei atsakas buvo, bet kvėpavimo slopinimas atsinaujina – antra dozė iš karto. Kitos dozės – pakaitomis į šnerves.' }
    ],
    ispejimai: [
      'Naloksono poveikis trunka 1–4 val. (priklauso nuo dozės), kai kurių opioidų – ilgiau: stebėti, ar neatsinaujina kvėpavimo slopinimas; gali reikėti kartoti per 1–2 val. (PCS).',
      'Per greitas opioidų poveikio atstatymas gali sukelti ūminį abstinencijos sindromą, hipertenziją, aritmijas, plaučių edemą (PCS).'
    ],
    kortele: [
      'Kuopos kortelė: IV ir IM 0,4–2 mg kas 2–3 min; IV – 0,4 mg (1 ml) skiesti iki 10 ml ir suleisti visus 10 ml, titruoti iki kvėpavimo dažnio > 10 k./min. Veikimo trukmė IV – 20–90 min.',
      'ETC lentelė: 0,4 mg + 9 ml NaCl = 0,04 mg/ml; po 0,2 mg (5 ml) kas 2–3 min iki efekto, maks. 2 mg.',
      'TCCC vadovas (M. Grinevičius): IV / IM 0,4–2 mg kas 2–3 min (maks. 10 mg); pikas 5–15 min; nosies purškalas 4 mg (ES registruotas Nyxoid – 1,8 mg).',
      'TCCC 2026 naloksono nenumato; ankstesnėse TCCC – 0,4 mg IV / IO / IM / IN turi būti po ranka, kai skiriami opioidai.'
    ],
    pradzia: '1–2 min (į veną)\n2–5 min (į raumenis)',
    trukme: '1–4 val., priklauso nuo dozės (PCS)',
    salutinis: 'Pykinimas, vėmimas, sujaudinimas, susilpnėjęs nuskausminimas.',
    pakuote: 'Ampulės 0,4 mg / 1 ml (0,4 mg/ml)',
    pastabos: ['Tikslas – adekvatus kvėpavimo dažnis neprarandant nuskausminimo.'],
    susije: ['morfinas', 'fentanilis'],
    saltinis: 'PCS (naloksonas 400 mcg/ml, Nyxoid); ' + KORTELE + '; ' + GRIN + '; ' + ETC_LENT + '; ' + ATP,
    nuorodos: [pcs('naloksonas 400 mcg/ml', 6589), pcs('Nyxoid 1,8 mg nosies purškalas', 9292), L_ATP25]
  },
  {
    id: 'midazolamas', name: 'Midazolamas', klase: 'Benzodiazepinas', grupe: 'skausmas', tipas: 'pagr', tccc26: true,
    ind: 'TCCC 2026 – tik ketamino sukelta emergencijos reakcija. PCS – sedacija, premedikacija.',
    kontra: 'PCS: padidėjęs jautrumas benzodiazepinams; sąmoningai sedacijai – sunkus kvėpavimo nepakankamumas ar ūminis kvėpavimo slopinimas.',
    dozes: [
      { k: 'IV / IO – emergencijos reakcija (TCCC 2026)', d: '0,5–2 mg', p: 'Tik ketamino sukeltai emergencijos reakcijai.' },
      { k: 'IV – sedacija (PCS)', d: 'Pradžia 2–2,5 mg, toliau po 1 mg pagal poreikį; daugiau kaip 5 mg iš viso paprastai nereikia',
        p: 'Leisti lėtai – apie 1 mg per 30 s. Didžiausias poveikis po 5–10 min – prieš kartojant palaukti (vidutinė bendra dozė – 3,5–7,5 mg).\n≥ 60 m.: pradžia 0,5–1 mg, daugiau kaip 3,5 mg iš viso paprastai nereikia.' },
      { k: 'IM – premedikacija (PCS)', d: '0,07–0,1 mg/kg · ml 5 mg/ml tirpalo', c: { min: 0.07, max: 0.1, conc: 5 }, p: '≥ 60 m.: 0,025–0,05 mg/kg.' }
    ],
    ispejimai: [
      'Nederinti su opioidais (TCCC 2026). PCS: kartu su opioidais – sedacija, kvėpavimo slopinimas, koma, mirtis.',
      'Kartu su ketaminu – nerekomenduojama (TCCC 2026); iš dalies disocijavusiam saugiau papildyti ketamino.',
      'Neleisti greitai ar vienu boliusu (PCS).'
    ],
    kortele: [
      'Kuopos kortelė: indikacijos – nerimo malšinimas, sedacija, traukulių prevencija / korekcija. IV 1–2 mg kas 2–3 min (1 mg/ml – neskiesti; 5 mg/ml – 1 ml skiesti iki 5 ml). IM 5–10 mg, kartoti pagal poreikį (nenaudoti 1 mg/ml). PCS didžiausias poveikis – po 5–10 min, todėl kartojant laukti ilgiau.',
      'TCCC vadovas (M. Grinevičius): IV 0,5–2 mg kas 2–3 min (maks. 5 mg); IM 5–10 mg kaip viena dozė; IV 0,02–0,1 mg/kg lėtai per 2–3 min, IM 0,07–0,1 mg/kg. Pikas: IV 3–5 min, IM 15–30 min.'
    ],
    pradzia: 'apie 2 min (į veną)\n5–10 min (į raumenis)',
    trukme: '30–90 min (į veną)\n1–6 val. (į raumenis)',
    salutinis: 'Kvėpavimo slopinimas, sumažėjęs kraujospūdis, pykinimas, vėmimas.',
    pakuote: 'Buteliukas 5 mg / 5 ml (1 mg/ml)\nAmpulės 5 mg / 1 ml (5 mg/ml)',
    pastabos: ['Sukelia anterogradinę amneziją: pacientas neprisimena įvykių po vaisto suleidimo, paprastai iki 1 val.'],
    susije: ['ketaminas'],
    saltinis: TCCC26 + '; PCS (midazolamas 5 mg/ml); ' + KORTELE + '; ' + GRIN,
    nuorodos: [L_TCCC26, L_DM, pcs('midazolamas injekcinis', 6420)]
  },

  // ───────── PYKINIMAS IR VĖMIMAS ─────────
  {
    id: 'ondansetronas', name: 'Ondansetronas', klase: 'Vėmimą slopinantys', grupe: 'vemimas', tipas: 'pagr', tccc26: true,
    ind: 'Pykinimas ir vėmimas.',
    kontra: 'Alergija. PCS: kartu su apomorfinu. Vengti esant įgimtam ilgo QT sindromui; prieš skiriant koreguoti hipokalemiją ir hipomagnezemiją.',
    dozes: [
      { k: 'IV / IO / IM / ODT (TCCC 2026)', d: '4 mg kas 8 val. pagal poreikį', p: 'ODT – burnoje tirpstanti tabletė.\nIV – lėtai, ne greičiau kaip per 30 s (PCS).' }
    ],
    ispejimai: [
      'PCS: > 8 mg IV – skiesti 50–100 ml ir lašinti ne trumpiau kaip 15 min; vienkartinė dozė ne didesnė kaip 16 mg; ≥ 65 m. – visas IV dozes skiesti ir lašinti 15 min.'
    ],
    kortele: [
      'Kuopos kortelė: IV 4–8 mg kas 6–8 val.; per burną 4–8 mg kas 8 val. TCCC 2026 – 4 mg kas 8 val.; ankstesnės TCCC – ne daugiau kaip 8 mg per 8 val.',
      'TCCC vadovas (M. Grinevičius): IV 4 mg per 2 min kas 6–8 val.',
      'ETC lentelė: 8 mg + 16 ml NaCl (20 ml švirkštas) = 0,4 mg/ml, leisti lėtai IV.'
    ],
    pradzia: '5–10 min (į veną)\n15–30 min (ODT)\n30–60 min (nuryjamos tabletės)',
    trukme: '4–6 val.',
    salutinis: 'Galvos skausmas, vidurių užkietėjimas, QT intervalo pailgėjimas (priklauso nuo dozės).',
    pakuote: 'Ampulės 4 mg / 2 ml ir 8 mg / 4 ml (2 mg/ml)\nTabletės 4 mg arba 8 mg – tirpstančios burnoje arba nuryjamos (žr. ant pakuotės)',
    susije: ['metoklopramidas'],
    saltinis: TCCC26 + '; PCS (ondansetronas); ' + KORTELE + '; ' + GRIN + '; ' + ETC_LENT,
    nuorodos: [L_TCCC26, L_DM, pcs('ondansetronas injekcinis', 13193), L_ATP25]
  },
  {
    id: 'metoklopramidas', name: 'Metoklopramidas', klase: 'Vėmimą slopinantys', grupe: 'vemimas', tipas: 'papild', kam: 'Medicinos personalui',
    ind: 'Pykinimas ir vėmimas (TCCC 2026 nenumato – pirmo pasirinkimo ondansetronas).',
    kontra: 'PCS: kraujavimas iš virškinamojo trakto, mechaninis nepraeinamumas ar perforacija; feochromocitoma; epilepsija; Parkinsono liga; vėlyvoji diskinezija nuo neuroleptikų ar metoklopramido anamnezėje; derinys su levodopa; methemoglobinemija nuo metoklopramido anamnezėje; < 1 m.; žindymas; pirmosios 3–4 d. po virškinamojo trakto operacijų.',
    dozes: [{ k: 'IV (PCS)', d: '10 mg lėtai, iki 3 kartų per parą', p: 'Leisti ne trumpiau kaip per 3 min. Maks. 30 mg (0,5 mg/kg) per parą, ne ilgiau kaip 5 d.' }],
    ispejimai: [
      'Įtariant pilvo traumą su kraujavimu ar perforacija – neskirti (PCS kontraindikacija).',
      'Ekstrapiramidiniai sutrikimai – nedelsiant nutraukti. Po IV galimas kraujotakos kolapsas, sunki bradikardija (PCS).'
    ],
    kortele: ['ETC lentelė: 10 mg + 8 ml NaCl (10 ml švirkštas) = 1 mg/ml.'],
    susije: ['ondansetronas'],
    saltinis: 'PCS (metoklopramidas 5 mg/ml); ' + ETC_LENT,
    nuorodos: [pcs('metoklopramidas 5 mg/ml', 6283)]
  },

  // ───────── ANTIBIOTIKAI ─────────
  {
    id: 'cefadroksilis', name: 'Cefadroksilis', klase: 'Antibiotikai (cefalosporinas)', grupe: 'antibiotikai', tipas: 'papild', tccc26: true, kam: 'Medicinos personalui',
    ind: 'Visos atviros kovinės žaizdos ir invazinės procedūros, kai pacientas gali gerti; penetruojanti akies trauma (TCCC 2026).',
    kontra: 'PCS: padidėjęs jautrumas cefalosporinams; sunkios reakcijos į penicilinus ar kitus beta laktamus anamnezėje.',
    dozes: [
      { k: 'Per burną (TCCC 2026)', d: '1 g kartą per parą', p: '500 mg kapsulės – 2 kapsulės.' },
      { k: 'Alternatyva (TCCC 2026)', d: 'Cefaleksinas 500 mg per burną kas 6 val.' }
    ],
    ispejimai: [
      'Esant ne sunkiai alergijai penicilinams – atsargiai: kryžminė alergija 5–10 % (PCS).',
      'Sunkus ir ilgai trunkantis viduriavimas – įtarti pseudomembraninį kolitą (PCS).'
    ],
    salutinis: 'Viduriavimas, pykinimas, bėrimas.',
    pakuote: 'Kapsulės 500 mg',
    pastabos: ['PCS: odos ir minkštųjų audinių infekcijų gydymui – 1 g 2 kartus per parą (1 g kartą per parą – tik streptokokiniam tonzilitui), maks. 4 g per parą; TCCC 2026 atviroms kovinėms žaizdoms – 1 g kartą per parą.', 'Negalinčiam gerti – ceftriaksonas 2 g IV / IO / IM kartą per parą (TCCC 2026).', 'Nudegimams vien dėl nudegimo antibiotikų neskirti – skiriama pagal žaizdas (TCCC 2026).'],
    susije: ['ceftriaksonas'],
    saltinis: TCCC26 + '; PCS (cefadroksilis 500 mg)',
    nuorodos: [L_TCCC26, L_DM, pcs('cefadroksilis 500 mg', 6543)]
  },
  {
    id: 'ceftriaksonas', name: 'Ceftriaksonas', klase: 'Antibiotikai (cefalosporinas)', grupe: 'antibiotikai', tipas: 'papild', tccc26: true, kam: 'Medicinos personalui',
    ind: 'Atviros kovinės žaizdos ir invazinės procedūros, kai pacientas negali gerti; penetruojanti akies trauma (TCCC 2026).',
    kontra: 'PCS: padidėjęs jautrumas ceftriaksonui ar kitiems cefalosporinams; sunki alergija (pvz., anafilaksija) kitiems beta laktamams anamnezėje.',
    dozes: [
      { k: 'IV / IO / IM (TCCC 2026)', d: '2 g kartą per parą',
        p: 'IV infuzija (PCS, pageidautina): 2 g ištirpinti 40 ml tirpalo be kalcio, lašinti ne trumpiau kaip 30 min.\nLėta IV injekcija – per 5 min.\nIM: į vieną vietą ne daugiau kaip 1 g – 2 g dozę padalyti į dvi vietas; ištirpinus lidokainu – niekada neleisti į veną.' }
    ],
    ispejimai: [
      'Nemaišyti ir neleisti kartu su kalcio tirpalais – net per skirtingas linijas ar vietas. Paeiliui galima tik jei linijos skirtingose vietose arba pakeistos ar gerai praplautos fiziologiniu tirpalu (ceftriaksono PCS); esant hipovolemijai paeiliui lašinti negalima (kalcio gliukonato PCS).',
      'Transfuzijos metu skiriamas kalcis. Esant hemoraginiam šokui (hipovolemijai) kalcio gliukonato PCS draudžia ceftriaksoną ir kalcį lašinti net paeiliui – sprendžia medikas.'
    ],
    salutinis: 'Viduriavimas, bėrimas, kepenų fermentų padidėjimas.',
    pakuote: 'Milteliai flakone 1 g arba 2 g',
    pastabos: ['Gali gerti – cefadroksilis 1 g per burną kartą per parą (TCCC 2026).'],
    susije: ['cefadroksilis', 'kalcis'],
    saltinis: TCCC26 + '; PCS (ceftriaksonas 2 g)',
    nuorodos: [L_TCCC26, L_DM, pcs('ceftriaksonas 2 g', 15078)]
  },
  {
    id: 'amoksiklavas', name: 'Amoksiklavas', klase: 'Antibiotikai (penicilinas)', grupe: 'antibiotikai', tipas: 'pagr',
    ind: 'Sunkių infekcijų gydymas. TCCC 2026 šio antibiotiko nenumato (IV / IO / IM – ceftriaksonas).',
    kontra: 'PCS: padidėjęs jautrumas penicilinams; sunki staigi padidėjusio jautrumo reakcija (pvz., anafilaksija) kitam beta laktamui (cefalosporinui, karbapenemui, monobaktamui) anamnezėje; gelta / kepenų pažeidimas nuo amoksicilino su klavulano rūgštimi anamnezėje.',
    dozes: [
      { k: 'IV (PCS)', d: '1,2 g kas 8 val.',
        p: 'Boliusu: ištirpinti 20 ml injekcinio vandens, leisti lėtai per 3–4 min, sunaudoti per 15 min.\nInfuzijai: ištirpinti 20 ml injekcinio vandens arba 0,9 % NaCl, perkelti į 50–100 ml 0,9 % NaCl, lašinti per 30–40 min; baigti per 60 min nuo paruošimo.' },
      { k: 'Į raumenis', d: 'Neleisti' }
    ],
    ispejimai: ['Nemaišyti su gliukozės tirpalais, krauju, aminorūgščių ar lipidų tirpalais (PCS).'],
    kortele: [
      'Kuopos kortelė: pirma dozė gali būti 2,4 g. PCS gydymui įsotinamosios dozės nenumato.',
      'Kuopos kortelė: ištirpinti 0,9 % NaCl ir injekcijai, ir infuzijai. PCS boliusui nurodo injekcinį vandenį (NaCl tinka tik infuzijai).'
    ],
    salutinis: 'Viduriavimas, pykinimas, vėmimas, bėrimas, galvos skausmas.',
    pakuote: 'Milteliai flakone: 1 g amoksicilino + 200 mg klavulano rūgšties',
    pastabos: ['Klavulano rūgštis apsaugo amoksiciliną nuo kai kurių bakterijų fermentų.'],
    susije: ['ceftriaksonas', 'cefadroksilis'],
    saltinis: 'PCS (amoksicilinas / klavulano rūgštis 1000/200 mg); ' + KORTELE + '; ' + TCCC26,
    nuorodos: [pcs('amoksicilinas / klavulano rūgštis 1000/200 mg', 7211), L_TCCC26]
  },
  {
    id: 'ertapenemas', name: 'Ertapenemas', klase: 'Antibiotikai (karbapenemas)', grupe: 'antibiotikai', tipas: 'papild', kam: 'Medicinos personalui',
    ind: 'Sunkių infekcijų gydymas. TCCC 2026 nebenumato (IV / IO / IM – ceftriaksonas).',
    kontra: 'PCS: alergija karbapenemams; sunki alergija (pvz., anafilaksija) kitiems beta laktamams.',
    dozes: [{ k: 'IV infuzija (PCS)', d: '1 g kartą per parą', p: 'Ištirpinti 10 ml injekcinio vandens arba 0,9 % NaCl, perkelti į 50 ml 0,9 % NaCl, lašinti per 30 min. Gliukozės tirpalų nenaudoti.' }],
    ispejimai: [
      'Nederinti su valproatu – gali susilpnėti traukulių kontrolė (PCS).',
      'Traukulių rizika – ypač senyviems, esant CNS ligoms ar inkstų nepakankamumui (PCS).'
    ],
    kortele: ['TCCC vadovas (M. Grinevičius): IV arba IM. ES PCS (Invanz) – tik IV infuzija.'],
    salutinis: 'Viduriavimas, bėrimas.',
    pakuote: '1 g flakonas',
    susije: ['ceftriaksonas'],
    saltinis: 'PCS (Invanz, EMA); ' + GRIN + '; ' + TCCC26,
    nuorodos: [['PCS – Invanz (ertapenemas), EMA', 'https://www.ema.europa.eu/en/documents/product-information/invanz-epar-product-information_en.pdf'], L_TCCC26]
  },
  {
    id: 'moksifloksacinas', name: 'Moksifloksacinas', klase: 'Antibiotikai (fluorochinolonas)', grupe: 'antibiotikai', tipas: 'papild', kam: 'Medicinos personalui',
    ind: 'Bakterinės infekcijos. TCCC 2026 nebenumato (per burną – cefadroksilis).',
    kontra: 'PCS: < 18 m., nėštumas, žindymas, QT pailgėjimas, nekoreguota hipokalemija, kliniškai reikšminga bradikardija, širdies nepakankamumas su sumažėjusia KS išstūmimo frakcija, simptominės aritmijos anamnezėje, kiti QT ilginantys vaistai, ankstesnė chinolonų sukelta sausgyslių pažaida, sunkus kepenų nepakankamumas.',
    dozes: [{ k: 'Per burną (PCS)', d: '400 mg kartą per parą' }],
    ispejimai: [
      'Sausgyslių uždegimas / plyšimas, psichikos sutrikimai, periferinės neuropatijos simptomai – nutraukti; staigus pilvo, krūtinės ar nugaros skausmas (aortos aneurizma / disekacija) – skubi pagalba (PCS).',
      'Antacidus, geležies, cinko preparatus vartoti maždaug 6 val. skirtumu (PCS).'
    ],
    salutinis: 'Pykinimas, galvos skausmas.',
    pakuote: '400 mg tabletės',
    susije: ['cefadroksilis'],
    saltinis: 'PCS (moksifloksacinas); ' + GRIN + '; ' + TCCC26,
    nuorodos: [pcs('moksifloksacinas 400 mg', 6771), L_TCCC26]
  },

  // ───────── GALVOS SMEGENŲ TRAUMA ─────────
  {
    id: 'nacl-hipert', name: 'Hipertoninis NaCl', klase: '3 % arba 5 % (ruošiamas iš 10 %)', grupe: 'galva', tipas: 'pagr', tccc26: true,
    ind: 'Tik esant galvos smegenų išvaržos požymiams – nevienodi arba fiksuoti išsiplėtę vyzdžiai, patologinė (dekortikacinė / decerebracinė) laikysena (TCCC 2026). Profilaktiškai neskirti.',
    kontra: 'Hipernatremija (jei yra galimybė nustatyti).',
    dozes: [
      { k: 'IV / IO (TCCC 2026)', d: '250 ml 3 % arba 5 % NaCl per ne trumpiau kaip 10 min, po to praplauti',
        p: 'Arba 30 ml 23,4 % NaCl. Nėra atsako – kartoti po 20 min (maks. 2 dozės).\nTuri tik 10 % NaCl: iš 0,9 % NaCl 500 ml butelio ištraukti 150 ml ir įpilti 100 ml 10 % – gaunama 450 ml ≈ 2,9 %; suleisti 250 ml.' }
    ],
    ispejimai: [
      'Tai ne gaivinimo (tūrio) skystis (TCCC 2026).',
      'Stebėti injekcijos vietą – ekstravazacijos atveju nutraukti (TCCC 2026).'
    ],
    kortele: ['Kuopos kortelė: 150–250 ml 3 % NaCl per 10–20 min. TCCC 2026 – 250 ml per ≥ 10 min, kartoti po 20 min (maks. 2 dozės), tik esant išvaržos požymiams.'],
    pradzia: '10–15 min',
    trukme: '2–4 val.',
    salutinis: 'Padidėjęs kraujospūdis, paraudimas / skausmas injekcijos vietoje, traukuliai.',
    pakuote: 'Buteliukai 10 % 100 ml',
    pastabos: [
      'TCCC 2026 galvos smegenų traumai: SpO₂ ≥ 92 %, sAKS > 100 mm Hg (nesant matavimo – normalus radialinis pulsas); ventiliuojamam su monitoringu EtCO₂ 35–45 mm Hg (be EtCO₂ – 10 įkvėpimų/min mažu kvėpavimo tūriu, 1 įkvėpimas kas 6 s). Galvą ir liemenį pakelti > 30°, jei nėra šoko ir leidžia taktinė situacija; neurologinę būklę vertinti kas 5–10 min.',
      'ETC vertinimo lapas: manitolis arba 3 % NaCl, 30° galvūgalio padėtis; sAKS tikslas 110–120 mm Hg.'
    ],
    saltinis: TCCC26 + '; ' + KORTELE + '; ETC vertinimo lapas',
    nuorodos: [L_TCCC26, L_DM]
  },

  // ───────── KRAUJOTAKA IR INTUBACIJA ─────────
  {
    id: 'noradrenalinas', name: 'Noradrenalinas', klase: 'Vazopresorius', grupe: 'gaivinimas', tipas: 'papild', kam: 'Medicinos personalui',
    ind: 'Ūminė hipotenzija – po tūrio atkūrimo. Trauminiam hemoraginiam šokui pirmiausia – kraujas.',
    kontra: 'PCS: hipovolemijos sukelta hipotenzija – pirmiausia atkurti kraujo tūrį; išimtis – skubi priemonė vainikinių ir smegenų arterijų perfuzijai palaikyti, kol atkuriamas tūris.',
    dozes: [
      { k: 'Infuzomatu (PCS) – 40 mcg/ml', d: '0,05–1 mcg/kg/min', c: { min: 0.05, max: 1, conc: 40, u: 'mcg', minute: true },
        p: 'Paruošimas: 2 ml (2 mg) koncentrato 1 mg/ml + 48 ml 5 % gliukozės = 40 mcg/ml.\nPradinis greitis 10–20 ml/val., toliau titruoti pagal AKS.' }
    ],
    ispejimai: [
      'Leisti per centrinės venos kateterį; neskiesto neleisti; ekstravazacija sukelia audinių nekrozę (PCS).',
      'Tikrinkite tirpalo koncentraciją: ETC lentelės tirpalas (80 mcg/ml) dvigubai koncentruotesnis – tos pačios dozės ml/val. perpus mažiau.',
      'Infuziją mažinti palaipsniui – staiga nenutraukti (PCS).'
    ],
    kortele: ['ETC lentelė: 4 mg + 46 ml 5 % gliukozės (50 ml švirkštas) = 80 mcg/ml; 0,1–1 mcg/kg/min; maždaug nuo 6 ml/val., maks. 50 ml/val. (apskaičiuota ~80 kg pacientui: 6 ml/val. ≈ 0,1 mcg/kg/min, 50 ml/val. ≈ 0,83 mcg/kg/min).'],
    pastabos: ['PCS tikslas: žemas normalus sAKS (100–120 mm Hg) arba vidutinis AKS > 65–80 mm Hg – priklauso nuo būklės.'],
    saltinis: 'PCS (noradrenalinas 1 mg/ml); ' + ETC_LENT,
    nuorodos: [pcs('noradrenalinas 1 mg/ml', 13172)]
  },
  {
    id: 'atropinas', name: 'Atropinas', klase: 'Anticholinerginis', grupe: 'gaivinimas', tipas: 'papild', kam: 'Medicinos personalui',
    ind: 'Bradikardija su nepageidaujamais požymiais.',
    dozes: [{ k: 'IV (ERC / RCUK 2025)', d: '0,5 mg (500 mcg), kartoti iki maks. 3 mg', p: 'Ampulė 1 mg / 1 ml + 9 ml NaCl (10 ml švirkštas) = 0,1 mg/ml: 0,5 mg = 5 ml.' }],
    kortele: ['ETC lentelė: po 0,5 mg kas 1–2 min, iki 3 mg.'],
    saltinis: 'RCUK / ERC 2025 bradiaritmijos algoritmas; ' + ETC_LENT,
    nuorodos: [['RCUK suaugusiųjų bradiaritmijos algoritmas 2025', 'https://www.resus.org.uk/sites/default/files/2025-10/Adult%20bradyarrhythmia%202025.pdf'], ['ERC 2025 bradikardijos algoritmas', 'https://www.cprguidelines.eu/assets/posters/6.ALS-Algorithms-Bradycardia.pdf']]
  },
  {
    id: 'rokuroniumas', name: 'Rokuroniumas', klase: 'Raumenų relaksantas', grupe: 'gaivinimas', tipas: 'papild', kam: 'Intubuojantiems gydytojams',
    ind: 'Intubacija, greitosios sekos indukcija.',
    dozes: [
      { k: 'Greitosios sekos indukcija (PCS)', d: '1 mg/kg · ml 10 mg/ml tirpalo', c: { per: 1, conc: 10 } },
      { k: 'Intubacija (PCS)', d: '0,6 mg/kg · ml 10 mg/ml tirpalo', c: { per: 0.6, conc: 10 } },
      { k: 'Palaikomoji (PCS)', d: '0,15 mg/kg · ml 10 mg/ml tirpalo', c: { per: 0.15, conc: 10 } }
    ],
    ispejimai: ['Būtina dirbtinė plaučių ventiliacija; skiria tik patyręs gydytojas (PCS).'],
    kortele: ['ETC lentelė: 0,5–1,5 mg/kg; 100 mg neskiesto (10 ml švirkštas) = 10 mg/ml.'],
    saltinis: 'PCS (rokuronio bromidas 10 mg/ml); ' + ETC_LENT,
    nuorodos: [pcs('rokuronio bromidas 10 mg/ml', 13173)]
  }
];
})();
