import type { MetadataRoute } from "next";
import { site } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!site.url) return [];
  return [{ url: site.url, changeFrequency: "monthly", priority: 1 }];
}
