"use client";

import ArchiveGrid from "./components/ArchiveGrid";
import Preloader from "@/components/Preloader";
import { useState } from "react";

export default function ArchivePage() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <main className="bg-black w-full">
      <Preloader onComplete={() => setIsLoading(false)} />
      <div
        className={`transition-opacity duration-1000 ${
          isLoading ? "opacity-0 fixed inset-0 overflow-hidden" : "opacity-100"
        }`}
      >
        <ArchiveGrid />
      </div>
    </main>
  );
}
