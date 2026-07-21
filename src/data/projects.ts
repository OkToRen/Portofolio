// ---------------------------------------------------------------------------
// Project data + documentation
// ---------------------------------------------------------------------------
// This is the single source of truth for the /projects listing, the
// /projects/[slug] documentation pages, and the "Selected Projects" preview on
// the home page. Edit the fields below to update every place a project appears.
//
// NOTE: A few values are best-guesses (marked with `// TODO`) — repo URLs,
// dates, and statuses. Update them so nothing points at a dead link.
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
  /** External links (repo, org, live site, …). */
  links: ProjectLink[];
  /** Full write-up, rendered section by section. */
  documentation: DocSection[];
}

export const projects: Project[] = [
  {
    slug: 'lively',
    name: 'Lively',
    tagline: 'A cross-platform mobile app with its own backend, automation bot, and landing page.',
    summary:
      'Lively is a mobile application built with React Native and TypeScript, developed as a multi-service product under the LivelyHub organization. Beyond the app itself, the project spans a dedicated backend service, an automation bot, and a marketing landing page — each maintained as its own repository.',
    year: '2025', // TODO: confirm
    role: 'Mobile & Backend Developer',
    status: 'In Development', // TODO: confirm
    featured: true,
    tech: ['React Native', 'TypeScript', 'Node.js', 'REST API'],
    highlights: [
      'Cross-platform mobile client built with React Native + TypeScript',
      'Standalone backend service powering the app',
      'Automation bot for background / integration tasks',
      'Marketing landing page for the product',
    ],
    links: [
      // TODO: confirm the org / repo URLs below.
      { label: 'LivelyHub on GitHub', href: 'https://github.com/LivelyHub' },
    ],
    documentation: [
      {
        heading: 'Overview',
        paragraphs: [
          'Lively is organized as a multi-repository product under the LivelyHub organization. Rather than a single codebase, it is split into focused services that each own a clear responsibility: the mobile client, the backend, the bot, and the landing page.',
          'This separation keeps each part of the system independently deployable and easier to reason about, while sharing a common TypeScript foundation across the stack.',
        ],
      },
      {
        heading: 'Architecture',
        paragraphs: ['The product is composed of four cooperating pieces:'],
        bullets: [
          'Mobile app — the user-facing client, built with React Native and TypeScript for iOS and Android.',
          'Backend — the API and data layer the app talks to.',
          'Bot — an automation service handling background jobs and integrations.',
          'Landing page — the public-facing site introducing the product.',
        ],
      },
      {
        heading: 'My Role',
        paragraphs: [
          'I contributed across the stack — building out mobile features in React Native, working on the backend service the app depends on, and helping wire up the supporting bot and landing page.',
        ],
      },
    ],
  },
  {
    slug: 'pdf-processor',
    name: 'pdf-Processor',
    tagline: 'A tool for processing PDF documents — parsing, transforming, and extracting content.',
    summary:
      'pdf-Processor is a utility for working with PDF documents programmatically: reading them, pulling out their content, and transforming them into more useful formats.',
    year: '2025', // TODO: confirm
    role: 'Author',
    status: 'Completed', // TODO: confirm
    tech: ['PDF Parsing', 'Automation'], // TODO: confirm language / libraries
    highlights: [
      'Processes PDF documents programmatically',
      'Extracts and transforms document content',
      'Built as a reusable command-line / library tool',
    ],
    links: [
      // TODO: add the repo URL, e.g. https://github.com/OkToRen/pdf-processor
    ],
    documentation: [
      {
        heading: 'Overview',
        paragraphs: [
          'pdf-Processor is a focused tool for handling PDF documents. It takes PDF input and processes it — extracting text and structured content, and transforming documents as needed.',
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
      {
        heading: 'Notes',
        paragraphs: [
          'This write-up is a starting point — expand it with the specific formats supported, the libraries used, and example usage.',
        ],
      },
    ],
  },
  {
    slug: 'intern-repo',
    name: 'Intern Repo',
    tagline: 'A collection of work completed during my software internship.',
    summary:
      'The Intern Repo gathers the projects and tasks I worked on during my internship — a record of the features, fixes, and tooling I contributed while on the team.',
    year: '2025', // TODO: confirm
    role: 'Software Engineering Intern',
    status: 'Completed', // TODO: confirm
    tech: [], // TODO: add the stack you used during the internship
    highlights: [
      'Real-world engineering work from an internship',
      'Collaboration within a professional development team',
    ],
    links: [
      // TODO: add the repo URL if it can be shared publicly.
    ],
    documentation: [
      {
        heading: 'Overview',
        paragraphs: [
          'This repository collects the work I did during my internship. It reflects the day-to-day of contributing to a real codebase alongside a team — picking up tasks, shipping changes, and learning the practices of a working engineering environment.',
        ],
      },
      {
        heading: 'Notes',
        paragraphs: [
          'Fill in the specifics you can share: the company or team, the main technologies you worked with, and a few highlights of what you built or improved.',
        ],
      },
    ],
  },
  {
    slug: 'portfolio',
    name: 'Portfolio',
    tagline: 'This site — a personal portfolio built with Astro and Tailwind CSS.',
    summary:
      'A modern, interactive personal portfolio built with Astro. It features a parallax hero, animated hand-drawn doodles, a light/dark theme with a circular-reveal transition, and smooth scrolling throughout.',
    year: '2026',
    role: 'Designer & Developer',
    status: 'Live',
    featured: true,
    tech: ['Astro', 'Tailwind CSS', 'TypeScript', 'GSAP'],
    highlights: [
      'Static site built with Astro 5',
      'Light / dark theme using the View Transitions API',
      'Parallax hero with animated SVG doodles',
      'Data-driven projects section (this page!)',
    ],
    links: [
      // TODO: confirm the repo URL.
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
        heading: 'Tech Stack',
        bullets: [
          'Astro 5 — static-first framework for the pages and routing.',
          'Tailwind CSS v4 — utility-first styling with custom theme tokens.',
          'TypeScript — for the interactive client scripts.',
          'GSAP — powers the animated card navigation.',
        ],
      },
      {
        heading: 'Features',
        bullets: [
          'Light and dark themes with a circular-reveal transition powered by the View Transitions API.',
          'A parallax hero section with animated, hand-drawn SVG doodles.',
          'Smooth, eased anchor scrolling between sections.',
          'A data-driven projects system — everything on this page comes from a single typed data file.',
        ],
      },
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
