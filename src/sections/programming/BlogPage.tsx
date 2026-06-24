import { useMemo, useState } from 'react';
import { useSanityQuery } from '../../hooks/useSanityQuery';
import { blogPostsQuery } from '../../lib/sanity/queries';
import { BLOG_CATEGORIES } from '../../lib/sanity/constants';
import type { BlogPostCard } from '../../lib/sanity/types';
import PostCard from '../../components/cards/PostCard';

export default function BlogPage() {
  const { data, loading, error } =
    useSanityQuery<BlogPostCard[]>(blogPostsQuery);
  const [category, setCategory] = useState('All');

  const filtered = useMemo(() => {
    if (!data) return [];
    return category === 'All'
      ? data
      : data.filter((p) => p.category === category);
  }, [data, category]);

  const filters = ['All', ...BLOG_CATEGORIES];

  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <header className="mb-8">
        <p className="text-accent">{'// blog'}</p>
        <h1 className="mt-2 text-4xl font-bold text-primary">Blog</h1>
        <p className="mt-3 max-w-2xl text-muted">
          Tutorials, project logs, architecture notes, AI, and career writing.
        </p>
      </header>

      <div className="mb-8 flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setCategory(f)}
            className={[
              'rounded-full border px-3 py-1 text-sm transition-colors',
              category === f
                ? 'border-accent bg-accent text-white'
                : 'border-border text-muted hover:text-accent',
            ].join(' ')}
          >
            {f}
          </button>
        ))}
      </div>

      {loading && <p className="text-muted">Loading articles…</p>}

      {error && (
        <p className="rounded-md border border-border bg-surface p-4 text-muted">
          Couldn&apos;t load articles: {error.message}
        </p>
      )}

      {!loading && !error && data && data.length === 0 && (
        <div className="rounded-xl border border-dashed border-border bg-surface p-10 text-center">
          <p className="text-lg text-primary">No articles yet</p>
          <p className="mt-2 text-muted">
            Add a Blog Post in the Studio at <code>/studio</code>.
          </p>
        </div>
      )}

      {data && data.length > 0 && filtered.length === 0 && (
        <p className="text-muted">No articles in this category.</p>
      )}

      {filtered.length > 0 && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      )}
    </section>
  );
}
