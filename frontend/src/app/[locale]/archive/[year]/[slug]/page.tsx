
import { FILMS_2026 } from "@/data/films-2026";
import { getLegacyArchiveYears, getLegacyFeatureSlugs } from "@/lib/archive";
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

  for (const year of getLegacyArchiveYears()) {
    for (const slug of getLegacyFeatureSlugs(year)) {
      for (const locale of STATIC_LOCALES) {
        addParam(locale, year, slug);
      }
    }
  }

  return params;
}

interface PageProps {
  params: { locale: string; year: string; slug: string };
}

export default function ArchiveSlugRedirectPage({ params }: PageProps) {
  redirect(`/${params.locale}/archivo/${params.year}/${params.slug}`);
}
