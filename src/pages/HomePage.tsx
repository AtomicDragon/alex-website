import { Link } from 'react-router-dom';

type World = {
  to: string;
  theme: string;
  label: string;
  tagline: string;
  description: string;
};

const worlds: World[] = [
  {
    to: '/programming',
    theme: 'programming',
    label: 'Programming',
    tagline: '// developer',
    description: 'Professional portfolio and technical project showcase.',
  },
  {
    to: '/chef',
    theme: 'chef',
    label: 'Chef',
    tagline: 'fine dining',
    description: 'Recipes, food writing, and a gallery of culinary creations.',
  },
  {
    to: '/fun',
    theme: 'fun',
    label: 'Fun',
    tagline: '~ play ~',
    description: 'Games, experiments, and creative-coding playground.',
  },
];

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-24">
      <header className="mx-auto max-w-2xl text-center">
        <h1 className="text-5xl font-bold text-primary">Hi, I&apos;m Alex</h1>
        <p className="mt-4 text-lg text-muted">
          One person, three worlds. Choose a universe to explore — developer,
          chef, or the fun lab.
        </p>
      </header>

      <div className="mt-16 grid gap-6 md:grid-cols-3">
        {worlds.map((w) => (
          <Link
            key={w.to}
            to={w.to}
            data-theme={w.theme}
            className="group flex flex-col rounded-2xl border border-border bg-surface p-8 text-text shadow-sm transition-transform hover:-translate-y-1 hover:shadow-xl"
          >
            <span className="text-sm tracking-widest text-accent uppercase">
              {w.tagline}
            </span>
            <h2 className="mt-2 text-3xl font-bold text-primary">{w.label}</h2>
            <p className="mt-3 flex-1 text-muted">{w.description}</p>
            <span className="mt-6 inline-flex items-center gap-2 font-medium text-accent">
              Enter
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
