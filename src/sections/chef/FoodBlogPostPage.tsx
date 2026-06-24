import { Link, useParams } from 'react-router-dom';
import { useSanityQuery } from '../../hooks/useSanityQuery';
import { foodBlogBySlugQuery } from '../../lib/sanity/queries';
import type { FoodBlog } from '../../lib/sanity/types';
import { urlFor } from '../../lib/sanity/image';
import PortableText from '../../components/PortableText';
import Seo from '../../components/Seo';
import MasonryGallery, {
  type MasonryImage,
} from '../../components/galleries/MasonryGallery';

function formatDate(iso?: string) {
  if (!iso) return null;
  return new Date(iso).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function FoodBlogPostPage() {
  const { slug } = useParams();
  const { data, loading, error } = useSanityQuery<FoodBlog | null>(
    foodBlogBySlugQuery,
    { slug },
  );

  if (loading) {
    return <p className="px-6 py-24 text-center text-muted">Loading…</p>;
  }

  if (error) {
    return (
      <p className="px-6 py-24 text-center text-muted">
        Couldn&apos;t load this post: {error.message}
      </p>
    );
  }

  if (!data) {
    return (
      <section className="mx-auto max-w-3xl px-6 py-24 text-center">
        <h1 className="font-serif text-3xl text-primary">Post not found</h1>
        <Link
          to="/chef/blog"
          className="mt-6 inline-block text-accent hover:underline"
        >
          ← Back to food blog
        </Link>
      </section>
    );
  }

  const post = data;
  const date = formatDate(post.publishedAt);
  const images: MasonryImage[] = (post.images ?? []).map((img, i) => ({
    thumb: urlFor(img).width(600).url(),
    src: urlFor(img).width(1600).fit('max').url(),
    alt: `${post.title} ${i + 1}`,
  }));

  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <Seo
        title={post.title}
        description="Food blog"
        image={
          post.images?.[0]
            ? urlFor(post.images[0]).width(1200).height(630).url()
            : undefined
        }
      />
      <Link to="/chef/blog" className="text-sm text-accent hover:underline">
        ← Food blog
      </Link>

      <header className="mt-6">
        {date && (
          <time className="text-xs uppercase tracking-wide text-accent">
            {date}
          </time>
        )}
        <h1 className="mt-2 font-serif text-4xl text-primary">{post.title}</h1>
        {post.images?.[0] && (
          <img
            src={urlFor(post.images[0]).width(1200).height(600).url()}
            alt={post.title}
            className="mt-6 aspect-[2/1] w-full rounded-xl border border-border object-cover"
          />
        )}
      </header>

      {post.content && post.content.length > 0 && (
        <div className="mt-8">
          <PortableText value={post.content} />
        </div>
      )}

      {images.length > 1 && (
        <section className="mt-12">
          <h2 className="mb-4 font-serif text-2xl text-primary">Gallery</h2>
          <MasonryGallery images={images} />
        </section>
      )}
    </article>
  );
}
