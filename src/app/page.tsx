"use client";

import { useState } from "react";
import Footer from "@/components/layouts/Footer";
import Preloader from "@/components/Preloader";
import Achievements from "@/sections/Achievements";
import CTA from "@/sections/CTA";
import Hero from "@/sections/Hero";
import Profile from "@/sections/Profile";
import ProjectCatalog from "@/sections/ProjectCatalog";
import TechStack from "@/sections/TechStack";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Aryasatya Alaauddin",
    url: "https://aryasatya.vercel.app",
    image: "https://aryasatya.vercel.app/archive/profile.jpg",
    sameAs: [
      "https://github.com/usernamegithub",
      "https://linkedin.com/in/usernamelinkedin",
      "https://instagram.com/usernameig",
    ],
    jobTitle: "Software Engineer",
    worksFor: {
      "@type": "Organization",
      name: "Freelance / ITS",
    },
  };

  return (
    <main className="bg-black min-h-screen w-full selection:bg-green-500/30 selection:text-green-200">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Preloader onComplete={() => setIsLoading(false)} />
      <div
        className={`transition-opacity duration-1000 ${
          isLoading ? "opacity-0 fixed inset-0 overflow-hidden" : "opacity-100"
        }`}
      >
        <Hero />
        <Profile />
        <TechStack />
        <ProjectCatalog />
        <Achievements />
        <CTA />
        <Footer />
      </div>
    </main>
  );
}
