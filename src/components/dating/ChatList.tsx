import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { ChatMessage, MatchItem } from '../../types/dating';
import { UserAvatar } from '../ui/UserAvatar';
import { VerifiedBadge } from '../ui/VerifiedBadge';

interface ChatListProps {
  matches: MatchItem[];
  messagesByMatch: Record<string, ChatMessage[]>;
  selectedMatchId: string | null;
  onSelectMatch: (matchId: string) => void;
}

export const ChatList: React.FC<ChatListProps> = ({
  matches,
  messagesByMatch,
  selectedMatchId,
  onSelectMatch,
}) => {
  const [query, setQuery] = useState('');

  const filtered = matches.filter((m) =>
    m.profile.name.toLowerCase().includes(query.trim().toLowerCase())
  );

  return (
    <div className="flex flex-col h-full border-r border-border bg-surface">
      <div className="p-4 border-b border-border">
        <h2 className="font-display text-lg font-bold text-ink mb-3">Conversas</h2>
        <div className="relative">
          <Search className="w-4 h-4 text-ink-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar conversa..."
            className="w-full min-h-[40px] pl-9 pr-3 rounded-xl bg-canvas border border-border text-sm text-ink focus:outline-none focus:border-primary"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto divide-y divide-border/70">
        {filtered.length === 0 ? (
          <div className="p-6 text-center text-sm text-ink-muted">
            Nenhuma conversa encontrada.
          </div>
        ) : (
          filtered.map((match) => {
            const thread = messagesByMatch[match.id] ?? [];
            const lastMsg = thread[thread.length - 1];
            const preview = lastMsg
              ? lastMsg.imageUrl && !lastMsg.text
                ? 'Enviou uma foto'
                : lastMsg.text
              : 'Novo match — diga oi!';
            const active = selectedMatchId === match.id;

            return (
              <button
                key={match.id}
                type="button"
                onClick={() => onSelectMatch(match.id)}
                className={`w-full text-left px-4 py-3.5 flex items-center gap-3 transition-colors ${
                  active ? 'bg-lavender/75' : 'hover:bg-canvas'
                }`}
              >
                <UserAvatar
                  src={match.profile.photos[0]}
                  name={match.profile.name}
                  size="md"
                  online={match.profile.online}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1 min-w-0">
                      <span
                        className={`text-sm font-semibold truncate ${
                          active ? 'text-primary-dark' : 'text-ink'
                        }`}
                      >
                        {match.profile.name.split(' ')[0]}
                      </span>
                      <VerifiedBadge verified={match.profile.verified} />
                    </div>
                    <span className="text-[11px] text-ink-muted whitespace-nowrap shrink-0 tabular-nums">
                      {lastMsg?.timestamp ?? match.matchedAt.split('·')[0]}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-2 mt-0.5">
                    <p
                      className={`text-xs truncate ${
                        match.unreadCount > 0 ? 'font-semibold text-ink' : 'text-ink-muted'
                      }`}
                    >
                      {preview}
                    </p>
                    {match.unreadCount > 0 && (
                      <span className="min-w-[18px] h-[18px] px-1 rounded-full bg-pink text-white text-[10px] font-bold flex items-center justify-center shrink-0 tabular-nums">
                        {match.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            );
          })
        )}
      </div>
    </div>
  );
};
