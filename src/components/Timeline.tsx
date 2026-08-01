import { motion } from "framer-motion";

export interface TimelineEvent {
  time: string;
  label: string;
  source?: string;
  active?: boolean;
}

interface TimelineProps {
  events: TimelineEvent[];
  className?: string;
}

export default function Timeline({ events, className = "" }: TimelineProps) {
  return (
    <div className={`relative w-full py-10 ${className}`}>
      <div className="relative">
        <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-white/10" />
        <motion.div
          className="absolute left-0 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-fire/80 to-fire"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.6, ease: "easeInOut" }}
        />
        <div className="relative flex justify-between">
          {events.map((e, i) => (
            <motion.div
              key={e.time}
              className="flex flex-col items-center gap-3"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 * i }}
            >
              <div
                className={`h-3 w-3 rounded-full border ${
                  e.active
                    ? "border-fire bg-fire shadow-[0_0_18px_4px_rgba(255,77,0,0.6)]"
                    : "border-white/40 bg-bg"
                }`}
              />
              <div className="font-mono-tech text-xs text-fire">{e.time}</div>
              <div className="max-w-[9rem] text-center text-xs leading-snug text-ash">
                {e.label}
              </div>
              {e.source && (
                <div className="font-mono-tech text-[9px] uppercase tracking-wider text-white/30">
                  {e.source}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
