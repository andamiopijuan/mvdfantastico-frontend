import type { Metadata } from "next";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://montevideofan.com";
export const SEO_LOCALES = ["es", "en", "pt"] as const;
export const DEFAULT_OG_IMAGE = `${SITE_URL}/media/og/xvi-og.jpg`;

export function editionPath(locale: string): string {
  return locale === "es" ? "/edicion/" : "/edition/";
}

export function juryPath(locale: string): string {
  return locale === "en" ? "/jury/" : locale === "pt" ? "/juri/" : "/jurado/";
}

export function absoluteUrl(locale: string, path: string): string {
  return `${SITE_URL}/${locale}${path.startsWith("/") ? path : `/${path}`}`;
}

export function languageAlternates(path: (locale: string) => string) {
  const es = absoluteUrl("es", path("es"));
  return {
    es,
    en: absoluteUrl("en", path("en")),
    pt: absoluteUrl("pt", path("pt")),
    "x-default": es,
  };
}

export function compatibilityMetadata(locale: string, path: string): Metadata {
  return {
    robots: { index: false, follow: true },
    alternates: { canonical: absoluteUrl(locale, path) },
  };
}

export function seoMetadata({
  locale, path, title, description, image = DEFAULT_OG_IMAGE, type = "website", imageSize = { width: 1200, height: 630 },
}: {
  locale: string;
  path: (locale: string) => string;
  title: string;
  description: string;
  image?: string;
  type?: "website" | "video.movie";
  imageSize?: { width: number; height: number };
}): Metadata {
  const url = absoluteUrl(locale, path(locale));
  return {
    title,
    description,
    alternates: { canonical: url, languages: languageAlternates(path) },
    openGraph: {
      title, description, url, type, siteName: "Montevideo Fantástico",
      images: [{ url: image, ...imageSize, alt: title }],
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}
