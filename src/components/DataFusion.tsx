import { motion } from "framer-motion";

interface FusionNode {
  label: string;
}

interface DataFusionProps {
  sources: FusionNode[];
  centerLabel?: string;
  className?: string;
}

export default function DataFusion({
  sources,
  centerLabel = "GORI",
  className = "",
}: DataFusionProps) {
  const cx = 300;
  const cy = 260;
  const radius = 210;

  const positions = sources.map((s, i) => {
    const angle = (i / sources.length) * Math.PI * 2 - Math.PI / 2;
    return {
      ...s,
      x: cx + radius * Math.cos(angle),
      y: cy + radius * Math.sin(angle),
    };
  });

  return (
    <div className={`relative h-[520px] w-full ${className}`}>
      <svg viewBox="0 0 600 520" className="h-full w-full">
        <defs>
          <radialGradient id="fusionCore" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FF4D00" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#FF4D00" stopOpacity="0" />
          </radialGradient>
        </defs>

        {positions.map((p, i) => (
          <motion.line
            key={`line-${p.label}`}
            x1={p.x}
            y1={p.y}
            x2={cx}
            y2={cy}
            stroke="#FF4D00"
            strokeOpacity="0.35"
            strokeWidth="1"
            strokeDasharray="3 5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.06 * i }}
          />
        ))}

        <circle cx={cx} cy={cy} r="90" fill="url(#fusionCore)" />
        <motion.circle
          cx={cx}
          cy={cy}
          r="34"
          fill="#050505"
          stroke="#FF4D00"
          strokeWidth="1.5"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4, type: "spring" }}
        />
        <text
          x={cx}
          y={cy + 4}
          textAnchor="middle"
          fill="#ffffff"
          fontSize="13"
          fontWeight="600"
          className="font-mono-tech"
        >
          {centerLabel}
        </text>

        {positions.map((p, i) => (
          <motion.g
            key={p.label}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.06 * i }}
          >
            <circle cx={p.x} cy={p.y} r="26" fill="#0d0d0d" stroke="#ffffff" strokeOpacity="0.25" />
            <foreignObject x={p.x - 44} y={p.y + 30} width="88" height="34">
              <div className="text-center font-mono-tech text-[10px] uppercase tracking-wide text-ash">
                {p.label}
              </div>
            </foreignObject>
          </motion.g>
        ))}
      </svg>
    </div>
  );
}
