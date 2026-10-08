// ETC kišeninis gidas – VAISTAI
// Viena schema kiekvienam vaistui. Šaltinių prioritetas: TCCC gairės 2026-05-01 → gamintojo PCS → ERC / RCUK.
// Jei šaltiniai skiriasi – naudojamas vienas patikimiausias. Ketamino sedacijos dozės – ETC įgūdžių lentelės (sutampa su TCCC 2026).
// Laukai: grupe – paskirtis; tipas 'pagr' – yra kuopos vaistų kortelėje; tccc26 – yra TCCC 2026 gairėse; kam – kas skiria;
//   dozes – dozės; stulpeliai – [{pav, sub, dozes}] – rodomi greta (pvz., nuskausminimas / sedacija); ispejimai – svarbiausi įspėjimai;
//   nuorodos – [pavadinimas, URL]. Patvirtinus mediko: patvirtinta: 'Vardas Pavardė, data'.
// Skaičiuoklė (c): per – mg/kg; min/max – mg/kg intervalas; conc – mg/ml švirkšte; u – vienetai;
//   minute: true – mcg/kg/min → mcg/min ir ml/val.; hour: true – mg/kg/val. → mg/val. ir ml/val.
// Patikrinta: 2026-10-08.
window.ETC = window.ETC || {};

window.ETC.vaistuGrupes = [
  {
    "id": "kraujas",
    "pav": "Kraujavimas ir transfuzija"
  },
  {
    "id": "skausmas",
    "pav": "Skausmas ir sedacija"
  },
  {
    "id": "vemimas",
    "pav": "Pykinimas ir vėmimas"
  },
  {
    "id": "antibiotikai",
    "pav": "Antibiotikai"
  },
  {
    "id": "galva",
    "pav": "Galvos smegenų trauma"
  },
  {
    "id": "gaivinimas",
    "pav": "Kraujotaka ir intubacija"
  }
];

window.ETC.vaistai = [
  {
    "id": "txa",
    "name": "Traneksamo rūgštis (TXA)",
    "klase": "Antifibrinolitikas",
    "grupe": "kraujas",
    "tipas": "pagr",
    "tccc26": true,
    "ind": "Kai tikėtina transfuzija (hemoraginis šokas, didelė amputacija, penetruojanti liemens trauma, stiprus kraujavimas), reikšminga galvos smegenų trauma ar pakitusi sąmonė po sprogimo / bukos traumos (TCCC 2026).",
    "kontra": "PCS: padidėjęs jautrumas; ūminė venų ar arterijų trombozė; fibrinolizė po vartojimo koaguliopatijos (DIK), išskyrus vyraujančią fibrinolizę su ūminiu sunkiu kraujavimu; traukulių anamnezė; negalima leisti intratekališkai, epidurališkai, intraventrikuliškai ar į galvos smegenis.",
    "dozes": [
      {
        "k": "IV / IO (TCCC 2026)",
        "d": "2 g lėtai – kuo anksčiau, ne vėliau kaip per 3 val. nuo sužalojimo",
        "p": "4 ampulės po 500 mg / 5 ml = 20 ml. Leisti ne greičiau kaip 1 ml/min – apie 20 min (PCS)."
      }
    ],
    "ispejimai": [
      "Po 3 val. nuo sužalojimo neskirti. Pažymėkite traumos laiką pradžios ekrane – „TXA iki“ parodys terminą.",
      "Per greitai leidžiant – hipotenzija (PCS).",
      "Tik IV / IO; nemaišyti su krauju ir penicilino tirpalais (PCS)."
    ],
    "salutinis": "Pykinimas, vėmimas, viduriavimas, galvos skausmas, kraujospūdžio sumažėjimas (per greitai leidžiant), galimi traukuliai (ypač jei yra pasireiškę anksčiau).",
    "pakuote": "Ampulės 500 mg / 5 ml (100 mg/ml)",
    "pastabos": [
      "Po pirmojo perpilto kraujo produkto – kalcis (TCCC 2026)."
    ],
    "susije": [
      "kalcis"
    ],
    "saltinis": "TCCC gairės, 2026-05-01 (CoTCCC, Deployed Medicine); PCS (Cyklokapron); ETC vertinimo lapas",
    "nuorodos": [
      [
        "TCCC gairės 2026-05-01 (PDF, Deployed Medicine)",
        "https://learning-media.allogy.com/api/v1/pdf/18ccfdfc-a076-47e9-8a34-376efdd81b43/contents"
      ],
      [
        "Deployed Medicine – TCCC kolekcija (reikia prisijungti)",
        "https://deployedmedicine.allogy.net/learner/collections/11"
      ],
      [
        "PCS – Cyklokapron (traneksamo rūgštis) (JK eMC)",
        "https://www.medicines.org.uk/emc/product/1077/smpc"
      ],
      [
        "NextGen Combat Medic – Tranexamic Acid",
        "https://nextgencombatmedic.com/2024/12/21/tranexamic-acid/"
      ]
    ]
  },
  {
    "id": "kalcis",
    "name": "Kalcio gliukonatas 10 %",
    "klase": "Elektrolitai",
    "grupe": "kraujas",
    "tipas": "papild",
    "tccc26": true,
    "kam": "Medicinos personalui",
    "ind": "Perpylus bet kokį kraujo produktą (įskaitant pilną kraują) – po pirmojo perpilto vieneto (TCCC 2026).",
    "kontra": "PCS: hiperkalcemija, hiperkalciurija, apsinuodijimas širdies glikozidais; vartojantiems širdies glikozidus (digoksiną) – kontraindikuotina, išskyrus gyvybei grėsmingą sunkią hipokalcemiją ar hiperkalemiją.",
    "dozes": [
      {
        "k": "IV / IO (TCCC 2026)",
        "d": "30 ml 10 % kalcio gliukonato (arba 10 ml 10 % kalcio chlorido)",
        "p": "Po pirmojo perpilto kraujo produkto vieneto. Leisti ne greičiau kaip per ~15 min (PCS: ≤ 0,45 mmol kalcio/min)."
      }
    ],
    "ispejimai": [
      "Su ceftriaksonu nemaišyti ir neleisti vienu metu; esant hipovolemijai – nelašinti ir paeiliui (PCS).",
      "Nemaišyti su natrio bikarbonatu ar fosfatais (PCS).",
      "Ekstravazacija sukelia audinių nekrozę (PCS)."
    ],
    "pakuote": "10 % tirpalas (100 mg/ml kalcio gliukonato)",
    "pastabos": [
      "TCCC „1 g kalcio“ – tai 30 ml 10 % kalcio gliukonato arba 10 ml 10 % kalcio chlorido (apie 6,3–6,8 mmol kalcio).",
      "Gydymo kokybės kriterijus: užtikrinamas kalcio kiekis esant kraujo transfuzijai."
    ],
    "susije": [
      "txa"
    ],
    "saltinis": "TCCC gairės, 2026-05-01 (CoTCCC, Deployed Medicine); PCS (kalcio gliukonatas 10 %); ETC vertinimo lapas",
    "nuorodos": [
      [
        "TCCC gairės 2026-05-01 (PDF, Deployed Medicine)",
        "https://learning-media.allogy.com/api/v1/pdf/18ccfdfc-a076-47e9-8a34-376efdd81b43/contents"
      ],
      [
        "Deployed Medicine – TCCC kolekcija (reikia prisijungti)",
        "https://deployedmedicine.allogy.net/learner/collections/11"
      ],
      [
        "PCS – kalcio gliukonatas 10 % (JK eMC)",
        "https://www.medicines.org.uk/emc/product/6264/smpc"
      ]
    ]
  },
  {
    "id": "ketaminas",
    "name": "Ketaminas",
    "klase": "Nuskausminimas ir sedacija",
    "grupe": "skausmas",
    "tipas": "pagr",
    "tccc26": true,
    "ind": "Nuskausminimas – kai sužeistasis negali tęsti užduoties (TCCC 2026). Sedacija – procedūroms ir intubacijai (TCCC 2026 kovos paramedikams / gydytojams; ETC).",
    "kontra": "Alergija. PCS: būklės, kai kraujospūdžio padidėjimas būtų pavojingas, eklampsija / preeklampsija, sunki koronarinė ar miokardo liga, insultas, galvos smegenų trauma (žr. įspėjimą – TCCC vertina kitaip).",
    "dozes": [],
    "ispejimai": [
      "Prieš skiriant – užrašyti AVPU, nuginkluoti; stebėti kvėpavimo takus, kvėpavimą ir kraujotaką (TCCC 2026).",
      "Tikrinkite ampulės stiprumą (50 ar 100 mg/ml) – nuo jo priklauso ml.",
      "Nederinti su benzodiazepinais; iš dalies disocijavusiam – saugiau papildyti ketamino (TCCC 2026).",
      "Sumažėjus kvėpavimui – „uostymo“ padėtis; nepadeda – pagalbinė ventiliacija (TCCC 2026). Sedacijai – būti pasiruošus užtikrinti kvėpavimo takus."
    ],
    "pradzia": "30 s – 1 min (į veną)\n2–5 min (į raumenis)",
    "trukme": "10–20 min (į veną)\n20–30 min (į raumenis)",
    "salutinis": "Pykinimas, vėmimas, galvos svaigimas (dėl nistagmo), raumenų įsitempimas, sumišimas, haliucinacijos, disociacija iki visiško nereagavimo į aplinką (priklauso nuo dozės), kraujospūdžio ir pulso padidėjimas.",
    "pakuote": "Ampulės 250 mg / 5 ml (50 mg/ml)",
    "pastabos": [
      "Galvos smegenų ar akies trauma ketaminui nėra kliūtis (TCCC 2026), bet sedacija apsunkina neurologinį vertinimą; gamintojo PCS galvos traumą nurodo kaip kontraindikaciją – sprendžia medikas.",
      "Esketaminas (jei prieinamas): 14 arba 28 mg į nosį vieną kartą (TCCC 2026).",
      "Kartu – kovinės žaizdos vaistų rinkinys (CWMP), jei dar nevartotas (TCCC 2026).",
      "Greitai leidžiant į veną – laikina apnėja ir kraujospūdžio padidėjimas (PCS). Ketaminą paprastai saugu skirti jau gavusiam opioidų.",
      "Nistagmas – nevalingi, ritmingi akių judesiai."
    ],
    "susije": [
      "midazolamas",
      "paracetamolis",
      "ondansetronas"
    ],
    "saltinis": "TCCC gairės 2026-05-01; ETC įgūdžių lentelės (sedacija, infuzomatas); PCS (Ketalar)",
    "nuorodos": [
      [
        "TCCC gairės 2026-05-01 (PDF, Deployed Medicine)",
        "https://learning-media.allogy.com/api/v1/pdf/18ccfdfc-a076-47e9-8a34-376efdd81b43/contents"
      ],
      [
        "Deployed Medicine – TCCC kolekcija (reikia prisijungti)",
        "https://deployedmedicine.allogy.net/learner/collections/11"
      ],
      [
        "PCS – Ketalar (ketaminas) (JK eMC)",
        "https://www.medicines.org.uk/emc/product/5202/smpc"
      ],
      [
        "NextGen Combat Medic – Ketamine Toolkit",
        "https://nextgencombatmedic.com/2022/01/07/ketamine-toolkit/"
      ],
      [
        "Ankstesnės TCCC gairės (ATP-P, JSOM) – analgezija",
        "https://www.jsomonline.com/Library/Flipbook/ATPEng/files/basic-html/page24.html"
      ]
    ],
    "stulpeliai": [
      {
        "pav": "Nuskausminimas",
        "sub": "TCCC 2026",
        "dozes": [
          {
            "k": "IV / IO",
            "d": "0,2–0,3 mg/kg (arba 25 mg) · ml skiesto 5 mg/ml tirpalo",
            "c": {
              "min": 0.2,
              "max": 0.3,
              "conc": 5
            },
            "p": "Lėtai per 1 min. Skiedimas: 1 ml (50 mg) iki 10 ml = 5 mg/ml."
          },
          {
            "k": "IM",
            "d": "100 mg",
            "p": "50 mg/ml – 2 ml."
          },
          {
            "k": "Į nosį",
            "d": "50 mg",
            "p": "Naudoti 100 mg/ml – 0,5 ml."
          },
          {
            "k": "Kartoti",
            "d": "kas 30 min",
            "p": "Tikslas – skausmas sumažėjo arba atsirado nistagmas."
          }
        ]
      },
      {
        "pav": "Sedacija",
        "sub": "ETC / TCCC 2026",
        "dozes": [
          {
            "k": "IV / IO",
            "d": "1–2 mg/kg lėtai · ml 25 mg/ml tirpalo",
            "c": {
              "min": 1,
              "max": 2,
              "conc": 25
            },
            "p": "250 mg (5 ml) + 5 ml NaCl = 25 mg/ml (10 ml švirkštas). Šoko atveju dozę mažinti 50 % (ETC)."
          },
          {
            "k": "IM",
            "d": "300 mg (2–3 mg/kg)",
            "p": "50 mg/ml – 6 ml (TCCC 2026)."
          },
          {
            "k": "Infuzomatu",
            "d": "nuo 0,5 mg/kg/val.",
            "c": {
              "per": 0.5,
              "conc": 10,
              "hour": true
            },
            "p": "500 mg + 40 ml NaCl = 10 mg/ml (50 ml švirkštas; ETC)."
          },
          {
            "k": "Emergencijos reakcija",
            "d": "midazolamas 0,5–2 mg IV / IO",
            "p": "Svarstyti (TCCC 2026)."
          }
        ]
      }
    ]
  },
  {
    "id": "paracetamolis",
    "name": "Paracetamolis",
    "klase": "Nuskausminamieji",
    "grupe": "skausmas",
    "tipas": "papild",
    "tccc26": true,
    "kam": "",
    "ind": "Skausmas: per burną – kovinės žaizdos vaistų rinkinio (CWMP) dalis (TCCC 2026); į veną – kai negalima gerti (PCS).",
    "kontra": "PCS: padidėjęs jautrumas paracetamoliui; į veną – sunkus kepenų nepakankamumas.",
    "dozes": [],
    "ispejimai": [
      "Nevartoti kartu su kitais paracetamolio turinčiais vaistais (PCS).",
      "Kepenų nepakankamumas, lėtinis alkoholizmas, išsekimas, dehidratacija – į veną ne daugiau kaip 3 g per parą (PCS)."
    ],
    "salutinis": "Retai – alerginės reakcijos. Perdozavus – kepenų pažeidimas.",
    "pakuote": "Tabletės 500 mg; infuzinis tirpalas 10 mg/ml (100 ml = 1 g)",
    "pastabos": [
      "CWMP (TCCC 2026): paracetamolis + meloksikamas 15 mg kartą per parą + suzetriginas (jei prieinamas). Negalinčiam tęsti užduoties – CWMP kartu su ketaminu."
    ],
    "susije": [
      "meloksikamas",
      "ketaminas"
    ],
    "saltinis": "TCCC gairės 2026-05-01; PCS (paracetamolis 500 mg tabletės; paracetamolis 10 mg/ml infuzinis tirpalas)",
    "nuorodos": [
      [
        "TCCC gairės 2026-05-01 (PDF, Deployed Medicine)",
        "https://learning-media.allogy.com/api/v1/pdf/18ccfdfc-a076-47e9-8a34-376efdd81b43/contents"
      ],
      [
        "PCS – paracetamolis 500 mg tabletės (JK eMC)",
        "https://www.medicines.org.uk/emc/product/5164/smpc"
      ],
      [
        "PCS – paracetamolis 10 mg/ml infuzinis tirpalas (JK eMC)",
        "https://www.medicines.org.uk/emc/product/15148/smpc"
      ]
    ],
    "stulpeliai": [
      {
        "pav": "Per burną",
        "sub": "TCCC 2026",
        "dozes": [
          {
            "k": "Dozė",
            "d": "1000–1300 mg kas 8 val.",
            "p": "500 mg tabletės – 2 tab. (1000 mg); CWMP – 2 × 650 mg prailginto atpalaidavimo."
          }
        ]
      },
      {
        "pav": "Į veną",
        "sub": "PCS (10 mg/ml)",
        "dozes": [
          {
            "k": "> 50 kg",
            "d": "1 g per 15 min",
            "p": "Tarp dozių ≥ 4 val., ne daugiau kaip 4 g per parą."
          },
          {
            "k": "33–50 kg",
            "d": "15 mg/kg",
            "p": "Maks. 60 mg/kg, ne daugiau kaip 3 g per parą."
          }
        ]
      }
    ]
  },
  {
    "id": "meloksikamas",
    "name": "Meloksikamas",
    "klase": "Nuskausminamieji (CWMP, NVNU)",
    "grupe": "skausmas",
    "tipas": "papild",
    "tccc26": true,
    "kam": "Visiems (CWMP)",
    "ind": "Skausmas – kovinės žaizdos vaistų rinkinio (CWMP) dalis: kai sužeistasis gali tęsti užduotį; negalinčiam tęsti – CWMP (jei dar nevartotas) kartu su ketaminu (TCCC 2026).",
    "kontra": "PCS: padidėjęs jautrumas NVNU / aspirinui (astma, nosies polipai, angioedema, dilgėlinė); virškinamojo trakto kraujavimas ar perforacija (taip pat anksčiau nuo NVNU); aktyvi ar pasikartojanti opa; smegenų kraujavimas anamnezėje ar kiti kraujavimo sutrikimai; sunkus kepenų nepakankamumas; sunkus nedializuojamas inkstų nepakankamumas; sunkus širdies nepakankamumas; III nėštumo trimestras; < 16 m.",
    "dozes": [
      {
        "k": "Per burną (TCCC 2026)",
        "d": "15 mg kartą per parą",
        "p": "Valgant; ne daugiau kaip 15 mg per parą (PCS)."
      }
    ],
    "ispejimai": [
      "Hipovolemija – inkstų pažeidimo rizika (PCS).",
      "Virškinamojo trakto kraujavimo rizika; nevartoti su kitais NVNU (PCS)."
    ],
    "salutinis": "Dispepsija, pykinimas, pilvo skausmas, viduriavimas.",
    "pakuote": "Tabletės 15 mg",
    "pastabos": [
      "CWMP (TCCC 2026): paracetamolis + meloksikamas + suzetriginas. Jei dar nevartotas – ir negalinčiam tęsti užduoties, kartu su ketaminu."
    ],
    "susije": [
      "paracetamolis",
      "ketaminas"
    ],
    "saltinis": "TCCC gairės, 2026-05-01 (CoTCCC, Deployed Medicine); PCS (meloksikamas 15 mg)",
    "nuorodos": [
      [
        "TCCC gairės 2026-05-01 (PDF, Deployed Medicine)",
        "https://learning-media.allogy.com/api/v1/pdf/18ccfdfc-a076-47e9-8a34-376efdd81b43/contents"
      ],
      [
        "Deployed Medicine – TCCC kolekcija (reikia prisijungti)",
        "https://deployedmedicine.allogy.net/learner/collections/11"
      ],
      [
        "PCS – meloksikamas 15 mg (JK eMC)",
        "https://www.medicines.org.uk/emc/product/101306/smpc"
      ]
    ]
  },
  {
    "id": "morfinas",
    "name": "Morfinas",
    "klase": "Nuskausminamieji (opioidas)",
    "grupe": "skausmas",
    "tipas": "pagr",
    "ind": "Stiprus skausmas. TCCC 2026 morfino nebenumato – negalinčiam tęsti užduoties rekomenduoja ketaminą (arba esketaminą į nosį).",
    "kontra": "Alergija. PCS: ūminis kvėpavimo slopinimas, obstrukcinė kvėpavimo takų liga, galvos trauma, padidėjęs intrakranijinis spaudimas, smegenų edema, koma, traukulių ligos, MAO inhibitoriai (per 2 sav.), paralyžinis žarnų nepraeinamumas, feochromocitoma.",
    "dozes": [
      {
        "k": "IV (PCS)",
        "d": "2,5–15 mg lėtai, titruojant pagal atsaką",
        "p": "Pradėti nuo mažesnės dozės. Įprastai ne dažniau kaip kas 4 val., bet dozė ir intervalas titruojami, kol pasiekiamas nuskausminimas. Skiedimas: 1 ml (10 mg) iki 10 ml = 1 mg/ml."
      },
      {
        "k": "IM (PCS)",
        "d": "10 mg (5–20 mg) kas 4 val.",
        "p": "Neskiesto 10 mg/ml – 1 ml."
      }
    ],
    "ispejimai": [
      "Kvėpavimo slopinimas – stebėti; antagonistas – naloksonas.",
      "Šokas, hipotenzija, senyvas amžius – mažesnės dozės (PCS). Šoko atveju TCCC rekomenduoja ketaminą.",
      "Nederinti su benzodiazepinais (PCS, TCCC 2026)."
    ],
    "pradzia": "5–10 min (į veną)\n10–30 min (į raumenis)",
    "trukme": "3–5 val.",
    "salutinis": "Pykinimas, vėmimas, kvėpavimo slopinimas, kraujospūdžio sumažėjimas, sutrikusi žarnyno veikla.",
    "pakuote": "Ampulės 10 mg / 1 ml (10 mg/ml)",
    "pastabos": [
      "TCCC 2026 morfino nebenumato – negalinčiam tęsti užduoties rekomenduoja ketaminą.",
      "NextGen Combat Medic: 10 mg morfino ≈ 100 mcg fentanilio."
    ],
    "susije": [
      "naloksonas",
      "ketaminas",
      "ondansetronas"
    ],
    "saltinis": "PCS (morfino sulfatas 10 mg/ml); TCCC gairės, 2026-05-01 (CoTCCC, Deployed Medicine)",
    "nuorodos": [
      [
        "PCS – morfino sulfatas 10 mg/ml (JK eMC)",
        "https://www.medicines.org.uk/emc/product/13178/smpc"
      ],
      [
        "TCCC gairės 2026-05-01 (PDF, Deployed Medicine)",
        "https://learning-media.allogy.com/api/v1/pdf/18ccfdfc-a076-47e9-8a34-376efdd81b43/contents"
      ],
      [
        "Ankstesnės TCCC gairės (ATP-P, JSOM) – analgezija",
        "https://www.jsomonline.com/Library/Flipbook/ATPEng/files/basic-html/page24.html"
      ],
      [
        "NextGen Combat Medic – kai nėra ketamino",
        "https://nextgencombatmedic.com/2024/11/18/what-if-you-didnt-have-ketamine-as-a-68w-combat-medic"
      ]
    ]
  },
  {
    "id": "fentanilis",
    "name": "Fentanilis",
    "klase": "Nuskausminamieji (opioidas)",
    "grupe": "skausmas",
    "tipas": "papild",
    "kam": "Medicinos personalui",
    "ind": "Stiprus skausmas. TCCC 2026 fentanilio nebenumato (ankstesnėse TCCC gairėse buvo).",
    "kontra": "PCS: alergija opioidams, kvėpavimo slopinimas, obstrukcinė kvėpavimo takų liga, MAO inhibitoriai (per 2 sav.).",
    "dozes": [
      {
        "k": "IV / IO",
        "d": "50 mcg (0,5–1 mcg/kg) lėtai · ml 50 mcg/ml",
        "c": {
          "min": 0.5,
          "max": 1,
          "conc": 50,
          "u": "mcg"
        },
        "p": "Kartoti kas 30 min pagal poreikį (ankstesnės TCCC gairės)."
      },
      {
        "k": "Į nosį",
        "d": "100 mcg",
        "p": "Kartoti kas 30 min pagal poreikį (ankstesnės TCCC gairės)."
      }
    ],
    "ispejimai": [
      "Leisti lėtai – greita injekcija gali sukelti raumenų, taip pat krūtinės, rigidiškumą (PCS).",
      "Kvėpavimo slopinimas iki apnėjos – antagonistas naloksonas (PCS).",
      "Nederinti su benzodiazepinais (TCCC, PCS)."
    ],
    "pradzia": "1–2 min (į veną), pikas 2–5 min",
    "trukme": "30–60 min (į veną)",
    "salutinis": "Kvėpavimo slopinimas, pykinimas, sedacija, raumenų rigidiškumas.",
    "pakuote": "50 mcg/ml tirpalas",
    "pastabos": [
      "TCCC 2026 fentanilio nebenumato (ankstesnėse gairėse buvo)."
    ],
    "susije": [
      "naloksonas",
      "morfinas",
      "ketaminas"
    ],
    "saltinis": "ankstesnės TCCC gairės (ATP-P, JSOM); PCS (fentanilis); NextGen Combat Medic",
    "nuorodos": [
      [
        "Ankstesnės TCCC gairės (ATP-P, JSOM) – analgezija",
        "https://www.jsomonline.com/Library/Flipbook/ATPEng/files/basic-html/page24.html"
      ],
      [
        "PCS – fentanilis 50 mcg/ml (JK eMC)",
        "https://www.medicines.org.uk/emc/product/100051/smpc"
      ],
      [
        "NextGen Combat Medic – kai nėra ketamino",
        "https://nextgencombatmedic.com/2024/11/18/what-if-you-didnt-have-ketamine-as-a-68w-combat-medic"
      ]
    ]
  },
  {
    "id": "naloksonas",
    "name": "Naloksonas",
    "klase": "Opioidų antagonistas",
    "grupe": "skausmas",
    "tipas": "pagr",
    "ind": "Opioidų sukelto kvėpavimo slopinimo šalinimas.",
    "kontra": "Alergija.",
    "dozes": [
      {
        "k": "IV (PCS)",
        "d": "0,1–0,2 mg, toliau po 0,1 mg kas 2 min",
        "p": "Titruoti iki kvėpavimo dažnio > 10 k./min, neprarandant nuskausminimo. Skiedimas: 0,4 mg (1 ml) + 9 ml NaCl = 0,04 mg/ml; 0,1 mg = 2,5 ml."
      },
      {
        "k": "IM (PCS)",
        "d": "0,4 mg (iki 2 mg), kartoti kas 2–3 min",
        "p": "Kai IV neįmanoma. Po 10 mg be atsako – peržiūrėti diagnozę."
      },
      {
        "k": "Į nosį (Nyxoid)",
        "d": "1,8 mg į vieną šnervę",
        "p": "Nėra atsako – po 2–3 min kita šnerve."
      }
    ],
    "ispejimai": [
      "Veikia 1–4 val.; kai kurie opioidai – ilgiau: stebėti, ar neatsinaujina kvėpavimo slopinimas (PCS).",
      "Per greitas atstatymas – abstinencija, hipertenzija, aritmijos, plaučių edema (PCS)."
    ],
    "pradzia": "1–2 min (į veną)\n2–5 min (į raumenis)",
    "trukme": "1–4 val., priklauso nuo dozės (PCS)",
    "salutinis": "Pykinimas, vėmimas, sujaudinimas, susilpnėjęs nuskausminimas.",
    "pakuote": "Ampulės 0,4 mg / 1 ml (0,4 mg/ml)",
    "pastabos": [
      "TCCC 2026 naloksono nenumato."
    ],
    "susije": [
      "morfinas",
      "fentanilis"
    ],
    "saltinis": "PCS (naloksonas 400 mcg/ml, Nyxoid); ankstesnės TCCC gairės (ATP-P, JSOM)",
    "nuorodos": [
      [
        "PCS – naloksonas 400 mcg/ml (JK eMC)",
        "https://www.medicines.org.uk/emc/product/6589/smpc"
      ],
      [
        "PCS – Nyxoid 1,8 mg nosies purškalas (JK eMC)",
        "https://www.medicines.org.uk/emc/product/9292/smpc"
      ],
      [
        "Ankstesnės TCCC gairės (ATP-P, JSOM) – naloksonas, ondansetronas",
        "https://www.jsomonline.com/Library/Flipbook/ATPEng/files/basic-html/page25.html"
      ]
    ]
  },
  {
    "id": "midazolamas",
    "name": "Midazolamas",
    "klase": "Benzodiazepinas",
    "grupe": "skausmas",
    "tipas": "pagr",
    "tccc26": true,
    "ind": "TCCC 2026 – tik ketamino sukelta emergencijos reakcija. PCS – sedacija, premedikacija.",
    "kontra": "PCS: padidėjęs jautrumas benzodiazepinams; sąmoningai sedacijai – sunkus kvėpavimo nepakankamumas ar ūminis kvėpavimo slopinimas.",
    "dozes": [
      {
        "k": "IV / IO",
        "d": "0,5–2 mg lėtai",
        "p": "TCCC 2026 – ketamino emergencijos reakcijai. Sedacijai titruoti po 1 mg (apie 1 mg per 30 s); daugiau kaip 5 mg (≥ 60 m. – 3,5 mg) paprastai nereikia (PCS)."
      },
      {
        "k": "IM (PCS)",
        "d": "0,07–0,1 mg/kg · ml 5 mg/ml tirpalo",
        "c": {
          "min": 0.07,
          "max": 0.1,
          "conc": 5
        },
        "p": "≥ 60 m. – 0,025–0,05 mg/kg."
      }
    ],
    "ispejimai": [
      "Nederinti su opioidais (TCCC 2026, PCS) – kvėpavimo slopinimas.",
      "Didžiausias poveikis po 5–10 min – prieš kartojant palaukti (PCS)."
    ],
    "pradzia": "apie 2 min (į veną)\n5–10 min (į raumenis)",
    "trukme": "30–90 min (į veną)\n1–6 val. (į raumenis)",
    "salutinis": "Kvėpavimo slopinimas, sumažėjęs kraujospūdis, pykinimas, vėmimas.",
    "pakuote": "Buteliukas 5 mg / 5 ml (1 mg/ml)\nAmpulės 5 mg / 1 ml (5 mg/ml)",
    "pastabos": [
      "Sukelia anterogradinę amneziją: pacientas neprisimena įvykių po vaisto suleidimo, paprastai iki 1 val."
    ],
    "susije": [
      "ketaminas"
    ],
    "saltinis": "TCCC gairės, 2026-05-01 (CoTCCC, Deployed Medicine); PCS (midazolamas 5 mg/ml)",
    "nuorodos": [
      [
        "TCCC gairės 2026-05-01 (PDF, Deployed Medicine)",
        "https://learning-media.allogy.com/api/v1/pdf/18ccfdfc-a076-47e9-8a34-376efdd81b43/contents"
      ],
      [
        "Deployed Medicine – TCCC kolekcija (reikia prisijungti)",
        "https://deployedmedicine.allogy.net/learner/collections/11"
      ],
      [
        "PCS – midazolamas injekcinis (JK eMC)",
        "https://www.medicines.org.uk/emc/product/6420/smpc"
      ]
    ]
  },
  {
    "id": "ondansetronas",
    "name": "Ondansetronas",
    "klase": "Vėmimą slopinantys",
    "grupe": "vemimas",
    "tipas": "pagr",
    "tccc26": true,
    "ind": "Pykinimas ir vėmimas.",
    "kontra": "Alergija. PCS: kartu su apomorfinu. Vengti esant įgimtam ilgo QT sindromui; prieš skiriant koreguoti hipokalemiją ir hipomagnezemiją.",
    "dozes": [
      {
        "k": "IV / IO / IM / ODT (TCCC 2026)",
        "d": "4 mg kas 8 val. pagal poreikį",
        "p": "IV – lėtai, ne greičiau kaip per 30 s (PCS). ODT – burnoje tirpstanti tabletė."
      }
    ],
    "ispejimai": [
      "QT pailgėjimas – vengti esant ilgo QT sindromui (PCS)."
    ],
    "pradzia": "5–10 min (į veną)\n15–30 min (ODT)\n30–60 min (nuryjamos tabletės)",
    "trukme": "4–6 val.",
    "salutinis": "Galvos skausmas, vidurių užkietėjimas, QT intervalo pailgėjimas (priklauso nuo dozės).",
    "pakuote": "Ampulės 4 mg / 2 ml ir 8 mg / 4 ml (2 mg/ml)\nTabletės 4 mg arba 8 mg – tirpstančios burnoje arba nuryjamos (žr. ant pakuotės)",
    "susije": [
      "metoklopramidas"
    ],
    "saltinis": "TCCC gairės, 2026-05-01 (CoTCCC, Deployed Medicine); PCS (ondansetronas)",
    "nuorodos": [
      [
        "TCCC gairės 2026-05-01 (PDF, Deployed Medicine)",
        "https://learning-media.allogy.com/api/v1/pdf/18ccfdfc-a076-47e9-8a34-376efdd81b43/contents"
      ],
      [
        "Deployed Medicine – TCCC kolekcija (reikia prisijungti)",
        "https://deployedmedicine.allogy.net/learner/collections/11"
      ],
      [
        "PCS – ondansetronas injekcinis (JK eMC)",
        "https://www.medicines.org.uk/emc/product/13193/smpc"
      ],
      [
        "Ankstesnės TCCC gairės (ATP-P, JSOM) – naloksonas, ondansetronas",
        "https://www.jsomonline.com/Library/Flipbook/ATPEng/files/basic-html/page25.html"
      ]
    ]
  },
  {
    "id": "metoklopramidas",
    "name": "Metoklopramidas",
    "klase": "Vėmimą slopinantys",
    "grupe": "vemimas",
    "tipas": "papild",
    "kam": "Medicinos personalui",
    "ind": "Pykinimas ir vėmimas (TCCC 2026 nenumato – pirmo pasirinkimo ondansetronas).",
    "kontra": "PCS: kraujavimas iš virškinamojo trakto, mechaninis nepraeinamumas ar perforacija; feochromocitoma; epilepsija; Parkinsono liga; vėlyvoji diskinezija nuo neuroleptikų ar metoklopramido anamnezėje; derinys su levodopa; methemoglobinemija nuo metoklopramido anamnezėje; < 1 m.; žindymas; pirmosios 3–4 d. po virškinamojo trakto operacijų.",
    "dozes": [
      {
        "k": "IV (PCS)",
        "d": "10 mg lėtai, iki 3 kartų per parą",
        "p": "Ne trumpiau kaip per 3 min; maks. 30 mg per parą, ne ilgiau kaip 5 d. Skiedimas: 10 mg + 8 ml NaCl = 1 mg/ml."
      }
    ],
    "ispejimai": [
      "Įtariant pilvo traumą su kraujavimu ar perforacija – neskirti (PCS).",
      "Ekstrapiramidiniai sutrikimai – nutraukti (PCS)."
    ],
    "susije": [
      "ondansetronas"
    ],
    "saltinis": "PCS (metoklopramidas 5 mg/ml)",
    "nuorodos": [
      [
        "PCS – metoklopramidas 5 mg/ml (JK eMC)",
        "https://www.medicines.org.uk/emc/product/6283/smpc"
      ]
    ]
  },
  {
    "id": "cefadroksilis",
    "name": "Cefadroksilis",
    "klase": "Antibiotikai (cefalosporinas)",
    "grupe": "antibiotikai",
    "tipas": "papild",
    "tccc26": true,
    "kam": "Medicinos personalui",
    "ind": "Visos atviros kovinės žaizdos ir invazinės procedūros, kai pacientas gali gerti; penetruojanti akies trauma (TCCC 2026).",
    "kontra": "PCS: padidėjęs jautrumas cefalosporinams; sunkios reakcijos į penicilinus ar kitus beta laktamus anamnezėje.",
    "dozes": [
      {
        "k": "Per burną (TCCC 2026)",
        "d": "1 g kartą per parą",
        "p": "500 mg kapsulės – 2 kapsulės."
      }
    ],
    "ispejimai": [
      "Ne sunki alergija penicilinams – atsargiai (kryžminė alergija 5–10 %, PCS)."
    ],
    "salutinis": "Viduriavimas, pykinimas, bėrimas.",
    "pakuote": "Kapsulės 500 mg",
    "pastabos": [
      "PCS: odos ir minkštųjų audinių infekcijų gydymui – 1 g 2 kartus per parą (1 g kartą per parą – tik streptokokiniam tonzilitui), maks. 4 g per parą; TCCC 2026 atviroms kovinėms žaizdoms – 1 g kartą per parą.",
      "Negalinčiam gerti – ceftriaksonas 2 g IV / IO / IM kartą per parą (TCCC 2026).",
      "Nudegimams vien dėl nudegimo antibiotikų neskirti – skiriama pagal žaizdas (TCCC 2026)."
    ],
    "susije": [
      "ceftriaksonas"
    ],
    "saltinis": "TCCC gairės, 2026-05-01 (CoTCCC, Deployed Medicine); PCS (cefadroksilis 500 mg)",
    "nuorodos": [
      [
        "TCCC gairės 2026-05-01 (PDF, Deployed Medicine)",
        "https://learning-media.allogy.com/api/v1/pdf/18ccfdfc-a076-47e9-8a34-376efdd81b43/contents"
      ],
      [
        "Deployed Medicine – TCCC kolekcija (reikia prisijungti)",
        "https://deployedmedicine.allogy.net/learner/collections/11"
      ],
      [
        "PCS – cefadroksilis 500 mg (JK eMC)",
        "https://www.medicines.org.uk/emc/product/6543/smpc"
      ]
    ]
  },
  {
    "id": "ceftriaksonas",
    "name": "Ceftriaksonas",
    "klase": "Antibiotikai (cefalosporinas)",
    "grupe": "antibiotikai",
    "tipas": "papild",
    "tccc26": true,
    "kam": "Medicinos personalui",
    "ind": "Atviros kovinės žaizdos ir invazinės procedūros, kai pacientas negali gerti; penetruojanti akies trauma (TCCC 2026).",
    "kontra": "PCS: padidėjęs jautrumas ceftriaksonui ar kitiems cefalosporinams; sunki alergija (pvz., anafilaksija) kitiems beta laktamams anamnezėje.",
    "dozes": [
      {
        "k": "IV / IO / IM (TCCC 2026)",
        "d": "2 g kartą per parą",
        "p": "IV infuzija: 2 g į 40 ml tirpalo be kalcio, ≥ 30 min; arba lėtai IV per 5 min. IM: į vieną vietą ≤ 1 g – 2 g dalyti į dvi vietas (PCS)."
      }
    ],
    "ispejimai": [
      "Su kalcio tirpalais nemaišyti ir neleisti vienu metu; esant hipovolemijai – nelašinti ir paeiliui (PCS).",
      "Ištirpintas lidokainu – niekada neleisti į veną (PCS)."
    ],
    "salutinis": "Viduriavimas, bėrimas, kepenų fermentų padidėjimas.",
    "pakuote": "Milteliai flakone 1 g arba 2 g",
    "pastabos": [
      "Gali gerti – cefadroksilis 1 g per burną kartą per parą (TCCC 2026)."
    ],
    "susije": [
      "cefadroksilis",
      "kalcis"
    ],
    "saltinis": "TCCC gairės, 2026-05-01 (CoTCCC, Deployed Medicine); PCS (ceftriaksonas 2 g)",
    "nuorodos": [
      [
        "TCCC gairės 2026-05-01 (PDF, Deployed Medicine)",
        "https://learning-media.allogy.com/api/v1/pdf/18ccfdfc-a076-47e9-8a34-376efdd81b43/contents"
      ],
      [
        "Deployed Medicine – TCCC kolekcija (reikia prisijungti)",
        "https://deployedmedicine.allogy.net/learner/collections/11"
      ],
      [
        "PCS – ceftriaksonas 2 g (JK eMC)",
        "https://www.medicines.org.uk/emc/product/15078/smpc"
      ]
    ]
  },
  {
    "id": "amoksiklavas",
    "name": "Amoksiklavas",
    "klase": "Antibiotikai (penicilinas)",
    "grupe": "antibiotikai",
    "tipas": "pagr",
    "ind": "Sunkių infekcijų gydymas. TCCC 2026 šio antibiotiko nenumato (IV / IO / IM – ceftriaksonas).",
    "kontra": "PCS: padidėjęs jautrumas penicilinams; sunki staigi padidėjusio jautrumo reakcija (pvz., anafilaksija) kitam beta laktamui (cefalosporinui, karbapenemui, monobaktamui) anamnezėje; gelta / kepenų pažeidimas nuo amoksicilino su klavulano rūgštimi anamnezėje.",
    "dozes": [
      {
        "k": "IV (PCS)",
        "d": "1,2 g kas 8 val.",
        "p": "Boliusu: ištirpinti 20 ml injekcinio vandens, leisti per 3–4 min. Infuzijai: į 50–100 ml 0,9 % NaCl, per 30–40 min. Į raumenis neleisti."
      }
    ],
    "ispejimai": [
      "Nemaišyti su gliukozės tirpalais, krauju (PCS)."
    ],
    "salutinis": "Viduriavimas, pykinimas, vėmimas, bėrimas, galvos skausmas.",
    "pakuote": "Milteliai flakone: 1 g amoksicilino + 200 mg klavulano rūgšties",
    "pastabos": [
      "Klavulano rūgštis apsaugo amoksiciliną nuo kai kurių bakterijų fermentų."
    ],
    "susije": [
      "ceftriaksonas",
      "cefadroksilis"
    ],
    "saltinis": "PCS (amoksicilinas / klavulano rūgštis 1000/200 mg); TCCC gairės, 2026-05-01 (CoTCCC, Deployed Medicine)",
    "nuorodos": [
      [
        "PCS – amoksicilinas / klavulano rūgštis 1000/200 mg (JK eMC)",
        "https://www.medicines.org.uk/emc/product/7211/smpc"
      ],
      [
        "TCCC gairės 2026-05-01 (PDF, Deployed Medicine)",
        "https://learning-media.allogy.com/api/v1/pdf/18ccfdfc-a076-47e9-8a34-376efdd81b43/contents"
      ]
    ]
  },
  {
    "id": "ertapenemas",
    "name": "Ertapenemas",
    "klase": "Antibiotikai (karbapenemas)",
    "grupe": "antibiotikai",
    "tipas": "papild",
    "kam": "Medicinos personalui",
    "ind": "Sunkių infekcijų gydymas. TCCC 2026 nebenumato (IV / IO / IM – ceftriaksonas).",
    "kontra": "PCS: alergija karbapenemams; sunki alergija (pvz., anafilaksija) kitiems beta laktamams.",
    "dozes": [
      {
        "k": "IV infuzija (PCS)",
        "d": "1 g kartą per parą",
        "p": "10 ml injekcinio vandens ar 0,9 % NaCl → į 50 ml 0,9 % NaCl, per 30 min."
      }
    ],
    "ispejimai": [
      "Nederinti su valproatu (PCS)."
    ],
    "salutinis": "Viduriavimas, bėrimas.",
    "pakuote": "1 g flakonas",
    "susije": [
      "ceftriaksonas"
    ],
    "saltinis": "PCS (Invanz, EMA); TCCC gairės, 2026-05-01 (CoTCCC, Deployed Medicine)",
    "nuorodos": [
      [
        "PCS – Invanz (ertapenemas), EMA",
        "https://www.ema.europa.eu/en/documents/product-information/invanz-epar-product-information_en.pdf"
      ],
      [
        "TCCC gairės 2026-05-01 (PDF, Deployed Medicine)",
        "https://learning-media.allogy.com/api/v1/pdf/18ccfdfc-a076-47e9-8a34-376efdd81b43/contents"
      ]
    ]
  },
  {
    "id": "moksifloksacinas",
    "name": "Moksifloksacinas",
    "klase": "Antibiotikai (fluorochinolonas)",
    "grupe": "antibiotikai",
    "tipas": "papild",
    "kam": "Medicinos personalui",
    "ind": "Bakterinės infekcijos. TCCC 2026 nebenumato (per burną – cefadroksilis).",
    "kontra": "PCS: < 18 m., nėštumas, žindymas, QT pailgėjimas, nekoreguota hipokalemija, kliniškai reikšminga bradikardija, širdies nepakankamumas su sumažėjusia KS išstūmimo frakcija, simptominės aritmijos anamnezėje, kiti QT ilginantys vaistai, ankstesnė chinolonų sukelta sausgyslių pažaida, sunkus kepenų nepakankamumas.",
    "dozes": [
      {
        "k": "Per burną (PCS)",
        "d": "400 mg kartą per parą"
      }
    ],
    "ispejimai": [
      "Sausgyslių pažeidimas, psichikos ar neuropatijos simptomai – nutraukti (PCS)."
    ],
    "salutinis": "Pykinimas, galvos skausmas.",
    "pakuote": "400 mg tabletės",
    "susije": [
      "cefadroksilis"
    ],
    "saltinis": "PCS (moksifloksacinas); TCCC gairės, 2026-05-01 (CoTCCC, Deployed Medicine)",
    "nuorodos": [
      [
        "PCS – moksifloksacinas 400 mg (JK eMC)",
        "https://www.medicines.org.uk/emc/product/6771/smpc"
      ],
      [
        "TCCC gairės 2026-05-01 (PDF, Deployed Medicine)",
        "https://learning-media.allogy.com/api/v1/pdf/18ccfdfc-a076-47e9-8a34-376efdd81b43/contents"
      ]
    ]
  },
  {
    "id": "nacl-hipert",
    "name": "Hipertoninis NaCl",
    "klase": "3 % arba 5 % (ruošiamas iš 10 %)",
    "grupe": "galva",
    "tipas": "pagr",
    "tccc26": true,
    "ind": "Tik esant galvos smegenų išvaržos požymiams – nevienodi arba fiksuoti išsiplėtę vyzdžiai, patologinė (dekortikacinė / decerebracinė) laikysena (TCCC 2026). Profilaktiškai neskirti.",
    "kontra": "Hipernatremija (jei yra galimybė nustatyti).",
    "dozes": [
      {
        "k": "IV / IO (TCCC 2026)",
        "d": "250 ml 3 % arba 5 % NaCl per ≥ 10 min, po to praplauti",
        "p": "Nėra atsako – kartoti po 20 min (maks. 2 dozės).\nTuri tik 10 %: iš 500 ml 0,9 % NaCl ištraukti 150 ml ir įpilti 100 ml 10 % – gaunama 450 ml ≈ 2,9 %; suleisti 250 ml."
      }
    ],
    "ispejimai": [
      "Tik esant išvaržos požymiams; profilaktiškai neskirti. Ne gaivinimo (tūrio) skystis (TCCC 2026).",
      "Stebėti injekcijos vietą – ekstravazacijos atveju nutraukti (TCCC 2026)."
    ],
    "pradzia": "10–15 min",
    "trukme": "2–4 val.",
    "salutinis": "Padidėjęs kraujospūdis, paraudimas / skausmas injekcijos vietoje, traukuliai.",
    "pakuote": "Buteliukai 10 % 100 ml",
    "pastabos": [
      "TCCC 2026 galvos smegenų traumai: SpO₂ ≥ 92 %, sAKS > 100 mm Hg (nesant matavimo – normalus radialinis pulsas); ventiliuojamam su monitoringu EtCO₂ 35–45 mm Hg (be EtCO₂ – 10 įkvėpimų/min mažu kvėpavimo tūriu, 1 įkvėpimas kas 6 s). Galvą ir liemenį pakelti > 30°, jei nėra šoko ir leidžia taktinė situacija; neurologinę būklę vertinti kas 5–10 min.",
      "ETC vertinimo lapas: manitolis arba 3 % NaCl, 30° galvūgalio padėtis; sAKS tikslas 110–120 mm Hg."
    ],
    "saltinis": "TCCC gairės, 2026-05-01 (CoTCCC, Deployed Medicine); ETC vertinimo lapas",
    "nuorodos": [
      [
        "TCCC gairės 2026-05-01 (PDF, Deployed Medicine)",
        "https://learning-media.allogy.com/api/v1/pdf/18ccfdfc-a076-47e9-8a34-376efdd81b43/contents"
      ],
      [
        "Deployed Medicine – TCCC kolekcija (reikia prisijungti)",
        "https://deployedmedicine.allogy.net/learner/collections/11"
      ]
    ]
  },
  {
    "id": "noradrenalinas",
    "name": "Noradrenalinas",
    "klase": "Vazopresorius",
    "grupe": "gaivinimas",
    "tipas": "papild",
    "kam": "Medicinos personalui",
    "ind": "Ūminė hipotenzija – po tūrio atkūrimo. Trauminiam hemoraginiam šokui pirmiausia – kraujas.",
    "kontra": "PCS: hipovolemijos sukelta hipotenzija – pirmiausia atkurti kraujo tūrį; išimtis – skubi priemonė vainikinių ir smegenų arterijų perfuzijai palaikyti, kol atkuriamas tūris.",
    "dozes": [
      {
        "k": "Infuzomatu (PCS) – 40 mcg/ml",
        "d": "0,05–1 mcg/kg/min",
        "c": {
          "min": 0.05,
          "max": 1,
          "conc": 40,
          "u": "mcg",
          "minute": true
        },
        "p": "2 ml (2 mg) koncentrato + 48 ml 5 % gliukozės = 40 mcg/ml. Pradžia 10–20 ml/val., titruoti pagal AKS."
      }
    ],
    "ispejimai": [
      "Tik atkūrus tūrį; per centrinės venos kateterį, neskiesto neleisti (PCS).",
      "Tikrinkite koncentraciją švirkšte – nuo jos priklauso ml/val.",
      "Infuziją mažinti palaipsniui (PCS)."
    ],
    "pastabos": [
      "PCS tikslas: žemas normalus sAKS (100–120 mm Hg) arba vidutinis AKS > 65–80 mm Hg – priklauso nuo būklės."
    ],
    "saltinis": "PCS (noradrenalinas 1 mg/ml)",
    "nuorodos": [
      [
        "PCS – noradrenalinas 1 mg/ml (JK eMC)",
        "https://www.medicines.org.uk/emc/product/13172/smpc"
      ]
    ]
  },
  {
    "id": "atropinas",
    "name": "Atropinas",
    "klase": "Anticholinerginis",
    "grupe": "gaivinimas",
    "tipas": "papild",
    "kam": "Medicinos personalui",
    "ind": "Bradikardija su nepageidaujamais požymiais.",
    "dozes": [
      {
        "k": "IV (ERC / RCUK 2025)",
        "d": "0,5 mg, kartoti iki maks. 3 mg",
        "p": "Ampulė 1 mg / 1 ml + 9 ml NaCl = 0,1 mg/ml: 0,5 mg = 5 ml."
      }
    ],
    "saltinis": "RCUK / ERC 2025 bradiaritmijos algoritmas",
    "nuorodos": [
      [
        "RCUK suaugusiųjų bradiaritmijos algoritmas 2025",
        "https://www.resus.org.uk/sites/default/files/2025-10/Adult%20bradyarrhythmia%202025.pdf"
      ],
      [
        "ERC 2025 bradikardijos algoritmas",
        "https://www.cprguidelines.eu/assets/posters/6.ALS-Algorithms-Bradycardia.pdf"
      ]
    ],
    "ispejimai": []
  },
  {
    "id": "rokuroniumas",
    "name": "Rokuroniumas",
    "klase": "Raumenų relaksantas",
    "grupe": "gaivinimas",
    "tipas": "papild",
    "kam": "Intubuojantiems gydytojams",
    "ind": "Intubacija, greitosios sekos indukcija.",
    "dozes": [
      {
        "k": "Greitosios sekos indukcija (PCS)",
        "d": "1 mg/kg · ml 10 mg/ml tirpalo",
        "c": {
          "per": 1,
          "conc": 10
        }
      },
      {
        "k": "Palaikomoji (PCS)",
        "d": "0,15 mg/kg · ml 10 mg/ml tirpalo",
        "c": {
          "per": 0.15,
          "conc": 10
        }
      }
    ],
    "ispejimai": [
      "Būtina dirbtinė plaučių ventiliacija; skiria tik patyręs gydytojas (PCS)."
    ],
    "saltinis": "PCS (rokuronio bromidas 10 mg/ml)",
    "nuorodos": [
      [
        "PCS – rokuronio bromidas 10 mg/ml (JK eMC)",
        "https://www.medicines.org.uk/emc/product/13173/smpc"
      ]
    ]
  }
];
