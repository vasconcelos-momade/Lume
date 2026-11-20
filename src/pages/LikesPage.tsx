import React, { useState } from 'react';
import { Crown, Heart } from 'lucide-react';
import { useDating } from '../context/DatingContext';
import { BUTTON_VARIANTS } from '../theme/tokens';
import { LikeCard } from '../components/dating/LikeCard';
import { AppShell } from '../components/layout/AppShell';
import { EmptyState } from '../components/ui/EmptyState';

export const LikesPage: React.FC = () => {
  const { likesMe, currentUser, likeBackFromLikes, navigate, setInspectedProfile } = useDating();
  const [filter, setFilter] = useState<'all' | 'super'>('all');

  const isFree = currentUser.tier === 'free';
  const filteredLikes =
    filter === 'super' ? likesMe.filter((p) => p.superLikedMe) : likesMe;

  return (
    <AppShell
      title="Curtidas recebidas"
      subtitle={`${likesMe.length} pessoas demonstraram interesse no seu perfil`}
    >
      <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto space-y-6">
        {isFree && likesMe.length > 0 && (
          <div className="p-5 rounded-3xl bg-lavender/65 border border-primary/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-surface border border-border text-primary flex items-center justify-center shrink-0">
                <Crown className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-display text-base font-semibold text-ink">
                  Veja quem já curtiu você sem esperar pelo match
                </h2>
                <p className="text-xs sm:text-sm text-ink-muted mt-0.5">
                  No plano Free apenas a primeira prévia aparece aberta. Assine Premium para revelar todos os perfis.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => navigate('subscription')}
              className={`min-h-[44px] px-5 rounded-xl text-sm whitespace-nowrap shrink-0 ${BUTTON_VARIANTS.primary}`}
            >
              Liberar curtidas
            </button>
          </div>
        )}

        {/* Filter Bar */}
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="inline-flex items-center gap-1 p-1 rounded-xl bg-surface border border-border">
            <button
              type="button"
              onClick={() => setFilter('all')}
              className={`min-h-[36px] px-4 rounded-lg text-xs font-semibold transition-colors ${
                filter === 'all'
                  ? 'bg-lavender text-primary-dark'
                  : 'text-ink-muted hover:text-ink'
              }`}
            >
              Todas ({likesMe.length})
            </button>
            <button
              type="button"
              onClick={() => setFilter('super')}
              className={`min-h-[36px] px-4 rounded-lg text-xs font-semibold transition-colors ${
                filter === 'super'
                  ? 'bg-lavender text-primary-dark'
                  : 'text-ink-muted hover:text-ink'
              }`}
            >
              Super Likes ({likesMe.filter((p) => p.superLikedMe).length})
            </button>
          </div>
        </div>

        {filteredLikes.length === 0 ? (
          <EmptyState
            icon={Heart}
            title="Nenhuma curtida pendente nessa categoria"
            description="Continue descobrindo novos perfis e mantenha suas fotos atualizadas para receber ainda mais interesse."
            actionLabel="Voltar para Descobrir"
            onAction={() => navigate('discover')}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredLikes.map((person, index) => (
              <LikeCard
                key={person.id}
                profile={person}
                locked={isFree && index > 0}
                onLikeBack={() => likeBackFromLikes(person)}
                onUnlock={() => navigate('subscription')}
                onInspect={() => setInspectedProfile(person)}
              />
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
};
