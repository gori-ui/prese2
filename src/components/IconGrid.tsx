import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

export interface IconItem {
  icon: LucideIcon;
  label: string;
  sub?: string;
  dimmed?: boolean;
}

interface IconGridProps {
  items: IconItem[];
  columns?: number;
  className?: string;
}

export default function IconGrid({ items, columns = 5, className = "" }: IconGridProps) {
  return (
    <div
      className={`grid w-full gap-4 ${className}`}
      style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
    >
      {items.map((item, i) => {
        const Icon = item.icon;
        return (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: i * 0.06 }}
            className={`flex flex-col items-center justify-center gap-3 rounded-2xl border px-4 py-6 text-center ${
              item.dimmed
                ? "border-white/5 bg-white/[0.02] opacity-40"
                : "border-white/10 bg-panel"
            }`}
          >
            <Icon
              size={26}
              className={item.dimmed ? "text-white/40" : "text-fire"}
              strokeWidth={1.6}
            />
            <div className="font-mono-tech text-xs uppercase tracking-wide text-white">
              {item.label}
            </div>
            {item.sub && (
              <div className="text-[11px] text-ash">{item.sub}</div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
