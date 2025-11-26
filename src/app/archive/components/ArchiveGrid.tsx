"use client";

import React, { useRef, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Plus, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { projectArchive } from "@/const/projectArchive";

const ArchiveCard = ({
  item,
  index,
  total,
}: {
  item: (typeof projectArchive)[0];
  index: number;
  total: number;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isVideo = item.cover?.endsWith(".mp4") || item.cover?.endsWith(".webm");

  const displayId = String(index + 1).padStart(2, "0");

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
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{
        duration: 0.8,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative h-[65vh] md:h-[75vh] min-w-[300px] md:min-w-[450px] shrink-0 cursor-pointer overflow-hidden border border-neutral-800 bg-neutral-900 mx-2 md:mx-4 first:ml-0 last:mr-0"
    >
      <Link
        href={"/archive/projects/" + item.slug || "#"}
        target={"_blank"}
        className="block h-full w-full"
      >
        {/* --- Media Layer --- */}
        <div className="absolute inset-0 overflow-hidden">
          {isVideo ? (
            <video
              ref={videoRef}
              src={item.cover}
              muted
              loop
              playsInline
              className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 ease-[0.22,1,0.36,1]"
            />
          ) : (
            <motion.img
              src={item.cover}
              alt={item.title}
              className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 ease-[0.22,1,0.36,1]"
            />
          )}

          {/* Cinematic Vignette */}
          <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-black/40 opacity-80" />
        </div>

        {/* --- Content Layer --- */}
        <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between z-10">
          {/* Top: ID & Tech Markers */}
          <div className="flex justify-between items-start border-b border-white/10 pb-4 group-hover:border-white/30 transition-colors duration-500">
            <span className="font-mono text-4xl md:text-6xl font-bold text-transparent text-stroke-white opacity-30 group-hover:opacity-100 group-hover:text-white transition-all duration-500">
              {displayId}
            </span>
            <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-green-500 group-hover:border-green-500 group-hover:text-black transition-all duration-300">
              <ArrowUpRight size={16} />
            </div>
          </div>

          {/* Bottom: Title & Info */}
          <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            {/* Active Badge or Category */}
            <div className="flex items-center gap-2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
              {item.endDate === "Present" ? (
                <>
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                  <span className="font-mono text-[10px] tracking-wider uppercase text-green-400">
                    ACTIVE PROJECT
                  </span>
                </>
              ) : (
                <span className="font-mono text-[10px] tracking-wider uppercase text-neutral-400">
                  {item.techStack[0]}
                </span>
              )}
            </div>

            <h3 className="text-2xl md:text-4xl font-bold tracking-tighter text-white uppercase mb-2 leading-none whitespace-normal line-clamp-2">
              {item.title}
            </h3>

            <div className="flex justify-between items-end border-t border-white/20 pt-4">
              <span className="font-mono text-xs text-neutral-400 group-hover:text-white transition-colors truncate max-w-[200px]">
                {item.subtitle}
              </span>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-neutral-500">
                  {item.year}
                </span>
                <Plus
                  size={14}
                  className="text-neutral-500 group-hover:rotate-90 transition-transform duration-300"
                />
              </div>
            </div>
          </div>
        </div>

        {/* --- Hover Decoration: Scanline --- */}
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.3)_51%)] bg-size-[100%_4px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 mix-blend-overlay" />
      </Link>
    </motion.div>
  );
};

const ArchiveGrid = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // --- Sorting Logic ---
  const sortedItems = useMemo(() => {
    return [...projectArchive].sort((a, b) => {
      const aIsActive = a.endDate === "Present";
      const bIsActive = b.endDate === "Present";
      if (aIsActive && !bIsActive) return -1;
      if (!aIsActive && bIsActive) return 1;
      return b.year - a.year;
    });
  }, []);

  // --- MOMENTUM SCROLL LOGIC ---
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let currentScroll = container.scrollLeft;
    let targetScroll = container.scrollLeft;
    let isAnimating = false;
    let animationFrameId: number;

    // Physics constants
    const ease = 0.08;
    const speed = 1.5;

    // Linear Interpolation
    const lerp = (start: number, end: number, factor: number) =>
      start + (end - start) * factor;

    const animate = () => {
      if (!container) return;

      // Calculate difference
      const diff = targetScroll - currentScroll;

      if (Math.abs(diff) < 0.5) {
        currentScroll = targetScroll;
        container.scrollLeft = currentScroll;
        isAnimating = false;
        return;
      }

      currentScroll = lerp(currentScroll, targetScroll, ease);
      container.scrollLeft = currentScroll;

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();

        targetScroll += e.deltaY * speed;

        const maxScroll = container.scrollWidth - container.clientWidth;
        targetScroll = Math.max(0, Math.min(targetScroll, maxScroll));

        if (!isAnimating) {
          isAnimating = true;
          animate();
        }
      }
    };

    container.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      container.removeEventListener("wheel", handleWheel);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className="relative w-full h-screen bg-black text-white flex flex-col justify-center overflow-hidden">
      {/* Background Grid Texture */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[100px_100px] pointer-events-none" />

      {/* --- Header Left --- */}
      <div className="absolute top-8 md:top-12 left-6 md:left-12 z-20">
        <h2 className="font-mono text-xs text-neutral-500 tracking-widest mb-1">
          // ARCHIVE_VIEW
        </h2>
        <h1 className="text-xl font-bold tracking-tight">WORLD_DATABASE</h1>
      </div>

      {/* --- Header Right (Back Button) --- */}
      <div className="absolute top-8 md:top-12 right-6 md:right-12 z-20">
        <Link
          href="/"
          className="group flex items-center gap-3 px-4 py-2 border border-neutral-800 bg-black/50 backdrop-blur-sm rounded-full hover:border-neutral-500 transition-all"
        >
          <ArrowLeft
            size={16}
            className="text-neutral-400 group-hover:text-white group-hover:-translate-x-1 transition-all"
          />
          <span className="font-mono text-xs text-neutral-400 group-hover:text-white">
            RETURN
          </span>
        </Link>
      </div>

      {/* Horizontal Scroll Container */}
      <div
        ref={containerRef}
        className="w-full h-auto overflow-x-auto overflow-y-hidden whitespace-nowrap scrollbar-hide px-8 md:px-12 py-10 flex items-center cursor-grab active:cursor-grabbing"
      >
        {sortedItems.map((item, index) => (
          // REMOVED: snap-center
          <div key={item.slug} className="shrink-0">
            <ArchiveCard item={item} index={index} total={sortedItems.length} />
          </div>
        ))}

        {/* End Card */}
        <div className="shrink-0 h-[65vh] md:h-[75vh] min-w-[200px] flex flex-col items-center justify-center border-l border-neutral-800 ml-8 text-neutral-600">
          <div className="rotate-90 font-mono text-xs tracking-widest whitespace-nowrap">
            END OF RECORD
          </div>
        </div>
      </div>

      {/* Scroll Progress Indicator */}
      <div className="absolute bottom-12 left-12 right-12 h-px bg-neutral-900 hidden md:block">
        <div className="absolute top-0 left-0 h-full w-24 bg-green-900/50" />
      </div>

      <style jsx global>{`
        .text-stroke-white {
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.3);
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default ArchiveGrid;
