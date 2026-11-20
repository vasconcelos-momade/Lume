import React from 'react';

interface LoadingSkeletonProps {
  variant?: 'card' | 'list' | 'grid';
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({ variant = 'card' }) => {
  if (variant === 'list') {
    return (
      <div className="space-y-3" aria-label="Carregando">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="flex items-center gap-3 p-4 rounded-2xl bg-surface border border-border animate-pulse"
          >
            <div className="w-12 h-12 rounded-full bg-lavender shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="h-3.5 w-1/3 bg-lavender rounded" />
              <div className="h-3 w-2/3 bg-lavender rounded" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (variant === 'grid') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" aria-label="Carregando">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="aspect-[3/4] rounded-3xl bg-surface border border-border animate-pulse p-5 flex flex-col justify-end"
          >
            <div className="h-4 w-1/2 bg-lavender rounded mb-2" />
            <div className="h-3 w-1/3 bg-lavender rounded" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      className="w-full max-w-[440px] mx-auto aspect-[3/4] rounded-3xl bg-surface border border-border animate-pulse p-6 flex flex-col justify-end"
      aria-label="Carregando"
    >
      <div className="h-6 w-1/2 bg-lavender rounded mb-3" />
      <div className="h-4 w-3/4 bg-lavender rounded mb-2" />
      <div className="h-4 w-1/3 bg-lavender rounded" />
    </div>
  );
};
