import type { StaticImageData } from 'next/image';

import heroImage from '@/public/hero-image.jpg';
import aerial from '@/public/le-club/poney-club.jpg';
import jump from '@/public/cours/clemence_jump.jpg';
import roundPen from '@/public/cours/rond_de_longe.jpg';
import paddocks from '@/public/pensions/parcs.jpg';
import box from '@/public/pensions/box.jpg';
import hay from '@/public/pensions/hay.jpg';
import shetlands from '@/public/photos/IMG-20260502-WA0000.jpg';
import babyPony from '@/public/photos/IMG-20260628-WA0000.jpg';
import kidsLine from '@/public/photos/IMG-20260628-WA0003.jpg';
import groundWork from '@/public/photos/IMG-20260628-WA0004.jpg';
import broom from '@/public/photos/IMG-20260628-WA0005.jpg';
import greeting from '@/public/photos/IMG-20260628-WA0008.jpg';
import hug from '@/public/photos/IMG-20260628-WA0009.jpg';
import kidsLesson from '@/public/photos/IMG_5975.jpeg';
import ring from '@/public/photos/IMG_5981.jpeg';
import christmas from '@/public/photos/IMG_6056.jpeg';
import competition from '@/public/photos/IMG-20250216-WA0000.jpg';
import ponyJump from '@/public/photos/IMG-20250216-WA0001.jpg';

export const club = {
  name: 'Poney Club Desportis',
  phone: '+33 6 42 87 89 58',
  phoneHref: 'tel:+33642878958',
  email: 'poneyclub.desportis@free.fr',
  emailHref: 'mailto:poneyclub.desportis@free.fr',
  street: '1070, Chemin Vidau',
  city: '84160 Cadenet',
  country: 'France',
  mapsHref:
    'https://www.google.com/maps/place/Pony+Club+Desportis/@43.730522,5.3975161,17z/data=!3m1!4b1!4m6!3m5!1s0x12ca1f4bcddefc0b:0x973c8086050cd94!8m2!3d43.730522!4d5.400091!16s%2Fg%2F1tlnghz7',
  mapEmbedSrc:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2883.038558399275!2d5.397516076655587!3d43.73052584742539!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12ca1f4bcddefc0b%3A0x973c8086050cd94!2sPoney%20Club%20Desportis!5e0!3m2!1sfr!2sfr!4v1722784871710!5m2!1sfr!2sfr',
  facebook: 'https://www.facebook.com/p/Poney-Club-Desportis-100027924560857/',
  instagram: 'https://www.instagram.com/poneyclubdesportis/',
};

/** Photos reused across pages (static imports give blur placeholders). */
export const photos = {
  hero: heroImage,
  aerial,
  jump,
  roundPen,
  paddocks,
  box,
  hay,
  shetlands,
  babyPony,
  kidsLine,
  groundWork,
  broom,
  greeting,
  hug,
  kidsLesson,
  ring,
  christmas,
  competition,
  ponyJump,
} satisfies Record<string, StaticImageData>;

export const labels = [
  { src: '/logos/Logo_FFE.jpg', name: "Fédération Française d'Équitation" },
  { src: '/logos/Logo_bien_etre_animal.png', name: 'Bien-être animal' },
  { src: '/logos/Logo_poney_de_france.png', name: 'Poney de France' },
  { src: '/logos/Logo_qualite.png', name: "École Française d'Équitation" },
  { src: '/logos/Logo_passport.jpg', name: "Pass'Sport" },
];

export const navItems = [
  { href: '/le-club', key: 'club' },
  { href: '/cours', key: 'lessons' },
  { href: '/pensions', key: 'boarding' },
  { href: '/cavalerie', key: 'horses' },
  { href: '/actualites', key: 'news' },
  { href: '/photos', key: 'photos' },
  { href: '/contact', key: 'contact' },
] as const;
