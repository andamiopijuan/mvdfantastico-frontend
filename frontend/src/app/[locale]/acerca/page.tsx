import { getTeamMembers } from "@/lib/api";
import Image from "next/image";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export const metadata: Metadata = { title: "Acerca del Festival — Montevideo Fantástico" };

export default async function AcercaPage() {
  const t = await getTranslations("acerca");
  let members: Awaited<ReturnType<typeof getTeamMembers>> = [];
  try {
    members = await getTeamMembers();
  } catch {
    // no team members
  }

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

      {/* Team — always rendered, shows structure even without full data */}
      <section className="mt-20 max-w-4xl">
        <h2 className="font-display text-3xl text-white mb-10 border-l-4 border-nova pl-5">
          {t("team_heading")}
        </h2>

        {members.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {members.map((member) => (
              <div
                key={member.id}
                className="group text-center"
                style={{ border: "1px solid rgba(0,212,255,0.07)" }}
              >
                <div className="relative overflow-hidden" style={{ aspectRatio: "1/1" }}>
                  {member.photo ? (
                    <Image
                      src={member.photo}
                      alt={member.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div
                      className="absolute inset-0 flex items-center justify-center"
                      style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(162,89,247,0.12) 0%, transparent 70%)" }}
                    >
                      <span className="font-display text-3xl" style={{ color: "rgba(0,212,255,0.2)" }}>
                        {member.name.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-3">
                  <p className="text-text-primary text-sm font-medium">{member.name}</p>
                  <p className="text-text-secondary text-xs mt-0.5">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Structural fallback — role list when no member records exist */
          <div className="grid gap-px" style={{ border: "1px solid rgba(0,212,255,0.08)" }}>
            {[
              { role: "Dirección", desc: "Dirección general del festival" },
              { role: "Producción", desc: "Coordinación y producción ejecutiva" },
              { role: "Programación", desc: "Selección y curaduría de films" },
              { role: "Preselección", desc: "Evaluación y preselección de envíos" },
              { role: "Comunicación", desc: "Prensa y redes sociales" },
            ].map(({ role, desc }) => (
              <div
                key={role}
                className="flex items-center gap-6 px-6 py-5"
                style={{ borderBottom: "1px solid rgba(0,212,255,0.06)" }}
              >
                <div
                  className="w-10 h-10 flex-shrink-0 flex items-center justify-center"
                  style={{ background: "rgba(0,212,255,0.05)", border: "1px solid rgba(0,212,255,0.12)" }}
                >
                  <span className="font-display text-xs text-plasma">
                    {role.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="text-white text-sm font-medium">{role}</p>
                  <p className="text-text-muted text-xs mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
