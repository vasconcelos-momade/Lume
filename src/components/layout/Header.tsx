import React from 'react';
import { Crown, ShieldCheck } from 'lucide-react';
import { useDating } from '../../context/DatingContext';
import { UserAvatar } from '../ui/UserAvatar';
import { NotificationDropdown } from './NotificationDropdown';

interface HeaderProps {
  title: string;
  subtitle?: string;
  rightSlot?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({ title, subtitle, rightSlot }) => {
  const { currentUser, navigate } = useDating();

  return (
    <header className="sticky top-0 z-30 bg-surface/92 backdrop-blur-md border-b border-border px-4 lg:px-6 h-16 flex items-center justify-between gap-4">
      <div className="flex items-center gap-3 min-w-0">
        <button
          type="button"
          onClick={() => navigate('discover')}
          className="lg:hidden font-display text-lg font-bold tracking-tight text-primary whitespace-nowrap shrink-0"
        >
          Lume
        </button>
        <div className="min-w-0">
          <h1 className="font-display text-base lg:text-lg font-semibold text-ink truncate">
            {title}
          </h1>
          {subtitle && (
            <p className="hidden sm:block text-xs text-ink-muted truncate">{subtitle}</p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2.5 shrink-0">
        {rightSlot}
        {currentUser.tier === 'free' && (
          <button
            type="button"
            onClick={() => navigate('subscription')}
            className="hidden sm:inline-flex items-center gap-1.5 min-h-[40px] px-3.5 py-2 rounded-xl bg-lavender hover:bg-primary hover:text-white text-primary-dark text-xs font-semibold transition-colors whitespace-nowrap shrink-0"
          >
            <Crown className="w-3.5 h-3.5" />
            <span>Seja Premium</span>
          </button>
        )}
        <button
          type="button"
          onClick={() => navigate('admin')}
          title="Painel Administrativo"
          className="hidden xl:inline-flex items-center gap-1.5 min-h-[40px] px-3 py-2 rounded-xl border border-border bg-surface hover:bg-lavender/60 text-ink-muted hover:text-ink text-xs font-medium transition-colors whitespace-nowrap shrink-0"
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Admin</span>
        </button>
        <NotificationDropdown />
        <button
          type="button"
          onClick={() => navigate('profile')}
          aria-label="Meu Perfil"
          className="rounded-full"
        >
          <UserAvatar src={currentUser.photos[0]} name={currentUser.name} size="sm" online={true} />
        </button>
      </div>
    </header>
  );
};
