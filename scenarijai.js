// ETC gidas – TRENIRUOČIŲ SCENARIJAI (tools.js SC). Kiekvienas atsakymas paremtas gido turiniu (ref – nuorodos į įgūdžius, sąrašus, vaistus).
// Laukai: id, pav, tema, q: [{sit, gp (gyvybės požymiai), klaus, opt: [{t, ok}], why, ref}].
window.ETC = window.ETC || {};

window.ETC.scenarijai = [
 {
  "id": "s1",
  "pav": "Šlaunies amputacija",
  "tema": "Kraujavimas",
  "q": [
   {
    "sit": "Atvežamas sužeistasis po sprogimo: kairės šlaunies amputacija, iš kelmo pulsuojamai bėga kraujas. Turniketo nėra. A atlieka 5 s apžiūrą.",
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
    "sit": "Vairuotojas po apvirtimo, veido trauma. Reaguoja tik į skausmą, girdimas burbuliavimas, burnoje kraujas. Kaklo trauma neatmesta.",
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
    "sit": "Dūris peiliu į dešinę krūtinės pusę. B mato žaizdą, kuri įkvepiant burbuliuoja ir švilpia.",
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
    "sit": "Pėsčiąjį prieš 40 min partrenkė automobilis. Galvos traumos požymių nėra, bet sumišęs. Radialinis pulsas silpnas, oda blyški, šalta, drėgna.",
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
  "pav": "Kritimas nuo laiptų",
  "tema": "Galva",
  "q": [
   {
    "sit": "Vyras nukrito nuo laiptų, kaktos žaizda. Kitų sužalojimų ir šoko požymių nerasta. Kvėpuoja paviršutiniškai.",
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
  "pav": "Gaisras bute",
  "tema": "Nudegimai",
  "q": [
   {
    "sit": "Ištrauktas iš degančio buto. Veido nudegimai, apdegę nosies plaukai, suodžiai skrepliuose, balsas užkimęs. Kol kas kalba.",
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
    "sit": "Atvežamas sužeistasis su šautine žaizda krūtinėje. A 5 s apžiūroje: nereaguoja, kvėpuoja agoniškai, centrinio pulso nėra.",
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
  "pav": "Motociklininko dubuo",
  "tema": "Šokas",
  "q": [
   {
    "sit": "Motociklininkas po susidūrimo, skundžiasi dubens skausmu. Išorinio kraujavimo nėra, bet yra šoko požymių. B pradeda dubens vertinimą.",
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
    "sit": "Atviras blauzdos lūžis, kraujavimas sustabdytas, galūnė dar neįtvarkyta. Skausmas 8/10, yra šoko požymių. A skiria analgeziją.",
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
    "sit": "Pirminė apžiūra baigta, gyvybei pavojingos būklės sutvarkytos. Pacientas ištrauktas iš vandens griovio, drabužiai šlapi, dreba.",
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
 }
];
