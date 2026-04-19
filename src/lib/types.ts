// ── Editions ───────────────────────────────────────────────────────────────────

export type EditionStatus = "upcoming" | "active" | "past";

export interface EditionSummary {
  id: number;
  name: string;
  number: number;
  year: number;
  slug: string;
  start_date: string;
  end_date: string;
  status: EditionStatus;
  is_current: boolean;
  poster: string;
  work_count: number;
  has_legacy: boolean;
}

export interface EditionImage {
  id: number;
  image: string;
  caption: string;
  order: number;
}

export interface Edition extends EditionSummary {
  key_visual: string;
  pdf_catalog: string;
  description_es: string;
  description_en: string;
  description_pt: string;
  rules_es: string;
  rules_en: string;
  rules_pt: string;
  submission_url: string;
  gallery: EditionImage[];
  venue_count: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  legacy_json: Record<string, any> | null;
  created_at: string;
  updated_at: string;
}

// ── Venues ─────────────────────────────────────────────────────────────────────

export interface Venue {
  id: number;
  name: string;
  address: string;
  description: string;
  capacity: number | null;
  map_url: string;
  whatsapp: string;
  email: string;
  image: string;
  order: number;
}

// ── Works ──────────────────────────────────────────────────────────────────────

export type WorkType = "short" | "medium" | "feature";
export type WorkSection =
  | "competition_int"
  | "competition_nat"
  | "short_competition"
  | "panorama"
  | "special"
  | "retrospective"
  | "tribute";
export type ParticipationStatus =
  | "selected"
  | "world_premiere"
  | "latam_premiere"
  | "regional_premiere"
  | "special_screening";

export interface WorkSummary {
  id: number;
  title: string;
  original_title: string;
  type: WorkType;
  section: WorkSection;
  country: string;
  production_year: number;
  runtime: number;
  director: string;
  still: string;
  participation_status: ParticipationStatus;
  edition_year: number;
}

export interface WorkScreening {
  id: number;
  date: string;
  time: string;
  venue: number | null;
  venue_name: string | null;
  notes: string;
}

export interface Work extends WorkSummary {
  edition: number;
  cast: string;
  producers: string;
  language: string;
  subtitles: string;
  synopsis_es: string;
  synopsis_en: string;
  synopsis_pt: string;
  screenings: WorkScreening[];
  created_at: string;
}

// ── Screenings ─────────────────────────────────────────────────────────────────

export interface ScreeningWork {
  id: number;
  title: string;
  type: WorkType;
  section: WorkSection;
  director: string;
  runtime: number;
  still: string;
}

export interface Screening {
  id: number;
  edition: number;
  work: ScreeningWork;
  work_id: number;
  venue: number | null;
  venue_name: string | null;
  date: string;
  time: string;
  notes: string;
}

// ── Awards ─────────────────────────────────────────────────────────────────────

export interface AwardCategory {
  id: number;
  name: string;
  description: string;
  is_audience_award: boolean;
  order: number;
}

export interface AwardWinner {
  id: number;
  edition: number;
  category: number;
  category_name: string;
  work: number | null;
  work_title: string | null;
  work_director: string | null;
  is_special_mention: boolean;
  notes: string;
}

// ── Helpers ────────────────────────────────────────────────────────────────────

export type Locale = "es" | "en" | "pt";

export function getLocalizedText(
  obj: { es?: string; en?: string; pt?: string },
  locale: Locale
): string {
  return obj[locale] || obj.es || obj.en || obj.pt || "";
}

export const SECTION_LABELS: Record<WorkSection, string> = {
  competition_int: "Competencia Oficial",
  competition_nat: "Competencia Nacional",
  short_competition: "Competencia de Cortometrajes",
  panorama: "Panorama",
  special: "Proyección Especial",
  retrospective: "Retrospectiva",
  tribute: "Homenaje",
};

export const TYPE_LABELS: Record<WorkType, string> = {
  short: "Cortometraje",
  medium: "Mediometraje",
  feature: "Largometraje",
};


// ── Pages ──────────────────────────────────────────────────────────────────────

export interface AboutContent {
  history: string;
  mission: string;
  philosophy: string;
  updated_at: string;
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  photo: string | null;
  bio: string;
  order: number;
}

export interface Partner {
  id: number;
  name: string;
  logo: string;
  url: string;
  partner_type: "festival" | "media" | "sponsor" | "institutional";
  order: number;
}

// ── Pagination ─────────────────────────────────────────────────────────────────

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}
