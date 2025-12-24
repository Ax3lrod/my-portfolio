import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const BASE_URL =
    process.env.NEXT_PUBLIC_BASE_URL || "https://aryasatya.vercel.app";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [""],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
