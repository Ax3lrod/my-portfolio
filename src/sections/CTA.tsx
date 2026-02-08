"use client";

import { ArrowUpRight, MessageSquare } from "lucide-react";
import { motion } from "motion/react";
import GlitchText from "@/components/GlitchText";
import HologramCanvas from "@/components/3d/HolographicObject";

const CTA = () => {
  return (
    <section id="contact" className="relative w-full bg-black py-24 md:py-40 overflow-hidden border-t border-neutral-900">
      {/* Background Decoration (Hologram) */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none mix-blend-screen hidden md:block">
        <HologramCanvas />
      </div>

      <div className="relative z-10 max-w-400 mx-auto px-6 md:px-12">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-green-500/30 bg-green-500/5 text-green-500 text-[10px] font-mono tracking-[0.2em] mb-8 uppercase"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            Available for new projects
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-8xl font-display font-bold tracking-tighter text-white mb-12 uppercase leading-[0.9]"
          >
            <GlitchText text="LET'S WORK" altText="一緒に働こう" />
            <br />
            <span className="text-neutral-500">TOGETHER</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <a
              href="mailto:aryasatyaalaauddin@gmail.com"
              className="group relative inline-flex items-center gap-4 bg-white text-black px-8 py-4 md:px-12 md:py-6 text-sm md:text-lg font-display font-bold uppercase tracking-tighter overflow-hidden hover:text-white transition-colors duration-300"
            >
              <div className="absolute inset-0 bg-green-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              <span className="relative z-10">Get in touch</span>
              <ArrowUpRight
                size={24}
                className="relative z-10 group-hover:rotate-45 transition-transform duration-300"
              />
            </a>
          </motion.div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-2xl">
            {[
              {
                label: "GITHUB",
                value: "Ax3lrod",
                link: "https://github.com/Ax3lrod",
              },
              {
                label: "INSTAGRAM",
                value: "@axlr0d_",
                link: "https://www.instagram.com/axlr0d_/",
              },
              {
                label: "LINKEDIN",
                value: "Aryasatya Alaauddin",
                link: "https://www.linkedin.com/in/aryasatyaalaauddin",
              },
            ].map((social, i) => (
              <motion.a
                key={social.label}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                className="flex flex-col items-center md:items-start p-4 border border-neutral-900 hover:border-neutral-700 transition-colors bg-neutral-950"
              >
                <span className="text-[10px] font-mono text-neutral-500 mb-2 uppercase tracking-widest">
                  // {social.label}
                </span>
                <span className="text-sm font-medium text-white group-hover:text-green-400 transition-colors">
                  {social.value}
                </span>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
