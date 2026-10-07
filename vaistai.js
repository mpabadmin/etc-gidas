// ETC kišeninis gidas – VAISTAI
// Pagrindiniai (tipas: 'pagr') – kuopos vaistų kortelės. Papildomi – TCCC vadovas (M. Grinevičius) ir ETC lentelės.
// Šaltinių prioritetas: oficialūs šaltiniai – TCCC gairės (Deployed Medicine), NextGen Combat Medic;
// gamintojo informacija – PCS (preparato charakteristikų santrauka; tikrinta JK eMC / EMA versija – sutikrinkite su turimo preparato VVKT PCS).
// Laukai: dozes – kuopos kortelė / pagrindinis šaltinis; tccc – TCCC gairės 2026 (rodoma abiem režimais);
// skiriasi – šaltinių neatitikimai, kuriuos turi išspręsti medikas (rodoma abiem režimais); nuorodos – [pavadinimas, URL].
// Patvirtinus mediko: įrašykite  patvirtinta: 'Vardas Pavardė, data'  – žyma „Laukia mediko patvirtinimo“ pasikeis.
// Skaičiuoklė (c): per – mg/kg; min/max – intervalas mg/kg; conc – mg/ml švirkšte (rodomi ml); u – vienetai.
// Patikrinta pagal viešus šaltinius: 2026-10-07/08.
window.ETC = window.ETC || {};

(function () {
const KORTELE = 'Kuopos vaistų kortelė';
const TCCC = 'Trumpas TCCC vaistų vadovas (M. Grinevičius)';
const ETC_LENT = 'ETC įgūdžių lentelės (vaistai IV boliusu ir infuzomatu)';
const TCCC26 = 'TCCC gairės, 2026-05-01 (CoTCCC, Deployed Medicine)';
const TITRAVIMAS = 'Nuskausminamųjų dozė titruojama pamažu: geriau kelios mažesnės dozės nedideliais intervalais nei viena didelė. Norimas efektas – skausmo sumažėjimas bent 3 balais (pvz., buvo 8/10, tapo 5/10). Nesiekite 3/10 ar mažiau – tam reikės didelių dozių ir atsiras komplikacijų (TCCC vadovas). TCCC 2026: tikslas – toleruojamas skausmas, ne visiškas jo pašalinimas.';

const L_TCCC26 = ['TCCC gairės 2026-05-01 (PDF, Deployed Medicine)', 'https://learning-media.allogy.com/api/v1/pdf/18ccfdfc-a076-47e9-8a34-376efdd81b43/contents'];
const L_DM = ['Deployed Medicine – TCCC kolekcija (reikia prisijungti)', 'https://deployedmedicine.allogy.net/learner/collections/11'];
const L_ATP24 = ['Ankstesnės TCCC gairės (ATP-P, JSOM) – analgezija', 'https://www.jsomonline.com/Library/Flipbook/ATPEng/files/basic-html/page24.html'];
const L_ATP25 = ['Ankstesnės TCCC gairės (ATP-P, JSOM) – naloksonas, ondansetronas', 'https://www.jsomonline.com/Library/Flipbook/ATPEng/files/basic-html/page25.html'];
const pcs = (pav, id) => ['PCS – ' + pav + ' (JK eMC)', 'https://www.medicines.org.uk/emc/product/' + id + '/smpc'];

window.ETC.vaistai = [
  // ───────── PAGRINDINIAI (kuopos kortelės) ─────────
  {
    id: 'txa', name: 'Traneksamo rūgštis (TXA)', klase: 'Kraujavimo stabdymui', tipas: 'pagr',
    ind: 'Hemoraginis šokas, masyvus kraujavimas (kortelė). TCCC 2026 taip pat: kai tikėtina transfuzija (didelės amputacijos, penetruojanti liemens trauma, stiprus kraujavimas), reikšminga galvos smegenų trauma ar pakitusi sąmonė po sprogimo / bukos traumos.',
    kontra: 'Alergija (kortelė). PCS: ūminė venų ar arterijų trombozė, traukulių anamnezė.',
    dozes: [
      { k: 'Į veną (kortelė)', d: '2 g – per 3 val. nuo traumos',
        p: 'Skyrimo pvz.: iš 4 ampulių 20 ml (2 g traneksamo rūgšties) suleisti lėtai, neskiedus.' },
      { k: 'Vietinis skyrimas', d: 'Ampulės turiniu suvilgyti tvarstį',
        p: 'Tamponuoti gausiai kraujuojančią vietą.' }
    ],
    tccc: ['2 g lėta injekcija IV / IO – kuo greičiau, bet NE vėliau nei per 3 val. nuo sužalojimo'],
    ispejimai: [
      'Skirti per 3 val. nuo traumos – vėliau skirti žalinga. Pradžios ekrane pažymėkite traumos laiką – kortelė „TXA iki“ parodys terminą.',
      'Leisti lėtai: per greita injekcija gali sukelti hipotenziją. PCS – ne greičiau kaip 1 ml/min (2 g = 20 ml ≈ 20 min).',
      'Į raumenis neleisti (PCS). Nemaišyti su krauju ir penicilino tirpalais (PCS).'
    ],
    skiriasi: [
      'TCCC vadovas (M. Grinevičius): kai nėra IV/IO – ta pati dozė į raumenis. PCS tai draudžia, TCCC 2026 nurodo tik IV / IO.',
      'TCCC vadovas: 1 g per 10 min + 1 g infuzija per 8 val. (CRASH-2 schema). Kortelė ir TCCC 2026 – 2 g vienkartinė dozė.',
      'ETC lentelė: 2 g „greita infuzija“ 100–250 ml NaCl. PCS – ne greičiau kaip 1 ml/min (100 mg/ml tirpalo – 100 mg/min; 2 g – ne trumpiau kaip 20 min).'
    ],
    salutinis: 'Pykinimas, vėmimas, viduriavimas, galvos skausmas, kraujospūdžio sumažėjimas (per greitai leidžiant), galimi traukuliai (ypač jei yra pasireiškę anksčiau).',
    pakuote: 'Ampulės 500 mg / 5 ml (100 mg/ml)',
    pastabos: [
      'Gydymo kokybės kriterijus: pacientui skirta traneksamo rūgštis.'
    ],
    susije: ['kalcis'],
    saltinis: KORTELE + '; ' + TCCC26 + '; PCS (Cyklokapron); ' + TCCC + '; ' + ETC_LENT + '; ETC vertinimo lapas',
    nuorodos: [L_TCCC26, L_DM, pcs('Cyklokapron (traneksamo rūgštis)', 1077), ['NextGen Combat Medic – Tranexamic Acid', 'https://nextgencombatmedic.com/2024/12/21/tranexamic-acid/']]
  },
  {
    id: 'ketaminas', name: 'Ketaminas', klase: 'Nuskausminamieji', tipas: 'pagr',
    ind: 'Vidutinio ir stipraus skausmo malšinimas',
    kontra: 'Alergija (kortelė). PCS: būklės, kai kraujospūdžio padidėjimas būtų pavojingas, eklampsija / preeklampsija, sunki koronarinė ar miokardo liga, insultas, galvos smegenų trauma (dėl galvos traumos žr. įspėjimą – TCCC vertina kitaip).',
    dozes: [
      { k: 'Į veną (kortelė)', d: '0,25 mg/kg · ml – skiesto 5 mg/ml tirpalo', c: { per: 0.25, conc: 5 },
        p: 'Leisti lėtai per 1 min (TCCC 2026, PCS). Išliekant skausmui kartoti po 5–10 min iki nistagmo atsiradimo.\nSkyrimo pvz. 100 kg pacientui: iš ampulės 1 ml (50 mg ketamino) skiesti iki 10 ml, suleisti 5 ml tirpalo (25 mg).' },
      { k: 'Į raumenis (kortelė)', d: '0,5–1 mg/kg · ml – neskiesto 50 mg/ml', c: { min: 0.5, max: 1, conc: 50 },
        p: 'Išliekant skausmui kartoti po 20 min iki nistagmo atsiradimo.\nSkyrimo pvz. 100 kg pacientui: iš ampulės 1–2 ml (50–100 mg neskiesto ketamino) suleisti į raumenis.' }
    ],
    tccc: [
      'IV / IO: 25 mg (arba 0,2–0,3 mg/kg) – lėtai per 1 min',
      'IM: 100 mg',
      'Į nosį (IN): 50 mg – naudoti 100 mg/ml koncentraciją',
      'Arba esketaminas 14 ar 28 mg į nosį vieną kartą (jei prieinamas)',
      'Kartu – kovinės žaizdos vaistų rinkinys (CWMP), jei dar nevartotas',
      'Kartoti kas 30 min pagal poreikį. Tikslas – sumažėjęs skausmas arba atsiradęs nistagmas',
      'Prieš skiriant – užrašyti AVPU; pacientą nuginkluoti'
    ],
    ispejimai: [
      'Patikrinkite ampulės stiprumą. Skaičiuoklė: IM – neskiestas 50 mg/ml; IV – 5 mg/ml (1 ml 50 mg/ml praskiedus iki 10 ml). Jei ampulė 100 mg/ml – IM reikės perpus mažiau ml, o IV 1 ml skiesti iki 20 ml.',
      'Greitai leidžiant į veną – laikina apnėja ir kraujospūdžio padidėjimas (PCS). Leisti per 1 min.',
      'Galvos ar akies trauma: TCCC teigia, kad tai nėra kontraindikacija ketaminui, tačiau prieš skiriant užrašykite AVPU – vėliau neurologinis vertinimas sunkesnis. Gamintojo PCS galvos traumą nurodo kaip kontraindikaciją – sprendžia medikas.',
      'Nederinti su benzodiazepinais (TCCC 2026 – nei su ketaminu, nei su esketaminu). Jei pacientas iš dalies disocijavęs – saugiau papildyti ketamino nei skirti midazolamo.'
    ],
    skiriasi: [
      'Kartojimas į veną: kortelė – po 5–10 min; TCCC 2026 – kas 30 min (ankstesnės TCCC – kas 20 min). TCCC vadove (M. Grinevičius) kas 5–10 min skiriama tik 10–20 mg.',
      'Į raumenis: kortelė – 0,5–1 mg/kg (100 kg – 50–100 mg), kartoti po 20 min; TCCC 2026 – 100 mg, kartoti kas 30 min.',
      'Į nosį: kortelėje šio būdo nėra; TCCC 2026 – 50 mg (100 mg/ml).'
    ],
    pradzia: '30 s – 1 min (į veną)\n2–5 min (į raumenis)',
    trukme: '10–20 min (į veną)\n20–30 min (į raumenis)',
    salutinis: 'Pykinimas, vėmimas, galvos svaigimas (dėl nistagmo), raumenų įsitempimas, sumišimas, haliucinacijos, disociacija iki visiško nereagavimo į aplinką (priklauso nuo dozės), kraujospūdžio ir pulso padidėjimas.',
    pakuote: 'Ampulės 250 mg / 5 ml (50 mg/ml)',
    pastabos: [
      'SVARBU: mažiau slopina kvėpavimą ir kraujotaką nei opioidai.',
      'Nistagmas – nevalingi, ritmingi akių judesiai.',
      'Gali būti naudojamas ir sedacijai ar anestezijai – kortelės dozės skirtos skausmui malšinti. TCCC 2026 sedacijai (paramedikams / gydytojams): 1–2 mg/kg lėtai IV / IO arba 300 mg (2–3 mg/kg) IM. Emergencijos reakcijai – midazolamas 0,5–2 mg IV / IO.',
      'TCCC vadovas (M. Grinevičius): IV 0,1–0,3 mg/kg (praktiškai 10–20 mg kas 5–10 min arba 20–30 mg kas 20 min); IM 0,5–1 mg/kg (50–100 mg kas 20–30 min). Pikas: IV 1–2 min, IM 10–15 min. Formos: 50 mg/ml arba 100 mg/ml.',
      'ETC lentelė (sedacija): 250 mg (5 ml × 50 mg/ml) + 5 ml NaCl (10 ml švirkštas) = 25 mg/ml; 1–2 mg/kg, esant šokui dozę mažinti 50 %. Infuzomatu: 500 mg + 40 ml NaCl (50 ml švirkštas) = 10 mg/ml, nuo 0,5 mg/kg/val. (~100 kg pacientui – maždaug nuo 5 ml/val.).',
      TITRAVIMAS
    ],
    susije: ['morfinas', 'fentanilis', 'midazolamas', 'ondansetronas'],
    saltinis: KORTELE + '; ' + TCCC26 + '; PCS (Ketalar); ' + TCCC + '; ' + ETC_LENT,
    nuorodos: [L_TCCC26, L_DM, L_ATP24, L_ATP25, pcs('Ketalar (ketaminas)', 5202), ['NextGen Combat Medic – Ketamine Toolkit', 'https://nextgencombatmedic.com/2022/01/07/ketamine-toolkit/']]
  },
  {
    id: 'morfinas', name: 'Morfinas', klase: 'Nuskausminamieji (opioidas)', tipas: 'pagr',
    ind: 'Stipraus skausmo malšinimas',
    kontra: 'Alergija; atsargiai esant sutrikusiam kvėpavimui ir kraujotakai (kortelė). PCS: ūminis kvėpavimo slopinimas, obstrukcinė kvėpavimo takų liga, galvos trauma, padidėjęs intrakranijinis spaudimas, smegenų edema, koma, traukulių ligos, MAO inhibitoriai (per 2 sav.), paralyžinis žarnų nepraeinamumas, feochromocitoma.',
    dozes: [
      { k: 'Į veną (kortelė)', d: '2–5 mg, išliekant skausmui kartoti kas 10–15 min',
        p: 'Skyrimo pvz.: iš ampulės 1 ml (10 mg morfino) skiesti iki 10 ml, suleisti 2–3 ml (2–3 mg morfino).\nTitruoti iki norimo efekto. Skyrimas nutraukiamas, kai kvėpavimo dažnis < 10 k./min.' },
      { k: 'Į raumenis (kortelė)', d: '5–10 mg kas 2 val. Maks. 20 mg per 4 val.',
        p: 'Skyrimo pvz.: iš ampulės 1 ml (10 mg morfino) suleisti 0,5–1 ml (5–10 mg neskiesto morfino).' }
    ],
    ispejimai: [
      'Kvėpavimo slopinimas gali prasidėti nepasiekus norimo skausmo malšinimo arba tęstis ilgiau nei skausmo malšinimo efektas. Antagonistas – naloksonas.',
      'Skyrimą nutraukti, kai kvėpavimo dažnis < 10 k./min.',
      'Esant hipotenzijai / šokui – mažesnės dozės (PCS). Ankstesnės TCCC šoko ar kvėpavimo sutrikimo atveju rekomendavo ketaminą, ne opioidus.',
      'Nederinti su benzodiazepinais: sedacija, kvėpavimo slopinimas, koma, mirtis (PCS, TCCC).'
    ],
    skiriasi: [
      'TCCC 2026 gairėse morfino nebėra – negalinčiam tęsti užduoties TCCC rekomenduoja ketaminą (arba esketaminą į nosį).',
      'Į raumenis: kortelė – 5–10 mg kas 2 val. (maks. 20 mg per 4 val.); PCS – 10 mg (5–20 mg) kas 4 val.',
      'Į veną: kortelė – 2–5 mg kas 10–15 min; PCS – 2,5–15 mg ne dažniau kaip kas 4 val., titruojant pagal atsaką.',
      'ETC lentelė: boliusas 0,1 mg/kg (100 kg – 10 mg) – daugiau nei kortelės 2–5 mg titravimo žingsnis.'
    ],
    pradzia: '5–10 min (į veną)\n10–30 min (į raumenis)',
    trukme: '3–5 val.',
    salutinis: 'Pykinimas, vėmimas, kvėpavimo slopinimas, kraujospūdžio sumažėjimas, sutrikusi žarnyno veikla.',
    pakuote: 'Ampulės 10 mg / 1 ml (10 mg/ml)',
    pastabos: [
      'ETC lentelė: boliusas – 10 mg + 9 ml NaCl (10 ml švirkštas) = 1 mg/ml, 0,1 mg/kg. Infuzomatu – 10 mg + 9 ml NaCl (10 ml švirkštas) = 1 mg/ml, pradinis greitis 1–2 mg/val. (1–2 ml/val.).',
      'Pagal NextGen Combat Medic: 10 mg morfino ≈ 100 mcg fentanilio; 0,1 mg/kg morfino ≈ 1 mcg/kg fentanilio.',
      TITRAVIMAS
    ],
    susije: ['naloksonas', 'ketaminas', 'ondansetronas'],
    saltinis: KORTELE + '; PCS (morfino sulfatas); ' + ETC_LENT,
    nuorodos: [pcs('morfino sulfatas 10 mg/ml', 13178), L_ATP24, ['NextGen Combat Medic – kai nėra ketamino', 'https://nextgencombatmedic.com/2024/11/18/what-if-you-didnt-have-ketamine-as-a-68w-combat-medic']]
  },
  {
    id: 'naloksonas', name: 'Naloksonas', klase: 'Opioidų antagonistas', tipas: 'pagr',
    ind: 'Opioidų sukelto kvėpavimo slopinimo šalinimas',
    kontra: 'Alergija',
    dozes: [
      { k: 'Į veną (kortelė)', d: '0,4–2 mg kas 2–3 min',
        p: 'Skyrimo pvz.: iš ampulės 1 ml (0,4 mg naloksono) skiesti iki 10 ml, suleisti 10 ml.\nTitruoti iki efekto (kvėpavimo dažnis > 10 k./min).' },
      { k: 'Į raumenis (kortelė)', d: '0,4–2 mg kas 2–3 min',
        p: 'Skyrimo pvz.: iš ampulės 1 ml (0,4 mg naloksono) suleisti 1 ml neskiesto.\nTitruoti iki efekto (kvėpavimo dažnis > 10 k./min).' }
    ],
    ispejimai: [
      'Kai kurie opioidai gali veikti ilgiau nei naloksonas – būtina stebėti, ar neatsinaujino kvėpavimo slopinimas.',
      'Per greitas opioidų poveikio atstatymas gali sukelti ūminį abstinencijos sindromą, hipertenziją, aritmijas, plaučių edemą (PCS).'
    ],
    skiriasi: [
      'Kortelė: į veną – visa 0,4 mg dozė (10 ml). Kai norima išlaikyti nuskausminimą: PCS – 0,1–0,2 mg, po 0,1 mg kas 2 min; ETC lentelė – po 0,2 mg (5 ml skiesto tirpalo) kas 2–3 min.',
      'Didžiausia dozė: ETC lentelė – 2 mg; PCS ir TCCC vadovas – jei po 10 mg nėra atsako, peržiūrėti diagnozę.',
      'Veikimo trukmė: kortelė – 20–90 min (į veną); PCS – 1–4 val., priklauso nuo dozės.',
      'Nosies purškalas: TCCC vadovas – 4 mg; ES registruotas Nyxoid – 1,8 mg. Tikrinkite turimo preparato dozę.',
      'TCCC 2026 gairėse naloksono nėra; ankstesnėse TCCC – 0,4 mg IV / IO / IM / IN turi būti po ranka, kai skiriami opioidai.'
    ],
    pradzia: '1–2 min (į veną)\n2–5 min (į raumenis)',
    trukme: '20–90 min (į veną)\n30 min – 2 val. (į raumenis)',
    salutinis: 'Pykinimas, vėmimas, sujaudinimas, susilpnėjęs nuskausminimas.',
    pakuote: 'Ampulės 0,4 mg / 1 ml (0,4 mg/ml)',
    pastabos: [
      'Tikslas – adekvatus kvėpavimo dažnis neprarandant skausmo malšinimo.',
      'TCCC vadovas (M. Grinevičius): IV/IM 0,4–2 mg kas 2–3 min (maks. 10 mg). Pikas 5–15 min. Formos: 0,4 mg/ml arba 1 mg/ml.',
      'ETC lentelė: 0,4 mg + 9 ml NaCl (10 ml švirkštas) = 0,04 mg/ml; leisti po 0,2 mg (5 ml) kas 2–3 min iki efekto, maks. 2 mg.'
    ],
    susije: ['morfinas', 'fentanilis'],
    saltinis: KORTELE + '; PCS (naloksonas, Nyxoid); ' + TCCC + '; ' + ETC_LENT + '; ankstesnės TCCC gairės (ATP-P)',
    nuorodos: [pcs('naloksonas 400 mcg/ml', 6589), pcs('Nyxoid 1,8 mg nosies purškalas', 9292), L_ATP25]
  },
  {
    id: 'midazolamas', name: 'Midazolamas', klase: 'Sedacijai', tipas: 'pagr',
    ind: 'Nerimo malšinimas, sedacija, traukulių prevencija / korekcija',
    kontra: 'Alergija, kvėpavimo slopinimas / nepakankamumas',
    dozes: [
      { k: 'Į veną (kortelė)', d: '1–2 mg kas 2–3 min',
        p: 'Skyrimo pvz.: jei koncentracija 1 mg/ml – skiesti nereikia. Jei koncentracija 5 mg/ml – iš ampulės 1 ml skiesti iki 5 ml, suleisti 1–2 ml (1–2 mg midazolamo).\nTitruoti iki efekto.' },
      { k: 'Į raumenis (kortelė)', d: '5–10 mg',
        p: 'Skyrimo pvz.: iš ampulės 1 ml (5 mg midazolamo) suleisti neskiestą. Esant poreikiui dozę pakartoti.\nNenaudoti 1 mg/ml koncentracijos tirpalo.' }
    ],
    tccc: [
      'Tik ketamino sukeltai emergencijos reakcijai: 0,5–2 mg IV / IO',
      'Benzodiazepinų nevartoti kartu su opioidais; kartu su ketaminu – nerekomenduojama'
    ],
    ispejimai: [
      'Nederinti su opioidais (TCCC 2026). PCS: kartu su opioidais – sedacija, kvėpavimo slopinimas, koma, mirtis.',
      'Į veną leisti lėtai (apie 1 mg per 30 s). Didžiausias poveikis – po 5–10 min, todėl kartojant laukti (PCS).'
    ],
    skiriasi: [
      'Kartojimas į veną: kortelė – kas 2–3 min; PCS – didžiausias poveikis po 5–10 min, bendra dozė > 5 mg paprastai nereikalinga; ≥ 60 m. – pradžia 0,5–1 mg, iš viso paprastai ≤ 3,5 mg.',
      'Į raumenis: kortelė – 5–10 mg, kartoti pagal poreikį; PCS – 0,07–0,1 mg/kg (≥ 60 m. – 0,025–0,05 mg/kg); TCCC vadovas – viena dozė.',
      'TCCC 2026 midazolamą numato tik emergencijos reakcijai (0,5–2 mg IV / IO); nerimui, sedacijai su opioidais – nenumato.'
    ],
    pradzia: '1–3 min (į veną)\n5–10 min (į raumenis)',
    trukme: '30–90 min (į veną)\n1–6 val. (į raumenis)',
    salutinis: 'Kvėpavimo slopinimas, sumažėjęs kraujospūdis, pykinimas, vėmimas.',
    pakuote: 'Buteliukas 5 mg / 5 ml (1 mg/ml)\nAmpulės 5 mg / 1 ml (5 mg/ml)',
    pastabos: [
      'Sukelia anterogradinę amneziją: pacientas neprisimena įvykių po vaisto suleidimo, paprastai iki 1 val., retai – kelias valandas.',
      'TCCC vadovas (M. Grinevičius): IV 0,5–2 mg kas 2–3 min, kol pasiekiamas norimas efektas (maks. 5 mg); IM 5–10 mg kaip viena dozė. Pagal kg: IV 0,02–0,1 mg/kg lėtai per 2–3 min, IM 0,07–0,1 mg/kg. Pikas: IV 3–5 min, IM 15–30 min. Neskirkite be būtino reikalo – galima lengvai prisidaryti bėdų.'
    ],
    susije: ['ketaminas'],
    saltinis: KORTELE + '; ' + TCCC26 + '; PCS (midazolamas); ' + TCCC,
    nuorodos: [L_TCCC26, L_DM, pcs('midazolamas injekcinis', 6420), L_ATP25]
  },
  {
    id: 'ondansetronas', name: 'Ondansetronas', klase: 'Vėmimą slopinantys', tipas: 'pagr',
    ind: 'Pykinimo ir vėmimo prevencija / gydymas',
    kontra: 'Alergija (kortelė). PCS: kartu su apomorfinu. Vengti esant įgimtam ilgo QT sindromui; prieš skiriant koreguoti hipokalemiją ir hipomagnezemiją.',
    dozes: [
      { k: 'Į veną (kortelė)', d: '4–8 mg kas 6–8 val.', p: 'Leisti lėtai – ne greičiau kaip per 30 s (PCS). Iki 8 mg skiesti nebūtina.' },
      { k: 'Per burną (kortelė)', d: '4–8 mg tab. kas 8 val.', p: 'Pagal poreikį.' }
    ],
    tccc: ['4 mg ODT (burnoje tirpstanti tabletė) / IV / IO / IM kas 8 val. pagal poreikį'],
    ispejimai: [
      'PCS: daugiau nei 8 mg IV – skiesti 50–100 ml ir lašinti ne trumpiau kaip 15 min; vienkartinė dozė ne didesnė kaip 16 mg, per parą – iki 32 mg; ≥ 65 m. – visas IV dozes skiesti ir lašinti 15 min.'
    ],
    skiriasi: [
      'Kortelė: IV 4–8 mg kas 6–8 val., per burną 4–8 mg kas 8 val.; TCCC 2026 – 4 mg kas 8 val.; ankstesnės TCCC – ne daugiau kaip 8 mg per 8 val.'
    ],
    pradzia: '5–10 min (į veną)\n15–30 min (per burną, burnoje tirpstančios tabletės)\n30–60 min (per burną, nuryjamos tabletės)',
    trukme: '4–6 val.',
    salutinis: 'Galvos skausmas, vidurių užkietėjimas, QT intervalo pailgėjimas (priklauso nuo dozės).',
    pakuote: 'Ampulės 4 mg / 2 ml (2 mg/ml)\nAmpulės 8 mg / 4 ml (2 mg/ml)\nTabletės 4 mg arba 8 mg – gali būti tirpstančios burnoje arba nuryjamos (žr. ant pakuotės)',
    pastabos: [
      'TCCC vadovas (M. Grinevičius): IV 4 mg per 2 min kas 6–8 val., pagal poreikį.',
      'ETC lentelė: 8 mg + 16 ml NaCl (20 ml švirkštas) = 0,4 mg/ml, suleisti lėtai IV.'
    ],
    susije: ['metoklopramidas'],
    saltinis: KORTELE + '; ' + TCCC26 + '; PCS (ondansetronas); ' + TCCC + '; ' + ETC_LENT,
    nuorodos: [L_TCCC26, L_DM, pcs('ondansetronas injekcinis', 13193), L_ATP25]
  },
  {
    id: 'amoksiklavas', name: 'Amoksiklavas', klase: 'Antibiotikai', tipas: 'pagr',
    ind: 'Sunkių infekcijų gydymas',
    kontra: 'Alergija penicilinams, cefalosporinams ar kitiems beta laktamų grupės antibiotikams (kortelė). PCS taip pat: gelta / kepenų pažeidimas nuo amoksicilino su klavulano rūgštimi anamnezėje.',
    dozes: [
      { k: 'Į veną', d: '1,2 g kas 8 val.',
        p: 'Injekcijai (boliusu): ištirpinti 20 ml injekcinio vandens, leisti lėtai per 3–4 min, sunaudoti per 15 min.\nInfuzijai: ištirpinti 20 ml injekcinio vandens arba 0,9 % NaCl, perkelti į 50–100 ml 0,9 % NaCl, lašinti per 30–40 min; infuziją baigti per 60 min nuo paruošimo.' },
      { k: 'Į raumenis', d: 'Kontraindikuotina' }
    ],
    ispejimai: [
      'Nemaišyti su gliukozės tirpalais, krauju, aminorūgščių ar lipidų tirpalais (PCS).',
      'Į raumenis neleisti.'
    ],
    skiriasi: [
      'Kortelė: pirma dozė gali būti 2,4 g. PCS gydymui įsotinamosios dozės nenumato (2 g – tik chirurginei profilaktikai, kitu preparatu).',
      'Kortelė: ištirpinti 0,9 % NaCl ir injekcijai, ir infuzijai. PCS boliusui nurodo injekcinį vandenį (NaCl tinka tik infuzijai).',
      'TCCC 2026 šio antibiotiko nenumato: IV / IO / IM – ceftriaksonas 2 g kartą per parą; per burną – cefadroksilis 1 g kartą per parą (alternatyva – cefaleksinas 500 mg kas 6 val.).'
    ],
    salutinis: 'Viduriavimas, pykinimas, vėmimas, bėrimas, galvos skausmas.',
    pakuote: 'Milteliai flakone: 1 g amoksicilino + 200 mg klavulano rūgšties',
    pastabos: ['Amoksicilinas su klavulano rūgštimi. Kai kurios bakterijos gali suardyti amoksicilino struktūrą, klavulano rūgštis padeda ją išsaugoti.'],
    susije: ['ertapenemas', 'moksifloksacinas'],
    saltinis: KORTELE + '; PCS (amoksicilinas / klavulano rūgštis 1000/200 mg, Sandoz); ' + TCCC26,
    nuorodos: [pcs('amoksicilinas / klavulano rūgštis 1000/200 mg', 7211), L_TCCC26]
  },
  {
    id: 'nacl-hipert', name: 'Hipertoninis NaCl', klase: '3 % arba 10 %', tipas: 'pagr',
    ind: 'Intrakranijinio spaudimo mažinimas (TCCC 2026 – tik esant galvos smegenų išvaržos požymiams)',
    kontra: 'Hipernatremija (jei yra galimybė nustatyti)',
    dozes: [
      { k: 'Į veną (kortelė)', d: '150–250 ml 3 % NaCl infuzija per 10–20 min',
        p: '3 % tirpalo paruošimas iš 10 % tirpalo: iš 0,9 % NaCl 500 ml butelio ištraukti 150 ml ir įpilti 100 ml 10 % tirpalo (gaunama 450 ml ≈ 2,9 % tirpalo).' }
    ],
    tccc: [
      'Galvos smegenų išvaržos požymiai: 250 ml 3 % arba 5 % NaCl (arba 30 ml 23,4 %) IV / IO per ne trumpiau kaip 10 min, po to praplauti',
      'Nėra atsako – kartoti po 20 min (maks. 2 dozės)',
      'Profilaktiškai neskirti. Tai ne gaivinimo (tūrio) skystis',
      'Stebėti injekcijos vietą – ekstravazacijos atveju nutraukti'
    ],
    ispejimai: ['Tai ne gaivinimo (tūrio) skystis (TCCC 2026).'],
    skiriasi: [
      'Kortelė: 150–250 ml 3 % per 10–20 min; TCCC 2026 – 250 ml 3 % / 5 % per ≥ 10 min, kartoti po 20 min (maks. 2 dozės), tik esant išvaržos požymiams.',
      'AKS tikslas galvos smegenų traumai: vertinimo lapas – sAKS 110–120 mm Hg; TCCC 2026 – sAKS > 100 mm Hg ir SpO₂ ≥ 92 %.'
    ],
    pradzia: '10–15 min',
    trukme: '2–4 val.',
    salutinis: 'Padidėjęs kraujospūdis, paraudimas / skausmas injekcijos vietoje, traukuliai.',
    pakuote: 'Buteliukai 10 % 100 ml',
    pastabos: [
      'Gydymo kokybės kriterijai esant galvos smegenų traumai: manitolis arba 3 % NaCl, 30° lovos galvūgalio padėtis; AKS tikslas – sAKS 110–120 mm Hg.',
      'TCCC 2026: galvą ir liemenį pakelti daugiau nei 30°, jei pacientas nėra šoke ir tai įmanoma; neurologinę būklę vertinti kas 5–10 min.'
    ],
    saltinis: KORTELE + '; ' + TCCC26 + '; ETC vertinimo lapas',
    nuorodos: [L_TCCC26]
  },

  // ───────── PAPILDOMI ─────────
  {
    id: 'fentanilis', name: 'Fentanilis', klase: 'Nuskausminamieji (opioidas)', tipas: 'papild', kam: 'Medicinos personalui',
    ind: 'Stiprus skausmas',
    kontra: 'PCS: alergija opioidams, kvėpavimo slopinimas, obstrukcinė kvėpavimo takų liga, MAO inhibitoriai (per 2 sav.).',
    dozes: [
      { k: 'Į veną, praktinė dozė (TCCC vadovas)', d: '25–50 mcg kas 10–15 min ar rečiau, pagal poreikį', p: 'Titruoti iki norimo efekto. Leisti lėtai.' },
      { k: 'Į veną, pagal kg (ankstesnės TCCC, ETC)', d: '0,5–1 mcg/kg · ml – neskiesto 50 mcg/ml', c: { min: 0.5, max: 1, conc: 50, u: 'mcg' },
        p: 'Ankstesnės TCCC: 50 mcg IV / IO arba 100 mcg į nosį, kartoti kas 30 min.' }
    ],
    ispejimai: [
      'Kvėpavimo slopinimas. Perdozavimo ar kvėpavimo sutrikimo atveju naudokite naloksoną.',
      'Leisti lėtai (NextGen Combat Medic – per 2 min): lėta injekcija padeda išvengti raumenų, taip pat krūtinės, rigidiškumo (PCS). Kvėpavimo slopinimas gali progresuoti iki apnėjos (PCS).',
      'Nederinti su benzodiazepinais (TCCC, PCS). Senyviems – mažesnė dozė (PCS).'
    ],
    skiriasi: [
      'TCCC 2026 gairėse fentanilio nebėra.',
      'TCCC vadovas (M. Grinevičius) – 1–2 mcg/kg; ankstesnės TCCC ir ETC lentelė – 0,5–1 mcg/kg (skaičiuoklė naudoja 0,5–1 mcg/kg).',
      'Veikimo trukmė: TCCC vadovas – 30–60 min; PCS – 100 mcg nuskausmina apie 10–20 min.'
    ],
    pradzia: '1–2 min (į veną), pikas 2–5 min',
    trukme: '30–60 min (į veną)',
    salutinis: 'Kvėpavimo slopinimas, pykinimas, sedacija, raumenų rigidiškumas.',
    pakuote: '50 mcg/ml tirpalas',
    pastabos: [
      'NextGen Combat Medic: pradinė dozė paprastai ne didesnė kaip 100 mcg, toliau – po 25–50 mcg; šoko atveju opioidai šalinami lėčiau.',
      'ETC lentelė: boliusas – 100 mcg (2 ml švirkštas), 50 mcg/ml, 0,5–1 mcg/kg. Infuzomatu – 1000 mcg + 30 ml NaCl (50 ml švirkštas) = 20 mcg/ml, 1–3 mcg/kg/val. (~100 kg pacientui – maždaug nuo 5 ml/val.).',
      TITRAVIMAS
    ],
    susije: ['naloksonas', 'morfinas', 'ketaminas'],
    saltinis: TCCC + '; ankstesnės TCCC gairės (ATP-P); PCS (fentanilis); ' + ETC_LENT,
    nuorodos: [L_ATP24, pcs('fentanilis 50 mcg/ml', 100051), ['NextGen Combat Medic – kai nėra ketamino', 'https://nextgencombatmedic.com/2024/11/18/what-if-you-didnt-have-ketamine-as-a-68w-combat-medic']]
  },
  {
    id: 'ertapenemas', name: 'Ertapenemas', klase: 'Antibiotikai', tipas: 'papild', kam: 'Medicinos personalui',
    ind: 'Sunkių infekcijų gydymas',
    kontra: 'PCS: alergija karbapenemams; sunki alergija (pvz., anafilaksija) kitiems beta laktamams.',
    dozes: [{ k: 'Į veną', d: '1 g kartą per parą', p: 'PCS: ištirpinti 10 ml injekcinio vandens arba 0,9 % NaCl, perkelti į 50 ml 0,9 % NaCl, lašinti per 30 min. Gliukozės tirpalų nenaudoti.' }],
    ispejimai: [
      'Nederinti su valproatu – gali susilpnėti traukulių kontrolė (PCS).',
      'Traukulių rizika – ypač senyviems, esant CNS ligoms ar inkstų nepakankamumui (PCS).'
    ],
    skiriasi: [
      'TCCC vadovas: IV arba IM; ES PCS (Invanz) – tik IV infuzija.',
      'TCCC 2026 ertapenemo nebenumato: IV / IO / IM – ceftriaksonas 2 g kartą per parą.'
    ],
    salutinis: 'Viduriavimas, bėrimas.',
    pakuote: '1 g flakonas',
    susije: ['amoksiklavas', 'moksifloksacinas'],
    saltinis: TCCC + '; PCS (Invanz, EMA); ' + TCCC26,
    nuorodos: [['PCS – Invanz (ertapenemas), EMA', 'https://www.ema.europa.eu/en/documents/product-information/invanz-epar-product-information_en.pdf'], L_TCCC26]
  },
  {
    id: 'moksifloksacinas', name: 'Moksifloksacinas', klase: 'Antibiotikai', tipas: 'papild', kam: 'Medicinos personalui',
    ind: 'Bakterinių infekcijų gydymas',
    kontra: 'PCS: < 18 m., nėštumas, žindymas, QT pailgėjimas, nekoreguota hipokalemija, bradikardija, kiti QT ilginantys vaistai, ankstesnė chinolonų sukelta sausgyslių pažaida, sunkus kepenų nepakankamumas.',
    dozes: [{ k: 'Per burną', d: '400 mg kartą per parą' }],
    ispejimai: [
      'Sausgyslių uždegimas / plyšimas, periferinė neuropatija, aortos aneurizma, psichikos sutrikimai – nedelsiant nutraukti (PCS).',
      'Antacidus, geležies, cinko preparatus vartoti maždaug 6 val. skirtumu (PCS).'
    ],
    skiriasi: [
      'TCCC 2026 moksifloksacino nebenumato: per burną – cefadroksilis 1 g kartą per parą (alternatyva – cefaleksinas 500 mg kas 6 val.).'
    ],
    salutinis: 'Pykinimas, galvos skausmas.',
    pakuote: '400 mg tabletės',
    susije: ['amoksiklavas', 'ertapenemas'],
    saltinis: TCCC + '; PCS (moksifloksacinas); ' + TCCC26,
    nuorodos: [pcs('moksifloksacinas 400 mg', 6771), L_TCCC26]
  },
  {
    id: 'kalcis', name: 'Kalcio gliukonatas', klase: 'Elektrolitai', tipas: 'papild', kam: 'Medicinos personalui',
    ind: 'Kalcio kiekio užtikrinimas perpilant kraują ar jo komponentus',
    kontra: 'PCS: hiperkalcemija, hiperkalciurija, apsinuodijimas širdies glikozidais; vartojantiems širdies glikozidus (digoksiną) – kontraindikuotina, išskyrus gyvybei grėsmingą sunkią hipokalcemiją ar hiperkalemiją.',
    dozes: [{ k: 'Į veną, infuzija (ETC)', d: '3 g greita infuzija', p: '3 g (30 ml 10 % tirpalo) į 250 ml NaCl.' }],
    tccc: ['Perpylus bet kokių kraujo produktų (įskaitant pilną kraują): 1 g kalcio (30 ml 10 % kalcio gliukonato arba 10 ml 10 % kalcio chlorido) IV / IO po pirmojo perpilto vieneto'],
    ispejimai: [
      'Nemaišyti ir neleisti ta pačia linija su natrio bikarbonatu ar fosfatais; su ceftriaksonu kartu neleisti (PCS).',
      'Ekstravazacija sukelia audinių nekrozę (PCS).'
    ],
    skiriasi: [
      'Greitis: ETC lentelė – „greita infuzija“; PCS – ne greičiau kaip 0,45 mmol kalcio per min (30 ml 10 % – ne trumpiau kaip per 15 min).'
    ],
    pastabos: [
      'TCCC „1 g kalcio“ = 30 ml 10 % kalcio gliukonato (tai 3 g kalcio gliukonato druskos) – atitinka ETC lentelės 3 g.',
      'Gydymo kokybės kriterijus: užtikrinamas kalcio kiekis esant kraujo transfuzijai.'
    ],
    susije: ['txa'],
    saltinis: ETC_LENT + '; ' + TCCC26 + '; PCS (kalcio gliukonatas 10 %); ETC vertinimo lapas',
    nuorodos: [L_TCCC26, L_DM, pcs('kalcio gliukonatas 10 %', 6264)]
  },
  {
    id: 'metoklopramidas', name: 'Metoklopramidas', klase: 'Vėmimą slopinantys', tipas: 'papild', kam: 'Medicinos personalui',
    ind: 'Pykinimas ir vėmimas',
    kontra: 'PCS: kraujavimas iš virškinamojo trakto, mechaninis nepraeinamumas ar perforacija; feochromocitoma; epilepsija; Parkinsono liga; vėlyvoji diskinezija nuo neuroleptikų ar metoklopramido anamnezėje; derinys su levodopa.',
    dozes: [{ k: 'Į veną', d: '10 mg lėtai', p: '10 mg + 8 ml NaCl (10 ml švirkštas) = 1 mg/ml. Leisti ne trumpiau kaip per 3 min (PCS).' }],
    ispejimai: [
      'Įtariant pilvo traumą su kraujavimu ar perforacija – neskirti (PCS kontraindikacija).',
      'Maks. 30 mg (0,5 mg/kg) per parą, gydymas ne ilgiau kaip 5 d. (PCS).',
      'Ekstrapiramidiniai sutrikimai – nedelsiant nutraukti. Po IV galimas kraujotakos kolapsas, sunki bradikardija (PCS).'
    ],
    susije: ['ondansetronas'],
    saltinis: ETC_LENT + '; PCS (metoklopramidas 5 mg/ml)',
    nuorodos: [pcs('metoklopramidas 5 mg/ml', 6283)]
  },
  {
    id: 'atropinas', name: 'Atropinas', klase: 'Anticholinerginis', tipas: 'papild', kam: 'Medicinos personalui',
    ind: 'Bradikardija su nepageidaujamais požymiais',
    dozes: [{ k: 'Į veną (ETC)', d: 'Po 0,5 mg kas 1–2 min, iki 3 mg', p: '1 mg (ampulė 1 mg / 1 ml) + 9 ml NaCl (10 ml švirkštas) = 0,1 mg/ml: 0,5 mg = 5 ml.' }],
    skiriasi: ['ERC / RCUK 2021 bradikardijos algoritmas: 500 mcg IV, kartoti iki maks. 3 mg (kartojimo intervalas nenurodytas).'],
    saltinis: ETC_LENT + '; RCUK / ERC 2021 bradikardijos algoritmas',
    nuorodos: [['RCUK bradikardijos algoritmas 2021', 'https://www.resus.org.uk/sites/default/files/2021-04/Bradycardia%20Algorithm%202021.pdf']]
  },
  {
    id: 'noradrenalinas', name: 'Noradrenalinas', klase: 'Vazopresorius', tipas: 'papild', kam: 'Medicinos personalui',
    ind: 'Ūminė hipotenzija – po tūrio atkūrimo',
    kontra: 'PCS: hipovolemijos sukelta hipotenzija – pirmiausia atkurti kraujo tūrį.',
    dozes: [{ k: 'Infuzomatu (ETC)', d: '0,1–1 mcg/kg/min', p: '4 mg + 46 ml 5 % gliukozės (50 ml švirkštas) = 80 mcg/ml.\nMaždaug nuo 6 ml/val., maks. 50 ml/val. (apskaičiuota ~80 kg pacientui: 6 ml/val. ≈ 0,1 mcg/kg/min, 50 ml/val. ≈ 0,83 mcg/kg/min).' }],
    ispejimai: [
      'ETC tirpalas (80 mcg/ml) dvigubai koncentruotesnis nei PCS standartinis (2 mg / 50 ml = 40 mcg/ml) – tos pačios dozės ml/val. perpus mažiau. Tikrinkite, kurį tirpalą ruošiate.',
      'Leisti per centrinės venos kateterį; ekstravazacija sukelia audinių nekrozę (PCS). Neskiesto neleisti.'
    ],
    saltinis: ETC_LENT + '; PCS (noradrenalinas 1 mg/ml)',
    nuorodos: [pcs('noradrenalinas 1 mg/ml', 13172)]
  },
  {
    id: 'rokuroniumas', name: 'Rokuroniumas', klase: 'Raumenų relaksantas', tipas: 'papild', kam: 'Intubuojantiems gydytojams',
    dozes: [{ k: 'Į veną, boliusas (ETC)', d: '0,5–1,5 mg/kg · ml – 10 mg/ml', c: { min: 0.5, max: 1.5, conc: 10 }, p: '100 mg neskiesto (10 ml švirkštas) = 10 mg/ml.' }],
    ispejimai: ['Būtina dirbtinė plaučių ventiliacija; skiria tik patyręs gydytojas (PCS).'],
    skiriasi: ['PCS: intubacijai 0,6 mg/kg, greitosios sekos indukcijai 1,0 mg/kg; palaikomoji dozė 0,15 mg/kg.'],
    saltinis: ETC_LENT + '; PCS (rokuronio bromidas 10 mg/ml)',
    nuorodos: [pcs('rokuronio bromidas 10 mg/ml', 13173)]
  }
];
})();
