# ETC gidas

1040 medkuopos atminties priemonė pagal European Trauma Course (ETC). Veikia telefone kaip programėlė (PWA), be interneto.
Adresas: https://etc.1040medkuopa.lt

## Režimai
- **Taikymas** – Escape planai, vaidmenų (A, B, C) pirminės apžiūros sąrašai, laikai (trauma, turniketas, TXA iki), paciento svoris ir dažniausi vaistai su apskaičiuota doze.
- **Mokymasis** – temos (pagrindai, A, B, C, antrinė apžiūra, vaistai), 48 įgūdžiai (aprašas, TCCC iliustracijos, esmė, žingsniai, dažnos klaidos, TCCC 2026, iki 2 vaizdo įrašų, TCCC įgūdžio kortelė, įsivertinimas), mokymosi puslapiai, paieška.
- **Įrankiai** (`tools.js`, Taikymas → Greitai; Mokymasis → Įrankiai) – vizuali MIST kortelė (`#/mist`: kūno schema su žymėmis, požymių lentelė, gydymas, skaitymo režimas; keli sužeistieji – skirtukai 1, 2, … ir „+“, „Kopijuoti visus“), 9-Line MEDEVAC (`#/9line`, GPS → MGRS, kaip March gide), GKS skaičiuoklė (`#/gks`, GCS at 40, GKS-P, perkėlimas į MIST), TST rūšiavimas (`#/tst`, NHS Ten Second Triage, skaičiavimas). Duomenys – tik telefone (`localStorage`: `etc-mist`, `etc-9line`, `etc-gks`, `etc-tst`).
- **Įdiegimas** – instrukcija Android ir iPhone (#/idiegimas) su QR kodu.
- **Pranešimai** – mygtukas viršuje: komentaras + ekrano vaizdas → Google lentelė (žr. `tools/ATSILIEPIMAI.md`).

## Turinio failai
| Failas | Kas jame |
|---|---|
| `sarasai.js` | Vaidmenys, kontroliniai sąrašai, Escape planai, mokymosi puslapiai, temos (`E.temos`) |
| `vaistai.js` | Vaistai, grupės (`E.vaistuGrupes`), dozės ir skaičiuoklė; tvarka – nuo dažniausiai naudojamų (nuskausminamieji) iki rečiausių (midazolamas, naloksonas) |
| `tools.js` | Įrankiai: MIST kortelė, 9-Line MEDEVAC, GKS skaičiuoklė, TST rūšiavimas (9-Line, MIST ir GKS kodas toks pat kaip March gide – skiriasi tik `TCFG`) |
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
