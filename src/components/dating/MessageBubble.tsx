import React, { useState } from 'react';
import { Check, CheckCheck, ImageOff } from 'lucide-react';
import { ChatMessage } from '../../types/dating';

interface MessageBubbleProps {
  message: ChatMessage;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isMe = message.senderId === 'me';
  const [imgError, setImgError] = useState(false);

  return (
    <div className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
      <div
        className={`max-w-[78%] sm:max-w-[70%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
          isMe
            ? 'bg-primary text-white rounded-br-sm shadow-[0_6px_16px_rgba(112,40,232,0.18)]'
            : 'bg-lavender/65 border border-border text-ink rounded-bl-sm'
        }`}
      >
        {message.imageUrl && (
          <div className="mb-2 rounded-xl overflow-hidden bg-black/10">
            {!imgError ? (
              <img
                src={message.imageUrl}
                alt="Imagem compartilhada no chat"
                referrerPolicy="no-referrer"
                onError={() => setImgError(true)}
                className="w-full max-w-[260px] max-h-64 object-cover"
              />
            ) : (
              <div className="w-48 h-32 flex items-center justify-center text-xs gap-1.5 opacity-75">
                <ImageOff className="w-4 h-4" />
                <span>Imagem indisponível</span>
              </div>
            )}
          </div>
        )}
        {message.text && <p className="whitespace-pre-wrap break-words">{message.text}</p>}
      </div>

      <div className="flex items-center gap-1 mt-1 px-1 text-[11px] text-ink-muted tabular-nums">
        <span>{message.timestamp}</span>
        {isMe &&
          (message.read ? (
            <CheckCheck className="w-3.5 h-3.5 text-primary" aria-label="Lida" />
          ) : (
            <Check className="w-3.5 h-3.5 text-ink-muted" aria-label="Enviada" />
          ))}
      </div>
    </div>
  );
};
