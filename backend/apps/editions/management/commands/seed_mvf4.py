"""Seed MVF IV (2009) - 4th edition of Montevideo Fantástico.

Data sourced from: https://www.montevideofan.com/montevideo-fantastico-iv/
Festival dates: May 16–22, 2009 (closed Friday 22 May)
Venue: Cine Universitario (two halls)
"""
from django.core.management.base import BaseCommand
from apps.editions.models import Edition
from apps.venues.models import Venue
from apps.works.models import Work
from apps.screenings.models import Screening
from apps.awards.models import AwardCategory, AwardWinner
import datetime


class Command(BaseCommand):
    help = "Seed MVF IV (2009) edition with real data from montevideofan.com"

    def handle(self, *args, **options):
        self.stdout.write(self.style.MIGRATE_HEADING("Seeding MVF IV (2009)..."))

        # ── Edition ───────────────────────────────────────────────────────────
        edition, created = Edition.objects.get_or_create(
            year=2009,
            defaults=dict(
                name="Montevideo Fantástico IV",
                number=4,
                slug="mvf-2009",
                start_date="2009-05-16",
                end_date="2009-05-22",
                status="past",
                is_current=False,
                description_es=(
                    "La cuarta edición de Montevideo Fantástico reunió a más de 2.000 espectadores "
                    "en las dos salas de Cine Universitario. Unos 100 trabajos fueron exhibidos entre "
                    "cortos, medios y largometrajes de casi 20 países, con destacada presencia "
                    "sudamericana y uruguaya. La película filipina Altar, de Rico María Ilarde, "
                    "se alzó con el galardón a Mejor Película."
                ),
                description_en=(
                    "The fourth edition of Montevideo Fantástico drew over 2,000 attendees to "
                    "Cine Universitario's two halls. Around 100 works were screened — shorts, "
                    "medium-length films and features from nearly 20 countries — with a notable "
                    "South American and Uruguayan presence. The Filipino film Altar, by Rico María "
                    "Ilarde, won the Best Picture award."
                ),
                description_pt=(
                    "A quarta edição do Montevideo Fantástico reuniu mais de 2.000 espectadores "
                    "nas duas salas do Cine Universitário. Cerca de 100 trabalhos foram exibidos "
                    "entre curtas, médias e longas-metragens de quase 20 países, com destaque "
                    "para a produção sul-americana e uruguaia. O filme filipino Altar, de Rico "
                    "María Ilarde, recebeu o prêmio de Melhor Filme."
                ),
            ),
        )
        self.stdout.write(f"  {'Created' if created else 'Exists'}: {edition}")

        # ── Venues ────────────────────────────────────────────────────────────
        sala1, _ = Venue.objects.get_or_create(
            edition=edition, name="Cine Universitario – Sala 1",
            defaults=dict(
                address="Lorenzo Carnelli 1311, Montevideo",
                description="Sala principal de Cine Universitario, sede histórica del festival.",
                capacity=270,
                order=1,
            ),
        )
        sala2, _ = Venue.objects.get_or_create(
            edition=edition, name="Cine Universitario – Sala 2",
            defaults=dict(
                address="Lorenzo Carnelli 1311, Montevideo",
                description="Sala secundaria de Cine Universitario.",
                capacity=120,
                order=2,
            ),
        )
        self.stdout.write(f"  Venues: {sala1.name}, {sala2.name}")

        # ── Helper ────────────────────────────────────────────────────────────
        def work(title, country, year, runtime, director,
                 wtype, section, cast="", synopsis_es="", synopsis_en="",
                 original_title="", participation_status="selected",
                 language="", subtitles=""):
            obj, created = Work.objects.get_or_create(
                title=title, edition=edition,
                defaults=dict(
                    original_title=original_title or title,
                    type=wtype,
                    section=section,
                    participation_status=participation_status,
                    country=country,
                    production_year=year,
                    runtime=runtime,
                    director=director,
                    cast=cast,
                    language=language or "Español" if "Uruguay" in country or "Argentina" in country or "Chile" in country or "España" in country else language,
                    subtitles=subtitles,
                    synopsis_es=synopsis_es,
                    synopsis_en=synopsis_en,
                ),
            )
            tag = "NEW" if created else " - "
            self.stdout.write(f"    [{tag}] {title}")
            return obj

        self.stdout.write("  --- Competition Feature Films ---")

        # ── Competition Features ──────────────────────────────────────────────
        altar = work(
            title="Altar",
            country="Filipinas", year=2007, runtime=90,
            director="Rico María Ilarde",
            cast="Zanjoe Marudo, Nor Domingo, Dimples Romana, Dido De La Paz, Kristalyn Engle",
            wtype="feature", section="competition_int",
            language="Filipino", subtitles="Español",
            synopsis_es=(
                "Anton, ex boxeador retirado tras matar accidentalmente a un oponente, regresa a "
                "Filipinas y acepta un trabajo de renovación en una casa aislada en las afueras. "
                "En su interior es perseguido por la aparición de una niña, y en el sótano "
                "descubre un extraño altar a una deidad desconocida."
            ),
        )
        balada = work(
            title="La Balada de Vlad Tepes",
            country="Uruguay", year=2009, runtime=90,
            director="Guzmán Vila",
            cast="Silvio Galizzi, Daniel Guridi, Herardo Trápani",
            wtype="feature", section="competition_nat",
            participation_status="world_premiere",
            language="Español",
            synopsis_es=(
                "Secuela de Sangre en La Mondiola. El personaje del título debe enfrentarse a "
                "enemigos aún más siniestros: un traficante de arte, un policía corrupto, una "
                "periodista curiosa y un vengativo sujeto, mientras busca a su hija desaparecida. "
                "Terror, thriller, comedia negra y western se mezclan en este film ecléctico uruguayo."
            ),
        )
        granja = work(
            title="La Granja",
            country="Argentina", year=2008, runtime=88,
            director="Ernesto Aguilar",
            cast="Lourdes Ávalos, Juan Gavaida, Roberto Bobe, Mariana Topatigh, Jorge Porcel (h)",
            wtype="feature", section="competition_int",
            language="Español",
            synopsis_es=(
                "Al perder su trabajo, Guillermo y su esposa Silvana se mudan al campo con su hija "
                "Romina. En el camino se detienen en una granja regentada por Björn, un sueco excéntrico "
                "que lidera una secta con oscuros propósitos. La película más delirante y bizarra de la edición."
            ),
        )
        morgue = work(
            title="Morgue Story: Blood, Blowfish and Comics",
            original_title="Morgue Story: Sangue, Baiacu e Quadrinhos",
            country="Brasil", year=2009, runtime=78,
            director="Paulo Biscaia Filho",
            cast="Mariana Zanette, Leandro Daniel Colombo, Anderson Faganello, Rafaella Marques, Wagner Correa",
            wtype="feature", section="competition_int",
            language="Portugués", subtitles="Español",
            synopsis_es=(
                "En la vida de una famosa dibujante de cómics se cruzan un cataléptico crónico que "
                "vende seguros de vida y un sociópata religioso que trabaja en una morgue con una "
                "pócima vudú. Ópera prima del brasilero Biscaia Filho, homenaje al terror de los '80 "
                "con humor negro y elementos tarantinescos."
            ),
        )
        mangue = work(
            title="Mud Zombies",
            original_title="Mangue Negro",
            country="Brasil", year=2008, runtime=105,
            director="Rodrigo Aragao",
            cast="Valderrama Dos Santos, Kika de Oliveira, Ricardo Araújo, André Lobo, Markus Konka",
            wtype="feature", section="competition_int",
            language="Portugués", subtitles="Español",
            synopsis_es=(
                "En un pantano rodeado de montañas, el tímido Luiz quiere declarar su amor por "
                "Raquel cuando criaturas del fango amenazan a la comunidad. Primera película de "
                "zombies brasilera, con notable trabajo artesanal de efectos especiales inspirados "
                "en Romero y Fulci."
            ),
        )
        muneco = work(
            title="Muñeco Viviente V",
            country="Uruguay", year=2008, runtime=90,
            director="Maxi Contenti",
            cast="Bruno Contenti, Manuel Facal, Joaquín Tomé",
            wtype="feature", section="competition_nat",
            language="Español",
            synopsis_es=(
                "Bruno, joven perturbado por su misterioso pasado, debe enfrentarse nuevamente "
                "a un muñeco de plástico que amenazó su infancia. Ópera prima uruguaya filmada "
                "sin guión, sin presupuesto y prácticamente en el edificio donde vive el director, "
                "con humor absurdo y espíritu retro."
            ),
        )
        nadie = work(
            title="Nadie Inquietó Más: Narciso Ibáñez Menta",
            country="Argentina", year=2008, runtime=105,
            director="Gustavo Leonel Mendoza",
            wtype="feature", section="competition_int",
            language="Español",
            synopsis_es=(
                "Documental que homenajea la vida y obra del gran Narciso Ibáñez Menta, figura "
                "que transformó el terror en Argentina y España. Investigación periodística de "
                "varios años con entrevistas a grandes figuras del cine iberoamericano, incluyendo "
                "a su hijo Chicho Serrador."
            ),
        )
        nomoriré = work(
            title="No Moriré Sola",
            country="Argentina", year=2008, runtime=84,
            director="Adrián García Bogliano",
            cast="Marisol Tur, Gimena Blesa, Andrea Duarte, Magdalena de Santo, Rolf García",
            wtype="feature", section="competition_int",
            language="Español",
            synopsis_es=(
                "Cuatro jóvenes mujeres recogen en la ruta a una mujer herida por cazadores furtivos. "
                "En su afán por ayudarla se convierten en víctimas de esos salvajes. Cine de violencia "
                "y venganza que evoca los films de los años '70 con un enfoque crudo y descarnado."
            ),
        )
        shadowland = work(
            title="Shadowland",
            country="Estados Unidos", year=2009, runtime=99,
            director="Wyatt Weed",
            cast="Caitlin McIntosh, Jason Contini, Carlos Antonio León, Rober Nolan Clark, David Martin Conley",
            wtype="feature", section="competition_int",
            language="Inglés", subtitles="Español",
            synopsis_es=(
                "Una joven mujer emerge de una excavación, golpeada y sin memoria, internándose "
                "en la noche en busca de respuestas. Pronto la persigue un hombre misterioso. "
                "Cine de vampiros independiente con tono gótico, que desafía las reglas del género."
            ),
        )
        sonambulos = work(
            title="Sonámbulos",
            country="Chile", year=2009, runtime=71,
            director="Christian Aylwin",
            cast="Susana Tello, Rafael Contreras, María Teresa Traverso, Patricio Aylwin, Ricardo Recabarren",
            wtype="feature", section="competition_int",
            language="Español",
            synopsis_es=(
                "Un hombre y una mujer casados mueren repentinamente. Ella no lo sabe y vive su "
                "duelo; él sí sabe que murió pero imagina a su mujer viva. Creyéndose en universos "
                "distintos no se encuentran jamás. Inspirada en Pedro Páramo de Juan Rulfo."
            ),
        )
        yesterday = work(
            title="Yesterday",
            country="Canadá", year=2009, runtime=98,
            director="Rob Grant",
            cast="Graham Wardle, P. Lynn Johnson, Bill Murdoch, Mike Kovac, Jesse Wheeler",
            wtype="feature", section="competition_int",
            language="Inglés", subtitles="Español",
            synopsis_es=(
                "Los suburbios de Canadá son invadidos por muertos vivos. Un grupo diverso de "
                "supervivientes busca refugio en el bosque, pero la mayor amenaza no viene de los "
                "zombies sino de la condición humana. Mezcla curiosa de Dawn of the Dead y Deliverance."
            ),
        )
        academy = work(
            title="Academy of Doom",
            country="Estados Unidos", year=2008, runtime=85,
            director="Chip Gubera",
            cast="Mil Máscaras (Aaron Rodríguez), Sabrina Braden, JU, Jaxson Stanford, Chrystal Carpenter",
            wtype="feature", section="competition_int",
            language="Inglés", subtitles="Español",
            synopsis_es=(
                "Mil Máscaras, el legendario luchador mexicano de casi 70 años, se une a La Torcha "
                "para investigar misteriosos asesinatos planificados por el excéntrico Barón (Luctor). "
                "Acción, lucha libre y entretenimiento sin pretensiones en la academia femenina del héroe enmascarado."
            ),
        )

        self.stdout.write("  --- Informative Session Features ---")

        # ── Informative / Panorama Features ──────────────────────────────────
        alien = work(
            title="Alien Abduction: Incident in Lake County",
            country="Estados Unidos", year=1998, runtime=92,
            director="Dean Alioto",
            cast="Benz Antoine, Kristian Ayre, Gillian Barber, Michael Buie, Emmanuelle Chriqui",
            wtype="feature", section="panorama",
            language="Inglés", subtitles="Español",
            synopsis_es=(
                "La cámara de un adolescente registra la invasión alienígena de su casa de campo "
                "durante la cena de Acción de Gracias. Emitida sin créditos por HBO, fue modelo "
                "para El Proyecto Blair Witch (1999) y REC (2007)."
            ),
        )
        antarctic = work(
            title="Antarctic Journal",
            original_title="Namgeuk-ilgi",
            country="Corea del Sur", year=2005, runtime=115,
            director="Yim Pil-Sung",
            cast="Song Kang-Ho, Yu Ji-Tae, Park Hee-Soon, Yoon Jae-Moon, Choi Duek-Mun",
            wtype="feature", section="panorama",
            language="Coreano", subtitles="Español",
            synopsis_es=(
                "Un grupo japonés intenta alcanzar un punto extremo de la Antártida y halla el "
                "diario de exploradores ingleses muertos allí en 1922. La psicología de los "
                "personajes se transforma ante el entorno hostil en un thriller oscuro y desconcertante."
            ),
        )
        milmascaras = work(
            title="Mil Máscaras: Resurrection",
            country="Estados Unidos", year=2008, runtime=91,
            director="Chip Gubera, Andrew Quint",
            cast="Mil Máscaras, JU, Kurt Drennen Mirtsching, Willard Pugh, Melissa Osborn",
            wtype="feature", section="panorama",
            language="Inglés", subtitles="Español",
            synopsis_es=(
                "Mil Máscaras se enfrenta a la Momia Azteca, resucitada por el poder de la gema "
                "de Tonauac. Superhéroes enmascarados y lucha libre en esta clásica película "
                "nostálgica sin pretensiones."
            ),
        )
        onevilgrounds = work(
            title="On Evil Grounds",
            original_title="Auf bösem Boden",
            country="Austria", year=2007, runtime=82,
            director="Peter Koller",
            cast="Aleksandar Petrovic, Birgit Stauber, Faris Rahoma, Kari Rakkola, Andreas Svolanek",
            wtype="feature", section="panorama",
            language="Alemán", subtitles="Español",
            synopsis_es=(
                "Romeo y Juliet compran un desván en una fábrica desmantelada. El dueño loco y "
                "su cómplice agente inmobiliario llevan años secuestrando y torturando jóvenes. "
                "Cine trash europeo de bajo presupuesto, con humor caricaturesco y situaciones bizarras."
            ),
        )
        oscuro = work(
            title="Oscuro / Iluminado",
            country="Chile", year=2007, runtime=77,
            director="Miguel Ángel Vidaurre",
            cast="Felipe Braun, Sol Aravena, Sergio Hernández, Luna Martínez, Francisco Ruiz de Viñaspre",
            wtype="feature", section="panorama",
            language="Español",
            synopsis_es=(
                "Miguel, joven director de cine, pierde a su mujer en un extraño accidente. "
                "Obsesionado con su imagen, la recrea en representaciones cinematográficas hasta "
                "que realidad y ficción se mezclan irremediablemente en un estilo cercano a David Lynch."
            ),
        )
        montejo = work(
            title="Jorge Montejo: El Hombre Detrás de Paolo",
            country="Argentina", year=2008, runtime=39,
            director="Damián Pantaleone, Pablo Giurastante",
            wtype="medium", section="panorama",
            language="Español",
            synopsis_es=(
                "Documental en primera persona sobre Jorge Montejo, el actor que creó a 'Paolo, "
                "el rockero', el hippie más querido del cine y TV rioplatense. Recorre sus comienzos "
                "en Badía & Compañía, su paso por la locura y su resurgimiento final."
            ),
        )

        self.stdout.write("  --- Award-winning Short Films ---")

        # ── Key Short Films (award winners + mentioned) ───────────────────────
        dedicado = work(
            title="Dedicado a Nadie",
            country="Argentina", year=2008, runtime=21,
            director="Andrés Borghi",
            cast="Samantha Zoppo, Felipe Villanueva, Liliana Kolinski",
            wtype="short", section="short_competition",
            language="Español",
            synopsis_es=(
                "Fabiana, una chica tímida e introvertida, recibe la visita de un extraño ser "
                "misterioso. Aunque le teme, intenta comunicarse con él. Ganadora del premio "
                "a Mejor Cortometraje del Festival y Mejor Cortometraje Latinoamericano."
            ),
        )
        tren = work(
            title="Tren Fantasma",
            country="Uruguay", year=2008, runtime=16,
            director="Darío Núñez",
            cast="Nathan Nuñez, Matías Recoba, Dahiana Nuñez",
            wtype="short", section="short_competition",
            language="Español",
            synopsis_es=(
                "En un parque de diversiones, tres jóvenes planeaban pasarla bien. Nunca imaginaron "
                "el horror que los esperaba. Mejor Cortometraje Uruguayo del Festival y ganador "
                "del Premio del Público en la misma categoría… la revelación local."
            ),
        )
        ferra = work(
            title="La Ferra: Ciudad Dormida",
            country="Chile", year=2008, runtime=30,
            director="Arturo Quezada Torres",
            cast="Carola Abarzua, Aldo Parodi, Enrique Neira",
            wtype="short", section="short_competition",
            language="Español",
            synopsis_es=(
                "Un apacible pueblo es asaltado por almas en pena lideradas por el Diablo, "
                "la Quintrala y Niague. Una poetisa, un loco y un estudiante se enfrentan "
                "a esta pesadilla folclórica. Mejor Animación y Premio del Público Latinoamericano."
            ),
        )
        magritte = work(
            title="Magritte Moment",
            country="Estados Unidos", year=2008, runtime=17,
            director="Ian Fischer",
            cast="Joel Johnstone, Mizuo Peck, Tom Noonan",
            wtype="short", section="short_competition",
            language="Inglés", subtitles="Español",
            synopsis_es=(
                "Un pintor frustrado, en busca de su musa, encuentra inspiración a través de "
                "la obra de René Magritte. Premio a Mejor Corto en el Festival de Cine "
                "Independiente de Filadelfia y a Mejor Corto Experimental en Route 66 Film Festival."
            ),
        )
        sideeffect = work(
            title="Side Effect",
            country="Estados Unidos", year=2008, runtime=14,
            director="Liz Adams",
            cast="Virginia Newcomb, Suzy Cote, Jonathan Nail",
            wtype="short", section="short_competition",
            language="Inglés", subtitles="Español",
            synopsis_es=(
                "Una niñera agobiada por el estrés toma unas pastillas nuevas para rendir mejor. "
                "Todo parece bien hasta que la pareja dueña de casa regresa. Premiada en Shriekfest, "
                "Chicago Horror Festival, Dead by Dawn y Festival de Oldenburgo."
            ),
        )
        senalados = work(
            title="Los Señalados de Dios",
            country="Uruguay", year=2008, runtime=30,
            director="Juma Fodde",
            cast="Sergio Gorfain, Sergio Mautone, Micaela Gatti",
            wtype="short", section="short_competition",
            language="Español",
            synopsis_es=(
                "Mordido por la víbora yarará, un hombre busca ayuda en su bote. Es rescatado por "
                "una familia con una 'genética maldita' que le revela su trágica historia. Adaptación "
                "de los cuentos de Horacio Quiroga: 'A la deriva' y 'La gallina degollada'."
            ),
        )
        manual = work(
            title="Manual Práctico del Amigo Imaginario",
            country="España", year=2008, runtime=20,
            director="Ciro Altabás",
            cast="Christian Sampedro, Luis Larrodera, Ana Del Arco",
            wtype="short", section="short_competition",
            language="Español",
            synopsis_es=(
                "Pese a sus 27 años, el protagonista aún conserva a su amigo imaginario de la "
                "infancia: el Capitán Kilotón, un superhéroe. Su relación peligra cuando un amor "
                "platónico del colegio entra a vivir con la extraña pareja."
            ),
        )
        entrevias = work(
            title="Entre las Vías",
            country="Uruguay", year=2008, runtime=13,
            director="Antonella Tambasco",
            cast="Belén Baptista, Florencia Bresciano, Francisco Forteza",
            wtype="short", section="short_competition",
            language="Español",
            synopsis_es=(
                "En una solitaria estación de tren, varios personajes mantienen un extraño vínculo "
                "a través de una carta que desencadenará un final tan inesperado como insólito. "
                "Premio del Público – Mejor Cortometraje Uruguayo."
            ),
        )

        self.stdout.write("  --- Screenings ---")

        # ── Screenings ────────────────────────────────────────────────────────
        # Festival ran May 16–22, 2009. Features screened in Sala 1, shorts in Sala 2.
        screening_data = [
            # (work_obj, venue, date_str, time_str, notes)
            # Saturday 16
            (altar,      sala1, "2009-05-16", "20:30", "Proyección inaugural. Ganadora a Mejor Película."),
            (balada,     sala2, "2009-05-16", "22:15", "Proyección uruguaya en competencia nacional."),
            # Sunday 17
            (granja,     sala1, "2009-05-17", "18:00", ""),
            (morgue,     sala1, "2009-05-17", "20:00", "Presentación con director Paulo Biscaia Filho y actor Leandro Colombo."),
            (dedicado,   sala2, "2009-05-17", "19:00", "Sesión de cortometrajes latinoamericanos."),
            (ferra,      sala2, "2009-05-17", "19:30", ""),
            # Monday 18
            (mangue,     sala1, "2009-05-18", "20:00", ""),
            (muneco,     sala2, "2009-05-18", "18:30", "Proyección uruguaya. Presentación con director."),
            (magritte,   sala2, "2009-05-18", "20:30", "Sesión de cortometrajes internacionales."),
            (sideeffect, sala2, "2009-05-18", "20:47", ""),
            # Tuesday 19
            (nomoriré,   sala1, "2009-05-19", "20:00", ""),
            (nadie,      sala1, "2009-05-19", "18:00", "Presentación con realizador Gustavo Mendoza."),
            (senalados,  sala2, "2009-05-19", "19:00", "Sesión de cortometrajes uruguayos."),
            (tren,       sala2, "2009-05-19", "19:35", ""),
            (entrevias,  sala2, "2009-05-19", "20:00", ""),
            # Wednesday 20
            (shadowland, sala1, "2009-05-20", "20:30", ""),
            (sonambulos, sala1, "2009-05-20", "18:00", ""),
            (manual,     sala2, "2009-05-20", "19:00", "Sesión de cortometrajes internacionales."),
            # Thursday 21
            (yesterday,  sala1, "2009-05-21", "20:00", ""),
            (academy,    sala1, "2009-05-21", "22:00", ""),
            (alien,      sala2, "2009-05-21", "18:00", "Muestra informativa con presentación especial."),
            # Friday 22 — closing day
            (antarctic,  sala2, "2009-05-22", "16:00", ""),
            (onevilgrounds, sala2, "2009-05-22", "18:00", ""),
            (altar,      sala1, "2009-05-22", "20:30", "Segunda proyección – función de cierre. Entrega de premios a continuación."),
        ]

        for w_obj, venue, date_str, time_str, notes in screening_data:
            s, created = Screening.objects.get_or_create(
                edition=edition, work=w_obj, date=date_str, time=time_str,
                defaults=dict(venue=venue, notes=notes),
            )
            if created:
                self.stdout.write(f"    + {w_obj.title[:40]:<40}  {date_str} {time_str}")

        self.stdout.write("  --- Award Categories ---")

        # ── Award Categories ──────────────────────────────────────────────────
        cat_bestfilm, _ = AwardCategory.objects.get_or_create(
            name="Mejor Película",
            defaults=dict(description="Premio del jurado al mejor largometraje del festival.", order=1),
        )
        cat_bestlatam, _ = AwardCategory.objects.get_or_create(
            name="Mejor Película Latinoamericana",
            defaults=dict(description="Premio del jurado al mejor largometraje latinoamericano.", order=2),
        )
        cat_mention_feature, _ = AwardCategory.objects.get_or_create(
            name="Mención Especial – Largometraje",
            defaults=dict(description="Menciones especiales del jurado de largometrajes.", order=3),
        )
        cat_bestshort, _ = AwardCategory.objects.get_or_create(
            name="Mejor Cortometraje del Festival",
            defaults=dict(description="Premio del jurado al mejor cortometraje, incluye el mejor latinoamericano.", order=4),
        )
        cat_bestuy_short, _ = AwardCategory.objects.get_or_create(
            name="Mejor Cortometraje Uruguayo",
            defaults=dict(description="Premio del jurado al mejor cortometraje uruguayo.", order=5),
        )
        cat_mention_short, _ = AwardCategory.objects.get_or_create(
            name="Mención Especial – Cortometraje",
            defaults=dict(description="Menciones especiales del jurado de cortometrajes.", order=6),
        )
        cat_pub_largo, _ = AwardCategory.objects.get_or_create(
            name="Premio del Público – Mejor Largo",
            defaults=dict(is_audience_award=True, order=7),
        )
        cat_pub_corto, _ = AwardCategory.objects.get_or_create(
            name="Premio del Público – Mejor Cortometraje",
            defaults=dict(is_audience_award=True, order=8),
        )
        cat_pub_latam, _ = AwardCategory.objects.get_or_create(
            name="Premio del Público – Mejor Cortometraje Latinoamericano",
            defaults=dict(is_audience_award=True, order=9),
        )
        cat_pub_uy, _ = AwardCategory.objects.get_or_create(
            name="Premio del Público – Mejor Cortometraje Uruguayo",
            defaults=dict(is_audience_award=True, order=10),
        )

        self.stdout.write("  --- Award Winners ---")

        # ── Award Winners ─────────────────────────────────────────────────────
        winners = [
            # (category, work_obj, is_mention, notes)
            (cat_bestfilm,        altar,      False, 'Jurado: "Por integrar el estudio de personajes y el suspenso con una sólida utilización del lenguaje cinematográfico."'),
            (cat_bestlatam,       nomoriré,   False, 'Jurado: "Por trascender las múltiples referencias aludidas, lograr un contexto local y mantener un firme pulso de un relato que alcanza ribetes políticos."'),
            (cat_mention_feature, morgue,     True,  'Jurado: "Por su humor, buen guión, ritmo narrativo, y aporte al género de muertos vivientes."'),
            (cat_mention_feature, muneco,     True,  'Jurado: "Por sus momentos de tensión y excelentes encuadres, dejando constancia de que pertenece al subgénero del fantástico autorreferente y filmado con escasísimos recursos."'),
            (cat_mention_feature, sonambulos, True,  'Jurado: "Por la apuesta a crear un relato fantástico con elementos mínimos y sugerentes."'),
            (cat_bestshort,       dedicado,   False, 'Jurado: "Por expresarse sobre situaciones cotidianas, dentro de los parámetros del género. Por sus virtudes al momento de inquietar a través del terror explícito."'),
            (cat_bestuy_short,    tren,       False, 'Jurado: "Porque presenta una historia simple, pero bien llevada a cabo, con algunos logrados efectos especiales y una buena labor de montaje."'),
            (cat_mention_short,   ferra,      True,  'Mejor Animación. Jurado: "Por sus valiosos recursos técnicos, por tratarse de una brillante animación. Por la intención de rescatar los últimos valores positivos de la humanidad."'),
            (cat_mention_short,   magritte,   True,  'Mejor Director. Jurado: "Por una estética que traduce la búsqueda artística del personaje."'),
            (cat_mention_short,   sideeffect, True,  'Mejor Guión. Jurado: "Dentro de un típico planteo de horror se logra un trabajo original, arriesgado y con buenos resultados. Por su temática actual y preocupante."'),
            (cat_mention_short,   senalados,  True,  'Mejor Producción. Jurado: "Por la visión de su realizador, por la acertada fusión de dos cuentos dentro de una misma historia."'),
            (cat_pub_largo,       balada,     False, "Premio del Público – Mejor Largo del Festival y Mejor Largo Latinoamericano."),
            (cat_pub_corto,       manual,     False, "Premio del Público – Mejor Cortometraje del Festival."),
            (cat_pub_latam,       ferra,      False, "Premio del Público – Mejor Cortometraje Latinoamericano."),
            (cat_pub_uy,          entrevias,  False, "Premio del Público – Mejor Cortometraje Uruguayo."),
        ]

        for cat, w_obj, is_mention, notes in winners:
            aw, created = AwardWinner.objects.get_or_create(
                edition=edition, category=cat, work=w_obj,
                defaults=dict(is_special_mention=is_mention, notes=notes),
            )
            label = "Mención" if is_mention else "Premio"
            tag = "NEW" if created else " - "
            self.stdout.write(f"    [{tag}] {label}: {w_obj.title[:35]:<35}  [{cat.name[:35]}]")

        self.stdout.write(self.style.SUCCESS("\nMVF IV (2009) seeded successfully!"))
        self.stdout.write(f"  Works:     {Work.objects.filter(edition=edition).count()}")
        self.stdout.write(f"  Screenings:{Screening.objects.filter(edition=edition).count()}")
        self.stdout.write(f"  Winners:   {AwardWinner.objects.filter(edition=edition).count()}")
