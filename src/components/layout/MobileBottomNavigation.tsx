import React from 'react';
import { Compass, Heart, MessageCircle, Sparkles, User } from 'lucide-react';
import { useDating } from '../../context/DatingContext';
import { AppPage } from '../../types/dating';

export const MobileBottomNavigation: React.FC = () => {
  const { currentPage, navigate, likesMe, totalUnreadMessages } = useDating();

  const items: {
    page: AppPage;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: number;
  }[] = [
    { page: 'discover', label: 'Descobrir', icon: Compass },
    { page: 'likes', label: 'Curtidas', icon: Heart, badge: likesMe.length },
    { page: 'matches', label: 'Matches', icon: Sparkles },
    { page: 'messages', label: 'Chat', icon: MessageCircle, badge: totalUnreadMessages },
    { page: 'profile', label: 'Perfil', icon: User },
  ];

  return (
    <nav
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-surface/95 backdrop-blur-md border-t border-border px-2"
      aria-label="Navegação mobile"
    >
      <div className="grid grid-cols-5 h-16 items-center">
        {items.map((item) => {
          const Icon = item.icon;
          const active = currentPage === item.page;
          return (
            <button
              key={item.page}
              type="button"
              onClick={() => navigate(item.page)}
              className={`relative min-h-[44px] flex flex-col items-center justify-center gap-0.5 rounded-xl transition-colors ${
                active ? 'text-primary font-semibold' : 'text-ink-muted'
              }`}
            >
              <div
                className={`relative px-3 py-0.5 rounded-full transition-colors ${
                  active ? 'bg-lavender' : ''
                }`}
              >
                <Icon className={`w-5 h-5 ${active ? 'stroke-[2.3]' : ''}`} />
                {typeof item.badge === 'number' && item.badge > 0 && (
                  <span className="absolute -top-1 right-0 min-w-[16px] h-[16px] px-1 rounded-full bg-pink text-white text-[10px] font-bold flex items-center justify-center tabular-nums">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] tracking-tight">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
