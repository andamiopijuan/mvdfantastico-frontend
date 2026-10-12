import { notFound, redirect } from "next/navigation";
import { getWorkCompatIds, getWorkRedirectPath } from "@/lib/archive";
import { compatibilityMetadata } from "@/lib/seo";

const STATIC_LOCALES = ["es", "en", "pt"] as const;

// Frozen legacy /works/<id> URLs (src/data/archive/compat.json); no API.
export function generateStaticParams() {
  return STATIC_LOCALES.flatMap((locale) =>
    getWorkCompatIds().map((id) => ({ locale, id: String(id) }))
  );
}
export const dynamicParams = false;

interface PageProps {
  params: { locale: string; id: string };
}

export function generateMetadata({ params }: PageProps) {
  const target = getWorkRedirectPath(params.locale, Number(params.id));
  return target ? compatibilityMetadata(params.locale, `${target.slice(params.locale.length + 1)}/`) : {};
}

export default function WorkRedirectPage({ params }: PageProps) {
  const target = getWorkRedirectPath(params.locale, Number(params.id));
  if (!target) notFound();
  redirect(target);
}
