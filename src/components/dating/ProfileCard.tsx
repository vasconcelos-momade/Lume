import React, { useState } from 'react';
import { motion, PanInfo, useMotionValue, useTransform } from 'motion/react';
import { Heart, Info, MapPin, RotateCcw, Send, Star, X } from 'lucide-react';
import { BUTTON_VARIANTS } from '../../theme/tokens';
import { UserProfile } from '../../types/dating';
import { OnlineIndicator } from '../ui/OnlineIndicator';
import { VerifiedBadge } from '../ui/VerifiedBadge';
import { ProfileGallery } from './ProfileGallery';

interface ProfileCardProps {
  profile: UserProfile;
  onLike: () => void;
  onDislike: () => void;
  onSuperLike: () => void;
  onViewProfile: () => void;
  onSendInterest: (message: string) => void;
  onUndo?: () => void;
  canUndo?: boolean;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({
  profile,
  onLike,
  onDislike,
  onSuperLike,
  onViewProfile,
  onSendInterest,
  onUndo,
  canUndo = false,
}) => {
  const [interestOpen, setInterestOpen] = useState(false);
  const [interestMessage, setInterestMessage] = useState('');

  const x = useMotionValue(0);
  const rotate = useTransform(x, [-220, 220], [-10, 10]);
  const likeOpacity = useTransform(x, [35, 130], [0, 1]);
  const nopeOpacity = useTransform(x, [-130, -35], [1, 0]);

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x > 110 || info.velocity.x > 500) {
      onLike();
    } else if (info.offset.x < -110 || info.velocity.x < -500) {
      onDislike();
    }
  };

  const handleInterestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!interestMessage.trim()) return;
    onSendInterest(interestMessage.trim());
    setInterestMessage('');
    setInterestOpen(false);
  };

  return (
    <div className="w-full max-w-[440px] mx-auto">
      <motion.article
        style={{ x, rotate }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.65}
        onDragEnd={handleDragEnd}
        whileDrag={{ scale: 1.01 }}
        className="relative bg-surface rounded-3xl border border-border shadow-[0_18px_46px_rgba(37,35,51,0.08)] overflow-hidden cursor-grab active:cursor-grabbing"
      >
        {/* Swipe Indicators */}
        <motion.div
          style={{ opacity: likeOpacity }}
          className="pointer-events-none absolute top-7 left-6 z-30 px-4 py-1.5 rounded-xl border-2 border-pink bg-surface/95 text-pink font-display font-bold text-base tracking-wide -rotate-12 shadow-sm"
        >
          CURTI
        </motion.div>
        <motion.div
          style={{ opacity: nopeOpacity }}
          className="pointer-events-none absolute top-7 right-6 z-30 px-4 py-1.5 rounded-xl border-2 border-error bg-surface/95 text-error font-display font-bold text-base tracking-wide rotate-12 shadow-sm"
        >
          PASSAR
        </motion.div>

        {/* Photo Gallery + Measured Contrast Scrim */}
        <div className="relative">
          <ProfileGallery photos={profile.photos} name={profile.name} aspectClass="aspect-[4/5]" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-52 bg-gradient-to-t from-[#161326]/92 via-[#161326]/48 to-transparent" />

          {/* Overlay Primary Info */}
          <div className="absolute inset-x-0 bottom-0 p-5 text-white z-20">
            <div className="flex items-end justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h2 className="font-display text-2xl font-bold tracking-tight truncate">
                    {profile.name.split(' ')[0]}, {profile.age}
                  </h2>
                  <VerifiedBadge verified={profile.verified} size="md" inverted />
                </div>

                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-1 text-xs text-white/90">
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
                    {profile.city}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="tabular-nums">{profile.distanceKm} km</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-semibold text-[#FF9EC0] tabular-nums">
                    {profile.compatibility}% compatível
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={onViewProfile}
                aria-label={`Ver perfil completo de ${profile.name}`}
                className="min-h-[44px] min-w-[44px] rounded-full bg-white/18 hover:bg-white/28 backdrop-blur-md text-white flex items-center justify-center transition-colors shrink-0"
              >
                <Info className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Clean Unboxed Bio & Interests Section */}
        <div className="p-5 space-y-3.5">
          <div className="flex items-center justify-between gap-2 text-xs">
            <OnlineIndicator online={profile.online} showLabel label={profile.lastActive} />
            <span className="font-semibold text-primary">{profile.intention}</span>
          </div>

          <p className="text-sm text-ink leading-relaxed line-clamp-3">{profile.bio}</p>

          <p className="text-xs text-ink-muted leading-relaxed pt-1 border-t border-border/70">
            {profile.interests.slice(0, 4).join(' · ')}
          </p>

          {/* Direct Send Interest Drawer inside card */}
          {interestOpen && (
            <form onSubmit={handleInterestSubmit} className="pt-3 border-t border-border space-y-2.5">
              <label className="block text-xs font-semibold text-ink">
                Envie uma mensagem direta com seu interesse
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={interestMessage}
                  onChange={(e) => setInterestMessage(e.target.value)}
                  placeholder={`Oi ${profile.name.split(' ')[0]}, adorei seu perfil...`}
                  className="flex-1 min-h-[44px] px-3.5 rounded-xl border border-border bg-canvas text-sm text-ink focus:outline-none focus:border-primary"
                />
                <button
                  type="submit"
                  className={`min-h-[44px] px-4 rounded-xl text-sm inline-flex items-center gap-1.5 shrink-0 ${BUTTON_VARIANTS.primary}`}
                >
                  <Send className="w-4 h-4" />
                  <span>Enviar</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </motion.article>

      {/* Action Buttons Bar: Romantic Pink for Like & Super Like, Purple for Interest & Undo */}
      <div className="mt-5 flex items-center justify-center gap-3 sm:gap-4">
        {onUndo && (
          <button
            type="button"
            onClick={onUndo}
            disabled={!canUndo}
            title="Desfazer último deslize"
            aria-label="Desfazer"
            className="w-11 h-11 rounded-full bg-surface border border-border text-ink-muted hover:text-primary hover:bg-lavender hover:border-primary/40 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center shadow-sm transition-all active:scale-95"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        )}

        <button
          type="button"
          onClick={onDislike}
          aria-label="Dislike"
          className="w-14 h-14 rounded-full bg-surface border border-border text-error hover:bg-error/5 hover:border-error/40 flex items-center justify-center shadow-sm transition-all active:scale-95"
        >
          <X className="w-6 h-6 stroke-[2.4]" />
        </button>

        <button
          type="button"
          onClick={onSuperLike}
          title="Super Like"
          aria-label="Super Like"
          className="w-12 h-12 rounded-full bg-surface border border-coral/40 text-pink hover:bg-pink/10 hover:border-pink flex items-center justify-center shadow-sm transition-all active:scale-95"
        >
          <Star className="w-5 h-5 fill-current" />
        </button>

        <button
          type="button"
          onClick={onLike}
          aria-label="Curtir"
          className="w-14 h-14 rounded-full bg-gradient-to-br from-pink to-coral text-white hover:brightness-105 flex items-center justify-center shadow-[0_10px_24px_rgba(255,79,135,0.34)] transition-all active:scale-95"
        >
          <Heart className="w-6 h-6 fill-current" />
        </button>

        <button
          type="button"
          onClick={() => setInterestOpen((v) => !v)}
          title="Enviar Interesse"
          aria-label="Enviar Interesse"
          className={`w-11 h-11 rounded-full border flex items-center justify-center shadow-sm transition-all active:scale-95 ${
            interestOpen
              ? 'bg-primary border-primary text-white'
              : 'bg-surface border-border text-primary hover:bg-lavender hover:border-primary/40'
          }`}
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
