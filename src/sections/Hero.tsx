"use client";

import { motion } from "motion/react";
import { ArrowDownRight, Globe, Cpu } from "lucide-react";
import AsciiMediaRenderer from "@/components/AsciiMediaRenderer";
import GlitchText from "@/components/GlitchText";
import { HudScopeThree, HudFrameDiamond } from "@/components/CyberAssets";

const Hero = () => {
  return (
    <section id="home" className="relative w-full h-screen bg-black text-[#EAEAEA] overflow-hidden">
      {/* --- LAYER 1: The ASCII Background --- */}
      <div className="absolute inset-0 z-10 opacity-60">
        <AsciiMediaRenderer />
      </div>

      {/* --- LAYER 2: Scanlines & Vignette --- */}
      <div className="absolute inset-0 z-10 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-size-[100%_2px,3px_100%] contrast-125 brightness-110" />
      <div className="absolute inset-0 z-10 pointer-events-none bg-radial-gradient(circle at center, transparent 50%, black 120%)" />

      {/* --- LAYER 3: Content Grid --- */}
      <div className="relative z-20 w-full h-full flex flex-col justify-between p-6 md:p-12 max-w-400 mx-auto">
        {/* Decorative HUD Scope */}
        <motion.div
          className="absolute bottom-24 right-10 opacity-20 hidden md:block pointer-events-none"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <HudScopeThree size={160} className="text-neutral-500" />
        </motion.div>

        {/* Header Row */}
        <header className="flex justify-between items-start">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-xl md:text-2xl font-display font-bold tracking-tight">
              ARYASATYA <span className="text-neutral-500">ALAAUDDIN</span>
            </h1>
            <p className="text-xs font-mono text-neutral-400 mt-1">
              PORTFOLIO / 2025
            </p>
          </motion.div>

          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="hidden md:flex gap-8 text-xs font-mono tracking-wide"
          >
            <div className="flex items-center gap-2">
              <HudFrameDiamond size={14} className="text-green-500 animate-pulse" />
              SYSTEM ONLINE
            </div>
            <div className="flex items-center gap-2 text-neutral-400">
              <Globe size={12} />
              SURABAYA, ID
            </div>
          </motion.div>
        </header>

        {/* Center / Main Content */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
          <motion.div
            className="flex-1"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="overflow-hidden">
              <h2 className="text-[12vw] md:text-[8vw] leading-[0.85] font-display font-bold tracking-tighter text-white">
                <GlitchText text="SOFTWARE" altText="ソフトウェア" />
              </h2>
            </div>
            <div className="overflow-hidden">
              <h2 className="text-[12vw] md:text-[8vw] leading-[0.85] font-display font-bold tracking-tighter text-neutral-500">
                <GlitchText text="ENGINEER" altText="エンジニア" />
              </h2>
            </div>
          </motion.div>

          {/* Description Block */}
          <motion.div
            className="md:w-75 space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <p className="text-sm md:text-base text-neutral-300 leading-relaxed font-light">
              I am a software engineer specializing in frontend and backend web
              development. I currently major Information Technology at ITS
              Surabaya.
            </p>

            <div className="flex gap-4 pt-4 border-t border-white/20">
              <button
                onClick={() =>
                  document
                    .getElementById("stack")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="group flex items-center gap-2 text-xs font-mono uppercase tracking-wider hover:text-green-400 transition-colors"
              >
                <Cpu size={14} />
                <span>The Stack</span>
              </button>
              <button
                onClick={() =>
                  document
                    .getElementById("projects")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="group flex items-center gap-2 text-xs font-mono uppercase tracking-wider hover:text-green-400 transition-colors"
              >
                <ArrowDownRight
                  size={14}
                  className="group-hover:-rotate-45 transition-transform"
                />
                <span>See Projects</span>
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
