import type { Metadata } from "next";
import { ReactLenis } from "lenis/react";
import { LedFont } from "@/lib/font";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aryasatya Alaauddin",
  description: "Aryasatya Alaauddin Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ReactLenis root />
      <body className={`${LedFont.variable} antialiased`}>{children}</body>
    </html>
  );
}
