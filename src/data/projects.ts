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
  /** Optional screenshot shown on the detail page. */
  image?: { src: string; alt: string };
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
    role: 'Full-stack Developer',
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
    image: {
      src: '/screenshots/lively.jpg',
      alt: 'Lively landing page: five minutes of strength, sent as a text',
    },
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
          'I worked across the stack: the Expo family app, the Fastify backend, and the WhatsApp and bot integration that ties the daily coaching together.',
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
    role: 'Full-stack Developer',
    status: 'In Development',
    featured: true,
    tech: ['Next.js 16', 'React 19', 'Tailwind CSS 4', 'Drizzle ORM', 'PostgreSQL', 'Recharts'],
    highlights: [
      'Job board with filtering, search, and bookmarking',
      'Market insights: skill trends, salary distributions, company types',
      'Analytics derived on the fly from scraped jobs and tags',
      'Admin panel with data import and scraper control',
    ],
    links: [],
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
    tagline: 'A tool for processing PDF documents: parsing, extracting, and transforming content.',
    summary:
      'pdf-Processor is a utility for working with PDF documents programmatically. It reads them, pulls out their text and structured content, and transforms them into more useful formats.',
    year: '2026',
    role: 'Author',
    status: 'Completed',
    tech: ['PDF Parsing', 'Automation'],
    highlights: [
      'Processes PDF documents programmatically',
      'Extracts and transforms document content',
      'Built as a reusable command-line and library tool',
    ],
    links: [{ label: 'Live site', href: 'https://pdf.darrenharyanto.com' }],
    documentation: [
      {
        heading: 'Overview',
        paragraphs: [
          'pdf-Processor is a focused tool for handling PDF documents. It takes a PDF as input and processes it, extracting text and structured content and transforming documents as needed.',
        ],
      },
      {
        heading: 'What it does',
        bullets: [
          'Reads and parses PDF files.',
          'Extracts text and structured content from documents.',
          'Transforms PDFs into more workable output formats.',
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
          'Smooth, eased anchor scrolling and staggered reveals.',
          'A data-driven projects system where everything comes from a single typed data file.',
        ],
      },
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
