import { motion } from "framer-motion";
import type { ReactNode } from "react";
import FireParticles from "./FireParticles";

interface SlideProps {
  kicker?: string;
  eyebrow?: string;
  title?: ReactNode;
  subtitle?: ReactNode;
  children?: ReactNode;
  align?: "center" | "left";
  size?: "sm" | "md" | "lg" | "xl";
  particles?: boolean;
  background?: ReactNode;
  className?: string;
  contentClassName?: string;
}

const sizeMap: Record<string, string> = {
  sm: "text-[clamp(1.75rem,3.2vw,2.75rem)]",
  md: "text-[clamp(2.25rem,4.4vw,3.75rem)]",
  lg: "text-[clamp(2.75rem,6vw,5.25rem)]",
  xl: "text-[clamp(3.5rem,8.5vw,8rem)]",
};

export default function Slide({
  kicker,
  eyebrow,
  title,
  subtitle,
  children,
  align = "left",
  size = "lg",
  particles = true,
  background,
  className = "",
  contentClassName = "",
}: SlideProps) {
  return (
    <div
      className={`relative flex h-full w-full flex-col overflow-hidden bg-[#050505] ${className}`}
    >
      <div className="absolute inset-0 bg-[#050505]" />
      <div className="absolute inset-0 opacity-40">
        <svg viewBox="0 0 1600 900" className="h-full w-full">
          <defs>
            <linearGradient id="gridFade" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(255,255,255,0.35)" stopOpacity="0.08" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.35)" stopOpacity="0" />
            </linearGradient>
          </defs>
          {Array.from({ length: 12 }).map((_, i) => (
            <line
              key={`v-${i}`}
              x1={90 + i * 110}
              y1="0"
              x2={90 + i * 110}
              y2="900"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="1"
            />
          ))}
          {Array.from({ length: 8 }).map((_, i) => (
            <line
              key={`h-${i}`}
              x1="0"
              y1={85 + i * 98}
              x2="1600"
              y2={85 + i * 98}
              stroke="rgba(255,255,255,0.06)"
              strokeWidth="1"
            />
          ))}
          <circle cx="1280" cy="220" r="48" fill="rgba(255,255,255,0.04)" />
          <circle cx="1300" cy="240" r="8" fill="rgba(255,255,255,0.65)" />
          <path d="M1248 220 L1268 240 L1288 220" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="2" />
          <circle cx="350" cy="120" r="62" fill="rgba(255,255,255,0.025)" />
        </svg>
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.06),transparent_26%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.04),transparent_30%)]" />
      {background}
      {particles && <FireParticles density={26} color="255,255,255" />}
      <div className="grain absolute inset-0" />

      <div
        className={`relative z-10 flex h-full w-full flex-1 flex-col justify-center gap-8 px-[6vw] py-[8vh] ${
          align === "center" ? "items-center text-center" : "items-start text-left"
        } ${contentClassName}`}
      >
        {eyebrow && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-mono-tech text-xs uppercase tracking-[0.35em] text-fire"
          >
            {eyebrow}
          </motion.div>
        )}

        {kicker && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="font-mono-tech text-[11px] uppercase tracking-[0.3em] text-ash"
          >
            {kicker}
          </motion.div>
        )}

        {title && (
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className={`${sizeMap[size]} max-w-5xl font-semibold leading-[1.05] tracking-tight text-white text-glow`}
          >
            {title}
          </motion.h1>
        )}

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.24 }}
            className="max-w-2xl text-lg leading-relaxed text-ash md:text-xl"
          >
            {subtitle}
          </motion.p>
        )}

        {children && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.32 }}
            className="w-full flex-1"
          >
            {children}
          </motion.div>
        )}
      </div>
    </div>
  );
}
