export interface JuryMember {
  id: string;
  name: string;
  image: string;
  objectPosition?: string;
  bio: { es: string; en: string; pt: string };
}

export interface JurySection {
  id: string;
  title: { es: string; en: string; pt: string };
  subtitle: { es: string; en: string; pt: string };
  members: JuryMember[];
}

export const JURY_SECTIONS_2026: JurySection[] = [
  {
    id: "features",
    title: {
      es: "Largometrajes",
      en: "Feature Films",
      pt: "Longas-metragens",
    },
    subtitle: {
      es: "Competencia Oficial, Competencia Iberoamericana y Competencia Uruguaya de Largometrajes",
      en: "Official Competition, Ibero-American Competition and Uruguayan Feature Film Competition",
      pt: "Competição Oficial, Competição Ibero-americana e Competição Uruguaia de Longas-metragens",
    },
    members: [
      {
        id: "maria-jose-heras",
        name: "María José Heras",
        image: "/media/jury/maria-jose-heras.jpg",
        objectPosition: "center top",
        bio: {
          es: "Artista uruguaya especializada en maquillaje de Efectos Especiales (FX), terror y fantasía, con un enfoque directo en la creación de personajes para eventos masivos, producciones visuales, teatro y avant premieres de cine. Su trabajo destaca por fusionar el realismo visceral del horror con la complejidad estética de los mundos imaginarios. Hace más de 10 años creó Fantolkienuy, comunidad de fantasía y literatura.",
          en: "Uruguayan artist specialised in Special Effects (FX) makeup, horror and fantasy, with a direct focus on character creation for mass events, visual productions, theatre and film avant premieres. Her work stands out for fusing the visceral realism of horror with the aesthetic complexity of imaginary worlds. More than 10 years ago she created Fantolkienuy, a fantasy and literature community.",
          pt: "Artista uruguaia especializada em maquiagem de Efeitos Especiais (FX), terror e fantasia, com foco direto na criação de personagens para eventos massivos, produções visuais, teatro e avant premieres de cinema. Seu trabalho se destaca por fundir o realismo visceral do horror com a complexidade estética dos mundos imaginários. Há mais de 10 anos criou a Fantolkienuy, comunidade de fantasia e literatura.",
        },
      },
      {
        id: "nacho-adda",
        name: "Nacho Adda",
        image: "/media/jury/nacho-adda.jpg",
        objectPosition: "center top",
        bio: {
          es: "Par es el proyecto musical de Nacho Adda, centrado en la exploración de la electrónica experimental y ambient. Su sonido combina texturas digitales y síntesis analógica con una sensibilidad por el espacio y el silencio. Ha editado seis discos de estudio y uno en vivo. Desde 2012 dirige sus videoclips: Paz (2012), Tardenoche (2012), Crisis (2015), Puentes (2020), Ya (2021), Atravesar (2022), Cerrazón (2023), Nuestro Hogar (2025) y Temporal (2025), integrando una dimensión audiovisual a su obra.",
          en: "Par is Nacho Adda's musical project, focused on exploring experimental and ambient electronics. His sound combines digital textures and analogue synthesis with a sensitivity for space and silence. He has released six studio albums and one live record. Since 2012 he has directed his own music videos: Paz (2012), Tardenoche (2012), Crisis (2015), Puentes (2020), Ya (2021), Atravesar (2022), Cerrazón (2023), Nuestro Hogar (2025) and Temporal (2025), integrating an audiovisual dimension into his work.",
          pt: "Par é o projeto musical de Nacho Adda, centrado na exploração da eletrônica experimental e ambient. Seu som combina texturas digitais e síntese analógica com uma sensibilidade pelo espaço e o silêncio. Editou seis discos de estúdio e um ao vivo. Desde 2012 dirige seus próprios videoclipes: Paz (2012), Tardenoche (2012), Crisis (2015), Puentes (2020), Ya (2021), Atravesar (2022), Cerrazón (2023), Nuestro Hogar (2025) e Temporal (2025), integrando uma dimensão audiovisual à sua obra.",
        },
      },
      {
        id: "valentina-starcovich",
        name: "Valentina Starcovich",
        image: "/media/jury/valentina-starcovich.jpg",
        objectPosition: "center top",
        bio: {
          es: "Internacionalista y politóloga por decisión, cinéfila por inercia. Creadora de StarcoVision y crítica en Palomita de Maíz y Cinescopia (México). En paralelo ha realizado talleres de crítica cinematográfica en Revista Taipei de Argentina, con Christian Font en la Alianza Cultural Uruguay Estados Unidos y en el Centro Cultural España con Caimán Cuadernos de Cine, además de periodismo.",
          en: "Internationalist and political scientist by choice, cinephile by inertia. Creator of StarcoVision and film critic at Palomita de Maíz and Cinescopia (Mexico). She has also led film criticism workshops at Revista Taipei in Argentina, with Christian Font at the Alianza Cultural Uruguay–United States and at the Centro Cultural España with Caimán Cuadernos de Cine, alongside journalism.",
          pt: "Internacionalista e cientista política por escolha, cinéfila por inércia. Criadora da StarcoVision e crítica na Palomita de Maíz e Cinescopia (México). Em paralelo realizou oficinas de crítica cinematográfica na Revista Taipei da Argentina, com Christian Font na Alianza Cultural Uruguay Estados Unidos e no Centro Cultural España com Caimán Cuadernos de Cine, além de jornalismo.",
        },
      },
    ],
  },
  {
    id: "shorts",
    title: {
      es: "Cortometrajes",
      en: "Short Films",
      pt: "Curtas-metragens",
    },
    subtitle: {
      es: "Competencia Oficial, Competencia Iberoamericana y Competencia Uruguaya de Cortometrajes",
      en: "Official Competition, Ibero-American Competition and Uruguayan Short Film Competition",
      pt: "Competição Oficial, Competição Ibero-americana e Competição Uruguaia de Curtas-metragens",
    },
    members: [
      {
        id: "matias-parkman",
        name: "Matías Parkman",
        image: "/media/jury/matias-parkman.jpg",
        objectPosition: "center top",
        bio: {
          es: "Nació en 1988 en Buenos Aires. Licenciado en Psicología por la Universidad de Buenos Aires. Se desempeñó como diseñador de sonido en videojuegos y cine independiente desde 2015 a 2020. Creador de contenido desde 2018 en YouTube, donde semanalmente sube contenido vinculado a la música y las artes audiovisuales.",
          en: "Born in 1988 in Buenos Aires. Holds a degree in Psychology from the University of Buenos Aires. He worked as a sound designer for video games and independent cinema from 2015 to 2020. Content creator since 2018 on YouTube, where he publishes weekly content related to music and the audiovisual arts.",
          pt: "Nasceu em 1988 em Buenos Aires. Graduado em Psicologia pela Universidade de Buenos Aires. Atuou como designer de som em videogames e cinema independente de 2015 a 2020. Criador de conteúdo desde 2018 no YouTube, onde publica semanalmente conteúdo relacionado à música e às artes audiovisuais.",
        },
      },
      {
        id: "victoria-soto",
        name: "Victoria Soto",
        image: "/media/jury/victoria-soto.jpg",
        objectPosition: "center center",
        bio: {
          es: "Es una apasionada del cine, especialmente del género de terror. Creadora de la cuenta de Instagram Cinefila.Uy, su objetivo es promover actividades relacionadas con el cine y ayudar a la comunidad a descubrir nuevas obras a través de guías, reseñas y noticias del séptimo arte.",
          en: "A passionate film lover, particularly of the horror genre. Creator of the Instagram account Cinefila.Uy, her goal is to promote film-related activities and help the community discover new works through guides, reviews and news about the seventh art.",
          pt: "Apaixonada pelo cinema, especialmente pelo gênero de terror. Criadora da conta de Instagram Cinefila.Uy, seu objetivo é promover atividades relacionadas ao cinema e ajudar a comunidade a descobrir novas obras por meio de guias, resenhas e notícias da sétima arte.",
        },
      },
      {
        id: "santiago-z-infestos",
        name: "Santiago Z. (Infestos)",
        image: "/media/jury/santiago-z-infestos.jpg",
        objectPosition: "center top",
        bio: {
          es: "Uruguayo radicado en Barcelona desde hace casi 20 años. Comenzó su viaje al fantástico de la mano de Julio Verne y ya no hubo retorno. Blade Runner y Stephen King terminaron de sellar su destino. Forma parte de El Bloque Radio desde sus inicios, con el programa de novedades Hemisferio Izquierdo y la programación musical de la emisora.",
          en: "Uruguayan based in Barcelona for nearly 20 years. His journey into the fantastic began with Jules Verne and there was no turning back. Blade Runner and Stephen King sealed his fate. He has been part of El Bloque Radio since its beginning, with the new releases programme Hemisferio Izquierdo and the station's music programming.",
          pt: "Uruguaio radicado em Barcelona há quase 20 anos. Começou sua jornada pelo fantástico com Júlio Verne e não houve retorno. Blade Runner e Stephen King selaram seu destino. Faz parte da El Bloque Radio desde o início, com o programa de novidades Hemisferio Izquierdo e a programação musical da emissora.",
        },
      },
    ],
  },
  {
    id: "medium-docs",
    title: {
      es: "Mediometrajes y documentales",
      en: "Medium-Length Films and Documentaries",
      pt: "Médias-metragens e documentários",
    },
    subtitle: {
      es: "Competencia Oficial de Mediometrajes y Documentales en Competencia",
      en: "Official Medium-Length Film Competition and Documentary Competition",
      pt: "Competição Oficial de Médias-metragens e Documentários em Competição",
    },
    members: [
      {
        id: "gabriel-llagostera",
        name: "Gabriel Llagostera",
        image: "/media/jury/gabriel-llagostera.jpg",
        objectPosition: "center top",
        bio: {
          es: "Docente y cinéfilo, divide su tiempo entre la enseñanza de la literatura tanto en centros públicos como privados, así como en desarrollar su pasión por el cine y cualquier tipo de arte que se le cruce. Docente egresado del IPA, ha realizado talleres de Análisis cinematográfico con Alex Piperno en la Escuela de Cine del Uruguay, además de Historia del cine, Historia del cine de terror y de directores varios con el docente y crítico Hernán Schell en Buenos Aires. Ha participado en podcasts culturales como Balance Negativo, Psinéfilos y Conexión Comiquera, entre otros.",
          en: "Teacher and cinephile, he divides his time between teaching literature in public and private schools and developing his passion for cinema and any form of art he encounters. A graduate of the IPA teacher training institute, he has attended film analysis workshops with Alex Piperno at the Escuela de Cine del Uruguay, as well as courses on film history, horror film history and studies on various directors with teacher and critic Hernán Schell in Buenos Aires. He has taken part in cultural podcasts such as Balance Negativo, Psinéfilos and Conexión Comiquera, among others.",
          pt: "Professor e cinéfilo, divide seu tempo entre o ensino de literatura em centros públicos e privados e o desenvolvimento de sua paixão pelo cinema e qualquer tipo de arte que cruze seu caminho. Formado pelo IPA, realizou oficinas de Análise Cinematográfica com Alex Piperno na Escuela de Cine del Uruguay, além de cursos de História do Cinema, História do Cinema de Terror e de diretores variados com o professor e crítico Hernán Schell em Buenos Aires. Participou em podcasts culturais como Balance Negativo, Psinéfilos e Conexión Comiquera, entre outros.",
        },
      },
      {
        id: "monica-talamas",
        name: "Mónica Talamás",
        image: "/media/jury/monica-talamas.jpg",
        objectPosition: "center center",
        bio: {
          es: "Nació en 1966. Desde 1997 está vinculada al medio audiovisual, donde se ha desempeñado como diseñadora de vestuario, directora de arte y vestuarista. Trabajó como guionista y co-directora en el largometraje documental Multitudes y en el corto de ficción Renato. Es docente de Vestuario en la Escuela de Cine del Uruguay para la diplomatura en Dirección de Arte.",
          en: "Born in 1966. Since 1997 she has been connected to the audiovisual world, working as a costume designer, art director and wardrobe stylist. She worked as screenwriter and co-director on the documentary feature Multitudes and the fiction short Renato. She teaches Costume Design at the Escuela de Cine del Uruguay for the Diploma in Art Direction.",
          pt: "Nasceu em 1966. Desde 1997 está vinculada ao meio audiovisual, onde atuou como designer de figurino, diretora de arte e figurinista. Trabalhou como roteirista e co-diretora no longa-metragem documental Multitudes e no curta de ficção Renato. É docente de Figurino na Escuela de Cine del Uruguay para o diploma em Direção de Arte.",
        },
      },
      {
        id: "facundo-grunullu",
        name: "Facundo Grunullú",
        image: "/media/jury/optimized/facundo-grunullu.webp",
        objectPosition: "center top",
        bio: {
          es: "Facundo Grunullú es productor y compositor con más de una década de trayectoria en la escena musical uruguaya, reconocido con un Premio Graffiti como productor de Mejor Disco de Música Electrónica. Con una marcada impronta visual, ha editado dos álbumes junto a ATZBR: Transmutar (2024) y Revolución Industrial (2026), encargándose en ambos de la identidad visual. También dirigió los videoclips de True Crime, Alfa y Omega y Transmutar.",
          en: "Facundo Grunullú is a producer and composer with over a decade of work in the Uruguayan music scene, recognised with a Premio Graffiti as producer of Best Electronic Music Album. With a strong visual sensibility, he has released two albums with ATZBR: Transmutar (2024) and Revolución Industrial (2026), handling the visual identity for both. He also directed the music videos for True Crime, Alfa y Omega and Transmutar.",
          pt: "Facundo Grunullú é produtor e compositor com mais de uma década de trajetória na cena musical uruguaia, reconhecido com um Premio Graffiti como produtor de Melhor Disco de Música Eletrônica. Com uma marcada identidade visual, lançou dois álbuns com ATZBR: Transmutar (2024) e Revolución Industrial (2026), responsabilizando-se em ambos pela identidade visual. Também dirigiu os videoclipes de True Crime, Alfa y Omega e Transmutar.",
        },
      },
    ],
  },
];
