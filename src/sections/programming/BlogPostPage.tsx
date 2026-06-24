import { Link, useParams } from 'react-router-dom';
import { useSanityQuery } from '../../hooks/useSanityQuery';
import { blogPostBySlugQuery } from '../../lib/sanity/queries';
import type { BlogPost } from '../../lib/sanity/types';
import { urlFor } from '../../lib/sanity/image';
import PortableText from '../../components/PortableText';
import Seo from '../../components/Seo';

function formatDate(iso?: string) {
  if (!iso) return null;
  return new Date(iso).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function BlogPostPage() {
  const { slug } = useParams();
  const { data, loading, error } = useSanityQuery<BlogPost | null>(
    blogPostBySlugQuery,
    { slug },
  );

  if (loading) {
    return <p className="px-6 py-24 text-center text-muted">Loading…</p>;
  }

  if (error) {
    return (
      <p className="px-6 py-24 text-center text-muted">
        Couldn&apos;t load this article: {error.message}
      </p>
    );
  }

  if (!data) {
    return (
      <section className="mx-auto max-w-3xl px-6 py-24 text-center">
        <h1 className="text-3xl font-bold text-primary">Article not found</h1>
        <Link
          to="/programming/blog"
          className="mt-6 inline-block text-accent hover:underline"
        >
          ← Back to blog
        </Link>
      </section>
    );
  }

  const post = data;
  const date = formatDate(post.publishedAt);

  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <Seo
        title={post.title}
        description={post.category ? `${post.category} · article` : undefined}
        keywords={post.tags}
        image={
          post.coverImage
            ? urlFor(post.coverImage).width(1200).height(630).url()
            : undefined
        }
      />
      <Link to="/programming/blog" className="text-sm text-accent hover:underline">
        ← Blog
      </Link>

      <header className="mt-6">
        <div className="flex items-center gap-2 text-xs text-muted">
          {post.category && (
            <span className="uppercase tracking-wide text-accent">
              {post.category}
            </span>
          )}
          {post.category && date && <span>·</span>}
          {date && <time>{date}</time>}
        </div>
        <h1 className="mt-2 text-4xl font-bold text-primary">{post.title}</h1>
        {post.coverImage && (
          <img
            src={urlFor(post.coverImage).width(1200).height(600).url()}
            alt={post.title}
            className="mt-6 aspect-[2/1] w-full rounded-xl border border-border object-cover"
          />
        )}
      </header>

      <div className="mt-8">
        <PortableText value={post.content} />
      </div>

      {post.tags && post.tags.length > 0 && (
        <ul className="mt-10 flex flex-wrap gap-2 border-t border-border pt-6">
          {post.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted"
            >
              #{tag}
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}
