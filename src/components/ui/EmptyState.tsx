import React from 'react';
import { LucideIcon } from 'lucide-react';
import { BUTTON_VARIANTS } from '../../theme/tokens';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
}) => {
  return (
    <div className="w-full py-14 px-6 bg-surface border border-border rounded-3xl flex flex-col items-center text-center shadow-[0_8px_28px_rgba(37,35,51,0.04)]">
      <div className="w-14 h-14 rounded-2xl bg-lavender border border-border flex items-center justify-center text-primary mb-4">
        <Icon className="w-6 h-6" aria-hidden="true" />
      </div>
      <h3 className="font-display text-lg font-semibold text-ink">{title}</h3>
      <p className="text-sm text-ink-muted max-w-md mt-1.5 leading-relaxed">{description}</p>
      {actionLabel && onAction && (
        <button
          type="button"
          onClick={onAction}
          className={`mt-6 min-h-[44px] px-6 py-2.5 rounded-xl text-sm whitespace-nowrap shrink-0 ${BUTTON_VARIANTS.primary}`}
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};
