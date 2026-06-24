import { useMemo, useState } from 'react';
import { useSanityQuery } from '../../hooks/useSanityQuery';
import { galleryItemsQuery } from '../../lib/sanity/queries';
import { GALLERY_CATEGORIES } from '../../lib/sanity/constants';
import type { GalleryItem } from '../../lib/sanity/types';
import { urlFor } from '../../lib/sanity/image';
import MasonryGallery, {
  type MasonryImage,
} from '../../components/galleries/MasonryGallery';

export default function GalleryPage() {
  const { data, loading, error } =
    useSanityQuery<GalleryItem[]>(galleryItemsQuery);
  const [category, setCategory] = useState('All');

  const images: MasonryImage[] = useMemo(() => {
    if (!data) return [];
    return data
      .filter((item) => category === 'All' || item.category === category)
      .map((item) => ({
        thumb: urlFor(item.image).width(600).url(),
        src: urlFor(item.image).width(1600).fit('max').url(),
        alt: item.title,
        caption: item.description
          ? `${item.title} — ${item.description}`
          : item.title,
      }));
  }, [data, category]);

  const filters = ['All', ...GALLERY_CATEGORIES];

  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <header className="mb-8">
        <p className="tracking-[0.3em] text-accent uppercase">Gallery</p>
        <h1 className="mt-3 font-serif text-4xl text-primary">The Plate</h1>
        <p className="mt-3 max-w-2xl text-muted">
          A visual collection of dishes. Click any image to view it fullscreen.
        </p>
      </header>

      <div className="mb-8 flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setCategory(f)}
            className={[
              'rounded-full border px-3 py-1 text-sm transition-colors',
              category === f
                ? 'border-accent bg-accent text-black'
                : 'border-border text-muted hover:text-accent',
            ].join(' ')}
          >
            {f}
          </button>
        ))}
      </div>

      {loading && <p className="text-muted">Loading gallery…</p>}

      {error && (
        <p className="rounded-md border border-border bg-surface p-4 text-muted">
          Couldn&apos;t load gallery: {error.message}
        </p>
      )}

      {!loading && !error && data && data.length === 0 && (
        <div className="rounded-xl border border-dashed border-border bg-surface p-10 text-center">
          <p className="text-lg text-primary">No images yet</p>
          <p className="mt-2 text-muted">
            Add Food Gallery Items in the Studio at <code>/studio</code>.
          </p>
        </div>
      )}

      {data && data.length > 0 && images.length === 0 && (
        <p className="text-muted">No images in this category.</p>
      )}

      {images.length > 0 && <MasonryGallery images={images} />}
    </section>
  );
}
