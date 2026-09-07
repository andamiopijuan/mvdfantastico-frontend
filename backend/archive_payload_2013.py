# Source-backed archive payload for Montevideo Fantástico VIII (2013).
#
# Primary source: montevideo-fantastico-viii.html (historical festival archive).
# Contemporary cross-check: MEC announcement confirms Dec 10–15, Cine Universitario
# del Uruguay (Canelones 1280), and the participation of Aislado.
# External cross-check: MoMA lists Long Weekend (1978) at 92 minutes.
#
# Normalization notes:
# - Dios local was an advance/preview with a talk, not a programmed Work.
# - Aislado is stored as a medium-length work because its documented runtime is 35 min.
# - year ranges are normalized to the final year for Work.production_year and preserved
#   in source_year when applicable.

ARCHIVE_2013 = {'edition': {'number': 8,
             'roman': 'VIII',
             'year': 2013,
             'title': 'Montevideo Fantástico VIII',
             'dates': '10 — 15 de diciembre de 2013',
             'venues': [{'name': 'Cine Universitario del Uruguay',
                         'address': 'Canelones 1280, Montevideo',
                         'description': 'La edición utilizó las dos salas del Cine Universitario del Uruguay.'}]},
 'editorial': {'title': 'Crónica de la edición VIII',
               'author': 'Alejandro Yamgotchian',
               'content': ['El pasado domingo 15 de diciembre de 2013 tuvo lugar la entrega de premios correspondiente '
                           'a la octava edición de Montevideo Fantástico, organizada por Arte7.com.uy y Cine '
                           'Universitario del Uruguay. Más de 20 largometrajes y 50 trabajos entre cortos y '
                           'mediometrajes, de 16 países, pasaron en apenas 6 días y en 2 salas.',
                           'El Cosmonauta (2013), coproducción entre España, Letonia y Rusia, fue elegida Mejor '
                           'Película y también obtuvo el premio a Mejor Guión.',
                           'La edición incluyó homenajes a Ray Bradbury y John Newland, el 30.º aniversario de El '
                           'Ascensor, un tributo a la memoria de Arístides Pisano con Largo fin de semana y un '
                           'adelanto de Dios local. Este último se conserva como actividad/adelanto y no como obra de '
                           'la programación estructurada.']},
 'sections': [{'name': 'LARGOMETRAJES EN COMPETENCIA / LONG FEATURE FILMS COMPETITION',
               'type': 'features',
               'films': [{'title': 'Buscando la Esfera del Poder',
                          'country': 'Argentina',
                          'year': 2013,
                          'duration': 110,
                          'director': 'Tetsuo Lumière',
                          'synopsis': 'Princesas y príncipes, héroes y villanos, los aliens y los seres humanos, se '
                                      'encuentran en una metrópolis frágil, siempre a punto de sucumbir ante el avance '
                                      'de las fuerzas oscuras. Buenos Aires se verá sacudida por una peculiar invasión '
                                      'extraterrestre que pretende destruir a nuestro planeta.',
                          'review': 'Nuevo (y esperado) largometraje de Tetsuo Lumière (la premiada saga TL , otros '
                                    'cortos también galardonados), a pura comedia, ciencia ficción y cine mudo, con '
                                    'humor del bueno, situaciones delirantes y personajes únicos, donde todo puede '
                                    'pasar. Lumière fue aquí – además de realizador, guionista y protagonista – '
                                    'coproductor, director artístico, animador stop motion , coreógrafo, editor y uno '
                                    'de los encargados de efectos especiales. En realidad, como artista y creador en '
                                    'sí, su capacidad y talento parecen no tener límites.',
                          'credits': 'Guión y Dirección: Tetsuo Lumière. Con TL, Ángeles Olleta, Luis Sosa Arroyo, '
                                     'Natasha Ivannova, Germán Da Silva. Duración: 110 minutos'},
                         {'title': 'CHIMÈRES (Quimeras)',
                          'country': 'Suiza',
                          'year': 2013,
                          'duration': 79,
                          'director': 'Olivier Beguin',
                          'synopsis': 'Un joven fotógrafo sufre un accidente automovilístico en Rumania, mientras '
                                      'estaba de vacaciones con su novia, y queda gravemente herido. En el hospital '
                                      'recibe una transfusión de sangre supuestamente contaminada que empieza a '
                                      'generarle extraños síntomas. Su novia, desconcertada, intenta ayudarlo, y al '
                                      'mismo tiempo trata de salvar la pareja a como dé lugar.',
                          'review': 'Filmada con dinero de su propio bolsillo, esta ópera prima del suizo Olivier '
                                    'Beguin (de quien ya se viera en el festival su corto Dead Bones ) se acerca al '
                                    'tema del vampirismo apelando a las clásicas reglas del género, pero sobre todo a '
                                    'una estilizada historia romántica, con personajes convincentes que ayudan a '
                                    'mantener ese pulso psicológico, donde las alucinaciones y en especial el descenso '
                                    'a la locura componen un drama que recuerda un tanto al Cronenberg de La mosca '
                                    '(1986). La película tiene ingredientes de todo tipo. Su realizador (egresado de '
                                    'la London Film School, editor en el canal de la televisión estatal suiza) impone '
                                    'un sello no solo visual, con resultados por momentos muy valiosos. Dentro del '
                                    'elenco aparece una de las actrices preferidas del ya fallecido Lucio Fulci, '
                                    'Catriona MacColl (protagonista de Pánico en la ciudad de los muertos vivientes , '
                                    'El más allá y La casa cercana al cementerio ) y también Ruggero Deodato (el '
                                    'director de Holocausto Caníbal).',
                          'credits': 'Dirección: Olivier Beguin. Guión: OB, Colin Vettier. Con Jasna Kohoutova, '
                                     'Yannick Rosset, Catriona MacColl, Paulo Dos Santos, Sarah Marcuse. Duración: 79 '
                                     'minutos'},
                         {'title': 'El Cosmonauta',
                          'country': 'España / Letonia / Rusia',
                          'year': 2013,
                          'duration': 96,
                          'director': 'Nicolás Alcalá',
                          'synopsis': 'Stas, el cosmonauta, se pierde en el espacio. Al regresar encuentra la Tierra '
                                      'desierta. Yulia y Andrei le esperan al otro lado, en un mundo que colapsa.',
                          'review': 'Cuesta creer que un joven de tan solo 25 años haya escrito y dirigido (además de '
                                    'coproducir y coeditar) una obra por momentos bastante llamativa de ciencia '
                                    'ficción, a partir de un corto que luego se convirtió en largo, y sobre todo '
                                    'porque aquí participaron más de 4.500 personas a través de una colecta a nivel '
                                    'mundial que llegó casi al millón de dólares. Es en realidad un drama romántico '
                                    'entre una joven y dos grandes amigos que se enamoran de ella, narrado a través de '
                                    'un montaje no lineal, más bien emparentado con el cine de Atom Egoyan y hasta con '
                                    'un par de obras de Stanislaw Lem. Este triángulo amoroso parece importarle mucho '
                                    'más a su realizador que una arriesgada misión espacial o las causas del porqué la '
                                    'Tierra queda posteriormente en ruinas, algo que sí le sirve para crear universos '
                                    'envolventes, en ocasiones fascinantes. Una obra que llevó muchísimo sacrificio de '
                                    'parte del equipo principal (comenzó a gestarse en 2009), y si no vean los 20 '
                                    'minutos de créditos finales. La película ha sido tomada como objeto de estudio en '
                                    'universidades y escuelas de cine y de negocios de todo el mundo. También recibió '
                                    'premios a la innovación por parte de la Unión Europea.',
                          'credits': '(The Cosmonaut) – Dirección: Nicolás Alcalá. Guión: NA, basado en la novela de '
                                     'Henry Pierrot. Con Max Wrottesley, Katrine de Candole, Leon Ockebden, Guy '
                                     'Williams, David Barrass. Duración: 96 minutos'},
                         {'title': 'Frankenstein No Asusta en Colombia',
                          'country': 'Colombia',
                          'year': 2013,
                          'duration': 63,
                          'director': 'Erik Zúñiga',
                          'synopsis': 'El cine de horror en Colombia está lleno de serpientes mariguaneras, mansiones '
                                      '“góticas” en el trópico, vampiros sedientos de la sangre de jóvenes caleños, '
                                      'mujeres agorafobias y delirantes, soldados persiguiendo enemigos tan perversos '
                                      'como ellos mismos, caras ocultas de personajes oscuros y macabros. Pero más '
                                      'allá de eso, el verdadero horror que inspira a sus creadores, está en la más '
                                      'pura y dura realidad. Y el arte se nutre de ella… una realidad mucho más '
                                      'perversa y horrorosa que la más desfasada película gore. Este el germen para '
                                      'que una nueva generación de cineastas proyecten mediante el cine de género, los '
                                      'más profundos miedos y horrores que los colombianos han vivido como sociedad.',
                          'review': 'Varios escritores, productores, especialistas y realizadores, desde el conocido '
                                    'Jairo Pinilla hasta otros mucho más recientes, nos acercan a través de sus '
                                    'impresiones un panorama sobre lo que ha sido la historia del cine fantástico y de '
                                    'terror “cafetero”, y muy especialmente la incidencia que el horror que ha '
                                    'sacudido a la sociedad colombiana de las últimas décadas ha tenido en algunas '
                                    'películas. Interesantísimo trabajo del joven Erik Zúñiga, que aporta documentos y '
                                    'materiales audiovisuales muy ilustrativos, didácticos, y que pueden sorprender a '
                                    'más de uno. El título, obviamente, hace alusión a que no hay monstruo capaz de '
                                    'superar a paramilitares, narcotraficantes, guerrilleros y hasta a los propios '
                                    'medios masivos de comunicación, que sin dudas han causado mucho más terror que '
                                    'cualquier entidad sobrenatural. De los mejores documentales que han pasado por el '
                                    'festival. Selección Oficial Sitges 2013.',
                          'credits': 'Guión y Dirección: Erik Zúñiga. Duración: 63 minutos.'},
                         {'title': 'Gut',
                          'country': 'Estados Unidos',
                          'year': 2012,
                          'duration': 90,
                          'director': 'Elias',
                          'synopsis': 'El protagonista, Tom, es un hombre casado, con una hija y una vida bastante '
                                      'rutinaria que lo agobia cada vez más, junto con la crisis de mediana edad. '
                                      'Trabaja junto a su mejor amigo, Dan, un joven fanático de las películas de '
                                      'terror, que al parecer nunca va a salir de su adolescencia pero que al mismo '
                                      'tiempo se da cuenta que su amigo necesita un cambio y no se le ocurre nada '
                                      'mejor que mostrarle un misterioso DVD que compró, una película snuff . Lo que '
                                      'ambos ven ahí trastocará sus vidas para siempre.',
                          'review': 'Definido por el propio realizador como un “ psychothriller sexual ”, esta ópera '
                                    'prima de Elias (admirador de Cronenberg, Lynch, Haneke y Miike) muestra la '
                                    'transformación de ese atormentado hombre de familia (miedo, tensión, paranoia), '
                                    'quien trata de olvidar lo que vio en esa película aunque no hace más que empezar '
                                    'a asociarla a cualquier hecho de su vida cotidiana. Un film que resalta mucho más '
                                    'en las consecuencias del voyeurismo , en fantasías imprevistas, en su atmósfera '
                                    'inquietante, que en el subgénero de asesinatos reales en sí. Ahí se encuentra '
                                    'quizás su mérito mayor. Premio a Mejor Película en el New York City Horror Film '
                                    'Festival.',
                          'credits': 'Guión y Dirección: Elias. Con Jason Vail, Nicholas Wilder, Sarah Schoofs, '
                                     'Kristianna Mueller, Angie Bullaro. Duración: 90 minutos'},
                         {'title': 'Mar Negro',
                          'country': 'Brasil',
                          'year': 2013,
                          'duration': 99,
                          'director': 'Rodrigo Aragão',
                          'synopsis': 'Una extraña contaminación golpea una pequeña aldea de pescadores. Cuando peces '
                                      'y crustáceos se transforman en horrendas criaturas que transmiten muerte y '
                                      'destrucción, el solitario Albino lucha por el gran amor de su vida, arriesgando '
                                      'hasta su alma en un escape desesperado para sobrevivir.',
                          'review': 'Mar negro cierra la trilogía de eco-terror tropical iniciada con Mud Zombies '
                                    '(2008) y La noche del Chupacabras (2011), ambas ya exhibidas en el Montevideo '
                                    'Fan, siempre con el colapso ambiental de fondo y con la impresionante gama de '
                                    'efectos especiales y de maquillaje (con abundantes marionetas de espuma y látex), '
                                    'desplegada por su notable realizador, Rodrigo Aragao, la cual estalla en la '
                                    'última media hora de película, con zombies y monstruos marinos que se apoderan de '
                                    'la pantalla. Los efectos digitales son mínimos, y su pasión por los primeros '
                                    'trabajos de Sam Raimi y Peter Jackson se nota. Tampoco falta el buen humor ni los '
                                    'sutiles guiños a clásicos del cine fantástico de los años ´50. La naturaleza '
                                    'vuelve a tomar venganza, en la película más sangrienta del festival.',
                          'credits': 'Guión y Dirección: Rodrigo Aragao. Con Walderrama Dos Santos, Tiago Ferri, Kika '
                                     'Oliveira, Mayra Alarcón, Markus Konká. Duración: 99 minutos'},
                         {'title': 'Sin Señal',
                          'country': 'Argentina',
                          'year': 2012,
                          'duration': 68,
                          'director': 'David León Sofía',
                          'synopsis': 'León, camarógrafo profesional, llega con un grupo de filmación a una isla '
                                      'exótica, con el propósito de realizar un documental referente a los antiguos '
                                      'nativos que allí habitaban, aunque nada resulta según lo previsto. El argumento '
                                      'de dicha obra, cuyo cerebro principal es Paula, la productora, consiste en '
                                      'demostrar que los aborígenes establecieron a esa isla como un lugar de exilio '
                                      'maldito. El arqueólogo de la expedición, Juan Luis, cuenta a su vez demoníacas '
                                      'historias de viejos residentes, lo que enmarca la situación en un ambiente '
                                      'tenso y aterrador. Como la cámara principal no funciona, y en la isla no hay '
                                      'señal de celular ni forma de comunicarse con el exterior, será León, encargado '
                                      'del making off del documental, el único capacitado para grabar todo, con otra '
                                      'cámara. Sus imágenes, así, constituirán el único registro y prueba de '
                                      'absolutamente todo lo que ocurra. Acontecimientos que ponen frente a frente a '
                                      'los protagonistas con desconocidas fuerzas que están más allá de toda '
                                      'comprensión se desencadenan rápidamente. Acorralados por extrañas muertes y '
                                      'misteriosas desapariciones, intentan salvarse a través de diferentes medios, '
                                      'como encender fogatas en la playa, pedir auxilio desesperadamente a barcos '
                                      'lejanos que pasan, o nadar hasta donde sea para conseguir ayuda.',
                          'review': 'Estamos ante un por momentos brillante trabajo de mockumentary , que logra climas '
                                    'realmente escalofriantes y terroríficos (sin morbo ni excesos), gracias a la '
                                    'credibilidad de sus actores y también a la solidez de un libreto que aporta una '
                                    'enorme bocanada de oxígeno a un subgénero bastante trillado últimamente y casi '
                                    'sin aliento. A prestar atención a lo que aparece luego de los créditos finales.',
                          'credits': 'Guión y Dirección: David León Sofia. Con Karina Androvich, Andrea Portela, '
                                     'Sebastián Blanco Leis, Emiliano Ramos, DL. Duración: 68 minutos'},
                         {'title': 'When Time Becomes a Woman',
                          'country': 'Jordania',
                          'year': 2012,
                          'duration': 73,
                          'director': 'Ahmad Alyaseer',
                          'synopsis': 'Zad es un revolucionario que está tratando de liberar a su país, pero la mayor '
                                      'parte de sus planes no ha salido bien. Él ha estado buscando a una mujer por '
                                      'más de tres años, que cree tiene secretos capaces de salvarlo no sólo a él, '
                                      'sino también a toda la humanidad y al propio planeta Tierra. Su misión es '
                                      'convencerla para que se marche con él y ayudarlo a reconstruir lo que ha '
                                      'destruido. ¿Podrá cambiar esta reunión de 70 minutos sus respectivas vidas y el '
                                      'destino de todo lo que los rodea? ¿Podrán tomar decisiones que siempre se temen '
                                      'tomar? Esta primera película de ciencia ficción árabe pretende retratar '
                                      'historias humanas, simplemente a través del diálogo y las emociones.',
                          'review': 'Toda una sorpresa dentro del festival esta notable ópera prima del jordano Ahmad '
                                    'Alyaseer (hecha con apenas 5.000 dólares) filmada en un solo lugar (a orillas del '
                                    'Mar Muerto), con dos actores y 50 grados de calor, que hacían parar la filmación '
                                    'cada media hora, para que todos pudieran refrescarse, descansar y también para '
                                    'que los protagonistas volvieran a recuperar el maquillaje. Una conversación de '
                                    'poco más de una hora, que de una situación muy puntual va pasando, con alguna '
                                    'revelación y giro de por medio, a una sutil crítica, con exploraciones, debates, '
                                    'y abordajes filosóficos y científicos de por medio, al comportamiento de la raza '
                                    'humana y a lo que nos puede llegar a esperar en un futuro no tan lejano. Ganadora '
                                    'de 4 premios internacionales, incluyendo Mejor Película y Fotografía.',
                          'credits': '(فيلم حينما يكون الزمن أنثى) – Dirección: Ahmad Alyaseer. Guión: AA, Rana '
                                     'Alyaseer. Con Najwan Baqaeen, Zaid Baqaeen. Duración: 73 minutos'}]},
              {'name': 'COMPETENCIA IBEROAMERICANA DE LARGOMETRAJES / IBERO AMERICAN LONG FEATURE FILMS COMPETITION',
               'type': 'features',
               'films': [{'title': 'El Peso de la Culpa',
                          'country': 'Argentina',
                          'year': 2012,
                          'duration': 91,
                          'director': 'Ariel Sanna',
                          'synopsis': 'Tras varios secuestros exitosos, un grupo compuesto por tres hombres y una '
                                      'mujer accede a lo que podría ser su último trabajo, con el doble de paga: '
                                      'retener a un sacerdote tan solo por una noche y en una vieja casa abandonada. '
                                      'Pero unos gritos extraños despiertan a uno de ellos; sólo él los había '
                                      'escuchado. Y eso comienza a generar complicaciones en el equipo, desconfianza, '
                                      'celos, acusaciones, peleas… hasta que esos gritos son escuchados por todos. Tal '
                                      'vez el peso de la culpa de ellos había tomado vida.',
                          'review': 'Filmada prácticamente en interiores, el director y guionista Ariel Sanna logra un '
                                    'interesante trabajo de corte sobrenatural, desatando en espacios reducidos (un '
                                    'tétrico sótano) los elementos típicos del subgénero de posesión demoníaca, sin '
                                    'descuidar sus personajes ni tampoco los climas asfixiantes que imperan durante '
                                    'casi toda la película. Dentro del elenco aparece la renombrada actriz teatral '
                                    'Iride Mockert, con participación especial de Rodolfo Ranni.',
                          'credits': 'Guión y Dirección: Ariel Sanna. Con Martín Crespo, Nicolás Albamonte, Iride '
                                     'Mockert, Fabián Storniolo, Rodolfo Ranni. Duración: 91 minutos'},
                         {'title': 'KV 62',
                          'country': 'Argentina',
                          'year': 2013,
                          'duration': 87,
                          'director': 'Marcelo Leguiza',
                          'synopsis': 'Nicolás (Mariano Ures) y Esteban (Esteban Rojas) son dos sobrevivientes a un '
                                      'apocalipsis en el cual el Sol nunca se ocultó. Juntos conviven en un caserón, '
                                      'alimentados y abastecidos por una misteriosa corporación, pero son perturbados '
                                      'por las constantes dudas que generan los acontecimientos transcurridos en su '
                                      'última fiesta. Deberán sobrevivir rodeados de sucesos lisérgicos y '
                                      'sobrenaturales que conspiran con una realidad y tiempo que se alteran '
                                      'continuamente.',
                          'review': 'Definida por los propios realizadores como “ una obra con un ritmo lisérgico y '
                                    'corrosivo, que alude al Danny Boyle de Trainspotting (1996), al Terry Gilliam de '
                                    'Pánico y locura en Las Vegas (1998), al Darren Aronofsky de Réquiem por un sueño '
                                    '(2000) y al Jonas Akerlund de Spun (2003), sin olvidar la perturbadora poesía de '
                                    'David Lynch y el universo extremo y delirante del escritor Williams Burroughs ”, '
                                    'se trata del más reciente trabajo de Marcelo Leguiza ( Marihuana Radioactiva '
                                    'Interplanetaria , Sonríe ), aquí en un largo más serio, un tanto más ambicioso y '
                                    'arriesgado, que sin embargo no le hace perder su tradicional estilo humorístico.',
                          'credits': 'Dirección: Marcelo Leguiza. Guión: Matías Oniria, sobre historia de ML. Con '
                                     'Esteban Rojas, Mariano Ures, Noelia Antúnez, María Laura Esteban, Agustín '
                                     'Aguirre. Duración: 87 minutos'},
                         {'title': 'Sonno Profondo',
                          'country': 'Argentina',
                          'year': 2013,
                          'duration': 65,
                          'director': 'Luciano Onetti',
                          'synopsis': 'Luego de matar a una joven mujer, un asesino traumado por los recuerdos de su '
                                      'infancia recibe un misterioso sobre por debajo de su puerta. El cazador se '
                                      'convierte en presa cuando descubre que dicho sobre contiene fotografías suyas '
                                      'asesinando a la joven.',
                          'review': 'El realizador argentino Luciano Onetti logra un auténtico giallo , respetando '
                                    'todos los elementos que por lo general aparecen dentro de este subgénero '
                                    '(crímenes violentos, los movimientos de los asesinos seriales, erotismo, '
                                    'alucinaciones, las locaciones en interiores y exteriores, los planos y encuadres, '
                                    'la banda sonora) y al mismo tiempo hace gala de su destreza, mostrando casi todo '
                                    'desde el punto de vista de los personajes (el asesino perseguido), para ambientar '
                                    'su historia en la Italia de los años ´70 (en realidad, fue íntegramente filmada '
                                    'en Argentina). Un gran homenaje, digno de un cultor, y al mismo tiempo un '
                                    'verdadero logro en sí, ya que Onetti hizo de todo (dirección, libreto, actuación, '
                                    'edición, fotografía, música, efectos especiales y sonido, entre otros rubros). '
                                    'Selección Oficial Sitges 2013.',
                          'credits': 'Guión y Dirección: Luciano Onetti. Con Daiana García, LO. Duración: 65 minutos'},
                         {'title': 'Trash Dos: Las Tetas de Ana L.',
                          'country': 'Argentina',
                          'year': 2013,
                          'duration': 88,
                          'director': 'Alejo Rébora',
                          'synopsis': 'La segunda parte de la trilogía (la tercera viene pronto) sigue a la hermana '
                                      'del protagonista de la primera parte, Ana Ele Bruselas, quien al no poder ser '
                                      'rescatada por su familiar (que debía entregar una súper adictiva droga a '
                                      'tiempo), logra escapar de sus mafiosos captores y emprende otra alocada carrera '
                                      'para poder recuperar los órganos del título. La ciudad temblará, mientras la '
                                      'imparable Bruselas avance en su cruda y aleatoria investigación mamaria, '
                                      'rompiendo huesos y pateando dientes camino al perverso señor Gatrachele, '
                                      'cerebro detrás de toda la turbia red de tráfico de órganos que impregna las '
                                      'calles.',
                          'review': 'Lo que va pasando en el camino lleva a preguntarse… ¿qué es lo que no tiene esta '
                                    'película? Porque hay de todo y para todos los gustos. Cine punk y obviamente '
                                    'trash, que redobla la apuesta de su premiada predecesora y con mejores resultados '
                                    'todavía. Dentro de ese giro mucho más intenso, dinámico y no apto para paladares '
                                    'finos, el director Alejo Rébora orquesta un trabajo de extremo cuidado y esmero '
                                    'técnico (edición, fotografía, maquillaje, efectos especiales), con una '
                                    'protagonista convertida en una fiera, que transita por varios mundos paralelos y '
                                    'que tiene hasta algún tiempo para reflexionar en medio de su caos mental, '
                                    'disparando munición pesada contra el sistema. Cine ultraindependiente, '
                                    'permanentemente provocador y al mismo tiempo reaccionario.',
                          'credits': 'Dirección: Alejo Rébora. Guión: Matías Oniria, AR. Con Leticia Salorio, Darío '
                                     'Estelrich, Vic Cicuta, Ramón Caribe, Daniel Lucas. Duración: 88 minutos'},
                         {'title': 'Volver a Morir',
                          'country': 'Colombia',
                          'year': 2012,
                          'duration': 84,
                          'director': 'Miguel Urrutia',
                          'synopsis': 'Una atractiva mujer despierta desnuda al lado de un desconocido. Apenas empieza '
                                      'a entender cómo llegó ahí, el misterioso hombre la seduce y en pleno clímax la '
                                      'asesina. Ella regresa en el tiempo al momento mismo en que despierta, quedando '
                                      'atrapada en un círculo sin salida, donde inevitablemente muere una y otra vez. '
                                      'Ella deberá escarbar en la oscura mente del asesino las claves que podrán '
                                      'salvar su vida.',
                          'review': 'Thriller de terror y ciencia ficción, en clave de bucle temporal y con tan solo '
                                    'dos actores sosteniendo toda la película. Parece una típica historia de Dimensión '
                                    'Desconocida , que luego se potencia, derivando en algunas referencias '
                                    '“hitchcockianas” y elementos típicos del terror actual, siempre bajo una '
                                    'filmación cuidadosa (transcurre prácticamente en una sola locación) y un guión '
                                    'que por lo general nunca pierde su ritmo. Ópera prima del reconocido publicista, '
                                    'escultor y músico colombiano Miguel Urrutia (fanático de todo lo relacionado a '
                                    'ciencia y tecnología), con participación de la famosa modelo y actriz peruana '
                                    'Andrea Montenegro.',
                          'credits': 'Guión y Dirección: Miguel Urrutia. Con Andrea Montenegro, Luis Fernando '
                                     'Bohórquez. Duración: 84 minutos'},
                         {'title': 'Zombio 2: Chimarrao Zombies',
                          'country': 'Brasil',
                          'year': 2013,
                          'duration': 84,
                          'director': 'Petter Baiestorf',
                          'synopsis': 'Yerba mate radioactiva (marca “Cronenberg”) convierte a habitantes del extremo '
                                      'oeste de Santa Catarina en zombies. Pero estos no serán tan peligrosos como los '
                                      'humanos que habitan dicha región. Los zombies tropicales son el menor de los '
                                      'problemas.',
                          'review': 'Cine trash y sexploitation ; comedia gore y slapstick a cargo de Petter '
                                    'Baiestorf, todo un referente en Brasil, censurado en varias ocasiones pero que '
                                    'tiene sus cultores y también referentes que van desde su compatriota José Mojica '
                                    'Marins, pasan por el italiano Lucio Fulci y llegan hasta John Waters. Se trata de '
                                    'la continuación de Zombio (mediometraje de 1999; pueden verlo aquí ), aunque más '
                                    'bien es una reelaboración y sumamente potenciada de aquella historia, que aquí '
                                    'pega un giro radical, agregando elementos muchísimo más bizarros y provocadores, '
                                    'con un excelente trabajo de maquillaje. Filmada con la colaboración de ocho '
                                    'estados brasileros, varias productoras independientes y colectas que el propio '
                                    'realizador hiciera a través de Internet. La versión que aquí se exhibe es la '
                                    'completa, sin ningún corte.',
                          'credits': 'Guión y Dirección: Petter Baiestorf. Con Airton Bratz, Elio Copini, Gisele '
                                     'Ferrán, Coffin Souza, Jorge Timm. Duración: 84 minutos'}]},
              {'name': 'HOMENAJE A RAY BRADBURY (1920–2012) / TRIBUTE TO RAY BRADBURY (1920–2012)',
               'type': 'features',
               'films': [{'title': 'Sabana',
                          'country': 'Unión Soviética',
                          'year': 1987,
                          'duration': 82,
                          'director': 'Nozim Tolahojayev',
                          'synopsis': 'Uno de los más grandes maestros de la ciencia ficción literaria dejó de existir '
                                      'el pasado año, a los 91 años, y el Festival le rinde un pequeño tributo, con la '
                                      'exhibición nada menos que de la considerada primera película de terror '
                                      'soviética. El realizador uzbeko Nozim Tolahojayev se basó en varios cuentos del '
                                      'escritor norteamericano (el medular: “La pradera”), para realizar la que '
                                      'probablemente sea la mejor adaptación de su obra llevada al cine, luego de la '
                                      'que dirigiera el francés François Truffaut en 1966 ( Fahrenheit 451 ). En un '
                                      'futuro indeterminado, un matrimonio trata de controlar a sus hijos, '
                                      'obsesionados con un cuarto de juegos cuyas paredes de cristal toman sus '
                                      'pensamientos y los proyectan de manera tal que uno parece que estuviera '
                                      'presente ahí mismo, en el lugar y con los sentidos captando absolutamente todo. '
                                      'La historia, sin embargo, va más allá de lo que se puede ver en el libro El '
                                      'hombre ilustrado ; siendo fiel a la mirada crítica de Bradbury hacia el ser '
                                      'humano moderno, toma un camino mucho más oscuro y pesimista, con algunas '
                                      'aristas políticas y también filosóficas, a partir de otra historia (algo '
                                      '“bradburiana”) sobre seres que vuelven de la muerte para estar con sus '
                                      'familiares y que son perseguidos incesantemente por el gobierno de turno. Una '
                                      'película muy poco conocida, que el Festival se enorgullece en presentar, en '
                                      'colaboración con Arte7.com.uy y Cinefania.com',
                          'review': '',
                          'credits': 'Guión y Dirección:Nozim Tolahojayev, basado en las obras de Ray Bradbury. Con '
                                     'Yuriy Belyaev, Nelli Pshyonnaya, Giorgi Gegechkori, Tamari Skhirtladze, Darius '
                                     'Palekas. Duración: 82 minutos'}]},
              {'name': 'ANIVERSARIOS / ANNIVERSARIES',
               'type': 'features',
               'films': [{'title': 'El Ascensor',
                          'country': 'Holanda',
                          'year': 1983,
                          'duration': 95,
                          'director': 'Dick Maas',
                          'synopsis': '30th ANNIVERSARY (HOLANDA, 1983) – Cuatro personas quedan atrapadas en un '
                                      'ascensor, durante una noche tormentosa y en un moderno edificio de oficinas, '
                                      'terminando hospitalizadas cuando casi se asfixian al fallar repentinamente el '
                                      'aire acondicionado. El mecánico que manda la compañía para arreglarlo no '
                                      'encuentra nada extraño en él. Pero a partir de ese momento el comportamiento de '
                                      'la máquina comienza a ser cada vez más errático y peligroso, mientras la '
                                      'policía piensa que se trata tan solo de simples accidentes.',
                          'review': 'Un clásico del terror, producido en Holanda, que acaba de cumplir sus 30 años y '
                                    'que el Festival aprovecha para recordarlo, con el beneplácito del propio director '
                                    'y guionista Dick Maas, que también hizo la banda sonora en dos días y con tan '
                                    'solo un par de sintetizadores, logrando sus inquietantes climas de suspenso y '
                                    'terror, y al mismo tiempo una historia que no ha perdido vigencia en absoluto, '
                                    'cuando pone en el tapete el tema de la inteligencia artificial y por supuesto a '
                                    'su creador, el hombre. Ópera prima de Maas, ganadora de varios premios '
                                    'internacionales, con buenos efectos especiales (para el limitado presupuesto con '
                                    'que se contaba), una esmerada fotografía, y hasta con los propios actores '
                                    'haciendo sus escenas de riesgo. La película tuvo una remake en 2001, hecha por el '
                                    'mismo realizador y con Naomi Watts en el reparto, antes de hacerse famosa en El '
                                    'camino de los sueños (2001) de David Lynch.',
                          'credits': '(De Lift) Guión y Dirección: Dick Maas. Con Hubb Stapel, Willeke van Ammelrooy, '
                                     'Josine van Dalsum, Piet Römer, Hans Veerman. Duración: 95 minutos. EN PROGRAMA: '
                                     'Cortometraje sorpresa'}]},
              {'name': 'HOMENAJE A ARÍSTIDES PISANO / TRIBUTE TO ARÍSTIDES PISANO',
               'type': 'features',
               'films': [{'title': 'Largo fin de semana',
                          'country': 'Australia',
                          'year': 1978,
                          'duration': 92,
                          'director': 'Colin Eggleston',
                          'synopsis': '',
                          'review': 'Exhibición en homenaje a la memoria de Don Arístides Pisano, directivo de Cine '
                                    'Universitario, de quien era su película de terror favorita.',
                          'credits': 'Dirección: Colin Eggleston. Duración: 92 minutos.'}]},
              {'name': 'MUESTRA INFORMATIVA DE LARGOMETRAJES / LONG FEATURE FILMS INFORMATIVE SESSION',
               'type': 'features',
               'films': [{'title': 'Adormecidos',
                          'country': 'Argentina',
                          'year': 2012,
                          'duration': 98,
                          'director': 'Martín Metlikovec',
                          'synopsis': 'Raúl es un hombre común y corriente, fanático del cine clase B y la ciencia '
                                      'ficción, pero con un problema latente: el insomnio. La falta de sueño lo lleva '
                                      'a tener problemas laborales y también a pensar que la verdadera causa está en '
                                      'el estado de sus almohadas. En lugar de acudir a un médico termina comprando '
                                      'una “almohada inteligente fabricada con tecnología de la NASA”. A medida que '
                                      'Raúl comienza a disfrutar de noches de buen dormir, también experimenta '
                                      'dolorosas pesadillas y una pérdida gradual de la cordura. Este sólo será el '
                                      'comienzo de un viaje oscuro entre la locura, el deseo, las drogas y un supuesto '
                                      'plan de la NASA para dominar nuestras mentes.',
                          'review': 'Arriesgada ópera prima de Martín Metlikovec, quien aprovecha la paranoia de su '
                                    'protagonista para filtrar con buena estética (la fotografía, la edición hecha por '
                                    'el propio realizador) su pasión por el cine fantástico y bizarro, y al mismo '
                                    'tiempo volcar inquietudes sociales y políticas en un contexto donde las '
                                    'corporaciones (medios masivos de comunicación incluidos) quieren anestesiar a '
                                    'todos. Premio del Público a Mejor Película en el pasado Buenos Aires Rojo Sangre.',
                          'credits': 'Guión y Dirección: Martín Metlikovec. Con Christian Méndez, Martín Domínguez '
                                     'Cichetti, Carolina Porcel, Juan Manuel Barreiro, Marcelo Mayer. Duración: 98 '
                                     'minutos'},
                         {'title': 'Curas Zombies en Azul',
                          'country': 'Argentina',
                          'year': 2013,
                          'duration': 80,
                          'director': 'Osvaldo Sudak',
                          'synopsis': 'La ceremonia de Pascua conmemora la muerte y resurrección de Cristo, pero '
                                      'cuando su sangre contamina el agua bendita de la Capilla del cementerio de '
                                      'Azul, el reverendo y su rebaño mueren literalmente, para resucitar más tarde, '
                                      'con ganas de comerse a los infieles. Mientras tanto, una banda de surf rock y '
                                      'bailarinas a go-go llega a la ciudad por error, para animar un acto político en '
                                      'el decadente Salón de la Sociedad Rural. Bajo el liderazgo de la manager y el '
                                      'dealer local, los extranjeros se atrincheran, dispuestos a enfrentar a los '
                                      'curas zombis, pero el malvado dueño del lugar tiene otros planes…',
                          'review': 'Comedia de horror zombie y con bastante humor bizarro, proveniente de La Plata, '
                                    'donde los muertos vivos no perdonan ni a los perros del lugar. Seleccionada para '
                                    'festivales de Argentina, Puerto Rico, México y Colombia.',
                          'credits': 'Guión y Dirección: Osvaldo Sudak. Con Estanislao Pedernera, Carolina Costas, '
                                     'Sebastián Ienco, Ariel Suárez, Hilda Jaureguiberry. Duración: 80 minutos'},
                         {'title': 'Hijos de Puta por Elección',
                          'country': 'Argentina',
                          'year': 2013,
                          'duration': 82,
                          'director': 'Georgina Zanardi',
                          'synopsis': 'Pollo y Cicuta son dos muy buenos amigos que disfrutan de las drogas, el '
                                      'alcohol, el rock… y de asesinar en serie. De lo que no disfrutan es de '
                                      'deshacerse de los cadáveres. Para esto tienen a Bambi, su empleado que no está '
                                      'del todo de acuerdo con las costumbres de sus patrones. Por eso estudia ciertas '
                                      'magias a fin de lograr justicia.',
                          'review': 'Alocada comedia gore, con permanentes dosis de humor negro y bizarro, un '
                                    'imperdible spot publicitario al comienzo, y hasta con historia de amor incluida, '
                                    'por parte de la aquí guionista, directora, productora, camarógrafa y coencargada '
                                    'de réplicas de FX, Georgina Zanardi, quien nos visitara el pasado festival, a '
                                    'propósito de su corto La noche de los perros de mierda (2012). En el reparto '
                                    '(extras incluidos) aparecen caras conocidas de la productora argentina Gorevision '
                                    '(la saga Sadomaster, la premiada Goretech: Bienvenidos al planeta Hijo de Puta ).',
                          'credits': 'Guión y Dirección: Georgina Zanardi. Con Vic Cicuta, Fabián Pollo Moreno, Daniel '
                                     'Christ, María Cecilia Bon, Paul Divano. Duración: 82 minutos'}]},
              {'name': 'COMPETENCIA OFICIAL DE CORTOMETRAJES / SHORT FILMS OFFICIAL COMPETITION',
               'type': 'shorts',
               'films': [{'title': 'Agophobia',
                          'country': 'Canadá',
                          'year': 2013,
                          'duration': 24,
                          'director': 'Benjamin Ross Hayden',
                          'synopsis': 'Un tiempo más allá de la humanidad, donde lo digital se manifiesta en todas sus '
                                      'formas. Un futuro donde la tecnología lo controla todo. Seres perdidos '
                                      'deambulan por sus dominios. Pero hay uno dispuesto a enfrentarla para escapar '
                                      'de ese mundo. Seleccionado para Cannes.',
                          'review': '',
                          'credits': 'Dirección: Benjamin Ross Hayden. Guión: Tyler Pierce Hayden. Con Kevin Fraser, '
                                     'Nicole Bruce, Julie Cho. Duración: 24 minutos'},
                         {'title': 'Al otro lado',
                          'country': 'España',
                          'year': 2013,
                          'duration': 19,
                          'director': 'Alicia Albares',
                          'synopsis': 'La escritora Sara Sanabria y su amante, Adolfo Santolaya, vivieron consumidos '
                                      'por una única obsesión: el convencimiento de que, oculto en una casa '
                                      'abandonada, existía un portal que comunicaba con una dimensión desconocida. '
                                      'Siguiendo los pasos de su profesor ya retirado, Enrique llegará al lugar donde '
                                      'se perdió la pista de los jóvenes. Lo recibirá un extraño anciano que guarda '
                                      'muchos secretos y que le sumergirá en la leyenda de Sara. Ganadora de 8 premios '
                                      'en festivales de España y Estados Unidos.',
                          'review': '',
                          'credits': 'Guión y Dirección: Alicia Albares. Con William Miller, Xenia Sevillano, Ramón '
                                     'Barea. Duración: 19 minutos'},
                         {'title': 'Blackout',
                          'country': 'Argentina',
                          'year': 2012,
                          'duration': 12,
                          'director': 'Marcelo Pessino',
                          'synopsis': 'Una ola de asesinatos a mujeres desvela a la policía local. La crisis '
                                      'matrimonial de Julia la está afectando psicológicamente, hasta hacerla pensar '
                                      'que su marido es el asesino serial dispuesto a matarla. ¿Buscará ayuda '
                                      'profesional para tratarse, o intentará defenderse por sí misma? ¿Podrá superar '
                                      'estos fantasmas o sus sospechas son ciertas?',
                          'review': '',
                          'credits': 'Guión y Dirección: Marcelo Pessino. Con Pilar Casanova, Vanina Balena, Clarisa '
                                     'Gatell. Duración: 12 minutos'},
                         {'title': 'Candy Hearts',
                          'country': 'España',
                          'year': 2013,
                          'duration': 15,
                          'director': 'Joan Martín Giménez',
                          'synopsis': 'Un niño, víctima de un deprimente espectáculo ambulante, y una niña, '
                                      'aparentemente frágil, vivirán una noche de terror en el pueblo de Krauss, '
                                      'cuando Conrad, el viejo vendedor de caramelos, se obsesione con la joven.',
                          'review': '',
                          'credits': 'Guión y Dirección: Joan Martín Giménez. Duración: 15 minutos'},
                         {'title': 'Decapoda Shock',
                          'country': 'España',
                          'year': 2011,
                          'duration': 9,
                          'director': 'Javier Chillón',
                          'synopsis': 'Un astronauta regresa a la Tierra, tras un fatal incidente en un lejano '
                                      'planeta. Cuando descubre que ha sido víctima de una siniestra corporación, '
                                      'emprende una venganza contra los responsables de la desaparición de su familia. '
                                      'Ganadora de más de 30 premios internacionales.',
                          'review': '',
                          'credits': 'Guión y Dirección: Javier Chillón. Con Federico Martin, Benito Sagredo, José '
                                     'Antonio Fuentes. Duración: 9 minutos'},
                         {'title': 'Doppelganger',
                          'country': 'Argentina',
                          'year': 2013,
                          'duration': 12,
                          'director': 'Carla García Buforn',
                          'synopsis': 'Elisa, una joven pintora, comienza una nueva etapa en su vida, al mudarse con '
                                      'su pareja. Pero toda su felicidad se verá opacada cuando revisando las '
                                      'habitaciones rescate del olvido un espejo. Ella no sabe que ese objeto '
                                      'despertará un espectro dormido que empezará a acechar desde las sombras.',
                          'review': '',
                          'credits': 'Dirección: Carla García Buforn. Guión: Edison E. Ávila, Juan Pablo Mazzini, CGB. '
                                     'Con Sabrina Darowski, Ezequiel de Almeida, Alfredo Zubieta. Duración: 12 '
                                     'minutos'},
                         {'title': 'EC4',
                          'country': 'Uruguay',
                          'year': 2013,
                          'duration': 9,
                          'director': 'Antony Blanco, Facundo Sosa',
                          'synopsis': 'Siempre supimos que no estábamos solos. Siempre. Un oficinista ve cómo su '
                                      'rutinaria vida es invadida por una extraña presencia que lo acecha día y noche. '
                                      'En su mundo, en su casa… En su habitación.',
                          'review': '',
                          'credits': 'Dirección: Antony Blanco, Facundo Sosa. Guión: FS. Con Joaquín Vallés. Duración: '
                                     '9 minutos'},
                         {'title': 'Eco',
                          'country': 'Uruguay',
                          'year': 2013,
                          'duration': 13,
                          'director': 'Marcos Rivero',
                          'synopsis': 'Pablo (Franco Rilla), un joven de 20 años, llega a su casa, luego de hacer las '
                                      'compras. Al dormir, comienza a sentir extraños sonidos que lo van a atormentar '
                                      'en esa oscura noche.',
                          'review': '',
                          'credits': 'Guión y Dirección: Marcos Rivero. Con Franco Rilla, Duración: 13 minutos'},
                         {'title': 'El ajedrez no es un juego de caballeros',
                          'country': 'Uruguay',
                          'year': 2013,
                          'duration': 15,
                          'director': 'Marcelo Fabani',
                          'synopsis': 'Luis y Félix apuestan sus órganos sanos en una partida de ajedrez. Quien la '
                                      'gane, ganará el órgano que necesita para seguir viviendo.',
                          'review': '',
                          'credits': 'Guión y Dirección: Marcelo Fabani. Con Carlos Lissardy, Pedro Uhalde, Jorge '
                                     'Bonaldi. Duración: 15 minutos'},
                         {'title': 'El cuarto',
                          'country': 'Argentina',
                          'year': 2012,
                          'duration': 19,
                          'director': 'Christian M. Fernández',
                          'synopsis': 'Lina y Diego conforman una joven pareja que se ha mudado recientemente a una '
                                      'gran casa. Ella parece adaptarse apaciblemente a su nuevo entorno, pero el '
                                      'llanto de un bebé proveniente de un misterioso cuarto desata extraños sucesos '
                                      'que transforman su vida en una verdadera pesadilla.',
                          'review': '',
                          'credits': 'Guión y Dirección: Christian M. Fernández. Con María Viau, Hernán Brendani, '
                                     'Exequiel Abreu. Duración: 19 minutos'},
                         {'title': 'El increíble Trueno Escarlata',
                          'country': 'España',
                          'year': 2012,
                          'duration': 14,
                          'director': 'David Macián',
                          'synopsis': 'Trueno Escarlata es el superhéroe que nunca descansa. Protege la ciudad, '
                                      'previene el crimen y a ayuda a los más necesitados. O eso dice. Ganadora de 2 '
                                      'premios, en Francia y España.',
                          'review': '',
                          'credits': 'Dirección: David Macián. Guión: DM, David Muñóz. Con Bruto Pomeroy, Alba García, '
                                     'Silvia Casanova. Duración: 14 minutos'},
                         {'title': 'El santuario',
                          'country': 'Uruguay',
                          'year': 2013,
                          'duration': 20,
                          'director': 'Marco Bentancor',
                          'synopsis': 'Al caer la noche, los habitantes de un pueblo maldito perdido en el campo '
                                      'sufren la inexplicable muerte de sus gallinas. Éstos, en el intento de '
                                      'encontrar un culpable dan con Rúben, un extraño hombre que desde hace un tiempo '
                                      'mantiene encerrado a su hermano, a quién alecciona en nombre de Dios por '
                                      'sucumbir a la gula debido a su afección por los huevos de gallina.',
                          'review': '',
                          'credits': 'Guión y Dirección: Marco Bentancor. Con Roberto Suárez, Néstor Guzzini, Oscar '
                                     'Pernas. Duración: 20 minutos'},
                         {'title': 'El traje de Zé (O Terno do Zé)',
                          'country': 'Brasil',
                          'year': 2012,
                          'duration': 21,
                          'director': 'Fabiano Soares',
                          'synopsis': 'Flavio es un cineasta que quiere volverse famoso. Y para eso prueba hasta con '
                                      'cosas en las que no cree, como ir a un santero para pedirle ayuda.',
                          'review': '',
                          'credits': 'Guión y Dirección: Fabiano Soares. Con Carlo Mossy, Antonio Pitanga, Marc '
                                     'Franken. Duración: 21 minutos'},
                         {'title': 'Encosto',
                          'country': 'Brasil',
                          'year': 2013,
                          'duration': 7,
                          'director': 'Joel Caetano',
                          'synopsis': 'Después de realizar un ritual de magia negra, un hombre descubre que el precio '
                                      'de sus deseos puede ser demasiado alto.',
                          'review': '',
                          'credits': 'Guión y Dirección: Joel Caetano. Con JC, Crispin Thomas. Duración: 7 minutos'},
                         {'title': 'Eutanas S.A.',
                          'country': 'España',
                          'year': 2013,
                          'duration': 10,
                          'director': 'Víctor Nores',
                          'synopsis': '¿Quiere morir del mismo modo que su ídolo musical? ¿Imitar la muerte de esa '
                                      'escena memorable de la gran pantalla? Eutanas S. A. ofrece el descanso eterno '
                                      'para aquellos que desean, por necesidad o capricho, poner punto y final a sus '
                                      'vidas, de un modo legítimamente espectacular. Ganadora de 4 premios en '
                                      'festivales de España y México.',
                          'review': '',
                          'credits': 'Guión y Dirección: Víctor Nores. Con Amparo Baró, Balbino Lacosta, Alba Ferrara. '
                                     'Duración: 10 minutos'},
                         {'title': 'Exodis',
                          'country': 'Uruguay',
                          'year': 2012,
                          'duration': 5,
                          'director': 'Gabriel Zang',
                          'synopsis': 'Erin, una sobreviviente a un cataclismo, intenta escapar con su hija de la '
                                      'desolación y destrucción total de su planeta.',
                          'review': '',
                          'credits': 'Dirección: Gabriel Zang. Guión: GZ, Diana Zang. Con DZ, Erin Zang, Mathías '
                                     'Ayala. Duración: 5 minutos'},
                         {'title': 'Fist of Jesus',
                          'country': 'España',
                          'year': 2012,
                          'duration': 15,
                          'director': 'Adrián Cardona, David Muñóz',
                          'synopsis': 'Jesús siempre está dispuesto a dar una mano a los necesitados. Pero hay otros… '
                                      'que van a probar su puño. Ganadora de más de 15 premios internacionales.',
                          'review': '',
                          'credits': 'Dirección: Adrián Cardona, David Muñóz. Guión: DM. Con Marc Velasco, Noé '
                                     'Blancafort, Salvador Llós. Duración: 15 minutos'},
                         {'title': 'Fuerco: El puerco de fuego',
                          'country': 'Uruguay',
                          'year': 2012,
                          'duration': 4,
                          'director': 'Pablo Praino',
                          'synopsis': 'Un encendido puerco mutante en busca de justicia porcina. Solo su némesis, '
                                      'Ragua, la rana de agua, le hará frente… –',
                          'review': '',
                          'credits': 'Guión y Dirección: Pablo Praino. Duración: 4 minutos'},
                         {'title': 'Grieta en la oscuridad',
                          'country': 'España',
                          'year': 2013,
                          'duration': 20,
                          'director': 'Xavi Rull',
                          'synopsis': 'Carlos es un escritor joven decidido a descubrir qué ha ocurrido con su mentor, '
                                      'Ángel Millán, quien ahora está en boca de todos por su última y polémica '
                                      'trilogía. Al hacerle una visita, descubre que en su casa habita un personaje '
                                      'siniestro y extraño.',
                          'review': '',
                          'credits': 'Dirección: Xavi Rull. Guión: María Costa Rocher. Con Roger Berruezo, Ferrán '
                                     'Rañe, Jordi Cadellans. Duración: 20 minutos'},
                         {'title': 'Heaven & Hell',
                          'country': 'México',
                          'year': 2013,
                          'duration': 6,
                          'director': 'Salomón Askenazi',
                          'synopsis': 'Basado en un cuento cabalístico, el trabajo demuestra la diferencia de los dos '
                                      'mundos, el cielo y el infierno. Una simple acción puede ser toda la diferencia '
                                      'entre el bien y el mal, así como la felicidad y el sufrimiento.',
                          'review': '',
                          'credits': 'Guión y Dirección: Salomón Askenazi. Con Martín Villasana, Jorge Alfonso '
                                     'Solares, Eduardo Jiménez. Duración: 6 minutos'},
                         {'title': 'Hibernation',
                          'country': 'España',
                          'year': 2012,
                          'duration': 17,
                          'director': 'Jon Mikel Caballero',
                          'synopsis': 'Joseph es un astronauta llamado a llegar donde ningún otro hombre ha llegado en '
                                      'el Universo, gracias al programa “Hibernation”. Pero algo surge entre él y su '
                                      'instructora Claire, y las decisiones que parecían inquebrantables comienzan a '
                                      'agrietarse. La cuenta atrás ha comenzado.',
                          'review': '',
                          'credits': 'Dirección: Jon Mikel Caballero. Guión: JMC, Eric Navarro. Con Adam Quintero, '
                                     'Manuela Velles, Simon Brading. Duración: 17 minutos'},
                         {'title': 'Horizonte',
                          'country': 'España',
                          'year': 2012,
                          'duration': 23,
                          'director': 'Aitor Uribarri',
                          'synopsis': 'El mundo conocido acabó; sólo quedan sus cenizas. En un intento para reunir a '
                                      'la familia, Ana y su madre emprenden un peligroso viaje en el que tendrán que '
                                      'hacer frente a los monstruos que ahora pueblan la Tierra y a uno más peligroso, '
                                      'el que todos llevamos dentro. Seleccionada para Sitges. Ganadora de 5 premios '
                                      'en festivales de España, Italia y México.',
                          'review': '',
                          'credits': 'Guión y Dirección: Aitor Uribarri. Con Ana Fernández, Claudia Vega, Manuel '
                                     'Morón. Duración: 23 minutos'},
                         {'title': 'La Casta',
                          'country': 'España',
                          'year': 2013,
                          'duration': 17,
                          'director': 'Raúl Tejera, Víctor Tejera',
                          'synopsis': 'España como primera potencia mundial en corrupción política. Un acto '
                                      'terrorista, un despertar. La Casta no está dispuesta a perder sus privilegios, '
                                      'pero su “solución definitiva” está fuera de control.',
                          'review': '',
                          'credits': 'Dirección: Rául Tejera, Víctor Tejera. Guión: VT. Con Fermín Casado, VT, Silvia '
                                     'Gómez. Duración: 17 minutos'},
                         {'title': 'La huída',
                          'country': 'Uruguay',
                          'year': 2013,
                          'duration': 6,
                          'director': 'Gastón Gava',
                          'synopsis': 'Luego de un ataque químico a una ciudad, el último hombre en pie luchará contra '
                                      'unas naves que le persiguen.',
                          'review': '',
                          'credits': 'Guión y Dirección: Gastón Gava. Duración: 6 minutos',
                          'source_year': '2012-2013'},
                         {'title': 'La luz del mundo',
                          'country': 'España',
                          'year': 2012,
                          'duration': 16,
                          'director': 'Alfonso García, Fernando J. Martínez',
                          'synopsis': 'El futuro. La humanidad ha abandonado las ciudades y vive bajo tierra, donde ha '
                                      'perdido la facultad de ver y, además, ha olvidado que alguna vez la tuvo. '
                                      'Cuando algunos recuperan esta facultad son tachados de enfermos por el '
                                      'gobierno, y vuelven a las ciudades donde una vez habitó la raza humana, '
                                      'encontrando una amenaza latente durante generaciones. Premio a Mejor Guión en '
                                      'el Angry Film Festival, de Australia.',
                          'review': '',
                          'credits': 'Dirección: Alfonso García, Fernando J. Martínez. Guión: FJM, Alberto Murcia. Con '
                                     'Marina Durante, Javier Ramírez, Irene García. Duración 16 minutos'},
                         {'title': 'La mujer rota',
                          'country': 'Uruguay',
                          'year': 2013,
                          'duration': 8,
                          'director': 'Jeremías Segovia',
                          'synopsis': 'Una mujer gravemente herida llega a un edificio y se dirige al último piso…¿Qué '
                                      'le sucedió? ¿Cuál es su propósito? Ganador a la mejor narrativa de cortometraje '
                                      'en el San Diego Latino Film Festival y en el festival de cortos Mecal, de '
                                      'Chile.',
                          'review': '',
                          'credits': 'Dirección: Jeremías Segovia. Guión: JS, Gonzalo Torrens. Con Gabriela Iribarren, '
                                     'César Troncoso, Angel Villar. Duración: 8 minutos'},
                         {'title': 'Lovbot Love (El robot del amor)',
                          'country': 'Argentina',
                          'year': 2013,
                          'duration': 11,
                          'director': 'Gabriela C. Chirife, Tetsuo Lumière',
                          'synopsis': 'Un joven argentino está obsesionado con Corea. Ama su comida, sus películas, '
                                      'sus bandas de pop adolescente y sus mujeres. Sufre por no tener una novia de '
                                      'ese país, hasta que un día se compra una bella robot coreana y su vida cambia '
                                      'para siempre.',
                          'review': '',
                          'credits': 'Dirección: Gabriela C. Chirife, Tetsuo Lumière. Guión: TL. Con TL, Haien Qiu, '
                                     'Andres Park. Duración: 11 minutos'},
                         {'title': 'M is for Multiverse Apathy (Mierda!)',
                          'country': 'Uruguay',
                          'year': 2013,
                          'duration': 3,
                          'director': 'Santi González',
                          'synopsis': 'Una ciudad enfrenta una crisis apocalíptica, mientras en algún otro lugar del '
                                      'Multiverso la tecnología del Dr.Schlump soluciona uno de los problemas más '
                                      'antiguos de la humanidad civilizada.',
                          'review': '',
                          'credits': 'Dirección: Santi González. Guión: Pablo González, SG, sobre idea original del '
                                     'primero. Con Bruno Conti, Courtney Hopkin, David Lee Hess. Duración: 3 minutos'},
                         {'title': 'Perseo',
                          'country': 'Argentina',
                          'year': 2012,
                          'duration': 9,
                          'director': 'María Florencia Sosa',
                          'synopsis': 'Malena vive con su gato Perseo en un antiguo edificio de Buenos Aires. Su vida '
                                      'es tranquila. Sin embargo, hay una vecina cuya presencia la inquieta. Un día, '
                                      'Perseo no aparece por ningún lado. Al llamarlo, Malena percibe maullidos y un '
                                      'ruido extraño. Perseo desapareció. Ella presiente lo que le pasó.',
                          'review': '',
                          'credits': 'Guión y Dirección: María Florencia Sosa. Con Soledad Tielens, Cristina Sisca. '
                                     'Duración: 9 minutos'},
                         {'title': 'Room',
                          'country': 'Uruguay',
                          'year': 2013,
                          'duration': 3,
                          'director': 'Kevin Grassi',
                          'synopsis': 'Un joven prepara en su cuarto un video personal para YouTube , cuando la madre '
                                      'lo llama y se va. Cuando vuelve se encuentra con su oscuro destino.',
                          'review': '',
                          'credits': 'Guión y Dirección: Kevin Grassi. Duración: 3 minutos'},
                         {'title': 'Veritas (La verdad)',
                          'country': 'España',
                          'year': 2013,
                          'duration': 22,
                          'director': 'Jesús Llongueras',
                          'synopsis': 'Jo presencia una escena de violencia entre un hombre y su mujer en una '
                                      'gasolinera a altas horas de la madrugada. Decide seguirles. Esa decisión la '
                                      'llevará a adentrarse en un mundo oscuro y extraño en el que deberá tomar duras '
                                      'decisiones para escapar de él.',
                          'review': '',
                          'credits': 'Guión y Dirección: Jesús Llongueras. Con Patricia Bargallo, Carles Bigorra, '
                                     'Ivana Miño. Duración: 22 minutos'},
                         {'title': 'Video Massacre',
                          'country': 'Uruguay',
                          'year': 2013,
                          'duration': 16,
                          'director': 'Miguel Torena',
                          'synopsis': 'Corre el año 2007; dos jóvenes llegan a Montevideo para encontrarse con una '
                                      'amiga, llevando consigo una cámara VHS con la cual filman todo lo que sucede, '
                                      'sin saber lo que estarán a punto de filmar. Tal vez sea su propia muerte.',
                          'review': '',
                          'credits': 'Guión y Dirección: Miguel Torena. Con Carla Aguilera, Alisson Perdomo, Kimberly '
                                     'Viana. Duración: 16 minutos'},
                         {'title': 'Vienna Waits for You',
                          'country': 'Austria',
                          'year': 2012,
                          'duration': 26,
                          'director': 'Dominik Hartl',
                          'synopsis': 'Luego de separarse de su novio, Ana busca un lugar para estar tranquila y poder '
                                      'recuperarse. Encuentra un viejo apartamento vienés, pero tendrá que tener '
                                      'cuidado con la letra chica, al momento de firmar el contrato. Una extraña '
                                      'presencia en el lugar la va enloqueciendo gradualmente. Y la única manera de '
                                      'escapar será encontrando otro inquilino… Premio a Mejor Dirección y Actriz en '
                                      'el Festival de Cine de Shanghai (China).',
                          'review': '',
                          'credits': 'Dirección: Dominik Hartl. Guión: Sarah Wassermair. Con Petra Staduan, Alexander '
                                     'Fennon, Traute Furthner. Duración: 26 minutos'},
                         {'title': 'Y la muerte lo seguía',
                          'country': 'España',
                          'year': 2012,
                          'duration': 21,
                          'director': 'Ángel Gómez Hernández',
                          'synopsis': 'El joven Johnny es testigo de excepción del insólito relato narrado por un '
                                      'viejo indio, sobre las desventuras de Fred Carlson, un pistolero que buscó '
                                      'durante dos años al asesino de su esposa y cuya persecución concluyó en un '
                                      'misterioso poblado. ¿Se trata en realidad de una fábula más, de otra leyenda '
                                      'para contar a los más jóvenes, deseosos de historias terroríficas y '
                                      'sobrenaturales? Premio a Mejor Corto en Grecia. Seleccionado para Sitges.',
                          'review': '',
                          'credits': 'Guión y Dirección: Ángel Gómez Hernández. Con José María Galeano, Peter Van '
                                     'Randen, Laurence Burton. Duración: 21 minutos'},
                         {'title': 'Zombirama',
                          'country': 'Argentina',
                          'year': 2012,
                          'duration': 7,
                          'director': 'Nano Benayón',
                          'synopsis': 'El 24 de marzo de 1976 comienza en Argentina un proceso dictatorial. Durante 7 '
                                      'años el gobierno militar mata a 30.000 personas e instala un sistema perverso '
                                      'de injusticias sociales y económicas. Coincidentemente en ese mismo día Buenos '
                                      'Aires es invadida por un grupo de zombis. La plaga va creciendo, tiñendo a la '
                                      'ciudad de terror y desolación, encontrando su punto culmine en los años ´90.',
                          'review': '',
                          'credits': 'Dirección: Nano Benayón. Guión: NB, Ariel López V. Duración: 7 minutos'},
                         {'title': 'Aislado',
                          'country': 'Uruguay',
                          'year': 2013,
                          'duration': 35,
                          'director': 'Christian Roquero',
                          'synopsis': 'Un grupo de estudiantes descubre accidentalmente un cráneo enterrado en el '
                                      'patio del lugar donde toman sus clases. A partir de ese momento una de las '
                                      'alumnas comienza a recibir extraños mensajes en su celular mientras chatea. '
                                      'Todo parece indicar que la persona que se comunica con ella había fallecido '
                                      'años atrás. Y su morada es uno de los salones de clase.',
                          'review': '',
                          'credits': 'Dirección: Christian Roquero. Guión: Christian Roquero, basado en cuentos de '
                                     'Leonel Ramos, Mónica Fernández Montero, Javier Sánchez, Alexander Lens, Santiago '
                                     'Sosa, Jonathan Acosta, Sebastián García, Santiago Dodera. Duración: 35 minutos.',
                          'work_type': 'medium'}]},
              {'name': 'MUESTRA INFORMATIVA DE CORTOMETRAJES / SHORT FILMS INFORMATIVE SESSION',
               'type': 'shorts',
               'films': [{'title': '¿Alguna vez te has cortado el cabello con máquina? (Você já cortou seu cabelo com '
                                   'maquininha?)',
                          'country': 'Brasil',
                          'year': 2012,
                          'duration': 23,
                          'director': 'Gabriel Buéssio, Marilia Hanashiro',
                          'synopsis': '',
                          'review': '',
                          'credits': ''},
                         {'title': 'Androginia',
                          'country': 'España',
                          'year': 2013,
                          'duration': 14,
                          'director': 'Daniel Matesanz',
                          'synopsis': '',
                          'review': '',
                          'credits': ''},
                         {'title': 'Desniveles',
                          'country': 'Uruguay',
                          'year': 2006,
                          'duration': 6,
                          'director': 'Marcelo Fabani',
                          'synopsis': '',
                          'review': '',
                          'credits': ''},
                         {'title': 'Deus Irae',
                          'country': 'Argentina',
                          'year': 2011,
                          'duration': 14,
                          'director': 'Pedro Cristiani',
                          'synopsis': '',
                          'review': '',
                          'credits': '',
                          'source_year': '2010-2011'},
                         {'title': 'Don Quijote y los demonios',
                          'country': 'España',
                          'year': 2012,
                          'duration': 16,
                          'director': 'Simón Fariza',
                          'synopsis': '',
                          'review': '',
                          'credits': ''},
                         {'title': 'Edde 12',
                          'country': 'España',
                          'year': 2013,
                          'duration': 14,
                          'director': 'Hose Akuntansi',
                          'synopsis': '',
                          'review': '',
                          'credits': ''},
                         {'title': 'El brote',
                          'country': 'Argentina',
                          'year': 2013,
                          'duration': 13,
                          'director': 'Roberto Ruiz',
                          'synopsis': '',
                          'review': '',
                          'credits': ''},
                         {'title': 'Erivaldo: El astronauta místico (Erivaldo: O Astronauta Místico)',
                          'country': 'Australia / Brasil',
                          'year': 2013,
                          'duration': 6,
                          'director': 'Gurcius Gewdner',
                          'synopsis': '',
                          'review': '',
                          'credits': ''},
                         {'title': 'Expediente 19/02',
                          'country': 'España',
                          'year': 2013,
                          'duration': 23,
                          'director': 'Bernardo Hernández',
                          'synopsis': '',
                          'review': '',
                          'credits': ''},
                         {'title': 'Feliz cumpleaños',
                          'country': 'Uruguay',
                          'year': 2012,
                          'duration': 18,
                          'director': 'Marcelo Fabani',
                          'synopsis': '',
                          'review': '',
                          'credits': ''},
                         {'title': 'Los asesinatos de la Noche Roja',
                          'country': 'Colombia',
                          'year': 2013,
                          'duration': 22,
                          'director': 'Vincent Gil',
                          'synopsis': '',
                          'review': '',
                          'credits': ''},
                         {'title': 'Muerte y muerte de Johnny Zombie (Morte e morte de Johnny Zombie)',
                          'country': 'Brasil',
                          'year': 2011,
                          'duration': 14,
                          'director': 'Gabriel Carneiro',
                          'synopsis': '',
                          'review': '',
                          'credits': ''},
                         {'title': 'Noche de horror',
                          'country': 'Argentina',
                          'year': 2012,
                          'duration': 8,
                          'director': 'Juan Carlos Clemente',
                          'synopsis': '',
                          'review': '',
                          'credits': ''},
                         {'title': 'Ómnibus 48',
                          'country': 'Uruguay',
                          'year': 2003,
                          'duration': 15,
                          'director': 'Marcelo Fabani',
                          'synopsis': '',
                          'review': '',
                          'credits': '',
                          'source_year': '2001-2003'},
                         {'title': 'Oscuridad blanca',
                          'country': 'España',
                          'year': 2013,
                          'duration': 15,
                          'director': 'Rodolfo Herrero',
                          'synopsis': '',
                          'review': '',
                          'credits': ''},
                         {'title': 'Silent Agony',
                          'country': 'España',
                          'year': 2012,
                          'duration': 16,
                          'director': 'Octavi Espuga',
                          'synopsis': '',
                          'review': '',
                          'credits': ''},
                         {'title': 'Uno Once Doce',
                          'country': 'Argentina',
                          'year': 2013,
                          'duration': 3,
                          'director': 'Juan Pablo Mazzini',
                          'synopsis': '',
                          'review': '',
                          'credits': ''}]}],
 'source_notes': ['Fechas 10–15 de diciembre confirmadas por el MEC y prensa contemporánea.',
                  'Aislado incorporado como participación oficial a partir del anuncio contemporáneo del MEC; no '
                  'aparecía en el HTML retrospectivo.',
                  'Largo fin de semana figura como exhibición homenaje en la crónica; runtime normalizado a 92 min con '
                  'fuente externa de referencia (MoMA).',
                  'Dios local fue un adelanto con charla y no se modela como Work.',
                  'Rangos de año se normalizan al año final para Work.production_year y se preservan en source_year.']}
