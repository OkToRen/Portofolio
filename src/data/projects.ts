// ---------------------------------------------------------------------------
// Project data + documentation
// ---------------------------------------------------------------------------
// Single source of truth for the /projects listing, the /projects/[slug]
// documentation pages, and the "Selected Projects" preview on the home page.
// ---------------------------------------------------------------------------

export interface ProjectLink {
  label: string;
  href: string;
}

export interface DocSection {
  heading: string;
  /** Rendered as paragraphs, in order. */
  paragraphs?: string[];
  /** Rendered as a bulleted list under the paragraphs. */
  bullets?: string[];
}

export interface Project {
  slug: string;
  name: string;
  /** One-line hook shown on cards and at the top of the detail page. */
  tagline: string;
  /** Longer intro paragraph on the detail page. */
  summary: string;
  year: string;
  role: string;
  status: 'Live' | 'In Development' | 'Completed' | 'Maintained' | 'Archived';
  /** Featured projects are highlighted first and shown on the home page. */
  featured?: boolean;
  /** Tech stack tags. */
  tech: string[];
  /** Quick-glance bullet points shown near the top of the detail page. */
  highlights: string[];
  /** External links (repo, live site, landing page). */
  links: ProjectLink[];
  /** Optional screenshot gallery shown on the detail page. */
  images?: { src: string; alt: string }[];
  /** Full write-up, rendered section by section. */
  documentation: DocSection[];
}

export const projects: Project[] = [
  {
    slug: 'lively',
    name: 'Lively',
    tagline: 'Five minutes of strength a day, sent to Indonesian elders over WhatsApp.',
    summary:
      'Lively coaches Indonesian elders through a short daily strength routine over WhatsApp, the app they already open every day. There is no install, no account, and no new interface to learn. Behind the friendly chat, every check-in is quietly measured so family can follow along from a companion mobile app. Built for Garuda Hacks 7.0 on the Health track.',
    year: '2026',
    role: 'Backend, Bot & Landing Developer',
    status: 'Live',
    featured: true,
    tech: ['Expo (React Native)', 'TypeScript', 'Fastify', 'PostgreSQL', 'WhatsApp Cloud API', 'OpenAI'],
    highlights: [
      'Coaches elders over WhatsApp, no app install required',
      'Four services in one monorepo: backend, bot, mobile, landing',
      'Official Meta WhatsApp Cloud API integration',
      'Companion family app with progress charts and alerts',
    ],
    links: [
      { label: 'Live landing page', href: 'https://lively.darrenharyanto.com' },
      { label: 'LivelyHub on GitHub', href: 'https://github.com/LivelyHub' },
    ],
    images: [
      { src: '/screenshots/lively/00-landing.jpg', alt: 'Lively landing page: five minutes of strength, sent as a text' },
      { src: '/screenshots/lively/01-setup-elder.png', alt: 'Family app: setting up the elder profile' },
      { src: '/screenshots/lively/02-setup-persona.png', alt: 'Family app: choosing the companion persona' },
      { src: '/screenshots/lively/03-setup-health.png', alt: 'Family app: setting health flags' },
      { src: '/screenshots/lively/04-setup-personalize.png', alt: 'Family app: personalizing the daily routine' },
      { src: '/screenshots/lively/05-home.png', alt: 'Family app: home screen' },
      { src: '/screenshots/lively/06-chat.png', alt: 'Family app: read-only chat monitor' },
      { src: '/screenshots/lively/07-progress.png', alt: 'Family app: progress charts' },
      { src: '/screenshots/lively/08-alerts.png', alt: 'Family app: alerts' },
      { src: '/screenshots/lively/09-whatsapp-chat-1.png', alt: 'WhatsApp conversation with the elder (1 of 3)' },
      { src: '/screenshots/lively/10-whatsapp-chat-2.png', alt: 'WhatsApp conversation with the elder (2 of 3)' },
      { src: '/screenshots/lively/11-whatsapp-chat-3.png', alt: 'WhatsApp conversation with the elder (3 of 3)' },
    ],
    documentation: [
      {
        heading: 'Overview',
        paragraphs: [
          'Lively is an elder-care companion that runs entirely inside WhatsApp. Each day it messages the elder in their own language: a warm check-in, a nudge to do a 30-second chair-stand test, and a gentle reminder about medication. The elder never installs an app or learns a new interface, they simply reply in the chat they already use.',
          'Every interaction is measured in the background. The elder never sees scores or streaks; that layer belongs to the adult child, who opens the companion mobile app to see exercise streaks, medication adherence, a chair-stand fitness trend, and an alert when a day is missed or the elder mentions pain or dizziness. Family stays in the loop without hovering.',
          'Lively was built for Garuda Hacks 7.0 on the Health track.',
        ],
      },
      {
        heading: 'Architecture',
        paragraphs: ['Four services live in one monorepo, each with a clear responsibility:'],
        bullets: [
          'backend (Fastify): owns the WhatsApp connection, the Neon Postgres database, family accounts, scoring, and alerts.',
          'bot: a stateless reply engine that loads each elder\'s persona and health flags, calls OpenAI, and fires tool calls back to the backend to log exercise, record chair-stand reps, or raise an alert.',
          'mobile (Expo): the family app, with a setup wizard, a read-only chat monitor, and weekly and monthly progress reports.',
          'landing: a static pitch page.',
        ],
      },
      {
        heading: 'WhatsApp integration',
        paragraphs: [
          'The WhatsApp side uses the official Meta WhatsApp Cloud API, configured through the Meta for Developers console rather than an unofficial library.',
        ],
        bullets: [
          'Outgoing messages go through Meta\'s Graph API using a permanent access token and a phone-number ID.',
          'Incoming messages arrive over a verified Meta webhook, with each request HMAC-checked against the app secret so only genuine Meta traffic is trusted.',
          'Messages sent outside the 24-hour service window use pre-approved templates, and the webhook always acknowledges quickly to stay within Meta\'s rules.',
        ],
      },
      {
        heading: 'My role',
        paragraphs: [
          'I built the Fastify backend, the bot, and the WhatsApp integration through Meta for Developers, and shaped the flow of the daily coaching conversation. I also developed the Lively landing page.',
        ],
      },
    ],
  },
  {
    slug: 'hirescope',
    name: 'HireScope',
    tagline: 'An IT career-intelligence dashboard for the Indonesian job market.',
    summary:
      'HireScope (branded HireScope IT) is a Next.js web app that turns scraped IT job listings into a career-intelligence dashboard for Indonesia. It pairs a job board with data-driven analytics on skills, salaries, company types, and trending roles. The interface deliberately mirrors a BINUS university portal, so it reads like a campus-oriented job platform.',
    year: '2026',
    role: 'Frontend, Database & Deployment',
    status: 'In Development',
    featured: true,
    tech: ['Next.js 16', 'React 19', 'Tailwind CSS 4', 'Drizzle ORM', 'PostgreSQL', 'Recharts'],
    highlights: [
      'Job board with filtering, search, and bookmarking',
      'Market insights: skill trends, salary distributions, company types',
      'Analytics derived on the fly from scraped jobs and tags',
      'Admin panel with data import and scraper control',
    ],
    links: [{ label: 'Live site', href: 'https://intern.darrenharyanto.com' }],
    images: [
      { src: '/screenshots/hirescope/01-dashboard.jpg', alt: 'HireScope dashboard with a BINUS-style profile card and market hype predictions' },
      { src: '/screenshots/hirescope/02-job-board.jpg', alt: 'HireScope job board with filters and a requested-skills chart' },
      { src: '/screenshots/hirescope/03-market-insights.jpg', alt: 'HireScope market insights: hype trend, company types, salary distribution' },
    ],
    documentation: [
      {
        heading: 'Overview',
        paragraphs: [
          'HireScope is an IT career-intelligence dashboard for Indonesia. It collects IT job listings through a companion scraper service, stores them in a normalized database, and presents both a job board and a set of analytics on top of that data.',
          'The styling mirrors a BINUS university portal, with a profile card and campus-style language ("Running Period", "Even Term"), so it feels like a job platform built for students.',
        ],
      },
      {
        heading: 'Tech stack',
        bullets: [
          'Next.js 16 (App Router) with React 19 and Tailwind CSS 4.',
          'Drizzle ORM over a Neon serverless PostgreSQL database.',
          'Recharts for charts, lucide-react for icons, and driver.js for the guided tour.',
          'JWT auth (jose) in an auth-token cookie, bcryptjs for passwords, and optional Microsoft or Azure MSAL login.',
          'A separate scraper service the app talks to over HTTP.',
        ],
      },
      {
        heading: 'Core features',
        paragraphs: ['For members:'],
        bullets: [
          'Dashboard with a BINUS-style profile card and a market-updates widget.',
          'Job board with a filter sidebar, search, and bookmarking.',
          'Market insights: language trend lines, a company-type donut, salary distribution by role, and tech-stack demand.',
          'Saved jobs and an interactive onboarding tour.',
        ],
      },
      {
        heading: 'Admin tools',
        bullets: [
          'Admin panel to import data into tables, reset jobs, and view analytics.',
          'Scraper control to trigger and monitor the external scraper service.',
        ],
      },
      {
        heading: 'How the data works',
        paragraphs: [
          'Raw data lives in normalized tables. The analytics layer (lib/analytics.ts) derives most insights on the fly from jobs and their tags:',
        ],
        bullets: [
          'Skill demand from tag frequency.',
          'Role inference from job titles using regex rules (AI/ML, Backend, DevOps, and others).',
          'Trend predictions based on how far a role\'s posting count sits from the average role count.',
          'Salary ranges parsed from free-text salary strings, handling Indonesian units like "juta" and "jt", then aggregated per role.',
          'A backup table that archives a snapshot before every import, kept as a historical record.',
        ],
      },
    ],
  },
  {
    slug: 'pdf-processor',
    name: 'pdf-Processor',
    tagline: 'Brutalist browser-based tools for precise document surgery on PDFs.',
    summary:
      'PDF Modification Studio is a browser-based toolkit for editing PDFs. You drop files, run a transformation, and download the result instantly through a proxy-safe workflow designed for containerized deployment. Operations are grouped into categories, from everyday merging and page extraction to security, office conversion, AI, signing, and background removal.',
    year: '2026',
    role: 'Solo Developer',
    status: 'Live',
    tech: ['PDF Processing', 'Docker', 'Web App'],
    highlights: [
      'Drop files, transform, and download instantly in the browser',
      'Dozens of operations across categories: merge, extract, security, office, AI, signing',
      'Proxy-safe workflow built for containerized deployment',
      'Live backend status indicator',
    ],
    links: [{ label: 'Live site', href: 'https://pdf.darrenharyanto.com' }],
    images: [
      { src: '/screenshots/pdf-processor/01-studio.jpg', alt: 'PDF Modification Studio home with operation categories' },
      { src: '/screenshots/pdf-processor/02-operations.jpg', alt: 'Merge and extract operations with live previews' },
    ],
    documentation: [
      {
        heading: 'Overview',
        paragraphs: [
          'PDF Modification Studio is a browser-based tool for precise document work. You drop a file, pick an operation, run it, and download the result. Everything flows through a proxy-safe workflow built to run behind a reverse proxy in a containerized deployment, with a live backend status indicator on the page.',
        ],
      },
      {
        heading: 'Operations',
        paragraphs: ['The studio groups its tools into categories:'],
        bullets: [
          'Core: merge multiple PDFs into one ordered document, or extract a page range like 1,3-5,8.',
          'Basic and Advanced editing for everyday and power-user changes.',
          'Security: protect and restrict documents.',
          'Prepare and Office: document preparation and conversions.',
          'AI and Data: content-aware operations.',
          'Sign, Remove Background, and more.',
        ],
      },
      {
        heading: 'Deployment',
        paragraphs: [
          'The app runs as a containerized service. Its workflow is proxy-safe, so file uploads and downloads work correctly behind a reverse proxy, and the page shows whether the backend is online.',
        ],
      },
    ],
  },
  {
    slug: 'portfolio',
    name: 'Portfolio',
    tagline: 'This site, a personal portfolio built with Astro and Tailwind CSS.',
    summary:
      'A modern, interactive personal portfolio built with Astro. It features a refined editorial type system (Fraunces and Inter Tight), a parallax hero, a light and dark theme with a circular-reveal transition, and smooth scrolling throughout.',
    year: '2026',
    role: 'Designer & Developer',
    status: 'Live',
    tech: ['Astro', 'Tailwind CSS', 'TypeScript', 'GSAP'],
    highlights: [
      'Static site built with Astro 5',
      'Light and dark theme using the View Transitions API',
      'Refined editorial type system with a subtle grain texture',
      'Data-driven projects section (this page)',
    ],
    links: [
      { label: 'Live site', href: 'https://darrenharyanto.com' },
      { label: 'GitHub', href: 'https://github.com/OkToRen/portofolio' },
    ],
    images: [
      { src: '/screenshots/portfolio/01-hero-dark.jpg', alt: 'Home hero in dark mode: the name set in Fraunces over a soft gradient field' },
      { src: '/screenshots/portfolio/02-hero-light.jpg', alt: 'Home hero in light mode' },
      { src: '/screenshots/portfolio/03-home-experience.jpg', alt: 'About paragraph and the Experience timeline' },
      { src: '/screenshots/portfolio/04-home-stack-projects.jpg', alt: 'Technical Stack grid and Selected Projects cards with role labels' },
      { src: '/screenshots/portfolio/05-home-education.jpg', alt: 'Education and Organization panels above the footer' },
      { src: '/screenshots/portfolio/06-projects-dark.jpg', alt: 'Projects listing page in dark mode: four project cards' },
      { src: '/screenshots/portfolio/07-projects-light.jpg', alt: 'Projects listing page in light mode' },
      { src: '/screenshots/portfolio/08-project-detail.jpg', alt: 'A project detail page: role, tech stack, and highlights' },
      { src: '/screenshots/portfolio/09-project-docs.jpg', alt: 'Project documentation sections with the screenshot filmstrip' },
    ],
    documentation: [
      {
        heading: 'Overview',
        paragraphs: [
          'This portfolio is the site you are looking at right now. It is a fast, static website built with Astro, styled with Tailwind CSS v4, and enhanced with a handful of lightweight animations.',
        ],
      },
      {
        heading: 'Tech stack',
        bullets: [
          'Astro 5: static-first framework for the pages and routing.',
          'Tailwind CSS v4: utility-first styling with custom OKLCH theme tokens.',
          'TypeScript: for the interactive client scripts.',
          'GSAP: powers the animated card navigation.',
        ],
      },
      {
        heading: 'Features',
        bullets: [
          'Light and dark themes with a circular-reveal transition powered by the View Transitions API.',
          'A refined editorial type system pairing Fraunces with Inter Tight, over a subtle film-grain texture.',
          'Restrained pointer effects — a follower ring, a content-only glow, and magnetic controls — all disabled on touch and under reduced-motion.',
          'Smooth, eased anchor scrolling and staggered reveals.',
          'A data-driven projects system where everything comes from a single typed data file.',
        ],
      },
      {
        heading: 'Pages',
        paragraphs: ['The site is three page types, all sharing one layout, type system, and theme:'],
        bullets: [
          'Home: a full-screen parallax hero (name, role, and Email / LinkedIn / GitHub links) that fades on scroll into the content — About, an Experience timeline, a Technical Stack grid, Selected Projects, and Education & Organization panels.',
          'Projects listing: a two-column grid of project cards, each showing its status, my role, tagline, and stack.',
          'Project detail: a documentation page per project — overview, role, tech stack, highlights, a screenshot filmstrip with a lightbox, and a section-by-section write-up.',
        ],
      },
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
