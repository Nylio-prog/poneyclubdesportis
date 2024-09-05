import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Poney Club Desportis - Cours et Pension à Cadenet, Vaucluse",
  description:
    "Découvrez le Poney Club Desportis à Cadenet, au cœur du Luberon. Cours d'équitation, pension pour poneys et chevaux, dans un cadre exceptionnel.",
  keywords: [
    "Poney Club Desportis",
    "Cadenet",
    "Vaucluse",
    "Luberon",
    "Cours d'équitation",
    "Pension",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${GeistSans.className} pt-header`}>
        <Analytics />
        <SpeedInsights />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
