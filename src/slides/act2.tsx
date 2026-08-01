import { motion } from "framer-motion";
import {
  Satellite,
  Wind,
  Droplets,
  Thermometer,
  Truck,
  ShieldAlert,
  Plane,
  Users,
} from "lucide-react";

import Slide from "../components/Slide";
import Timeline from "../components/Timeline";
import FireMap from "../components/FireMap";
import DataFusion from "../components/DataFusion";
import type { SlideDef } from "../lib/types";

const incidentTimeline = [
  { time: "08:31", label: "Thermal anomaly detected", source: "NASA FIRMS", active: true },
  { time: "08:34", label: "Smoke plume confirmed", source: "Copernicus", active: true },
  { time: "08:35", label: "Weather intelligence fused", source: "ECMWF", active: true },
  { time: "08:36", label: "Canonical Incident created", source: "GORI Core", active: true },
];

// SLIDE 7 — Scenario intro
function Slide07() {
  return (
    <Slide
      eyebrow="Act II — One Fire Story"
      kicker="Simulation · Sredna Gora Region, Bulgaria"
      title="A wildfire ignites at 08:29 local time."
      subtitle="What follows is a real-time reconstruction of how GORI turns the first seven minutes of chaos into one operational picture."
      size="md"
    >
      <div className="mb-2 inline-flex items-center gap-3 rounded-full border border-white/10 bg-panel px-5 py-2 font-mono-tech text-xs uppercase tracking-wider text-ash">
        <span className="h-2 w-2 animate-pulse rounded-full bg-fire" />
        Fictional scenario for demonstration purposes
      </div>
      <Timeline events={incidentTimeline} className="max-w-3xl" />
    </Slide>
  );
}

// SLIDE 8 — NASA FIRMS thermal anomaly
function Slide08() {
  return (
    <Slide
      eyebrow="08:31"
      kicker="NASA FIRMS · Thermal Detection"
      title="A heat signature appears from orbit."
      size="md"
    >
      <div className="max-w-xl">
        <FireMap compact showRoads={false} rings={[{ label: "ANOMALY", radius: 40, delay: 0.2 }]} />
      </div>
    </Slide>
  );
}

// SLIDE 9 — Copernicus Sentinel smoke confirmation
function Slide09() {
  return (
    <Slide
      eyebrow="08:34"
      kicker="Copernicus Sentinel-2 · Smoke Layer"
      title="Satellite imagery confirms active smoke."
      size="md"
    >
      <div className="flex max-w-2xl gap-4">
        {["Thermal Band", "True Color", "Smoke Density"].map((layer, i) => (
          <motion.div
            key={layer}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15, duration: 0.5 }}
            className="flex-1 rounded-xl border border-white/10 bg-panel p-3"
          >
            <div className="mb-2 flex h-24 items-center justify-center rounded-lg bg-gradient-to-br from-white/5 to-fire/10">
              <Satellite className="text-fire" size={20} />
            </div>
            <div className="font-mono-tech text-[11px] uppercase tracking-wide text-ash">
              {layer}
            </div>
          </motion.div>
        ))}
      </div>
    </Slide>
  );
}

// SLIDE 10 — Weather intelligence
function Slide10() {
  const metrics = [
    { icon: Wind, label: "Wind", value: "24 km/h NE" },
    { icon: Droplets, label: "Humidity", value: "18%" },
    { icon: Thermometer, label: "Temperature", value: "34°C" },
  ];
  return (
    <Slide
      eyebrow="08:35"
      kicker="Weather Intelligence"
      title="Conditions are accelerating the threat."
      size="md"
    >
      <div className="grid max-w-2xl grid-cols-3 gap-4">
        {metrics.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15, duration: 0.5 }}
            className="rounded-xl border border-white/10 bg-panel p-5 text-center"
          >
            <m.icon className="mx-auto mb-2 text-fire" size={24} />
            <div className="font-mono-tech text-[11px] uppercase tracking-wide text-ash">
              {m.label}
            </div>
            <div className="mt-1 text-xl font-semibold text-white">{m.value}</div>
          </motion.div>
        ))}
      </div>
    </Slide>
  );
}

// SLIDE 11 — Canonical Incident Identity
function Slide11() {
  const sources = [
    { label: "Satellite" },
    { label: "Weather" },
    { label: "Drone" },
    { label: "Ground Report" },
    { label: "Historical Data" },
    { label: "Sensors" },
  ];
  return (
    <Slide
      eyebrow="08:36"
      kicker="GORI Core"
      title="One Canonical Incident Identity."
      size="md"
      align="center"
      contentClassName="items-center text-center"
    >
      <DataFusion sources={sources} centerLabel="INCIDENT #0417" className="mx-auto max-w-2xl" />
    </Slide>
  );
}

// SLIDE 12 — AI prediction / fire spread simulation
function Slide12() {
  return (
    <Slide
      eyebrow="AI Prediction"
      kicker="Fire Spread Simulation"
      title="GORI simulates the next 120 minutes."
      size="md"
    >
      <div className="max-w-xl">
        <FireMap
          rings={[
            { label: "30 MIN", radius: 55, delay: 0.2 },
            { label: "60 MIN", radius: 105, delay: 0.6 },
            { label: "120 MIN", radius: 170, delay: 1.1 },
          ]}
        />
      </div>
    </Slide>
  );
}

// SLIDE 13 — Prediction vs Reality split screen
function Slide13() {
  return (
    <Slide eyebrow="Validation" kicker="Model Accuracy" title="Prediction vs. Reality." size="md">
      <div className="grid max-w-4xl grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl border border-fire/30 bg-panel p-4"
        >
          <div className="mb-3 font-mono-tech text-xs uppercase tracking-wider text-fire">
            GORI Prediction · T+60min
          </div>
          <FireMap compact showRoads={false} rings={[{ label: "60 MIN", radius: 100, delay: 0.2 }]} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="rounded-2xl border border-white/10 bg-panel p-4"
        >
          <div className="mb-3 font-mono-tech text-xs uppercase tracking-wider text-ash">
            Observed Reality · T+60min
          </div>
          <FireMap compact showRoads={false} rings={[{ label: "ACTUAL", radius: 96, delay: 0.4 }]} />
        </motion.div>
      </div>
      <div className="mt-4 font-mono-tech text-xs uppercase tracking-wider text-ash">
        Perimeter overlap accuracy ·{" "}
        <span className="text-fire">91.4%</span>
      </div>
    </Slide>
  );
}

// SLIDE 14 — Recommendation engine
function Slide14() {
  const actions = [
    { icon: Truck, label: "Deploy resources" },
    { icon: ShieldAlert, label: "Protect village" },
    { icon: Plane, label: "Request aircraft" },
    { icon: Users, label: "Prepare evacuation" },
  ];
  return (
    <Slide
      eyebrow="08:38"
      kicker="Recommendation Engine"
      title="GORI proposes. Command decides."
      size="md"
    >
      <div className="grid max-w-3xl grid-cols-2 gap-4 md:grid-cols-4">
        {actions.map((a, i) => (
          <motion.div
            key={a.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.12, duration: 0.5 }}
            className="flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-panel px-4 py-6 text-center"
          >
            <a.icon className="text-fire" size={26} strokeWidth={1.6} />
            <div className="font-mono-tech text-xs uppercase tracking-wide text-white">
              {a.label}
            </div>
          </motion.div>
        ))}
      </div>
    </Slide>
  );
}

// SLIDE 15 — Emotional close of Act II
function Slide15() {
  return (
    <Slide
      align="center"
      size="xl"
      particles
      title={
        <>
          Better decisions.
          <br />
          <span className="fire-gradient-text">Earlier.</span>
        </>
      }
    />
  );
}

export const act2: SlideDef[] = [
  { id: 7, act: "II · One Fire", title: "Scenario Intro", Component: Slide07 },
  { id: 8, act: "II · One Fire", title: "FIRMS Detection", Component: Slide08 },
  { id: 9, act: "II · One Fire", title: "Sentinel Confirmation", Component: Slide09 },
  { id: 10, act: "II · One Fire", title: "Weather Intelligence", Component: Slide10 },
  { id: 11, act: "II · One Fire", title: "Canonical Incident", Component: Slide11 },
  { id: 12, act: "II · One Fire", title: "AI Prediction", Component: Slide12 },
  { id: 13, act: "II · One Fire", title: "Prediction vs Reality", Component: Slide13 },
  { id: 14, act: "II · One Fire", title: "Recommendation Engine", Component: Slide14 },
  { id: 15, act: "II · One Fire", title: "Better Decisions Earlier", Component: Slide15 },
];

// export raw timeline data too, used elsewhere if needed
export { incidentTimeline };
