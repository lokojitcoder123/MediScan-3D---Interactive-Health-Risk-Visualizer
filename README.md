<div align="center">

<img src="https://github.com/lokojitcoder123/MediScan-3D---Interactive-Health-Risk-Visualizer/raw/main/public/logo.png" alt="MediScan 3D Logo" width="160"/>

# 🩺 MediScan 3D
### Interactive Health Risk Visualizer

**A next-generation 3D medical visualization platform built with Next.js, Three.js & AI**

<br/>

[![TypeScript](https://img.shields.io/badge/TypeScript-91.7%25-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-14-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![Three.js](https://img.shields.io/badge/Three.js-r3f-000000?style=for-the-badge&logo=three.js&logoColor=white)](https://threejs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)
[![Stars](https://img.shields.io/github/stars/lokojitcoder123/MediScan-3D---Interactive-Health-Risk-Visualizer?style=for-the-badge&color=FFD700)](https://github.com/lokojitcoder123/MediScan-3D---Interactive-Health-Risk-Visualizer)

<br/>

<img src="https://github.com/lokojitcoder123/MediScan-3D---Interactive-Health-Risk-Visualizer/raw/main/public/poster.png" alt="MediScan 3D Application Poster" width="100%" style="border-radius: 16px; box-shadow: 0 20px 60px rgba(0,0,0,0.5);"/>

<br/><br/>

> **Enter your vitals. Watch your body respond in real-time 3D.**  
> MediScan 3D maps clinical health risk scores directly onto an interactive humanoid model — organs glow, pulse, and respond to your data.

<br/>

[🚀 Live Demo](#-deployment) · [📖 Docs](#️-system-architecture--data-flow) · [🐛 Report Bug](https://github.com/lokojitcoder123/MediScan-3D---Interactive-Health-Risk-Visualizer/issues) · [✨ Request Feature](https://github.com/lokojitcoder123/MediScan-3D---Interactive-Health-Risk-Visualizer/issues)

</div>

---

## 📋 Table of Contents

- [🌟 Overview](#-overview)
- [✨ Key Features](#-key-features)
- [🩺 3D Humanoid Body Model Engine](#-3d-humanoid-body-model-engine)
  - [📐 Scene Architecture & Layout](#-3d-scene-architecture--layout)
  - [💡 Lighting & Camera Setup](#-lighting--camera-setup)
  - [🎨 Color & Emissive Pulsing](#-color--emissive-pulsing-algorithms)
  - [🎮 User Interactions](#-user-interactions)
- [🏗️ System Architecture & Data Flow](#️-system-architecture--data-flow)
- [🚀 Tech Stack](#-tech-stack)
- [💻 Local Development](#-local-development)
- [☁️ Deployment](#️-deployment)
- [📁 Project Structure](#-project-structure)
- [🧠 AI Integration](#-ai-integration)
- [⚖️ Clinical Disclaimer](#️-clinical-disclaimer)
- [🤝 Contributing](#-contributing)

---

## 🌟 Overview

**MediScan 3D** is a modern, interactive web application that transforms raw health vitals into a living, breathing 3D visualization. Enter basic biometrics — age, BMI, blood pressure, glucose, cholesterol — and watch a procedural 3D human body model respond in real time.

Organs and body regions **dynamically light up, pulse, and change color** based on calculated health risk scores. An intelligent clinical analysis panel, powered by a built-in rule-based engine (with optional **xAI/Grok** or **Groq AI** completions), provides plain-language explanations of your assessment.

```
🟢 Low Risk (0–25)     → Green glow, calm pulse
🟡 Moderate Risk (26–50) → Amber glow, elevated state
🔴 High Risk (51–100)   → Red, rhythmic pulsing alert
```

---

## ✨ Key Features

| Feature | Description |
|---------|-------------|
| 🫀 **3D Body Model** | Procedural humanoid rendered with React Three Fiber & Three.js |
| 💓 **Live Pulsing Animation** | Sine-wave emissive glow responds dynamically to risk thresholds |
| 🧮 **Clinical Risk Engine** | Formula-based scoring using standard medical screening thresholds |
| 🤖 **AI Analysis Panel** | xAI/Grok or Groq completions with local rule-engine fallback |
| 🎮 **Full Orbit Controls** | Drag, zoom, pan — explore every angle of the humanoid model |
| 🌑 **Dark Clinical UI** | Cyberpunk-medical aesthetic powered by Tailwind CSS |
| 📱 **Responsive Design** | Fully optimized for desktop and mobile viewports |
| 🔒 **No Data Stored** | All computation is client-side; your health data never leaves your browser |

---

## 🩺 3D Humanoid Body Model Engine

The centerpiece of MediScan 3D is its **interactive, procedural Three.js scene** built with [React Three Fiber (R3F)](https://docs.pmnd.rs/react-three-fiber) and [`@react-three/drei`](https://github.com/pmndrs/drei). Clinical risk scores map directly onto physical geometric segments of the humanoid body.

### 📐 3D Scene Architecture & Layout

The model is assembled from procedural geometries carefully positioned to resemble a human form:

```
         ┌──────────────────────────────────────────────────────────┐
         │                  MEDISCAN 3D BODY MODEL                  │
         └──────────────────────────────────────────────────────────┘

              ┌───────┐
              │  HEAD │  ← Sphere (r=0.35) @ [0, 2.2, 0]
              └───┬───┘    Baseline reference — Blue-gray
                  │
         ┌────┐   │   ┌────┐
         │ARM │   │   │ ARM│  ← Cylinders (r=0.15, h=0.9) — Aesthetic support
         └────┘   │   └────┘
               ┌──┴──┐
               │TORSO│  ← Cylinder (r=0.4, h=1.2) @ [0, 0.8, 0]
               │ ❤️  │    CARDIOVASCULAR RISK ZONE
               └──┬──┘    (Blood Pressure + Age + Cholesterol)
               ┌──┴──┐
               │ MID │  ← Cylinder (r=0.42, h=0.5) @ [0, 0.2, 0.1]
               │ 🍬  │    DIABETES / METABOLIC RISK ZONE
               └──┬──┘    (BMI + Age + Glucose) — Out-of-phase pulse
              ┌───┴───┐
           ┌──┘       └──┐
           │ LEG     LEG │  ← Cylinders (r=0.18, h=1.2) — Aesthetic support
           └─────────────┘
```

### 💡 Lighting & Camera Setup

The scene uses a layered, multi-light rig for a professional medical/cyberpunk look:

| Light | Position | Intensity | Role |
|-------|----------|-----------|------|
| **Camera** | `[0, 0, 3.5]` | FOV: 50 | Framing & depth |
| **Ambient** | Global | 0.6 | Prevents total shadows |
| **Key Point Light** | `[5, 5, 5]` | 0.8 | Main highlight |
| **Accent Point Light** | `[-5, -5, 5]` | 0.4 | Cyan `#06b6d4` glow — cyberpunk feel |
| **Background Sphere** | Center | Opacity: 0.2 | Spatial depth & ambience |

### 🎨 Color & Emissive Pulsing Algorithms

Risk levels are mapped to visual materials via custom `MeshPhongMaterial` shaders:

```
Risk Score 0–25   →  🟢 #10b981  (Emerald Green)  — Safe, healthy baseline
Risk Score 26–50  →  🟡 #f59e0b  (Amber Yellow)   — Warning: preventive measures needed
Risk Score 51–100 →  🔴 #ef4444  (Alert Red)      — High risk: pulsing emissive glow
```

#### 💓 Pulsing Glow Effect

When risk score exceeds **50**, an emissive breathing animation activates inside R3F's render loop (`useFrame`):

```typescript
// Torso — Cardiovascular risk pulse
const pulseIntensity = 0.8 + Math.sin(Date.now() * 0.004) * 0.2;
torsoRef.current.material.emissive.setHex(
  parseInt(torsoColor.slice(1), 16) * (pulseIntensity * 0.3)
);

// Midsection — Metabolic risk pulse (π phase offset for bio-rhythmic feel)
const midPulse = 0.8 + Math.sin(Date.now() * 0.004 + Math.PI) * 0.2;
midRef.current.material.emissive.setHex(
  parseInt(midColor.slice(1), 16) * (midPulse * 0.3)
);
```

The **torso** (cardiovascular) and **midsection** (metabolic) pulse **180° out of phase** — mimicking the natural asynchronous rhythm of heart and digestive system activity.

### 🎮 User Interactions

- **🖱️ Orbit Controls** — Drag to orbit, scroll to zoom, right-click to pan
- **🔄 Auto-rotation** — Constant Y-axis rotation at speed `2` for passive display
- **⏸️ Hover Stabilization** — Rotation pauses on pointer hover for detailed inspection
- **📍 Region Highlighting** — Torso and midsection respond independently to different risk profiles

---

## 🏗️ System Architecture & Data Flow

```
┌─────────────────────────────────────────────────────────────────────┐
│                     FRONTEND USER INTERFACE                         │
│                                                                     │
│   [User Inputs Vitals]  ──►  [VitalsForm Component]                │
│       Age, BMI, BP,                  ↓                             │
│       Glucose, Chol.      [lib/riskScore.ts — Risk Engine]         │
└──────────────────────────────────┬──────────────────────────────────┘
                                   │
                         ┌─────────▼──────────┐
                         │   CORE PROCESSING   │
                         │                     │
                         │  Cardiovascular ──► │
                         │  Diabetes       ──► │── Risk Score Object
                         │  Metabolic      ──► │
                         └────┬──────────┬─────┘
                              │          │
               ┌──────────────▼──┐   ┌──▼──────────────────┐
               │  BodyModel.tsx  │   │   RiskPanel.tsx      │
               │   3D Canvas     │   │   Analysis Output    │
               └──────────────┬──┘   └──┬───────────────────┘
                              │          │
               ┌──────────────▼──┐   ┌──▼──────────────────────┐
               │  React Three    │   │  Explain Button          │
               │  Fiber Scene    │   │         ↓                │
               │  Glow + Pulse   │   │  [Local Rule Engine]     │
               └─────────────────┘   │       or                 │
                                     │  [xAI / Groq LLM API]   │
                                     └─────────────────────────-┘
```

### Key Source Modules

| Module | Path | Purpose |
|--------|------|---------|
| 🫁 **BodyModel** | `components/BodyModel.tsx` | R3F scene, OrbitControls, phong materials, pulsing animation |
| 📊 **RiskPanel** | `components/RiskPanel.tsx` | Progress gauges, AI explanations, rule-based fallback |
| 🧮 **Risk Engine** | `lib/riskScore.ts` | Clinical scoring formulas using standard screening thresholds |

---

## 🚀 Tech Stack

<div align="center">

| Category | Technology | Version |
|----------|-----------|---------|
| **Framework** | [Next.js](https://nextjs.org/) | 14 (Static Export) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) | 5.x |
| **3D Engine** | [Three.js](https://threejs.org/) | Latest |
| **3D React Bindings** | [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) | R3F |
| **3D Helpers** | [@react-three/drei](https://github.com/pmndrs/drei) | Latest |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) | 3.x |
| **Forms** | [React Hook Form](https://react-hook-form.com/) | Latest |
| **Validation** | [Zod](https://zod.dev/) | Latest |
| **AI (Optional)** | xAI / Grok or Groq | API |
| **Package Manager** | pnpm | 9+ |

</div>

---

## 💻 Local Development

### Prerequisites

Make sure you have the following installed:

- **Node.js** `v18` or higher
- **pnpm** `v9` or higher

```bash
# Verify your versions
node --version   # Should be >= 18
pnpm --version   # Should be >= 9
```

### Setup Instructions

**1. Clone the repository**
```bash
git clone https://github.com/lokojitcoder123/MediScan-3D---Interactive-Health-Risk-Visualizer.git
cd MediScan-3D---Interactive-Health-Risk-Visualizer
```

**2. Install dependencies**
```bash
pnpm install
```

**3. Configure environment (Optional — for AI features)**

Copy the example env file:
```bash
cp .env.local.example .env.local
```

Add your API key to `.env.local`:
```env
# Choose one provider:
NEXT_PUBLIC_GROQ_API_KEY=your_groq_key_here
# or
NEXT_PUBLIC_XAI_API_KEY=your_xai_key_here
```

> 💡 **No API key?** No problem. The app automatically falls back to the built-in medical rule engine — no external API needed for core functionality.

**4. Start the development server**
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server with hot reload |
| `pnpm build` | Build for production (static export) |
| `pnpm start` | Serve the production build locally |
| `pnpm lint` | Run ESLint |

---

## ☁️ Deployment

MediScan 3D is configured as a **Next.js static export**, making it deployable anywhere that serves static files.

### Deploy to Vercel (Recommended)

Zero-config deployment — Vercel auto-detects Next.js:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/lokojitcoder123/MediScan-3D---Interactive-Health-Risk-Visualizer)

### Deploy to Render / GitHub Pages / Netlify

Set the **publish directory** to `out` (Next.js static export output):

```bash
# Build command
pnpm build

# Publish directory
out/
```

---

## 📁 Project Structure

```
MediScan-3D---Interactive-Health-Risk-Visualizer/
│
├── 📁 app/                     # Next.js App Router pages
├── 📁 components/
│   ├── BodyModel.tsx           # 🫁 3D humanoid scene (R3F + Three.js)
│   └── RiskPanel.tsx           # 📊 Risk analysis & AI explanations
│
├── 📁 lib/
│   └── riskScore.ts            # 🧮 Clinical risk scoring engine
│
├── 📁 public/
│   ├── logo.png                # MediScan 3D logo
│   └── poster.png              # App poster / banner
│
├── 📁 .builder/rules/          # Builder configuration
├── .env.local.example          # Environment variable template
├── next.config.js              # Next.js configuration (static export)
├── tailwind.config.ts          # Tailwind dark clinical theme
├── tsconfig.json               # TypeScript configuration
└── package.json                # Dependencies & scripts
```

---

## 🧠 AI Integration

MediScan 3D supports two AI providers for generating clinical explanations:

### Supported Providers

| Provider | Environment Variable | Notes |
|----------|---------------------|-------|
| **Groq** | `NEXT_PUBLIC_GROQ_API_KEY` | Fast LLM inference |
| **xAI / Grok** | `NEXT_PUBLIC_XAI_API_KEY` | Grok AI completions |

### Fallback Behavior

```
User clicks "Explain" button
         │
         ▼
  API Key configured?
    YES ──► Cloud LLM (xAI or Groq)
    NO  ──► Built-in Medical Rule Engine
             (Hardcoded clinical thresholds,
              no external dependencies)
```

The built-in rule engine covers:
- Blood pressure classification (normal / elevated / hypertensive)
- BMI staging (underweight / normal / overweight / obese)
- Fasting glucose risk (normal / prediabetic / diabetic range)
- Cholesterol interpretation (optimal / borderline / high)
- Age-weighted cardiovascular risk modifiers

---

## ⚖️ Clinical Disclaimer

> [!WARNING]
> **This tool is a screening prototype for educational and demonstration purposes only.**
>
> MediScan 3D is **not a medical diagnostic device** and does not replace professional medical advice, diagnosis, or treatment. The risk scores and visualizations are generated using simplified, general-purpose clinical heuristics and should not be used to make any medical decisions.
>
> **Always consult a licensed healthcare professional** for any medical concerns, symptoms, or treatment decisions.

---

## 🤝 Contributing

Contributions are welcome! Here's how to get started:

**1. Fork the repository**
```bash
git fork https://github.com/lokojitcoder123/MediScan-3D---Interactive-Health-Risk-Visualizer.git
```

**2. Create a feature branch**
```bash
git checkout -b feature/your-feature-name
```

**3. Make your changes and commit**
```bash
git commit -m "feat: add your feature description"
```

**4. Push and open a Pull Request**
```bash
git push origin feature/your-feature-name
```

### Code Style

This project uses **Prettier** for formatting. Run before committing:
```bash
pnpm lint
```

---

<div align="center">

---

**Built with ❤️ by [lokojitcoder123](https://github.com/lokojitcoder123)**

*MediScan 3D — See your health like never before.*

[![GitHub](https://img.shields.io/badge/GitHub-lokojitcoder123-181717?style=for-the-badge&logo=github)](https://github.com/lokojitcoder123)

</div>
