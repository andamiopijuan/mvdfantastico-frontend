"""
Management command: seed_xvi

Seeds the MVF XVI edition (2026) into the database.
Creates:
  - 1 Edition record (is_current=True)
  - 8 Venue records
  - 1 SpecialEvent (award ceremony)

Safe to run multiple times (update_or_create).
"""

from django.core.management.base import BaseCommand
from apps.editions.models import Edition
from apps.venues.models import Venue
from apps.events.models import SpecialEvent

# ── XVI Static Data ────────────────────────────────────────────────────────────
EDITION = {
    "number": 16,
    "year": 2026,
    "title": "Montevideo Fantástico XVI",
    "start_date": "2026-05-09",
    "end_date": "2026-05-16",
    "description_es": (
        "El Festival Montevideo Fantástico celebra su edición XVI del 9 al 16 de mayo de 2026 "
        "en distintas salas de Montevideo y el interior del país. Desde 2005, el festival funciona "
        "como un espacio dedicado al cine de terror, fantasía y ciencia ficción, con foco en "
        "producciones independientes y ultra independientes que circulan por fuera de los circuitos "
        "tradicionales.\n\n"
        "A lo largo de la semana se presentará una selección de cortometrajes, mediometrajes y "
        "largometrajes internacionales, junto con funciones especiales y actividades en distintos "
        "barrios. La propuesta busca acercar al público obras que exploran el género desde "
        "perspectivas diversas, con un criterio de curaduría centrado en la originalidad y la "
        "libertad creativa.\n\n"
        "El festival se desarrolla en articulación con centros culturales y espacios públicos, "
        "promoviendo el acceso y la circulación del cine fantástico en Uruguay. La grilla completa "
        "y los detalles de cada función serán publicados próximamente."
    ),
    "description_en": (
        "Montevideo Fantástico is Uruguay's first genre film festival, dedicated to horror, "
        "fantasy and science fiction.\n\n"
        "Since 2005 it has programmed features, mid-length films and shorts, with a focus on "
        "independent productions that get little distribution or never reach cinemas.\n\n"
        "Screenings take place at venues across the city, and the audience votes on every film."
    ),
    "description_pt": (
        "Montevideo Fantástico é o primeiro festival de cinema de gênero do Uruguai, dedicado "
        "ao terror, à fantasia e à ficção científica.\n\n"
        "Desde 2005 programa longas, médias e curtas com foco em produções independentes que "
        "circulam pouco ou diretamente não chegam às salas.\n\n"
        "As sessões se distribuem em diferentes espaços da cidade e o público vota em cada filme."
    ),
}

VENUES = [
    {"name": "Sala Lazaroff", "address": "", "map_url": "https://share.google/licP0WejZIF6AvHh6"},
    {"name": "Centro Cultural Artesano (Peñarol)", "address": "", "map_url": "https://share.google/kubegFcEr9JFRgyRK"},
    {"name": "Centro Cultural La Experimental (Malvín)", "address": "", "map_url": "https://share.google/m91YhdpxUx2zr84q2"},
    {"name": "Casa INJU", "address": "", "map_url": "https://share.google/02QEffoYx1ysz6s6d"},
    {"name": "Centro Cultural Crece (Flor de Maroñas)", "address": "", "map_url": "https://share.google/ncyGv6m882zn3LtDw"},
    {"name": "Casa de Cultura del Prado", "address": "", "map_url": "https://share.google/4y9Bu6o5tRUOT9yyr"},
    {"name": "Cine Teatro Plaza", "address": "Trinidad, Flores", "map_url": "https://share.google/qLaAoJGHxyT0kgFZa"},
    {"name": "Centro Cultural AFE", "address": "Colonia", "map_url": "https://share.google/wbo7ZolcPNb0nwgX6"},
]

SPECIAL_EVENTS = [
    {
        "title": "Entrega de Premios",
        "category": SpecialEvent.Category.AWARDS,
        "venue_name": "Centro Cultural Artesano (Peñarol)",
        "description_es": "Ceremonia de cierre y entrega de premios de la XVI edición del festival.",
    },
]


class Command(BaseCommand):
    help = "Seed MVF XVI (2026) edition, venues and special events into the database."

    def handle(self, *args, **options):
        # ── Edition ────────────────────────────────────────────────────────────
        edition, created = Edition.objects.update_or_create(
            year=EDITION["year"],
            defaults={
                "name": EDITION["title"],
                "number": EDITION["number"],
                "start_date": EDITION["start_date"],
                "end_date": EDITION["end_date"],
                "status": Edition.Status.UPCOMING,
                "is_current": True,
                "description_es": EDITION["description_es"],
                "description_en": EDITION["description_en"],
                "description_pt": EDITION["description_pt"],
            },
        )
        self.stdout.write(self.style.SUCCESS(
            f"{'Created' if created else 'Updated'} edition: {edition}"
        ))

        # ── Venues ─────────────────────────────────────────────────────────────
        for i, v in enumerate(VENUES, start=1):
            venue, created = Venue.objects.update_or_create(
                edition=edition,
                name=v["name"],
                defaults={"address": v["address"], "map_url": v["map_url"], "order": i},
            )
            self.stdout.write(f"  {'Created' if created else 'Updated'} venue: {venue.name}")

        # ── Special Events ─────────────────────────────────────────────────────
        for i, se in enumerate(SPECIAL_EVENTS, start=1):
            venue_obj = Venue.objects.filter(edition=edition, name=se["venue_name"]).first()
            event, created = SpecialEvent.objects.update_or_create(
                edition=edition,
                title=se["title"],
                defaults={
                    "category": se["category"],
                    "description_es": se["description_es"],
                    "venue": venue_obj,
                    "order": i,
                },
            )
            self.stdout.write(f"  {'Created' if created else 'Updated'} special event: {event.title}")

        self.stdout.write(self.style.SUCCESS("\nXVI seed complete."))

