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
    description: "Galapage est un beau cheval au tempérament calme.",
  },
  {
    name: "Keyshan",
    image: "/animals/keyshan.jpg",
    description: "Keyshan est connu pour sa vitesse et son agilité.",
  },
  {
    name: "Risa",
    image: "/animals/risa.jpg",
    description:
      "Très gentille Espagnole de 19 ans polyvalente tonique et très attachante",
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
      "Camargue de 20 ans très tonic, adore l'obstacle et le cross, parfois coquin pour les confirmés",
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
    description: "Coco est petit mais plein d'énergie et de curiosité.",
  },
  {
    name: "Ebene",
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
    description: "Espoir est plein d'espoir et a une disposition douce.",
  },
  {
    name: "Kloé",
    image: "/animals/kloe.jpg",
    description:
      "Très gentille jument New Forest de 26 ans polyvalente, calme, pour les débutants ",
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
    description: "Qaiwain est unique et aime explorer de nouveaux endroits.",
  },
  {
    name: "Topcool",
    image: "/animals/topcool.jpg",
    description: "Topcool est toujours calme et posé.",
  },
];

export const retiredAnimals: Animal[] = [
  {
    name: "Nuage",
    image: "/animals/nuage.jpg",
    description:
      "Nuage est retraité mais aime toujours les promenades tranquilles.",
  },
  {
    name: "Yuca",
    image: "/animals/yuca.jpg",
    description:
      "Yuca est une favorite parmi les visiteurs pour sa nature douce.",
  },
  {
    name: "Faena",
    image: "/animals/faena.jpg",
    description: "Faena est élégante et a un comportement très calme.",
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
    description: "Jingua, la compagnone d'Ulan.",
  },
  {
    name: "Poules",
    image: "/animals/hens.jpg",
    description: "Nos poules",
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
