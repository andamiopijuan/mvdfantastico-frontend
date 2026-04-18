import { redirect } from "next/navigation";

interface PageProps {
  params: { locale: string };
}

export default function ArchiveRedirectPage({ params }: PageProps) {
  redirect(`/${params.locale}/archivo`);
}