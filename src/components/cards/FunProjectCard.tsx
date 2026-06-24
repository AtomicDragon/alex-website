import { Link } from 'react-router-dom';
import type { FunProjectCard as FunProjectCardType } from '../../lib/sanity/types';
import { urlFor } from '../../lib/sanity/image';

/** Card for a fun project / experiment. */
export default function FunProjectCard({
  project,
}: {
  project: FunProjectCardType;
}) {
  const card = (
    <article className="flex h-full flex-col overflow-hidden rounded-xl border border-border bg-surface shadow-sm transition-transform hover:-translate-y-1 hover:shadow-lg">
      {project.thumbnail ? (
        <img
          src={urlFor(project.thumbnail).width(640).height(360).url()}
          alt={project.title}
          className="aspect-video w-full object-cover"
          loading="lazy"
        />
      ) : (
        <div className="aspect-video w-full bg-gradient-to-br from-accent-3/30 via-accent/20 to-accent-2/30" />
      )}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-bold text-primary">{project.title}</h3>
        {project.description && (
          <p className="mt-2 flex-1 text-sm text-muted">{project.description}</p>
        )}
      </div>
    </article>
  );

  return project.slug ? (
    <Link to={`/fun/projects/${project.slug}`} className="h-full">
      {card}
    </Link>
  ) : (
    card
  );
}
