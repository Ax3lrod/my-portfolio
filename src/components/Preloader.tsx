"use client";

import React, { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";

// --- Configuration ---
const DURATION = 5;
const DELAY_BEFORE_EXIT = 1;
const STRIP_ONES = Array.from({ length: 101 }, (_, i) => i % 10).reverse();

const STRIP_TENS = Array.from({ length: 11 }, (_, i) => i % 10).reverse();

const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const startTime = Date.now();
    const endTime = startTime + DURATION * 1000;

    const interval = setInterval(() => {
      const now = Date.now();
      const timeLeft = Math.max(0, endTime - now);
      const progress = 1 - timeLeft / (DURATION * 1000);
      const easedProgress = 1 - (1 - progress) * (1 - progress);

      const currentCount = Math.min(100, Math.round(easedProgress * 100));

      if (currentCount >= 100) {
        setCount(100);
        clearInterval(interval);
        setTimeout(() => {
          setIsVisible(false);
          setTimeout(onComplete, 800);
        }, DELAY_BEFORE_EXIT * 1000);
      } else {
        setCount(currentCount);
      }
    }, 20);

    return () => clearInterval(interval);
  }, [onComplete]);

  const tensDigit = Math.floor(count / 10);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={`fixed inset-0 z-100 flex flex-col items-center justify-center bg-[#050505] text-[#EAEAEA] overflow-hidden font-led`}
          exit={{ y: "-100%" }}
          transition={{ duration: 1.0, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Background Textures */}
          <div className="absolute inset-0 pointer-events-none z-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150" />
          <div className="absolute inset-0 pointer-events-none z-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-size-[100%_3px,6px_100%]" />

          <div className="relative z-20 flex flex-col items-center">
            {/* --- Main Odometer --- */}
            <div
              className="relative flex items-center justify-center text-[12vw] md:text-[9vw] leading-none tracking-widest font-bold"
              style={{
                textShadow: "0 0 30px rgba(255, 255, 255, 0.15)",
              }}
            >
              {/* 1. HUNDREDS (Only appears at 100) */}
              <div className="relative w-[1.2ch] h-[1em] overflow-hidden flex justify-center">
                {count === 100 && (
                  <motion.span
                    initial={{ y: "-100%" }}
                    animate={{ y: 0 }}
                    transition={{ type: "spring", stiffness: 50, damping: 20 }}
                    className="absolute"
                  >
                    1
                  </motion.span>
                )}
              </div>

              {/* 2. TENS COLUMN */}
              <div className="relative w-[1.2ch] h-[1em] overflow-hidden flex justify-center">
                {count < 100 ? (
                  <motion.div
                    className="absolute left-0 right-0 flex flex-col items-center"
                    initial={false}
                    animate={{ y: `-${10 - tensDigit}em` }}
                    transition={{
                      type: "spring",
                      stiffness: 50,
                      damping: 20,
                      mass: 1,
                    }}
                  >
                    {STRIP_TENS.map((n, i) => (
                      <div
                        key={i}
                        className="h-[1em] flex items-center justify-center"
                      >
                        {n}
                      </div>
                    ))}
                  </motion.div>
                ) : (
                  <motion.span
                    initial={{ y: "-100%" }}
                    animate={{ y: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 50,
                      damping: 20,
                      delay: 0.1,
                    }}
                    className="absolute"
                  >
                    0
                  </motion.span>
                )}
              </div>

              {/* 3. ONES COLUMN (The Long Strip) */}
              <div className="relative w-[1.2ch] h-[1em] overflow-hidden flex justify-center">
                {count < 100 ? (
                  <motion.div
                    className="absolute left-0 right-0 flex flex-col items-center"
                    initial={false}
                    animate={{ y: `-${100 - count}em` }}
                    // Low stiffness creates the "motion blur" trail effect
                    transition={{
                      type: "spring",
                      stiffness: 35,
                      damping: 20,
                      mass: 1,
                    }}
                  >
                    {STRIP_ONES.map((n, i) => (
                      <div
                        key={i}
                        className="h-[1em] flex items-center justify-center"
                      >
                        {n}
                      </div>
                    ))}
                  </motion.div>
                ) : (
                  <motion.span
                    initial={{ y: "-100%" }}
                    animate={{ y: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 50,
                      damping: 20,
                      delay: 0.2,
                    }}
                    className="absolute"
                  >
                    0
                  </motion.span>
                )}
              </div>

              {/* Percent Symbol */}
              <span className="text-[2vw] md:text-[1.5vw] self-end mb-3 ml-3 opacity-40">
                %
              </span>
            </div>
          </div>

          {/* --- Bottom Status Line --- */}
          <div className="absolute bottom-12 w-full px-8 md:px-12 flex justify-between text-[10px] md:text-sm uppercase tracking-[0.2em] opacity-60 font-mono">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              /// INITIALIZING CORE
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {count < 100 ? "DECRYPTING..." : "ACCESS GRANTED"}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
