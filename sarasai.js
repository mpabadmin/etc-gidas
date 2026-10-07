// ETC kišeninis gidas – VAIDMENYS, KONTROLINIAI SĄRAŠAI, ESCAPE PLANAI, MOKYMOSI TEMOS
// Šaltiniai: ETC vertinimo lapas (A, B, C, Escape, komandos darbas, gydymo kokybė), ETC įgūdžių lapas
// (darbo vietos schema, vaistų lentelės, kraujo suderinamumas), ETC vadovas 4.1 (1–4 sk.), TCCC vaistų vadovas,
// kuopos pirminio ištyrimo tvarka: A – komandos vadas; B – visa apžiūra iki 2 min; C – iškart PVK/IO, kraujo grupė, gliukozė.
// Sąrašo punktas: { t: tekstas, s: [papunkčiai], g: kam skirta, k: true – svarbiausias, i: paaiškinimas mokymosi režimui }
// { h: 'Antraštė' } – skyriaus antraštė sąraše (nežymima).
window.ETC = window.ETC || {};

(function () {
const E = window.ETC;
const KOMP = 'Pagal kompetenciją', MED = 'Medicinos personalui', GYD = 'Gydytojui', INT = 'Intubuojantiems gydytojams';
const link = (href, t, s) => `<a class="row" href="${href}"><div>${t}${s ? '<small>' + s + '</small>' : ''}</div><span class="ar">›</span></a>`;

E.versija = '2026-10-08 v5 (vaistai – pagal TCCC 2026 ir PCS; įgūdžių esmė ir vaizdo įrašai; nauja struktūra)';

// ───────── VAIDMENYS ─────────
E.vaidmenys = [
  { id: 'A', cls: 'rA', pav: 'A komandos narys – kvėpavimo takai, komandos vadas', sub: 'Airway · vadas', lists: ['a-pas', 'atmist', 'a-pir', 'a-plan', 'a-ant'], vadovas: true,
    aprasymas: '<b>Vieta:</b> prie paciento galvūgalio. A narys yra ir komandos vadas: veda instruktažą, atlieka 5 s apžiūrą ir garsiai paskelbia Planą A arba Escape planą, perima ATMIST informaciją, užtikrina kvėpavimo takus ir deguonį, vertina neurologiją, renka B ir C radinius, perskirsto darbą, po pirminės apžiūros atlieka „10 už 10“ ir planuoja tolesnį kelią. Antrinėje apžiūroje – galva, veidas, anamnezė (AMPLE) ir radinių apibendrinimas.' },
  { id: 'B', cls: 'rB', pav: 'B komandos narys – kvėpavimas', sub: 'Breathing', lists: ['b-pas', 'b-pir', 'b-ant'],
    aprasymas: '<b>Vieta:</b> vienoje paciento pusėje, šalia echoskopo. Visiškai atidengia pacientą, uždeda EKG ir SpO₂, apžiūri kaklą ir krūtinės ląstą, taip pat pilvą, dubenį, tarpvietę ir galūnes dėl kraujavimo. Visą apžiūrą stetoskopu ir rankomis atlieka ne ilgiau nei per 2 min ir <b>tik tada</b> praneša radinius A nariui. <b>Išimtis</b> – gyvybei pavojinga būklė: apie ją praneša iškart. Radęs nestabilų dubenį ar kraujo tarpvietėje, dubens diržą uždeda kartu su C. Kartu su C apverčia pacientą ir apžiūri nugarą – <b>prieš e-FAST</b>. Drenavimas ir e-FAST – pagal kompetenciją. Antrinėje apžiūroje atlieka A nario nurodytas procedūras ir padeda C nariui.' },
  { id: 'C', cls: 'rC', pav: 'C komandos narys – kraujotaka', sub: 'Circulation', lists: ['c-pas', 'c-pir', 'c-ant'],
    aprasymas: '<b>Vieta:</b> kitoje paciento pusėje, prie stovo skysčiams ir infuzomatams. <b>Iškart atvykus pacientui, nelaukdamas A nurodymo,</b> įveda PVK arba intrakaulinę (IO) adatą ir visiems pacientams nustato kraujo grupę ir gliukozę. Uždeda AKS manžetę, vertina šoko požymius ir aiškiai pasako, ar pacientas yra hemoraginiame šoke. Kartu su B uždeda dubens diržą ir verčia pacientą ant šono. Ruošia vaistus ir kraujo komponentus, rūpinasi hipotermijos prevencija.' }
];

// ───────── ESCAPE PLANAI ─────────
E.escape = ['esc-kraujas', 'esc-kt', 'esc-tss'];

E.sarasai = {
  'esc-kraujas': {
    title: 'Katastrofinis kraujavimas', short: 'Kraujavimas',
    intro: 'Komandos vadas (A) aiškiai paskelbia prioritetinę problemą. Pirminė apžiūra netęsiama, kol kraujavimas nesustabdytas.',
    items: [
      { t: 'A (komandos vadas) aiškiai paskelbė: katastrofinis kraujavimas', k: true },
      { t: 'B ir C nariams nurodyta stabdyti kraujavimą', k: true },
      { t: 'Taikytas tiesioginis spaudimas' },
      { t: 'Uždėtas turniketas, pažymėtas laikas', k: true, i: 'Pradžios ekrane spauskite kortelę „Turniketas“ → „Dabar“.' },
      { t: 'Žaizda tamponuota hemostatine marle / TXA suvilgytu tvarsčiu' },
      { t: 'Įtariant kraujavimą iš dubens – uždėtas dubens diržas' },
      { t: 'Skirta traneksamo rūgštis (per 3 val. nuo traumos)', g: MED },
      { t: 'Skirti kraujo komponentai / aktyvuotas masinio kraujavimo protokolas', g: MED },
      { t: 'Esant kraujo transfuzijai – užtikrintas kalcio kiekis', g: MED },
      { t: 'Kraujavimą sustabdžius – grįžtama prie Plano A' }
    ]
  },
  'esc-kt': {
    title: 'Kvėpavimo takų obstrukcija', short: 'Kvėpavimo takai',
    intro: 'Komandos vadas (A) aiškiai paskelbia prioritetinę problemą ir paskirsto užduotis.',
    items: [
      { t: 'A (komandos vadas) aiškiai paskelbė: kvėpavimo takų obstrukcija', k: true },
      { t: 'B nariui nurodyta ruošti kriko rinkinį', g: KOMP, k: true },
      { t: 'Pakviesta ekspertinė pagalba', k: true },
      { t: 'Atsiurbti kvėpavimo takai' },
      { t: 'Pabandyta atverti kvėpavimo takus', k: true },
      { t: 'Nesąmoningam – įdėtas orofaringinis vamzdelis, jei dar neįdėtas' },
      { t: 'Įdėta laringinė kaukė', g: KOMP },
      { t: 'Ventiliuojama ambu maišu' },
      { t: 'Padidintas deguonies srautas' }
    ]
  },
  'esc-tss': {
    title: 'Trauminis širdies sustojimas', short: 'Širdies sustojimas',
    intro: 'Sąrašas atitinka ETC vertinimo lapą. ETC vadove nurodoma iškart pradėti trauminio širdies sustojimo (TCA) algoritmą (5c skyrius). Šaltiniuose jo nėra – detalius veiksmus papildykite pagal kuopos protokolą.',
    items: [
      { t: 'A (komandos vadas) aiškiai paskelbė: trauminis širdies sustojimas', k: true },
      { t: 'Pradėtas trauminio širdies sustojimo (TCA) algoritmas', k: true },
      { t: 'Konstatuota mirtis' }
    ]
  },

  // ───────── A – komandos vadas ─────────
  'a-pas': {
    title: 'A – instruktažas ir pasiruošimas', short: 'Pasiruošimas',
    intro: 'A narys – komandos vadas. Vieta – prie paciento galvūgalio. Šalia: kvėpavimo takų priemonės ir drenai, atsiurbėjas, DPV ir deguonis.',
    items: [
      { h: 'Komandos instruktažas' },
      { t: 'Komandos nariai prisistatė vieni kitiems' },
      { t: 'Pasidalinta informacija prieš atvykimą (ATMIST)' },
      { t: 'Patikrintos narių kompetencijos, jaunesniems paskirta vyresniųjų parama' },
      { t: 'Paskirstyti vaidmenys: A, B, C, rašytojas', k: true },
      { t: 'Suformuluotas Planas A', k: true },
      { t: 'Aptartas Planas B ir Escape planai', s: ['Skubus perkėlimas į operacinę', 'Netikėtas širdies sustojimas', 'Katastrofinis kraujavimas, kvėpavimo takų obstrukcija'] },
      { t: 'Įvertintas papildomų išteklių poreikis', s: ['Personalas (pvz., vyresnis kolega)', 'Įranga: masinio kraujo perpylimo sistema, sudėtingų kvėpavimo takų rinkinys'] },
      { t: 'Informuoti: kraujo bankas, radiologija, operacinė, intensyvioji terapija' },
      { t: 'Laikomasi standartinių atsargumo priemonių' },
      { t: 'Kiekvienas narys patikrino savo įrangą, visi žino, kaip kviesti pagalbą' },
      { t: 'Patalpa ir skysčiai pašildyti' },
      { t: 'Nariai galėjo užduoti klausimus ir išsakyti abejones' },
      { h: 'A įranga' },
      { t: 'Paruošta visa bazinė ir pažangi kvėpavimo takų įranga', k: true },
      { t: 'Atsiurbėjas paruoštas ir veikia' },
      { t: 'DPV patikrintas ir paruoštas' },
      { t: 'Paruoštas deguonies šaltinis: koncentratorius / balionai' },
      { t: 'Paruošti kaklo įtvaras, galvos fiksatoriai ir juostos' },
      { t: 'Escape planas: laringinė kaukė, kriko rinkinys, paskirtas kriko atlikėjas', k: true },
      { t: 'Paruošta analgezija', g: MED },
      { t: 'RSI kontrolinis sąrašas, jei planuojama bendroji anestezija', g: INT }
    ]
  },
  'atmist': {
    title: 'ATMIST perdavimas', short: 'ATMIST',
    intro: 'Vienoda perdavimo struktūra padeda neprarasti informacijos. Prieš perdavimą A narys (komandos vadas) atlieka 5 s apžiūrą. C narys tuo metu jau įveda PVK / IO.',
    items: [
      { t: 'A – amžius, lytis, svarbi anamnezė', s: ['Pvz., nėštumas, antikoaguliantai (varfarinas)'] },
      { t: 'T – traumos laikas', k: true, i: 'Pažymėkite pradžios ekrane (kortelė „Trauma“) – kortelė „TXA iki“ parodys terminą.' },
      { t: 'M – mechanizmas', s: ['Bendras mechanizmas: eismo įvykis, dūris ir kt.', 'Rizikos veiksniai: įstrigimas, apvirtimas, išmetimas iš transporto priemonės, kritimas iš aukščio'] },
      { t: 'I – įtariami sužalojimai' },
      { t: 'S – požymiai ir simptomai', s: ['Kvėpavimo dažnis, SpO₂', 'Širdies susitraukimų dažnis, kraujospūdis', 'GKS, židininis neurologinis deficitas', 'Skausmas', 'Gyvybinių funkcijų tendencijos'] },
      { t: 'T – taikytas gydymas ir kas numatoma atvykus', k: true, s: ['Turniketai ir jų uždėjimo laikas', 'Kitos intervencijos', 'Skirti vaistai', 'Kas numatoma (pvz., masinė transfuzija)'] }
    ]
  },
  'a-pir': {
    title: 'A – pirminė apžiūra', short: 'Pirminė',
    intro: 'C narys iškart pats įveda PVK / IO ir nustato kraujo grupę bei gliukozę – nurodymo nereikia. B narys radinius praneša baigęs visą apžiūrą (iki 2 min), gyvybei pavojingą būklę – iškart.',
    items: [
      { h: '5 sekundžių apžiūra' },
      { t: 'Atlikta 5 s apžiūra – vertinimo trikampis', k: true, s: ['Socialinė sąveika: ramus / susijaudinęs / nėra', 'Kvėpavimo pastangos: normalios / padidėjusios / nėra', 'Odos perfuzija: rožinė / blyški, marmuruota / nėra'],
        i: 'Plačiau – tema „ETC eiga“.' },
      { t: 'Atmesta: katastrofinis kraujavimas, kvėpavimo takų obstrukcija, trauminis širdies sustojimas', k: true },
      { t: 'Garsiai paskelbta: tęsiamas Planas A arba aktyvuojamas Escape planas', k: true },
      { t: 'Perimtas ATMIST perdavimas (skirtukas ATMIST)' },
      { h: 'Kvėpavimo takai ir neurologija' },
      { t: 'Įvertintas kvėpavimo takų praeinamumas', k: true, s: ['Laisvi', 'Obstrukcija – užkritęs liežuvis / skystis / tinimas'], i: 'Įgūdžiai #2, #3.' },
      { t: 'Apžiūrėta burnos ertmė', s: ['Atsiurbti: nereikia / reikia'] },
      { t: 'Įvertintas orofaringinio vamzdelio poreikis (koma / obstrukcija)', i: 'Įgūdis #6.' },
      { t: 'Įvertintas kvėpavimo nepakankamumas ir deguonies poreikis', s: ['Deguonies nereikia', 'Nosies kaniulės, deguonis < 6 l/min', 'Deguonies kaukė, deguonis > 6 l/min'], i: 'Įgūdžiai #4, #5.' },
      { t: 'Įvertinta, ar gerai ventiliuojasi plaučiai', s: ['Ventiliacija ambu maišu: nereikia / reikia'], i: 'Įgūdis #7.' },
      { t: 'Įvertinta, ar pakankamai deguonies patenka į plaučius', s: ['Pakankamai / nepakankamai'] },
      { t: 'Įvertinta, ar nereikia eskaluoti kvėpavimo takų valdymo', k: true,
        s: ['Paskelbta didelės rizikos kriko situacija', 'Pakviesta ekspertinė pagalba dėl intubacijos', 'Pabandyta atsiurbti',
            'Orofaringinis vamzdelis (nesąmoningam)', 'Dažnesnė ir didesnio tūrio ventiliacija ambu maišu', 'Orofaringinis vamzdelis pakeistas laringine kauke',
            'Padidintas deguonies srautas'],
        i: 'Įgūdis #8. Kvėpavimo takų planai A–D ir Vortex principas – tema „Kvėpavimo takai ir krūtinė“.' },
      { t: 'Įvertinta neurologija', s: ['AVPU', 'Vyzdžių dydis ir reakcija į šviesą', 'Galūnių motorika – simetriška / nesimetriška'], i: 'Įgūdis #12.' },
      { h: 'Komandos valdymas' },
      { t: 'Gauti B nario radiniai: po visos apžiūros ir po e-FAST', k: true, i: 'Uždaro ciklo (closed-loop) komunikacija: pakartokite, ką išgirdote.' },
      { t: 'Gauti C nario duomenys: prieiga, kraujo grupė, gliukozė, šoko požymiai' },
      { t: 'Darbas perskirstytas pagal klinikinę situaciją' },
      { t: 'Prireikus aktyvuotas masinio kraujavimo protokolas' },
      { t: 'Iškilus netikėtai problemai – paskelbtas STOP (10 už 10)' }
    ]
  },
  'a-plan': {
    title: 'A – po pirminės apžiūros', short: 'Planavimas',
    intro: 'Apibendrinimas ir planavimas – ne ilgiau nei 5 min.',
    items: [
      { t: 'Atlikta „10 už 10“ – radiniai peržiūrėti pagal algoritmą', k: true },
      { t: 'Su komanda aptartas pirminis gydymas / planas', k: true },
      { t: 'Įvertintas atsakas į gydymą' },
      { t: 'Įvertintas skausmas (0–10), skirta titruojama analgezija', g: MED, i: 'Žr. temą „Skausmo malšinimas“.' },
      { t: 'Visi komandos nariai žino paciento problemas ir ištyrimo / gydymo etapą' },
      { t: 'Patikrinti gydymo tikslai (sąrašas „Gydymo tikslai ir kokybė“)' },
      { t: 'Nuspręsta dėl tolesnio kelio: vaizdiniai tyrimai, operacinė, intensyvioji terapija, pervežimas' },
      { t: 'Informuoti priimantys skyriai, dokumentai perduoti su pacientu' },
      { t: 'Atlikta arba suplanuota antrinė apžiūra, neatlikti elementai įrašyti' }
    ]
  },
  'a-ant': {
    title: 'A – antrinė apžiūra', short: 'Antrinė',
    intro: 'Visa apžiūra nuo galvos iki kojų – sąrašas „Antrinė apžiūra nuo galvos iki kojų“.',
    items: [
      { h: 'Galva ir veidas' },
      { t: 'Patikrintos nosies landos ir veido kaulų stabilumas' },
      { t: 'Įtariant veido kaulų nestabilumą – uždėtas kaklo įtvaras ir dantų blokeliai (A nurodo, atlieka B)' },
      { t: 'Įvertinta, ar nėra nosies pertvaros hematomos' },
      { t: 'Kraujuojant – užtamponuotos priekinė ir užpakalinė nosies ertmės abipus (A nurodo, atlieka B)', g: KOMP, i: 'Įgūdis #29.' },
      { t: 'Apžiūrėti akių obuoliai, įvertinta, ar nėra retrobulbarinės hematomos' },
      { t: 'Esant įtarimui – atlikta lateralinė kantotomija', g: KOMP, i: 'Įgūdis #28.' },
      { t: 'Apžiūrėtos ausų landos dėl kraujavimo' },
      { t: 'Apžiūrėtas kaukolės skliautas' },
      { t: 'Įvertinta, ar nėra kaukolės pamato lūžio ir galvos smegenų pažeidimo požymių' },
      { t: 'Apžiūrėta, ar nėra nudegimų' },
      { h: 'Anamnezė (AMPLE)' },
      { t: 'A – alergijos' },
      { t: 'M – vartojami vaistai (pvz., antikoaguliantai)' },
      { t: 'P – ankstesnės ligos' },
      { t: 'L – paskutinis valgis / gėrimas' },
      { t: 'E – įvykiai, susiję su trauma' },
      { t: 'Patikslintas skiepijimo nuo stabligės statusas' },
      { t: 'Patikrinti drabužiai dėl vaistų ar alergijos požymių' },
      { h: 'Apibendrinimas' },
      { t: 'Antrinės apžiūros radiniai apibendrinti ir pasakyti komandai', k: true },
      { t: 'Neatlikti elementai įrašyti į problemų sąrašą' }
    ]
  },

  // ───────── B ─────────
  'b-pas': {
    title: 'B – pasiruošimas', short: 'Pasiruošimas',
    intro: 'Vieta – vienoje paciento pusėje, šalia echoskopo.',
    items: [
      { t: 'Monitorius veikia: EKG, SpO₂, AKS', k: true },
      { t: 'Paruoštos žirklės drabužiams nukirpti' },
      { t: 'Paruošta pleuros drenavimo įranga', g: KOMP },
      { t: 'Paruošti okliuziniai tvarsčiai' },
      { t: 'Paruoštas echoskopas e-FAST tyrimui', g: KOMP },
      { t: 'Paruoštas kriko rinkinys, jei paskirta atlikti', g: KOMP },
      { t: 'Escape planas: veiksmai trauminio širdies sustojimo atveju', k: true }
    ]
  },
  'b-pir': {
    title: 'B – pirminė apžiūra', short: 'Pirminė',
    intro: 'Visa apžiūra stetoskopu ir rankomis – ne ilgiau nei 2 min. Radinius A nariui praneškite baigę visą apžiūrą. Išimtis – gyvybei pavojinga būklė (pvz., įtampinis pneumotoraksas, masyvus kraujavimas): apie ją pranešama iškart. Nugara apžiūrima prieš e-FAST.',
    items: [
      { t: 'Krūtinė ir pilvas visiškai atidengti (įtariant traumą – drabužiai nukirpti)' },
      { t: 'Uždėtas monitoringas: EKG, SpO₂', i: 'Įgūdis #15. AKS manžetę uždeda C.' },
      { t: 'Patikrintas kaklas, jei neuždėtas kaklo įtvaras', s: ['Trachėjos pasislinkimas', 'Žaizdos, hematomos', 'Kraujas ir skausmingumas po kaklu', 'Esant poreikiui – kaklo imobilizacija'] },
      { t: 'Įvertinta krūtinės ląsta', k: true, s: ['Kraujosruvos ir žaizdos', 'Simetriškas krūtinės ląstos kilnojimasis', 'Poodinė emfizema', 'Kvėpavimo dažnis', 'Respiracinis distresas', 'Auskultacija 3 taškuose kairėje ir dešinėje'],
        i: 'B atmeta 6 gyvybei pavojingas būkles: kvėpavimo takų obstrukciją, įtampinį pneumotoraksą, atvirą pneumotoraksą, masyvų hemotoraksą, nestabilią krūtinės ląstą, širdies tamponadą. Įgūdis #13.' },
      { t: 'Įvertinta, ar nėra įtampinio (hemo)pneumotorakso', k: true, s: ['Mažai tikėtinas – drenuoti nereikia', 'Labai tikėtinas – iškart pranešta A; drenuota, įvertinta, kiek išbėgo kraujo'], i: 'Įgūdis #14 – pleuros drenavimas (pagal kompetenciją).' },
      { t: 'Ant krūtinės ląstos žaizdos uždėtas okliuzinis tvarstis' },
      { t: 'Apžiūrėtas ir palpuotas pilvas: žaizdos, evisceracija, skausmingumas, įtempimas' },
      { t: 'Patikrintas dubens stabilumas', k: true, s: ['Stabilus', 'Nestabilus – dubens diržą uždeda B kartu su C'], i: 'Įgūdis #20.' },
      { t: 'Nuimti batai, nukirpti (įtariant traumą) apatiniai drabužiai' },
      { t: 'Patikrinta tarpvietė ir lytiniai organai dėl kraujavimo', s: ['Kraujo nėra', 'Kraujas yra – dubens diržą uždeda B kartu su C'] },
      { t: 'Apžiūrėtos galūnės ir jungiamosios sritys (kirkšnys, pažastys, kaklas) dėl kraujavimo', k: true, s: ['Kraujavimo nėra', 'Kraujavimas yra – stabdomas; masyvus – iškart pranešta A'] },
      { t: 'Radiniai pranešti A – po visos apžiūros (iki 2 min)', k: true },
      { t: 'Kartu su C pacientas paverstas ant šono, apžiūrėta nugara – prieš e-FAST', k: true, s: ['Sužalojimai ir kraujavimas', 'Okliuzinis tvarstis, jei krūtinėje yra žaizda', 'Stuburo vidurio linijos palpacija dėl skausmingumo (jei sąmoningas)'], i: 'Įgūdis #17.' },
      { t: 'Atliktas e-FAST', g: KOMP, s: ['Morisono kišenė', 'Splenorenalinė kišenė', 'Šlapimo pūslė', 'Perikardas', 'Pleura abipus (pneumotoraksas)'], i: 'Įgūdis #16.' },
      { t: 'Nugaros ir e-FAST radiniai pranešti A' }
    ]
  },
  'b-ant': {
    title: 'B – antrinė apžiūra', short: 'Antrinė',
    items: [
      { t: 'Apžiūrėti ir sutvarkyti krūtinės nudegimai' },
      { t: 'Atliktos A nario nurodytos procedūros', s: ['Kaklo imobilizacija', 'Dantų blokeliai (bite blocks)', 'Nosies tamponavimas', 'Nosies pertvaros hematomos drenavimas', 'Galvos tvarstymas'] },
      { t: 'Padėta C nariui', s: ['Turniketo konversija', 'Galūnių imobilizacija'] },
      { t: 'Įvestas ŠPK, įvertinta šlapimo spalva / drumstumas', g: KOMP, i: 'Įgūdis #34.' }
    ]
  },

  // ───────── C ─────────
  'c-pas': {
    title: 'C – pasiruošimas', short: 'Pasiruošimas',
    intro: 'Vieta – kitoje paciento pusėje, prie stovo skysčiams ir infuzomatams.',
    items: [
      { t: 'Paruošti 16–18 G PVK ir intrakaulinė (IO) adata – naudoti iškart', g: MED, k: true },
      { t: 'Paruoštos kraujo grupės nustatymo priemonės ir gliukometras', g: MED, k: true },
      { t: 'Paruošti tvarsčiai, hemostatinė marlė ir turniketai', k: true },
      { t: 'Paruoštas dubens diržas' },
      { t: 'Paruošta greito infuzavimo / masinio kraujo perpylimo sistema, kraujo komponentai', g: MED },
      { t: 'Pašildyti skysčiai' },
      { t: 'Paruošti vaistai (žr. „Vaistų skiedimo lentelės“)', g: MED },
      { t: 'Escape planas: katastrofinis kraujavimas', k: true }
    ]
  },
  'c-pir': {
    title: 'C – pirminė apžiūra', short: 'Pirminė',
    intro: 'Atvykus pacientui – iškart kraujagyslių prieiga, kraujo grupė ir gliukozė, nelaukiant A nario nurodymo.',
    items: [
      { t: 'Įvestas 16–18 G PVK – iškart, be A nurodymo', g: MED, k: true, s: ['Negalint įvesti PVK – IO adata', 'Tikslas – 2 didelio kalibro PVK arba IO adata'], i: 'Įgūdžiai #21, #22.' },
      { t: 'Nustatyta kraujo grupė ir gliukozė – visiems, iškart, be A nurodymo', g: MED, k: true, i: 'Įgūdis #23. Žr. temą „Kraujo suderinamumas“.' },
      { t: 'Uždėta AKS manžetė, stebimi ŠSD, AKS ir kapiliarų prisipildymo laikas', i: 'Įgūdis #15. EKG ir SpO₂ uždeda B.' },
      { t: 'Įvertinti šoko požymiai', s: ['Monitoriaus rodmenys', 'Galūnių šaltumas (spazmuota periferija)', 'Oda – marmuruotumas / prakaitas', 'A. radialis ir a. femoralis pulsai'] },
      { t: 'Aiškiai pasakyta, ar pacientas yra hemoraginiame šoke', k: true },
      { t: 'Kartu su B uždėtas dubens diržas, jei B rado nestabilų dubenį ar kraujo tarpvietėje' },
      { t: 'Kartu su B pacientas paverstas ant šono – prieš e-FAST (nugarą apžiūri B)' },
      { t: 'Paruošti ir suleisti paskirti vaistai', g: MED, s: ['Traneksamo rūgštis – per 3 val. nuo traumos', 'Kalcis – esant kraujo transfuzijai', 'Analgezija – titruojant'], i: 'Įgūdis #24.' },
      { t: 'Paruošti kraujo komponentai transfuzijai', g: MED },
      { t: 'Atlikta hipotermijos prevencija', i: 'Įgūdis #19.' }
    ]
  },
  'c-ant': {
    title: 'C – antrinė apžiūra', short: 'Antrinė',
    items: [
      { t: 'Esant evisceracijai – suteikta pirmoji pagalba' },
      { t: 'Atlikta turniketo konversija, jei galima', g: MED, i: 'Įgūdis #26.' },
      { t: 'Įvertintos galūnės dėl galimų lūžių, įtariamos vietos imobilizuotos', i: 'Įgūdis #33.' },
      { t: 'Tęsiama hipotermijos prevencija' }
    ]
  },

  // ───────── BENDRI ─────────
  'antrine': {
    title: 'Antrinė apžiūra nuo galvos iki kojų', short: 'Nuo galvos iki kojų',
    intro: 'Sistemingai, iš priekio ir nugaros. Stabiliam pacientui – iškart po pirminės apžiūros, nestabiliam – etapais, kai leidžia gaivinimas. Radinius A narys (komandos vadas) apibendrina komandai.',
    items: [
      { t: 'Neurologija', s: ['GKS – pakartotinai', 'Vyzdžiai, akių judesiai', 'Lateralizacijos požymiai'] },
      { t: 'Galva', s: ['Žaizdos, mėlynės, įdubimai, kaukolės nelygumai', 'Mėlynės už ausų (Battle požymis) – kaukolės pamato lūžis'] },
      { t: 'Veidas', s: ['Burna: žaizdos, laisvi / trūkstami / lūžę dantys', 'Nosis: kraujavimas, pertvaros hematoma, likvorėja', 'Ausys: kraujavimas, kraujas už būgnelio', 'Akys: svetimkūnis, akies obuolio trauma, kontaktiniai lęšiai', 'Žandikaulis: skausmas, netaisyklingas sąkandis'] },
      { t: 'Kaklas', s: ['Slanksteliai: skausmas, jautrumas, deformacija', 'Minkštieji audiniai: mėlynės, patinimas, poodinė emfizema', 'Trachėjos nukrypimas', 'Kaklo venų prisipildymas'] },
      { t: 'Krūtinė', s: ['Mėlynės, žaizdos, jautrumas, nestabilus segmentas', 'Plaučiai: perkusija, kvėpavimo garsai, krepitacija', 'Širdies tonai'] },
      { t: 'Pilvas', s: ['Mėlynės, žaizdos, jautrumas', 'Žarnyno garsai'] },
      { t: 'Dubuo, tarpvietė, kūno angos', s: ['Dubens pakartotinai nespausti – įtariant lūžį, vaizdinis tyrimas', 'Tarpvietė, lytiniai organai, šlaplė, išangė'] },
      { t: 'Galūnės', s: ['Mėlynės, žaizdos, deformacijos, atviri lūžiai', 'Sąnarių stabilumas ir judrumas', 'Jutimai, jėga, pulsai'] },
      { t: 'Nugara ir stuburas', s: ['Visa nugara ir sėdmenys', 'Stuburo palpacija: jautrumas, tarpai tarp slankstelių'] },
      { t: 'Pakartotinai įvertintos gyvybinės funkcijos, peržiūrėti tyrimų rezultatai' },
      { t: 'Įvertintas ir gydomas skausmas' },
      { t: 'Surinkta anamnezė (AMPLE), patikslintas stabligės skiepijimo statusas' },
      { t: 'Neatlikti elementai įrašyti į problemų sąrašą', k: true },
      { t: 'Radiniai apibendrinti ir pasakyti komandai', k: true }
    ]
  },
  'stop': {
    title: 'STOP · 10 už 10', short: 'STOP',
    intro: '10 sekundžių pauzė gali sutaupyti 10 minučių bevaisio darbo. Komandos vadas (A) skelbia STOP diagnostikos pradžioje, planuojant gydymo prioritetus, būklei netikėtai pablogėjus arba kai komanda jaučiasi „įstrigusi“.',
    items: [
      { t: 'Problema? – kokia pagrindinė problema dabar', k: true },
      { t: 'Komanda? – visi sustoja ir klauso' },
      { t: 'Faktai? – radiniai peržiūrimi struktūriškai (cABCDE)' },
      { t: 'Planas! – darbinė diagnozė ir tolesni veiksmai', k: true },
      { t: 'Paskirstykite! – kas ką daro' },
      { t: 'Klausimai? – ar visi supranta, ar yra pasiūlymų ir abejonių' },
      { t: 'Patikrinkite! – po veiksmų įvertinkite iš naujo' }
    ]
  },
  'komanda': {
    title: 'Komandos darbas', short: 'Komanda',
    items: [
      { t: 'Naudojama uždaro ciklo (closed-loop) komunikacija', k: true },
      { t: 'Horizontalūs santykiai komandoje', i: 'Žr. temą „Komunikacija komandoje“ – autoriteto gradientas.' },
      { t: 'Komandos nariai aiškiai praneša komandos vadui apie radinius / problemas' },
      { t: 'Komandos vadas aiškiai perduoda komandai paciento ikihospitalinę būklę' },
      { t: 'Komandos vadas perskirsto darbą pagal klinikinę situaciją' },
      { t: 'Laikomasi algoritmo' },
      { t: 'Po pirminės apžiūros komandos vadas atlieka „10 už 10“: radiniai, gydymas, planas', k: true },
      { t: 'Po pirminės apžiūros įvertinamas atsakas į gydymą' },
      { t: 'Nėra nereikalingos komunikacijos ir pašalinių kalbų' },
      { t: 'Laikomasi kokybės ir aseptikos standartų' },
      { t: 'Visi žino paciento problemas ir ištyrimo / gydymo etapą' }
    ]
  },
  'kokybe': {
    title: 'Gydymo tikslai ir kokybė', short: 'Kokybė',
    items: [
      { t: 'Audiniai pakankamai aprūpinami deguonimi', k: true },
      { t: 'Sustabdytas kraujo netekimas (netaikoma kraujavimui į pilvo ertmę)', k: true },
      { t: 'Atkuriamas cirkuliuojančio kraujo tūris' },
      { t: 'Pacientas pakankamai nuskausmintas opioidais' },
      { t: 'Laikomasi AKS tikslų', k: true, s: ['Hemoraginis šokas be galvos traumos požymių – VAKS (MAP) 65 mm Hg', 'Galvos smegenų trauma – sAKS 110–120 mm Hg'], i: 'TCCC 2026: gaivinti, kol čiuopiamas radialinis pulsas, pagerėja sąmonė arba sAKS 100 mm Hg; galvos smegenų traumai – sAKS > 100 mm Hg, SpO₂ ≥ 92 %.' },
      { t: 'Taikoma hipotermijos prevencija' },
      { t: 'Skirta traneksamo rūgštis', i: 'TCCC 2026: 2 g lėta IV / IO injekcija, ne vėliau nei per 3 val. nuo sužalojimo.' },
      { t: 'Esant kraujo transfuzijai užtikrinamas kalcio kiekis', i: 'TCCC 2026: perpylus bet kokių kraujo produktų – 1 g kalcio (30 ml 10 % kalcio gliukonato) IV / IO po pirmojo perpilto vieneto.' },
      { t: 'Esant galvos smegenų traumai', s: ['Manitolis arba 3 % NaCl', 'Galvūgalis pakeltas 30°'] },
      { t: 'Bent 2 didelio kalibro PVK arba IO adata' },
      { t: 'Imobilizuoti lūžgaliai ir kaklas (jei įtariama)' },
      { t: 'Sutvarstytos žaizdos ir (ar) nudegimai' },
      { t: 'Atlikta turniketo konversija, kai tai saugu' },
      { t: 'Aptarta, kaip mažinti hiperkalemijos ir inkstų nepakankamumo riziką po turniketo konversijos' },
      { h: 'Intubuotas pacientas' },
      { t: 'Pakankamai seduojamas ir nuskausminamas', g: GYD },
      { t: 'Optimalūs DPV parametrai', g: GYD },
      { t: 'ETV virš bifurkacijos, nustatytas ETV gylis', g: GYD }
    ]
  }
};

// ───────── MOKYMOSI TEMOS ─────────
const tri = '<table><tr><th>Socialinė sąveika</th><th>Kvėpavimo pastangos</th><th>Odos perfuzija</th></tr>' +
  '<tr><td>Ramus, susikaupęs</td><td>Normalios</td><td>Rožinė</td></tr>' +
  '<tr><td>Susijaudinęs</td><td>Padidėjusios</td><td>Blyški, marmuruota</td></tr>' +
  '<tr><td>Nėra</td><td>Nėra</td><td>Nėra</td></tr></table>';

const schema = `<svg viewBox="0 0 360 462" role="img" aria-label="Darbo vietos schema" style="width:100%;max-width:440px;display:block;margin:10px auto;font:11px system-ui,-apple-system,sans-serif">
<defs><marker id="ah" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0,0L10,5L0,10z" style="fill:var(--tx2)"/></marker></defs>
<g style="fill:none;stroke:var(--tx);stroke-width:2">
<rect x="112" y="6" width="136" height="36" rx="4"/><rect x="12" y="60" width="76" height="48" rx="4"/>
<rect x="262" y="54" width="92" height="112" rx="4"/><rect x="130" y="118" width="100" height="200" rx="6"/>
<circle cx="121" cy="112" r="6"/><circle cx="244" cy="196" r="6"/><rect x="95" y="392" width="170" height="44" rx="4"/></g>
<g style="fill:none;stroke:var(--tx2);stroke-width:2;stroke-dasharray:6 5">
<line x1="40" y1="160" x2="40" y2="330" marker-start="url(#ah)" marker-end="url(#ah)"/>
<line x1="24" y1="368" x2="336" y2="368" marker-start="url(#ah)" marker-end="url(#ah)"/></g>
<g style="fill:var(--tx2)"><circle cx="180" cy="146" r="15"/><rect x="160" y="164" width="40" height="70" rx="10"/>
<rect x="147" y="168" width="11" height="58" rx="5"/><rect x="202" y="168" width="11" height="58" rx="5"/>
<rect x="163" y="230" width="15" height="72" rx="6"/><rect x="182" y="230" width="15" height="72" rx="6"/></g>
<circle cx="180" cy="82" r="22" fill="#0C447C"/><text x="180" y="90" text-anchor="middle" style="fill:#B5D4F4;font-size:22px;font-weight:700">A</text>
<circle cx="96" cy="200" r="22" fill="#085041"/><text x="96" y="208" text-anchor="middle" style="fill:#9FE1CB;font-size:22px;font-weight:700">B</text>
<circle cx="270" cy="240" r="22" fill="#712B13"/><text x="270" y="248" text-anchor="middle" style="fill:#F5C4B3;font-size:22px;font-weight:700">C</text>
<g style="fill:var(--tx)">
<text x="180" y="21" text-anchor="middle">Drenai ir kvėpavimo</text><text x="180" y="35" text-anchor="middle">takų valdymo priemonės</text>
<text x="50" y="88" text-anchor="middle" style="font-size:12px;font-weight:600">Echoskopas</text>
<text x="116" y="132" text-anchor="end">Atsiurbėjas</text>
<text x="308" y="74" text-anchor="middle" style="font-weight:600">DPV</text><text x="308" y="90" text-anchor="middle">Deguonies</text>
<text x="308" y="103" text-anchor="middle">koncentratorius</text><text x="308" y="116" text-anchor="middle">ar balionai</text>
<text x="308" y="148" text-anchor="middle" style="font-weight:600">Telemetrija</text>
<text x="255" y="193">Stovas skysčiams</text><text x="255" y="206">ir infuzomatams</text>
<text transform="translate(28 245) rotate(-90)" text-anchor="middle">Privažiavimas / iškrovimas</text>
<text x="180" y="360" text-anchor="middle">Praėjimas / pravažiavimas</text>
<text x="180" y="410" text-anchor="middle">Vaistai, PVK, tvarsliava,</text><text x="180" y="425" text-anchor="middle">kitos priemonės</text>
<text x="180" y="454" text-anchor="middle" style="fill:var(--tx2)">Gali būti su ratukais – privežti prie paciento</text></g></svg>`;

const kr = (r, e, p, t, c) => `<tr><td><b>${r}</b></td><td>${e}</td><td>${p}</td><td>${t}</td><td>${c}</td></tr>`;
const kraujas = '<div class="tw"><table><tr><th>Recipientas</th><th>Eritrocitai iš</th><th>Plazma iš</th><th>Trombocitai (pageidautina)</th><th>Krio&shy;precipitatas</th></tr>' +
  kr('O−', 'O−', 'O, A, B, AB', 'O (jei reikia – bet kuri)', 'Bet kuri (pageidautina O)') +
  kr('O+', 'O−, O+', 'O, A, B, AB', 'O (jei reikia – bet kuri)', 'Bet kuri (pageidautina O)') +
  kr('A−', 'O−, A−', 'A, AB', 'A (tinka AB)', 'Bet kuri (pageidautina A)') +
  kr('A+', 'O−, O+, A−, A+', 'A, AB', 'A (tinka AB)', 'Bet kuri (pageidautina A)') +
  kr('B−', 'O−, B−', 'B, AB', 'B (tinka AB)', 'Bet kuri (pageidautina B)') +
  kr('B+', 'O−, O+, B−, B+', 'B, AB', 'B (tinka AB)', 'Bet kuri (pageidautina B)') +
  kr('AB−', 'O−, A−, B−, AB−', 'AB', 'AB (jei reikia – bet kuri)', 'Bet kuri (pageidautina AB)') +
  kr('AB+', 'Visos grupės', 'AB', 'AB (jei reikia – bet kuri)', 'Bet kuri (pageidautina AB)') +
  '</table></div>';

const V = (id, title, note) => ({ url: 'https://www.youtube.com/watch?v=' + id, title, ch: 'Cliff Reid', note });
const sk = (n, prep, dose) => `<div class="card"><b>${n}</b><div>${prep}</div><div class="muted">${dose}</div></div>`;

E.puslapiai = {
  eiga: {
    title: 'ETC eiga: nuo pranešimo iki antrinės apžiūros', sub: 'Planas A, 5 s apžiūra, Escape, cABCDE',
    html: '<h3>Prioritetai: cABC</h3><p>Seka nukreipia dėmesį į dažniausias išvengiamas mirties priežastis: <b>c</b> – katastrofinis kraujavimas, <b>A</b> – kvėpavimo takų obstrukcija, <b>B</b> – krūtinės ląstos sužalojimai, <b>C</b> – kraujotakos šokas. Toliau – D (neurologija) ir E (atidengimas, temperatūra).</p>' +
      '<p><b>Komandos vadas – A narys.</b> Atskiro lyderio nėra.</p>' +
      '<h3>1. Prieš atvykstant</h3><p>Gavęs išankstinį pranešimą (geriausia ATMIST formatu), A narys surenka komandą: pristato narius, paskirsto vaidmenis A, B, C ir rašytoją, patikrina kompetencijas, suformuluoja <b>Planą A</b> (standartinė pirminė apžiūra) ir aptaria <b>Planą B</b> (pvz., skubiai į operacinę, netikėtas širdies sustojimas). Kiekvienas narys patikrina savo įrangą, patalpa ir skysčiai pašildomi.</p>' +
      link('#/v/A?f=0', 'A – instruktažas ir pasiruošimas') +
      '<h3>2. Atvykus – 5 sekundžių apžiūra</h3><p>Prieš perdavimą A narys per kelias sekundes įvertina pacientą pagal <b>vertinimo trikampį</b>. Tikslas – atmesti tris gyvybei pavojingas būkles: katastrofinį kraujavimą, kvėpavimo takų obstrukciją ir trauminį širdies sustojimą, ir patvirtinti, kad Planas A vis dar tinka.</p>' + tri +
      '<p class="muted">Ramus, normaliai kvėpuojantis, rožinės odos pacientas greičiausiai skubios intervencijos nereikalauja. Susijaudinusiam, sunkiai kvėpuojančiam, marmuruotos odos pacientui greičiausiai nedelsiant reikia gyvybę gelbstinčių veiksmų.</p>' +
      '<h3>3. Sprendimas garsiai</h3><p>A narys aiškiai paskelbia rezultatą. Dažniausiai tęsiamas Planas A. Radus gyvybei pavojingą būklę, komanda iškart nukreipiama ją spręsti – aktyvuojamas Escape planas.</p>' +
      link('#/s/esc-kraujas', 'Escape: katastrofinis kraujavimas') + link('#/s/esc-kt', 'Escape: kvėpavimo takų obstrukcija') + link('#/s/esc-tss', 'Escape: trauminis širdies sustojimas') +
      '<h3>4. Perdavimas (ATMIST)</h3><p>A narys priima perdavimą. C narys tuo metu jau įveda PVK arba IO adatą – nurodymo jam nereikia.</p>' + link('#/v/A?f=1', 'ATMIST perdavimas') +
      '<h3>5. Horizontali pirminė apžiūra</h3><p>A, B ir C dirba <b>vienu metu</b> ir prireikus padeda vieni kitiems. Pacientas saugomas nuo hipotermijos.</p><ul>' +
      '<li><b>C</b> – iškart atvykus pacientui, nelaukdamas A nurodymo, įveda PVK arba IO adatą ir visiems pacientams nustato kraujo grupę ir gliukozę. Toliau – AKS, šoko požymiai, vaistai, kraujo komponentai.</li>' +
      '<li><b>B</b> – visiškai atidengia pacientą ir atlieka visą apžiūrą stetoskopu ir rankomis: kaklas, krūtinė, pilvas, dubuo, tarpvietė, galūnės (dėl kraujavimo) – ne ilgiau nei 2 min. Radinius A nariui praneša <b>baigęs</b> visą apžiūrą; gyvybei pavojingą būklę – <b>iškart</b>. Dubens diržą uždeda kartu su C. Nugara apžiūrima <b>prieš e-FAST</b>.</li>' +
      '<li><b>A</b> – kvėpavimo takai, deguonis, neurologija; renka B ir C radinius ir perskirsto darbą.</li></ul>' +
      link('#/v/A?f=2', 'A – pirminė apžiūra') + link('#/v/B?f=1', 'B – pirminė apžiūra') + link('#/v/C?f=1', 'C – pirminė apžiūra') +
      '<h3>6. Planavimas – 10 už 10</h3><p>Po pirminės apžiūros A narys sustabdo komandą: radinių apžvalga, darbinė diagnozė, atsakas į gydymą, skausmas, tolesnis kelias (vaizdiniai tyrimai, operacinė, intensyvioji terapija, pervežimas). Šis etapas turėtų trukti ne ilgiau nei 5 min.</p>' +
      link('#/v/A?f=3', 'A – po pirminės apžiūros') + link('#/s/stop', 'STOP · 10 už 10') + link('#/s/kokybe', 'Gydymo tikslai ir kokybė') +
      '<h3>7. Antrinė apžiūra</h3><p>Sistemingai nuo galvos iki kojų, iš priekio ir nugaros, pakartotinai vertinant gyvybines funkcijas ir GKS, peržiūrint tyrimų rezultatus. Stabiliam pacientui – iškart po pirminės apžiūros, nestabiliam – etapais, kai leidžia gaivinimas. Surenkama anamnezė (AMPLE). Neatlikti elementai įrašomi į problemų sąrašą, kad nebūtų pamiršti.</p>' +
      link('#/s/antrine', 'Antrinė apžiūra nuo galvos iki kojų') + link('#/v/A?f=4', 'A – antrinė apžiūra ir AMPLE') +
      '<p class="muted">Būklei bet kada pablogėjus – vėl pirminė apžiūra.</p>',
    saltinis: 'ETC vadovas 4.1, 2 sk.; ETC vertinimo lapas; kuopos pirminio ištyrimo tvarka (2026-10-07)',
    video: [V('P2-cSPTPBHU', 'Environment Control & Zero Point Survey', 'Komanda, aplinka ir savęs patikra prieš atvykstant pacientui')]
  },
  kvepavimas: {
    title: 'Kvėpavimo takai ir krūtinė', sub: 'Planai A–D, Vortex, 6 krūtinės grėsmės',
    html: '<h3>Sunkios intubacijos planas</h3><ul><li><b>Planas A</b> – greitosios sekos indukcija ir intubacija (RSI)</li><li><b>Planas B</b> – ventiliacija kauke su ambu maišu</li><li><b>Planas C</b> – supraglotinė priemonė (laringinė kaukė)</li><li><b>Planas D</b> – priekinė kaklo prieiga (krikotiroidotomija)</li></ul>' +
      '<h3>Vortex principas</h3><p>Deguonį galima užtikrinti trimis būdais: kauke su ambu maišu, supraglotine priemone arba intubacija. Kiekvienam būdui – ne daugiau kaip trys bandymai ir „geriausios pastangos“. Jei geriausios pastangos nepavyko, to paties būdo nebekartokite – pereikite prie kito. Nepavykus visiems trims, situacija tampa „neįmanoma intubuoti, neįmanoma oksigenuoti“ (CICO) – reikia skubios krikotiroidotomijos.</p>' +
      link('#/s/esc-kt', 'Escape: kvėpavimo takų obstrukcija') + link('#/v/A?f=2', 'A – pirminė apžiūra (eskalavimas)') +
      '<h3>6 gyvybei pavojingos krūtinės būklės</h3><p>Jas B narys turi atmesti pirminės apžiūros metu:</p><ol><li>Kvėpavimo takų obstrukcija / pažeidimas</li><li>Įtampinis pneumotoraksas</li><li>Atvira krūtinės žaizda (atviras pneumotoraksas)</li><li>Masyvus hemotoraksas</li><li>Nestabili krūtinės ląsta (flail chest)</li><li>Širdies tamponada</li></ol>' +
      '<p class="muted">Pneumotoraksą, hemotoraksą ir tamponadą ultragarsu nustatyti tiksliau nei rentgenu.</p>' +
      '<h3>Įtampinis pneumotoraksas</h3><p>Oras patenka į pleuros ertmę, bet neišeina: plautis subliūkšta, tarpuplautis pasislenka, mažėja veninis grįžimas į širdį. Iš pradžių – dažnas kvėpavimas, tachikardija, vėliau hipotenzija ir sustojimas. Ventiliuojamam pacientui būklė blogėja labai greitai. Požymiai panašūs į širdies tamponados.</p><p>Gydymas – nedelsiant dekompresija: šoninė torakostomija, po to drenas. Adatos dekompresija – tik jei nėra kompetentingo gydytojo ar įrangos.</p>' +
      '<h3>Atvira krūtinės žaizda</h3><p>Sandariai uždengus žaizdą, gali susidaryti įtampinis pneumotoraksas. Uždedamas vienkryptis (vožtuvinis) okliuzinis tvarstis, vėliau įvedamas drenas.</p>' +
      '<h3>Masyvus hemotoraksas</h3><p>Daugiau nei 1500 ml kraujo pleuros ertmėje. Požymiai: hipovoleminis šokas, duslus perkusijos garsas ir susilpnėjęs kvėpavimas pažeistoje pusėje. Gydymas: deguonis, torakostomija ir drenas, kraujagyslių prieiga, kraujo komponentai pagal masinio kraujavimo protokolą. Jei per drenažą nuolat bėga daugiau nei 200 ml/val. – skubiai chirurgas.</p>' +
      '<h3>Nestabili krūtinės ląsta</h3><p>Jauniems pacientams paradoksalus krūtinės judesys iš pradžių gali būti nematomas – lūžusius šonkaulius prilaiko raumenys. Išryškėja pacientui pavargus.</p>' +
      link('#/v/B?f=1', 'B – pirminė apžiūra') + link('#/igudis/14', 'Įgūdis #14 – pleuros drenavimas') + link('#/igudis/18', 'Įgūdis #18 – krikotiroidotomija'),
    saltinis: 'ETC vadovas 4.1, 3 ir 4 sk.'
  },
  komunikacija: {
    title: 'Komunikacija komandoje', sub: 'Closed loop, SBAR, PACE, CRM principai',
    html: '<h3>Uždaro ciklo (closed-loop) komunikacija</h3><p>Nurodymas adresuojamas konkrečiam žmogui vardu → gavėjas pakartoja → atlikęs praneša „atlikta“. Taip niekas neprarandama ir komandos vadas žino, kas padaryta.</p>' +
      '<h3>SBAR – kai reikia komandos vado dėmesio</h3><ul><li><b>S – situacija:</b> kas vyksta dabar.</li><li><b>B – aplinkybės:</b> kas žinoma apie pacientą ir sužalojimą.</li><li><b>A – vertinimas:</b> ką, mano manymu, tai reiškia.</li><li><b>R – rekomendacija:</b> ko man reikia / ką siūlau daryti.</li></ul>' +
      '<h3>PACE – kai nerimauji dėl saugumo</h3><p>Kiekvienas komandos narys privalo pasakyti, jei mato pavojų pacientui. Laipsniškai:</p><ul><li><b>P – paklausk:</b> „Ar esi tikras dėl…?“</li><li><b>A – įspėk:</b> „Ar nemanai, kad tai sukels…?“</li><li><b>C – paprieštarauk:</b> „Bijau, kad tai pakenks pacientui.“</li><li><b>E – skubūs veiksmai:</b> „Sustok! Kviečiu pagalbą.“</li></ul>' +
      '<h3>Autoriteto gradientas</h3><p>Geras komandos vadas sukuria aplinką, kurioje jaunesni nariai nebijo išsakyti nuomonės, ir pats priima patarimus. Svarbu, kas teisinga, o ne kas teisus.</p>' +
      '<h3>Fiksacijos klaidos</h3><ul><li><b>„Tai ir tik tai“</b> – tunelinis mąstymas, kitos galimybės nesvarstomos.</li><li><b>„Viskas, išskyrus tai“</b> – ieškoma smulkmenų, ignoruojant pavojingiausią priežastį.</li><li><b>„Viskas gerai“</b> – pavojaus ženklai nurašomi artefaktams.</li></ul><p>Padeda: antra nuomonė, „10 už 10“, žvilgsnis tarsi įėjus į kambarį pirmą kartą.</p>' +
      '<h3>15 CRM principų</h3><ol><li>Pažink aplinką</li><li>Numatyk ir planuok</li><li>Laiku kviesk pagalbą</li><li>Būk lyderis ir sekėjas, būk ryžtingas</li><li>Paskirstyk darbo krūvį (10 už 10)</li><li>Mobilizuok visus išteklius</li><li>Bendrauk efektyviai – kalbėk</li><li>Naudok visą turimą informaciją</li><li>Užkirsk kelią fiksacijos klaidoms</li><li>Tikrink ir dar kartą tikrink</li><li>Naudok kognityvines pagalbos priemones</li><li>Pakartotinai vertink (10 už 10)</li><li>Dirbk komandoje, koordinuok ir remk kitus</li><li>Išmintingai paskirstyk dėmesį</li><li>Dinamiškai nustatyk prioritetus</li></ol>' +
      link('#/s/komanda', 'Komandos darbo sąrašas') + link('#/s/stop', 'STOP · 10 už 10'),
    saltinis: 'ETC vadovas 4.1, 1 sk.; ETC vertinimo lapas',
    video: [V('Qi-TxP-Uhxg', 'Making Things Happen - The Art of Leading Resuscitation', 'Kaip vadovauti gaivinimo komandai'),
      V('LzPnro0xlwA', 'How to challenge authority in Resus', 'Kaip saugiai paprieštarauti vadovui (PACE)'),
      V('-ZfVcbxVkNY', 'The Resuscitationist Mindset', 'Mąstysena ir darbas esant stresui')]
  },
  isdestymas: {
    title: 'Darbo vietos išdėstymas', sub: 'Kur stovi A, B, C ir kur kokia įranga',
    html: schema +
      '<ul><li><b>A</b> – komandos vadas, prie galvūgalio: kvėpavimo takų priemonės ir drenai, atsiurbėjas, DPV, deguonis, telemetrija.</li><li><b>B</b> – vienoje pusėje, šalia echoskopo. Iš šios pusės – privažiavimas ir paciento iškrovimas.</li><li><b>C</b> – kitoje pusėje, prie stovo skysčiams ir infuzomatams.</li><li>Vaistai, PVK, tvarsliava – atskirai, už praėjimo; gali būti su ratukais.</li></ul>' +
      link('#/v/A?f=0', 'A – instruktažas ir pasiruošimas') + link('#/v/B?f=0', 'B – pasiruošimas') + link('#/v/C?f=0', 'C – pasiruošimas'),
    saltinis: 'ETC įgūdžių lapas (darbo vietos schema)'
  },
  kraujas: {
    title: 'Kraujo suderinamumas', sub: 'Eritrocitai, plazma, trombocitai, krioprecipitatas',
    html: kraujas +
      '<p class="muted">Eritrocitų universalus donoras – O−, plazmos – AB. Lentelę slinkite į šoną, jei netelpa ekrane.</p>' +
      '<h3>Trombocitai ir RhD</h3><p>RhD neigiamoms vaisingo amžiaus moterims – RhD neigiami trombocitai; jei skirta RhD teigiamų – rekomenduojama skirti anti-D imunoglobuliną (250 TV pakanka 5 suaugusiųjų dozėms per 6 sav.). O grupės trombocitai ne O grupės recipientui – tik kraštutiniu atveju ir tik mažo anti-A / anti-B titro.</p>' +
      '<h3>TCCC 2026: ką perpilti hemoraginio šoko atveju</h3><ol><li>Šaltai laikytas mažo titro O grupės pilnas kraujas</li><li>Iš anksto ištirtų donorų mažo titro O grupės šviežias pilnas kraujas</li><li>Plazma, eritrocitai ir trombocitai santykiu 1:1:1</li><li>Plazma ir eritrocitai santykiu 1:1</li><li>Tik plazma arba tik eritrocitai</li></ol>' +
      '<p>Gaivinti, kol čiuopiamas radialinis pulsas, pagerėja sąmonė arba sAKS pasiekia 100 mm Hg. Perpylus bet kokių kraujo produktų (įskaitant pilną kraują) – 1 g kalcio (30 ml 10 % kalcio gliukonato) IV / IO po pirmojo vieneto.</p>' +
      link('#/vaistas/kalcis', 'Kalcio gliukonatas') + link('#/igudis/23', 'Įgūdis #23 – kraujo grupė ir transfuzija'),
    saltinis: 'ETC įgūdžių lapas (Combined Blood Compatibility Table), išversta; TCCC gairės 2026-05-01; NHS Scotland trombocitų parinkimo tvarka'
  },
  skiedimas: {
    title: 'Vaistų skiedimo lentelės', sub: 'IV boliusai ir infuzomatai (ETC)',
    html: '<div class="warn">Medicinos personalui. Tai paruošimo atmintinė iš ETC įgūdžių lentelių – vaistą ir dozę skiria gydytojas. Pastabos „PCS“ – iš gamintojo preparato charakteristikų santraukos. Pagrindinės dozės – vaisto puslapyje.</div>' +
      '<h3>IV boliusu</h3>' +
      sk('Ketaminas – sedacija', '10 ml švirkštas: 250 mg (5 ml × 50 mg/ml) + 5 ml NaCl = 25 mg/ml', '1–2 mg/kg, lėtai. Esant šokui – dozė mažinama 50 %. Jei ampulė 100 mg/ml – koncentracija bus kita.') +
      sk('Rokuroniumas', '10 ml švirkštas: 100 mg, neskiestas = 10 mg/ml', '0,5–1,5 mg/kg. PCS: intubacijai 0,6 mg/kg, greitosios sekos indukcijai 1,0 mg/kg.') +
      sk('Traneksamo rūgštis', '2000 mg į 100 ml arba 250 ml NaCl', '2 g infuzija. PCS – ne greičiau kaip 1 ml/min 100 mg/ml tirpalo (100 mg/min; 2 g – ne trumpiau kaip 20 min). TCCC 2026 – 2 g lėta IV / IO injekcija.') +
      sk('Fentanilis', '2 ml švirkštas: 100 mcg, neskiestas = 50 mcg/ml', '0,5–1 mcg/kg, lėtai') +
      sk('Morfinas', '10 ml švirkštas: 10 mg + 9 ml NaCl = 1 mg/ml', '0,1 mg/kg') +
      sk('Kalcio gliukonatas', '3 g (30 ml 10 %) į 250 ml NaCl', '3 g infuzija. PCS – ne greičiau kaip 0,45 mmol/min (ne trumpiau kaip 15 min). Nemaišyti su bikarbonatu, fosfatais, ceftriaksonu.') +
      sk('Naloksonas', '10 ml švirkštas: 0,4 mg + 9 ml NaCl = 0,04 mg/ml', 'Po 0,2 mg (5 ml) kas 2–3 min iki efekto. Maks. 2 mg (PCS – jei po 10 mg nėra atsako, peržiūrėti diagnozę).') +
      sk('Ondansetronas', '20 ml švirkštas: 8 mg + 16 ml NaCl = 0,4 mg/ml', 'Suleisti lėtai IV – ne greičiau kaip per 30 s (PCS).') +
      sk('Metoklopramidas', '10 ml švirkštas: 10 mg + 8 ml NaCl = 1 mg/ml', 'Suleisti lėtai IV – ne trumpiau kaip per 3 min (PCS).') +
      sk('Atropinas', '10 ml švirkštas: 1 mg (ampulė 1 mg / 1 ml) + 9 ml NaCl = 0,1 mg/ml', 'Po 0,5 mg kas 1–2 min, iki 3 mg') +
      '<h3>IV per infuzomatą</h3>' +
      sk('Noradrenalinas', '50 ml švirkštas: 4 mg + 46 ml 5 % gliukozės = 80 mcg/ml', '0,1–1 mcg/kg/min. Maždaug nuo 6 ml/val., maks. 50 ml/val. (apskaičiuota ~80 kg pacientui). PCS: 2 mg + 48 ml 5 % gliukozės = 40 mcg/ml, pradinis greitis 10–20 ml/val. – tikrinkite, kurį tirpalą ruošiate. Per centrinę veną.') +
      sk('Ketaminas', '50 ml švirkštas: 500 mg + 40 ml NaCl = 10 mg/ml', 'Nuo 0,5 mg/kg/val. (~100 kg pacientui – maždaug nuo 5 ml/val.)') +
      sk('Morfinas', '10 ml švirkštas: 10 mg + 9 ml NaCl = 1 mg/ml', 'Pradinis 1–2 mg/val. (1–2 ml/val.)') +
      sk('Fentanilis', '50 ml švirkštas: 1000 mcg + 30 ml NaCl = 20 mcg/ml', '1–3 mcg/kg/val. (~100 kg pacientui – maždaug nuo 5 ml/val.)') +
      '<p class="muted">Pagrindinės dozės – vaisto puslapyje (TCCC 2026 / PCS). Šių ETC lentelių dozės kai kur skiriasi – jei skiriasi, vadovaukitės vaisto puslapiu.</p>' +
      link('#/vaistai', 'Visi vaistai') + link('#/igudis/24', 'Įgūdis #24 – IV vaistų paruošimas') + link('#/igudis/25', 'Įgūdis #25 – infuzomatas'),
    saltinis: 'ETC įgūdžių lapas (Vaistai IV boliusu, Vaistai IV per infuzomatą); gamintojų PCS (JK eMC); TCCC gairės 2026-05-01'
  },
  skausmas: {
    title: 'Skausmo malšinimas', sub: 'TCCC 2026, titravimas, nemedikamentinės priemonės',
    html: '<h3>Įvertinkite</h3><p>Paprašykite pacientą įvertinti skausmą nuo 0 (nėra) iki 10 (stipriausias įsivaizduojamas). Kartokite po kiekvienos dozės.</p>' +
      '<h3>TCCC 2026</h3><p><b>Gali tęsti užduotį</b> – kovinės žaizdos vaistų rinkinys (CWMP): paracetamolis 1000–1300 mg per burną kas 8 val.; meloksikamas 15 mg per burną kartą per parą; suzetriginas 100 mg per burną vieną kartą, po to 50 mg kas 12 val. (jei prieinamas).</p>' +
      '<p><b>Negali tęsti užduoties</b> – jei dar nevartojo, CWMP, IR ketaminas: 25 mg (0,2–0,3 mg/kg) IV / IO lėtai per 1 min, arba 100 mg IM, arba 50 mg į nosį (100 mg/ml); arba esketaminas 14 ar 28 mg į nosį vieną kartą (jei prieinamas). Kartoti kas 30 min. Tikslas – sumažėjęs skausmas arba atsiradęs nistagmas.</p>' +
      '<ul><li>Prieš skiriant ketaminą – užrašyti AVPU, pacientą nuginkluoti.</li><li>Stebėti kvėpavimo takus, kvėpavimą ir kraujotaką.</li><li>Benzodiazepinų nederinti nei su ketaminu / esketaminu, nei su opioidais. Iš dalies disocijavusiam – saugiau papildyti ketamino.</li><li>Pykinimui – ondansetronas 4 mg ODT / IV / IO / IM kas 8 val.</li><li>Tikslas – toleruojamas skausmas, ne visiškas jo pašalinimas.</li></ul>' +
      '<p class="muted">TCCC 2026 gairėse fentanilio, morfino ir naloksono nebėra. Jei kuopa juos naudoja – dozės pagal gamintojo PCS (žr. vaisto puslapį), sprendžia medikas.</p>' +
      '<h3>Titruokite</h3><p>Geriau kelios mažesnės dozės nedideliais intervalais nei viena didelė. TCCC vadove (M. Grinevičius) norimas efektas – skausmas sumažėja bent 3 balais (pvz., buvo 8/10, tapo 5/10); siekiant 3/10 ar mažiau reikės didelių dozių ir atsiras komplikacijų. TCCC 2026 tikslas – toleruojamas skausmas, išsaugant kvėpavimo takų praeinamumą. Registruokite visas skirtas dozes.</p>' +
      '<h3>Kur sustoti</h3><ul><li><b>Ketaminas:</b> sumažėjęs skausmas arba atsiradęs nistagmas (TCCC 2026).</li><li><b>Opioidai:</b> skyrimas nutraukiamas, kai kvėpavimo dažnis &lt; 10 k./min (kuopos kortelė).</li><li><b>Naloksonas:</b> po 0,1 mg kas 2 min iki kvėpavimo dažnio &gt; 10 k./min, neprarandant nuskausminimo (PCS).</li></ul>' +
      '<h3>Ypač atsargiai, kai yra</h3><ul><li>sumažėjęs sąmonės lygis</li><li>kvėpavimo sutrikimas</li><li>šokas – vaisto poveikis gali gerokai vėluoti; opioidų dozes mažinti</li><li>hipotermija</li><li>apsinuodijimas (alkoholis, narkotikai)</li><li>senyvas amžius</li></ul>' +
      '<h3>Be vaistų</h3><ul><li>Palaikykite akių ir fizinį kontaktą, paaiškinkite, kas vyksta, įspėkite prieš skausmingą procedūrą, saugokite orumą.</li><li>Kuo anksčiau imobilizuokite lūžius.</li><li>Uždenkite nudegimus.</li><li>Kuo anksčiau nukelkite nuo kietų neštuvų / lentų.</li><li>Šildykite – drebulys stiprina skausmą.</li></ul>' +
      link('#/vaistas/ketaminas', 'Ketaminas') + link('#/vaistas/paracetamolis', 'Paracetamolis (CWMP)') + link('#/vaistas/meloksikamas', 'Meloksikamas (CWMP)') + link('#/vaistas/morfinas', 'Morfinas') + link('#/vaistas/naloksonas', 'Naloksonas') + link('#/vaistas/ondansetronas', 'Ondansetronas') + link('#/p/tccc', 'TCCC 2026: vaistai ir tikslai'),
    saltinis: 'TCCC gairės 2026-05-01 (Deployed Medicine); gamintojų PCS; ETC vadovas 4.1, 2 sk.; TCCC vaistų vadovas (M. Grinevičius) ir kuopos vaistų kortelės – kaip papildomi šaltiniai'
  },
  tccc: {
    title: 'TCCC 2026: vaistai ir tikslai', sub: 'Committee on TCCC gairės, 2026-05-01 (Deployed Medicine)',
    html: '<div class="warn">Santrauka iš oficialių TCCC gairių. Programėlėje pagrindinės dozės pateiktos pagal šias gaires ir gamintojo PCS; kuopos kortelės, TCCC vadovo (M. Grinevičius) ir ETC lentelių duomenys – vaisto puslapio skiltyje „Kuopos kortelė ir kiti šaltiniai“. Galutinai sprendžia kuopos medikas.</div>' +
      '<h3>Kraujavimas</h3><ul><li><b>TXA</b> – 2 g lėta IV / IO injekcija kuo greičiau, bet ne vėliau nei per 3 val. nuo sužalojimo. Indikacijos: tikėtina transfuzija (hemoraginis šokas, didelės amputacijos, penetruojanti liemens trauma, stiprus kraujavimas), reikšminga galvos smegenų trauma ar pakitusi sąmonė po sprogimo / bukos traumos.</li>' +
      '<li><b>Kalcis</b> – perpylus bet kokių kraujo produktų (įskaitant pilną kraują): 1 g kalcio (30 ml 10 % kalcio gliukonato arba 10 ml 10 % kalcio chlorido) IV / IO po pirmojo vieneto.</li>' +
      '<li><b>Skysčiai</b> (pirmenybės tvarka): šaltai laikytas mažo titro O pilnas kraujas → šviežias mažo titro O pilnas kraujas → plazma : eritrocitai : trombocitai 1:1:1 → plazma : eritrocitai 1:1 → tik plazma ar eritrocitai. Kristaloidų sąraše nėra.</li>' +
      '<li><b>Tikslas</b> – čiuopiamas radialinis pulsas, pagerėjusi sąmonė arba sAKS 100 mm Hg; pasiekus – skysčius sustabdyti. Kartu – hipotermijos prevencija.</li></ul>' +
      '<h3>Galvos smegenų trauma</h3><ul><li>SpO₂ ≥ 92 %, sAKS &gt; 100 mm Hg.</li><li>Išvaržos požymiai: 250 ml 3 % arba 5 % NaCl (arba 30 ml 23,4 %) IV / IO per ≥ 10 min; nėra atsako – kartoti po 20 min (maks. 2 dozės). Profilaktiškai neskirti; tai ne gaivinimo skystis.</li><li>Galvą ir liemenį pakelti &gt; 30°, jei nėra šoko ir leidžia situacija. Neurologinę būklę vertinti kas 5–10 min.</li></ul>' +
      '<h3>Skausmas</h3><ul><li>Gali tęsti užduotį – CWMP: paracetamolis 1000–1300 mg per burną kas 8 val.; meloksikamas 15 mg per burną kartą per parą; suzetriginas 100 mg per burną vieną kartą, po to 50 mg kas 12 val.</li><li>Negali tęsti užduoties: jei dar nevartojo – CWMP, IR ketaminas 25 mg (0,2–0,3 mg/kg) IV / IO per 1 min, 100 mg IM arba 50 mg IN (100 mg/ml), arba esketaminas 14 ar 28 mg IN vieną kartą; kartoti kas 30 min. Tikslas – sumažėjęs skausmas ar nistagmas.</li><li>Prieš ketaminą – AVPU, nuginkluoti. Benzodiazepinų nederinti su ketaminu / esketaminu ar opioidais.</li><li>Pykinimas: ondansetronas 4 mg ODT / IV / IO / IM kas 8 val.</li></ul>' +
      '<h3>Sedacija (paramedikams / gydytojams)</h3><ul><li>Ketaminas 1–2 mg/kg lėtai IV / IO arba 300 mg (2–3 mg/kg) IM.</li><li>Emergencijos reakcija – midazolamas 0,5–2 mg IV / IO.</li></ul>' +
      '<h3>Antibiotikai (atviros kovinės žaizdos)</h3><ul><li>Per burną: cefadroksilis 1 g kartą per parą (alternatyva – cefaleksinas 500 mg kas 6 val.).</li><li>IV / IO / IM: ceftriaksonas 2 g kartą per parą.</li><li>Penetruojanti akies trauma: ceftriaksonas 2 g IV ar IM arba cefadroksilis 1 g per burną kuo skubiau.</li></ul>' +
      link('#/vaistas/cefadroksilis', 'Cefadroksilis') + link('#/vaistas/ceftriaksonas', 'Ceftriaksonas') +
      '<p class="muted">Kuopos kortelėse – amoksiklavas, TCCC vadove (M. Grinevičius) – ertapenemas ir moksifloksacinas (TCCC 2026 jų nebenumato).</p>' +
      '<h3>Nudegimai</h3><p>Jei nudegę daugiau nei 20 % kūno paviršiaus – skysčius pradėti, kai tik yra IV / IO prieiga. Pradinis greitis: nudegusio ploto % × 10 ml/val. (40–80 kg); kiekvienam 10 kg virš 80 kg – +100 ml/val.</p>' +
      link('#/vaistas/txa', 'Traneksamo rūgštis') + link('#/vaistas/ketaminas', 'Ketaminas') + link('#/vaistas/paracetamolis', 'Paracetamolis (CWMP)') + link('#/vaistas/meloksikamas', 'Meloksikamas (CWMP)') + link('#/vaistas/kalcis', 'Kalcio gliukonatas') + link('#/vaistas/nacl-hipert', 'Hipertoninis NaCl') + link('#/p/kraujas', 'Kraujo suderinamumas') +
      '<a class="row" href="https://learning-media.allogy.com/api/v1/pdf/18ccfdfc-a076-47e9-8a34-376efdd81b43/contents" target="_blank" rel="noopener"><div>TCCC gairės 2026-05-01 (PDF)<small>Deployed Medicine</small></div><span class="ar">↗</span></a>',
    saltinis: 'TCCC gairės, 2026-05-01, Committee on TCCC (Deployed Medicine)'
  }
};

// ───────── MOKYMOSI TEMOS (centrai) ─────────
// Kiekviena tema sujungia mokymosi puslapius, kontrolinius sąrašus, įgūdžius ir vaistus.
E.temos = [
  { id: 'pagrindai', zenklas: '1', pav: 'Pagrindai ir komanda', sub: 'ETC eiga, vaidmenys, komunikacija, darbo vieta',
    apie: 'Kaip dirba traumos komanda: pasiruošimas, 5 s apžiūra, horizontali pirminė apžiūra, „10 už 10“ ir antrinė apžiūra. A narys – komandos vadas.',
    puslapiai: ['eiga', 'isdestymas', 'komunikacija'], sarasai: ['a-pas', 'atmist', 'stop', 'komanda', 'kokybe'], igudziai: [1], vaistai: [] },
  { id: 'a', zenklas: 'A', cls: 'rA', pav: 'A – kvėpavimo takai ir neurologija', sub: 'Kvėpavimo takai, deguonis, intubacija, sąmonė',
    apie: 'A narys užtikrina kvėpavimo takus saugodamas kaklą, deguonį ir ventiliaciją, vertina neurologiją (D) ir vadovauja komandai.',
    puslapiai: ['kvepavimas'], sarasai: ['esc-kt', 'a-pir', 'a-plan'], igudziai: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], vaistai: ['ketaminas', 'midazolamas', 'rokuroniumas'] },
  { id: 'b', zenklas: 'B', cls: 'rB', pav: 'B – kvėpavimas ir apžiūra', sub: 'Krūtinė, drenavimas, e-FAST, dubuo, hipotermija',
    apie: 'B narys per ≤ 2 min apžiūri kaklą, krūtinę, pilvą, dubenį, tarpvietę ir galūnes, atmeta 6 gyvybei pavojingas krūtinės būkles, su C apverčia pacientą ir apžiūri nugarą prieš e-FAST.',
    puslapiai: ['kvepavimas'], sarasai: ['b-pir'], igudziai: [13, 14, 15, 16, 17, 18, 19, 20], vaistai: [] },
  { id: 'c', zenklas: 'C', cls: 'rC', pav: 'C – kraujotaka ir šokas', sub: 'PVK / IO, kraujas, vaistai, infuzijos',
    apie: 'C narys iškart įveda PVK ar IO, nustato kraujo grupę ir gliukozę, vertina šoką, ruošia vaistus ir kraujo komponentus.',
    puslapiai: ['kraujas', 'skiedimas'], sarasai: ['esc-kraujas', 'esc-tss', 'c-pir'], igudziai: [21, 22, 23, 24, 25, 26, 27], vaistai: ['txa', 'kalcis', 'noradrenalinas', 'nacl-hipert'] },
  { id: 'antrine', zenklas: 'D/E', pav: 'Antrinė apžiūra', sub: 'Nuo galvos iki kojų: veidas, akys, kaklas, žaizdos, galūnės',
    apie: 'Sistemingai nuo galvos iki kojų, iš priekio ir nugaros; anamnezė AMPLE; neatlikti elementai įrašomi į problemų sąrašą.',
    puslapiai: [], sarasai: ['antrine', 'a-ant', 'b-ant', 'c-ant'], igudziai: [28, 29, 30, 31, 32, 33, 34], vaistai: ['cefadroksilis', 'ceftriaksonas'] },
  { id: 'vaistai', zenklas: 'Rx', pav: 'Vaistai ir skausmas', sub: 'TCCC 2026, skausmo malšinimas, skiedimas',
    apie: 'Pagrindinės dozės – pagal TCCC 2026 gaires ir gamintojo PCS. Kuopos kortelė, TCCC vadovas (M. Grinevičius) ir ETC lentelės – papildomi šaltiniai.',
    puslapiai: ['tccc', 'skausmas', 'skiedimas'], sarasai: [], igudziai: [24, 25, 27], vaistai: ['txa', 'ketaminas', 'paracetamolis', 'meloksikamas', 'ondansetronas', 'ceftriaksonas'] }
];
})();
