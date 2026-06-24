import { Link, useParams } from 'react-router-dom';
import { useSanityQuery } from '../../hooks/useSanityQuery';
import { recipeBySlugQuery } from '../../lib/sanity/queries';
import type { Recipe } from '../../lib/sanity/types';
import { urlFor } from '../../lib/sanity/image';
import PortableText from '../../components/PortableText';
import MasonryGallery, {
  type MasonryImage,
} from '../../components/galleries/MasonryGallery';

export default function RecipeDetailPage() {
  const { slug } = useParams();
  const { data, loading, error } = useSanityQuery<Recipe | null>(
    recipeBySlugQuery,
    { slug },
  );

  if (loading) {
    return <p className="px-6 py-24 text-center text-muted">Loading…</p>;
  }

  if (error) {
    return (
      <p className="px-6 py-24 text-center text-muted">
        Couldn&apos;t load this recipe: {error.message}
      </p>
    );
  }

  if (!data) {
    return (
      <section className="mx-auto max-w-3xl px-6 py-24 text-center">
        <h1 className="font-serif text-3xl text-primary">Recipe not found</h1>
        <Link
          to="/chef/recipes"
          className="mt-6 inline-block text-accent hover:underline"
        >
          ← Back to recipes
        </Link>
      </section>
    );
  }

  const recipe = data;
  const galleryImages: MasonryImage[] = (recipe.gallery ?? []).map((img, i) => ({
    thumb: urlFor(img).width(600).url(),
    src: urlFor(img).width(1600).fit('max').url(),
    alt: `${recipe.title} ${i + 1}`,
  }));

  const stats = [
    recipe.difficulty && { label: 'Difficulty', value: recipe.difficulty },
    recipe.prepTime && { label: 'Prep', value: `${recipe.prepTime} min` },
    recipe.cookTime && { label: 'Cook', value: `${recipe.cookTime} min` },
    recipe.servings && { label: 'Serves', value: String(recipe.servings) },
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <Link to="/chef/recipes" className="text-sm text-accent hover:underline">
        ← Recipes
      </Link>

      {/* Header */}
      <header className="mt-6">
        <h1 className="font-serif text-4xl text-primary">{recipe.title}</h1>
        {recipe.heroImage && (
          <img
            src={urlFor(recipe.heroImage).width(1200).height(700).url()}
            alt={recipe.title}
            className="mt-6 aspect-[12/7] w-full rounded-xl border border-border object-cover"
          />
        )}
        {stats.length > 0 && (
          <dl className="mt-6 grid grid-cols-2 gap-4 rounded-xl border border-border bg-surface p-5 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="text-xs uppercase tracking-wide text-muted">
                  {s.label}
                </dt>
                <dd className="mt-1 font-serif text-lg text-primary">
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>
        )}
      </header>

      {/* Ingredients */}
      {recipe.ingredients && recipe.ingredients.length > 0 && (
        <section className="mt-12">
          <h2 className="mb-4 font-serif text-2xl text-primary">Ingredients</h2>
          <ul className="space-y-2">
            {recipe.ingredients.map((item, i) => (
              <li key={i} className="flex gap-3 text-text">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                {item}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Instructions */}
      {recipe.instructions && recipe.instructions.length > 0 && (
        <section className="mt-12">
          <h2 className="mb-4 font-serif text-2xl text-primary">Method</h2>
          <PortableText value={recipe.instructions} />
        </section>
      )}

      {/* Notes */}
      {recipe.notes && (
        <section className="mt-12 rounded-xl border border-border bg-surface p-6">
          <h2 className="mb-2 font-serif text-xl text-primary">Notes &amp; variations</h2>
          <p className="whitespace-pre-line leading-relaxed text-muted">
            {recipe.notes}
          </p>
        </section>
      )}

      {/* Gallery */}
      {galleryImages.length > 0 && (
        <section className="mt-12">
          <h2 className="mb-4 font-serif text-2xl text-primary">Gallery</h2>
          <MasonryGallery images={galleryImages} />
        </section>
      )}
    </article>
  );
}
