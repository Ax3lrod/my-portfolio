"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import {
  Download,
  MapPin,
  GraduationCap,
  Mail,
  ArrowUpRight,
} from "lucide-react";
import Image from "@/components/Image";
import GlitchText from "@/components/GlitchText";
import { CornerBracket, HudScopeTwo } from "@/components/CyberAssets";
import { ArwesFrame } from "@/components/ArwesFrame";

const Profile = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="profile"
      ref={ref}
      className="relative w-full bg-black text-white py-24 md:py-32 overflow-hidden border-t border-neutral-900"
    >
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none select-none overflow-hidden">
        <h1 className="text-[20vw] font-display font-bold leading-none text-white tracking-tighter translate-x-1/3">
          ARYA
        </h1>
      </div>

      <div className="relative z-10 max-w-400 mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
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
              src="profile"
              alt="Aryasatya Alaauddin"
              fill
              className="object-cover lg:grayscale group-hover:grayscale-0 transition-all duration-700 ease-out"
            />

            {/* Overlay UI Elements (HUD) */}
            <div className="absolute inset-0 m-2 pointer-events-none text-white/50">
              <CornerBracket className="absolute top-0 left-0" />
              <CornerBracket className="absolute top-0 right-0" flipX />
              <CornerBracket className="absolute bottom-0 left-0" flipY />
              <CornerBracket className="absolute bottom-0 right-0" flipX flipY />
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
            <h3 className="text-3xl md:text-5xl font-display font-bold leading-tight mb-6">
              Hello!, I'm{" "}
              <GlitchText text="Aryasatya Alaauddin" altText="Ax3lrod" />
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
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* Block 1: Education */}
            <ArwesFrame className="h-full">
              <div className="p-6 transition-colors group">
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
                  GPA: 3.80 / 4.00
                </p>
              </div>
            </ArwesFrame>

            {/* Block 2: Location */}
            <ArwesFrame>
              <div className="p-6 transition-colors group">
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
            </ArwesFrame>

            {/* Block 3: Contact */}
            <ArwesFrame>
              <a
                href="mailto:aryasatyaalaauddin@gmail.com"
                className="p-6 block transition-colors group cursor-pointer"
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
                  aryasatyaalaauddin@gmail.com
                </h4>
                <div className="flex items-center gap-2 mt-2 text-xs font-mono text-neutral-500 group-hover:text-green-400 transition-colors">
                  <span>SEND MESSAGE</span>
                  <ArrowUpRight size={12} />
                </div>
              </a>
            </ArwesFrame>

            {/* Block 4: Resume */}
            <ArwesFrame color="#1bc7fb">
              <a
                href="/cv/ARYASATYA_ALAAUDDIN_CV.pdf"
                target="_blank"
                className="p-6 transition-colors group cursor-pointer flex flex-col justify-between"
              >
                <div className="flex items-start justify-between mb-2">
                  <Download
                    size={20}
                    className="text-neutral-500 group-hover:text-cyan-400 transition-colors"
                  />
                  <span className="font-mono text-[10px] text-neutral-600 group-hover:text-cyan-500">
                    DATABASE
                  </span>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">
                    Download CV
                  </h4>
                  <p className="text-xs font-mono text-neutral-500 mt-1">
                    .PDF FORMAT
                  </p>
                </div>
              </a>
            </ArwesFrame>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Profile