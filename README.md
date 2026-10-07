# ETC kišeninis gidas

1040 medkuopos atminties priemonė pagal European Trauma Course (ETC). Veikia telefone kaip programėlė (PWA), be interneto.
Adresas: https://etc.1040medkuopa.lt

## Režimai
- **Taikymas** – Escape planai, vaidmenų (A, B, C) pirminės apžiūros sąrašai, laikai (trauma, turniketas, TXA iki), paciento svoris ir dažniausi vaistai su apskaičiuota doze.
- **Mokymasis** – temos (pagrindai, A, B, C, antrinė apžiūra, vaistai), 34 įgūdžiai su esme, TCCC 2026 punktais, vaizdo įrašais ir įsivertinimu, mokymosi puslapiai, paieška.

## Turinio failai
| Failas | Kas jame |
|---|---|
| `sarasai.js` | Vaidmenys, kontroliniai sąrašai, Escape planai, mokymosi puslapiai, temos (`E.temos`) |
| `vaistai.js` | Vaistai, grupės (`E.vaistuGrupes`), dozės ir skaičiuoklė |
| `igudziai.js` | Įgūdžiai: esmė, TCCC 2026, vaizdo įrašai, šaltiniai |

## Vaistų šaltinių hierarchija
1. TCCC gairės 2026-05-01 (CoTCCC, Deployed Medicine)
2. Gamintojo PCS (preparato charakteristikų santrauka)
3. ERC / RCUK gairės

Kuopos vaistų kortelė, TCCC vadovas (M. Grinevičius) ir ETC lentelės – papildomi šaltiniai: jie rodomi vaisto puslapio skiltyje „Kuopos kortelė ir kiti šaltiniai“. Jei duomenys skiriasi, galioja pagrindinės dozės. Patvirtinus mediko, vaisto įraše nurodykite `patvirtinta: 'Vardas Pavardė, data'`.

## Atnaujinimas
Pakeitus turinį, `sw.js` faile padidinkite `VERSION` (pvz., `etc-gidas-v6`), kad telefonuose atsinaujintų talpykla.
