"use client";

import React, { use } from "react"; 
import { projectArchive } from "@/const/projectArchive";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Github, Globe } from "lucide-react";
import { motion, useScroll } from "motion/react";
import Image from "next/image";

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      style={{ scaleX: scrollYProgress }}
      className="fixed top-0 left-0 right-0 h-1 bg-green-500 origin-left z-50"
    />
  );
};

export default function ProjectDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);

  const project = projectArchive.find((p) => p.slug === slug);

  const currentIndex = projectArchive.findIndex((p) => p.slug === slug);
  const nextProject =
    projectArchive[(currentIndex + 1) % projectArchive.length];

  if (!project) {
    return notFound();
  }

  const isVideo =
    project.cover?.endsWith(".mp4") || project.cover?.endsWith(".webm");

  return (
    <main className="min-h-screen bg-black text-white selection:bg-green-500/30 selection:text-green-200">
      <ScrollProgress />

      {/* --- NAVIGATION --- */}
      <nav className="fixed top-0 left-0 w-full p-6 md:p-12 flex justify-between items-start z-40 pointer-events-none">
        <Link
          href="/archive"
          className="pointer-events-auto group flex items-center gap-2 text-xs font-mono text-neutral-500 hover:text-white transition-colors bg-black/50 backdrop-blur-md px-4 py-2 rounded-full border border-neutral-800"
        >
          <ArrowLeft
            size={14}
            className="group-hover:-translate-x-1 transition-transform"
          />
          BACK_TO_ARCHIVE
        </Link>

        {/* Project Counter */}
        <div className="hidden md:block font-mono text-xs text-neutral-600 bg-black/50 backdrop-blur-md px-4 py-2 rounded-full border border-neutral-800">
          INDEX_{String(currentIndex + 1).padStart(2, "0")} /{" "}
          {String(projectArchive.length).padStart(2, "0")}
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <header className="relative pt-32 pb-12 px-6 md:px-12 max-w-[1800px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Metadata Chips */}
          <div className="flex flex-wrap gap-3 mb-6">
            {project.endDate === "Present" && (
              <span className="px-3 py-1 rounded-full border border-green-500/30 bg-green-500/10 text-green-400 text-[10px] font-mono tracking-wider flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                ACTIVE
              </span>
            )}
            <span className="px-3 py-1 rounded-full border border-neutral-800 text-neutral-400 text-[10px] font-mono tracking-wider">
              {project.year}
            </span>
            <span className="px-3 py-1 rounded-full border border-neutral-800 text-neutral-400 text-[10px] font-mono tracking-wider">
              {project.techStack[0]}
            </span>
          </div>

          {/* Massive Title */}
          <h1 className="text-[12vw] leading-[0.8] font-bold tracking-tighter text-white uppercase wrap-break-word mb-8">
            {project.title}
          </h1>

          <p className="text-xl md:text-2xl text-neutral-400 max-w-2xl font-light leading-relaxed">
            {project.subtitle}
          </p>
        </motion.div>
      </header>

      {/* --- MEDIA COVER --- */}
      <section className="px-4 md:px-12 w-full mb-24">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-[60vh] md:h-[85vh] relative rounded-sm overflow-hidden border border-neutral-800"
        >
          {isVideo ? (
            <video
              src={project.cover}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            />
          ) : (
            <Image
              src={project.cover}
              alt={project.title}
              fill
              className="object-cover"
            />
          )}
          {/* Vignette */}
          <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-black/20 opacity-60" />
        </motion.div>
      </section>

      {/* --- GRID INFO & CONTENT --- */}
      <section className="max-w-[1800px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 mb-32">
        {/* LEFT COLUMN: SPECS */}
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32 space-y-8">
            {/* Links */}
            <div className="flex flex-col gap-3">
              {project.liveLink && (
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-between w-full p-4 border border-neutral-800 hover:bg-white hover:text-black transition-all rounded-sm"
                >
                  <span className="font-mono text-xs tracking-widest">
                    VISIT SITE
                  </span>
                  <Globe size={16} />
                </a>
              )}
              {project.repoLink && (
                <a
                  href={project.repoLink}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-between w-full p-4 border border-neutral-800 hover:bg-white hover:text-black transition-all rounded-sm"
                >
                  <span className="font-mono text-xs tracking-widest">
                    REPOSITORY
                  </span>
                  <Github size={16} />
                </a>
              )}
            </div>

            {/* Tech Stack List */}
            <div className="pt-8 border-t border-neutral-900">
              <h3 className="font-mono text-xs text-neutral-500 mb-4 tracking-widest">
                TECHNOLOGY
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="text-sm text-neutral-300 border border-neutral-800 px-3 py-1.5 rounded-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div className="pt-8 border-t border-neutral-900">
              <h3 className="font-mono text-xs text-neutral-500 mb-4 tracking-widest">
                TIMELINE
              </h3>
              <div className="flex justify-between font-mono text-sm text-neutral-300">
                <span>{project.startDate}</span>
                <span className="text-neutral-600">to</span>
                <span
                  className={
                    project.endDate === "Present" ? "text-green-500" : ""
                  }
                >
                  {project.endDate}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: DESCRIPTION */}
        <div className="lg:col-span-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="prose prose-invert prose-lg max-w-none"
          >
            <h2 className="text-3xl font-bold text-white mb-6">
              About the Project
            </h2>
            <p className="text-neutral-400 text-lg leading-relaxed whitespace-pre-line">
              {project.description}
            </p>
          </motion.div>
        </div>
      </section>

      <Link
        href={`/archive/projects/${nextProject.slug}`}
        className="block group relative border-t border-neutral-800 overflow-hidden"
      >
        <div className="absolute inset-0 bg-neutral-900 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1]" />

        <div className="relative max-w-[1800px] mx-auto px-6 md:px-12 py-24 flex flex-col md:flex-row justify-between items-end gap-8">
          <div>
            <span className="font-mono text-xs text-neutral-500 mb-4 block group-hover:text-green-400 transition-colors">
              NEXT PROJECT
            </span>
            <h2 className="text-4xl md:text-8xl font-bold tracking-tighter text-white uppercase group-hover:translate-x-4 transition-transform duration-500">
              {nextProject.title}
            </h2>
          </div>

          <div className="w-16 h-16 rounded-full border border-neutral-700 flex items-center justify-center group-hover:bg-green-500 group-hover:text-black group-hover:border-green-500 transition-all duration-300">
            <ArrowUpRight size={32} />
          </div>
        </div>
      </Link>
    </main>
  );
}
