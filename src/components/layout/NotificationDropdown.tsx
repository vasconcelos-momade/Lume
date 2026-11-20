import React, { useEffect, useRef, useState } from 'react';
import { Bell, Check, Heart, MessageCircle, Sparkles } from 'lucide-react';
import { useDating } from '../../context/DatingContext';
import { UserAvatar } from '../ui/UserAvatar';

export const NotificationDropdown: React.FC = () => {
  const {
    notifications,
    unreadNotificationsCount,
    markNotificationRead,
    markAllNotificationsRead,
    navigate,
  } = useDating();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Notificações"
        className={`relative min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl border transition-colors ${
          open
            ? 'bg-lavender border-primary/40 text-primary-dark'
            : 'border-border bg-surface hover:bg-lavender/50 text-ink'
        }`}
      >
        <Bell className="w-5 h-5" />
        {unreadNotificationsCount > 0 && (
          <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-pink text-white text-[10px] font-bold flex items-center justify-center tabular-nums shadow-sm">
            {unreadNotificationsCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-surface rounded-2xl border border-border shadow-[0_20px_50px_rgba(37,35,51,0.14)] z-50 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-canvas">
            <span className="font-display text-sm font-semibold text-ink">
              Notificações
            </span>
            {unreadNotificationsCount > 0 && (
              <button
                type="button"
                onClick={markAllNotificationsRead}
                className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary-dark hover:underline whitespace-nowrap shrink-0"
              >
                <Check className="w-3.5 h-3.5" />
                Marcar todas como lidas
              </button>
            )}
          </div>

          <div className="max-h-80 overflow-y-auto divide-y divide-border">
            {notifications.length === 0 ? (
              <div className="p-6 text-center text-sm text-ink-muted">
                Nenhuma notificação recente.
              </div>
            ) : (
              notifications.map((n) => {
                const isRomantic = n.type === 'like' || n.type === 'match';
                const TypeIcon =
                  n.type === 'match'
                    ? Sparkles
                    : n.type === 'message'
                      ? MessageCircle
                      : Heart;

                return (
                  <button
                    key={n.id}
                    type="button"
                    onClick={() => {
                      markNotificationRead(n.id);
                      setOpen(false);
                      navigate(n.targetPage);
                    }}
                    className={`w-full text-left px-4 py-3.5 flex items-start gap-3 transition-colors ${
                      !n.read
                        ? 'bg-lavender/55 hover:bg-lavender/80'
                        : 'bg-surface hover:bg-canvas'
                    }`}
                  >
                    {n.avatarUrl ? (
                      <UserAvatar src={n.avatarUrl} name={n.title} size="sm" />
                    ) : (
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
                          isRomantic
                            ? 'bg-pink/12 text-pink'
                            : 'bg-lavender text-primary'
                        }`}
                      >
                        <TypeIcon className="w-4 h-4" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm font-semibold text-ink truncate">{n.title}</p>
                        <span className="text-[11px] text-ink-muted whitespace-nowrap shrink-0 tabular-nums">
                          {n.time}
                        </span>
                      </div>
                      <p className="text-xs text-ink-muted mt-0.5 line-clamp-2">{n.description}</p>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
};
