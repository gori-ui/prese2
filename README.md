# GORI — AI Decision Support for Wildfire Operations

A cinematic, fullscreen interactive pitch deck built for GORI, a fictional deep-tech
product for AI-assisted wildfire decision support. Styled like a launch presentation
for the European Commission, ESA, and emergency response agencies — think
Apple keynote × SpaceX × Palantir × NASA Mission Control.

30 slides across four acts:

- **Act I — Why GORI Exists** (slides 1–6)
- **Act II — One Fire Story** (slides 7–15)
- **Act III — How It Works** (slides 16–25)
- **Act IV — The Future** (slides 26–30)

All maps, heatmaps, timelines, and data-fusion visuals are generated live with
SVG/Canvas + Framer Motion — there are no external image assets, so the project
runs completely offline.

## Tech stack

- React 19 + TypeScript
- Vite 8
- Tailwind CSS v4 (CSS-first theme, see `src/index.css`)
- Framer Motion (slide transitions + micro-animations)
- lucide-react (icon system)

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL (typically `http://localhost:5173`).

To build a production bundle:

```bash
npm run build
npm run preview
```

## Controls

| Input | Action |
|---|---|
| `→` / `↓` / `PageDown` / `Space` | Next slide |
| `←` / `↑` / `PageUp` | Previous slide |
| `Home` / `End` | Jump to first / last slide |
| `F` | Toggle fullscreen |
| Mouse wheel / trackpad | Navigate slides |
| Arrow buttons (screen edges) | Navigate slides |
| Bottom dot track | Jump to any slide |
| Fullscreen icon (top-right) | Toggle fullscreen presentation mode |

The deck is locked to a 16:9 viewport and centered within the browser window,
so it's ready to present fullscreen on any display.

## Project structure

```
src/
  components/
    Slide.tsx            Generic slide layout (kicker, title, subtitle, content)
    Hero.tsx              Full-bleed cinematic scene (open/close slides)
    FireMap.tsx            GIS-style map with fire origin + spread rings
    Timeline.tsx           Animated horizontal incident timeline
    DataFusion.tsx          Data sources converging into one node
    PredictionEngine.tsx     Pipeline / process step diagram
    RiskMap.tsx              Interactive risk heatmap grid
    IconGrid.tsx              Icon + label grid (data sources, features)
    FireParticles.tsx         Ambient ember canvas background
  slides/
    act1.tsx   Slides 1–6
    act2.tsx   Slides 7–15
    act3.tsx   Slides 16–25
    act4.tsx   Slides 26–30
    index.ts   Combined 30-slide deck array
  lib/
    types.ts   Shared SlideDef type
  App.tsx      Deck engine: navigation, keyboard/wheel input, fullscreen,
               progress bar, slide counter, dot navigation
  index.css    Tailwind v4 theme tokens + global styles
```

## Design system

| Token | Value |
|---|---|
| Background | `#050505` |
| Text | White |
| Secondary text | Ash gray |
| Accent | Fire orange `#FF4D00` |
| Fonts | System sans for display, monospace for technical/kicker labels |

Every slide follows "one idea per screen": a short kicker, a large statement or
diagram, and generous empty space. Data (fire timings, thermal anomalies, risk
scores, partner names) is illustrative/fictional and built for demonstration.

## Extending the deck

To add or edit a slide:

1. Open the relevant `src/slides/actN.tsx` file.
2. Add a new component using the shared `<Slide>` wrapper (or `<Hero>` for
   full-bleed cinematic slides).
3. Add an entry to the exported `actN` array with a unique `id`, `act` label,
   and `title` (used for the dot-navigation `aria-label`).

No other files need to change — `src/slides/index.ts` automatically combines
all four acts into the single `deck` array that `App.tsx` renders.
