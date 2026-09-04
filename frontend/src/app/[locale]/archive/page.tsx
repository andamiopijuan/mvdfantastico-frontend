import { redirect } from "next/navigation";

interface PageProps {
  params: { locale: string };
}

export function generateStaticParams() {
  return [{ locale: "es" }, { locale: "en" }, { locale: "pt" }];
}

export default function ArchiveRedirectPage({ params }: PageProps) {
  redirect(`/${params.locale}/archivo`);
}
