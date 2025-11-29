"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { parseGIF, decompressFrames } from "gifuct-js";

interface Charsets {
  [key: string]: string;
}

interface Config {
  width: number;
  brightness: number;
  contrast: number;
  blur: number;
  activeCharset: string;
  mediaUrl: string;
  mediaType: "gif" | "video" | "image";
  fps: number;
  color: string;
  backgroundColor: string;
  glowIntensity: number;
  scale: number;
}

const CHARSETS: Charsets = {
  galaxy: "@%#*+=:. ",
  matrix:
    "ｦｱｳｴｵｶｷｹｺｻｼｽｾｿﾀﾂﾃﾅﾆﾇﾈﾊﾋﾎﾏﾐﾑﾒﾓﾔﾕﾗﾘﾜ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ$@%#&*+=:;,.<>?/\\|[]{}()\"'`~!^_- ",
  full: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$@%#&*+=:;,.<>?/\\|[]{}()\"'`~!^_- ",
  dense: "█▓▒░@&#%*+=-:. ",
  blocks: "█▓▒░ ",
  standard: "@%#*+=:. ",
  cyberpunk: 'ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ0123456789Z:・."=*+-<>¦｜ç∏ ',
  simple: " .:-=+*#%@",
};

const INITIAL_CONFIG: Config = {
  width: 286,
  brightness: 1,
  contrast: 2.3,
  blur: 0,
  activeCharset: "dense",
  mediaUrl: "ghostintheshell.gif",
  mediaType: "gif",
  fps: 30,
  color: "#4ade80",
  backgroundColor: "#000000",
  glowIntensity: 5,
  scale: 0.85,
};

const AsciiMediaRenderer: React.FC = () => {
  const [config, setConfig] = useState<Config>(INITIAL_CONFIG);
  const [frames, setFrames] = useState<string[]>([]);
  const [currentFrame, setCurrentFrame] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isDevOpen, setIsDevOpen] = useState<boolean>(true);
  const [mounted, setMounted] = useState(false);

  const rawGifFramesRef = useRef<any[] | null>(null);
  const rawVideoElementRef = useRef<HTMLVideoElement | null>(null);
  const rawImageElementRef = useRef<HTMLImageElement | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const frameIndexRef = useRef<number>(0);

  const isDev = process.env.NEXT_PUBLIC_ENV === "development";

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isMobile = window.innerWidth < 768;

      setConfig((prev) => ({
        ...prev,
        width: isMobile ? 80 : 160,
        scale: isMobile ? 0.6 : 0.8,
      }));
    }
  }, []);

  const getAsciiChar = useCallback(
    (brightness: number, chars: string): string => {
      const index = Math.floor((1 - brightness) * (chars.length - 1));
      return chars[Math.max(0, Math.min(chars.length - 1, index))];
    },
    []
  );

  const processFrame = useCallback(
    (source: CanvasImageSource, width: number, height: number): string => {
      const canvas = canvasRef.current;
      if (!canvas) return "";

      const ctx = canvas.getContext("2d", {
        alpha: false,
        willReadFrequently: true,
      });
      if (!ctx) return "";

      const aspectRatio = height / width;

      const asciiHeight = Math.floor(config.width * aspectRatio * 0.45);

      canvas.width = config.width;
      canvas.height = asciiHeight;

      ctx.filter = `brightness(${config.brightness}) contrast(${config.contrast}) blur(${config.blur}px)`;
      ctx.drawImage(source, 0, 0, config.width, asciiHeight);

      const imageData = ctx.getImageData(0, 0, config.width, asciiHeight);
      const pixels = imageData.data;

      const chars = CHARSETS[config.activeCharset];
      const lines: string[] = [];

      for (let y = 0; y < asciiHeight; y++) {
        let line = "";
        for (let x = 0; x < config.width; x++) {
          const i = (y * config.width + x) * 4;
          const r = pixels[i];
          const g = pixels[i + 1];
          const b = pixels[i + 2];

          const avg = (r + g + b) / 3 / 255;
          line += getAsciiChar(avg, chars);
        }
        lines.push(line);
      }

      return lines.join("\n");
    },
    [config, getAsciiChar]
  );

  const fetchMedia = useCallback(async () => {
    setIsLoaded(false);
    rawGifFramesRef.current = null;
    rawVideoElementRef.current = null;
    rawImageElementRef.current = null;

    try {
      if (config.mediaType === "gif") {
        const resp = await fetch(config.mediaUrl);
        const buffer = await resp.arrayBuffer();
        const gif = parseGIF(buffer);
        const frames = decompressFrames(gif, true);
        rawGifFramesRef.current = frames;
      } else if (config.mediaType === "video") {
        const video = document.createElement("video");
        video.crossOrigin = "anonymous";
        video.src = config.mediaUrl;
        video.muted = true;
        video.playsInline = true;
        video.preload = "auto";
        await video.play().then(() => video.pause());
        rawVideoElementRef.current = video;
      } else if (config.mediaType === "image") {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = config.mediaUrl;
        await new Promise((resolve) => {
          img.onload = resolve;
        });
        rawImageElementRef.current = img;
      }
      renderAscii();
    } catch (e) {
      console.error("Error fetching media", e);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config.mediaUrl, config.mediaType]);

  const renderAscii = useCallback(async () => {
    if (
      !rawGifFramesRef.current &&
      !rawVideoElementRef.current &&
      !rawImageElementRef.current
    )
      return;

    const asciiFrames: string[] = [];

    if (config.mediaType === "gif" && rawGifFramesRef.current) {
      const frames = rawGifFramesRef.current;
      const tempCanvas = document.createElement("canvas");
      const tempCtx = tempCanvas.getContext("2d", { willReadFrequently: true });
      const patchCanvas = document.createElement("canvas");
      const patchCtx = patchCanvas.getContext("2d", {
        willReadFrequently: true,
      });

      if (frames.length > 0 && tempCtx && patchCtx) {
        const gifWidth = frames[0].dims.width;
        const gifHeight = frames[0].dims.height;
        tempCanvas.width = gifWidth;
        tempCanvas.height = gifHeight;

        frames.forEach((frame: any) => {
          const { width, height, top, left } = frame.dims;
          if (frame.patch.length > 0) {
            patchCanvas.width = width;
            patchCanvas.height = height;
            const patchData = new ImageData(
              new Uint8ClampedArray(frame.patch),
              width,
              height
            );
            patchCtx.putImageData(patchData, 0, 0);
            tempCtx.drawImage(patchCanvas, left, top);
          }
          asciiFrames.push(processFrame(tempCanvas, gifWidth, gifHeight));
        });
      }
    } else if (config.mediaType === "video" && rawVideoElementRef.current) {
      const video = rawVideoElementRef.current;
      const duration = video.duration;
      const targetFrames = Math.min(120, Math.floor(duration * config.fps));
      const interval = duration / targetFrames;

      for (let i = 0; i < targetFrames; i++) {
        video.currentTime = i * interval;
        await new Promise<void>((r) => {
          const onSeek = () => {
            video.removeEventListener("seeked", onSeek);
            r();
          };
          video.addEventListener("seeked", onSeek);
        });
        asciiFrames.push(
          processFrame(video, video.videoWidth, video.videoHeight)
        );
      }
    } else if (config.mediaType === "image" && rawImageElementRef.current) {
      const img = rawImageElementRef.current;
      asciiFrames.push(processFrame(img, img.width, img.height));
    }

    setFrames(asciiFrames);
    setIsLoaded(true);
  }, [config, processFrame]);

  useEffect(() => {
    fetchMedia();
    setMounted(true);
  }, [fetchMedia]);

  useEffect(() => {
    const timer = setTimeout(() => {
      renderAscii();
    }, 200);
    return () => clearTimeout(timer);
  }, [
    config.width,
    config.brightness,
    config.contrast,
    config.blur,
    config.activeCharset,
    config.fps,
    renderAscii,
  ]);

  useEffect(() => {
    if (!isLoaded || frames.length === 0) return;
    let lastTime = performance.now();
    const frameTime = 1000 / config.fps;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - lastTime;
      if (elapsed >= frameTime) {
        frameIndexRef.current = (frameIndexRef.current + 1) % frames.length;
        setCurrentFrame(frameIndexRef.current);
        lastTime = currentTime - (elapsed % frameTime);
      }
      animationRef.current = requestAnimationFrame(animate);
    };
    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isLoaded, frames, config.fps]);

  const handleCopyConfig = () => {
    const configStr = JSON.stringify(config, null, 2);
    navigator.clipboard.writeText(configStr);
    alert("Config copied to clipboard!");
  };

  const DevMenu = () => (
    <div
      className={`fixed top-4 right-0 z-9999 w-80 bg-neutral-900/95 backdrop-blur-md border-l border-b border-neutral-700 rounded-bl-lg shadow-2xl text-xs font-mono text-neutral-300 transition-transform duration-300 pointer-events-auto flex flex-col max-h-[90vh] ${
        isDevOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <button
        onClick={() => setIsDevOpen(!isDevOpen)}
        className="absolute top-0 right-full w-10 h-10 bg-neutral-800 border border-neutral-700 rounded-l-lg flex items-center justify-center hover:bg-neutral-700 cursor-pointer pointer-events-auto"
        style={{ marginRight: "-1px" }}
      >
        ⚙️
      </button>

      <div className="p-4 flex-none border-b border-neutral-700 flex justify-between items-center">
        <h3 className="font-bold text-white">ASCII TUNER</h3>
        <button
          onClick={handleCopyConfig}
          className="bg-green-600 hover:bg-green-500 text-white px-2 py-1 rounded text-[10px] transition-colors cursor-pointer"
        >
          COPY JSON
        </button>
      </div>

      <div className="p-4 space-y-4 overflow-y-auto flex-1 custom-scrollbar">
        {/* Appearance Controls */}
        <div className="space-y-3 bg-neutral-800/50 p-2 rounded">
          <div className="text-[10px] uppercase font-bold text-neutral-500 tracking-wider">
            Appearance
          </div>

          {/* Scale Control - Added */}
          <div className="space-y-1">
            <div className="flex justify-between">
              <label>Scale (Zoom)</label>
              <span>{config.scale.toFixed(2)}x</span>
            </div>
            <input
              type="range"
              min="0.1"
              max="2"
              step="0.05"
              value={config.scale}
              onChange={(e) =>
                setConfig({ ...config, scale: Number(e.target.value) })
              }
              className="w-full cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between">
            <label>Text Color</label>
            <div className="flex items-center gap-2">
              <span className="text-[10px] opacity-70">{config.color}</span>
              <input
                type="color"
                value={config.color}
                onChange={(e) =>
                  setConfig({ ...config, color: e.target.value })
                }
                className="w-6 h-6 rounded cursor-pointer border-none p-0 bg-transparent"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label>Background</label>
            <div className="flex items-center gap-2">
              <span className="text-[10px] opacity-70">
                {config.backgroundColor}
              </span>
              <input
                type="color"
                value={config.backgroundColor}
                onChange={(e) =>
                  setConfig({ ...config, backgroundColor: e.target.value })
                }
                className="w-6 h-6 rounded cursor-pointer border-none p-0 bg-transparent"
              />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between">
              <label>Glow Intensity</label>
              <span style={{ color: config.color }}>
                {config.glowIntensity}px
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="20"
              step="1"
              value={config.glowIntensity}
              onChange={(e) =>
                setConfig({
                  ...config,
                  glowIntensity: Number(e.target.value),
                })
              }
              className="w-full accent-white cursor-pointer"
            />
          </div>
        </div>

        {/* Processing Controls */}
        <div className="space-y-3">
          <div className="text-[10px] uppercase font-bold text-neutral-500 tracking-wider">
            Processing
          </div>

          <div className="space-y-1">
            <label className="block text-neutral-400">Charset</label>
            <select
              value={config.activeCharset}
              onChange={(e) =>
                setConfig({ ...config, activeCharset: e.target.value })
              }
              className="w-full bg-neutral-800 border border-neutral-600 rounded px-2 py-1 text-white cursor-pointer"
            >
              {Object.keys(CHARSETS).map((key) => (
                <option key={key} value={key}>
                  {key}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between">
              <label>Width (Resolution)</label>
              <span>{config.width}px</span>
            </div>
            <input
              type="range"
              min="20"
              max="300"
              step="1"
              value={config.width}
              onChange={(e) =>
                setConfig({ ...config, width: Number(e.target.value) })
              }
              className="w-full cursor-pointer"
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between">
              <label>Brightness</label>
              <span>{config.brightness.toFixed(1)}</span>
            </div>
            <input
              type="range"
              min="0"
              max="3"
              step="0.1"
              value={config.brightness}
              onChange={(e) =>
                setConfig({ ...config, brightness: Number(e.target.value) })
              }
              className="w-full cursor-pointer"
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between">
              <label>Contrast</label>
              <span>{config.contrast.toFixed(1)}</span>
            </div>
            <input
              type="range"
              min="0"
              max="3"
              step="0.1"
              value={config.contrast}
              onChange={(e) =>
                setConfig({ ...config, contrast: Number(e.target.value) })
              }
              className="w-full cursor-pointer"
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between">
              <label>Blur</label>
              <span>{config.blur}px</span>
            </div>
            <input
              type="range"
              min="0"
              max="10"
              step="0.5"
              value={config.blur}
              onChange={(e) =>
                setConfig({ ...config, blur: Number(e.target.value) })
              }
              className="w-full cursor-pointer"
            />
          </div>
          <div className="space-y-1">
            <div className="flex justify-between">
              <label>Playback FPS</label>
              <span>{config.fps}</span>
            </div>
            <input
              type="range"
              min="1"
              max="60"
              step="1"
              value={config.fps}
              onChange={(e) =>
                setConfig({ ...config, fps: Number(e.target.value) })
              }
              className="w-full cursor-pointer"
            />
          </div>
        </div>

        {/* Media Inputs */}
        <div className="space-y-1 border-t border-neutral-700 pt-2">
          <label className="block text-neutral-500">Media URL</label>
          <input
            type="text"
            value={config.mediaUrl}
            onChange={(e) => setConfig({ ...config, mediaUrl: e.target.value })}
            className="w-full bg-neutral-800 border border-neutral-600 rounded px-2 py-1 text-xs text-white"
          />
        </div>
        <div className="space-y-1">
          <label className="block text-neutral-500">Media Type</label>
          <select
            value={config.mediaType}
            onChange={(e) =>
              setConfig({ ...config, mediaType: e.target.value as any })
            }
            className="w-full bg-neutral-800 border border-neutral-600 rounded px-2 py-1 text-white cursor-pointer"
          >
            <option value="gif">GIF</option>
            <option value="video">Video</option>
            <option value="image">Image</option>
          </select>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div
        className="absolute inset-0 z-0 w-full h-full overflow-hidden flex items-center justify-center transition-colors duration-300"
        style={{ backgroundColor: config.backgroundColor }}
      >
        <div className="relative w-full h-full">
          <pre
            className="absolute top-1/2 left-1/2 text-[0.5rem] sm:text-[0.6rem] md:text-xs leading-2 md:leading-[0.6rem] font-mono whitespace-pre select-none transition-all duration-300"
            style={{
             
              transform: `translate(-50%, -50%) scale(${config.scale})`,
              color: config.color,
              textAlign: "center",
              textShadow:
                config.glowIntensity > 0
                  ? `0 0 ${config.glowIntensity}px ${config.color}, 0 0 ${
                      config.glowIntensity * 2.5
                    }px ${config.color}`
                  : "none",
            }}
          >
            {isLoaded && frames.length > 0
              ? frames[currentFrame]
              : "LOADING..."}
          </pre>
        </div>

        <canvas ref={canvasRef} className="hidden" />
      </div>

      {isDev && mounted && createPortal(<DevMenu />, document.body)}
    </>
  );
};

export default AsciiMediaRenderer;
