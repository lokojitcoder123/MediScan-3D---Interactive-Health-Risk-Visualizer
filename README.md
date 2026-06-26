<div align="center">

<!-- HERO BANNER -->
<img src="https://github.com/lokojitcoder123/MediScan-3D---Interactive-Health-Risk-Visualizer/raw/main/public/poster.png" width="100%" alt="MediScan 3D — Banner" />

<br /><br />

<img src="https://github.com/lokojitcoder123/MediScan-3D---Interactive-Health-Risk-Visualizer/raw/main/public/logo.png" width="100" alt="MediScan 3D Logo" />

<h1>MediScan 3D</h1>
<h3>Interactive Health Risk Visualizer</h3>

<p><em>Enter your vitals. Watch your body light up in real-time 3D.</em></p>

<br />

<!-- BADGE ROW 1 -->
<p>
  <img src="https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-91.7%25-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Three.js-R3F-black?style=for-the-badge&logo=three.js&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
</p>

<!-- BADGE ROW 2 -->
<p>
  <img src="https://img.shields.io/badge/React_Hook_Form-EC5990?style=for-the-badge&logo=reacthookform&logoColor=white" />
  <img src="https://img.shields.io/badge/Zod-Validation-3E67B1?style=for-the-badge" />
  <img src="https://img.shields.io/badge/pnpm-9%2B-F69220?style=for-the-badge&logo=pnpm&logoColor=white" />
  <img src="https://img.shields.io/badge/Node.js-18%2B-339933?style=for-the-badge&logo=node.js&logoColor=white" />
</p>

<!-- BADGE ROW 3 -->
<p>
  <img src="https://img.shields.io/badge/AI-xAI_%2F_Groq-8B5CF6?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Deploy-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" />
  <img src="https://img.shields.io/badge/License-MIT-22C55E?style=for-the-badge" />
  <img src="https://img.shields.io/badge/⭐-Star_This_Repo-FFD700?style=for-the-badge" />
</p>

<br />

<p>
  <a href="#-overview"><strong>Overview</strong></a> ·
  <a href="#-3d-body-engine"><strong>3D Engine</strong></a> ·
  <a href="#-tech-stack"><strong>Tech Stack</strong></a> ·
  <a href="#-getting-started"><strong>Getting Started</strong></a> ·
  <a href="#-architecture"><strong>Architecture</strong></a> ·
  <a href="#-ai-integration"><strong>AI Integration</strong></a> ·
  <a href="#-deployment"><strong>Deploy</strong></a>
</p>

</div>

---

## 🌟 Overview

**MediScan 3D** is a next-generation clinical screening prototype that turns raw biometric data into a living, breathing 3D body visualization. It combines a procedural **Three.js humanoid model** with a **clinical risk scoring engine** and optional **LLM-powered explanations** — all wrapped in a dark, cyberpunk-medical web interface.

> Input your vitals → watch organs glow and pulse → get an AI-written clinical breakdown — entirely in the browser.

### What makes it different

| Traditional Health Apps | MediScan 3D |
|------------------------|-------------|
| Static charts and numbers | Live 3D pulsing humanoid model |
| Generic risk categories | Per-organ emissive glow by clinical zone |
| Copy-paste health tips | xAI / Groq LLM natural-language explanations |
| Forms with no visual feedback | Real-time React Three Fiber scene updates |
| No spatial interaction | Full orbit: drag, zoom, pan around your body |
| Backend / data storage | 100% client-side, zero data leaves the browser |

---

## 🎯 Feature Highlights

<table>
<tr>
<td width="50%">

### 🫀 Procedural 3D Body Model
A humanoid assembled from `THREE.CylinderGeometry` and `THREE.SphereGeometry` primitives. Each body region maps to a distinct clinical risk zone — torso for cardiovascular, midsection for metabolic.

</td>
<td width="50%">

### 💓 Emissive Pulse Animation
High-risk zones (score > 50) trigger a breathing glow in the R3F `useFrame` loop. Torso and midsection pulse **180° out of phase** — simulating natural cardiac/digestive rhythm asynchrony.

</td>
</tr>
<tr>
<td width="50%">

### 🧮 Transparent Clinical Engine
Scoring uses published screening thresholds: JNC blood pressure stages, WHO BMI categories, ADA glucose ranges, NCEP cholesterol bands. Pure formulae — no black-box model.

</td>
<td width="50%">

### 🤖 AI Explanation Panel
Connect xAI/Grok or Groq for natural-language clinical analysis. No API key? The built-in rule engine fires instead — zero external dependency required for core functionality.

</td>
</tr>
<tr>
<td width="50%">

### 🎮 Full Orbit Controls
Drag to rotate, scroll to zoom, right-click to pan. The model auto-rotates for passive display and **freezes on hover** so you can inspect specific regions.

</td>
<td width="50%">

### 🔒 Privacy by Architecture
Your health data never leaves your browser. No backend, no database, no telemetry. Builds to a static export deployable on any CDN or self-hosted server.

</td>
</tr>
</table>

---

## 🩺 3D Body Engine

<a name="-3d-body-engine"></a>

The core of MediScan 3D is a **procedural Three.js scene** driven by [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) and [`@react-three/drei`](https://github.com/pmndrs/drei). Clinical risk scores computed in `lib/riskScore.ts` pipe directly into material properties on the live 3D mesh.

### Scene Geometry Map

```
                    ╔═══════════════════════════════════════════╗
                    ║        MEDISCAN 3D — BODY GEOMETRY MAP    ║
                    ╚═══════════════════════════════════════════╝

                         ┌──────────────────┐
                         │      HEAD        │  SphereGeometry  r=0.35
                         │   [0, 2.2, 0]    │  Blue-gray  —  baseline reference
                         └────────┬─────────┘
              ┌────────┐          │          ┌────────┐
              │  LEFT  │          │          │ RIGHT  │   CylinderGeometry
              │   ARM  │          │          │  ARM   │   r=0.15  h=0.9
              └────────┘          │          └────────┘   aesthetic only / no risk zone
                          ┌───────┴────────┐
                          │     TORSO      │  CylinderGeometry  r=0.4  h=1.2
                          │  [0, 0.8, 0]   │  ─────────────────────────────────────
                          │  ♥  CARDIO     │  CARDIOVASCULAR RISK ZONE
                          │                │  Inputs: Systolic BP · Age · Cholesterol
                          └───────┬────────┘  Pulse: sin(t × 0.004)
                          ┌───────┴────────┐
                          │  MIDSECTION    │  CylinderGeometry  r=0.42  h=0.5
                          │ [0, 0.2, 0.1]  │  ─────────────────────────────────────
                          │  🍬 METABOLIC  │  DIABETES / METABOLIC RISK ZONE
                          │                │  Inputs: BMI · Age · Fasting Glucose
                          └───────┬────────┘  Pulse: sin(t × 0.004 + π)  ← 180° offset
                   ┌─────────────┴─────────────┐
              ┌────┴─────┐               ┌─────┴────┐
              │  L LEG   │               │  R LEG   │  CylinderGeometry
              │  r=0.18  │               │  r=0.18  │  h=1.2
              └──────────┘               └──────────┘  aesthetic only / no risk zone
```

### Color → Risk Mapping (MeshPhongMaterial)

```
  Score   0 – 25  │  🟢  #10b981  Emerald  │  Safe. Healthy baseline. No emissive.
  Score  26 – 50  │  🟡  #f59e0b  Amber    │  Warning. Preventive action advised.
  Score  51 – 100 │  🔴  #ef4444  Red      │  High risk. Emissive sine-wave pulse ON.
```

### Emissive Pulsing Code

When a body region's risk score exceeds **50**, the R3F `useFrame` hook activates a sine-wave emissive glow:

```typescript
// components/BodyModel.tsx — inside useFrame()

// ── Torso: cardiovascular risk ─────────────────────────────────────────────
const pulseIntensity = 0.8 + Math.sin(Date.now() * 0.004) * 0.2;
(torsoRef.current.material as THREE.MeshPhongMaterial).emissive
  .setHex(parseInt(torsoColor.slice(1), 16) * (pulseIntensity * 0.3));

// ── Midsection: metabolic risk (π phase offset) ────────────────────────────
const midPulse = 0.8 + Math.sin(Date.now() * 0.004 + Math.PI) * 0.2;
(midRef.current.material as THREE.MeshPhongMaterial).emissive
  .setHex(parseInt(midColor.slice(1), 16) * (midPulse * 0.3));
```

The **π phase offset** means the torso and midsection glow peaks are perfectly staggered — mimicking the natural asynchrony between cardiovascular and digestive system rhythms.

### Lighting Rig

| Light | Type | Position | Intensity | Color | Purpose |
|-------|------|----------|-----------|-------|---------|
| Camera | PerspectiveCamera | `[0, 0, 3.5]` | FOV 50 | — | Scene framing and depth |
| Ambient | AmbientLight | Global | `0.6` | White | Prevents total shadow |
| Key | PointLight | `[5, 5, 5]` | `0.8` | White | Primary highlights |
| Accent | PointLight | `[-5, -5, 5]` | `0.4` | `#06b6d4` cyan | Cyberpunk medical aesthetic |
| Depth Sphere | Mesh transparent | Center | Opacity `0.2` | `#06b6d4` | Spatial depth reference |

### Interaction Model

```
hover model   →  userData.isInteracting = true   →  auto-rotation pauses
leave model   →  userData.isInteracting = false  →  auto-rotation resumes at speed 2
drag          →  OrbitControls.onPointerDown      →  orbit (drag / zoom / pan)
```

---

## 🏗️ Architecture

<a name="-architecture"></a>

```
┌───────────────────────────────────────────────────────────────────────────┐
│                        MEDISCAN 3D — DATA FLOW                            │
├───────────────────────────────────────────────────────────────────────────┤
│                                                                           │
│  USER INPUT                                                               │
│  VitalsForm.tsx  ←  React Hook Form + Zod validation                      │
│  age · bmi · systolicBP · diastolicBP · glucose · cholesterol             │
│         │                                                                 │
│         ▼                                                                 │
│  RISK ENGINE  ──  lib/riskScore.ts                                        │
│  ┌──────────────────────────┐  ┌────────────────────────────────────────┐ │
│  │  cardiovascularRisk()    │  │  metabolicRisk()                       │ │
│  │  • JNC BP staging        │  │  • WHO BMI categories (18.5 / 25 / 30)│ │
│  │  • Age decade weighting  │  │  • ADA glucose (100 / 126 mg/dL)      │ │
│  │  • NCEP cholesterol band │  │  • Age modifier coefficient            │ │
│  │  → Output: 0–100 score   │  │  → Output: 0–100 score                │ │
│  └────────────┬─────────────┘  └─────────────────┬──────────────────────┘ │
│               └──────────────┬──────────────────--┘                       │
│                              ▼                                            │
│  VISUALIZATION                                                            │
│  ┌───────────────────────┐     ┌──────────────────────────────────────┐  │
│  │  BodyModel.tsx         │     │  RiskPanel.tsx                       │  │
│  │  React Three Fiber     │     │  ┌──────────────────────────────┐    │  │
│  │  • Torso mesh          │     │  │ Progress bars (0–100)        │    │  │
│  │    cardioRisk → color  │     │  │ Color-coded thresholds       │    │  │
│  │    >50 → sine pulse    │     │  │ Risk level labels            │    │  │
│  │  • Midsection mesh     │     │  └──────────────────────────────┘    │  │
│  │    metaRisk → color    │     │  "Explain" button                    │  │
│  │    >50 → +π pulse      │     │         │                            │  │
│  │  • OrbitControls       │     │         ▼                            │  │
│  │  • Auto-rotate Y       │     │  ┌────────────┐  ┌───────────────┐  │  │
│  └───────────────────────┘     │  │ xAI / Groq │  │  Rule Engine  │  │  │
│                                │  │ (key set)  │  │  (no key)     │  │  │
│                                │  └────────────┘  └───────────────┘  │  │
│                                └──────────────────────────────────────┘  │
└───────────────────────────────────────────────────────────────────────────┘
```

### Source Module Reference

| File | Role |
|------|------|
| `components/BodyModel.tsx` | R3F scene, OrbitControls, MeshPhongMaterial, useFrame pulse loop |
| `components/RiskPanel.tsx` | Score gauges, AI prompt builder, rule-engine fallback |
| `lib/riskScore.ts` | Cardiovascular and metabolic scoring formulas |
| `app/` | Next.js 14 App Router pages and layout |
| `.env.local.example` | AI provider key configuration template |
| `next.config.js` | Static export mode configuration |
| `tailwind.config.ts` | Custom dark clinical color palette |

---

## 🚀 Tech Stack

<a name="-tech-stack"></a>

| Layer | Technology | Version | Why |
|-------|-----------|---------|-----|
| **Framework** | Next.js | 14 | Static export — deploy anywhere; App Router |
| **Language** | TypeScript | 5.x | 91.7% of codebase; type-safe risk formulas |
| **3D Engine** | Three.js | Latest | WebGL mesh rendering, MeshPhongMaterial |
| **3D Bindings** | React Three Fiber | R3F | useFrame loop, declarative JSX scene graph |
| **3D Utilities** | @react-three/drei | Latest | OrbitControls, PerspectiveCamera plug-ins |
| **Styling** | Tailwind CSS | 3.x | Dark clinical theme, utility-first |
| **Forms** | React Hook Form | Latest | Performant uncontrolled vitals form |
| **Validation** | Zod | Latest | Type-safe clinical input validation |
| **AI (Optional)** | xAI / Groq | API | Natural language clinical explanations |
| **Package Manager** | pnpm | 9+ | Fast installs, strict dependency resolution |

---

## 💻 Getting Started

<a name="-getting-started"></a>

### Prerequisites

```bash
node --version    # v18.0.0 or higher
pnpm --version    # v9.0.0 or higher
```

### Installation

```bash
# 1. Clone
git clone https://github.com/lokojitcoder123/MediScan-3D---Interactive-Health-Risk-Visualizer.git
cd MediScan-3D---Interactive-Health-Risk-Visualizer

# 2. Install
pnpm install

# 3. Environment
cp .env.local.example .env.local
```

### Environment Variables

Open `.env.local` and configure one AI provider (both are optional):

```env
# Groq — fast inference, free tier available
NEXT_PUBLIC_GROQ_API_KEY=gsk_xxxxxxxxxxxxxxxxxxxxxxxxxxxx

# xAI / Grok
NEXT_PUBLIC_XAI_API_KEY=xai-xxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

> **No key configured?** The built-in medical rule engine handles all explanations locally — no external calls, no setup required.

### Run

```bash
pnpm dev
# → http://localhost:3000
```

### Scripts

| Command | Action |
|---------|--------|
| `pnpm dev` | Development server with hot reload |
| `pnpm build` | Production build (static export to `/out`) |
| `pnpm start` | Serve production build locally |
| `pnpm lint` | ESLint + Prettier checks |

---

## 📁 Project Structure

```
MediScan-3D---Interactive-Health-Risk-Visualizer/
│
├── 📁 app/
│   ├── layout.tsx              Root layout, dark theme provider
│   └── page.tsx                Main page — VitalsForm + BodyModel + RiskPanel
│
├── 📁 components/
│   ├── BodyModel.tsx    ★      3D humanoid scene
│   │                           • Procedural geometry construction
│   │                           • MeshPhongMaterial + emissive pulse
│   │                           • OrbitControls + auto-rotate
│   └── RiskPanel.tsx    ★      Analysis panel
│                               • Score progress bars
│                               • AI / rule-engine explanation
│
├── 📁 lib/
│   └── riskScore.ts     ★      Clinical scoring engine
│                               • cardiovascularRisk(bp, age, chol)
│                               • metabolicRisk(bmi, age, glucose)
│
├── 📁 public/
│   ├── logo.png                MediScan 3D brand mark
│   └── poster.png              Hero banner image
│
├── .env.local.example          AI provider key template
├── .dockerignore               Docker build exclusions
├── next.config.js              output: 'export' static mode
├── tailwind.config.ts          Dark clinical color palette
├── tsconfig.json               Strict TypeScript configuration
└── package.json                Dependencies and scripts
```

---

## 🧠 AI Integration

<a name="-ai-integration"></a>

The "Explain" button in `RiskPanel.tsx` triggers a client-side explanation request using the configured provider:

```
User clicks "Explain"
        │
        ▼
  API key present?
        │
   YES ─┼──────────────────────────────────────────────►  Cloud LLM
        │                                                  • Vitals + scores sent
        │                                                  • Returns clinical prose
        │                                                  • Streamed to RiskPanel
        │
   NO  ─┼──────────────────────────────────────────────►  Built-in Rule Engine
                                                           • BP classification (JNC 8)
                                                           • BMI staging (WHO)
                                                           • Glucose risk band (ADA)
                                                           • Cholesterol tier (NCEP)
                                                           • Age modifier text
```

### Provider Support

| Provider | Env Variable | Notes |
|----------|-------------|-------|
| **Groq** | `NEXT_PUBLIC_GROQ_API_KEY` | Fastest inference; generous free tier |
| **xAI / Grok** | `NEXT_PUBLIC_XAI_API_KEY` | Advanced medical reasoning |

### Built-in Rule Engine Reference Ranges

| Vital | Source | Thresholds |
|-------|--------|-----------|
| Blood pressure | JNC 8 | Normal <120/80, Elevated 120–129, Stage 1 130–139, Stage 2 ≥140 |
| BMI | WHO | Underweight <18.5, Normal 18.5–24.9, Overweight 25–29.9, Obese ≥30 |
| Fasting glucose | ADA | Normal <100, Prediabetes 100–125, Diabetes ≥126 mg/dL |
| Cholesterol | NCEP ATP III | Optimal <200, Borderline 200–239, High ≥240 mg/dL |

---

## ☁️ Deployment

<a name="-deployment"></a>

MediScan 3D builds to a fully static site (`/out`). No Node.js runtime required — serve it from any CDN.

### Vercel (Recommended — Zero Config)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/lokojitcoder123/MediScan-3D---Interactive-Health-Risk-Visualizer)

Vercel auto-detects Next.js. Set your AI env vars in the Vercel dashboard and you're live.

### Any Static Host (Render, Netlify, GitHub Pages, S3)

```bash
pnpm build          # output goes to /out
# Upload /out to your host's publish directory
```

### Docker

```dockerfile
FROM node:18-alpine
RUN npm i -g pnpm
WORKDIR /app
COPY . .
RUN pnpm install && pnpm build
# Serve /out with nginx, serve, or caddy
```

---

## 🤝 Contributing

Contributions are welcome — new risk modules, visual improvements, AI provider additions, and bug fixes.

```bash
# 1. Fork → clone → branch
git checkout -b feat/your-feature-name

# 2. Make changes
pnpm lint && pnpm build      # must pass

# 3. Commit with conventional commits
git commit -m "feat: add pulmonary risk zone with SpO2 input"

# 4. Push and open a Pull Request
git push origin feat/your-feature-name
```

### Ideas for Contributions

- 🫁 **Pulmonary risk zone** — SpO2, smoking history inputs
- 🧠 **Neurological risk zone** — stress, sleep, family history
- 📊 **Risk history timeline** — track vitals over time
- 🌐 **i18n** — multilingual clinical explanations
- 📱 **PWA / offline mode** — service worker for fully offline use

---

## ⚠️ Clinical Disclaimer

> **This tool is a screening prototype for educational and demonstration purposes only.**
>
> MediScan 3D is **not a medical diagnostic device** and does not replace professional medical advice, diagnosis, or treatment. Risk scores are generated using simplified clinical heuristics and must not be used to make any medical decisions.
>
> **Always consult a licensed healthcare professional** for any health concerns, symptoms, or treatment decisions.

---

<div align="center">

<br />

<img src="https://github.com/lokojitcoder123/MediScan-3D---Interactive-Health-Risk-Visualizer/raw/main/public/logo.png" width="48" alt="MediScan 3D" />

**MediScan 3D** — built by [lokojitcoder123](https://github.com/lokojitcoder123)

*See your health in a dimension most apps don't.*

<br />

[![GitHub Profile](https://img.shields.io/badge/GitHub-lokojitcoder123-181717?style=for-the-badge&logo=github)](https://github.com/lokojitcoder123)
[![Repository](https://img.shields.io/badge/Repo-MediScan_3D-0969DA?style=for-the-badge&logo=github)](https://github.com/lokojitcoder123/MediScan-3D---Interactive-Health-Risk-Visualizer)

<br />

⭐ **Star this repo if MediScan 3D impressed you** ⭐

</div>
