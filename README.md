# ETC kišeninis gidas

1040 medkuopos atminties priemonė pagal European Trauma Course (ETC). Veikia telefone kaip programėlė (PWA), be interneto.
Adresas: https://etc.1040medkuopa.lt

## Režimai
- **Taikymas** – Escape planai, vaidmenų (A, B, C) pirminės apžiūros sąrašai, laikai (trauma, turniketas, TXA iki), paciento svoris ir dažniausi vaistai su apskaičiuota doze.
- **Mokymasis** – temos (pagrindai, A, B, C, antrinė apžiūra, vaistai), 48 įgūdžiai (aprašas, TCCC iliustracijos, esmė, žingsniai, dažnos klaidos, TCCC 2026, iki 2 vaizdo įrašų, TCCC įgūdžio kortelė, įsivertinimas), mokymosi puslapiai, paieška.
- **Įdiegimas** – instrukcija Android ir iPhone (#/idiegimas) su QR kodu.

## Turinio failai
| Failas | Kas jame |
|---|---|
| `sarasai.js` | Vaidmenys, kontroliniai sąrašai, Escape planai, mokymosi puslapiai, temos (`E.temos`) |
| `vaistai.js` | Vaistai, grupės (`E.vaistuGrupes`), dozės ir skaičiuoklė |
| `igudziai.js` | Įgūdžiai: aprašas, esmė, žingsniai, klaidos, TCCC 2026, iliustracijos, video, kortelė, šaltiniai |
| `img/tccc/` | TCCC (Joint Trauma System, Deployed Medicine) iliustracijos iš tccc.org.ua (WebP, 800 px) |
| `img/logo-*.png`, `icon-*.png` | LŠS Vilniaus 1040 medicinos šaulių kuopos logotipas ir programėlės ženkliukai |

## Vaistų šaltinių hierarchija
1. TCCC gairės 2026-05-01 (CoTCCC, Deployed Medicine)
2. Gamintojo PCS (preparato charakteristikų santrauka)
3. ERC / RCUK gairės

Kiekvienam vaistui – viena dozavimo schema; jei šaltiniai skiriasi, naudojamas vienas patikimiausias. Ketamino sedacijos dozės – ETC įgūdžių lentelės (sutampa su TCCC 2026). Patvirtinus mediko, vaisto įraše nurodykite `patvirtinta: 'Vardas Pavardė, data'`.

## Atnaujinimas
Pakeitus turinį, `sw.js` faile padidinkite `VERSION` (pvz., `etc-gidas-v7`), kad telefonuose atsinaujintų talpykla.
