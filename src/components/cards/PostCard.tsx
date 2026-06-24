import { Link } from 'react-router-dom';
import type { BlogPostCard } from '../../lib/sanity/types';
import { urlFor } from '../../lib/sanity/image';

function formatDate(iso?: string) {
  if (!iso) return null;
  return new Date(iso).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

/** Card for a blog post, used in blog index and "latest articles". */
export default function PostCard({ post }: { post: BlogPostCard }) {
  const date = formatDate(post.publishedAt);
  const card = (
    <article className="flex h-full flex-col overflow-hidden rounded-xl border border-border bg-surface shadow-sm transition-transform hover:-translate-y-1 hover:shadow-lg">
      {post.coverImage && (
        <img
          src={urlFor(post.coverImage).width(640).height(320).url()}
          alt={post.title}
          className="aspect-[2/1] w-full object-cover"
          loading="lazy"
        />
      )}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-2 text-xs text-muted">
          {post.category && (
            <span className="uppercase tracking-wide text-accent">
              {post.category}
            </span>
          )}
          {post.category && date && <span>·</span>}
          {date && <time>{date}</time>}
        </div>
        <h3 className="mt-1 text-lg font-semibold text-primary">{post.title}</h3>
        {post.tags && post.tags.length > 0 && (
          <ul className="mt-3 flex flex-wrap gap-2">
            {post.tags.slice(0, 4).map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-border px-2 py-0.5 text-xs text-muted"
              >
                #{tag}
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );

  return post.slug ? (
    <Link to={`/programming/blog/${post.slug}`} className="h-full">
      {card}
    </Link>
  ) : (
    card
  );
}
