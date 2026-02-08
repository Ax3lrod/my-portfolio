"use client";

import {
  ArrowUp,
  ArrowUpRight,
  Github,
  Instagram,
  Mail,
  Twitter,
} from "lucide-react";
import React, { useEffect, useState } from "react";

const Footer = () => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          timeZone: "Asia/Jakarta",
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative w-full bg-neutral-950 text-white pt-20 overflow-hidden border-t border-neutral-900">
      {/* --- CONTENT GRID --- */}
      <div className="max-w-450 mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-24">
        {/* Col 1: Brand / Connect */}
        <div className="md:col-span-5 flex flex-col justify-between h-full">
          <div>
            <h3 className="font-mono text-xs text-neutral-500 mb-6 tracking-widest uppercase">
              // CONNECT
            </h3>
            <p className="text-xl md:text-2xl font-light leading-relaxed mb-8 text-neutral-300 max-w-md">
              Open for new opportunities, creative collaborations, or just a
              friendly technical discussion.
            </p>

            <a
              href="mailto:aryasatyaalaauddin@gmail.com"
              className="inline-flex items-center gap-4 group border-b border-neutral-700 pb-1 hover:border-green-500 transition-colors"
            >
              <span className="font-mono text-sm text-neutral-400 group-hover:text-green-400 transition-colors uppercase tracking-widest">
                SEND_MESSAGE
              </span>
              <ArrowUpRight
                size={18}
                className="text-neutral-600 group-hover:text-green-500 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all"
              />
            </a>
          </div>

          <div className="hidden md:block mt-12">
            <div className="flex items-center gap-2 text-green-500">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="font-mono text-xs">SYSTEM_ONLINE</span>
            </div>
          </div>
        </div>

        {/* Col 2: Spacer (Desktop) */}
        <div className="hidden md:block md:col-span-3" />

        {/* Col 3: Links */}
        <div className="md:col-span-2 space-y-8">
          <div>
            <h4 className="font-mono text-xs text-neutral-500 mb-4 tracking-widest">
              SITEMAP
            </h4>
            <ul className="space-y-2 font-mono text-sm text-neutral-400">
              {[
                { name: "INDEX", id: "home" },
                { name: "ABOUT", id: "profile" },
                { name: "STACK", id: "stack" },
                { name: "PROJECTS", id: "projects" },
                { name: "AWARDS", id: "achievements" },
                { name: "CONTACT", id: "contact" },
              ].map((item) => (
                <li key={item.name}>
                  <button
                    onClick={() =>
                      document
                        .getElementById(item.id)
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                    className="hover:text-white transition-colors flex items-center gap-2 group cursor-pointer"
                  >
                    <span className="opacity-0 -ml-3 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-green-500">
                      &gt;
                    </span>
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Col 4: Socials */}
        <div className="md:col-span-2 space-y-8">
          <div>
            <h4 className="font-mono text-xs text-neutral-500 mb-4 tracking-widest">
              SOCIALS
            </h4>
            <ul className="space-y-2 font-mono text-sm text-neutral-400">
              {[
                {
                  name: "LINKEDIN",
                  href: "https://www.linkedin.com/in/aryasatyaalaauddin",
                },
                { name: "GITHUB", href: "https://github.com/Ax3lrod" },
                {
                  name: "INSTAGRAM",
                  href: "https://www.instagram.com/axlr0d_/",
                },
                { name: "EMAIL", href: "mailto:aryasatyaalaauddin@gmail.com" },
              ].map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors flex items-center gap-2"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="relative border-t border-neutral-900">
        <button
          onClick={scrollToTop}
          className="absolute -top-6 right-6 md:right-12 w-12 h-12 bg-neutral-900 border border-neutral-800 rounded-full flex items-center justify-center hover:bg-green-500 hover:text-black hover:border-green-500 transition-all duration-300 z-10 group"
        >
          <ArrowUp
            size={20}
            className="group-hover:-translate-y-1 transition-transform"
          />
        </button>

        <div className="w-full overflow-hidden leading-none select-none group">
          <h1 className="text-[14vw] md:text-[16.5vw] font-display font-bold tracking-tighter text-neutral-900 text-center group-hover:text-neutral-800 transition-colors duration-700">
            ARYASATYA
            <span className="text-neutral-800 group-hover:text-neutral-700">
              ALAAUDDIN
            </span>
          </h1>
        </div>
      </div>

      {/* --- BOTTOM BAR --- */}
      <div className="w-full bg-black border-t border-neutral-900 px-6 md:px-12 py-4 flex flex-col md:flex-row justify-between items-center text-[10px] font-mono text-neutral-500 gap-4">
        <div className="flex items-center gap-6">
          <span>© 2025 ARYASATYA ALAAUDDIN</span>
          <span className="hidden md:inline">|</span>
          <span className="hover:text-white cursor-pointer transition-colors">
            PRIVACY POLICY
          </span>
          <span className="hover:text-white cursor-pointer transition-colors">
            TERMS OF USE
          </span>
        </div>

        <div className="flex items-center gap-4">
          <span>SURABAYA, ID</span>
          <span className="text-green-500">{time}</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
