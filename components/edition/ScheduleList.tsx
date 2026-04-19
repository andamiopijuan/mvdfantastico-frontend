"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { clsx } from "clsx";
import type { Screening } from "@/lib/types";

interface ScheduleListProps {
  events: Screening[];
}

function groupByDate(events: Screening[]): Map<string, Screening[]> {
  const map = new Map<string, Screening[]>();
  for (const event of events) {
    const existing = map.get(event.date) ?? [];
    existing.push(event);
    map.set(event.date, existing);
  }
  return map;
}

export default function ScheduleList({ events }: ScheduleListProps) {
  const locale = useLocale();
  const grouped = groupByDate([...events].sort((a, b) => a.date.localeCompare(b.date)));
  const dates = Array.from(grouped.keys());
  const [activeDate, setActiveDate] = useState<string>(dates[0] ?? "");

  if (dates.length === 0) {
    return <p className="text-text-muted text-center py-12">Sin programación registrada.</p>;
  }

  const dayEvents = (grouped.get(activeDate) ?? []).sort((a, b) =>
    a.time.localeCompare(b.time)
  );

  return (
    <div>
      <div className="flex gap-2 flex-wrap mb-8 border-b border-border pb-4">
        {dates.map((date) => {
          const d = new Date(date + "T12:00:00");
          return (
            <button
              key={date}
              onClick={() => setActiveDate(date)}
              className={clsx(
                "px-4 py-2 text-sm transition-colors",
                activeDate === date
                  ? "text-void font-bold"
                  : "text-text-secondary border border-border hover:border-plasma/50"
              )}
              style={activeDate === date ? { background: "linear-gradient(135deg, #00d4ff, #a259f7)" } : undefined}
            >
              {d.toLocaleDateString(locale as string, { weekday: "short", day: "numeric", month: "short" })}
            </button>
          );
        })}
      </div>
      <div className="flex flex-col gap-3">
        {dayEvents.map((s) => (
          <div key={s.id} className="flex gap-4 border-b border-white/10 pb-3">
            <span className="font-display text-xl text-white w-14 text-right flex-shrink-0">
              {s.time.slice(0, 5)}
            </span>
            <div>
              <p className="text-white font-medium">{s.work.title}</p>
              <p className="text-sm text-text-secondary">
                {s.work.director}
                {s.venue_name && <> · {s.venue_name}</>}
              </p>
              {s.notes && <p className="text-xs text-plasma/80">{s.notes}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
