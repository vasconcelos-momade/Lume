import React, { useState } from 'react';
import { Crown, LogOut, Trash2, UserX } from 'lucide-react';
import { useDating } from '../context/DatingContext';
import { BUTTON_VARIANTS } from '../theme/tokens';
import { AppShell } from '../components/layout/AppShell';
import { ConfirmationDialog } from '../components/ui/ConfirmationDialog';

export const SettingsPage: React.FC = () => {
  const {
    currentUser,
    updateCurrentUser,
    settings,
    updateSettings,
    unblockUser,
    navigate,
    logout,
    deleteAccount,
    addToast,
  } = useDating();

  const [emailInput, setEmailInput] = useState(currentUser.email);
  const [phoneInput, setPhoneInput] = useState(currentUser.phone);
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

  const handleSaveAccount = (e: React.FormEvent) => {
    e.preventDefault();
    updateCurrentUser({ email: emailInput.trim(), phone: phoneInput.trim() });
    addToast({ type: 'success', title: 'Dados da conta atualizados' });
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPass || newPass.length < 6) {
      addToast({
        type: 'error',
        title: 'Senha inválida',
        description: 'Informe sua senha atual e uma nova senha com pelo menos 6 caracteres.',
      });
      return;
    }
    setCurrentPass('');
    setNewPass('');
    addToast({ type: 'success', title: 'Senha alterada com segurança' });
  };

  const renderToggle = (
    label: string,
    description: string,
    checked: boolean,
    onChange: (val: boolean) => void
  ) => (
    <label className="flex items-center justify-between gap-4 py-3 cursor-pointer">
      <div>
        <p className="text-sm font-medium text-ink">{label}</p>
        <p className="text-xs text-ink-muted">{description}</p>
      </div>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="w-5 h-5 accent-primary rounded shrink-0"
      />
    </label>
  );

  return (
    <AppShell
      title="Configurações"
      subtitle="Conta, privacidade, notificações e preferências de descoberta"
    >
      <div className="p-4 sm:p-6 lg:p-8 max-w-3xl mx-auto space-y-6">
        {/* Account Information */}
        <section className="p-6 rounded-3xl bg-surface border border-border">
          <h2 className="font-display text-base font-bold text-ink mb-4">
            Informações da conta
          </h2>
          <form onSubmit={handleSaveAccount} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-ink mb-1.5">
                  E-mail principal
                </label>
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="w-full min-h-[44px] px-4 rounded-xl border border-border bg-canvas text-sm text-ink focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-ink mb-1.5">
                  Telefone verificado
                </label>
                <input
                  type="tel"
                  value={phoneInput}
                  onChange={(e) => setPhoneInput(e.target.value)}
                  className="w-full min-h-[44px] px-4 rounded-xl border border-border bg-canvas text-sm text-ink focus:outline-none focus:border-primary"
                />
              </div>
            </div>
            <button
              type="submit"
              className={`min-h-[42px] px-5 rounded-xl text-xs ${BUTTON_VARIANTS.primary}`}
            >
              Salvar informações
            </button>
          </form>
        </section>

        {/* Change Password */}
        <section className="p-6 rounded-3xl bg-surface border border-border">
          <h2 className="font-display text-base font-bold text-ink mb-4">
            Alterar senha
          </h2>
          <form
            onSubmit={handlePasswordChange}
            className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end"
          >
            <div>
              <label className="block text-xs font-semibold text-ink mb-1.5">
                Senha atual
              </label>
              <input
                type="password"
                value={currentPass}
                onChange={(e) => setCurrentPass(e.target.value)}
                placeholder="••••••••"
                className="w-full min-h-[44px] px-4 rounded-xl border border-border bg-canvas text-sm text-ink focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-ink mb-1.5">
                Nova senha
              </label>
              <input
                type="password"
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
                placeholder="Mínimo 6 caracteres"
                className="w-full min-h-[44px] px-4 rounded-xl border border-border bg-canvas text-sm text-ink focus:outline-none focus:border-primary"
              />
            </div>
            <button
              type="submit"
              className={`min-h-[44px] px-5 rounded-xl text-xs ${BUTTON_VARIANTS.secondary}`}
            >
              Atualizar senha
            </button>
          </form>
        </section>

        {/* Notifications */}
        <section className="p-6 rounded-3xl bg-surface border border-border divide-y divide-border">
          <h2 className="font-display text-base font-bold text-ink pb-3">
            Notificações
          </h2>
          {renderToggle(
            'Alertas de novos matches',
            'Receba aviso imediato quando alguém curtir você de volta',
            settings.matchAlerts,
            (val) => updateSettings({ matchAlerts: val })
          )}
          {renderToggle(
            'Notificações push no navegador',
            'Avisos de mensagens recebidas em tempo real',
            settings.pushNotifications,
            (val) => updateSettings({ pushNotifications: val })
          )}
          {renderToggle(
            'Prévia de mensagens',
            'Exibir trecho da mensagem recebida nas notificações',
            settings.messagePreviews,
            (val) => updateSettings({ messagePreviews: val })
          )}
          {renderToggle(
            'Resumo por e-mail',
            'Receba semanalmente novas conexões compatíveis na sua cidade',
            settings.emailNotifications,
            (val) => updateSettings({ emailNotifications: val })
          )}
        </section>

        {/* Privacy, Location & Dating Preferences */}
        <section className="p-6 rounded-3xl bg-surface border border-border space-y-5">
          <h2 className="font-display text-base font-bold text-ink">
            Privacidade, Localização e Descoberta
          </h2>

          <div className="divide-y divide-border">
            {renderToggle(
              'Exibir status online',
              'Permitir que seus matches vejam quando você está ativo',
              settings.showOnlineStatus,
              (val) => updateSettings({ showOnlineStatus: val })
            )}
            {renderToggle(
              'Mostrar distância aproximada',
              'Exibir quilometragem estimada no seu cartão de perfil',
              settings.showDistance,
              (val) => updateSettings({ showDistance: val })
            )}
            {renderToggle(
              'Modo discreto',
              'Seu perfil aparece apenas para pessoas que você já curtiu',
              settings.incognitoMode,
              (val) => updateSettings({ incognitoMode: val })
            )}
          </div>

          <div className="pt-4 border-t border-border grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <div className="flex justify-between text-xs font-semibold text-ink mb-2">
                <span>Raio de localização</span>
                <span className="text-primary tabular-nums">{settings.maxDistanceKm} km</span>
              </div>
              <input
                type="range"
                min={5}
                max={100}
                value={settings.maxDistanceKm}
                onChange={(e) => updateSettings({ maxDistanceKm: Number(e.target.value) })}
                className="w-full accent-primary"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-ink mb-2">
                <span>Faixa etária desejada</span>
                <span className="text-primary tabular-nums">
                  {settings.ageRange[0]}–{settings.ageRange[1]} anos
                </span>
              </div>
              <input
                type="range"
                min={20}
                max={55}
                value={settings.ageRange[1]}
                onChange={(e) =>
                  updateSettings({ ageRange: [settings.ageRange[0], Number(e.target.value)] })
                }
                className="w-full accent-primary"
              />
            </div>
          </div>
        </section>

        {/* Blocked Users */}
        <section className="p-6 rounded-3xl bg-surface border border-border">
          <h2 className="font-display text-base font-bold text-ink mb-3">
            Usuários bloqueados
          </h2>
          {settings.blockedUsers.length === 0 ? (
            <p className="text-sm text-ink-muted">Nenhum usuário bloqueado no momento.</p>
          ) : (
            <div className="divide-y divide-border">
              {settings.blockedUsers.map((u) => (
                <div key={u.id} className="py-3 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <UserX className="w-4 h-4 text-ink-muted" />
                    <div>
                      <p className="text-sm font-medium text-ink">{u.name}</p>
                      <p className="text-xs text-ink-muted">Bloqueado em {u.blockedAt}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => unblockUser(u.id)}
                    className={`min-h-[36px] px-3.5 rounded-xl text-xs ${BUTTON_VARIANTS.secondary}`}
                  >
                    Desbloquear
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Subscription & Danger Actions */}
        <section className="p-6 rounded-3xl bg-lavender/45 border border-border space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-border">
            <div className="flex items-center gap-3">
              <Crown className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm font-semibold text-ink">
                  Plano atual: {currentUser.tier.toUpperCase()}
                </p>
                <p className="text-xs text-ink-muted">Gerencie faturas ou mude de plano</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => navigate('subscription')}
              className={`min-h-[40px] px-4 rounded-xl text-xs ${BUTTON_VARIANTS.secondary}`}
            >
              Gerenciar assinatura
            </button>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => setLogoutDialogOpen(true)}
              className={`min-h-[44px] px-5 rounded-xl text-sm inline-flex items-center justify-center gap-2 ${BUTTON_VARIANTS.secondary}`}
            >
              <LogOut className="w-4 h-4" />
              <span>Sair da conta</span>
            </button>

            <button
              type="button"
              onClick={() => setDeleteDialogOpen(true)}
              className="min-h-[44px] px-5 rounded-xl border border-error/30 bg-surface hover:bg-error/10 text-sm font-semibold text-error inline-flex items-center justify-center gap-2 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              <span>Excluir conta</span>
            </button>
          </div>
        </section>
      </div>

      <ConfirmationDialog
        open={logoutDialogOpen}
        onClose={() => setLogoutDialogOpen(false)}
        onConfirm={logout}
        title="Sair da Lume?"
        description="Você precisará entrar novamente com seu e-mail ou telefone para acessar suas conversas."
        confirmLabel="Sair agora"
      />

      <ConfirmationDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={deleteAccount}
        title="Excluir conta permanentemente?"
        description="Todos os seus matches, conversas, fotos e histórico serão removidos de forma irreversível."
        confirmLabel="Confirmar exclusão"
        destructive
      />
    </AppShell>
  );
};
