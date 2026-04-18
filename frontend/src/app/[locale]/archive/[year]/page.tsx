import { redirect } from "next/navigation";

interface PageProps {
  params: { locale: string; year: string };
}

export default function ArchiveYearRedirectPage({ params }: PageProps) {
  redirect(`/${params.locale}/archivo/${params.year}`);
}
