type SeoProps = {
  title?: string;
  description?: string;
  /** Absolute image URL for Open Graph (e.g. a Sanity CDN URL). */
  image?: string;
  canonical?: string;
  keywords?: string[];
};

const SITE_NAME = 'Alex';
const DEFAULT_TITLE = 'Alex — Developer · Chef · Fun';
const DEFAULT_DESCRIPTION =
  'One person, three worlds: a developer portfolio, a culinary showcase, and a creative playground.';

/**
 * Renders document head tags. Relies on React 19 hoisting <title>/<meta>/<link>
 * into <head>, so no helmet library is needed. Values come from Sanity content
 * with sensible fallbacks.
 */
export default function Seo({
  title,
  description,
  image,
  canonical,
  keywords,
}: SeoProps) {
  const fullTitle = title ? `${title} · ${SITE_NAME}` : DEFAULT_TITLE;
  const desc = description || DEFAULT_DESCRIPTION;
  const url =
    canonical ??
    (typeof window !== 'undefined'
      ? window.location.origin + window.location.pathname
      : undefined);

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      {keywords && keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(', ')} />
      )}
      {url && <link rel="canonical" href={url} />}

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:type" content="website" />
      {url && <meta property="og:url" content={url} />}
      {image && <meta property="og:image" content={image} />}

      <meta
        name="twitter:card"
        content={image ? 'summary_large_image' : 'summary'}
      />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      {image && <meta name="twitter:image" content={image} />}
    </>
  );
}
