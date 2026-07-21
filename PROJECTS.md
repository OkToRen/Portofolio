# Projects

Documentation for the projects featured in Darren Haryanto's portfolio.
All projects are from 2026.

| Project | Status | Year | Live |
| :------ | :----- | :--- | :--- |
| [Lively](#lively) | Live | 2026 | [lively.darrenharyanto.com](https://lively.darrenharyanto.com) |
| [HireScope](#hirescope) | In Development | 2026 | [intern.darrenharyanto.com](https://intern.darrenharyanto.com) |
| [pdf-Processor](#pdf-processor) | Live | 2026 | [pdf.darrenharyanto.com](https://pdf.darrenharyanto.com) |
| [Portfolio](#portfolio) | Live | 2026 | [darrenharyanto.com](https://darrenharyanto.com) |

---

## Lively

**Five minutes of strength a day, sent to Indonesian elders over WhatsApp.**

- **Role:** Full-stack Developer
- **Status:** Live
- **Year:** 2026
- **Tech:** Expo (React Native), TypeScript, Fastify, PostgreSQL, WhatsApp Cloud API, OpenAI
- **Live landing page:** https://lively.darrenharyanto.com
- **GitHub:** https://github.com/LivelyHub

Lively coaches Indonesian elders through a short daily strength routine over
WhatsApp, the app they already open every day. There is no install, no account,
and no new interface to learn. Behind the friendly chat, every check-in is
quietly measured so family can follow along from a companion mobile app. Built
for Garuda Hacks 7.0 on the Health track.

### Overview

Lively is an elder-care companion that runs entirely inside WhatsApp. Each day it
messages the elder in their own language: a warm check-in, a nudge to do a
30-second chair-stand test, and a gentle reminder about medication. The elder
never installs an app or learns a new interface, they simply reply in the chat
they already use.

Every interaction is measured in the background. The elder never sees scores or
streaks; that layer belongs to the adult child, who opens the companion mobile
app to see exercise streaks, medication adherence, a chair-stand fitness trend,
and an alert when a day is missed or the elder mentions pain or dizziness. Family
stays in the loop without hovering.

### Architecture

Four services live in one monorepo, each with a clear responsibility:

- **backend (Fastify):** owns the WhatsApp connection, the Neon Postgres
  database, family accounts, scoring, and alerts.
- **bot:** a stateless reply engine that loads each elder's persona and health
  flags, calls OpenAI, and fires tool calls back to the backend to log exercise,
  record chair-stand reps, or raise an alert.
- **mobile (Expo):** the family app, with a setup wizard, a read-only chat
  monitor, and weekly and monthly progress reports.
- **landing:** a static pitch page.

### WhatsApp integration

The WhatsApp side uses the official Meta WhatsApp Cloud API, configured through
the Meta for Developers console rather than an unofficial library.

- Outgoing messages go through Meta's Graph API using a permanent access token
  and a phone-number ID.
- Incoming messages arrive over a verified Meta webhook, with each request
  HMAC-checked against the app secret so only genuine Meta traffic is trusted.
- Messages sent outside the 24-hour service window use pre-approved templates,
  and the webhook always acknowledges quickly to stay within Meta's rules.

### My role

I worked across the stack: the Expo family app, the Fastify backend, and the
WhatsApp and bot integration that ties the daily coaching together.

---

## HireScope

**An IT career-intelligence dashboard for the Indonesian job market.**

- **Role:** Full-stack Developer
- **Status:** In Development
- **Year:** 2026
- **Tech:** Next.js 16, React 19, Tailwind CSS 4, Drizzle ORM, PostgreSQL, Recharts
- **Live site:** https://intern.darrenharyanto.com

HireScope (branded HireScope IT) is a Next.js web app that turns scraped IT job
listings into a career-intelligence dashboard for Indonesia. It pairs a job board
with data-driven analytics on skills, salaries, company types, and trending
roles. The interface deliberately mirrors a BINUS university portal, so it reads
like a campus-oriented job platform.

### Overview

HireScope collects IT job listings through a companion scraper service, stores
them in a normalized database, and presents both a job board and a set of
analytics on top of that data. The styling mirrors a BINUS university portal,
with a profile card and campus-style language ("Running Period", "Even Term"),
so it feels like a job platform built for students.

### Tech stack

- Next.js 16 (App Router) with React 19 and Tailwind CSS 4.
- Drizzle ORM over a Neon serverless PostgreSQL database.
- Recharts for charts, lucide-react for icons, and driver.js for the guided tour.
- JWT auth (jose) in an auth-token cookie, bcryptjs for passwords, and optional
  Microsoft or Azure MSAL login.
- A separate scraper service the app talks to over HTTP.

### Core features

For members:

- Dashboard with a BINUS-style profile card and a market-updates widget.
- Job board with a filter sidebar, search, and bookmarking.
- Market insights: language trend lines, a company-type donut, salary
  distribution by role, and tech-stack demand.
- Saved jobs and an interactive onboarding tour.

### Admin tools

- Admin panel to import data into tables, reset jobs, and view analytics.
- Scraper control to trigger and monitor the external scraper service.

### How the data works

Raw data lives in normalized tables. The analytics layer (`lib/analytics.ts`)
derives most insights on the fly from jobs and their tags:

- Skill demand from tag frequency.
- Role inference from job titles using regex rules (AI/ML, Backend, DevOps, and
  others).
- Trend predictions based on how far a role's posting count sits from the average
  role count.
- Salary ranges parsed from free-text salary strings, handling Indonesian units
  like "juta" and "jt", then aggregated per role.
- A backup table that archives a snapshot before every import, kept as a
  historical record.

---

## pdf-Processor

**Brutalist browser-based tools for precise document surgery on PDFs.**

- **Role:** Author
- **Status:** Live
- **Year:** 2026
- **Tech:** PDF Processing, Docker, Web App
- **Live site:** https://pdf.darrenharyanto.com

PDF Modification Studio is a browser-based toolkit for editing PDFs. You drop
files, run a transformation, and download the result instantly through a
proxy-safe workflow designed for containerized deployment. Operations are grouped
into categories, from everyday merging and page extraction to security, office
conversion, AI, signing, and background removal.

### Overview

PDF Modification Studio is a browser-based tool for precise document work. You
drop a file, pick an operation, run it, and download the result. Everything flows
through a proxy-safe workflow built to run behind a reverse proxy in a
containerized deployment, with a live backend status indicator on the page.

### Operations

The studio groups its tools into categories:

- **Core:** merge multiple PDFs into one ordered document, or extract a page
  range like 1,3-5,8.
- **Basic and Advanced:** editing for everyday and power-user changes.
- **Security:** protect and restrict documents.
- **Prepare and Office:** document preparation and conversions.
- **AI and Data:** content-aware operations.
- **Sign, Remove Background, and more.**

### Deployment

The app runs as a containerized service. Its workflow is proxy-safe, so file
uploads and downloads work correctly behind a reverse proxy, and the page shows
whether the backend is online.

---

## Portfolio

**This site, a personal portfolio built with Astro and Tailwind CSS.**

- **Role:** Designer & Developer
- **Status:** Live
- **Year:** 2026
- **Tech:** Astro, Tailwind CSS, TypeScript, GSAP
- **Live site:** https://darrenharyanto.com
- **GitHub:** https://github.com/OkToRen/portofolio

A modern, interactive personal portfolio built with Astro. It features a refined
editorial type system (Fraunces and Inter Tight), a parallax hero, a light and
dark theme with a circular-reveal transition, and smooth scrolling throughout.

### Overview

This portfolio is a fast, static website built with Astro, styled with Tailwind
CSS v4, and enhanced with a handful of lightweight animations.

### Tech stack

- **Astro 5:** static-first framework for the pages and routing.
- **Tailwind CSS v4:** utility-first styling with custom OKLCH theme tokens.
- **TypeScript:** for the interactive client scripts.
- **GSAP:** powers the animated card navigation.

### Features

- Light and dark themes with a circular-reveal transition powered by the View
  Transitions API.
- A refined editorial type system pairing Fraunces with Inter Tight, over a
  subtle film-grain texture.
- Smooth, eased anchor scrolling and staggered reveals.
- A data-driven projects system where everything comes from a single typed data
  file.

### Deployment

The site is served as a static build by nginx inside a Docker container on a
self-hosted server (port 5173), fronted by Cloudflare. Pushes to `main` are built
and deployed through a Gitea Actions workflow.
