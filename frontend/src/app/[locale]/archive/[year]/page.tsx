import { ARCHIVE_EDITIONS } from "@/lib/archive";
import { redirect } from "next/navigation";

const STATIC_LOCALES = ["es", "en", "pt"] as const;

export function generateStaticParams() {
  return STATIC_LOCALES.flatMap((locale) =>
    ARCHIVE_EDITIONS.map((e) => ({ locale, year: String(e.year) }))
  );
}

interface PageProps {
  params: { locale: string; year: string };
}

export default function ArchiveYearRedirectPage({ params }: PageProps) {
  redirect(`/${params.locale}/archivo/${params.year}`);
}
