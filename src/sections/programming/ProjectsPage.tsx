import { Link } from 'react-router-dom';
import { useSanityQuery } from '../../hooks/useSanityQuery';
import { programmingProjectsQuery } from '../../lib/sanity/queries';
import type { ProgrammingProjectCard } from '../../lib/sanity/types';
import { urlFor } from '../../lib/sanity/image';

export default function ProjectsPage() {
  const { data, loading, error } = useSanityQuery<ProgrammingProjectCard[]>(
    programmingProjectsQuery,
  );

  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <header className="mb-10">
        <p className="text-accent">{'// projects'}</p>
        <h1 className="mt-2 text-4xl font-bold text-primary">Projects</h1>
        <p className="mt-3 max-w-2xl text-muted">
          A grid of technical projects, sourced live from Sanity.
        </p>
      </header>

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
            Add a Programming Project in the Studio (<code>npm run dev</code> in{' '}
            <code>studio/</code>) and it will appear here.
          </p>
        </div>
      )}

      {data && data.length > 0 && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((p) => (
            <ProjectCard key={p._id} project={p} />
          ))}
        </div>
      )}
    </section>
  );
}

function ProjectCard({ project }: { project: ProgrammingProjectCard }) {
  const card = (
    <article className="flex h-full flex-col overflow-hidden rounded-xl border border-border bg-surface shadow-sm transition-transform hover:-translate-y-1 hover:shadow-lg">
      {project.coverImage && (
        <img
          src={urlFor(project.coverImage).width(640).height(360).url()}
          alt={project.title}
          className="aspect-video w-full object-cover"
          loading="lazy"
        />
      )}
      <div className="flex flex-1 flex-col p-5">
        {project.category && (
          <span className="text-xs uppercase tracking-wide text-accent">
            {project.category}
          </span>
        )}
        <h2 className="mt-1 text-xl font-semibold text-primary">
          {project.title}
        </h2>
        {project.description && (
          <p className="mt-2 flex-1 text-sm text-muted">{project.description}</p>
        )}
        {project.techStack && project.techStack.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <li
                key={tech}
                className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted"
              >
                {tech}
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );

  return project.slug ? (
    <Link to={`/programming/projects/${project.slug}`}>{card}</Link>
  ) : (
    card
  );
}
