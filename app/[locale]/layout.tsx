import type { Metadata } from "next";
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { GeistSans } from 'geist/font/sans';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { setRequestLocale } from 'next-intl/server';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnnouncementBanner from "@/components/AnnouncementBanner";
import SkipToContent from "@/components/SkipToContent";
import { locales, Locale } from "@/lib/i18n/config";
import { generatePageMetadata } from "@/lib/metadata";
import { getOrganizationSchema, getLocalBusinessSchema } from "@/lib/structured-data";
import Script from 'next/script';
import '../globals.css';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata({
    locale: locale as Locale,
    page: 'home',
    path: '',
  });
}

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
  
  // Generate structured data
  const organizationSchema = getOrganizationSchema(locale as Locale);
  const localBusinessSchema = getLocalBusinessSchema(locale as Locale);
  const isVercelDeployment = process.env.VERCEL === '1';
  
  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${GeistSans.className} flex min-h-screen flex-col`}
        suppressHydrationWarning
      >
        {isVercelDeployment && (
          <>
            <Analytics />
            <SpeedInsights />
          </>
        )}
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <Script
          id="local-business-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
          }}
        />
        <NextIntlClientProvider messages={messages} locale={locale}>
          <SkipToContent />
          <Header />
          <main id="main-content" className="flex-grow">
            <AnnouncementBanner />
            {children}
          </main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
