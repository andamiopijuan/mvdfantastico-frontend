#!/usr/bin/env node
// Validates frontend/src/data/archive (manifest + legacy files). Exits 1 on any failure.
"use strict";
const fs = require("fs");
const path = require("path");

const DIR = path.resolve(__dirname, "../src/data/archive");
const EXPECTED_YEARS = [2005, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2015, 2017, 2018, 2019, 2022, 2023, 2024, 2026];
const LEGACY_YEARS = EXPECTED_YEARS.filter((y) => y !== 2026);
const MIRADA_DIRECTORS = "Diego Blanco, Guillermo Carbonell, Inés Grah, Vivián Honigsberg, Lucía Jacob, Inés Peñagaricano";

const errors = [];
const check = (cond, msg) => { if (!cond) errors.push(msg); };

function readJson(file) {
  try {
    return JSON.parse(fs.readFileSync(file, "utf8"));
  } catch (e) {
    errors.push(`${path.relative(DIR, file)}: cannot read/parse (${e.message})`);
    return null;
  }
}

const manifest = readJson(path.join(DIR, "manifest.json"));
const editions = manifest && Array.isArray(manifest.editions) ? manifest.editions : [];
check(editions.length > 0, "manifest.editions missing or empty");

const years = editions.map((e) => e.year).sort((a, b) => a - b);
check(
  JSON.stringify(years) === JSON.stringify(EXPECTED_YEARS),
  `manifest years must be exactly ${EXPECTED_YEARS.join(",")}; got ${years.join(",")}`
);
check(!years.includes(2025), "manifest must not contain 2025");
check(!fs.existsSync(path.join(DIR, "legacy", "2025.json")), "legacy/2025.json must not exist");

for (const e of editions) {
  check(e.is_current === false, `${e.year}: is_current must be false`);
  check(e.status === "past", `${e.year}: status must be "past" (got ${e.status})`);
  check(!("work_count" in e), `${e.year}: work_count must not be in the manifest`);
  if (e.year === 2026) {
    check(e.start_date === "2026-05-08", `2026: start_date must be 2026-05-08 (got ${e.start_date})`);
    check(e.end_date === "2026-06-28", `2026: end_date must be 2026-06-28 (got ${e.end_date})`);
    check(e.number === 16, "2026: number must be 16");
    check(e.legacy_data_file === null, "2026: legacy_data_file must be null (dedicated dataset)");
  }
}

const legacy = {};
for (const y of LEGACY_YEARS) {
  const entry = editions.find((e) => e.year === y);
  check(entry && entry.legacy_data_file === `legacy/${y}.json`, `${y}: manifest legacy_data_file must be legacy/${y}.json`);
  const file = path.join(DIR, "legacy", `${y}.json`);
  if (!fs.existsSync(file)) { errors.push(`legacy/${y}.json is missing`); continue; }
  const data = readJson(file);
  if (!data) continue;
  legacy[y] = data;
  check(data.edition && typeof data.edition === "object", `${y}: missing "edition" object`);
  check(Array.isArray(data.sections), `${y}: "sections" must be an array`);
}

const sectionsOf = (y) => (legacy[y] && Array.isArray(legacy[y].sections) ? legacy[y].sections : []);
const filmsOf = (section) => (Array.isArray(section.films) ? section.films : []);

// 2005
if (legacy[2005]) {
  const secs = sectionsOf(2005);
  const count = (type) => secs.filter((s) => s.type === type).reduce((n, s) => n + filmsOf(s).length, 0);
  check(count("features") === 6, `2005: expected 6 features, got ${count("features")}`);
  check(count("shorts") === 8, `2005: expected 8 shorts, got ${count("shorts")}`);
  check(count("special") === 6, `2005: expected 6 special, got ${count("special")}`);

  const allFilms = secs.flatMap(filmsOf);
  check(
    !/CORTOS Y MEDIOMETRAJES[^"]*84715/i.test(JSON.stringify(legacy[2005])),
    '2005: malformed "CORTOS Y MEDIOMETRAJES ... 84715" concatenation present'
  );
  const find = (title) => allFilms.filter((f) => f.title === title);

  const f84715 = find("84715");
  check(f84715.length === 1, `2005: expected exactly one "84715", got ${f84715.length}`);
  if (f84715[0]) {
    const f = f84715[0];
    check(f.director === "Guillermo Carbonell" && f.country === "Uruguay" && f.year === 2003 && f.duration === 3,
      "2005: 84715 must be Guillermo Carbonell / Uruguay / 2003 / 3 min");
    check(secs.some((s) => s.type === "shorts" && filmsOf(s).includes(f)), "2005: 84715 must be in a shorts section");
  }

  const carcaj = find("El Carcaj de Cupido");
  check(carcaj.length === 1, `2005: expected exactly one "El Carcaj de Cupido", got ${carcaj.length}`);
  if (carcaj[0]) {
    const f = carcaj[0];
    check(f.director === "Atom Egoyan" && f.country === "Canadá" && f.year === 1987 && f.duration === 45,
      "2005: El Carcaj de Cupido must be Atom Egoyan / Canadá / 1987 / 45 min");
  }

  const mirada = find("La mirada alterada");
  check(mirada.length === 1, `2005: expected exactly one "La mirada alterada", got ${mirada.length}`);
  if (mirada[0]) {
    const f = mirada[0];
    check(f.director === MIRADA_DIRECTORS, `2005: La mirada alterada director wrong (got ${JSON.stringify(f.director)})`);
    check(f.duration === 35, `2005: La mirada alterada duration must be 35 (got ${f.duration})`);
    check(f.year === 1998, `2005: La mirada alterada year must be 1998 (got ${f.year})`);
    check(f.country === "Uruguay", `2005: La mirada alterada country must be Uruguay (got ${f.country})`);
    check(!String(f.director).includes("coloniense"), "2005: La mirada alterada still has the malformed director string");
  }
}

// special sections must survive
for (const y of [2005, 2012, 2018]) {
  check(sectionsOf(y).some((s) => s.type === "special" && filmsOf(s).length > 0), `${y}: non-empty "special" section missing`);
}

// Archive routes must not go back to API-driven data.
const APP_DIR = path.resolve(__dirname, "../src/app/[locale]");
const FORBIDDEN = /@\/lib\/api|\b(getEditions|getEditionByYear|getWorksForEdition|getWorkById)\b/;
function listSources(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((d) => {
    const full = path.join(dir, d.name);
    if (d.isDirectory()) return listSources(full);
    return /\.(tsx?|jsx?)$/.test(d.name) ? [full] : [];
  });
}
for (const sub of ["archivo", "archive"]) {
  const root = path.join(APP_DIR, sub);
  if (!fs.existsSync(root)) { errors.push(`route directory missing: ${sub}`); continue; }
  for (const file of listSources(root)) {
    const m = FORBIDDEN.exec(fs.readFileSync(file, "utf8"));
    if (m) errors.push(`${path.relative(APP_DIR, file)}: archive route must not use the API (found "${m[0]}")`);
  }
}
const indexSrc = path.join(APP_DIR, "archivo", "page.tsx");
if (fs.existsSync(indexSrc)) {
  const s = fs.readFileSync(indexSrc, "utf8");
  check(s.includes("@/lib/archive"), "archivo/page.tsx must read editions from @/lib/archive");
  check(!/work_count|is_current|current_label/.test(s), "archivo/page.tsx must not render work counts or a Current badge");
}

if (errors.length) {
  console.error(`Archive data validation FAILED (${errors.length}):`);
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}
console.log(`Archive data validation passed: ${editions.length} editions, ${Object.keys(legacy).length} legacy files.`);
