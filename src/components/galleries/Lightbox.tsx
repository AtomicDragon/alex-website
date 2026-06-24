import { useEffect } from 'react';

export type LightboxImage = {
  src: string;
  alt?: string;
  caption?: string;
};

type LightboxProps = {
  images: LightboxImage[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
};

/** Fullscreen image viewer with keyboard navigation (Esc / ← / →). */
export default function Lightbox({
  images,
  index,
  onClose,
  onPrev,
  onNext,
}: LightboxProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight') onNext();
      else if (e.key === 'ArrowLeft') onPrev();
    };
    window.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose, onNext, onPrev]);

  const image = images[index];
  if (!image) return null;
  const multiple = images.length > 1;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={image.caption ?? image.alt ?? 'Image viewer'}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4"
      onClick={onClose}
    >
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-2xl text-white hover:bg-white/20"
      >
        ✕
      </button>

      {multiple && (
        <button
          type="button"
          aria-label="Previous"
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          className="absolute left-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-3xl text-white hover:bg-white/20"
        >
          ‹
        </button>
      )}

      <figure
        className="flex max-h-full max-w-5xl flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={image.src}
          alt={image.alt ?? ''}
          className="max-h-[85vh] w-auto rounded-lg object-contain"
        />
        {image.caption && (
          <figcaption className="mt-3 text-center text-sm text-white/80">
            {image.caption}
          </figcaption>
        )}
      </figure>

      {multiple && (
        <button
          type="button"
          aria-label="Next"
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          className="absolute right-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-3xl text-white hover:bg-white/20"
        >
          ›
        </button>
      )}
    </div>
  );
}
