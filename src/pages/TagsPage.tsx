import { Link } from 'react-router-dom';
import { useSanityQuery } from '../hooks/useSanityQuery';
import { allTagsQuery } from '../lib/sanity/queries';

export default function TagsPage() {
  const { data, loading } = useSanityQuery<string[]>(allTagsQuery);
  const tags = (data ?? []).filter(Boolean).sort((a, b) => a.localeCompare(b));

  return (
    <section className="mx-auto max-w-3xl px-6 py-20">
      <h1 className="text-4xl font-bold text-primary">Tags</h1>
      <p className="mt-2 text-muted">Browse content by tag across all worlds.</p>

      {loading && <p className="mt-8 text-muted">Loading tags…</p>}

      {!loading && tags.length === 0 && (
        <p className="mt-8 text-muted">No tags yet.</p>
      )}

      {tags.length > 0 && (
        <div className="mt-8 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Link
              key={tag}
              to={`/tag/${encodeURIComponent(tag)}`}
              className="rounded-full border border-border bg-surface px-3 py-1.5 text-sm text-text transition-colors hover:border-accent hover:text-accent"
            >
              #{tag}
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
