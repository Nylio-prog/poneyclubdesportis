import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';
import { Locale } from './config';
import enMessages from '../../messages/en.json';
import frMessages from '../../messages/fr.json';

const messagesByLocale = {
  en: enMessages,
  fr: frMessages,
};

export default getRequestConfig(async ({ requestLocale }) => {
  const requestedLocale = await requestLocale;

  const locale = requestedLocale && routing.locales.includes(requestedLocale as Locale)
    ? requestedLocale as Locale
    : routing.defaultLocale;

  return {
    locale,
    messages: messagesByLocale[locale],
  };
});
