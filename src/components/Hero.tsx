import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface HeroProps {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  children?: ReactNode;
  backgroundImage?: string;
  dark?: boolean;
}

export default function Hero({ eyebrow, title, subtitle, children, backgroundImage }: HeroProps) {
  const resolvedBackground = backgroundImage;

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#060606]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06),transparent_55%)]" />
      {resolvedBackground && (
        <div className="absolute inset-0">
          <img src={resolvedBackground} alt="" className="h-full w-full object-cover opacity-30 grayscale" />
        </div>
      )}

      <svg
        viewBox="0 0 1600 900"
        className="absolute inset-0 h-full w-full opacity-40"
        aria-hidden="true"
      >
        <rect width="1600" height="900" fill="none" />
        <g stroke="rgba(255,255,255,0.12)" strokeWidth="1">
          {Array.from({ length: 14 }).map((_, i) => (
            <line key={`v-${i}`} x1={120 + i * 100} y1="0" x2={120 + i * 100} y2="900" />
          ))}
          {Array.from({ length: 10 }).map((_, i) => (
            <line key={`h-${i}`} x1="0" y1={80 + i * 80} x2="1600" y2={80 + i * 80} />
          ))}
        </g>
      </svg>

      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.04)_0%,transparent_18%,rgba(0,0,0,0.75)_100%)]" />

      <div className="absolute inset-x-0 bottom-0 h-[52%] bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))]" />
      <svg
        viewBox="0 0 1600 900"
        className="absolute inset-x-0 bottom-0 h-[58%] w-full"
        aria-hidden="true"
      >
        <path
          d="M0,760 L130,690 L260,710 L390,650 L540,710 L680,620 L840,710 L980,660 L1110,740 L1260,640 L1410,700 L1600,620 L1600,900 L0,900 Z"
          fill="#060606"
          stroke="#ffffff"
          strokeWidth="2"
          opacity="0.95"
        />
        <path
          d="M0,790 L140,730 L290,760 L430,700 L580,770 L720,710 L890,780 L1040,720 L1170,790 L1330,710 L1470,760 L1600,720 L1600,900 L0,900 Z"
          fill="#111111"
          stroke="#ffffff"
          strokeWidth="1.2"
          opacity="0.9"
        />
      </svg>

      <div className="absolute inset-0 flex items-center justify-center px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 flex w-full max-w-5xl flex-col items-center text-center"
        >
          {eyebrow && (
            <div className="mb-6 font-mono-tech text-[11px] uppercase tracking-[0.45em] text-white/70">
              {eyebrow}
            </div>
          )}

          <div className="font-mono-tech text-[22px] uppercase tracking-[0.35em] text-white/50">
              G.O.R.I 
          </div>

          <div className="w-full rounded-[32px] border border-white/10 bg-black/35 p-6 shadow-[0_0_80px_rgba(0,0,0,0.45)] backdrop-blur-sm">
            <div className="mb-5 h-px w-full bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            <h1 className="text-[clamp(2.4rem,6vw,6.8rem)] font-semibold leading-[0.95] tracking-[-0.03em] text-white">
              {title}
            </h1>
            {subtitle && (
              <p className="mx-auto mt-6 max-w-3xl text-lg text-white/70 md:text-2xl">
                {subtitle}
              </p>
            )}
            <div className="mt-8 flex items-center justify-center gap-4">
              <div className="h-px w-16 bg-white/25" />
              <div className="mb-7 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[30px] uppercase tracking-[0.4em] text-white/70 backdrop-blur-sm">
            GEO OPERATIONAL RISK INTELLIGENCE
              </div>
              <div className="h-px w-16 bg-white/25" />
            </div>
          </div>

          {children}
        </motion.div>
      </div>
    </div>
  );
}
