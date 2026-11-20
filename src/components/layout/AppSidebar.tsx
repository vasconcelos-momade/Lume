import React from 'react';
import {
  Compass,
  Crown,
  Heart,
  LogOut,
  MessageCircle,
  Settings,
  ShieldCheck,
  Sparkles,
  User,
} from 'lucide-react';
import { useDating } from '../../context/DatingContext';
import { AppPage } from '../../types/dating';
import { UserAvatar } from '../ui/UserAvatar';

export const AppSidebar: React.FC = () => {
  const {
    currentPage,
    navigate,
    currentUser,
    likesMe,
    matches,
    totalUnreadMessages,
    logout,
  } = useDating();

  const navItems: {
    page: AppPage;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    count?: number;
    romantic?: boolean;
  }[] = [
    { page: 'discover', label: 'Descobrir', icon: Compass },
    { page: 'likes', label: 'Curtidas', icon: Heart, count: likesMe.length, romantic: true },
    { page: 'matches', label: 'Matches', icon: Sparkles, count: matches.length, romantic: true },
    {
      page: 'messages',
      label: 'Mensagens',
      icon: MessageCircle,
      count: totalUnreadMessages,
      romantic: true,
    },
    { page: 'profile', label: 'Meu Perfil', icon: User },
    { page: 'subscription', label: 'Assinatura', icon: Crown },
    { page: 'settings', label: 'Configurações', icon: Settings },
  ];

  return (
    <aside className="hidden lg:flex flex-col w-64 shrink-0 border-r border-border bg-surface h-screen sticky top-0 px-4 py-6 justify-between">
      <div>
        {/* Brand */}
        <button
          type="button"
          onClick={() => navigate('landing')}
          className="flex items-center gap-2.5 px-3 mb-7 text-left group rounded-xl"
        >
          <span className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-pink flex items-center justify-center text-white font-display font-bold text-base shadow-[0_6px_16px_rgba(112,40,232,0.25)]">
            L
          </span>
          <span className="font-display text-xl font-bold tracking-tight text-ink group-hover:text-primary transition-colors">
            Lume
          </span>
        </button>

        {/* Nav items */}
        <nav className="space-y-1" aria-label="Navegação principal">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = currentPage === item.page;
            return (
              <button
                key={item.page}
                type="button"
                onClick={() => navigate(item.page)}
                className={`w-full min-h-[44px] flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 whitespace-nowrap ${
                  active
                    ? 'bg-lavender text-primary-dark font-semibold'
                    : 'text-ink-muted hover:bg-canvas hover:text-ink'
                }`}
              >
                <span className="flex items-center gap-3">
                  <Icon
                    className={`w-5 h-5 shrink-0 ${
                      active
                        ? 'text-primary'
                        : item.romantic && item.count
                          ? 'text-pink'
                          : ''
                    }`}
                  />
                  <span>{item.label}</span>
                </span>
                {typeof item.count === 'number' && item.count > 0 && (
                  <span
                    className={`text-xs font-semibold tabular-nums ${
                      active
                        ? 'text-primary-dark'
                        : item.romantic
                          ? 'text-pink'
                          : 'text-ink-muted'
                    }`}
                  >
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Admin link */}
        <div className="mt-6 pt-5 border-t border-border">
          <button
            type="button"
            onClick={() => navigate('admin')}
            className={`w-full min-h-[44px] flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors whitespace-nowrap ${
              currentPage === 'admin'
                ? 'bg-ink text-white font-semibold'
                : 'text-ink-muted hover:bg-canvas hover:text-ink'
            }`}
          >
            <ShieldCheck className="w-5 h-5 shrink-0" />
            <span>Painel Admin</span>
          </button>
        </div>
      </div>

      {/* Bottom Profile Card */}
      <div className="pt-4 border-t border-border space-y-2">
        <button
          type="button"
          onClick={() => navigate('profile')}
          className="w-full flex items-center gap-3 p-2.5 rounded-2xl hover:bg-lavender/60 transition-colors text-left"
        >
          <UserAvatar src={currentUser.photos[0]} name={currentUser.name} size="md" online={true} />
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-ink truncate">{currentUser.name}</p>
            <p className="text-xs text-ink-muted truncate">
              Plano{' '}
              {currentUser.tier === 'free'
                ? 'Free'
                : currentUser.tier === 'premium'
                  ? 'Premium'
                  : 'VIP'}{' '}
              · {currentUser.city}
            </p>
          </div>
        </button>
        <button
          type="button"
          onClick={logout}
          className="w-full min-h-[40px] flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-ink-muted hover:text-error hover:bg-error/5 transition-colors"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          <span>Sair da conta</span>
        </button>
      </div>
    </aside>
  );
};
