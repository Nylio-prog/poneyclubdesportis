// animals.ts

export interface Animal {
  name: string;
  image: string;
  description: string;
  descriptionEn?: string;
  breed?: string;
  breedEn?: string;
  age?: number;
}

export const horses: Animal[] = [
  {
    name: "Galapage",
    image: "/animals/galapage.jpg",
    description:
      "Pur sang de 23 ans très sensible et délicat, non monté par les élèves",
    descriptionEn:
      "23-year-old Thoroughbred, very sensitive and delicate, not ridden by students",
    breed: "Pur sang",
    breedEn: "Thoroughbred",
    age: 23,
  },
  {
    name: "Keyshan",
    image: "/animals/keyshan.jpg",
    description:
      "Jument anglo Arabe de 26 ans qui adore le travail à pied et les câlins. Retraitée depuis sa tendinite ",
    descriptionEn:
      "26-year-old Anglo-Arabian mare who loves ground work and cuddles. Retired due to tendinitis",
    breed: "Anglo Arabe",
    breedEn: "Anglo-Arabian",
    age: 26,
  },
  {
    name: "Risa",
    image: "/animals/risa.jpg",
    description:
      "Très gentille Espagnole de 19 ans polyvalente tonique et très attachante",
    descriptionEn:
      "Very sweet 19-year-old Spanish horse, versatile, energetic and very endearing",
    breed: "Espagnole",
    breedEn: "Spanish",
    age: 19,
  },
  {
    name: "Kloé",
    image: "/animals/kloe.jpg",
    description:
      "Très gentille jument New Forest de 26 ans polyvalente, calme, parfaite pour les débutants ",
    descriptionEn:
      "Very sweet 26-year-old New Forest mare, versatile, calm, perfect for beginners",
    breed: "New Forest",
    breedEn: "New Forest",
    age: 26,
  },
];

export const ponies: Animal[] = [
  {
    name: "Bamby",
    image: "/animals/bamby.jpg",
    description: "20 ans, sensible, il a besoin d'un cavalier calme",
    descriptionEn: "20 years old, sensitive, needs a calm rider",
    age: 20,
  },
  {
    name: "Quaquou",
    image: "/animals/quaquou.jpg",
    description:
      "Camargue de 20 ans très tonique, adore l'obstacle et le cross, parfois coquin pour les confirmés",
    descriptionEn:
      "20-year-old Camargue, very energetic, loves jumping and cross-country, sometimes mischievous for experienced riders",
    breed: "Camargue",
    breedEn: "Camargue",
    age: 20,
  },
  {
    name: "Karamel",
    image: "/animals/karamel.jpg",
    description:
      "20 ans, c'est le plus câlin du club. Poney adorable et polyvalent pour les plus grands",
    descriptionEn:
      "20 years old, the most affectionate at the club. Adorable and versatile pony for older children",
    age: 20,
  },
  {
    name: "Casper",
    image: "/animals/casper.jpg",
    description:
      "Jeune Irish Cob de 7ans polyvalent, parfois coquin en exterieur et très câlin",
    descriptionEn:
      "Young 7-year-old Irish Cob, versatile, sometimes mischievous outdoors and very affectionate",
    breed: "Irish Cob",
    breedEn: "Irish Cob",
    age: 7,
  },
  {
    name: "Clochette",
    image: "/animals/clochette.jpg",
    description: "Ponette de 13 ans qui a du caractère et est très tonique",
    descriptionEn: "13-year-old pony with character and very energetic",
    age: 13,
  },
  {
    name: "Coco",
    image: "/animals/coco.jpg",
    description: "Shetland de 19 ans joueur et tonique ",
    descriptionEn: "19-year-old Shetland, playful and energetic",
    breed: "Shetland",
    breedEn: "Shetland",
    age: 19,
  },
  {
    name: "Ebène",
    image: "/animals/ebene.jpg",
    description: "Gentil poney de 22 ans qui a du rebond pour les plus grands ",
    descriptionEn: "Sweet 22-year-old pony with bounce for older children",
    age: 22,
  },
  {
    name: "Elite",
    image: "/animals/elite.jpg",
    description: "Très gentil shetland de 19 ans, calme et appliqué ",
    descriptionEn: "Very sweet 19-year-old Shetland, calm and focused",
    breed: "Shetland",
    breedEn: "Shetland",
    age: 19,
  },
  {
    name: "Espoir",
    image: "/animals/espoir.jpg",
    description:
      "Très bon poney de 17 ans en pleine forme, polyvalent, affectueux, monté par des cavaliers débutants et confirmés ",
    descriptionEn:
      "Very good 17-year-old pony in great shape, versatile, affectionate, ridden by beginner and experienced riders",
    age: 17,
  },
  {
    name: "Malabar",
    image: "/animals/malabar.jpg",
    description:
      "26 ans, c'est le plus petit poney du club. Il est tonique et facile à diriger pour les plus petits ",
    descriptionEn:
      "26 years old, the smallest pony at the club. Energetic and easy to guide for the youngest",
    age: 26,
  },
  {
    name: "Mirah",
    image: "/animals/mirah.jpg",
    description:
      "Jeune Irish Cob de 8 ans une valeur sûre pour mettre en confiance, tous niveaux ",
    descriptionEn:
      "Young 8-year-old Irish Cob, a safe bet for building confidence, all levels",
    breed: "Irish Cob",
    breedEn: "Irish Cob",
    age: 8,
  },
  {
    name: "Paillette",
    image: "/animals/paillette.jpg",
    description:
      "Ponette de 21 ans, très compétente mais qui a de l'arthrose au jarret, ne fait plus que des promenades en main",
    descriptionEn:
      "21-year-old pony, very competent but has arthritis in the hock, now only does hand-led walks",
    age: 21,
  },
  {
    name: "Qaiwain",
    image: "/animals/qaiwain.jpg",
    description:
      "Beau New Forest de 20 ans, plein de force, intelligent. Généralement monté par des cavaliers confirmés ou pris pour du travail à pied",
    descriptionEn:
      "Beautiful 20-year-old New Forest, full of strength, intelligent. Usually ridden by experienced riders or used for ground work",
    breed: "New Forest",
    breedEn: "New Forest",
    age: 20,
  },
  {
    name: "Topcool",
    image: "/animals/topcool.jpg",
    description:
      "Très bon poney Belge de sport, très tonique, il a du caractère. Surtout monté par des cavaliers confirmés ",
    descriptionEn:
      "Very good Belgian sport pony, very energetic, has character. Mainly ridden by experienced riders",
    breed: "Belge de sport",
    breedEn: "Belgian Sport Pony",
  },
];

export const retiredAnimals: Animal[] = [
  {
    name: "Nuage",
    image: "/animals/nuage.jpg",
    description:
      "Meilleur poney Camargue de voltige ! Aujourd'hui retraité de 30 ans ",
    descriptionEn:
      "Best Camargue vaulting pony! Now retired at 30 years old",
    breed: "Camargue",
    breedEn: "Camargue",
    age: 30,
  },
  {
    name: "Yucca",
    image: "/animals/yucca.jpg",
    description:
      "Ponette B de 25 ans retraitée depuis cette année à cause d'une luxation de la hanche",
    descriptionEn:
      "25-year-old B pony retired this year due to hip dislocation",
    age: 25,
  },
  {
    name: "Faena",
    image: "/animals/faena.jpg",
    description:
      "Adorable jument Camargue de 31 ans retraitée depuis l'âge de 25 ans à cause d'une fourbure, aujourd'hui atteinte de la maladie de Cushing et d'une uvéite ",
    descriptionEn:
      "Adorable 31-year-old Camargue mare retired at 25 due to laminitis, now affected by Cushing's disease and uveitis",
    breed: "Camargue",
    breedEn: "Camargue",
    age: 31,
  },
];

export const otherAnimals: Animal[] = [
  {
    name: "Ulan",
    image: "/animals/ulan.jpg",
    description:
      "Ulan est un berger du Caucase, toujours avec Jingua et très doux malgré sa taille imposante",
    descriptionEn:
      "Ulan is a Caucasian Shepherd, always with Jingua and very gentle despite his imposing size",
    breed: "Berger du Caucase",
    breedEn: "Caucasian Shepherd",
  },
  {
    name: "Jingua",
    image: "/animals/jingua.jpg",
    description: "Jingua, la compagnone d'Ulan, calme et très gentille.",
    descriptionEn: "Jingua, Ulan's companion, calm and very sweet.",
  },
  {
    name: "Poules",
    image: "/animals/hens.jpg",
    description: "Nos poules du club, souvent avec Jason et Fanny",
    descriptionEn: "Our club hens, often with Jason and Fanny",
  },
  {
    name: "Jason",
    image: "/animals/jason.jpg",
    description: "Jason est le bouc du club, toujours accompagné de Fanny",
    descriptionEn: "Jason is the club's goat, always accompanied by Fanny",
  },
  {
    name: "Fanny",
    image: "/animals/fanny.jpg",
    description: "Fanny est la chèvre du club, adore les câlins",
    descriptionEn: "Fanny is the club's goat, loves cuddles",
  },
];
