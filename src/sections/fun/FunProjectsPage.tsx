import { useSanityQuery } from '../../hooks/useSanityQuery';
import { funProjectsQuery } from '../../lib/sanity/queries';
import type { FunProjectCard as FunProjectCardType } from '../../lib/sanity/types';
import FunProjectCard from '../../components/cards/FunProjectCard';

export default function FunProjectsPage() {
  const { data, loading, error } =
    useSanityQuery<FunProjectCardType[]>(funProjectsQuery);

  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <header className="mb-10">
        <p className="font-bold tracking-wide text-accent-2">~ experiments ~</p>
        <h1 className="mt-2 text-4xl font-bold text-primary">Fun Projects</h1>
        <p className="mt-3 max-w-2xl text-muted">
          Creative coding, visualizations, art experiments, and personal
          challenges.
        </p>
      </header>

      {loading && <p className="text-muted">Loading experiments…</p>}

      {error && (
        <p className="rounded-md border border-border bg-surface p-4 text-muted">
          Couldn&apos;t load experiments: {error.message}
        </p>
      )}

      {!loading && !error && data && data.length === 0 && (
        <div className="rounded-xl border border-dashed border-border bg-surface p-10 text-center">
          <p className="text-lg text-primary">No experiments yet</p>
          <p className="mt-2 text-muted">
            Add a Fun Project in the Studio at <code>/studio</code>.
          </p>
        </div>
      )}

      {data && data.length > 0 && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((p) => (
            <FunProjectCard key={p._id} project={p} />
          ))}
        </div>
      )}
    </section>
  );
}
