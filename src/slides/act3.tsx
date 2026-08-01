import { motion } from "framer-motion";
import {
  Satellite,
  Globe2,
  CloudCog,
  Mountain,
  Trees,
  Route,
  Droplet,
  History,
  ClipboardList,
  Flame,
  Wind,
  Sun,
  Users2,
  Waves,
  RefreshCw,
  ShieldCheck,
  UserCog,
} from "lucide-react";
import Slide from "../components/Slide";
import IconGrid from "../components/IconGrid";
import PredictionEngine from "../components/PredictionEngine";
import DataFusion from "../components/DataFusion";
import RiskMap from "../components/RiskMap";
import Timeline from "../components/Timeline";
import type { SlideDef } from "../lib/types";


function Slide16() {
  const items = [
    { icon: Satellite, label: "Copernicus" },
    { icon: Globe2, label: "NASA" },
    { icon: CloudCog, label: "ECMWF" },
    { icon: Mountain, label: "DEM" },
    { icon: Trees, label: "Land Cover" },
    { icon: Route, label: "Roads" },
    { icon: Droplet, label: "Hydrants" },
    { icon: History, label: "Historical Fires" },
    { icon: ClipboardList, label: "Operator Reports" },
  ];
  return (
    <Slide
      eyebrow="Акт III — Как работи"
      kicker="Източници на данни"
      title="Всеки сигнал, на едно място."
      size="md"
    >
      <IconGrid items={items} columns={5} className="max-w-4xl" />
    </Slide>
  );
}

// SLIDE 17 — Pipeline animation
function Slide17() {
  return (
    <Slide eyebrow="Архитектура" kicker="Обработващ конвейер" title="От сигнал до решение." size="md">
      <PredictionEngine
        direction="column"
        steps={["Спутник", "Филтрация", "Синтез", "AI", "Прогноза", "Препоръка"]}
        className="max-w-md"
      />
    </Slide>
  );
}

// SLIDE 18 — Data Fusion
function Slide18() {
  const sources = Array.from({ length: 12 }).map((_, i) => ({
    label: [
      "Copernicus",
      "NASA FIRMS",
      "ECMWF",
      "DEM",
      "Land Cover",
      "Roads",
      "Hydrants",
      "History",
      "Reports",
      "Drones",
      "Cameras",
      "IoT",
    ][i],
  }));
  return (
    <Slide
      eyebrow="Архитектура"
      kicker="Сливане на данни"
      title="15 източника. Един оперативен модел."
      size="md"
      align="center"
      contentClassName="items-center text-center"
    >
      <DataFusion sources={sources} centerLabel="ОПЕРАТИВЕН МОДЕЛ" className="mx-auto max-w-2xl" />
    </Slide>
  );
}

// SLIDE 19 — Prediction Engine
function Slide19() {
  return (
    <Slide eyebrow="Архитектура" kicker="Модул за прогнозиране" title="Как GORI решава какво следва." size="md">
      <PredictionEngine
        direction="column"
        steps={["Входове", "AI модел", "Разпространение", "Степен на доверие", "Препоръка"]}
        className="max-w-md"
      />
    </Slide>
  );
}

// SLIDE 20 — Feature engineering icons
function Slide20() {
  const items = [
    { icon: Flame, label: "Топлина" },
    { icon: Wind, label: "Вятър" },
    { icon: Droplet, label: "Влажност" },
    { icon: Trees, label: "Гориво" },
    { icon: Mountain, label: "Наклон" },
    { icon: Globe2, label: "Аспект" },
    { icon: Sun, label: "Слънце" },
    { icon: Users2, label: "Население" },
    { icon: Route, label: "Пътища" },
    { icon: Waves, label: "Вода" },
  ];
  return (
    <Slide eyebrow="Архитектура" kicker="Изграждане на характеристики" title="Десет измерения на риска." size="md">
      <IconGrid items={items} columns={5} className="max-w-4xl" />
    </Slide>
  );
}

// SLIDE 21 — Risk Model heatmap
function Slide21() {
  return (
    <Slide eyebrow="Архитектура" kicker="Модел за риск" title="Жива повърхнина на риска." size="md">
      <RiskMap className="max-w-4xl" />
    </Slide>
  );
}

// SLIDE 22 — Human in control
function Slide22() {
  return (
    <Slide
      align="center"
      size="xl"
      contentClassName="items-center text-center"
      title={
        <>
          AI предлага.
          <br />
          <span className="fire-gradient-text">Хората решават.</span>
        </>
      }
    >
      <div className="mx-auto mt-6 flex max-w-lg items-center justify-center gap-8">
        <div className="flex flex-col items-center gap-2">
          <ShieldCheck className="text-fire" size={28} />
          <span className="font-mono-tech text-xs uppercase tracking-wide text-ash">
            AI препоръка
          </span>
        </div>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="h-px w-16 origin-left bg-white/20"
        />
        <div className="flex flex-col items-center gap-2">
          <UserCog className="text-white" size={28} />
          <span className="font-mono-tech text-xs uppercase tracking-wide text-ash">
            Човешко командване
          </span>
        </div>
      </div>
    </Slide>
  );
}

// SLIDE 23 — Canonical Incident Identity (most important slide)
function Slide23() {
  const stages = [
    { value: "100+", label: "Първични наблюдения" },
    { value: "1", label: "Каноничен инцидент" },
    { value: "1", label: "Непрекъсната история" },
  ];
  return (
    <Slide
      eyebrow="Ядро на архитектурата"
      kicker="Най-важната идея"
      title="Каноничната идентичност на инцидента."
      size="lg"
    >
      <div className="flex max-w-4xl flex-wrap items-center gap-6">
        {stages.map((s, i) => (
          <div key={s.label} className="flex items-center gap-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.25, duration: 0.6, type: "spring" }}
              className="flex flex-col items-center gap-2 rounded-2xl border border-fire/30 bg-panel px-8 py-6"
            >
              <div className="fire-gradient-text text-4xl font-bold">{s.value}</div>
              <div className="font-mono-tech text-xs uppercase tracking-wide text-ash">
                {s.label}
              </div>
            </motion.div>
            {i < stages.length - 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.25 + 0.15 }}
                className="text-2xl text-fire"
              >
                →
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </Slide>
  );
}

// SLIDE 24 — Timeline memory
function Slide24() {
  const events = [
    { time: "08:31", label: "Detection", active: true },
    { time: "08:36", label: "Incident Created", active: true },
    { time: "09:10", label: "First Response", active: true },
    { time: "09:55", label: "Perimeter Update", active: true },
    { time: "10:30", label: "Containment Progress", active: true },
  ];
  return (
    <Slide eyebrow="Core Architecture" kicker="Timeline Memory" title="Nothing is forgotten." size="md">
      <Timeline events={events} className="max-w-4xl" />
    </Slide>
  );
}

// SLIDE 25 — Learning loop
function Slide25() {
  return (
    <Slide eyebrow="Core Architecture" kicker="Learning Loop" title="Every fire improves the next response." size="md">
      <div className="relative mx-auto mt-4 flex h-64 w-64 items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 rounded-full border border-dashed border-fire/30"
        />
        <RefreshCw className="text-fire" size={40} />
        {["Detect", "Predict", "Respond", "Learn"].map((label, i) => {
          const angle = (i / 4) * Math.PI * 2 - Math.PI / 2;
          const x = 50 + Math.cos(angle) * 42;
          const y = 50 + Math.sin(angle) * 42;
          return (
            <div
              key={label}
              className="absolute font-mono-tech text-[11px] uppercase tracking-wide text-ash"
              style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%,-50%)" }}
            >
              {label}
            </div>
          );
        })}
      </div>
    </Slide>
  );
}

export const act3: SlideDef[] = [
  { id: 16, act: "III · How It Works", title: "Data Sources", Component: Slide16 },
  { id: 17, act: "III · How It Works", title: "Pipeline", Component: Slide17 },
  { id: 18, act: "III · How It Works", title: "Data Fusion", Component: Slide18 },
  { id: 19, act: "III · How It Works", title: "Prediction Engine", Component: Slide19 },
  { id: 20, act: "III · How It Works", title: "Feature Engineering", Component: Slide20 },
  { id: 21, act: "III · How It Works", title: "Risk Model", Component: Slide21 },
  { id: 22, act: "III · How It Works", title: "Human In Control", Component: Slide22 },
  { id: 23, act: "III · How It Works", title: "Canonical Incident Identity", Component: Slide23 },
  { id: 24, act: "III · How It Works", title: "Timeline Memory", Component: Slide24 },
  { id: 25, act: "III · How It Works", title: "Learning Loop", Component: Slide25 },
];
