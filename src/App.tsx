import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize, Minimize } from "lucide-react";
import { deck } from "./slides";

const TOTAL = deck.length;

export default function App() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const goTo = useCallback(
    (next: number) => {
      const clamped = Math.max(0, Math.min(TOTAL - 1, next));
      setDirection(clamped > index ? 1 : -1);
      setIndex(clamped);
    },
    [index]
  );

  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (["ArrowRight", "ArrowDown", "PageDown", " "].includes(e.key)) {
        e.preventDefault();
        next();
      } else if (["ArrowLeft", "ArrowUp", "PageUp"].includes(e.key)) {
        e.preventDefault();
        prev();
      } else if (e.key === "Home") {
        goTo(0);
      } else if (e.key === "End") {
        goTo(TOTAL - 1);
      } else if (e.key === "f" || e.key === "F") {
        toggleFullscreen();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [next, prev, goTo]);

  // basic wheel / trackpad support
  useEffect(() => {
    let locked = false;
    const onWheel = (e: WheelEvent) => {
      if (locked) return;
      if (Math.abs(e.deltaY) < 24) return;
      locked = true;
      if (e.deltaY > 0) next();
      else prev();
      setTimeout(() => (locked = false), 700);
    };
    window.addEventListener("wheel", onWheel, { passive: true });
    return () => window.removeEventListener("wheel", onWheel);
  }, [next, prev]);

  useEffect(() => {
    const onFsChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onFsChange);
    return () => document.removeEventListener("fullscreenchange", onFsChange);
  }, []);

  const slide = deck[index];
  const Component = slide.Component;

  const variants = {
    enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 60 : -60, scale: 0.985 }),
    center: { opacity: 1, x: 0, scale: 1 },
    exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -60 : 60, scale: 0.985 }),
  };

  return (
    <div
      ref={containerRef}
      className="relative mx-auto flex h-screen w-full max-w-none flex-col overflow-hidden bg-bg text-white"
    >
      {/* progress bar */}
      <div className="absolute left-0 right-0 top-0 z-30 h-[2px] bg-white/5">
        <motion.div
          className="h-full bg-fire"
          animate={{ width: `${((index + 1) / TOTAL) * 100}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      </div>

      {/* slide viewport, locked to 16:9 within available space */}
      <div className="relative flex flex-1 items-center justify-center">
        <div className="relative aspect-video h-full max-h-full w-full max-w-full overflow-hidden">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={slide.id}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0"
            >
              <Component />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* HUD: act label bottom-left */}
      <div className="pointer-events-none absolute bottom-6 left-6 z-30 font-mono-tech text-[11px] uppercase tracking-[0.25em] text-white/40">
        {slide.act}
      </div>

      {/* HUD: slide counter bottom-right */}
      <div className="pointer-events-none absolute bottom-6 right-6 z-30 font-mono-tech text-[11px] uppercase tracking-[0.25em] text-white/40">
        {String(index + 1).padStart(2, "0")} / {String(TOTAL).padStart(2, "0")}
      </div>

      {/* nav arrows */}
      <div className="absolute inset-y-0 left-0 z-30 flex items-center">
        <button
          onClick={prev}
          disabled={index === 0}
          aria-label="Previous slide"
          className="group m-3 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/30 text-white/50 backdrop-blur transition hover:border-fire/50 hover:text-fire disabled:opacity-20"
        >
          <ChevronLeft size={18} />
        </button>
      </div>
      <div className="absolute inset-y-0 right-0 z-30 flex items-center">
        <button
          onClick={next}
          disabled={index === TOTAL - 1}
          aria-label="Next slide"
          className="group m-3 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/30 text-white/50 backdrop-blur transition hover:border-fire/50 hover:text-fire disabled:opacity-20"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* fullscreen toggle */}
      <button
        onClick={toggleFullscreen}
        aria-label="Toggle fullscreen"
        className="absolute right-6 top-6 z-30 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-black/30 text-white/50 backdrop-blur transition hover:border-fire/50 hover:text-fire"
      >
        {isFullscreen ? <Minimize size={15} /> : <Maximize size={15} />}
      </button>

      {/* logo mark top-left */}
      <div className="absolute left-6 top-6 z-30 font-mono-tech text-xs font-semibold uppercase tracking-[0.3em] text-white/60">
        GORI
      </div>

      {/* act progress ticks */}
      <div className="absolute bottom-6 left-1/2 z-30 flex -translate-x-1/2 items-center gap-1.5">
        {deck.map((s, i) => (
          <button
            key={s.id}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}: ${s.title}`}
            className={`h-1 rounded-full transition-all duration-300 ${
              i === index ? "w-5 bg-fire" : "w-1.5 bg-white/15 hover:bg-white/35"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
