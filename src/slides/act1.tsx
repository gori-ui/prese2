import { motion } from "framer-motion";
import {
  Phone,
  Radio,
  Map as MapIcon,
  CloudSun,
  UserCheck,
  Satellite,
  Plane,
  Camera,
  Thermometer,
  Truck,
} from "lucide-react";
import Slide from "../components/Slide";
import Hero from "../components/Hero";
import IconGrid from "../components/IconGrid";
import FireMap from "../components/FireMap";
import heroImage from "../assets/hero.png";
import type { SlideDef } from "../lib/types";

// SLIDE 1 — Full screen hero
function Slide01() {
  return (
    <Hero
      title="G.O.R.I."
      backgroundImage={heroImage}
    />
  );
}

function Slide01Intro() {
  return (
    <Slide
      eyebrow="Акт I — Защо GORI"
      kicker="Въведение"
      title="Какво представя този акт"
      size="md"
      align="center"
      contentClassName="items-center text-center"
    >
      <p className="max-w-3xl text-white/80">
        Този акт показва защо сегашната система е фрагментирана, какво липсва и защо GORI е необходим, за да превърне данните в бързи и ясни оперативни решения.
      </p>
    </Slide>
  );
}

// SLIDE 2 — Imagine... firefighter receiving alert
function Slide02() {
  const unknowns = ["Скорост на разпространение", "Посока", "Бъдещ ефект", "Рискови населени места"];
  return (
    <Slide eyebrow="Акт I — Защо GORI" kicker="Сценарий 01" title="Представи си…" size="xl">
      <div className="flex flex-col gap-10 md:flex-row md:items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex items-center gap-4 rounded-2xl border border-fire/40 bg-panel px-6 py-5"
        >
          <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-fire/10">
            <Phone className="text-fire" size={22} />
            <span className="absolute -right-1 -top-1 h-3 w-3 animate-ping rounded-full bg-fire" />
          </div>
          <div>
            <div className="font-mono-tech text-xs uppercase tracking-wider text-fire">
              Известие
            </div>
            <div className="text-sm text-white">Местоположение засечено · Сектор 14</div>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 gap-3">
          {unknowns.map((u, i) => (
            <motion.div
              key={u}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + i * 0.12, duration: 0.5 }}
              className="rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 font-mono-tech text-xs uppercase tracking-wide text-ash"
            >
              Неизвестно: <span className="text-white">{u}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </Slide>
  );
}

// SLIDE 3 — Big statement
function Slide03() {
  return (
    <Slide
      align="center"
      size="xl"
      title={
        <>
          Секунда по секунда <span className="fire-gradient-text">променя картата.</span>
        </>
      }
    />
  );
}

// SLIDE 4 — Fragmented current reality
function Slide04() {
  const items = [
    { icon: Phone, label: "Телефон" },
    { icon: Radio, label: "Радио" },
    { icon: MapIcon, label: "Хартии" },
    { icon: CloudSun, label: "Метео" },
    { icon: UserCheck, label: "Опит" },
  ];
  return (
    <Slide
      eyebrow="Акт I — Защо GORI"
      kicker="Текуща реалност"
      title="Фрагментирана система."
      size="md"
    >
      <IconGrid items={items} columns={5} className="max-w-4xl" />
    </Slide>
  );
}

// SLIDE 5 — Too much data, not enough decisions
function Slide05() {
  const items = [
    { icon: Satellite, label: "Спутник" },
    { icon: Plane, label: "Дрон" },
    { icon: Camera, label: "Камера" },
    { icon: Thermometer, label: "Метеостанция" },
    { icon: Truck, label: "Пожарна" },
  ];
  return (
    <Slide
      eyebrow="Акт I — Защо GORI"
      kicker="Несвързани сензори"
      title={
        <>
          Твърде много данни.
          <br />
          <span className="fire-gradient-text">Недостатъчно решения.</span>
        </>
      }
      size="md"
    >
      <IconGrid items={items} columns={5} className="max-w-4xl" />
    </Slide>
  );
}

// SLIDE 6 — Introduce GORI: one fire, one map, one operational picture
function Slide06() {
  return (
    <Slide
      eyebrow="Акт I — Защо GORI"
      kicker="Представяне"
      title="Един пожар. Една карта. Една оперативна картина."
      size="lg"
      align="left"
    >
      <div className="mt-4 max-w-xl">
        <FireMap compact rings={[{ label: "LIVE", radius: 90, delay: 0.3 }]} />
      </div>
    </Slide>
  );
}

export const act1: SlideDef[] = [
  { id: 1, act: "I · Защо", title: "Hero", Component: Slide01 },
  { id: 2, act: "I · Защо", title: "Въведение", Component: Slide01Intro },
  { id: 3, act: "I · Защо", title: "Представи си…", Component: Slide02 },
  { id: 4, act: "I · Защо", title: "През минута", Component: Slide03 },
  { id: 5, act: "I · Защо", title: "Фрагментирана система", Component: Slide04 },
  { id: 6, act: "I · Защо", title: "Недостатъчни решения", Component: Slide05 },
  { id: 7, act: "I · Защо", title: "Представяне на GORI", Component: Slide06 },
];
