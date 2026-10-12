import type { MetadataRoute } from "next";
import { ARCHIVE_EDITIONS, getArchiveSlugRedirectPath, getLegacyArchiveYears, getLegacyFeatureSlugs } from "@/lib/archive";
import { FILMS_2026 } from "@/data/films-2026";
import { absoluteUrl, editionPath, juryPath, languageAlternates, SEO_LOCALES } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths: Array<(locale: string) => string> = [
    () => "/",
    () => "/acerca/",
    () => "/contacto/",
    () => "/community/",
    editionPath,
    juryPath,
    () => "/archivo/",
    ...ARCHIVE_EDITIONS.map((edition) => () => `/archivo/${edition.year}/`),
    ...getLegacyArchiveYears().flatMap((year) =>
      Array.from(new Set(getLegacyFeatureSlugs(year)))
        .filter((slug) => !getArchiveSlugRedirectPath("es", year, slug))
        .map((slug) => () => `/archivo/${year}/${slug}/`)),
    ...FILMS_2026.map((film) => () => `/film/${film.slug}/`),
  ];

  return paths.flatMap((path) => SEO_LOCALES.map((locale) => ({
    url: absoluteUrl(locale, path(locale)),
    alternates: { languages: languageAlternates(path) },
  })));
}
