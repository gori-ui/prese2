import { motion } from "framer-motion";
import { Plane, RadioTower, Cpu, Satellite as SatelliteIcon, Globe } from "lucide-react";
import Slide from "../components/Slide";
import Hero from "../components/Hero";
import type { SlideDef } from "../lib/types";

// SLIDE 26 — Drone network
function Slide26Intro() {
  return (
    <Slide
      eyebrow="Акт IV — Бъдещето"
      kicker="Въведение"
      title="Какво ще покрие този акт"
      size="md"
      align="center"
      contentClassName="items-center text-center"
    >
      <p className="max-w-3xl text-white/80">
        В последния акт разглеждаме бъдещето на GORI: автономни дронове, сензори, наблюдателни кули и европейска интеграция.
      </p>
    </Slide>
  );
}

function Slide26() {
  const drones = [
    { x: "20%", y: "30%" },
    { x: "45%", y: "18%" },
    { x: "68%", y: "38%" },
    { x: "32%", y: "58%" },
    { x: "78%", y: "62%" },
  ];
  return (
    <Slide eyebrow="Акт IV — Бъдещето" kicker="Пътна карта 01" title="Автономна мрежа от дронове." size="md">
      <div className="relative h-72 w-full max-w-3xl rounded-2xl border border-white/10 bg-panel">
        <svg className="absolute inset-0 h-full w-full">
          {drones.map((d, i) =>
            drones.slice(i + 1).map((d2, j) => (
              <line
                key={`${i}-${j}`}
                x1={d.x}
                y1={d.y}
                x2={d2.x}
                y2={d2.y}
                stroke="#FF4D00"
                strokeOpacity="0.15"
              />
            ))
          )}
        </svg>
        {drones.map((d, i) => (
          <motion.div
            key={i}
            className="absolute flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-fire/50 bg-bg"
            style={{ left: d.x, top: d.y }}
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3 + i * 0.4, repeat: Infinity, ease: "easeInOut" }}
          >
            <Plane className="text-fire" size={16} />
          </motion.div>
        ))}
      </div>
    </Slide>
  );
}

// SLIDE 27 — Autonomous observation towers
function Slide27() {
  return (
    <Slide eyebrow="Акт IV — Бъдещето" kicker="Пътна карта 02" title="Автономни наблюдателни кули." size="md">
      <div className="flex max-w-3xl gap-8">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15, duration: 0.6 }}
            className="flex flex-1 flex-col items-center gap-3 rounded-2xl border border-white/10 bg-panel px-6 py-8"
          >
            <RadioTower className="text-fire" size={30} />
            <div className="font-mono-tech text-xs uppercase tracking-wide text-ash">
              Кула {String(i + 1).padStart(2, "0")}
            </div>
            <motion.div
              className="h-1 w-1 rounded-full bg-fire"
              animate={{ boxShadow: ["0 0 0px #FF4D00", "0 0 14px #FF4D00", "0 0 0px #FF4D00"] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
            />
            <div className="text-[11px] text-ash">360° термично + оптично сканиране</div>
          </motion.div>
        ))}
      </div>
    </Slide>
  );
}

// SLIDE 28 — IoT wildfire sensors
function Slide28() {
  const sensors = Array.from({ length: 24 });
  return (
    <Slide eyebrow="Акт IV — Бъдещето" kicker="Пътна карта 03" title="Мрежа от IoT пожароразузнавателни сензори." size="md">
      <div className="grid max-w-2xl grid-cols-8 gap-4">
        {sensors.map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.02, duration: 0.4 }}
            className="flex items-center justify-center"
          >
            <Cpu className="text-fire/70" size={18} />
          </motion.div>
        ))}
      </div>
    </Slide>
  );
}

// SLIDE 29 — European ecosystem
function Slide29() {
  const partners = [
    { icon: Globe, label: "ESA" },
    { icon: SatelliteIcon, label: "Copernicus" },
    { icon: Globe, label: "Destination Earth" },
  ];
  return (
    <Slide eyebrow="Акт IV — Бъдещето" kicker="Екосистема" title="Изградена на европейската космическа инфраструктура." size="md">
      <div className="flex max-w-3xl gap-8">
        {partners.map((p, i) => (
          <motion.div
            key={p.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15, duration: 0.5 }}
            className="flex flex-1 flex-col items-center gap-3 rounded-2xl border border-white/10 bg-panel px-6 py-10"
          >
            <p.icon className="text-fire" size={28} />
            <div className="font-mono-tech text-sm uppercase tracking-wide text-white">
              {p.label}
            </div>
          </motion.div>
        ))}
      </div>
    </Slide>
  );
}

// SLIDE 30 — Final emotional slide
function Slide30() {
  return (
    <Hero
      dark
      eyebrow="GORI"
      title={
        <span className="text-[clamp(2rem,5.2vw,3.75rem)] font-semibold leading-tight">
          Не можем да спрем всеки пожар.
          <br />
          <span className="fire-gradient-text">
            Но можем да дадем повече време за правилното решение.
          </span>
        </span>
      }
    />
  );
}

export const act4: SlideDef[] = [
  { id: 26, act: "IV · Бъдещето", title: "Въведение", Component: Slide26Intro },
  { id: 27, act: "IV · Бъдещето", title: "Мрежа от дронове", Component: Slide26 },
  { id: 28, act: "IV · Бъдещето", title: "Наблюдателни кули", Component: Slide27 },
  { id: 29, act: "IV · Бъдещето", title: "IoT сензори", Component: Slide28 },
  { id: 30, act: "IV · Бъдещето", title: "Европейска екосистема", Component: Slide29 },
  { id: 31, act: "IV · Бъдещето", title: "Затваряне", Component: Slide30 },
];
