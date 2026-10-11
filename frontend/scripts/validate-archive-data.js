#!/usr/bin/env node
// Validates frontend/src/data/archive (manifest + legacy files). Exits 1 on any failure.
"use strict";
const fs = require("fs");
const path = require("path");

const DIR = path.resolve(__dirname, "../src/data/archive");
const APP_DIR = path.resolve(__dirname, "../src/app/[locale]");
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

// 2009: IV archive source has three distinct short competitions and four catalogue categories.
if (legacy[2009]) {
  const secs = sectionsOf(2009);
  const expected = [
    ["LARGOMETRAJES EN COMPETENCIA / LONG FEATURE FILMS COMPETITION", "features", 12],
    ["MUESTRA INFORMATIVA DE LARGOMETRAJES / LONG FEATURE FILMS INFORMATIVE SESSION", "features", 6],
    ["CORTOMETRAJES INTERNACIONALES EN COMPETENCIA / INTERNATIONAL SHORT FILMS COMPETITION", "shorts", 16],
    ["CORTOMETRAJES LATINOAMERICANOS EN COMPETENCIA / LATIN AMERICAN SHORT FILMS COMPETITION", "shorts", 14],
    ["CORTOMETRAJES URUGUAYOS EN COMPETENCIA / URUGUAYAN SHORT FILMS COMPETITION", "shorts", 13],
  ];
  check(secs.length === 7, `2009: expected seven distinct sections, got ${secs.length}`);
  for (const [name, type, count] of expected) {
    const section = secs.find((s) => s.name === name);
    check(section && section.type === type && filmsOf(section).length === count, `2009: ${name} must have ${count} ${type}`);
  }
  const features = secs.filter((s) => s.type === "features").flatMap(filmsOf);
  const shorts = secs.filter((s) => s.type === "shorts").flatMap(filmsOf);
  check(features.length === 18 && shorts.length === 43, "2009: expected 18 features and 43 competition shorts");
  check([...features, ...shorts].every((f) => f.director && f.credits && Number.isInteger(f.duration) && f.duration > 0), "2009: features and competition shorts must retain source duration and credits");
  check(shorts.every((f) => !f.slug), "2009: recovered competition shorts must not create detail routes");
  const expectedSlugs = ["academy-of-doom", "alien-abduction-incident-in-lake-county", "altar", "antarctic-journal", "jorge-montejo-el-hombre-detras-de-paolo", "la-balada-de-vlad-tepes", "la-granja", "mil-mascaras-resurrection-mil-mascaras-vs-the-aztec-mummy", "morgue-story-blood-blowfish-and-comics", "mud-zombies", "muneco-viviente-v", "nadie-inquieto-mas-narciso-ibanez-menta", "no-morire-sola", "on-evil-grounds", "oscuro-iluminado", "shadowland", "sonambulos", "yesterday"];
  check(JSON.stringify(features.map((f) => f.slug).sort()) === JSON.stringify(expectedSlugs), "2009: historical feature slug set changed");
  const onEvil = features.find((f) => f.title === "ON EVIL GROUNDS");
  check(onEvil && onEvil.original_title === "Auf bösem Boden" && onEvil.country === "Austria" && onEvil.year === 2007, "2009: On Evil Grounds shifted fields remain");
  const losExtranos = shorts.find((f) => f.title === "Los extraños");
  check(losExtranos && losExtranos.director === "Sebastián Caulier" && losExtranos.duration === 15, "2009: unmarked Los extraños entry missing");

  const catalog = secs.find((s) => s.name === "MUESTRA INFORMATIVA DE CORTOMETRAJES / SHORT AND MEDIUM LENGTH FILMS INFORMATIVE SESSION");
  check(catalog && catalog.type === "shorts-catalog" && Array.isArray(catalog.categories), "2009: informative catalogue categories missing");
  if (catalog && Array.isArray(catalog.categories)) {
    const counts = catalog.categories.map((c) => filmsOf(c).length);
    check(JSON.stringify(counts) === JSON.stringify([9, 7, 7, 4]), "2009: informative category counts must be 9/7/7/4");
    const films = catalog.categories.flatMap(filmsOf);
    check(films.length === 27 && films.every((f) => f.title && f.director && Number.isInteger(f.duration) && f.duration > 0 && !f.slug), "2009: 27 separate informative records must retain source metadata without routes");
    check(catalog.categories[0]?.films?.[0]?.title === "Cartoon Attack" && catalog.categories[3]?.films?.at(-1)?.title === "Gólgota", "2009: informative catalogue ordering is malformed");
    check(films.find((f) => f.title === "Visitantes")?.year === "2007-2008" && films.find((f) => f.title === "Festí de Sang")?.duration === 58, "2009: catalogue year range or duration lost");
  }
  const special = secs.find((s) => s.name === "EN PROGRAMA");
  check(special?.type === "special" && filmsOf(special).length === 1 && filmsOf(special)[0]?.title === "Rojo Sangre: Diez años a puro género (Work in progress)" && !filmsOf(special)[0]?.slug, "2009: work-in-progress presentation must remain distinct and route-free");
  const blocks = Array.isArray(legacy[2009].awards) ? legacy[2009].awards : [];
  check(JSON.stringify(blocks.map((b) => b.awards?.length)) === JSON.stringify([5, 6, 4]), "2009: jury and audience awards must retain all 15 results");
  check(blocks[0]?.jury?.includes("ÁLVARO BUELA") && blocks[1]?.jury?.includes("ISABEL COCOREL") && blocks[0]?.awards?.[0]?.film === "ALTAR" && blocks[1]?.awards?.[0]?.film === "DEDICADO A NADIE", "2009: jury structure or winners malformed");
  check(legacy[2009].edition.dates === "2009" && legacy[2009].edition.venues?.[0] === "las dos salas de Cine Universitario", "2009: unproved dates or source-backed venue changed");
}

// 2015: source-backed repairs for parser losses in the IX archive page.
if (legacy[2015]) {
  const secs = sectionsOf(2015);
  const competition = secs.find((s) => s.name === "COMPETENCIA INTERNACIONAL DE LARGOMETRAJES / INTERNATIONAL LONG FEATURE FILMS COMPETITION");
  check(competition && competition.type === "features", "2015: international feature competition must be a features section");
  if (competition) {
    const films = filmsOf(competition);
    const titles = films.map((f) => f.title);
    check(titles.length === 9, `2015: expected 9 international-programme entries, got ${titles.length}`);
    check(titles.includes("CORAZÓN MUERTO") && titles.includes("EL CÍRCULO DE RAYNARD"), "2015: Corazón Muerto and El Círculo de Raynard must be retained");
    const sourceOnly = films.filter((f) => ["CORAZÓN MUERTO", "EL CÍRCULO DE RAYNARD"].includes(f.title));
    check(sourceOnly.every((f) => f.slug === null && f.director && f.duration && f.synopsis && f.review), "2015: recovered unlinked features must retain source-backed metadata without creating routes");
    const monster = films.find((f) => f.title === "En programa: Monstruos tristes");
    check(monster && monster.year === 2013 && monster.country === "POLONIA" && monster.director === "Justyna Tafel" && monster.duration === 32, "2015: Monstruos tristes fields are malformed");
  }

  const informativeFeatures = secs.find((s) => s.name === "MUESTRA INFORMATIVA DE LARGOMETRAJES");
  check(informativeFeatures && informativeFeatures.type === "features", "2015: informative feature session must be a features section");
  if (informativeFeatures) {
    const films = filmsOf(informativeFeatures);
    check(films.length === 5, `2015: expected 5 informative features, got ${films.length}`);
    const onanista = films.find((f) => f.title === "EL ONANISTA PERTURBADO");
    check(onanista && onanista.director === "Georgina Zanardi" && onanista.duration === 61 && onanista.review, "2015: El Onanista Perturbado metadata missing");
  }

  const shorts = secs.find((s) => s.name === "COMPETENCIA OFICIAL DE CORTOMETRAJES / SHORT FILMS OFFICIAL COMPETITION");
  check(shorts && shorts.type === "shorts", "2015: official shorts section missing");
  if (shorts) {
    const films = filmsOf(shorts);
    check(films.length === 39, `2015: expected 39 official shorts, got ${films.length}`);
    check(films.every((f) => Number.isInteger(f.duration) && f.duration > 0 && typeof f.credits === "string" && f.credits.trim()), "2015: every official short must retain duration and credits");
    const dios = films.find((f) => f.title === "Dios reconocerá a los suyos – (Dieu reconnaîtra les Siens)");
    check(dios && dios.year === 2013 && dios.country === "Francia" && dios.director === "Cédric Le Men" && dios.duration === 13, "2015: Dios reconocerá a los suyos must be a distinct, complete record");
    const nouvelle = films.find((f) => f.title === "La Nouvelle Vague sí que molaba");
    check(nouvelle && nouvelle.director === "Simon Fariza" && nouvelle.duration === 15 && nouvelle.synopsis.includes("director de cine"), "2015: La Nouvelle Vague fields are truncated");
  }

  const catalog = secs.find((s) => s.name === "MUESTRA INFORMATIVA DE CORTOMETRAJES / SHORT FILMS INFORMATIVE SESSION");
  check(catalog && catalog.type === "shorts-catalog" && Array.isArray(catalog.categories), "2015: informative short-film categories missing");
  if (catalog && Array.isArray(catalog.categories)) {
    check(catalog.categories.length === 4, `2015: expected 4 informative short-film categories, got ${catalog.categories.length}`);
    check(catalog.categories.reduce((n, c) => n + filmsOf(c).length, 0) === 38, "2015: expected 38 informative shorts");
    check(catalog.categories[0]?.films?.[0]?.title === "Aakhir/At Last (Tarun Jain, 2012) – INDIA – 16´", "2015: informative shorts opening entry changed");
    check(catalog.categories.at(-1)?.films?.at(-1)?.title === "In Mysterium (Mariano Castaño, 2014) – ARGENTINA – 21´", "2015: informative shorts closing entry changed");
  }

  const awardBlocks = Array.isArray(legacy[2015].awards) ? legacy[2015].awards : [];
  const featureAwards = awardBlocks.find((block) => block.section === "COMPETENCIA INTERNACIONAL DE LARGOMETRAJES");
  const shortAwards = awardBlocks.find((block) => block.section === "COMPETENCIA OFICIAL DE CORTOMETRAJES");
  check(featureAwards && Array.isArray(featureAwards.awards) && featureAwards.awards.length === 8, "2015: feature-jury awards must include all three special mentions");
  check(shortAwards && Array.isArray(shortAwards.awards) && shortAwards.awards.length === 5, "2015: short-jury awards must include Stela and Canis");
  if (featureAwards && Array.isArray(featureAwards.awards)) {
    const direction = featureAwards.awards.find((award) => award.name === "MEJOR DIRECCIÓN");
    check(direction && direction.recipient === "Alejandro Hidalgo" && direction.film === "La casa del fin de los tiempos" && direction.country === "Venezuela", "2015: best-direction award fields are malformed");
  }
}

// 2018: source-backed repairs for parser corruption in the XI archive page.
if (legacy[2018]) {
  const secs = sectionsOf(2018);
  const international = secs.find((s) => s.name === "COMPETENCIA INTERNACIONAL DE LARGOMETRAJES / INTERNATIONAL LONG FEATURE FILMS COMPETITION");
  check(international && international.type === "features", "2018: international feature competition missing");
  if (international) {
    const films = filmsOf(international);
    check(films.length === 8, `2018: expected 8 international features, got ${films.length}`);
    const lost = films.find((f) => f.title === "LOST IN APOCALYPSE / PERDIDOS EN EL APOCALIPSIS");
    const mahtab = films.find((f) => f.title === "MAHTAB");
    const noSabes = films.find((f) => f.title === "NO SABÉS CON QUIÉN ESTÁS HABLANDO");
    check(lost && lost.director === "Sky Wang" && lost.duration === 90 && lost.original_title === "Mo Shi Ren Jian Dao", "2018: Lost in Apocalypse fields are malformed");
    check(mahtab && mahtab.director === "Vahid Pakzad" && mahtab.duration === 86, "2018: Mahtab fields are malformed");
    check(noSabes && noSabes.slug === null && noSabes.year === 2016 && noSabes.director === "Demian Rugna" && noSabes.duration === 95 && noSabes.review, "2018: recovered No Sabés record must retain source-backed metadata without a route");
    check(films.every((f) => f.review && f.credits && Number.isInteger(f.duration) && f.duration > 0), "2018: international features must retain reviews, credits and durations");
  }

  const latin = secs.find((s) => s.name === "COMPETENCIA LATINOAMERICANA DE LARGOMETRAJES / LATIN AMERICAN LONG FEATURE FILMS COMPETITION");
  check(latin && latin.type === "features", "2018: Latin American feature competition missing");
  if (latin) {
    const films = filmsOf(latin);
    check(films.length === 6, `2018: expected 6 Latin American features, got ${films.length}`);
    const bosque = films.find((f) => f.title === "EL BOSQUE NEGRO");
    const esquina = films.find((f) => f.title === "EN LA ESQUINA DEL OJO / OUT OF THE CORNER OF THE EYE");
    check(bosque && bosque.director === "Rodrigo Aragão" && bosque.duration === 99 && bosque.original_title === "A Mata Negra", "2018: El Bosque Negro fields are malformed");
    check(esquina && esquina.director === "Sérgio Gomes" && esquina.duration === 104 && esquina.original_title === "No Canto do Olho", "2018: En la esquina del ojo fields are malformed");
  }

  const novedades = secs.find((s) => s.name === "NOVEDADES / NEW RELEASES");
  check(novedades && novedades.type === "features", "2018: Novedades boundary missing");
  if (novedades) {
    const films = filmsOf(novedades);
    check(films.length === 2 && films[0]?.title === "INNER GHOSTS / FANTASMAS INTERIORES" && films[1]?.title === "TOKUSATSU GRINDHOUSE", "2018: Novedades ordering is malformed");
    const tokusatsu = films.find((f) => f.title === "TOKUSATSU GRINDHOUSE");
    check(tokusatsu && tokusatsu.country === "JAPÓN / URUGUAY" && tokusatsu.director === "Bueno, Pablo Praino" && tokusatsu.duration === 58, "2018: Tokusatsu Grindhouse fields are malformed");
  }

  const shorts = secs.find((s) => s.name === "COMPETENCIA OFICIAL DE CORTOMETRAJES / SHORT FILMS OFFICIAL COMPETITION");
  check(shorts && shorts.type === "shorts", "2018: official short-film competition missing");
  if (shorts) {
    const films = filmsOf(shorts);
    check(films.length === 28, `2018: expected 28 official shorts, got ${films.length}`);
    check(films.every((f) => Number.isInteger(f.duration) && f.duration > 0 && typeof f.credits === "string" && f.credits.trim()), "2018: official shorts must retain duration and credits");
    const eva = films.find((f) => f.title === "Amo a Eva Marsh");
    const mapa = films.find((f) => f.title === "Mapa a las estrellas");
    const saturno = films.find((f) => f.title === "Saturno a través del telescopio");
    check(eva && eva.year === 2017 && eva.country === "Francia" && eva.original_title === "J´aime Eva Marsh" && eva.duration === 24, "2018: Amo a Eva Marsh fields are malformed");
    check(mapa && mapa.year === 2018 && mapa.country === "Paraguay" && mapa.duration === 10, "2018: Mapa a las estrellas title or fields are malformed");
    check(saturno && saturno.director === "Didac Gimeno" && saturno.duration === 11, "2018: Saturno a través del telescopio must not be replaced by duplicate Remembrance data");
    check(films.filter((f) => f.title === "R E M E M B R A N C E").length === 1, "2018: duplicate Remembrance record present");
  }

  const uruguayanShorts = secs.find((s) => s.name === "CORTOMETRAJES URUGUAYOS EN COMPETENCIA");
  check(uruguayanShorts && uruguayanShorts.type === "shorts", "2018: Uruguayan short-film competition missing");
  if (uruguayanShorts) {
    const films = filmsOf(uruguayanShorts);
    check(films.length === 11 && films.every((f) => f.country === "Uruguay" && Number.isInteger(f.duration) && f.duration > 0), "2018: Uruguayan competition entries are incomplete");
    check(films.at(-1)?.title === "Space Bar" && films.at(-1)?.duration === 1, "2018: Space Bar missing from Uruguayan competition");
  }

  const tributes = secs.find((s) => s.name === "HOMENAJES / TRIBUTES");
  check(tributes && tributes.type === "special" && filmsOf(tributes).length === 3, "2018: tributes boundary is malformed");
  if (tributes) {
    const james = filmsOf(tributes).find((f) => f.title === "M. R. JAMES – SILBA, E IRÉ A TI");
    check(james && james.director === "Jonathan Miller" && james.duration === 42 && james.original_title === "Whistle and I'll Come to You", "2018: M. R. James tribute fields are malformed");
  }

  const catalog = secs.find((s) => s.name === "MUESTRA INFORMATIVA DE CORTOMETRAJES");
  check(catalog && catalog.type === "shorts-catalog" && filmsOf(catalog).length === 86, "2018: informative short-film catalogue missing or incomplete");
  if (catalog) {
    const films = filmsOf(catalog);
    check(films[0]?.title === "11010 (Rodrigo Amim, Gabriela Monnerat, 2018) – BRASIL / BRAZIL – 8´", "2018: informative catalogue opening entry changed");
    check(films.at(-1)?.title === "ZUL (Magalí Heram, 2018) – MÉXICO – 23´", "2018: informative catalogue closing entry changed");
  }

  const blocks = Array.isArray(legacy[2018].awards) ? legacy[2018].awards : [];
  check(JSON.stringify(blocks.map((b) => Array.isArray(b.awards) ? b.awards.length : 0)) === JSON.stringify([9, 1, 2, 7, 3]), "2018: award blocks must retain all 22 source awards");
  const featureAwards = blocks[0]?.awards ?? [];
  const shortAwards = blocks[3]?.awards ?? [];
  check(blocks[0]?.section === "COMPETENCIA INTERNACIONAL DE LARGOMETRAJES / LONG FEATURE FILMS COMPETITION" && blocks[3]?.section === "COMPETENCIA OFICIAL DE CORTOMETRAJES / SHORT FILMS OFFICIAL COMPETITION", "2018: award-section boundaries are malformed");
  check(featureAwards.some((a) => a.recipient === "MAHTAB DEHGHAN" && a.film === "MAHTAB" && a.director === "Vahid Pakzad"), "2018: Mahtab jury award is malformed");
  check(featureAwards.filter((a) => a.name === "MENCIONES ESPECIALES / SPECIAL MENTIONS").length === 4, "2018: feature special mentions missing");
  check(shortAwards.filter((a) => a.name === "MENCIONES ESPECIALES / SPECIAL MENTIONS").length === 4, "2018: short-film special mentions missing");
}

// 2019: source-backed reconstruction of the XII archive page.
if (legacy[2019]) {
  const secs = sectionsOf(2019);
  const structure = [
    ["COMPETENCIA OFICIAL DE LARGOMETRAJES", "features", 6],
    ["COMPETENCIA LATINOAMERICANA DE LARGOMETRAJES", "features", 6],
    ["NOVEDADES", "features", 5],
    ["COMPETENCIA OFICIAL DE CORTOMETRAJES", "shorts", 52],
    ["MUESTRA INFORMATIVA DE CORTOMETRAJES", "shorts-catalog", 71],
  ];
  check(JSON.stringify(secs.map((s) => [s.name, s.type, filmsOf(s).length])) === JSON.stringify(structure), "2019: expected source section boundaries and counts 6/6/5/52/71");
  const features = secs.filter((s) => s.type === "features").flatMap(filmsOf);
  const shorts = secs.filter((s) => s.type === "shorts").flatMap(filmsOf);
  const catalog = secs.filter((s) => s.type === "shorts-catalog").flatMap(filmsOf);
  check(features.length === 17, `2019: expected 17 features, got ${features.length}`);
  check(shorts.length === 52, `2019: expected 52 competition shorts, got ${shorts.length}`);
  check(catalog.length === 71, `2019: expected 71 informative shorts, got ${catalog.length}`);
  const expectedSlugs = ["atacama", "beneath-the-trees-bajo-los-arboles", "bullets-of-justice", "flesh-city", "stay-out-stay-alive", "vortex", "diablo-rojo-pty", "el-diablo-me-dijo-que-hacer", "luz", "rebobinado-la-pelicula", "sorgalim", "vesanica", "creeping-out", "deathcember", "george-hilton-el-mundo-es-de-los-audaces", "la-sospecha", "tr3sh"];
  check(JSON.stringify(features.map((f) => f.slug)) === JSON.stringify(expectedSlugs), "2019: existing feature slugs and ordering must remain unchanged");
  check([...shorts, ...catalog].every((f) => f.slug === null), "2019: shorts and catalogue records must not create detail routes");
  check([...features, ...shorts].every((f) => f.director && f.credits && Number.isInteger(f.duration) && f.duration > 0), "2019: features and competition shorts must retain source duration and credits");
  const restored = [
    ["Entre las sombras", "Matías Cibils", 6],
    ["Identity / Identidad", "Despina Charalampous, Panos Pappas", 14],
    ["El lado perverso", "Miguel Torena", 8],
    ["Mal reflejo", "Marcelo Fabani", 6],
    ["No quiero estar sola", "Sergio Rozas", 10],
    ["¿Quién eres?", "Manuel (Peta) Rivero y Hornos", 7],
    ["¿Quién es ese hombre dentro de mi casa? / Quem é esse homem dentro da minha casa?", "Lucas Reis", 10],
    ["Sepultura humana / Cova humana", "Joel Caetano", 10],
    ["There´s Nothing in the Shed / No hay nada en el galpón", "David Axe", 2],
  ];
  for (const [title, director, duration] of restored) {
    const matches = shorts.filter((f) => f.title === title);
    check(matches.length === 1 && matches[0].director === director && matches[0].duration === duration && matches[0].synopsis, `2019: restored ${title} missing or malformed`);
  }
  const allFilms = secs.flatMap(filmsOf);
  const identities = allFilms.map((f) => f.title.replace(/\s*\([^)]*, \d{4}(?:-\d{4})?\).*$/, "").toLowerCase().replace(/\s+/g, " ").trim());
  check(new Set(identities).size === allFilms.length, "2019: duplicate works present");
  check(catalog[0]?.title === "El agua de los sueños (Pablo Fuertes, Rocío Muñóz, 2019) – 14´ – ARGENTINA", "2019: informative catalogue opening entry changed");
  check(catalog.at(-1)?.title === "Yellow Arrows / Flechas amarillas (Yara Sar, 2017) – 15´ – ESTADOS UNIDOS / US", "2019: informative catalogue closing entry changed");
  check(catalog.every((f) => f.director && f.country && (Number.isInteger(f.duration) || f.duration === null)), "2019: informative catalogue metadata malformed");
  const untelling = catalog.find((f) => f.title.startsWith("The Untelling / Lo que no se dice ("));
  const bumbling = catalog.find((f) => f.title.startsWith("The Bumbling Psychopath / El psicópata torpe ("));
  check(untelling && untelling.duration === null, "2019: The Untelling duration must remain null");
  check(catalog.filter((f) => f.duration === null).length === 1, "2019: only The Untelling lacks a source duration");
  check(bumbling && bumbling.year === "2014-2019" && bumbling.title.includes("2014-2019"), "2019: literal 2014-2019 range must be preserved");
  check(legacy[2019].edition.dates === "2019" && Array.isArray(legacy[2019].edition.venues) && legacy[2019].edition.venues.length === 0, "2019: dates must remain literal 2019 and venues empty");
  const blocks = legacy[2019].awards ?? [];
  check(JSON.stringify(blocks.map((b) => b.awards?.length)) === JSON.stringify([9, 3, 5, 5, 3]), "2019: five source blocks must retain 25 awards");
  check(JSON.stringify(blocks.map((b) => b.section)) === JSON.stringify([
    "COMPETENCIA OFICIAL DE LARGOMETRAJES / OFFICIAL LONG FEATURE FILM COMPETITION",
    "COMPETENCIA OFICIAL DE CORTOMETRAJES / OFFICIAL SHORT FILMS COMPETITION",
    "MENCIONES ESPECIALES DEL JURADO A CORTOS INTERNACIONALES / JURY SPECIAL MENTIONS TO INTERNATIONAL SHORT FILMS",
    "MENCIONES ESPECIALES DEL JURADO A CORTOS URUGUAYOS / JURY SPECIAL MENTIONS TO URUGUAYAN SHORT FILMS",
    "PREMIOS DEL PÚBLICO / AUDIENCE CHOICE AWARDS",
  ]), "2019: award block boundaries are malformed");
  check(blocks.flatMap((b) => b.awards ?? []).every((a) => a.name && a.film), "2019: empty award heading parsed as an award");
  check(blocks[2]?.awards?.[1]?.recipient === "Fernanda Muñiz" && blocks[2]?.awards?.[1]?.film === "Revival" && blocks[2]?.awards?.[1]?.director === "Julio Orellana", "2019: Revival award must preserve the source's distinct credits");
  check(blocks[3]?.awards?.[0]?.recipient === "J. Martín Vega" && blocks[3]?.awards?.[0]?.film === "Monstruo", "2019: Monstruo award fields shifted");
}

// special sections must survive
for (const y of [2005, 2012, 2018]) {
  check(sectionsOf(y).some((s) => s.type === "special" && filmsOf(s).length > 0), `${y}: non-empty "special" section missing`);
}

// Legacy URL compatibility (compat.json)
const EXPECTED_2013_PAGES = ["agophobia", "al-otro-lado", "blackout", "candy-hearts", "decapoda-shock", "doppelganger", "ec4", "eco", "el-ajedrez-no-es-un-juego-de-caballeros", "el-cuarto", "el-increible-trueno-escarlata", "el-santuario", "el-traje-de-ze", "encosto", "eutanas-s-a", "exodis", "fist-of-jesus", "fuerco-el-puerco-de-fuego", "grieta-en-la-oscuridad", "heaven-hell", "hibernation", "horizonte", "la-casta", "lovbot-love", "m-is-for-multiverse-apathy-mierda", "perseo", "room", "veritas", "video-massacre", "vienna-waits-for-you"];
const EXPECTED_2013_REDIRECTS = { "lovbot-love-2": "lovbot-love", "m-is-for-multiverse-apathy": "m-is-for-multiverse-apathy-mierda", "chimeres": "chimeres-quimeras" };
const MALFORMED_2005 = "cortos-y-mediometrajes-short-and-medium-length-films-84715";
const isRealFilm = (f) => !!f && typeof f.slug === "string" && f.slug.trim() && typeof f.title === "string" && f.title.trim() &&
  ["director", "country", "poster", "synopsis", "review", "duration", "runtime", "year", "original_title", "trailer_url", "trailer", "image", "still", "credits"]
    .some((k) => (typeof f[k] === "string" && f[k].trim()) || (typeof f[k] === "number") || (Array.isArray(f[k]) && f[k].length));
const featureSlugs = (y) => new Set(sectionsOf(y).filter((s) => s.type === "features").flatMap(filmsOf).filter(isRealFilm).map((f) => f.slug));

const compat = readJson(path.join(DIR, "compat.json"));
if (compat) {
  const pages = Array.isArray(compat.film_pages) ? compat.film_pages : [];
  const redirects = Array.isArray(compat.slug_redirects) ? compat.slug_redirects : [];
  const works = Array.isArray(compat.work_redirects) ? compat.work_redirects : [];

  check(pages.every((p) => p.year === 2013), "compat.film_pages must be restricted to 2013");
  check(JSON.stringify(pages.map((p) => p.slug).sort()) === JSON.stringify([...EXPECTED_2013_PAGES].sort()), "compat.film_pages must be exactly the 30 expected 2013 slugs");
  const shorts2013 = sectionsOf(2013).filter((s) => s.type === "shorts").flatMap(filmsOf);
  for (const p of pages) {
    check(shorts2013.filter((f) => f.title === p.title).length === 1, `compat 2013 page ${p.slug}: title must match exactly one canonical short`);
    check(!featureSlugs(2013).has(p.slug), `compat 2013 page ${p.slug} must not duplicate a canonical feature slug`);
  }

  const r2013 = redirects.filter((r) => r.year === 2013);
  check(r2013.length === 3 && r2013.every((r) => EXPECTED_2013_REDIRECTS[r.from] === r.to_slug), "compat: 2013 redirects must be exactly lovbot-love-2, m-is-for-multiverse-apathy, chimeres");
  for (const r of r2013) {
    check(featureSlugs(2013).has(r.to_slug) || pages.some((p) => p.slug === r.to_slug), `compat redirect ${r.from} -> ${r.to_slug} has no canonical target`);
  }
  const r2005 = redirects.filter((r) => r.year === 2005);
  check(r2005.length === 1 && r2005[0].from === MALFORMED_2005 && r2005[0].to_slug === null, "compat: malformed 2005 84715 URL must redirect to the 2005 edition page");
  check(redirects.length === 4, `compat.slug_redirects must have exactly 4 entries (got ${redirects.length})`);
  check(!redirects.some((r) => r.year === 2025) && !pages.some((p) => p.year === 2025) && !works.some((w) => w.year === 2025), "compat must not contain 2025");

  const ids = works.map((w) => w.id);
  check(works.length === 212 && new Set(ids).size === 212, `compat.work_redirects must have exactly 212 unique IDs (got ${works.length}/${new Set(ids).size})`);
  const legacyYears = new Set(LEGACY_YEARS);
  for (const w of works) {
    check(legacyYears.has(w.year), `work ${w.id}: year ${w.year} is not a legacy archive year`);
    if (w.to_slug !== null) {
      check(featureSlugs(w.year).has(w.to_slug) || (w.year === 2013 && pages.some((p) => p.slug === w.to_slug)), `work ${w.id}: to_slug ${w.to_slug} is not a generated film page`);
    }
  }
}

// Source guards: no accidental short-film pages, no API in works route.
const slugRoutes = ["archivo", "archive"].map((d) => path.join(APP_DIR, d, "[year]", "[slug]", "page.tsx"));
for (const f of slugRoutes) {
  if (!fs.existsSync(f)) { errors.push(`missing route file ${path.relative(APP_DIR, f)}`); continue; }
  check(!/["']shorts["']|["']special["']/.test(fs.readFileSync(f, "utf8")), `${path.relative(APP_DIR, f)}: must not enumerate short/special films (use compat.json only)`);
}
const libSrc = fs.existsSync(path.resolve(__dirname, "../src/lib/archive.ts")) ? fs.readFileSync(path.resolve(__dirname, "../src/lib/archive.ts"), "utf8") : "";
check(/section\?\.type !== "features"/.test(libSrc), "lib/archive.ts: getLegacyFeatureSlugs must only enumerate features");
check(fs.existsSync(path.join(APP_DIR, "works", "[id]", "page.tsx")), "works/[id]/page.tsx must exist (frozen redirects)");
check(!fs.existsSync(path.join(APP_DIR, "archivo", "[year]", "page.tsx.new")), "archivo/[year]/page.tsx.new must not exist");

// Archive routes must not go back to API-driven data.
const FORBIDDEN = /@\/lib\/api|\b(getEditions|getEditionByYear|getWorksForEdition|getWorkById)\b/;
function listSources(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((d) => {
    const full = path.join(dir, d.name);
    if (d.isDirectory()) return listSources(full);
    return /\.(tsx?|jsx?)$/.test(d.name) ? [full] : [];
  });
}
for (const sub of ["archivo", "archive", "works"]) {
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
