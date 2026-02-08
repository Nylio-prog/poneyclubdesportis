import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { Locale } from '@/lib/i18n/config';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata({
    locale: locale as Locale,
    page: 'actualites',
    path: '/actualites',
  });
}

export default function ActualitesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
