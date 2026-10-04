// Versioned public archive source: src/data/archive (manifest + legacy JSON). No API access.
import manifestJson from "@/data/archive/manifest.json";
import legacy2005 from "@/data/archive/legacy/2005.json";
import legacy2007 from "@/data/archive/legacy/2007.json";
import legacy2008 from "@/data/archive/legacy/2008.json";
import legacy2009 from "@/data/archive/legacy/2009.json";
import legacy2010 from "@/data/archive/legacy/2010.json";
import legacy2011 from "@/data/archive/legacy/2011.json";
import legacy2012 from "@/data/archive/legacy/2012.json";
import legacy2013 from "@/data/archive/legacy/2013.json";
import legacy2015 from "@/data/archive/legacy/2015.json";
import legacy2017 from "@/data/archive/legacy/2017.json";
import legacy2018 from "@/data/archive/legacy/2018.json";
import legacy2019 from "@/data/archive/legacy/2019.json";
import legacy2022 from "@/data/archive/legacy/2022.json";
import legacy2023 from "@/data/archive/legacy/2023.json";
import legacy2024 from "@/data/archive/legacy/2024.json";

export interface ArchiveEdition {
  year: number;
  number: number;
  roman: string;
  slug: string;
  db_slug: string;
  name: string;
  start_date: string;
  end_date: string;
  status: "past";
  is_current: false;
  poster: string;
  data_source: "legacy_json" | "frontend_2026_dataset";
  legacy_data_file: string | null;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type LegacyEditionData = Record<string, any>;

export const ARCHIVE_EDITIONS: ArchiveEdition[] = (
  manifestJson.editions as unknown as ArchiveEdition[]
).slice().sort((a, b) => b.year - a.year);

const LEGACY_BY_YEAR: Record<number, LegacyEditionData> = {
  2005: legacy2005, 2007: legacy2007, 2008: legacy2008, 2009: legacy2009, 2010: legacy2010,
  2011: legacy2011, 2012: legacy2012, 2013: legacy2013, 2015: legacy2015, 2017: legacy2017,
  2018: legacy2018, 2019: legacy2019, 2022: legacy2022, 2023: legacy2023, 2024: legacy2024,
};

export function getArchiveEdition(year: number): ArchiveEdition | null {
  return ARCHIVE_EDITIONS.find((e) => e.year === year) ?? null;
}

export function getLegacyEdition(year: number): LegacyEditionData | null {
  return LEGACY_BY_YEAR[year] ?? null;
}

// Years rendered by the dynamic [year] route (2026 has its own dedicated route).
export function getLegacyArchiveYears(): number[] {
  return ARCHIVE_EDITIONS.filter((e) => e.legacy_data_file !== null && getLegacyEdition(e.year) !== null).map((e) => e.year);
}

export function isRealLegacyFilmRecord(record: unknown): record is Record<string, any> {
  if (!record || typeof record !== "object") return false;

  const film = record as Record<string, any>;
  const slug = typeof film.slug === "string" ? film.slug.trim() : "";
  const title = typeof film.title === "string" ? film.title.trim() : "";

  if (!slug || !title) return false;

  const realSignals = [
    film.director,
    film.country,
    film.poster,
    film.synopsis,
    film.review,
    film.duration,
    film.runtime,
    film.year,
    film.original_title,
    film.trailer_url,
    film.trailer,
    film.image,
    film.still,
    film.credits,
  ];

  return realSignals.some((value) => {
    if (typeof value === "string") return value.trim().length > 0;
    if (typeof value === "number") return Number.isFinite(value);
    if (Array.isArray(value)) return value.length > 0;
    if (value && typeof value === "object") return true;
    return false;
  });
}

// Slugs of legacy feature films, as used by /archivo/<year>/<slug>.
export function getLegacyFeatureSlugs(year: number): string[] {
  const data = getLegacyEdition(year);
  const sections = data && Array.isArray(data.sections) ? data.sections : [];
  const slugs: string[] = [];
  for (const section of sections) {
    if (section?.type !== "features" || !Array.isArray(section.films)) continue;
    for (const film of section.films.filter(isRealLegacyFilmRecord)) {
      const slug = typeof film.slug === "string" ? film.slug.trim() : "";
      if (slug) slugs.push(slug);
    }
  }
  return slugs;
}
