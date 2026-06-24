import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './src/sanity/schemaTypes';

/**
 * Root config consumed by the Sanity CLI (schema/dataset/cors/deploy).
 * The app mounts the embedded Studio from `src/sanity/config.ts` instead, which
 * shares the same schemas but reads project IDs from Vite env vars.
 */
export default defineConfig({
  name: 'default',
  title: 'Alex Website',

  projectId: '62r37bvw',
  dataset: 'production',
  basePath: '/studio',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
});
