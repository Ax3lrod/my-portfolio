"use client";

import { motion } from "motion/react";
import { Cpu, Terminal, Layers, Database } from "lucide-react";
import GlitchText from "@/components/GlitchText";

const STACK_MARQUEE = [
  "NEXT.JS",
  "REACT",
  "LARAVEL 11",
  "DOCKER",
  "NODE.JS",
  "TYPESCRIPT",
  "ANDROID",
  "C++",
];

const CATEGORIES = [
  {
    id: "01",
    label: "FRONTEND_ECOSYSTEM",
    icon: Layers,
    items: [
      "React",
      "Next.js",
      "Vue.js",
      "JavaScript (ES6+)",
      "Laravel Blade",
      "Tailwind CSS",
    ],
  },
  {
    id: "02",
    label: "BACKEND_INFRA",
    icon: Database,
    items: ["Node.js", "Express.js"],
  },
  {
    id: "03",
    label: "SYSTEM_&_MOBILE",
    icon: Cpu,
    items: ["C/C++", "Android Studio (Java)", "Algorithms"],
  },
  {
    id: "04",
    label: "DEVOPS_&_TOOLS",
    icon: Terminal,
    items: ["Git / GitHub", "Docker", "Postman", "Figma"],
  },
];

const TechStack = () => {
  return (
    <section className="relative w-full bg-black text-white pt-10 overflow-hidden">
      {/* --- HEADER --- */}
      <div className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-12 mb-6 flex flex-col md:flex-row justify-between items-end border-b border-neutral-900 pb-6">
        <div>
          <h2 className="font-mono text-xs text-green-500 mb-2 tracking-widest">
            // TECHNICAL_COMPETENCE
          </h2>
          <h3 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase text-white">
            <GlitchText text="SKILLS" altText="スキル" />
          </h3>
        </div>
        <div className="hidden md:block">
          <p className="font-mono text-xs text-neutral-500 text-right">
            UNLOCKED_SKILLS
          </p>
        </div>
      </div>

      {/* --- MARQUEE --- */}
      <div className="relative z-10 w-full border-y border-neutral-900 bg-neutral-950/50 backdrop-blur-sm mb-20 overflow-hidden py-8">
        <div className="flex whitespace-nowrap">
          <motion.div
            className="flex gap-16 md:gap-32 px-16"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 20, ease: "linear", repeat: Infinity }}
          >
            {[...STACK_MARQUEE, ...STACK_MARQUEE].map((item, i) => (
              <span
                key={i}
                className="text-6xl md:text-8xl font-black tracking-tighter text-transparent"
                style={{ WebkitTextStroke: "1px rgba(255,255,255,0.2)" }}
              >
                {item}
              </span>
            ))}
          </motion.div>
        </div>

        <div className="absolute inset-y-0 left-0 w-24 bg-linear-to-r from-black to-transparent z-20" />
        <div className="absolute inset-y-0 right-0 w-24 bg-linear-to-l from-black to-transparent z-20" />
      </div>

      {/* --- GRID CATEGORIES --- */}
      <div className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {CATEGORIES.map((cat, idx) => (
          <div
            key={cat.id}
            className="group relative border border-neutral-800 bg-neutral-900/30 p-6 md:p-8 hover:border-green-500/50 transition-colors duration-500"
          >
            {/* Hover Glow Effect */}
            <div className="absolute inset-0 bg-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Header Card */}
            <div className="relative z-10 flex justify-between items-start mb-8">
              <cat.icon
                size={24}
                className="text-neutral-500 group-hover:text-green-400 transition-colors"
              />
              <span className="font-mono text-xs text-neutral-600 group-hover:text-green-500/50 transition-colors">
                {cat.id}
              </span>
            </div>

            {/* Title */}
            <h4 className="relative z-10 font-mono text-sm tracking-widest text-neutral-400 mb-6 group-hover:text-white transition-colors">
              {cat.label}
            </h4>

            {/* List */}
            <ul className="relative z-10 space-y-3">
              {cat.items.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 text-sm font-light text-neutral-300"
                >
                  <span className="w-1 h-1 bg-neutral-600 rounded-full group-hover:bg-green-500 transition-colors" />
                  {item}
                </li>
              ))}
            </ul>

            {/* Corner Decoration */}
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-neutral-700 group-hover:border-green-500 transition-colors" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default TechStack;
