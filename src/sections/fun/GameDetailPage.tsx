import { Link, useParams } from 'react-router-dom';
import { useSanityQuery } from '../../hooks/useSanityQuery';
import { gameBySlugQuery } from '../../lib/sanity/queries';
import type { Game } from '../../lib/sanity/types';
import { urlFor } from '../../lib/sanity/image';
import Seo from '../../components/Seo';

export default function GameDetailPage() {
  const { slug } = useParams();
  const { data, loading, error } = useSanityQuery<Game | null>(
    gameBySlugQuery,
    { slug },
  );

  if (loading) {
    return <p className="px-6 py-24 text-center text-muted">Loading…</p>;
  }

  if (error) {
    return (
      <p className="px-6 py-24 text-center text-muted">
        Couldn&apos;t load this game: {error.message}
      </p>
    );
  }

  if (!data) {
    return (
      <section className="mx-auto max-w-3xl px-6 py-24 text-center">
        <h1 className="text-3xl font-bold text-primary">Game not found</h1>
        <Link
          to="/fun/games"
          className="mt-6 inline-block text-accent hover:underline"
        >
          ← Back to games
        </Link>
      </section>
    );
  }

  const game = data;

  return (
    <article className="mx-auto max-w-5xl px-6 py-16">
      <Seo
        title={game.title}
        description={game.description}
        image={
          game.thumbnail
            ? urlFor(game.thumbnail).width(1200).height(630).url()
            : undefined
        }
      />
      <Link to="/fun/games" className="text-sm text-accent hover:underline">
        ← Games
      </Link>

      <header className="mt-6">
        <h1 className="text-4xl font-bold text-primary">{game.title}</h1>
        {game.description && (
          <p className="mt-3 max-w-2xl text-muted">{game.description}</p>
        )}
      </header>

      {game.embedUrl ? (
        <>
          <div className="mt-8 aspect-video w-full overflow-hidden rounded-xl border border-border bg-black">
            <iframe
              src={game.embedUrl}
              title={game.title}
              className="h-full w-full"
              allow="fullscreen; autoplay; gamepad"
              sandbox="allow-scripts allow-same-origin allow-pointer-lock allow-popups"
              loading="lazy"
            />
          </div>
          <a
            href={game.embedUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block text-sm text-accent hover:underline"
          >
            Open in a new tab ↗
          </a>
        </>
      ) : (
        <p className="mt-8 rounded-xl border border-dashed border-border bg-surface p-8 text-center text-muted">
          This game doesn&apos;t have an embed URL yet.
        </p>
      )}
    </article>
  );
}
