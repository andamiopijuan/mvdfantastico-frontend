# Canonical archive data (Phase 1A)

Version-controlled public archive dataset for the 16 real Montevideo Fantástico editions
(2005, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2015, 2017, 2018, 2019, 2022, 2023, 2024, 2026).

**Status: not wired in.** No page or renderer reads these files yet. The site still fetches
archive data from the API at build time. A later phase will switch the renderer to this source.

## Contents

- `manifest.json` — edition identity and lifecycle (all `status: past`, `is_current: false`).
  Intentionally has no `work_count`; the old DB-derived counts were partial and misleading.
- `legacy/<year>.json` — `legacy_json` for the 15 historical editions (2005–2024).
- 2026 has no legacy file; it uses the dedicated frontend 2026 dataset (`src/data/*-2026.ts`
  and `app/[locale]/archivo/2026/page.tsx`). Its authoritative dates are 2026-05-08 to 2026-06-28.

## Provenance

- Source: the recovered local MySQL DB (`mvdfantastico_mysql_data`), backed up on 2026-10-04.
- A full forensic dump exists **outside Git** (`C:\PROYECTOS\MVD FANTASTICO ARCHIVE BACKUP 2026-10-04`,
  with SHA-256 checksums). The dump is not, and must not be, committed.
- `legacy_json` was exported from the DB before any application change. Files here are
  byte-for-byte copies of that export, except 2005 (below).
- Year 2025 is excluded: it is a non-real placeholder row, kept only in the external forensic backup.
- Manifest slugs are the lowercase roman numeral; the DB's inconsistent slugs are kept as `db_slug`.
  Historical dates are the recovered DB dates; 2026 is the authoritative lifecycle, not the DB value.

## The only repair made during import

2005, *La mirada alterada*: the parser had split the entry at the word "director", leaving the
tail of the synopsis in `director` and the real credits dropped. Restored from the original
source text (`src/data/raw-html/montevideo-fantastico-i.html`) and the validated structured Work row:

- `director`: Diego Blanco, Guillermo Carbonell, Inés Grah, Vivián Honigsberg, Lucía Jacob, Inés Peñagaricano
- `duration`: 35 (was null)
- `synopsis`: completed with the source sentence that had been cut off ("…en la carrera del director
  coloniense y a su vez el comienzo de su nueva etapa en Estados Unidos. El trabajo conforma…").
- `year` (1998) and `country` (Uruguay) were already correct.

## Known remaining defects

Other editions were **not** cleaned. In particular 2015 still has parser/data defects
(for example entries whose `director`/`country` hold text from the wrong field, and missing fields).
Other historical editions may have similar issues. They are to be remediated separately; do not
treat any edition other than the 2005 items listed above as verified.

## Validation

`npm run validate:archive` (from `frontend/`) runs `scripts/validate-archive-data.js`.
