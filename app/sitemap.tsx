import { MetadataRoute } from "next";
import { locales } from "@/lib/i18n/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://poneyclubdesportis-cadenet.fr";

  const routes = [
    { path: "", priority: 1.0, changeFrequency: "weekly" as const },
    { path: "le-club", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "cavalerie", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "actualites", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "cours", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "pensions", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "contact", priority: 0.7, changeFrequency: "yearly" as const },
    { path: "photos", priority: 0.6, changeFrequency: "monthly" as const },
  ];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  routes.forEach((route) => {
    locales.forEach((locale) => {
      const url = locale === 'fr' 
        ? `${baseUrl}${route.path ? `/${route.path}` : ''}`
        : `${baseUrl}/${locale}${route.path ? `/${route.path}` : ''}`;
      
      // Generate alternate links for each locale
      const alternates = {
        languages: {} as Record<string, string>,
      };
      
      locales.forEach((altLocale) => {
        const altUrl = altLocale === 'fr'
          ? `${baseUrl}${route.path ? `/${route.path}` : ''}`
          : `${baseUrl}/${altLocale}${route.path ? `/${route.path}` : ''}`;
        alternates.languages[altLocale] = altUrl;
      });

      sitemapEntries.push({
        url,
        lastModified: new Date(),
        changeFrequency: route.changeFrequency,
        priority: route.priority,
        alternates,
      });
    });
  });

  return sitemapEntries;
}
