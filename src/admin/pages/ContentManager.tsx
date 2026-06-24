const collections = [
  { type: 'programmingProject', label: 'Programming Projects' },
  { type: 'blogPost', label: 'Blog Posts' },
  { type: 'recipe', label: 'Recipes' },
  { type: 'foodBlog', label: 'Food Blog' },
  { type: 'galleryItem', label: 'Food Gallery' },
  { type: 'funProject', label: 'Fun Projects' },
  { type: 'game', label: 'Games' },
];

export default function ContentManager() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-primary">Content manager</h1>
      <p className="mt-1 text-muted">
        All public content is edited in Sanity Studio. Jump straight to a
        collection:
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {collections.map((c) => (
          <a
            key={c.type}
            href={`/studio/structure/${c.type}`}
            className="flex items-center justify-between rounded-xl border border-border bg-surface p-5 transition-transform hover:-translate-y-0.5 hover:shadow-lg"
          >
            <span className="font-medium text-primary">{c.label}</span>
            <span className="text-accent">↗</span>
          </a>
        ))}
      </div>
    </div>
  );
}
