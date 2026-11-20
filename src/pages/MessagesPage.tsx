import React, { useState } from 'react';
import { Briefcase, MapPin, MessageCircle, UserMinus } from 'lucide-react';
import { useDating } from '../context/DatingContext';
import { BUTTON_VARIANTS } from '../theme/tokens';
import { ChatList } from '../components/dating/ChatList';
import { ChatWindow } from '../components/dating/ChatWindow';
import { AppShell } from '../components/layout/AppShell';
import { ConfirmationDialog } from '../components/ui/ConfirmationDialog';
import { EmptyState } from '../components/ui/EmptyState';
import { VerifiedBadge } from '../components/ui/VerifiedBadge';

export const MessagesPage: React.FC = () => {
  const {
    matches,
    selectedMatchId,
    setSelectedMatchId,
    messagesByMatch,
    typingMatchId,
    sendMessage,
    markMatchRead,
    setInspectedProfile,
    unmatchUser,
    navigate,
  } = useDating();

  const [mobileThreadOpen, setMobileThreadOpen] = useState<boolean>(!!selectedMatchId);
  const [unmatchConfirmOpen, setUnmatchConfirmOpen] = useState(false);

  const activeMatch =
    matches.find((m) => m.id === selectedMatchId) ?? matches[0] ?? null;

  const handleSelectMatch = (id: string) => {
    setSelectedMatchId(id);
    markMatchRead(id);
    setMobileThreadOpen(true);
  };

  return (
    <AppShell
      title="Mensagens"
      subtitle="Converse em tempo real com seus matches"
      hideRightSidebar
      hideHeaderOnMobile={mobileThreadOpen && !!activeMatch}
    >
      {matches.length === 0 ? (
        <div className="p-6 max-w-lg mx-auto mt-10">
          <EmptyState
            icon={MessageCircle}
            title="Nenhuma conversa iniciada"
            description="Assim que você e alguém se curtirem mutuamente, o chat aparecerá aqui para vocês começarem a conversar."
            actionLabel="Descobrir pessoas"
            onAction={() => navigate('discover')}
          />
        </div>
      ) : (
        <div className="h-[calc(100vh-4rem)] lg:h-[calc(100vh-4rem)] grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
          {/* Left Conversation List */}
          <div
            className={`lg:col-span-4 xl:col-span-3 h-full overflow-hidden ${
              mobileThreadOpen ? 'hidden lg:block' : 'block'
            }`}
          >
            <ChatList
              matches={matches}
              messagesByMatch={messagesByMatch}
              selectedMatchId={activeMatch?.id ?? null}
              onSelectMatch={handleSelectMatch}
            />
          </div>

          {/* Central Conversation Window */}
          <div
            className={`lg:col-span-8 xl:col-span-6 h-full overflow-hidden ${
              mobileThreadOpen ? 'block' : 'hidden lg:block'
            }`}
          >
            {activeMatch ? (
              <ChatWindow
                match={activeMatch}
                messages={messagesByMatch[activeMatch.id] ?? []}
                isTyping={typingMatchId === activeMatch.id}
                onSendMessage={(text, img) => sendMessage(activeMatch.id, text, img)}
                onBack={() => setMobileThreadOpen(false)}
                onInspectProfile={() => setInspectedProfile(activeMatch.profile)}
              />
            ) : (
              <div className="h-full flex items-center justify-center p-6 text-sm text-ink-muted">
                Selecione uma conversa à esquerda para ler e responder mensagens.
              </div>
            )}
          </div>

          {/* Right Profile Information Panel (Desktop xl+) */}
          {activeMatch && (
            <aside className="hidden xl:flex xl:col-span-3 flex-col border-l border-border bg-canvas h-full overflow-y-auto p-5 space-y-5">
              <div className="rounded-2xl overflow-hidden border border-border aspect-[4/5] bg-surface shrink-0">
                <img
                  src={activeMatch.profile.photos[0]}
                  alt={activeMatch.profile.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-display text-lg font-bold text-ink">
                    {activeMatch.profile.name}, {activeMatch.profile.age}
                  </h3>
                  <VerifiedBadge verified={activeMatch.profile.verified} />
                </div>
                <p className="text-xs text-ink-muted flex items-center gap-1 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-primary" />
                  <span>
                    {activeMatch.profile.city} · {activeMatch.profile.distanceKm} km
                  </span>
                </p>
                <p className="text-xs text-ink-muted flex items-center gap-1 mt-1">
                  <Briefcase className="w-3.5 h-3.5 text-primary" />
                  <span>{activeMatch.profile.lifestyle.work}</span>
                </p>
              </div>

              <div className="pt-4 border-t border-border">
                <h4 className="text-xs font-semibold text-ink-muted mb-1.5">Biografia</h4>
                <p className="text-xs text-ink leading-relaxed">
                  {activeMatch.profile.bio}
                </p>
              </div>

              <div className="pt-4 border-t border-border">
                <h4 className="text-xs font-semibold text-ink-muted mb-1.5">Interesses</h4>
                <p className="text-xs text-ink leading-relaxed">
                  {activeMatch.profile.interests.join(' · ')}
                </p>
              </div>

              <div className="pt-4 border-t border-border space-y-2">
                <button
                  type="button"
                  onClick={() => setInspectedProfile(activeMatch.profile)}
                  className={`w-full min-h-[40px] rounded-xl text-xs ${BUTTON_VARIANTS.secondary}`}
                >
                  Ver perfil completo
                </button>
                <button
                  type="button"
                  onClick={() => setUnmatchConfirmOpen(true)}
                  className="w-full min-h-[40px] rounded-xl border border-border bg-surface hover:bg-error/5 text-xs font-semibold text-error inline-flex items-center justify-center gap-1.5 transition-colors"
                >
                  <UserMinus className="w-3.5 h-3.5" />
                  <span>Desfazer match</span>
                </button>
              </div>
            </aside>
          )}
        </div>
      )}

      {activeMatch && (
        <ConfirmationDialog
          open={unmatchConfirmOpen}
          onClose={() => setUnmatchConfirmOpen(false)}
          onConfirm={() => {
            unmatchUser(activeMatch.id);
            setMobileThreadOpen(false);
          }}
          title="Desfazer match?"
          description={`A conversa com ${activeMatch.profile.name.split(' ')[0]} será encerrada imediatamente.`}
          confirmLabel="Desfazer match"
          destructive
        />
      )}
    </AppShell>
  );
};
