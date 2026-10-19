// ETC gidas – TRENIRUOČIŲ SCENARIJAI (tools.js SC). Kiekvienas atsakymas paremtas gido turiniu (ref – nuorodos į įgūdžius, sąrašus, vaistus).
// Visi scenarijai – kariniai (kariai, kovos veiksmai, pratybos, karinė technika, Role 1).
// Laukai: id, pav, tema, q: [{sit, gp (gyvybės požymiai), klaus, opt: [{t, ok}], why, ref}].
window.ETC = window.ETC || {};

window.ETC.scenarijai = [
 {
  "id": "s1",
  "pav": "Šlaunies amputacija",
  "tema": "Kraujavimas",
  "q": [
   {
    "sit": "Iš pozicijų atvežamas karys po minos sprogimo: kairės šlaunies amputacija, iš kelmo pulsuojamai bėga kraujas. Turniketo nėra. A atlieka 5 s apžiūrą.",
    "gp": {
     "AVPU": "V",
     "KD": "28"
    },
    "klaus": "Ką pirmiausia daro komandos vadas A?",
    "opt": [
     {
      "t": "Perima ATMIST ir pradeda nuo kvėpavimo takų – Planas A",
      "ok": false
     },
     {
      "t": "Garsiai skelbia „Masyvus kraujavimas“ ir nurodo B ir C stabdyti kraujavimą",
      "ok": true
     },
     {
      "t": "Liepia C pirma įvesti PVK ir pradėti skysčius, tada spręs dėl turniketo",
      "ok": false
     }
    ],
    "why": "cABC: masyvus kraujavimas stabdomas prieš kvėpavimo takus. Escape plane A aiškiai paskelbia problemą, B ir C stabdo; kol ruošiamas turniketas – tiesioginis spaudimas.",
    "ref": [
     "#/s/esc-kraujas",
     "#/igudis/35",
     "#/igudis/1"
    ]
   },
   {
    "sit": "Turniketas uždėtas ant odos 5–8 cm virš kelmo krašto, strypas pasuktas. Kraujavimas iš kelmo sumažėjo, bet tebesisunkia.",
    "gp": {
     "AKS": "92/60",
     "ŠSD": "124"
    },
    "klaus": "Ką daryti toliau?",
    "opt": [
     {
      "t": "Sukti strypą, kol kraujavimas visiškai sustos; nepakanka – antras turniketas greta, proksimaliau",
      "ok": true
     },
     {
      "t": "Palikti taip – kraujavimas sumažėjo, o per stiprus turniketas pažeis galūnę",
      "ok": false
     },
     {
      "t": "Turniketą trumpam atleisti, kad galūnė „pakvėpuotų“, ir užveržti iš naujo",
      "ok": false
     }
    ],
    "why": "Turniketas veiksmingas, kai kraujavimas sustojęs (nesant amputacijos – ir nėra distalinio pulso). Nepakankamas suveržimas ir atleidimas „kad pakvėpuotų“ – klaidos (#35).",
    "ref": [
     "#/igudis/35"
    ]
   },
   {
    "sit": "Kraujavimas sustojo, laikas užrašytas ant turniketo. C praneša: hemoraginis šokas – taip. Trauma įvyko prieš 50 min.",
    "gp": {
     "AKS": "84/50",
     "ŠSD": "132",
     "AVPU": "V"
    },
    "klaus": "Kuris tolesnis žingsnis teisingas?",
    "opt": [
     {
      "t": "Atlikti turniketo konversiją, kad sumažėtų išemija",
      "ok": false
     },
     {
      "t": "Šokas paaiškintas amputacija – dubens tikrinti nereikia",
      "ok": false
     },
     {
      "t": "Grįžti prie Plano A, B įvertina dubenį; C – TXA, šildyti kraujo komponentai",
      "ok": true
     }
    ],
    "why": "Turniketas ant šlaunies ar amputacija neatmeta dubens lūžio. Konversija negalima esant šokui ir amputacijai. TXA ≤ 3 val. nuo traumos.",
    "ref": [
     "#/igudis/20",
     "#/igudis/26",
     "#/s/esc-kraujas",
     "#/vaistas/txa"
    ]
   }
  ]
 },
 {
  "id": "s2",
  "pav": "Kraujas burnoje",
  "tema": "Kvėpavimas",
  "q": [
   {
    "sit": "Šarvuočio vairuotojas po apvirtimo, veido trauma. Reaguoja tik į skausmą, girdimas burbuliavimas, burnoje kraujas. Kaklo trauma neatmesta.",
    "gp": {
     "AVPU": "P",
     "KD": "8",
     "SpO₂": "88 %"
    },
    "klaus": "Kaip A atveria kvėpavimo takus?",
    "opt": [
     {
      "t": "Galvos atlošimas ir smakro pakėlimas, burną išvalyti pirštais",
      "ok": false
     },
     {
      "t": "Žandikaulio stūmimas su MILS ir atsiurbimas plačiu (Yankauer) antgaliu",
      "ok": true
     },
     {
      "t": "Iškart įdėti orofaringinį vamzdelį, atsiurbti vėliau",
      "ok": false
     }
    ],
    "why": "Įtariant kaklo traumą – žandikaulio stūmimas ir MILS; kraujas atsiurbiamas Yankauer antgaliu. Galvos atlošimas ir aklas valymas pirštais – klaidos (#2).",
    "ref": [
     "#/igudis/2",
     "#/igudis/3",
     "#/s/esc-kt"
    ]
   },
   {
    "sit": "Po atsiurbimo takai laisvesni, bet atleidus žandikaulį liežuvis vėl užkrenta. Matomos „akinių“ kraujosruvos ir skystis iš nosies. Vėmimo reflekso nėra.",
    "gp": {
     "AVPU": "P",
     "SpO₂": "91 %"
    },
    "klaus": "Kuri pagalbinė priemonė tinkama?",
    "opt": [
     {
      "t": "Nazofaringinis vamzdelis – geriau toleruojamas",
      "ok": false
     },
     {
      "t": "Jokio vamzdelio – pakaks toliau laikyti žandikaulį",
      "ok": false
     },
     {
      "t": "Orofaringinis vamzdelis, toliau laikant žandikaulį",
      "ok": true
     }
    ],
    "why": "NPA nedėkite įtariant kaukolės pamato lūžį (likvorėja, periorbitalinės kraujosruvos). Nesąmoningam be vėmimo reflekso – OPA (#6).",
    "ref": [
     "#/igudis/6",
     "#/igudis/2"
    ]
   },
   {
    "sit": "Ventiliacija kauke, laringine kauke ir intubacija nepavyksta – po 3 bandymus kiekvienu būdu. Krūtinė nekyla, SpO₂ krenta. Ekspertinė pagalba pakviesta.",
    "gp": {
     "SpO₂": "74 %",
     "ŠSD": "48"
    },
    "klaus": "Ką skelbia A?",
    "opt": [
     {
      "t": "CICO: 10 s pauzė, aiškus sprendimas ir nedelsiant krikotiroidotomija (rinkinį ruošia B)",
      "ok": true
     },
     {
      "t": "Dar vienas intubacijos bandymas su kitu laringoskopu",
      "ok": false
     },
     {
      "t": "Tęsti ventiliaciją kauke ir laukti, kol atvyks anesteziologas",
      "ok": false
     }
    ],
    "why": "Visi trys būdai nepavyko – CICO, krikotiroidotomija. Dažniausia klaida – per vėlai priimtas sprendimas ir kartojama nepasiteisinusi technika (#8, #18).",
    "ref": [
     "#/igudis/8",
     "#/igudis/18",
     "#/s/esc-kt"
    ]
   }
  ]
 },
 {
  "id": "s3",
  "pav": "Siurbianti krūtinės žaizda",
  "tema": "Krūtinė",
  "q": [
   {
    "sit": "Karys sužeistas peiliu artimoje kovoje – dūris į dešinę krūtinės pusę. B mato žaizdą, kuri įkvepiant burbuliuoja ir švilpia.",
    "gp": {
     "KD": "30",
     "SpO₂": "90 %",
     "AKS": "118/76"
    },
    "klaus": "Ką daro B?",
    "opt": [
     {
      "t": "Užkemša žaizdą hemostatine marle ir spaudžia 3 min",
      "ok": false
     },
     {
      "t": "Uždengia ranka, nuvalo odą ir iškvepiant uždeda ventiliuojamą okliuzinį tvarstį",
      "ok": true
     },
     {
      "t": "Palieka žaizdą atvirą, kol bus įvestas krūtinės drenas",
      "ok": false
     }
    ],
    "why": "Atvira krūtinės žaizda iškart dengiama ventiliuojamu okliuziniu tvarsčiu, kraštai ≥ 5 cm. Į krūtinės žaizdą marlės nekimšti (#37, #36).",
    "ref": [
     "#/igudis/37",
     "#/igudis/13"
    ]
   },
   {
    "sit": "Po 5 min pacientas blogėja: dešinėje negirdėti kvėpavimo garsų, perkutuojant dėžinis garsas, išsiplėtusios kaklo venos.",
    "gp": {
     "KD": "38",
     "SpO₂": "83 %",
     "AKS": "82/50",
     "ŠSD": "136"
    },
    "klaus": "Kas teisinga?",
    "opt": [
     {
      "t": "Hipotenzija – skysčių bolusas ir kraujas, tada krūtinės rentgenas",
      "ok": false
     },
     {
      "t": "Laukti krūtinės rentgenogramos patvirtinimo",
      "ok": false
     },
     {
      "t": "Pranešti A, „atpūsti“ tvarstį; nepadeda – nedelsiant dekompresija",
      "ok": true
     }
    ],
    "why": "Tai įtampos pneumotoraksas: pirma pakelkite tvarsčio kraštą, nepadeda – dekompresija. Nestabiliam rentgeno nelaukiama; hipotenzijos priežastis – ne vien kraujavimas (#13, #38).",
    "ref": [
     "#/igudis/38",
     "#/igudis/37",
     "#/igudis/13"
    ]
   },
   {
    "sit": "Gydytojas dar neatvyko. B atliko adatinę dekompresiją 14 G kanule 2-ajame tarpšonkaulyje vidurinėje raktikaulio linijoje. Oro išėjimo negirdėti, būklė negerėja.",
    "gp": {
     "SpO₂": "82 %",
     "AKS": "80/48"
    },
    "klaus": "Kaip vertinti šią situaciją?",
    "opt": [
     {
      "t": "Įtampos nėra – ieškoti kitos šoko priežasties",
      "ok": false
     },
     {
      "t": "Įtampa neatmesta: kanulė galėjo nepasiekti pleuros – kuo greičiau torakostomija, kol jos nėra – antra adata",
      "ok": true
     },
     {
      "t": "Kanulę ištraukti ir dekompresuoti tik po rentgeno",
      "ok": false
     }
    ],
    "why": "Neišgirdus oro negalima teigti, kad įtampos nėra – adata galėjo nepasiekti pleuros ar užsilenkti. Nepadėjo – torakostomija, iki jos – antra adata (#38).",
    "ref": [
     "#/igudis/38",
     "#/igudis/14"
    ]
   }
  ]
 },
 {
  "id": "s4",
  "pav": "Šokas be hipotenzijos",
  "tema": "Šokas",
  "q": [
   {
    "sit": "Karį prieš 40 min poligone partrenkė karinis visureigis. Galvos traumos požymių nėra, bet sumišęs. Radialinis pulsas silpnas, oda blyški, šalta, drėgna.",
    "gp": {
     "AKS": "104/72",
     "ŠSD": "122",
     "AVPU": "V"
    },
    "klaus": "Ką C garsiai praneša A?",
    "opt": [
     {
      "t": "Hemoraginis šokas – taip",
      "ok": true
     },
     {
      "t": "Šoko nėra – AKS dar normalus",
      "ok": false
     },
     {
      "t": "Sumišimas dėl galvos traumos, šokas mažai tikėtinas",
      "ok": false
     }
    ],
    "why": "Patikimiausi požymiai – sutrikusi sąmonė be galvos traumos ir silpnas radialinis pulsas; AKS krinta tik netekus 30–40 % kraujo. Laukti hipotenzijos – klaida (#40).",
    "ref": [
     "#/igudis/40",
     "#/s/c-pir"
    ]
   },
   {
    "sit": "Išorinio kraujavimo nėra, dubuo stabilus. Kraujo grupė nustatyta, veikia 2 PVK. A klausia C, kas skiriama.",
    "gp": {
     "AKS": "88/54",
     "ŠSD": "130"
    },
    "klaus": "Kuris planas atitinka žalos kontrolės gaivinimą?",
    "opt": [
     {
      "t": "2 l šiltų kristaloidų, kraujas tik jei AKS nepakils",
      "ok": false
     },
     {
      "t": "Noradrenalinas, kad AKS greitai pasiektų tikslą",
      "ok": false
     },
     {
      "t": "TXA 2 g lėtai ir šildyti kraujo komponentai (pilnas kraujas arba 1:1:1)",
      "ok": true
     }
    ],
    "why": "Šildyti kraujo komponentai vietoje kristaloidų, TXA kuo greičiau (≤ 3 val.). Vazopresoriai hemoraginio šoko negydo (#40).",
    "ref": [
     "#/igudis/40",
     "#/vaistas/txa",
     "#/p/kraujas",
     "#/igudis/23"
    ]
   },
   {
    "sit": "Perpiltas pirmasis kraujo vienetas. Sąmonė gerėja, radialinis pulsas čiuopiamas. Chirurginė kontrolė dar nepasiekta.",
    "gp": {
     "AKS": "92/55",
     "ŠSD": "112"
    },
    "klaus": "Kas dabar teisinga?",
    "opt": [
     {
      "t": "Kalcis tik pradėjus masinę transfuziją (po 4 vienetų)",
      "ok": false
     },
     {
      "t": "Skirti kalcį; VAKS ~65 mm Hg – AKS daugiau nekelti iki chirurginės kontrolės",
      "ok": true
     },
     {
      "t": "Tęsti perpylimą, kol sAKS pasieks 120 mm Hg",
      "ok": false
     }
    ],
    "why": "Kalcis – po pirmojo perpilto vieneto. Be galvos traumos tikslas VAKS 65 mm Hg; per didelis AKS gali suardyti krešulį (#23, #40).",
    "ref": [
     "#/vaistas/kalcis",
     "#/igudis/23",
     "#/s/kokybe"
    ]
   }
  ]
 },
 {
  "id": "s5",
  "pav": "Kritimas nuo šarvuočio",
  "tema": "Galva",
  "q": [
   {
    "sit": "Karys nukrito nuo šarvuočio, kaktos žaizda. Kitų sužalojimų ir šoko požymių nerasta. Kvėpuoja paviršutiniškai.",
    "gp": {
     "GKS": "9",
     "SpO₂": "89 %",
     "AKS": "100/60",
     "KD": "10"
    },
    "klaus": "Kurie tikslai svarbiausi?",
    "opt": [
     {
      "t": "Permisinė hipotenzija – VAKS 65 mm Hg, kad nekraujuotų žaizda",
      "ok": false
     },
     {
      "t": "Hiperventiliuoti ambu maišu, kad sumažėtų smegenų edema",
      "ok": false
     },
     {
      "t": "SpO₂ ≥ 94 % (prireikus ventiliacija) ir sAKS 110–120 mm Hg",
      "ok": true
     }
    ],
    "why": "Antrinis pažeidimas = hipoksija + hipotenzija. Galvos traumai sAKS 110–120 mm Hg; hiperventiliacija be EtCO₂ kontrolės – klaida (#44).",
    "ref": [
     "#/igudis/44",
     "#/s/kokybe"
    ]
   },
   {
    "sit": "Pacientas tampa neramus, planuojama sedacija ir RSI. Komanda ruošia vaistus.",
    "gp": {
     "GKS": "8",
     "SpO₂": "95 %"
    },
    "klaus": "Ką A privalo padaryti prieš sedaciją?",
    "opt": [
     {
      "t": "Užfiksuoti GKS / AVPU, vyzdžius ir galūnių pusių skirtumą",
      "ok": true
     },
     {
      "t": "Nieko – neurologiją įvertins neurochirurgas po KT",
      "ok": false
     },
     {
      "t": "Atlikti tik antrinę apžiūrą nuo galvos iki kojų",
      "ok": false
     }
    ],
    "why": "Prieš sedaciją, RSI ar ketaminą užfiksuokite GKS, vyzdžius ir pusių skirtumą – kitaip nėra su kuo lyginti (#12, #44).",
    "ref": [
     "#/igudis/12",
     "#/igudis/44"
    ]
   },
   {
    "sit": "Po 10 min kairysis vyzdys išsiplėtęs ir nereaguoja į šviesą, GKS sumažėjo iki 6. AKS ir SpO₂ tiksluose.",
    "gp": {
     "GKS": "6",
     "AKS": "124/70",
     "SpO₂": "97 %"
    },
    "klaus": "Kaip reaguoja A?",
    "opt": [
     {
      "t": "Toliau stebėti, GKS pakartoti po 30 min",
      "ok": false
     },
     {
      "t": "Garsiai: išvaržos požymiai – manitolis arba 3 % NaCl, skubiai neurochirurgas",
      "ok": true
     },
     {
      "t": "Paskirti skysčių bolusą ir nuleisti galvūgalį",
      "ok": false
     }
    ],
    "why": "Asimetriški ar fiksuoti vyzdžiai ir blogėjanti sąmonė – išvaržos požymiai: eskaluoti nedelsiant. Dozė – Vaistai / SOP (#44).",
    "ref": [
     "#/igudis/44",
     "#/vaistas/nacl-hipert",
     "#/igudis/12"
    ]
   }
  ]
 },
 {
  "id": "s6",
  "pav": "Šarvuočio gaisras",
  "tema": "Nudegimai",
  "q": [
   {
    "sit": "Karys ištrauktas iš degančio šarvuočio. Veido nudegimai, apdegę nosies plaukai, suodžiai skrepliuose, balsas užkimęs. Kol kas kalba.",
    "gp": {
     "AVPU": "A",
     "KD": "24",
     "SpO₂": "95 %"
    },
    "klaus": "Kaip A valdo kvėpavimo takus?",
    "opt": [
     {
      "t": "Pakanka nazofaringinio vamzdelio, stebėti",
      "ok": false
     },
     {
      "t": "Stebėti; intubuoti tik atsiradus stridorui",
      "ok": false
     },
     {
      "t": "100 % O₂ (įtariant CO) ir anksti planuoti galutinį kvėpavimo taką",
      "ok": true
     }
    ],
    "why": "Įkvėpimo trauma – takai tinsta greitai: anksti galutinis kvėpavimo takas; NPA ar supraglotinė priemonė nepakankamos. Įtarus CO – 100 % O₂ (#48).",
    "ref": [
     "#/igudis/48",
     "#/igudis/8"
    ]
   },
   {
    "sit": "Kvėpavimo takai užtikrinti. Veidas paraudęs, be pūslių; krūtinėje ir dešinėje rankoje pūslės ir balti plotai.",
    "gp": {},
    "klaus": "Kaip apskaičiuojamas nudegimo plotas?",
    "opt": [
     {
      "t": "Tik II–III laipsnio plotai: devyneto taisyklė, delnas su pirštais ≈ 1 %",
      "ok": true
     },
     {
      "t": "Visi plotai, įskaitant paraudusį veidą",
      "ok": false
     },
     {
      "t": "Delnas be pirštų ≈ 5 % KPP",
      "ok": false
     }
    ],
    "why": "Į plotą skaičiuojami tik II–III laipsnio nudegimai; I laipsnio įskaičiavimas – klaida. Delnas su pirštais ≈ 1 % (#48).",
    "ref": [
     "#/igudis/48"
    ]
   },
   {
    "sit": "Nudegimai ~30 % KPP, vėsinti vandeniu 20 min. Pacientas dreba, centrinė temperatūra krenta.",
    "gp": {
     "T": "35,1 °C",
     "AKS": "110/70",
     "ŠSD": "118"
    },
    "klaus": "Kas toliau?",
    "opt": [
     {
      "t": "Tęsti vėsinimą ledu, kad mažėtų nudegimo gylis",
      "ok": false
     },
     {
      "t": "Nutraukti vėsinimą, uždengti, šildyti; Ringerio laktatas pagal SOP, titruojant pagal diurezę",
      "ok": true
     },
     {
      "t": "Pilti skysčius kuo greičiau – per daug skysčių nepakenks",
      "ok": false
     }
    ],
    "why": "Dideli nudegimai greitai šąla – ilgas vėsinimas ir ledas yra klaidos. > 20 % KPP – skysčiai pagal SOP, titruojant pagal diurezę 0,5–1 ml/kg/val. (#48, #19).",
    "ref": [
     "#/igudis/48",
     "#/igudis/19",
     "#/igudis/34"
    ]
   }
  ]
 },
 {
  "id": "s7",
  "pav": "Šautinė į krūtinę",
  "tema": "Kita",
  "q": [
   {
    "sit": "Iš pozicijų atvežamas karys su šautine žaizda krūtinėje. A 5 s apžiūroje: nereaguoja, kvėpuoja agoniškai, centrinio pulso nėra.",
    "gp": {
     "AVPU": "U"
    },
    "klaus": "Ką skelbia A?",
    "opt": [
     {
      "t": "Pradėti krūtinės paspaudimus ir skirti adrenaliną pagal ALS",
      "ok": false
     },
     {
      "t": "Tęsti Planą A, pirma priimti ATMIST",
      "ok": false
     },
     {
      "t": "„Trauminis širdies sustojimas – Escape planas“, laikas užrašomas, HOTT vienu metu",
      "ok": true
     }
    ],
    "why": "TCA išgyvenimas priklauso nuo grįžtamų priežasčių (HOTT) šalinimo, ne nuo paspaudimų; adrenalino nauda neįrodyta. Standartinis ALS – klaida (#39).",
    "ref": [
     "#/igudis/39",
     "#/s/esc-tss"
    ]
   },
   {
    "sit": "C įvedė IO, perpilamas šildytas kraujas, A ventiliuoja 100 % O₂. B nustato, kad dešinėje kvėpavimo garsai susilpnėję.",
    "gp": {
     "AVPU": "U"
    },
    "klaus": "Kaip B atlieka dekompresiją?",
    "opt": [
     {
      "t": "Abipusė dekompresija – torakostomija, kitaip adatinė",
      "ok": true
     },
     {
      "t": "Tik dešinėje, kur susilpnėję garsai",
      "ok": false
     },
     {
      "t": "Pirma e-FAST, dekompresija tik patvirtinus pneumotoraksą",
      "ok": false
     }
    ],
    "why": "Trauminiame širdies sustojime dekompresuojamos abi pusės; tik vienos pusės dekompresija – klaida. Ultragarsas neturi vėlinti gydymo (#39, #38).",
    "ref": [
     "#/igudis/39",
     "#/igudis/38"
    ]
   },
   {
    "sit": "Po abipusės dekompresijos ir kraujo perpylimo atsirado centrinis pulsas.",
    "gp": {
     "AKS": "74/40",
     "ŠSD": "140"
    },
    "klaus": "Koks tolesnis planas?",
    "opt": [
     {
      "t": "Užbaigti visą antrinę apžiūrą, tada spręsti dėl operacinės",
      "ok": false
     },
     {
      "t": "Pradėti vazopresorių infuziją AKS kelti",
      "ok": false
     },
     {
      "t": "Žalos kontrolės gaivinimas ir skubus perkėlimas į operacinę",
      "ok": true
     }
    ],
    "why": "Grįžus gyvybės požymiams – žalos kontrolės gaivinimas ir skubiai operacinė. Vazopresoriai hemoraginio šoko negydo (#39, #40).",
    "ref": [
     "#/igudis/39",
     "#/igudis/40"
    ]
   }
  ]
 },
 {
  "id": "s8",
  "pav": "Apvirtęs visureigis: dubuo",
  "tema": "Šokas",
  "q": [
   {
    "sit": "Karys po karinio visureigio apvirtimo, skundžiasi dubens skausmu. Išorinio kraujavimo nėra, bet yra šoko požymių. B pradeda dubens vertinimą.",
    "gp": {
     "AKS": "86/52",
     "ŠSD": "128",
     "AVPU": "V"
    },
    "klaus": "Kaip B vertina dubenį?",
    "opt": [
     {
      "t": "Spaudžia ir skečia dubenį kelis kartus, kad įsitikintų",
      "ok": false
     },
     {
      "t": "Apžiūri tarpvietę, šlaplės angą ir vieną kartą švelniai apčiuopia stabilumą",
      "ok": true
     },
     {
      "t": "Dubens netikrina – tai antrinės apžiūros dalis",
      "ok": false
     }
    ],
    "why": "Dubuo vertinamas pirminėje apžiūroje: vieną kartą, švelniai, be „knygos atvėrimo“; apžiūrima tarpvietė ir kūno angos (#20).",
    "ref": [
     "#/igudis/20",
     "#/s/b-pir"
    ]
   },
   {
    "sit": "Dubuo nestabilus, kraujas šlaplės angoje. Kišenės ištuštintos, pacientas ant nugaros.",
    "gp": {
     "AKS": "82/50",
     "ŠSD": "134"
    },
    "klaus": "Kaip uždedamas dubens diržas?",
    "opt": [
     {
      "t": "B ir C kartu, didžiųjų gūbrių lygyje; keliai ir pėdos surišami",
      "ok": true
     },
     {
      "t": "Ant klubakaulių keterų, kad laikytų tvirčiau",
      "ok": false
     },
     {
      "t": "Vienas B, kol C tęsia vaistų ruošimą; kojų rišti nereikia",
      "ok": false
     }
    ],
    "why": "Diržą deda B ir C kartu didžiųjų gūbrių lygyje – per aukštai uždėtas neveikia. Diržas ant keterų ir nesurištos kojos – klaidos (#20).",
    "ref": [
     "#/igudis/20",
     "#/s/c-pir"
    ]
   },
   {
    "sit": "Diržas uždėtas, perpilti 2 kraujo vienetai, TXA ir kalcis skirti. Šokas nepraeina.",
    "gp": {
     "AKS": "78/46",
     "ŠSD": "138"
    },
    "klaus": "Ką daro komanda?",
    "opt": [
     {
      "t": "Pradeda noradrenaliną, kad pasiektų AKS tikslą",
      "ok": false
     },
     {
      "t": "Atlaisvina diržą, kad patikrintų dubenį iš naujo",
      "ok": false
     },
     {
      "t": "Vėl tikrina kraujavimo vietas ir įtampos pneumotoraksą; skubus perkėlimas į operacinę",
      "ok": true
     }
    ],
    "why": "Šokas nepraeina – vėl kraujavimo vietos, dubuo, įtampos pneumotoraksas, skubiai operacinė. Vazopresoriai hemoraginio šoko negydo (#40).",
    "ref": [
     "#/igudis/40",
     "#/igudis/20",
     "#/s/esc-kraujas"
    ]
   }
  ]
 },
 {
  "id": "s9",
  "pav": "Blauzdos lūžis ir skausmas",
  "tema": "Kita",
  "q": [
   {
    "sit": "Atviras blauzdos lūžis po minos skeveldros, kraujavimas sustabdytas, galūnė dar neįtvarkyta. Skausmas 8/10, yra šoko požymių. A skiria analgeziją.",
    "gp": {
     "AKS": "96/60",
     "ŠSD": "118",
     "AVPU": "A"
    },
    "klaus": "Kuris sprendimas teisingas?",
    "opt": [
     {
      "t": "Užrašyti AVPU, įtvarkyti lūžį; ketaminas 0,2–0,3 mg/kg (arba 25 mg) IV lėtai per 1 min",
      "ok": true
     },
     {
      "t": "Didelis opioido bolusas – skausmą reikia pašalinti iškart",
      "ok": false
     },
     {
      "t": "Ketaminas kartu su midazolamu, kad pacientas nurimtų",
      "ok": false
     }
    ],
    "why": "Šoke saugesnis ketaminas, titruojant; prieš tai užrašoma sąmonė. Dideli opioidų bolusai šoke ir benzodiazepinų derinys – klaidos (#43, Skausmo malšinimas).",
    "ref": [
     "#/igudis/43",
     "#/vaistas/ketaminas",
     "#/p/skausmas"
    ]
   },
   {
    "sit": "Po 5 min skausmas 5/10, atsirado nistagmas. Kvėpavimas ir AKS stabilūs.",
    "gp": {
     "AKS": "102/64",
     "KD": "16",
     "SpO₂": "97 %"
    },
    "klaus": "Ar kartoti ketamino dozę dabar?",
    "opt": [
     {
      "t": "Taip – kartoti kas 5 min, kol skausmas bus 0–2/10",
      "ok": false
     },
     {
      "t": "Ne – tikslas pasiektas; stebėti ir vertinti skausmą iš naujo",
      "ok": true
     },
     {
      "t": "Ne – vietoje ketamino papildyti midazolamu",
      "ok": false
     }
    ],
    "why": "Ketamino tikslas – sumažėjęs skausmas (bent 3 balais) arba nistagmas; kartojama kas 30 min. Per greitai kartojant dozę šoke – kumuliacija (#43).",
    "ref": [
     "#/p/skausmas",
     "#/vaistas/ketaminas",
     "#/igudis/43"
    ]
   },
   {
    "sit": "Pacientas pradeda pykinti, atsiranda seilėtekis. Sąmonė ta pati.",
    "gp": {
     "AVPU": "A",
     "SpO₂": "96 %"
    },
    "klaus": "Ką daryti?",
    "opt": [
     {
      "t": "Nutraukti analgeziją ir duoti naloksono",
      "ok": false
     },
     {
      "t": "Laukti – pykinimas praeis savaime",
      "ok": false
     },
     {
      "t": "Ondansetronas 4 mg IV, paruoštas atsiurbimas",
      "ok": true
     }
    ],
    "why": "Po ketamino – seilėtekis, turėkite atsiurbimą; pykinimui – ondansetronas 4 mg. Naloksonas – opioidų, ne ketamino antagonistas (Skausmo malšinimas).",
    "ref": [
     "#/vaistas/ondansetronas",
     "#/p/skausmas",
     "#/vaistas/naloksonas"
    ]
   }
  ]
 },
 {
  "id": "s10",
  "pav": "Nuo pirminės iki perdavimo",
  "tema": "Kita",
  "q": [
   {
    "sit": "Pirminė apžiūra baigta, gyvybei pavojingos būklės sutvarkytos. Karys po apšaudymo ištrauktas iš vandens griovio, drabužiai šlapi, dreba.",
    "gp": {
     "T": "34,6 °C",
     "AKS": "112/70",
     "ŠSD": "104"
    },
    "klaus": "Kaip valdoma hipotermija?",
    "opt": [
     {
      "t": "Užkloti keliomis antklodėmis ant šlapių drabužių",
      "ok": false
     },
     {
      "t": "Nuimti šlapius drabužius, priverstinio oro šildymo antklodė, skysčiai per šildytuvą",
      "ok": true
     },
     {
      "t": "Temperatūrą matuoti vėliau, po KT",
      "ok": false
     }
    ],
    "why": "Šlapi drabužiai ir vien pasyvus šildymas antklodėmis – klaidos. Aktyvus šildymas ir šildyti skysčiai, kartotinai matuojant (#19).",
    "ref": [
     "#/igudis/19",
     "#/s/c-ant"
    ]
   },
   {
    "sit": "Antrinės apžiūros metu A tikrina veidą. Rašytojas praneša, kad AKS krinta, pacientas tampa mieguistas.",
    "gp": {
     "AKS": "78/45",
     "ŠSD": "132",
     "AVPU": "V"
    },
    "klaus": "Ką daro A?",
    "opt": [
     {
      "t": "STOP – iš naujo pirminė apžiūra nuo cABC, antrinė vėliau",
      "ok": true
     },
     {
      "t": "Baigti antrinę apžiūrą, kad nieko nepraleistų",
      "ok": false
     },
     {
      "t": "Mieguistumą aiškinti hipotermija ir tęsti",
      "ok": false
     }
    ],
    "why": "Būklei pablogėjus – iš naujo pirminė apžiūra, tik tada antrinė; neatlikti elementai – į problemų sąrašą. Pakitusi sąmonė gali būti šokas (#42, #12).",
    "ref": [
     "#/igudis/42",
     "#/s/stop",
     "#/s/antrine"
    ]
   },
   {
    "sit": "Pacientas stabilizuotas, perkeliamas į operacinę. Ant dilbio – turniketas, veikia 2 PVK, skirti vaistai.",
    "gp": {
     "AKS": "104/66",
     "ŠSD": "102"
    },
    "klaus": "Kaip atliekamas perdavimas?",
    "opt": [
     {
      "t": "Dokumentai lieka skyriuje, informacija perduodama telefonu",
      "ok": false
     },
     {
      "t": "Pacientas uždengiamas antklode kartu su turniketu, kad nešaltų",
      "ok": false
     },
     {
      "t": "ATMIST tiesiogiai priimančiam medikui, dokumentai su laikais prie paciento, turniketas matomas",
      "ok": true
     }
    ],
    "why": "Perduodama tiesiogiai ir struktūruotai (ATMIST), dokumentai keliauja su pacientu, turniketai lieka matomi. Pacientas perduotas, kai priimantis perėmė stebėseną (#46).",
    "ref": [
     "#/igudis/46",
     "#/s/atmist",
     "#/s/a-plan"
    ]
   }
  ]
 },
 {
  "id": "s11",
  "pav": "Kirkšnis po skeveldros",
  "tema": "Kraujavimas",
  "q": [
   {
    "sit": "Patrulį apšaudė minosvaidžiais. Karys atvežamas į Role 1 su skeveldros žaizda dešinėje kirkšnyje – iš jos gausiai bėga ryškiai raudonas kraujas. A paskelbė „Masyvus kraujavimas“.",
    "gp": {
     "AVPU": "V",
     "ŠSD": "128"
    },
    "klaus": "Kaip B ir C stabdo kraujavimą?",
    "opt": [
     {
      "t": "Kumščiu spaudžia kirkšnies duobę, tada hemostatinę marlę kemša tiesiai į kraujavimo šaltinį",
      "ok": true
     },
     {
      "t": "Galūnės turniketas kuo aukščiau ant šlaunies – to pakaks ir kirkšnies žaizdai",
      "ok": false
     },
     {
      "t": "Hemostatinė marlė dedama ant žaizdos paviršiaus ir apvyniojama spaudžiamuoju tvarsčiu",
      "ok": false
     }
    ],
    "why": "Kirkšnis – jungtis, kur galūnės turniketo uždėti negalima: iškart tiesioginis spaudimas kumščiu, tada marlė į kraujavimo šaltinį, kol užpildoma ertmė. Marlė ant paviršiaus – klaida (#36).",
    "ref": [
     "#/igudis/36",
     "#/s/esc-kraujas"
    ]
   },
   {
    "sit": "Žaizda sutamponuota hemostatine marle, C spaudžia nepertraukiamai 3 min. Atleidus spaudimą per marlę vėl sunkiasi kraujas.",
    "gp": {
     "AKS": "96/62",
     "ŠSD": "126"
    },
    "klaus": "Ką daryti dabar?",
    "opt": [
     {
      "t": "Ant viršaus dėti daugiau marlės ir stipriau suveržti tvarstį",
      "ok": false
     },
     {
      "t": "Kas 30 s atleisti spaudimą ir tikrinti, ar kraujavimas sustojo",
      "ok": false
     },
     {
      "t": "Hemostatinę marlę išimti, tamponuoti iš naujo ir vėl spausti ≥ 3 min",
      "ok": true
     }
    ],
    "why": "Tebekraujuojant hemostatinė marlė išimama ir žaizda tamponuojama iš naujo, vėl spaudžiama ≥ 3 min. Marlė pridedama tik paprasta (spaudžiama 10 min) (#36).",
    "ref": [
     "#/igudis/36"
    ]
   },
   {
    "sit": "Po pakartotinio tamponavimo kraujavimas sustojo. C paruošė jungčių turniketą (SAM JT).",
    "gp": {
     "AKS": "94/60",
     "ŠSD": "124"
    },
    "klaus": "Kaip uždedamas jungčių turniketas?",
    "opt": [
     {
      "t": "Tamponas išimamas ir JT dedamas tiesiai ant atviros žaizdos",
      "ok": false
     },
     {
      "t": "Ant sutamponuotos žaizdos: pagalvėlė virš šlaunies arterijos žemiau kirkšnies raiščio, pūsti, kol kraujavimas sustos",
      "ok": true
     },
     {
      "t": "Pripučiamas iki didžiausio slėgio; laiko užrašyti nereikia – tai ne galūnės turniketas",
      "ok": false
     }
    ],
    "why": "Jungčių turniketas dedamas ant sutamponuotos žaizdos, pagalvėlė – virš šlaunies arterijos pulso žemiau kirkšnies raiščio; pučiama, kol kraujavimas sustoja. Jo uždėjimo laikas užrašomas būtinai (#36).",
    "ref": [
     "#/igudis/36",
     "#/s/esc-kraujas"
    ]
   }
  ]
 },
 {
  "id": "s12",
  "pav": "Kaklo žaizda po SSU",
  "tema": "Kraujavimas",
  "q": [
   {
    "sit": "Kolonos priekinė mašina užvažiavo ant SSU. Karys atvežamas su skeveldros žaizda kairėje kaklo pusėje – kraujas srūva pro pridėtą tvarstį. Karys sumišęs, kalba.",
    "gp": {
     "AVPU": "V",
     "KD": "24",
     "ŠSD": "122"
    },
    "klaus": "Ką pirmiausia skelbia A?",
    "opt": [
     {
      "t": "Planas A: pirma intubacija, nes kaklo žaizda gresia kvėpavimo takams",
      "ok": false
     },
     {
      "t": "„Masyvus kraujavimas“: B ir C – tiesioginis spaudimas ir tamponavimas",
      "ok": true
     },
     {
      "t": "C pirma įveda 2 PVK ir pradeda skysčius, spaudimas – vėliau",
      "ok": false
     }
    ],
    "why": "cABC: masyvus kraujavimas stabdomas prieš kvėpavimo takus. Kaklas – jungtis, kraujavimas stabdomas tiesioginiu spaudimu ir tamponavimu, kraujavimą stabdo B ir C (#35, #36).",
    "ref": [
     "#/s/esc-kraujas",
     "#/igudis/36",
     "#/igudis/35"
    ]
   },
   {
    "sit": "Žaizda sutamponuota hemostatine marle ir spausta 3 min – kraujavimas sustojo. Reikia uždėti spaudžiamąjį tvarstį.",
    "gp": {
     "AKS": "102/66",
     "ŠSD": "116",
     "SpO₂": "96 %"
    },
    "klaus": "Kaip tvarstomas kaklas?",
    "opt": [
     {
      "t": "Ant tampono spaudimo plokštelė ir tvirtas žiedinis tvarstis aplink kaklą",
      "ok": false
     },
     {
      "t": "Ratu aplink kaklą kuo stipriau, kad tamponas nepasislinktų",
      "ok": false
     },
     {
      "t": "Aplink kaklą ir po priešinga pažastimi, be spaudimo plokštelės; stebėti kvėpavimo takus",
      "ok": true
     }
    ],
    "why": "Kaklo tvarstis vedamas aplink kaklą ir po priešinga pažastimi, be spaudimo plokštelės, stebint kvėpavimo takus. Spaudimo plokštelė ant kaklo – klaida (#36).",
    "ref": [
     "#/igudis/36"
    ]
   },
   {
    "sit": "C nustatė kraujo grupę EldonCard kortele – B Rh−. Šoko požymiai išlieka, A paskyrė eritrocitų.",
    "gp": {
     "AKS": "90/58",
     "ŠSD": "124"
    },
    "klaus": "Kurių grupių eritrocitus galima perpilti?",
    "opt": [
     {
      "t": "O− arba B−",
      "ok": true
     },
     {
      "t": "O+ arba B+ – ABO sutampa, Rh nesvarbu",
      "ok": false
     },
     {
      "t": "Tik B− – O grupės eritrocitų negalima",
      "ok": false
     }
    ],
    "why": "Pagal kraujo suderinamumo lentelę B− recipientui tinka O− ir B− eritrocitai. O− – universalus eritrocitų donoras (#23).",
    "ref": [
     "#/p/kraujas",
     "#/igudis/23"
    ]
   }
  ]
 },
 {
  "id": "s13",
  "pav": "Abi kojos po minos",
  "tema": "Kraujavimas",
  "q": [
   {
    "sit": "Patrulio karys užlipo ant priešpėstinės minos. Atvežamas su dviem kovos mediko uždėtais turniketais ant kelnių: kairėje – blauzdos amputacija, dešinėje – gili blauzdos žaizda. Laikas užrašytas prieš 35 min.",
    "gp": {
     "AVPU": "V",
     "AKS": "94/58",
     "ŠSD": "128"
    },
    "klaus": "Kaip komanda elgiasi su turniketais?",
    "opt": [
     {
      "t": "Abu iškart nuima, kad B galėtų apžiūrėti žaizdas",
      "ok": false
     },
     {
      "t": "A perima uždėjimo laiką, B atidengia ir vertina kiekvieną; ant drabužių uždėtus perkelia C",
      "ok": true
     },
     {
      "t": "Palieka ant kelnių ir uždengia antklode, kad karys nešaltų",
      "ok": false
     }
    ],
    "why": "Atvežtam su turniketu A perima laiką, B atidengia ir vertina kiekvieną turniketą; ant drabužių uždėtą C (padeda B) perkelia lėtai, stebėdamas kraujavimą. Uždengtas turniketas – klaida (#35).",
    "ref": [
     "#/igudis/35",
     "#/s/esc-kraujas"
    ]
   },
   {
    "sit": "Dešinėje kojoje naujas turniketas uždėtas ant odos 5–8 cm virš žaizdos. Kraujavimas sustojo, bet B dar čiuopia pėdos pulsą.",
    "gp": {
     "AKS": "92/56",
     "ŠSD": "130"
    },
    "klaus": "Ką daryti?",
    "opt": [
     {
      "t": "Pakanka – kraujavimas sustojo, o pulsas rodo gerą kraujotaką",
      "ok": false
     },
     {
      "t": "Antrą turniketą dėti žemiau pirmojo, arčiau žaizdos",
      "ok": false
     },
     {
      "t": "Suveržti, kol dings distalinis pulsas; nepakanka – antras turniketas greta, proksimaliau",
      "ok": true
     }
    ],
    "why": "Veiksmingas turniketas – kraujavimas sustojęs IR nečiuopiamas distalinis pulsas. Nepakankamas suveržimas – dažna klaida; antras turniketas dedamas proksimaliau pirmojo (#35).",
    "ref": [
     "#/igudis/35"
    ]
   },
   {
    "sit": "Kraujavimas sustabdytas, bet C praneša: hemoraginis šokas – taip. Kario žetone nurodyta grupė A Rh+, EldonCard dar neatlikta.",
    "gp": {
     "AVPU": "V",
     "AKS": "84/50",
     "ŠSD": "134"
    },
    "klaus": "Kokį kraują perpilti?",
    "opt": [
     {
      "t": "O grupės kraują nedelsiant; žetono grupė – tik palyginimui",
      "ok": true
     },
     {
      "t": "A+ kraują pagal žetoną – taip tiksliau ir greičiau",
      "ok": false
     },
     {
      "t": "Nieko neperpilti, kol EldonCard nepatvirtins žetono grupės",
      "ok": false
     }
    ],
    "why": "Grupės nustatymas neturi vėlinti O kraujo perpylimo šokui. Žetone nurodyta grupė – tik palyginimui: perpilama nustatyta grupė arba O (#23).",
    "ref": [
     "#/igudis/23",
     "#/p/kraujas",
     "#/s/c-pir"
    ]
   }
  ]
 },
 {
  "id": "s14",
  "pav": "Nepavykęs PVK",
  "tema": "Šokas",
  "q": [
   {
    "sit": "Artilerijos skeveldros sužeidė karį į pilvą ir dešinę blauzdą (atviras lūžis). Rankos šaltos, venų nesimato. C per 90 s du kartus nesėkmingai bandė įvesti PVK.",
    "gp": {
     "AVPU": "V",
     "AKS": "86/54",
     "ŠSD": "132"
    },
    "klaus": "Ką daro C?",
    "opt": [
     {
      "t": "Bando dar kartą kitoje rankoje – IO tik gydytojo nurodymu",
      "ok": false
     },
     {
      "t": "Laukia, kol karys sušils ir venos išryškės",
      "ok": false
     },
     {
      "t": "Įveda IO adatą dabar – be A nurodymo",
      "ok": true
     }
    ],
    "why": "Po 2–3 nesėkmingų bandymų ar > 90 s – IO. C ją įveda be A nurodymo; per ilgai bandyti PVK gaivinamam – klaida (#21, #22).",
    "ref": [
     "#/igudis/21",
     "#/igudis/22",
     "#/s/c-pir"
    ]
   },
   {
    "sit": "C pasiruošė IO grąžtą, 15 G adatą ir užpildytą liniją. Dešinė blauzda lūžusi.",
    "gp": {
     "AKS": "84/52",
     "ŠSD": "134"
    },
    "klaus": "Kur ir kaip durti?",
    "opt": [
     {
      "t": "Žastikaulis: ranka prie kūno, delnas ant bambos, 45° į didįjį gumburą",
      "ok": true
     },
     {
      "t": "Dešinysis blauzdikaulis – vieta paprasčiausia, o lūžis yra žemiau",
      "ok": false
     },
     {
      "t": "Žastikaulis: ranka atitraukta į šoną delnu aukštyn, durti 90° kampu",
      "ok": false
     }
    ],
    "why": "Į lūžusį kaulą nedurti. Žastikaulis – didžiausias srautas: ranka prie kūno, delnas ant bambos, didysis gumburas, 45° kampu (#22).",
    "ref": [
     "#/igudis/22"
    ]
   },
   {
    "sit": "IO įvesta, aspiruotas kaulų čiulpų turinys. Prijungtas šildytas kraujas, bet jis savaime teka labai lėtai.",
    "gp": {
     "AKS": "82/50",
     "ŠSD": "132"
    },
    "klaus": "Kas teisinga?",
    "opt": [
     {
      "t": "Spaudimo nereikia – kraujas teka, svarbu nepažeisti čiulpų",
      "ok": false
     },
     {
      "t": "Greitai praplauti 10 ml NaCl, infuzuoti su spaudimo maišu, tikrinti, ar audiniai netinsta",
      "ok": true
     },
     {
      "t": "Srautas mažas – adatą ištraukti ir gręžti iš naujo tame pačiame kaule",
      "ok": false
     }
    ],
    "why": "Per IO infuzuojama tik su spaudimu; po praplovimo tikrinama, ar audiniai netinsta. Infuzija be spaudimo ir pakartotinis dūris į tą patį kaulą – klaidos (#22).",
    "ref": [
     "#/igudis/22",
     "#/igudis/27"
    ]
   }
  ]
 },
 {
  "id": "s15",
  "pav": "Transfuzija lauko punkte",
  "tema": "Šokas",
  "q": [
   {
    "sit": "Karys sužeistas drono numesta granata į šlaunį. Žaizda sutamponuota, C praneša: hemoraginis šokas – taip. Iš transportavimo dėžės ką tik išimtas O grupės kraujo vienetas.",
    "gp": {
     "AVPU": "V",
     "AKS": "86/52",
     "ŠSD": "128"
    },
    "klaus": "Kas turi būti užtikrinta pradedant perpylimą?",
    "opt": [
     {
      "t": "Kraujas tiesiai iš dėžės per spaudimo maišą, be šildytuvo – svarbiausia greitis",
      "ok": false
     },
     {
      "t": "Kraujavimas sustabdytas, veikia ≥ 18 G PVK ar IO, skirta TXA; sistema su filtru per šildytuvą",
      "ok": true
     },
     {
      "t": "Pirma 1 l kristaloidų linijai patikrinti, tik tada kraujas",
      "ok": false
     }
    ],
    "why": "Prieš perpylimą: kraujavimas sustabdytas, veikia PVK (≥ 18 G) ar IO, skirta TXA. Kraujas leidžiamas per filtrą ir šildytuvą (38 °C), per 30 min nuo išėmimo iš dėžės (#23).",
    "ref": [
     "#/igudis/23",
     "#/s/c-pir"
    ]
   },
   {
    "sit": "Pirmasis vienetas perpiltas per kairės rankos 18 G PVK, linija laisva. Dešinės rankos PVK vieta paburkusi, pabalusi ir vėsi. A paskiria kalcį.",
    "gp": {
     "AKS": "94/58",
     "ŠSD": "118"
    },
    "klaus": "Kaip skiriamas kalcis?",
    "opt": [
     {
      "t": "Per veikiantį kairės rankos PVK, lėtai; abejotiną dešinės PVK ištraukti",
      "ok": true
     },
     {
      "t": "Į dešinės rankos PVK – tinimas nedidelis, o kairė linija reikalinga krauju",
      "ok": false
     },
     {
      "t": "Kalcio dar nereikia – jis skiriamas tik pradėjus masinę transfuziją",
      "ok": false
     }
    ],
    "why": "Kalcis skiriamas po pirmojo perpilto vieneto. Tinstantis, pabalęs, vėsus PVK neveikia – jį ištraukite; dirginančių vaistų (kalcio) į abejotiną PVK neleiskite (#21, #23).",
    "ref": [
     "#/vaistas/kalcis",
     "#/igudis/21",
     "#/igudis/23"
    ]
   },
   {
    "sit": "Lašinant antrąjį vienetą karys pradeda dusti, skundžiasi nugaros skausmu, karščiuoja, AKS krenta; kateterio maiše – rausvas šlapimas.",
    "gp": {
     "T": "38,6 °C",
     "AKS": "78/46",
     "ŠSD": "136",
     "KD": "28"
    },
    "klaus": "Ką daro C?",
    "opt": [
     {
      "t": "Sulėtina perpylimą ir skiria paracetamolio nuo karščiavimo",
      "ok": false
     },
     {
      "t": "Hipotenzija – perpylimą paspartina spaudimo maišu",
      "ok": false
     },
     {
      "t": "Perpylimą nedelsiant stabdo, tęsia NaCl ir praneša A",
      "ok": true
     }
    ],
    "why": "Dusulys, hipotenzija, karščiavimas, nugaros skausmas, hemoglobinurija – įtariama transfuzijos reakcija: perpylimas nedelsiant stabdomas, tęsiamas NaCl, pranešama A (#23).",
    "ref": [
     "#/igudis/23"
    ]
   }
  ]
 },
 {
  "id": "s16",
  "pav": "Šūvis į pažastį",
  "tema": "Kraujavimas",
  "q": [
   {
    "sit": "Snaiperio kulka pataikė kariui į dešinę pažastį pro šarvinės liemenės kraštą. Įvežant A 5 s apžiūroje: nereaguoja, kvėpuoja agoniškai, centrinio pulso nėra. Komandoje – A, B, C ir rašytojas.",
    "gp": {
     "AVPU": "U"
    },
    "klaus": "Kaip dirba komanda?",
    "opt": [
     {
      "t": "HOTT vienu metu: kraujavimo stabdymas ir IO, kvėpavimo takai, abipusė dekompresija; paspaudimai – jei pakanka rankų",
      "ok": true
     },
     {
      "t": "C pradeda nepertraukiamus krūtinės paspaudimus, A ruošia adrenaliną, kita – po ROSC",
      "ok": false
     },
     {
      "t": "Pirma e-FAST tamponadai atmesti, tada sprendžiama dėl kraujavimo ir dekompresijos",
      "ok": false
     }
    ],
    "why": "TCA išgyvenimas priklauso nuo grįžtamų priežasčių šalinimo vienu metu. Paspaudimai – tik jei netrukdo HOTT veiksmams ir pakanka rankų; ultragarsas neturi vėlinti gydymo (#39).",
    "ref": [
     "#/igudis/39",
     "#/s/esc-tss"
    ]
   },
   {
    "sit": "B ir C sutamponavo pažasties žaizdą hemostatine marle ir spaudė 3 min – kraujavimas sustojo. C per IO lašina šildytą kraują.",
    "gp": {
     "AVPU": "U"
    },
    "klaus": "Kaip sutvarstoma pažastis?",
    "opt": [
     {
      "t": "Turniketas kuo aukščiau ant žasto – jis stabdys ir pažasties kraujavimą",
      "ok": false
     },
     {
      "t": "Ranka atitraukta 90°, tvarstis aštuoniuke per petį ir po priešinga pažastimi",
      "ok": true
     },
     {
      "t": "Ranka prispausta prie kūno ir apvyniota kartu su krūtine",
      "ok": false
     }
    ],
    "why": "Pažastis – jungtis, kur turniketo uždėti negalima. Po tamponavimo ranka atitraukiama 90°, tvarstis vedamas aštuoniuke per petį ir po priešinga pažastimi (#36).",
    "ref": [
     "#/igudis/36",
     "#/igudis/39"
    ]
   },
   {
    "sit": "Kraujavimas sustabdytas, perpilti šildyti kraujo vienetai, A ventiliuoja 100 % O₂ per laringinę kaukę, B atliko abipusę dekompresiją. Monitoriuje išlieka asistolija.",
    "gp": {
     "AVPU": "U"
    },
    "klaus": "Koks tolesnis sprendimas?",
    "opt": [
     {
      "t": "Pradėti standartinį ALS su adrenalinu kas kelias minutes",
      "ok": false
     },
     {
      "t": "Tęsti krūtinės paspaudimus, kol bus pervežtas į chirurgijos skyrių",
      "ok": false
     },
     {
      "t": "Grįžtamos priežastys pašalintos – komandos sprendimu konstatuojama mirtis",
      "ok": true
     }
    ],
    "why": "Pašalinus grįžtamas priežastis ir perpylus kraują, išliekant asistolijai, komandos sprendimu konstatuojama mirtis. Adrenalino nauda TCA neįrodyta (#39).",
    "ref": [
     "#/igudis/39",
     "#/s/esc-tss"
    ]
   }
  ]
 },
 {
  "id": "s17",
  "pav": "Pavėluota konversija",
  "tema": "Kraujavimas",
  "q": [
   {
    "sit": "Dėl dronų grėsmės evakuacija užtruko: karys su skeveldros žaizda dilbyje atvežamas po 3,5 val. Turniketas ant žasto uždėtas ant rankovės. Pirminė apžiūra baigta – šoko nėra.",
    "gp": {
     "AVPU": "A",
     "AKS": "128/78",
     "ŠSD": "94"
    },
    "klaus": "Kas teisinga dėl turniketo konversijos?",
    "opt": [
     {
      "t": "Praėjo > 2 val. – turniketą reikia nuimti vienu kartu, kad galūnė atsigautų",
      "ok": false
     },
     {
      "t": "Ją iškart atlieka B pirminėje apžiūroje, šoko kriterijus nesvarbus",
      "ok": false
     },
     {
      "t": "Antrinėje apžiūroje C (padeda B), patikrinęs 3 kriterijus; 2–6 val. – pilkoji zona",
      "ok": true
     }
    ],
    "why": "Konversiją antrinėje apžiūroje atlieka C, padeda B, jei nėra šoko, žaizdą galima stebėti ir tai ne amputacija. 2–6 val. – pilkoji zona: acidozė, hiperkalemija, mioglobinas (#26).",
    "ref": [
     "#/igudis/26",
     "#/s/c-ant"
    ]
   },
   {
    "sit": "Naujas turniketas uždėtas ant odos 5–8 cm virš žaizdos, senasis lėtai atleistas. Žaizda sutamponuota hemostatine marle, spausta 3 min, uždėtas spaudžiamasis tvarstis.",
    "gp": {
     "AKS": "126/76",
     "ŠSD": "92"
    },
    "klaus": "Kaip atleidžiamas turniketas?",
    "opt": [
     {
      "t": "Lėtai, per ≥ 1 min, stebint tvarstį; atleistas paliekamas ant galūnės",
      "ok": true
     },
     {
      "t": "Staigiai atleidžiamas ir nuimamas nuo rankos, kad netrukdytų",
      "ok": false
     },
     {
      "t": "Per 1 min; kraujavimui atsinaujinus – tik stipriau suveržiamas tvarstis",
      "ok": false
     }
    ],
    "why": "Turniketas atleidžiamas lėtai (≥ 1 min), stebint tvarstį, ir paliekamas ant galūnės. Kraujavimas atsinaujino ar galūnė cianotiška, šalta – turniketas vėl užveržiamas (#26).",
    "ref": [
     "#/igudis/26"
    ]
   },
   {
    "sit": "Po 10 min monitoriuje atsiranda EKG pokyčių, įtariama hiperkalemija. Tvarstis sausas, kraujavimo nėra.",
    "gp": {
     "AKS": "112/70",
     "ŠSD": "88"
    },
    "klaus": "Ką skiria C gydytojo nurodymu?",
    "opt": [
     {
      "t": "Vėl užveržia turniketą, kad kalis nepatektų į kraujotaką",
      "ok": false
     },
     {
      "t": "Kalcio gliukonatą IV stebint EKG; gliukozę su insulinu",
      "ok": true
     },
     {
      "t": "Noradrenalino infuziją aritmijai ir AKS palaikyti",
      "ok": false
     }
    ],
    "why": "Hiperkalemijai su EKG pokyčiais – kalcio gliukonatas IV stebint EKG, gliukozė su insulinu (#27). Turniketas vėl užveržiamas tik atsinaujinus kraujavimui ar esant galūnės išemijai (#26).",
    "ref": [
     "#/igudis/26",
     "#/vaistas/kalcis",
     "#/igudis/27"
    ]
   }
  ]
 },
 {
  "id": "s18",
  "pav": "Žiemos operacija",
  "tema": "Šokas",
  "q": [
   {
    "sit": "Žiemos operacija, −15 °C. Karys sužeistas minosvaidžio skeveldromis į šlaunį ir pilvą, 50 min vežtas atviru visureigiu; uniforma šlapia nuo sniego ir kraujo. Šlaunies turniketas veikia.",
    "gp": {
     "T": "34,2 °C",
     "AKS": "90/56",
     "ŠSD": "126",
     "AVPU": "V"
    },
    "klaus": "Kuris teiginys teisingas?",
    "opt": [
     {
      "t": "Hipotermija blogina krešėjimą – mirtino rombo dalis su acidoze, koaguliopatija, hipokalcemija",
      "ok": true
     },
     {
      "t": "Lengva hipotermija apsaugo audinius – šildyti tik po operacijos",
      "ok": false
     },
     {
      "t": "Kol turniketas veikia, hipotermija kraujavimui reikšmės neturi",
      "ok": false
     }
    ],
    "why": "Hipotermija traumos pacientui blogina krešėjimą ir didina mirtingumą; ji – mirtino rombo dalis. Šildoma nuo atvykimo (#19, #40).",
    "ref": [
     "#/igudis/19",
     "#/igudis/40"
    ]
   },
   {
    "sit": "Šlapi drabužiai nuimti. Visureigyje liko šalti kristaloidai, punkte – kraujo komponentai transportavimo dėžėje. A klausia C dėl skysčių.",
    "gp": {
     "T": "34,0 °C",
     "AKS": "86/52",
     "ŠSD": "130"
    },
    "klaus": "Kas teisinga?",
    "opt": [
     {
      "t": "Pirma 2 l kristaloidų iš visureigio, kraujas – tik po jų",
      "ok": false
     },
     {
      "t": "Šildytuvas nebūtinas, jei karys gerai uždengtas antklodėmis",
      "ok": false
     },
     {
      "t": "Kraujo komponentai su filtru per šildytuvą (38 °C); kristaloidus riboti",
      "ok": true
     }
    ],
    "why": "Hemoraginiam šokui – šildyti kraujo komponentai, kristaloidai ribojami: daug šaltų kristaloidų sukelia praskiedimo koaguliopatiją, acidozę ir hipotermiją (#27, #23).",
    "ref": [
     "#/igudis/27",
     "#/igudis/23",
     "#/s/c-pas"
    ]
   },
   {
    "sit": "Perpilti 2 šildyti vienetai, skirta TXA ir kalcis, uždėta priverstinio oro šildymo antklodė. Karys mieguistas, drebulys silpnėja.",
    "gp": {
     "T": "33,1 °C",
     "AKS": "92/58",
     "ŠSD": "118",
     "AVPU": "V"
    },
    "klaus": "Ką daryti toliau?",
    "opt": [
     {
      "t": "Drebulys silpnėja – karys šyla, temperatūros matuoti nebereikia",
      "ok": false
     },
     {
      "t": "Elgtis švelniai, EKG stebėsena, gliukozė; šildant galima staigi hipotenzija",
      "ok": true
     },
     {
      "t": "Drebulys stiprina skausmą – skirti didesnę opioidų dozę nei įprastai",
      "ok": false
     }
    ],
    "why": "Mieguistumas rodo vidutinę hipotermiją (JTS 32–34 °C): švelnus elgesys, EKG, gliukozė, kartotinis matavimas; šildant galima staigi hipotenzija. Analgetikus – ypač atsargiai (#19).",
    "ref": [
     "#/igudis/19",
     "#/s/c-ant"
    ]
   }
  ]
 },
 {
  "id": "s19",
  "pav": "Apvirtęs šarvuotis",
  "tema": "Šokas",
  "q": [
   {
    "sit": "Pratybose šarvuotis apvirto į griovį, karys buvo prispaustas per dubenį ir trenkėsi galva. Įgula uždėjo dubens diržą. B pastebi, kad diržas yra ant klubakaulių keterų.",
    "gp": {
     "AVPU": "V",
     "AKS": "84/50",
     "ŠSD": "132",
     "GKS": "11"
    },
    "klaus": "Ką daro B ir C?",
    "opt": [
     {
      "t": "Palieka kaip yra – uždėto diržo nejudinti",
      "ok": false
     },
     {
      "t": "Diržą nuima ir dubenį patikrina dar kartą, skėsdami",
      "ok": false
     },
     {
      "t": "Perkelia diržą iki didžiųjų gūbrių lygio, suriša kelius ir pėdas",
      "ok": true
     }
    ],
    "why": "Diržas veikia didžiųjų gūbrių lygyje – per aukštai, ant keterų, uždėtas neveikia. Dubens neskėsti; keliai ir pėdos surišami (#20).",
    "ref": [
     "#/igudis/20",
     "#/s/c-pir"
    ]
   },
   {
    "sit": "Diržas pataisytas, perpilamas šildytas kraujas. C siūlo apversti karį ant šono ir apžiūrėti nugarą prieš e-FAST.",
    "gp": {
     "AKS": "82/48",
     "ŠSD": "134"
    },
    "klaus": "Ką sprendžia A?",
    "opt": [
     {
      "t": "Versti dabar – nugaros apžiūra prieš e-FAST privaloma visada",
      "ok": false
     },
     {
      "t": "Vertimą atidėti – karys hemodinamiškai nestabilus, įtariamas dubens lūžis",
      "ok": true
     },
     {
      "t": "Versti, bet tik B vienam, kad C tęstų perpylimą",
      "ok": false
     }
    ],
    "why": "B su C apverčia pacientą prieš e-FAST, bet hemodinamiškai nestabiliam ar įtariant dubens lūžį vertimą A sprendimu atideda (#1, #17).",
    "ref": [
     "#/igudis/17",
     "#/igudis/1",
     "#/s/c-pir"
    ]
   },
   {
    "sit": "Skirta TXA ir kalcis. A primena, kad karys trenkėsi galva ir GKS 11. Chirurginė kontrolė dar nepasiekta.",
    "gp": {
     "AKS": "96/60",
     "ŠSD": "120",
     "GKS": "11"
    },
    "klaus": "Koks AKS tikslas?",
    "opt": [
     {
      "t": "sAKS 110–120 mm Hg iki chirurginės kontrolės",
      "ok": true
     },
     {
      "t": "VAKS 65 mm Hg – kaip visiems hemoraginiame šoke",
      "ok": false
     },
     {
      "t": "Noradrenalinu pakelti sAKS iki 140 mm Hg",
      "ok": false
     }
    ],
    "why": "Pagal ETC vertinimo lapą su galvos smegenų trauma tikslas – sAKS 110–120 mm Hg, be jos – VAKS 65 mm Hg. Vazopresoriai hemoraginio šoko negydo (#40).",
    "ref": [
     "#/igudis/40",
     "#/s/kokybe"
    ]
   }
  ]
 },
 {
  "id": "s20",
  "pav": "Šautinė į pilvą",
  "tema": "Šokas",
  "q": [
   {
    "sit": "Karys peršautas į pilvą žemiau šarvinės liemenės krašto. Dėl artilerijos ugnies evakuacija užtruko – traumos laikas užrašytas prieš 2 val. 40 min. C praneša: hemoraginis šokas – taip.",
    "gp": {
     "AVPU": "V",
     "AKS": "88/54",
     "ŠSD": "132"
    },
    "klaus": "Ar skirti TXA?",
    "opt": [
     {
      "t": "Taip, dabar – 2 g IV / IO lėtai, apie 20 min",
      "ok": true
     },
     {
      "t": "Ne – TXA veiksminga tik per pirmą valandą",
      "ok": false
     },
     {
      "t": "Taip, 2 g greita srove, kad spėtų iki 3 val.",
      "ok": false
     }
    ],
    "why": "TXA – kuo greičiau, ne vėliau kaip per 3 val. nuo sužalojimo. 2 g leidžiama lėtai, ne greičiau kaip 1 ml/min (~20 min): per greitai – hipotenzija.",
    "ref": [
     "#/vaistas/txa",
     "#/igudis/40"
    ]
   },
   {
    "sit": "Punkte yra šaltai laikyto mažo titro O grupės pilno kraujo, plazmos ir eritrocitų. A klausia, ką perpilti pirmiausia.",
    "gp": {
     "AKS": "86/52",
     "ŠSD": "134"
    },
    "klaus": "Kas perpilama pirmiausia?",
    "opt": [
     {
      "t": "Eritrocitai ir plazma 1:1 – pilnas kraujas tik jų pritrūkus",
      "ok": false
     },
     {
      "t": "Šaltai laikytas mažo titro O grupės pilnas kraujas",
      "ok": true
     },
     {
      "t": "Pirma 1 l kristaloidų, kraujas – jei AKS nepakils",
      "ok": false
     }
    ],
    "why": "Hemoraginiam šokui pirmenybė – šaltai laikytas mažo titro O grupės pilnas kraujas; komponentai 1:1:1 ar 1:1 – žemiau eilėje. Kristaloidais šokas negydomas (#40).",
    "ref": [
     "#/p/kraujas",
     "#/igudis/40",
     "#/igudis/23"
    ]
   },
   {
    "sit": "Pilnas kraujas baigėsi, šokas tebėra, evakuacija į chirurgiją vėluoja. Kuopoje yra iš anksto ištirtų O grupės donorų ir savanorių, kurių grupė žinoma tik iš žetono.",
    "gp": {
     "AKS": "80/48",
     "ŠSD": "138"
    },
    "klaus": "Kas teisinga?",
    "opt": [
     {
      "t": "Imti kraują iš bet kurio savanorio, kurio žetone ta pati grupė",
      "ok": false
     },
     {
      "t": "Šviežias pilnas kraujas netinka – toliau tik kristaloidai",
      "ok": false
     },
     {
      "t": "Iš anksto ištirtų donorų mažo titro O šviežias pilnas kraujas; neištirtas – tik mediko nurodymu",
      "ok": true
     }
    ],
    "why": "Antra pagal pirmenybę – iš anksto ištirtų donorų mažo titro O grupės šviežias pilnas kraujas. Žetono grupė – tik palyginimui; neištirtą šviežią pilną kraują – tik mediko nurodymu (#23).",
    "ref": [
     "#/p/kraujas",
     "#/igudis/23"
    ]
   }
  ]
 },
 {
  "id": "s21",
  "pav": "Skeveldros veide",
  "tema": "Kvėpavimas",
  "q": [
   {
    "sit": "Minosvaidžio sviedinio skeveldros sužalojo patrulio kario veidą. A 5 s apžiūroje: karys sujaudintas, girdimas burbuliavimas, burnoje kraujas ir išmušti dantys.",
    "gp": {
     "AVPU": "V",
     "KD": "30",
     "SpO₂": "86 %"
    },
    "klaus": "Ką A paskelbia?",
    "opt": [
     {
      "t": "Tęsiamas Planas A – pirma priimamas visas ATMIST",
      "ok": false
     },
     {
      "t": "Escape: kvėpavimo takų obstrukcija – B ruošia kriko rinkinį, kviečiama pagalba",
      "ok": true
     },
     {
      "t": "Escape: masyvus kraujavimas – C nedelsdamas pradeda kraujo perpylimą",
      "ok": false
     }
    ],
    "why": "5 s apžiūroje atpažinta obstrukcija – A garsiai skelbia Escape planą, nurodo B ruošti kriko rinkinį ir kviečia ekspertinę pagalbą (esc-kt, #1).",
    "ref": [
     "#/s/esc-kt",
     "#/s/a-pir",
     "#/igudis/1"
    ]
   },
   {
    "sit": "Kaklo trauma neatmesta, kitas narys laiko MILS. Burnoje krešuliai ir keli išmušti dantys.",
    "gp": {
     "SpO₂": "87 %"
    },
    "klaus": "Kaip A išvalo burną?",
    "opt": [
     {
      "t": "Yankauer antgaliu tiek, kiek mato, iki 10 s; dantis išima Magill žnyplėmis",
      "ok": true
     },
     {
      "t": "Pirštais aklai iššluoja dantis ir krešulius, tada uždeda kaukę",
      "ok": false
     },
     {
      "t": "Plonu kateteriu siurbia be pertraukos, kol burna bus visai švari",
      "ok": false
     }
    ],
    "why": "Daug kraujo – plataus spindžio Yankauer antgalis, kieti svetimkūniai – Magill žnyplės; siurbiama ne ilgiau kaip 10 s, tarp siurbimų oksigenuojama. Aklas valymas pirštais ir per siauras kateteris – klaidos (#3, #2).",
    "ref": [
     "#/igudis/3",
     "#/igudis/2"
    ]
   },
   {
    "sit": "Apatinis žandikaulis lūžęs, matomi ir vidurinės veido dalies lūžiai. Kraujas į burną teka nuolat, nors siurbiama; stumiant žandikaulį obstrukcija nemažėja.",
    "gp": {
     "SpO₂": "83 %",
     "ŠSD": "122"
    },
    "klaus": "Kas toliau?",
    "opt": [
     {
      "t": "Įdėti nazofaringinį vamzdelį, kad oras aplenktų kraujuojančią burną, ir toliau siurbti",
      "ok": false
     },
     {
      "t": "Pirma priekinė ir užpakalinė nosies tamponada, kvėpavimo takus spręsti sustabdžius kraujavimą",
      "ok": false
     },
     {
      "t": "Šoninė padėtis pažeista puse žemyn su MILS ir eskalavimas iki galutinio kvėpavimo tako",
      "ok": true
     }
    ],
    "why": "Gausiai kraujuojant iš veido – šoninė padėtis su MILS, vien atsiurbimo neužtenka – eskaluojama; pirma užtikrinami kvėpavimo takai (intubacija ar krikotiroidotomija), tik tada tamponada. NPA nededamas esant vidurinės veido dalies lūžiams (#3, #6).",
    "ref": [
     "#/igudis/3",
     "#/igudis/8",
     "#/igudis/6"
    ]
   }
  ]
 },
 {
  "id": "s22",
  "pav": "Be sąmonės po sprogimo",
  "tema": "Kvėpavimas",
  "q": [
   {
    "sit": "Šalia šarvuočio sprogo SSU, karį nubloškė kelis metrus. Atvežtas be kaklo įtvaro: reaguoja tik į skausmą, knarkia, ant pakaušio kraujosruva.",
    "gp": {
     "AVPU": "P",
     "KD": "10",
     "SpO₂": "91 %"
    },
    "klaus": "Kaip atveriami kvėpavimo takai?",
    "opt": [
     {
      "t": "Galvos atlošimas ir smakro pakėlimas – greičiausias būdas",
      "ok": false
     },
     {
      "t": "Žandikaulio stūmimas, o galva lengvai traukiama išilgai kaklui ištiesti",
      "ok": false
     },
     {
      "t": "Žandikaulio stūmimas, kitas narys laiko MILS – delnai ant speninių ataugų, be traukos",
      "ok": true
     }
    ],
    "why": "Sprogimas – kaklo traumos rizika: žandikaulio stūmimas ir MILS, galva neutraliai be traukos. Knarkimas – užkritęs liežuvis; galvos atlošimas įtariant kaklo traumą – klaida (#2, #4, #31).",
    "ref": [
     "#/igudis/2",
     "#/igudis/31"
    ]
   },
   {
    "sit": "Kol žandikaulis laikomas, takai laisvi, bet jį atleidus knarkimas grįžta. Vėmimo reflekso nėra.",
    "gp": {
     "AVPU": "P",
     "SpO₂": "93 %"
    },
    "klaus": "Kaip A parenka ir įveda orofaringinį vamzdelį?",
    "opt": [
     {
      "t": "Renkasi ilgesnį – tvirčiau prilaikys liežuvį; įveda iškart tiesiai į ryklę",
      "ok": false
     },
     {
      "t": "Dydis – nuo kandžių iki žandikaulio kampo; atsiurbęs įveda apverstą ir pasuka 180°",
      "ok": true
     },
     {
      "t": "Renkasi trumpesnį – mažiau dirgins ryklę; įveda tiesiai iki plokščios dalies",
      "ok": false
     }
    ],
    "why": "OPA dydis – nuo kandžių iki apatinio žandikaulio kampo; burna atsiurbiama, vamzdelis įvedamas apverstas iki minkštojo gomurio ir pasukamas 180°. Per ilgas sukelia vėmimą, per trumpas nustumia liežuvį atgal (#6).",
    "ref": [
     "#/igudis/6"
    ]
   },
   {
    "sit": "OPA toleruojamas, uždėta kaukė su rezervuaru 15 l/min. Kvėpavimas paviršinis ir retas, pulsoksimetras rodo gerą SpO₂.",
    "gp": {
     "AVPU": "P",
     "KD": "6",
     "SpO₂": "95 %"
    },
    "klaus": "Ką daro A?",
    "opt": [
     {
      "t": "Ventiliuoja ambu maišu su O₂ dviese, 10–12/min, planuoja pažangią priemonę",
      "ok": true
     },
     {
      "t": "Palieka kaukę su rezervuaru – SpO₂ 95 % rodo, kad ventiliacija pakankama",
      "ok": false
     },
     {
      "t": "Ventiliuoja maišu kuo dažniau ir stipriau, kad būklė greičiau pagerėtų",
      "ok": false
     }
    ],
    "why": "Kvėpavimas retas ir paviršinis – reikia ventiliacijos ambu maišu, ne kaukės; gaunant daug O₂ normali SpO₂ neatmeta hipoventiliacijos. Toleruojamas OPA – neapsaugoti takai; per dažna ventiliacija – dažniausia klaida (#4, #5, #7).",
    "ref": [
     "#/igudis/7",
     "#/igudis/4",
     "#/igudis/6"
    ]
   }
  ]
 },
 {
  "id": "s23",
  "pav": "Nepavykusi intubacija – CICO",
  "tema": "Kvėpavimas",
  "q": [
   {
    "sit": "Drono numestos granatos skeveldros sužalojo kario apatinę veido dalį ir kaklą; kaklas tinsta, uždėtas kaklo įtvaras. Gydytojas nusprendė intubuoti RSI būdu.",
    "gp": {
     "AVPU": "V",
     "KD": "28",
     "SpO₂": "89 %"
    },
    "klaus": "Kas būtina prieš indukciją?",
    "opt": [
     {
      "t": "Aptarti planus A–D ir vaidmenis, paruošti bužą, laringinę kaukę ir kriko rinkinį",
      "ok": true
     },
     {
      "t": "Laringoskopuoti palikus uždėtą įtvarą, kad kaklas visiškai nejudėtų",
      "ok": false
     },
     {
      "t": "Atsarginį planą ir vaidmenis aptarti tik tada, jei pirmas bandymas nepavyks",
      "ok": false
     }
    ],
    "why": "Numatant sunkius kvėpavimo takus aptariami planai A–D (RSI → kaukė → laringinė kaukė → priekinė kaklo prieiga) ir paruošiama įranga. Laringoskopija su uždėtu įtvaru (vietoj jo – MILS) ir nesutartas atsarginis planas – klaidos (#9, #10).",
    "ref": [
     "#/igudis/9",
     "#/igudis/10",
     "#/p/kvepavimas"
    ]
   },
   {
    "sit": "Po trijų intubacijos bandymų vamzdelio įvesti nepavyko. SpO₂ krenta.",
    "gp": {
     "SpO₂": "84 %",
     "ŠSD": "124"
    },
    "klaus": "Ką daryti toliau?",
    "opt": [
     {
      "t": "Ketvirtas bandymas tuo pačiu laringoskopu – paskutinį kartą vaizdas jau buvo geresnis",
      "ok": false
     },
     {
      "t": "Palaukti, kol SpO₂ atsistatys savaime, ir tada bandyti intubuoti dar kartą",
      "ok": false
     },
     {
      "t": "Intubacijos nebekartoti – pereiti prie ventiliacijos kauke, tada laringinės kaukės",
      "ok": true
     }
    ],
    "why": "Vortex principas: kiekvienam būdui ne daugiau kaip 3 bandymai; nepasiteisinusio nekartokite, pereikite prie kito – kaukė, laringinė kaukė (#8, #10).",
    "ref": [
     "#/p/kvepavimas",
     "#/igudis/8",
     "#/igudis/10"
    ]
   },
   {
    "sit": "Nei kauke, nei laringine kauke oksigenuoti nepavyksta – paskelbtas CICO. Dėl tinimo krikotiroidinė membrana nečiuopiama.",
    "gp": {
     "SpO₂": "71 %",
     "ŠSD": "52"
    },
    "klaus": "Kaip atliekama krikotiroidotomija?",
    "opt": [
     {
      "t": "Skersinis dūris spėjamoje membranos vietoje, giliai, kad tikrai pasiektų trachėją",
      "ok": false
     },
     {
      "t": "Vertikalus 8–10 cm pjūvis, bukas preparavimas, tada skalpelis–bužas–vamzdelis",
      "ok": true
     },
     {
      "t": "Nečiuopiant membranos kriko neatliekama – toliau ventiliuoti ir laukti atvykstančio chirurgo",
      "ok": false
     }
    ],
    "why": "Membrana nečiuopiama – 8–10 cm vertikalus odos pjūvis ir bukas preparavimas pirštais, tada skalpelis–bužas–vamzdelis 6,0 mm, patvirtinama kapnografija. Klaidingi orientyrai ir per gilus dūris pažeidžia trachėją; delsimas – dažniausia klaida (#18).",
    "ref": [
     "#/igudis/18",
     "#/s/esc-kt"
    ]
   }
  ]
 },
 {
  "id": "s24",
  "pav": "Masyvus hemotoraksas",
  "tema": "Krūtinė",
  "q": [
   {
    "sit": "Artilerijos sviedinio skeveldra pataikė kariui į dešinį krūtinės šoną po liemene. B: dešinėje susilpnėję kvėpavimo garsai, perkutuojant duslus garsas, oda blyški ir šalta.",
    "gp": {
     "KD": "30",
     "SpO₂": "90 %",
     "AKS": "84/52",
     "ŠSD": "132"
    },
    "klaus": "Ką B praneša A?",
    "opt": [
     {
      "t": "Įtampos pneumotoraksas – reikia adatinės dekompresijos 2 tarpšonkaulyje",
      "ok": false
     },
     {
      "t": "Masyvus hemotoraksas – praneša iškart, nelaukdamas apžiūros pabaigos",
      "ok": true
     },
     {
      "t": "Šokas dėl kraujavimo iš galūnių – krūtinę įvertins po e-FAST",
      "ok": false
     }
    ],
    "why": "Duslus perkusijos garsas, susilpnėję garsai ir šokas – masyvus hemotoraksas; įtampos pneumotoraksui būdingas dėžinis garsas. Gyvybei pavojingą būklę B praneša A iškart (#13).",
    "ref": [
     "#/igudis/13",
     "#/p/kvepavimas",
     "#/s/b-pir"
    ]
   },
   {
    "sit": "A nurodo drenuoti. C įvedė 2 PVK, perpilami kraujo komponentai. Gydytojas B ruošiasi pleuros drenavimui.",
    "gp": {
     "AKS": "88/56",
     "SpO₂": "91 %"
    },
    "klaus": "Kaip įvedamas pleuros drenas?",
    "opt": [
     {
      "t": "7 tarpšonkaulis užpakalinėje pažasties linijoje – arčiau susikaupusio kraujo",
      "ok": false
     },
     {
      "t": "Pjūvis ties šonkaulio apatiniu kraštu, plonas 14 Fr drenas",
      "ok": false
     },
     {
      "t": "5 tarpšonkaulis, 1 cm prieš vidurinę pažasties liniją, virš šonkaulio, drenas 28–32 Fr",
      "ok": true
     }
    ],
    "why": "Vieta – 5 tarpšonkaulis ar aukščiau, 1 cm prieš vidurinę pažasties liniją; pleura pradurama bukai virš apatinio šonkaulio viršutinio krašto, drenas 28–32 Fr. Pjaunant po šonkauliu ar per žemai pažeidžiama diafragma, kepenys, blužnis (#14).",
    "ref": [
     "#/igudis/14"
    ]
   },
   {
    "sit": "Atleidus spaustuką iš karto išbėgo 1600 ml kraujo. AKS tebėra žemas.",
    "gp": {
     "AKS": "80/50",
     "ŠSD": "128"
    },
    "klaus": "Koks tolesnis veiksmas?",
    "opt": [
     {
      "t": "Skubiai chirurgas; kraujo komponentai pagal masinio kraujavimo protokolą",
      "ok": true
     },
     {
      "t": "Chirurgo reikės tik tuo atveju, jei toliau bėgs > 200 ml/val.",
      "ok": false
     },
     {
      "t": "Kristaloidų bolusas iki normalaus AKS, kraujo komponentai – vėliau",
      "ok": false
     }
    ],
    "why": "> 1500 ml iš karto arba > 200 ml/val. – skubiai chirurgas; išleidus hemotoraksą kraujavimas gali atsinaujinti. Gaivinama kraujo komponentais, kristaloidai ribojami (#14, #40).",
    "ref": [
     "#/igudis/14",
     "#/igudis/40",
     "#/s/esc-kraujas"
    ]
   }
  ]
 },
 {
  "id": "s25",
  "pav": "Nestabili krūtinės ląsta",
  "tema": "Krūtinė",
  "q": [
   {
    "sit": "Per pratybas apvirto šarvuotis; vairuotojas kairiu šonu trenkėsi į liuko kraštą. B: kairėje kraujosruvos, krepitacija, poodinė emfizema, paradoksinių judesių nematyti.",
    "gp": {
     "KD": "24",
     "SpO₂": "94 %",
     "AKS": "128/80",
     "ŠSD": "104"
    },
    "klaus": "Kaip B vertina radinius?",
    "opt": [
     {
      "t": "Paradoksinių judesių nėra – nestabili krūtinės ląsta atmesta, kartoti nereikia",
      "ok": false
     },
     {
      "t": "Krepitacija ir poodinė emfizema – iškart adatinė dekompresija abipus",
      "ok": false
     },
     {
      "t": "Nestabilios ląstos neatmesti – jaunam paradoksas išryškėja pavargus; kartoti",
      "ok": true
     }
    ],
    "why": "Jauniems lūžusius šonkaulius iš pradžių prilaiko raumenys – paradoksinis judesys išryškėja pavargus, radinius reikia kartoti. Abipusė dekompresija – trauminio širdies sustojimo atveju (#13, #38).",
    "ref": [
     "#/igudis/13",
     "#/p/kvepavimas"
    ]
   },
   {
    "sit": "Po 20 min kairės krūtinės segmentas įkvepiant įdumba, karys išsekęs, kalba tik trumpomis frazėmis. Kaukė su rezervuaru 15 l/min.",
    "gp": {
     "AVPU": "A",
     "KD": "34",
     "SpO₂": "87 %"
    },
    "klaus": "Ką sprendžia A?",
    "opt": [
     {
      "t": "Eskaluoja – kviečia ekspertinę pagalbą intubacijai ir DPV",
      "ok": true
     },
     {
      "t": "Keičia kaukę nosies kaniulėmis – karys jas geriau toleruos",
      "ok": false
     },
     {
      "t": "Laukia kraujo dujų rezultatų, tada spręs dėl intubacijos",
      "ok": false
     }
    ],
    "why": "Kvėpavimo dažnis > 30/min, išsekimas ir žema SpO₂ esant dideliam O₂ srautui – eskaluoti (intubacija, DPV); sunki krūtinės trauma – pažangios priemonės indikacija. Gydymo atidėti negalima (#4, #8).",
    "ref": [
     "#/igudis/4",
     "#/igudis/8"
    ]
   },
   {
    "sit": "Karys intubuotas ir ventiliuojamas. Po kelių minučių staiga krenta SpO₂ ir AKS, kairėje negirdėti kvėpavimo garsų.",
    "gp": {
     "SpO₂": "80 %",
     "AKS": "76/44",
     "ŠSD": "138"
    },
    "klaus": "Ką daro B (gydytojas)?",
    "opt": [
     {
      "t": "Padidina ventiliacijos dažnį ir tūrį",
      "ok": false
     },
     {
      "t": "Iškart pirštinė torakostomija kairėje, po jos drenas",
      "ok": true
     },
     {
      "t": "Skiria skysčių bolusą – hipotenzija dėl sedacijos",
      "ok": false
     }
    ],
    "why": "Teigiamo slėgio ventiliacija greitai sunkina įtampos pneumotoraksą; ventiliuojamam esant įtampai – iškart pirštinė torakostomija, po jos drenas. Hipotenzija po intubacijos – ne tik vaistai (#11, #14, #38).",
    "ref": [
     "#/igudis/38",
     "#/igudis/11",
     "#/igudis/14"
    ]
   }
  ]
 },
 {
  "id": "s26",
  "pav": "Pneumotoraksas po evakuacijos",
  "tema": "Krūtinė",
  "q": [
   {
    "sit": "Minos sprogimo banga nubloškė karį į šarvuočio bortą. Po 40 min evakuacijos atvežtas į Role 1; B pirminėje apžiūroje ryškių krūtinės radinių neranda, hemodinamika stabili.",
    "gp": {
     "KD": "22",
     "SpO₂": "95 %",
     "AKS": "124/78",
     "ŠSD": "98"
    },
    "klaus": "Ką B daro prieš e-FAST?",
    "opt": [
     {
      "t": "Su C apverčia karį „rąstu“ ir apžiūri nugarą",
      "ok": true
     },
     {
      "t": "Nugaros neapžiūri – trauma bukoji, žaizdų nesitikima",
      "ok": false
     },
     {
      "t": "Pirma e-FAST, nugarą palieka antrinei apžiūrai",
      "ok": false
     }
    ],
    "why": "Nugara apžiūrima kartu su C prieš e-FAST; vertimas atidedamas tik A sprendimu, jei pacientas nestabilus ar įtariamas dubens lūžis. e-FAST prieš nugaros apžiūrą – klaida (#16, #17).",
    "ref": [
     "#/igudis/17",
     "#/igudis/16",
     "#/s/b-pir"
    ]
   },
   {
    "sit": "Po 15 min karys skundžiasi dusuliu, kvėpuoja dažniau. e-FAST: kairėje nėra pleuros slydimo ir B linijų, dešinėje slydimas yra.",
    "gp": {
     "KD": "28",
     "SpO₂": "92 %",
     "AKS": "120/76"
    },
    "klaus": "Ką reiškia radinys?",
    "opt": [
     {
      "t": "Normalus vaizdas – B linijų nebuvimas rodo sveikus plaučius",
      "ok": false
     },
     {
      "t": "Kairės pusės pneumotoraksas – pranešti A, planuoti drenavimą",
      "ok": true
     },
     {
      "t": "Kairės pusės hemotoraksas – skubiai kviesti chirurgą",
      "ok": false
     }
    ],
    "why": "Nėra pleuros slydimo ir B linijų – pneumotoraksas; skystis rodytų hemotoraksą. Iškart po traumos radiniai gali būti normalūs – vertinkite iš naujo; radinius B praneša A (#16, #13, #14).",
    "ref": [
     "#/igudis/16",
     "#/igudis/13"
    ]
   },
   {
    "sit": "Įvestas pleuros drenas, prijungta povandeninė drenažo sistema. Karys ruošiamas tolesnei evakuacijai.",
    "gp": {
     "KD": "18",
     "SpO₂": "97 %"
    },
    "klaus": "Kaip elgtis su drenažo sistema pervežant?",
    "opt": [
     {
      "t": "Dreną užspausti spaustuku, kad pervežant niekas neištekėtų",
      "ok": false
     },
     {
      "t": "Butelį paguldyti ant paciento krūtinės, kad pervežant nenukristų ir nesudužtų",
      "ok": false
     },
     {
      "t": "Butelis žemiau krūtinės lygio, dreno galas ~2 cm po vandeniu, neužspausti",
      "ok": true
     }
    ],
    "why": "Bobrovo principas: dreno galas po vandeniu ~2 cm, butelis žemiau krūtinės lygio; niekada nekelti virš paciento ir neužspausti pervežant (#14).",
    "ref": [
     "#/igudis/14",
     "#/igudis/46"
    ]
   }
  ]
 },
 {
  "id": "s27",
  "pav": "Įkvėpimo trauma",
  "tema": "Kvėpavimas",
  "q": [
   {
    "sit": "Iš degančios pėstininkų kovos mašinos ištrauktas šaulys. Veidas apdegęs, nosies plaukai apsvilę, skrepliuose suodžiai, balsas užkimęs.",
    "gp": {
     "AVPU": "A",
     "KD": "24",
     "SpO₂": "99 %",
     "ŠSD": "112"
    },
    "klaus": "Kaip A skiria deguonį?",
    "opt": [
     {
      "t": "Nosies kaniulės 4 l/min – SpO₂ 99 %, didesnio srauto nereikia",
      "ok": false
     },
     {
      "t": "Kaukė su rezervuaru 6 l/min, rezervuaras prisipildys jau uždėjus kaukę",
      "ok": false
     },
     {
      "t": "Kaukė su iš anksto pripildytu rezervuaru, 15 l/min – įtariamas CO",
      "ok": true
     }
    ],
    "why": "Uždara erdvė ir gaisras – įtarus CO skiriamas 100 % O₂; pulsoksimetras CO apsinuodijus klaidina. Rezervuaras pildomas prieš uždedant, traumos pacientui – 15 l/min (#48, #4, #5).",
    "ref": [
     "#/igudis/5",
     "#/igudis/4",
     "#/igudis/48"
    ]
   },
   {
    "sit": "Po 10 min užkimimas stiprėja, atsiranda stridoras, veidas tinsta.",
    "gp": {
     "KD": "30",
     "SpO₂": "95 %"
    },
    "klaus": "Koks kvėpavimo takų planas?",
    "opt": [
     {
      "t": "Anksti galutinis kvėpavimo takas – kviesti patyrusį intubuojantį, planai A–D",
      "ok": true
     },
     {
      "t": "Laringinė kaukė – greičiau ir saugiau nei intubacija tinstančiuose takuose",
      "ok": false
     },
     {
      "t": "Stebėti, deguonis per kaukę; intubuoti tik tada, kai SpO₂ pradės kristi",
      "ok": false
     }
    ],
    "why": "Stridoras – gerklų lygio obstrukcija. Įkvėpimo trauma: takai tinsta greitai, reikia ankstyvos intubacijos, supraglotinės priemonės nepakanka; numatant sunkią intubaciją – patyręs specialistas ir planai A–D (#48, #9, #8).",
    "ref": [
     "#/igudis/48",
     "#/igudis/9",
     "#/igudis/8"
    ]
   },
   {
    "sit": "Šaulys intubuotas. Antrinėje apžiūroje B randa II–III laipsnio nudegimus ant krūtinės ir pečių.",
    "gp": {
     "SpO₂": "98 %",
     "T": "35,8 °C"
    },
    "klaus": "Kaip B sutvarko krūtinės nudegimus?",
    "opt": [
     {
      "t": "Atvėsina ledu ir patepa riebiu tepalu",
      "ok": false
     },
     {
      "t": "Uždengia sausu steriliu tvarsčiu ar plėvele išilginėmis juostomis, šildo",
      "ok": true
     },
     {
      "t": "Sandariai apvynioja krūtinę plėvele ratu, kad tvarstis nenukristų",
      "ok": false
     }
    ],
    "why": "Nudegimai dengiami sausu steriliu tvarsčiu arba skaidria plėvele išilginėmis juostomis, nesuspaudžiant; nudegę ypač greitai šąla. Ledas ir riebalai – klaidos (#48).",
    "ref": [
     "#/igudis/48",
     "#/s/b-ant"
    ]
   }
  ]
 },
 {
  "id": "s28",
  "pav": "Vėmimas gulint ant nugaros",
  "tema": "Kvėpavimas",
  "q": [
   {
    "sit": "Per pratybas karys nukrito nuo sunkvežimio kėbulo ant galvos. Guli ant nugaros su kaklo įtvaru ir blokais, staiga pradeda vemti, girdimas burbuliavimas.",
    "gp": {
     "AVPU": "P",
     "GKS": "8",
     "SpO₂": "89 %"
    },
    "klaus": "Kaip komanda saugo kvėpavimo takus?",
    "opt": [
     {
      "t": "Nuima įtvarą ir atloša galvą, kad atvertų burną ir išvalytų ją pirštais",
      "ok": false
     },
     {
      "t": "Laikant MILS verčia ant šono kaip vieną vienetą, atsiurbia Yankauer",
      "ok": true
     },
     {
      "t": "Vienas narys pasuka į šoną tik galvą, kad vėmalai ištekėtų iš burnos",
      "ok": false
     }
    ],
    "why": "Įtariant stuburo traumą galvą laiko A ir duoda komandą, B ir C verčia kaip vieną vienetą; daug vėmalų – plataus spindžio Yankauer antgalis. Įtvaro nuėmimas be MILS, galvos atlošimas ir nekoordinuotas vertimas – klaidos (#17, #31, #3).",
    "ref": [
     "#/igudis/17",
     "#/igudis/3",
     "#/igudis/31"
    ]
   },
   {
    "sit": "Vėmalai atsiurbti, bet GKS 7 – kvėpavimo takų jis neapsaugo. Gydytojas ruošia RSI; karys vis dar periodiškai vemia.",
    "gp": {
     "GKS": "7",
     "SpO₂": "93 %"
    },
    "klaus": "Kas teisinga dėl aspiracijos rizikos?",
    "opt": [
     {
      "t": "Visą laiką stipriai spausti žiedinę kremzlę – tai patikimai apsaugos nuo aspiracijos",
      "ok": false
     },
     {
      "t": "Vietoje intubacijos įdėti laringinę kaukę – ji apsaugo takus nuo aspiracijos",
      "ok": false
     },
     {
      "t": "Esant aktyviam vėmimui krikoidinio spaudimo netaikyti, atsiurbėjas paruoštas",
      "ok": true
     }
    ],
    "why": "Krikoidinis spaudimas esant aktyviam vėmimui – klaida; laringinė kaukė nuo aspiracijos neapsaugo. Laringoskopijos metu prireikus tvirtai atsiurbiama (#10, #6).",
    "ref": [
     "#/igudis/10",
     "#/igudis/6",
     "#/igudis/3"
    ]
   },
   {
    "sit": "Vamzdelis įvestas laikant MILS. Gydytojas tikrina jo padėtį.",
    "gp": {
     "SpO₂": "96 %"
    },
    "klaus": "Kas patikimiausiai atmeta stemplės intubaciją?",
    "opt": [
     {
      "t": "Kapnografija, kartu krūtinės judesiai ir auskultacija pažastyse bei virš skrandžio",
      "ok": true
     },
     {
      "t": "Auskultacija – girdint kvėpavimo garsus abipus, vamzdelis tikrai trachėjoje",
      "ok": false
     },
     {
      "t": "SpO₂ ir rasojimas vamzdelyje – jei SpO₂ nekrenta, vamzdelis tikrai trachėjoje",
      "ok": false
     }
    ],
    "why": "Stemplės intubacija atmetama tik kapnografija; bronchinės ji neatskiria – klausykite abiejų pusių. Toliau – tvirtinimas, OPA kaip kandiklis, skrandžio zondas (#10, #11).",
    "ref": [
     "#/igudis/10",
     "#/igudis/11"
    ]
   }
  ]
 },
 {
  "id": "s29",
  "pav": "Kulka į šarvinę liemenę",
  "tema": "Krūtinė",
  "q": [
   {
    "sit": "Snaiperio kulka pataikė į kario šarvinės liemenės plokštę dešinėje. Role 1 budi tik kovos medikas ir slaugytoja, gydytojas dar neatvyko. Dešinėje negirdėti kvėpavimo garsų, dėžinis garsas, kaklo venos išsiplėtusios.",
    "gp": {
     "KD": "36",
     "SpO₂": "84 %",
     "AKS": "86/58",
     "ŠSD": "132"
    },
    "klaus": "Ką daro B (kovos medikas)?",
    "opt": [
     {
      "t": "Praneša A ir atlieka adatinę dekompresiją nelaukdamas rentgeno",
      "ok": true
     },
     {
      "t": "Laukia gydytojo – ETC pirmenybė teikiama pirštinei torakostomijai",
      "ok": false
     },
     {
      "t": "Pirmiausia daro krūtinės rentgenogramą, kad patvirtintų pusę",
      "ok": false
     }
    ],
    "why": "Įtampos pneumotoraksas dekompresuojamas nedelsiant; nesant kompetentingo gydytojo ar įrangos – adatinė dekompresija. Nestabiliam rentgeno nelaukiama (#38).",
    "ref": [
     "#/igudis/38",
     "#/p/kvepavimas"
    ]
   },
   {
    "sit": "B paruošė adatą ir ieško dūrio vietos dešinėje.",
    "gp": {
     "SpO₂": "82 %"
    },
    "klaus": "Kaip atliekama adatinė dekompresija?",
    "opt": [
     {
      "t": "Standartinė 4,5 cm kanulė, 2 tarpšonkaulis prie pat krūtinkaulio krašto",
      "ok": false
     },
     {
      "t": "14 G ar 10 G, ≥ 8 cm kanulė, 2 tarpšonkaulis vidurinėje raktikaulio linijoje",
      "ok": true
     },
     {
      "t": "14 G adata 5 tarpšonkaulyje po šonkaulio apatiniu kraštu, adatą palikti",
      "ok": false
     }
    ],
    "why": "Kanulė ≥ 8 cm (4,5 cm dažnai per trumpa); 2 tarpšonkaulis vidurinėje raktikaulio linijoje (alternatyva – 4–5 tarpšonkaulis prieš vidurinę pažasties liniją), statmenai, virš apatinio šonkaulio, adata ištraukiama. Mediališkiau spenelio linijos ar po šonkauliu – klaida (#38).",
    "ref": [
     "#/igudis/38"
    ]
   },
   {
    "sit": "Oro švilpimo B negirdėjo, bet SpO₂ ir AKS trumpam pagerėjo. Po 10 min būklė vėl blogėja, gydytojas dar kelyje.",
    "gp": {
     "KD": "34",
     "SpO₂": "85 %",
     "AKS": "84/54"
    },
    "klaus": "Ką daro B?",
    "opt": [
     {
      "t": "Oro negirdėjo – pneumotorakso nebuvo, ieško kitos priežasties",
      "ok": false
     },
     {
      "t": "Ištraukia kanulę ir laukia gydytojo torakostomijai",
      "ok": false
     },
     {
      "t": "Kanulė galėjo užsikimšti – kol nėra torakostomijos, antra adata",
      "ok": true
     }
    ],
    "why": "Neišgirdus oro įtampos atmesti negalima: adata galėjo nepasiekti pleuros, kanulė – užsikimšti ar užsilenkti. Vėl blogėjant – kuo greičiau torakostomija, kol jos nėra – antra adata (#38).",
    "ref": [
     "#/igudis/38",
     "#/igudis/13"
    ]
   }
  ]
 },
 {
  "id": "s30",
  "pav": "Neefektyvi ventiliacija",
  "tema": "Kvėpavimas",
  "q": [
   {
    "sit": "Drono granata sužeidė kario galvą; kvėpavimas nepakankamas, įdėtas OPA. Kovos medikas vienas ventiliuoja „C–E“ būdu: krūtinė beveik nekyla, girdimas oro nuotėkis pro kaukę.",
    "gp": {
     "AVPU": "U",
     "KD": "6",
     "SpO₂": "86 %"
    },
    "klaus": "Kaip pagerinti ventiliaciją?",
    "opt": [
     {
      "t": "Spausti maišą stipriau ir ilgiau, kad įveiktų nuotėkį",
      "ok": false
     },
     {
      "t": "Ventiliuoti dažniau – apie 30 kartų per minutę, kol pakils SpO₂",
      "ok": false
     },
     {
      "t": "Dviese: vienas abiem rankomis laiko kaukę ir stumia žandikaulį",
      "ok": true
     }
    ],
    "why": "Krūtinė nekyla – taisomas kaukės sandarumas ir iš naujo atveriami takai; efektyviai ventiliuoti reikia dviejų žmonių. Nuotėkio nekompensuokite stipriu spaudimu – oras eina į skrandį; per dažna ventiliacija – dažniausia klaida (#7).",
    "ref": [
     "#/igudis/7",
     "#/igudis/8"
    ]
   },
   {
    "sit": "Ir dviese ventiliacija lieka neefektyvi, intubuojančio gydytojo nėra. A nusprendžia dėti klasikinę laringinę kaukę.",
    "gp": {
     "SpO₂": "84 %"
    },
    "klaus": "Kas teisinga dedant laringinę kaukę?",
    "opt": [
     {
      "t": "Vyrui dydis 5; galva neutrali su MILS; nepavyko per 30 s – vėl ventiliuoti kauke",
      "ok": true
     },
     {
      "t": "Dydis 3 – mažesnę lengviau įvesti; jei nelenda, stumti stipriau, kol įeis",
      "ok": false
     },
     {
      "t": "Dėti neventiliavus kauke – svarbiausia greitis; bandyti tol, kol pavyks",
      "ok": false
     }
    ],
    "why": "Klasikinė laringinė kaukė vyrams – 5 dydžio; prieš tai ventiliuojama kauke su O₂, įtariant kaklo traumą galva neutrali su MILS, jėgos nenaudojama; nepavyko per 30 s – vėl ventiliuoti kauke (#6).",
    "ref": [
     "#/igudis/6"
    ]
   },
   {
    "sit": "Laringinė kaukė įdėta, bet ventiliuojant girdimas didelis nuotėkis, krūtinė kyla silpnai, pučiasi skrandis.",
    "gp": {
     "SpO₂": "82 %"
    },
    "klaus": "Ką tai reiškia ir ką daryti?",
    "opt": [
     {
      "t": "Nuotėkis įprastas – tiesiog spausti maišą stipriau",
      "ok": false
     },
     {
      "t": "Bloga padėtis – ištraukti, ventiliuoti kauke ir bandyti iš naujo",
      "ok": true
     },
     {
      "t": "Po pirmo nesėkmingo bandymo – iškart krikotiroidotomija",
      "ok": false
     }
    ],
    "why": "Didelis girdimas nuotėkis – bloga laringinės kaukės padėtis; pučiasi skrandis – neefektyvumo požymis. Kiekvienam būdui – iki 3 bandymų ir „geriausios pastangos“; tik visiems nepavykus – CICO ir krikotiroidotomija (#6, #8).",
    "ref": [
     "#/igudis/6",
     "#/igudis/8",
     "#/p/kvepavimas"
    ]
   }
  ]
 },
 {
  "id": "s31",
  "pav": "Vyzdžiai po artilerijos sprogimo",
  "tema": "Galva",
  "q": [
   {
    "sit": "Artilerijos sviedinys sprogo prie apkaso, sprogimo banga karį nubloškė į apkaso sienelę. Į Role 1 atvežtas mieguistas, šlaunyje – skeveldros žaizda, kraujavimas sustabdytas spaudžiamuoju tvarsčiu. Oda blyški, šalta.",
    "gp": {
     "AVPU": "V",
     "SpO₂": "89 %",
     "AKS": "86/50",
     "ŠSD": "128"
    },
    "klaus": "Kaip A turi aiškinti sutrikusią sąmonę?",
    "opt": [
     {
      "t": "Tai galvos smegenų trauma – iškart 3 % NaCl edemai mažinti",
      "ok": false
     },
     {
      "t": "Pirmiausia hipoksija ir šokas: deguonis, šoko gaivinimas, gliukozė",
      "ok": true
     },
     {
      "t": "Sąmonę vertinti tik po KT, kol kas tęsti antrinę apžiūrą",
      "ok": false
     }
    ],
    "why": "Sutrikusią sąmonę pirmiausia aiškinkite šoku ir hipoksija; su hemoraginiu šoku – šoko gaivinimas pirmiausia. Hipertoninis tirpalas – ne profilaktika ir ne tūrio skystis (#44, #12).",
    "ref": [
     "#/igudis/44",
     "#/igudis/12",
     "#/igudis/40"
    ]
   },
   {
    "sit": "Po kraujo komponentų ir deguonies AKS ir SpO₂ pasiekė tikslus, šoko požymių nebėra. GKS 10, kaklas įtvare, karys guli horizontaliai.",
    "gp": {
     "GKS": "10",
     "AKS": "116/72",
     "SpO₂": "96 %",
     "ŠSD": "94"
    },
    "klaus": "Kokia padėtis ir priemonės dabar tinkamiausios?",
    "opt": [
     {
      "t": "Galvūgalis 30°, galva tiesiai, kaklo įtvaras atlaisvintas",
      "ok": true
     },
     {
      "t": "Pakelti kojas, kad smegenys gautų daugiau kraujo",
      "ok": false
     },
     {
      "t": "Įtvaro juostas suveržti tvirčiau, kad galva nejudėtų",
      "ok": false
     }
    ],
    "why": "Jei nėra šoko – galvūgalis 30°, galva tiesiai, kaklo įtvaras atlaisvintas, kad nespaustų jungo venų. Vidutinė ar sunki galvos trauma – įtvarą atlaisvinkite (#44, #31).",
    "ref": [
     "#/igudis/44",
     "#/igudis/31",
     "#/s/kokybe"
    ]
   },
   {
    "sit": "Karys intubuotas ir ventiliuojamas. Po 10 min dešinysis vyzdys išsiplėtęs ir nereaguoja į šviesą, atsirado patologinė laikysena. B ventiliuoja dažnai, EtCO₂ 26 mm Hg.",
    "gp": {
     "AKS": "122/70",
     "SpO₂": "98 %",
     "ŠSD": "62"
    },
    "klaus": "Ką daro A?",
    "opt": [
     {
      "t": "Tęsti dažną ventiliaciją – žemas EtCO₂ apsaugo smegenis",
      "ok": false
     },
     {
      "t": "Stebėti ir laukti KT – be vaizdo išvaržos nepatvirtinsi",
      "ok": false
     },
     {
      "t": "Išvaržos požymiai: 3 % NaCl, EtCO₂ 35–45, skubi evakuacija",
      "ok": true
     }
    ],
    "why": "Asimetriški vyzdžiai ir patologinė laikysena – išvaržos požymiai: A garsiai praneša, manitolis arba 3 % NaCl (TCCC 2026 – 250 ml per ≥ 10 min), skubiai neurochirurgas. Ventiliuojamam – normokapnija, hiperventiliacija be EtCO₂ kontrolės – klaida (#44).",
    "ref": [
     "#/igudis/44",
     "#/vaistas/nacl-hipert"
    ]
   }
  ]
 },
 {
  "id": "s32",
  "pav": "Skeveldra akyje",
  "tema": "Galva",
  "q": [
   {
    "sit": "Į apkasą įkrito granata, numesta nuo drono. Karys atvežtas į Role 1 sąmoningas, iš dešinės akies kyšo smulki skeveldra, vokai patinę. B ruošia spaudžiamąjį tvarstį ant akių.",
    "gp": {
     "AVPU": "A",
     "AKS": "128/80",
     "ŠSD": "96"
    },
    "klaus": "Kaip tvarkoma sužeista akis?",
    "opt": [
     {
      "t": "Spaudžiamasis tvarstis ant abiejų akių, kad akys nejudėtų",
      "ok": false
     },
     {
      "t": "Skeveldrą atsargiai ištraukti ir uždengti steriliu tvarsčiu",
      "ok": false
     },
     {
      "t": "Skeveldros netraukti, standus skydelis neliečiant akies ir daikto",
      "ok": true
     }
    ],
    "why": "Įsmigusio daikto netraukite; ant sužeistos akies – standus skydelis, neliečiantis akies ir daikto. Spaudžiamasis tvarstis gali išstumti akies turinį; ant abiejų akių – tik kai sužeistos abi (#45).",
    "ref": [
     "#/igudis/45"
    ]
   },
   {
    "sit": "Antrinėje apžiūroje A apžiūri akis. Kairė akis atrodo sveika, dešinės patinusių vokų karys pats neatmerkia.",
    "gp": {
     "AVPU": "A",
     "SpO₂": "98 %"
    },
    "klaus": "Kaip A įvertina regėjimą?",
    "opt": [
     {
      "t": "Uždengus sveiką akį: tekstas, pirštai, judesys, šviesa – abi akys",
      "ok": true
     },
     {
      "t": "Pirštais praskleisti patinusius vokus ir pašviesti į vyzdį",
      "ok": false
     },
     {
      "t": "Regėjimo netikrinti – jį įvertins oftalmologas po evakuacijos",
      "ok": false
     }
    ],
    "why": "Regėjimo testas: pacientas uždengia sveiką akį – tekstas ištiestos rankos atstumu, pirštų skaičius, rankos judesys, šviesa; kartojama kita akimi ir užrašoma. Patinusios akies jėga neatverkite (#45).",
    "ref": [
     "#/igudis/45",
     "#/s/a-ant"
    ]
   },
   {
    "sit": "Skydelis pritvirtintas. Karį pykina, jis du kartus vėmė ir gerti negali. Alergijų neturi.",
    "gp": {
     "AVPU": "A",
     "AKS": "124/78",
     "ŠSD": "92"
    },
    "klaus": "Kokį antibiotiką skirti?",
    "opt": [
     {
      "t": "Cefadroksilis 1 g per burną, nors karys vemia",
      "ok": false
     },
     {
      "t": "Ceftriaksonas 2 g IV / IO / IM kartą per parą",
      "ok": true
     },
     {
      "t": "Antibiotikų nereikia, kol penetracija nepatvirtinta",
      "ok": false
     }
    ],
    "why": "Penetruojančiai akies traumai – antibiotikai; negalinčiam gerti – ceftriaksonas 2 g IV / IO / IM, galinčiam – cefadroksilis 1 g per burną. Penetraciją įtarus gydykite kaip penetruojančią traumą (#45).",
    "ref": [
     "#/vaistas/ceftriaksonas",
     "#/vaistas/cefadroksilis",
     "#/igudis/45"
    ]
   }
  ]
 },
 {
  "id": "s33",
  "pav": "Smūgis šautuvo buože",
  "tema": "Galva",
  "q": [
   {
    "sit": "Valant pastatą per operaciją karį į veidą smogė priešininkas šautuvo buože. Atvežtas į Role 1: iš nosies ir į burną gausiai teka kraujas, girdisi gurgimas, vidurinė veido dalis judri.",
    "gp": {
     "AVPU": "V",
     "SpO₂": "90 %",
     "KD": "26",
     "ŠSD": "112"
    },
    "klaus": "Kas daroma pirmiausia?",
    "opt": [
     {
      "t": "Užtikrinti kvėpavimo takus – atsiurbti, prireikus intubuoti",
      "ok": true
     },
     {
      "t": "Iškart užpakalinė tamponada, kvėpavimo takus vertinti po jos",
      "ok": false
     },
     {
      "t": "Įvesti nazofaringinį vamzdelį ir suspausti nosies sparnelius",
      "ok": false
     }
    ],
    "why": "Kraujavimas į nosį ar burną po veido traumos pirmiausia grėsmė kvėpavimo takams – intubacija arba chirurginis kvėpavimo takas, tik tada tamponada. NPA nedėkite esant vidurinės veido dalies lūžiams (#29, #6).",
    "ref": [
     "#/igudis/29",
     "#/igudis/6",
     "#/s/esc-kt"
    ]
   },
   {
    "sit": "Karys intubuotas. A antrinėje apžiūroje nustato, kad veido kaulai nestabilūs, iš nosies tebekraujuoja.",
    "gp": {
     "SpO₂": "97 %",
     "AKS": "108/66",
     "ŠSD": "104"
    },
    "klaus": "Ką A nurodo B prieš nosies tamponadą?",
    "opt": [
     {
      "t": "Dantų blokelius be kaklo įtvaro, kad burna liktų atvira",
      "ok": false
     },
     {
      "t": "Lūžgalių nestabilizuoti – juos sutvirtins pati tamponada",
      "ok": false
     },
     {
      "t": "Kaklo įtvarą ir dantų blokelius, blokelį tvirtinti kartu su ETV",
      "ok": true
     }
    ],
    "why": "Pirma kvėpavimo takai ir lūžgalių stabilizacija: kaklo įtvaras fiksuoja apatinį žandikaulį, dantų blokeliai – viršutinį. Esant ETV kandimo bloką dėkite šalia ir pritvirtinkite kartu; blokeliai be įtvaro – klaida (#30).",
    "ref": [
     "#/igudis/30",
     "#/s/a-ant"
    ]
   },
   {
    "sit": "Lūžgaliai stabilizuoti. B ruošia užpakalinę tamponadą – komercinio baliono nėra, yra 12 Fr Foley kateteris.",
    "gp": {
     "AKS": "104/64",
     "ŠSD": "108"
    },
    "klaus": "Kaip B atlieka užpakalinę tamponadą?",
    "opt": [
     {
      "t": "Pripūsti iki galo iškart, spaustuką dėti tiesiai ant šnervės",
      "ok": false
     },
     {
      "t": "Pripūsti 5–7 ml, patraukti, papildyti 5–7 ml; abipus, oda apsaugota",
      "ok": true
     },
     {
      "t": "Tamponuoti tik vieną landą, kad liktų oro kelias per nosį",
      "ok": false
     }
    ],
    "why": "Foley į pažeistą landą iki užpakalinės nosies ertmės, pripūsti 5–7 ml, patraukti, kol priglus, papildyti 5–7 ml; fiksuoti spaustuku ties šnerve, audinius apsaugoti marle; tamponuoti abipus (#29).",
    "ref": [
     "#/igudis/29",
     "#/s/b-ant"
    ]
   }
  ]
 },
 {
  "id": "s34",
  "pav": "Stuburo trauma po kritimo",
  "tema": "Kita",
  "q": [
   {
    "sit": "Per naktinę operaciją karys nukrito nuo šarvuočio stogo ant betono. Atneštas į Role 1 be kaklo imobilizacijos, skundžiasi kaklo skausmu ir rankų dilgčiojimu.",
    "gp": {
     "AVPU": "A",
     "SpO₂": "96 %",
     "AKS": "118/74",
     "ŠSD": "88"
    },
    "klaus": "Kaip stabilizuojamas kaklas atvykus?",
    "opt": [
     {
      "t": "Galvą švelniai patraukti išilgai, kad išsitiesintų stuburas",
      "ok": false
     },
     {
      "t": "MILS: rankos ant speninių ataugų, ausys neuždengtos, be traukos",
      "ok": true
     },
     {
      "t": "Paprašyti kario pajudinti galvą ir parodyti, kur skauda",
      "ok": false
     }
    ],
    "why": "Atvykusiam be imobilizacijos – MILS: rankos ant speninių ataugų, ausų neuždengti, galva neutraliai be traukos. Jėga tiesinti galvą – klaida; vėliau MILS keičiamas įtvaru su blokais ir juostomis (#31).",
    "ref": [
     "#/igudis/31",
     "#/igudis/2"
    ]
   },
   {
    "sit": "A pastebi, kad karys kvėpuoja pilvu, oda šilta, rankų jėga silpnėja, B mato priapizmą.",
    "gp": {
     "KD": "24",
     "AKS": "102/60",
     "ŠSD": "62",
     "SpO₂": "94 %"
    },
    "klaus": "Ką rodo šie požymiai?",
    "opt": [
     {
      "t": "Nugaros smegenų pažeidimą – stuburą saugoti visų veiksmų metu",
      "ok": true
     },
     {
      "t": "Įtampos pneumotoraksą – iškart adatos dekompresija",
      "ok": false
     },
     {
      "t": "Reakciją į skausmą – imobilizaciją galima nuimti",
      "ok": false
     }
    ],
    "why": "Diafragminis kvėpavimas, vazodilatacija ir priapizmas – nugaros smegenų pažeidimo požymiai; kaklas lieka imobilizuotas, o neurologija kartojama ir registruojama (#12, #31).",
    "ref": [
     "#/igudis/12",
     "#/igudis/31"
    ]
   },
   {
    "sit": "Karys guli ant stuburo lentos, kaklas įtvare. Nugara dar neapžiūrėta, hemodinamika stabili.",
    "gp": {
     "AKS": "106/64",
     "ŠSD": "66",
     "SpO₂": "95 %"
    },
    "klaus": "Kaip teisingai apžiūrėti nugarą?",
    "opt": [
     {
      "t": "Nevartyti – įtariant stuburo traumą nugaros apžiūra draudžiama",
      "ok": false
     },
     {
      "t": "Versti tris kartus: apžiūrai, palpacijai ir lentai nuimti",
      "ok": false
     },
     {
      "t": "A laiko galvą, B ir C verčia rąstu vieną kartą, B apžiūri",
      "ok": true
     }
    ],
    "why": "A laiko galvą ir duoda komandą, B ir C vienoje pusėje verčia kaip vieną vienetą; B apžiūri nugarą ir palpuoja stuburo vidurio liniją. Vertimas kelis kartus – klaida; nuo lentos nukelkite kuo anksčiau (#17, #31).",
    "ref": [
     "#/igudis/17",
     "#/igudis/31"
    ]
   }
  ]
 },
 {
  "id": "s35",
  "pav": "Atviras šlaunies lūžis",
  "tema": "Kita",
  "q": [
   {
    "sit": "Patrulio metu karys užlipo ant priešpėstinės minos. Šlaunyje atviras lūžis, išorinis kraujavimas sustabdytas tvarsčiu, kitų žaizdų nerasta. Šlaunis tinsta, karys blyškus.",
    "gp": {
     "AKS": "94/60",
     "ŠSD": "124",
     "AVPU": "A"
    },
    "klaus": "Kaip vertinti šią hemodinamiką?",
    "opt": [
     {
      "t": "Šoko nėra, kol sAKS virš 90 – tęsti antrinę apžiūrą",
      "ok": false
     },
     {
      "t": "Tachikardiją sukelia skausmas – užtenka analgezijos",
      "ok": false
     },
     {
      "t": "Šokas: kraujas aplink šlaunikaulį, dubenyje, pilve, krūtinėje",
      "ok": true
     }
    ],
    "why": "Šokas be matomo kraujavimo – ieškokite kraujo krūtinėje, pilve, dubenyje ir aplink ilguosius kaulus (šlaunikaulis). Laukti hipotenzijos – klaida: AKS krinta tik netekus 30–40 % kraujo (#33, #40).",
    "ref": [
     "#/igudis/33",
     "#/igudis/40",
     "#/igudis/20"
    ]
   },
   {
    "sit": "Gaivinimas pradėtas, kraujavimas kontroliuojamas. Antrinėje apžiūroje C imasi šlaunies, B rankomis stabilizuoja lūžio vietą. Iš žaizdos kyšo kaulas.",
    "gp": {
     "AKS": "106/66",
     "ŠSD": "108"
    },
    "klaus": "Kaip C imobilizuoja galūnę?",
    "opt": [
     {
      "t": "Kyšantį kaulą grąžinti į vietą, įtvaruoti tik šlaunį",
      "ok": false
     },
     {
      "t": "Sterilus tvarstis, PMS, įtvaras per klubo ir kelio sąnarius",
      "ok": true
     },
     {
      "t": "Įtvarą dėti ant žaizdos, PMS tikrinti po evakuacijos",
      "ok": false
     }
    ],
    "why": "Atviras lūžis – pirma kraujavimas, žaizda uždengiama steriliu tvarsčiu; PMS prieš ir po; įtvaras apima sąnarius virš ir žemiau lūžio. Per didelis manipuliavimas ir įtvaras ant nesutvarkytos žaizdos – klaidos (#33).",
    "ref": [
     "#/igudis/33",
     "#/igudis/32",
     "#/s/c-ant"
    ]
   },
   {
    "sit": "Įtvaras uždėtas. Tikrinant PMS paaiškėja, kad pėdos pulso, kuris prieš įtvarą buvo, nebeapčiuopiama.",
    "gp": {
     "AKS": "110/68",
     "ŠSD": "102"
    },
    "klaus": "Ką daro C?",
    "opt": [
     {
      "t": "Atlaisvina, pataiso ir uždeda iš naujo, vėl tikrina PMS",
      "ok": true
     },
     {
      "t": "Laiko tai normaliu po įtvaro – užrašo ir stebi",
      "ok": false
     },
     {
      "t": "Įtvarą suveržia stipriau, kad lūžgaliai nespaustų arterijos",
      "ok": false
     }
    ],
    "why": "Po įtvaro PMS kartojami: pulsas dingo – atlaisvinkite, pataisykite, uždėkite iš naujo. Atviram lūžiui – analgezija ir antibiotikai, radiniai ir laikas užrašomi (#33).",
    "ref": [
     "#/igudis/33",
     "#/s/c-ant"
    ]
   }
  ]
 },
 {
  "id": "s36",
  "pav": "Praleista nugaros žaizda",
  "tema": "Kita",
  "q": [
   {
    "sit": "Šalia apkaso sprogo dronas kamikadzė. Karys atvežtas su šoko požymiais, B įtaria dubens lūžį, kartu su C uždėtas dubens diržas. C ruošiasi su B versti karį nugaros apžiūrai prieš e-FAST.",
    "gp": {
     "AKS": "78/44",
     "ŠSD": "136",
     "AVPU": "V"
    },
    "klaus": "Ką sprendžia A?",
    "opt": [
     {
      "t": "Vertimą atidėti, nugaros apžiūrą įrašyti į problemų sąrašą",
      "ok": true
     },
     {
      "t": "Versti dabar – nugara visada apžiūrima prieš e-FAST",
      "ok": false
     },
     {
      "t": "Versti du kartus: nugarai apžiūrėti ir diržui pataisyti",
      "ok": false
     }
    ],
    "why": "Hemodinamiškai nestabiliam ar įtariant dubens lūžį vertimą atideda A – galima destabilizuoti kraujotaką ar išjudinti krešulį. Neatlikti elementai įrašomi į problemų sąrašą (#17, #42).",
    "ref": [
     "#/igudis/17",
     "#/igudis/42",
     "#/igudis/20"
    ]
   },
   {
    "sit": "Po gaivinimo būklė stabilizavosi, pradedama antrinė apžiūra. Rašytojas primena, kad nugara neapžiūrėta. A sako: „Nugarą apžiūrės Role 2.“",
    "gp": {
     "AKS": "112/70",
     "ŠSD": "98",
     "AVPU": "A",
     "GKS": "15"
    },
    "klaus": "Kas teisinga?",
    "opt": [
     {
      "t": "Nugaros nereikia – e-FAST neigiamas, tad žaizdų nėra",
      "ok": false
     },
     {
      "t": "Užtenka paklausti, ar karį skauda nugarą",
      "ok": false
     },
     {
      "t": "Apžiūrėti nugarą ir sėdmenis dabar – „neatlikta“ netinka",
      "ok": true
     }
    ],
    "why": "Antrinėje apžiūroje apžiūrimi stuburas ir nugara, jei neapžiūrėti pirminėje, ir sėdmenys. „Antrinė apžiūra neatlikta“ netinka – trūkstami elementai atliekami kuo greičiau; praleista nugara – dažna klaida (#42).",
    "ref": [
     "#/igudis/42",
     "#/s/antrine"
    ]
   },
   {
    "sit": "Paverčiant rąstu B tarp menčių randa nedidelę skeveldros žaizdą, kuri įkvepiant šnypščia. Kvėpavimo dažnis didėja.",
    "gp": {
     "KD": "28",
     "SpO₂": "92 %",
     "AKS": "110/68"
    },
    "klaus": "Ką daro B?",
    "opt": [
     {
      "t": "Užkemša žaizdą marle ir spaudžia bent 3 min",
      "ok": false
     },
     {
      "t": "Okliuzinis tvarstis, grąžina ant nugaros, praneša A, stebi įtampą",
      "ok": true
     },
     {
      "t": "Palieka žaizdą atvirą, kad nesusidarytų įtampos pneumotoraksas",
      "ok": false
     }
    ],
    "why": "Krūtinės žaizda nugaroje – okliuzinis tvarstis; grąžinkite ant nugaros ta pačia komanda ir radinius praneškite A, stebėkite dėl įtampos. Į krūtinės žaizdą marlės nekimškite (#17, #37).",
    "ref": [
     "#/igudis/17",
     "#/igudis/37"
    ]
   }
  ]
 },
 {
  "id": "s37",
  "pav": "Sumišęs karys pratybose",
  "tema": "Galva",
  "q": [
   {
    "sit": "Per lauko pratybas karys nukrito nuo kliūčių ruožo sienelės ir trenkėsi galva. Role 1: atsimerkia tik kalbinamas, atsako sumišęs, bet komandas vykdo.",
    "gp": {
     "AVPU": "V",
     "SpO₂": "97 %",
     "AKS": "132/80",
     "ŠSD": "84"
    },
    "klaus": "Kokia kario GKS?",
    "opt": [
     {
      "t": "11 – vidutinė",
      "ok": false
     },
     {
      "t": "13 – lengva",
      "ok": true
     },
     {
      "t": "14 – lengva",
      "ok": false
     }
    ],
    "why": "Akys – atsimerkia į garsą (3), kalba – sumišęs (4), motorika – vykdo komandas (6): GKS 13 (A3 K4 M6), lengva (13–15). Perduokite ir komponentus, ne vien sumą (#/gks, #12).",
    "ref": [
     "#/gks",
     "#/igudis/12"
    ]
   },
   {
    "sit": "Karys visą parą žygiavo su pilna ekipuote, beveik nevalgė, dabar prakaituotas ir drebančiomis rankomis. A rašo „sumišimas dėl galvos smūgio“.",
    "gp": {
     "GKS": "13",
     "SpO₂": "97 %",
     "AKS": "128/78",
     "ŠSD": "96"
    },
    "klaus": "Ką būtina padaryti prieš tokią išvadą?",
    "opt": [
     {
      "t": "C – gliukozė; atmesti hipoksiją ir šoką",
      "ok": true
     },
     {
      "t": "Nieko – mechanizmas aiškiai rodo galvos traumą",
      "ok": false
     },
     {
      "t": "Gliukozės netikrinti – karys neserga diabetu",
      "ok": false
     }
    ],
    "why": "Sutrikus sąmonei – gliukozė (C nustato visiems) ir atmetama hipoksija bei šokas. Pakitusi sąmonė priskiriama tik galvos traumai – praleidžiama hipoglikemija, hipoksija ar šokas (#12).",
    "ref": [
     "#/igudis/12",
     "#/s/c-pir"
    ]
   },
   {
    "sit": "Gliukozė normali. Antrinėje apžiūroje A randa mėlynes už ausų, kraujosruvas aplink abi akis, iš nosies sunkiasi skaidrus skystis. GKS nekinta.",
    "gp": {
     "GKS": "13",
     "SpO₂": "96 %"
    },
    "klaus": "Kaip A vertina radinius?",
    "opt": [
     {
      "t": "Tik minkštųjų audinių mėlynės – nereikšminga",
      "ok": false
     },
     {
      "t": "Akių trauma – spaudžiamieji tvarsčiai ant abiejų akių",
      "ok": false
     },
     {
      "t": "Kaukolės pamato lūžis – nazofaringinio vamzdelio nedėti",
      "ok": true
     }
    ],
    "why": "Battle požymis, „akiniai“ ir likvorėja – kaukolės pamato lūžio požymiai. Esant įtariamam kaukolės pamato lūžiui NPA nededamas; GKS ir vyzdžiai kartojami kas 5–10 min (#44, #6).",
    "ref": [
     "#/igudis/44",
     "#/igudis/6",
     "#/s/antrine"
    ]
   }
  ]
 },
 {
  "id": "s38",
  "pav": "Akiduobė po SSU",
  "tema": "Galva",
  "q": [
   {
    "sit": "Kolonoje po šarvuočiu sprogo savadarbis sprogmuo (SSU), vairuotojas susitrenkė veidą. Antrinėje apžiūroje kairysis akies obuolys išsikišęs, akiduobė įtempta, judesiai riboti, karys sako, kad kaire akimi mato vis blogiau.",
    "gp": {
     "AVPU": "A",
     "AKS": "126/78",
     "ŠSD": "98"
    },
    "klaus": "Kas įtariama ir ką daryti?",
    "opt": [
     {
      "t": "Akies sumušimas – spaudžiamasis tvarstis hematomai sumažinti",
      "ok": false
     },
     {
      "t": "Laukti KT patvirtinimo ir tik tada spręsti dėl gydymo",
      "ok": false
     },
     {
      "t": "Retrobulbarinė hematoma – skubi kantotomija ir kantolizė",
      "ok": true
     }
    ],
    "why": "Išsikišęs, skausmingas akies obuolys, riboti judesiai, įtempta akiduobė ir blogėjantis regėjimas – retrobulbarinė hematoma. Diagnozė klinikinė, KT neturi atidėti procedūros; regėjimas žūva per 1,5–2 val. (#28).",
    "ref": [
     "#/igudis/28",
     "#/igudis/45"
    ]
   },
   {
    "sit": "Kompetentingas komandos narys perkirpo lateralinį voko kampą iki kaulinio akiduobės krašto, tačiau akiduobė tebėra įtempta.",
    "gp": {
     "AVPU": "A",
     "ŠSD": "102"
    },
    "klaus": "Koks kitas žingsnis?",
    "opt": [
     {
      "t": "Baigti – akiduobė atsipalaiduos per kelias valandas",
      "ok": false
     },
     {
      "t": "Patikrinti, ar perkirpta apatinė kojytė ir vokas laisvas",
      "ok": true
     },
     {
      "t": "Kirpti giliau į akiduobę, link akies obuolio",
      "ok": false
     }
    ],
    "why": "Kantolizė – perkerpama įtempta apatinė kanto sausgyslės kojytė, vokas tampa laisvas. Akiduobė neatsipalaidavo – tikrinama, ar kojytė perkirpta, svarstoma viršutinė; neperkirpta apatinė kojytė – dažna klaida (#28).",
    "ref": [
     "#/igudis/28"
    ]
   },
   {
    "sit": "Perkirpus apatinę kojytę vokas laisvas, akiduobė minkštesnė. Karys ruošiamas evakuacijai.",
    "gp": {
     "AVPU": "A",
     "AKS": "122/76",
     "ŠSD": "94"
    },
    "klaus": "Kaip stebima akis toliau?",
    "opt": [
     {
      "t": "Galva pakelta; regėjimas, akispūdis, vyzdžiai kas 15 min 2 val.",
      "ok": true
     },
     {
      "t": "Guldyti horizontaliai, akį tikrinti kartą per valandą",
      "ok": false
     },
     {
      "t": "Procedūra atlikta – akies nebetikrinti iki oftalmologo",
      "ok": false
     }
    ],
    "why": "Po kantotomijos galva pakelta, regėjimas, akispūdis ir vyzdžiai vertinami kas 15 min 2 val.; skubiai oftalmologas. Radiniai ir laikai perduodami su pacientu (#28, #46).",
    "ref": [
     "#/igudis/28",
     "#/igudis/46"
    ]
   }
  ]
 },
 {
  "id": "s39",
  "pav": "Antrinė apžiūra prieš evakuaciją",
  "tema": "Kita",
  "q": [
   {
    "sit": "Per pratybas apvirto karinis visureigis. Kulkosvaidininkas Role 1: pirminė apžiūra baigta, gyvybei pavojingų būklių nerasta, būklė stabili. Evakuacija – po 40 min.",
    "gp": {
     "AVPU": "A",
     "GKS": "15",
     "AKS": "124/76",
     "ŠSD": "90",
     "SpO₂": "98 %"
    },
    "klaus": "Kaip organizuojama antrinė apžiūra?",
    "opt": [
     {
      "t": "Dabar: A – galva, veidas, AMPLE; B ir C – savo dalys",
      "ok": true
     },
     {
      "t": "Role 1 neatliekama – ją atliks priimanti ligoninė",
      "ok": false
     },
     {
      "t": "Atlieka tik C, o A tuo metu pildo dokumentus",
      "ok": false
     }
    ],
    "why": "Stabiliam – iškart po pirminės apžiūros. Galvą, veidą ir anamnezę vertina A, B ir C atlieka savo dalis, radinius apibendrina A (#42).",
    "ref": [
     "#/igudis/42",
     "#/s/antrine",
     "#/s/a-ant"
    ]
   },
   {
    "sit": "A renka anamnezę. Karys kalba aiškiai, pasakoja, kaip apvirto visureigis.",
    "gp": {
     "GKS": "15",
     "AKS": "122/74"
    },
    "klaus": "Ką A turi išsiaiškinti?",
    "opt": [
     {
      "t": "Tik alergijas – kitos anamnezės traumai nereikia",
      "ok": false
     },
     {
      "t": "Amžių, mechanizmą, sužalojimus, požymius ir gydymą",
      "ok": false
     },
     {
      "t": "Alergijas, vaistus, ligas, valgį, įvykius ir stabligės statusą",
      "ok": true
     }
    ],
    "why": "AMPLE: alergijos, vaistai (antikoaguliantai!), ligos, paskutinis valgis, įvykiai; patikslinamas stabligės statusas, tikrinami drabužiai ir daiktai. Antrasis variantas primena ATMIST perdavimo struktūrą (#42).",
    "ref": [
     "#/igudis/42",
     "#/s/a-ant"
    ]
   },
   {
    "sit": "C randa deformuotą, skausmingą dešinį dilbį be žaizdos, PMS geri. Ant riešo – laikrodis, ant piršto – žiedas.",
    "gp": {
     "AKS": "120/74",
     "ŠSD": "92"
    },
    "klaus": "Kaip C paruošia ranką evakuacijai?",
    "opt": [
     {
      "t": "SAM įtvaras tik ant lūžio, kad riešas ir alkūnė judėtų",
      "ok": false
     },
     {
      "t": "Nuimti laikrodį ir žiedą, įtvaras per riešą ir alkūnę, parištė",
      "ok": true
     },
     {
      "t": "Įtvaro nereikia – ranką prispaus neštuvų diržas",
      "ok": false
     }
    ],
    "why": "Nuimkite žiedus ir laikrodį; įtvaras apima sąnarius virš ir žemiau lūžio, ranka papildomai tvirtinama parište prie liemens, PMS kartojami po įtvaro. Neštuvų diržas ant lūžio – klaida (#33, #46).",
    "ref": [
     "#/igudis/33",
     "#/igudis/46",
     "#/s/c-ant"
    ]
   }
  ]
 },
 {
  "id": "s40",
  "pav": "Galvos žaizda prie posto",
  "tema": "Galva",
  "q": [
   {
    "sit": "Prie posto sprogus minosvaidžio minai karys trenkėsi galva į betoninį bunkerio kraštą. Antrinėje apžiūroje A randa kraujuojančią galvos odos žaizdą, B siūlo ją užkimšti hemostatine marle.",
    "gp": {
     "GKS": "14",
     "AKS": "130/80",
     "ŠSD": "88",
     "SpO₂": "97 %"
    },
    "klaus": "Kaip tvarkoma galvos žaizda?",
    "opt": [
     {
      "t": "Giliai užkimšti hemostatine marle ir spausti",
      "ok": false
     },
     {
      "t": "B sutvarsto pagal A nurodymą, į žaizdą nieko nekišama",
      "ok": true
     },
     {
      "t": "Netvarstyti – žaizda turi būti matoma iki KT",
      "ok": false
     }
    ],
    "why": "Galvos žaizdą sutvarsto B (A nurodytos procedūros) – į žaizdą nieko nekišti. A tuo metu vertina kaukolės skliautą ir pamato lūžio požymius (#44, #42).",
    "ref": [
     "#/igudis/44",
     "#/s/b-ant"
    ]
   },
   {
    "sit": "Tikrindamas nosies landas A mato abipusį minkštą pertvaros patinimą, karys skundžiasi užgulta nosimi.",
    "gp": {
     "GKS": "14",
     "AKS": "128/78"
    },
    "klaus": "Ką nurodo A?",
    "opt": [
     {
      "t": "Nieko – patinimas atslūgs savaime per kelias dienas",
      "ok": false
     },
     {
      "t": "Įvesti nazofaringinį vamzdelį pro patinusią šnervę",
      "ok": false
     },
     {
      "t": "Pertvaros hematoma – drenuoti ir tamponuoti abipus",
      "ok": true
     }
    ],
    "why": "Abipusis minkštas patinimas ir užgulta nosis – pertvaros hematoma: vietinė anestezija, pjūvis ar aspiracija, abipusė tamponada, antibiotikai, LOR. Nedrenuota – kremzlės nekrozė, abscesas, balno nosis (#30).",
    "ref": [
     "#/igudis/30",
     "#/s/a-ant"
    ]
   },
   {
    "sit": "Ruošiant evakuacijai karys tampa vis labiau mieguistas, kairės rankos ir kojos jėga silpnesnė nei dešinės.",
    "gp": {
     "GKS": "11",
     "AKS": "142/84",
     "ŠSD": "64",
     "SpO₂": "95 %"
    },
    "klaus": "Ką daro A?",
    "opt": [
     {
      "t": "STOP: pirminė apžiūra iš naujo, lateralizacija – eskaluoti",
      "ok": true
     },
     {
      "t": "Tęsti pakavimą, GKS pakartoti nuvykus į Role 2",
      "ok": false
     },
     {
      "t": "Suleisti midazolamo, kad karys ramiai išlaikytų skrydį",
      "ok": false
     }
    ],
    "why": "Būklei pablogėjus – iš naujo pirminė apžiūra (hipoksija, šokas), tik tada toliau. Blogėjanti sąmonė ir lateralizacija – eskaluoti nedelsiant, skubus perkėlimas; GKS ir vyzdžiai kas 5–10 min (#42, #44).",
    "ref": [
     "#/igudis/42",
     "#/igudis/44",
     "#/s/stop"
    ]
   }
  ]
 },
 {
  "id": "s41",
  "pav": "Instruktažas prieš atvykstant",
  "tema": "Komanda",
  "q": [
   {
    "sit": "Lauko medicinos punktas (Role 1) gauna pranešimą: kolona užvažiavo ant SSU, atvežami du sužeistieji, jūsų komandai skiriamas sunkesnis – atvyks po 10 min. Nariai pradeda ruoštis kas sau, dalis vieni kitų nepažįsta.",
    "gp": {},
    "klaus": "Ką pirmiausia daro A narys?",
    "opt": [
     {
      "t": "Laukia atvykimo – vaidmenis paskirstys pagal tai, ką pamatys",
      "ok": false
     },
     {
      "t": "Surenka komandą: prisistatymas, ATMIST, vaidmenys A, B, C ir rašytojas",
      "ok": true
     },
     {
      "t": "Leidžia kiekvienam ruošti savo įrangą – instruktažas tik atims brangų laiką",
      "ok": false
     }
    ],
    "why": "Komandos darbas prasideda prieš pacientui atvykstant: A surenka komandą, nariai prisistato vardais, A perteikia ATMIST informaciją ir paskirsto vaidmenis A, B, C ir rašytoją (#41).",
    "ref": [
     "#/igudis/41",
     "#/s/a-pas",
     "#/p/eiga"
    ]
   },
   {
    "sit": "Iš ATMIST: karys apie 25 m., SSU sprogimas prieš 40 min, kairės blauzdos amputacija su turniketu, mieguistas, blyškus. Vaidmenys paskirstyti, Planas A – standartinė pirminė apžiūra.",
    "gp": {},
    "klaus": "Kuriuos Escape planus A turi aptarti instruktaže?",
    "opt": [
     {
      "t": "Masyvų kraujavimą, kvėpavimo takų obstrukciją ir trauminį širdies sustojimą",
      "ok": true
     },
     {
      "t": "Jokių – Escape planai skelbiami tik tada, kai problema jau atsiranda",
      "ok": false
     },
     {
      "t": "Tik hipotermiją ir skausmo malšinimą – kraujavimas jau sustabdytas",
      "ok": false
     }
    ],
    "why": "Instruktaže aptariamas Planas A ir Escape planai: masyvus kraujavimas, kvėpavimo takų obstrukcija, trauminis širdies sustojimas, taip pat skubus perkėlimas į operacinę (#41).",
    "ref": [
     "#/igudis/41",
     "#/s/a-pas",
     "#/s/esc-kraujas"
    ]
   },
   {
    "sit": "Prieš baigiant instruktažą C narys – jaunas medikas, pirmą kartą komandoje – tyliai prisipažįsta, kad IO adatą įvedęs tik manekenui.",
    "gp": {},
    "klaus": "Kaip teisingai užbaigti instruktažą?",
    "opt": [
     {
      "t": "C neturėtų to sakyti garsiai – tegul dirba taip, kaip išmano",
      "ok": false
     },
     {
      "t": "A pats perima visas C procedūras kartu su kvėpavimo takais",
      "ok": false
     },
     {
      "t": "C skiriama vyresniojo parama; abejonės ir klausimai išsakomi dabar",
      "ok": true
     }
    ],
    "why": "Patikrinamos kompetencijos, jaunesniems paskiriama vyresniųjų parama; kiekvienas patikrina savo įrangą, patalpa ir skysčiai pašildomi, abejonės išsakomos dar prieš atvykstant (#41).",
    "ref": [
     "#/igudis/41",
     "#/s/a-pas",
     "#/s/c-pas"
    ]
   }
  ]
 },
 {
  "id": "s42",
  "pav": "Nurodymas „į orą“",
  "tema": "Komanda",
  "q": [
   {
    "sit": "Karys sužeistas minosvaidžio skeveldromis į šlaunį, kraujavimas sustabdytas, skausmas 8/10. Pirminės apžiūros metu A garsiai sako: „Kas nors paruoškite ketamino.“ Po minutės paaiškėja, kad niekas jo neruošia.",
    "gp": {
     "AVPU": "A",
     "KD": "22",
     "AKS": "118/74",
     "ŠSD": "104"
    },
    "klaus": "Kaip A turėjo duoti nurodymą?",
    "opt": [
     {
      "t": "„Tomai, ketaminas 25 mg IV lėtai“ – pakartoja, suleidęs praneša „atlikta“",
      "ok": true
     },
     {
      "t": "Tą patį nurodymą pakartoti dar garsiau, kad išgirstų visa komanda",
      "ok": false
     },
     {
      "t": "Ketaminą paruošti pačiam – tai greičiau nei aiškinti kitiems nariams",
      "ok": false
     }
    ],
    "why": "Uždaras ciklas: vardas → trumpas aiškus nurodymas → gavėjas pakartoja → praneša „atlikta“. Nurodymo „į orą“, be vardo, niekas neprisiima (#41).",
    "ref": [
     "#/igudis/41",
     "#/p/komunikacija",
     "#/s/komanda"
    ]
   },
   {
    "sit": "C narys Tomas pakartoja paskyrimą: 1 ml ketamino ampulės skiedžia iki 10 ml ir ketina suleisti 5 ml, kaip įpratęs. B narys pastebi, kad ant ampulės parašyta 100 mg/ml.",
    "gp": {},
    "klaus": "Ką turi daryti B?",
    "opt": [
     {
      "t": "Tylėti – už vaistus atsako C, o jis patyręs",
      "ok": false
     },
     {
      "t": "Iškart paklausti: „Tomai, ar tikras dėl stiprumo? Ampulė 100 mg/ml“",
      "ok": true
     },
     {
      "t": "Nieko nesakius paimti švirkštą ir pačiam suleisti pusę tūrio",
      "ok": false
     }
    ],
    "why": "Matant pavojų pacientui – PACE: paklausk, įspėk, paprieštarauk, veik. Ketamino ampulės būna 50 ir 100 mg/ml – painiojamas stiprumas ir tūris (#24, Komunikacija komandoje).",
    "ref": [
     "#/p/komunikacija",
     "#/igudis/24",
     "#/vaistas/ketaminas"
    ]
   },
   {
    "sit": "Po pirminės apžiūros AKS netikėtai krenta. B vėl tikrina krūtinę, C keičia infuziją, A kalbasi su evakuacijos koordinatoriumi – komanda „įstrigo“, kiekvienas dirba atskirai.",
    "gp": {
     "AKS": "88/52",
     "ŠSD": "126",
     "SpO₂": "94 %"
    },
    "klaus": "Ką daro A?",
    "opt": [
     {
      "t": "Leidžia kiekvienam tęsti savo darbą – sustojimas tik gaišina laiką",
      "ok": false
     },
     {
      "t": "Baigia pokalbį su koordinatoriumi, tada išklauso kiekvieną atskirai",
      "ok": false
     },
     {
      "t": "Skelbia STOP: visi sustoja, faktai pagal cABCDE, planas, kas ką daro",
      "ok": true
     }
    ],
    "why": "STOP (10 už 10) skelbiamas būklei netikėtai pablogėjus ar komandai „įstrigus“: problema, visi klauso, faktai pagal cABCDE, planas, paskirstymas, klausimai, patikrinimas (#41).",
    "ref": [
     "#/s/stop",
     "#/igudis/41"
    ]
   }
  ]
 },
 {
  "id": "s43",
  "pav": "Perdavimas evakuacijai",
  "tema": "Komanda",
  "q": [
   {
    "sit": "Karys su šautine šlaunies žaizda stabilizuotas Role 1 punkte: turniketas nuo 09:40, 2 PVK, skirta TXA ir ketaminas. Sraigtasparnis nusileis po 5 min, pilotas ragina skubėti.",
    "gp": {
     "AKS": "106/68",
     "ŠSD": "108",
     "SpO₂": "96 %"
    },
    "klaus": "Ką komanda daro prieš perkeldama pacientą ant neštuvų?",
    "opt": [
     {
      "t": "Krauna iškart – ABCDE ir intervencijas įvertins ore",
      "ok": false
     },
     {
      "t": "Dokumentus perduos vėliau radijo ryšiu – svarbiausia laikas",
      "ok": false
     },
     {
      "t": "Pakartoja ABCDE ir intervencijas; dokumentai su laikais – prie paciento",
      "ok": true
     }
    ],
    "why": "Prieš judant pakartotinai įvertinami ABCDE, turniketai, tvarsčiai, linijos; dokumentacija su laikais keliauja pritvirtinta prie paciento. Laikas – kuo trumpesnis, bet ne saugumo sąskaita (#46).",
    "ref": [
     "#/igudis/46",
     "#/mist"
    ]
   },
   {
    "sit": "Pacientas perkeliamas ant neštuvų. Dešinė blauzda įtvarinta dėl lūžio, ant kairės šlaunies – turniketas, pacientas dreba.",
    "gp": {},
    "klaus": "Kaip teisingai supakuoti pervežimui?",
    "opt": [
     {
      "t": "≥ 3 diržai (krūtinė, klubai, keliai) ne ant lūžio, apvalkalas, turniketas matomas",
      "ok": true
     },
     {
      "t": "Du diržai per blauzdas ir krūtinę, turniketas po apvalkalu, kad nešaltų",
      "ok": false
     },
     {
      "t": "Diržų nereikia – pacientas sąmoningas; apvalkalą uždėti jau sraigtasparnyje",
      "ok": false
     }
    ],
    "why": "Transporte – ne mažiau kaip 3 diržai (krūtinė, klubai, keliai), ne ant lūžio; hipotermijos apvalkalas; turniketai lieka matomi (#46).",
    "ref": [
     "#/igudis/46",
     "#/igudis/19"
    ]
   },
   {
    "sit": "Prie sraigtasparnio laukia evakuacijos medikas, kuris pacientą veš chirurgams. Variklis veikia, triukšminga.",
    "gp": {},
    "klaus": "Kada pacientas laikomas perduotu?",
    "opt": [
     {
      "t": "Kai pacientas pakrautas į sraigtasparnį ir uždarytos durys",
      "ok": false
     },
     {
      "t": "Kai priimantis medikas išklausė ATMIST ir perėmė stebėseną",
      "ok": true
     },
     {
      "t": "Kai dokumentai padėti ant neštuvų šalia paciento",
      "ok": false
     }
    ],
    "why": "Perduodama tiesiogiai priimančiam medikui, struktūruotai (ATMIST), atsakant į klausimus prieš išvykstant. Pacientas perduotas tik tada, kai priimantis išklausė perdavimą ir perėmė stebėseną (#46).",
    "ref": [
     "#/igudis/46",
     "#/s/atmist"
    ]
   }
  ]
 },
 {
  "id": "s44",
  "pav": "Kvėpavimas po opioidų",
  "tema": "Vaistai",
  "q": [
   {
    "sit": "Karys su atviru dilbio lūžiu po granatos sprogimo. Kovos medikas lauke suleido fentanilio į nosį, punkte titruotas morfinas IV. Po 15 min sužeistasis sunkiai pažadinamas, kvėpuoja retai.",
    "gp": {
     "AVPU": "P",
     "KD": "7",
     "SpO₂": "86 %",
     "AKS": "108/66"
    },
    "klaus": "Kas pirmiausia?",
    "opt": [
     {
      "t": "Tęsti morfino titravimą – sužeistasis vis dar dejuoja",
      "ok": false
     },
     {
      "t": "Atverti kvėpavimo takus, ventiliuoti, opioidų nebeskirti",
      "ok": true
     },
     {
      "t": "Laukti, kol pabus savaime, tik stebint SpO₂ monitoriuje",
      "ok": false
     }
    ],
    "why": "Kvėpavimui susilpnėjus – pirmiausia kvėpavimo takai ir ventiliacija, po opioidų – naloksonas. Opioidų skyrimas nutraukiamas, kai KD < 10 k./min (#43, Skausmo malšinimas).",
    "ref": [
     "#/igudis/43",
     "#/p/skausmas",
     "#/igudis/7"
    ]
   },
   {
    "sit": "A ventiliuoja Ambu maišu, SpO₂ kyla. A skiria naloksono IV; C turi 0,4 mg / 1 ml ampulę ir 10 ml švirkštą.",
    "gp": {
     "KD": "8",
     "SpO₂": "93 %"
    },
    "klaus": "Kaip C paruošia ir leidžia naloksoną?",
    "opt": [
     {
      "t": "Visą 0,4 mg ampulę neskiestą IV greitai, kartoti kas 30 s",
      "ok": false
     },
     {
      "t": "2 mg IV vienu boliusu, kad atsakas būtų garantuotas",
      "ok": false
     },
     {
      "t": "0,4 mg + 9 ml NaCl; po 0,1–0,2 mg (2,5–5 ml) kas 2–3 min iki KD > 10",
      "ok": true
     }
    ],
    "why": "Naloksonas skiedžiamas iki 0,04 mg/ml ir titruojamas po 0,1–0,2 mg kas 2–3 min iki KD > 10 k./min, neprarandant nuskausminimo. Per greitas atstatymas – abstinencija, hipertenzija, aritmijos, plaučių edema (Vaistai: naloksonas).",
    "ref": [
     "#/vaistas/naloksonas",
     "#/p/skiedimas"
    ]
   },
   {
    "sit": "Po 0,2 mg naloksono sužeistasis atsimerkia ir kvėpuoja pats. Skausmas 5/10. Evakuacija užtruks.",
    "gp": {
     "AVPU": "A",
     "KD": "14",
     "SpO₂": "95 %"
    },
    "klaus": "Kas toliau?",
    "opt": [
     {
      "t": "Stebėti kvėpavimą – slopinimas gali atsinaujinti; skausmui svarstyti ketaminą",
      "ok": true
     },
     {
      "t": "Kvėpavimas atsistatė – stebėsena nebereikalinga, ruošti evakuacijai",
      "ok": false
     },
     {
      "t": "Skausmui skirti midazolamo – jis su opioidais kvėpavimo neslopina",
      "ok": false
     }
    ],
    "why": "Naloksonas veikia 1–4 val., kai kurie opioidai – ilgiau, todėl slopinimas gali atsinaujinti. Ketaminą paprastai saugu skirti jau gavusiam opioidų; benzodiazepinų su opioidais nederinkite (Vaistai).",
    "ref": [
     "#/vaistas/naloksonas",
     "#/vaistas/ketaminas",
     "#/vaistas/midazolamas"
    ]
   }
  ]
 },
 {
  "id": "s45",
  "pav": "Pykinimas prieš skrydį",
  "tema": "Vaistai",
  "q": [
   {
    "sit": "Karys sužeistas drono numesta granata: skeveldros pilve ir šlaunyje, pilvas įtemptas. Skirtas ketaminas, ruošiamasi sraigtasparnio evakuacijai. Sužeistąjį pykina, jis žiaukčioja.",
    "gp": {
     "AVPU": "A",
     "AKS": "102/64",
     "ŠSD": "112",
     "SpO₂": "95 %"
    },
    "klaus": "Kurį antiemetiką skirti?",
    "opt": [
     {
      "t": "Ondansetroną 4 mg IV lėtai (ne greičiau kaip per 30 s)",
      "ok": true
     },
     {
      "t": "Metoklopramidą 10 mg IV – tinka visiems traumos pacientams",
      "ok": false
     },
     {
      "t": "Antiemetiko nereikia – ketaminas pykinimo nesukelia",
      "ok": false
     }
    ],
    "why": "Pirmo pasirinkimo antiemetikas – ondansetronas 4 mg IV / IO / IM / ODT kas 8 val. Metoklopramidas neskiriamas įtariant pilvo traumą su kraujavimu ar perforacija; ketaminas gali sukelti pykinimą (Vaistai).",
    "ref": [
     "#/vaistas/ondansetronas",
     "#/vaistas/metoklopramidas",
     "#/vaistas/ketaminas"
    ]
   },
   {
    "sit": "C ruošia ondansetroną pagal skiedimo lentelę: 8 mg + 16 ml NaCl = 0,4 mg/ml, 20 ml švirkšte.",
    "gp": {},
    "klaus": "Kiek ml reikia 4 mg dozei?",
    "opt": [
     {
      "t": "4 ml",
      "ok": false
     },
     {
      "t": "2 ml",
      "ok": false
     },
     {
      "t": "10 ml",
      "ok": true
     }
    ],
    "why": "4 mg ÷ 0,4 mg/ml = 10 ml. Dozė nėra tūris – tikrinkite koncentraciją, švirkštą paženklinkite, IV leiskite lėtai (#24, Vaistų skiedimo lentelės).",
    "ref": [
     "#/igudis/24",
     "#/p/skiedimas",
     "#/zymejimas"
    ]
   },
   {
    "sit": "Prieš skrydį A peržiūri pacientą: dešinėje – pleuros drenas, įvestas ŠPK, deguonies balionas pusiau tuščias.",
    "gp": {
     "SpO₂": "94 %"
    },
    "klaus": "Į ką atsižvelgti dėl skrydžio aukštyje?",
    "opt": [
     {
      "t": "Aukštis pacientui įtakos neturi – svarbu tik skrydžio trukmė",
      "ok": false
     },
     {
      "t": "Plečiasi dujos, didėja hipoksijos rizika – pakankamai deguonies",
      "ok": true
     },
     {
      "t": "Pleuros dreną prieš skrydį ištraukti, kad niekur neužkliūtų",
      "ok": false
     }
    ],
    "why": "Aukštyje krinta slėgis: plečiasi dujos (pneumotoraksas – drenas; manžetės, balionėliai), didėja hipoksijos rizika. Įranga pritvirtinama, deguonies – pakankamai (#46).",
    "ref": [
     "#/igudis/46"
    ]
   }
  ]
 },
 {
  "id": "s46",
  "pav": "Nudegimai: plotas ir skysčiai",
  "tema": "Nudegimai",
  "q": [
   {
    "sit": "Į šarvuotį pataikius prieštankinei raketai, užsidegė vidus. Atvežtas vairuotojas: nudegęs liemuo ir dešinė ranka, iš kairės šlaunies skeveldros žaizdos pulsuojamai bėga kraujas.",
    "gp": {
     "AVPU": "V",
     "KD": "26",
     "AKS": "92/58",
     "ŠSD": "124"
    },
    "klaus": "Ką komanda sprendžia pirmiausia?",
    "opt": [
     {
      "t": "Vėsina nudegimus vėsiu tekančiu vandeniu 20 min",
      "ok": false
     },
     {
      "t": "Skaičiuoja nudegimo plotą, kad galėtų pradėti skysčius",
      "ok": false
     },
     {
      "t": "Stabdo masyvų kraujavimą, toliau cABCDE; nudegimai – vėliau",
      "ok": true
     }
    ],
    "why": "Nudegęs pacientas pirmiausia yra traumos pacientas: kraujavimas, kvėpavimo takai ir šokas sprendžiami prieš nudegimus. Hemoraginis šokas – kraujas pirmiausia (#48).",
    "ref": [
     "#/igudis/48",
     "#/s/esc-kraujas"
    ]
   },
   {
    "sit": "Kraujavimas sustabdytas turniketu. Antrinėje apžiūroje: liemens priekis ir visa dešinė ranka – pūslės ir balti plotai, veidas tik paraudęs, be pūslių.",
    "gp": {},
    "klaus": "Koks nudegimo plotas pagal devyneto taisyklę?",
    "opt": [
     {
      "t": "≈ 31,5 % – kartu su paraudusiu veidu",
      "ok": false
     },
     {
      "t": "≈ 27 % – liemens priekis 18 % ir ranka 9 %",
      "ok": true
     },
     {
      "t": "≈ 18 % – pūslės (II laipsnis) neskaičiuojamos",
      "ok": false
     }
    ],
    "why": "Skaičiuojami tik II–III laipsnio nudegimai: liemens priekis 18 %, visa ranka 9 %. Paraudęs veidas (I laipsnis) į plotą neįskaičiuojamas (#48).",
    "ref": [
     "#/igudis/48",
     "#/nudegimai"
    ]
   },
   {
    "sit": "Vairuotojas sveria 80 kg, nudegimai 27 % KPP, trauma įvyko prieš 1 val. A skiria Ringerio laktatą pagal Parkland formulę (4 ml × kg × % KPP per 24 val.).",
    "gp": {
     "AKS": "104/66",
     "ŠSD": "114"
    },
    "klaus": "Kiek skysčių reikia per pirmas 8 valandas?",
    "opt": [
     {
      "t": "4320 ml per pirmas 8 val. nuo traumos (≈ 540 ml/val.)",
      "ok": true
     },
     {
      "t": "8640 ml per pirmas 8 val. – visas paros kiekis",
      "ok": false
     },
     {
      "t": "4320 ml per 8 val., skaičiuojant nuo atvykimo į punktą",
      "ok": false
     }
    ],
    "why": "4 × 80 × 27 = 8640 ml per 24 val.; pusė (4320 ml) – per pirmas 8 val. nuo traumos, ne nuo atvykimo. Titruojama pagal diurezę 0,5–1 ml/kg/val. (įrankis Nudegimai, #48).",
    "ref": [
     "#/nudegimai",
     "#/igudis/48",
     "#/igudis/27"
    ]
   }
  ]
 },
 {
  "id": "s47",
  "pav": "Cheminis nudegimas",
  "tema": "Nudegimai",
  "q": [
   {
    "sit": "Artilerijos smūgis į technikos parką: sprogusi talpa apibėrė karį sausomis cheminėmis medžiagomis. Ant uniformos ir dilbių – milteliai, oda parausta, dilbiuose pūslės.",
    "gp": {
     "AVPU": "A",
     "KD": "20",
     "SpO₂": "97 %",
     "ŠSD": "98"
    },
    "klaus": "Ką daryti pirmiausia, užtikrinus savo saugumą?",
    "opt": [
     {
      "t": "Trumpai, 2–3 min, apipilti vandeniu ir greitai sutvarstyti",
      "ok": false
     },
     {
      "t": "Nukirpti drabužius, nušluostyti miltelius, plauti vandeniu 20–30 min",
      "ok": true
     },
     {
      "t": "Miltelius palikti, užtepti riebalų ir sandariai uždengti tvarsčiu",
      "ok": false
     }
    ],
    "why": "Cheminis nudegimas: sausi milteliai nušluostomi, plaunama tekančiu vandeniu 20–30 min; drabužiai aplink nudegimą nukerpami. Riebalų netepkite (#48).",
    "ref": [
     "#/igudis/48",
     "#/igudis/32"
    ]
   },
   {
    "sit": "Nuplovus matyti, kad abu dilbiai nudegę ratu. Ant kairės rankos – laikrodis ir žiedas, pirštai pradeda tinti.",
    "gp": {},
    "klaus": "Kaip sutvarkyti rankas?",
    "opt": [
     {
      "t": "Nuimti laikrodį ir žiedą, uždengti plėvele išilginėmis juostomis",
      "ok": true
     },
     {
      "t": "Sandariai apvynioti plėvele aplink ranką, papuošalus nuimti ligoninėje",
      "ok": false
     },
     {
      "t": "Nuplėšti prilipusius drabužius ir uždėti tvirtą spaudžiamąjį tvarstį",
      "ok": false
     }
    ],
    "why": "Žiedai ir laikrodžiai nuimami, prilipę drabužiai neplėšiami. Uždengiama sausu steriliu tvarsčiu arba skaidria plėvele išilginėmis juostomis, nesuspaudžiant galūnių (#48).",
    "ref": [
     "#/igudis/48"
    ]
   },
   {
    "sit": "Nudegimai – apie 9 % KPP. Rašytojas klausia, ar skirti ceftriaksono ir pradėti skysčius pagal Parkland formulę.",
    "gp": {
     "AKS": "128/80",
     "ŠSD": "96"
    },
    "klaus": "Koks teisingas sprendimas?",
    "opt": [
     {
      "t": "Ceftriaksonas 2 g IV dėl nudegimų ir Ringerio laktatas pagal formulę",
      "ok": false
     },
     {
      "t": "Ringerio laktatas pagal formulę, antibiotikų nereikia",
      "ok": false
     },
     {
      "t": "Antibiotikų dėl nudegimų nereikia, skysčiai pagal būklę",
      "ok": true
     }
    ],
    "why": "Skysčiai pagal formulę – kai > 20 % KPP; mažesniems – pagal būklę. Antibiotikai neskiriami vien dėl nudegimų; žiediniams nudegimams tikrinamas distalinis pulsas (#48).",
    "ref": [
     "#/igudis/48",
     "#/nudegimai",
     "#/vaistas/cefadroksilis"
    ]
   }
  ]
 },
 {
  "id": "s48",
  "pav": "Užsitęsusi evakuacija",
  "tema": "Nudegimai",
  "q": [
   {
    "sit": "Dėl dronų grėsmės evakuacija atidėta 6 val. Kulkosvaidininkas su 35 % KPP nudegimais po BMP gaisro guli priedangoje ant betono grindų, tvarsčiai ir drabužiai permirkę, jis dreba.",
    "gp": {
     "T": "34,8 °C",
     "AKS": "110/68",
     "ŠSD": "116"
    },
    "klaus": "Kaip valdyti hipotermiją?",
    "opt": [
     {
      "t": "Pakeisti šlapius drabužius ir tvarsčius, izoliuoti nuo grindų, aktyviai šildyti",
      "ok": true
     },
     {
      "t": "Užkloti dar viena antklode ant šlapių tvarsčių – to visiškai pakanka",
      "ok": false
     },
     {
      "t": "Pakartotinai vėsinti nudegimus vandeniu – sumažės skausmas ir gylis",
      "ok": false
     }
    ],
    "why": "Nudegę ypač greitai šąla: nuimami šlapi drabužiai, izoliuojama nuo šalto paviršiaus, > 20 % KPP – šilumą atspindintis apvalkalas, šildymo antklodė, skysčiai per šildytuvą. Vien antklodės hipotermijos neišgydo (#19, #48).",
    "ref": [
     "#/igudis/19",
     "#/igudis/48"
    ]
   },
   {
    "sit": "Pacientas šildomas, bet skausmas 8/10, jis neramus. Veikia PVK, sveria 80 kg.",
    "gp": {
     "AVPU": "A",
     "KD": "20",
     "T": "35,2 °C",
     "AKS": "112/70"
    },
    "klaus": "Kaip malšinti skausmą?",
    "opt": [
     {
      "t": "Didelis morfino bolusas IV, kad iškart nuskausmintų visiškai",
      "ok": false
     },
     {
      "t": "Midazolamas nuraminti, po to fentanilis skausmui malšinti",
      "ok": false
     },
     {
      "t": "Tęsti šildymą; ketaminas 25 mg IV lėtai, titruoti, vertinti 0–10",
      "ok": true
     }
    ],
    "why": "Hipotermijai analgetikai skiriami ypač atsargiai, titruojant mažomis dozėmis; šildymas mažina skausmą (drebulys jį stiprina). Benzodiazepinų su opioidais nederinkite (#43, #19).",
    "ref": [
     "#/igudis/43",
     "#/p/skausmas",
     "#/vaistas/ketaminas"
    ]
   },
   {
    "sit": "Įvestas ŠPK, skysčiai lašinami pagal formulę. Per pastarąsias 2 val. surinkta 60 ml šlapimo.",
    "gp": {
     "AKS": "108/66",
     "ŠSD": "112"
    },
    "klaus": "Kaip vertinti diurezę?",
    "opt": [
     {
      "t": "30 ml/val. pakanka – formulę tęsti, nieko nekeičiant greičio",
      "ok": false
     },
     {
      "t": "30 ml/val. – mažiau už tikslą (40–80 ml/val.): didinti skysčių greitį",
      "ok": true
     },
     {
      "t": "Greitai suleisti 2 l boliusą – per daug skysčių tikrai nepakenks",
      "ok": false
     }
    ],
    "why": "Skysčiai titruojami pagal valandinę diurezę 0,5–1 ml/kg/val. (80 kg – 40–80 ml/val.), matuojamą per ŠPK. Per daug skysčių – tiek pat blogai, kaip per mažai (#48, #34).",
    "ref": [
     "#/igudis/34",
     "#/igudis/48",
     "#/nudegimai"
    ]
   }
  ]
 },
 {
  "id": "s49",
  "pav": "Skausmas keliems sužeistiesiems",
  "tema": "Vaistai",
  "q": [
   {
    "sit": "Po minosvaidžio apšaudymo vienu metu atvežti trys sužeistieji. Pirmasis – skeveldra šlaunyje, kraujavimas sustabdytas, blyškus, prakaituoja, skausmas 9/10, veikia PVK.",
    "gp": {
     "AVPU": "A",
     "KD": "24",
     "AKS": "86/50",
     "ŠSD": "128"
    },
    "klaus": "Kokia analgezija saugiausia?",
    "opt": [
     {
      "t": "Morfinas 10 mg IV greitai",
      "ok": false
     },
     {
      "t": "Fentanilis 100 mcg IV, kartoti kas 5 min iki 0/10",
      "ok": false
     },
     {
      "t": "Ketaminas 25 mg (0,2–0,3 mg/kg) IV lėtai per 1 min",
      "ok": true
     }
    ],
    "why": "Šoke saugesnis ketaminas; opioidų dozes mažinti, jų poveikis šoke vėluoja – dozė per greitai nekartojama. Tikslas – toleruojamas skausmas, ne 0/10 (Skausmo malšinimas, #43).",
    "ref": [
     "#/p/skausmas",
     "#/vaistas/ketaminas",
     "#/igudis/43"
    ]
   },
   {
    "sit": "Antrasis – atviras blauzdos lūžis, kraujavimo nėra, hemodinamika stabili, skausmas 7/10. PVK dar neįvestas, nosis švari.",
    "gp": {
     "AVPU": "A",
     "AKS": "132/84",
     "ŠSD": "96"
    },
    "klaus": "Kaip greitai nuskausminti?",
    "opt": [
     {
      "t": "Laukti, kol C įves PVK – kitaip analgezijos skirti negalima",
      "ok": false
     },
     {
      "t": "Įtvarkyti koją; ketaminas 50 mg į nosį (100 mg/ml, 0,5 ml) arba 100 mg IM",
      "ok": true
     },
     {
      "t": "Ketaminas 300 mg IM – kuo didesnė dozė, tuo greičiau nuskausmins",
      "ok": false
     }
    ],
    "why": "Nesant prieigos – IN arba IM (šoke IM įsisavinamas blogai, bet šis sužeistasis stabilus): ketaminas 50 mg į nosį ar 100 mg IM. Lūžio įtvarkymas mažina skausmą; didelės ketamino dozės sukelia anesteziją (#47, #43).",
    "ref": [
     "#/igudis/47",
     "#/vaistas/ketaminas",
     "#/igudis/43"
    ]
   },
   {
    "sit": "Trečiasis – paviršinės skeveldrų žaizdos dilbyje, sutvarstytos. Skausmas 3/10, sąmoningas, gali gerti.",
    "gp": {
     "AVPU": "A",
     "AKS": "124/78",
     "ŠSD": "88"
    },
    "klaus": "Ką skirti?",
    "opt": [
     {
      "t": "Paracetamolis 1000 mg ir cefadroksilis 1 g per burną",
      "ok": true
     },
     {
      "t": "Ketaminas 100 mg IM ir ceftriaksonas 2 g IV",
      "ok": false
     },
     {
      "t": "Fentanilis 100 mcg į nosį, antibiotikų nereikia",
      "ok": false
     }
    ],
    "why": "Lengvas skausmas, gali gerti – paracetamolis 1000 mg per burną kas 8 val. Kovinė žaizda visada užteršta: gali gerti – cefadroksilis 1 g per burną kartą per parą; ceftriaksonas – negalinčiam gerti (Vaistai, #32).",
    "ref": [
     "#/vaistas/paracetamolis",
     "#/vaistas/cefadroksilis",
     "#/p/skausmas"
    ]
   }
  ]
 },
 {
  "id": "s50",
  "pav": "Ketamino pompa pervežimui",
  "tema": "Vaistai",
  "q": [
   {
    "sit": "Karys su dubens ir šlaunies lūžiais po šarvuočio apvirtimo laukia ilgos evakuacijos. A skiria ketamino infuziją švirkštine pompa. C randa tik 100 mg/ml ampules.",
    "gp": {
     "AVPU": "A",
     "AKS": "118/72",
     "ŠSD": "102"
    },
    "klaus": "Kaip paruošti 50 ml švirkštą, kad būtų 10 mg/ml?",
    "opt": [
     {
      "t": "10 ml ketamino + 40 ml NaCl",
      "ok": false
     },
     {
      "t": "5 ml ketamino + 45 ml NaCl",
      "ok": true
     },
     {
      "t": "5 ml ketamino + 40 ml NaCl",
      "ok": false
     }
    ],
    "why": "Pompai: 500 mg ketamino + NaCl iki 50 ml = 10 mg/ml; su 100 mg/ml ampulėmis – 5 ml + 45 ml NaCl. Visada tikrinkite ampulės stiprumą (#25, Vaistai: ketaminas).",
    "ref": [
     "#/vaistas/ketaminas",
     "#/igudis/25",
     "#/p/skiedimas"
    ]
   },
   {
    "sit": "Švirkštas paruoštas ir paženklintas: ketaminas 10 mg/ml. Karys sveria 80 kg, paskirta pradėti nuo 0,5 mg/kg/val.",
    "gp": {},
    "klaus": "Kokį greitį nustatyti pompoje?",
    "opt": [
     {
      "t": "4 ml/val.",
      "ok": true
     },
     {
      "t": "40 ml/val.",
      "ok": false
     },
     {
      "t": "0,4 ml/val.",
      "ok": false
     }
    ],
    "why": "0,5 mg/kg/val. × 80 kg = 40 mg/val.; 40 mg ÷ 10 mg/ml = 4 ml/val. Greitis skaičiuojamas pagal švirkšto, ne ampulės koncentraciją (#25).",
    "ref": [
     "#/igudis/25",
     "#/p/skiedimas"
    ]
   },
   {
    "sit": "Atvyksta evakuacinė mašina. Lašinamas šildytas tirpalas, veikia ketamino pompa, ant rankų – dvi linijos.",
    "gp": {
     "AVPU": "A",
     "KD": "16",
     "SpO₂": "96 %"
    },
    "klaus": "Ką C turi užtikrinti prieš pervežimą?",
    "opt": [
     {
      "t": "Pompą kelionei sustabdyti ir vėl paleisti tik atvykus",
      "ok": false
     },
     {
      "t": "Linijų žymėti nereikia – priimantis medikas susigaudys pats",
      "ok": false
     },
     {
      "t": "Švirkštas paženklintas, linijos atsektos ir pažymėtos, vaistai užrašyti",
      "ok": true
     }
    ],
    "why": "Infuzijos perkeliamos į pervežimo pompas, kiekviena linija atsekama nuo maišelio iki paciento ir pažymima, vaistai dokumentuojami su laikais. Ketamino infuzija – su kvėpavimo stebėsena (#46, #25).",
    "ref": [
     "#/igudis/46",
     "#/igudis/25",
     "#/zymejimas"
    ]
   }
  ]
 }
];
