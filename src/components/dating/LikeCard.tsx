import React from 'react';
import { Heart, Lock, MapPin, Star } from 'lucide-react';
import { BUTTON_VARIANTS } from '../../theme/tokens';
import { UserProfile } from '../../types/dating';
import { VerifiedBadge } from '../ui/VerifiedBadge';
import { ProfileGallery } from './ProfileGallery';

interface LikeCardProps {
  profile: UserProfile;
  locked: boolean;
  onLikeBack: () => void;
  onUnlock: () => void;
  onInspect: () => void;
}

export const LikeCard: React.FC<LikeCardProps> = ({
  profile,
  locked,
  onLikeBack,
  onUnlock,
  onInspect,
}) => {
  return (
    <article className="bg-surface rounded-3xl border border-border overflow-hidden flex flex-col shadow-[0_8px_24px_rgba(37,35,51,0.04)] hover:border-primary/35 transition-colors">
      <div
        className="relative cursor-pointer"
        onClick={() => (locked ? onUnlock() : onInspect())}
      >
        <ProfileGallery
          photos={profile.photos}
          name={profile.name}
          aspectClass="aspect-[3/4]"
          blurred={locked}
        />

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#161326]/88 via-[#161326]/38 to-transparent" />

        {locked && (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center bg-ink/25">
            <div className="w-11 h-11 rounded-full bg-lavender text-primary flex items-center justify-center mb-2 shadow-sm">
              <Lock className="w-5 h-5" />
            </div>
            <p className="text-xs font-semibold text-white">Exclusivo Premium</p>
          </div>
        )}

        <div className="absolute inset-x-0 bottom-0 p-4 text-white">
          <div className="flex items-center gap-1.5">
            <h3 className="font-display text-lg font-bold truncate">
              {locked ? 'Perfil interessado' : `${profile.name.split(' ')[0]}, ${profile.age}`}
            </h3>
            {!locked && <VerifiedBadge verified={profile.verified} inverted />}
          </div>
          <p className="text-xs text-white/85 flex items-center gap-1 mt-0.5 truncate">
            <MapPin className="w-3.5 h-3.5 shrink-0" />
            <span>
              {profile.city.split(',')[0]} · {profile.distanceKm} km
            </span>
          </p>
        </div>
      </div>

      <div className="p-4 flex flex-col gap-3">
        <div className="flex items-center justify-between text-xs text-ink-muted">
          <span>{profile.likedAt ?? 'Hoje'}</span>
          {profile.superLikedMe ? (
            <span className="inline-flex items-center gap-1 font-semibold text-pink">
              <Star className="w-3.5 h-3.5 fill-current" />
              Super Like
            </span>
          ) : (
            <span className="font-semibold text-pink tabular-nums">
              {profile.compatibility}% afinidade
            </span>
          )}
        </div>

        {locked ? (
          <button
            type="button"
            onClick={onUnlock}
            className={`w-full min-h-[44px] rounded-xl text-sm ${BUTTON_VARIANTS.primary}`}
          >
            Desbloquear curtidas
          </button>
        ) : (
          <button
            type="button"
            onClick={onLikeBack}
            className={`w-full min-h-[44px] rounded-xl text-sm inline-flex items-center justify-center gap-2 ${BUTTON_VARIANTS.romantic}`}
          >
            <Heart className="w-4 h-4 fill-current" />
            <span>Curtir de volta</span>
          </button>
        )}
      </div>
    </article>
  );
};
