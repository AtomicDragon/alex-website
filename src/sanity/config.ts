import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemaTypes';
import { projectId, dataset } from '../lib/sanity/client';

/**
 * Shared Sanity config used by both the embedded Studio (mounted at `/studio`)
 * and the Sanity CLI (re-exported from the root `sanity.config.ts`).
 */
export const sanityConfig = defineConfig({
  name: 'default',
  title: 'Alex Website',

  projectId,
  dataset,

  // Studio is mounted under this path in the React app router.
  basePath: '/studio',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
});

export default sanityConfig;
