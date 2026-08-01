import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface PredictionEngineProps {
  steps: string[];
  direction?: "row" | "column";
  className?: string;
}

export default function PredictionEngine({
  steps,
  direction = "row",
  className = "",
}: PredictionEngineProps) {
  const isRow = direction === "row";
  return (
    <div
      className={`flex w-full ${
        isRow ? "flex-row flex-wrap items-center justify-center gap-3" : "flex-col items-start gap-4"
      } ${className}`}
    >
      {steps.map((step, i) => (
        <div key={step} className={`flex items-center gap-3 ${isRow ? "" : "w-full"}`}>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.12 }}
            className="relative rounded-xl border border-white/10 bg-panel px-6 py-4 font-mono-tech text-sm uppercase tracking-wide text-white"
          >
            <span className="absolute -top-2 -left-2 flex h-5 w-5 items-center justify-center rounded-full bg-fire text-[10px] font-bold text-black">
              {i + 1}
            </span>
            {step}
          </motion.div>
          {i < steps.length - 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.12 + 0.2 }}
              className={isRow ? "" : "pl-6"}
            >
              <ArrowRight
                className={`text-fire ${isRow ? "" : "rotate-90"}`}
                size={20}
              />
            </motion.div>
          )}
        </div>
      ))}
    </div>
  );
}
