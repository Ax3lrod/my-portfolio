"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, Plus, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { projectArchive } from "@/const/projectArchive";
import { experienceArchive } from "@/const/experienceArchive";
import { getCldVideoUrl, getCldImageUrl } from "next-cloudinary";

const ArchiveCard = ({
  item,
  index,
  type,
}: {
  item: any;
  index: number;
  type: "projects" | "experience";
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const isVideo =
    item.cover?.endsWith(".mp4") ||
    item.cover?.endsWith(".webm") ||
    item.cover?.includes("video");

  const mediaUrl = isVideo
    ? getCldVideoUrl({
        src: item.cover,
        width: 600,
        height: 1000,
        format: "auto",
        quality: "auto",
        crop: "fill",
        gravity: "center",
      })
    : getCldImageUrl({
        src: item.cover,
        width: 600,
        height: 1000,
        format: "auto",
        quality: "auto",
        crop: "fill",
      });

  const displayId = String(index + 1).padStart(2, "0");

  const handleMouseEnter = () => {
    if (isVideo && videoRef.current) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
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
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{
        duration: 0.8,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative h-[65vh] md:h-[75vh] min-w-75 md:min-w-112.5 shrink-0 cursor-pointer overflow-hidden border border-neutral-800 bg-neutral-900 mx-2 md:mx-4 first:ml-0 last:mr-0"
    >
      <Link
        href={`/archive/${type}/${item.slug || "#"}`}
        className="block h-full w-full"
      >
        <div className="absolute inset-0 overflow-hidden">
          {isVideo ? (
            <video
              ref={videoRef}
              src={mediaUrl}
              muted
              loop
              playsInline
              className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 ease-[0.22,1,0.36,1]"
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={mediaUrl}
              alt={item.title}
              className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 ease-[0.22,1,0.36,1]"
            />
          )}

          <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-black/40 opacity-80" />
        </div>

        <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between z-10">
          <div className="flex justify-between items-start border-b border-white/10 pb-4 group-hover:border-white/30 transition-colors duration-500">
            <span className="font-mono text-4xl md:text-6xl font-bold text-transparent text-stroke-white opacity-30 group-hover:opacity-100 group-hover:text-white transition-all duration-500">
              {displayId}
            </span>
            <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-green-500 group-hover:border-green-500 group-hover:text-black transition-all duration-300">
              <ArrowUpRight size={16} />
            </div>
          </div>

          <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            <div className="flex items-center gap-2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
              {item.endDate === "Present" ? (
                <>
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                  <span className="font-mono text-[10px] tracking-wider uppercase text-green-400">
                    ACTIVE {type === "projects" ? "PROJECT" : "ROLE"}
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
              <span className="font-mono text-xs text-neutral-400 group-hover:text-white transition-colors truncate max-w-50">
                {type === "projects" ? item.subtitle : item.role}
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

        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.3)_51%)] bg-size-[100%_4px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 mix-blend-overlay" />
      </Link>
    </motion.div>
  );
};

const ArchiveGrid = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<"projects" | "experience">(
    "projects",
  );

  const currentArchive =
    activeTab === "projects" ? projectArchive : experienceArchive;

  const sortedItems = useMemo(() => {
    return [...currentArchive].sort((a, b) => {
      const aIsActive = a.endDate === "Present";
      const bIsActive = b.endDate === "Present";
      if (aIsActive && !bIsActive) return -1;
      if (!aIsActive && bIsActive) return 1;
      return b.year - a.year;
    });
  }, [currentArchive]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let currentScroll = container.scrollLeft;
    let targetScroll = container.scrollLeft;
    let isAnimating = false;
    let animationFrameId: number;

    const ease = 0.08;
    const speed = 1.5;

    const lerp = (start: number, end: number, factor: number) =>
      start + (end - start) * factor;

    const animate = () => {
      if (!container) return;

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
  }, [activeTab]); // Re-bind on tab change

  return (
    <section className="relative w-full h-screen bg-black text-white flex flex-col justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[100px_100px] pointer-events-none" />

      <div className="absolute top-8 md:top-12 left-6 md:left-12 z-30">
        <h2 className="font-mono text-xs text-neutral-500 tracking-widest mb-1">
          // ARCHIVE_VIEW
        </h2>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setActiveTab("projects")}
            className={`text-xl font-bold tracking-tight transition-colors ${activeTab === "projects" ? "text-green-500" : "text-neutral-600 hover:text-neutral-400"}`}
          >
            PROJECTS
          </button>
          <span className="text-neutral-800">/</span>
          <button
            onClick={() => setActiveTab("experience")}
            className={`text-xl font-bold tracking-tight transition-colors ${activeTab === "experience" ? "text-green-500" : "text-neutral-600 hover:text-neutral-400"}`}
          >
            EXPERIENCE
          </button>
        </div>
      </div>

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

      <div
        ref={containerRef}
        className="w-full h-auto overflow-x-auto overflow-y-hidden whitespace-nowrap scrollbar-hide px-8 md:px-12 py-10 flex items-center cursor-grab active:cursor-grabbing relative z-10 mt-16"
      >
        <AnimatePresence mode="wait">
          {sortedItems.map((item, index) => (
            <div key={`${activeTab}-${item.slug}`} className="shrink-0">
              <ArchiveCard item={item} index={index} type={activeTab} />
            </div>
          ))}
        </AnimatePresence>

        <div className="shrink-0 h-[65vh] md:h-[75vh] min-w-50 flex flex-col items-center justify-center border-l border-neutral-800 ml-8 text-neutral-600">
          <div className="rotate-90 font-mono text-xs tracking-widest whitespace-nowrap">
            END OF RECORD
          </div>
        </div>
      </div>

      <div className="absolute bottom-12 left-12 right-12 h-px bg-neutral-900 hidden md:block">
        <div className="absolute top-0 left-0 h-full w-24 bg-green-900/50 transition-colors duration-500" />
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
