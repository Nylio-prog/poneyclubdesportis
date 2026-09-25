import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Locale, locales } from './i18n/config';

const SITE_URL = 'https://poneyclubdesportis-cadenet.fr';

/**
 * Only the production deployment should be indexed. Vercel preview deployments
 * (e.g. the redesign preview on the dev branch) set VERCEL_ENV to "preview".
 */
export const isIndexable = !process.env.VERCEL_ENV || process.env.VERCEL_ENV === 'production';

interface PageMetadataParams {
  locale: Locale;
  page: 'home' | 'club' | 'photos' | 'cavalerie' | 'actualites' | 'cours' | 'pensions' | 'contact';
  path?: string;
}

export async function generatePageMetadata({
  locale,
  page,
  path = '',
}: PageMetadataParams): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'metadata' });
  
  const title = t(`${page}.title`);
  const description = t(`${page}.description`);
  const siteName = t('siteName');
  
  // Construct the canonical URL
  const canonicalPath = path || (page === 'home' ? '' : `/${page === 'club' ? 'le-club' : page}`);
  const canonicalUrl = locale === 'fr' 
    ? `${SITE_URL}${canonicalPath}`
    : `${SITE_URL}/${locale}${canonicalPath}`;
  
  // Generate alternate URLs for hreflang
  const alternates = {
    canonical: canonicalUrl,
    languages: {} as Record<string, string>,
  };
  
  locales.forEach((loc) => {
    const localeUrl = loc === 'fr'
      ? `${SITE_URL}${canonicalPath}`
      : `${SITE_URL}/${loc}${canonicalPath}`;
    alternates.languages[loc] = localeUrl;
  });
  
  // Default Open Graph image
  const ogImage = `${SITE_URL}/hero-image.jpg`;
  
  return {
    title,
    description,
    alternates,
    openGraph: {
      type: 'website',
      locale: locale === 'fr' ? 'fr_FR' : 'en_US',
      url: canonicalUrl,
      siteName,
      title,
      description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: siteName,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
    robots: {
      index: isIndexable,
      follow: isIndexable,
      googleBot: {
        index: isIndexable,
        follow: isIndexable,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}
