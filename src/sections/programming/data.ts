/**
 * Static developer profile data (skills + experience). Kept local rather than in
 * Sanity since the spec's CMS collections don't include these; edit here.
 */

export type SkillGroup = { category: string; items: string[] };

export const skills: SkillGroup[] = [
  {
    category: 'Languages',
    items: ['TypeScript', 'JavaScript', 'Python', 'C#', 'SQL'],
  },
  {
    category: 'Frontend',
    items: ['React', 'Vite', 'Tailwind CSS', 'React Router'],
  },
  {
    category: 'Backend',
    items: ['Node.js', 'REST APIs', 'PostgreSQL'],
  },
  {
    category: 'Tools & Platforms',
    items: ['Git', 'Sanity', 'Docker', 'CI/CD'],
  },
];

export type ExperienceItem = {
  period: string;
  role: string;
  org: string;
  description: string;
};

export const experience: ExperienceItem[] = [
  {
    period: '2024 — Present',
    role: 'Software Engineer',
    org: 'Independent / Projects',
    description:
      'Building full-stack web applications with React, TypeScript, and modern tooling.',
  },
];

/** Resume file path; drop the PDF at `public/resume.pdf`. */
export const RESUME_URL = '/resume.pdf';
