import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSanityQuery } from '../hooks/useSanityQuery';
import { contentByTagQuery } from '../lib/sanity/queries';
import type { ContentHit } from '../lib/sanity/types';
import { contentLink, contentLabel } from '../lib/sanity/contentLink';

export default function TagPage() {
  const { tag = '' } = useParams();
  const { data, loading } = useSanityQuery<ContentHit[]>(contentByTagQuery, {
    tag,
  });

  const grouped = useMemo(() => {
    const map = new Map<string, ContentHit[]>();
    for (const hit of data ?? []) {
      const list = map.get(hit._type) ?? [];
      list.push(hit);
      map.set(hit._type, list);
    }
    return [...map.entries()];
  }, [data]);

  return (
    <section className="mx-auto max-w-3xl px-6 py-20">
      <Link to="/tags" className="text-sm text-accent hover:underline">
        ← All tags
      </Link>
      <h1 className="mt-4 text-4xl font-bold text-primary">#{tag}</h1>

      {loading && <p className="mt-8 text-muted">Loading…</p>}

      {!loading && (data ?? []).length === 0 && (
        <p className="mt-8 text-muted">Nothing tagged “{tag}” yet.</p>
      )}

      <div className="mt-8 space-y-8">
        {grouped.map(([type, hits]) => (
          <div key={type}>
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-accent">
              {contentLabel(type)}
            </h2>
            <ul className="space-y-2">
              {hits.map((hit) => (
                <li key={hit._id}>
                  <Link
                    to={contentLink(hit._type, hit.slug)}
                    className="block rounded-lg border border-border bg-surface p-4 transition-colors hover:border-accent"
                  >
                    <span className="font-medium text-primary">{hit.title}</span>
                    {hit.description && (
                      <span className="mt-0.5 block truncate text-sm text-muted">
                        {hit.description}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
