import { motion } from "framer-motion";
import { useMemo } from "react";

interface RingSpec {
  label: string;
  radius: number;
  delay: number;
}

interface FireMapProps {
  rings?: RingSpec[];
  showVillage?: boolean;
  showRoads?: boolean;
  compact?: boolean;
  className?: string;
}

function seededPath(seed: number, w: number, h: number) {
  // Deterministic pseudo-terrain contour lines
  const rand = (n: number) => {
    const x = Math.sin(n * 999.9 + seed) * 10000;
    return x - Math.floor(x);
  };
  let d = `M0,${h * (0.3 + rand(1) * 0.4)}`;
  for (let i = 1; i <= 8; i++) {
    const x = (w / 8) * i;
    const y = h * (0.2 + rand(i + seed) * 0.6);
    d += ` Q${x - w / 16},${y - 30} ${x},${y}`;
  }
  return d;
}

export default function FireMap({
  rings = [
    { label: "30 MIN", radius: 60, delay: 0.2 },
    { label: "60 MIN", radius: 110, delay: 0.5 },
    { label: "120 MIN", radius: 175, delay: 0.9 },
  ],
  showVillage = true,
  showRoads = true,
  compact = false,
  className = "",
}: FireMapProps) {
  const contours = useMemo(() => [1, 2, 3, 4], []);
  const cx = 260;
  const cy = 220;

  return (
    <div className={`relative w-full ${compact ? "h-[280px]" : "h-[440px]"} ${className}`}>
      <svg viewBox="0 0 520 440" className="h-full w-full">
        <defs>
          <radialGradient id="terrainGlow" cx="50%" cy="50%" r="70%">
            <stop offset="0%" stopColor="#111111" />
            <stop offset="100%" stopColor="#050505" />
          </radialGradient>
          <radialGradient id="fireCore" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFD9B0" />
            <stop offset="35%" stopColor="#FF4D00" />
            <stop offset="100%" stopColor="#FF4D00" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="gridFade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FF4D00" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#FF4D00" stopOpacity="0" />
          </linearGradient>
        </defs>

        <rect width="520" height="440" fill="url(#terrainGlow)" />

        {/* grid */}
        <g opacity="0.12" stroke="#FF4D00" strokeWidth="0.5">
          {Array.from({ length: 14 }).map((_, i) => (
            <line key={`v${i}`} x1={i * 40} y1="0" x2={i * 40} y2="440" />
          ))}
          {Array.from({ length: 12 }).map((_, i) => (
            <line key={`h${i}`} x1="0" y1={i * 40} x2="520" y2={i * 40} />
          ))}
        </g>

        {/* contour terrain lines */}
        <g opacity="0.25" stroke="#8a8a8a" strokeWidth="1" fill="none">
          {contours.map((c) => (
            <path key={c} d={seededPath(c, 520, 440)} />
          ))}
        </g>

        {showRoads && (
          <g stroke="#3a3a3a" strokeWidth="2" fill="none" opacity="0.8">
            <path d="M0,120 C150,150 250,90 520,140" />
            <path d="M60,0 C120,150 180,300 140,440" />
          </g>
        )}

        {/* spread rings */}
        {rings.map((r, i) => (
          <motion.circle
            key={r.label}
            cx={cx}
            cy={cy}
            r={r.radius}
            fill="none"
            stroke="#FF4D00"
            strokeOpacity={0.55 - i * 0.12}
            strokeWidth={1.5}
            strokeDasharray="4 5"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.1, delay: r.delay, ease: "easeOut" }}
            style={{ transformOrigin: `${cx}px ${cy}px` }}
          />
        ))}

        {rings.map((r) => (
          <text
            key={`${r.label}-t`}
            x={cx + r.radius * 0.72}
            y={cy - r.radius * 0.72}
            fill="#FF8A3D"
            fontSize="10"
            className="font-mono-tech uppercase"
            opacity={0.8}
          >
            {r.label}
          </text>
        ))}

        {/* fire origin */}
        <circle cx={cx} cy={cy} r="70" fill="url(#fireCore)" />
        <motion.circle
          cx={cx}
          cy={cy}
          r="8"
          fill="#FF4D00"
          animate={{ scale: [1, 1.35, 1], opacity: [1, 0.6, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.circle
          cx={cx}
          cy={cy}
          r="8"
          fill="none"
          stroke="#FF4D00"
          strokeWidth="2"
          animate={{ scale: [1, 3.2], opacity: [0.8, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
          style={{ transformOrigin: `${cx}px ${cy}px` }}
        />

        {showVillage && (
          <g transform="translate(400, 90)">
            <rect x="-8" y="-8" width="16" height="16" fill="#050505" stroke="#ffffff" strokeWidth="1.5" />
            <text x="14" y="4" fill="#ffffff" fontSize="10" className="font-mono-tech uppercase" opacity={0.85}>
              Village · Krastova
            </text>
          </g>
        )}
      </svg>
    </div>
  );
}
