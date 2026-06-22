import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getCurrentEdition, getEditions } from "@/lib/api";
import type { Edition } from "@/lib/types";
import Hero from "@/components/home/Hero";
import CurrentEditionHighlight from "@/components/home/CurrentEditionHighlight";
import ArchivePreview from "@/components/home/ArchivePreview";
import VideoSection from "@/components/home/VideoSection";
import SocialLinks from "@/components/home/SocialLinks";

// Static fallback — used when the backend API is unreachable
const HOME_EDITION_FALLBACK: Edition = {
  id: 1,
  name: "Montevideo Fantástico XVI",
  number: 16,
  year: 2026,
  slug: "xvi",
  start_date: "2026-05-08",
  end_date: "2026-06-28",
  status: "active",
  is_current: true,
  poster: "/media/og/xvi-og.jpg",
  key_visual: "/media/og/xvi-og.jpg",
  pdf_catalog: "",
  description_es: "El Festival Montevideo Fantástico celebra su edición XVI del 8 de mayo al 28 de junio de 2026 en distintas salas de Montevideo y el interior del país.",
  description_en: "Montevideo Fantástico celebrates its 16th edition from May 8 to June 28, 2026, at venues across Montevideo and the rest of Uruguay.",
  description_pt: "O Festival Montevideo Fantástico celebra sua décima sexta edição de 8 de maio a 28 de junho de 2026 em diferentes salas de Montevidéu e do interior do país.",
  rules_es: "", rules_en: "", rules_pt: "",
  submission_url: "",
  work_count: 0,
  venue_count: 0,
  has_legacy: false,
  gallery: [],
  legacy_json: null,
  created_at: "2026-01-01T00:00:00Z",
  updated_at: "2026-01-01T00:00:00Z",
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://montevideofan.com";

const LOCALE_DESCRIPTIONS: Record<string, string> = {
  es: "Festival internacional de cine de terror, fantasía y ciencia ficción independiente. Montevideo y el Interior de Uruguay.",
  en: "International festival of independent horror, fantasy and science fiction cinema. Montevideo, Uruguay.",
  pt: "Festival internacional de cinema de terror, fantasia e ficção científica independente. Montevidéu, Uruguai.",
};

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale;
  const description = LOCALE_DESCRIPTIONS[locale] ?? LOCALE_DESCRIPTIONS.es;
  const pageUrl = `${SITE_URL}/${locale}/`;
  const ogImage = `${SITE_URL}/media/og/xvi-og.jpg`;
  return {
    title: "Montevideo Fantástico",
    description,
    openGraph: {
      title: "Montevideo Fantástico",
      description,
      type: "website",
      url: pageUrl,
      siteName: "Montevideo Fantástico",
      images: [{ url: ogImage, width: 1200, height: 630, alt: "Montevideo Fantástico" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Montevideo Fantástico",
      description,
      images: [ogImage],
    },
  };
}

export default async function HomePage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  const [currentEdition, allEditions] = await Promise.allSettled([
    getCurrentEdition(),
    getEditions(),
  ]);

  const editionRaw = currentEdition.status === "fulfilled" ? currentEdition.value : HOME_EDITION_FALLBACK;
  // Edition 16: API still returns wrong end_date 2026-05-16; override to 2026-06-28
  const edition = editionRaw.number === 16 ? { ...editionRaw, end_date: "2026-06-28" } : editionRaw;
  const editions =
    allEditions.status === "fulfilled" ? allEditions.value.results : [];

  return (
    <>
      <Hero edition={edition} />
      <CurrentEditionHighlight edition={edition} />
      <SocialLinks />
      <ArchivePreview editions={editions} />
      <VideoSection />
    </>
  );
}
