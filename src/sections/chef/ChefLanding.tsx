import { Link } from 'react-router-dom';
import { useSanityQuery } from '../../hooks/useSanityQuery';
import { featuredRecipesQuery } from '../../lib/sanity/queries';
import type { RecipeCard as RecipeCardType } from '../../lib/sanity/types';
import RecipeCard from '../../components/cards/RecipeCard';
import { philosophy, journey } from './data';
import Seo from '../../components/Seo';

export default function ChefLanding() {
  const { data: featured } =
    useSanityQuery<RecipeCardType[]>(featuredRecipesQuery);

  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <Seo
        title="Chef"
        description="Recipes, food writing, and a gallery of culinary creations."
      />
      {/* Hero / philosophy */}
      <section className="max-w-3xl">
        <p className="tracking-[0.3em] text-accent uppercase">Chef</p>
        <h1 className="mt-3 font-serif text-5xl text-primary">
          A Culinary Journey
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-muted">{philosophy}</p>
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

      {/* Food journey */}
      <section className="mt-20">
        <h2 className="mb-8 font-serif text-3xl text-primary">Food journey</h2>
        <ol className="relative border-l border-border pl-6">
          {journey.map((step, i) => (
            <li key={i} className="mb-8 last:mb-0">
              <span className="absolute -left-[5px] mt-1.5 h-2.5 w-2.5 rounded-full bg-accent" />
              <p className="text-xs uppercase tracking-wide text-accent">
                {step.period}
              </p>
              <h3 className="font-serif text-xl text-primary">{step.title}</h3>
              <p className="mt-1 text-muted">{step.description}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Featured dishes */}
      {featured && featured.length > 0 && (
        <section className="mt-20">
          <div className="mb-6 flex items-end justify-between">
            <h2 className="font-serif text-3xl text-primary">Featured dishes</h2>
            <Link
              to="/chef/recipes"
              className="text-sm text-accent hover:underline"
            >
              All recipes →
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((r) => (
              <RecipeCard key={r._id} recipe={r} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
