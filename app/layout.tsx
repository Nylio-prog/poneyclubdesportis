import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";

// Geist Sans font from Vercel already includes:
// - font-display: swap for optimal loading (prevents invisible text)
// - Font subsetting for reduced file sizes
// - Optimized WOFF2 format
// - Preload hints handled automatically by Next.js

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale?: string }>;
}>) {
  const { locale } = await params;
  
  return (
    <html lang={locale || 'fr'} suppressHydrationWarning>
      <body
        className={`${GeistSans.className} flex flex-col min-h-screen`}
      >
        <Analytics />
        <SpeedInsights />
        {children}
      </body>
    </html>
  );
}
