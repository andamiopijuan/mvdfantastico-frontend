import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import type { Edition } from "@/lib/types";
import QuizCTA from "@/components/common/QuizCTA";

const EDITION_16_DESCRIPTION_ES =
  "El Festival Montevideo Fantástico celebra su decimosexta edición del 8 de mayo al 28 de junio de 2026 en distintas salas de Montevideo y el interior del país. Desde 2005, el festival funciona como un espacio dedicado al cine de terror, fantasía y ciencia ficción, con foco en producciones independientes y ultraindependientes que circulan por fuera de los circuitos tradicionales.\n\nA lo largo de la semana se presentará una selección de cortometrajes, mediometrajes y largometrajes internacionales, junto con funciones especiales y actividades en distintos barrios. La propuesta busca acercar al público obras que exploran el género desde perspectivas diversas, con un criterio de curación centrado en la originalidad y la libertad creativa.\n\nEl festival se desarrolla en articulación con centros culturales y espacios públicos, apostando por el acceso y la circulación del cine fantástico en Uruguay. La grilla completa y los detalles de cada función serán publicados próximamente.";

const EDITION_16_DESCRIPTION_EN =
  "Montevideo Fantástico celebrates its 16th edition from May 8 to June 28, 2026, at venues across Montevideo and the rest of Uruguay. Since 2005, the festival has operated as a dedicated space for horror, fantasy and science fiction cinema, with a focus on independent and ultra-independent productions that circulate outside traditional distribution circuits.\n\nThroughout the week, a selection of international short films, medium-length films and features will be presented, alongside special screenings and events across different neighbourhoods. The programme aims to bring audiences works that explore genre cinema from diverse perspectives, with a curatorial emphasis on originality and creative freedom.\n\nThe festival develops in partnership with cultural centres and public spaces, committed to making fantastic cinema accessible and widely circulated in Uruguay. The full schedule and details for each screening will be published shortly.";

const EDITION_16_DESCRIPTION_PT =
  "O Festival Montevideo Fantástico celebra sua décima sexta edição de 8 de maio a 28 de junho de 2026 em diferentes salas de Montevidéu e do interior do país. Desde 2005, o festival funciona como um espaço dedicado ao cinema de terror, fantasia e ficção científica, com foco em produções independentes e ultra-independentes que circulam fora dos circuitos tradicionais.\n\nAo longo da semana será apresentada uma seleção de curtas, médias e longas-metragens internacionais, junto com sessões especiais e atividades em diferentes bairros. A proposta busca aproximar o público de obras que exploram o gênero a partir de perspectivas diversas, com um critério de curadoria centrado na originalidade e na liberdade criativa.\n\nO festival se desenvolve em articulação com centros culturais e espaços públicos, apostando no acesso e na circulação do cinema fantástico no Uruguai. A grade completa e os detalhes de cada sessão serão publicados em breve.";

const EDITION_ORDINAL: Record<string, string> = {
  es: "16ª edición",
  en: "16th edition",
  pt: "16ª edição",
};

interface CurrentEditionHighlightProps {
  edition: Edition;
}

export default function CurrentEditionHighlight({ edition }: CurrentEditionHighlightProps) {
  const t = useTranslations("home.highlight");
  const locale = useLocale();

  const dateLabel = `${new Date(edition.start_date + "T12:00:00").toLocaleDateString(locale, {
    day: "numeric",
    month: "long",
  })} — ${new Date(edition.end_date + "T12:00:00").toLocaleDateString(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  })}`;

  // Use optimised WebP for XVI (API returns heavy PNG; WebP is 136 KB vs 12 MB)
  const posterSrc =
    edition.number === 16
      ? "/media/editions/xvi-poster.webp"
      : edition.key_visual || edition.poster || "";
  const description =
    edition.number === 16 && locale === "es"
      ? EDITION_16_DESCRIPTION_ES
      : edition.number === 16 && locale === "en"
      ? EDITION_16_DESCRIPTION_EN
      : edition.number === 16 && locale === "pt"
      ? EDITION_16_DESCRIPTION_PT
      : locale === "en"
      ? edition.description_en || edition.description_es
      : locale === "pt"
      ? edition.description_pt || edition.description_es
      : edition.description_es;

  return (
    <section className="section-padding border-y border-white/5">
      <div className="container-wide">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-start">

          {/* Poster — natural aspect ratio, constrained on mobile */}
          <div className="md:col-span-4 w-full max-w-[250px] mx-auto md:max-w-none">
            {posterSrc ? (
              // eslint-disable-next-line @next/next/no-img-element
              <>
                <img
                  src={posterSrc}
                  alt={`${edition.name} poster`}
                  className="w-full h-auto block"
                />
                {edition.number === 16 && (
                  <p className="font-sans text-xs mt-2 text-center tracking-wide" style={{ color: 'rgba(255,255,255,0.55)' }}>
                    Afiche: Exequiel Rodríguez
                  </p>
                )}
              </>
            ) : (              <div
                className="flex items-center justify-center bg-elevated"
                style={{ aspectRatio: '2/3' }}
              >
                <span
                  className="font-display leading-none"
                  style={{ fontSize: 'clamp(4rem,10vw,8rem)', color: 'transparent', WebkitTextStroke: '1px rgba(0,212,255,0.18)' }}
                >
                  {edition.year}
                </span>
              </div>
            )}
            <QuizCTA locale={locale} />
          </div>

          {/* Editorial info block */}
          <div className="md:col-span-8 pt-2">
            <p className="font-sans text-[10px] tracking-[0.35em] uppercase text-plasma mb-6 font-medium">
              {t("label")}
            </p>

            {edition.number === 16 && (
              <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-white/70 font-medium mb-2">
                {EDITION_ORDINAL[locale] ?? EDITION_ORDINAL.es}
              </p>
            )}

            <h2
              className="font-display text-text-primary mb-8 leading-none"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)" }}
            >
              {edition.name}
            </h2>

            <span className="rule-red" />

            <dl className="grid grid-cols-2 gap-y-5 gap-x-8 mb-10 max-w-sm">
              <div>
                <dt className="font-sans text-[9px] tracking-widest uppercase text-text-muted font-medium mb-1">
                  {t("year_label")}
                </dt>
                <dd className="font-display text-2xl text-text-primary">{edition.year}</dd>
              </div>
              <div>
                <dt className="font-sans text-[9px] tracking-widest uppercase text-text-muted font-medium mb-1">
                  {t("dates_label")}
                </dt>
                <dd className="font-sans text-sm text-white/80 font-light">{dateLabel}</dd>
              </div>
            </dl>

            {description && (
              <div className="mb-10 max-w-lg space-y-4">
                {description.split("\n\n").map((para, i) => (
                  <p key={i} className="font-sans text-base text-white/85 leading-relaxed font-light">
                    {para}
                  </p>
                ))}
              </div>
            )}

            <Link href={`/${locale}/${locale === 'es' ? 'edicion' : 'edition'}`} className="btn-primary">
              {t("cta")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

