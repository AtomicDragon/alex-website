import { createClient } from '@sanity/client';

/**
 * Public project identifiers. These ship to the browser and are not secrets;
 * env vars simply make non-production datasets easy to swap in.
 */
export const projectId =
  import.meta.env.VITE_SANITY_PROJECT_ID ?? '62r37bvw';
export const dataset = import.meta.env.VITE_SANITY_DATASET ?? 'production';
export const apiVersion =
  import.meta.env.VITE_SANITY_API_VERSION ?? '2024-10-01';

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // cached, fast reads for published public content
});
