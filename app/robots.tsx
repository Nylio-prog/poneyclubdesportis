import type { MetadataRoute } from "next";
import { isIndexable } from "@/lib/metadata";

export default function robots(): MetadataRoute.Robots {
  // Keep preview deployments out of search engines.
  if (!isIndexable) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://poneyclubdesportis-cadenet.fr/sitemap.xml",
  };
}
