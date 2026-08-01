import { useEffect, useRef } from "react";

interface FireParticlesProps {
  density?: number;
  className?: string;
  color?: string;
}

/**
 * Lightweight canvas ember field. Drifting glowing particles that give every
 * slide a subtle sense of heat/atmosphere without being distracting.
 */
export default function FireParticles({
  density = 40,
  className = "",
  color = "255,120,50",
}: FireParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const particles = Array.from({ length: density }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.8 + 0.4,
      speedY: Math.random() * 0.35 + 0.08,
      speedX: (Math.random() - 0.5) * 0.25,
      alpha: Math.random() * 0.5 + 0.15,
      flicker: Math.random() * 0.02 + 0.005,
    }));

    const onResize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", onResize);

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        p.y -= p.speedY;
        p.x += p.speedX;
        p.alpha += (Math.random() - 0.5) * p.flicker;
        p.alpha = Math.max(0.05, Math.min(0.65, p.alpha));
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        ctx.beginPath();
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4);
        grad.addColorStop(0, `rgba(${color},${p.alpha})`);
        grad.addColorStop(1, `rgba(${color},0)`);
        ctx.fillStyle = grad;
        ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, [density, color]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
}
