import type { SanityImageSource } from '@sanity/image-url';
import type { PortableTextBlock } from '@portabletext/types';

/** Portable Text body, possibly containing inline image blocks. */
export type PortableText = PortableTextBlock[];

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

export type TimelineEvent = {
  date?: string;
  title: string;
  description?: string;
};

/** Full programming project (detail page). */
export type ProgrammingProject = ProgrammingProjectCard & {
  gallery?: SanityImageSource[];
  content?: PortableText;
  architecture?: string;
  challenges?: string;
  githubUrl?: string;
  liveUrl?: string;
  timeline?: TimelineEvent[];
};

/** Blog post card-level fields. */
export type BlogPostCard = {
  _id: string;
  title: string;
  slug: string | null;
  category?: string;
  tags?: string[];
  publishedAt?: string;
  coverImage?: SanityImageSource;
};

/** Full blog post (detail page). */
export type BlogPost = BlogPostCard & {
  content?: PortableText;
};
