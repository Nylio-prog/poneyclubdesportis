import { Fraunces, Manrope } from 'next/font/google';

export const serif = Fraunces({
  subsets: ['latin'],
  axes: ['opsz', 'SOFT'],
  variable: '--font-serif',
  display: 'swap',
});

export const sans = Manrope({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});
