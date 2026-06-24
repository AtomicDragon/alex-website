import { useSanityQuery } from '../../hooks/useSanityQuery';
import { recipesQuery } from '../../lib/sanity/queries';
import type { RecipeCard as RecipeCardType } from '../../lib/sanity/types';
import RecipeCard from '../../components/cards/RecipeCard';

export default function RecipesPage() {
  const { data, loading, error } =
    useSanityQuery<RecipeCardType[]>(recipesQuery);

  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <header className="mb-10">
        <p className="tracking-[0.3em] text-accent uppercase">Recipes</p>
        <h1 className="mt-3 font-serif text-4xl text-primary">The Recipe Book</h1>
        <p className="mt-3 max-w-2xl text-muted">
          Dishes with structured ingredients, step-by-step method, and notes.
        </p>
      </header>

      {loading && <p className="text-muted">Loading recipes…</p>}

      {error && (
        <p className="rounded-md border border-border bg-surface p-4 text-muted">
          Couldn&apos;t load recipes: {error.message}
        </p>
      )}

      {!loading && !error && data && data.length === 0 && (
        <div className="rounded-xl border border-dashed border-border bg-surface p-10 text-center">
          <p className="text-lg text-primary">No recipes yet</p>
          <p className="mt-2 text-muted">
            Add a Recipe in the Studio at <code>/studio</code>.
          </p>
        </div>
      )}

      {data && data.length > 0 && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((r) => (
            <RecipeCard key={r._id} recipe={r} />
          ))}
        </div>
      )}
    </section>
  );
}
