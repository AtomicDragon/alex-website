import { Link } from 'react-router-dom';

export default function FunLanding() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-24">
      <p className="font-bold tracking-wide text-accent-2">~ fun lab ~</p>
      <h1 className="mt-3 text-5xl font-bold text-primary">
        Experiments &amp; <span className="text-accent">Play</span>
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-muted">
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
  );
}
