# Global Archive Audit — Montevideo Fantástico — FINAL

## Status

CLOSED — validated locally on September 7, 2026.

The historical archive remediation is complete for all real Montevideo Fantástico editions currently represented in the project.

2025 remains intentionally excluded because it is a malformed/placeholder duplicate record and does not represent a real festival edition.

## Editions validated

| Year | Edition | Status | Structured works | Structured venues | Legacy sections |
|---|---|---|---:|---:|---:|
| 2005 | I | past | 20 | 1 | 3 |
| 2007 | II | past | 14 | 0 | 3 |
| 2008 | III | past | 16 | 0 | 4 |
| 2009 | IV | past | 29 | 2 | 5 |
| 2010 | V | past | 14 | 0 | 3 |
| 2011 | VI | past | 21 | 0 | 5 |
| 2012 | VII | past | 16 | 0 | 4 |
| 2013 | VIII | past | 73 | 1 | 8 |
| 2015 | IX | past | 13 | 0 | 4 |
| 2017 | X | past | 23 | 0 | 5 |
| 2018 | XI | past | 16 | 0 | 4 |
| 2019 | XII | past | 17 | 0 | 3 |
| 2022 | XIII | past | 22 | 0 | 8 |
| 2023 | XIV | past | 108 | 7 | 7 |
| 2024 | XV | past | 97 | 2 | 7 |
| 2026 | XVI | past | 0 | 11 | 0 |

All real editions above have `is_current = false`.

## Major remediation completed

### 2005 — Edition I

Reconstructed and validated from the historical source.

- Dates corrected to August 29–September 1, 2005.
- Hoyts Alfabeta restored as structured venue.
- 20 structured works restored:
  - 6 feature films
  - 8 regular shorts/medium-length works
  - 6 special screenings
- `84715` parser anomaly corrected.
- `El Carcaj de Cupido` and `La mirada alterada` normalized as medium-length works.
- Preview-only titles remain outside structured Works.
- Existing historical media and richer legacy data preserved.
- API validation: PASS.

### 2013 — Edition VIII

Originally the only genuine manual-research edition. Fully resolved.

- Dates corrected to December 10–15, 2013.
- Cine Universitario del Uruguay restored as structured venue.
- Historical program reconstructed to 73 works:
  - 20 features
  - 1 medium-length work
  - 52 shorts
- 8 legacy sections normalized.
- `Aislado` normalized as 35-minute medium-length work.
- `Largo fin de semana` preserved as special/homage feature.
- `Dios local` preserved as preview/activity rather than Work.
- `CHIMÈRES (Quimeras)` canonicalized as a single film.
- API validation: PASS.

### 2023 — Edition XIV

Structured archive reconstructed from the project historical JSON.

- 108 Works restored.
- 7 structured venues restored.
- 7 legacy sections preserved.
- Required fields normalized and validated.
- API validation: PASS.

### 2024 — Edition XV

Structured archive reconstructed from the project historical JSON.

- 97 Works restored.
- 2 structured venues preserved.
- 7 legacy sections preserved.
- Required fields normalized and validated.
- API validation: PASS.

## False positives resolved

### 2009

Original venue anomaly was false.

The historical source confirms the two Cine Universitario halls already represented in structured data.

No further remediation required.

### 2017

The initial audit incorrectly interpreted the informational short-film section as empty because films are nested inside JSON categories.

The legacy JSON actually contains the historical catalog required by the public archive page.

Structured Works remain partial by design; the frontend renders the authoritative `legacy_json`.

No reconstruction of redundant structured Works was required.

### 2022

The same normalization issue applied to 2022.

The legacy JSON contains the complete historical archive presentation and venue list. Structured Works are partial but are not the authoritative renderer source.

No redundant reconstruction was required.

## Lifecycle normalization

A global lifecycle rule was added to `backend/seed_archive_full.py`:

- editions whose `end_date` is before the current date become `past`
- `is_current` becomes `false`
- 2025 is explicitly excluded

This corrected stale `upcoming` states for 2008, 2010, 2011, 2015, 2019 and 2026 and prevents the same drift after future seed runs.

Final validation confirms every real edition through 2026 is `past` and `is_current = false`.

## Frontend archive corrections

The archive frontend was also corrected globally.

### Fallback dates

The hardcoded `ALL_EDITIONS` fallback dates in:

`frontend/src/app/[locale]/archivo/page.tsx`

were synchronized with the validated database dates for every real edition.

### ES / EN / PT

Legacy archive labels previously hardcoded in Spanish were internationalized:

- feature films
- short films in competition
- venues

Translation keys were added to:

- `frontend/src/i18n/messages/es.json`
- `frontend/src/i18n/messages/en.json`
- `frontend/src/i18n/messages/pt.json`

The film-detail archive breadcrumb no longer hardcodes `Archivo`; it now uses `archive.label`.

The `/archive/...` route family was confirmed to be a compatibility alias redirecting correctly to the localized `/archivo/...` routes.

## Validation performed

Backend Python compilation:

PASS

Files validated:

- `backend/seed_archive_full.py`
- `backend/archive_payload_2013.py`
- `backend/archive_payload_2023_2024.py`

Frontend TypeScript:

PASS via `tsc --noEmit --incremental false`.

Git whitespace validation:

PASS via `git diff --check`.

Backend API smoke test:

Every real edition returned HTTP 200:

2005, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2015, 2017, 2018, 2019, 2022, 2023, 2024, 2026.

## Required archive implementation files

The following backend files are intentional and must remain together:

- `backend/seed_archive_full.py`
- `backend/archive_payload_2013.py`
- `backend/archive_payload_2023_2024.py`

Temporary repair scripts and intermediate seed/payload copies were removed after validation.

## Final conclusion

No historical edition currently requires manual research or batch remediation.

The archive audit is CLOSED.

Future historical work should be treated as enhancement or source enrichment rather than remediation, unless a new concrete discrepancy is discovered.