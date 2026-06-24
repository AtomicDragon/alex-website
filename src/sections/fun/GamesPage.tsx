import { useSanityQuery } from '../../hooks/useSanityQuery';
import { gamesQuery } from '../../lib/sanity/queries';
import type { GameCard as GameCardType } from '../../lib/sanity/types';
import GameCard from '../../components/cards/GameCard';

export default function GamesPage() {
  const { data, loading, error } = useSanityQuery<GameCardType[]>(gamesQuery);

  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <header className="mb-10">
        <p className="font-bold tracking-wide text-accent-2">~ games ~</p>
        <h1 className="mt-2 text-4xl font-bold text-primary">Game Collection</h1>
        <p className="mt-3 max-w-2xl text-muted">
          Browser games, puzzles, simulations, and AI experiments — playable
          right here.
        </p>
      </header>

      {loading && <p className="text-muted">Loading games…</p>}

      {error && (
        <p className="rounded-md border border-border bg-surface p-4 text-muted">
          Couldn&apos;t load games: {error.message}
        </p>
      )}

      {!loading && !error && data && data.length === 0 && (
        <div className="rounded-xl border border-dashed border-border bg-surface p-10 text-center">
          <p className="text-lg text-primary">No games yet</p>
          <p className="mt-2 text-muted">
            Add a Game in the Studio at <code>/studio</code>.
          </p>
        </div>
      )}

      {data && data.length > 0 && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((g) => (
            <GameCard key={g._id} game={g} />
          ))}
        </div>
      )}
    </section>
  );
}
