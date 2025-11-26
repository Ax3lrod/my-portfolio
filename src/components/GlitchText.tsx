"use client";

import React, { useState, useEffect } from "react";

interface GlitchTextProps {
  text: string;
  altText: string; // Teks Jepang
  className?: string;
}

const GlitchText: React.FC<GlitchTextProps> = ({
  text,
  altText,
  className = "",
}) => {
  const [currentText, setCurrentText] = useState(text);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    // Interval setiap 10 detik
    const interval = setInterval(() => {
      // 1. Mulai Glitch
      setIsActive(true);

      // 2. Ubah ke bahasa Jepang setelah glitch mulai berjalan sebentar (300ms)
      setTimeout(() => {
        setCurrentText(altText);
      }, 300);

      // 3. Kembalikan ke bahasa Inggris setelah beberapa saat (2.5 detik)
      setTimeout(() => {
        setCurrentText(text);
      }, 2500);

      // 4. Matikan efek glitch (3 detik total durasi)
      setTimeout(() => {
        setIsActive(false);
      }, 3000);
    }, 10000); // Trigger setiap 10.000ms (10 detik)

    return () => clearInterval(interval);
  }, [text, altText]);

  return (
    <div className={`relative inline-block ${className}`}>
      <span
        className={`cyber-glitch ${isActive ? "glitch-active" : ""}`}
        data-text={currentText}
      >
        <span>{currentText}</span>
      </span>
    </div>
  );
};

export default GlitchText;
