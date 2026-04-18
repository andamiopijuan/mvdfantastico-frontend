import type { AwardWinner } from "@/lib/types";

interface AwardsListProps {
  awards: AwardWinner[];
}

export default function AwardsList({ awards }: AwardsListProps) {
  if (awards.length === 0) {
    return <p className="text-text-muted text-center py-12">No hay premios registrados.</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      {awards.map((award) => (
        <div key={award.id} className="card-dark p-5">
          <div className="flex justify-between items-start gap-4">
            <div>
              <p className="text-xs uppercase tracking-widest text-plasma mb-1">
                {award.category_name}
              </p>
              <p className="text-text-primary font-medium">{award.work_title ?? "—"}</p>
              {award.work_director && (
                <p className="text-text-secondary text-sm mt-1 italic">{award.work_director}</p>
              )}
              {award.is_special_mention && (
                <p className="text-text-muted text-xs mt-1">Mención especial</p>
              )}
            </div>
          </div>
          {award.notes && (
            <p className="text-text-muted text-sm mt-3 border-l-2 border-plasma/40 pl-3 italic">
              {award.notes}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

