
import { FILMS_2026 } from "@/data/films-2026";
import { getEditionByYear, getEditions } from "@/lib/api";
import { redirect } from "next/navigation";

const STATIC_LOCALES = ["es", "en", "pt"] as const;

export async function generateStaticParams() {
  const params: Array<{ locale: string; year: string; slug: string }> = [];
  const seen = new Set<string>();

  const addParam = (locale: string, year: number | string, slug: string) => {
    const normalizedSlug = slug.trim();
    if (!normalizedSlug) return;
    const yearKey = String(year);
    const key = `${locale}:${yearKey}:${normalizedSlug}`;
    if (seen.has(key)) return;
    seen.add(key);
    params.push({ locale, year: yearKey, slug: normalizedSlug });
  };

  for (const film of FILMS_2026) {
    if (!film.slug) continue;
    for (const locale of STATIC_LOCALES) {
      addParam(locale, 2026, film.slug);
    }
  }

  try {
    const editions = await getEditions();
    const years = editions.results
      .map((edition) => edition.year)
      .filter((year): year is number => typeof year === "number");

    for (const year of years) {
      const edition = await getEditionByYear(year).catch(() => null);
      const legacyJson = edition?.legacy_json;
      if (!legacyJson || typeof legacyJson !== "object") continue;

      const sections = Array.isArray(legacyJson.sections) ? legacyJson.sections : [];
      for (const section of sections) {
        if (section?.type !== "features" || !Array.isArray(section.films)) continue;

        for (const film of section.films.filter(isRealLegacyFilmRecord)) {
          const normalizedSlug = typeof film.slug === "string" ? film.slug.trim() : "";
          if (!normalizedSlug) continue;
          for (const locale of STATIC_LOCALES) {
            addParam(locale, year, normalizedSlug);
          }
        }
      }
    }
  } catch {
    // Keep build-time params available from the static 2026 film list if the API is unavailable.
  }

  return params;
}

interface PageProps {
  params: { locale: string; year: string; slug: string };
}

export default function ArchiveSlugRedirectPage({ params }: PageProps) {
  redirect(`/${params.locale}/archivo/${params.year}/${params.slug}`);
}

function isRealLegacyFilmRecord(record: unknown): record is Record<string, any> {
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
