"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

const CustomCursor = () => {
  const [isActive, setIsActive] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Using motion values for high-performance updates without re-renders
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    // Check if device is touch-enabled
    if (typeof window !== "undefined") {
      setIsTouchDevice(window.matchMedia("(pointer: coarse)").matches);
    }
  }, []);

  // Smooth spring physics for the cursor movement
  const springConfig = { damping: 40, stiffness: 400, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    if (isTouchDevice) return; // Don't attach listeners on touch devices

    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if target is clickable
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.classList.contains("cursor-pointer")
      ) {
        setIsActive(true);
      } else {
        setIsActive(false);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [mouseX, mouseY, isTouchDevice]);

  if (isTouchDevice) return null;

  return (
    <>
      {/* Hide Default Cursor Globally */}
      <style jsx global>{`
        @media (pointer: fine) {
          body, a, button, [role="button"], .cursor-pointer, * {
            cursor: none !important;
          }
        }
      `}</style>

      {/* Main Cursor (Dot) - Stays precise */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference hidden md:block"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
      </motion.div>

      {/* Secondary Cursor (Ring/Bracket) - Lags slightly & Expands */}
      <motion.div
        className="fixed top-0 left-0 z-[9998] pointer-events-none hidden md:flex items-center justify-center"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          animate={{
            width: isActive ? 40 : 20,
            height: isActive ? 40 : 20,
            opacity: isActive ? 1 : 0.5,
            rotate: isActive ? 90 : 0,
          }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="relative"
        >
          {/* Cyberpunk Crosshair / Corners */}
          <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-green-500/50" />
          <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-green-500/50" />
          <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-green-500/50" />
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-green-500/50" />
        </motion.div>
      </motion.div>
    </>
  );
};

export default CustomCursor;
