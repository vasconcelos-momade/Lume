import React from 'react';
import { ArrowRight, Heart } from 'lucide-react';
import { useDating } from '../../context/DatingContext';
import { UserAvatar } from '../ui/UserAvatar';
import { VerifiedBadge } from '../ui/VerifiedBadge';

export const RightSidebar: React.FC = () => {
  const {
    allProfiles,
    matches,
    navigate,
    openChatWithMatch,
    setInspectedProfile,
    likeProfile,
  } = useDating();

  const onlineUsers = allProfiles.filter((p) => p.online).slice(0, 4);
  const recommended = allProfiles.slice(0, 3);
  const recentMatches = matches.slice(0, 3);

  return (
    <aside className="hidden xl:flex flex-col w-80 shrink-0 border-l border-border bg-canvas h-screen sticky top-0 overflow-y-auto px-5 py-6 space-y-7">
      {/* Online Users */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-display text-sm font-semibold text-ink">Online agora</h2>
          <span className="text-xs text-ink-muted tabular-nums">{onlineUsers.length} perto</span>
        </div>
        <div className="grid grid-cols-4 gap-2.5">
          {onlineUsers.map((person) => (
            <button
              key={person.id}
              type="button"
              onClick={() => setInspectedProfile(person)}
              className="flex flex-col items-center gap-1.5 group"
            >
              <UserAvatar src={person.photos[0]} name={person.name} size="md" online={true} />
              <span className="text-xs text-ink group-hover:text-primary truncate max-w-full font-medium transition-colors">
                {person.name.split(' ')[0]}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Recent Matches */}
      <section className="pt-5 border-t border-border">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-display text-sm font-semibold text-ink">Matches recentes</h2>
          <button
            type="button"
            onClick={() => navigate('matches')}
            className="text-xs font-semibold text-primary hover:text-primary-dark hover:underline inline-flex items-center gap-1"
          >
            <span>Ver todos</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {recentMatches.length === 0 ? (
          <p className="text-xs text-ink-muted">Seus matches recentes aparecerão aqui.</p>
        ) : (
          <div className="space-y-2.5">
            {recentMatches.map((match) => (
              <button
                key={match.id}
                type="button"
                onClick={() => openChatWithMatch(match.id)}
                className="w-full flex items-center gap-3 p-2.5 rounded-2xl bg-surface border border-border hover:border-primary/40 hover:bg-lavender/35 transition-colors text-left"
              >
                <UserAvatar
                  src={match.profile.photos[0]}
                  name={match.profile.name}
                  size="sm"
                  online={match.profile.online}
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-semibold text-ink truncate">
                      {match.profile.name.split(' ')[0]}, {match.profile.age}
                    </span>
                    <VerifiedBadge verified={match.profile.verified} />
                  </div>
                  <p className="text-xs text-ink-muted truncate">{match.lastActivity}</p>
                </div>
                {match.unreadCount > 0 && (
                  <span className="w-5 h-5 rounded-full bg-pink text-white text-[11px] font-bold flex items-center justify-center tabular-nums">
                    {match.unreadCount}
                  </span>
                )}
              </button>
            ))}
          </div>
        )}
      </section>

      {/* Recommended Profiles / Suggested Connections */}
      <section className="pt-5 border-t border-border">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-display text-sm font-semibold text-ink">Sugestões para você</h2>
          <span className="text-xs font-medium text-primary">Alta afinidade</span>
        </div>
        <div className="space-y-3">
          {recommended.map((person) => (
            <div
              key={person.id}
              className="flex items-center justify-between gap-3 p-3 rounded-2xl bg-surface border border-border hover:border-primary/30 transition-colors"
            >
              <button
                type="button"
                onClick={() => setInspectedProfile(person)}
                className="flex items-center gap-3 min-w-0 text-left flex-1"
              >
                <UserAvatar src={person.photos[0]} name={person.name} size="md" online={person.online} />
                <div className="min-w-0">
                  <div className="flex items-center gap-1">
                    <p className="text-sm font-semibold text-ink truncate">
                      {person.name.split(' ')[0]}, {person.age}
                    </p>
                    <VerifiedBadge verified={person.verified} />
                  </div>
                  <p className="text-xs text-ink-muted truncate">
                    <span className="text-pink font-semibold tabular-nums">
                      {person.compatibility}%
                    </span>{' '}
                    compatível · {person.distanceKm} km
                  </p>
                </div>
              </button>
              <button
                type="button"
                onClick={() => likeProfile(person)}
                aria-label={`Curtir ${person.name}`}
                className="w-9 h-9 rounded-full bg-pink/12 hover:bg-pink text-pink hover:text-white flex items-center justify-center transition-colors shrink-0 active:scale-95"
              >
                <Heart className="w-4 h-4 fill-current" />
              </button>
            </div>
          ))}
        </div>
      </section>
    </aside>
  );
};
