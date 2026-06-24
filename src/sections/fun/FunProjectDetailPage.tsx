import { Link, useParams } from 'react-router-dom';
import { useSanityQuery } from '../../hooks/useSanityQuery';
import { funProjectBySlugQuery } from '../../lib/sanity/queries';
import type { FunProject } from '../../lib/sanity/types';
import { urlFor } from '../../lib/sanity/image';
import PortableText from '../../components/PortableText';
import Seo from '../../components/Seo';
import MasonryGallery, {
  type MasonryImage,
} from '../../components/galleries/MasonryGallery';

export default function FunProjectDetailPage() {
  const { slug } = useParams();
  const { data, loading, error } = useSanityQuery<FunProject | null>(
    funProjectBySlugQuery,
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
          to="/fun/projects"
          className="mt-6 inline-block text-accent hover:underline"
        >
          ← Back to experiments
        </Link>
      </section>
    );
  }

  const project = data;
  const images: MasonryImage[] = (project.screenshots ?? []).map((img, i) => ({
    thumb: urlFor(img).width(600).url(),
    src: urlFor(img).width(1600).fit('max').url(),
    alt: `${project.title} ${i + 1}`,
  }));

  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <Seo
        title={project.title}
        description={project.description}
        image={
          project.screenshots?.[0]
            ? urlFor(project.screenshots[0]).width(1200).height(630).url()
            : undefined
        }
      />
      <Link to="/fun/projects" className="text-sm text-accent hover:underline">
        ← Experiments
      </Link>

      <header className="mt-6">
        <h1 className="text-4xl font-bold text-primary">{project.title}</h1>
        {project.description && (
          <p className="mt-3 text-muted">{project.description}</p>
        )}
        {project.demoUrl && (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-block rounded-md bg-accent px-5 py-2.5 font-medium text-white hover:opacity-90"
          >
            Live demo ↗
          </a>
        )}
        {project.screenshots?.[0] && (
          <img
            src={urlFor(project.screenshots[0]).width(1200).height(675).url()}
            alt={project.title}
            className="mt-6 aspect-video w-full rounded-xl border border-border object-cover"
          />
        )}
      </header>

      {project.content && project.content.length > 0 && (
        <div className="mt-8">
          <PortableText value={project.content} />
        </div>
      )}

      {images.length > 1 && (
        <section className="mt-12">
          <h2 className="mb-4 text-2xl font-bold text-primary">Screenshots</h2>
          <MasonryGallery images={images} />
        </section>
      )}
    </article>
  );
}
