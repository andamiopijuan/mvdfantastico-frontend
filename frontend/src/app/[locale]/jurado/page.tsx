import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { JURY_SECTIONS_2026 } from "@/data/jury-2026";
import type { JuryMember } from "@/data/jury-2026";

// ── Localized page content ─────────────────────────────────────────────────

const PAGE_CONTENT = {
  es: {
    eyebrow: "JURADO",
    title: "Jurado Montevideo Fantástico XVI",
    intro:
      "El jurado de Montevideo Fantástico XVI está integrado por artistas, críticos, comunicadores, docentes, creadores audiovisuales y referentes culturales vinculados al cine, la música, la literatura y el arte.",
    metaTitle: "Jurado — Montevideo Fantástico XVI",
    metaDesc:
      "Conocé al jurado de Montevideo Fantástico XVI: referentes del cine, la crítica, la música, el arte y la cultura vinculados a las competencias de largometrajes, cortometrajes, mediometrajes y documentales.",
  },
  en: {
    eyebrow: "JURY",
    title: "Jury",
    intro:
      "The jury of Montevideo Fantástico XVI is made up of artists, critics, communicators, educators, audiovisual creators and cultural figures connected to cinema, music, literature and art.",
    metaTitle: "Jury — Montevideo Fantástico XVI",
    metaDesc:
      "Meet the jury of Montevideo Fantástico XVI: leading figures in cinema, criticism, music, art and culture connected to the feature film, short film, medium-length film and documentary competitions.",
  },
  pt: {
    eyebrow: "JÚRI",
    title: "Júri",
    intro:
      "O júri do Montevideo Fantástico XVI é integrado por artistas, críticos, comunicadores, docentes, criadores audiovisuais e referências culturais ligados ao cinema, à música, à literatura e à arte.",
    metaTitle: "Júri — Montevideo Fantástico XVI",
    metaDesc:
      "Conheça o júri do Montevideo Fantástico XVI: referências do cinema, da crítica, da música, da arte e da cultura ligadas às competições de longas-metragens, curtas-metragens, médias-metragens e documentários.",
  },
} as const;

type Locale = keyof typeof PAGE_CONTENT;

function getContent(locale: string) {
  return PAGE_CONTENT[(locale as Locale) in PAGE_CONTENT ? (locale as Locale) : "es"];
}

// ── Metadata ───────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const c = getContent(params.locale);
  return {
    title: c.metaTitle,
    description: c.metaDesc,
  };
}

// ── Jury card ──────────────────────────────────────────────────────────────

function JuryCard({ member, locale }: { member: JuryMember; locale: string }) {
  const bio = member.bio[(locale as Locale) in member.bio ? (locale as Locale) : "es"];

  return (
    <article
      className="flex flex-col sm:flex-row overflow-hidden"
      style={{ border: "1px solid rgba(0,212,255,0.12)" }}
    >
      {/* Photo — full-width 240px on mobile; fixed 220×260px column on sm+ */}
      <div
        className="relative overflow-hidden flex-shrink-0 w-full h-[240px] sm:w-[220px] sm:h-[260px]"
        style={{ background: "#0c1220" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={member.image}
          alt={member.name}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: "center center" }}
        />
      </div>

      {/* Text */}
      <div className="flex flex-col flex-1 p-5 min-w-0">
        <h3 className="font-display text-lg text-white leading-tight mb-1">
          {member.name}
        </h3>
        {/* Accent rule below name */}
        <div
          className="mb-3 flex-shrink-0"
          style={{
            height: "2px",
            width: "2rem",
            background: "linear-gradient(90deg, #00d4ff, #a259f7)",
          }}
        />
        <p
          className="font-sans text-sm leading-relaxed"
          style={{ color: "rgba(255,255,255,0.72)" }}
        >
          {bio}
        </p>
      </div>
    </article>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────

export default async function JuradoPage({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = params;
  setRequestLocale(locale);

  const c = getContent(locale);

  return (
    <div className="container-wide section-padding">
      {/* Page header */}
      <div className="mb-16">
        <p className="text-xs uppercase tracking-widest text-plasma mb-4">
          {c.eyebrow}
        </p>
        <h1
          className="font-display text-white leading-none mb-6"
          style={{ fontSize: "clamp(2.5rem, 8vw, 5rem)" }}
        >
          {c.title}
        </h1>
        <div className="h-px w-16 bg-plasma mb-8" />
        <p
          className="text-lg max-w-2xl leading-relaxed"
          style={{ color: "rgba(255,255,255,0.80)" }}
        >
          {c.intro}
        </p>
      </div>

      {/* Jury sections */}
      {JURY_SECTIONS_2026.map((section) => {
        const sTitle =
          section.title[(locale as Locale) in section.title
            ? (locale as Locale)
            : "es"];
        const sSubtitle =
          section.subtitle[
            (locale as Locale) in section.subtitle ? (locale as Locale) : "es"
          ];

        return (
          <section key={section.id} className="mb-20">
            {/* Section header */}
            <div className="mb-10">
              <h2
                className="font-display text-white leading-none mb-2"
                style={{
                  fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
                  borderBottom: "1px solid rgba(0,212,255,0.20)",
                  paddingBottom: "0.75rem",
                }}
              >
                {sTitle}
              </h2>
              <p
                className="font-sans text-xs uppercase tracking-widest mt-3"
                style={{ color: "rgba(0,212,255,0.60)" }}
              >
                {sSubtitle}
              </p>
            </div>

            {/* Cards grid — 1 col stacked on mobile/tablet, 2 col horizontal on wide desktop */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {section.members.map((member) => (
                <JuryCard key={member.id} member={member} locale={locale} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
