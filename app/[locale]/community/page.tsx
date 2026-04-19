import { getPartners } from "@/lib/api";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Comunidad" };

export default async function CommunityPage() {
  const [festivals, media] = await Promise.allSettled([
    getPartners("festival"),
    getPartners("media"),
  ]);

  const festivalPartners = festivals.status === "fulfilled" ? festivals.value : [];
  const mediaPartners = media.status === "fulfilled" ? media.value : [];

  return (
    <div className="container-wide section-padding space-y-16">
      <div>
        <p className="text-xs uppercase tracking-widest text-plasma mb-3">Red</p>
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-text-primary">
          Comunidad
        </h1>
      </div>

      {festivalPartners.length > 0 && (
        <section>
          <h2 className="font-serif text-2xl font-bold text-text-primary mb-8">
            Festivales Hermanos
          </h2>
          <PartnerGrid partners={festivalPartners} />
        </section>
      )}

      {mediaPartners.length > 0 && (
        <section>
          <h2 className="font-serif text-2xl font-bold text-text-primary mb-8">
            Medios Asociados
          </h2>
          <PartnerGrid partners={mediaPartners} />
        </section>
      )}

      {festivalPartners.length === 0 && mediaPartners.length === 0 && (
        <p className="text-text-muted">Próximamente.</p>
      )}
    </div>
  );
}

function PartnerGrid({
  partners,
}: {
  partners: Awaited<ReturnType<typeof getPartners>>;
}) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {partners.map((partner) => (
        <a
          key={partner.id}
          href={partner.url || undefined}
          target="_blank"
          rel="noopener noreferrer"
          className="card-dark p-4 flex flex-col items-center gap-3 hover:border-border/80 transition-colors"
        >
          <div className="relative w-24 h-16">
            <Image
              src={partner.logo}
              alt={partner.name}
              fill
              className="object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
            />
          </div>
          <p className="text-text-secondary text-xs text-center">{partner.name}</p>
        </a>
      ))}
    </div>
  );
}
