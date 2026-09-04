import Image from "next/image";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

export const metadata: Metadata = { title: "Acerca del Festival — Montevideo Fantástico" };

export function generateStaticParams() {
  return [
    { locale: "es" },
    { locale: "en" },
    { locale: "pt" },
  ];
}

// Static team data — photos live in public/media/about/
const INSTAGRAM_HANDLES: Record<string, string> = {
  "Alejandro Yamgotchian": "aleyamgocine",
  "Juan Pablo Aguirre": "wilmar_everton",
  "Patricia Curbelo": "patri_curb",
  "Enrique Puig": "enriquepuigf",
  "Federico Cardozo": "ffromhell",
  "Bruno Otheguy": "bmotheguy",
  "Pablo Saldivia": "pablo.sandor",
};

const TEAM_ROLES_I18N: Record<string, Record<string, string>> = {
  es: {
    "Alejandro Yamgotchian": "Dirección y programación",
    "Juan Pablo Aguirre": "Producción, organización y sitio web",
    "Patricia Curbelo": "Producción, organización y coordinación de salas",
    "Enrique Puig": "Selección",
    "Federico Cardozo": "Selección",
    "Bruno Otheguy": "Selección",
    "Pablo Saldivia": "Selección",
    selectionSuffix: "— Cortometrajes y mediometrajes",
  },
  en: {
    "Alejandro Yamgotchian": "Direction and programming",
    "Juan Pablo Aguirre": "Production, organization and website",
    "Patricia Curbelo": "Production, organization and venue coordination",
    "Enrique Puig": "Selection",
    "Federico Cardozo": "Selection",
    "Bruno Otheguy": "Selection",
    "Pablo Saldivia": "Selection",
    selectionSuffix: "— short films and medium-length films",
  },
  pt: {
    "Alejandro Yamgotchian": "Direção e programação",
    "Juan Pablo Aguirre": "Produção, organização e site",
    "Patricia Curbelo": "Produção, organização e coordenação de salas",
    "Enrique Puig": "Seleção",
    "Federico Cardozo": "Seleção",
    "Bruno Otheguy": "Seleção",
    "Pablo Saldivia": "Seleção",
    selectionSuffix: "— curtas e médias-metragens",
  },
};

const TEAM_CORE = [
  { name: "Alejandro Yamgotchian", role: "Dirección y programación",                    photo: "/media/about/Alejandro Yamgotchian.jpg" },
  { name: "Juan Pablo Aguirre",    role: "Producción, organización y sitio web",         photo: "/media/about/Juan Pablo Aguirre.jpg" },
  { name: "Patricia Curbelo",      role: "Producción, organización y coordinación",      photo: "/media/about/Patricia Curbelo.jpg" },
];

const TEAM_SELECTION = [
  { name: "Enrique Puig",     role: "Selección",  photo: "/media/about/Enrique Puig.jpg" },
  { name: "Federico Cardozo", role: "Selección",  photo: "/media/about/Federico Cardozo.jpg" },
  { name: "Bruno Otheguy",    role: "Selección",  photo: "/media/about/Bruno Otheguy.jpg" },
  { name: "Pablo Saldivia",   role: "Selección",  photo: "/media/about/Pablo Saldivia.jpg" },
];

export default async function AcercaPage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  const t = await getTranslations("acerca");
  const teamRoles = TEAM_ROLES_I18N[params.locale] ?? TEAM_ROLES_I18N.es;

  return (
    <div className="container-wide section-padding">
      {/* Page header */}
      <div className="mb-16">
        <p className="text-xs uppercase tracking-widest text-plasma mb-4">{t("label")}</p>
        <h1 className="font-display text-5xl md:text-7xl text-white leading-none mb-6">
          {t("title_line1")}<br />{t("title_line2")}
        </h1>
        <div className="h-px w-16 bg-plasma mb-8" />
        <p className="text-text-secondary text-lg max-w-xl leading-relaxed">
          {t("subtitle")}
        </p>
      </div>

      <div className="space-y-20 max-w-3xl">
        {/* Overview / Presentación */}
        <section>
          <h2 className="font-display text-3xl text-white mb-6 border-l-4 border-plasma pl-5">
            {t("overview_heading")}
          </h2>
          <div className="space-y-4">
            {t("overview_text").split("\n\n").map((para, i) => (
              <p key={i} className="text-text-secondary leading-relaxed text-base">
                {para}
              </p>
            ))}
          </div>
        </section>

        {/* Identity */}
        <section>
          <h2 className="font-display text-3xl text-white mb-6 border-l-4 border-nova pl-5">
            {t("identity_heading")}
          </h2>
          <div className="space-y-4">
            {t("identity_text").split("\n\n").map((para, i) => (
              <p key={i} className="text-text-secondary leading-relaxed text-base">
                {para}
              </p>
            ))}
          </div>
        </section>

        {/* History — only render if content is defined */}
        {t("history_text") && (
        <section>
          <h2 className="font-display text-3xl text-white mb-6 border-l-4 border-plasma pl-5">
            {t("history_heading")}
          </h2>
          <div className="space-y-4">
            {t("history_text").split("\n\n").map((para, i) => (
              <p key={i} className="text-text-secondary leading-relaxed text-base">
                {para}
              </p>
            ))}
          </div>
        </section>
        )}
      </div>

      {/* Team */}
      <section className="mt-20 max-w-4xl">
        <h2 className="font-display text-3xl text-white mb-10 border-l-4 border-nova pl-5">
          {t("team_heading")}
        </h2>

        {/* Core team */}
        <p className="font-sans text-xs uppercase tracking-widest font-semibold mb-6"
          style={{ color: "rgba(0,212,255,0.70)" }}>
          {t("team_core_heading")}
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-5 mb-12">
          {TEAM_CORE.map((member) => (
            <div
              key={member.name}
              className="group"
              style={{ border: "1px solid rgba(0,212,255,0.10)" }}
            >
              <div className="relative overflow-hidden" style={{ aspectRatio: "1/1" }}>
                <Image
                  src={member.photo}
                  alt={member.name}
                  fill
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 50vw, 33vw"
                />
              </div>
              <div className="p-4">
                <p className="text-white text-sm font-semibold leading-snug">{member.name}</p>
                <p className="text-text-secondary text-xs mt-1 leading-relaxed">{teamRoles[member.name] ?? member.role}</p>
                {INSTAGRAM_HANDLES[member.name] && (
                  <a href={`https://instagram.com/${INSTAGRAM_HANDLES[member.name]}`} target="_blank" rel="noopener noreferrer" className="font-sans text-sm mt-1 block hover:text-plasma transition-colors" style={{ color: "rgba(0,212,255,0.65)" }}>
                    @{INSTAGRAM_HANDLES[member.name]}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Selection team */}
        <p className="font-sans text-xs uppercase tracking-widest font-semibold mb-6"
          style={{ color: "rgba(0,212,255,0.70)" }}>
          {t("team_selection_heading")} {teamRoles.selectionSuffix as string}
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
          {TEAM_SELECTION.map((member) => (
            <div
              key={member.name}
              className="group"
              style={{ border: "1px solid rgba(0,212,255,0.08)" }}
            >
              <div className="relative overflow-hidden" style={{ aspectRatio: "1/1" }}>
                <Image
                  src={member.photo}
                  alt={member.name}
                  fill
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 50vw, 25vw"
                />
              </div>
              <div className="p-3">
                <p className="text-white text-sm font-semibold leading-snug">{member.name}</p>
                <p className="text-text-secondary text-xs mt-0.5">{teamRoles[member.name] ?? member.role}</p>
                {INSTAGRAM_HANDLES[member.name] && (
                  <a href={`https://instagram.com/${INSTAGRAM_HANDLES[member.name]}`} target="_blank" rel="noopener noreferrer" className="font-sans text-sm mt-1 block hover:text-plasma transition-colors" style={{ color: "rgba(0,212,255,0.65)" }}>
                    @{INSTAGRAM_HANDLES[member.name]}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
