import { defineField, defineType } from 'sanity';

export const GALLERY_CATEGORIES = [
  'Desserts',
  'Main Courses',
  'Appetizers',
  'Bread',
  'Drinks',
] as const;

export const galleryItem = defineType({
  name: 'galleryItem',
  title: 'Food Gallery Item',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'image',
      type: 'image',
      options: { hotspot: true },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'category',
      type: 'string',
      options: { list: [...GALLERY_CATEGORIES] },
    }),
    defineField({ name: 'description', type: 'text', rows: 2 }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'category', media: 'image' },
  },
});
