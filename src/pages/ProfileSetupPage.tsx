import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Check, MapPin, Plus, Trash2 } from 'lucide-react';
import { useDating } from '../context/DatingContext';
import { AVAILABLE_INTERESTS } from '../data/mockData';
import { BUTTON_VARIANTS } from '../theme/tokens';
import { CurrentUser, RelationshipGoal } from '../types/dating';
import { PORTRAIT_GALLERY } from '../utils/editorialPortraits';
import { ProfileGallery } from '../components/dating/ProfileGallery';
import { VerifiedBadge } from '../components/ui/VerifiedBadge';

const STEPS = [
  'Informações pessoais',
  'Preferências',
  'Localização',
  'Fotos do perfil',
  'Biografia',
  'Interesses',
  'Intenções',
  'Prévia do perfil',
];

const EXTRA_PORTRAIT_OPTIONS = [
  PORTRAIT_GALLERY.currentUser,
  PORTRAIT_GALLERY.rafael2,
  PORTRAIT_GALLERY.gabriel1,
  PORTRAIT_GALLERY.camila1,
  PORTRAIT_GALLERY.sofia1,
  PORTRAIT_GALLERY.beatriz1,
];

const GOALS: RelationshipGoal[] = [
  'Relacionamento sério',
  'Conhecer pessoas novas',
  'Algo sem pressa',
  'Amizade e conexões',
];

export const ProfileSetupPage: React.FC = () => {
  const { currentUser, updateCurrentUser, completeProfileSetup } = useDating();
  const [step, setStep] = useState(0);

  const toggleLookingFor = (val: 'Feminino' | 'Masculino' | 'Todos') => {
    const exists = currentUser.lookingFor.includes(val);
    if (exists && currentUser.lookingFor.length === 1) return;
    updateCurrentUser({
      lookingFor: exists
        ? currentUser.lookingFor.filter((item) => item !== val)
        : [...currentUser.lookingFor, val],
    });
  };

  const toggleInterest = (interest: string) => {
    const exists = currentUser.interests.includes(interest);
    updateCurrentUser({
      interests: exists
        ? currentUser.interests.filter((i) => i !== interest)
        : [...currentUser.interests, interest].slice(0, 8),
    });
  };

  const addSamplePhoto = (url: string) => {
    if (currentUser.photos.includes(url)) return;
    updateCurrentUser({ photos: [...currentUser.photos, url].slice(0, 6) });
  };

  const removePhoto = (index: number) => {
    if (currentUser.photos.length <= 1) return;
    updateCurrentUser({
      photos: currentUser.photos.filter((_, i) => i !== index),
    });
  };

  const progress = Math.round(((step + 1) / STEPS.length) * 100);

  return (
    <div className="min-h-screen bg-canvas py-8 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Top Progress Header */}
        <div className="bg-surface rounded-3xl border border-border p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <span className="font-display text-lg font-bold text-primary">Lume</span>
              <h1 className="font-display text-xl font-bold text-ink mt-1">
                Etapa {step + 1} de {STEPS.length}: {STEPS[step]}
              </h1>
            </div>
            <span className="font-mono text-sm font-semibold text-primary tabular-nums">
              {progress}%
            </span>
          </div>

          <div className="mt-4 h-2 w-full rounded-full bg-lavender overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-pink transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Clickable Step Navigation */}
          <div className="mt-4 flex items-center gap-1.5 overflow-x-auto pb-1">
            {STEPS.map((label, idx) => (
              <button
                key={label}
                type="button"
                onClick={() => setStep(idx)}
                className={`min-h-[34px] px-3 py-1 rounded-xl text-xs font-semibold whitespace-nowrap shrink-0 transition-colors ${
                  idx === step
                    ? 'bg-primary text-white'
                    : idx < step
                      ? 'bg-lavender text-primary-dark'
                      : 'bg-canvas text-ink-muted hover:text-ink'
                }`}
              >
                {idx + 1}. {label}
              </button>
            ))}
          </div>
        </div>

        {/* Step Content Card */}
        <div className="bg-surface rounded-3xl border border-border p-6 sm:p-8">
          {step === 0 && (
            <div className="space-y-4">
              <h2 className="font-display text-lg font-semibold text-ink">
                Informações pessoais
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-ink mb-1.5">
                    Nome exibido
                  </label>
                  <input
                    type="text"
                    value={currentUser.name}
                    onChange={(e) => updateCurrentUser({ name: e.target.value })}
                    className="w-full min-h-[44px] px-4 rounded-xl border border-border bg-canvas text-sm text-ink focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-ink mb-1.5">
                    Profissão
                  </label>
                  <input
                    type="text"
                    value={currentUser.lifestyle.work}
                    onChange={(e) =>
                      updateCurrentUser({
                        lifestyle: { ...currentUser.lifestyle, work: e.target.value },
                      })
                    }
                    className="w-full min-h-[44px] px-4 rounded-xl border border-border bg-canvas text-sm text-ink focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-ink mb-1.5">
                    Formação
                  </label>
                  <input
                    type="text"
                    value={currentUser.lifestyle.education}
                    onChange={(e) =>
                      updateCurrentUser({
                        lifestyle: { ...currentUser.lifestyle, education: e.target.value },
                      })
                    }
                    className="w-full min-h-[44px] px-4 rounded-xl border border-border bg-canvas text-sm text-ink focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-ink mb-1.5">
                    Altura
                  </label>
                  <input
                    type="text"
                    value={currentUser.lifestyle.height}
                    onChange={(e) =>
                      updateCurrentUser({
                        lifestyle: { ...currentUser.lifestyle, height: e.target.value },
                      })
                    }
                    className="w-full min-h-[44px] px-4 rounded-xl border border-border bg-canvas text-sm text-ink focus:outline-none focus:border-primary"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="font-display text-lg font-semibold text-ink mb-3">
                  Seu gênero
                </h2>
                <div className="grid grid-cols-3 gap-3">
                  {(['Feminino', 'Masculino', 'Não-binário'] as CurrentUser['gender'][]).map(
                    (g) => (
                      <button
                        key={g}
                        type="button"
                        onClick={() => updateCurrentUser({ gender: g })}
                        className={`min-h-[46px] rounded-xl border text-sm font-semibold transition-colors ${
                          currentUser.gender === g
                            ? 'bg-lavender border-primary text-primary-dark'
                            : 'bg-canvas border-border text-ink hover:border-primary/40'
                        }`}
                      >
                        {g}
                      </button>
                    )
                  )}
                </div>
              </div>

              <div>
                <h3 className="font-display text-base font-semibold text-ink mb-3">
                  Quem você gostaria de conhecer?
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  {(['Feminino', 'Masculino', 'Todos'] as const).map((pref) => {
                    const active = currentUser.lookingFor.includes(pref);
                    return (
                      <button
                        key={pref}
                        type="button"
                        onClick={() => toggleLookingFor(pref)}
                        className={`min-h-[46px] rounded-xl border text-sm font-semibold transition-colors ${
                          active
                            ? 'bg-pink/12 border-pink text-pink'
                            : 'bg-canvas border-border text-ink hover:border-pink/40'
                        }`}
                      >
                        {pref}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h2 className="font-display text-lg font-semibold text-ink">
                Onde você está?
              </h2>
              <p className="text-sm text-ink-muted">
                Usamos apenas sua cidade e distância aproximada para sugerir encontros próximos.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-ink mb-1.5">
                    Cidade
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-primary absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={currentUser.city}
                      onChange={(e) => updateCurrentUser({ city: e.target.value })}
                      className="w-full min-h-[44px] pl-10 pr-4 rounded-xl border border-border bg-canvas text-sm text-ink focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-ink mb-1.5">
                    Estado
                  </label>
                  <input
                    type="text"
                    value={currentUser.state}
                    onChange={(e) => updateCurrentUser({ state: e.target.value })}
                    className="w-full min-h-[44px] px-4 rounded-xl border border-border bg-canvas text-sm text-ink focus:outline-none focus:border-primary"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-5">
              <div>
                <h2 className="font-display text-lg font-semibold text-ink">
                  Fotos do seu perfil
                </h2>
                <p className="text-sm text-ink-muted mt-1">
                  Perfis com 3 ou mais fotos recebem até 3x mais matches na Lume.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {currentUser.photos.map((photo, idx) => (
                  <div
                    key={`${photo}-${idx}`}
                    className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-border bg-canvas"
                  >
                    <img
                      src={photo}
                      alt={`Foto ${idx + 1}`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    {currentUser.photos.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removePhoto(idx)}
                        aria-label="Remover foto"
                        className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/55 text-white flex items-center justify-center hover:bg-error transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-border">
                <p className="text-xs font-semibold text-ink mb-2.5">
                  Adicionar foto à galeria
                </p>
                <div className="flex flex-wrap gap-2.5">
                  {EXTRA_PORTRAIT_OPTIONS.map((img, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => addSamplePhoto(img)}
                      className="relative w-16 h-20 rounded-xl overflow-hidden border border-border hover:border-primary transition-colors group"
                    >
                      <img
                        src={img}
                        alt={`Opção ${i + 1}`}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white">
                        <Plus className="w-5 h-5" />
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <h2 className="font-display text-lg font-semibold text-ink">
                Conte um pouco sobre você
              </h2>
              <p className="text-sm text-ink-muted">
                Fale sobre o que anima sua rotina, um café favorito ou o que não pode faltar em um bom encontro.
              </p>
              <textarea
                rows={5}
                maxLength={360}
                value={currentUser.bio}
                onChange={(e) => updateCurrentUser({ bio: e.target.value })}
                className="w-full p-4 rounded-2xl border border-border bg-canvas text-sm text-ink focus:outline-none focus:border-primary"
              />
              <p className="text-right text-xs text-ink-muted tabular-nums">
                {currentUser.bio.length}/360 caracteres
              </p>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-4">
              <div>
                <h2 className="font-display text-lg font-semibold text-ink">
                  Interesses e hobbies
                </h2>
                <p className="text-sm text-ink-muted mt-1">
                  Selecione até 8 temas para melhorar seu índice de compatibilidade.
                </p>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {AVAILABLE_INTERESTS.map((interest) => {
                  const selected = currentUser.interests.includes(interest);
                  return (
                    <button
                      key={interest}
                      type="button"
                      onClick={() => toggleInterest(interest)}
                      className={`min-h-[40px] px-4 py-2 rounded-xl border text-sm font-semibold transition-colors ${
                        selected
                          ? 'bg-lavender border-primary text-primary-dark'
                          : 'bg-canvas border-border text-ink hover:border-primary/40'
                      }`}
                    >
                      {interest}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 6 && (
            <div className="space-y-4">
              <h2 className="font-display text-lg font-semibold text-ink">
                Qual é a sua intenção hoje?
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {GOALS.map((goal) => {
                  const active = currentUser.intention === goal;
                  return (
                    <button
                      key={goal}
                      type="button"
                      onClick={() => updateCurrentUser({ intention: goal })}
                      className={`min-h-[56px] p-4 rounded-2xl border text-left text-sm font-semibold flex items-center justify-between transition-colors ${
                        active
                          ? 'bg-lavender border-primary text-primary-dark'
                          : 'bg-canvas border-border text-ink hover:border-primary/40'
                      }`}
                    >
                      <span>{goal}</span>
                      {active && <Check className="w-4 h-4 text-primary" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 7 && (
            <div className="space-y-5">
              <div>
                <h2 className="font-display text-lg font-semibold text-ink">
                  Prévia do seu cartão de perfil
                </h2>
                <p className="text-sm text-ink-muted">
                  É assim que outras pessoas verão você na tela de descoberta.
                </p>
              </div>

              <div className="max-w-sm mx-auto rounded-3xl border border-border overflow-hidden bg-surface shadow-sm">
                <div className="relative">
                  <ProfileGallery
                    photos={currentUser.photos}
                    name={currentUser.name}
                    aspectClass="aspect-[4/5]"
                  />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#161326]/88 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-display text-xl font-bold">
                        {currentUser.name.split(' ')[0]}, {currentUser.age}
                      </h3>
                      <VerifiedBadge verified={currentUser.verified} inverted />
                    </div>
                    <p className="text-xs text-white/85">
                      {currentUser.city}, {currentUser.state} · {currentUser.intention}
                    </p>
                  </div>
                </div>
                <div className="p-4 space-y-2">
                  <p className="text-sm text-ink leading-relaxed">{currentUser.bio}</p>
                  <p className="text-xs text-ink-muted">{currentUser.interests.join(' · ')}</p>
                </div>
              </div>
            </div>
          )}

          {/* Footer Navigation */}
          <div className="mt-8 pt-6 border-t border-border flex items-center justify-between gap-4">
            <button
              type="button"
              disabled={step === 0}
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              className={`min-h-[44px] px-5 rounded-xl text-sm disabled:opacity-40 inline-flex items-center gap-2 ${BUTTON_VARIANTS.secondary}`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Anterior</span>
            </button>

            {step < STEPS.length - 1 ? (
              <button
                type="button"
                onClick={() => setStep((s) => Math.min(STEPS.length - 1, s + 1))}
                className={`min-h-[44px] px-6 rounded-xl text-sm inline-flex items-center gap-2 ${BUTTON_VARIANTS.primary}`}
              >
                <span>Próximo</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={completeProfileSetup}
                className={`min-h-[44px] px-6 rounded-xl text-sm inline-flex items-center gap-2 ${BUTTON_VARIANTS.primary}`}
              >
                <Check className="w-4 h-4" />
                <span>Concluir e Descobrir</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
