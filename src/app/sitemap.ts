import { MetadataRoute } from "next";
import { projectArchive } from "@/const/projectArchive";

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "https://aryasatya.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/archive"].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  const projects = projectArchive.map((project) => ({
    url: `${BASE_URL}/archive/projects/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...routes, ...projects];
}
