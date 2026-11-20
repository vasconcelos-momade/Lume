import React, { useState } from 'react';
import { ArrowLeft, Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { useDating } from '../context/DatingContext';
import { BUTTON_VARIANTS } from '../theme/tokens';
import { Modal } from '../components/ui/Modal';

export const LoginPage: React.FC = () => {
  const { login, loginWithGoogle, navigate, addToast } = useDating();
  const [identifier, setIdentifier] = useState('daniel.vasconcelos@lume.app');
  const [password, setPassword] = useState('••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');

  const [forgotOpen, setForgotOpen] = useState(false);
  const [recoveryEmail, setRecoveryEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier.trim() || password.length < 4) {
      setError('Informe seu e-mail ou telefone e uma senha válida.');
      return;
    }
    setError('');
    login(identifier.trim());
  };

  const handleRecovery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recoveryEmail.includes('@')) return;
    setForgotOpen(false);
    setRecoveryEmail('');
    addToast({
      type: 'success',
      title: 'Link de recuperação enviado',
      description: 'Verifique sua caixa de entrada para redefinir a senha.',
    });
  };

  return (
    <div className="min-h-screen bg-canvas flex flex-col justify-center px-4 py-10">
      <div className="max-w-md w-full mx-auto">
        <button
          type="button"
          onClick={() => navigate('landing')}
          className="inline-flex items-center gap-2 text-sm font-medium text-ink-muted hover:text-primary mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar para a página inicial</span>
        </button>

        <div className="bg-surface rounded-3xl border border-border p-7 sm:p-9 shadow-[0_14px_40px_rgba(37,35,51,0.06)]">
          <div className="mb-7">
            <span className="font-display text-2xl font-bold text-primary">Lume</span>
            <h1 className="font-display text-2xl font-bold text-ink mt-3">
              Que bom ver você de volta
            </h1>
            <p className="text-sm text-ink-muted mt-1">
              Entre para continuar suas conversas e descobrir novos perfis.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-ink mb-1.5">
                E-mail ou telefone
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-ink-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="seuemail@exemplo.com ou (11) 99999-9999"
                  className="w-full min-h-[46px] pl-10 pr-4 rounded-xl border border-border bg-canvas text-sm text-ink focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-ink mb-1.5">
                Senha
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-ink-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Digite sua senha"
                  className="w-full min-h-[46px] pl-10 pr-12 rounded-xl border border-border bg-canvas text-sm text-ink focus:outline-none focus:border-primary"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                  className="absolute right-2 top-1/2 -translate-y-1/2 min-h-[36px] min-w-[36px] flex items-center justify-center text-ink-muted hover:text-ink rounded-lg"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between gap-2 pt-1">
              <label className="inline-flex items-center gap-2 text-xs text-ink-muted cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 accent-primary rounded"
                />
                <span>Lembrar de mim</span>
              </label>

              <button
                type="button"
                onClick={() => setForgotOpen(true)}
                className="text-xs font-semibold text-primary hover:text-primary-dark hover:underline"
              >
                Esqueci minha senha
              </button>
            </div>

            {error && <p className="text-xs font-medium text-error">{error}</p>}

            <button
              type="submit"
              className={`w-full min-h-[48px] rounded-xl text-sm ${BUTTON_VARIANTS.primary}`}
            >
              Entrar
            </button>
          </form>

          <div className="my-5 flex items-center gap-3 text-xs text-ink-muted">
            <span className="flex-1 h-px bg-border" />
            <span>ou continue com</span>
            <span className="flex-1 h-px bg-border" />
          </div>

          <button
            type="button"
            onClick={loginWithGoogle}
            className={`w-full min-h-[46px] rounded-xl text-sm flex items-center justify-center gap-2.5 ${BUTTON_VARIANTS.secondary}`}
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.11-6.72-4.96H1.29v3.14C3.26 21.3 7.31 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.24c-.24-.72-.38-1.49-.38-2.24s.14-1.52.38-2.24V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.99-3.14z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.99 3.14c.95-2.85 3.6-4.96 6.72-4.96z"
              />
            </svg>
            <span>Entrar com Google</span>
          </button>

          <p className="text-center text-xs text-ink-muted mt-6">
            Ainda não tem conta?{' '}
            <button
              type="button"
              onClick={() => navigate('register')}
              className="font-semibold text-primary hover:text-primary-dark hover:underline"
            >
              Criar conta gratuita
            </button>
          </p>
        </div>
      </div>

      <Modal
        open={forgotOpen}
        onClose={() => setForgotOpen(false)}
        title="Recuperar senha"
        subtitle="Enviaremos instruções para o e-mail cadastrado"
        maxWidthClass="max-w-md"
      >
        <form onSubmit={handleRecovery} className="space-y-4">
          <input
            type="email"
            required
            value={recoveryEmail}
            onChange={(e) => setRecoveryEmail(e.target.value)}
            placeholder="seuemail@exemplo.com"
            className="w-full min-h-[46px] px-4 rounded-xl border border-border bg-canvas text-sm text-ink focus:outline-none focus:border-primary"
          />
          <button
            type="submit"
            className={`w-full min-h-[46px] rounded-xl text-sm ${BUTTON_VARIANTS.primary}`}
          >
            Enviar link de redefinição
          </button>
        </form>
      </Modal>
    </div>
  );
};
