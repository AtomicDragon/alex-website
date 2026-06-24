import { createClient, type SanityClient } from '@sanity/client';
import { projectId, apiVersion } from './client';

/** Private dataset holding admin-only business data (CRM, tasks, etc.). */
export const PRIVATE_DATASET =
  import.meta.env.VITE_SANITY_PRIVATE_DATASET ?? 'private';

/**
 * Build a Sanity client authenticated with a personal token, scoped to the
 * private dataset. The token is supplied at runtime (never bundled) and is only
 * ever held in the admin's own browser.
 */
export function createAdminClient(token: string): SanityClient {
  return createClient({
    projectId,
    dataset: PRIVATE_DATASET,
    apiVersion,
    token,
    useCdn: false,
    withCredentials: false,
  });
}

/** Validate a token by issuing a harmless authenticated query. */
export async function validateToken(token: string): Promise<boolean> {
  try {
    await createAdminClient(token).fetch('count(*[_id == "___ping___"])');
    return true;
  } catch {
    return false;
  }
}
