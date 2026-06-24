import { Link } from 'react-router-dom';

export default function ChefLanding() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-24">
      <p className="tracking-[0.3em] text-accent uppercase">Chef</p>
      <h1 className="mt-3 text-5xl font-bold text-primary">A Culinary Journey</h1>
      <p className="mt-4 max-w-2xl text-lg text-muted">
        Recipes, food writing, and a gallery of dishes — an elegant showcase of
        culinary creativity and philosophy.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          to="/chef/recipes"
          className="rounded-md bg-accent px-5 py-2.5 font-medium text-black transition-opacity hover:opacity-90"
        >
          Browse recipes
        </Link>
        <Link
          to="/chef/gallery"
          className="rounded-md border border-border px-5 py-2.5 font-medium text-text transition-colors hover:text-accent"
        >
          Gallery
        </Link>
      </div>
    </section>
  );
}
