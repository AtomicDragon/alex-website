import { Link } from 'react-router-dom';
import { useSanityQuery } from '../../hooks/useSanityQuery';
import { featuredProjectsQuery } from '../../lib/sanity/queries';
import type { ProgrammingProjectCard } from '../../lib/sanity/types';
import ProjectCard from '../../components/cards/ProjectCard';
import SkillsMatrix from './SkillsMatrix';
import { experience, RESUME_URL } from './data';

export default function RecruiterPage() {
  const { data: featured } = useSanityQuery<ProgrammingProjectCard[]>(
    featuredProjectsQuery,
  );

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      {/* Snapshot header */}
      <section className="rounded-2xl border border-border bg-surface p-8">
        <p className="text-accent">{'// recruiter mode'}</p>
        <h1 className="mt-2 text-4xl font-bold text-primary">Alex — at a glance</h1>
        <p className="mt-3 max-w-2xl text-muted">
          Software Engineer focused on full-stack web development with React and
          TypeScript. Everything below is optimized for a quick evaluation.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md bg-accent px-5 py-2.5 font-medium text-white hover:opacity-90"
          >
            Download résumé
          </a>
          <Link
            to="/contact"
            className="rounded-md border border-border px-5 py-2.5 font-medium text-text hover:text-accent"
          >
            Contact me
          </Link>
        </div>
      </section>

      {/* Skills matrix */}
      <section className="mt-14">
        <h2 className="mb-6 text-2xl font-bold text-primary">Skills matrix</h2>
        <SkillsMatrix />
      </section>

      {/* Experience timeline */}
      {experience.length > 0 && (
        <section className="mt-14">
          <h2 className="mb-6 text-2xl font-bold text-primary">Experience</h2>
          <ol className="relative border-l border-border pl-6">
            {experience.map((item, i) => (
              <li key={i} className="mb-8 last:mb-0">
                <span className="absolute -left-[5px] mt-1.5 h-2.5 w-2.5 rounded-full bg-accent" />
                <time className="text-xs uppercase tracking-wide text-muted">
                  {item.period}
                </time>
                <h3 className="text-lg font-semibold text-primary">
                  {item.role}{' '}
                  <span className="font-normal text-muted">· {item.org}</span>
                </h3>
                <p className="mt-1 text-sm text-muted">{item.description}</p>
              </li>
            ))}
          </ol>
        </section>
      )}

      {/* Best projects */}
      {featured && featured.length > 0 && (
        <section className="mt-14">
          <div className="mb-6 flex items-end justify-between">
            <h2 className="text-2xl font-bold text-primary">Best projects</h2>
            <Link
              to="/programming/projects"
              className="text-sm text-accent hover:underline"
            >
              All projects →
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((p) => (
              <ProjectCard key={p._id} project={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
