import React from 'react';

interface OnlineIndicatorProps {
  online: boolean;
  size?: 'sm' | 'md';
  showLabel?: boolean;
  label?: string;
}

export const OnlineIndicator: React.FC<OnlineIndicatorProps> = ({
  online,
  size = 'sm',
  showLabel = false,
  label,
}) => {
  if (!online && !showLabel) return null;

  const dotSize = size === 'md' ? 'w-3 h-3' : 'w-2.5 h-2.5';

  if (showLabel) {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-ink-muted">
        <span
          className={`${dotSize} rounded-full shrink-0 ${
            online ? 'bg-success' : 'bg-[#C4BDD4]'
          }`}
          aria-hidden="true"
        />
        <span>{label ?? (online ? 'Online agora' : 'Offline')}</span>
      </span>
    );
  }

  return (
    <span
      className={`${dotSize} rounded-full bg-success ring-2 ring-surface block`}
      title="Online agora"
      aria-label="Online agora"
    />
  );
};
