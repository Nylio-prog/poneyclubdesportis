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
    page: 'club',
    path: '/le-club',
  });
}

export default function LeClubLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
