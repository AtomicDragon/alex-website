/** Map a Sanity document type + slug to its public route and a display label. */

const config: Record<string, { label: string; path: (slug?: string) => string }> =
  {
    programmingProject: {
      label: 'Project',
      path: (s) => `/programming/projects/${s ?? ''}`,
    },
    blogPost: {
      label: 'Article',
      path: (s) => `/programming/blog/${s ?? ''}`,
    },
    recipe: { label: 'Recipe', path: (s) => `/chef/recipes/${s ?? ''}` },
    foodBlog: { label: 'Food post', path: (s) => `/chef/blog/${s ?? ''}` },
    galleryItem: { label: 'Gallery', path: () => `/chef/gallery` },
    funProject: {
      label: 'Experiment',
      path: (s) => `/fun/projects/${s ?? ''}`,
    },
    game: { label: 'Game', path: (s) => `/fun/games/${s ?? ''}` },
  };

export function contentLink(type: string, slug?: string | null): string {
  return config[type]?.path(slug ?? undefined) ?? '/';
}

export function contentLabel(type: string): string {
  return config[type]?.label ?? type;
}
