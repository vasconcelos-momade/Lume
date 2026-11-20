import React, { useState } from 'react';
import { MessageCircle, UserMinus } from 'lucide-react';
import { BUTTON_VARIANTS } from '../../theme/tokens';
import { MatchItem } from '../../types/dating';
import { ConfirmationDialog } from '../ui/ConfirmationDialog';
import { OnlineIndicator } from '../ui/OnlineIndicator';
import { VerifiedBadge } from '../ui/VerifiedBadge';
import { ProfileGallery } from './ProfileGallery';

interface MatchCardProps {
  match: MatchItem;
  onStartChat: () => void;
  onUnmatch: () => void;
  onInspect: () => void;
}

export const MatchCard: React.FC<MatchCardProps> = ({
  match,
  onStartChat,
  onUnmatch,
  onInspect,
}) => {
  const [confirmOpen, setConfirmOpen] = useState(false);

  return (
    <>
      <article className="bg-surface rounded-3xl border border-border overflow-hidden flex flex-col shadow-[0_8px_24px_rgba(37,35,51,0.04)] hover:border-primary/35 transition-colors">
        <div className="relative cursor-pointer" onClick={onInspect}>
          <ProfileGallery
            photos={match.profile.photos}
            name={match.profile.name}
            aspectClass="aspect-[4/5]"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#161326]/88 via-[#161326]/38 to-transparent" />

          <div className="absolute inset-x-0 bottom-0 p-4 text-white">
            <div className="flex items-center gap-1.5">
              <h3 className="font-display text-lg font-bold truncate">
                {match.profile.name.split(' ')[0]}, {match.profile.age}
              </h3>
              <VerifiedBadge verified={match.profile.verified} inverted />
            </div>
            <p className="text-xs text-white/85 truncate">{match.profile.city}</p>
          </div>
        </div>

        <div className="p-4 flex flex-col gap-3">
          <div className="flex items-center justify-between text-xs">
            <OnlineIndicator
              online={match.profile.online}
              showLabel
              label={match.isNew ? 'Novo match' : match.lastActivity}
            />
            {match.isNew && <span className="font-semibold text-pink">Novo match</span>}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onStartChat}
              className={`flex-1 min-h-[44px] px-3 rounded-xl text-sm inline-flex items-center justify-center gap-2 whitespace-nowrap ${BUTTON_VARIANTS.primary}`}
            >
              <MessageCircle className="w-4 h-4" />
              <span>Conversar</span>
            </button>
            <button
              type="button"
              onClick={() => setConfirmOpen(true)}
              aria-label={`Desfazer match com ${match.profile.name}`}
              title="Desfazer match"
              className="min-h-[44px] min-w-[44px] rounded-xl border border-border bg-surface hover:border-error/40 hover:bg-error/5 text-ink-muted hover:text-error flex items-center justify-center transition-colors"
            >
              <UserMinus className="w-4 h-4" />
            </button>
          </div>
        </div>
      </article>

      <ConfirmationDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={onUnmatch}
        title="Desfazer match?"
        description={`Você deixará de ver ${match.profile.name.split(' ')[0]} na sua lista de matches e a conversa será encerrada.`}
        confirmLabel="Desfazer match"
        destructive
      />
    </>
  );
};
