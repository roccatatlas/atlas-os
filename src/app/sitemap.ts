import { MOCK_TOOLS, MOCK_STACKS } from "@/lib/data";
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://runatlas.com";

  const staticRoutes = [
    { url: base, lastModified: new Date(), changeFrequency: "daily" as const, priority: 1 },
    { url: `${base}/generate`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${base}/tools`, lastModified: new Date(), changeFrequency: "daily" as const, priority: 0.9 },
    { url: `${base}/stacks`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${base}/categories`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.7 },
    { url: `${base}/search`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.6 },
  ];

  const toolRoutes = MOCK_TOOLS.map((tool) => ({
    url: `${base}/tools/${tool.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const stackRoutes = MOCK_STACKS.map((stack) => ({
    url: `${base}/stacks/${stack.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...toolRoutes, ...stackRoutes];
}
