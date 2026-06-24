import { Link } from 'react-router-dom';
import type { RecipeCard as RecipeCardType } from '../../lib/sanity/types';
import { urlFor } from '../../lib/sanity/image';

function totalTime(prep?: number, cook?: number) {
  const total = (prep ?? 0) + (cook ?? 0);
  return total > 0 ? `${total} min` : null;
}

/** Card for a recipe, used in the recipes grid and featured dishes. */
export default function RecipeCard({ recipe }: { recipe: RecipeCardType }) {
  const time = totalTime(recipe.prepTime, recipe.cookTime);

  const card = (
    <article className="flex h-full flex-col overflow-hidden rounded-xl border border-border bg-surface shadow-sm transition-transform hover:-translate-y-1 hover:shadow-lg">
      {recipe.heroImage ? (
        <img
          src={urlFor(recipe.heroImage).width(640).height(420).url()}
          alt={recipe.title}
          className="aspect-[3/2] w-full object-cover"
          loading="lazy"
        />
      ) : (
        <div className="aspect-[3/2] w-full bg-gradient-to-br from-accent/20 to-black/30" />
      )}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-serif text-xl text-primary">{recipe.title}</h3>
        <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted">
          {recipe.difficulty && <li>{recipe.difficulty}</li>}
          {time && <li>⏱ {time}</li>}
          {recipe.servings && <li>🍽 {recipe.servings}</li>}
        </ul>
      </div>
    </article>
  );

  return recipe.slug ? (
    <Link to={`/chef/recipes/${recipe.slug}`} className="h-full">
      {card}
    </Link>
  ) : (
    card
  );
}
