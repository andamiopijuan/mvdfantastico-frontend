import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { seoMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return [
    { locale: "es" },
    { locale: "en" },
    { locale: "pt" },
  ];
}

interface PageProps {
  params: { locale: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: "community" });
  return seoMetadata({ locale: params.locale, path: () => "/community/", title: `${t("title")} — Montevideo Fantástico`, description: t("coming_soon") });
}

export default async function CommunityPage({ params }: PageProps) {
  const t = await getTranslations({ locale: params.locale, namespace: "community" });
  return (
    <div className="container-wide section-padding space-y-16">
      <div>
        <p className="text-xs uppercase tracking-widest text-plasma mb-3">{t("eyebrow")}</p>
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-text-primary">
          {t("title")}
        </h1>
      </div>

      <p className="text-text-muted">{t("coming_soon")}</p>
    </div>
  );
}
