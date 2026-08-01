import { motion } from "framer-motion";
import { useMemo, useState } from "react";

interface RiskMapProps {
  cols?: number;
  rows?: number;
  seed?: number;
  className?: string;
}

function seededRandom(seed: number) {
  const x = Math.sin(seed * 999.7) * 10000;
  return x - Math.floor(x);
}

function riskColor(v: number) {
  // v: 0 (low) -> 1 (extreme)
  if (v < 0.25) return "rgba(66,140,90,"; // green
  if (v < 0.5) return "rgba(214,178,60,"; // yellow
  if (v < 0.75) return "rgba(255,140,40,"; // orange
  return "rgba(255,60,20,"; // red
}

export default function RiskMap({
  cols = 22,
  rows = 11,
  seed = 7,
  className = "",
}: RiskMapProps) {
  const [hovered, setHovered] = useState<number | null>(null);

  const cells = useMemo(() => {
    const cx = cols * 0.62;
    const cy = rows * 0.4;
    return Array.from({ length: cols * rows }).map((_, i) => {
      const x = i % cols;
      const y = Math.floor(i / cols);
      const d = Math.hypot(x - cx, y - cy) / Math.max(cols, rows);
      const noise = seededRandom(i + seed) * 0.5;
      const v = Math.max(0, Math.min(1, 1 - d * 1.6 + noise * 0.5));
      return { x, y, v };
    });
  }, [cols, rows, seed]);

  return (
    <div className={`w-full ${className}`}>
      <div
        className="grid w-full gap-[3px]"
        style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
      >
        {cells.map((c, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: (c.x + c.y) * 0.012 }}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            className="aspect-square cursor-crosshair rounded-[2px] transition-transform duration-150 hover:scale-125"
            style={{
              backgroundColor: `${riskColor(c.v)}${0.25 + c.v * 0.75})`,
            }}
          />
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between font-mono-tech text-[11px] uppercase tracking-wider text-ash">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-sm" style={{ background: "rgba(66,140,90,0.8)" }} />
          Low
          <span className="ml-3 h-2 w-2 rounded-sm" style={{ background: "rgba(214,178,60,0.8)" }} />
          Moderate
          <span className="ml-3 h-2 w-2 rounded-sm" style={{ background: "rgba(255,140,40,0.8)" }} />
          High
          <span className="ml-3 h-2 w-2 rounded-sm" style={{ background: "rgba(255,60,20,0.8)" }} />
          Extreme
        </div>
        <div>
          {hovered !== null
            ? `CELL ${cells[hovered].x}.${cells[hovered].y} · RISK ${(cells[hovered].v * 100).toFixed(0)}%`
            : "HOVER GRID FOR CELL RISK SCORE"}
        </div>
      </div>
    </div>
  );
}
