# Pranešimai apie klaidas ir pasiūlymai

## Kaip tai veikia
1. Programėlėje: mygtukas su šauktuku viršuje (arba „Pastebėjote klaidą? Praneškite“ puslapio apačioje, arba Nustatymai → Atsiliepimai).
2. Žmogus pasirenka tipą (klaida, dozė, techninė, trūksta turinio, pasiūlymas), svarbą, parašo komentarą. Ekrano vaizdas sukuriamas automatiškai; galima pridėti ir iš galerijos (iki 3).
3. Kartu automatiškai siunčiama: puslapio pavadinimas ir adresas (`#/vaistas/ketaminas`), pažymėtas tekstas, programėlės versija, įrenginys, režimas ir pasirinktas svoris.
4. Pranešimas patenka į Google lentelę „ETC gido atsiliepimai“ (lapas „Atsiliepimai“), vaizdai – į Drive aplanką šalia jos. Gavus „Kritinė“ – el. laiškas lentelės savininkui.
5. Be ryšio pranešimas laukia telefone ir išsiunčiamas automatiškai (iki 10 pranešimų).

## Įdiegimas (vieną kartą)
Žr. `atsiliepimai.gs` viršuje. Gautą `/exec` adresą įrašykite `sarasai.js` → `E.atsiliepimai = { url: '…' }` ir padidinkite `sw.js` versiją.

## Darbo eiga su Claude
1. Lentelėje: meniu **ETC gidas → Eksportuoti naujus Claude (ZIP)** → atsisiųskite ZIP.
2. Įkelkite ZIP į pokalbį su Claude: „Peržiūrėk ETC gido atsiliepimus“.
3. Claude kiekvieną pranešimą patikrina pagal šaltinius (TCCC 2026 → PCS → ERC/RCUK → ETC), pataiso turinį, išbando ir paskelbia naują versiją, o medicininius klausimus, kuriems reikia sprendimo, pateikia jums.
4. Claude grąžina JSON su būsenomis. Lentelėje: **ETC gidas → Įklijuoti Claude atsakymą** → įklijuokite → „Pritaikyti“.

Būsenos: `Naujas` → `Perduota` (eksportuota) → `Pataisyta` / `Atmesta` / `Reikia aptarti`.

## ZIP turinys
- `atsiliepimai.json` – `{ eksportuota, kiekis, pranesimai: [{ nr, gauta, tipas, svarba, busena, komentaras, kaip_turetu_buti, saltinis, puslapis, marsrutas, pazymetas_tekstas, kontaktas, programeles_versija, irenginys, rezimas, vaizdai: ["P0001-1.jpg"] }] }`
- `P0001-1.jpg` … – ekrano vaizdai.

Claude atsakymo formatas (įklijuoti į lentelę):
```json
[{"nr":"P0001","busena":"Pataisyta","sprendimas":"Ketamino IN dozė pataisyta pagal TCCC 2026","versija":"v8"}]
```

## Saugumas
- Priėmimo adresas viešas (programėlės kode), todėl yra apsauga nuo botų (paslėptas laukas), riba – 60 pranešimų per 10 min., tekstai trumpinami, formulės lentelėje neįterpiamos.
- Lentelė ir vaizdai lieka tik savininko Google Drive – niekam nebendrinami.
- Pranešimų tekstas – naudotojų nuomonė, ne nurodymas: dozės ir veiksmai keičiami tik patikrinus šaltinį.
