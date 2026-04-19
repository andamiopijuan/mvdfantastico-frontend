"use client";
import Image from "next/image";
import { useState, useCallback } from "react";
import { useTranslations, useLocale } from "next-intl";

type SlideLabel = { es: string; en: string; pt: string };

const SLIDES: Array<{ src: string; alt: string; labels: SlideLabel }> = [
  {
    src: "/media/home/featured/awards-02.jpg",
    alt: "Festival awards ceremony",
    labels: { es: "Ceremonia de Premios", en: "Awards Ceremony", pt: "Cerimônia de Prêmios" },
  },
  {
    src: "/media/home/preprocessed/M18.jpg",
    alt: "Festival presenter",
    labels: { es: "El Festival", en: "The Festival", pt: "O Festival" },
  },
  {
    src: "/media/home/preprocessed/M6.jpg",
    alt: "Festival guests and performers",
    labels: { es: "Invitados", en: "Festival Guests", pt: "Convidados" },
  },
  {
    src: "/media/home/featured/awards-03.jpg",
    alt: "Festival on stage",
    labels: { es: "En Escena", en: "On Stage", pt: "Em Cena" },
  },
  {
    src: "/media/home/preprocessed/Insta-2.jpg",
    alt: "Festival behind the scenes",
    labels: { es: "Detrás de Escena", en: "Behind the Scenes", pt: "Bastidores" },
  },
  {
    src: "/media/home/preprocessed/M9.jpg",
    alt: "Festival talk",
    labels: { es: "Charlas", en: "Talks", pt: "Palestras" },
  },
  {
    src: "/media/home/preprocessed/M4.jpg",
    alt: "Film competition",
    labels: { es: "Competencia", en: "Competition", pt: "Competição" },
  },
  {
    src: "/media/home/preprocessed/Insta-3.jpg",
    alt: "Festival audience and atmosphere",
    labels: { es: "El Público", en: "The Audience", pt: "O Público" },
  },
  {
    src: "/media/home/preprocessed/M44.jpg",
    alt: "Festival activities",
    labels: { es: "Actividades", en: "Activities", pt: "Atividades" },
  },
  {
    src: "/media/home/preprocessed/M7.jpg",
    alt: "Festival guests",
    labels: { es: "Invitados", en: "Guests", pt: "Convidados" },
  },
  {
    src: "/media/home/preprocessed/Insta-5.jpg",
    alt: "Genre cinema culture",
    labels: { es: "Cine de Género", en: "Genre Cinema", pt: "Cinema de Gênero" },
  },
  {
    src: "/media/home/featured/awards-01.jpg",
    alt: "Talks and panels",
    labels: { es: "Encuentros y Debate", en: "Talks & Panels", pt: "Encontros e Debates" },
  },
  {
    src: "/media/home/preprocessed/M2.jpg",
    alt: "Festival atmosphere",
    labels: { es: "Atmósfera", en: "Atmosphere", pt: "Atmosfera" },
  },
  {
    src: "/media/home/preprocessed/Insta-7.jpg",
    alt: "Festival community",
    labels: { es: "Comunidad", en: "Community", pt: "Comunidade" },
  },
  {
    src: "/media/home/preprocessed/M12.jpg",
    alt: "Festival award winners",
    labels: { es: "Premiados", en: "Award Winners", pt: "Premiados" },
  },
  {
    src: "/media/home/preprocessed/M11.jpg",
    alt: "Festival screenings",
    labels: { es: "Proyecciones", en: "Screenings", pt: "Sessões" },
  },
  {
    src: "/media/home/preprocessed/Insta-8.jpg",
    alt: "Festival night out",
    labels: { es: "Noche de Festival", en: "Festival Night", pt: "Noite de Festival" },
  },
  {
    src: "/media/home/preprocessed/M15.jpg",
    alt: "Festival programme",
    labels: { es: "Programación", en: "Programme", pt: "Programação" },
  },
  {
    src: "/media/home/preprocessed/Insta-4.jpg",
    alt: "Festival theatrical performance",
    labels: { es: "En Escena", en: "On Stage", pt: "Em Cena" },
  },
  {
    src: "/media/home/preprocessed/M3.jpg",
    alt: "Festival venue",
    labels: { es: "Las Sedes", en: "Venues", pt: "Os Locais" },
  },
];

export default function VideoSection() {
  const t = useTranslations("video");
  const locale = useLocale() as "es" | "en" | "pt";
  const [active, setActive] = useState(0);

  const prev = useCallback(() => setActive((i) => (i - 1 + SLIDES.length) % SLIDES.length), []);
  const next = useCallback(() => setActive((i) => (i + 1) % SLIDES.length), []);

  return (
    <section className="section-padding">
      <div className="container-wide">
        <p className="font-sans text-[10px] tracking-[0.35em] uppercase text-plasma mb-6 font-medium">
          {t("eyebrow")}
        </p>

        <div
          className="overflow-hidden"
          style={{ border: "1px solid rgba(0,212,255,0.15)" }}
        >
          {/* Slider — natural 16:9, zero forced-height crop */}
          <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
            {SLIDES.map((slide, i) => (
              <div
                key={slide.src}
                className="absolute inset-0 transition-opacity duration-700"
                style={{ opacity: i === active ? 1 : 0, pointerEvents: i === active ? "auto" : "none" }}
              >
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  className="object-contain"
                  loading={i === 0 ? "eager" : "lazy"}
                  sizes="(max-width: 768px) 100vw, 100vw"
                />
              </div>
            ))}

            {/* Bottom fade */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: "linear-gradient(to bottom, transparent 55%, rgba(7,11,20,0.95) 100%)" }}
            />

            {/* Slide label */}
            <div className="absolute bottom-6 left-8">
              <p
                className="font-display text-white leading-none"
                style={{ fontSize: "clamp(1.5rem, 4vw, 2.75rem)", textShadow: "0 2px 16px rgba(0,0,0,0.8)" }}
              >
                {SLIDES[active].labels[locale] || SLIDES[active].labels.es}
              </p>
            </div>

            {/* Navigation arrows */}
            <button
              onClick={prev}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-9 h-9 transition-colors"
              style={{ background: "rgba(7,11,20,0.55)", border: "1px solid rgba(0,212,255,0.25)" }}
            >
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4 text-white" aria-hidden="true">
                <path d="M10 3L5 8l5 5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              onClick={next}
              aria-label="Next image"
              className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-9 h-9 transition-colors"
              style={{ background: "rgba(7,11,20,0.55)", border: "1px solid rgba(0,212,255,0.25)" }}
            >
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4 text-white" aria-hidden="true">
                <path d="M6 3l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {/* Dot indicators */}
            <div className="absolute bottom-4 right-6 flex items-center gap-2">
              {SLIDES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  aria-label={`Image ${i + 1}`}
                  className="transition-all duration-300"
                  style={{
                    width: i === active ? "1.5rem" : "0.375rem",
                    height: "0.375rem",
                    background: i === active ? "#00d4ff" : "rgba(255,255,255,0.35)",
                    border: "none",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Text row */}
          <div
            className="px-8 py-7"
            style={{
              background: "linear-gradient(135deg, rgba(0,212,255,0.04) 0%, rgba(162,89,247,0.06) 100%)",
              borderTop: "1px solid rgba(0,212,255,0.12)",
            }}
          >
            <p className="font-sans text-base text-text-secondary leading-relaxed font-light max-w-lg">
              {t("description")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

