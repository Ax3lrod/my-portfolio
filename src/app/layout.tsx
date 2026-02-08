import type { Metadata } from "next";
import { ReactLenis } from "lenis/react";
import { LedFont } from "@/lib/font";
import { Unbounded } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";

const unbounded = Unbounded({
  subsets: ["latin"],
  variable: "--font-unbounded",
});

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "https://aryasatya.vercel.app";

const GOOGLE_VERIFICATION = process.env.GOOGLE_VERIFICATION || "";

const GA_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS || "";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Aryasatya Alaauddin | Software Engineer",
    template: "%s | Aryasatya Alaauddin",
  },
  description:
    "Portofolio Aryasatya Alaauddin. Software Engineer specializing in Next.js, React, and Creative Development based in Surabaya, Indonesia.",
  keywords: [
    "Aryasatya Alaauddin",
    "Software Engineer",
    "Frontend Developer",
    "Web Developer Surabaya",
    "Next.js Portfolio",
    "Creative Developer",
    "React.js",
    "ITS Surabaya",
  ],
  authors: [{ name: "Aryasatya Alaauddin", url: BASE_URL }],
  creator: "Aryasatya Alaauddin",
  openGraph: {
    title: "Aryasatya Alaauddin | Software Engineer",
    description: "Creative Developer & Software Engineer based in Indonesia.",
    url: BASE_URL,
    siteName: "Aryasatya Alaauddin",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Aryasatya Alaauddin Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aryasatya Alaauddin | Software Engineer",
    description: "Creative Developer & Software Engineer based in Indonesia.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: GOOGLE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ReactLenis root />
      <body
        className={`${LedFont.variable} ${unbounded.variable} ${GeistSans.variable} antialiased`}
      >
        {children}
        {GA_ID && <GoogleAnalytics gaId={GA_ID} />}
      </body>
    </html>
  );
}
