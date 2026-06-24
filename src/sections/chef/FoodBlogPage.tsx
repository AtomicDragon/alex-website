import { useSanityQuery } from '../../hooks/useSanityQuery';
import { foodBlogQuery } from '../../lib/sanity/queries';
import type { FoodBlogCard } from '../../lib/sanity/types';
import FoodPostCard from '../../components/cards/FoodPostCard';

export default function FoodBlogPage() {
  const { data, loading, error } =
    useSanityQuery<FoodBlogCard[]>(foodBlogQuery);

  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <header className="mb-10">
        <p className="tracking-[0.3em] text-accent uppercase">Food Blog</p>
        <h1 className="mt-3 font-serif text-4xl text-primary">
          Notes from the Kitchen
        </h1>
        <p className="mt-3 max-w-2xl text-muted">
          Experiments, restaurant reviews, ingredient deep dives, and food
          travel.
        </p>
      </header>

      {loading && <p className="text-muted">Loading posts…</p>}

      {error && (
        <p className="rounded-md border border-border bg-surface p-4 text-muted">
          Couldn&apos;t load posts: {error.message}
        </p>
      )}

      {!loading && !error && data && data.length === 0 && (
        <div className="rounded-xl border border-dashed border-border bg-surface p-10 text-center">
          <p className="text-lg text-primary">No posts yet</p>
          <p className="mt-2 text-muted">
            Add a Food Blog Post in the Studio at <code>/studio</code>.
          </p>
        </div>
      )}

      {data && data.length > 0 && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((post) => (
            <FoodPostCard key={post._id} post={post} />
          ))}
        </div>
      )}
    </section>
  );
}
