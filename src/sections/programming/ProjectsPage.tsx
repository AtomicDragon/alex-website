import { useMemo, useState } from 'react';
import { useSanityQuery } from '../../hooks/useSanityQuery';
import { programmingProjectsQuery } from '../../lib/sanity/queries';
import { PROJECT_CATEGORIES } from '../../lib/sanity/constants';
import type { ProgrammingProjectCard } from '../../lib/sanity/types';
import ProjectCard from '../../components/cards/ProjectCard';

export default function ProjectsPage() {
  const { data, loading, error } = useSanityQuery<ProgrammingProjectCard[]>(
    programmingProjectsQuery,
  );
  const [category, setCategory] = useState<string>('All');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    if (!data) return [];
    const q = search.trim().toLowerCase();
    return data.filter((p) => {
      const matchesCategory = category === 'All' || p.category === category;
      const matchesSearch =
        q === '' ||
        [p.title, p.description, p.tagline, ...(p.techStack ?? [])]
          .filter(Boolean)
          .some((field) => field!.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [data, category, search]);

  const filters = ['All', ...PROJECT_CATEGORIES];

  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <header className="mb-8">
        <p className="text-accent">{'// projects'}</p>
        <h1 className="mt-2 text-4xl font-bold text-primary">Projects</h1>
        <p className="mt-3 max-w-2xl text-muted">
          A grid of technical projects, sourced live from Sanity.
        </p>
      </header>

      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2">
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
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search projects…"
          className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-text outline-none focus:border-accent md:w-64"
        />
      </div>

      {loading && <p className="text-muted">Loading projects…</p>}

      {error && (
        <p className="rounded-md border border-border bg-surface p-4 text-muted">
          Couldn&apos;t load projects: {error.message}
        </p>
      )}

      {!loading && !error && data && data.length === 0 && (
        <div className="rounded-xl border border-dashed border-border bg-surface p-10 text-center">
          <p className="text-lg text-primary">No projects yet</p>
          <p className="mt-2 text-muted">
            Add a Programming Project in the Studio at <code>/studio</code> and it
            will appear here.
          </p>
        </div>
      )}

      {data && data.length > 0 && filtered.length === 0 && (
        <p className="text-muted">No projects match those filters.</p>
      )}

      {filtered.length > 0 && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <ProjectCard key={p._id} project={p} />
          ))}
        </div>
      )}
    </section>
  );
}
