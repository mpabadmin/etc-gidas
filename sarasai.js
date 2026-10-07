// ETC kišeninis gidas – VAIDMENYS, KONTROLINIAI SĄRAŠAI, ESCAPE PLANAI, MOKYMOSI TEMOS
// Šaltiniai: ETC vertinimo lapas (A, B, C, Escape, komandos darbas, gydymo kokybė), ETC įgūdžių lapas
// (darbo vietos schema, vaistų lentelės, kraujo suderinamumas), ETC vadovas 4.1 (1–3 sk.), TCCC vaistų vadovas.
// Sąrašo punktas: { t: tekstas, s: [papunkčiai], g: kam skirta, k: true – svarbiausias, i: paaiškinimas mokymosi režimui }
// { h: 'Antraštė' } – skyriaus antraštė sąraše (nežymima).
window.ETC = window.ETC || {};

(function () {
const E = window.ETC;
const KOMP = 'Pagal kompetenciją', MED = 'Medicinos personalui', GYD = 'Gydytojui', INT = 'Intubuojantiems gydytojams';
const link = (href, t, s) => `<a class="row" href="${href}"><div>${t}${s ? '<small>' + s + '</small>' : ''}</div><span class="ar">›</span></a>`;

E.versija = '2026-10-07';

// ───────── VAIDMENYS ─────────
E.vaidmenys = [
  { id: 'A', cls: 'rA', pav: 'A komandos narys – kvėpavimo takai, komandos vadas', sub: 'Airway · vadas', lists: ['a-pas', 'atmist', 'a-pir', 'a-plan', 'a-ant'], vadovas: true,
    aprasymas: '<b>Vieta:</b> prie paciento galvūgalio. A narys yra ir komandos vadas: veda instruktažą, atlieka 5 s apžiūrą ir garsiai paskelbia Planą A ar Escape planą, perima ATMIST informaciją, užtikrina kvėpavimo takus ir deguonį, vertina neurologiją, renka B ir C radinius, perskirsto darbą, po pirminės apžiūros daro „10 už 10“ ir planuoja tolesnį kelią. Antrinėje apžiūroje – galva ir veidas.' },
  { id: 'B', cls: 'rB', pav: 'B komandos narys – kvėpavimas', sub: 'Breathing', lists: ['b-pas', 'b-pir', 'b-ant'],
    aprasymas: '<b>Vieta:</b> vienoje paciento pusėje, šalia echoskopo. Atidengia krūtinę ir pilvą, uždeda monitoringą, vertina kaklą ir krūtinės ląstą, taip pat apžiūri pilvą, dubenį, tarpvietę ir galūnes dėl kraujavimo. Pilną apžiūrą stetoskopu ir rankomis atlieka ne ilgiau nei per 2 min ir <b>tik tada</b> praneša radinius A nariui. Apverčia pacientą ir apžiūri nugarą – <b>prieš e-FAST</b>. Drenavimas ir e-FAST – pagal kompetenciją. Antrinėje apžiūroje atlieka A nario nurodytas procedūras ir padeda C nariui.' },
  { id: 'C', cls: 'rC', pav: 'C komandos narys – kraujotaka', sub: 'Circulation', lists: ['c-pas', 'c-pir', 'c-ant'],
    aprasymas: '<b>Vieta:</b> kitoje paciento pusėje, prie stovo skysčiams ir infuzomatams. <b>Iškart atvykus pacientui, nelaukdamas A nurodymo,</b> įveda PVK arba intrakaulinę adatą ir visiems pacientams nustato kraujo grupę ir gliukozę. Toliau vertina šoko požymius ir aiškiai pasako, ar pacientas yra hemoraginiame šoke, ruošia vaistus ir kraujo komponentus, rūpinasi hipotermijos prevencija.' }
];

// ───────── ESCAPE PLANAI ─────────
E.escape = ['esc-kraujas', 'esc-kt', 'esc-tss'];

E.sarasai = {
  'esc-kraujas': {
    title: 'Katastrofinis kraujavimas', short: 'Kraujavimas',
    intro: 'Komandos vadas (A) aiškiai paskelbia prioritetinę problemą. Pirminė apžiūra netęsiama, kol kraujavimas nesustabdytas.',
    items: [
      { t: 'A (komandos vadas) aiškiai identifikavo ir paskelbė: katastrofinis kraujavimas', k: true },
      { t: 'B ir C nariams nurodyta stabdyti kraujavimą', k: true },
      { t: 'Tiesioginis spaudimas į kraujuojančią vietą' },
      { t: 'Turniketas – pažymėtas uždėjimo laikas', i: 'Pradžios ekrane spauskite kortelę „Turniketas“ → „Dabar“.' },
      { t: 'Žaizda tamponuota hemostatine marle / TXA suvilgytu tvarsčiu' },
      { t: 'Įtariant dubens kraujavimą – uždėtas dubens diržas' },
      { t: 'Skirta traneksamo rūgštis (ne vėliau nei 3 val. nuo traumos)', g: MED },
      { t: 'Kraujo komponentai / masinio kraujavimo protokolas', g: MED },
      { t: 'Esant kraujo transfuzijai – užtikrintas kalcio kiekis', g: MED },
      { t: 'Kraujavimą sustabdžius – grįžta prie Plano A' }
    ]
  },
  'esc-kt': {
    title: 'Kvėpavimo takų obstrukcija', short: 'Kvėpavimo takai',
    intro: 'Komandos vadas (A) aiškiai paskelbia prioritetinę problemą ir paskirsto užduotis.',
    items: [
      { t: 'A (komandos vadas) aiškiai identifikavo ir paskelbė: kvėpavimo takų obstrukcija', k: true },
      { t: 'B nariui nurodyta pasiruošti kriko', g: KOMP, k: true },
      { t: 'Kviečiama ekspertinė pagalba', k: true },
      { t: 'Atsiurbti kvėpavimo takai' },
      { t: 'Pabandyta atverti kvėpavimo takus' },
      { t: 'Nesąmoningam – orofaringinė kaukė, jei dar neįdėta' },
      { t: 'Laringinės kaukės įdėjimas', g: KOMP },
      { t: 'Ventiliacija ambu maišu' },
      { t: 'Padidintas deguonies srautas' }
    ]
  },
  'esc-tss': {
    title: 'Trauminis širdies sustojimas', short: 'Širdies sustojimas',
    intro: 'Taip šis scenarijus aprašytas ETC vertinimo lape. ETC trauminio širdies sustojimo algoritmas yra vadovo 5c skyriuje – papildykite šį sąrašą pagal kuopos protokolą.',
    items: [
      { t: 'A (komandos vadas) aiškiai identifikavo ir paskelbė: trauminis širdies sustojimas', k: true },
      { t: 'Deklaruota mirtis' }
    ]
  },

  // ───────── A ─────────
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
      { t: 'Įvertintas papildomų išteklių poreikis', s: ['Personalas (pvz., vyresnis kolega)', 'Įranga: masinio kraujo perpylimo, sudėtingų kvėpavimo takų rinkinys'] },
      { t: 'Informuoti: kraujo bankas, radiologija, operacinė, intensyvioji terapija' },
      { t: 'Visi laikosi visuotinių atsargumo priemonių' },
      { t: 'Kiekvienas narys patikrino savo įrangą, visi žino, kaip kviesti pagalbą' },
      { t: 'Patalpa ir skysčiai pašildyti' },
      { t: 'Nariai turėjo galimybę užduoti klausimus ir išsakyti rūpesčius' },
      { h: 'A įranga' },
      { t: 'Prieinama visa bazinė ir pažangi kvėpavimo takų įranga', k: true },
      { t: 'Atsiurbėjas paruoštas ir veikia' },
      { t: 'DPV patikrintas ir paruoštas naudoti' },
      { t: 'Deguonies šaltinis: koncentratorius / balionai' },
      { t: 'Kaklo įtvaras, blokai ir juosta' },
      { t: 'Escape planas: laringinė kaukė, chirurginių kvėpavimo takų rinkinys, aišku, kas atliks kriko', k: true },
      { t: 'Paruošta analgezija', g: MED },
      { t: 'RSI kontrolinis sąrašas, jei planuojama bendroji anestezija', g: INT }
    ]
  },
  'a-pir': {
    title: 'A – pirminė apžiūra', short: 'Pirminė',
    intro: 'C narys iškart pats įveda PVK / IO ir nustato kraujo grupę bei gliukozę – nurodymo nereikia. B narys radinius praneša tik baigęs pilną apžiūrą (iki 2 min).',
    items: [
      { h: '5 sekundžių apžiūra' },
      { t: 'Atlikta 5 s apžiūra – vertinimo trikampis', k: true, s: ['Socialinė sąveika: rami / susijaudinęs / nėra', 'Kvėpavimo pastangos: normalios / padidėjusios / nėra', 'Odos perfuzija: rožinė / blyški, marmuruota / nėra'],
        i: 'Plačiau – tema „ETC eiga“.' },
      { t: 'Atmesta: katastrofinis kraujavimas, kvėpavimo takų obstrukcija, trauminis širdies sustojimas', k: true },
      { t: 'Garsiai paskelbta: tęsiamas Planas A arba aktyvuojamas Escape planas', k: true },
      { h: 'Kvėpavimo takai ir neurologija' },
      { t: 'Įvertintas kvėpavimo takų praeinamumas', k: true, s: ['Kvėpavimo takai laisvi', 'Obstrukcija – užkritęs liežuvis / skystis / tinimas'], i: 'Įgūdžiai #2, #3.' },
      { t: 'Apžiūrėta burnos ertmė', s: ['Atsiurbimo poreikio nėra', 'Atsiurbimo poreikis yra'] },
      { t: 'Įvertintas orofaringinės kaukės poreikis (koma / obstrukcija)', i: 'Įgūdis #6.' },
      { t: 'Įvertintas kvėpavimo nepakankamumas ir deguonies poreikis', s: ['Deguonies poreikio nėra', 'Nosies kaniulės, deguonis < 6 l/min', 'Deguonies kaukė, deguonis > 6 l/min'], i: 'Įgūdžiai #4, #5.' },
      { t: 'Perimta informacija iš atvežusio ekipažo (skirtukas ATMIST)' },
      { t: 'Įvertinta, ar gerai ventiliuojasi plaučiai', s: ['Papildomos ventiliacijos ambu maišu nereikia', 'Reikia papildomos ventiliacijos ambu maišu'], i: 'Įgūdis #7.' },
      { t: 'Įvertinta, ar pakankamai deguonies patenka į plaučius', s: ['Pakankama', 'Nepakankama'] },
      { t: 'Įvertinta, ar nereikia eskaluoti kvėpavimo takų valdymo', k: true,
        s: ['Deklaruojama didelės rizikos kriko situacija', 'Kviečiama ekspertinė pagalba dėl intubacijos', 'Pabandoma atsiurbti',
            'Optimizuojamas atvėrimas: orofaringinė kaukė (nesąmoningam), dažnesnė ir didesnio tūrio ventiliacija ambu maišu, orofaringinė keičiama į laringinę kaukę',
            'Padidinamas deguonies srautas'],
        i: 'Įgūdis #8 – neefektyvaus kvėpavimo takų valdymo atpažinimas.' },
      { t: 'Įvertinta neurologija', s: ['AVPU', 'Vyzdžių dydis ir fotoreakcija', 'Galūnių motorika – simetriška / nesimetriška'], i: 'Įgūdis #12.' },
      { h: 'Komandos valdymas' },
      { t: 'Gauti B nario radiniai po pilnos apžiūros (closed-loop komunikacija)', k: true },
      { t: 'Gauti C nario duomenys: prieiga, kraujo grupė, gliukozė, šoko požymiai' },
      { t: 'Darbas perskirstomas pagal klinikinę situaciją' },
      { t: 'Prireikus aktyvuotas masinio kraujavimo protokolas' },
      { t: 'Iškilus netikėtai problemai – STOP (10 už 10)' }
    ]
  },
  'a-plan': {
    title: 'A – po pirminės apžiūros', short: 'Planavimas',
    items: [
      { t: 'Algoritmas pereitas dar kartą – radinių apžvalga (10 už 10)', k: true },
      { t: 'Su komanda aptartas pirminis gydymas / planas', k: true },
      { t: 'Įvertintas atsakas į gydymą' },
      { t: 'Visi komandos nariai žino paciento problemas ir ištyrimo / gydymo etapą' },
      { t: 'Patikrinti gydymo tikslai (sąrašas „Gydymo tikslai ir kokybė“)' },
      { t: 'Nuspręsta dėl tolesnio kelio: vaizdiniai tyrimai, operacinė, intensyvioji terapija, pervežimas' },
      { t: 'Informuoti priimantys skyriai, dokumentacija keliauja su pacientu' },
      { t: 'Atlikta arba suplanuota antrinė apžiūra, neatlikti elementai įrašyti' }
    ]
  },
  'a-ant': {
    title: 'A – antrinė apžiūra', short: 'Antrinė',
    items: [
      { t: 'Patikrintos nosies landos ir veido kaulų stabilumas' },
      { t: 'Įtariant veido kaulų nestabilumą – uždėtas kaklo įtvaras ir bite blocks', g: KOMP },
      { t: 'Vertinta dėl nosies pertvaros hematomos požymių' },
      { t: 'Kraujuojant – užtamponuotos priekinė ir užpakalinė nosies ertmės abipus', g: KOMP, i: 'Įgūdis #29.' },
      { t: 'Apžiūrėti akių obuoliai, vertinta dėl retrobulbarinės hematomos' },
      { t: 'Esant įtarimui – atlikta lateralinė kantotomija', g: KOMP, i: 'Įgūdis #28.' },
      { t: 'Apžiūrėtos ausų landos dėl kraujavimo' },
      { t: 'Įvertinta dėl kaukolės pamato lūžio ir galvos smegenų pažeidimo požymių, apžiūrėtas kaukolės skliautas' },
      { t: 'Įvertinta dėl nudegimų' }
    ]
  },

  // ───────── B ─────────
  'b-pas': {
    title: 'B – pasiruošimas', short: 'Pasiruošimas',
    intro: 'Vieta – vienoje paciento pusėje, šalia echoskopo.',
    items: [
      { t: 'Monitorius veikia: EKG, SpO₂, AKS', k: true },
      { t: 'Pleuros drenavimo įranga paruošta', g: KOMP },
      { t: 'Okliuziniai tvarsčiai' },
      { t: 'Ultragarso aparatas e-FAST tyrimui', g: KOMP },
      { t: 'Kriko rinkinys – jei paskirta atlikti', g: KOMP },
      { t: 'Escape planas: veiksmai trauminio širdies sustojimo atveju', k: true }
    ]
  },
  'b-pir': {
    title: 'B – pirminė apžiūra', short: 'Pirminė',
    intro: 'Pilna apžiūra stetoskopu ir rankomis – ne ilgiau nei 2 min. Radinius A nariui praneškite tik baigę visą apžiūrą. Nugara apžiūrima prieš e-FAST.',
    items: [
      { t: 'Nukirpti (jei įtariama trauma) / nuimti viršutiniai rūbai – pilvas ir krūtinė pilnai atidengti' },
      { t: 'Uždėtas monitoringas', i: 'Įgūdis #15.' },
      { t: 'Patikrintas kaklas, jei neuždėtas kaklo įtvaras', s: ['Trachėjos pasislinkimas', 'Žaizdos, hematomos', 'Kraujas ir skausmingumas po kaklu', 'Kaklo imobilizavimas esant poreikiui'] },
      { t: 'Įvertinta krūtinės ląsta', k: true, s: ['Žaizdos ir kraujosruvos', 'Simetriškas krūtinės ląstos kilnojimasis', 'Poodinė emfizema', 'Kvėpavimo dažnis', 'Respiracinis distresas', 'Auskultacija 3 taškuose kairėje ir dešinėje'], i: 'Įgūdis #13.' },
      { t: 'Įvertinta dėl įtampos hemopneumotorakso', k: true, s: ['Mažai tikėtinas – drenuoti nereikia', 'Labai tikėtinas – drenuoti; įvertinta, kiek išbėgo kraujo'], i: 'Įgūdis #14 – pleuros drenavimas (pagal kompetenciją).' },
      { t: 'Ant krūtinės ląstos žaizdos uždėtas okliuzinis tvarstis' },
      { t: 'Apžiūrėtas pilvas dėl žaizdų, evisceracijos; palpuota dėl skausmingumo ir įtempimo' },
      { t: 'Patikrintas dubens stabilumas', k: true, s: ['Dubuo stabilus', 'Dubuo nestabilus – uždedamas dubens diržas'], i: 'Įgūdis #20.' },
      { t: 'Patikrinta tarpvietė ir lytiniai organai dėl kraujavimo požymių', s: ['Kraujo nėra', 'Kraujas yra – uždedamas dubens diržas'] },
      { t: 'Apžiūrėtos galūnės ir jungties vietos dėl kraujavimo', k: true },
      { t: 'Radiniai pranešti A nariui – tik baigus pilną apžiūrą stetoskopu / rankomis (iki 2 min)', k: true },
      { t: 'Pacientas paverstas ant šono, apžiūrėta nugara – prieš e-FAST', k: true, s: ['Sužeidimai ir kraujavimas', 'Okliuzinis tvarstis, jei krūtinėje yra žaizda', 'Stuburo vidurio linijos palpacija dėl skausmingumo (jei sąmoningas)'], i: 'Įgūdis #17.' },
      { t: 'Atliktas e-FAST', g: KOMP, s: ['Morisono kišenė', 'Splenorenalinė kišenė', 'Šlapimo pūslė', 'Perikardas', 'Kairėje ir dešinėje dėl pneumotorakso'], i: 'Įgūdis #16.' }
    ]
  },
  'b-ant': {
    title: 'B – antrinė apžiūra', short: 'Antrinė',
    items: [
      { t: 'Apžiūrėta dėl krūtinės nudegimų, nudegimai sutvarkyti' },
      { t: 'Atliktos A nario nurodytos procedūros', s: ['Kaklo imobilizavimas', 'Bite blocks', 'Nosies tamponavimas', 'Nosies pertvaros hematomos drenavimas', 'Galvos tvarstymas'] },
      { t: 'Padėta C nariui', s: ['Turniketo konversija', 'Galūnių imobilizavimas'] },
      { t: 'Įvestas ŠPK, įvertinta šlapimo spalva / drumstumas', g: KOMP, i: 'Įgūdis #34.' }
    ]
  },

  // ───────── C ─────────
  'c-pas': {
    title: 'C – pasiruošimas', short: 'Pasiruošimas',
    intro: 'Vieta – kitoje paciento pusėje, prie stovo skysčiams ir infuzomatams.',
    items: [
      { t: 'PVK 16–18G ir intrakaulinė adata paruoštos iškart', g: MED, k: true },
      { t: 'Paruoštos kraujo grupės nustatymo priemonės ir gliukometras', g: MED, k: true },
      { t: 'Tvarsčiai, hemostatinė marlė ir turniketai išoriniam kraujavimui', k: true },
      { t: 'Dubens diržas' },
      { t: 'Greito infuzavimo / masinio kraujo perpylimo sistema, kraujo komponentai', g: MED },
      { t: 'Pašildyti skysčiai' },
      { t: 'Paruošti vaistai (žr. „Vaistų skiedimo lentelės“)', g: MED },
      { t: 'Escape planas: katastrofinis kraujavimas', k: true }
    ]
  },
  'c-pir': {
    title: 'C – pirminė apžiūra', short: 'Pirminė',
    intro: 'Atvykus pacientui – iškart kraujagyslių prieiga, kraujo grupė ir gliukozė, nelaukiant A nario nurodymo.',
    items: [
      { t: 'Iškart atvykus pacientui įvestas 16–18G PVK – be A nurodymo', g: MED, k: true, s: ['Negalint įvesti PVK – intrakaulinė adata'], i: 'Įgūdžiai #21, #22.' },
      { t: 'Visiems pacientams iškart nustatyta kraujo grupė ir gliukozė – be A nurodymo', g: MED, k: true, i: 'Įgūdis #23. Žr. temą „Kraujo suderinamumas“.' },
      { t: 'Nuimti batai, nukirpti (jei įtariama trauma) apatiniai rūbai' },
      { t: 'Uždėtas monitoringas', i: 'Įgūdis #15.' },
      { t: 'Įvertinta dėl šoko požymių', s: ['Interpretuoti monitoriaus rodmenys', 'Galūnės čiuopiamos dėl šaltumo (spazmuota periferija)', 'Oda – marmuruotumas / prakaitas', 'A. radialis ir a. femoralis pulsai'] },
      { t: 'Aiškiai iškomunikuota, ar pacientas yra hemoraginiame šoke', k: true },
      { t: 'Paruošti ir suleisti paskirti vaistai', g: MED, i: 'Įgūdis #24.' },
      { t: 'Paruošti kraujo komponentai transfuzijai', g: MED },
      { t: 'Pacientas paverstas ant šono', s: ['Apžiūrėta dėl sužeidimų ir kraujavimo', 'Stuburo vidurio linijos palpacija dėl skausmingumo (jei sąmoningas)'] },
      { t: 'Atlikta hipotermijos prevencija', i: 'Įgūdis #19.' }
    ]
  },
  'c-ant': {
    title: 'C – antrinė apžiūra', short: 'Antrinė',
    items: [
      { t: 'Evisceracijos pirmoji pagalba (jei yra)' },
      { t: 'Atlikta turniketo konversija (jei galima)', g: MED, i: 'Įgūdis #26.' },
      { t: 'Įvertintos galūnės dėl galimų lūžių, įtariamos vietos imobilizuotos', i: 'Įgūdis #33.' },
      { t: 'Hipotermijos prevencija' }
    ]
  },

  // ───────── ATMIST (A skirtukas) ─────────
  'atmist': {
    title: 'ATMIST perdavimas', short: 'ATMIST',
    intro: 'Standartizuotas ikihospitalinės informacijos perdavimas – mažiau prarandamos informacijos. Prieš perdavimą A narys (komandos vadas) atlieka 5 s apžiūrą.',
    items: [
      { t: 'A – amžius, lytis, svarbi anamnezė', s: ['Pvz., nėštumas, antikoaguliantai (varfarinas)'] },
      { t: 'T – traumos laikas', k: true },
      { t: 'M – mechanizmas', s: ['Bendras mechanizmas: eismo įvykis, dūris ir kt.', 'Rizikos veiksniai: įstrigimas, apvirtimas, išmetimas iš transporto priemonės, kritimas iš aukščio'] },
      { t: 'I – įtariami sužalojimai' },
      { t: 'S – požymiai ir simptomai', s: ['Kvėpavimo dažnis, SpO₂', 'Širdies susitraukimų dažnis, kraujospūdis', 'GKS, židininis neurologinis deficitas', 'Skausmas', 'Gyvybinių funkcijų tendencijos'] },
      { t: 'T – taikytas gydymas ir kas numatoma atvykus', k: true, s: ['Turniketai ir jų uždėjimo laikas', 'Kitos intervencijos', 'Skirti vaistai', 'Kas numatoma (pvz., masinė transfuzija)'] }
    ]
  },

  // ───────── BENDRI ─────────
  'stop': {
    title: 'STOP · 10 už 10', short: 'STOP',
    intro: '10 sekundžių pauzė gali sutaupyti 10 minučių bevaisio darbo. Komandos vadas (A) skelbia STOP diagnostikos pradžioje, planuojant gydymo prioritetus, būklei netikėtai pablogėjus arba kai komanda jaučiasi „įstrigusi“.',
    items: [
      { t: 'Problema? – kokia pagrindinė problema dabar', k: true },
      { t: 'Komanda? – visi sustoja ir klauso' },
      { t: 'Faktai? – radiniai peržiūrimi struktūriškai (cABCDE)' },
      { t: 'Planas! – darbinė diagnozė ir tolesni veiksmai', k: true },
      { t: 'Paskirstykite! – kas ką daro' },
      { t: 'Klausimai? – ar visi supranta, ar yra pasiūlymų ir rūpesčių' },
      { t: 'Patikrinti! – po veiksmų įvertinti iš naujo' }
    ]
  },
  'komanda': {
    title: 'Komandos darbas', short: 'Komanda',
    items: [
      { t: 'Naudojama closed-loop komunikacija', k: true },
      { t: 'Horizontalūs darbo santykiai' },
      { t: 'Komandos nariai aiškiai praneša komandos vadui apie radinius / problemas' },
      { t: 'Komandos vadas aiškiai perduoda komandai paciento ikihospitalinę būklę' },
      { t: 'Komandos vadas perskirsto darbą pagal klinikinę situaciją' },
      { t: 'Laikomasi algoritmo' },
      { t: 'Po pirminės apžiūros komandos vadas pereina algoritmą dar kartą – radinių apžvalga, aptariamas pirminis gydymas / planas', k: true },
      { t: 'Po pirminės apžiūros įvertinamas atsakas į gydymą' },
      { t: 'Nėra nereikalingos komunikacijos ir pašalinių kalbų' },
      { t: 'Laikomasi kokybės ir aseptikos standartų' },
      { t: 'Visi komandos nariai žino paciento problemas ir kuriame ištyrimo / gydymo etape jis yra' }
    ]
  },
  'kokybe': {
    title: 'Gydymo tikslai ir kokybė', short: 'Kokybė',
    items: [
      { t: 'Užtikrinamas adekvatus deguonies kiekis audiniuose', k: true },
      { t: 'Sustabdytas kraujo netekimas (negalioja intraabdominaliniam kraujavimui)', k: true },
      { t: 'Atstatoma netekto kraujo cirkuliacija' },
      { t: 'Pacientas adekvačiai nuskausmintas opioidais' },
      { t: 'Laikomasi AKS (MAP) tikslų', k: true, s: ['Hemoraginis šokas be galvos traumos požymių – MAP 65 mmHg', 'Galvos smegenų trauma – sAKS 110–120 mmHg'] },
      { t: 'Taikoma hipotermijos prevencija' },
      { t: 'Skirta traneksaminė rūgštis' },
      { t: 'Esant kraujo transfuzijai užtikrinamas kalcio kiekis' },
      { t: 'Galvos smegenų trauma', s: ['Manitolis arba 3 % NaCl', '30° lovos galvūgalio padėtis'] },
      { t: 'Bent 2 didelio kalibro PVK arba IO adata' },
      { t: 'Imobilizuoti lūžgaliai ir kaklas (jei įtariama)' },
      { t: 'Sutvarstytos žaizdos ir / ar nudegimai' },
      { t: 'Atlikta turniketo konversija, kai tai saugu' },
      { t: 'Aptarta, kaip mažinti hiperkalemijos ir inkstų nepakankamumo riziką po turniketo konversijos' },
      { h: 'Intubuotas pacientas' },
      { t: 'Adekvačiai seduojamas ir nuskausminamas', g: GYD },
      { t: 'Optimalūs DPV parametrai', g: GYD },
      { t: 'ETV virš bifurkacijos, nustatytas ETV gylis', g: GYD }
    ]
  }
};

// ───────── MOKYMOSI TEMOS ─────────
const tri = '<table><tr><th>Socialinė sąveika</th><th>Kvėpavimo pastangos</th><th>Odos perfuzija</th></tr>' +
  '<tr><td>Rami, susikaupęs</td><td>Normalios</td><td>Rožinė</td></tr>' +
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
<text x="50" y="89" text-anchor="middle" style="font-size:14px;font-weight:600">Echo</text>
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

const sk = (n, prep, dose) => `<div class="card"><b>${n}</b><div>${prep}</div><div class="muted">${dose}</div></div>`;

E.puslapiai = {
  eiga: {
    title: 'ETC eiga: nuo pranešimo iki antrinės apžiūros', sub: 'Planas A, 5 s apžiūra, Escape, cABCDE',
    html: '<h3>Prioritetai: cABC</h3><p>Seka padeda išvengti dažniausių išvengiamų mirties priežasčių: <b>c</b> – katastrofinis kraujavimas, <b>A</b> – kvėpavimo takų obstrukcija, <b>B</b> – krūtinės ląstos sužalojimai, <b>C</b> – kraujotakos šokas. Toliau – D (neurologija) ir E (atidengimas, temperatūra).</p>' +
      '<p><b>Komandos vadas – A narys.</b> Atskiro lyderio nėra.</p>' +
      '<h3>1. Prieš atvykstant</h3><p>Gavęs įspėjimą (geriausia ATMIST formatu), A narys surenka komandą: pristato narius, paskirsto vaidmenis A, B, C ir rašytoją, patikrina kompetencijas, suformuluoja <b>Planą A</b> (standartinė pirminė apžiūra) ir aptaria <b>Planą B</b> (pvz., skubiai į operacinę, netikėtas širdies sustojimas). Kiekvienas narys patikrina savo įrangą, patalpa ir skysčiai pašildomi.</p>' +
      link('#/v/A?f=0', 'A – instruktažas ir pasiruošimas') +
      '<h3>2. Atvykus – 5 sekundžių apžiūra</h3><p>Prieš perdavimą A narys per kelias sekundes įvertina pacientą pagal <b>vertinimo trikampį</b>. Tikslas – atmesti tris gyvybei pavojingas būkles: katastrofinį kraujavimą, kvėpavimo takų obstrukciją ir trauminį širdies sustojimą, ir patvirtinti, kad Planas A vis dar tinka.</p>' + tri +
      '<p class="muted">Ramus pacientas, normaliai kvėpuojantis, rožine oda greičiausiai skubios intervencijos nereikalauja. Susijaudinęs, sunkiai kvėpuojantis, marmuruota oda – greičiausiai reikia gyvybę gelbstinčių veiksmų nedelsiant.</p>' +
      '<h3>3. Sprendimas garsiai</h3><p>A narys aiškiai paskelbia rezultatą. Dažniausiai tęsiamas Planas A. Radus gyvybei pavojingą būklę, komanda iš karto nukreipiama ją spręsti – aktyvuojamas Escape planas.</p>' +
      link('#/s/esc-kraujas', 'Escape: katastrofinis kraujavimas') + link('#/s/esc-kt', 'Escape: kvėpavimo takų obstrukcija') + link('#/s/esc-tss', 'Escape: trauminis širdies sustojimas') +
      '<h3>4. Perdavimas (ATMIST)</h3>' + link('#/v/A?f=1', 'ATMIST perdavimas') +
      '<h3>5. Horizontali pirminė apžiūra</h3><p>A, B ir C dirba <b>vienu metu</b> ir prireikus padeda vieni kitiems. Pacientas atidengiamas ir saugomas nuo hipotermijos.</p><ul>' +
      '<li><b>C</b> – iškart atvykus pacientui, nelaukdamas A nurodymo, įveda PVK arba intrakaulinę adatą ir visiems pacientams nustato kraujo grupę ir gliukozę.</li>' +
      '<li><b>B</b> – pilna apžiūra stetoskopu ir rankomis: kaklas, krūtinė, pilvas, dubuo, tarpvietė, galūnės (dėl kraujavimo) – ne ilgiau nei 2 min. Radinius A nariui praneša <b>tik baigęs</b> visą apžiūrą. Nugara apžiūrima <b>prieš e-FAST</b>.</li>' +
      '<li><b>A</b> – kvėpavimo takai, deguonis, neurologija; renka B ir C radinius ir perskirsto darbą.</li></ul>' +
      link('#/v/A?f=2', 'A – pirminė apžiūra') + link('#/v/B?f=1', 'B – pirminė apžiūra') + link('#/v/C?f=1', 'C – pirminė apžiūra') +
      '<h3>6. Planavimas – 10 už 10</h3><p>Po pirminės apžiūros A narys sustabdo komandą: radinių apžvalga, darbinė diagnozė, atsakas į gydymą, tolesnis kelias (vaizdiniai tyrimai, operacinė, intensyvioji terapija, pervežimas).</p>' +
      link('#/v/A?f=3', 'A – po pirminės apžiūros') + link('#/s/stop', 'STOP · 10 už 10') + link('#/s/kokybe', 'Gydymo tikslai ir kokybė') +
      '<h3>7. Antrinė apžiūra</h3><p>Sistemingai nuo galvos iki kojų, iš priekio ir nugaros, pakartotinai vertinant gyvybines funkcijas ir GKS, peržiūrint tyrimų rezultatus. Stabiliam pacientui – iškart po pirminės apžiūros, nestabiliam – etapais, kai leidžia gaivinimas. Surenkama anamnezė (AMPLE). Neatlikti elementai įrašomi į problemų sąrašą, kad nebūtų pamiršti.</p>' +
      '<p class="muted">Būklei bet kada pablogėjus – vėl pirminė apžiūra.</p>',
    saltinis: 'ETC vadovas 4.1, 2 sk.; ETC vertinimo lapas; kuopos pirminio ištyrimo pakeitimai (2026-10-07)'
  },
  komunikacija: {
    title: 'Komunikacija komandoje', sub: 'Closed loop, SBAR, PACE, CRM principai',
    html: '<h3>Closed-loop komunikacija</h3><p>Nurodymas adresuojamas konkrečiam žmogui vardu → gavėjas pakartoja → atlikęs praneša „atlikta“. Taip niekas neprarandama ir komandos vadas žino, kas padaryta.</p>' +
      '<h3>SBAR – kai reikia komandos vado dėmesio</h3><ul><li><b>S – situacija:</b> kas vyksta dabar.</li><li><b>B – aplinkybės:</b> kas žinoma apie pacientą ir sužalojimą.</li><li><b>A – vertinimas:</b> ką manau, kad tai reiškia.</li><li><b>R – rekomendacija:</b> ko man reikia / ką siūlau daryti.</li></ul>' +
      '<h3>PACE – kai nerimauji dėl saugumo</h3><p>Kiekvienas komandos narys privalo pasakyti, jei mato pavojų pacientui. Laipsniškai:</p><ul><li><b>P – paklausk:</b> „Ar esi tikras dėl…?“</li><li><b>A – įspėk:</b> „Ar nemanai, kad tai sukels…?“</li><li><b>C – mesk iššūkį:</b> „Bijau, kad tai pakenks pacientui.“</li><li><b>E – skubūs veiksmai:</b> „Sustok! Kviečiu pagalbą.“</li></ul>' +
      '<h3>Autoriteto gradientas</h3><p>Geras komandos vadas sukuria aplinką, kurioje jaunesni nariai nebijo išsakyti nuomonės, ir pats priima patarimus. Svarbu, kas teisinga, o ne kas teisus.</p>' +
      '<h3>Fiksacijos klaidos</h3><ul><li><b>„Tai ir tik tai“</b> – tunelinis mąstymas, kitos galimybės nesvarstomos.</li><li><b>„Viskas, išskyrus tai“</b> – ieškoma smulkmenų, ignoruojant pavojingiausią priežastį.</li><li><b>„Viskas gerai“</b> – pavojaus ženklai nurašomi artefaktams.</li></ul><p>Padeda: antra nuomonė, „10 už 10“, žvilgsnis tarsi įėjus į kambarį pirmą kartą.</p>' +
      '<h3>15 CRM principų</h3><ol><li>Pažink aplinką</li><li>Numatyk ir planuok</li><li>Laiku kviesk pagalbą</li><li>Būk lyderis ir sekėjas, būk ryžtingas</li><li>Paskirstyk darbo krūvį (10 už 10)</li><li>Mobilizuok visus išteklius</li><li>Bendrauk efektyviai – kalbėk</li><li>Naudok visą turimą informaciją</li><li>Užkirsk kelią fiksacijos klaidoms</li><li>Tikrink ir dar kartą tikrink</li><li>Naudok kognityvines pagalbos priemones</li><li>Pakartotinai vertink (10 už 10)</li><li>Dirbk komandoje, koordinuok ir remk kitus</li><li>Išmintingai paskirstyk dėmesį</li><li>Dinamiškai nustatyk prioritetus</li></ol>' +
      link('#/s/komanda', 'Komandos darbo sąrašas') + link('#/s/stop', 'STOP · 10 už 10'),
    saltinis: 'ETC vadovas 4.1, 1 sk.; ETC vertinimo lapas'
  },
  isdestymas: {
    title: 'Darbo vietos išdėstymas', sub: 'Kur stovi A, B, C ir kur kokia įranga',
    html: schema +
      '<ul><li><b>A</b> – komandos vadas, prie galvūgalio: kvėpavimo takų priemonės ir drenai, atsiurbėjas, DPV, deguonis, telemetrija.</li><li><b>B</b> – vienoje pusėje, šalia echoskopo. Iš šios pusės – privažiavimas ir paciento iškrovimas.</li><li><b>C</b> – kitoje pusėje, prie stovo skysčiams ir infuzomatams.</li><li>Vaistai, PVK, tvarsliava – atskirai, už praėjimo; gali būti su ratukais.</li></ul>' +
      link('#/v/A?f=0', 'A – pasiruošimas') + link('#/v/B?f=0', 'B – pasiruošimas') + link('#/v/C?f=0', 'C – pasiruošimas'),
    saltinis: 'ETC įgūdžių lapas (darbo vietos schema)'
  },
  kraujas: {
    title: 'Kraujo suderinamumas', sub: 'Eritrocitai, plazma, trombocitai, krioprecipitatas',
    html: kraujas +
      '<p class="muted">Eritrocitų universalus donoras – O−, plazmos – AB. Lentelę slinkite į šoną, jei netelpa ekrane.</p>' +
      link('#/igudis/23', 'Įgūdis #23 – kraujo grupė ir transfuzija'),
    saltinis: 'ETC įgūdžių lapas (Combined Blood Compatibility Table), išversta'
  },
  skiedimas: {
    title: 'Vaistų skiedimo lentelės', sub: 'IV boliusai ir infuzomatai (ETC)',
    html: '<div class="warn">Medicinos personalui. Tai paruošimo atmintinė iš ETC įgūdžių lentelių – vaistą ir dozę skiria gydytojas.</div>' +
      '<h3>IV boliusu</h3>' +
      sk('Ketaminas – sedacija', '10 ml švirkštas: 250 mg + 5 ml NaCl = 25 mg/ml', '1–2 mg/kg. Esant šokui – dozė mažinama 50 %.') +
      sk('Rokuroniumas', '10 ml švirkštas: 100 mg, neskiesta = 10 mg/ml', '0,5–1,5 mg/kg') +
      sk('Traneksamo rūgštis', '2000 mg į 100 ml arba 250 ml NaCl', '2 g greita infuzija') +
      sk('Fentanilis', '2 ml švirkštas: 100 mcg, neskiesta = 50 mcg/ml', '0,5–1 mcg/kg') +
      sk('Morfinas', '10 ml švirkštas: 10 mg + 9 ml NaCl = 1 mg/ml', '0,1 mg/kg') +
      sk('Kalcio gliukonatas', '3 g (30 ml) į 250 ml NaCl', '3 g greita infuzija') +
      sk('Naloksonas', '10 ml švirkštas: 0,4 mg + 9 ml NaCl = 0,04 mg/ml', 'Po 0,2 mg (5 ml) kas 2–3 min iki efekto. Maks. 2 mg.') +
      sk('Ondansetronas', '20 ml švirkštas: 8 mg + 16 ml NaCl', 'Suleisti lėtai IV') +
      sk('Metoklopramidas', '10 ml švirkštas: 10 mg + 8 ml NaCl', 'Suleisti lėtai IV') +
      sk('Atropinas', '10 ml švirkštas: 1 mg + 9 ml NaCl = 0,1 mg/ml', 'Po 0,5 mg kas 1–2 min, iki 3 mg') +
      '<h3>IV per infuzomatą</h3>' +
      sk('Noradrenalinas', '50 ml švirkštas: 4 mg + 46 ml 5 % gliukozės = 80 mcg/ml', '0,1–1 mcg/kg/min. Maždaug nuo 6 ml/val., maksimalus 50 ml/val.') +
      sk('Ketaminas', '50 ml švirkštas: 500 mg + 40 ml NaCl = 10 mg/ml', 'Nuo 0,5 mg/kg/val. (maždaug nuo 5 ml/val.)') +
      sk('Morfinas', '10 ml švirkštas: 10 mg + 9 ml NaCl = 1 mg/ml', 'Pradinis 1–2 mg/val. (1–2 ml/val.)') +
      sk('Fentanilis', '50 ml švirkštas: 1000 mcg + 30 ml NaCl = 20 mcg/ml', '1–3 mcg/kg/val. (maždaug nuo 5 ml/val.)') +
      '<p class="muted">Kuopos kortelių dozės skausmui malšinti gali skirtis nuo šių ETC lentelių – žr. vaisto puslapį.</p>' +
      link('#/vaistai', 'Visi vaistai') + link('#/igudis/24', 'Įgūdis #24 – IV vaistų paruošimas') + link('#/igudis/25', 'Įgūdis #25 – infuzijos pompa'),
    saltinis: 'ETC įgūdžių lapas (Vaistai IV boliusu, Vaistai IV per infuzomatą)'
  },
  skausmas: {
    title: 'Skausmo malšinimas', sub: 'Titravimas, tikslai, nemedikamentinės priemonės',
    html: '<h3>Titruokite</h3><p>Geriau kelios mažesnės dozės nedideliais intervalais nei viena didelė. <b>Norimas efektas</b> – skausmas sumažėja bent 3 balais (pvz., buvo 8/10, tapo 5/10). Nesiekite 3/10 ar mažiau – reikės didelių dozių ir atsiras komplikacijų. Registruokite visas skirtas dozes ir nuolat vertinkite skausmą.</p>' +
      '<h3>Kur sustoti – pagal kuopos korteles</h3><ul><li><b>Morfinas:</b> skyrimas nutraukiamas, kai kvėpavimo dažnis &lt;10 k./min.</li><li><b>Ketaminas:</b> kartoti, kol atsiranda nistagmas.</li><li><b>Naloksonas:</b> titruoti iki kvėpavimo dažnio >10 k./min, neprarandant skausmo malšinimo.</li></ul>' +
      '<h3>Ypač atsargiai, kai yra</h3><ul><li>sumažėjęs sąmonės lygis</li><li>kvėpavimo sutrikimas</li><li>šokas – vaisto poveikis gali gerokai vėluoti</li><li>hipotermija</li><li>apsinuodijimas (alkoholis, narkotikai)</li><li>senyvas amžius</li></ul>' +
      '<h3>Be vaistų</h3><ul><li>Akių ir fizinis kontaktas, paaiškinkite, kas vyksta, įspėkite prieš skausmingą procedūrą, išsaugokite orumą.</li><li>Kuo anksčiau imobilizuokite lūžius.</li><li>Uždenkite nudegimus.</li><li>Kuo anksčiau nukelkite nuo kietų neštuvų / lentų.</li><li>Šildykite – drebulys stiprina skausmą.</li></ul>' +
      '<p>Analgetikai dažniausiai skiriami kartu su vėmimą slopinančiais vaistais.</p>' +
      link('#/vaistas/ketaminas', 'Ketaminas') + link('#/vaistas/morfinas', 'Morfinas') + link('#/vaistas/naloksonas', 'Naloksonas') + link('#/vaistas/ondansetronas', 'Ondansetronas'),
    saltinis: 'TCCC vaistų vadovas (M. Grinevičius); kuopos vaistų kortelės; ETC vadovas 4.1, 2 sk.'
  }
};
})();
