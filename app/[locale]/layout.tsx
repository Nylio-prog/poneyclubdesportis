import type { Metadata } from "next";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { setRequestLocale } from 'next-intl/server';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { locales } from "@/lib/i18n/config";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: "Poney Club Desportis - Cours et Pension à Cadenet, Vaucluse",
  description:
    "Découvrez le Poney Club Desportis à Cadenet, au cœur du Luberon. Cours d'équitation, pension pour poneys et chevaux, dans un cadre exceptionnel.",
  keywords: [
    "Poney Club Desportis",
    "Centre équestre",
    "Cadenet",
    "Vaucluse",
    "Luberon",
    "Cours d'équitation",
    "Pension",
    "Balade",
    "Poney",
    "Cheval",
    "Équitation",
  ],
  authors: [
    { name: "Poney Club Desportis" },
    {
      name: "Béatrice Bürkle",
      url: "https://www.instagram.com/poneyclubdesportis/",
    },
  ],
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
  },
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://www.poneyclubdesportis-cadenet.fr",
    siteName: "Poney Club Desportis",
    title: "Poney Club Desportis - Centre Équestre à Cadenet",
    description:
      "Centre équestre proposant cours, pension et balades à cheval dans le Luberon. Découvrez notre poney club à Cadenet, Vaucluse.",
    images: [
      {
        url: "https://poneyclubdesportis-cadenet.fr/_next/image?url=%2Fhero-image.jpg&w=640&q=75",
        width: 640,
        height: 426,
        alt: "Poney Club Desportis",
      },
    ],
  },
};

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  // Enable static rendering
  setRequestLocale(locale);
  
  const messages = await getMessages();
  
  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <Header />
      <main className="flex-grow pt-header">{children}</main>
      <Footer />
    </NextIntlClientProvider>
  );
}
