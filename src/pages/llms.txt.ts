// /llms.txt: a plain-text summary of who Darren is and what's on this site,
// for AI agents and assistants (https://llmstxt.org).
import type { APIRoute } from 'astro';
import { identity } from '../data/identity';
import { projects } from '../data/projects';
import { publications } from '../data/publications';

export const GET: APIRoute = () => {
  const { name, fullName, url, email, profiles } = identity;
  const body = `# ${name}

> ${fullName}: ${identity.summary}

${name} (full name ${fullName}, GitHub handle OkToRen) is based in Tangerang, Indonesia. ${name} is studying for a Bachelor of Computer Science at Universitas Bina Nusantara (BINUS University), 2023 to 2027, and has worked at BINUS Alam Sutera as ${identity.jobTitle} since January 2026, after working as a software lab assistant there from September 2024.

Skills: ${identity.skills.join(', ')}.

## Contact

- Website: ${url}
- Email: ${email}
- GitHub: ${profiles.github}
- LinkedIn: ${profiles.linkedin}
- CV (PDF): ${url}/cv.pdf

## Projects

${projects.map((p) => `- [${p.name}](${url}/projects/${p.slug}): ${p.tagline} Role: ${p.role}. ${p.year}, ${p.status}.`).join('\n')}

## Publications

${publications.map((p) => `- [${p.title}](${url}/publications#${p.slug}): ${p.authors.map((a) => a.name).join(' and ')}, ${p.affiliation}. ${p.venue.short}, ${p.venue.place}, ${p.venue.date} (${p.status.toLowerCase()}). ${p.findings.map((f) => f.detail).join(' ')}${p.links.filter((l) => l.href).map((l) => ` ${l.label}: ${l.href}`).join('')}`).join('\n')}

## Pages

- [Home](${url}/): about, experience, skills, education and selected projects
- [Projects](${url}/projects): every project with a full write-up
- [Publications](${url}/publications): research papers, with findings and data
- [Colophon](${url}/colophon): how this site is built
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
