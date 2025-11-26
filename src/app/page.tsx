"use client";

import Hero from "@/sections/Hero";
import Profile from "@/sections/Profile";
import ProjectCatalog from "@/sections/ProjectCatalog";
import TechStack from "@/sections/TechStack";
import Achievements from "@/sections/Achievements";
import Preloader from "@/components/Preloader";
import { useState } from "react";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <main className="bg-black min-h-screen w-full selection:bg-green-500/30 selection:text-green-200">
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
      </div>
    </main>
  );
}
