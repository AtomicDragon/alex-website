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

/* ----------------------------- Chef ----------------------------- */

/** Recipe card-level fields. */
export type RecipeCard = {
  _id: string;
  title: string;
  slug: string | null;
  heroImage?: SanityImageSource;
  difficulty?: string;
  prepTime?: number;
  cookTime?: number;
  servings?: number;
};

/** Full recipe (detail page). */
export type Recipe = RecipeCard & {
  ingredients?: string[];
  instructions?: PortableText;
  notes?: string;
  gallery?: SanityImageSource[];
};

/** Food blog card-level fields. */
export type FoodBlogCard = {
  _id: string;
  title: string;
  slug: string | null;
  publishedAt?: string;
  coverImage?: SanityImageSource;
};

/** Full food blog post (detail page). */
export type FoodBlog = FoodBlogCard & {
  content?: PortableText;
  images?: SanityImageSource[];
};

/** Food gallery item. */
export type GalleryItem = {
  _id: string;
  title: string;
  image: SanityImageSource;
  category?: string;
  description?: string;
};

/* ----------------------------- Fun ----------------------------- */

/** Game card-level fields. */
export type GameCard = {
  _id: string;
  title: string;
  slug: string | null;
  description?: string;
  thumbnail?: SanityImageSource;
};

/** Full game (detail page with embed). */
export type Game = GameCard & {
  embedUrl?: string;
};

/** Fun project card-level fields. */
export type FunProjectCard = {
  _id: string;
  title: string;
  slug: string | null;
  description?: string;
  thumbnail?: SanityImageSource;
};

/** Full fun project (detail page). */
export type FunProject = FunProjectCard & {
  content?: PortableText;
  demoUrl?: string;
  screenshots?: SanityImageSource[];
};

/* ------------------------- Search & tags ------------------------- */

/** A cross-type content result used by search and tag pages. */
export type ContentHit = {
  _id: string;
  _type: string;
  title: string;
  slug: string | null;
  description?: string;
};
