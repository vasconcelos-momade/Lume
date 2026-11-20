import React, { useState } from 'react';
import { Briefcase, GraduationCap, Heart, MapPin, Ruler, Send, Star, Wine, X } from 'lucide-react';
import { useDating } from '../../context/DatingContext';
import { BUTTON_VARIANTS } from '../../theme/tokens';
import { Modal } from '../ui/Modal';
import { OnlineIndicator } from '../ui/OnlineIndicator';
import { VerifiedBadge } from '../ui/VerifiedBadge';
import { ProfileGallery } from './ProfileGallery';

export const ProfileDetailModal: React.FC = () => {
  const {
    inspectedProfile,
    setInspectedProfile,
    likeProfile,
    dislikeProfile,
    sendInterestMessage,
  } = useDating();
  const [note, setNote] = useState('');

  if (!inspectedProfile) return null;

  const profile = inspectedProfile;

  return (
    <Modal
      open={!!inspectedProfile}
      onClose={() => setInspectedProfile(null)}
      maxWidthClass="max-w-2xl"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <ProfileGallery
            photos={profile.photos}
            name={profile.name}
            aspectClass="aspect-[3/4]"
            className="rounded-2xl"
          />

          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-display text-2xl font-bold text-ink">
                  {profile.name}, {profile.age}
                </h2>
                <VerifiedBadge verified={profile.verified} size="md" />
              </div>
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-ink-muted mt-1">
                <span className="inline-flex items-center gap-1">
                  <MapPin className="w-4 h-4 text-primary" />
                  {profile.city}
                </span>
                <span aria-hidden="true">·</span>
                <span className="tabular-nums">{profile.distanceKm} km</span>
                <span aria-hidden="true">·</span>
                <span className="font-semibold text-pink tabular-nums">
                  {profile.compatibility}% compatível
                </span>
              </div>
              <div className="mt-2">
                <OnlineIndicator online={profile.online} showLabel label={profile.lastActive} />
              </div>
            </div>

            <div className="pt-3 border-t border-border">
              <h3 className="text-xs font-semibold text-ink-muted mb-1.5">Sobre</h3>
              <p className="text-sm text-ink leading-relaxed">{profile.bio}</p>
            </div>

            <div className="pt-3 border-t border-border">
              <h3 className="text-xs font-semibold text-ink-muted mb-2">Estilo de vida</h3>
              <dl className="grid grid-cols-1 gap-2 text-xs text-ink">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-primary shrink-0" />
                  <span>{profile.lifestyle.work}</span>
                </div>
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-primary shrink-0" />
                  <span>{profile.lifestyle.education}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Ruler className="w-4 h-4 text-primary shrink-0" />
                  <span>
                    {profile.lifestyle.height} · Exercício: {profile.lifestyle.exercise}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Wine className="w-4 h-4 text-primary shrink-0" />
                  <span>
                    {profile.lifestyle.drinking} · {profile.lifestyle.smoking}
                  </span>
                </div>
              </dl>
            </div>

            <div className="pt-3 border-t border-border">
              <h3 className="text-xs font-semibold text-ink-muted mb-1.5">Interesses</h3>
              <p className="text-sm text-ink">{profile.interests.join(' · ')}</p>
            </div>
          </div>
        </div>

        {/* Direct Interest Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!note.trim()) return;
            sendInterestMessage(profile, note.trim());
            setNote('');
            setInspectedProfile(null);
          }}
          className="pt-4 border-t border-border flex flex-col sm:flex-row gap-2.5"
        >
          <input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder={`Envie uma nota de interesse para ${profile.name.split(' ')[0]}...`}
            className="flex-1 min-h-[44px] px-4 rounded-xl border border-border bg-canvas text-sm text-ink focus:outline-none focus:border-primary"
          />
          <button
            type="submit"
            className={`min-h-[44px] px-5 rounded-xl text-sm inline-flex items-center justify-center gap-2 whitespace-nowrap shrink-0 ${BUTTON_VARIANTS.primary}`}
          >
            <Send className="w-4 h-4" />
            <span>Enviar Interesse</span>
          </button>
        </form>

        {/* Bottom Decision Bar */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
          <button
            type="button"
            onClick={() => {
              dislikeProfile(profile);
              setInspectedProfile(null);
            }}
            className="min-h-[44px] px-5 rounded-xl border border-border bg-surface text-error hover:bg-error/5 text-sm font-medium inline-flex items-center gap-2 transition-colors"
          >
            <X className="w-4 h-4" />
            <span>Passar</span>
          </button>
          <button
            type="button"
            onClick={() => {
              likeProfile(profile, true);
              setInspectedProfile(null);
            }}
            className="min-h-[44px] px-5 rounded-xl border border-coral/40 bg-surface text-pink hover:bg-pink/10 text-sm font-semibold inline-flex items-center gap-2 transition-colors"
          >
            <Star className="w-4 h-4 fill-current" />
            <span>Super Like</span>
          </button>
          <button
            type="button"
            onClick={() => {
              likeProfile(profile, false);
              setInspectedProfile(null);
            }}
            className={`min-h-[44px] px-6 rounded-xl text-sm inline-flex items-center gap-2 ${BUTTON_VARIANTS.romantic}`}
          >
            <Heart className="w-4 h-4 fill-current" />
            <span>Curtir</span>
          </button>
        </div>
      </div>
    </Modal>
  );
};
