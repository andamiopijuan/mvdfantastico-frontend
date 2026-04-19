import type {
  Edition,
  EditionSummary,
  Venue,
  WorkSummary,
  Work,
  Screening,
  AwardCategory,
  AwardWinner,
  AboutContent,
  TeamMember,
  Partner,
  PaginatedResponse,
} from "./types";

// Server-side (SSR/SSG): use internal Docker network URL. Client-side: use public URL.
const API_BASE =
  typeof window === "undefined"
    ? (process.env.API_URL ?? "http://backend:8000/api")
    : (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api");

// Rewrite internal Docker media URLs to the public-facing URL so next/image
// works both during SSR (backend:8000) and in the browser (localhost:8000).
const PUBLIC_MEDIA_BASE =
  process.env.NEXT_PUBLIC_MEDIA_URL ?? "http://localhost:8000";

function rewriteMediaUrl(url: string | null | undefined): string {
  if (!url) return url as string;
  return url.replace(/^https?:\/\/backend:\d+/, PUBLIC_MEDIA_BASE);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function rewriteMediaUrls(obj: any): any {
  if (!obj || typeof obj !== "object") return obj;
  if (Array.isArray(obj)) return obj.map(rewriteMediaUrls);
  const result: Record<string, unknown> = {};
  for (const key of Object.keys(obj)) {
    const val = obj[key];
    if ((key === "poster" || key === "key_visual" || key === "still" || key === "image") && typeof val === "string") {
      result[key] = rewriteMediaUrl(val);
    } else if (val && typeof val === "object") {
      result[key] = rewriteMediaUrls(val);
    } else {
      result[key] = val;
    }
  }
  return result;
}

async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`API error ${res.status}: ${body}`);
  }

  const data = await res.json();
  return rewriteMediaUrls(data) as T;
}

// ── Editions ──────────────────────────────────────────────────────────────────

export async function getEditions(): Promise<PaginatedResponse<EditionSummary>> {
  return apiFetch<PaginatedResponse<EditionSummary>>("/editions/");
}

export async function getCurrentEdition(): Promise<Edition> {
  return apiFetch<Edition>("/editions/current/");
}

export async function getEditionByYear(year: number): Promise<Edition> {
  return apiFetch<Edition>(`/editions/${year}/`);
}

// ── Venues ────────────────────────────────────────────────────────────────────

export async function getVenuesForEdition(year: number): Promise<PaginatedResponse<Venue>> {
  return apiFetch<PaginatedResponse<Venue>>(`/venues/?edition__year=${year}`);
}

// ── Works ─────────────────────────────────────────────────────────────────────

export async function getWorksForEdition(
  year: number,
  params?: { section?: string; type?: string }
): Promise<PaginatedResponse<WorkSummary>> {
  const search = new URLSearchParams({ edition__year: String(year) });
  if (params?.section) search.set("section", params.section);
  if (params?.type) search.set("type", params.type);
  return apiFetch<PaginatedResponse<WorkSummary>>(`/works/?${search}`);
}

export async function getWorkById(id: number): Promise<Work> {
  return apiFetch<Work>(`/works/${id}/`);
}

// ── Screenings ───────────────────────────────────────────────────────────────

export async function getScreeningsForEdition(
  year: number,
  params?: { date?: string; venue?: number }
): Promise<PaginatedResponse<Screening>> {
  const search = new URLSearchParams({ edition__year: String(year) });
  if (params?.date) search.set("date", params.date);
  if (params?.venue) search.set("venue", String(params.venue));
  return apiFetch<PaginatedResponse<Screening>>(`/screenings/?${search}`);
}

// ── Awards ─────────────────────────────────────────────────────────────────────

export async function getAwardCategories(): Promise<PaginatedResponse<AwardCategory>> {
  return apiFetch<PaginatedResponse<AwardCategory>>("/award-categories/");
}

export async function getAwardWinnersForEdition(
  year: number
): Promise<PaginatedResponse<AwardWinner>> {
  return apiFetch<PaginatedResponse<AwardWinner>>(`/award-winners/?edition__year=${year}`);
}

// ── Pages ──────────────────────────────────────────────────────────────────────

export async function getAboutContent(): Promise<AboutContent> {
  return apiFetch<AboutContent>("/about/");
}

export async function getTeamMembers(): Promise<TeamMember[]> {
  return apiFetch<TeamMember[]>("/team/");
}

export async function getPartners(type?: string): Promise<Partner[]> {
  const query = type ? `?type=${type}` : "";
  return apiFetch<Partner[]>(`/partners/${query}`);
}

export async function submitContactMessage(data: {
  name: string;
  email: string;
  message: string;
}): Promise<{ detail: string }> {
  return apiFetch<{ detail: string }>("/contact/", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

