import type { SanityImageSource } from '@sanity/image-url';

/** Programming project as returned by the list query (card-level fields). */
export type ProgrammingProjectCard = {
  _id: string;
  title: string;
  slug: string | null;
  tagline?: string;
  description?: string;
  category?: string;
  techStack?: string[];
  featured?: boolean;
  date?: string;
  coverImage?: SanityImageSource;
};
