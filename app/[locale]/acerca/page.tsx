import Image from "next/image";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

export const metadata: Metadata = { title: "Acerca del Festival — Montevideo Fantástico" };

export default async function AcercaPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "acerca" });

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

      {/* Core team */}
      <section className="mt-20 max-w-4xl">
        <h2 className="font-display text-3xl text-white mb-10 border-l-4 border-nova pl-5">
          {t("team_core_heading")}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-20">
          {([
            { name: "Alejandro Yamgotchian", role: t("role_director"),    photo: "/media/about/Alejandro%20Yamgotchian.jpg" },
            { name: "Juan Pablo Aguirre",    role: t("role_producer"),     photo: "/media/about/Juan%20Pablo%20Aguirre.jpg" },
            { name: "Patricia Curbelo",      role: t("role_coordinator"), photo: "/media/about/Patricia%20Curbelo.jpg" },
          ] as Array<{ name: string; role: string; photo: string }>).map(({ name, role, photo }) => (
            <div
              key={name}
              className="group text-center"
              style={{ border: "1px solid rgba(0,212,255,0.07)" }}
            >
              <div className="relative overflow-hidden" style={{ aspectRatio: "3/4" }}>
                <Image
                  src={photo}
                  alt={name}
                  fill
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4">
                <p className="text-text-primary text-sm font-medium">{name}</p>
                <p className="text-text-secondary text-xs mt-1">{role}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Equipo de selección */}
        <h2 className="font-display text-3xl text-white mb-8 border-l-4 border-plasma pl-5">
          {t("team_selection_heading")}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {([
            { name: "Alejandro Yamgotchian", photo: "/media/about/Alejandro%20Yamgotchian.jpg" },
            { name: "Juan Pablo Aguirre",    photo: "/media/about/Juan%20Pablo%20Aguirre.jpg" },
            { name: "Enrique Puig",          photo: "/media/about/Enrique%20Puig.jpg" },
            { name: "Federico Cardozo",      photo: "/media/about/Federico%20Cardozo.jpg" },
            { name: "Bruno Otheguy",         photo: "/media/about/Bruno%20Otheguy.jpg" },
            { name: "Pablo Saldivia",        photo: "/media/about/Pablo%20Saldivia.jpg" },
          ] as Array<{ name: string; photo: string }>).map(({ name, photo }) => (
            <div
              key={name}
              className="group text-center"
              style={{ border: "1px solid rgba(0,212,255,0.07)" }}
            >
              <div className="relative overflow-hidden" style={{ aspectRatio: "1/1" }}>
                <Image
                  src={photo}
                  alt={name}
                  fill
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-3">
                <p className="text-text-primary text-sm font-medium">{name}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
