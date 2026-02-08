"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation, useInView } from "motion/react";

interface ArwesFrameProps {
  children: React.ReactNode;
  className?: string;
  color?: string;
  active?: boolean;
}

export const ArwesFrame = ({
  children,
  className = "",
  color = "#22c55e", // green-500
  active = true,
}: ArwesFrameProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true });
  const controls = useAnimation();
  const [dims, setDims] = useState({ w: 0, h: 0 });

  useEffect(() => {
    if (containerRef.current) {
      setDims({
        w: containerRef.current.offsetWidth,
        h: containerRef.current.offsetHeight,
      });
    }
  }, []);

  useEffect(() => {
    if (isInView && active) {
      controls.start("visible");
    }
  }, [isInView, active, controls]);

  const cornerSize = 15;
  const w = dims.w;
  const h = dims.h;

  // Main Path: TopLeft -> TopRight -> BottomRightCut -> BottomLeft -> Z
  const mainPath = `M 0,0 L ${w},0 L ${w},${h - cornerSize} L ${w - cornerSize},${h} L 0,${h} Z`;
  
  // Accents
  const topLeftAccent = `M 0,${cornerSize * 2} L 0,0 L ${cornerSize * 2},0`;
  const bottomRightAccent = `M ${w - cornerSize * 3},${h} L ${w - cornerSize},${h} L ${w},${h - cornerSize} L ${w},${h - cornerSize * 3}`;

  return (
    <div
      ref={containerRef}
      className={`relative group ${className}`}
      style={{
        clipPath: `polygon(0 0, 100% 0, 100% calc(100% - ${cornerSize}px), calc(100% - ${cornerSize}px) 100%, 0 100%)`,
      }}
    >
      {/* Background with subtle glow on hover */}
      <div className="relative z-10 w-full h-full bg-neutral-900/40 backdrop-blur-sm group-hover:bg-neutral-900/60 transition-colors duration-500">
        {children}
      </div>

      {/* SVG Border Layer */}
      {w > 0 && (
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-20 overflow-visible"
          viewBox={`0 0 ${w} ${h}`}
        >
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Perimeter Line */}
          <motion.path
            d={mainPath}
            fill="none"
            stroke={color}
            strokeWidth="0.5"
            strokeOpacity="0.3"
            initial={{ pathLength: 0 }}
            animate={controls}
            variants={{
              visible: { pathLength: 1, transition: { duration: 1 } }
            }}
          />

          {/* Bright Accents */}
          <motion.path
            d={topLeftAccent}
            fill="none"
            stroke={color}
            strokeWidth="2"
            filter="url(#glow)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={controls}
            variants={{
              visible: { pathLength: 1, opacity: 1, transition: { duration: 0.8, delay: 0.5 } }
            }}
          />

          <motion.path
            d={bottomRightAccent}
            fill="none"
            stroke={color}
            strokeWidth="2"
            filter="url(#glow)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={controls}
            variants={{
              visible: { pathLength: 1, opacity: 1, transition: { duration: 0.8, delay: 0.7 } }
            }}
          />
        </svg>
      )}

      {/* Scanner Effect */}
      <motion.div
        className="absolute left-0 w-full h-[1px] z-30 pointer-events-none opacity-20"
        style={{
          background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
        }}
        animate={{
          top: ["0%", "100%", "0%"],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
};