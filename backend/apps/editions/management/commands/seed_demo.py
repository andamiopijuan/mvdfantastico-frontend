"""Management command to seed demo data."""
from django.core.management.base import BaseCommand
from apps.editions.models import Edition
from apps.venues.models import Venue
from apps.works.models import Work
from apps.screenings.models import Screening
from apps.awards.models import AwardCategory, AwardWinner


class Command(BaseCommand):
    help = "Seed the database with demo data for MVF"

    def handle(self, *args, **options):
        self.stdout.write("Seeding demo data...")

        # ── Editions ──────────────────────────────────────────────────────────
        e24, created = Edition.objects.get_or_create(
            year=2024,
            defaults=dict(
                name="Montevideo Fantástico 14",
                number=14,
                slug="mvf-2024",
                start_date="2024-10-10",
                end_date="2024-10-20",
                status="past",
                is_current=False,
                description_es="La 14ª edición celebró lo mejor del cine fantástico con retrospectivas, competencias internacionales y homenajes al género.",
                description_en="The 14th edition celebrated the best of fantastic cinema with retrospectives, international competitions and tributes to the genre.",
                description_pt="A 14ª edição celebrou o melhor do cinema fantástico com retrospectivas, competições internacionais e homenagens ao gênero.",
            ),
        )
        self.stdout.write(f"  {'Created' if created else 'Exists'}: {e24}")

        e26, created = Edition.objects.get_or_create(
            year=2026,
            defaults=dict(
                name="Montevideo Fantástico 16",
                number=16,
                slug="mvf-2026",
                start_date="2026-10-08",
                end_date="2026-10-18",
                status="upcoming",
                is_current=True,
                description_es="La 16ª edición trae lo más inquietante y sublime del cine de género al corazón de Montevideo.",
                description_en="The 16th edition brings the most unsettling and sublime genre cinema to the heart of Montevideo.",
                description_pt="A 16ª edição traz o cinema de gênero mais perturbador e sublime ao coração de Montevidéu.",
                submission_url="https://filmfreeway.com/mvdfantastico",
            ),
        )
        self.stdout.write(f"  {'Created' if created else 'Exists'}: {e26}")

        # ── Venues for 2024 ────────────────────────────────────────────────────
        v1, _ = Venue.objects.get_or_create(
            edition=e24, name="Cinemateca Uruguaya",
            defaults=dict(address="Lorenzo Carnelli 1311, Montevideo", capacity=250, order=1),
        )
        v2, _ = Venue.objects.get_or_create(
            edition=e24, name="Sala Zitarrosa",
            defaults=dict(address="18 de Julio 1012, Montevideo", capacity=500, order=2),
        )
        self.stdout.write(f"  Venues 2024: {v1.name}, {v2.name}")

        # ── Works for 2024 ─────────────────────────────────────────────────────
        w1, _ = Work.objects.get_or_create(
            title="La Sombra del Páramo", edition=e24,
            defaults=dict(
                type="feature", section="competition_int",
                original_title="Shadow of the Moor",
                country="Argentina / España", production_year=2023, runtime=98,
                director="Valentina Ríos",
                language="Español", subtitles="Inglés",
                synopsis_es="Una fotógrafa viaja a los Andes para documentar rituales ancestrales y descubre que la cámara capta más de lo visible.",
                synopsis_en="A photographer travels to the Andes to document ancestral rituals and discovers the camera captures more than the visible.",
                participation_status="world_premiere",
            ),
        )
        w2, _ = Work.objects.get_or_create(
            title="Corpus", edition=e24,
            defaults=dict(
                type="short", section="short_competition",
                country="Uruguay", production_year=2024, runtime=15,
                director="Martín Ferreira",
                language="Español",
                synopsis_es="Un médico forense comienza a recibir mensajes cifrados en los cuerpos que examina.",
                synopsis_en="A forensic doctor starts receiving coded messages in the bodies he examines.",
                participation_status="selected",
            ),
        )
        w3, _ = Work.objects.get_or_create(
            title="After the Flood", edition=e24,
            defaults=dict(
                type="feature", section="panorama",
                country="Irlanda / Francia", production_year=2023, runtime=112,
                director="Aoife Brennan",
                language="Inglés, Irlandés", subtitles="Español",
                synopsis_es="En una ciudad bajo el agua, los sobrevivientes descubren que algo despertó en las profundidades.",
                synopsis_en="In a submerged city, survivors discover something has awakened in the depths.",
                participation_status="latam_premiere",
            ),
        )
        self.stdout.write(f"  Works 2024: {w1.title}, {w2.title}, {w3.title}")

        # ── Screenings for 2024 ────────────────────────────────────────────────
        Screening.objects.get_or_create(
            edition=e24, work=w1, date="2024-10-11", time="20:00",
            defaults=dict(venue=v1, notes="Premiere + Q&A con directora"),
        )
        Screening.objects.get_or_create(
            edition=e24, work=w1, date="2024-10-14", time="18:30",
            defaults=dict(venue=v2),
        )
        Screening.objects.get_or_create(
            edition=e24, work=w2, date="2024-10-12", time="19:00",
            defaults=dict(venue=v1),
        )
        Screening.objects.get_or_create(
            edition=e24, work=w3, date="2024-10-13", time="21:30",
            defaults=dict(venue=v2, notes="Presentación del productor"),
        )
        self.stdout.write("  Screenings 2024 created")

        # ── Award categories ───────────────────────────────────────────────────
        cat_best, _ = AwardCategory.objects.get_or_create(name="Mejor Largometraje", defaults=dict(order=1))
        cat_short, _ = AwardCategory.objects.get_or_create(name="Mejor Cortometraje", defaults=dict(order=2))
        cat_dir, _ = AwardCategory.objects.get_or_create(name="Mejor Dirección", defaults=dict(order=3))
        cat_aud, _ = AwardCategory.objects.get_or_create(name="Premio del Público", defaults=dict(is_audience_award=True, order=4))

        # ── Award winners for 2024 ─────────────────────────────────────────────
        AwardWinner.objects.get_or_create(edition=e24, category=cat_best, work=w1, defaults=dict(is_special_mention=False))
        AwardWinner.objects.get_or_create(edition=e24, category=cat_short, work=w2, defaults=dict(is_special_mention=False))
        AwardWinner.objects.get_or_create(edition=e24, category=cat_dir, work=w3, defaults=dict(is_special_mention=True, notes="Por su manejo del espacio y el silencio"))
        AwardWinner.objects.get_or_create(edition=e24, category=cat_aud, work=w1, defaults=dict(is_special_mention=False))
        self.stdout.write("  Awards 2024 created")

        # ── Venues + Works for 2026 ────────────────────────────────────────────
        Venue.objects.get_or_create(
            edition=e26, name="Cinemateca Uruguaya",
            defaults=dict(address="Lorenzo Carnelli 1311, Montevideo", capacity=250, order=1),
        )
        Venue.objects.get_or_create(
            edition=e26, name="Teatro Stella d'Italia",
            defaults=dict(address="Zelmar Michelini 1236, Montevideo", capacity=800, order=2),
        )

        Work.objects.get_or_create(
            title="El Último Umbral", edition=e26,
            defaults=dict(
                type="feature", section="competition_int",
                country="Uruguay / Brasil", production_year=2026, runtime=104,
                director="Lucía Pereyra",
                language="Español, Portugués",
                synopsis_es="Una investigadora paranormal encuentra una puerta que conecta Montevideo con una ciudad espejo donde los muertos viven en loop.",
                synopsis_en="A paranormal investigator finds a door connecting Montevideo to a mirror city where the dead live in a loop.",
                participation_status="world_premiere",
            ),
        )
        Work.objects.get_or_create(
            title="Tide", edition=e26,
            defaults=dict(
                type="short", section="short_competition",
                original_title="Tide",
                country="Japón", production_year=2025, runtime=22,
                director="Hiroshi Tanaka",
                language="Japonés", subtitles="Español",
                synopsis_es="Un pescador anciano descubre que las mareas traen algo de vuelta cada luna llena.",
                synopsis_en="An elderly fisherman discovers the tides bring something back every full moon.",
                participation_status="latam_premiere",
            ),
        )
        self.stdout.write("  Works + Venues 2026 created")

        self.stdout.write(self.style.SUCCESS("\nSeed complete."))
