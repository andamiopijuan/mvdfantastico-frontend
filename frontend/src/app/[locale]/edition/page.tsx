import {
  getCurrentEdition,
  getWorksForEdition,
  getVenuesForEdition,
  getScreeningsForEdition,
} from "@/lib/api";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { WorkSummary, WorkSection, Screening, Venue, Edition } from "@/lib/types";
import ExpandableDesc from "@/components/edition/ExpandableDesc";
import { FILMS_2026, CATEGORY_LABELS, CATEGORY_LABELS_EN, CATEGORY_LABELS_PT, CATEGORY_ORDER, getFilmsByCategory } from "@/data/films-2026";
import { SCREENINGS_2026, getScreeningsByDate } from "@/data/screenings-2026";
import { STATIC_VENUES_2026 } from "@/data/venues-2026";
import FestivalDisclaimer from "@/components/layout/FestivalDisclaimer";
import QuizCTA from "@/components/common/QuizCTA";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://montevideofan.com";

export const metadata: Metadata = {
  title: "Edición Actual — Montevideo Fantástico",
  description: "Programación, sedes y películas de la edición 2026 de Montevideo Fantástico — festival internacional de cine de terror, fantasía y ciencia ficción.",
  openGraph: {
    title: "Edición 2026 — Montevideo Fantástico",
    description: "Programación, sedes y películas de la edición 2026 de Montevideo Fantástico — festival internacional de cine de terror, fantasía y ciencia ficción.",
    type: "website",
    url: `${SITE_URL}/es/edicion`,
    images: [{ url: `${SITE_URL}/media/og/xvi-og.jpg`, width: 1200, height: 630, alt: "Montevideo Fantástico XVI" }],
    siteName: "Montevideo Fantástico",
  },
  twitter: {
    card: "summary_large_image",
    title: "Edición 2026 — Montevideo Fantástico",
    description: "Programación, sedes y películas de la edición 2026.",
    images: [`${SITE_URL}/media/og/xvi-og.jpg`],
  },
};

const SECTION_LABELS_LOCALIZED: Record<string, Record<string, string>> = {
  es: {
    competition_int: "Competencia Oficial",
    competition_nat: "Competencia Nacional",
    short_competition: "Competencia de Cortometrajes",
    panorama: "Panorama",
    special: "Proyección Especial",
    retrospective: "Retrospectiva",
    tribute: "Homenaje",
  },
  en: {
    competition_int: "Official Competition",
    competition_nat: "National Competition",
    short_competition: "Short Film Competition",
    panorama: "Panorama",
    special: "Special Screening",
    retrospective: "Retrospective",
    tribute: "Tribute",
  },
  pt: {
    competition_int: "Competição Oficial",
    competition_nat: "Competição Nacional",
    short_competition: "Competição de Curtas-Metragens",
    panorama: "Panorama",
    special: "Exibição Especial",
    retrospective: "Retrospectiva",
    tribute: "Homenagem",
  },
};

// ── Locale-aware labels for static screening section badges ─────────────────────
const SCREENING_SECTION_I18N: Record<string, { es: string; en: string; pt: string }> = {
  "Competencia Oficial":               { es: "Competencia Oficial",               en: "Official Competition",             pt: "Competição Oficial" },
  "Competencia Oficial de Cortometrajes": { es: "Competencia Oficial de Cortometrajes", en: "Official Short Film Competition",   pt: "Competição Oficial de Curtas" },
  "Competencia Iberoamericana":         { es: "Competencia Iberoamericana",         en: "Ibero-American Competition",        pt: "Competição Ibero-Americana" },
  "Competencia Nacional":               { es: "Competencia Nacional",               en: "National Competition",              pt: "Competição Nacional" },
  "Competencia de Cortometrajes":       { es: "Competencia de Cortometrajes",       en: "Short Film Competition",            pt: "Competição de Curtas" },
  "Documentales en Competencia":        { es: "Documentales en Competencia",        en: "Docs in Competition",               pt: "Documentários em Competição" },
  "Novedades":                          { es: "Novedades",                          en: "Highlights",                        pt: "Destaques" },
  "Entrada libre y gratuita":           { es: "Entrada libre y gratuita",           en: "Free Admission",                    pt: "Entrada gratuita" },
  "Función Confirmada":                 { es: "Función Confirmada",                 en: "Confirmed Screening",                pt: "Sessão Confirmada" },
};

// ── Venue overrides — correct bad data coming from the backend ─────────────────
const VENUE_OVERRIDES: Record<string, { forceInterior?: boolean; forceMvd?: boolean; department?: string; mapUrl?: string; imageUrl?: string }> = {
  // Terminal Goes is in Montevideo (Aguada), NOT in Flores
  "centro cultural terminal goes": { forceMvd: true, mapUrl: "https://maps.app.goo.gl/Kn27o7pjjmuXxjG47", imageUrl: "/media/venues/Centro%20Cultural%20Terminal%20Goes.jpg" },
  // Politeama is in Canelones department (Ciudad de la Costa), NOT Montevideo
  "complejo cultural politeama": { forceInterior: true, department: "Canelones", imageUrl: "/media/venues/complejo-cultural-politeama.jpg" },
  // La Experimental missing map link
  "centro cultural la experimental": { mapUrl: "https://maps.app.goo.gl/jetV7Lfvp6fe8A7EA" },
  // Alianza Francesa local image
  "alianza francesa": { imageUrl: "/media/venues/Alianza%20Francesa%20de%20Montevideo.jpg" },
  // Interior static venues
  "teatro escayola": { forceInterior: true, department: "Tacuarembó" },
  "centro recreativo democrático": { forceInterior: true, department: "Durazno", imageUrl: "/media/venues/centro-recreativo-democratico.jpg" },
  "centro recreativo democratico": { forceInterior: true, department: "Durazno", imageUrl: "/media/venues/centro-recreativo-democratico.jpg" },
  "quimera": { forceInterior: true, department: "Artigas", mapUrl: "https://maps.app.goo.gl/3CM3vwGe62czJD7F6" },
  "espacio cultural gobbi": { forceInterior: true, department: "Paysandú", mapUrl: "https://maps.app.goo.gl/HJLwnq8Vckapz7P17" },
  "sala zitarrosa": { forceMvd: true, mapUrl: "https://maps.app.goo.gl/jZ9QWUsCLuvfo3xd8" },
  "museo de imagen y memoria de soca": { forceInterior: true, department: "Canelones" },
};
function getVenueOverride(v: Venue) {
  const key = (v.name || "").toLowerCase().trim();
  for (const [pattern, override] of Object.entries(VENUE_OVERRIDES)) {
    if (key.includes(pattern)) return override;
  }
  return null;
}

// Interior venue location labels — shown as subtle badge in screening cards
const INTERIOR_VENUE_LABELS: Array<[string, string]> = [
  ["teatro escayola",   "TACUAREMBÓ"],
  ["centro recreativo", "CIUDAD DEL CARMEN / DURAZNO"],
  ["quimera",           "ARTIGAS"],
  ["gobbi",             "PAYSANDÚ"],
  ["soca",              "SOCA / CANELONES"],
  ["politeama",         "CANELONES"],
  ["afe",               "COLONIA"],
  ["cine teatro plaza", "FLORES"],
];
function getInteriorLabel(venueName: string): string | null {
  const lower = venueName.toLowerCase();
  for (const [pattern, label] of INTERIOR_VENUE_LABELS) {
    if (lower.includes(pattern)) return label;
  }
  return null;
}

// ── WhatsApp numbers for reservation venues (Lazaroff + Artesano) ────────────
const RESERVATION_VENUE_WA: Record<string, string> = {
  "lazaroff": "59899612009",
  "artesano": "59891224997",
};

// ── Google Maps search queries per venue ─────────────────────────────────────
// Direct map URLs for venues that provide a specific link
const VENUE_DIRECT_MAP_URLS: Record<string, string> = {
  "mandr\u00e1gora": "https://maps.app.goo.gl/qEa8SiacbvrVTFGe8",
  "mandragora":    "https://maps.app.goo.gl/qEa8SiacbvrVTFGe8",
  "bar f\u00e9nix": "https://maps.app.goo.gl/B1uuRkP8Gk4ZCtNq7",
  "bar fenix":    "https://maps.app.goo.gl/B1uuRkP8Gk4ZCtNq7",
  "quimera":      "https://maps.app.goo.gl/3CM3vwGe62czJD7F6",
  "terminal goes": "https://maps.app.goo.gl/Kn27o7pjjmuXxjG47",
  "gobbi":        "https://maps.app.goo.gl/HJLwnq8Vckapz7P17",
  "zitarrosa":    "https://maps.app.goo.gl/jZ9QWUsCLuvfo3xd8",
};

const VENUE_MAP_QUERIES: Record<string, string> = {
  "artesano":          "Centro Cultural Artesano Peñarol Montevideo",
  "experimental":      "Centro Cultural La Experimental Malvin Montevideo",
  "crece":             "Centro Cultural Crece Flor de Maroñas Montevideo",
  "cine teatro plaza": "Cine Teatro Plaza Flores Uruguay",
  "afe":               "Centro Cultural AFE Colonia Uruguay",
  "politeama":         "Complejo Cultural Politeama Canelones Uruguay",
  "lazaroff":          "Sala Lazaroff Montevideo",
  "goes":              "Terminal Goes Montevideo",
  "alianza francesa":  "Alianza Francesa Montevideo",
  "prado":             "Casa de Cultura del Prado Montevideo",
};

function getVenueMapsUrl(venueName: string): string {
  const lower = venueName.toLowerCase();
  // Check direct URLs first (venues with specific map links)
  for (const [pattern, url] of Object.entries(VENUE_DIRECT_MAP_URLS)) {
    if (lower.includes(pattern)) return url;
  }
  for (const [pattern, query] of Object.entries(VENUE_MAP_QUERIES)) {
    if (lower.includes(pattern)) {
      return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
    }
  }
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venueName)}`;
}

const STATIC_VENUE_DESC_I18N: Record<string, { en: string; pt: string }> = {
  "espacio cultural gobbi": {
    en: "Located in the former Cine Astor, it is now a landmark cultural centre with theatre, music and exhibition programming for the whole community.",
    pt: "Funciona no antigo Cine Astor e hoje é um centro cultural de referência, com propostas de teatro, música e exposições para toda a comunidade.",
  },
  "sala zitarrosa": {
    en: "Sala Zitarrosa is a cultural venue with 26 years of history where all artistic expressions and styles converge. As a public and benchmark venue in the country, it seeks to contribute to the city's cultural offer, presenting music performances in dialogue with auteur cinema screenings for diverse audiences and social groups.",
    pt: "A Sala Zitarrosa é um espaço cultural com 26 anos de história, onde convergem todas as expressões e estilos artísticos. Como sala pública e de referência no país, busca contribuir para a oferta cultural da cidade, oferecendo espetáculos de música em diálogo com sessões de cinema de autor, atendendo a diferentes públicos e coletivos sociais.",
  },
};

function getLocalizedStaticVenueDesc(venueName: string, locale: string): string | null {
  const key = venueName.toLowerCase().trim();
  const localized = STATIC_VENUE_DESC_I18N[key];
  if (!localized) return null;
  if (locale === "en") return localized.en;
  if (locale === "pt") return localized.pt;
  return null;
}

// Reusable venue card — extracted to avoid repetition in MVD/Interior groups
function VenueCard({
  v,
  t,
  locale,
  getScheduleLines,
  getShortDesc,
  getDepartment,
}: {
  v: Venue;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  t: any;
  locale: string;
  getScheduleLines: (v: Venue) => string[];
  getShortDesc: (v: Venue) => string | null;
  getDepartment: (v: Venue) => string | null;
}) {
  const rawDigits = (v.whatsapp || "").replace(/\D/g, "");
  const waNumber = rawDigits.startsWith("598")
    ? rawDigits
    : rawDigits.startsWith("0")
    ? "598" + rawDigits.slice(1)
    : rawDigits
    ? "598" + rawDigits
    : "";
  const waText = encodeURIComponent("Hola, quiero reservar entradas para Montevideo Fantástico");
  const mailBody = encodeURIComponent("Hola, quiero reservar entradas para Montevideo Fantástico");
  const mailSubject = encodeURIComponent("Reserva Montevideo Fantástico");
  const scheduleLines = getScheduleLines(v);
  const shortDesc = getShortDesc(v);
  const localizedShortDesc = locale === "es" ? shortDesc : getLocalizedStaticVenueDesc(v.name, locale);

  return (
    <div
      className="flex flex-col overflow-hidden"
      style={{ border: "1px solid rgba(0,212,255,0.12)" }}
    >
      {(getVenueOverride(v)?.imageUrl || v.image) && (
        <div className="relative aspect-video overflow-hidden bg-void">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={getVenueOverride(v)?.imageUrl || v.image} alt={v.name} className="w-full h-full object-cover" />
        </div>
      )}
      <div className="flex flex-col flex-1 p-5 gap-4">
        <div>
          <h3 className="font-display text-xl text-white leading-tight mb-1">{v.name}</h3>
          {v.address && (
            <p className="text-xs text-text-muted flex items-start gap-1.5">
              <span className="mt-px leading-none">📍</span>
              <span>{v.address}</span>
            </p>
          )}
          {getDepartment(v) && (
            <p className="text-[10px] uppercase tracking-widest text-plasma mt-1 font-medium">
              {getDepartment(v)}
            </p>
          )}
          {localizedShortDesc && (
            <ExpandableDesc text={localizedShortDesc} />
          )}
        </div>

        {scheduleLines.length > 0 && (
          <div
            className="border-l-2 pl-4 py-2"
            style={{ borderColor: "rgba(0,212,255,0.45)", background: "rgba(0,212,255,0.04)" }}
          >
            {scheduleLines.map((line, i) => (
              <p key={i} className="text-[0.875rem] text-plasma font-mono tracking-wide leading-relaxed">
                {line}
              </p>
            ))}
          </div>
        )}

        <div className="flex flex-wrap gap-2 mt-auto pt-1">
          {v.map_url && (
            <a
              href={getVenueOverride(v)?.mapUrl || v.map_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-widest px-3 py-2 text-text-secondary hover:text-plasma transition-colors"
              style={{ border: "1px solid rgba(255,255,255,0.12)" }}
            >
              <span>🗺</span>
              {t("view_map")}
            </a>
          )}
          {!v.map_url && getVenueOverride(v)?.mapUrl && (
            <a
              href={getVenueOverride(v)!.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-widest px-3 py-2 text-text-secondary hover:text-plasma transition-colors"
              style={{ border: "1px solid rgba(255,255,255,0.12)" }}
            >
              <span>🗺</span>
              {t("view_map")}
            </a>
          )}
          {v.whatsapp && waNumber && (
            <a
              href={`https://wa.me/${waNumber}?text=${waText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-widest px-3 py-2 text-void font-bold transition-opacity hover:opacity-90"
              style={{ background: "#25d366" }}
            >
              <span>💬</span>
              {t("reserve_whatsapp")}
            </a>
          )}
          {v.email && (
            <a
              href={`mailto:${v.email}?subject=${mailSubject}&body=${mailBody}`}
              className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-widest px-3 py-2 transition-colors"
              style={{ border: "1px solid rgba(162,89,247,0.40)", color: "rgba(162,89,247,0.9)" }}
            >
              <span>✉</span>
              {t("reserve_email")}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

function WorkCard({ work }: { work: WorkSummary }) {
  const hasImage = !!work.still;
  return (
    <article
      className="group relative overflow-hidden bg-elevated"
      style={{ border: "1px solid rgba(0,212,255,0.07)" }}
    >
      {/* Poster / image area */}
      <div className="relative aspect-[2/3] overflow-hidden bg-void">
        {hasImage ? (
          <Image
            src={work.still}
            alt={work.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        ) : (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center p-4"
            style={{
              background:
                "radial-gradient(ellipse at 50% 65%, rgba(162,89,247,0.13) 0%, transparent 70%)",
            }}
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,212,255,0.022) 3px, rgba(0,212,255,0.022) 4px)",
              }}
            />
            <div
              className="absolute inset-0 pointer-events-none opacity-20"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 50% 50%, rgba(0,212,255,0.25) 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }}
            />
            <span
              className="font-display text-center leading-tight relative z-10"
              style={{
                fontSize: "clamp(0.75rem, 2.5vw, 1rem)",
                color: "transparent",
                WebkitTextStroke: "1px rgba(0,212,255,0.35)",
                textShadow: "0 0 24px rgba(0,212,255,0.12)",
              }}
            >
              {work.title}
            </span>
            <span className="text-[9px] uppercase tracking-widest text-text-muted mt-3 relative z-10">
              {work.country} · {work.runtime} min
            </span>
          </div>
        )}
        <div
          className="absolute inset-x-0 bottom-0 h-2/5 pointer-events-none"
          style={{
            background: "linear-gradient(to top, rgba(7,11,20,0.95) 0%, transparent 100%)",
          }}
        />
        <span
          className="absolute top-2 left-2 text-[9px] uppercase tracking-widest px-1.5 py-0.5 bg-void/80 text-plasma"
          style={{ border: "1px solid rgba(0,212,255,0.20)" }}
        >
          {work.country}
        </span>
      </div>
      <div className="p-3 pt-2">
        <h3 className="font-display text-sm text-white leading-snug line-clamp-2 mb-0.5">
          {work.title}
        </h3>
        <p className="text-xs text-text-secondary">Dir. {work.director}</p>
        <p className="text-[11px] text-text-muted mt-0.5">{work.runtime} min</p>
      </div>
    </article>
  );
}

// Static fallback for the current edition — used when the API is unreachable.
// Matches the Edition interface exactly so the rest of the page renders normally.
const EDITION_2026_FALLBACK: Edition = {
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
  description_es: "El Festival Montevideo Fantástico celebra su edición XVI del 8 de mayo al 28 de junio de 2026 en distintas salas de Montevideo y el interior del país. Desde 2005, el festival funciona como un espacio dedicado al cine de terror, fantasía y ciencia ficción, con foco en producciones independientes y ultra independientes que circulan por fuera de los circuitos tradicionales.\n\nA lo largo de la semana se presentará una selección de cortometrajes, mediometrajes y largometrajes internacionales, junto con funciones especiales y actividades en distintos barrios. La propuesta busca acercar al público obras que exploran el género desde perspectivas diversas, con un criterio de curaduría centrado en la originalidad y la libertad creativa.\n\nEl festival se desarrolla en articulación con centros culturales y espacios públicos, promoviendo el acceso y la circulación del cine fantástico en Uruguay.",
  description_en: "Montevideo Fantástico celebrates its 16th edition from May 8 to June 28, 2026, at venues across Montevideo and the rest of Uruguay. Since 2005, the festival has operated as a dedicated space for horror, fantasy and science fiction cinema, with a focus on independent and ultra-independent productions that circulate outside traditional distribution circuits.\n\nThroughout the week, a selection of international short films, medium-length films and features will be presented, alongside special screenings and events across different neighbourhoods. The programme aims to bring audiences works that explore genre cinema from diverse perspectives, with a curatorial emphasis on originality and creative freedom.\n\nThe festival develops in partnership with cultural centres and public spaces, committed to making fantastic cinema accessible and widely circulated in Uruguay.",
  description_pt: "O Festival Montevideo Fantástico celebra sua décima sexta edição de 8 de maio a 28 de junho de 2026 em diferentes salas de Montevidéu e do interior do país. Desde 2005, o festival funciona como um espaço dedicado ao cinema de terror, fantasia e ficção científica, com foco em produções independentes e ultra-independentes que circulam fora dos circuitos tradicionais.\n\nAo longo da semana será apresentada uma seleção de curtas, médias e longas-metragens internacionais, junto com sessões especiais e atividades em diferentes bairros. A proposta busca aproximar o público de obras que exploram o gênero a partir de perspectivas diversas, com um critério de curadoria centrado na originalidade e na liberdade criativa.\n\nO festival se desenvolve em articulação com centros culturais e espaços públicos, apostando no acesso e na circulação do cinema fantástico no Uruguai.",
  rules_es: "",
  rules_en: "",
  rules_pt: "",
  submission_url: "",
  work_count: 0,
  venue_count: 0,
  has_legacy: false,
  gallery: [],
  legacy_json: null,
  created_at: "2026-01-01T00:00:00Z",
  updated_at: "2026-01-01T00:00:00Z",
};

export default async function CurrentEditionPage({ params }: { params: { locale: string } }) {
  const locale = params.locale;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "edition" });

  let edition: Edition;
  try {
    edition = await getCurrentEdition();
  } catch {
    // API unavailable — use static 2026 fallback so the page still renders
    edition = EDITION_2026_FALLBACK;
  }

  const [worksRes, venuesRes, screeningsRes] = await Promise.all([
    getWorksForEdition(edition.year).catch(() => ({ results: [] })),
    getVenuesForEdition(edition.year).catch(() => ({ results: [] })),
    getScreeningsForEdition(edition.year).catch(() => ({ results: [] })),
  ]);

  const works = worksRes.results;
  const allVenues = venuesRes.results;
  const screenings = screeningsRes.results;

  // Split venues: scheduled = have description, pending = "Programación a confirmar"
  const PENDING_MARKER = "Programación a confirmar";
  const scheduledVenues = allVenues.filter((v: Venue) => v.description !== PENDING_MARKER);
  const pendingVenues = allVenues.filter((v: Venue) => v.description === PENDING_MARKER);

  const worksBySection = works.reduce<Partial<Record<WorkSection, WorkSummary[]>>>((acc, w) => {
    (acc[w.section] = acc[w.section] ?? []).push(w);
    return acc;
  }, {});

  const sectionOrder: WorkSection[] = [
    "competition_int",
    "competition_nat",
    "short_competition",
    "panorama",
    "special",
    "retrospective",
    "tribute",
  ];

  const byDate = screenings.reduce<Record<string, Screening[]>>((acc, s) => {
    (acc[s.date] = acc[s.date] ?? []).push(s);
    return acc;
  }, {});
  const sortedDates = Object.keys(byDate).sort();
  const useApiSchedule = screenings.length > 0 && edition.number !== 16;
  const COLLAPSE_CUTOFF_DATE = "2026-06-20";
  const isPastDateGroup = (date: string) => date < COLLAPSE_CUTOFF_DATE;

  const posterSrc = edition.key_visual || edition.poster || "";

  // Edition 16 hardcoded descriptions — override API data which has wrong date (del 9 al 16)
  const EDITION_16_DESC: Record<string, string> = {
    es: "El Festival Montevideo Fantástico celebra su edición XVI del 8 de mayo al 28 de junio de 2026 en distintas salas de Montevideo y el interior del país. Desde 2005, el festival funciona como un espacio dedicado al cine de terror, fantasía y ciencia ficción, con foco en producciones independientes y ultra independientes que circulan por fuera de los circuitos tradicionales.\n\nA lo largo de la semana se presentará una selección de cortometrajes, mediometrajes y largometrajes internacionales, junto con funciones especiales y actividades en distintos barrios. La propuesta busca acercar al público obras que exploran el género desde perspectivas diversas, con un criterio de curaduría centrado en la originalidad y la libertad creativa.\n\nEl festival se desarrolla en articulación con centros culturales y espacios públicos, promoviendo el acceso y la circulación del cine fantástico en Uruguay. La grilla completa y los detalles de cada función serán publicados próximamente.",
    en: "Montevideo Fantástico celebrates its 16th edition from May 8 to June 28, 2026, at venues across Montevideo and the rest of Uruguay. Since 2005, the festival has operated as a dedicated space for horror, fantasy and science fiction cinema, with a focus on independent and ultra-independent productions that circulate outside traditional distribution circuits.\n\nThroughout the week, a selection of international short films, medium-length films and features will be presented, alongside special screenings and events across different neighbourhoods. The programme aims to bring audiences works that explore genre cinema from diverse perspectives, with a curatorial emphasis on originality and creative freedom.\n\nThe festival develops in partnership with cultural centres and public spaces, committed to making fantastic cinema accessible and widely circulated in Uruguay. The full schedule and details for each screening will be published shortly.",
    pt: "O Festival Montevideo Fantástico celebra sua décima sexta edição de 8 de maio a 28 de junho de 2026 em diferentes salas de Montevidéu e do interior do país. Desde 2005, o festival funciona como um espaço dedicado ao cinema de terror, fantasia e ficção científica, com foco em produções independentes e ultra-independentes que circulam fora dos circuitos tradicionais.\n\nAo longo da semana será apresentada uma seleção de curtas, médias e longas-metragens internacionais, junto com sessões especiais e atividades em diferentes bairros. A proposta busca aproximar o público de obras que exploram o gênero a partir de perspectivas diversas, com um critério de curadoria centrado na originalidade e na liberdade criativa.\n\nO festival se desenvolve em articulação com centros culturais e espaços públicos, apostando no acesso e na circulação do cinema fantástico no Uruguai. A grade completa e os detalhes de cada sessão serão publicados em breve.",
  };

  const description =
    edition.number === 16
      ? (EDITION_16_DESC[locale] || EDITION_16_DESC.es)
      : locale === "en"
      ? edition.description_en || edition.description_es
      : locale === "pt"
      ? edition.description_pt || edition.description_es
      : edition.description_es;

  // Edition 16: API still returns wrong end_date 2026-05-16; override to 2026-06-28
  const displayEndDate = edition.number === 16 ? "2026-06-28" : edition.end_date;
  const dateRange = `${new Date(edition.start_date + "T12:00:00").toLocaleDateString(locale, { day: "numeric", month: "long" })} — ${new Date(displayEndDate + "T12:00:00").toLocaleDateString(locale, { day: "numeric", month: "long", year: "numeric" })}`;

  // ── Venue region classification ────────────────────────────────────
  // Check both address AND description — some venues don't include city in address
  // (e.g. Cine Teatro Plaza / Trinidad, Flores — address has no city but description does)
  const INTERIOR_MARKERS = [
    "colonia", "trinidad", "paysand", "maldonado", "canelones",
    "salto", "rivera", "rocha", "minas", "mercedes", "flores",
  ];
  const isInterior = (v: Venue) => {
    const override = getVenueOverride(v);
    if (override?.forceMvd) return false;
    if (override?.forceInterior) return true;
    const addr = (v.address || "").toLowerCase();
    const desc = (v.description || "").toLowerCase();
    return INTERIOR_MARKERS.some((m) => addr.includes(m) || desc.includes(m));
  };

  const DEPARTMENT_NAMES: Record<string, string> = {
    "colonia": "Colonia",
    "trinidad": "Flores",
    "flores": "Flores",
    "paysand": "Paysandú",
    "maldonado": "Maldonado",
    "canelones": "Canelones",
    "salto": "Salto",
    "rivera": "Rivera",
    "rocha": "Rocha",
    "minas": "Lavalleja",
    "mercedes": "Soriano",
  };
  const getDepartment = (v: Venue): string | null => {
    const override = getVenueOverride(v);
    if (override?.department) return override.department;
    if (!isInterior(v)) return null;
    const text = ((v.address || "") + " " + (v.description || "")).toLowerCase();
    for (const [marker, name] of Object.entries(DEPARTMENT_NAMES)) {
      if (text.includes(marker)) return name;
    }
    return null;
  };

  // Montevideo venue display priority order
  const MVD_ORDER: string[] = [
    "centro cultural artesano",
    "sala experimental",
    "sala lazaroff",
    "centro cultural terminal goes",
  ];
  const mvdVenueSort = (a: Venue, b: Venue) => {
    const ai = MVD_ORDER.findIndex((pat) => (a.name || "").toLowerCase().includes(pat));
    const bi = MVD_ORDER.findIndex((pat) => (b.name || "").toLowerCase().includes(pat));
    const ar = ai === -1 ? MVD_ORDER.length : ai;
    const br = bi === -1 ? MVD_ORDER.length : bi;
    return ar - br;
  };
  // Merge static venues (deduped by name against API results)
  const apiVenueNames = new Set(scheduledVenues.map((v: Venue) => v.name.toLowerCase().trim()));
  const staticVenuesToShow = STATIC_VENUES_2026.filter(
    (v) => !apiVenueNames.has(v.name.toLowerCase().trim())
  );

  const mvdVenues = [
    ...scheduledVenues.filter((v: Venue) => !isInterior(v)),
    ...staticVenuesToShow.filter((v: Venue) => !isInterior(v)),
  ].sort(mvdVenueSort);
  const interiorVenues = [
    ...scheduledVenues.filter((v: Venue) => isInterior(v)),
    ...staticVenuesToShow.filter((v: Venue) => isInterior(v)),
  ];

  // getScheduleLines: short entries (≤ 150 chars) are actual schedule info → show as schedule block.
  // Long institutional descriptions are shown in ExpandableDesc with expand/collapse.
  // Static venues (negative IDs) always use ExpandableDesc regardless of length.
  const SCHEDULE_MAX = 150;
  const getScheduleLines = (v: Venue): string[] => {
    if (v.id < 0) return [];
    if (!v.description || v.description.length > SCHEDULE_MAX) return [];
    return v.description.split(/\n/).map((l) => l.trim()).filter(Boolean);
  };
  const getShortDesc = (v: Venue): string | null => {
    if (v.id < 0) return v.description?.trim() || null;
    if (!v.description || v.description.length <= SCHEDULE_MAX) return null;
    return v.description.trim();
  };

  return (
    <div className="container-wide section-padding">
      {/* Hero */}
      <div className="grid grid-cols-1 md:grid-cols-[320px_1fr] gap-8 md:gap-12 mb-10 md:mb-16 items-start">
        {/* Poster — constrained on mobile, full on desktop */}
        <div className="flex flex-col">
        <div className="max-w-[200px] mx-auto md:max-w-none md:mx-0 w-full" style={{ border: '1px solid rgba(0,212,255,0.12)' }}>
          {posterSrc ? (
            <Image
              src={posterSrc}
              alt={edition.name}
              width={640}
              height={900}
              className="w-full h-auto block"
              style={{ display: 'block' }}
              priority
            />
          ) : (
            <div
              className="flex flex-col items-center justify-center"
              style={{
                aspectRatio: '2/3',
                background:
                  'radial-gradient(ellipse at 50% 60%, rgba(162,89,247,0.18) 0%, rgba(0,212,255,0.04) 50%, transparent 80%)',
              }}
            >
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage:
                    'repeating-linear-gradient(0deg, transparent, transparent 5px, rgba(0,212,255,0.03) 5px, rgba(0,212,255,0.03) 6px)',
                }}
              />
              <span
                className="font-display text-center relative z-10"
                style={{
                  fontSize: '7rem',
                  lineHeight: 1,
                  color: 'transparent',
                  WebkitTextStroke: '1px rgba(0,212,255,0.22)',
                  textShadow: '0 0 60px rgba(0,212,255,0.08)',
                }}
              >
                {edition.year}
              </span>
            </div>
          )}
        </div>
        <QuizCTA locale={locale} />
        </div>
        <div className="flex flex-col justify-end">
          {/* Title — use edition name directly (e.g. "Montevideo Fantástico XVI") */}
          <h1 className="font-display text-4xl md:text-6xl text-white leading-tight mb-3">{edition.name}</h1>
          <p className="text-sm text-white/65 mb-6">{dateRange}</p>
          {description && (
            <div
              className="border-l-2 pl-5 mb-8"
              style={{ borderColor: 'rgba(0,212,255,0.25)' }}
            >
              {description.split("\n\n").map((para, i) => (
                <p key={i} className="text-base md:text-lg leading-relaxed font-light mb-3 last:mb-0" style={{ color: 'rgba(255,255,255,0.78)' }}>
                  {para}
                </p>
              ))}
              <FestivalDisclaimer locale={locale} />
            </div>
          )}
          <div className="flex flex-wrap gap-6 text-sm text-text-secondary mb-6">
            {works.length > 0 && (
              <span><strong className="text-white font-display text-2xl">{works.length}</strong> {t("obras_count")}</span>
            )}
            {(allVenues.length + staticVenuesToShow.length) > 0 && (
              <span>{t("sedes_count")}: <strong className="text-white font-display text-2xl">{mvdVenues.length + interiorVenues.length}</strong></span>
            )}
          </div>
          {/* CTA: only show if submission_url exists */}
          {edition.submission_url ? (
            <a
              href={edition.submission_url}
              target="_blank"
              rel="noopener noreferrer"
              className="self-start text-void text-xs uppercase tracking-widest px-5 py-2.5 transition-colors font-bold"
              style={{ background: 'linear-gradient(135deg, #00d4ff, #a259f7)' }}
            >
              {t("call_open")}
            </a>
          ) : null}
          {/* Jury link */}
          <Link
            href={`/${locale}/${t("jury_route")}`}
            className="self-start inline-flex items-center gap-2 font-sans text-xs uppercase tracking-widest px-5 py-2.5 transition-colors"
            style={{ border: "1px solid rgba(0,212,255,0.35)", color: "rgba(0,212,255,0.90)" }}
          >
            {t("view_jury")}
          </Link>
        </div>
      </div>

      {/* ── 1. PROGRAMACIÓN POR FECHA ────────────────────────────────── */}
      <section className="mt-16">
        <h2 className="font-display text-3xl text-white mb-2 border-b border-white/20 pb-4">
          {locale === "en" ? "PROGRAMME BY DATE" : locale === "pt" ? "PROGRAMA\u00c7\u00c3O POR DATA" : "PROGRAMACI\u00d3N POR FECHA"}
        </h2>
        {/* Entrada gratuita notice */}
        <div className="flex flex-wrap items-center gap-4 mt-4 mb-6">
          <span
            className="inline-flex items-center gap-2 font-sans text-sm uppercase tracking-widest font-bold px-3 py-1.5"
            style={{ background: "rgba(34,197,94,0.10)", border: "1px solid rgba(34,197,94,0.30)", color: "#4ade80" }}
          >
            ✦ {t("free_entry_badge")}
          </span>
          <span className="font-sans text-xs text-white/70 tracking-wide">
            {t("free_entry_note")}
          </span>
        </div>

        {useApiSchedule ? (
          sortedDates.map((date) => {
            const label = new Date(date + "T12:00:00").toLocaleDateString(locale, {
              weekday: "long",
              day: "numeric",
              month: "long",
            });
            const pastDate = isPastDateGroup(date);
            const dateContent = (
              <div className="flex flex-col gap-3">
                {byDate[date].map((s) => {
                  const matchedFilm = FILMS_2026.find(
                    (f) => f.title.toLowerCase() === s.work.title.toLowerCase()
                  );
                  const filmHref = matchedFilm
                    ? `/${locale}/film/${matchedFilm.slug}`
                    : null;
                  const posterSrc = matchedFilm?.poster || null;
                  const inner = (
                    <div className="flex items-stretch gap-0">
                      {/* Time column */}
                      <div
                        className="flex-shrink-0 w-16 md:w-24 flex items-center justify-center"
                        style={{ background: "rgba(0,212,255,0.08)", borderRight: "1px solid rgba(0,212,255,0.18)" }}
                      >
                        <span className="font-display text-2xl md:text-3xl text-plasma leading-none">{s.time.slice(0, 5)}</span>
                      </div>
                      {/* Mini poster */}
                      {posterSrc && (
                        <div className="flex-shrink-0 self-center w-16 h-[96px] md:w-24 md:h-[144px] overflow-hidden" style={{ borderRight: "1px solid rgba(255,255,255,0.06)" }}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={posterSrc}
                            alt={s.work.title}
                            className="w-full h-full object-cover object-center block"
                          />
                        </div>
                      )}
                      {/* Content */}
                      <div className="flex-1 px-5 md:px-7 py-4 md:py-6 min-w-0">
                        <p className="font-display text-lg md:text-2xl font-semibold text-white leading-snug mb-1.5">{s.work.title}</p>
                        <p className="font-sans text-xs md:text-sm text-text-secondary">
                          {s.venue_name && <span className="text-text-primary font-medium">{s.venue_name}</span>}
                          {s.work.director && <span className="text-text-muted"> · {s.work.director}</span>}
                        </p>
                        {s.notes && (
                          <span
                            className="inline-block mt-2 font-sans text-[10px] uppercase tracking-widest px-2 py-0.5"
                            style={{ background: "rgba(162,89,247,0.12)", border: "1px solid rgba(162,89,247,0.25)", color: "rgba(162,89,247,0.9)" }}
                          >
                            {s.notes}
                          </span>
                        )}
                        <span
                          className="inline-block mt-2 font-sans text-[10px] uppercase tracking-widest px-2 py-0.5"
                          style={{ background: "rgba(34,197,94,0.10)", border: "1px solid rgba(34,197,94,0.28)", color: "#4ade80" }}
                        >
                          {t("free_entry_short")}
                        </span>
                      </div>
                      {/* Arrow */}
                      {filmHref && (
                        <div className="flex-shrink-0 flex items-center pr-4 pl-2">
                          <svg viewBox="0 0 6 10" className="w-2 h-3 text-plasma/40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M1 1l4 4-4 4" />
                          </svg>
                        </div>
                      )}
                    </div>
                  );
                  return filmHref ? (
                    <Link
                      key={s.id}
                      href={filmHref}
                      className="block overflow-hidden transition-all duration-200 hover:border-plasma/50"
                      style={{ border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.02)" }}
                    >
                      {inner}
                    </Link>
                  ) : (
                    <div
                      key={s.id}
                      className="overflow-hidden"
                      style={{ border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.02)" }}
                    >
                      {inner}
                    </div>
                  );
                })}
              </div>
            );
            if (pastDate) {
              return (
                <details key={date} className="mb-14 pt-8 group">
                  <summary className="list-none cursor-pointer">
                    <div
                      className="flex flex-wrap items-center justify-between gap-3"
                      style={{ borderBottom: "2px solid rgba(0,212,255,0.30)", paddingBottom: "0.5rem" }}
                    >
                      <h3 className="font-display text-xl md:text-2xl font-bold text-white">{label}</h3>
                      <span className="font-sans text-[10px] md:text-xs uppercase tracking-widest text-plasma/80">
                        {t("show_past_screenings")}
                      </span>
                    </div>
                  </summary>
                  <div className="mt-5">
                    {dateContent}
                  </div>
                </details>
              );
            }
            return (
              <div key={date} className="mb-14 pt-8">
                <h3
                  className="font-display text-xl md:text-2xl font-bold text-white mb-5"
                  style={{ borderBottom: "2px solid rgba(0,212,255,0.30)", paddingBottom: "0.5rem" }}
                >{label}</h3>
                {dateContent}
              </div>
            );
          })
        ) : SCREENINGS_2026.length > 0 ? (
          /* Programme — month accordions, both collapsed by default */
          (() => {
            const MONTH_LABELS: Record<string, Record<string, string>> = {
              "2026-05": { es: "MAYO", en: "MAY", pt: "MAIO" },
              "2026-06": { es: "JUNIO", en: "JUNE", pt: "JUNHO" },
            };
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const monthMap = new Map<string, Array<[string, any[]]>>();
            for (const [date, dateScreenings] of Array.from(getScreeningsByDate().entries())) {
              const monthKey = date.slice(0, 7);
              if (!monthMap.has(monthKey)) monthMap.set(monthKey, []);
              monthMap.get(monthKey)!.push([date, dateScreenings]);
            }
            return (
              <>
                {Array.from(monthMap.entries()).map(([monthKey, monthDates]) => {
                  const monthLabel = MONTH_LABELS[monthKey]?.[locale] ?? monthKey;
                  const openText = locale === "en" ? `OPEN ${monthLabel.toUpperCase()} PROGRAMME` : locale === "pt" ? `ABRIR PROGRAMA\u00c7\u00c3O DE ${monthLabel.toUpperCase()}` : `ABRIR PROGRAMACI\u00d3N DE ${monthLabel.toUpperCase()}`;
                  const closeText = locale === "en" ? `CLOSE ${monthLabel.toUpperCase()} PROGRAMME` : locale === "pt" ? `FECHAR PROGRAMA\u00c7\u00c3O DE ${monthLabel.toUpperCase()}` : `CERRAR PROGRAMACI\u00d3N DE ${monthLabel.toUpperCase()}`;
                  return (
                    <details key={monthKey} className="mb-8 group">
                      <summary className="list-none cursor-pointer select-none">
                        <div
                          className="flex items-center gap-4 py-5 w-full"
                          style={{ borderBottom: "2px solid rgba(0,212,255,0.30)" }}
                        >
                          <span className="font-sans text-plasma text-xl font-bold w-6 text-center flex-shrink-0 group-open:hidden" aria-hidden="true">+</span>
                          <span className="font-sans text-plasma text-xl font-bold w-6 text-center flex-shrink-0 hidden group-open:inline" aria-hidden="true">−</span>
                          <div className="flex-1 flex flex-wrap items-baseline gap-3 min-w-0">
                            <h3 className="font-display text-2xl md:text-3xl font-bold text-white">{monthLabel}</h3>
                            <span className="font-sans text-[10px] uppercase tracking-widest" style={{ color: "rgba(0,212,255,0.55)" }}>
                              {monthDates.length} {locale === "en" ? "dates" : locale === "pt" ? "datas" : "fechas"}
                            </span>
                          </div>
                          <span className="font-sans text-[11px] font-semibold tracking-[0.12em] hidden md:inline group-open:hidden" style={{ color: "rgba(0,212,255,0.85)" }}>{openText}</span>
                          <span className="font-sans text-[11px] font-semibold tracking-[0.12em] hidden group-open:inline" style={{ color: "rgba(0,212,255,0.85)" }}>{closeText}</span>
                        </div>
                      </summary>
                      <div className="mt-2">
                      {monthDates.map(([date, dateScreenings]) => {
                        const label = new Date(date + "T12:00:00").toLocaleDateString(locale, {
                          weekday: "long",
                          day: "numeric",
                          month: "long",
                        });
                        const dateContent = (
                <div className="flex flex-col gap-3">
                  {dateScreenings.map((s, i) => {
                    const matchedFilm = FILMS_2026.find((x) => x.slug === s.film_slug);
                    const filmHref = !s.is_short_block && matchedFilm ? `/${locale}/film/${s.film_slug}` : null;
                    const displayTitle = s.film_title_i18n?.[locale as "es" | "en" | "pt"] ?? s.film_title;
                    const displayDesc = s.description_i18n?.[locale as "es" | "en" | "pt"] ?? s.description;
                    // WhatsApp — only Sala Lazaroff and Centro Cultural Artesano
                    const waKey = Object.keys(RESERVATION_VENUE_WA).find((k) => s.venue.toLowerCase().includes(k));
                    const waNumber = waKey ? RESERVATION_VENUE_WA[waKey] : "";
                    const waDate = new Date(s.date + "T12:00:00")
                      .toLocaleDateString("es", { weekday: "long", day: "numeric", month: "long" })
                      .replace(",", "");
                    const waMsg = waNumber
                      ? encodeURIComponent(
                          `Hola, quiero reservar entradas para Montevideo Fantástico, para la película "${s.film_title.toUpperCase()}" a las ${s.time} horas el ${waDate}.`
                        )
                      : "";
                    const waUrl = waNumber ? `https://wa.me/${waNumber}?text=${waMsg}` : "";
                    // Poster: short blocks use edition poster, others use film poster
                    const posterImg = s.is_short_block
                      ? (edition.key_visual || edition.poster || null)
                      : (matchedFilm?.poster || null);
                    // Always render outer as div — avoids nested <a> with map/WA links inside

                    return (
                      <div
                        key={i}
                        className="overflow-hidden"
                        style={{ border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.02)" }}
                      >
                        <div className="flex items-stretch gap-0">
                        {/* Time column */}
                        <div
                          className="flex-shrink-0 w-16 md:w-24 flex items-center justify-center"
                          style={{ background: "rgba(0,212,255,0.08)", borderRight: "1px solid rgba(0,212,255,0.18)" }}
                        >
                          <span className="font-display text-2xl md:text-3xl text-plasma leading-none">{s.time}</span>
                        </div>
                        {/* Mini poster */}
                        {posterImg && (
                          <div className="flex-shrink-0 self-center w-16 h-[96px] md:w-24 md:h-[144px] overflow-hidden" style={{ borderRight: "1px solid rgba(255,255,255,0.06)" }}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={posterImg}
                              alt={displayTitle}
                              className="w-full h-full object-cover object-center block"
                            />
                          </div>
                        )}
                        {/* Content */}
                        <div className="flex-1 px-5 md:px-7 py-4 md:py-5 min-w-0">
                          {filmHref ? (
                            <Link
                              href={filmHref}
                              className="font-display text-lg md:text-2xl font-semibold text-white leading-snug mb-1.5 hover:text-plasma transition-colors block"
                            >
                              {displayTitle}
                            </Link>
                          ) : (
                            <p className="font-display text-lg md:text-2xl font-semibold text-white leading-snug mb-1.5">
                              {displayTitle}
                            </p>
                          )}
                          <div className="flex flex-wrap items-center gap-2 mb-1.5">
                            <span
                              className="font-sans text-sm md:text-base font-semibold"
                              style={{ color: "rgba(255,255,255,0.96)" }}
                            >{s.venue}</span>
                            <a
                              href={getVenueMapsUrl(s.venue)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 font-sans text-[11px] transition-colors hover:text-plasma"
                              style={{ color: "rgba(0,212,255,0.65)" }}
                            >
                              <svg viewBox="0 0 12 12" className="w-2.5 h-2.5 flex-shrink-0" fill="currentColor">
                                <path d="M6 0a4 4 0 0 1 4 4c0 3-4 8-4 8S2 7 2 4a4 4 0 0 1 4-4zm0 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/>
                              </svg>
                              {t("view_map")}
                            </a>
                            {getInteriorLabel(s.venue) && (
                              <span
                                className="inline-block font-sans text-[9px] uppercase tracking-widest px-2 py-0.5"
                                style={{ border: "1px solid rgba(0,212,255,0.30)", color: "rgba(0,212,255,0.60)" }}
                              >
                                INTERIOR · {getInteriorLabel(s.venue)}
                              </span>
                            )}
                          </div>
                          {displayDesc && (
                            <p className="font-sans text-xs leading-snug mb-3" style={{ color: 'rgba(255,255,255,0.50)' }}>{displayDesc}</p>
                          )}
                          {s.films && s.films.length > 0 && (
                            <ul className="mt-1 mb-3 flex flex-col gap-[5px] pl-0 list-none">
                              {s.films.map((f: { slug: string; title: string }) => (
                                <li key={f.slug} className="font-sans text-sm py-0.5" style={{ color: 'rgba(255,255,255,0.82)' }}>
                                  <Link href={`/${locale}/film/${f.slug}`} className="hover:text-plasma transition-colors">
                                    {f.title}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          )}
                          {/* Labels */}
                          <div className="flex flex-wrap items-center gap-2 mt-1">
                            {!(s.is_short_block && s.section === "Entrada libre y gratuita") && (
                              <span
                                className="inline-block font-sans text-[10px] uppercase tracking-widest px-2 py-0.5"
                                style={{ background: "rgba(162,89,247,0.12)", border: "1px solid rgba(162,89,247,0.25)", color: "rgba(162,89,247,0.9)" }}
                              >
                                {SCREENING_SECTION_I18N[s.section]?.[locale as "es" | "en" | "pt"] ?? s.section}
                              </span>
                            )}
                            <span
                              className="inline-block font-sans text-[10px] uppercase tracking-widest px-2 py-0.5"
                              style={{ background: "rgba(34,197,94,0.10)", border: "1px solid rgba(34,197,94,0.28)", color: "#4ade80" }}
                            >
                              {s.requires_reservation ? t("free_entry_with_reservation") : t("free_entry_short")}
                            </span>
                            {s.is_short_block && !s.description && !s.description_i18n && (!s.films || s.films.length === 0) && (
                              <span className="inline-block font-sans text-[10px] text-text-muted tracking-wide">
                                {t("schedule_tbd_note")}
                              </span>
                            )}
                          </div>
                          {/* WhatsApp CTA — Lazaroff + Artesano only */}
                          {waUrl && (
                            <a
                              href={waUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 mt-3 font-sans text-[11px] uppercase tracking-widest px-3 py-1.5 font-bold transition-opacity hover:opacity-90"
                              style={{ background: "#25d366", color: "#000" }}
                            >
                              💬 {t("reserve_whatsapp")}
                            </a>
                          )}
                        </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
                        return (
                          <details key={date} className="mb-4 pt-4 group/day">
                            <summary className="list-none cursor-pointer select-none">
                              <div
                                className="flex items-center gap-3"
                                style={{ borderBottom: "1px solid rgba(0,212,255,0.18)", paddingBottom: "0.5rem" }}
                              >
                                <span className="font-sans text-plasma text-sm font-bold w-5 text-center flex-shrink-0 group-open/day:hidden" aria-hidden="true">+</span>
                                <span className="font-sans text-plasma text-sm font-bold w-5 text-center flex-shrink-0 hidden group-open/day:inline" aria-hidden="true">−</span>
                                <h3 className="font-display text-xl md:text-2xl font-bold text-white flex-1">{label}</h3>
                                <span className="font-sans text-[10px] uppercase tracking-widest" style={{ color: "rgba(0,212,255,0.45)" }}>
                                  {dateScreenings.length} {locale === "en" ? (dateScreenings.length === 1 ? "screening" : "screenings") : locale === "pt" ? (dateScreenings.length === 1 ? "sess\u00e3o" : "sess\u00f5es") : (dateScreenings.length === 1 ? "funci\u00f3n" : "funciones")}
                                </span>
                              </div>
                            </summary>
                            <div className="mt-5">
                              {dateContent}
                            </div>
                          </details>
                        );
                      })}
                      </div>
                    </details>
                  );
                })}
              </>
            );
          })()
        ) : (
          /* Programación en actualización */
          <div
            className="mt-6"
            style={{
              background: "linear-gradient(135deg, rgba(0,212,255,0.07) 0%, rgba(162,89,247,0.10) 100%)",
              border: "1px solid rgba(0,212,255,0.28)",
              borderLeft: "4px solid #00d4ff",
            }}
          >
            {/* Logo strip */}
            <div
              className="px-5 sm:px-10 pt-6 sm:pt-10 pb-5 sm:pb-6 flex items-start gap-4 sm:gap-6"
              style={{ borderBottom: "1px solid rgba(0,212,255,0.12)" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logos/logo-main.png.png"
                alt="Montevideo Fantástico"
                className="h-8 sm:h-12 w-auto opacity-90 shrink-0 hidden sm:block"
              />
              <div>
                <p className="font-sans text-[10px] tracking-[0.35em] uppercase text-plasma font-medium mb-1">
                  {edition.name}
                </p>
                <h3 className="font-display text-white leading-none" style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)" }}>
                  {t("schedule_updating")}
                </h3>
              </div>
            </div>
            {/* Body */}
            <div className="px-5 sm:px-10 py-5 sm:py-7">
              <p className="font-sans text-base text-text-secondary leading-relaxed font-light max-w-lg">
                {t("schedule_updating_desc")}
              </p>
            </div>
          </div>
        )}
      </section>

      {/* ── 2. PELÍCULAS SELECCIONADAS ───────────────────────────────── */}
      {FILMS_2026.length > 0 && (
        <section className="mt-16">
          {/* Section header */}
          <div className="flex flex-col sm:flex-row sm:items-end gap-3 sm:gap-6 mb-2 pb-4 border-b border-white/20">
            <h2 className="font-display text-3xl text-white leading-none">
              {locale === "en" ? "SELECTED FILMS" : locale === "pt" ? "FILMES SELECIONADOS" : "PEL\u00cdCULAS SELECCIONADAS"}
            </h2>
          </div>
          <p className="font-sans text-base text-text-secondary leading-relaxed mb-10 max-w-2xl">
            {locale === "en"
              ? "The Montevideo Fant\u00e1stico XVI programme brings together feature films, medium-length films and short films from different places, with screenings in cinemas, cultural centres and independent venues in Montevideo and across the country."
              : locale === "pt"
              ? "A programa\u00e7\u00e3o do Montevideo Fant\u00e1stico XVI re\u00fane longas, m\u00e9dias e curtas-metragens de diferentes origens, com sess\u00f5es em salas, centros culturais e espa\u00e7os independentes de Montevid\u00e9u e do interior."
              : "La programaci\u00f3n de Montevideo Fant\u00e1stico XVI re\u00fane largometrajes, mediometrajes y cortometrajes de distintas procedencias, con funciones en salas, centros culturales y espacios independientes de Montevideo y el interior."}
          </p>

          {/* Categories */}
          {(() => {
            const byCategory = getFilmsByCategory();
            return Array.from(byCategory.entries()).map(([cat, films]) => (
              <details key={cat} className="mb-10 group/cat">
                <summary className="list-none cursor-pointer select-none">
                  <div className="flex items-center gap-3 pb-3" style={{ borderBottom: "1px solid rgba(0,212,255,0.18)" }}>
                    <span className="font-sans text-plasma text-base font-bold w-5 text-center flex-shrink-0 group-open/cat:hidden" aria-hidden="true">+</span>
                    <span className="font-sans text-plasma text-base font-bold w-5 text-center flex-shrink-0 hidden group-open/cat:inline" aria-hidden="true">−</span>
                    <h3 className="font-sans text-xs sm:text-sm uppercase tracking-[0.2em] text-plasma font-semibold flex-1">
                      {locale === "en" ? CATEGORY_LABELS_EN[cat] : locale === "pt" ? CATEGORY_LABELS_PT[cat] : CATEGORY_LABELS[cat]}
                    </h3>
                    <span className="font-sans text-[11px] font-semibold tracking-[0.12em] group-open/cat:hidden" style={{ color: "rgba(0,212,255,0.85)" }}>
                      {locale === "en" ? `OPEN ${films.length} ${films.length === 1 ? "TITLE" : "TITLES"}` : locale === "pt" ? `ABRIR ${films.length} T\u00cdTULO${films.length === 1 ? "" : "S"}` : `ABRIR LOS ${films.length} T\u00cdTULOS`}
                    </span>
                    <span className="font-sans text-[11px] font-semibold tracking-[0.12em] hidden group-open/cat:inline" style={{ color: "rgba(0,212,255,0.85)" }}>
                      {locale === "en" ? `CLOSE ${films.length} ${films.length === 1 ? "TITLE" : "TITLES"}` : locale === "pt" ? `FECHAR ${films.length} T\u00cdTULO${films.length === 1 ? "" : "S"}` : `CERRAR LOS ${films.length} T\u00cdTULOS`}
                    </span>
                  </div>
                </summary>

                {/* Film grid */}
                <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {films.map((film) => (
                    <Link
                      key={film.slug}
                      href={`/${locale}/film/${film.slug}`}
                      className="group block"
                    >
                      <article>
                        {/* Poster */}
                        <div
                          className="relative aspect-[2/3] overflow-hidden mb-3"
                          style={{ background: "#0c1220", border: "1px solid rgba(255,255,255,0.07)" }}
                        >
                          {film.poster ? (
                            <Image
                              src={film.poster}
                              alt={film.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                            />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center px-2">
                              <span className="font-display text-text-muted text-[10px] uppercase tracking-widest text-center">
                                {locale === "en" ? "Poster coming soon" : locale === "pt" ? "Cartaz em breve" : "Afiche próximamente"}
                              </span>
                            </div>
                          )}
                          {/* Hover overlay */}
                          <div
                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            style={{ background: "linear-gradient(to top, rgba(0,212,255,0.25) 0%, transparent 60%)" }}
                          />
                          {/* Country badge */}
                          <span
                            className="absolute top-2 left-2 font-sans text-[9px] uppercase tracking-widest px-1.5 py-0.5"
                            style={{ background: "rgba(7,11,20,0.80)", border: "1px solid rgba(0,212,255,0.20)", color: "#00d4ff" }}
                          >
                            {film.country.split(" / ")[0]}
                          </span>
                        </div>
                        {/* Info */}
                        <h4 className="font-display text-base md:text-lg font-semibold text-white leading-snug line-clamp-2 mb-1.5 group-hover:text-plasma transition-colors">
                          {film.title}
                        </h4>
                        <p className="font-sans text-xs md:text-sm" style={{ color: 'rgba(255,255,255,0.60)' }}>
                          Dir. {film.technical_sheet.direction}
                        </p>
                        <p className="font-sans text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.45)' }}>
                          {film.technical_sheet.duration_minutes} min
                          {film.technical_sheet.rating && ` · ${film.technical_sheet.rating}`}
                        </p>
                      </article>
                    </Link>
                  ))}
                </div>
              </details>
            ));
          })()}
        </section>
      )}

      {/* ── 4. OBRAS / CATÁLOGO ──────────────────────────────────────── */}
      {works.length > 0 && (
        <section className="mt-16">
          <h2 className="font-display text-3xl text-white mb-2 border-b border-white/20 pb-4">
            {t("works_heading")}
          </h2>
          {sectionOrder
            .filter((s) => (worksBySection[s]?.length ?? 0) > 0)
            .map((section) => (
              <div key={section} className="mb-12 pt-6">
                <h3 className="text-xs uppercase tracking-widest text-plasma mb-6">{(SECTION_LABELS_LOCALIZED[locale] || SECTION_LABELS_LOCALIZED.es)[section] || section}</h3>
                <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                  {worksBySection[section]!.map((work) => <WorkCard key={work.id} work={work} />)}
                </div>
              </div>
            ))}
        </section>
      )}

      {/* ── 5. SEDES ─────────────────────────────────────────────────── */}
      {(mvdVenues.length > 0 || interiorVenues.length > 0) && (
        <section className="mt-16">
          <h2 className="font-display text-3xl text-white mb-2 border-b border-white/20 pb-4">
            {t("venues_heading")}
          </h2>

          {/* Montevideo */}
          {mvdVenues.length > 0 && (
            <div className="mb-12 pt-6">
              <h3
                className="font-display text-plasma leading-none mb-8"
                style={{ fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)", borderBottom: "1px solid rgba(0,212,255,0.2)", paddingBottom: "0.5rem" }}
              >
                {t("montevideo_heading")}
              </h3>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {mvdVenues.map((v: Venue) => <VenueCard key={v.id} v={v} t={t} locale={locale} getScheduleLines={getScheduleLines} getShortDesc={getShortDesc} getDepartment={getDepartment} />)}
              </div>
            </div>
          )}

          {/* Interior */}
          {interiorVenues.length > 0 && (
            <div className="mb-10">
              <h3
                className="font-display text-nova leading-none mb-8"
                style={{ fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)", borderBottom: "1px solid rgba(162,89,247,0.2)", paddingBottom: "0.5rem" }}
              >
                {t("interior_heading")}
              </h3>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {interiorVenues.map((v: Venue) => <VenueCard key={v.id} v={v} t={t} locale={locale} getScheduleLines={getScheduleLines} getShortDesc={getShortDesc} getDepartment={getDepartment} />)}
              </div>
            </div>
          )}

          {/* Pending */}
          {pendingVenues.length > 0 && (
            <div className="pt-2">
              <p className="text-[10px] uppercase tracking-widest text-text-muted mb-4">
                {t("venues_pending_heading")}
              </p>
              <div className="flex flex-wrap gap-3">
                {pendingVenues.map((v: Venue) => (
                  <div
                    key={v.id}
                    className="px-4 py-3"
                    style={{ border: "1px solid rgba(255,255,255,0.07)" }}
                  >
                    <p className="text-[0.875rem] text-text-secondary">{v.name}</p>
                    {v.address && (
                      <p className="text-xs text-text-muted mt-0.5 flex items-center gap-1">
                        <span>📍</span>{v.address}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      {/* ── 6. EVENTOS ESPECIALES / PREMIOS ──────────────────────────── */}
      <section className="mt-16">
        <h2 className="font-display text-3xl text-white mb-2 border-b border-white/20 pb-4">
          {t("special_events_heading")}
        </h2>
        <div
          className="flex flex-col sm:flex-row gap-6 p-8 mt-6"
          style={{ background: 'linear-gradient(135deg, rgba(162,89,247,0.08) 0%, rgba(0,212,255,0.05) 100%)', border: '1px solid rgba(162,89,247,0.20)' }}
        >
          <div
            className="flex-shrink-0 w-16 h-16 flex items-center justify-center overflow-hidden"
            style={{ background: 'rgba(0,0,0,0.35)', border: '1px solid rgba(162,89,247,0.35)' }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logos/logo-main.png.png" alt="MVF" className="w-10 h-10 object-contain" />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest text-nova mb-2">
              {t("special_events_heading")}
            </p>
            <h3 className="font-display text-2xl text-white mb-1">{t("awards_ceremony_title")}</h3>
            <p className="text-[0.875rem] text-plasma font-mono tracking-wide mb-1">{t("awards_ceremony_date")}</p>
            <p className="text-[0.875rem] text-text-secondary">{t("awards_ceremony_venue")}</p>
            <p className="text-xs text-text-muted mt-3 max-w-lg leading-relaxed">{t("awards_ceremony_desc")}</p>
          </div>
        </div>
      </section>
    </div>
  );
}

