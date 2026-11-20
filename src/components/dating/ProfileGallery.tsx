import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, User } from 'lucide-react';

interface ProfileGalleryProps {
  photos: string[];
  name: string;
  aspectClass?: string;
  className?: string;
  blurred?: boolean;
}

export const ProfileGallery: React.FC<ProfileGalleryProps> = ({
  photos,
  name,
  aspectClass = 'aspect-[3/4]',
  className = '',
  blurred = false,
}) => {
  const [index, setIndex] = useState(0);
  const [failedIndices, setFailedIndices] = useState<Record<number, boolean>>({});

  const safePhotos = photos.length > 0 ? photos : [''];
  const currentIndex = Math.min(index, safePhotos.length - 1);
  const currentSrc = safePhotos[currentIndex];
  const hasFailed = !currentSrc || failedIndices[currentIndex];

  const prev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIndex((i) => (i > 0 ? i - 1 : safePhotos.length - 1));
  };

  const next = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIndex((i) => (i < safePhotos.length - 1 ? i + 1 : 0));
  };

  return (
    <div className={`relative w-full ${aspectClass} overflow-hidden bg-lavender/50 select-none ${className}`}>
      {/* Progress bars */}
      {safePhotos.length > 1 && !blurred && (
        <div className="absolute top-3 left-3 right-3 z-20 flex items-center gap-1.5">
          {safePhotos.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIndex(idx);
              }}
              aria-label={`Ver foto ${idx + 1}`}
              className="flex-1 h-1 rounded-full overflow-hidden bg-white/35"
            >
              <span
                className={`block h-full transition-all duration-200 ${
                  idx === currentIndex ? 'bg-white w-full' : idx < currentIndex ? 'bg-white/80 w-full' : 'w-0'
                }`}
              />
            </button>
          ))}
        </div>
      )}

      {!hasFailed ? (
        <img
          src={currentSrc}
          alt={`${name} — foto ${currentIndex + 1}`}
          referrerPolicy="no-referrer"
          onError={() => setFailedIndices((prevMap) => ({ ...prevMap, [currentIndex]: true }))}
          className={`w-full h-full object-cover transition-transform duration-300 ${
            blurred ? 'blur-xl scale-110' : ''
          }`}
          draggable={false}
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-lavender via-pink/10 to-coral/15 text-primary">
          <User className="w-12 h-12 opacity-60" aria-hidden="true" />
          <span className="mt-2 text-xs font-medium text-ink-muted">{name}</span>
        </div>
      )}

      {/* Left / Right Navigation Tap Zones */}
      {safePhotos.length > 1 && !blurred && (
        <>
          <button
            type="button"
            onClick={prev}
            aria-label="Foto anterior"
            className="absolute inset-y-0 left-0 w-1/3 z-10 flex items-center justify-start pl-2 opacity-0 hover:opacity-100 transition-opacity group"
          >
            <span className="w-8 h-8 rounded-full bg-black/35 text-white flex items-center justify-center backdrop-blur-sm">
              <ChevronLeft className="w-4 h-4" />
            </span>
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Próxima foto"
            className="absolute inset-y-0 right-0 w-1/3 z-10 flex items-center justify-end pr-2 opacity-0 hover:opacity-100 transition-opacity group"
          >
            <span className="w-8 h-8 rounded-full bg-black/35 text-white flex items-center justify-center backdrop-blur-sm">
              <ChevronRight className="w-4 h-4" />
            </span>
          </button>
        </>
      )}
    </div>
  );
};
