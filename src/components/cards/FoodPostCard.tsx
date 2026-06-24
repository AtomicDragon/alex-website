import { Link } from 'react-router-dom';
import type { FoodBlogCard } from '../../lib/sanity/types';
import { urlFor } from '../../lib/sanity/image';

function formatDate(iso?: string) {
  if (!iso) return null;
  return new Date(iso).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

/** Card for a food blog post. */
export default function FoodPostCard({ post }: { post: FoodBlogCard }) {
  const date = formatDate(post.publishedAt);

  const card = (
    <article className="flex h-full flex-col overflow-hidden rounded-xl border border-border bg-surface shadow-sm transition-transform hover:-translate-y-1 hover:shadow-lg">
      {post.coverImage && (
        <img
          src={urlFor(post.coverImage).width(640).height(360).url()}
          alt={post.title}
          className="aspect-video w-full object-cover"
          loading="lazy"
        />
      )}
      <div className="flex flex-1 flex-col p-5">
        {date && (
          <time className="text-xs uppercase tracking-wide text-accent">
            {date}
          </time>
        )}
        <h3 className="mt-1 font-serif text-lg text-primary">{post.title}</h3>
      </div>
    </article>
  );

  return post.slug ? (
    <Link to={`/chef/blog/${post.slug}`} className="h-full">
      {card}
    </Link>
  ) : (
    card
  );
}
