import React, { useState } from 'react';
import { Compass, SlidersHorizontal } from 'lucide-react';
import { useDating } from '../context/DatingContext';
import { ProfileCard } from '../components/dating/ProfileCard';
import { SearchFilters } from '../components/dating/SearchFilters';
import { AppShell } from '../components/layout/AppShell';
import { EmptyState } from '../components/ui/EmptyState';
import { LoadingSkeleton } from '../components/ui/LoadingSkeleton';

export const DiscoverPage: React.FC = () => {
  const {
    discoverProfiles,
    likeProfile,
    dislikeProfile,
    undoLastSwipe,
    sendInterestMessage,
    canUndo,
    setInspectedProfile,
    currentUser,
    dailyLikesRemaining,
    filters,
    resetFilters,
  } = useDating();

  const [filtersOpen, setFiltersOpen] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const activeProfile = discoverProfiles[0];
  const hasActiveFilter =
    filters.onlyVerified ||
    filters.interests.length > 0 ||
    filters.query.trim().length > 0 ||
    filters.maxDistanceKm < 30;

  const handleResetAndReload = () => {
    setRefreshing(true);
    resetFilters();
    setTimeout(() => setRefreshing(false), 350);
  };

  return (
    <AppShell
      title="Descobrir"
      subtitle={
        currentUser.tier === 'free'
          ? `${dailyLikesRemaining} curtidas restantes hoje · ${currentUser.city}`
          : `Curtidas ilimitadas · ${currentUser.city}`
      }
      headerRightSlot={
        <button
          type="button"
          onClick={() => setFiltersOpen(true)}
          className={`min-h-[40px] px-3.5 py-2 rounded-xl border text-xs font-semibold inline-flex items-center gap-2 transition-colors whitespace-nowrap shrink-0 ${
            hasActiveFilter
              ? 'bg-primary border-primary text-white'
              : 'bg-surface border-border text-ink hover:bg-lavender/60'
          }`}
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span>Filtros</span>
        </button>
      }
    >
      <div className="p-4 sm:p-6 lg:p-8 flex flex-col items-center justify-center min-h-[calc(100vh-8rem)]">
        {refreshing ? (
          <LoadingSkeleton variant="card" />
        ) : activeProfile ? (
          <div className="w-full space-y-4">
            <ProfileCard
              profile={activeProfile}
              onLike={() => likeProfile(activeProfile, false)}
              onSuperLike={() => likeProfile(activeProfile, true)}
              onDislike={() => dislikeProfile(activeProfile)}
              onUndo={undoLastSwipe}
              canUndo={canUndo}
              onViewProfile={() => setInspectedProfile(activeProfile)}
              onSendInterest={(msg) => sendInterestMessage(activeProfile, msg)}
            />
            <p className="text-center text-xs text-ink-muted">
              Arraste o cartão para a direita para curtir ou para a esquerda para passar ·{' '}
              <span className="tabular-nums font-medium text-ink">{discoverProfiles.length}</span> perfis na fila
            </p>
          </div>
        ) : (
          <div className="max-w-md w-full">
            <EmptyState
              icon={Compass}
              title="Você explorou todos os perfis no momento"
              description="Amplie a distância máxima ou remova alguns filtros para descobrir novas pessoas perto de você."
              actionLabel={hasActiveFilter ? 'Limpar filtros' : 'Ajustar filtros'}
              onAction={() => (hasActiveFilter ? handleResetAndReload() : setFiltersOpen(true))}
            />
          </div>
        )}
      </div>

      <SearchFilters open={filtersOpen} onClose={() => setFiltersOpen(false)} />
    </AppShell>
  );
};
