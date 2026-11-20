import React from 'react';
import { MessageCircle, Sparkles } from 'lucide-react';
import { useDating } from '../../context/DatingContext';
import { BUTTON_VARIANTS } from '../../theme/tokens';
import { Modal } from '../ui/Modal';
import { UserAvatar } from '../ui/UserAvatar';

export const MatchCelebrationModal: React.FC = () => {
  const { celebrationMatch, closeCelebrationMatch, openChatWithMatch, currentUser } = useDating();

  if (!celebrationMatch) return null;

  return (
    <Modal open={!!celebrationMatch} onClose={closeCelebrationMatch} maxWidthClass="max-w-md">
      <div className="text-center space-y-5 py-2">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink to-coral text-white flex items-center justify-center mx-auto shadow-[0_10px_24px_rgba(255,79,135,0.3)]">
          <Sparkles className="w-7 h-7" />
        </div>

        <div>
          <h2 className="font-display text-2xl font-bold text-ink">Deu Match!</h2>
          <p className="text-sm text-ink-muted mt-1">
            Você e{' '}
            <strong className="text-ink">{celebrationMatch.profile.name.split(' ')[0]}</strong>{' '}
            demonstraram interesse mútuo.
          </p>
        </div>

        <div className="flex items-center justify-center gap-3 py-2">
          <UserAvatar src={currentUser.photos[0]} name={currentUser.name} size="xl" />
          <UserAvatar
            src={celebrationMatch.profile.photos[0]}
            name={celebrationMatch.profile.name}
            size="xl"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            type="button"
            onClick={closeCelebrationMatch}
            className={`flex-1 min-h-[44px] px-4 rounded-xl text-sm ${BUTTON_VARIANTS.secondary}`}
          >
            Continuar descobrindo
          </button>
          <button
            type="button"
            onClick={() => {
              const id = celebrationMatch.id;
              closeCelebrationMatch();
              openChatWithMatch(id);
            }}
            className={`flex-1 min-h-[44px] px-4 rounded-xl text-sm inline-flex items-center justify-center gap-2 ${BUTTON_VARIANTS.primary}`}
          >
            <MessageCircle className="w-4 h-4" />
            <span>Enviar mensagem</span>
          </button>
        </div>
      </div>
    </Modal>
  );
};
