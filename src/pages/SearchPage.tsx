import { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useSanityQuery } from '../hooks/useSanityQuery';
import { searchQuery } from '../lib/sanity/queries';
import type { ContentHit } from '../lib/sanity/types';
import { contentLink, contentLabel } from '../lib/sanity/contentLink';

export default function SearchPage() {
  const [params, setParams] = useSearchParams();
  const q = params.get('q') ?? '';
  const term = q.trim();
  const wildcard = term ? `${term}*` : '*';

  const { data, loading } = useSanityQuery<ContentHit[]>(searchQuery, {
    q: wildcard,
  });

  const results = useMemo(() => (term ? (data ?? []) : []), [term, data]);

  const grouped = useMemo(() => {
    const map = new Map<string, ContentHit[]>();
    for (const hit of results) {
      const list = map.get(hit._type) ?? [];
      list.push(hit);
      map.set(hit._type, list);
    }
    return [...map.entries()];
  }, [results]);

  return (
    <section className="mx-auto max-w-3xl px-6 py-20">
      <h1 className="text-4xl font-bold text-primary">Search</h1>
      <p className="mt-2 text-muted">
        Across projects, recipes, articles, games, and more.
      </p>

      <input
        type="search"
        autoFocus
        value={q}
        onChange={(e) =>
          setParams(e.target.value ? { q: e.target.value } : {}, {
            replace: true,
          })
        }
        placeholder="Search everything…"
        className="mt-6 w-full rounded-md border border-border bg-surface px-4 py-3 text-text outline-none focus:border-accent"
      />

      {!term && (
        <p className="mt-8 text-muted">Type something to start searching.</p>
      )}

      {term && loading && <p className="mt-8 text-muted">Searching…</p>}

      {term && !loading && results.length === 0 && (
        <p className="mt-8 text-muted">
          No results for “{term}”.
        </p>
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
