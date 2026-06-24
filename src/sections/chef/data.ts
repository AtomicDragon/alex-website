/** Static chef narrative content (philosophy + journey). Edit here. */

export const philosophy =
  'Cooking, to me, is where precision meets soul. I chase clean technique, ' +
  'seasonal ingredients, and dishes that feel both refined and honest — food ' +
  'worth slowing down for.';

export type JourneyStep = {
  period: string;
  title: string;
  description: string;
};

export const journey: JourneyStep[] = [
  {
    period: 'The beginning',
    title: 'Home kitchen experiments',
    description:
      'Learning the fundamentals — knife skills, sauces, and the patience that good food demands.',
  },
  {
    period: 'Exploring',
    title: 'Cuisines & technique',
    description:
      'Diving into cuisines across the world and the craft behind fine dining.',
  },
  {
    period: 'Now',
    title: 'Building a culinary voice',
    description:
      'Developing recipes and a personal style that balances elegance with comfort.',
  },
];
