import { Link } from 'react-router-dom';
import type { ProgrammingProjectCard } from '../../lib/sanity/types';
import { urlFor } from '../../lib/sanity/image';

/** Card for a programming project, used in grids and featured lists. */
export default function ProjectCard({
  project,
}: {
  project: ProgrammingProjectCard;
}) {
  const card = (
    <article className="flex h-full flex-col overflow-hidden rounded-xl border border-border bg-surface shadow-sm transition-transform hover:-translate-y-1 hover:shadow-lg">
      {project.coverImage ? (
        <img
          src={urlFor(project.coverImage).width(640).height(360).url()}
          alt={project.title}
          className="aspect-video w-full object-cover"
          loading="lazy"
        />
      ) : (
        <div className="aspect-video w-full bg-gradient-to-br from-accent/20 to-accent-3/20" />
      )}
      <div className="flex flex-1 flex-col p-5">
        {project.category && (
          <span className="text-xs uppercase tracking-wide text-accent">
            {project.category}
          </span>
        )}
        <h3 className="mt-1 text-xl font-semibold text-primary">
          {project.title}
        </h3>
        {project.description && (
          <p className="mt-2 flex-1 text-sm text-muted">{project.description}</p>
        )}
        {project.techStack && project.techStack.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-2">
            {project.techStack.slice(0, 5).map((tech) => (
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
    <Link to={`/programming/projects/${project.slug}`} className="h-full">
      {card}
    </Link>
  ) : (
    card
  );
}
