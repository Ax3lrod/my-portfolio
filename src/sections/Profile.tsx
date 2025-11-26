"use client";

import React, { useRef } from "react";
import { motion, useInView } from "motion/react";
import {
  Download,
  MapPin,
  GraduationCap,
  Mail,
  ArrowUpRight,
} from "lucide-react";
import Image from "next/image";

const Profile = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="relative w-full bg-black text-white py-24 md:py-32 overflow-hidden border-t border-neutral-900"
    >
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none select-none overflow-hidden">
        <h1 className="text-[20vw] font-bold leading-none text-white tracking-tighter translate-x-1/3">
          ARYA
        </h1>
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
        {/* --- LEFT COL: PHOTO (4 Cols) --- */}
        <motion.div
          className="lg:col-span-5 relative"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Image Frame */}
          <div className="relative aspect-3/4 w-full bg-neutral-900 rounded-sm overflow-hidden border border-neutral-800 group">
            <Image
              src="/archive/profile.jpg"
              alt="Aryasatya Alaauddin"
              fill
              className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out"
            />

            {/* Overlay UI Elements (HUD) */}
            <div className="absolute inset-0 border border-white/10 m-4 pointer-events-none">
              <div className="absolute top-0 left-0 w-2 h-2 border-l border-t border-white" />
              <div className="absolute top-0 right-0 w-2 h-2 border-r border-t border-white" />
              <div className="absolute bottom-0 left-0 w-2 h-2 border-l border-b border-white" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-white" />
            </div>
          </div>

          {/* Decorative Background box */}
          <div className="absolute top-4 -right-4 w-full h-full border border-neutral-800 -z-10 hidden md:block" />
        </motion.div>

        {/* --- RIGHT COL: BIO & DATA (7 Cols) --- */}
        <div className="lg:col-span-7 flex flex-col gap-12">
          {/* Bio Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="font-mono text-xs text-green-500 mb-6 tracking-widest">
              // OPERATOR_PROFILE
            </h2>
            <h3 className="text-3xl md:text-5xl font-bold leading-tight mb-6">
              Hello!, I'm Aryasatya Alaauddin
            </h3>
            <p className="text-neutral-400 text-lg leading-relaxed max-w-2xl">
              A passionate Web Developer with a strong focus on Front-End
              development, specializing in Next.js and React.js. Experienced in
              building responsive and modern user interfaces, complemented by a
              solid understanding of Back-End and DevOps principles.
            </p>
          </motion.div>

          {/* Info Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* Block 1: Education */}
            <div className="p-6 border border-neutral-800 bg-neutral-900/20 hover:bg-neutral-900/50 transition-colors group">
              <div className="flex items-start justify-between mb-4">
                <GraduationCap
                  size={20}
                  className="text-neutral-500 group-hover:text-white transition-colors"
                />
                <span className="font-mono text-[10px] text-neutral-600">
                  EDUCATION
                </span>
              </div>
              <h4 className="text-lg font-bold text-white">ITS Surabaya</h4>
              <p className="text-sm text-neutral-400">
                Bachelor of Computer Science
              </p>
              <p className="text-xs font-mono text-green-500 mt-2">
                GPA: 3.74 / 4.00
              </p>
            </div>

            {/* Block 2: Location */}
            <div className="p-6 border border-neutral-800 bg-neutral-900/20 hover:bg-neutral-900/50 transition-colors group">
              <div className="flex items-start justify-between mb-4">
                <MapPin
                  size={20}
                  className="text-neutral-500 group-hover:text-white transition-colors"
                />
                <span className="font-mono text-[10px] text-neutral-600">
                  BASE_LOC
                </span>
              </div>
              <h4 className="text-lg font-bold text-white">
                Surabaya, Indonesia
              </h4>
              <p className="text-sm text-neutral-400">
                Available for Remote Work
              </p>
              <p className="text-xs font-mono text-neutral-500 mt-2">GMT+7</p>
            </div>

            {/* Block 3: Contact */}
            <a
              href="mailto:aryasatyagigachad9@gmail.com"
              className="p-6 border border-neutral-800 bg-neutral-900/20 hover:bg-neutral-900/50 transition-colors group cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <Mail
                  size={20}
                  className="text-neutral-500 group-hover:text-white transition-colors"
                />
                <span className="font-mono text-[10px] text-neutral-600">
                  COMM_LINK
                </span>
              </div>
              <h4 className="text-lg font-bold text-white group-hover:underline decoration-green-500 underline-offset-4 decoration-2">
                aryasatya...
              </h4>
              <div className="flex items-center gap-2 mt-2 text-xs font-mono text-neutral-500 group-hover:text-green-400 transition-colors">
                <span>SEND MESSAGE</span>
                <ArrowUpRight size={12} />
              </div>
            </a>

            {/* Block 4: Resume */}
            <a
              href="/cv/ARYASATYA_ALAAUDDIN_CV.pdf"
              target="_blank"
              className="p-6 border border-neutral-800 bg-neutral-900/20 hover:bg-green-900/10 hover:border-green-500/50 transition-colors group cursor-pointer flex flex-col justify-between"
            >
              <div className="flex items-start justify-between mb-2">
                <Download
                  size={20}
                  className="text-neutral-500 group-hover:text-green-400 transition-colors"
                />
                <span className="font-mono text-[10px] text-neutral-600 group-hover:text-green-500">
                  DATABASE
                </span>
              </div>
              <div>
                <h4 className="text-lg font-bold text-white group-hover:text-green-400 transition-colors">
                  Download CV
                </h4>
                <p className="text-xs font-mono text-neutral-500 mt-1">
                  .PDF FORMAT
                </p>
              </div>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
