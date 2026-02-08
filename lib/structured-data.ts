import { Locale } from './i18n/config';

const SITE_URL = 'https://poneyclubdesportis-cadenet.fr';

// Organization structured data
export function getOrganizationSchema(locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SportsActivityLocation',
    '@id': `${SITE_URL}/#organization`,
    name: 'Poney Club Desportis',
    alternateName: locale === 'en' ? 'Desportis Pony Club' : 'Poney Club Desportis',
    description:
      locale === 'en'
        ? 'Equestrian center in Cadenet, Luberon. Horse riding lessons, boarding for ponies and horses, courses and trail rides.'
        : 'Centre équestre à Cadenet dans le Luberon. Cours d\'équitation, pension pour poneys et chevaux, stages et balades.',
    url: SITE_URL,
    logo: `${SITE_URL}/icon-ivory.png`,
    image: `${SITE_URL}/hero-image.jpg`,
    telephone: '+33642878958',
    email: 'poneyclub.desportis@free.fr',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '1070, Chemin Vidau',
      addressLocality: 'Cadenet',
      postalCode: '84160',
      addressRegion: 'Vaucluse',
      addressCountry: 'FR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 43.730522,
      longitude: 5.400091,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '09:30',
        closes: '18:00',
      },
    ],
    sameAs: [
      'https://www.facebook.com/p/Poney-Club-Desportis-100027924560857/',
      'https://www.instagram.com/poneyclubdesportis/',
    ],
    priceRange: '€€',
    areaServed: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: 43.730522,
        longitude: 5.400091,
      },
      geoRadius: '50000', // 50km radius
    },
  };
}

// LocalBusiness structured data
export function getLocalBusinessSchema(locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE_URL}/#localbusiness`,
    name: 'Poney Club Desportis',
    description:
      locale === 'en'
        ? 'Equestrian center offering horse riding lessons, boarding services, and trail rides in the heart of Luberon.'
        : 'Centre équestre proposant cours d\'équitation, services de pension et balades à cheval au cœur du Luberon.',
    url: SITE_URL,
    telephone: '+33642878958',
    email: 'poneyclub.desportis@free.fr',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '1070, Chemin Vidau',
      addressLocality: 'Cadenet',
      postalCode: '84160',
      addressRegion: 'Vaucluse',
      addressCountry: 'FR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 43.730522,
      longitude: 5.400091,
    },
    hasMap: 'https://www.google.com/maps/place/Pony+Club+Desportis/@43.730522,5.3975161,17z',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '09:30',
        closes: '18:00',
      },
    ],
    priceRange: '€€',
  };
}

// Event structured data
interface EventData {
  title: string;
  titleEn?: string;
  startDate: string;
  endDate: string;
  startHour: string;
  endHour: string;
  description: string;
  descriptionEn?: string;
  image?: string;
}

export function getEventSchema(event: EventData, locale: Locale) {
  const title = locale === 'en' && event.titleEn ? event.titleEn : event.title;
  const description = locale === 'en' && event.descriptionEn ? event.descriptionEn : event.description;
  
  // Combine date and time for ISO format
  const startDateTime = `${event.startDate}T${event.startHour}:00`;
  const endDateTime = `${event.endDate}T${event.endHour}:00`;
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: title,
    description: description,
    startDate: startDateTime,
    endDate: endDateTime,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    location: {
      '@type': 'Place',
      name: 'Poney Club Desportis',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '1070, Chemin Vidau',
        addressLocality: 'Cadenet',
        postalCode: '84160',
        addressRegion: 'Vaucluse',
        addressCountry: 'FR',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 43.730522,
        longitude: 5.400091,
      },
    },
    organizer: {
      '@type': 'Organization',
      name: 'Poney Club Desportis',
      url: SITE_URL,
    },
    ...(event.image && {
      image: event.image.startsWith('http') ? event.image : `${SITE_URL}${event.image}`,
    }),
  };
}

// BreadcrumbList structured data
export function getBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
