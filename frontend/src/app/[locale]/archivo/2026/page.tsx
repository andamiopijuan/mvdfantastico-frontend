import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FILMS_2026, CATEGORY_LABELS, getFilmsByCategory, getCategoryLabel, getFilmTitle } from "@/data/films-2026";
import { SCREENINGS_2026 } from "@/data/screenings-2026";

// ── Venue photo mapping ────────────────────────────────────────────────────────
const VENUE_PHOTO_MAP: Record<string, string> = {
  "Sala Lazaroff":                           "/media/venues/sala-lazaroff.jpg",
  "Centro Cultural Artesano":                "/media/venues/centro-cultural-artesano.jpg",
  "Centro Cultural La Experimental":         "/media/venues/centro-cultural-la-experimental.jpg",
  "Casa INJU":                               "/media/venues/casa-inju.jpg",
  "Centro Cultural Crece":                   "/media/venues/centro-cultural-crece.jpg",
  "Casa de Cultura del Prado":               "/media/venues/casa-de-cultura-del-prado.jpg",
  "Centro Cultural Terminal Goes":           "/media/venues/Centro%20Cultural%20Terminal%20Goes.jpg",
  "Alianza Francesa de Montevideo":          "/media/venues/Alianza%20Francesa%20de%20Montevideo.jpg",
  "Mandr\u00e1gora Casa Cultural":                 "/media/venues/Mandragora.jpg",
  "Bar F\u00e9nix":                               "/media/venues/Fenix.jpg",
  "Cold Music Bar":                          "/media/venues/cold-music-bar.jpg",
  "Andr\u00f3meda Bar Cooperativo":               "/media/venues/andromeda-bar-cooperativo.jpg",
  "Centro Cultural Florencio S\u00e1nchez":       "/media/venues/Centro%20Cultural%20Florencio%20Sanchez.webp",
  "Sala Zitarrosa":                          "/media/venues/sala-zitarrosa.jpg",
  "Teatro Escayola":                         "/media/venues/teatro-escayola.jpg",
  "Centro Recreativo Democr\u00e1tico":           "/media/venues/centro-recreativo-democratico.jpg",
  "Quimera":                                 "/media/venues/Quimera.jpg",
  "Centro Cultural Museo de Imagen y Memoria de Soca": "/media/venues/Centro%20Cultural%20Museo%20de%20Imagen%20y%20Memoria%20de%20Soca.jpg",
  "Espacio Cultural Gobbi":                  "/media/venues/espacio-cultural-gobbi.jpg",
  "Cine Teatro Plaza":                       "/media/venues/cine-teatro-plaza-flores.jpg",
  "Centro Cultural AFE":                     "/media/venues/centro-cultural-afe-colonia.jpg",
  "Complejo Cultural Politeama":             "/media/venues/complejo-cultural-politeama.jpg",
};

// ── Prize label translations ───────────────────────────────────────────────────
const PRIZE_TRANSLATIONS: Record<string, Record<string, string>> = {
  en: {
    "Mejor Pel\u00edcula":                               "Best Film",
    "Mejor Director":                               "Best Director",
    "Mejor Gui\u00f3n":                                 "Best Screenplay",
    "Mejor Actor":                                  "Best Actor",
    "Mejor Actriz":                                 "Best Actress",
    "Mejor Direcci\u00f3n":                             "Best Direction",
    "Mejor Cortometraje del Festival":              "Best Short Film",
    "Premio Revelaci\u00f3n del Festival":              "Festival Discovery Award",
    "Mejor Pel\u00edcula Iberoamericana":               "Best Ibero-American Film",
    "Mejor Documental":                             "Best Documentary",
    "Mejor Pel\u00edcula Uruguaya":                     "Best Uruguayan Film",
    "Mejor Mediometraje":                           "Best Medium-Length Film",
    "Premio del P\u00fablico \u2014 Mejor Pel\u00edcula del Festival":         "Audience Award \u2014 Best Film",
    "Premio del P\u00fablico \u2014 Mejor Pel\u00edcula Iberoamericana":      "Audience Award \u2014 Best Ibero-American Film",
    "Premio del P\u00fablico \u2014 Mejor Mediometraje":                  "Audience Award \u2014 Best Medium-Length Film",
    "Premio del P\u00fablico \u2014 Mejor Cortometraje del Festival":      "Audience Award \u2014 Best Short Film",
    "Premio del P\u00fablico \u2014 Mejor Cortometraje Iberoamericano":   "Audience Award \u2014 Best Ibero-American Short Film",
    "Premio del P\u00fablico \u2014 Mejor Pel\u00edcula Uruguaya":            "Audience Award \u2014 Best Uruguayan Film",
    "Premio del P\u00fablico \u2014 Mejor Cortometraje Uruguayo":         "Audience Award \u2014 Best Uruguayan Short Film",
    "Menci\u00f3n \u2014 Efectos especiales y banda sonora":      "Special Mention \u2014 Special effects and soundtrack",
    "Menci\u00f3n \u2014 Actuaci\u00f3n de voz":                        "Special Mention \u2014 Voice performance",
    "Menci\u00f3n \u2014 Maquillaje":                              "Special Mention \u2014 Makeup",
    "Menci\u00f3n \u2014 Mejor Actriz":                            "Special Mention \u2014 Best Actress",
    "Menci\u00f3n \u2014 Transformaci\u00f3n en hombre lobo":           "Special Mention \u2014 Werewolf transformation",
    "Menci\u00f3n \u2014 Efectos especiales":                      "Special Mention \u2014 Special effects",
    "Menci\u00f3n \u2014 Mejor elenco":                            "Special Mention \u2014 Best ensemble cast",
    "Menci\u00f3n \u2014 Efectos especiales y dise\u00f1o de criatura": "Special Mention \u2014 Special effects and creature design",
    "Menci\u00f3n \u2014 Montaje y caracterizaci\u00f3n":              "Special Mention \u2014 Editing and characterisation",
    "Menci\u00f3n \u2014 Mejor animaci\u00f3n":                       "Special Mention \u2014 Best animation",
    "Menci\u00f3n \u2014 Dise\u00f1o de producci\u00f3n":                  "Special Mention \u2014 Production design",
    "Menci\u00f3n \u2014 Mejor gui\u00f3n":                           "Special Mention \u2014 Best screenplay",
    "Menci\u00f3n \u2014 Arte y fotograf\u00eda":                     "Special Mention \u2014 Art and photography",
    "Menci\u00f3n \u2014 Direcci\u00f3n":                             "Special Mention \u2014 Direction",
    "Menci\u00f3n \u2014 Animaci\u00f3n":                             "Special Mention \u2014 Animation",
  },
  pt: {
    "Mejor Pel\u00edcula":                               "Melhor Filme",
    "Mejor Director":                               "Melhor Dire\u00e7\u00e3o",
    "Mejor Gui\u00f3n":                                 "Melhor Roteiro",
    "Mejor Actor":                                  "Melhor Ator",
    "Mejor Actriz":                                 "Melhor Atriz",
    "Mejor Direcci\u00f3n":                             "Melhor Dire\u00e7\u00e3o",
    "Mejor Cortometraje del Festival":              "Melhor Curta-metragem do Festival",
    "Premio Revelaci\u00f3n del Festival":              "Pr\u00eamio Revela\u00e7\u00e3o do Festival",
    "Mejor Pel\u00edcula Iberoamericana":               "Melhor Filme Ibero-americano",
    "Mejor Documental":                             "Melhor Document\u00e1rio",
    "Mejor Pel\u00edcula Uruguaya":                     "Melhor Filme Uruguaio",
    "Mejor Mediometraje":                           "Melhor M\u00e9dia-metragem",
    "Premio del P\u00fablico \u2014 Mejor Pel\u00edcula del Festival":         "Pr\u00eamio do P\u00fablico \u2014 Melhor Filme do Festival",
    "Premio del P\u00fablico \u2014 Mejor Pel\u00edcula Iberoamericana":      "Pr\u00eamio do P\u00fablico \u2014 Melhor Filme Ibero-americano",
    "Premio del P\u00fablico \u2014 Mejor Mediometraje":                  "Pr\u00eamio do P\u00fablico \u2014 Melhor M\u00e9dia-metragem",
    "Premio del P\u00fablico \u2014 Mejor Cortometraje del Festival":      "Pr\u00eamio do P\u00fablico \u2014 Melhor Curta-metragem do Festival",
    "Premio del P\u00fablico \u2014 Mejor Cortometraje Iberoamericano":   "Pr\u00eamio do P\u00fablico \u2014 Melhor Curta-metragem Ibero-americana",
    "Premio del P\u00fablico \u2014 Mejor Pel\u00edcula Uruguaya":            "Pr\u00eamio do P\u00fablico \u2014 Melhor Filme Uruguaio",
    "Premio del P\u00fablico \u2014 Mejor Cortometraje Uruguayo":         "Pr\u00eamio do P\u00fablico \u2014 Melhor Curta-metragem Uruguaia",
    "Menci\u00f3n \u2014 Efectos especiales y banda sonora":      "Men\u00e7\u00e3o Especial \u2014 Efeitos especiais e trilha sonora",
    "Menci\u00f3n \u2014 Actuaci\u00f3n de voz":                        "Men\u00e7\u00e3o Especial \u2014 Atua\u00e7\u00e3o de voz",
    "Menci\u00f3n \u2014 Maquillaje":                              "Men\u00e7\u00e3o Especial \u2014 Maquiagem",
    "Menci\u00f3n \u2014 Mejor Actriz":                            "Men\u00e7\u00e3o Especial \u2014 Melhor Atriz",
    "Menci\u00f3n \u2014 Transformaci\u00f3n en hombre lobo":           "Men\u00e7\u00e3o Especial \u2014 Transforma\u00e7\u00e3o em lobisomem",
    "Menci\u00f3n \u2014 Efectos especiales":                      "Men\u00e7\u00e3o Especial \u2014 Efeitos especiais",
    "Menci\u00f3n \u2014 Mejor elenco":                            "Men\u00e7\u00e3o Especial \u2014 Melhor elenco",
    "Menci\u00f3n \u2014 Efectos especiales y dise\u00f1o de criatura": "Men\u00e7\u00e3o Especial \u2014 Efeitos especiais e design de criatura",
    "Menci\u00f3n \u2014 Montaje y caracterizaci\u00f3n":              "Men\u00e7\u00e3o Especial \u2014 Montagem e caracteriza\u00e7\u00e3o",
    "Menci\u00f3n \u2014 Mejor animaci\u00f3n":                       "Men\u00e7\u00e3o Especial \u2014 Melhor anima\u00e7\u00e3o",
    "Menci\u00f3n \u2014 Dise\u00f1o de producci\u00f3n":                  "Men\u00e7\u00e3o Especial \u2014 Design de produ\u00e7\u00e3o",
    "Menci\u00f3n \u2014 Mejor gui\u00f3n":                           "Men\u00e7\u00e3o Especial \u2014 Melhor roteiro",
    "Menci\u00f3n \u2014 Arte y fotograf\u00eda":                     "Men\u00e7\u00e3o Especial \u2014 Arte e fotografia",
    "Menci\u00f3n \u2014 Direcci\u00f3n":                             "Men\u00e7\u00e3o Especial \u2014 Dire\u00e7\u00e3o",
    "Menci\u00f3n \u2014 Animaci\u00f3n":                             "Men\u00e7\u00e3o Especial \u2014 Anima\u00e7\u00e3o",
  },
};


const VENUE_LOCATION: Record<string, string> = {
  "Cine Teatro Plaza":                             "Trinidad, Flores",
  "Centro Cultural AFE":                           "Colonia, Colonia",
  "Teatro Escayola":                               "Tacuarembó, Tacuarembó",
  "Centro Recreativo Democrático":                 "Ciudad del Carmen, Durazno",
  "Espacio Cultural Gobbi":                        "Paysandú, Paysandú",
  "Quimera":                                       "Artigas, Artigas",
  "Centro Cultural Museo de Imagen y Memoria de Soca": "Soca, Canelones",
  "Complejo Cultural Politeama":                   "Las Piedras, Canelones",
};

function getFilmTitleForLocale(slug: string | undefined, fallback: string, locale: string): string {
  if (!slug) return fallback;
  const film = FILMS_2026.find((f) => f.slug === slug);
  if (!film) return fallback;
  return getFilmTitle(film, locale);
}

function formatScreeningDate(iso: string): string {
  const [, m, d] = iso.split("-");
  const months = ["ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic"];
  return `${parseInt(d)} ${months[parseInt(m) - 1]}`;
}

// Returns venues sorted: Montevideo venues first (no location label), then interior alphabetically
function getScreeningsByVenue(): Array<{ venue: string; location?: string; screenings: typeof SCREENINGS_2026 }> {
  const map = new Map<string, typeof SCREENINGS_2026>();
  for (const s of SCREENINGS_2026) {
    const group = map.get(s.venue) ?? [];
    group.push(s);
    map.set(s.venue, group);
  }
  map.forEach((v) => v.sort((a, b) =>
    a.date === b.date ? a.time.localeCompare(b.time) : a.date.localeCompare(b.date)
  ));
  const entries = Array.from(map.entries()).map(([venue, screenings]) => {
    // Determine location from lookup (partial match by key start)
    const locKey = Object.keys(VENUE_LOCATION).find((k) => venue.startsWith(k));
    return { venue, location: locKey ? VENUE_LOCATION[locKey] : undefined, screenings };
  });
  // Sort: Montevideo (no location) first, interior after; each group alphabetically
  entries.sort((a, b) => {
    const aInterior = !!a.location;
    const bInterior = !!b.location;
    if (aInterior !== bInterior) return aInterior ? 1 : -1;
    return a.venue.localeCompare(b.venue, "es");
  });
  return entries;
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://montevideofan.com";

export const metadata: Metadata = {
  title: "Montevideo Fantástico XVI (2026) — Archivo",
  description: "Archivo completo de la decimosexta edición del Festival Montevideo Fantástico: 52 días, 22 sedes, 138 películas, programación, premios, galería y equipo.",
  openGraph: {
    title: "Montevideo Fantástico XVI — Archivo 2026",
    description: "Archivo completo de la decimosexta edición: programación, películas seleccionadas, sedes, premios y galería.",
    type: "website",
    url: `${SITE_URL}/es/archivo/2026`,
    images: [{ url: `${SITE_URL}/media/archive/XVI/poster.jpg`, width: 640, height: 900, alt: "Poster Montevideo Fantástico XVI" }],
    siteName: "Montevideo Fantástico",
  },
};

export function generateStaticParams() {
  return [{ locale: "es" }, { locale: "en" }, { locale: "pt" }];
}

// ── Award data ─────────────────────────────────────────────────────────────────

const OFFICIAL_AWARDS = [
  { prize: "Mejor Película", film: "Teatro de los Sueños", country: "Austria", slug: "teatro-de-los-suenos" },
  { prize: "Mejor Director", film: "Pusimos el Mundo a Dormir", detail: "Adrian Țofei", country: "Rumania / Turquía", slug: "pusimos-el-mundo-a-dormir" },
  { prize: "Mejor Guion", film: "Teatro de los Sueños", detail: "Daniel Limmer", country: "Austria", slug: "teatro-de-los-suenos" },
  { prize: "Mejor Actor", film: "Infierno", detail: "Michel Angély", country: "Bélgica", slug: "infierno" },
  { prize: "Mejor Actriz", film: "SASYQ", detail: "Irka Abdulmanova", country: "Kazajistán", slug: "sasyq" },
];

const IBEROAMERICAN_AWARDS = [
  { prize: "Mejor Película Iberoamericana", film: "Bosco: La Sombra Extraviada Bajo la Luna de Plata", country: "México", slug: "bosco-la-sombra-perdida-bajo-la-luna-plateada" },
];

const DOCUMENTARY_AWARDS = [
  { prize: "Mejor Documental", film: "Plesiosaurios Vivos", country: "Argentina", slug: "plesiosaurios-vivos" },
];

const URUGUAYAN_AWARDS = [
  { prize: "Mejor Película Uruguaya", film: "Martín Vuelve", country: "Argentina / Uruguay", slug: "martin-vuelve" },
];

const MEDIUM_AWARDS = [
  { prize: "Mejor Mediometraje", film: "Esta Noche, Mi Alma Partirá", country: "Brasil", slug: "esta-noche-mi-alma-partira" },
];

const SHORT_AWARDS = [
  { prize: "Mejor Cortometraje del Festival", film: "Academia de Voz", detail: "Dir. Javier San Miguel", country: "Francia", slug: "academia-de-voz" },
  { prize: "Premio Revelación del Festival", film: "Garra de Monte", detail: "Dir. Joaquín Ramírez", country: "Uruguay", slug: "garra-de-monte" },
  { prize: "Mejor Dirección", film: "Cuento para Dormir", detail: "Asaf Shavit", country: "Israel", slug: "cuento-para-dormir" },
  { prize: "Mejor Guion", film: "Triángulo", detail: "Guion: Iván Serra y Joseph Díaz", country: "España", slug: "triangulo" },
  { prize: "Mejor Actor", film: "Academia de Voz", detail: "Mohammed Benazza", country: "Francia", slug: "academia-de-voz" },
  { prize: "Mejor Actriz", film: "Hiperacusia", detail: "Constanza del Sol", country: "Uruguay", slug: "hiperacusia" },
];

const AUDIENCE_AWARDS = [
  { prize: "Premio del Público — Mejor Película del Festival", film: "Alguien los Vigila", detail: "Dir. Miguel Torena Bogao", country: "Uruguay", slug: "alguien-los-vigila" },
  { prize: "Premio del Público — Mejor Película Iberoamericana", film: "Sombras del Sur", detail: "Dir. Diego Leani, Luciano Pizzano, Álvaro Pruneda", country: "Chile", slug: "sombras-del-sur" },
  { prize: "Premio del Público — Mejor Mediometraje", film: "El Paraíso Oscuro de Marilyn", detail: "Dir. Remi Gangarossa", country: "Estados Unidos", slug: "el-paraiso-oscuro-de-marilyn" },
  { prize: "Premio del Público — Mejor Cortometraje del Festival", film: "El Eco de los que Quedan", detail: "Dir. Afig Dzhavadzade", country: "Rusia", slug: "el-eco-de-los-que-quedan" },
  { prize: "Premio del Público — Mejor Cortometraje Iberoamericano", film: "La Pena no Duerme de Noche", detail: "Dir. Josefina Montino, Martín André", country: "Chile", slug: "la-pena-no-duerme-de-noche" },
  { prize: "Premio del Público — Mejor Película Uruguaya", film: "¿Qué Pasó con Nath_666?", detail: "Dir. Jorge Pérez Rivero", country: "Uruguay", slug: "que-paso-con-nath-666" },
  { prize: "Premio del Público — Mejor Cortometraje Uruguayo", film: "Muuuundos Extraños", detail: "Dir. Sofía Lettier", country: "Uruguay", slug: "muuuundos-extranos" },
];

// ── Mentions data (special jury mentions by competition) ───────────────────────
const MENTIONS: Array<{
  section: string;
  items: Array<{ prize: string; film: string; detail?: string; country: string; slug?: string }>;
}> = [
  {
    section: "Competencia Oficial de Largometrajes",
    items: [
      { prize: "Mención — Efectos especiales y banda sonora", film: "Las Motosierras Cantan", country: "Estonia", slug: "las-motosierras-cantan" },
      { prize: "Mención — Actuación de voz", film: "John Vardar vs la Galaxia", detail: "Zharko Dimoski", country: "Macedonia del Norte", slug: "john-vardar-contra-la-galaxia" },
    ],
  },
  {
    section: "Competencia Iberoamericana de Largometrajes",
    items: [
      { prize: "Mención — Maquillaje", film: "El Ritual de Huasao", detail: "Maquillaje: Aran Gaspar · Dir. Isaac Berrocal", country: "España", slug: "el-ritual-de-huasao" },
      { prize: "Mención — Mejor Actriz", film: "La Noche que Nunca Termina", detail: "Inés Segurola", country: "Argentina", slug: "la-noche-que-nunca-termina" },
    ],
  },
  {
    section: "Competencia Uruguaya de Largometrajes",
    items: [
      { prize: "Mención — Transformación en hombre lobo", film: "La Maldición de Hernández Chaney", country: "Uruguay", slug: "la-maldicion-de-hernandez-chaney" },
      { prize: "Mención — Efectos especiales", film: "Panchopalooza", country: "Uruguay", slug: "panchopalooza" },
      { prize: "Mención — Mejor elenco", film: "¿Qué Pasó con Nath_666?", country: "Uruguay", slug: "que-paso-con-nath-666" },
    ],
  },
  {
    section: "Competencia Oficial de Mediometrajes",
    items: [
      { prize: "Mención — Efectos especiales y diseño de criatura", film: "X-Slasher", country: "Brasil", slug: "x-slasher" },
      { prize: "Mención — Montaje y caracterización", film: "El Paraíso Oscuro de Marilyn", country: "Estados Unidos", slug: "el-paraiso-oscuro-de-marilyn" },
    ],
  },
  {
    section: "Competencia Oficial de Cortometrajes",
    items: [
      { prize: "Mención — Mejor animación", film: "Santo Cielo", detail: "Dir. Farnoosh Abedi, Negah Khezre Fardyardad, Mohammad Ghaffari", country: "Irán", slug: "santo-cielo" },
      { prize: "Mención — Diseño de producción", film: "Amira", country: "España", slug: "amira" },
    ],
  },
  {
    section: "Competencia Iberoamericana de Cortometrajes",
    items: [
      { prize: "Mención — Mejor guion", film: "Deberes", detail: "Guion: Thiago Rosestolato", country: "Brasil", slug: "deberes" },
    ],
  },
  {
    section: "Competencia Uruguaya de Cortometrajes",
    items: [
      { prize: "Mención — Arte y fotografía", film: "Amarre", country: "Uruguay", slug: "amarre" },
      { prize: "Mención — Dirección", film: "La Copa Carmesí", country: "Uruguay", slug: "la-copa-carmesi" },
      { prize: "Mención — Animación", film: "Bichos Locos", country: "Uruguay", slug: "bichos-locos" },
    ],
  },
];

// ── Film data (static) ─────────────────────────────────────────────────────────

const FILMS_BY_CATEGORY: Array<{
  category: string;
  films: Array<{ title: string; country: string; dir: string; slug: string }>;
}> = [
  {
    category: "Competencia Oficial de Largometrajes",
    films: [
      { title: "Big City Pizza",                  country: "Estados Unidos",    dir: "Dusty Saunders",                              slug: "big-city-pizza" },
      { title: "Infierno",                        country: "Bélgica",           dir: "Brandon Gotto",                               slug: "infierno" },
      { title: "John Vardar Contra la Galaxia",   country: "Macedonia del Norte",dir: "Goce Cvetanovski",                           slug: "john-vardar-contra-la-galaxia" },
      { title: "La Casa en el Árbol",             country: "España",            dir: "Luis Calderón",                               slug: "la-casa-en-el-arbol" },
      { title: "Las Motosierras Cantan",          country: "Estonia",           dir: "Sander Maran",                                slug: "las-motosierras-cantan" },
      { title: "Pusimos el Mundo a Dormir",       country: "Rumania / Turquía", dir: "Adrian Țofei",                                slug: "pusimos-el-mundo-a-dormir" },
      { title: "SASYQ",                           country: "Kazajistán",        dir: "Yerden Telemissov",                           slug: "sasyq" },
      { title: "Teatro de los Sueños",            country: "Austria",           dir: "Daniel Limmer",                               slug: "teatro-de-los-suenos" },
    ],
  },
  {
    category: "Competencia Iberoamericana de Largometrajes",
    films: [
      { title: "Bosco: La Sombra Extraviada Bajo la Luna de Plata", country: "México",     dir: "Ian Domínguez, Pablo Tamariz",  slug: "bosco-la-sombra-perdida-bajo-la-luna-plateada" },
      { title: "El Amor Mata",                    country: "Brasil",            dir: "Luiza Shelling Tubaldini",                    slug: "el-amor-mata" },
      { title: "Hotel Fin",                       country: "Brasil",            dir: "Lucas Oliveira",                              slug: "hotel-fin" },
      { title: "La Noche que Nunca Termina",      country: "Argentina",         dir: "Franz Sanaz",                                 slug: "la-noche-que-nunca-termina" },
      { title: "Ojos Verdes, Rojos Malditos",     country: "Argentina",         dir: "Pablo Vergara",                               slug: "ojos-verdes-rojos-malditos" },
      { title: "El Ritual de Huasao",             country: "España",            dir: "Isaac Berrocal",                              slug: "el-ritual-de-huasao" },
      { title: "Sombras del Sur",                 country: "Chile",             dir: "Diego Leani, Luciano Pizzano, Álvaro Pruneda", slug: "sombras-del-sur" },
    ],
  },
  {
    category: "Competencia Uruguaya de Largometrajes",
    films: [
      { title: "Alguien los Vigila",              country: "Uruguay",           dir: "Miguel Torena Bogao",                         slug: "alguien-los-vigila" },
      { title: "La Maldición de Hernández Chaney",country: "Uruguay",           dir: "Enrique Martínez",                            slug: "la-maldicion-de-hernandez-chaney" },
      { title: "Martín Vuelve",                   country: "Argentina / Uruguay",dir: "Rossana Bossio, Javier Cabezudo",            slug: "martin-vuelve" },
      { title: "Panchopalooza",                   country: "Uruguay",           dir: "Diego Melo, Ernesto Rodríguez",               slug: "panchopalooza" },
      { title: "¿Qué Pasó con Nath_666?",         country: "Uruguay",           dir: "Jorge Pérez Rivero",                          slug: "que-paso-con-nath-666" },
    ],
  },
  {
    category: "Documentales en Competencia",
    films: [
      { title: "El Fantástico Matt Parey",        country: "Polonia",           dir: "Bartosz Paduch",                              slug: "el-fantastico-matt-parey" },
      { title: "Plesiosaurios Vivos",             country: "Argentina",         dir: "Mario A. González, Iris P. Serrano",          slug: "plesiosaurios-vivos" },
      { title: "Venga a Nosotros Tu Reino",       country: "Francia",           dir: "Mathias Averty",                              slug: "venga-a-nosotros-tu-reino" },
    ],
  },
  {
    category: "Novedades",
    films: [
      { title: "4 Historias de Terror",           country: "Argentina",         dir: "Sol Martínez",                                slug: "4-historias-de-terror" },
      { title: "El Cerdo que Sobrevivió a la Fiebre Aftosa", country: "Corea del Sur", dir: "Hur Bum-wook",                        slug: "el-cerdo-que-sobrevivio-a-la-fiebre-aftosa" },
      { title: "El Convento",                     country: "España / Italia / Uruguay", dir: "Ángel M. Chivite, Luis Galindo",    slug: "el-convento" },
      { title: "Godzilla en Santa Fe",            country: "Argentina",         dir: "Alexander Duré",                              slug: "godzilla-en-santa-fe" },
      { title: "INSECTA",                         country: "Estados Unidos",    dir: "Martín Florio",                               slug: "insecta" },
      { title: "La Caja de Fuego Contra la Cerradura Mágica", country: "Rusia", dir: "Andjei Petras",                             slug: "la-caja-de-fuego-contra-la-cerradura-magica" },
      { title: "La Cosa en la Niebla",            country: "España",            dir: "Chedey Reyes",                                slug: "la-cosa-en-la-niebla" },
      { title: "No Mires en la Oscuridad",        country: "Estados Unidos",    dir: "Samuel Freeman",                              slug: "no-mires-en-la-oscuridad" },
      { title: "Sheryl",                          country: "Estados Unidos",    dir: "Justin Best",                                 slug: "sheryl" },
      { title: "Un Susurro Invocó Mi Nombre",     country: "Argentina",         dir: "Emilia Cotella, John Mathis",                 slug: "un-susurro-invoco-mi-nombre" },
    ],
  },
  {
    category: "Competencia Oficial de Mediometrajes",
    films: [
      { title: "Esta Noche, Mi Alma Partirá",     country: "Brasil",            dir: "Igor Vasco",                                  slug: "esta-noche-mi-alma-partira" },
      { title: "La Coartada",                     country: "Estados Unidos / Uruguay", dir: "Ricardo Islas",                       slug: "la-coartada" },
      { title: "El Paraíso Oscuro de Marilyn",    country: "Estados Unidos",    dir: "Remi Gangarossa",                             slug: "el-paraiso-oscuro-de-marilyn" },
      { title: "El Problema de un Minuto",        country: "Estados Unidos",    dir: "Nicolás Delgado de la Cámara",                slug: "el-problema-de-un-minuto" },
      { title: "Simcha",                          country: "Israel",            dir: "Tomer Weinberg",                              slug: "simcha" },
      { title: "X-Slasher",                       country: "Brasil",            dir: "Leticia Bonatelli",                           slug: "x-slasher" },
    ],
  },
  {
    category: "Competencia Oficial de Cortometrajes",
    films: [
      { title: "Academia de Voz",                 country: "Francia",           dir: "Javier San Miguel",          slug: "academia-de-voz" },
      { title: "Amira",                           country: "España",            dir: "Javier Yáñez Sanz",          slug: "amira" },
      { title: "Aquí Todos Estamos Embrujados",   country: "Canadá",            dir: "Zac Pinto Lobo",             slug: "aqui-todos-estamos-embrujados" },
      { title: "El Beso de la Mariposa",          country: "Alemania",          dir: "Zohar Dvir",                 slug: "el-beso-de-la-mariposa" },
      { title: "Una Buena Muerte",                country: "Estados Unidos",    dir: "Kaz PS",                     slug: "una-buena-muerte" },
      { title: "Calorcito Vital",                 country: "España",            dir: "Javi Sánchez-Blanco",        slug: "calorcito-vital" },
      { title: "Cámara Frigorífica",              country: "Hungría",           dir: "Mark G. Lakatos",            slug: "camara-frigorifica" },
      { title: "Carta de Amor a la Muerte",       country: "México",            dir: "Alejandro Jaimes Ballester", slug: "carta-de-amor-a-la-muerte" },
      { title: "#Cartacadena",                    country: "Armenia",           dir: "Georgii Verolainen",         slug: "cartacadena" },
      { title: "Cazador",                         country: "Grecia",            dir: "Pavlos Sifakis",             slug: "cazador" },
      { title: "Una Combinación Perfecta",        country: "Rusia",             dir: "Sergey Kharchenko",          slug: "una-combinacion-perfecta" },
      { title: "Cómete a los Ricos",              country: "Estados Unidos",    dir: "Jenna Payne",                slug: "comete-a-los-ricos" },
      { title: "Compost",                         country: "Francia",           dir: "Erik Semashkin",             slug: "compost" },
      { title: "Cuento para Dormir",              country: "Israel",            dir: "Asaf Shavit",                slug: "cuento-para-dormir" },
      { title: "Lady in Red",                     country: "España",            dir: "Tomás Rojo, Santiago Rindel",slug: "lady-in-red" },
      { title: "La Despedida",                    country: "Estados Unidos",    dir: "Peter Buckley",              slug: "la-despedida" },
      { title: "Ding Dingue Dong",                country: "Francia",           dir: "Florian Massoulle",          slug: "ding-dingue-dong" },
      { title: "El Eco de los que Quedan",        country: "Rusia",             dir: "Afig Dzhavadzade",           slug: "el-eco-de-los-que-quedan" },
      { title: "Elección",                        country: "Canadá",            dir: "Naddine Madell",             slug: "eleccion" },
      { title: "Entre las Sombras",               country: "China",             dir: "Caden Pan Ziyi",             slug: "entre-las-sombras" },
      { title: "Evil Sex — Una Herencia con Mucha Cola", country: "España",     dir: "David Callahan Ruiz",        slug: "evil-sex-una-herencia-con-mucha-cola" },
      { title: "Gobbledygook",                    country: "Estados Unidos",    dir: "Lizzete Flores, Nathaniel Elegino", slug: "gobbledygook" },
      { title: "Hambriento",                      country: "Irán",              dir: "Parsa Zahedi",               slug: "hambriento" },
      { title: "Heladera",                        country: "Irán",              dir: "Mehdi Joudi",                slug: "heladera" },
      { title: "Hora del Snack",                  country: "Francia",           dir: "Alphonse Ferrari",           slug: "hora-del-snack" },
      { title: "Humedad",                         country: "Argentina",         dir: "Julieta Quiroga",            slug: "humedad" },
      { title: "Inspiración",                     country: "Perú",              dir: "Diego Mezarina",             slug: "inspiracion" },
      { title: "La Jaula",                        country: "Irán",              dir: "Hamideh Motavali Zadeh",     slug: "la-jaula" },
      { title: "Joel el Bobo",                    country: "Colombia",          dir: "Nelson Galvis",              slug: "joel-el-bobo" },
      { title: "Juegos Seguros",                  country: "Estados Unidos",    dir: "Jeremiah Kipp",              slug: "juegos-seguros" },
      { title: "Killergotchi",                    country: "España",            dir: "Carlos Cobos",               slug: "killergotchi" },
      { title: "Latas Quemadas para Niños de Aluminio", country: "Alemania",   dir: "Rob Kleinschmidt",           slug: "latas-quemadas-para-ninos-de-aluminio" },
      { title: "Madre Compasiva",                 country: "Estados Unidos",    dir: "Clare O'Connor",             slug: "madre-compasiva" },
      { title: "La Madre Monte",                  country: "Colombia",          dir: "Erick Castrillon",           slug: "la-madre-monte" },
      { title: "MemoNeura",                       country: "México",            dir: "Isabella Conconi Haro",      slug: "memoneura" },
      { title: "No Llores",                       country: "Italia",            dir: "Alessandro Grassi",          slug: "no-llores" },
      { title: "Una Nube de Lluvia Vacía",        country: "Filipinas",         dir: "Elvert Bañares",             slug: "una-nube-de-lluvia-vacia" },
      { title: "Okay",                            country: "Estados Unidos",    dir: "Andrew Boodhoo Kightlinger", slug: "okay" },
      { title: "La Peste",                        country: "España",            dir: "Sergio González Morales",    slug: "la-peste" },
      { title: "Pólen",                           country: "Brasil",            dir: "Rodrigo Baptista",           slug: "polen" },
      { title: "Reliquias",                       country: "Canadá",            dir: "Dan Abramovici",             slug: "reliquias" },
      { title: "Santo Cielo",                     country: "Irán",              dir: "Farnoosh Abedi et al.",      slug: "santo-cielo" },
      { title: "Selfie",                          country: "Italia",            dir: "Giulio Manicardi",           slug: "selfie" },
      { title: "La Sombra de un Futuro",          country: "Brasil",            dir: "Gabriel Borges",             slug: "la-sombra-de-un-futuro" },
      { title: "Summoned",                        country: "Serbia",            dir: "Srđan Pavlović",             slug: "summoned" },
      { title: "Teatro Fantasma",                 country: "Brasil",            dir: "Theo Tajes",                 slug: "teatro-fantasma" },
      { title: "Tizne",                           country: "España",            dir: "Carlos Toral",               slug: "tizne" },
      { title: "Triángulo",                       country: "España",            dir: "Joseph Diaz",                slug: "triangulo" },
      { title: "Vacío",                           country: "España",            dir: "Javier Cano Larumbe",        slug: "vacio" },
    ],
  },
  {
    category: "Competencia Iberoamericana de Cortometrajes",
    films: [
      { title: "Abejorros",                       country: "Argentina",    dir: "Ana Fresco",                  slug: "abejorros" },
      { title: "Abuelo Ño",                       country: "Chile",        dir: "Marco Herrera",               slug: "abuelo-no" },
      { title: "Albertosaurio",                   country: "España",       dir: "Cayetano Martínez Tejonero",  slug: "albertosaurio" },
      { title: "La Bruja de Quilmes",             country: "Argentina",    dir: "Ammiel Darío Sancho",         slug: "la-bruja-de-quilmes" },
      { title: "Brujería",                        country: "Brasil",       dir: "Luan Filippo",                slug: "brujeria" },
      { title: "El Camino del Garrote",           country: "España",       dir: "Adrián Rivero-Pérez",         slug: "el-camino-del-garrote" },
      { title: "Carcer Lucis",                    country: "Argentina",    dir: "Pedro Miguel Infante",        slug: "carcer-lucis" },
      { title: "La Cena",                         country: "El Salvador",  dir: "Will Baivera",                slug: "la-cena" },
      { title: "La Danza de Teresa",              country: "México",       dir: "Oscar Navoa",                 slug: "la-danza-de-teresa" },
      { title: "Deberes",                         country: "Brasil",       dir: "Thiago Rosestolato",          slug: "deberes" },
      { title: "Los Elegidos",                    country: "Argentina",    dir: "Fercks Castellani",           slug: "los-elegidos" },
      { title: "Época de Plagas",                 country: "Ecuador",      dir: "Gabriela Calvache",           slug: "epoca-de-plagas" },
      { title: "Favela Amarela",                  country: "Brasil",       dir: "Nícolas Lobato, Thiago Tuchu",slug: "favela-amarela" },
      { title: "Fíjate Atrás de la Cortina",      country: "Brasil",       dir: "Paula Pardillos",             slug: "fijate-atras-de-la-cortina" },
      { title: "Frecuencia Z",                    country: "España",       dir: "Charli Sangar",               slug: "frecuencia-z" },
      { title: "Iris",                            country: "Argentina",    dir: "Santino Scotti",              slug: "iris" },
      { title: "Iris de Cristal",                 country: "Colombia",     dir: "Diego Gaviria",               slug: "iris-de-cristal" },
      { title: "Una Langosta Llamada Deseo",      country: "Panamá",       dir: "Sol Moreno, Risseth Yánguez", slug: "una-langosta-llamada-deseo" },
      { title: "Mensajero de la Muerte",          country: "Argentina",    dir: "Pedro Miguel Infante",        slug: "mensajero-de-la-muerte" },
      { title: "Miedo, Mi Enfermedad",            country: "Perú",         dir: "Hubert Eliot Salazar",        slug: "miedo-mi-enfermedad" },
      { title: "No es el Fin del Mundo",          country: "Colombia",     dir: "Sebastián Flórez",            slug: "no-es-el-fin-del-mundo" },
      { title: "No Todo lo que Brilla",           country: "Argentina",    dir: "Santiago Bárcena",            slug: "no-todo-lo-que-brilla" },
      { title: "Pactum",                          country: "España",       dir: "Pablo Otero",                 slug: "pactum" },
      { title: "Parasomnia",                      country: "España",       dir: "Daniel Noblom Gibert",        slug: "parasomnia" },
      { title: "La Pena no Duerme de Noche",      country: "Chile",        dir: "Josefina Montino, Martín André", slug: "la-pena-no-duerme-de-noche" },
      { title: "Prueba tu Suerte",                country: "Brasil",       dir: "Guenia Lemos",                slug: "prueba-tu-suerte" },
      { title: "¿Qué Comen los Dragones?",        country: "España",       dir: "Álvaro León",                 slug: "que-comen-los-dragones" },
      { title: "Serafín",                         country: "Argentina",    dir: "Daniel Martínez, Matías Juran",slug: "serafin" },
      { title: "Simon",                           country: "España",       dir: "LS David",                    slug: "simon" },
      { title: "Son las 12",                      country: "Argentina",    dir: "Andrés Brandariz",            slug: "son-las-12" },
      { title: "Suerte",                          country: "México",       dir: "Alejandro Alatorre",          slug: "suerte" },
      { title: "Sumergida",                       country: "Brasil",       dir: "Heloísa Cardoso",             slug: "sumergida" },
      { title: "El Tiempo que Guardamos",         country: "Colombia",     dir: "Jim Muñoz",                   slug: "el-tiempo-que-guardamos" },
      { title: "El Toro y el Bebé",               country: "España",       dir: "Igor García Piñas",           slug: "el-toro-y-el-bebe" },
      { title: "El Vocho del Averno",             country: "México",       dir: "Gerardo Oñate",               slug: "el-vocho-del-averno" },
    ],
  },
  {
    category: "Cortometrajes Uruguayos en Competencia",
    films: [
      { title: "Ahí Está",                        country: "Uruguay",      dir: "Diego Denis Gómez Matto",     slug: "ahi-esta" },
      { title: "Ahí Viene el Asesino, Abuela",    country: "Uruguay",      dir: "Simón B. Romero",             slug: "ahi-viene-el-asesino-abuela" },
      { title: "Amarre",                          country: "Uruguay",      dir: "Candela Saletros",            slug: "amarre" },
      { title: "Bichos Locos",                    country: "Uruguay",      dir: "Juan Pablo Bornio",           slug: "bichos-locos" },
      { title: "Captora de Almas",                country: "Uruguay",      dir: "Chiara Gutierrez",            slug: "captora-de-almas" },
      { title: "Carnival",                        country: "Uruguay",      dir: "Pablo Praino",                slug: "carnival" },
      { title: "DARE: Code Red",                  country: "Uruguay",      dir: "Andrés Magnone",              slug: "dare-code-red" },
      { title: "DARE: The Lion's Den",            country: "Uruguay",      dir: "Andrés Magnone",              slug: "dare-the-lions-den" },
      { title: "De Nuevo",                        country: "Uruguay",      dir: "Pablo César Silva Peralta",   slug: "de-nuevo" },
      { title: "El Nihilista",                    country: "Uruguay",      dir: "Ismael Díaz",                 slug: "el-nihilista" },
      { title: "Garra de Monte",                  country: "Uruguay",      dir: "Joaquín Ramírez",             slug: "garra-de-monte" },
      { title: "Hiperacusia",                     country: "Uruguay",      dir: "Raúl Pierri",                 slug: "hiperacusia" },
      { title: "La Copa Carmesí",                 country: "Uruguay",      dir: "Eduardo Granadsztejn",        slug: "la-copa-carmesi" },
      { title: "Muuuundos Extraños",              country: "Uruguay",      dir: "Sofía Lettier",               slug: "muuuundos-extranos" },
      { title: "Placebo",                         country: "Uruguay",      dir: "Nicolás Serrailh",            slug: "placebo" },
    ],
  },
];

// ── Venues ────────────────────────────────────────────────────────────────────

const VENUES_MVD = [
  { name: "Sala Lazaroff", address: "Av. 18 de Julio 1012", map: "https://maps.app.goo.gl/jZ9QWUsCLuvfo3xd8" },
  { name: "Centro Cultural Artesano", address: "Bv. Aparicio Saravia 4697, Peñarol", map: "https://maps.app.goo.gl/kubegFcEr9JFRgyRK" },
  { name: "Centro Cultural La Experimental", address: "Malvín", map: "https://maps.app.goo.gl/jetV7Lfvp6fe8A7EA" },
  { name: "Casa INJU", address: "Montevideo", map: "https://maps.app.goo.gl/02QEffoYx1ysz6s6d" },
  { name: "Centro Cultural Crece", address: "Flor de Maroñas", map: "https://maps.app.goo.gl/ncyGv6m882zn3LtDw" },
  { name: "Casa de Cultura del Prado", address: "Prado", map: "https://maps.app.goo.gl/4y9Bu6o5tRUOT9yyr" },
  { name: "Centro Cultural Terminal Goes", address: "Aguada", map: "https://maps.app.goo.gl/Kn27o7pjjmuXxjG47" },
  { name: "Alianza Francesa de Montevideo", address: "Montevideo", map: "https://www.google.com/maps/search/?api=1&query=Alianza+Francesa+de+Montevideo+Uruguay" },
  { name: "Mandrágora Casa Cultural", address: "Bartolomé Mitre 1323, Ciudad Vieja", map: "https://maps.app.goo.gl/qEa8SiacbvrVTFGe8" },
  { name: "Bar Fénix", address: "Juan Carlos Gómez 1251, Ciudad Vieja", map: "https://maps.app.goo.gl/B1uuRkP8Gk4ZCtNq7" },
  { name: "Cold Music Bar", address: "Soriano 1263, Centro", map: "https://maps.app.goo.gl/Ms5EfHu7FmuhSw8Z8" },
  { name: "Andrómeda Bar Cooperativo", address: "Durazno 902 esq. Convención", map: "https://maps.app.goo.gl/DZdFo42wQTPuJ9GV7" },
  { name: "Centro Cultural Florencio Sánchez", address: "Grecia 3281, Cerro", map: "https://maps.app.goo.gl/eLF5BiD99m9vjk23A" },
  { name: "Sala Zitarrosa", address: "Av. 18 de Julio 1012", map: "https://maps.app.goo.gl/jZ9QWUsCLuvfo3xd8" },
];

const VENUES_INTERIOR = [
  { name: "Teatro Escayola", address: "25 de Mayo 163", location: "TACUAREMBÓ", map: "https://maps.app.goo.gl/R7SK8pdfNGPzbXMt8" },
  { name: "Centro Recreativo Democrático", address: "Francisco Sastre, Ciudad del Carmen", location: "CIUDAD DEL CARMEN / DURAZNO", map: "https://maps.app.goo.gl/648fKX4JUogL4kk39" },
  { name: "Quimera", address: "Herrera 262", location: "ARTIGAS", map: "https://maps.app.goo.gl/3CM3vwGe62czJD7F6" },
  { name: "Centro Cultural Museo de Imagen y Memoria de Soca", address: "Av. Zenón Burgueño s/n", location: "SOCA / CANELONES", map: "https://maps.app.goo.gl/avb8zf36gN4sXdvr7" },
  { name: "Espacio Cultural Gobbi", address: "C. 18 de Julio 773", location: "PAYSANDÚ", map: "https://maps.app.goo.gl/HJLwnq8Vckapz7P17" },
  { name: "Cine Teatro Plaza", address: "Trinidad", location: "FLORES", map: "https://maps.app.goo.gl/qLaAoJGHxyT0kgFZa" },
  { name: "Centro Cultural AFE", address: "Estación AFE", location: "COLONIA", map: "https://maps.app.goo.gl/wbo7ZolcPNb0nwgX6" },
  { name: "Complejo Cultural Politeama", address: "Canelones", location: "CANELONES", map: "https://www.google.com/maps/search/?api=1&query=Politeama+Canelones+Uruguay" },
];

// ── Gallery ──────────────────────────────────────────────────────────────────
// Indices correspond to the source filenames: MVDF (N).jpg → mvdf-NN.webp
// Featured: 15 varied photos — no near-identical repeats
const GALLERY_FEATURED = [3, 7, 12, 16, 20, 24, 28, 32, 37, 40, 43, 45];
// All 45 photos for the complete collapsible gallery
const GALLERY_ALL = Array.from({ length: 45 }, (_, i) => i + 1);

// ── Section heading component ─────────────────────────────────────────────────
function SectionHeading({ id, label, count }: { id: string; label: string; count?: number | string }) {
  return (
    <div id={id} className="scroll-mt-20 mb-8">
      <div className="flex items-baseline gap-4 border-b pb-4" style={{ borderColor: "rgba(0,212,255,0.20)" }}>
        <h2 className="font-display text-3xl md:text-4xl text-white">{label.toUpperCase()}</h2>
        {count !== undefined && (
          <span className="font-sans text-sm text-text-secondary">{count}</span>
        )}
      </div>
    </div>
  );
}

// ── Award card component ──────────────────────────────────────────────────────
// Build a slug→poster map from FILMS_2026 for use in award cards
const FILM_POSTER_MAP: Record<string, string> = Object.fromEntries(
  FILMS_2026
    .filter((f) => f.poster)
    .map((f) => [f.slug, f.poster as string])
);

// Set of all valid film slugs — used to guard /film/ links in the schedule
const VALID_FILM_SLUGS = new Set(FILMS_2026.map((f) => f.slug));

function AwardCard({ prize, film, detail, country, slug, locale = "es" }: {
  prize: string; film: string; detail?: string; country?: string; slug?: string; locale?: string;
}) {
  const poster = slug ? (FILM_POSTER_MAP[slug] ?? null) : null;
  const translatedPrize = (PRIZE_TRANSLATIONS[locale] ?? {})[prize] ?? prize;
  const displayFilm = getFilmTitleForLocale(slug, film, locale);
  return (
    <div
      className="p-5 flex gap-4 items-start"
      style={{
        background: "rgba(162,89,247,0.05)",
        border: "1px solid rgba(162,89,247,0.18)",
        borderLeft: "3px solid rgba(162,89,247,0.65)",
      }}
    >
      {poster && (
        <div
          className="flex-shrink-0 w-16 md:w-20 self-start"
          style={{ border: "1px solid rgba(162,89,247,0.22)" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={poster}
            alt={film}
            className="w-full h-auto block"
            style={{ display: "block" }}
          />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <p className="font-sans text-xs uppercase tracking-widest font-semibold mb-2"
          style={{ color: "rgba(162,89,247,0.95)" }}>
          {translatedPrize}
        </p>
        {slug ? (
          <Link
            href={`/${locale}/film/${slug}`}
            className="font-display text-2xl text-white hover:text-plasma transition-colors leading-snug block mb-1"
          >
            {displayFilm}
          </Link>
        ) : (
          <p className="font-display text-2xl text-white leading-snug mb-1">{displayFilm}</p>
        )}
        {detail && <p className="font-sans text-base text-text-secondary mt-2">{detail}</p>}
        {country && <p className="font-sans text-sm text-text-muted mt-1">{country}</p>}
      </div>
    </div>
  );
}

// ── UI translations for locale-aware rendering ───────────────────────────────
const ARCHIVE_UI: Record<string, {
  breadcrumbArchive: string;
  heroBadge: string;
  heroDate: string;
  heroDesc: (n: number) => string;
  statFilms: string;
  statDays: string;
  statVenues: string;
  anchors: { id: string; label: string }[];
  sectPremios: string; sectPeliculas: string; sectSedes: string;
  sectProg: string; sectJurado: string; sectGaleria: string;
  sectGala: string; sectEquipo: string;
  venuesIntLabel: string;
  mapLink: string;
  screeningCount: (n: number) => string;
  shortBlockLabel: string;
  posterSoon: string;
  galleryFeaturedLabel: (n: number) => string;
  galleryAllLabel: (n: number) => string;
  galleryViewAll: string;
  galleryCredit: string;
  juryTitle: string;
  juryDesc: string;
  juryLink: string;
  awardOfficialFeature: string;
  awardIberoFeature: string;
  awardDocumentary: string;
  awardUruguayan: string;
  awardOfficialMedium: string;
  awardOfficialShort: string;
  awardAudience: string;
  awardMentions: string;
  awardPrizeCount: (n: number) => string;
  mentionCount: (n: number) => string;
  competitionNames: Record<string, string>;
  acauLabel: string;
  acauText1: string;
  acauText2: string;
  roleDir: string; roleProd: string; roleProdCoord: string;
  roleConduccion: string; roleAsist: string; roleSel: string;
  galaBadge: string; galaDesc: string; galaLink: string;
  openTitles: (n: number) => string;
  closeTitles: (n: number) => string;
  backAll: string;
}> = {
  es: {
    breadcrumbArchive: "Archivo",
    heroBadge: "EDICIÓN XVI · ARCHIVO",
    heroDate: "8 de mayo al 28 de junio de 2026",
    heroDesc: (n) => `La decimosexta edición del Festival Montevideo Fantástico se extendió del 8 de mayo al 28 de junio de 2026, con funciones gratuitas en 14 sedes de Montevideo y 8 del interior del país. Una selección de ${n} películas de más de 30 países en competencia, más novedades y funciones especiales.`,
    statFilms: "películas",
    statDays: "días",
    statVenues: "sedes",
    anchors: [
      { id: "premios",      label: "Premios" },
      { id: "peliculas",    label: "Películas" },
      { id: "sedes",        label: "Sedes" },
      { id: "programacion", label: "Programación" },
      { id: "jurado",       label: "Jurado" },
      { id: "galeria",      label: "Galería" },
      { id: "gala",         label: "Gala" },
      { id: "equipo",       label: "Equipo" },
    ],
    sectPremios: "Premios", sectPeliculas: "Películas Seleccionadas", sectSedes: "22 Sedes",
    sectProg: "Programación por Salas", sectJurado: "Jurado", sectGaleria: "Galería",
    sectGala: "Gala de premiación", sectEquipo: "Equipo",
    venuesIntLabel: "Interior del país",
    mapLink: "Ver mapa →",
    screeningCount: (n) => `${n} ${n === 1 ? "función" : "funciones"}`,
    shortBlockLabel: "Programa de cortometrajes",
    posterSoon: "Afiche próximamente",
    galleryFeaturedLabel: (n) => `Galería destacada · ${n} fotos`,
    galleryAllLabel: (n) => `Galería completa · ${n} fotos`,
    galleryViewAll: "Ver todas",
    galleryCredit: "Registro fotográfico de la entrega de premios de Montevideo Fantástico XVI, realizada el 28 de junio de 2026 en el Centro Cultural Artesano. Fotografías:",
    juryTitle: "Jurado MVF XVI · 2026",
    juryDesc: "El jurado de esta edición estuvo integrado por artistas, críticos y creadores de Uruguay y la región, responsables de evaluar las competencias oficiales de largometrajes y cortometrajes.",
    juryLink: "Ver jurado completo →",
    awardOfficialFeature: "Competencia Oficial de Largometrajes",
    awardIberoFeature: "Competencia Iberoamericana de Largometrajes",
    awardDocumentary: "Documentales en Competencia",
    awardUruguayan: "Competencia Uruguaya de Largometrajes",
    awardOfficialMedium: "Competencia Oficial de Mediometrajes",
    awardOfficialShort: "Competencia Oficial de Cortometrajes",
    awardAudience: "Premios del Público",
    awardMentions: "Menciones Especiales",
    awardPrizeCount: (n) => `${n} ${n === 1 ? "premio" : "premios"}`,
    mentionCount: (n) => `${n} menciones`,
    competitionNames: {},
    acauLabel: "Apoyo institucional",
    acauText1: "Montevideo Fantástico XVI agradece el apoyo de ACAU, Agencia del Cine y el Audiovisual del Uruguay.",
    acauText2: "El apoyo público a la cultura permitió sostener funciones gratuitas, ampliar la circulación de obras independientes y acercar el cine fantástico a públicos que muchas veces quedan fuera de los circuitos comerciales tradicionales. En una edición extendida, con funciones en Montevideo y en distintas regiones del país, este acompañamiento fue clave para que más comunidades pudieran acceder a la programación.",
    roleDir: "Dirección y programación",
    roleProd: "Producción, organización, diseño y gestión del sitio web",
    roleProdCoord: "Producción, organización y coordinación de salas",
    roleConduccion: "Conducción de la entrega de premios",
    roleAsist: "Asistencia",
    roleSel: "Selección de cortometrajes y mediometrajes",
    galaBadge: "28 de junio de 2026 · Centro Cultural Artesano · Montevideo",
    galaDesc: "La gala de premiación de Montevideo Fantástico XVI se realizó el 28 de junio de 2026 en el Centro Cultural Artesano, en Montevideo. Fue el cierre de una edición extendida de 52 días y reunió a realizadores, jurados, público y equipo en torno a los premios del festival.",
    galaLink: "Ver registro audiovisual en YouTube ↗",
    openTitles: (n) => `ABRIR LOS ${n} TÍTULOS`,
    closeTitles: (n) => `CERRAR LOS ${n} TÍTULOS`,
    backAll: "← Todas las ediciones",
  },
  en: {
    breadcrumbArchive: "Archive",
    heroBadge: "EDITION XVI · ARCHIVE",
    heroDate: "8 May to 28 June 2026",
    heroDesc: (n) => `The sixteenth edition of Montevideo Fantástico ran from 8 May to 28 June 2026, with free screenings across 14 venues in Montevideo and 8 venues in the rest of Uruguay. It featured ${n} films from more than 30 countries, in competition sections, new programmes and special screenings.`,
    statFilms: "Films",
    statDays: "Days",
    statVenues: "Venues",
    anchors: [
      { id: "premios",      label: "Awards" },
      { id: "peliculas",    label: "Films" },
      { id: "sedes",        label: "Venues" },
      { id: "programacion", label: "Programme" },
      { id: "jurado",       label: "Jury" },
      { id: "galeria",      label: "Gallery" },
      { id: "gala",         label: "Ceremony" },
      { id: "equipo",       label: "Team" },
    ],
    sectPremios: "Awards", sectPeliculas: "Selected Films", sectSedes: "22 Venues",
    sectProg: "Screenings by Venue", sectJurado: "Jury", sectGaleria: "Gallery",
    sectGala: "Awards Ceremony", sectEquipo: "Team",
    venuesIntLabel: "Rest of Uruguay",
    mapLink: "View map →",
    screeningCount: (n) => `${n} ${n === 1 ? "screening" : "screenings"}`,
    shortBlockLabel: "Short film programme",
    posterSoon: "Poster coming soon",
    galleryFeaturedLabel: (n) => `Featured gallery · ${n} photos`,
    galleryAllLabel: (n) => `Complete gallery · ${n} photos`,
    galleryViewAll: "View all",
    galleryCredit: "Photographs from the XVI awards ceremony, held on 28 June 2026 at Centro Cultural Artesano. Photography:",
    juryTitle: "MVF XVI Jury · 2026",
    juryDesc: "The jury for this edition was composed of artists, critics and creators from Uruguay and the region, responsible for evaluating the official competitions for feature films and short films.",
    juryLink: "View full jury →",
    awardOfficialFeature: "Official Feature Film Competition",
    awardIberoFeature: "Ibero-American Feature Film Competition",
    awardDocumentary: "Documentary Competition",
    awardUruguayan: "Uruguayan Feature Film Competition",
    awardOfficialMedium: "Official Medium-Length Film Competition",
    awardOfficialShort: "Official Short Film Competition",
    awardAudience: "Audience Awards",
    awardMentions: "Special Mentions",
    awardPrizeCount: (n) => `${n} ${n === 1 ? "award" : "awards"}`,
    mentionCount: (n) => `${n} ${n === 1 ? "mention" : "mentions"}`,
    competitionNames: {
      "Competencia Oficial de Largometrajes": "Official Feature Film Competition",
      "Competencia Iberoamericana de Largometrajes": "Ibero-American Feature Film Competition",
      "Competencia Uruguaya de Largometrajes": "Uruguayan Feature Film Competition",
      "Competencia Oficial de Mediometrajes": "Official Medium-Length Film Competition",
      "Competencia Oficial de Cortometrajes": "Official Short Film Competition",
      "Competencia Iberoamericana de Cortometrajes": "Ibero-American Short Film Competition",
      "Competencia Uruguaya de Cortometrajes": "Uruguayan Short Film Competition",
    },
    acauLabel: "Institutional support",
    acauText1: "Montevideo Fantástico XVI acknowledges the support of ACAU, Uruguay's Film and Audiovisual Agency.",
    acauText2: "Public support for culture made it possible to sustain free screenings, extend the reach of independent works and bring genre cinema to audiences who are often outside traditional commercial circuits. Across an extended edition, with screenings in Montevideo and in different regions of the country, this support was essential for more communities to access the programme.",
    roleDir: "Direction and programming",
    roleProd: "Production, organisation, design and website",
    roleProdCoord: "Production, organisation and venue coordination",
    roleConduccion: "Awards ceremony hosts",
    roleAsist: "Ceremony assistance",
    roleSel: "Short and medium-length film selection",
    galaBadge: "28 June 2026 · Centro Cultural Artesano · Montevideo",
    galaDesc: "The Montevideo Fantástico XVI awards ceremony took place on 28 June 2026 at Centro Cultural Artesano in Montevideo. It closed a 52-day edition and brought together filmmakers, juries, audiences and the festival team around the festival awards.",
    galaLink: "Watch the ceremony on YouTube ↗",
    openTitles: (n) => `SHOW ${n} FILMS`,
    closeTitles: (n) => `HIDE ${n} FILMS`,
    backAll: "← All editions",
  },
  pt: {
    breadcrumbArchive: "Arquivo",
    heroBadge: "EDIÇÃO XVI · ARQUIVO",
    heroDate: "8 de maio a 28 de junho de 2026",
    heroDesc: (n) => `A décima sexta edição do Montevideo Fantástico aconteceu de 8 de maio a 28 de junho de 2026, com sessões gratuitas em 14 sedes de Montevidéu e 8 sedes no interior do Uruguai. A seleção reuniu ${n} filmes de mais de 30 países, entre mostras competitivas, novas seções e sessões especiais.`,
    statFilms: "Filmes",
    statDays: "Dias",
    statVenues: "Sedes",
    anchors: [
      { id: "premios",      label: "Prêmios" },
      { id: "peliculas",    label: "Filmes" },
      { id: "sedes",        label: "Sedes" },
      { id: "programacion", label: "Programação" },
      { id: "jurado",       label: "Júri" },
      { id: "galeria",      label: "Galeria" },
      { id: "gala",         label: "Cerimônia" },
      { id: "equipo",       label: "Equipe" },
    ],
    sectPremios: "Prêmios", sectPeliculas: "Filmes Selecionados", sectSedes: "22 Sedes",
    sectProg: "Programação por Sala", sectJurado: "Júri", sectGaleria: "Galeria",
    sectGala: "Cerimônia de Premiação", sectEquipo: "Equipe",
    venuesIntLabel: "Interior do Uruguai",
    mapLink: "Ver mapa →",
    screeningCount: (n) => `${n} ${n === 1 ? "sessão" : "sessões"}`,
    shortBlockLabel: "Programa de curtas",
    posterSoon: "Cartaz em breve",
    galleryFeaturedLabel: (n) => `Galeria em destaque · ${n} fotos`,
    galleryAllLabel: (n) => `Galeria completa · ${n} fotos`,
    galleryViewAll: "Ver todas",
    galleryCredit: "Registro fotográfico da cerimônia de premiação do XVI, realizada em 28 de junho de 2026 no Centro Cultural Artesano. Fotografias:",
    juryTitle: "Júri MVF XVI · 2026",
    juryDesc: "O júri desta edição foi composto por artistas, críticos e criadores do Uruguai e da região, responsáveis por avaliar as competências oficiais de longas-metragens e curtas-metragens.",
    juryLink: "Ver júri completo →",
    awardOfficialFeature: "Competência Oficial de Longas-metragens",
    awardIberoFeature: "Competência Ibero-americana de Longas-metragens",
    awardDocumentary: "Documentários em Competência",
    awardUruguayan: "Competência Uruguaia de Longas-metragens",
    awardOfficialMedium: "Competência Oficial de Médias-metragens",
    awardOfficialShort: "Competência Oficial de Curtas-metragens",
    awardAudience: "Prêmios do Público",
    awardMentions: "Menções Especiais",
    awardPrizeCount: (n) => `${n} ${n === 1 ? "prêmio" : "prêmios"}`,
    mentionCount: (n) => `${n} ${n === 1 ? "menção" : "menções"}`,
    competitionNames: {
      "Competencia Oficial de Largometrajes": "Competência Oficial de Longas-metragens",
      "Competencia Iberoamericana de Largometrajes": "Competência Ibero-americana de Longas-metragens",
      "Competencia Uruguaya de Largometrajes": "Competência Uruguaia de Longas-metragens",
      "Competencia Oficial de Mediometrajes": "Competência Oficial de Médias-metragens",
      "Competencia Oficial de Cortometrajes": "Competência Oficial de Curtas-metragens",
      "Competencia Iberoamericana de Cortometrajes": "Competência Ibero-americana de Curtas-metragens",
      "Competencia Uruguaya de Cortometrajes": "Competência Uruguaia de Curtas-metragens",
    },
    acauLabel: "Apoio institucional",
    acauText1: "O Montevideo Fantástico XVI agradece o apoio da ACAU, Agência do Cinema e o Audiovisual do Uruguai.",
    acauText2: "O apoio público à cultura permitiu manter sessões gratuitas, ampliar a circulação de obras independentes e levar o cinema fantástico a públicos que muitas vezes ficam fora dos circuitos comerciais tradicionais. Em uma edição ampliada, com sessões em Montevidéu e em diversas regiões do país, esse acompanhamento foi essencial para que mais comunidades acessassem a programação.",
    roleDir: "Direção e programação",
    roleProd: "Produção, organização, design e gestão do site",
    roleProdCoord: "Produção, organização e coordenação de salas",
    roleConduccion: "Condução da cerimônia de premiação",
    roleAsist: "Assistência de cerimônia",
    roleSel: "Seleção de curtas e médias-metragens",
    galaBadge: "28 de junho de 2026 · Centro Cultural Artesano · Montevidéu",
    galaDesc: "A cerimônia de premiação do Montevideo Fantástico XVI aconteceu em 28 de junho de 2026 no Centro Cultural Artesano, em Montevidéu. Foi o encerramento de uma edição de 52 dias e reuniu realizadores, júris, público e equipe em torno dos prêmios do festival.",
    galaLink: "Assistir à cerimônia no YouTube ↗",
    openTitles: (n) => `ABRIR OS ${n} TÍTULOS`,
    closeTitles: (n) => `FECHAR OS ${n} TÍTULOS`,
    backAll: "← Todas as edições",
  },
};

// ── Main page component ───────────────────────────────────────────────────────
export default function Archive2026Page({ params }: { params: { locale: string } }) {
  const locale = (params?.locale ?? "es") as string;
  const ui = ARCHIVE_UI[locale] ?? ARCHIVE_UI.es;

  // Quick-nav anchor IDs
  const ANCHORS = ui.anchors;

  const totalFilms = FILMS_2026.length;

  return (
    <div className="container-wide section-padding">
      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-8 md:gap-14 mb-16 items-start">
        {/* Poster */}
        <div className="max-w-[200px] mx-auto md:max-w-none md:mx-0 flex-shrink-0">
          <div style={{ border: "1px solid rgba(0,212,255,0.15)" }}>
            <Image
              src="/media/archive/XVI/poster.jpg"
              alt="Poster Montevideo Fantástico XVI"
              width={520}
              height={740}
              className="w-full h-auto block"
              priority
            />
          </div>
        </div>
        {/* Info */}
        <div>
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 mb-5 text-xs text-text-muted" aria-label="Breadcrumb">
            <Link href={`/${locale}/archivo`} className="hover:text-plasma transition-colors">{ui.breadcrumbArchive}</Link>
            <span>/</span>
            <span className="text-text-secondary">2026</span>
          </nav>

          <p className="font-sans text-[10px] uppercase tracking-[0.35em] mb-3 font-semibold"
            style={{ color: "rgba(162,89,247,0.9)" }}>
            {ui.heroBadge}
          </p>

          <h1 className="font-display text-white leading-none mb-4"
            style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)" }}>
            MONTEVIDEO<br />FANTÁSTICO XVI
          </h1>

          <div className="h-px w-16 mb-6" style={{ background: "linear-gradient(90deg, #a259f7, #00d4ff)" }} />

          <p className="text-base text-text-secondary mb-6">
            {ui.heroDate}
          </p>

          {/* Key stats */}
          <div className="flex flex-wrap gap-8 mb-8">
            {[
              { value: totalFilms.toString(), label: ui.statFilms },
              { value: "52", label: ui.statDays },
              { value: "22", label: ui.statVenues },
            ].map(({ value, label }) => (
              <div key={label}>
                <p className="font-display text-4xl text-white leading-none"
                  style={{ WebkitTextStroke: "1px rgba(0,212,255,0.4)" }}>
                  {value}
                </p>
                <p className="font-sans text-xs uppercase tracking-widest text-text-muted mt-1">{label}</p>
              </div>
            ))}
          </div>

          <p className="text-base leading-relaxed mb-8" style={{ color: "rgba(255,255,255,0.70)", maxWidth: "48rem" }}>
            {ui.heroDesc(totalFilms)}
          </p>

          {/* Quick navigation */}
          <nav aria-label="Secciones del archivo" className="flex flex-wrap gap-2">
            {ANCHORS.map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                className="font-sans text-[11px] uppercase tracking-widest px-4 py-2 transition-colors"
                style={{ border: "1px solid rgba(0,212,255,0.25)", color: "rgba(0,212,255,0.80)" }}
              >
                {label}
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* ── PREMIOS ────────────────────────────────────────────────────── */}
      <section className="mb-20">
        <SectionHeading id="premios" label={ui.sectPremios} />

        <div className="flex flex-col gap-3">

          {/* Competencia Oficial de Largometrajes */}
          <details className="group/ap-oficial">
            <summary className="list-none cursor-pointer select-none">
              <div className="flex items-center gap-3 py-3 px-1" style={{ borderBottom: "1px solid rgba(162,89,247,0.22)" }}>
                <span className="font-sans font-bold text-lg w-6 text-center flex-shrink-0 group-open/ap-oficial:hidden" style={{ color: "rgba(162,89,247,0.85)" }}>+</span>
                <span className="font-sans font-bold text-lg w-6 text-center flex-shrink-0 hidden group-open/ap-oficial:inline" style={{ color: "rgba(162,89,247,0.85)" }}>−</span>
                <h3 className="font-sans text-base font-semibold flex-1" style={{ color: "rgba(162,89,247,0.95)" }}>{ui.awardOfficialFeature}</h3>
                <span className="font-sans text-sm group-open/ap-oficial:hidden" style={{ color: "rgba(162,89,247,0.55)" }}>{ui.awardPrizeCount(OFFICIAL_AWARDS.length)}</span>
              </div>
            </summary>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 pb-4">
                  {OFFICIAL_AWARDS.map((a) => <AwardCard key={a.prize} {...a} locale={locale} />)}
            </div>
          </details>

          {/* Competencia Iberoamericana de Largometrajes */}
          <details className="group/ap-ibero">
            <summary className="list-none cursor-pointer select-none">
              <div className="flex items-center gap-3 py-3 px-1" style={{ borderBottom: "1px solid rgba(162,89,247,0.22)" }}>
                <span className="font-sans font-bold text-lg w-6 text-center flex-shrink-0 group-open/ap-ibero:hidden" style={{ color: "rgba(162,89,247,0.85)" }}>+</span>
                <span className="font-sans font-bold text-lg w-6 text-center flex-shrink-0 hidden group-open/ap-ibero:inline" style={{ color: "rgba(162,89,247,0.85)" }}>−</span>
                <h3 className="font-sans text-base font-semibold flex-1" style={{ color: "rgba(162,89,247,0.95)" }}>{ui.awardIberoFeature}</h3>
                <span className="font-sans text-sm group-open/ap-ibero:hidden" style={{ color: "rgba(162,89,247,0.55)" }}>{ui.awardPrizeCount(IBEROAMERICAN_AWARDS.length)}</span>
              </div>
            </summary>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 pb-4">
              {IBEROAMERICAN_AWARDS.map((a) => <AwardCard key={a.prize} {...a} locale={locale} />)}
            </div>
          </details>

          {/* Documentales en Competencia */}
          <details className="group/ap-docs">
            <summary className="list-none cursor-pointer select-none">
              <div className="flex items-center gap-3 py-3 px-1" style={{ borderBottom: "1px solid rgba(162,89,247,0.22)" }}>
                <span className="font-sans font-bold text-lg w-6 text-center flex-shrink-0 group-open/ap-docs:hidden" style={{ color: "rgba(162,89,247,0.85)" }}>+</span>
                <span className="font-sans font-bold text-lg w-6 text-center flex-shrink-0 hidden group-open/ap-docs:inline" style={{ color: "rgba(162,89,247,0.85)" }}>−</span>
                <h3 className="font-sans text-base font-semibold flex-1" style={{ color: "rgba(162,89,247,0.95)" }}>{ui.awardDocumentary}</h3>
                <span className="font-sans text-sm group-open/ap-docs:hidden" style={{ color: "rgba(162,89,247,0.55)" }}>{ui.awardPrizeCount(DOCUMENTARY_AWARDS.length)}</span>
              </div>
            </summary>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 pb-4">
              {DOCUMENTARY_AWARDS.map((a) => <AwardCard key={a.prize} {...a} locale={locale} />)}
            </div>
          </details>

          {/* Competencia Uruguaya de Largometrajes */}
          <details className="group/ap-uru">
            <summary className="list-none cursor-pointer select-none">
              <div className="flex items-center gap-3 py-3 px-1" style={{ borderBottom: "1px solid rgba(162,89,247,0.22)" }}>
                <span className="font-sans font-bold text-lg w-6 text-center flex-shrink-0 group-open/ap-uru:hidden" style={{ color: "rgba(162,89,247,0.85)" }}>+</span>
                <span className="font-sans font-bold text-lg w-6 text-center flex-shrink-0 hidden group-open/ap-uru:inline" style={{ color: "rgba(162,89,247,0.85)" }}>−</span>
                <h3 className="font-sans text-base font-semibold flex-1" style={{ color: "rgba(162,89,247,0.95)" }}>{ui.awardUruguayan}</h3>
                <span className="font-sans text-sm group-open/ap-uru:hidden" style={{ color: "rgba(162,89,247,0.55)" }}>{ui.awardPrizeCount(URUGUAYAN_AWARDS.length)}</span>
              </div>
            </summary>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 pb-4">
              {URUGUAYAN_AWARDS.map((a) => <AwardCard key={a.prize} {...a} locale={locale} />)}
            </div>
          </details>

          {/* Competencia Oficial de Mediometrajes */}
          <details className="group/ap-medio">
            <summary className="list-none cursor-pointer select-none">
              <div className="flex items-center gap-3 py-3 px-1" style={{ borderBottom: "1px solid rgba(162,89,247,0.22)" }}>
                <span className="font-sans font-bold text-lg w-6 text-center flex-shrink-0 group-open/ap-medio:hidden" style={{ color: "rgba(162,89,247,0.85)" }}>+</span>
                <span className="font-sans font-bold text-lg w-6 text-center flex-shrink-0 hidden group-open/ap-medio:inline" style={{ color: "rgba(162,89,247,0.85)" }}>−</span>
                <h3 className="font-sans text-base font-semibold flex-1" style={{ color: "rgba(162,89,247,0.95)" }}>{ui.awardOfficialMedium}</h3>
                <span className="font-sans text-sm group-open/ap-medio:hidden" style={{ color: "rgba(162,89,247,0.55)" }}>{ui.awardPrizeCount(MEDIUM_AWARDS.length)}</span>
              </div>
            </summary>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 pb-4">
              {MEDIUM_AWARDS.map((a) => <AwardCard key={a.prize} {...a} locale={locale} />)}
            </div>
          </details>

          {/* Competencia Oficial de Cortometrajes */}
          <details className="group/ap-corto">
            <summary className="list-none cursor-pointer select-none">
              <div className="flex items-center gap-3 py-3 px-1" style={{ borderBottom: "1px solid rgba(162,89,247,0.22)" }}>
                <span className="font-sans font-bold text-lg w-6 text-center flex-shrink-0 group-open/ap-corto:hidden" style={{ color: "rgba(162,89,247,0.85)" }}>+</span>
                <span className="font-sans font-bold text-lg w-6 text-center flex-shrink-0 hidden group-open/ap-corto:inline" style={{ color: "rgba(162,89,247,0.85)" }}>−</span>
                <h3 className="font-sans text-base font-semibold flex-1" style={{ color: "rgba(162,89,247,0.95)" }}>{ui.awardOfficialShort}</h3>
                <span className="font-sans text-sm group-open/ap-corto:hidden" style={{ color: "rgba(162,89,247,0.55)" }}>{ui.awardPrizeCount(SHORT_AWARDS.length)}</span>
              </div>
            </summary>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 pb-4">
              {SHORT_AWARDS.map((a) => <AwardCard key={a.prize} {...a} locale={locale} />)}
            </div>
          </details>

          {/* Premios del Público */}
          <details className="group/ap-publico">
            <summary className="list-none cursor-pointer select-none">
              <div className="flex items-center gap-3 py-3 px-1" style={{ borderBottom: "1px solid rgba(162,89,247,0.22)" }}>
                <span className="font-sans font-bold text-lg w-6 text-center flex-shrink-0 group-open/ap-publico:hidden" style={{ color: "rgba(162,89,247,0.85)" }}>+</span>
                <span className="font-sans font-bold text-lg w-6 text-center flex-shrink-0 hidden group-open/ap-publico:inline" style={{ color: "rgba(162,89,247,0.85)" }}>−</span>
                <h3 className="font-sans text-base font-semibold flex-1" style={{ color: "rgba(162,89,247,0.95)" }}>{ui.awardAudience}</h3>
                <span className="font-sans text-sm group-open/ap-publico:hidden" style={{ color: "rgba(162,89,247,0.55)" }}>{ui.awardPrizeCount(AUDIENCE_AWARDS.length)}</span>
              </div>
            </summary>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 pb-4">
              {AUDIENCE_AWARDS.map((a) => <AwardCard key={a.prize} {...a} locale={locale} />)}
            </div>
          </details>

          {/* Menciones Especiales */}
          <details className="group/ap-menciones">
            <summary className="list-none cursor-pointer select-none">
              <div className="flex items-center gap-3 py-3 px-1" style={{ borderBottom: "1px solid rgba(162,89,247,0.22)" }}>
                <span className="font-sans font-bold text-lg w-6 text-center flex-shrink-0 group-open/ap-menciones:hidden" style={{ color: "rgba(162,89,247,0.85)" }}>+</span>
                <span className="font-sans font-bold text-lg w-6 text-center flex-shrink-0 hidden group-open/ap-menciones:inline" style={{ color: "rgba(162,89,247,0.85)" }}>−</span>
                <h3 className="font-sans text-base font-semibold flex-1" style={{ color: "rgba(162,89,247,0.95)" }}>{ui.awardMentions}</h3>
                <span className="font-sans text-sm group-open/ap-menciones:hidden" style={{ color: "rgba(162,89,247,0.55)" }}>{ui.mentionCount(MENTIONS.reduce((acc, m) => acc + m.items.length, 0))}</span>
              </div>
            </summary>
            <div className="mt-4 flex flex-col gap-8 pb-4">
              {MENTIONS.map(({ section, items }) => (
                <div key={section}>
                  <p className="font-sans text-sm uppercase tracking-widest font-medium mb-3" style={{ color: "rgba(162,89,247,0.65)" }}>
                    {ui.competitionNames[section] ?? section}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                    {items.map((m) => <AwardCard key={m.prize} {...m} locale={locale} />)}
                  </div>
                </div>
              ))}
            </div>
          </details>

        </div>
      </section>

      {/* ── PELÍCULAS SELECCIONADAS ────────────────────────────────────── */}
      <section className="mb-20">
        <SectionHeading id="peliculas" label={ui.sectPeliculas} count={`${FILMS_2026.length}`} />

        {(() => {
          const byCategory = getFilmsByCategory();
          return Array.from(byCategory.entries()).map(([cat, films]) => (
            <details key={cat} className="mb-10 group/cat">
              <summary className="list-none cursor-pointer select-none">
                <div className="flex items-center gap-3 pb-3" style={{ borderBottom: "1px solid rgba(0,212,255,0.18)" }}>
                  <span className="font-sans text-plasma text-base font-bold w-5 text-center flex-shrink-0 group-open/cat:hidden" aria-hidden="true">+</span>
                  <span className="font-sans text-plasma text-base font-bold w-5 text-center flex-shrink-0 hidden group-open/cat:inline" aria-hidden="true">−</span>
                  <h3 className="font-sans text-xs sm:text-sm uppercase tracking-[0.2em] text-plasma font-semibold flex-1">
                    {getCategoryLabel(cat, locale)}
                  </h3>
                  <span className="font-sans text-[11px] font-semibold tracking-[0.12em] group-open/cat:hidden" style={{ color: "rgba(0,212,255,0.85)" }}>
                    {ui.openTitles(films.length)}
                  </span>
                  <span className="font-sans text-[11px] font-semibold tracking-[0.12em] hidden group-open/cat:inline" style={{ color: "rgba(0,212,255,0.85)" }}>
                    {ui.closeTitles(films.length)}
                  </span>
                </div>
              </summary>

              <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {films.map((film) => (
                  <Link
                    key={film.slug}
                    href={`/es/film/${film.slug}`}
                    className="group block"
                  >
                    <article>
                      <div
                        className="relative aspect-[2/3] overflow-hidden mb-3"
                        style={{ background: "#0c1220", border: "1px solid rgba(255,255,255,0.07)" }}
                      >
                        {film.poster ? (
                          <Image
                            src={film.poster}
                            alt={film.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center px-2">
                            <span className="font-display text-text-muted text-[10px] uppercase tracking-widest text-center">
                              {ui.posterSoon}
                            </span>
                          </div>
                        )}
                        <div
                          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          style={{ background: "linear-gradient(to top, rgba(0,212,255,0.25) 0%, transparent 60%)" }}
                        />
                        <span
                          className="absolute top-2 left-2 font-sans text-[9px] uppercase tracking-widest px-1.5 py-0.5"
                          style={{ background: "rgba(7,11,20,0.80)", border: "1px solid rgba(0,212,255,0.20)", color: "#00d4ff" }}
                        >
                          {film.country.split(" / ")[0]}
                        </span>
                      </div>
                      <h4 className="font-display text-base md:text-lg font-semibold text-white leading-snug line-clamp-2 mb-1.5 group-hover:text-plasma transition-colors">
                        {getFilmTitle(film, locale)}
                      </h4>
                      <p className="font-sans text-xs md:text-sm" style={{ color: "rgba(255,255,255,0.60)" }}>
                        Dir. {film.technical_sheet.direction}
                      </p>
                      <p className="font-sans text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.45)" }}>
                        {film.technical_sheet.duration_minutes} min
                      </p>
                    </article>
                  </Link>
                ))}
              </div>
            </details>
          ));
        })()}
      </section>

      {/* ── SEDES ──────────────────────────────────────────────────────── */}
      <section className="mb-20">
        <SectionHeading id="sedes" label={ui.sectSedes} />

        <div className="flex flex-col gap-3">

          {/* Montevideo */}
          <details className="group/sedes-mvd">
            <summary className="list-none cursor-pointer select-none">
              <div className="flex items-center gap-3 py-3 px-1" style={{ borderBottom: "1px solid rgba(0,212,255,0.20)" }}>
                <span className="font-sans font-bold text-lg w-6 text-center flex-shrink-0 group-open/sedes-mvd:hidden" style={{ color: "rgba(0,212,255,0.80)" }}>+</span>
                <span className="font-sans font-bold text-lg w-6 text-center flex-shrink-0 hidden group-open/sedes-mvd:inline" style={{ color: "rgba(0,212,255,0.80)" }}>−</span>
                <h3 className="font-sans text-base font-semibold flex-1" style={{ color: "rgba(0,212,255,0.95)" }}>
                  Montevideo{" "}
                  <span className="font-normal" style={{ color: "rgba(0,212,255,0.50)" }}>({VENUES_MVD.length})</span>
                </h3>
              </div>
            </summary>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-4">
              {VENUES_MVD.map((v) => (
                <div
                  key={v.name}
                  className="flex flex-col overflow-hidden"
                  style={{ background: "rgba(0,212,255,0.03)", border: "1px solid rgba(0,212,255,0.14)", borderLeft: "3px solid rgba(0,212,255,0.50)" }}
                >
                  {VENUE_PHOTO_MAP[v.name] && (
                    <div className="relative overflow-hidden flex-shrink-0" style={{ aspectRatio: "16/9" }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={VENUE_PHOTO_MAP[v.name]} alt={v.name} className="w-full h-full object-cover" loading="lazy" />
                    </div>
                  )}
                  <div className="flex flex-col gap-3 p-4 flex-1">
                    <div className="flex-1 min-w-0">
                      <p className="font-display text-lg text-white leading-snug mb-1">{v.name}</p>
                      <p className="font-sans text-sm text-text-secondary">{v.address}</p>
                    </div>
                    <a
                      href={v.map}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="self-start font-sans text-xs uppercase tracking-widest px-3 py-2 hover:text-plasma transition-colors"
                      style={{ border: "1px solid rgba(0,212,255,0.25)", color: "rgba(0,212,255,0.75)" }}
                    >
                      {ui.mapLink}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </details>

          {/* Interior del país */}
          <details className="group/sedes-int">
            <summary className="list-none cursor-pointer select-none">
              <div className="flex items-center gap-3 py-3 px-1" style={{ borderBottom: "1px solid rgba(0,212,255,0.20)" }}>
                <span className="font-sans font-bold text-lg w-6 text-center flex-shrink-0 group-open/sedes-int:hidden" style={{ color: "rgba(0,212,255,0.80)" }}>+</span>
                <span className="font-sans font-bold text-lg w-6 text-center flex-shrink-0 hidden group-open/sedes-int:inline" style={{ color: "rgba(0,212,255,0.80)" }}>−</span>
                <h3 className="font-sans text-base font-semibold flex-1" style={{ color: "rgba(0,212,255,0.95)" }}>
                  {ui.venuesIntLabel}{" "}
                  <span className="font-normal" style={{ color: "rgba(0,212,255,0.50)" }}>({VENUES_INTERIOR.length})</span>
                </h3>
              </div>
            </summary>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-4">
              {VENUES_INTERIOR.map((v) => (
                <div
                  key={v.name}
                  className="flex flex-col overflow-hidden"
                  style={{ background: "rgba(0,212,255,0.03)", border: "1px solid rgba(0,212,255,0.14)", borderLeft: "3px solid rgba(0,212,255,0.50)" }}
                >
                  {VENUE_PHOTO_MAP[v.name] && (
                    <div className="relative overflow-hidden flex-shrink-0" style={{ aspectRatio: "16/9" }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={VENUE_PHOTO_MAP[v.name]} alt={v.name} className="w-full h-full object-cover" loading="lazy" />
                    </div>
                  )}
                  <div className="flex flex-col gap-3 p-4 flex-1">
                    <div className="flex-1 min-w-0">
                      <p className="font-display text-lg text-white leading-snug mb-1">{v.name}</p>
                      <p className="font-sans text-xs uppercase tracking-widest font-medium mb-0.5" style={{ color: "rgba(0,212,255,0.60)" }}>{v.location}</p>
                      <p className="font-sans text-sm text-text-secondary">{v.address}</p>
                    </div>
                    <a
                      href={v.map}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="self-start font-sans text-xs uppercase tracking-widest px-3 py-2 hover:text-plasma transition-colors"
                      style={{ border: "1px solid rgba(0,212,255,0.25)", color: "rgba(0,212,255,0.75)" }}
                    >
                      {ui.mapLink}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </details>

        </div>
      </section>

      {/* ── PROGRAMACIÓN POR SALAS ────────────────────────────────────── */}
      <section className="mb-20">
        <SectionHeading id="programacion" label={ui.sectProg} count={`${SCREENINGS_2026.length}`} />

        <div className="flex flex-col gap-2">
          {getScreeningsByVenue().map(({ venue, location, screenings }) => (
            <details key={venue} className="group/sala">
              <summary className="list-none cursor-pointer select-none">
                <div
                  className="flex items-center gap-3 py-4 px-1"
                  style={{ borderBottom: "1px solid rgba(0,212,255,0.16)" }}
                >
                  <span className="font-sans font-bold text-lg w-6 text-center flex-shrink-0 group-open/sala:hidden" style={{ color: "rgba(0,212,255,0.80)" }}>+</span>
                  <span className="font-sans font-bold text-lg w-6 text-center flex-shrink-0 hidden group-open/sala:inline" style={{ color: "rgba(0,212,255,0.80)" }}>−</span>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-sans text-base font-semibold text-white leading-snug">{venue}</h3>
                    {location && (
                      <p className="font-sans text-xs uppercase tracking-widest mt-0.5 font-medium" style={{ color: "rgba(0,212,255,0.55)" }}>
                        {location}
                      </p>
                    )}
                  </div>
                  <span className="font-sans text-xs font-semibold tabular-nums flex-shrink-0" style={{ color: "rgba(0,212,255,0.60)" }}>
                    {ui.screeningCount(screenings.length)}
                  </span>
                </div>
              </summary>

              <div className="py-4 pl-9 flex flex-col gap-0" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                {screenings.map((s, idx) => (
                  <div
                    key={`${s.date}-${s.time}-${s.film_slug}-${idx}`}
                    className="flex items-baseline gap-4 py-2.5"
                    style={{ borderBottom: idx < screenings.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none" }}
                  >
                    <div className="flex-shrink-0 w-24 text-right">
                      <span className="font-mono text-[11px] tabular-nums" style={{ color: "rgba(0,212,255,0.65)" }}>
                        {formatScreeningDate(s.date)}
                      </span>
                      {s.time && (
                        <span className="font-mono text-[11px] tabular-nums ml-2" style={{ color: "rgba(0,212,255,0.45)" }}>
                          {s.time}
                        </span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      {s.film_slug && VALID_FILM_SLUGS.has(s.film_slug) ? (
                        <Link
                          href={`/${locale}/film/${s.film_slug}`}
                          className="font-sans text-sm text-white hover:text-plasma transition-colors leading-snug"
                        >
                          {s.film_title}
                        </Link>
                      ) : (
                        <span className="font-sans text-base text-white leading-snug">{s.film_title}</span>
                      )}
                      {s.is_short_block && (
                        <span className="font-sans text-xs ml-2 inline-block" style={{ color: "rgba(255,255,255,0.30)" }}>
                          {ui.shortBlockLabel}
                        </span>
                      )}
                      {s.section && (
                        <span className="font-sans text-xs ml-2 inline-block" style={{ color: "rgba(255,255,255,0.40)" }}>
                          {s.section}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* ── JURADO ─────────────────────────────────────────────────────── */}
      <section className="mb-20">
        <SectionHeading id="jurado" label={ui.sectJurado} />

        <div
          className="flex flex-col sm:flex-row sm:items-center gap-6 p-7"
          style={{ border: "1px solid rgba(0,212,255,0.18)", background: "rgba(0,212,255,0.04)" }}
        >
          <div className="flex-1 min-w-0">
            <p className="font-display text-xl text-white mb-2">
              {ui.juryTitle}
            </p>
            <p className="font-sans text-sm text-text-secondary leading-relaxed">
              {ui.juryDesc}
            </p>
          </div>
          <Link
            href={`/${locale}/jurado`}
            className="flex-shrink-0 inline-flex items-center gap-2 font-sans text-xs uppercase tracking-widest px-5 py-3 transition-colors"
            style={{ border: "1px solid rgba(0,212,255,0.35)", color: "rgba(0,212,255,0.90)" }}
          >
            {ui.juryLink}
          </Link>
        </div>
      </section>

      {/* ── GALERÍA ─────────────────────────────────────────────────────── */}
      <section className="mb-20">
        <SectionHeading id="galeria" label={ui.sectGaleria} />

        <p className="font-sans text-sm text-text-secondary mb-8 leading-relaxed">
          {ui.galleryCredit}{" "}
          <a
            href="https://www.instagram.com/phiop_uy"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-plasma transition-colors"
            style={{ color: "rgba(0,212,255,0.75)" }}
          >
            Fiorella Santostefano / Phio P. — @phiop_uy
          </a>
        </p>

        {/* Galería destacada */}
        <h3 className="font-sans text-xs uppercase tracking-widest mb-4 font-semibold" style={{ color: "rgba(0,212,255,0.70)" }}>
          {ui.galleryFeaturedLabel(GALLERY_FEATURED.length)}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {GALLERY_FEATURED.map((n) => {
            const filename = `mvdf-${String(n).padStart(2, "0")}.webp`;
            return (
              <div
                key={n}
                className="overflow-hidden aspect-[3/2]"
                style={{ border: "1px solid rgba(255,255,255,0.07)" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/media/archive/XVI/gallery/${filename}`}
                  alt={`Montevideo Fantástico XVI — foto ${n}`}
                  className="w-full h-full object-cover block"
                  loading="lazy"
                />
              </div>
            );
          })}
        </div>

        {/* Galería completa */}
        <details className="group/gallery-all">
          <summary className="list-none cursor-pointer select-none">
            <div className="flex items-center gap-3 py-3 px-1 mb-2" style={{ borderBottom: "1px solid rgba(0,212,255,0.18)" }}>
              <span className="font-sans font-bold text-lg w-6 text-center flex-shrink-0 group-open/gallery-all:hidden" style={{ color: "rgba(0,212,255,0.75)" }}>+</span>
              <span className="font-sans font-bold text-lg w-6 text-center flex-shrink-0 hidden group-open/gallery-all:inline" style={{ color: "rgba(0,212,255,0.75)" }}>−</span>
              <h3 className="font-sans text-base font-semibold flex-1" style={{ color: "rgba(0,212,255,0.90)" }}>
                {ui.galleryAllLabel(GALLERY_ALL.length)}
              </h3>
              <span className="font-sans text-sm group-open/gallery-all:hidden" style={{ color: "rgba(0,212,255,0.55)" }}>{ui.galleryViewAll}</span>
            </div>
          </summary>
          <div className="columns-2 sm:columns-3 lg:columns-4 gap-3 space-y-3 mt-4">
            {GALLERY_ALL.map((n) => {
              const filename = `mvdf-${String(n).padStart(2, "0")}.webp`;
              return (
                <div
                  key={n}
                  className="break-inside-avoid overflow-hidden"
                  style={{ border: "1px solid rgba(255,255,255,0.07)" }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`/media/archive/XVI/gallery/${filename}`}
                    alt={`Montevideo Fantástico XVI — foto ${n}`}
                    className="w-full h-auto block"
                    loading="lazy"
                  />
                </div>
              );
            })}
          </div>
        </details>
      </section>

      {/* ── GALA DE PREMIACIÓN ───────────────────────────────────────── */}
      <section className="mb-20">
        <SectionHeading id="gala" label={ui.sectGala} />
        <div
          className="p-7"
          style={{ border: "1px solid rgba(0,212,255,0.18)", background: "rgba(0,212,255,0.025)" }}
        >
          <p className="font-sans text-[10px] uppercase tracking-[0.35em] mb-3 font-semibold"
            style={{ color: "rgba(0,212,255,0.70)" }}>
            {ui.galaBadge}
          </p>
          <p className="text-[1.0625rem] leading-[1.75] mb-8" style={{ color: "rgba(255,255,255,0.78)" }}>
            {ui.galaDesc}
          </p>
          <a
            href="https://youtu.be/Hq-ksSW9HTA?t=1"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 group"
            style={{ color: "rgba(0,212,255,0.85)" }}
          >
            <svg viewBox="0 0 40 40" className="w-9 h-9 flex-shrink-0" fill="none" aria-hidden="true">
              <circle cx="20" cy="20" r="19" stroke="rgba(0,212,255,0.65)" strokeWidth="1.5" />
              <polygon points="16,12 30,20 16,28" fill="rgba(0,212,255,0.85)" />
            </svg>
            <span className="font-sans text-sm uppercase tracking-widest group-hover:text-plasma transition-colors">
              {ui.galaLink}
            </span>
          </a>
        </div>
      </section>

      {/* ── EQUIPO & ACAU ─────────────────────────────────────────────── */}
      <section className="mb-20">
        <SectionHeading id="equipo" label={ui.sectEquipo} />

        <div
          className="p-7 leading-relaxed text-sm"
          style={{ border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.02)" }}
        >
          <p className="font-display text-3xl text-white mb-8">Montevideo Fantástico XVI</p>

          <dl className="flex flex-col gap-8">
            {/* ── Single-person roles ── */}
            {([
              { role: ui.roleDir,       name: "Alejandro Yamgotchian", handle: "aleyamgocine" },
              { role: ui.roleProd,      name: "Juan Pablo Aguirre",    handle: "wilmar_everton" },
              { role: ui.roleProdCoord, name: "Patricia Curbelo",      handle: "patri_curb" },
              { role: ui.roleAsist,     name: "Madame Labumba",        handle: "madamelabumba" },
            ] as { role: string; name: string; handle: string }[]).map(({ role, name, handle }) => (
              <div key={handle}>
                <dt className="font-sans text-xs uppercase tracking-widest font-semibold mb-2" style={{ color: "rgba(0,212,255,0.75)" }}>{role}</dt>
                <dd>
                  <p className="text-lg text-white font-medium leading-snug">{name}</p>
                  <a href={`https://instagram.com/${handle}`} target="_blank" rel="noopener noreferrer" className="block font-sans text-sm mt-0.5 hover:text-plasma transition-colors" style={{ color: "rgba(0,212,255,0.65)" }}>@{handle}</a>
                </dd>
              </div>
            ))}

            {/* ── Conducción — 2 people, compact flex wrap ── */}
            <div>
              <dt className="font-sans text-xs uppercase tracking-widest font-semibold mb-2" style={{ color: "rgba(0,212,255,0.75)" }}>{ui.roleConduccion}</dt>
              <dd className="flex flex-wrap gap-x-10 gap-y-4 mt-1">
                {([
                  { name: "Dread Art",          handle: "dred_art_uy" },
                  { name: "Juan Pablo Aguirre", handle: "wilmar_everton" },
                ] as { name: string; handle: string }[]).map(({ name, handle }) => (
                  <div key={handle}>
                    <p className="text-lg text-white font-medium leading-snug">{name}</p>
                    <a href={`https://instagram.com/${handle}`} target="_blank" rel="noopener noreferrer" className="block font-sans text-sm mt-0.5 hover:text-plasma transition-colors" style={{ color: "rgba(0,212,255,0.65)" }}>@{handle}</a>
                  </div>
                ))}
              </dd>
            </div>

            {/* ── Selection team — 5 people, compact flex wrap ── */}
            <div>
              <dt className="font-sans text-xs uppercase tracking-widest font-semibold mb-2" style={{ color: "rgba(0,212,255,0.75)" }}>{ui.roleSel}</dt>
              <dd className="flex flex-wrap gap-x-10 gap-y-4 mt-1">
                {([
                  { name: "Enrique Puig",       handle: "enriquepuigf" },
                  { name: "Federico Cardozo",   handle: "ffromhell" },
                  { name: "Bruno Otheguy",      handle: "bmotheguy" },
                  { name: "Pablo Saldivia",     handle: "pablo.sandor" },
                  { name: "Juan Pablo Aguirre", handle: "wilmar_everton" },
                ] as { name: string; handle: string }[]).map(({ name, handle }) => (
                  <div key={handle}>
                    <p className="text-lg text-white font-medium leading-snug">{name}</p>
                    <a href={`https://instagram.com/${handle}`} target="_blank" rel="noopener noreferrer" className="block font-sans text-sm mt-0.5 hover:text-plasma transition-colors" style={{ color: "rgba(0,212,255,0.65)" }}>@{handle}</a>
                  </div>
                ))}
              </dd>
            </div>
          </dl>
        </div>
      </section>

      {/* ── APOYO INSTITUCIONAL ──────────────────────────────────────── */}
      <section className="mb-20">
        <div
          className="p-8 md:p-10"
          style={{ border: "1px solid rgba(162,89,247,0.20)", background: "rgba(162,89,247,0.03)", borderLeft: "4px solid rgba(162,89,247,0.50)" }}
        >
          <p className="font-sans text-xs uppercase tracking-[0.3em] font-semibold mb-6"
            style={{ color: "rgba(162,89,247,0.85)" }}>
            {ui.acauLabel}
          </p>
          <p className="text-base text-white leading-relaxed mb-4">
            {ui.acauText1}
          </p>
          <p className="text-base leading-relaxed mb-8" style={{ color: "rgba(255,255,255,0.70)" }}>
            {ui.acauText2}
          </p>
          <a
            href="https://www.acau.gub.uy/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-sans text-sm uppercase tracking-widest px-5 py-3 hover:text-plasma transition-colors"
            style={{ color: "rgba(162,89,247,0.90)", border: "1px solid rgba(162,89,247,0.35)" }}
          >
            acau.gub.uy ↗
          </a>
        </div>
      </section>

      {/* ── VOLVER AL ARCHIVO ─────────────────────────────────────────── */}
      <div className="flex items-center justify-between pt-8 mt-8"
        style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <Link
          href={`/${locale}/archivo`}
          className="font-sans text-xs uppercase tracking-widest hover:text-plasma transition-colors"
          style={{ color: "rgba(255,255,255,0.45)" }}
        >
          {ui.backAll}
        </Link>
        <span className="font-sans text-xs text-text-muted">MVF XVI · 2026</span>
      </div>
    </div>
  );
}
