/**
 * Frontend-safe copies of the option lists also declared in the Studio schemas.
 * Duplicated intentionally: importing from `src/sanity/schemaTypes` would pull
 * the whole `sanity` package into the main app bundle.
 */

export const PROJECT_CATEGORIES = [
  'AI',
  'Web Development',
  'Backend',
  'Mobile',
  'Games',
  'Data Science',
  'Hardware',
] as const;

export const BLOG_CATEGORIES = [
  'Tutorials',
  'Project Logs',
  'Architecture',
  'AI',
  'Career',
] as const;

export const GALLERY_CATEGORIES = [
  'Desserts',
  'Main Courses',
  'Appetizers',
  'Bread',
  'Drinks',
] as const;
