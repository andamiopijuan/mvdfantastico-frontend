// Run from container: node scripts/gen-mvf-x.js
const fs = require('fs');
const path = require('path');

const data = {
  edition: {
    number: 10,
    roman: "X",
    year: 2017,
    title: "Montevideo Fantástico X",
    dates: "6–13 de diciembre de 2017",
    poster: "/media/archive/X/poster.jpg",
    venues: [
      "Movie",
      "Cine Universitario del Uruguay",
      "Cinemateca Pocitos",
      "Museo Regional Carolino",
      "Intendencia de Montevideo"
    ]
  },

  editorial: {
    title: "Los premios del Montevideo Fantástico 10",
    author: "Alejandro Yamgotchian",
    content: [
      "Del 6 al 13 de diciembre de 2017 tuvo lugar la décima edición del Montevideo Fantástico, el festival de terror, fantasía y ciencia ficción de Uruguay, en Movie, Cine Universitario del Uruguay, Cinemateca Pocitos, Museo Regional Carolino (San Carlos, Maldonado) y en la explanada de la Intendencia de Montevideo (en el «Día de la Momia»). Fueron 8 días, 2 ciudades, 5 salas, casi 30 largometrajes, más de 70 cortos, casi 40 países representados, charlas, exposiciones, conciertos, homenajes, estrenos para Uruguay, Sudamérica y hasta uno mundial.",
      "El experto en efectos de maquillaje, nuestro compatriota Roberto Parada (Voces anónimas, La casa muda, Dios local), brindó una charla magistral, con entrada libre y acompañada de imágenes y fragmentos de películas que repasaron la historia del propio maquillaje desde los inicios del cine y hasta nuestros días. El público presente también le hizo preguntas y la siguió en el hall, donde Roberto muy amablemente siguió respondiendo a los asistentes.",
      "La apertura del evento estuvo a cargo de jóvenes artistas, quienes expusieron sus trabajos en el hall del Universitario. El público pudo disfrutar, además, de un brindis previo a la función inaugural (con la japonesa El maleficio de la serpiente) y un cierre con bastante rock´n roll a cargo de las bandas uruguayas VHS y Tomie.",
      "Visitantes hubo varios, empezando por los realizadores uruguayos Fabricio Camargo y Jimena Crujeira, quienes junto a su equipo de filmación vinieron a presentar las funciones de Tacuaremboense inmortal (la película que más entradas vendió y la más vista del festival), siguiendo con el director compatriota Gabriel Díaz, quien estuvo presente, también junto a su equipo, para ofrecernos un adelanto de su próximo largo (de ciencia ficción), La última fase, y culminando con Miguel Torena, que presentó el thriller de suspenso y terror La lista de la muerte, también frente a numerosos espectadores.",
      "Fue la edición en la que más materiales se exhibieron, y la que más salas tuvo, a lo largo de ocho días a puro terror y ciencia ficción, con una inmensa mayoría de materiales (más del 90%) en calidad de estreno exclusivo para Uruguay. A continuación la lista de premiados:"
    ]
  },

  awards: [
    {
      section: "Competencia Oficial de Largometrajes",
      jury: "Mariano Cattaneo (realizador argentino), Guillermo Lockhart (Voces Anónimas), Alejandro Yamgotchian (Montevideo Fantástico)",
      awards: [
        {
          name: "Mejor Película del Festival",
          film: "Aterrados",
          country: "Argentina",
          year: 2017,
          director: "Demian Rugna",
          citation: "Por tratarse de un sólido thriller de terror paranormal basado en recursos de la vieja escuela del miedo y que se potencia no solo con las atmósferas asfixiantes y tenebrosas de su modesta historia, que transcurre en un típico barrio porteño, sino también con actuaciones de gran nivel para lo que es el cine de género. Por la brillante orquestación llevada a muy buen puerto de parte de su guionista y realizador."
        },
        {
          name: "Mejor Director",
          recipient: "Gyula Nemes",
          film: "Zero",
          country: "Alemania / Hungría / República Checa",
          year: 2015,
          citation: "Por su visión innovadora, arriesgada, inconformista de la lucha contra la globalización, por los giros atípicos que emplea dentro de la ciencia ficción, jugando ingeniosa e inteligentemente con la estética del cine mudo, haciendo cine dentro del cine, desafiando al mismo tiempo al propio espectador."
        },
        {
          name: "Mejor Guión",
          recipient: "Laura Casabé, Lisandro Bera",
          film: "La valija de Benavidez",
          country: "Argentina / México",
          year: 2016,
          citation: "Por la destreza para plasmar en pantalla un thriller psicológico que maneja varios ingredientes del cine de género, que desafió a reconocidos actores en papeles atípicos para sus carreras, y en donde la dirección artística termina siendo casi un personaje más."
        },
        {
          name: "Mejor Actor",
          recipient: "Maxi Ghione",
          film: "Aterrados",
          citation: "Por interpretar y con creces a un policía escéptico, a punto de retirarse, que tiene que enfrentarse a cosas que jamás había visto en su vida. Por su gran interpretación no exenta de algunos toques humorísticos y que de a ratos logran descomprimir los climas cada vez más tensos que maneja la historia."
        },
        {
          name: "Mejor Actriz",
          recipient: "Jeanne Heckmann-Adam",
          film: "Nathaly Furiosa",
          country: "Canadá",
          year: 2015,
          director: "Juan José Cea-Escobar",
          citation: "Por la credibilidad y el marcado contraste de su interpretación a lo largo de la película, como joven tímida y luego como mujer vengadora que termina siendo una impensada antiheroína. Por lograr imponerse con frecuencia a un buen relato que también le pedía permiso para robarle algo de protagonismo."
        },
        {
          name: "Mención Especial",
          recipient: "Mirta Busnelli",
          film: "Los Olvidados",
          citation: "En su regreso al cine, por la composición de un siniestro personaje, muy distinto a los que nos tiene acostumbrados."
        },
        {
          name: "Mención Especial",
          recipient: "Zeda Müller",
          film: "13 Dolls in Darkness",
          citation: "Por lo arriesgado y creativo de utilizar una técnica del cine mudo para contar una historia."
        },
        {
          name: "Mención Especial",
          recipient: "Elvira Onetto",
          film: "Aterrados",
          citation: "Por su excepcional labor, por su aplomo, por intensificar y darle absoluta seriedad a una escalofriante historia sobre fenómenos paranormales."
        },
        {
          name: "Premio del Público a Mejor Largometraje",
          film: "Tacuaremboense Inmortal",
          country: "Uruguay",
          year: 2017,
          director: "Fabricio Camargo, Jimena Crujeira"
        }
      ]
    },
    {
      section: "Competencia Oficial de Cortometrajes",
      jury: "Juan Pablo Aguirre (Radio Pasillo), Flavio Lira (Cinemateca Uruguaya / Revista Film), Alejandro Torre (Radio Camacuá)",
      awards: [
        {
          name: "Mejor Cortometraje",
          film: "Ringo Rocket Star and His Song for Yuri Gagarin",
          country: "Holanda / Serbia",
          year: 2017,
          director: "René Nuijens",
          citation: "Asimila diferentes vertientes estéticas dentro de un universo personal y autosuficiente. Cuenta con personajes tan ridículos como entrañables, fotografía muy cuidada y entretiene durante toda su duración."
        },
        {
          name: "Mejor Corto Latinoamericano",
          film: "Casulos: Cocoons of Outer Space",
          country: "Brasil",
          year: 2017,
          director: "Joel Caetano",
          citation: "Por remitir al terror cómico de los ´80, pero sin caer en los lugares comunes del homenaje, y por presentar un nuevo tipo de heroína dentro del género."
        },
        {
          name: "Mejor Corto Uruguayo",
          film: "Lucifera",
          year: 2016,
          director: "Demian García",
          citation: "Con un interesante desarrollo de personajes, con pocos detalles, nos hace creer en la protagonista sin idealizarla ni mirarla con desprecio. Tiene bien claro lo que quiere contar, logrando atraer el interés sin la necesidad de grandes despliegues técnicos."
        },
        {
          name: "Mención Especial",
          film: "A la hora marcada",
          citation: "Varias cosas me atraparon de este corto. Independientemente de la historia (que es muy sencilla), me encantó cómo presentó a los personajes, prácticamente sin diálogos. Ellos hablan a través de sus gestos y acciones. Se manejan los silencios con planos donde solo se escuchan pasos, o se perciben miradas que transmiten mucho, prácticamente sin que se hable. La tensión crece, y a pesar de que no se sabe bien qué está pasando, transmite sentimientos. Uno se va metiendo en la historia de la cual se sabe muy poco hasta llegar a un final que, con un toque místico, sorprende sin caer en exageraciones ni sermones. En líneas generales se puede concluir que los realizadores tenían bien claro lo que querían transmitir, y por lo menos en mi caso, lo lograron. – Juan Pablo Aguirre."
        },
        {
          name: "Mención Especial",
          film: "¡Ta Daaa!",
          citation: "Arrancó este corto y no entendí qué estaba pasando. A la mitad, tampoco. Terminó, y mucho menos. Pero mientras tanto me provocó risa, curiosidad y sorpresa. Quedé descolocado. Es un corto que sin grandes pretensiones logró transmitirme emociones que muchos otros intentaron, pero no pudieron. – Alejandro Torre."
        },
        {
          name: "Premio del Público a Mejor Cortometraje",
          film: "Akado",
          country: "Rusia",
          year: 2017,
          director: "Kim Belov"
        },
        {
          name: "Premio del Público a Mejor Corto Latinoamericano",
          film: "Monstruo",
          country: "Argentina",
          year: 2017,
          director: "Santiago Fabrizio"
        },
        {
          name: "Premio del Público a Mejor Corto Uruguayo",
          film: "Yo y nadie más",
          country: "Uruguay",
          year: 2016,
          director: "Marcelo Fabani"
        }
      ]
    }
  ],

  sections: [
    {
      name: "Competencia Internacional de Largometrajes",
      type: "features",
      films: [
        {
          slug: "13-munecas-en-la-oscuridad",
          title: "13 Dolls in Darkness / 13 Muñecas en la Oscuridad",
          country: "Australia",
          year: 2017,
          duration: 76,
          director: "Zeda Müller",
          poster: "/media/archive/X/films/13-munecas-en-la-oscuridad.jpg",
          trailer_url: null,
          synopsis: "Una joven regresa a su viejo hogar en el campo, luego de 13 años, para visitar a su madre enferma. Pero la muerte veloz acecha en la oscuridad.",
          review: "Hecha con apenas 190 dólares, estamos ante la sorprendente ópera prima de Zeda Müller, realizadora australiana que emula la estética del cine mudo, especialmente la del «expresionismo alemán» (Murnau, sobre todo Robert Wiene), trasladando, vía música y efectos sonoros (lo que la hace un tanto atemporal en cuanto a la época en que se ubica), un montón de referentes, entre clásicos y autores, que pasan por el giallo italiano, el cine de fantasmas, y llegan al slasher norteamericano, con ingeniosa vuelta de tuerca en el final. En 1991, y con tan solo 12 años, Müller intentó comunicarse telefónicamente con Darío Argento, para intercambiar ideas sobre películas y de paso manifestarle su admiración, pero no pudo contactar con él. La realizadora comenzó haciendo cortos con familiares y amigos, hasta llegar a este, su primer largometraje, una reinvención donde queda bien claro su muy buen gusto y especialmente su fanatismo por el terror.",
          credits: "Guión y Dirección: Zeda Müller. Con Hanika Nankervis, Monique Boyd, Alysha Casey, Darcie Reid, Aaron Ludorf. Duración: 76 minutos."
        },
        {
          slug: "el-archipielago",
          title: "El Archipiélago (L´Archipel)",
          country: "Francia",
          year: 2016,
          duration: 83,
          director: "Benoit Maestre",
          poster: "/media/archive/X/films/el-archipielago.jpg",
          trailer_url: "https://www.youtube.com/embed/B2FnphilK_I",
          synopsis: "Martin nunca despierta en el mismo lugar donde se duerme. Eva acudirá a una tentadora cita, gracias a un simpático individuo que conoció a través de Internet. Un hombre de negocios decide abandonar su trabajo y la ciudad donde vive, lanzándose al medio de la naturaleza. Pero todos ellos se cruzarán con un misterioso sujeto, «el Guerrero Silencioso», que parece dominar el lugar del título.",
          review: "Hecho con poco más de 2.000 dólares, este drama en clave de fantasía surrealista, dirigido por el francés (nacido en Tolousse) Benoit Maestre (varios documentales de corte social y largos under en su haber) expone a sus personajes adultos ante permanentes disyuntivas que quizás los ayuden a encontrarse a sí mismos y a saber qué es lo que realmente anhelan en sus vidas. Probablemente, las extrañas, inesperadas, a veces cómicas situaciones que viven (y que también sienten desde lo onírico, desde donde adquieren otras perspectivas) puedan servir como eje reflexivo y, sobre todo, orientador. Maestre no sólo dirigió; también hizo el guión, el montaje, la fotografía y la producción; un verdadero hombre orquesta. Premiada en España, Estados Unidos, Francia y Reino Unido.",
          credits: "Guión y Dirección: Benoit Maestre. Con Sylvie Maury, Guillaume Destren, Samuel Nathieu, Jean-Noël Robillard, Xristine Serrano. Duración: 83 minutos."
        },
        {
          slug: "aterrados",
          title: "Aterrados",
          country: "Argentina",
          year: 2017,
          duration: 88,
          director: "Demian Rugna",
          poster: "/media/archive/X/films/aterrados.jpg",
          trailer_url: "https://www.youtube.com/embed/urJio0HgqZQ",
          synopsis: "Gente que desaparece sin dejar rastros, muertos que vuelven de sus tumbas, voces que se escuchan en los drenajes de agua, entes invisibles que asesinan personas, movimientos magnéticos que no tienen explicación. Albreck, Jansen y Rosentok son los investigadores de estos fenómenos extraordinarios que confluyen en un mismo barrio. El comisario Maza será quien trate de dar una explicación coherente y colaborará con la investigación de estos profesionales. Una investigación que pronto implicará poner en riesgo sus propias vidas, una investigación que abrirá las puertas a un nuevo mundo. Un mundo en donde tenebrosas criaturas navegan en la oscuridad alimentándose de energías insanas como el odio, la envidia y el egoísmo.",
          review: "La dosis de terror paranormal y por excelencia dentro del festival, y de las mejores películas de terror hechas en Argentina, de muchos años a esta parte. El realizador y guionista Demian Rugna (The Last Gateway, dos segmentos de Malditos Sean!; todas exhibidas en el festival; aquí también se encarga de la banda sonora) nos trae ahora esta sólida historia que transcurre en tres casas de barrio, en la misma cuadra, y en la que se desatan hechos inexplicables, metiendo de lleno al espectador en un viaje cada vez más misterioso, claustrofóbico y aterrador, jugando con espectros, luces y especialmente sombras, en un relato que va y viene en el tiempo, dueño de una cuidadosa fotografía que saca partido de inquietantes atmósferas y también del terror explícito e implícito, sin olvidar algunos guiños a clásicos del género. El equipo de producción se asesoró con un investigador de casos paranormales, antes de comenzar el rodaje. El proyecto original había ganado el Primer Concurso de Cine Fantástico del INCAA. Otro de los puntos altos en el festival.",
          credits: "Guión y Dirección: Demian Rugna. Con Maxi Ghione, Norberto Amadeo Gonzalo, Elvira Onetto, Demian Salomón, Agustín Rittano. Duración: 88 minutos."
        },
        {
          slug: "el-maleficio-de-la-serpiente",
          title: "El Maleficio de la Serpiente / The Viper´s Hex",
          country: "Japón",
          year: 2017,
          duration: 90,
          director: "Addison Heath, Jasmine Jakupi",
          poster: "/media/archive/X/films/el-maleficio-de-la-serpiente.jpg",
          trailer_url: "https://www.youtube.com/embed/0AY-Ywn_5gI",
          synopsis: "Kiyo, una solitaria y desafortunada prostituta, pasa sus días trabajando en las frías calles de Tokyo, bajo la atenta mirada de su violento proxeneta. Un día, su suerte parece cambiar, cuando conoce a un encantador extranjero llamado Anchin, de quien se enamora perdidamente. Sin embargo, él no está dispuesto a afrontar ningún tipo de compromiso y huye de Tokyo, dejando a Kiyo con el corazón destrozado. En su desesperada búsqueda por tener respuestas, y totalmente devastada, recurre a un espíritu vengativo que había conocido en su infancia y que la guiará para ayudarla a poner las cosas en su lugar.",
          review: "No por casualidad hay algunos planos que remiten al Audition (1999) de Takashi Miike (a quien se le agradece especialmente en los créditos finales); y es que la protagonista de esta película padece la misma obsesión que tenía aquel viudo con la misteriosa mujer que se había presentado para un casting, en el film de Miike. Esta producción japonesa (con trabajadores nipones y australianos, delante y detrás de cámaras) va aumentando su dosis de tensión, sin descuidar el aspecto trágico de la obra ni tampoco regodeándose en la ultraviolencia, la cual se reserva para momentos muy puntuales. «Quisimos hacer una típica película de género, con un claro mensaje feminista.», sostienen los directores. Uno de ellos (Addison Heath) había estado en el guión de Chocolate, Strawberry, Vanilla (2014), Premio del Público en la pasada edición del Montevideo Fantástico.",
          credits: "Dirección: Addison Heath, Jasmine Jakupi. Guión: AH. Con Saya Minami, Yoji Yamada, Kei Miura, Sawa Masaki, Kenji Shimada. Duración: 90 minutos."
        },
        {
          slug: "nathaly-furiosa",
          title: "Nathaly Furiosa (Furieuse)",
          country: "Canadá",
          year: 2015,
          duration: 91,
          director: "Juan José Cea Escobar",
          poster: "/media/archive/X/films/nathaly-furiosa.jpg",
          trailer_url: "https://www.youtube.com/embed/otj5tmB6Rpc",
          synopsis: "Una joven soltera de 26 años (Jeanne Heckmann-Adam) y con escasa vida social, recibe de parte de su querido abuelo un preciado regalo: una flamante bicicleta. Pero en la apacible ciudad de Montreal hay una mafia dedicada al robo de las mismas, y una de sus últimas «adquisiciones» es nada menos que el moderno rodado de la protagonista. Eso produce un quiebre en su vida, intensificado por la muerte de un familiar (testigo del robo), lo que la lleva a una cacería despiadada para dar con el o los autores del hurto. Nace una nueva antiheroína, sin superpoderes ni trucos mágicos; solamente armada con sus encantos… y cuchillo y bate en mano.",
          review: "Toda una revelación dentro del cine canadiense, esta obra del joven Juan José Cea Escobar (radicado en Canadá, cursó estudios de Comunicación Audiovisual en Chile) refleja con cierta ironía el tema de la inmigración y especialmente lo que puede subyacer en una ciudad tan apacible como Montreal, apenas se sacude el avispero. Por la pasarela desfilan los medios de comunicación, las autoridades, y los ciudadanos de una sociedad supuestamente perfecta que se ve trastornada por esta mafia de traficantes de bicicletas, y en especial por una protagonista que increíblemente termina jugando un papel impensado al final de la historia. El propio realizador fue el encargado del notable montaje de la película, que también brilla gracias a su actriz principal y un muy buen trabajo fotográfico. Ganadora de varios premios internacionales.",
          credits: "Guión y Dirección: Juan José Cea Escobar. Con Jeanne Heckmann-Adam, Peter Williamson, Rémy Deloume, José Fuca, Mauro Bordet. Duración: 91 minutos."
        },
        {
          slug: "noche",
          title: "Noche",
          country: "Chile",
          year: 2017,
          duration: 89,
          director: "Inti Carrizo-Ortiz",
          poster: "/media/archive/X/films/noche.jpg",
          trailer_url: "https://www.youtube.com/embed/rX42HcjbIdM",
          synopsis: "Cuando el mundo es sumergido en oscuridad total por un misterioso fenómeno, un estudiante ordinario debe decidir entre mantenerse recto, o entregarse a su propio lado oscuro. El Sol no ha salido en 42 días. La desolación reina en Santiago de Chile. Gabriel (Carlos Talamilla) debe encarar su propia oscuridad para encontrar a Claudia (Dominga Gutiérrez), perdida durante el caos. En su camino sólo se interpone Verdugo (Alejandro Trejo), un ex-colaborador del régimen de Pinochet que oculta un estremecedor secreto.",
          review: "Un sombrío comentario a las infames tragedias naturales e históricas de Chile, capturada en diversos formatos, incluyendo VHS y celulares, filmada casi completamente de noche e iluminada sólo con linternas y velas. Fue co-financiada a través de crowdfunding, una de las primeras experiencias exitosas de este tipo, en Chile. Premiado por Lucasfilm en 2010 y por su corto Renacimiento (inspirado en el universo de George Lucas), el cineasta y escritor trasandino Inti Carrizo-Ortiz aporta la cuota de misterio y ciencia ficción latinoamericana al festival, en un contexto tan caótico como desconcertante y aterrador, y cuyo origen se remonta a la dictadura militar y llega incluso hasta la Segunda Guerra Mundial. Entre tanta frialdad y desesperación, algunos de sus personajes buscan contención, apoyo, refugio en personas de bien, prácticamente una raza en extinción entre tanta mecanización y que a veces las obliga a llevar otra cara. Quizás allí esté uno de los mayores aciertos de la película.",
          credits: "Guión y Dirección: Inti Carrizo-Ortiz. Con Carlos Talamilla, Dominga Guitíerrez, Alejandro Trejo, Carmen Disa, Héctor Noguera. Duración: 89 minutos."
        },
        {
          slug: "los-olvidados",
          title: "Los Olvidados / What the Waters Left Behind",
          country: "Argentina",
          year: 2017,
          duration: 98,
          director: "Luciano Onetti, Nicolás Onetti",
          poster: "/media/archive/X/films/los-olvidados.jpg",
          trailer_url: "https://www.youtube.com/embed/xhV7oOZ94rI",
          synopsis: "Un grupo de jóvenes parte a las ruinas de Epecuén (sudoeste de Buenos Aires) a filmar un documental sobre los fatídicos acontecimientos que borraron del mapa a esa localidad argentina en los años ochenta. Ignorando las advertencias, quedan varados en el pueblo abandonado. Contrariamente a lo que pensaban, comienzan a darse cuenta de que realmente no están solos…",
          review: "Los creadores argentinos de Sonno profondo (2013; premiada en el Montevideo Fantástico 8) y Francesca (2015) regresan con una historia de mayor presupuesto (por más que ellos siguen encargándose de prácticamente todo), cuya plataforma remite a dos clásicos de los años ´70 (El loco de la motosierra y La pandilla abominable) y que los confirma como verdaderos cultores del terror; antes con el giallo, ahora con el slasher. El trasfondo parte de un hecho real (una ciudad que estuvo 30 años bajo el agua y que al retirarse quedó con un paisaje apocalíptico) y con detalles bastante escabrosos que la película aprovecha para introducirlos en un relato que nunca pierde su pulso y que por momentos resulta perturbador. En el reparto aparecen reconocidas figuras como Gustavo Garzón y Mirta Busnelli, entre otras. Seleccionada para Sitges.",
          credits: "Dirección: Luciano Onetti, Nicolás Onetti. Guión: Carlos Goitía, LO, NO. Con Agustín Pardella, Damián Dreizik, Victoria Maurette, Victorio D´Alessandro, Paula Brasca. Duración: 98 minutos."
        },
        {
          slug: "tacuaremboense-inmortal",
          title: "Tacuaremboense Inmortal",
          country: "Uruguay",
          year: 2017,
          duration: 105,
          director: "Fabricio Camargo, Jimena Crujeira",
          poster: "/media/archive/X/films/tacuaremboense-inmortal.jpg",
          trailer_url: "https://www.youtube.com/embed/5QenQb57vUk",
          synopsis: "Una entidad asesina sin piedad a un grupo de personas. Las muertes se vinculan a un personaje conocido como el «Tacuaremboense inmortal». Para detenerlo y evitar su muerte, unos amigos contratan a un visionario que encontrará respuestas en Buenos Aires, donde en vida el espíritu brilló con su arte.",
          review: "El departamento más grande del país también está creciendo en cuanto a producciones se refiere, apuntando directamente y ni más ni menos que a los largometrajes ultraindependientes de género, primero con zombies y ahora con un misterioso asesino sobrenatural, que quizás tenga relación con algún fanático religioso o hasta con algún devoto de Carlos Gardel. Los creadores de Peste en birra y Peste en Tacua plantean aquí una historia bien llevada, con buen ritmo y que apuesta a inquietar, sin caer en excesos ni tampoco descuidando su sentido del humor, que a veces se torna muy sutil. Las limitaciones que puedan achacársele a la película pasan a segundo o tercer plano, por la propia honestidad que demuestran y en especial por las ganas y la pasión con la que trabajan. Y eso alcanza para ponerla a competir. Filmada en Uruguay, Argentina y Estados Unidos.",
          credits: "Dirección: Fabricio Camargo, Jimena Crujeira. Guión: FC. Con Agustina Zilli, Alejandro Teixeira, FC, Pico Márquez, JC. Duración: 105 minutos."
        },
        {
          slug: "tangent-room",
          title: "Tangent Room (Habitación tangencial)",
          country: "Suecia",
          year: 2017,
          duration: 66,
          director: "Björn Engström",
          poster: "/media/archive/X/films/habitacion-tangencial.jpg",
          trailer_url: "https://www.youtube.com/embed/NPlbeuEECYc",
          synopsis: "Atrapados en la sala del título y solamente con una serie de números capaces de ayudarlos, cuatro científicos, armados tan solo con lápiz, papel, tiza y un pizarrón, emprenden una carrera contra el tiempo para prevenir un colapso cósmico.",
          review: "Podría ser perfectamente una historia de la Dimensión Desconocida o algo que pudiera acontecer con los tripulantes de la Enterprise; o sea, un relato salido de la mente de Jerome Bixby. De hecho, esta película, al igual que The Man from Earth (ganadora del Montevideo Fantástico 2008, con guión de Bixby) también se da toda entre cuatro paredes y sin grandes despliegues de efectos especiales. El diálogo, la tensión, el suspenso, lo inesperado; hay una base científica accesible y una sólida narración que también juega con la intriga, en el sentido de no saber si a los personajes les espera lo peor o algo jamás imaginado, en caso que puedan salir de la habitación. «Esta es una historia que imaginé luego de leer un artículo sobre las medidas de la Radiación de Fondo de Microondas (una forma de radiación electromagnética) y las interpretaciones que de la misma se hacían, desde el momento en que se la relacionaba con universos paralelos. Quise que esta película entretuviera mezclando elementos científicos con la más pura imaginación». Si bien el director sueco Björn Engström (también editor, en Tangent Room prácticamente hombre-orquesta) ha hecho pocos cortos y largos (este es el tercero), ha logrado varios premios en festivales.",
          credits: "Guión y Dirección: Björn Engström. Con Lisa Bearpark, Vee Vimolmal, Jennifer Knipe, Håkan Julander, Daniel Epstein. Duración: 66 minutos."
        },
        {
          slug: "la-valija-de-benavidez",
          title: "La valija de Benavidez",
          country: "Argentina / México",
          year: 2016,
          duration: 80,
          director: "Laura Casabé",
          poster: "/media/archive/X/films/la-valija-de-benavidez.jpg",
          trailer_url: "https://www.youtube.com/embed/V_w8unKuQsk",
          synopsis: "Un profesor de pintura (Guillermo Pfening) casado con una artista plástica (Paula Brasca), e hijo de famoso creador, tiene una pelea con su esposa y se marcha en busca de ayuda hacia la lujosa residencia de su psiquiatra (Jorge Marrale), coleccionista de arte, cuyos pacientes son sometidos a un particular tratamiento con el fin de que puedan inspirarse para generar más y mejores obras. El protagonista lleva las suyas en la valija del título, las cuales son vistas por el profesional, quien le aconseja quedarse en su mansión, a pesar de la desconfianza su paciente, casi siempre al límite y estigmatizado por no ser tan buen artista como su padre.",
          review: "El film está basado en un cuento de Samanta Schweblin («La pesada valija de Benavidez»), que integra el libro El núcleo del disturbio, contó con un presupuesto limitado, y también con los consagrados Jorge Marrale y Norma Aleandro, en roles bastante atípicos dentro de sus respectivas carreras, entre la villanía y lo grotesco. Ingenioso thriller psicológico de corte fantástico, con elementos de terror, ciencia ficción y humor negro, a cargo de la argentina Laura Casabé (El hada buena: Una fábula peronista), quien también participó en el guión y el montaje de esta obra, que cuenta con un esmerado diseño de producción, quizás otro de los protagonistas.",
          credits: "Dirección: Laura Casabé. Guión: Lisandro Bera, LC. Con Guillermo Pfening, Jorge Marrale, Norma Aleandro, Paula Brasca, Rodrigo Lico Lorente. Duración: 80 minutos."
        },
        {
          slug: "virgin-cheerleaders-in-chains",
          title: "Virgin Cheerleaders in Chains",
          country: "Estados Unidos",
          year: 2017,
          duration: 94,
          director: "Paulo Biscaia Filho, Gary McClain Gannaway",
          poster: "/media/archive/X/films/virgin-cheerleader.jpg",
          trailer_url: "https://www.youtube.com/embed/qKtce4a_pbU",
          synopsis: "Una pareja de escritores frustrados, cansados de los rechazos de Hollywood, decide hacer su propia película, sin presupuesto… y sin saber nada sobre cómo hacer cine. Para eso compran un manual básico, reclutan a amigos y compañeros, comienzan a recaudar fondos, y se ponen a trabajar. Su gran oportunidad llega cuando conocen a un ícono del terror, quien les ofrece un lugar para filmar: un orfanato abandonado, donde pasarán la noche más larga de sus vidas, y para la mayoría, la última.",
          review: "Del correalizador, el brasilero Paulo Biscaia Filho, pudieron verse tres largos suyos en pasadas ediciones del festival: su ópera prima (que presentó personalmente) Morgue Story (2009), Nevermore (2011), y la ganadora de la edición 2012 del MF, Nervo Craniano Zero. Aquí vuelve con una propuesta mucho más volcada al slasher y al gore que a la comedia de humor negro, y en un claro homenaje a su admirado Herschell Gordon Lewis (fallecido el año pasado) y al cine exploitation, siempre sobre la base de un buen libreto y dirección de actores, como ya nos tiene acostumbrados. Biscaia Filho dirigió la Cinemateca de Curitiba durante casi diez años, ha hecho cómics, teatro y también es docente de cine en la Facultad de Artes de Paraná (Brasil).",
          credits: "Dirección: Paulo Biscaia Filho, Gary McClain Gannaway. Guión: GMCG. Con Ezequiel Z. Swinford, Kelsey Pribilski, Elizabeth Maxwell, Don Daro, Gary Warner Kent. Duración: 94 minutos."
        },
        {
          slug: "zero",
          title: "Zero",
          country: "Alemania / Hungría / República Checa",
          year: 2015,
          duration: 83,
          director: "Gyula Nemes",
          poster: "/media/archive/X/films/zero.jpg",
          trailer_url: "https://www.youtube.com/embed/0BssHi8EbYg",
          synopsis: "2017: un futuro demasiado cercano. El director de una fábrica embotelladora de miel produce miel falsa, pero cuando por accidente prueba miel real su vida cambia por completo, al punto que prende la mecha de una revolución contra el sistema de consumo para salvar a las abejas de cultivos transgénicos, fábricas, depredación de bosques y un largo etcétera. Por si fuera poco a la humanidad le quedan cuatro años de vida, lo que lleva a ecologistas radicales a sumarse a la lucha por la supervivencia.",
          review: "Una visión inconformista de la lucha contra la globalización, también una comedia anarquista de ciencia ficción, según su propio realizador, que juega con la estética del cine mudo y, de una manera muy ingeniosa, con el cine dentro del cine, desafiando al propio espectador. En Europa es donde se está revitalizando este género, y con lo poco que han hecho los húngaros (visto y premiado en anteriores ediciones del festival), alcanza para situarlos en un lugar de privilegio. Filmada en Hungría y Burkina Faso. El director (húngaro) Gyula Nemes se graduó en la Escuela de Cine y Televisión de la Academia de Artes Escénicas en Praga, habiendo tenido como profesora a Vêra Chytilová.",
          credits: "Dirección: Gyula Nemes. Guión: Tamás Beregi, GN. Con Udo Kier, Kristian Howard, Martina Krakta, Orsolya Tóth, Mohammed Maiga. Duración: 83 minutos."
        }
      ]
    },

    {
      name: "Novedades",
      type: "features",
      films: [
        {
          slug: "culto-al-terror",
          title: "Culto al terror",
          country: "Argentina / España / Nueva Zelanda",
          year: 2017,
          duration: 114,
          director: "Gustavo Leonel Mendoza",
          poster: "/media/archive/X/films/culto-al-terror.jpg",
          trailer_url: "https://www.youtube.com/embed/maLNRifLpWQ",
          synopsis: "Un documental que homenajea al género de terror. Un viaje nostálgico y adrenalínico con espíritu de rock, al universo de la cinefilia. La pasión del fantástico contada por sus especialistas, fans y estrellas mundiales. Toda una comunidad espiritual internacional hermanada bajo la catártica sombra del horror. Filmado en Argentina, Brasil, España (Barcelona, Madrid, Sitges, Valencia), Francia, Inglaterra, Italia, México y Nueva Zelanda.",
          review: "Un nuevo trabajo del argentino Gustavo Mendoza (Nadie inquieto más: Narciso Ibáñez Menta, 2005), viejo conocido y asiduo visitante del festival, de quien también pudieron verse varios de sus cortos, más inclinados hacia su fanatismo por el cine bizarro. En esta oportunidad logra recoger y compaginar una gran cantidad de testimonios por algunos de los festivales de género más importantes del mundo, mezclando material de archivo con entrevistas, imágenes y fragmentos de innumerables películas, para redondear una ágil labor, casi periodística, que hará el deleite tanto de los aficionados al terror como seguramente de aquellos que no lo son tanto. Con la participación de coleccionistas (- ¿Y qué tenés de terror acá? – Hasta que no revisé, no tengo idea), autores como Peter Bogdanovich (que afirma tajantemente que no le gusta el terror, dando un motivo que da para reflexionar), además de otros reconocidos artistas como Bárbara Crampton, Bruce Campbell, Darío Argento, José Mojica Marins, Kane Hooder, Luigi Cozzi, Lloyd Kaufman, Mick Garris, Narciso Ibáñez Serrador, Rick Baker, Robert Englund, Ruggero Deodato, Takashi Miike y Tom Savini, entre tantos otros.",
          credits: "Guión y Dirección: Gustavo Leonel Mendoza. Duración: 114 minutos."
        },
        {
          slug: "en-realidad",
          title: "En Realidad",
          country: "Bolivia",
          year: 2016,
          duration: 142,
          director: "Paul Gabriel-Hollweg",
          poster: "/media/archive/X/films/en-realidad.jpg",
          trailer_url: "https://www.youtube.com/embed/XEExy9S8MT8",
          synopsis: "Beto Guitar es un músico brasileño de San Pablo invitado a viajar a Bolivia por un misterioso amigo virtual, con el fin de inspirarse y terminar su libro titulado «En realidad». Pero al momento de llegar a la ciudad boliviana de Santa Cruz de la Sierra, comenzará a lidiar con la personalidad inusual de su amigo anfitrión. Esta actitud le ofrecerá a Beto la oportunidad de pasar por su propia, única historia…",
          review: "Toda una curiosidad y al mismo tiempo un descubrimiento este trabajo dirigido por el alemán Paul Gabriel-Hollweg (criado en Bolivia; estudió cine, televisión y animación 3D en Estados Unidos y Canadá; ha escrito cuentos de ciencia ficción). Filmada casi enteramente en Santa Cruz de la Sierra y con participación del ícono del terror brasilero, José Mojica Marins, el tono experimental que por momentos presenta es consecuencia del diario vivir, «de esas acciones imprevistas que todos vivimos». Una arriesgada propuesta de intriga, suspenso y situaciones tan cómicas como delirantes («me atreví a realizar la cinta sin tener nada seguro; sólo la convicción de hacer lo que me gusta: cine») que sin embargo va construyendo un trasfondo social donde no faltan talentosos artistas de la música boliviana para ilustrarlo.",
          credits: "Guión y Dirección: Paul Gabriel-Hollweg. Con Reinaldo Lobo, Janaina Prates, Ruben Darío Ardaya, Fernando Peña Suárez, José Mojica Marins. Duración: 142 minutos."
        },
        {
          slug: "escaping-the-dead",
          title: "Escaping the Dead",
          country: "Dinamarca",
          year: 2017,
          duration: 75,
          director: "Bastian A. B. Pedersen, Martin Sonntag",
          poster: "/media/archive/X/films/escaping-the-dead.jpg",
          trailer_url: "https://www.youtube.com/embed/qbzsECTbb3U",
          synopsis: "Inspirada en el incidente de la droga «Krokodil» (la que carcome la piel), que tuvo lugar años atrás en Florida (Estados Unidos), la película sigue la vida de David, un joven vendedor de marihuana que fuma más de lo que vende. Eso lo lleva a tener algunos problemas económicos que luego se trasladan a grandes traficantes, poniendo su vida en peligro. Pero Dinamarca acaba de ser golpeada por una nueva droga mortal, con un terrible efecto secundario, que termina creando un brote zombie gigante que se extiende por toda Copenhague. David deberá dejar sus problemas de lado y tratar de sobrevivir a como dé lugar.",
          review: "El contexto se acerca mucho más al patio trasero danés que a lo que solemos ver en programas que fomentan el turismo en países del Primer Mundo. Hecha con dos pesos y a lo largo de cinco años, esta invasión zombie, con momentos sutilmente graciosos y efectos de maquillaje para todos los gustos, se gesta en un ambiente de jóvenes desocupados, sin rumbo alguno, inmigrantes al margen del sistema, y algo de racismo. El protagonista queda prácticamente solo contra todos, aunque eso tampoco parece importarle tanto. Lo que habría que preguntarse es si el escape del título original es de la horda zombie o también de una sociedad mucho más hermética y compleja de lo que aparenta.",
          credits: "Guión y Dirección: Bastian A. B. Pedersen, Martin Sonntag. Con Bastian Brinch Pedersen, Kim Sønderholm, Rama Øzel, Heine Sørensen, Lone Fleming. Duración: 75 minutos."
        },
        {
          slug: "fantasticozzi",
          title: "Fantasticozzi",
          country: "Brasil",
          year: 2016,
          duration: 70,
          director: "Felipe M. Guerra",
          poster: "/media/archive/X/films/fantasticozzi.jpg",
          trailer_url: "https://www.youtube.com/embed/P43dowfdaqU",
          synopsis: "El italiano Luigi Cozzi dedicó su vida a la fantasía. Durante décadas ha perseguido el sueño de hacer una película de ciencia ficción en su país, en una época en que el género era catalogado como algo para locos. Ésta es su increíble y divertida historia, narrada a través de sus cintas.",
          review: "Muy buen documental de Felipe Guerra (otro cineasta under) sobre alguien al que injustamente llegaron a denominar el «Ed Wood italiano», más si nos ponemos a pensar que trabajó junto a Darío Argento (como guionista, en Cuatro moscas sobre terciopelo gris, 1971), que en su momento fue el director cuya película más dinero le reportó a Roger Corman en Estados Unidos (con Infierno en el cosmos, 1978), y que incluso debutó profesionalmente detrás de cámaras con el giallo El inmoral (1975), protagonizado por el uruguayo George Hilton. La pasión de Ed Wood sí es la misma de Cozzi, pero también es la misma del director brasilero Guerra, y de todo verdadero aficionado al cine de ciencia ficción clase B, que aquí tiene una cita imprescindible con este director de bajísimo perfil (que acaba de cumplir 70 años) y un todoterreno sumamente capaz que el cine no debería olvidar. Por el material de archivo desfilan figuras como Caroline Munro, Lou Ferrigno, David Hasselhoff (cuando todavía no era famoso), Sybil Danning, Ian McCulloch y Klaus Kinski, entre tantos otros.",
          credits: "Guión y Dirección: Felipe M. Guerra. Duración: 70 minutos."
        },
        {
          slug: "the-know",
          title: "The Know",
          country: "Estados Unidos",
          year: 2017,
          duration: 72,
          director: "Adam Galassi, Boomer Galassi",
          poster: "/media/archive/X/films/the-know.png",
          trailer_url: "https://www.youtube.com/embed/cv2env3mW4M",
          synopsis: "Un empleado de limpieza, comedor compulsivo, trata de mantener su espíritu intacto, en un mundo donde todos los medios de comunicación están en manos de una sola compañía, en cuya agenda figura como principal objetivo el control mental de todos sus televidentes, radioescuchas y lectores.",
          review: "Know es el nombre de esta mega empresa, y el solitario protagonista uno de los pocos rebeldes en su ciudad. Como en su ópera prima, Trovadores (2008), el director Thomas Galassi (junto con su hermano han hecho videos para numerosas bandas por todo Estados Unidos) pone en la mira a un luchador del día a día, esta vez hastiado de la monotonía, del dominio mediático, y también de la propia sociedad «zombieficada», rescatando apenas unos pocos amigos para charlar y reunirse a comer. Hay algo de los Cuerpos invadidos (1983) de David Cronenberg en este largo bastante experimental, hecho con apenas 2.000 dólares, actores no profesionales, y en las horas que tenían libres (antes y después del trabajo) casi todos los que participaron en la película.",
          credits: "Guión y Dirección: Adam Galassi, Boomer Galassi. Con Scott Bishop, Brian Thomson, Brett Presson, Callum Grant, John Sefick. Duración: 72 minutos."
        },
        {
          slug: "the-theta-girl",
          title: "The Theta Girl",
          country: "Estados Unidos",
          year: 2017,
          duration: 98,
          director: "Christopher Bickel",
          poster: "/media/archive/X/films/the-thetha-girl.jpg",
          trailer_url: "https://www.youtube.com/embed/w-My7mJg1M4",
          synopsis: "La película sigue a Gayce, una joven traficante, y en especial lo que ocurre con el resurgimiento de una vieja «droga divertida» llamada «Theta», que se caracteriza por «hacer volar la mente de los que la consumen». Se suponía que era una puerta al Cielo, pero cuando sus mejores amigas son asesinadas metódicamente, Gayce se da cuenta de que «Theta» también podría ser una puerta al Infierno, y a ella le toca cerrarla.",
          review: "Producida en Carolina del Sur a través de crowfunding, a esta ópera prima de Christopher Bickel no le falta casi nada; lo que parecía una delirante comedia con sexo, drogas y (punk) rock´n roll pega un giro radical, pasando a ser un drama existencial, de venganza, gore y ultraviolencia que, según su realizador, trabaja «en varios niveles filosóficos». Y es que este homenaje al cine de bajo presupuesto que va construyendo el director Bickel (47 años, columnista de Maximum Rocknroll, gran aficionado al terror y exploitation de los ´70 y ´80) no pretende emular sino crear una historia original a partir de todo lo que vio, trayéndola al mundo actual. El mismo realizador (casi un hombre orquesta) se declaró un novato absoluto que iba aprendiendo mientras filmaba (con apenas tres luces) y editaba. Entretenida, por momentos inspiradísima, y sumamente provocadora de principio a fin.",
          credits: "Dirección: Christopher Bickel. Guión: David Axe. Con Victoria Elizabeth Donofrio, Shane Silman, Darelle D. Love, Quinn Deogracias, Shawn Dell Corley. Duración: 98 minutos."
        },
        {
          slug: "the-wake",
          title: "The Wake / El Velorio",
          country: "Reino Unido",
          year: 2017,
          duration: 62,
          director: "Gustavo Arteaga",
          poster: "/media/archive/X/films/the-wake.png",
          trailer_url: null,
          synopsis: "El mundo de Tina se está desmoronando. Las respuestas están en otro lado. En un intento por restaurar el orden, se embarca en un viaje en el que pasado y presente chocan. Su situación pronto se complica con las personas que encuentra, cuestionando su regreso.",
          review: "Toda una curiosidad dentro del festival este largo que mezcla animación stop-motion con acción real. Una historia tragicómica, sumamente creativa, que explora los límites de la convención narrativa y cuyo principal leitmotiv puede que radique en una frase que un personaje señala: «la muerte quita, pero también nos une». Muy buena banda sonora. El director Arteaga es un experimentado (y premiado) animador mexicano que desde hace tiempo reside y trabaja en Gales.",
          credits: "Guión y Dirección: Gustavo Arteaga. Con Carrie Cohen, Miriam Balderas, Rebecca Scott, Sergio Negrete, André Krassoievitch. Duración: 62 minutos."
        }
      ]
    },

    {
      name: "Muestra Informativa de Largometrajes",
      type: "features",
      films: [
        {
          slug: "animal-moribus",
          title: "Animal Moribus",
          country: "Argentina",
          year: 2017,
          duration: 68,
          director: "Octavio Revol",
          poster: "/media/archive/X/films/animal-morbius.jpg",
          trailer_url: null,
          synopsis: "Una pareja de amigos y unos punks pasean por una ruta desconocida, sin saber que una criatura humanoide y espantosa los acecha.",
          review: "Desde Córdoba, Argentina, llega esta comedia terrorífica, con varios guiños a clásicos del género, un buen trabajo de efectos especiales, diálogos muy graciosos, y situaciones algo extravagantes para lo que es un apacible pueblo que viene de perder toda la alegría y termina convirtiéndose en algo completamente misterioso. Al temible pero lento monstruo del título nadie lo puede ver, porque de lo contrario queda marcado para morir, no importa a qué distancia esté la víctima ni lo rápido que pueda llegar a correr.",
          credits: "Guión y Dirección: Octavio Revol. Con Santiago Zapata, Camila Murias, Gastón Palermo, Gonzalo Tolosa, Renzo Fabbiani. Duración: 68 minutos."
        },
        {
          slug: "astaroth",
          title: "Astaroth",
          country: "Brasil",
          year: 2017,
          duration: 75,
          director: "Larissa Anzoategui",
          poster: "/media/archive/X/films/astaroth.png",
          trailer_url: "https://www.youtube.com/embed/yD4-KQj_RUY",
          synopsis: "Envuelta en la bruma del tiempo, ha sido olvidada… Pero siempre hay alguien que la recuerda. Gregório es un tatuador obsesionado con Astaroth (Monica Mattos), una entidad demoníaca que acecha en las sombras con promesas de deseo y placer. Con el arte del tatuaje y su conocimiento arcano, intenta rescatarla de las brumas del olvido y llevarla al mundo de la carne. Y dos jóvenes mujeres están involucradas en sus planes: la artista del tatuaje, Dri, y la dulce guitarrista Lia (también interpretada por Mónica Mattos). Una amiga de ellos, Mai, es la joven que usará su entrenamiento en artes marciales para tratar de defenderlas y combatir los diseños del infierno.",
          review: "El horror metal fue el tópico de esta ópera prima de la brasilera Larissa Anzoategui y con actuación de la famosa estrella de películas condicionadas (retirada hace años) Mónica Mattos. Un film modesto y que lleva el espíritu del cine de bajo presupuesto de los ´80 (por no decir el cine hecho directo para video de esa época), mezclando heavy metal, terror y diversión. La directora Anzoategui había hecho un corto (Red Hookers, 2013), con parte de este equipo y vagamente inspirado en El horror de Red Hook, de Lovecraft, escritor de quien la realizadora es admiradora.",
          credits: "Dirección: Larissa Anzoategui. Guión: Ramiro Giroldo. Con Mónica Mattos, Ju Calaf, Jacqueline Takara, Janderson Tucunduva, Rodrigo Poli. Duración: 75 minutos."
        },
        {
          slug: "atmo-horrox",
          title: "Atmo Horrox",
          country: "Canadá",
          year: 2016,
          duration: 102,
          director: "Pat Trembley",
          poster: "/media/archive/X/films/atmo-horrox.jpg",
          trailer_url: "https://www.youtube.com/embed/hHSDcFHGj1k",
          synopsis: "A través de una persecución muy surrealista de espionaje, Catafuse, una «criatura» dudosamente vestida, caza objetivos humanos específicos con la ayuda de Molosstrap. Pero en un mundo completamente controlado por las sombrías manos de la industria farmacéutica, las líneas de la realidad se vuelven tan borrosas y complejas, que el dominio de la locura podría ser la única salida…",
          review: "Entre el horror psicodélico y, sobre todo, la sátira experimental, esta propuesta megabizarra del canadiense Pat Trembley (aquí también productor, guionista, editor, diseñador, entre otras tareas) desafía el raciocinio del espectador. Alguien la definió como si el cine de Sam Raimi se cruzara con el de David Lynch. Y nosotros agregaríamos «con algo del terror italiano del ´70 y los ´80». Difícil que deje indiferente a alguien. Premiada en Estados Unidos.",
          credits: "Guión y Dirección: Pat Trembley. Con Roch Desrosiers, Syl Disjonk, Claude Dubé, Pawel Krol, Laurent Lecompte. Duración: 102 minutos."
        },
        {
          slug: "the-child-remains",
          title: "The Child Remains",
          country: "Canadá",
          year: 2017,
          duration: 112,
          director: "Michael Melski",
          poster: "/media/archive/X/films/the-child-remains.jpg",
          trailer_url: "https://www.youtube.com/embed/cqtjq51pLzw",
          synopsis: "El fin de semana íntimo y apacible que una pareja, a punto de tener familia, se dispone a pasar en una apartada posada rural, pasa a ser todo lo contrario cuando descubren que el lugar está embrujado. Allí funcionaba una casa de maternidad donde habían sido asesinadas varias mujeres que habían ido a abortar.",
          review: "Inspirada en la historia real del infame caso de los «Butterbox Babies», el director canadiense Michael Melski (en su primer trabajo del género de terror; también un reconocido dramaturgo en su país de origen) trata de enfatizar la historia y el suspenso, por encima del shock y la sangre, en este thriller sobrenatural que se toma su tiempo para explorar los costados más oscuros de la psique humana. Premiada en Estados Unidos y Canadá.",
          credits: "Guión y Dirección: Michael Melski. Con Suzanne Clément, Allan Hawco, Shelley Thompson, Géza Kovács, Lee J. Campbell. Duración: 112 minutos."
        },
        {
          slug: "la-lista-de-la-muerte",
          title: "La Lista de la Muerte",
          country: "Uruguay",
          year: 2016,
          duration: 100,
          director: "Miguel Torena",
          poster: "/media/archive/X/films/la-lista-de-la-muerte.jpg",
          trailer_url: "https://www.youtube.com/embed/wZgrcSqd5LI",
          synopsis: "Diego Savero, un humilde profesor de informática se verá envuelto en una frenética carrera contra el tiempo. Su sobrina ha sido secuestrada por alguien a quien no conoce, y para salvarla deberá encontrar un libro que contiene importantes secretos. Tiene tan solo una hora de plazo. Y todos van convirtiéndose en sospechosos.",
          review: "El joven realizador ultraindependiente Miguel Torena ya había presentado algunos trabajos en el festival, y éste sin dudas es el mejor. El docente protagonista se transforma en detective, mientras comienza a investigar un caso que lo tiene cada vez más desconcertado, y casi en un héroe de acción al recibir permanentes llamadas de un intrigante asesino, que lo lleva de un lado a otro de la ciudad. Montevideo se sacude con persecuciones y explosiones en lugares emblemáticos, mientras su realizador (aquí también guionista y hasta doble de actores) aporta sus buenos toques de suspenso y terror, con muchísimo ingenio de por medio. Sin dudas que a Torena le gusta bastante el cine de género norteamericano. La película llevó cuatro años en ser filmada.",
          credits: "Guión y Dirección: Miguel Torena. Con Diego Gutiérrez, Maximiliano Paglietti, Ana Laura Pereira, Carla Aguilera, Agustin Pesce. Duración: 100 minutos."
        },
        {
          slug: "la-maquina-del-diablo",
          title: "La Máquina del Diablo",
          country: "México",
          year: 2017,
          duration: 80,
          director: "Edin Alain Martínez Aguirre",
          poster: "/media/archive/X/films/la-maquina-del-diablo.jpg",
          trailer_url: null,
          synopsis: "Karina perdió su memoria y es la única sobreviviente de una serie de asesinatos. Para recuperarla comienza una investigación que la llevará a descubrir el misterioso objeto del título, nada menos que una máquina que permite viajar a través de otras dimensiones.",
          review: "Hecha con apenas 900 dólares, esta modesta película azteca se las ingenia para armar una historia de herméticas y tenebrosas atmósferas, en un apacible contexto, donde la desmemoriada protagonista (Jitzel Galicia, en una muy buena labor) termina siendo partícipe de algo que es mucho más grande y peligroso de lo que ella piensa. Al mismo tiempo, la película también va creciendo en su enigmática (y sangrienta) propuesta, sin descuidar la estética en su filmación. Aludir aquí a referencias de otras películas quizás implique revelar la parte más importante de la trama.",
          credits: "Dirección: Edin Alain Martínez Aguirre. Guión: Mónica Luján Chávez, Mónica Garibaldi Toledo, EAMA. Con Jitzel Galicia, Ernesto Salinas Martínez, Julia Robles, Fuensanta Valdéz, Rigoberto G. Veloz. Duración: 80 minutos."
        },
        {
          slug: "presagio",
          title: "Presagio",
          country: "Argentina",
          year: 2015,
          duration: 89,
          director: "Matías Salinas",
          poster: "/media/archive/X/films/presagio.jpg",
          trailer_url: "https://www.youtube.com/embed/1LeGcFYGDT8",
          synopsis: "Un joven escritor traumado por la muerte de su esposa y su hijo, describe sus perturbadoras experiencias a un psiquiatra. Al mismo tiempo, un hombre misterioso, que se esconde bajo un paraguas, lo obliga a terminar su penoso trabajo autobiográfico, sin importar el costo de sus consecuencias.",
          review: "Thriller psicológico con tintes terroríficos y con un particular enfoque de cine experimental y de autor, a cargo del argentino Matías Salinas, aquí en su ópera prima, que va metiendo de lleno al espectador en un viaje de exploración mental del protagonista, desde el momento en que su profesional le va haciendo preguntas sobre qué fue lo que realmente pasó en ese trágico accidente donde perdió a toda su familia. Entre la realidad y la ficción, la película va y viene en el tiempo, acompañada por un cuadro de pesadillas y recuerdos muy bien retratado por su guionista y realizador, perspectivas que contribuyen a reforzar sensaciones de intriga y desconcierto, de atmósferas asfixiantes y visualmente llamativas para esta modesta e interesante obra que llevó cinco años desde su gestación. El film fue rodado en dos formatos diferentes, para marcar un contraste visual entre el presente y los desequilibrados recuerdos del personaje principal.",
          credits: "Guión y Dirección: Matías Salinas. Con Javier Solis, Carlos Piñeiro, Valeria Salinas, Manuel Razzari, Julián Landerreche. Duración: 89 minutos."
        },
        {
          slug: "el-silbon-origenes",
          title: "El Silbón: Orígenes",
          country: "México / Venezuela",
          year: 2017,
          duration: 78,
          director: "Gisberg Bermúdez Molero",
          poster: "/media/archive/X/films/el-silbon.jpg",
          trailer_url: "https://www.youtube.com/embed/5njh9l91920",
          synopsis: "A mediados del siglo XIX, en un pequeño pueblo latinoamericano, el padre Giovanni y un escribano narran el relato de un caso sobrenatural que han atestiguado, la historia de un misterioso espectro, que la gente del pueblo llama «El Silbón».",
          review: "Filmada enteramente en Venezuela, el director oriundo de dicho país (creció en Estados Unidos, trabajó en México) le apunta a la famosa leyenda urbana del título, un espectro maldito que deambula por la llanura venezolana desde tiempos muy antiguos y cuyo silbido es sinónimo de muerte y desgracia, especialmente para los pecadores. ¿Pero hasta dónde estarían a salvo los inocentes? Bermúdez logra buenas escenas de suspenso y terror, en un trabajo con esmerada fotografía y que tampoco descuida la psicología de algunos personajes respecto a terribles secretos familiares.",
          credits: "Dirección: Gisberg Bermúdez Molero. Guión: GBM, Gisyerg Bermúdez, Irina Dendiouk. Duración: 78 minutos."
        }
      ]
    },

    {
      name: "Competencia Oficial de Cortometrajes",
      type: "shorts",
      films: [
        { title: "237NP", director: "Óscar Brais Revaldería, Ricardo Pérez", country: "España / Estados Unidos", duration: 12, synopsis: "Un hombre alienado entra en contacto con un extraterrestre que llega a la Tierra en busca de recursos naturales para su planeta. Maxx desafiará a las autoridades locales, para ayudar a «Bicho» a regresar a su planeta. Premiado en Croacia y Estados Unidos.", credits: "Dirección: Óscar Brais Revaldería, Ricardo Pérez. Guión: RP. Con Patrick Cooley, Jeff Solomon, Alan Thurston." },
        { title: "A la hora marcada", director: "J. Luis Rivera", country: "México", duration: 16, synopsis: "Don Lázaro es un viejo pistolero que ha dejado atrás su violento pasado para dedicarse a cuidar a su pequeña nieta, enferma terminal. Pero Lázaro será visitado por un amigo muy formal que le hará un desafío, una propuesta que quizás le dé a la niña la oportunidad de seguir viviendo.", credits: "Guión y Dirección: J. Luis Rivera. Con Javier Zaragoza, Jorge De Los Reyes, Sofía Saráchaga." },
        { title: "Akado", director: "Kim Belov", country: "Rusia", duration: 7, synopsis: "Un instalador de televisión para abonados encuentra en la casa de uno de sus clientes su destino final.", credits: "Guión y Dirección: Kim Belov. Con Euguney Tsyganov, Pavel Tabakov, Elena Nikolaeva." },
        { title: "Apropiación indebida", director: "Ana María Ferri", country: "España", duration: 9, synopsis: "Coco es el perro de Sergio, también su inseparable amigo desde que Carla lo dejó. Un día Coco lo lleva a «Láquesis», la tienda favorita de Carla, que parece emitir una magia muy poderosa. Premiada en España e Italia.", credits: "Guión y Dirección: Ana María Ferri. Con Alejandro Garrido, Sergio Pardo, Mon Ramos." },
        { title: "Bye Bye Baby", director: "Pablo S. Pastor", country: "España", duration: 15, synopsis: "Una joven se dispone a pasar una noche tranquila en casa con la única compañía de una película. Tras la llamada de una amiga, todo parece ir mal.", credits: "Dirección: Pablo S. Pastor. Guión: Javier Parra, PSP. Con Karina Kolokolchykova, Pilar Pintre, Lucía Martínez." },
        { title: "Cartas ciegas", director: "Ángel Jaquem", country: "España", duration: 15, synopsis: "El seno de una familia se rompe al partir el padre a la Segunda Guerra Mundial.", credits: "Guión y Dirección: Ángel Jaquem. Con Adelfa Calvo, Noa Sánchez, Cristóbal Araque." },
        { title: "Casulos: Cocoons of Outer Space", director: "Joel Caetano", country: "Brasil", duration: 13, synopsis: "Ella sólo quería relajarse, pero algo desde muy lejos destruyó sus planes.", credits: "Guión y Dirección: Joel Caetano. Con Mariana Zani, JC." },
        { title: "El círculo del Escorpión Rojo", director: "Emiliano Montes De Oca", country: "Uruguay", duration: 17, synopsis: "Una pareja excéntrica. Papi y Bebé, atrapan a dos de los tres ladrones que le robaron su escorpión. Lo que ellos no saben es que el ladrón que sigue suelto busca venganza por un acontecimiento pasado.", credits: "Guión y Dirección: Emiliano Montes De Oca. Con Gustavo Suárez, Diana Bresque, Mitsuko Kurioka." },
        { title: "End of the Dead", director: "Mathias Clatot, Florian Duviella", country: "Francia", duration: 10, synopsis: "El apocalipsis de los muertos vivos está terminando lentamente. Para las personas que no saben nada más que sobrevivir combatiéndolos, es bastante difícil pensar en aprender nuevos trabajos.", credits: "Dirección: Mathias Clatot, Florian Duviella. Guión: MT, sobre idea original de MT y FD. Con FD, Thierry Le Chevanton, Germinal Lancelin." },
        { title: "¿Estás ahí?", director: "Inge Vela", country: "España", duration: 15, synopsis: "Julia es una chica que vive sola en una casa heredada de su familia. Está convencida que algo o alguien está en la vivienda con ella. Una noche decide quedarse despierta para intentar descubrirlo, aunque esta decisión ponga en riesgo su vida.", credits: "Guión y Dirección: Inge Vela. Con Paula Mata." },
        { title: "Hay algo en la oscuridad", director: "Fran Casanova", country: "España", duration: 14, synopsis: "Verónica, una niña de 6 años, trata de superar su miedo a la oscuridad. Como todas las noches, su madre logra dormirla con la lectura de su cuento favorito. Pero esta vez hay algo diferente… esta vez hay algo en la oscuridad.", credits: "Guión y Dirección: Fran Casanova. Con Luna Fulgencio, Mariam Torres, Jonai Rodríguez." },
        { title: "iMedium", director: "Alfonso García", country: "España", duration: 6, synopsis: "Luz perdió toda esperanza de encontrar a su hija con vida. Pero repentinamente decide suscribirse a una aplicación que conecta a los usuarios con gente ya fallecida.", credits: "Dirección: Alfonso García. Guión: Vincent Blonde. Con José Bermúdez, Jesús Calvo." },
        { title: "I See You Everywhere", director: "Rubén Méndez", country: "España", duration: 4, synopsis: "Un hombre con una obsesión…", credits: "Guión y Dirección: Rubén Méndez. Con Oscar Doviso, Beatriz Cid." },
        { title: "Instrucciones para Juan Díaz", director: "Fabio Vallarelli", country: "Argentina", duration: 17, synopsis: "Juan es un escritor imposibilitado de terminar un libro por el cual le han pagado por adelantado. Sale a correr por las noches para despejar su mente, tratando de combatir el estrés y el insomnio. Una noche se le aparece una exótica mujer, ofreciéndole ayuda.", credits: "Guión y Dirección: Fabio Vallarelli. Con Pablo Chao, Clara Kovacic, Gabriel Galíndez." },
        { title: "Juliet", director: "Marc-Henri Boulier", country: "Francia", duration: 11, synopsis: "En un futuro cercano, la compañía SEED lanza JULIET1, la primera generación de ser humanos sintéticos destinada a dar placer. Pero a medida que la tecnología evoluciona y nuevos estilos vienen y van, se hace más difícil para la humanidad encontrar su sitio. Premiada en Argentina, Estados Unidos, Italia, México y Rumania.", credits: "Dirección: Marc-Henri Boulier. Guión: MHB, Michaël Fagnot. Con Bruno Putzulu, Alix Benezech, Corentin Macquet." },
        { title: "Last Breath", director: "Olivier Beguin", country: "Suiza", duration: 5, synopsis: "Un cortometraje experimental medieval.", credits: "Guión y Dirección: Olivier Beguin. Con Yannick Merlin, Jasna Kohoutova." },
        { title: "Leviticus 24:20", director: "Freddy Chávez Olmos, Shervin Shoghian", country: "Canadá / México", duration: 5, synopsis: "Cassandra Noriega, periodista en televisión, expone la verdad detrás de un programa gubernamental de drones terrestres conocido como la «Iniciativa Leviticus 24:20». Una estrategia implementada conjuntamente por el gobierno de México y los Estados Unidos que erradica la violencia con violencia (ojo por ojo, como lo cita el pasaje de la Biblia), para combatir el tráfico de drogas, control en la frontera y crimen organizado en México.", credits: "Guión y Dirección: Freddy Chávez Olmos, Shervin Shoghian. Guión: FCO, Mike Stasyna. Con Cassandra Noriega, Liyana Shannon, Shannon St. Ambrose." },
        { title: "Lucifera", director: "Demian García", country: "Uruguay", duration: 15, synopsis: "Lucía trabaja como limpiadora en la Escuela de Bellas Artes, vive sola con su abuela, y tiene una gran afición por la música metal. Ella buscará maneras de combatir su soledad, y también respuestas desde otros lugares.", credits: "Guión y Dirección: Demian García. Con Clara Perez, León Faig, Elsa Chichita Besnati." },
        { title: "Marguerite", director: "Alexis Nerét", country: "Francia", duration: 13, synopsis: "Sentado cómodamente en su sillón, Jean, un soñador de 50 años de edad, fuma su pipa frente al fuego de una chimenea, cuando de repente se le aparece el fantasma de una mujer que no conoce.", credits: "Guión y Dirección: Alexis Nerét. Con Emilie Duchênoy, Jean Burucoa, Laure Berend-Sagols." },
        { title: "Memorias del agua", director: "Anaís Medina, Tony Navarro", country: "España", duration: 9, synopsis: "Drama sobre el racismo con toques de suspense psicológico de terror. Carla y Helena sueñan con ser nadadoras olímpicas pero a causa del odio entre sus familias se ven forzadas a entrenar cuando la piscina está cerrada. Premiada en Rumania.", credits: "Guión y Dirección: Anaís Medina, Tony Navarro. Con Raquel Alcalá, Tamara Ndong." },
        { title: "Monstruo", director: "Santiago Fabrizio", country: "Argentina", duration: 9, synopsis: "En una noche tenebrosa, Martín, de 10 años, se aventura en su jardín buscando su muñeco favorito. Enfrentándose a sus miedos y con la ayuda de su linterna derrota a un monstruo que lo acecha, y logra su cometido.", credits: "Guión y Dirección: Santiago Fabrizio. Con Leandro Tugues, Sebastián Alejandro Italiano, Pilar Juaristi." },
        { title: "Parallelism", director: "Carlos Cobos Aroca", country: "España", duration: 11, synopsis: "Apasionados por la investigación paranormal, dos amigos se adentran en un gran hotel rodeado por un bosque, donde las sombras les conducirán a su verdadero destino.", credits: "Guión y Dirección: Carlos Cobos Aroca. Con Víctor Rebull, Ricard Balada, Leda Douglas." },
        { title: "La peste", director: "Guillermo Carbonell", country: "Uruguay", duration: 10, synopsis: "El padre de Rosa vuelve a su casa. Esconde un secreto, y no viene solo. Premio a Mejor Corto Nacional en Piriápolis de Película.", credits: "Guión y Dirección: Guillermo Carbonell. Con Gabriela Freire, Walter Rey y Rafael Soliwoda." },
        { title: "Polterheist: Atraco paranormal", director: "David Gilbank", country: "Reino Unido", duration: 18, synopsis: "Dos ladrones de poca monta secuestran a una medium y la obligan a contactar con el jefe de su banda, al que ellos mismos asesinaron. La pareja está desesperada por descubrir dónde enterró el botín su jefe recién muerto, pero lo único que consiguen es liberar a un demonio ávido de venganza.", credits: "Dirección: David Gilbank. Guión: DG, Paul Renhard. Con Kathryn Hanke, Jamie Smelt, Sid Akbar Ali." },
        { title: "Red Line / Línea roja", director: "Santiago Ventura", country: "Uruguay", duration: 3, synopsis: "Un astronauta corre a través de la superficie casi desierta de un planeta aparentemente sin explotar. En el camino, mientras observa el territorio y registra algunos detalles, se cruza con ciertas indicaciones de que tal vez existía algo en ese lugar hace tiempo. La pregunta es qué sucedió y cuándo.", credits: "Dirección: Santiago Ventura. Guión: Gonzalo Palermo. Con SV." },
        { title: "Ringo Rocket Star and His Song for Yuri Gagarin", director: "René Nuijens", country: "Holanda / Serbia", duration: 10, synopsis: "Tragicomedia sobre un gitano que piensa que puede ser famoso escribiendo una canción para el primer hombre en el espacio, Yuri Gagarín. Premiada en Australia, Chipre, España, Estados Unidos, Kazajistán y Reino Unido.", credits: "Dirección: René Nuijens. Guión: Steve Korver, RN. Con Nesim Hrvanovic, Ana Radosavljevic, Mirveta Stanojlovic." },
        { title: "Sol", director: "Carlos Gananian", country: "Brasil", duration: 14, synopsis: "Esa voz en su mente. No se irá así nomás…", credits: "Guión y Dirección: Carlos Gananian. Con Thaia Pérez, Plinio Soares, Lui Seixas." },
        { title: "Sons of Bitches", director: "Arnaud Baur", country: "Suiza", duration: 20, synopsis: "Sally es una prostituta, en una pequeña ciudad en Wisconsin. Como ya no puede soportar los abusos y temores por la vida de su bebé, decide huir y enfrentar las frías y nevadas montañas, en lugar de soportar la violencia un día más.", credits: "Dirección: Arnaud Baur. Guión: Colin Vettier, sobre historia de AB y CV. Con Sandra Zellweger, Raphaël Tschudi, Antonio Buíl." },
        { title: "¡Ta Daaa!", director: "Subash Sachidananda", country: "India", duration: 6, synopsis: "Un hombre vestido de payaso se graba a sí mismo haciendo trucos de magia. ¿O es magia real la que nos quiere mostrar?", credits: "Guión y Dirección: Subash Sachidananda." },
        { title: "Titán", director: "Álvaro González", country: "España", duration: 13, synopsis: "Titán, la mayor luna de Saturno, es el escenario principal de la Misión Cronos. Orpheus, uno de los astronautas que ha descendido hasta su superficie, es el encargado de buscar posibles formas de vida. Esta es su historia. Premiada en España, Estados Unidos, Filipinas, Italia, Reino Unido y Sudáfrica.", credits: "Dirección: Álvaro González. Guión: AG, David Tejedor. Con Bruno Lastra, Violeta Orgaz, José Pablo Guerrero." },
        { title: "Tráiganme la cabeza de Antonio Mayans", director: "Felipe M. Guerra", country: "Brasil", duration: 19, synopsis: "El actor español Antonio Mayans ha hecho más de 150 películas. Algunas fueron buenas y otras realmente malas. Y ahora… la peor de todas puede ser su sentencia de muerte.", credits: "Guión y Dirección: Felipe M. Guerra. Con Valentín Javier Diment, Antonio Mayans, Luigi Cozzi." },
        { title: "Transmission", director: "Tom Hancock, Varun Raman", country: "Reino Unido", duration: 17, synopsis: "Una abstracción de los temores de la sociedad británica sobre el futuro del Reino Unido post-Brexit y también de muchos países occidentales que ahora están adoptando políticas proteccionistas y aislacionistas a través de la manipulación y el desprecio. Premiado en Reino Unido.", credits: "Guión y Dirección: Tom Hancock, Varun Raman. Con James Hyland, Kelby Keenan, Michael Shon." },
        { title: "Wanderer", director: "Federico Casal", country: "Uruguay", duration: 7, synopsis: "Un hombre con pasado fracturado despierta en una realidad distópica.", credits: "Guión y Dirección: Federico Casal. Con Nicolás Scotti, Federico Andreoli, Santiago González." },
        { title: "Wolves", director: "Álvaro Rodríguez Areny", country: "Andorra / España", duration: 12, synopsis: "Segunda Guerra Mundial. Arthur, Piloto de la Real Fuerza Aérea británica, huye campo a través después de estrellarse su avión. Comienza así una lucha por sobrevivir en la que se topará con algo más que enemigos alemanes. Seleccionado para Sitges 2016.", credits: "Guión y Dirección: Álvaro Rodríguez Areny. Con Isak Férriz, Irene Quero, Rodrigo García." },
        { title: "Yo y nadie más", director: "Marcelo Fabani", country: "Uruguay", duration: 4, synopsis: "Un hombre tranquilo siempre…; un día, ya no más. La tragedia en la vida de una persona toma distintas formas. Pero la afecta profundamente, cambiándola para siempre. Algunos se apoyan en su entorno afectivo para superarla. Otros no. Para estos últimos, marca un hito desde el cual, y hacia adelante, nada será lo mismo. Este cortometraje retrata la reacción de uno de ellos y el peligro inherente a seguir sometiendo a las personas a la contemplación de un mundo de monstruos. De tanto contemplarlos, se van convirtiendo en ellos.", credits: "Guión y Dirección: Marcelo Fabani. Con Jorge Sugo, MF, Sofía Bruno." }
      ]
    },

    {
      name: "Muestra Informativa de Cortometrajes",
      type: "shorts-catalog",
      categories: [
        {
          name: "Animación, experimental, surrealismo",
          films: [
            { title: "Chimaera", director: "Roberto Padilla Sobrado", country: "México", duration: 2 },
            { title: "Count Your Curses", director: "Lorène Yavo", country: "Bélgica", duration: 8 },
            { title: "Cubosoma", director: "Gastón Amat", country: "Argentina", duration: 8 },
            { title: "The Dead Man Speaks", director: "Marco Mereles", country: "Holanda", duration: 2 },
            { title: "El extraño caso del Dr. Toñito", director: "José Manuel Serrano Cueto", country: "España", duration: 12 },
            { title: "Espécime 53", director: "Leonardo Prioli", country: "Brasil", duration: 19 },
            { title: "Espiral", director: "Juan Pablo Mazzini", country: "Argentina", duration: 14 },
            { title: "Pepsi, cola, water", director: "Tom Bogaert", country: "Bélgica", duration: 10 },
            { title: "Roller Monster", director: "Manu Gómez", country: "Bélgica", duration: 15 },
            { title: "Up and Arise", director: "Raanan Berger", country: "Israel", duration: 21 }
          ]
        },
        {
          name: "Ciencia ficción",
          films: [
            { title: "48", director: "Vladimir Mitrevski", country: "Macedonia", duration: 19 },
            { title: "Attack of the Cyber Octopuses", director: "Nicola Piovesan", country: "Estonia", duration: 20 },
            { title: "La caja / The Box", director: "Aris Deligiannidis", country: "Grecia", duration: 13 },
            { title: "Marta por dentro", director: "JD Alcázar", country: "España", duration: 15 },
            { title: "Spin-Off", director: "Farid Salamé", country: "Portugal", duration: 15 },
            { title: "El telescopio", director: "Giovanni Grandoni", country: "Italia", duration: 15 },
            { title: "Trials", director: "Lyubomir Pechev", country: "Bulgaria", duration: 13 }
          ]
        },
        {
          name: "Terror",
          films: [
            { title: "9 pasos", director: "Marisa Crespo, Moisés Romera", country: "España", duration: 7 },
            { title: "Aeternum", director: "Giancarlo Jacob", country: "Perú", duration: 10 },
            { title: "aMorfe", director: "J. Antonio Rotunno", country: "México", duration: 8 },
            { title: "Chaney", director: "Gastón Revol Molina, Octavio Revol Molina", country: "Argentina", duration: 17 },
            { title: "De lobos y ovejas", director: "Marcelo Fabani", country: "Uruguay", duration: 6 },
            { title: "Filippa", director: "Alexander Ronnberg", country: "Suecia", duration: 5 },
            { title: "Into the Mud", director: "Pablo Pastor", country: "España", duration: 10 },
            { title: "Lealtad", director: "Ángel de la Cruz", country: "Argentina", duration: 12 },
            { title: "Lesiones", director: "Jerónimo Barriga", country: "México", duration: 9 },
            { title: "Lion", director: "Davide Melini", country: "España", duration: 12 },
            { title: "Los zapatos", director: "Andrés Damonte, Guido Zambaglione", country: "Argentina", duration: 8 }
          ]
        },
        {
          name: "Miscelánea",
          films: [
            { title: "Anna", director: "Chris Roest", country: "Holanda", duration: 4 },
            { title: "Cara de nada, el amable y Noelia Gómez", director: "Claire Cousin, Nacho Domínguez, Ignacio Lena, Ricardo Chacón, Cynthia Cornalino, Leonardo García", country: "Uruguay", duration: 5 },
            { title: "Un cuarto / A Room", director: "Chong Ming", country: "Hong Kong", duration: 15 },
            { title: "O Demônio Vem da Favela", director: "Genildo Lima Rodrigues", country: "Brasil", duration: 15 },
            { title: "H. P. Lovecraft Fin del viaje", director: "Willy Burrut", country: "Argentina", duration: 20 },
            { title: "Holiday Fear", director: "Nicholas Santos", country: "Estados Unidos", duration: 4 },
            { title: "Intervention of Evil", director: "Mohamad Vahid", country: "Singapur", duration: 15 },
            { title: "New Year´s Eve", director: "Du Du Hou", country: "China", duration: 16 },
            { title: "Save", director: "Iván Sáinz-Pardo", country: "Alemania", duration: 4 },
            { title: "The Seance", director: "Christian Dohr", country: "Austria", duration: 11 },
            { title: "Shoes", director: "Ray Kermani", country: "Bélgica", duration: 5 },
            { title: "The Waste Land", director: "A Cheng Dong", country: "China", duration: 15 }
          ]
        }
      ]
    }
  ]
};

fs.writeFileSync(
  path.join(__dirname, '../src/data/mvf-x.json'),
  JSON.stringify(data, null, 2),
  'utf8'
);
console.log('mvf-x.json written successfully (' + JSON.stringify(data).length + ' chars)');
