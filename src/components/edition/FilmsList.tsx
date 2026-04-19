import Image from "next/image";
import type { WorkSummary } from "@/lib/types";

interface FilmsListProps {
  films: WorkSummary[];
}

export default function FilmsList({ films }: FilmsListProps) {
  if (films.length === 0) {
    return <p className="text-text-muted text-center py-12">No hay obras registradas.</p>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {films.map((film) => (
        <article key={film.id} className="card-dark group">
          <div className="relative aspect-[2/3] bg-elevated overflow-hidden">
            {film.still ? (
              <Image
                src={film.still}
                alt={film.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center p-3">
                <span className="text-text-muted text-xs text-center">{film.title}</span>
              </div>
            )}
          </div>
          <div className="p-3">
            <p className="text-text-primary text-sm font-medium leading-snug line-clamp-2 mb-1">
              {film.title}
            </p>
            <p className="text-text-secondary text-xs">Dir. {film.director}</p>
            <div className="flex gap-2 mt-1 text-xs text-text-muted flex-wrap">
              <span>{film.country}</span>
              <span>{film.runtime} min</span>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

