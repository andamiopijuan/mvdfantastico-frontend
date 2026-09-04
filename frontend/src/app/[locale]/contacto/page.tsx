import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import SocialLinks from "@/components/home/SocialLinks";

export const metadata: Metadata = {
  title: "Contacto — Montevideo Fantástico",
};

export function generateStaticParams() {
  return [{ locale: "es" }, { locale: "en" }, { locale: "pt" }];
}

const COPY: Record<string, {
  eyebrow: string;
  heading: string;
  desc: string;
  emailLabel: string;
  submissionHeading: string;
  submissionDesc: string;
  filmfreeway: string;
  festhome: string;
}> = {
  es: {
    eyebrow: "Contacto",
    heading: "CONTACTO",
    desc: "Para consultas de cineastas, prensa, espacios culturales y colaboradores, escribinos directamente.",
    emailLabel: "Correo electrónico",
    submissionHeading: "Inscripción de películas",
    submissionDesc: "Las inscripciones para el festival se realizan exclusivamente a través de las siguientes plataformas:",
    filmfreeway: "FilmFreeway",
    festhome: "Festhome",
  },
  en: {
    eyebrow: "Contact",
    heading: "CONTACT",
    desc: "For enquiries from filmmakers, press, cultural venues and collaborators, write to us directly.",
    emailLabel: "Email",
    submissionHeading: "Film submissions",
    submissionDesc: "Film submissions for the festival are accepted exclusively through the following platforms:",
    filmfreeway: "FilmFreeway",
    festhome: "Festhome",
  },
  pt: {
    eyebrow: "Contato",
    heading: "CONTATO",
    desc: "Para consultas de cineastas, imprensa, espaços culturais e colaboradores, escreva diretamente para nós.",
    emailLabel: "E-mail",
    submissionHeading: "Inscrição de filmes",
    submissionDesc: "As inscrições para o festival são realizadas exclusivamente pelas seguintes plataformas:",
    filmfreeway: "FilmFreeway",
    festhome: "Festhome",
  },
};

export default async function ContactoPage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  const locale = params.locale;
  const copy = COPY[locale] ?? COPY.es;

  return (
    <div className="container-wide section-padding">
      <div className="max-w-xl">
        <p
          className="font-sans text-[10px] uppercase tracking-[0.35em] mb-4"
          style={{ color: "#00d4ff" }}
        >
          {copy.eyebrow}
        </p>
        <h1 className="font-display text-5xl md:text-7xl text-white leading-none mb-8">
          {copy.heading}
        </h1>
        <div className="h-px w-16 mb-8" style={{ background: "rgba(0,212,255,0.40)" }} />

        <p
          className="font-sans text-base leading-relaxed mb-10"
          style={{ color: "rgba(255,255,255,0.72)" }}
        >
          {copy.desc}
        </p>

        {/* Email */}
        <div
          className="mb-10 p-6"
          style={{ border: "1px solid rgba(0,212,255,0.20)", borderLeft: "3px solid #00d4ff" }}
        >
          <p
            className="font-sans text-[10px] uppercase tracking-widest mb-2"
            style={{ color: "rgba(0,212,255,0.55)" }}
          >
            {copy.emailLabel}
          </p>
          <a
            href="mailto:montevideofan@gmail.com"
            className="font-display text-2xl text-white hover:text-plasma transition-colors"
          >
            montevideofan@gmail.com
          </a>
        </div>

        {/* Submission platforms */}
        <div className="mb-10">
          <h2
            className="font-display text-2xl text-white mb-3"
            style={{ borderBottom: "1px solid rgba(0,212,255,0.12)", paddingBottom: "0.5rem" }}
          >
            {copy.submissionHeading}
          </h2>
          <p
            className="font-sans text-sm mb-5"
            style={{ color: "rgba(255,255,255,0.55)" }}
          >
            {copy.submissionDesc}
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="https://filmfreeway.com/MontevideoFantastico"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-sans text-xs uppercase tracking-widest font-bold px-5 py-2.5 text-void transition-opacity hover:opacity-90"
              style={{ background: "linear-gradient(135deg, #00d4ff, #a259f7)" }}
            >
              {copy.filmfreeway}
            </a>
            <a
              href="https://filmmakers.festhome.com/es/festival/montevideo-fantastico"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-sans text-xs uppercase tracking-widest font-bold px-5 py-2.5 transition-colors"
              style={{ border: "1px solid rgba(0,212,255,0.40)", color: "rgba(0,212,255,0.90)" }}
            >
              {copy.festhome}
            </a>
          </div>
        </div>
      </div>

      <SocialLinks />
    </div>
  );
}
