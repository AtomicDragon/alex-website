import { defineArrayMember, defineField, defineType } from 'sanity';

export const recipe = defineType({
  name: 'recipe',
  title: 'Recipe',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Dish name',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'heroImage',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'difficulty',
      type: 'string',
      options: { list: ['Easy', 'Medium', 'Hard'], layout: 'radio' },
    }),
    defineField({ name: 'prepTime', title: 'Prep time (min)', type: 'number' }),
    defineField({ name: 'cookTime', title: 'Cook time (min)', type: 'number' }),
    defineField({ name: 'servings', type: 'number' }),
    defineField({
      name: 'ingredients',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
    }),
    defineField({
      name: 'instructions',
      title: 'Instructions (steps)',
      type: 'array',
      of: [defineArrayMember({ type: 'block' })],
    }),
    defineField({
      name: 'notes',
      title: 'Notes / variations',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'gallery',
      title: 'Process photos',
      type: 'array',
      of: [defineArrayMember({ type: 'image', options: { hotspot: true } })],
    }),
    defineField({ name: 'seo', type: 'seo' }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'difficulty', media: 'heroImage' },
  },
});
