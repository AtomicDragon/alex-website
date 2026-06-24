import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url';
import { sanityClient } from './client';

const builder = imageUrlBuilder(sanityClient);

/** Build a Sanity CDN image URL, e.g. `urlFor(img).width(800).url()`. */
export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}
