import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { useDating } from '../context/DatingContext';
import { MatchCard } from '../components/dating/MatchCard';
import { AppShell } from '../components/layout/AppShell';
import { EmptyState } from '../components/ui/EmptyState';

export const MatchesPage: React.FC = () => {
  const { matches, openChatWithMatch, unmatchUser, setInspectedProfile, navigate } = useDating();
  const [tab, setTab] = useState<'all' | 'new' | 'online'>('all');

  const visibleMatches = matches.filter((m) => {
    if (tab === 'new') return m.isNew;
    if (tab === 'online') return m.profile.online;
    return true;
  });

  return (
    <AppShell
      title="Seus Matches"
      subtitle={`${matches.length} conexões mútuas prontas para conversar`}
    >
      <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto space-y-6">
        <div className="inline-flex items-center gap-1 p-1 rounded-xl bg-surface border border-border">
          <button
            type="button"
            onClick={() => setTab('all')}
            className={`min-h-[36px] px-4 rounded-lg text-xs font-semibold transition-colors ${
              tab === 'all' ? 'bg-lavender text-primary-dark' : 'text-ink-muted hover:text-ink'
            }`}
          >
            Todos ({matches.length})
          </button>
          <button
            type="button"
            onClick={() => setTab('new')}
            className={`min-h-[36px] px-4 rounded-lg text-xs font-semibold transition-colors ${
              tab === 'new' ? 'bg-lavender text-primary-dark' : 'text-ink-muted hover:text-ink'
            }`}
          >
            Novos ({matches.filter((m) => m.isNew).length})
          </button>
          <button
            type="button"
            onClick={() => setTab('online')}
            className={`min-h-[36px] px-4 rounded-lg text-xs font-semibold transition-colors ${
              tab === 'online'
                ? 'bg-lavender text-primary-dark'
                : 'text-ink-muted hover:text-ink'
            }`}
          >
            Online agora ({matches.filter((m) => m.profile.online).length})
          </button>
        </div>

        {visibleMatches.length === 0 ? (
          <EmptyState
            icon={Sparkles}
            title="Nenhum match por aqui ainda"
            description="Explore perfis na aba Descobrir e envie curtidas ou mensagens diretas para criar novas conexões mútuas."
            actionLabel="Explorar perfis"
            onAction={() => navigate('discover')}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {visibleMatches.map((match) => (
              <MatchCard
                key={match.id}
                match={match}
                onStartChat={() => openChatWithMatch(match.id)}
                onUnmatch={() => unmatchUser(match.id)}
                onInspect={() => setInspectedProfile(match.profile)}
              />
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
};
