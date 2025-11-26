"use client";

import React, { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Trophy, ExternalLink, Paperclip, Calendar } from "lucide-react";
import Link from "next/link";
import { achievmentArchive } from "@/const/achievementArchive";

const AchievementCard = ({
  data,
  index,
}: {
  data: (typeof achievmentArchive)[0];
  index: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="relative pl-8 md:pl-0 group"
    >
      <div className="absolute left-0 top-0 bottom-0 w-px bg-neutral-800 md:hidden">
        <div className="absolute top-6 -left-1 w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 p-6 border border-neutral-900 bg-neutral-950/50 hover:bg-neutral-900/80 hover:border-neutral-700 transition-all duration-500 rounded-sm">
        {/* COL 1: DATE & BADGE (2 Cols) */}
        <div className="md:col-span-2 flex flex-col items-start border-b md:border-b-0 md:border-r border-neutral-800 pb-4 md:pb-0 md:pr-4">
          <div className="flex items-center gap-2 mb-2">
            <Trophy size={16} className="text-green-500" />
            <span className="font-mono text-xs text-green-400">
              AWARD_0{index + 1}
            </span>
          </div>
          <div className="text-4xl md:text-5xl font-bold text-neutral-800 group-hover:text-neutral-600 transition-colors">
            {data.year}
          </div>
          <span className="font-mono text-sm text-neutral-500 tracking-widest mt-1">
            {data.month}
          </span>
        </div>

        {/* COL 2: CONTENT (6 Cols) */}
        <div className="md:col-span-6 flex flex-col justify-between">
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-white mb-4 leading-tight group-hover:text-green-400 transition-colors">
              {data.title}
            </h3>
            <p className="text-sm md:text-base text-neutral-400 leading-relaxed font-light">
              {data.description}
            </p>
          </div>

          {/* Related Project Link */}
          {data.related_projects.length > 0 && (
            <div className="mt-6 pt-4 border-t border-neutral-800 flex gap-4">
              {data.related_projects.map((slug) => (
                <Link
                  key={slug}
                  href={`/archive/projects/${slug}`}
                  className="flex items-center gap-2 text-xs font-mono text-neutral-500 hover:text-white transition-colors uppercase border border-neutral-800 px-3 py-1.5 rounded-full hover:bg-neutral-800"
                >
                  <ExternalLink size={12} />
                  LINK_TO_PROJECT
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* COL 3: EVIDENCE / IMAGES (4 Cols) */}
        <div className="md:col-span-4 flex flex-col gap-2">
          <div className="flex items-center gap-2 mb-2 opacity-50">
            <Paperclip size={12} />
            <span className="font-mono text-[10px] uppercase">
              Documentation.zip
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {data.images.map((img, i) => (
              <div
                key={i}
                className="relative aspect-video bg-neutral-800 overflow-hidden rounded-sm border border-neutral-700 group/image"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/archive/${img}`}
                  alt={`Evidence ${i}`}
                  className="w-full h-full object-cover opacity-60 group-hover/image:opacity-100 group-hover/image:scale-110 transition-all duration-500 grayscale group-hover/image:grayscale-0"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />

                {/* Image Overlay */}
                <div className="absolute inset-0 bg-black/20 group-hover/image:bg-transparent transition-colors" />
              </div>
            ))}

            {data.images.length % 2 !== 0 && (
              <div className="aspect-video bg-neutral-900/50 border border-dashed border-neutral-800 flex items-center justify-center">
                <span className="font-mono text-[10px] text-neutral-700">
                  NO_DATA
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Achievements = () => {
  return (
    <section className="relative w-full bg-black text-white py-24 md:py-10 overflow-hidden">
      {/* Background Grid Decoration */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-1/3 h-full border-l border-neutral-900/50" />
        <div className="absolute top-24 left-0 w-full h-px bg-neutral-900/50" />
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 md:mb-24">
          <div>
            <h2 className="font-mono text-xs text-green-500 mb-2 tracking-widest">
              // HALL_OF_FAME
            </h2>
            <h3 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase">
              Achievements
            </h3>
          </div>
          <div className="hidden md:block text-right">
            <div className="flex items-center gap-2 justify-end text-neutral-500 font-mono text-xs mb-1">
              <Calendar size={12} />
              <span>2025</span>
            </div>
            <p className="font-mono text-xs text-neutral-600">
              NATIONAL COMPETITIONS
            </p>
          </div>
        </div>

        {/* Achievements List */}
        <div className="flex flex-col gap-8 md:gap-12">
          {achievmentArchive.map((item, index) => (
            <AchievementCard key={index} data={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
