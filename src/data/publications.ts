// ---------------------------------------------------------------------------
// Papers. Feeds /publications, its schema.org ScholarlyArticle nodes,
// /llms.txt and the sitemap.
// ---------------------------------------------------------------------------

export interface Publication {
  slug: string;
  title: string;
  /** In paper order; `self` marks Darren. */
  authors: { name: string; self?: boolean }[];
  affiliation: string;
  venue: { short: string; place: string; date: string; iso: string };
  status: string;
  summary: string;
  /** The findings, each a headline number and what it means. */
  findings: { figure: string; label: string; detail: string }[];
  method: string[];
  keywords: string[];
  links: { label: string; href?: string; note?: string }[];
}

export const publications: Publication[] = [
  {
    slug: 'alumni-job-title-recommendation',
    title: 'Alumni-Derived Job-Title Recommendation for IT Fresh Graduates Using Sentence-BERT and XGBRanker',
    authors: [{ name: 'Darren Haryanto', self: true }, { name: 'Irma Irawati Ibrahim' }],
    affiliation: 'Bina Nusantara University',
    venue: { short: 'ICDEES 2026', place: 'BINUS University @Anggrek, Jakarta', date: 'October 2026', iso: '2026-10' },
    status: 'Presented',
    summary:
      'Fresh IT graduates rarely know which job titles people like them actually land. This paper ranks likely first job titles for a graduate from the recorded outcomes of earlier alumni, combining Sentence-BERT embeddings of survey text with structured profile information in an XGBRanker. It is tested chronologically on graduates the model never saw, and it shows how much an evaluation can be inflated by leakage.',
    findings: [
      {
        figure: '57.3%',
        label: 'first job in the top five',
        detail: 'For 527 held-out graduates, the recorded first job lands in the top five suggestions (NDCG@5 0.445).',
      },
      {
        figure: '0.450',
        label: 'structured data alone',
        detail: 'Profile information without the survey text scores NDCG@5 0.450, not significantly different from the full model.',
      },
      {
        figure: '0.119 → 0.854',
        label: 'what leakage does',
        detail:
          'Putting an earlier implementation’s defects back one at a time lifts the raw-title score sevenfold: the observed title copied into the profile, statistics fitted before the split, and the outcome inserted into the test candidates.',
      },
    ],
    method: [
      'Chronological split: trained on earlier graduation waves, tested on 527 later graduates.',
      '762 raw job titles grouped into 24 role families; 134 of 1,606 titles excluded.',
      'Eight reference methods, including popularity and random baselines.',
      'Bootstrap confidence intervals and Wilcoxon tests with Holm adjustment, plus ablations.',
      'Accuracy reported for each of 12 study programs, from 0.260 to 0.778.',
      'Privacy: masked records and salted pseudonyms; the released tables are de-identified.',
    ],
    keywords: ['Recommender systems', 'Sentence-BERT', 'Learning to rank', 'XGBoost', 'Career guidance', 'Data leakage'],
    links: [
      { label: 'Code and de-identified data', href: 'https://doi.org/10.5281/zenodo.23337795', note: 'Zenodo, DOI 10.5281/zenodo.23337795' },
      { label: 'Paper', note: 'Link follows once the proceedings are published' },
    ],
  },
];
