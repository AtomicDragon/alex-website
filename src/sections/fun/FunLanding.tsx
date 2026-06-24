import { Link } from 'react-router-dom';
import { useSanityQuery } from '../../hooks/useSanityQuery';
import { gamesQuery, funProjectsQuery } from '../../lib/sanity/queries';
import type { GameCard as GameCardType, FunProjectCard as FunProjectCardType } from '../../lib/sanity/types';
import GameCard from '../../components/cards/GameCard';
import FunProjectCard from '../../components/cards/FunProjectCard';

export default function FunLanding() {
  const { data: games } = useSanityQuery<GameCardType[]>(gamesQuery);
  const { data: projects } = useSanityQuery<FunProjectCardType[]>(funProjectsQuery);

  const featuredGames = games?.slice(0, 3) ?? [];
  const featuredProjects = projects?.slice(0, 3) ?? [];

  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      {/* Hero */}
      <section className="max-w-3xl">
        <p className="font-bold tracking-wide text-accent-2">~ fun lab ~</p>
        <h1 className="mt-3 text-5xl font-bold text-primary">
          Experiments &amp;{' '}
          <span className="bg-gradient-to-r from-accent via-accent-3 to-accent-2 bg-clip-text text-transparent">
            Play
          </span>
        </h1>
        <p className="mt-5 text-lg text-muted">
          Mini games, creative coding, simulations, and random creations — the
          personal playground.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            to="/fun/games"
            className="rounded-md bg-accent px-5 py-2.5 font-medium text-white transition-opacity hover:opacity-90"
          >
            Play games
          </Link>
          <Link
            to="/fun/projects"
            className="rounded-md border border-border px-5 py-2.5 font-medium text-text transition-colors hover:text-accent-3"
          >
            Experiments
          </Link>
        </div>
      </section>

      {/* Featured games */}
      {featuredGames.length > 0 && (
        <section className="mt-20">
          <div className="mb-6 flex items-end justify-between">
            <h2 className="text-2xl font-bold text-primary">Games</h2>
            <Link to="/fun/games" className="text-sm text-accent hover:underline">
              All games →
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredGames.map((g) => (
              <GameCard key={g._id} game={g} />
            ))}
          </div>
        </section>
      )}

      {/* Featured experiments */}
      {featuredProjects.length > 0 && (
        <section className="mt-20">
          <div className="mb-6 flex items-end justify-between">
            <h2 className="text-2xl font-bold text-primary">Experiments</h2>
            <Link
              to="/fun/projects"
              className="text-sm text-accent hover:underline"
            >
              All experiments →
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((p) => (
              <FunProjectCard key={p._id} project={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
