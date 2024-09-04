// animals.ts

export interface Animal {
  name: string;
  image: string;
  description: string;
}

export const horses: Animal[] = [
  {
    name: "Galapage",
    image: "/animals/galapage.jpg",
    description:
      "Pur sang de 23 ans très sensible et délicat, non monté par les élèves",
  },
  {
    name: "Keyshan",
    image: "/animals/keyshan.jpg",
    description:
      "Jument anglo Arabe de 26 ans qui adore le travail à pied et les câlins. Retraitée depuis sa tendinite ",
  },
  {
    name: "Risa",
    image: "/animals/risa.jpg",
    description:
      "Très gentille Espagnole de 19 ans polyvalente tonique et très attachante",
  },
  {
    name: "Kloé",
    image: "/animals/kloe.jpg",
    description:
      "Très gentille jument New Forest de 26 ans polyvalente, calme, parfaite pour les débutants ",
  },
];

export const ponies: Animal[] = [
  {
    name: "Bamby",
    image: "/animals/bamby.jpg",
    description: "20 ans, sensible, il a besoin d'un cavalier calme",
  },
  {
    name: "Quaquou",
    image: "/animals/quaquou.jpg",
    description:
      "Camargue de 20 ans très tonique, adore l'obstacle et le cross, parfois coquin pour les confirmés",
  },
  {
    name: "Karamel",
    image: "/animals/karamel.jpg",
    description:
      "20 ans, c'est le plus câlin du club. Poney adorable et polyvalent pour les plus grands",
  },
  {
    name: "Casper",
    image: "/animals/casper.jpg",
    description:
      "Jeune Irish Cob de 7ans polyvalent, parfois coquin en exterieur et très câlin",
  },
  {
    name: "Clochette",
    image: "/animals/clochette.jpg",
    description: "Ponette de 13 ans qui a du caractère et est très tonique",
  },
  {
    name: "Coco",
    image: "/animals/coco.jpg",
    description: "Shetland de 19 ans joueur et tonique ",
  },
  {
    name: "Ebène",
    image: "/animals/ebene.jpg",
    description: "Gentil poney de 22 ans qui a du rebond pour les plus grands ",
  },
  {
    name: "Elite",
    image: "/animals/elite.jpg",
    description: "Très gentil shetland de 19 ans, calme et appliqué ",
  },
  {
    name: "Espoir",
    image: "/animals/espoir.jpg",
    description:
      "Très bon poney de 17 ans en pleine forme, polyvalent, affectueux, monté par des cavaliers débutants et confirmés ",
  },
  {
    name: "Malabar",
    image: "/animals/malabar.jpg",
    description:
      "26 ans, c'est le plus petit poney du club. Il est tonique et facile à diriger pour les plus petits ",
  },
  {
    name: "Mirah",
    image: "/animals/mirah.jpg",
    description:
      "Jeune Irish Cob de 8 ans une valeur sûre pour mettre en confiance, tous niveaux ",
  },
  {
    name: "Paillette",
    image: "/animals/paillette.jpg",
    description:
      "Ponette de 21 ans, très compétente mais qui a de l'arthrose au jarret, ne fait plus que des promenades en main",
  },
  {
    name: "Qaiwain",
    image: "/animals/qaiwain.jpg",
    description:
      "Beau New Forest de 20 ans, plein de force, intelligent. Généralement monté par des cavaliers confirmés ou pris pour du travail à pied",
  },
  {
    name: "Topcool",
    image: "/animals/topcool.jpg",
    description:
      "Très bon poney Belge de sport, très tonique, il a du caractère. Surtout monté par des cavaliers confirmés ",
  },
];

export const retiredAnimals: Animal[] = [
  {
    name: "Nuage",
    image: "/animals/nuage.jpg",
    description:
      "Meilleur poney Camargue de voltige ! Aujourd'hui retraité de 30 ans ",
  },
  {
    name: "Yucca",
    image: "/animals/yucca.jpg",
    description:
      "Ponette B de 25 ans retraitée depuis cette année à cause d'une luxation de la hanche",
  },
  {
    name: "Faena",
    image: "/animals/faena.jpg",
    description:
      "Adorable jument Camargue de 31 ans retraitée depuis l'âge de 25 ans à cause d'une fourbure, aujourd'hui atteinte de la maladie de Cushing et d'une uvéite ",
  },
];

export const otherAnimals: Animal[] = [
  {
    name: "Ulan",
    image: "/animals/ulan.jpg",
    description:
      "Ulan est un berger du Caucase, toujours avec Jingua et très doux malgré sa taille imposante",
  },
  {
    name: "Jingua",
    image: "/animals/jingua.jpg",
    description: "Jingua, la compagnone d'Ulan, calme et très gentille.",
  },
  {
    name: "Poules",
    image: "/animals/hens.jpg",
    description: "Nos poules du club, souvent avec Jason et Fanny",
  },
  {
    name: "Jason",
    image: "/animals/jason.jpg",
    description: "Jason est le bouc du club, toujours accompagné de Fanny",
  },
  {
    name: "Fanny",
    image: "/animals/fanny.jpg",
    description: "Fanny est la chèvre du club, adore les câlins",
  },
];
