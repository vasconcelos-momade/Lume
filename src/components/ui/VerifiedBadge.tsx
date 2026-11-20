import React from 'react';
import { BadgeCheck } from 'lucide-react';

interface VerifiedBadgeProps {
  verified?: boolean;
  size?: 'sm' | 'md';
  withLabel?: boolean;
  inverted?: boolean;
}

export const VerifiedBadge: React.FC<VerifiedBadgeProps> = ({
  verified = true,
  size = 'sm',
  withLabel = false,
  inverted = false,
}) => {
  if (!verified) return null;

  const iconClass = size === 'md' ? 'w-5 h-5' : 'w-4 h-4';

  return (
    <span
      className={`inline-flex items-center gap-1 shrink-0 ${
        inverted ? 'text-white' : 'text-primary'
      }`}
      title="Perfil verificado"
    >
      <BadgeCheck className={`${iconClass} fill-current`} aria-hidden="true" />
      {withLabel && <span className="text-xs font-medium">Perfil verificado</span>}
    </span>
  );
};
