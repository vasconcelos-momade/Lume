import React, { useState } from 'react';
import { User } from 'lucide-react';
import { OnlineIndicator } from './OnlineIndicator';

interface UserAvatarProps {
  src?: string;
  name: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  online?: boolean;
  className?: string;
}

const SIZE_MAP = {
  sm: 'w-9 h-9 text-xs',
  md: 'w-11 h-11 text-sm',
  lg: 'w-14 h-14 text-base',
  xl: 'w-20 h-20 text-lg',
};

export const UserAvatar: React.FC<UserAvatarProps> = ({
  src,
  name,
  size = 'md',
  online = false,
  className = '',
}) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div className={`relative inline-flex shrink-0 ${className}`}>
      <div
        className={`${SIZE_MAP[size]} rounded-full overflow-hidden bg-lavender/60 border border-border flex items-center justify-center`}
      >
        {src && !imgError ? (
          <img
            src={src}
            alt={name}
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-lavender to-pink/15 text-primary font-semibold">
            <User className="w-1/2 h-1/2" aria-hidden="true" />
          </div>
        )}
      </div>
      {online && (
        <span className="absolute bottom-0 right-0">
          <OnlineIndicator online={true} size={size === 'xl' ? 'md' : 'sm'} />
        </span>
      )}
    </div>
  );
};
