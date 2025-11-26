import localFont from "next/font/local";

export const LedFont = localFont({
  src: "../../public/fonts/led-dot-matrix.ttf",
  variable: "--font-led",
  display: "swap",
});
