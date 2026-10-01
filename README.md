# 🛡️ RakshaNetra (Border Watch) - Secure Border Intelligence & Surveillance System

An enterprise-grade, integrated border security and tactical surveillance intelligence platform engineered for real-time perimeter monitoring, automated threat detection, encrypted communications, and ANPR (Automated Number Plate Recognition).

---

## 📋 Table of Contents
1. [System Architecture](#-system-architecture)
2. [Folder Structure](#-folder-structure)
3. [Technology Stack in Detail](#-technology-stack-in-detail)
   - [Frontend Technologies](#1-frontend-technology-stack)
   - [Backend & AI Computer Vision Technologies](#2-backend--ai-computer-vision-stack)
4. [Core Features & Modules](#-core-features--modules)
5. [Prerequisites & System Requirements](#-prerequisites--system-requirements)
6. [Installation & Setup Guide](#-installation--setup-guide)
   - [Running Frontend](#running-the-frontend)
   - [Running Backend](#running-the-backend)
7. [Authentication & Credentials](#-authentication--credentials)
8. [Testing & Quality Assurance](#-testing--quality-assurance)
9. [Security & Architectural Highlights](#-security--architectural-highlights)

---

## 🏛️ System Architecture

The project is architected into a clean decoupled structure:
- **`frontend/`**: Modern React single-page application (SPA) featuring a dark military/tactical HUD interface, real-time simulated sensors, multi-feed camera matrix, tactical messaging, and analytics.
- **`backend/`**: High-performance Python computer vision inference engine utilizing YOLOv8 and OpenCV to capture video streams, classify objects in real time, and output bounding boxes with confidence scores.

```
                      ┌───────────────────────────────────────────┐
                      │        RAKSHANETRA COMMAND DASHBOARD      │
                      │         (React 18 + Vite + Tailwind)      │
                      └─────────────────────┬─────────────────────┘
                                            │
               ┌────────────────────────────┼────────────────────────────┐
               │                            │                            │
      ┌────────▼────────┐          ┌────────▼────────┐          ┌────────▼────────┐
      │  Tactical Comms │          │  Surveillance   │          │  AI Analytics   │
      │  & Alert Matrix │          │  & ANPR Feeds   │          │  & Threat Intel │
      └─────────────────┘          └────────┬────────┘          └─────────────────┘
                                            │
                               ┌────────────▼────────────┐
                               │     PYTHON AI ENGINE    │
                               │  (YOLOv8 + OpenCV + PT) │
                               └─────────────────────────┘
```

---

## 📁 Folder Structure

```
D:\bordersecurity\border-watch\
│
├── 📁 backend/
│   ├── best.pt                     # Custom-trained YOLOv8 neural network weights
│   ├── detect.py                   # Real-time computer vision inference script
│   ├── requirements.txt            # Python dependencies (ultralytics, opencv, torch)
│   └── README.md                   # Dedicated backend documentation
│
├── 📁 frontend/
│   ├── 📁 public/                  # Public static assets
│   │   ├── favicon.svg             # Tactical shield favicon
│   │   ├── placeholder.svg         # Tactical camera placeholder graphic
│   │   └── robots.txt              # Search engine crawler policies
│   │
│   ├── 📁 src/
│   │   ├── 📁 components/          # Reusable tactical UI modules
│   │   │   ├── AlertPanel.jsx      # Flash emergency alert broadcast system
│   │   │   ├── AnalyticsPanel.jsx  # Threat intelligence statistics & charts
│   │   │   ├── AnomalyFeed.jsx     # AI anomaly classification stream
│   │   │   ├── ChatPanel.jsx       # P2P encrypted sector messaging
│   │   │   ├── NavLink.jsx         # Navigation link component
│   │   │   ├── SurveillancePanel.jsx # Multi-camera live monitoring grid
│   │   │   ├── TopBar.jsx          # Header with time, station ID & logout
│   │   │   ├── VehicleLogPanel.jsx # ANPR vehicle tracking & flagging table
│   │   │   ├── VillageOverview.jsx # Territorial station status overview
│   │   │   ├── VillageSelector.jsx # Sector search & selection panel
│   │   │   └── 📁 ui/              # 45+ customizable Radix UI component primitives
│   │   │
│   │   ├── 📁 context/             # Global React Context state providers
│   │   │   ├── AuthContext.jsx     # Session lifecycle, credentials & token state
│   │   │   ├── CommContext.jsx     # Tactical chat messages & broadcast alerts
│   │   │   └── SurveillanceContext.jsx # Camera feeds, vehicle logs & anomaly simulation
│   │   │
│   │   ├── 📁 data/                # Data layers & mock engines
│   │   │   ├── surveillance.js     # ANPR plate & anomaly generators
│   │   │   └── villages.js         # Sector database & authentication logic
│   │   │
│   │   ├── 📁 hooks/               # Custom React hooks
│   │   │   ├── use-mobile.jsx      # Viewport breakpoint detection hook
│   │   │   └── use-toast.js        # Tactical notification dispatch hook
│   │   │
│   │   ├── 📁 lib/
│   │   │   └── utils.js            # Tailwind merge & clsx class utility (cn)
│   │   │
│   │   ├── 📁 pages/               # Top-level route pages
│   │   │   ├── Dashboard.jsx       # Central surveillance mission control
│   │   │   ├── Index.jsx           # Auth gatekeeper (Dashboard or Login)
│   │   │   ├── LoginPage.jsx       # High-security authentication terminal
│   │   │   └── NotFound.jsx        # 404 Classified route fallback
│   │   │
│   │   ├── 📁 test/                # Automated test suites
│   │   │   ├── example.test.js     # Smoke tests
│   │   │   ├── full-system.test.jsx # 24 integration tests across all modules
│   │   │   └── setup.js            # Vitest DOM & browser API mocks
│   │   │
│   │   ├── App.css                 # Application-wide styling
│   │   ├── App.jsx                 # App root with providers & routing
│   │   ├── index.css               # Tailwind directives, animations & CSS variables
│   │   └── main.jsx                # DOM entry point
│   │
│   ├── components.json             # Shadcn component configuration
│   ├── eslint.config.js            # ESLint rules & React hooks validation
│   ├── index.html                  # HTML5 entry with metadata
│   ├── jsconfig.json               # Path alias resolution (@/* -> ./src/*)
│   ├── package.json                # Frontend scripts & NPM dependencies
│   ├── postcss.config.js           # PostCSS Tailwind engine configuration
│   ├── tailwind.config.js          # Tactical HUD theme & color system configuration
│   ├── vite.config.js              # Vite bundler, proxy & server settings
│   └── vitest.config.js            # Vitest unit testing configuration
│
├── .gitignore                      # Multi-tier ignore rules for frontend & backend
└── README.md                       # Master project documentation
```

---

## 🛠️ Technology Stack in Detail

### 1. Frontend Technology Stack

| Technology | Version / Spec | Role & Why It Was Chosen |
| :--- | :--- | :--- |
| **React 18** | `^18.3.1` | The industry-standard declarative component library. Drives dynamic UI updates, custom contexts, concurrent rendering, and real-time state management across all operational tabs. |
| **JavaScript (ESNext + JSX)** | Modern ECMAScript | Clean, highly readable, standard JavaScript codebase ensuring maximum developer velocity and zero transpilation friction. |
| **Vite** | `^5.4.19` | Next-generation frontend build tool powered by native ES modules. Provides instantaneous hot module replacement (HMR) during development and lightning-fast Rollup-based production builds. |
| **Tailwind CSS** | `^3.4.17` | Utility-first CSS framework configured with a custom military/tactical color palette (`Rajdhani` and `Share Tech Mono` fonts, glowing neon borders, radar green primary accents, alert warning colors). |
| **Tailwind CSS Animate** | `^1.0.7` | Provides micro-animations including scanlines, radar sweeps, warning pulses, and smooth panel transitions. |
| **Radix UI** | Multiple Primitives | Unstyled, accessible (WAI-ARIA compliant) headless UI primitives ensuring robust keyboard navigation, modal focus traps, dropdown menus, tooltips, dialogs, and tabs. |
| **Lucide React** | `^0.462.0` | High-clarity vector tactical icon suite representing security shields, surveillance cameras, vehicles, radar signals, locks, and alert states. |
| **TanStack React Query** | `^5.83.0` | Asynchronous data synchronization and server-state management engine for scalable API integration. |
| **React Router DOM** | `^6.30.1` | Client-side routing engine managing seamless navigation between the classified Login terminal, Dashboard, and fallback routes. |
| **Recharts** | `^2.15.4` | Declarative SVG charting library used in the Intelligence Analytics tab to render threat distribution and historical anomaly trends. |
| **Sonner & Toast** | `^1.7.4` | Low-latency HUD toast alert notifications for operational status changes, incoming alerts, and dispatches. |
| **Vitest & React Testing Library** | `^3.2.4` / `^16.0.0` | High-performance unit and integration testing framework running on JSDOM to verify UI rendering, button interactions, state updates, and auth logic. |

---

### 2. Backend & AI Computer Vision Stack

| Technology | Version / Spec | Role & Why It Was Chosen |
| :--- | :--- | :--- |
| **Python** | `3.10+ / 3.14` | The premier language for Machine Learning and Computer Vision, providing deep hardware acceleration support and rich library ecosystems. |
| **Ultralytics YOLOv8** | `^8.4.0` | State-of-the-art real-time Convolutional / Vision Transformer neural network for object detection. Capable of processing high-resolution video streams at high FPS with high precision. |
| **PyTorch (`torch`, `torchvision`)** | `^2.11.0` | Open-source machine learning framework providing GPU/CPU tensor computation with automatic differentiation for neural net execution. |
| **OpenCV (`opencv-python`)** | `^4.13.0` | Open-Source Computer Vision library used for capturing real-time RTSP/Webcam video streams, frame matrix manipulation, drawing bounding boxes, and rendering live HUD text overlays. |
| **NumPy** | `^2.4.0` | Fundamental package for scientific computing; processes raw RGB camera frame arrays in nanoseconds. |
| **Custom Model (`best.pt`)** | PyTorch Binary Weights | Trained neural network checkpoint containing calibrated weights and biases for classifying perimeter objects, vehicles, and personnel. |

---

## 🎯 Core Features & Modules

### 1. 🔐 High-Security Authentication Terminal
- Role-based border intelligence login.
- Direct **Central Command HQ (Admin)** access with national oversight.
- Sector-level login for **37 frontier posts** distributed across **4 sensitive border regions** (Jammu & Kashmir, Punjab, Rajasthan, Gujarat).
- Session persistence backed by encrypted `sessionStorage`.

### 2. 💬 Tactical Encrypted Communications (COMMS)
- Station-to-Station encrypted messaging between any frontier post and command HQ.
- Secure classified document transfer simulation (`.enc` payload dispatch).
- Auto-scrolling chat stream with transmission timestamp verification.

### 3. 🚨 Priority Flash Alert Matrix (ALERTS)
- Two modes of alert dispatch: **Targeted Unit Alert** or **Border-wide Broadcast (ALL)**.
- High-priority color-coded visual indicator (`CRITICAL`, `WARNING`, `ADVISORY`).
- Historical alert dispatch log with origin tagging.

### 4. 📹 Multi-Camera Live Surveillance Matrix (CAMS)
- Multi-camera grid monitoring perimeter gates, checkpoints, and watchtowers.
- Real-time signal strength indicators (0–100%) and Online/Offline telemetry.
- Seamless webcam integration using HTML5 `navigator.mediaDevices` with graceful headless fallbacks.
- Single-click video feed expansion mode.

### 5. ⚡ AI Anomaly & Intrusion Detection (AI DETECT)
- Automated threat classification engine detecting:
  - Unauthorized perimeter breach & restricted entry
  - Contraband transfer & smuggling patterns
  - Suspicious nighttime movement & loitering
  - Abnormal crowd gatherings & assembly near border fences
- Filterable severity tiers with pulse animations on high-threat detections.

### 6. 🚗 Automated Number Plate Recognition (ANPR / VEHICLES)
- Real-time vehicle logging tracking registration plates, crossing timestamps, and monitoring camera IDs.
- Automated repeat offender identification (flagging vehicles crossing multiple times within short intervals).
- Interactive status tagging: `NORMAL`, `SUSPICIOUS`, or `HIGH-RISK`.
- Fast plate search and category filters.

### 7. 📊 Threat Intelligence & Analytics (INTEL)
- Real-time stat cards: Total Vehicles Logged, Suspicious Flag Count, Active Cameras, Daily Alerts.
- Visual anomaly distribution percentage breakdown.
- Top alert sector locations breakdown.
- High-risk repeat vehicle frequency counter.

### 8. 🗺️ Frontier Station Territorial Overview (OVERVIEW)
- Comprehensive geographical directory of all 37 frontier posts.
- Precise GPS coordinates (Latitude/Longitude) for every sector.
- Real-time status tags: `YOU` (Current Station), `ONLINE`, `VIEW ONLY`.

---

## 💻 Prerequisites & System Requirements

### Hardware Requirements:
- **Processor**: Intel Core i3 (10th Gen+) / AMD Ryzen 3 or higher
- **RAM**: Minimum 4 GB (8 GB recommended for simultaneous YOLO inference and web dashboard)
- **Camera**: Standard USB Webcam or integrated laptop camera (for live detection)
- **OS**: Windows 10/11, Ubuntu 20.04+, or macOS

### Software Requirements:
- **Node.js**: `v18.0.0` or later ([Download Node.js](https://nodejs.org/))
- **Python**: `3.10` or later ([Download Python](https://www.python.org/))
- **Package Managers**: `npm` (comes with Node.js) and `pip` (comes with Python)

---

## 🚀 Installation & Setup Guide

### Running the Frontend

1. Open a terminal (PowerShell or Command Prompt) and navigate to `frontend`:
   ```powershell
   cd D:\bordersecurity\border-watch\frontend
   ```

2. Install dependencies (if not already installed):
   ```powershell
   npm install
   ```

3. Start the Vite development server:
   ```powershell
   npm run dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:8080
   ```

---

### Running the Backend

1. Open a **second terminal** and navigate to `backend`:
   ```powershell
   cd D:\bordersecurity\border-watch\backend
   ```

2. *(Optional but Recommended)* Create and activate a Python virtual environment:
   ```powershell
   py -m venv venv
   .\venv\Scripts\activate
   ```

3. Install required Python packages:
   ```powershell
   py -m pip install -r requirements.txt
   ```

4. Launch real-time AI YOLO detection:
   ```powershell
   py detect.py
   ```

> 💡 **Controls**: Click on the OpenCV video window and press the **`ESC`** key anytime to exit the camera stream.

---

## 🔑 Authentication & Credentials

The platform includes pre-configured operational accounts:

### 1. Dedicated Command Administrator
| Field | Credential |
| :--- | :--- |
| **Officer Username** | `admin` |
| **Access Code (Password)** | `admin123` *(or `1234`)* |
| **Designation** | Central Command HQ (National Command Oversight) |

### 2. Strategic Frontier Sectors (Sample Logins)
| Frontier Base | State / Sector | Username | Password |
| :--- | :--- | :--- | :--- |
| **Amritsar HQ** | Punjab Central | `amritsar_hq` | `1234` |
| **Sri Ganganagar HQ**| Rajasthan North | `ganganagar_hq` | `1234` |
| **Uri Base** | J&K LOC Central | `uri_base` | `1234` |
| **Bikaner Base** | Rajasthan Central | `bikaner_base` | `1234` |
| **Jaisalmer Base** | Rajasthan South | `jaisalmer_base` | `1234` |
| **Bhuj Base** | Gujarat Sector | `bhuj_base` | `1234` |
| **Kupwara Unit** | J&K LOC North | `kupwara_unit` | `1234` |
| **Ferozepur Unit** | Punjab South | `ferozepur_unit` | `1234` |

> *All 37 frontier unit accounts use the standard access code `1234`.*

---

## 🧪 Testing & Quality Assurance

The frontend includes a complete Vitest automated test suite verifying all 24 critical system functions:

### Running Tests:
```powershell
cd D:\bordersecurity\border-watch\frontend
npm run test
```

### Verified Test Suites:
- ✅ **Authentication**: Admin credentials, unit credentials, invalid user rejection.
- ✅ **Surveillance Generators**: License plate format, camera generation, anomaly logic, ANPR logs.
- ✅ **Utility Merging**: Tailwind class conflict resolution with `cn()`.
- ✅ **State Contexts**: Auth lifecycle, P2P communication, emergency broadcast dispatch.
- ✅ **User Interface**: Form validation, error prompts, search filtering, plate status mutation, tab switching.

### Production Build Verification:
```powershell
cd D:\bordersecurity\border-watch\frontend
npm run build
```
*(Bundles 1,680+ modules into minified, production-ready assets in under 6 seconds with 0 warnings or errors).*

---

## 🔒 Security & Architectural Highlights

1. **Zero External Branding**: Completely unbranded, tactical UI free of external generator badges or third-party watermarks.
2. **Robust Relative Pathing**: Backend Python modules resolve model weights dynamically relative to the execution script, eliminating path failure across different operating systems.
3. **Graceful Media Fallbacks**: Video components detect camera hardware availability and switch gracefully to simulated tactical feeds when webcams are unavailable.
4. **Decoupled Architecture**: Frontend and backend operate independently, allowing backend AI engines to be scaled or deployed as standalone microservices or containerized workloads (Docker/K8s).

---

**Developed for Border Security Intelligence Operations • Ministry of Defence**
                    