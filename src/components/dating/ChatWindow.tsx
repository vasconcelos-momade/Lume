import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft, Image as ImageIcon, Info, Send, Smile } from 'lucide-react';
import { BUTTON_VARIANTS } from '../../theme/tokens';
import { ChatMessage, MatchItem } from '../../types/dating';
import { PORTRAIT_GALLERY } from '../../utils/editorialPortraits';
import { OnlineIndicator } from '../ui/OnlineIndicator';
import { UserAvatar } from '../ui/UserAvatar';
import { VerifiedBadge } from '../ui/VerifiedBadge';
import { MessageBubble } from './MessageBubble';

interface ChatWindowProps {
  match: MatchItem;
  messages: ChatMessage[];
  isTyping: boolean;
  onSendMessage: (text?: string, imageUrl?: string) => void;
  onBack?: () => void;
  onInspectProfile: () => void;
}

const QUICK_EMOJIS = ['😊', '❤️', '☕', '✨', '🍷', '🎬', '🙌', '😄'];
const SAMPLE_SHARED_PHOTOS = [PORTRAIT_GALLERY.chatDinner, PORTRAIT_GALLERY.heroCouple];

export const ChatWindow: React.FC<ChatWindowProps> = ({
  match,
  messages,
  isTyping,
  onSendMessage,
  onBack,
  onInspectProfile,
}) => {
  const [draft, setDraft] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showPhotoPicker, setShowPhotoPicker] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length, isTyping]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft.trim()) return;
    onSendMessage(draft.trim());
    setDraft('');
    setShowEmojiPicker(false);
  };

  return (
    <div className="flex flex-col h-full bg-surface">
      {/* Top Chat Header */}
      <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-border bg-surface shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              aria-label="Voltar para conversas"
              className="lg:hidden min-h-[44px] min-w-[44px] -ml-2 flex items-center justify-center rounded-xl text-ink hover:bg-lavender/60"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
          <button
            type="button"
            onClick={onInspectProfile}
            className="flex items-center gap-3 min-w-0 text-left"
          >
            <UserAvatar
              src={match.profile.photos[0]}
              name={match.profile.name}
              size="md"
              online={match.profile.online}
            />
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <h3 className="font-display text-sm sm:text-base font-semibold text-ink truncate">
                  {match.profile.name}
                </h3>
                <VerifiedBadge verified={match.profile.verified} />
              </div>
              <OnlineIndicator
                online={match.profile.online}
                showLabel
                label={isTyping ? 'Digitando...' : match.profile.lastActive}
              />
            </div>
          </button>
        </div>

        <button
          type="button"
          onClick={onInspectProfile}
          aria-label="Ver perfil"
          className="min-h-[44px] min-w-[44px] rounded-xl border border-border hover:bg-lavender/60 text-ink-muted hover:text-ink flex items-center justify-center transition-colors shrink-0"
        >
          <Info className="w-5 h-5" />
        </button>
      </div>

      {/* Messages Feed */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
        <div className="text-center py-2">
          <p className="text-xs text-ink-muted">
            Vocês deram match {match.matchedAt.toLowerCase()} · Quebre o gelo com autenticidade
          </p>
        </div>

        {messages.length === 0 && (
          <div className="max-w-sm mx-auto p-5 rounded-2xl bg-canvas border border-border text-center space-y-3">
            <p className="text-sm text-ink font-medium">
              Comece a conversa com {match.profile.name.split(' ')[0]}
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {[
                `Oi ${match.profile.name.split(' ')[0]}! Tudo bem?`,
                `Adorei seu interesse em ${match.profile.interests[0] ?? 'viagens'}!`,
              ].map((starter) => (
                <button
                  key={starter}
                  type="button"
                  onClick={() => onSendMessage(starter)}
                  className="text-xs px-3.5 py-2 rounded-xl bg-lavender/70 border border-primary/20 hover:bg-lavender text-primary-dark font-semibold transition-colors"
                >
                  {starter}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}

        {isTyping && (
          <div className="flex items-start">
            <div className="px-4 py-2.5 rounded-2xl rounded-bl-sm bg-lavender text-xs font-medium text-primary-dark">
              {match.profile.name.split(' ')[0]} está digitando...
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Emoji / Photo Popovers */}
      {showEmojiPicker && (
        <div className="px-4 py-2.5 border-t border-border bg-canvas flex items-center gap-2 overflow-x-auto">
          {QUICK_EMOJIS.map((emoji) => (
            <button
              key={emoji}
              type="button"
              onClick={() => setDraft((d) => `${d}${emoji}`)}
              className="min-h-[38px] min-w-[38px] rounded-xl bg-surface border border-border hover:border-primary hover:bg-lavender/50 text-lg flex items-center justify-center transition-colors"
            >
              {emoji}
            </button>
          ))}
        </div>
      )}

      {showPhotoPicker && (
        <div className="px-4 py-3 border-t border-border bg-canvas flex items-center gap-3">
          <span className="text-xs font-medium text-ink-muted whitespace-nowrap">
            Enviar foto rápida:
          </span>
          {SAMPLE_SHARED_PHOTOS.map((img, i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                onSendMessage(undefined, img);
                setShowPhotoPicker(false);
              }}
              className="w-14 h-14 rounded-xl overflow-hidden border border-border hover:border-primary transition-colors shrink-0"
            >
              <img
                src={img}
                alt={`Foto sugerida ${i + 1}`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Fixed Bottom Input */}
      <form
        onSubmit={handleSubmit}
        className="p-3 sm:p-4 border-t border-border bg-surface flex items-center gap-2 shrink-0"
      >
        <button
          type="button"
          onClick={() => {
            setShowEmojiPicker((v) => !v);
            setShowPhotoPicker(false);
          }}
          aria-label="Inserir emoji"
          className={`min-h-[44px] min-w-[44px] rounded-xl flex items-center justify-center transition-colors shrink-0 ${
            showEmojiPicker
              ? 'bg-lavender text-primary-dark'
              : 'text-ink-muted hover:bg-lavender/60 hover:text-ink'
          }`}
        >
          <Smile className="w-5 h-5" />
        </button>

        <button
          type="button"
          onClick={() => {
            setShowPhotoPicker((v) => !v);
            setShowEmojiPicker(false);
          }}
          aria-label="Compartilhar imagem"
          className={`min-h-[44px] min-w-[44px] rounded-xl flex items-center justify-center transition-colors shrink-0 ${
            showPhotoPicker
              ? 'bg-lavender text-primary-dark'
              : 'text-ink-muted hover:bg-lavender/60 hover:text-ink'
          }`}
        >
          <ImageIcon className="w-5 h-5" />
        </button>

        <input
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder={`Escreva para ${match.profile.name.split(' ')[0]}...`}
          className="flex-1 min-h-[44px] px-4 rounded-xl bg-canvas border border-border text-sm text-ink focus:outline-none focus:border-primary"
        />

        <button
          type="submit"
          disabled={!draft.trim()}
          aria-label="Enviar mensagem"
          className={`min-h-[44px] min-w-[44px] px-4 rounded-xl disabled:opacity-40 inline-flex items-center justify-center gap-1.5 shrink-0 ${BUTTON_VARIANTS.primary}`}
        >
          <Send className="w-4 h-4" />
          <span className="hidden sm:inline text-sm">Enviar</span>
        </button>
      </form>
    </div>
  );
};
