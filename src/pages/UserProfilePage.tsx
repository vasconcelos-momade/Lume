import React, { useState } from 'react';
import {
  Briefcase,
  Check,
  Edit3,
  Eye,
  EyeOff,
  GraduationCap,
  MapPin,
  Plus,
  Ruler,
  ShieldCheck,
  Wine,
} from 'lucide-react';
import { useDating } from '../context/DatingContext';
import { AVAILABLE_INTERESTS } from '../data/mockData';
import { BUTTON_VARIANTS } from '../theme/tokens';
import { RelationshipGoal } from '../types/dating';
import { PORTRAIT_GALLERY } from '../utils/editorialPortraits';
import { ProfileGallery } from '../components/dating/ProfileGallery';
import { AppShell } from '../components/layout/AppShell';
import { Modal } from '../components/ui/Modal';
import { VerifiedBadge } from '../components/ui/VerifiedBadge';

const GOALS: RelationshipGoal[] = [
  'Relacionamento sério',
  'Conhecer pessoas novas',
  'Algo sem pressa',
  'Amizade e conexões',
];

export const UserProfilePage: React.FC = () => {
  const { currentUser, updateCurrentUser, addToast } = useDating();
  const [editOpen, setEditOpen] = useState(false);

  // Edit draft state
  const [bioDraft, setBioDraft] = useState(currentUser.bio);
  const [cityDraft, setCityDraft] = useState(currentUser.city);
  const [workDraft, setWorkDraft] = useState(currentUser.lifestyle.work);
  const [educationDraft, setEducationDraft] = useState(currentUser.lifestyle.education);
  const [intentionDraft, setIntentionDraft] = useState<RelationshipGoal>(currentUser.intention);
  const [interestsDraft, setInterestsDraft] = useState<string[]>(currentUser.interests);

  const openEditor = () => {
    setBioDraft(currentUser.bio);
    setCityDraft(currentUser.city);
    setWorkDraft(currentUser.lifestyle.work);
    setEducationDraft(currentUser.lifestyle.education);
    setIntentionDraft(currentUser.intention);
    setInterestsDraft(currentUser.interests);
    setEditOpen(true);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateCurrentUser({
      bio: bioDraft.trim() || currentUser.bio,
      city: cityDraft.trim() || currentUser.city,
      intention: intentionDraft,
      interests: interestsDraft,
      lifestyle: {
        ...currentUser.lifestyle,
        work: workDraft.trim() || currentUser.lifestyle.work,
        education: educationDraft.trim() || currentUser.lifestyle.education,
      },
    });
    setEditOpen(false);
    addToast({ type: 'success', title: 'Perfil atualizado com sucesso' });
  };

  const toggleVisibility = () => {
    const next = !currentUser.visible;
    updateCurrentUser({ visible: next });
    addToast({
      type: 'info',
      title: next ? 'Perfil visível nas descobertas' : 'Perfil pausado temporariamente',
    });
  };

  const toggleDraftInterest = (item: string) => {
    setInterestsDraft((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item].slice(0, 8)
    );
  };

  return (
    <AppShell
      title="Meu Perfil"
      subtitle="Gerencie suas fotos, biografia e preferências exibidas"
      headerRightSlot={
        <button
          type="button"
          onClick={openEditor}
          className={`min-h-[40px] px-4 rounded-xl text-xs inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 ${BUTTON_VARIANTS.primary}`}
        >
          <Edit3 className="w-3.5 h-3.5" />
          <span>Editar perfil</span>
        </button>
      }
    >
      <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          {/* Gallery Column */}
          <div className="md:col-span-5 space-y-3">
            <div className="rounded-3xl overflow-hidden border border-border bg-surface">
              <ProfileGallery
                photos={currentUser.photos}
                name={currentUser.name}
                aspectClass="aspect-[3/4]"
              />
            </div>

            <div className="flex items-center gap-2">
              {currentUser.photos.map((photo, idx) => (
                <div
                  key={idx}
                  className="w-16 h-20 rounded-xl overflow-hidden border border-border bg-canvas"
                >
                  <img
                    src={photo}
                    alt={`Foto ${idx + 1}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
              {currentUser.photos.length < 6 && (
                <button
                  type="button"
                  onClick={() => {
                    updateCurrentUser({
                      photos: [...currentUser.photos, PORTRAIT_GALLERY.lucas1],
                    });
                    addToast({ type: 'success', title: 'Foto adicionada à galeria' });
                  }}
                  className="w-16 h-20 rounded-xl border border-dashed border-[#C4BDD4] hover:border-primary hover:bg-lavender/40 text-ink-muted hover:text-primary flex flex-col items-center justify-center gap-1 text-[11px] font-medium transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Foto</span>
                </button>
              )}
            </div>
          </div>

          {/* Info Column */}
          <div className="md:col-span-7 space-y-6">
            <section className="p-6 rounded-3xl bg-surface border border-border space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="font-display text-2xl font-bold text-ink">
                      {currentUser.name}, {currentUser.age}
                    </h2>
                    <VerifiedBadge verified={currentUser.verified} size="md" />
                  </div>
                  <p className="text-sm text-ink-muted flex items-center gap-1.5 mt-1">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span>
                      {currentUser.city}, {currentUser.state}
                    </span>
                  </p>
                </div>

                <button
                  type="button"
                  onClick={openEditor}
                  className={`min-h-[40px] px-3.5 rounded-xl text-xs inline-flex items-center gap-1.5 ${BUTTON_VARIANTS.secondary}`}
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Editar</span>
                </button>
              </div>

              <div className="pt-4 border-t border-border">
                <h3 className="text-xs font-semibold text-ink-muted mb-1.5">Biografia</h3>
                <p className="text-sm text-ink leading-relaxed">{currentUser.bio}</p>
              </div>

              <div className="pt-4 border-t border-border">
                <h3 className="text-xs font-semibold text-ink-muted mb-1.5">
                  Intenção e Preferências
                </h3>
                <p className="text-sm text-ink">
                  <span className="font-semibold text-primary">{currentUser.intention}</span>
                  {' · '}Procurando por {currentUser.lookingFor.join(', ')}
                </p>
              </div>

              <div className="pt-4 border-t border-border">
                <h3 className="text-xs font-semibold text-ink-muted mb-1.5">Interesses</h3>
                <p className="text-sm text-ink">{currentUser.interests.join(' · ')}</p>
              </div>
            </section>

            {/* Lifestyle */}
            <section className="p-6 rounded-3xl bg-surface border border-border">
              <h3 className="font-display text-base font-semibold text-ink mb-4">
                Estilo de vida
              </h3>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-sm text-ink">
                <div className="flex items-center gap-2.5">
                  <Briefcase className="w-4 h-4 text-primary shrink-0" />
                  <span className="truncate">{currentUser.lifestyle.work}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <GraduationCap className="w-4 h-4 text-primary shrink-0" />
                  <span className="truncate">{currentUser.lifestyle.education}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Ruler className="w-4 h-4 text-primary shrink-0" />
                  <span>
                    {currentUser.lifestyle.height} · {currentUser.lifestyle.exercise}
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Wine className="w-4 h-4 text-primary shrink-0" />
                  <span>
                    {currentUser.lifestyle.drinking} · {currentUser.lifestyle.smoking}
                  </span>
                </div>
              </dl>
            </section>

            {/* Verification & Visibility Controls */}
            <section className="p-6 rounded-3xl bg-lavender/45 border border-border space-y-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-success shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-ink">
                      {currentUser.verified
                        ? 'Identidade verificada'
                        : 'Verificação de identidade pendente'}
                    </p>
                    <p className="text-xs text-ink-muted mt-0.5">
                      {currentUser.verified
                        ? 'Seu perfil exibe o selo verificado e recebe mais confiança.'
                        : 'Envie uma selfie rápida para validar sua conta.'}
                    </p>
                  </div>
                </div>
                {currentUser.verified ? (
                  <span className="text-xs font-semibold text-success inline-flex items-center gap-1 shrink-0">
                    <Check className="w-4 h-4" />
                    Ativo
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      updateCurrentUser({ verified: true });
                      addToast({ type: 'success', title: 'Perfil verificado!' });
                    }}
                    className={`min-h-[40px] px-4 rounded-xl text-xs ${BUTTON_VARIANTS.primary}`}
                  >
                    Verificar agora
                  </button>
                )}
              </div>

              <div className="pt-4 border-t border-border flex items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  {currentUser.visible ? (
                    <Eye className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  ) : (
                    <EyeOff className="w-5 h-5 text-ink-muted shrink-0 mt-0.5" />
                  )}
                  <div>
                    <p className="text-sm font-semibold text-ink">
                      Visibilidade do perfil na descoberta
                    </p>
                    <p className="text-xs text-ink-muted mt-0.5">
                      {currentUser.visible
                        ? 'Seu perfil está visível para novas pessoas na sua região.'
                        : 'Seu perfil está oculto para novas descobertas; matches atuais continuam ativos.'}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={toggleVisibility}
                  className={`min-h-[40px] px-4 rounded-xl text-xs whitespace-nowrap shrink-0 ${
                    currentUser.visible ? BUTTON_VARIANTS.secondary : BUTTON_VARIANTS.primary
                  }`}
                >
                  {currentUser.visible ? 'Pausar perfil' : 'Reativar perfil'}
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <Modal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        title="Editar Perfil"
        subtitle="Mantenha suas informações atualizadas"
        maxWidthClass="max-w-xl"
      >
        <form onSubmit={handleSaveProfile} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-ink mb-1.5">Cidade</label>
              <input
                type="text"
                value={cityDraft}
                onChange={(e) => setCityDraft(e.target.value)}
                className="w-full min-h-[44px] px-4 rounded-xl border border-border bg-canvas text-sm text-ink focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-ink mb-1.5">
                Intenção de relacionamento
              </label>
              <select
                value={intentionDraft}
                onChange={(e) => setIntentionDraft(e.target.value as RelationshipGoal)}
                className="w-full min-h-[44px] px-4 rounded-xl border border-border bg-canvas text-sm text-ink focus:outline-none focus:border-primary"
              >
                {GOALS.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-ink mb-1.5">Trabalho</label>
              <input
                type="text"
                value={workDraft}
                onChange={(e) => setWorkDraft(e.target.value)}
                className="w-full min-h-[44px] px-4 rounded-xl border border-border bg-canvas text-sm text-ink focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-ink mb-1.5">Formação</label>
              <input
                type="text"
                value={educationDraft}
                onChange={(e) => setEducationDraft(e.target.value)}
                className="w-full min-h-[44px] px-4 rounded-xl border border-border bg-canvas text-sm text-ink focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-ink mb-1.5">Biografia</label>
            <textarea
              rows={3}
              value={bioDraft}
              onChange={(e) => setBioDraft(e.target.value)}
              className="w-full p-3.5 rounded-xl border border-border bg-canvas text-sm text-ink focus:outline-none focus:border-primary"
            />
          </div>

          <div>
            <span className="block text-xs font-semibold text-ink mb-2">
              Interesses (até 8)
            </span>
            <div className="flex flex-wrap gap-2">
              {AVAILABLE_INTERESTS.map((item) => {
                const selected = interestsDraft.includes(item);
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => toggleDraftInterest(item)}
                    className={`min-h-[34px] px-3 py-1 rounded-xl border text-xs font-semibold transition-colors ${
                      selected
                        ? 'bg-lavender border-primary text-primary-dark'
                        : 'bg-surface border-border text-ink hover:bg-canvas'
                    }`}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-border">
            <button
              type="button"
              onClick={() => setEditOpen(false)}
              className={`min-h-[44px] px-5 rounded-xl text-sm ${BUTTON_VARIANTS.secondary}`}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className={`min-h-[44px] px-6 rounded-xl text-sm ${BUTTON_VARIANTS.primary}`}
            >
              Salvar alterações
            </button>
          </div>
        </form>
      </Modal>
    </AppShell>
  );
};
