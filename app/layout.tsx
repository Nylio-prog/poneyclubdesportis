import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Poney Club Desportis - Cours et Pension à Cadenet, Vaucluse",
  description:
    "Découvrez le Poney Club Desportis à Cadenet, au cœur du Vaucluse et du Luberon. Cours d'équitation, pension pour poneys et chevaux, dans un cadre exceptionnel.",
  keywords: [
    "Poney Club Desportis",
    "Cadenet",
    "Vaucluse",
    "Luberon",
    "Cours d'équitation",
    "Pension chevaux",
    "Poney",
    "Équitation",
  ],
  authors: [
    { name: "Poney Club Desportis" },
    {
      name: "Béatrice Bürkle",
      url: "https://www.instagram.com/poneyclubdesportis/",
    },
  ],
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} pt-header`}>
        <Header />
        <main>{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
