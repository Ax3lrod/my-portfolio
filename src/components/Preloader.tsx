"use client";

import React, { useEffect, useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  animate,
} from "motion/react";

// --- Static Configuration ---
const STRIP_ONES = Array.from({ length: 101 }, (_, i) => i % 10).reverse();
const STRIP_TENS = Array.from({ length: 11 }, (_, i) => i % 10).reverse();

const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const [isComplete, setIsComplete] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const countMotion = useMotionValue(0);

  const onesY = useTransform(countMotion, (latest) => {
    const val = Math.round(latest);
    return `-${100 - val}em`;
  });

  const tensY = useTransform(countMotion, (latest) => {
    const val = Math.floor(latest / 10);
    return `-${10 - val}em`;
  });

  const statusText = useTransform(countMotion, (latest) =>
    latest < 100 ? "DECRYPTING..." : "ACCESS GRANTED"
  );

  useEffect(() => {
    const controls = animate(countMotion, 100, {
      duration: 4.5,
      ease: [0.76, 0, 0.24, 1],
      onComplete: () => {
        setIsComplete(true);
        setTimeout(() => {
          setIsVisible(false);
          setTimeout(onComplete, 800);
        }, 1000);
      },
    });

    return () => controls.stop();
  }, [countMotion, onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050505] text-[#EAEAEA] overflow-hidden font-led"
          exit={{ y: "-100%" }}
          transition={{ duration: 1.0, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Background Textures (Static) */}
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
              {/* Ghost 888 (Background Decoration) */}
              <div className="absolute inset-0 flex justify-center opacity-[0.05] pointer-events-none blur-[1px]">
                <span className="w-[1.2ch] flex justify-center">8</span>
                <span className="w-[1.2ch] flex justify-center">8</span>
                <span className="w-[1.2ch] flex justify-center">8</span>
              </div>

              {/* 1. HUNDREDS (Only appears at 100) */}
              <div className="relative w-[1.2ch] h-[1em] overflow-hidden flex justify-center">
                {isComplete && (
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
                {!isComplete ? (
                  <motion.div
                    className="absolute left-0 right-0 flex flex-col items-center"
                    style={{ y: tensY }} // Direct GPU binding
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
                {!isComplete ? (
                  <motion.div
                    className="absolute left-0 right-0 flex flex-col items-center"
                    style={{ y: onesY }} // Direct GPU binding
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
              <MotionTextDisplay value={statusText} />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const MotionTextDisplay = ({ value }: { value: any }) => {
  const [text, setText] = useState("DECRYPTING...");
  useEffect(() => {
    return value.on("change", (latest: string) => {
      setText(latest);
    });
  }, [value]);
  return <>{text}</>;
};

export default Preloader;
