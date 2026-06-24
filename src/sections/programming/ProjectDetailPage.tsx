import { Link, useParams } from 'react-router-dom';
import { useSanityQuery } from '../../hooks/useSanityQuery';
import { projectBySlugQuery } from '../../lib/sanity/queries';
import type { ProgrammingProject } from '../../lib/sanity/types';
import { urlFor } from '../../lib/sanity/image';
import PortableText from '../../components/PortableText';
import Seo from '../../components/Seo';

export default function ProjectDetailPage() {
  const { slug } = useParams();
  const { data, loading, error } = useSanityQuery<ProgrammingProject | null>(
    projectBySlugQuery,
    { slug },
  );

  if (loading) {
    return <p className="px-6 py-24 text-center text-muted">Loading…</p>;
  }

  if (error) {
    return (
      <p className="px-6 py-24 text-center text-muted">
        Couldn&apos;t load this project: {error.message}
      </p>
    );
  }

  if (!data) {
    return (
      <section className="mx-auto max-w-3xl px-6 py-24 text-center">
        <h1 className="text-3xl font-bold text-primary">Project not found</h1>
        <Link
          to="/programming/projects"
          className="mt-6 inline-block text-accent hover:underline"
        >
          ← Back to projects
        </Link>
      </section>
    );
  }

  const project = data;

  return (
    <article className="mx-auto max-w-4xl px-6 py-16">
      <Seo
        title={project.title}
        description={project.tagline || project.description}
        image={
          project.coverImage
            ? urlFor(project.coverImage).width(1200).height(630).url()
            : undefined
        }
      />
      <Link
        to="/programming/projects"
        className="text-sm text-accent hover:underline"
      >
        ← Projects
      </Link>

      {/* Hero */}
      <header className="mt-6">
        {project.category && (
          <span className="text-xs uppercase tracking-wide text-accent">
            {project.category}
          </span>
        )}
        <h1 className="mt-2 text-4xl font-bold text-primary">{project.title}</h1>
        {project.tagline && (
          <p className="mt-3 text-xl text-muted">{project.tagline}</p>
        )}
        {project.coverImage && (
          <img
            src={urlFor(project.coverImage).width(1280).height(640).url()}
            alt={project.title}
            className="mt-6 aspect-video w-full rounded-xl border border-border object-cover"
          />
        )}
      </header>

      {/* Links */}
      {(project.githubUrl || project.liveUrl) && (
        <div className="mt-6 flex flex-wrap gap-3">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-white hover:opacity-90"
            >
              Live demo ↗
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md border border-border px-4 py-2 text-sm font-medium text-text hover:text-accent"
            >
              GitHub ↗
            </a>
          )}
        </div>
      )}

      {/* Story */}
      {project.content && project.content.length > 0 && (
        <Section title="Story">
          <PortableText value={project.content} />
        </Section>
      )}

      {/* Technical details */}
      {(project.techStack?.length ||
        project.architecture ||
        project.challenges) && (
        <Section title="Technical details">
          {project.techStack && project.techStack.length > 0 && (
            <div className="mb-6">
              <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-muted">
                Tech stack
              </h3>
              <ul className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-full border border-border px-3 py-1 text-sm text-text"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {project.architecture && (
            <Detail label="Architecture" body={project.architecture} />
          )}
          {project.challenges && (
            <Detail label="Challenges" body={project.challenges} />
          )}
        </Section>
      )}

      {/* Media */}
      {project.gallery && project.gallery.length > 0 && (
        <Section title="Media">
          <div className="grid gap-4 sm:grid-cols-2">
            {project.gallery.map((img, i) => (
              <img
                key={i}
                src={urlFor(img).width(800).url()}
                alt={`${project.title} screenshot ${i + 1}`}
                loading="lazy"
                className="w-full rounded-lg border border-border object-cover"
              />
            ))}
          </div>
        </Section>
      )}

      {/* Timeline */}
      {project.timeline && project.timeline.length > 0 && (
        <Section title="Timeline">
          <ol className="relative border-l border-border pl-6">
            {project.timeline.map((event, i) => (
              <li key={i} className="mb-6 last:mb-0">
                <span className="absolute -left-[5px] mt-1.5 h-2.5 w-2.5 rounded-full bg-accent" />
                {event.date && (
                  <time className="text-xs uppercase tracking-wide text-muted">
                    {event.date}
                  </time>
                )}
                <h4 className="text-lg font-semibold text-primary">
                  {event.title}
                </h4>
                {event.description && (
                  <p className="mt-1 text-sm text-muted">{event.description}</p>
                )}
              </li>
            ))}
          </ol>
        </Section>
      )}
    </article>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-12">
      <h2 className="mb-4 text-2xl font-bold text-primary">{title}</h2>
      {children}
    </section>
  );
}

function Detail({ label, body }: { label: string; body: string }) {
  return (
    <div className="mb-6">
      <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-muted">
        {label}
      </h3>
      <p className="whitespace-pre-line leading-relaxed text-text">{body}</p>
    </div>
  );
}
