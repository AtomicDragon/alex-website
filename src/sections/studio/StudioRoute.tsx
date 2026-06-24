import { Studio } from 'sanity';
import { sanityConfig } from '../../sanity/config';

/**
 * Embedded Sanity Studio. Rendered at `/studio/*` outside the themed app shell
 * so it takes over the full viewport. Lazy-loaded to keep the Studio bundle out
 * of the main app chunk.
 */
export default function StudioRoute() {
  return <Studio config={sanityConfig} />;
}
