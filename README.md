# ETC gidas

1040 medkuopos atminties priemonė pagal European Trauma Course (ETC). Veikia telefone kaip programėlė (PWA), be interneto.
Adresas: https://etc.1040medkuopa.lt

## Sandara (vienas režimas, nuo v50)
- **Pradžia** – Escape planų plytelės, vaidmenys (A, B, C → pirminės apžiūros sąrašai) ir įrankių plytelės. Paaiškinimai – po ⓘ mygtuku arba suskleistoje dalyje „Paaiškinimas“ / „Šaltiniai“.
- **Apatinė juosta** – Pradžia, Pacientas, Sąrašai, Vaistai (dozės pagal svorį), Įgūdžiai (48 įgūdžiai: žingsniai, svarbu, klaidos, iliustracijos, video, įsivertinimas), Treniruotė (situacijos, dozių patikra, temos). Paieška ir Nustatymai – antraštėje.
- **Įrankiai** (`tools.js`) – Nukentėjusiojo kortelė (DD1380; `#/pacientas?t=kortele`: kūno schema su žymėmis, požymiai, gydymas, keli sužeistieji), popierinės kortelės nuskaitymas (`#/skenuoti`), perdavimas QR kodu (`#/qr`, priima ETC, March ir PCC gidai; asmens duomenų kode nėra), 9-Line MEDEVAC (`#/9line`, GPS → MGRS), SITREP, GKS skaičiuoklė (`#/gks`), 10s triažas (`#/tst`), Mascal, nudegimai ir nušalimai, kraujo transfuzija, vaistų žymėjimas. Duomenys – tik telefone (`localStorage`, raktai `etc-…`).
- **Įdiegimas** – instrukcija Android ir iPhone (#/idiegimas) su QR kodu; Nustatymuose – iliustracijų išsaugojimas naudojimui be interneto.
- **Pranešimai** – mygtukas viršuje: komentaras + ekrano vaizdas → Google lentelė (žr. `tools/ATSILIEPIMAI.md`).

## Turinio failai
| Failas | Kas jame |
|---|---|
| `sarasai.js` | Vaidmenys, kontroliniai sąrašai, Escape planai, mokymosi puslapiai, temos (`E.temos`) |
| `vaistai.js` | Vaistai, grupės (`E.vaistuGrupes`), dozės ir skaičiuoklė; tvarka – nuo dažniausiai naudojamų (nuskausminamieji) iki rečiausių (midazolamas, naloksonas) |
| `tools.js` | Įrankiai: Nukentėjusiojo kortelė, QR perdavimas, 9-Line MEDEVAC, GKS skaičiuoklė, TST rūšiavimas ir kt. (kodas toks pat kaip March ir PCC giduose – skiriasi tik `TCFG`) |
| `igudziai.js` | Įgūdžiai: aprašas, esmė, žingsniai, klaidos, TCCC 2026, iliustracijos, video, kortelė, šaltiniai |
| `img/tccc/` | TCCC (Joint Trauma System, Deployed Medicine) iliustracijos iš tccc.org.ua (WebP, 800 px) |
| `img/logo-*.png`, `icon-*.png` | LŠS Vilniaus 1040 medicinos šaulių kuopos logotipas ir programėlės ženkliukai |
| `fb.js`, `vendor/html2canvas.min.js` | Pranešimų langas ir ekrano vaizdo kūrimas (html2canvas 1.4.1, MIT) |
| `tools/atsiliepimai.gs` | Google Apps Script: pranešimų priėmimas į Google lentelę, eksportas Claude |

## Vaistų šaltinių hierarchija
1. TCCC gairės 2026-05-01 (CoTCCC, Deployed Medicine)
2. Gamintojo PCS (preparato charakteristikų santrauka)
3. ERC / RCUK gairės

Kiekvienam vaistui – viena dozavimo schema; jei šaltiniai skiriasi, naudojamas vienas patikimiausias. Ketamino sedacijos dozės – ETC įgūdžių lentelės (sutampa su TCCC 2026). Patvirtinus mediko, vaisto įraše nurodykite `patvirtinta: 'Vardas Pavardė, data'`.

## Atnaujinimas
Pakeitus turinį, `sw.js` faile padidinkite `VERSION` (pvz., `etc-gidas-v8`), kad telefonuose atsinaujintų talpykla.
