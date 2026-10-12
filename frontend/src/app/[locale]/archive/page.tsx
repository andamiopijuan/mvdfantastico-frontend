import { redirect } from "next/navigation";
import { compatibilityMetadata } from "@/lib/seo";

export function generateMetadata({ params }: { params: { locale: string } }) {
  return compatibilityMetadata(params.locale, "/archivo/");
}

interface PageProps {
  params: { locale: string };
}

export function generateStaticParams() {
  return [{ locale: "es" }, { locale: "en" }, { locale: "pt" }];
}

export default function ArchiveRedirectPage({ params }: PageProps) {
  redirect(`/${params.locale}/archivo`);
}
