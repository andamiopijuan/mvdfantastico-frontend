
export async function generateStaticParams() {
  return [];
}

import { redirect } from "next/navigation";

interface PageProps {
  params: { locale: string; year: string; slug: string };
}

export default function ArchiveSlugRedirectPage({ params }: PageProps) {
  redirect(`/${params.locale}/archivo/${params.year}/${params.slug}`);
}