// ---------------------------------------------------------------------------
// Who this site is about, in one place. Feeds the page metadata, the
// schema.org Person that search engines and AI agents read, and /llms.txt.
// ---------------------------------------------------------------------------

export const identity = {
  name: 'Darren Haryanto',
  fullName: 'Darren Oliver Putra Haryanto',
  alternateNames: ['Darren Oliver Putra Haryanto', 'Darren Oliver P. Haryanto', 'Darren Oliver Haryanto', 'OkToRen'],
  url: 'https://darrenharyanto.com',
  email: 'darrenharyanto@gmail.com',
  jobTitle: 'Laboratory Resource Management Officer',
  employer: { name: 'Bina Nusantara University', alternateName: 'BINUS', url: 'https://binus.ac.id' },
  education: { name: 'Universitas Bina Nusantara', alternateName: 'BINUS University', url: 'https://binus.ac.id' },
  location: { locality: 'Tangerang', region: 'Banten', country: 'ID' },
  summary:
    'Computer Science student at BINUS University and Laboratory Resource Management Officer at BINUS Alam Sutera, working in Rust, C and the modern web.',
  skills: ['Rust', 'Go', 'C', 'C#', 'Java', 'React', 'Next.js', 'T-SQL', 'PostgreSQL', 'Astro', 'TypeScript'],
  profiles: {
    github: 'https://github.com/OkToRen',
    linkedin: 'https://www.linkedin.com/in/darren-haryanto-164841264',
  },
};

/** schema.org Person, referenced by @id from every other node on the site. */
export const personId = `${identity.url}/#person`;

/** The portrait at a stable, named URL (public/darren-haryanto.jpg), so
 *  Google Images can index it under Darren's name. Kept in step with
 *  src/assets/darren-haryanto.jpg, which the page itself renders. */
export const portrait = {
  id: `${identity.url}/#portrait`,
  url: `${identity.url}/darren-haryanto.jpg`,
  width: 1200,
  height: 1500,
  caption: 'Darren Haryanto smiling, wearing glasses and a pink, green and blue batik shirt',
};

export function portraitSchema() {
  return {
    '@type': 'ImageObject',
    '@id': portrait.id,
    url: portrait.url,
    contentUrl: portrait.url,
    width: portrait.width,
    height: portrait.height,
    caption: portrait.caption,
    name: identity.name,
    representativeOfPage: true,
    creator: { '@id': personId },
    creditText: identity.name,
    copyrightNotice: `© ${identity.name}`,
  };
}

export function personSchema() {
  return {
    '@type': 'Person',
    '@id': personId,
    name: identity.name,
    alternateName: identity.alternateNames,
    givenName: 'Darren',
    additionalName: 'Oliver Putra',
    familyName: 'Haryanto',
    url: identity.url,
    image: portraitSchema(),
    email: `mailto:${identity.email}`,
    jobTitle: identity.jobTitle,
    description: identity.summary,
    worksFor: { '@type': 'CollegeOrUniversity', ...identity.employer },
    alumniOf: { '@type': 'CollegeOrUniversity', ...identity.education },
    address: {
      '@type': 'PostalAddress',
      addressLocality: identity.location.locality,
      addressRegion: identity.location.region,
      addressCountry: identity.location.country,
    },
    knowsAbout: identity.skills,
    sameAs: Object.values(identity.profiles),
  };
}
