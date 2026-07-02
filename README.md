<div align="center">
  <img src="public/assets/logos/brand-logo.png" alt="Tranzport Logo" width="200" />

  <h1>Tranzport Global Logistics Platform</h1>

  <p><b>An Enterprise-Grade, Multilingual Freight Forwarding & Logistics Web Application</b></p>

  <p>
    <img src="https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js" alt="Next.js" />
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white" alt="Tailwind" />
    <img src="https://img.shields.io/badge/i18n-Multilingual-4CAF50?style=flat-square" alt="i18n" />
  </p>

  <p>
    <a href="#-getting-started">View Live Demo</a>
    ·
    <a href="https://github.com/arvinameri/tranzport-global-logistics/issues">Report Bug</a>
    ·
    <a href="https://linkedin.com/in/arvin-ameri">Connect on LinkedIn</a>
  </p>
</div>

---

## 📸 Platform Previews

|                           Homepage & Global Network                            |                          Enterprise Admin Dashboard                          |
| :------------------------------------------------------------------------------: | :------------------------------------------------------------------------------: |
|    <img src="public/github/hero-overview.png" alt="Homepage" width="400"/>     | <img src="public/github/admin-dashboard.png" alt="Admin Panel" width="400"/> |
|                         **Interactive Services Grid**                          |                       **Dynamic Localization (i18n)**                        |
| <img src="public/github/interactive-services.png" alt="Services" width="400"/> |   <img src="public/github/i18n-multilingual.png" alt="i18n" width="400"/>    |

<p align="center"><i>Screenshot showing the interactive map section</i></p>
<p align="center">
  <img src="public/github/global-map.png" alt="Global Map" width="850"/>
</p>

---

## 🧭 Overview

**Tranzport Global Logistics** is a scalable, SEO-optimized, and fully localized enterprise web platform built for modern freight forwarding companies.

Engineered with **Next.js (App Router)**, the platform serves as a unified digital ecosystem featuring comprehensive public-facing logistics services (Air, Ocean, Domestic, Customs), interactive UI components, and a secure, custom-built internal **Admin Dashboard** for dynamic content management.

### 🌍 Core Capabilities

- **Enterprise Multilingual (i18n):** Native support for dynamic language switching with automatic UI reflow (RTL/LTR).
- **Secure Admin CMS:** Custom-built dashboard with robust authentication, JWT sessions, and a rich-text integrated TipTap editor for managing News, Brands, and Case Studies.
- **High-Performance Architecture:** Server-Side Rendering (SSR) and Static Site Generation (SSG) via Next.js for flawless SEO and sub-second load times.
- **Interactive UI/UX:** Built with Tailwind CSS, featuring custom hooks (`useScroll`, `useMousePosition`) for advanced sticky scrolling, text reveals, and interactive grid layers.

---

## 🧱 Tech Stack

| Layer              | Technologies Used                                     |
| :----------------- | :------------------------------------------------------ |
| **Core Framework** | Next.js (App Router), React 18, TypeScript             |
| **Styling & UI**   | Tailwind CSS, PostCSS, Custom Animations (Framer/CSS)   |
| **State & Logic**  | React Hooks, Zustand (via `store/index.ts`)             |
| **Backend API**    | Next.js Route Handlers (`app/api/*`)                    |
| **Database & ORM** | Custom DB Client (`lib/db.ts`)                          |
| **Content Editor** | TipTap Rich Text Editor (Admin Panel)                   |

---

## ✨ Key Features

### Client-Facing Platform

- **Comprehensive Service Routes:** Dedicated interactive pages for Ocean Freight, Air Freight, Customs Brokerage, Warehousing, and Project Cargo.
- **Dynamic Case Studies & News:** Auto-generated dynamic routes (`[slug]/page.tsx`) fetched directly from the database.
- **Interactive Maps & Video Heroes:** Embedded ambient videos (`hero.mp4`, `air-freight-loop.mp4`) and global interactive map components.

### Secure Admin Dashboard

- **Content Management:** Fully modular CRUD operations for Articles, Brands, and Static Pages.
- **Media Upload Pipeline:** Dedicated API routes (`api/admin/upload/route.ts`) for handling high-resolution enterprise assets.
- **Role-Based Access:** Protected routes and API middleware ensuring state-of-the-art security against unauthorized access.

---

## 📁 Project Structure

```text
Tranzport-Global-Logistics/
├── app/
│   ├── [lang]/               # Localized public views (i18n routing)
│   │   ├── admin/            # Secure CMS (Dashboard, Articles, Brands)
│   │   ├── ocean-freight/    # Domain-specific logistics pages
│   │   └── ...
│   ├── api/                  # Backend REST APIs (Admin & Client)
│   └── i18n.ts               # Translation configuration layer
├── components/
│   ├── admin/                # CMS UI (Forms, TipTap Editor)
│   ├── home/                 # Interactive landing components
│   └── layout/               # Header, Footer, FullScreenMenu
├── hooks/                    # Custom React hooks (useScroll, etc.)
├── lib/                      # Database and utility functions
└── public/
    └── assets/               # Enterprise media (Videos, Hi-Res Images)
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js ≥ 18.x
- npm or yarn

### 1 — Clone & Install

```bash
git clone https://github.com/arvinameri/tranzport-global-logistics.git
cd tranzport-global-logistics/client
npm install
```

### 2 — Environment Variables

Create a `.env` file in the root of the `client` directory:

```env
DATABASE_URL="your_database_url_here"
NEXT_PUBLIC_API_URL="http://localhost:3000/api"
ADMIN_JWT_SECRET="your_secure_secret"
```

### 3 — Local Development

```bash
npm run dev
```

*Navigate to **http://localhost:3000** to view the application.*

---

## 📄 License

This project was developed as a proprietary logistics and web3-ready platform. The source code is shared strictly for portfolio and demonstration purposes.

---

<div align="center">
  <h3>Built by Arvin Ameri</h3>

  <p>📍 Zanjan, Iran &nbsp;|&nbsp; Full-Stack Developer & Software Engineer</p>

  <p>
    <a href="https://linkedin.com/in/arvin-ameri">
      <img src="https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" />
    </a>
    <a href="https://github.com/arvinameri/tranzport-global-logistics">
      <img src="https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" />
    </a>
  </p>
</div>
