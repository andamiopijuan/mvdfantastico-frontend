import type { Metadata } from "next";

export function generateStaticParams() {
  return [
    { locale: "es" },
    { locale: "en" },
    { locale: "pt" },
  ];
}

export const metadata: Metadata = { title: "Comunidad" };

export default function CommunityPage() {
  return (
    <div className="container-wide section-padding space-y-16">
      <div>
        <p className="text-xs uppercase tracking-widest text-plasma mb-3">Red</p>
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-text-primary">
          Comunidad
        </h1>
      </div>

      <p className="text-text-muted">Próximamente.</p>
    </div>
  );
}
