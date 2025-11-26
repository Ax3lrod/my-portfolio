"use client";

import Hero from "@/sections/Hero";
import ProjectCatalog from "@/sections/ProjectCatalog";
import Preloader from "@/components/Preloader";
import { useState } from "react";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <main className="bg-black min-h-screen w-full">
      <Preloader onComplete={() => setIsLoading(false)} />
      <div
        className={`transition-opacity duration-1000 ${
          isLoading ? "opacity-0 fixed inset-0 overflow-hidden" : "opacity-100"
        }`}
      >
        <Hero />
        <ProjectCatalog />
      </div>
    </main>
  );
}
