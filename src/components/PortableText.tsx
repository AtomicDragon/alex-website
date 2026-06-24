import {
  PortableText as BasePortableText,
  type PortableTextComponents,
} from '@portabletext/react';
import type { PortableText as PortableTextValue } from '../lib/sanity/types';
import { urlFor } from '../lib/sanity/image';

const components: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;
      return (
        <img
          src={urlFor(value).width(1200).fit('max').url()}
          alt={value.alt ?? ''}
          loading="lazy"
          className="my-6 w-full rounded-lg border border-border"
        />
      );
    },
  },
  block: {
    h2: ({ children }) => (
      <h2 className="mt-10 mb-3 text-2xl font-bold text-primary">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 mb-2 text-xl font-semibold text-primary">{children}</h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-6 border-l-4 border-accent pl-4 italic text-muted">
        {children}
      </blockquote>
    ),
    normal: ({ children }) => (
      <p className="my-4 leading-relaxed text-text">{children}</p>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="my-4 list-disc space-y-1 pl-6 text-text">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="my-4 list-decimal space-y-1 pl-6 text-text">{children}</ol>
    ),
  },
  marks: {
    link: ({ value, children }) => {
      const href = value?.href ?? '#';
      const external = /^https?:\/\//.test(href);
      return (
        <a
          href={href}
          className="text-accent underline underline-offset-2 hover:opacity-80"
          {...(external
            ? { target: '_blank', rel: 'noopener noreferrer' }
            : {})}
        >
          {children}
        </a>
      );
    },
    code: ({ children }) => (
      <code className="rounded bg-surface px-1.5 py-0.5 text-sm text-accent">
        {children}
      </code>
    ),
  },
};

/** Renders Sanity Portable Text with theme-aware styling. */
export default function PortableText({ value }: { value?: PortableTextValue }) {
  if (!value || value.length === 0) return null;
  return <BasePortableText value={value} components={components} />;
}
