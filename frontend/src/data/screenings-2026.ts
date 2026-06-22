// Confirmed screenings for the 2026 edition.
// Add entries here as the programming team confirms dates and venues.
// Grouped by (date, time, venue) for display.

import type { FilmCategory } from "./films-2026";

export interface StaticScreening {
  /** ISO date string: "2026-05-08" */
  date: string;
  /** 24-hour time: "19:30" */
  time: string;
  venue: string;
  film_title: string;
  film_slug: string;
  /** Section label shown to visitors */
  section: string;
  /** Canonical category slug — must match FilmCategory in films-2026.ts */
  category?: FilmCategory;
  /** True for Sala Lazaroff and Centro Cultural Artesano — shows reservation CTA */
  requires_reservation?: boolean;
  /** True for grouped short film blocks — uses edition poster, shows confirmation note */
  is_short_block?: boolean;
  /** Optional description shown below the title (used for Crece community context) */
  description?: string;
  /** Optional i18n title override — used for placeholder / TBA entries */
  film_title_i18n?: { es: string; en: string; pt: string };
  /** Optional i18n description override */
  description_i18n?: { es: string; en: string; pt: string };
  /** Optional list of individual films for short-film block programmes — shown as linked items */
  films?: Array<{ title: string; slug: string }>;
}

export const SCREENINGS_2026: StaticScreening[] = [
  // ── SÁBADO 09/05 ──────────────────────────────────────────────────────────
  {
    date: "2026-05-09",
    time: "16:00",
    venue: "Centro Cultural La Experimental (Malvín)",
    film_title: "Plesiosaurios vivos",
    film_slug: "plesiosaurios-vivos",
    section: "Documentales en Competencia",
  },
  {
    date: "2026-05-09",
    time: "18:00",
    venue: "Centro Cultural La Experimental (Malvín)",
    film_title: "Sombras del sur",
    film_slug: "sombras-del-sur",
    section: "Competencia Iberoamericana",
  },
  {
    date: "2026-05-09",
    time: "20:00",
    venue: "Centro Cultural La Experimental (Malvín)",
    film_title: "CORTOMETRAJES URUGUAYOS Y ARGENTINOS EN COMPETENCIA",
    film_slug: "cortos-competencia",
    section: "Competencia de Cortometrajes",
    is_short_block: true,
    films: [
      { title: "Abejorros", slug: "abejorros" },
      { title: "Ahí viene el asesino, abuela", slug: "ahi-viene-el-asesino-abuela" },
      { title: "Amarre", slug: "amarre" },
      { title: "La bruja de Quilmes", slug: "la-bruja-de-quilmes" },
      { title: "Captora de almas", slug: "captora-de-almas" },
      { title: "Carcer Lucis", slug: "carcer-lucis" },
      { title: "Carnival", slug: "carnival" },
      { title: "Garra de monte", slug: "garra-de-monte" },
      { title: "Hiperacusia", slug: "hiperacusia" },
      { title: "Mensajero de la muerte", slug: "mensajero-de-la-muerte" },
      { title: "Placebo", slug: "placebo" },
      { title: "Serafín", slug: "serafin" },
      { title: "Son las 12", slug: "son-las-12" },
    ],
  },

  // ── VIERNES 08/05 ─────────────────────────────────────────────────────────
  {
    date: "2026-05-08",
    time: "21:00",
    venue: "Mandrágora Casa Cultural",
    film_title: "Las Motosierras Cantan",
    film_slug: "las-motosierras-cantan",
    section: "Competencia Oficial",
    category: "competencia-oficial-de-largometrajes",
  },
  {
    date: "2026-05-08",
    time: "19:30",
    venue: "Centro Cultural Artesano (Peñarol)",
    film_title: "¿Qué pasó con Nath_666?",
    film_slug: "que-paso-con-nath-666",
    section: "Competencia Nacional",
    requires_reservation: true,
  },

  // ── LUNES 11/05 ───────────────────────────────────────────────────────────
  {
    date: "2026-05-11",
    time: "18:00",
    venue: "Cine Teatro Plaza (Flores)",
    film_title: "COMPETENCIA OFICIAL DE CORTOMETRAJES",
    film_slug: "competencia-cortometrajes",
    section: "Competencia de Cortometrajes",
    is_short_block: true,
    films: [
      { title: "Ahí viene el asesino, abuela", slug: "ahi-viene-el-asesino-abuela" },
      { title: "El eco de los que quedan", slug: "el-eco-de-los-que-quedan" },
      { title: "Garra de monte", slug: "garra-de-monte" },
      { title: "Iris de Cristal", slug: "iris-de-cristal" },
      { title: "Lady in Red", slug: "la-dama-de-rojo" },
      { title: "Miedo, mi enfermedad", slug: "miedo-mi-enfermedad" },
      { title: "Parasomnia", slug: "parasomnia" },
      { title: "La pena no duerme de noche", slug: "la-pena-no-duerme-de-noche" },
      { title: "Selfie", slug: "selfie" },
    ],
  },
  {
    date: "2026-05-11",
    time: "19:30",
    venue: "Casa INJU",
    film_title: "Ahí está",
    film_slug: "ahi-esta",
    section: "Competencia Nacional",
  },
  {
    date: "2026-05-11",
    time: "19:40",
    venue: "Casa INJU",
    film_title: "La Maldición de Hernández Chaney",
    film_slug: "la-maldicion-de-hernandez-chaney",
    section: "Competencia Nacional",
  },
  {
    date: "2026-05-11",
    time: "19:00",
    venue: "Centro Cultural AFE (Colonia)",
    film_title: "La Coartada",
    film_slug: "la-coartada",
    section: "Competencia Oficial de Mediometrajes",
    category: "competencia-oficial-de-mediometrajes",
  },
  {
    date: "2026-05-11",
    time: "19:30",
    venue: "Centro Cultural AFE (Colonia)",
    film_title: "Hotel Fin",
    film_slug: "hotel-fin",
    section: "Competencia Iberoamericana",
  },
  {
    date: "2026-05-11",
    time: "20:30",
    venue: "Casa INJU",
    film_title: "Alguien los Vigila",
    film_slug: "alguien-los-vigila",
    section: "Competencia Nacional",
  },
  {
    date: "2026-05-11",
    time: "22:00",
    venue: "Casa INJU",
    film_title: "COMPETENCIA OFICIAL DE CORTOMETRAJES",
    film_slug: "competencia-cortometrajes",
    section: "Competencia de Cortometrajes",
    is_short_block: true,
  },

  // ── MARTES 12/05 ──────────────────────────────────────────────────────────
  {
    date: "2026-05-12",    time: "14:00",
    venue: "Casa INJU",
    film_title: "Venga a Nosotros Tu Reino",
    film_slug: "venga-a-nosotros-tu-reino",
    section: "Documentales en Competencia",
  },
  {
    date: "2026-05-12",
    time: "15:30",
    venue: "Casa INJU",
    film_title: "El Fantástico Matt Parey",
    film_slug: "el-fantastico-matt-parey",
    section: "Documentales en Competencia",
  },
  {
    date: "2026-05-12",
    time: "17:00",
    venue: "Casa INJU",
    film_title: "Cortometrajes y mediometrajes internacionales",
    film_slug: "cortometrajes-y-mediometrajes-internacionales",
    section: "Competencia de Cortometrajes",
    is_short_block: true,
    films: [
      { title: "#CartaCadena", slug: "cartacadena" },
      { title: "Aquí todos estamos embrujados", slug: "aqui-todos-estamos-embrujados" },
      { title: "Cuento para dormir", slug: "cuento-para-dormir" },
      { title: "El beso de la mariposa", slug: "el-beso-de-la-mariposa" },
      { title: "El problema de un minuto", slug: "el-problema-de-un-minuto" },
      { title: "Heladera", slug: "heladera" },
      { title: "La despedida", slug: "la-despedida" },
      { title: "La Jaula", slug: "la-jaula" },
      { title: "Reliquias", slug: "reliquias" },
    ],
  },
  {
    date: "2026-05-12",    time: "20:00",
    venue: "Centro Cultural Terminal Goes",
    film_title: "La cosa en la niebla",
    film_slug: "la-cosa-en-la-niebla",
    section: "Novedades",
  },

  // ── MIÉRCOLES 13/05 ───────────────────────────────────────────────────────
  {
    date: "2026-05-13",
    time: "10:30",
    venue: "Centro Cultural Crece (Flor de Maroñas)",
    film_title: "CICLO DE CORTOMETRAJES",
    film_slug: "ciclo-cortometrajes-mayores",
    section: "Entrada libre y gratuita",
    is_short_block: true,
    description: "Función orientada al grupo Los Años Dorados, espacio de encuentro, recreación e intercambio para personas mayores. Entrada gratuita y abierta al público general.",
    films: [
      { title: "Abuelo Ño", slug: "abuelo-no" },
      { title: "Carta de amor a la muerte", slug: "carta-de-amor-a-la-muerte" },
      { title: "Deberes", slug: "deberes" },
      { title: "Época de plagas", slug: "epoca-de-plagas" },
      { title: "Okay", slug: "okay" },
      { title: "Santo cielo", slug: "santo-cielo" },
      { title: "Suerte", slug: "suerte" },
      { title: "El toro y el bebé", slug: "el-toro-y-el-bebe" },
    ],
  },
  {
    date: "2026-05-13",
    time: "18:00",
    venue: "Centro Cultural Crece (Flor de Maroñas)",
    film_title: "CICLO DE CORTOMETRAJES",
    film_slug: "ciclo-cortometrajes-adolescentes",
    section: "Entrada libre y gratuita",
    is_short_block: true,
    description: "Función orientada a adolescentes del barrio. Entrada gratuita y abierta al público general.",
    films: [
      { title: "Frecuencia Z", slug: "frecuencia-z" },
      { title: "La jaula", slug: "la-jaula" },
      { title: "Killergotchi", slug: "killergotchi" },
      { title: "¿Qué comen los dragones?", slug: "que-comen-los-dragones" },
      { title: "Simcha", slug: "simcha" },
      { title: "Simon", slug: "simon-ibero" },
      { title: "X-Slasher", slug: "x-slasher" },
    ],
  },
  {
    date: "2026-05-13",
    time: "18:00",
    venue: "Casa de Cultura del Prado",
    film_title: "John Vardar contra la galaxia",
    film_slug: "john-vardar-contra-la-galaxia",
    section: "Competencia Oficial",
  },
  {
    date: "2026-05-13",
    time: "19:00",
    venue: "Alianza Francesa de Montevideo",
    film_title: "COMPETENCIA OFICIAL DE CORTOMETRAJES",
    film_slug: "competencia-cortometrajes",
    section: "Competencia de Cortometrajes",
    is_short_block: true,
    films: [
      { title: "Academia de voz", slug: "academia-de-voz" },
      { title: "Ahí viene el asesino, abuela", slug: "ahi-viene-el-asesino-abuela" },
      { title: "Cazador", slug: "cazador" },
      { title: "La Cena", slug: "la-cena" },
      { title: "Una combinación perfecta", slug: "una-combinacion-perfecta" },
      { title: "Compost", slug: "compost" },
      { title: "Ding dingue dong", slug: "ding-dingue-dong" },
      { title: "Hambriento", slug: "hambriento" },
      { title: "Hora del snack", slug: "hora-del-snack" },
      { title: "Una nube de lluvia vacía", slug: "una-nube-de-lluvia-vacia" },
    ],
  },
  {
    date: "2026-05-13",
    time: "19:00",
    venue: "Cine Teatro Plaza (Flores)",
    film_title: "Sasyq",
    film_slug: "sasyq",
    section: "Competencia Oficial",
  },

  // ── JUEVES 14/05 ─────────────────────────────────────────────────────
  {
    date: "2026-05-14",
    time: "14:00",
    venue: "Centro Cultural Crece (Flor de Maroñas)",
    film_title: "CICLO DE CORTOMETRAJES",
    film_slug: "ciclo-cortometrajes-mujeres",
    section: "Entrada libre y gratuita",
    is_short_block: true,
    description: "Función orientada al grupo de mujeres Hilando Historias, espacio para mujeres y disidencias que, entre costuras y bordados, intercambian sobre experiencias e historias. Entrada gratuita y abierta al público general.",
    films: [
      { title: "Cómete a los ricos", slug: "comete-a-los-ricos" },
      { title: "Esta noche, mi alma partirá", slug: "esta-noche-mi-alma-partira" },
      { title: "Fíjate atrás de la cortina", slug: "fijate-atras-de-la-cortina" },
      { title: "Una langosta llamada deseo", slug: "una-langosta-llamada-deseo" },
      { title: "No llores", slug: "no-llores" },
      { title: "Prueba tu suerte", slug: "prueba-tu-suerte" },
      { title: "Sumergida", slug: "sumergida" },
    ],
  },
  {
    date: "2026-05-14",
    time: "19:30",
    venue: "Andrómeda Bar Cooperativo",
    film_title: "Bosco: La Sombra Extraviada Bajo la Luna de Plata",
    film_slug: "bosco-la-sombra-perdida-bajo-la-luna-plateada",
    section: "Competencia Iberoamericana",
    category: "competencia-iberoamericana-de-largometrajes",
  },

  // ── VIERNES 15/05 ─────────────────────────────────────────────────────────
  {
    date: "2026-05-15",
    time: "16:00",
    venue: "Casa INJU",
    film_title: "El Convento",
    film_slug: "el-convento",
    section: "Novedades",
  },
  {
    date: "2026-05-15",
    time: "17:30",
    venue: "Casa INJU",
    film_title: "Insecta",
    film_slug: "insecta",
    section: "Novedades",
  },
  {
    date: "2026-05-15",
    time: "19:00",
    venue: "Casa INJU",
    film_title: "La caja de fuego contra la cerradura mágica",
    film_slug: "la-caja-de-fuego-contra-la-cerradura-magica",
    section: "Novedades",
  },
  {
    date: "2026-05-15",
    time: "19:30",
    venue: "Centro Cultural Artesano (Peñarol)",
    film_title: "La noche que nunca termina",
    film_slug: "la-noche-que-nunca-termina",
    section: "Competencia Iberoamericana",
    requires_reservation: true,
  },
  {
    date: "2026-05-15",
    time: "20:00",
    venue: "Sala Lazaroff",
    film_title: "El ritual de Huasao",
    film_slug: "el-ritual-de-huasao",
    section: "Competencia Iberoamericana",
    requires_reservation: true,
  },
  {
    date: "2026-05-15",
    time: "20:00",
    venue: "Complejo Cultural Politeama (Canelones)",
    film_title: "John Vardar contra la galaxia",
    film_slug: "john-vardar-contra-la-galaxia",
    section: "Competencia Oficial",
    // NOTE: time not confirmed by source — using 20:00 as default
  },

  // ── SÁBADO 16/05 ──────────────────────────────────────────────────────────
  {
    date: "2026-05-16",
    time: "16:00",
    venue: "Centro Cultural La Experimental (Malvín)",
    film_title: "Godzilla en Santa Fe",
    film_slug: "godzilla-en-santa-fe",
    section: "Novedades",
  },
  {
    date: "2026-05-16",
    time: "18:00",
    venue: "Centro Cultural La Experimental (Malvín)",
    film_title: "Sasyq",
    film_slug: "sasyq",
    section: "Competencia Oficial",
  },
  {
    date: "2026-05-16",
    time: "20:00",
    venue: "Centro Cultural La Experimental (Malvín)",
    film_title: "CORTOMETRAJES URUGUAYOS Y ARGENTINOS EN COMPETENCIA",
    film_slug: "cortos-competencia",
    section: "Competencia de Cortometrajes",
    is_short_block: true,
    films: [
      { title: "Bichos locos", slug: "bichos-locos" },
      { title: "La copa carmesí", slug: "la-copa-carmesi" },
      { title: "DARE: CODE RED", slug: "dare-code-red" },
      { title: "DARE: THE LION'S DEN", slug: "dare-the-lions-den" },
      { title: "De nuevo", slug: "de-nuevo" },
      { title: "Los elegidos", slug: "los-elegidos" },
      { title: "Humedad", slug: "humedad" },
      { title: "Iris", slug: "iris" },
      { title: "Muuuundos extraños", slug: "muuuundos-extranos" },
      { title: "El Nihilista", slug: "el-nihilista" },
      { title: "No todo lo que brilla", slug: "no-todo-lo-que-brilla" },
    ],
  },
  {
    date: "2026-05-16",
    time: "20:00",
    venue: "Sala Lazaroff",
    film_title: "El amor mata",
    film_slug: "el-amor-mata",
    section: "Competencia Iberoamericana",
    requires_reservation: true,
  },

  // ── MARTES 19/05 — Bar Fénix ─────────────────────────────────────────────
  {
    date: "2026-05-19",
    time: "20:00",
    venue: "Bar Fénix",
    film_title: "La Casa en el Árbol",
    film_slug: "la-casa-en-el-arbol",
    section: "Competencia Oficial",
    category: "competencia-oficial-de-largometrajes",
  },

  // ── MARTES 26/05 — Bar Fénix ─────────────────────────────────────────────
  {
    date: "2026-05-26",
    time: "20:00",
    venue: "Bar Fénix",
    film_title: "CORTOS URUGUAYOS",
    film_slug: "cortos-uruguayos-fenix-0526",
    section: "Competencia Nacional",
    is_short_block: true,
    films: [
      { title: "Ahí está", slug: "ahi-esta" },
      { title: "Muuuundos extraños", slug: "muuuundos-extranos" },
    ],
  },
  {
    date: "2026-05-26",
    time: "20:30",
    venue: "Bar Fénix",
    film_title: "PANCHOPALOOZA",
    film_slug: "panchopalooza",
    section: "Competencia Nacional",
    category: "competencia-uruguaya-de-largometrajes",
  },

  // ── MARTES 02/06 — Bar Fénix ─────────────────────────────────────────────
  {
    date: "2026-06-02",
    time: "20:00",
    venue: "Bar Fénix",
    film_title: "Amarre",
    film_slug: "amarre",
    section: "Competencia de Cortometrajes",
  },
  {
    date: "2026-06-02",
    time: "20:15",
    venue: "Bar Fénix",
    film_title: "Teatro de los sueños",
    film_slug: "teatro-de-los-suenos",
    section: "Competencia Oficial",
    category: "competencia-oficial-de-largometrajes",
  },

  // ── MARTES 09/06 — Bar Fénix ─────────────────────────────────────────────
  {
    date: "2026-06-09",
    time: "20:00",
    venue: "Bar Fénix",
    film_title: "De nuevo",
    film_slug: "de-nuevo",
    section: "Competencia de Cortometrajes",
  },
  {
    date: "2026-06-09",
    time: "20:15",
    venue: "Bar Fénix",
    film_title: "4 historias de terror",
    film_slug: "4-historias-de-terror",
    section: "Novedades",
    category: "novedades",
  },

  // ── JUEVES 21/05 — Cold Music Bar ────────────────────────────────────────
  {
    date: "2026-05-21",
    time: "21:00",
    venue: "Cold Music Bar",
    film_title: "El cerdo que sobrevivió a la fiebre aftosa",
    film_slug: "el-cerdo-que-sobrevivio-a-la-fiebre-aftosa",
    section: "Novedades",
    category: "novedades",
  },

  // ── JUEVES 28/05 — Cold Music Bar ────────────────────────────────────────
  {
    date: "2026-05-28",
    time: "21:00",
    venue: "Cold Music Bar",
    film_title: "Big City Pizza",
    film_slug: "big-city-pizza",
    section: "Competencia Oficial",
    category: "competencia-oficial-de-largometrajes",
  },

  // ── JUEVES 04/06 — Cold Music Bar ────────────────────────────────────────
  {
    date: "2026-06-04",
    time: "21:00",
    venue: "Cold Music Bar",
    film_title: "No mires en la oscuridad",
    film_slug: "no-mires-en-la-oscuridad",
    section: "Novedades",
    category: "novedades",
  },

  // ── JUEVES 11/06 — Cold Music Bar ────────────────────────────────────────
  {
    date: "2026-06-11",
    time: "21:00",
    venue: "Cold Music Bar",
    film_title: "Las motosierras cantan",
    film_slug: "las-motosierras-cantan",
    section: "Novedades",
    category: "novedades",
  },

  // ── VIERNES 29/05 — Teatro Escayola (Tacuarembó) ─────────────────────────
  {
    date: "2026-05-29",
    time: "20:00",
    venue: "Teatro Escayola",
    film_title: "Infierno",
    film_slug: "infierno",
    section: "Competencia Oficial",
    category: "competencia-oficial-de-largometrajes",
  },

  // ── SÁBADO 07/06 — Centro Cultural Florencio Sánchez (Cerro, Montevideo) ─
  {
    date: "2026-06-05",
    time: "20:00",
    venue: "Centro Cultural Florencio Sánchez",
    film_title: "Ojos verdes, rojos malditos",
    film_slug: "ojos-verdes-rojos-malditos",
    section: "Competencia Iberoamericana",
    category: "competencia-iberoamericana-de-largometrajes",
  },

  // ── JUEVES 11/06 — Centro Cultural Museo de Imagen y Memoria de Soca ─────
  {
    date: "2026-06-11",
    time: "19:30",
    venue: "Centro Cultural Museo de Imagen y Memoria de Soca",
    film_title: "Un susurro invocó mi nombre",
    film_slug: "un-susurro-invoco-mi-nombre",
    section: "Novedades",
    category: "novedades",
  },

  // ── SÁBADO 13/06 — Centro Recreativo Democrático (Ciudad del Carmen) ─────
  {
    date: "2026-06-13",
    time: "19:00",
    venue: "Centro Recreativo Democrático",
    film_title: "¿Qué pasó con Nath_666?",
    film_slug: "que-paso-con-nath-666",
    section: "Competencia Nacional",
    category: "competencia-uruguaya-de-largometrajes",
  },
  {
    date: "2026-06-13",
    time: "22:00",
    venue: "Centro Recreativo Democrático",
    film_title: "Cortometrajes internacionales",
    film_slug: "cortometrajes-internacionales-crd-0613",
    section: "Competencia de Cortometrajes",
    is_short_block: true,
    films: [
      { title: "Amira", slug: "amira" },
      { title: "Calorcito vital", slug: "calorcito-vital" },
      { title: "El camino del garrote", slug: "el-camino-del-garrote" },
      { title: "Evil Sex", slug: "evil-sex-una-herencia-con-mucha-cola" },
      { title: "Lady in Red", slug: "la-dama-de-rojo" },
      { title: "La peste", slug: "la-peste" },
      { title: "Santo cielo", slug: "santo-cielo" },
      { title: "Selfie", slug: "selfie" },
      { title: "Tizne", slug: "tizne" },
      { title: "Triángulo", slug: "triangulo" },
      { title: "Vacío", slug: "vacio" },
    ],
  },

  // ── MIÉRCOLES 17/06 — Espacio Cultural Gobbi (Paysandú) ─────────────────
  {
    date: "2026-06-17",
    time: "15:00",
    venue: "Espacio Cultural Gobbi",
    film_title: "La cosa en la niebla",
    film_slug: "la-cosa-en-la-niebla",
    section: "Novedades",
  },
  {
    date: "2026-06-17",
    time: "19:00",
    venue: "Espacio Cultural Gobbi",
    film_title: "Ojos verdes, rojos malditos",
    film_slug: "ojos-verdes-rojos-malditos",
    section: "Competencia Iberoamericana",
    category: "competencia-iberoamericana-de-largometrajes",
  },
  {
    date: "2026-06-17",
    time: "19:30",
    venue: "Andrómeda Bar Cooperativo",
    film_title: "Cortos internacionales",
    film_slug: "cortos-internacionales-andromeda-0617",
    section: "Competencia de Cortometrajes",
    is_short_block: true,
    films: [
      { title: "Albertosaurio", slug: "albertosaurio" },
      { title: "Deberes", slug: "deberes" },
      { title: "El vocho del averno", slug: "el-vocho-del-averno" },
      { title: "Fijate atrás de la cortina", slug: "fijate-atras-de-la-cortina" },
      { title: "Frecuencia Z", slug: "frecuencia-z" },
      { title: "Gobbledygook", slug: "gobbledygook" },
      { title: "Inspiración", slug: "inspiracion" },
      { title: "Iris de cristal", slug: "iris-de-cristal" },
      { title: "Joel el bobo", slug: "joel-el-bobo" },
      { title: "Juegos seguros", slug: "juegos-seguros" },
      { title: "La danza de Teresa", slug: "la-danza-de-teresa" },
      { title: "Latas quemadas para niños de aluminio", slug: "latas-quemadas-para-ninos-de-aluminio" },
      { title: "Madre Compasiva", slug: "madre-compasiva" },
      { title: "MemoNeura", slug: "memoneura" },
      { title: "Okay", slug: "okay" },
      { title: "Pactum", slug: "pactum" },
      { title: "Summoned", slug: "summoned" },
      { title: "Teatro fantasma", slug: "teatro-fantasma" },
    ],
  },

  // ── DOMINGO 14/06 — Quimera (Artigas) ────────────────────────────────────
  {
    date: "2026-06-14",
    time: "16:00",
    venue: "Quimera",
    film_title: "Ahí viene el asesino, abuela",
    film_slug: "ahi-viene-el-asesino-abuela",
    section: "Competencia de Cortometrajes",
  },
  {
    date: "2026-06-14",
    time: "16:15",
    venue: "Quimera",
    film_title: "Garra de monte",
    film_slug: "garra-de-monte",
    section: "Competencia de Cortometrajes",
  },
  {
    date: "2026-06-14",
    time: "16:30",
    venue: "Quimera",
    film_title: "Martín vuelve",
    film_slug: "martin-vuelve",
    section: "Competencia Nacional",
    category: "competencia-uruguaya-de-largometrajes",
  },

  // ── SÁBADO 20/06 — Centro Cultural Terminal Goes ──────────────────────────
  {
    date: "2026-06-20",
    time: "19:00",
    venue: "Centro Cultural Terminal Goes",
    film_title: "El Paraíso oscuro de Marilyn",
    film_slug: "el-paraiso-oscuro-de-marilyn",
    section: "Competencia Iberoamericana",
    category: "competencia-iberoamericana-de-largometrajes",
  },
  {
    date: "2026-06-20",
    time: "19:30",
    venue: "Centro Cultural Terminal Goes",
    film_title: "Pusimos el mundo a dormir",
    film_slug: "pusimos-el-mundo-a-dormir",
    section: "Competencia Oficial",
    category: "competencia-oficial-de-largometrajes",
  },

  // ── MIÉRCOLES 24/06 ──────────────────────────────────────────────────────
  {
    date: "2026-06-24",
    time: "19:30",
    venue: "Sala Zitarrosa",
    film_title: "Infierno",
    film_slug: "infierno",
    section: "Competencia Oficial",
    category: "competencia-oficial-de-largometrajes",
  },
  {
    date: "2026-06-24",
    time: "19:30",
    venue: "Andrómeda Bar Cooperativo",
    film_title: "Cortos internacionales",
    film_slug: "cortos-internacionales-andromeda-0624",
    section: "Competencia de Cortometrajes",
    is_short_block: true,
    films: [
      { title: "Amira", slug: "amira" },
      { title: "Calorcito vital", slug: "calorcito-vital" },
      { title: "Cámara frigorífica", slug: "camara-frigorifica" },
      { title: "Cuento para dormir", slug: "cuento-para-dormir" },
      { title: "Elección", slug: "eleccion" },
      { title: "Entre las sombras", slug: "entre-las-sombras" },
      { title: "Evil Sex", slug: "evil-sex-una-herencia-con-mucha-cola" },
      { title: "Favela Amarela", slug: "favela-amarela" },
      { title: "Gobbledygook", slug: "gobbledygook" },
      { title: "Inspiración", slug: "inspiracion" },
      { title: "Joel el bobo", slug: "joel-el-bobo" },
      { title: "Juegos seguros", slug: "juegos-seguros" },
      { title: "La despedida", slug: "la-despedida" },
      { title: "La Madre Monte", slug: "la-madre-monte" },
      { title: "Summoned", slug: "summoned" },
    ],
  },
];

/** Returns screenings sorted by date then time, grouped by date */
export function getScreeningsByDate(): Map<string, StaticScreening[]> {
  const sorted = [...SCREENINGS_2026].sort((a, b) =>
    a.date === b.date ? a.time.localeCompare(b.time) : a.date.localeCompare(b.date)
  );
  const map = new Map<string, StaticScreening[]>();
  for (const s of sorted) {
    const group = map.get(s.date) ?? [];
    group.push(s);
    map.set(s.date, group);
  }
  return map;
}
