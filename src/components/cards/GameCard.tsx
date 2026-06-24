import { Link } from 'react-router-dom';
import type { GameCard as GameCardType } from '../../lib/sanity/types';
import { urlFor } from '../../lib/sanity/image';

/** Card for a game, used in the games grid and featured lists. */
export default function GameCard({ game }: { game: GameCardType }) {
  const card = (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-surface shadow-sm transition-transform hover:-translate-y-1 hover:shadow-lg">
      <div className="relative aspect-video w-full overflow-hidden">
        {game.thumbnail ? (
          <img
            src={urlFor(game.thumbnail).width(640).height(360).url()}
            alt={game.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-accent/30 via-accent-3/20 to-accent-2/30" />
        )}
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-black/50 text-2xl text-white opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
            ▶
          </span>
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-bold text-primary">{game.title}</h3>
        {game.description && (
          <p className="mt-2 flex-1 text-sm text-muted">{game.description}</p>
        )}
      </div>
    </article>
  );

  return game.slug ? (
    <Link to={`/fun/games/${game.slug}`} className="h-full">
      {card}
    </Link>
  ) : (
    card
  );
}
