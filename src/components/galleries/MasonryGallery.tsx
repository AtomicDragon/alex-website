import { useState } from 'react';
import Lightbox, { type LightboxImage } from './Lightbox';

export type MasonryImage = LightboxImage & { thumb: string };

/** Column-based masonry grid; clicking a tile opens the fullscreen lightbox. */
export default function MasonryGallery({ images }: { images: MasonryImage[] }) {
  const [index, setIndex] = useState<number | null>(null);

  if (images.length === 0) return null;

  return (
    <>
      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
        {images.map((img, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setIndex(i)}
            className="block w-full overflow-hidden rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-accent"
          >
            <img
              src={img.thumb}
              alt={img.alt ?? ''}
              loading="lazy"
              className="w-full transition-transform duration-300 hover:scale-105"
            />
          </button>
        ))}
      </div>

      {index !== null && (
        <Lightbox
          images={images}
          index={index}
          onClose={() => setIndex(null)}
          onPrev={() =>
            setIndex((i) => (i === null ? i : (i - 1 + images.length) % images.length))
          }
          onNext={() =>
            setIndex((i) => (i === null ? i : (i + 1) % images.length))
          }
        />
      )}
    </>
  );
}
