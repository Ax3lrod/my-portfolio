"use client";

import React, { useRef, useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion"; // Pastikan install framer-motion
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { projectArchive } from "@/const/projectArchive";

const SELECTED_SLUGS = [
  "sre-its-official",
  "petrolida-2025",
  "ini-lho-its-2025",
  "ara-6-0",
  "bem-its",
];

const ProjectCard = ({
  project,
  index,
}: {
  project: (typeof projectArchive)[0];
  index: number;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isVideo =
    project.cover?.endsWith(".mp4") || project.cover?.endsWith(".webm");

  const handleMouseEnter = () => {
    if (isVideo && videoRef.current) {
      videoRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    if (isVideo && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      className="group relative flex flex-col gap-2 mb-8 cursor-pointer w-full"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* --- UPDATE: Link sekarang mengarah ke detail page internal --- */}
      <Link
        href={`/archive/projects/${project.slug}`}
        className="block w-full h-full"
      >
        <div className="relative w-full h-auto overflow-hidden bg-neutral-900 border border-neutral-800 group-hover:border-neutral-700 transition-colors rounded-sm">
          {/* Badge Active / Present */}
          {project.endDate === "Present" && (
            <div className="absolute top-2 left-2 z-30 bg-green-500/20 backdrop-blur-md border border-green-500/30 px-2 py-1 rounded text-[10px] font-mono text-green-400 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              ACTIVE
            </div>
          )}

          <div className="absolute inset-0 z-10 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />

          {isVideo ? (
            <video
              ref={videoRef}
              src={project.cover}
              muted
              loop
              playsInline
              className="w-full h-auto block grayscale group-hover:grayscale-0 transition-all duration-700 ease-[0.16,1,0.3,1] scale-100 group-hover:scale-105"
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={project.cover}
              alt={project.title}
              className="w-full h-auto block grayscale group-hover:grayscale-0 transition-all duration-700 ease-[0.16,1,0.3,1] scale-100 group-hover:scale-105"
            />
          )}

          <div className="absolute top-3 right-3 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white">
              <ArrowUpRight size={14} />
            </div>
          </div>
        </div>

        <div className="flex justify-between items-start mt-3 px-1">
          <div className="max-w-[85%]">
            <h3 className="text-sm md:text-base font-bold tracking-tight text-neutral-300 group-hover:text-white transition-colors leading-tight">
              {project.title}
            </h3>
            <span className="text-[10px] md:text-xs font-mono text-neutral-500 mt-1 block group-hover:text-green-400 transition-colors truncate">
              {project.subtitle}
            </span>
          </div>
          <span className="text-[10px] font-mono text-neutral-600 whitespace-nowrap mt-0.5">
            {project.year}
          </span>
        </div>
      </Link>
    </motion.div>
  );
};

// --- Main Catalog Component ---
const ProjectCatalog = () => {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkSize = () => setIsDesktop(window.innerWidth >= 1024);
    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  // --- SORTING LOGIC ---
  const sortedProjects = useMemo(() => {
    const filtered = projectArchive.filter((p) =>
      SELECTED_SLUGS.includes(p.slug)
    );

    return filtered.sort((a, b) => {
      const aIsActive = a.endDate === "Present";
      const bIsActive = b.endDate === "Present";
      if (aIsActive && !bIsActive) return -1;
      if (!aIsActive && bIsActive) return 1;
      if (b.year !== a.year) return b.year - a.year;

      return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
    });
  }, []);

  const col1 = sortedProjects.filter((_, i) => i % (isDesktop ? 3 : 2) === 0);
  const col2 = sortedProjects.filter((_, i) => i % (isDesktop ? 3 : 2) === 1);
  const col3 = sortedProjects.filter((_, i) => i % 3 === 2);

  return (
    <section className="relative w-full min-h-screen bg-black text-white px-4 md:px-12 py-24 z-30">
      <div className="flex justify-between items-end mb-16 max-w-[1600px] mx-auto border-b border-neutral-800 pb-4">
        <div>
          <h2 className="text-[8vw] md:text-[4vw] leading-[0.85] font-bold tracking-tighter text-neutral-800 uppercase select-none hover:text-neutral-700 transition-colors duration-500">
            Selected
            <br />
            <span className="text-neutral-200 ml-4 md:ml-8">Works</span>
          </h2>
        </div>
        <div className="hidden md:block text-right mb-1">
          <p className="text-[10px] font-mono text-neutral-500">
            SCROLL TO EXPLORE
          </p>
        </div>
      </div>

      {/* Grid Container */}
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-start">
        {/* COLUMN 1 */}
        <div className="flex flex-col">
          {col1.map((project, idx) => (
            <ProjectCard key={project.slug} project={project} index={idx} />
          ))}
        </div>

        {/* COLUMN 2 */}
        <div className="flex flex-col">
          {col2.map((project, idx) => (
            <ProjectCard key={project.slug} project={project} index={idx} />
          ))}
        </div>

        {/* COLUMN 3 (Desktop Only) */}
        <div className="hidden lg:flex flex-col">
          {col3.map((project, idx) => (
            <ProjectCard key={project.slug} project={project} index={idx} />
          ))}

          {/* CTA Link */}
          <Link href="/archive" className="block mt-0 mb-8">
            <div className="h-[200px] flex items-center justify-center border border-dashed border-neutral-800 rounded-sm group hover:bg-neutral-900 transition-colors cursor-pointer">
              <div className="text-center">
                <p className="text-neutral-500 font-mono text-[10px] mb-2">
                  FULL DATABASE
                </p>
                <h3 className="text-xl font-bold group-hover:text-green-400 transition-colors">
                  VIEW ARCHIVE →
                </h3>
              </div>
            </div>
          </Link>
        </div>

        {/* Mobile CTA */}
        <div className="block lg:hidden mt-4">
          <Link href="/archive">
            <div className="h-[150px] flex items-center justify-center border border-dashed border-neutral-800 rounded-sm group hover:bg-neutral-900 transition-colors cursor-pointer">
              <div className="text-center">
                <p className="text-neutral-500 font-mono text-[10px] mb-2">
                  FULL DATABASE
                </p>
                <h3 className="text-lg font-bold group-hover:text-green-400 transition-colors">
                  VIEW ARCHIVE →
                </h3>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProjectCatalog;
