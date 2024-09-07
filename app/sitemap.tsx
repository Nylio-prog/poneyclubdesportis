import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://poneyclubdesportis-cadenet.fr";

  const routes = [
    "",
    "le-club",
    "cavalerie",
    "actualites",
    "cours",
    "pensions",
    "contact",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}/${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 1,
  }));
}
