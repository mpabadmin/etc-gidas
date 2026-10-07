// ETC kišeninis gidas – VAISTAI
// Pagrindiniai (tipas: 'pagr') – kuopos vaistų kortelės. Papildomi – TCCC vadovas ir ETC lentelės.
// Patvirtinus mediko: įrašykite  patvirtinta: 'Vardas Pavardė, data'  – žyma „Laukia mediko patvirtinimo“ pasikeis.
// Skaičiuoklė (c): per – mg/kg; min/max – intervalas mg/kg; conc – mg/ml švirkšte (rodomi ml); u – vienetai.
window.ETC = window.ETC || {};

(function () {
const KORTELE = 'Kuopos vaistų kortelė';
const TCCC = 'Trumpas TCCC vaistų vadovas (M. Grinevičius)';
const ETC_LENT = 'ETC įgūdžių lentelės (vaistai IV boliusu ir infuzomatu)';
const TITRAVIMAS = 'Nuskausminamųjų dozė titruojama pamažu: geriau kelios mažesnės dozės nedideliais intervalais nei viena didelė. Norimas efektas – skausmo sumažėjimas bent 3 balais (pvz., buvo 8/10, tapo 5/10). Nesiekite 3/10 ar mažiau – tam reikės didelių dozių ir atsiras komplikacijų (TCCC vadovas).';

window.ETC.vaistai = [
  // ───────── PAGRINDINIAI (kuopos kortelės) ─────────
  {
    id: 'txa', name: 'Traneksamo rūgštis (TXA)', klase: 'Kraujavimo stabdymui', tipas: 'pagr',
    ind: 'Hemoraginis šokas, masyvus kraujavimas',
    kontra: 'Alergija',
    dozes: [
      { k: 'Į veną', d: '2 g ne vėliau nei 3 val. nuo sužeidimo',
        p: 'Skyrimo pvz.: iš 4 ampulių 20 ml (2 g traneksamo rūgšties) suleisti lėtai neskiestos.' },
      { k: 'Vietinis skyrimas', d: 'Ampulės turiniu suvilgyti tvarstį',
        p: 'Tamponuoti gausiai kraujuojančią vietą.' }
    ],
    ispejimai: ['Skirti ne vėliau nei per 3 val. nuo sužeidimo. Pradžios ekrane pažymėkite traumos laiką – kortelė „TXA iki“ parodys terminą.'],
    salutinis: 'Pykinimas, vėmimas, viduriavimas, galvos skausmas, kraujospūdžio sumažėjimas (greitos infuzijos metu), galimi traukuliai (ypač jei yra pasireiškę anksčiau).',
    pakuote: 'Ampulės 500 mg / 5 ml (100 mg/ml)',
    pastabos: [
      'TCCC vadovas: pirma dozė 1 g IV per 10 min per pirmąsias 3 val. po traumos (lėtai – kad išvengti hipotenzijos); antra dozė 1 g, skiesta 100 ml fiziologinio arba gliukozės tirpalo, infuzuojama per 8 val. Jei nėra galimybės skirti IV/IO – ta pati dozė į raumenis.',
      'ETC lentelė: 2000 mg į 100 ml arba 250 ml NaCl, 2 g greita infuzija.',
      'Gydymo kokybės kriterijus: pacientui skirta traneksaminė rūgštis.'
    ],
    susije: ['kalcis'],
    saltinis: KORTELE + '; ' + TCCC + '; ' + ETC_LENT + '; ETC vertinimo lapas'
  },
  {
    id: 'ketaminas', name: 'Ketaminas', klase: 'Nuskausminamieji', tipas: 'pagr',
    ind: 'Vidutinio ir stipraus skausmo malšinimas',
    kontra: 'Alergija',
    dozes: [
      { k: 'Į veną', d: '0,25 mg/kg · ml – skiesto 5 mg/ml tirpalo', c: { per: 0.25, conc: 5 },
        p: 'Išliekant skausmui kartoti po 5–10 min iki nistagmo atsiradimo.\nSkyrimo pvz.: iš ampulės 1 ml (50 mg ketamino) skiesti iki 10 ml, suleisti 5 ml tirpalo (25 mg ketamino), kai paciento svoris 100 kg.' },
      { k: 'Į raumenis', d: '0,5–1 mg/kg · ml – neskiesto 50 mg/ml', c: { min: 0.5, max: 1, conc: 50 },
        p: 'Išliekant skausmui kartoti po 20 min iki nistagmo atsiradimo.\nSkyrimo pvz.: iš ampulės 1–2 ml (50–100 mg neskiesto ketamino) suleisti į raumenis, kai paciento svoris 100 kg.' }
    ],
    ispejimai: [
      'Patikrinkite ampulės stiprumą: skaičiuoklė skaičiuoja 50 mg/ml. Jei ampulė 100 mg/ml – reikės perpus mažiau ml.',
      'TCCC vadovas: vengti esant sunkiai galvos traumai / padidėjusiam intrakranijiniam spaudimui; atsargiai – esant sunkiai hipertenzijai.'
    ],
    pradzia: '30 s – 1 min (į veną)\n2–5 min (į raumenis)',
    trukme: '10–20 min (į veną)\n20–30 min (į raumenis)',
    salutinis: 'Pykinimas, vėmimas, galvos svaigimas (dėl nistagmo), raumenų įsitempimas, sumišimas, haliucinacijos, disociacija iki visiško nereagavimo į aplinką (priklauso nuo dozės).',
    pakuote: 'Ampulės 250 mg / 5 ml (50 mg/ml)',
    pastabos: [
      'SVARBU: mažiau slopina kvėpavimą ir kraujotaką palyginus su opioidais.',
      'Gali būti naudojamas ir sedacijai ar anestezijai – čia nurodytos dozės skirtos skausmui malšinti.',
      'Nistagmas – nevalingi, ritmingi akių judesiai.',
      'TCCC vadovas: IV 0,1–0,3 mg/kg (praktiškai 10–20 mg kas 5–10 min arba 20–30 mg kas 20 min, maks. ~1 mg/kg); IM 0,5–1 mg/kg (50–100 mg kas 20–30 min). Pikas: IV 1–2 min, IM 10–15 min. Gali padidėti kraujospūdis ir pulsas. Formos: 50 mg/ml arba 100 mg/ml.',
      'ETC lentelė (sedacija): 250 mg + 5 ml NaCl (10 ml švirkštas) = 25 mg/ml; 1–2 mg/kg, esant šokui dozę mažinti 50 %. Infuzomatu: 500 mg + 40 ml NaCl (50 ml švirkštas) = 10 mg/ml, nuo 0,5 mg/kg/val. (maždaug nuo 5 ml/val.).',
      TITRAVIMAS
    ],
    susije: ['morfinas', 'fentanilis', 'midazolamas'],
    saltinis: KORTELE + '; ' + TCCC + '; ' + ETC_LENT
  },
  {
    id: 'morfinas', name: 'Morfinas', klase: 'Nuskausminamieji (opioidas)', tipas: 'pagr',
    ind: 'Stipraus skausmo malšinimas',
    kontra: 'Alergija. Atsargiai naudoti esant sutrikusiam kvėpavimui ir kraujotakai.',
    dozes: [
      { k: 'Į veną', d: '2–5 mg, išliekant skausmui kartoti kas 10–15 min',
        p: 'Skyrimo pvz.: iš ampulės 1 ml (10 mg morfino) skiesti iki 10 ml, suleisti 2–3 ml (2–3 mg morfino).\nTitruoti iki norimo efekto. Skyrimas nutraukiamas, kai kvėpavimo dažnis <10 k./min.' },
      { k: 'Į raumenis', d: '5–10 mg kas 2 val. Maks. 20 mg per 4 val.',
        p: 'Skyrimo pvz.: iš ampulės 1 ml (10 mg morfino) suleisti 0,5–1 ml (5–10 mg neskiesto morfino).' }
    ],
    ispejimai: [
      'Kvėpavimo slopinimas gali prasidėti nepasiekus norimo skausmo malšinimo arba tęstis ilgiau nei skausmo malšinimo efektas. Antagonistas – naloksonas.',
      'Skyrimą nutraukti, kai kvėpavimo dažnis <10 k./min.'
    ],
    pradzia: '5–10 min (į veną)\n10–30 min (į raumenis)',
    trukme: '3–5 val.',
    salutinis: 'Pykinimas, vėmimas, kvėpavimo slopinimas, kraujospūdžio sumažėjimas, sutrikusi žarnyno veikla.',
    pakuote: 'Ampulės 10 mg / 1 ml (10 mg/ml)',
    pastabos: [
      'ETC lentelė: boliusas – 10 mg + 9 ml NaCl (10 ml švirkštas) = 1 mg/ml, 0,1 mg/kg. Infuzomatu – 10 mg + 9 ml NaCl (10 ml švirkštas) = 1 mg/ml, pradinis greitis 1–2 mg/val. (1–2 ml/val.).',
      TITRAVIMAS
    ],
    susije: ['naloksonas', 'ketaminas', 'ondansetronas'],
    saltinis: KORTELE + '; ' + ETC_LENT
  },
  {
    id: 'naloksonas', name: 'Naloksonas', klase: 'Opioidų antagonistas', tipas: 'pagr',
    ind: 'Opioidų sukelto kvėpavimo slopinimo šalinimas',
    kontra: 'Alergija',
    dozes: [
      { k: 'Į veną', d: '0,4–2 mg kas 2–3 min',
        p: 'Skyrimo pvz.: iš ampulės 1 ml (0,4 mg naloksono) skiesti iki 10 ml, suleisti 10 ml.\nTitruoti iki efekto (kvėpavimo dažnis >10 k./min).' },
      { k: 'Į raumenis', d: '0,4–2 mg kas 2–3 min',
        p: 'Skyrimo pvz.: iš ampulės 1 ml (0,4 mg naloksono) suleisti 1 ml neskiesto.\nTitruoti iki efekto (kvėpavimo dažnis >10 k./min).' }
    ],
    ispejimai: ['Kai kurie opioidai gali veikti ilgiau nei naloksonas – būtina stebėti, ar neatsinaujino kvėpavimo slopinimas.'],
    pradzia: '1–2 min (į veną)\n2–5 min (į raumenis)',
    trukme: '20–90 min (į veną)\n30 min – 2 val. (į raumenis)',
    salutinis: 'Pykinimas, vėmimas, sujaudinimas, skausmo slopinimo sumažėjimas.',
    pakuote: 'Ampulės 0,4 mg / 1 ml (0,4 mg/ml)',
    pastabos: [
      'Tikslas – adekvatus kvėpavimo dažnis neprarandant skausmo malšinimo.',
      'TCCC vadovas: IV/IM 0,4–2 mg kas 2–3 min (maks. 10 mg); nosies purškalas 4 mg į vieną šnervę, kartoti kas 2–3 min. Pikas 5–15 min. Formos: 0,4 mg/ml arba 1 mg/ml.',
      'ETC lentelė: 0,4 mg + 9 ml NaCl (10 ml švirkštas) = 0,04 mg/ml; leisti po 0,2 mg (5 ml) kas 2–3 min iki efekto, maks. 2 mg.'
    ],
    susije: ['morfinas', 'fentanilis'],
    saltinis: KORTELE + '; ' + TCCC + '; ' + ETC_LENT
  },
  {
    id: 'midazolamas', name: 'Midazolamas', klase: 'Sedacijai', tipas: 'pagr',
    ind: 'Nerimo malšinimas, sedacija, traukulių prevencija / korekcija',
    kontra: 'Alergija, kvėpavimo slopinimas / nepakankamumas',
    dozes: [
      { k: 'Į veną', d: '1–2 mg kas 2–3 min',
        p: 'Skyrimo pvz.: jei koncentracija 1 mg/ml – skiesti nereikia. Jei koncentracija 5 mg/ml – iš ampulės 1 ml skiesti iki 5 ml, suleisti 1–2 ml (1–2 mg midazolamo).\nTitruoti iki efekto.' },
      { k: 'Į raumenis', d: '5–10 mg',
        p: 'Skyrimo pvz.: iš ampulės 1 ml (5 mg midazolamo) suleisti neskiesto. Esant poreikiui dozę pakartoti.\nNenaudoti 1 mg/ml koncentracijos tirpalo.' }
    ],
    ispejimai: ['Vengti kartu su opioidais, jei nėra galimybės valdyti kvėpavimo (TCCC vadovas).', 'TCCC vadovas: IV maks. 5 mg.'],
    pradzia: '1–3 min (į veną)\n5–10 min (į raumenis)',
    trukme: '30–90 min (į veną)\n1–6 val. (į raumenis)',
    salutinis: 'Kvėpavimo slopinimas, sumažėjęs kraujospūdis, pykinimas, vėmimas.',
    pakuote: 'Buteliukas 5 mg / 5 ml (1 mg/ml)\nAmpulės 5 mg / 1 ml (5 mg/ml)',
    pastabos: [
      'Sukelia atminties praradimą apie įvykius po vaisto pavartojimo, paprastai iki 1 val., retai efektas gali trukti kelias valandas.',
      'TCCC vadovas: IV 0,5–2 mg kas 2–3 min, kol pasiekiamas norimas efektas (maks. 5 mg); IM 5–10 mg kaip viena dozė. Pagal kg: IV 0,02–0,1 mg/kg lėtai per 2–3 min, IM 0,07–0,1 mg/kg. Pikas: IV 3–5 min, IM 15–30 min. Neskirkite be būtino reikalo – galima lengvai prisidaryti bėdų.'
    ],
    susije: ['ketaminas'],
    saltinis: KORTELE + '; ' + TCCC
  },
  {
    id: 'ondansetronas', name: 'Ondansetronas', klase: 'Vėmimą slopinantys', tipas: 'pagr',
    ind: 'Pykinimo ir vėmimo prevencija / gydymas',
    kontra: 'Alergija',
    dozes: [
      { k: 'Į veną', d: '4–8 mg kas 6–8 val.', p: 'Leisti lėtai. Skiesti nebūtina.' },
      { k: 'Per burną', d: '4–8 mg tab. kas 8 val.', p: 'Pagal poreikį.' }
    ],
    pradzia: '5–10 min (į veną)\n15–30 min (per burną, tirpios tabletės)\n30–60 min (per burną, nuryjamos tabletės)',
    trukme: '4–6 val.',
    salutinis: 'Galvos skausmas, vidurių užkietėjimas.',
    pakuote: 'Ampulės 4 mg / 2 ml (2 mg/ml)\nAmpulės 8 mg / 4 ml (2 mg/ml)\nTabletės 4 mg arba 8 mg – gali būti tirpstančios burnoje arba nuryjamos (žr. ant pakuotės)',
    pastabos: [
      'TCCC vadovas: IV 4 mg per 2 min kas 6–8 val., pagal poreikį. Didelėmis dozėmis gali prailgėti QT intervalas.',
      'ETC lentelė: 8 mg + 16 ml NaCl (20 ml švirkštas), suleisti lėtai IV.'
    ],
    susije: ['metoklopramidas'],
    saltinis: KORTELE + '; ' + TCCC + '; ' + ETC_LENT
  },
  {
    id: 'amoksiklavas', name: 'Amoksiklavas', klase: 'Antibiotikai', tipas: 'pagr',
    ind: 'Sunkių infekcijų gydymas',
    kontra: 'Alergija penicilinams, cefalosporinams ar kitiems beta laktamų grupės antibiotikams',
    dozes: [
      { k: 'Į veną', d: '1,2 g kas 8 val. (pirma dozė gali būti 2,4 g)',
        p: 'Ištirpinti į 20 ml 0,9 % NaCl.\n• Infuzijai – tirpalą dar kartą skiesti su 0,9 % NaCl iki 100 ml, sulašinti per 30–40 min.\n• Injekcijai į veną daugiau nebeskiesti, suleisti labai lėtai.' },
      { k: 'Į raumenis', d: 'Kontraindikuotina' }
    ],
    ispejimai: [
      'Tirpalas greitai tampa nestabilus: į veną suleisti per 15–20 min nuo ištirpinimo. Infuzijai paruoštas tirpalas šiek tiek stabilesnis, tačiau vis tiek geriausia sunaudoti per 1 val. nuo ištirpinimo.',
      'Į raumenis neleisti.'
    ],
    salutinis: 'Viduriavimas, pykinimas, vėmimas, bėrimas, galvos skausmas.',
    pakuote: 'Milteliai flakone: 1 g amoksicilino + 200 mg klavulaninės rūgšties',
    pastabos: ['Amoksicilinas su klavulanine rūgštimi. Kai kurios bakterijos gali suardyti amoksicilino struktūrą, klavulaninė rūgštis padeda ją išsaugoti.'],
    susije: ['ertapenemas', 'moksifloksacinas'],
    saltinis: KORTELE
  },
  {
    id: 'nacl-hipert', name: 'Hipertoninis NaCl', klase: '3 % arba 10 %', tipas: 'pagr',
    ind: 'Intrakranijinio spaudimo mažinimas',
    kontra: 'Hipernatremija (jei yra galimybė nustatyti)',
    dozes: [
      { k: 'Į veną', d: '150–250 ml 3 % NaCl infuzija per 10–20 min',
        p: '3 % tirpalo paruošimas iš 10 % tirpalo: iš 0,9 % NaCl 500 ml butelio ištraukti 150 ml ir įpilti 100 ml 10 % tirpalo.' }
    ],
    pradzia: '10–15 min',
    trukme: '2–4 val.',
    salutinis: 'Padidėjęs kraujo spaudimas, paraudimas / skausmas injekcijos vietoje, traukuliai.',
    pakuote: 'Buteliukai 10 % 100 ml',
    pastabos: ['Gydymo kokybės kriterijai esant galvos smegenų traumai: manitolis arba 3 % NaCl, 30° lovos galvūgalio padėtis; AKS tikslas – sAKS 110–120 mmHg.'],
    saltinis: KORTELE + '; ETC vertinimo lapas'
  },

  // ───────── PAPILDOMI ─────────
  {
    id: 'fentanilis', name: 'Fentanilis', klase: 'Nuskausminamieji (opioidas)', tipas: 'papild', kam: 'Medicinos personalui',
    ind: 'Stiprus skausmas',
    dozes: [
      { k: 'Į veną, praktinė dozė', d: '25–50 mcg kas 10–15 min ar rečiau, pagal poreikį', p: 'Titruoti iki norimo efekto.' },
      { k: 'Į veną, pagal kg (TCCC)', d: '1–2 mcg/kg · ml – neskiesto 50 mcg/ml', c: { min: 1, max: 2, conc: 50, u: 'mcg' }, p: 'ETC lentelėje boliusas mažesnis – 0,5–1 mcg/kg.' }
    ],
    ispejimai: ['Kvėpavimo slopinimas. Perdozavimo ar kvėpavimo sutrikimo atveju naudokite naloksoną.'],
    pradzia: '1–2 min (į veną), pikas 2–5 min',
    trukme: '30–60 min (į veną)',
    salutinis: 'Kvėpavimo slopinimas, pykinimas, sedacija.',
    pakuote: '50 mcg/ml tirpalas',
    pastabos: [
      'ETC lentelė: boliusas – 100 mcg (2 ml švirkštas), 50 mcg/ml, 0,5–1 mcg/kg. Infuzomatu – 1000 mcg + 30 ml NaCl (50 ml švirkštas) = 20 mcg/ml, 1–3 mcg/kg/val. (maždaug nuo 5 ml/val.).',
      TITRAVIMAS
    ],
    susije: ['naloksonas', 'morfinas', 'ketaminas'],
    saltinis: TCCC + '; ' + ETC_LENT
  },
  {
    id: 'ertapenemas', name: 'Ertapenemas', klase: 'Antibiotikai', tipas: 'papild', kam: 'Medicinos personalui',
    ind: 'Sunkių infekcijų gydymas',
    dozes: [{ k: 'Į veną / į raumenis', d: '1 g kartą per parą' }],
    ispejimai: ['Neskirti esant sunkiai beta laktamų alergijai.'],
    salutinis: 'Viduriavimas, išbėrimas.',
    pakuote: '1 g flakonas (IV/IM)',
    susije: ['amoksiklavas', 'moksifloksacinas'],
    saltinis: TCCC
  },
  {
    id: 'moksifloksacinas', name: 'Moksifloksacinas', klase: 'Antibiotikai', tipas: 'papild', kam: 'Medicinos personalui',
    ind: 'Bakterinių infekcijų gydymas',
    dozes: [{ k: 'Per burną', d: '400 mg kartą per parą' }],
    salutinis: 'Pykinimas, galvos skausmas.',
    pakuote: '400 mg tabletės',
    susije: ['amoksiklavas', 'ertapenemas'],
    saltinis: TCCC
  },
  {
    id: 'kalcis', name: 'Kalcio gliukonatas', klase: 'Elektrolitai', tipas: 'papild', kam: 'Medicinos personalui',
    ind: 'Kalcio kiekio užtikrinimas esant kraujo transfuzijai',
    dozes: [{ k: 'Į veną, infuzija', d: '3 g greita infuzija', p: '3 g (30 ml) į 250 ml NaCl.' }],
    pastabos: ['Gydymo kokybės kriterijus: užtikrinamas kalcio kiekis esant kraujo transfuzijai.'],
    susije: ['txa'],
    saltinis: ETC_LENT + '; ETC vertinimo lapas'
  },
  {
    id: 'metoklopramidas', name: 'Metoklopramidas', klase: 'Vėmimą slopinantys', tipas: 'papild', kam: 'Medicinos personalui',
    dozes: [{ k: 'Į veną', d: '10 mg lėtai', p: '10 mg + 8 ml NaCl (10 ml švirkštas). Suleisti lėtai IV.' }],
    susije: ['ondansetronas'],
    saltinis: ETC_LENT
  },
  {
    id: 'atropinas', name: 'Atropinas', klase: 'Anticholinerginis', tipas: 'papild', kam: 'Medicinos personalui',
    dozes: [{ k: 'Į veną', d: 'Po 0,5 mg kas 1–2 min, iki 3 mg', p: '1 mg + 9 ml NaCl (10 ml švirkštas) = 0,1 mg/ml: 0,5 mg = 5 ml.' }],
    saltinis: ETC_LENT
  },
  {
    id: 'noradrenalinas', name: 'Noradrenalinas', klase: 'Vazopresorius', tipas: 'papild', kam: 'Medicinos personalui',
    dozes: [{ k: 'Infuzomatu', d: '0,1–1 mcg/kg/min', p: '4 mg + 46 ml 5 % gliukozės (50 ml švirkštas) = 80 mcg/ml.\nMaždaug nuo 6 ml/val., maksimalus 50 ml/val.' }],
    saltinis: ETC_LENT
  },
  {
    id: 'rokuroniumas', name: 'Rokuroniumas', klase: 'Raumenų relaksantas', tipas: 'papild', kam: 'Intubuojantiems gydytojams',
    dozes: [{ k: 'Į veną, boliusas', d: '0,5–1,5 mg/kg · ml – 10 mg/ml', c: { min: 0.5, max: 1.5, conc: 10 }, p: '100 mg neskiesto (10 ml švirkštas) = 10 mg/ml.' }],
    saltinis: ETC_LENT
  }
];
})();
