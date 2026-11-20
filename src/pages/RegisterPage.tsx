import React, { useState } from 'react';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { useDating } from '../context/DatingContext';
import { BUTTON_VARIANTS } from '../theme/tokens';
import { CurrentUser } from '../types/dating';

export const RegisterPage: React.FC = () => {
  const { register, navigate } = useDating();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [birthDate, setBirthDate] = useState('1998-06-15');
  const [gender, setGender] = useState<CurrentUser['gender']>('Feminino');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim().length < 3) {
      setError('Informe seu nome completo.');
      return;
    }
    if (!email.includes('@')) {
      setError('Informe um endereço de e-mail válido.');
      return;
    }
    if (phone.trim().length < 8) {
      setError('Informe um número de telefone válido.');
      return;
    }
    if (!birthDate) {
      setError('Informe sua data de nascimento.');
      return;
    }
    const age = 2026 - new Date(birthDate).getFullYear();
    if (age < 18) {
      setError('É necessário ter pelo menos 18 anos para criar uma conta.');
      return;
    }
    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres.');
      return;
    }
    if (password !== confirmPassword) {
      setError('As senhas digitadas não coincidem.');
      return;
    }
    if (!acceptedTerms) {
      setError('Aceite os Termos de Uso e Política de Privacidade para continuar.');
      return;
    }

    setError('');
    register({ name: name.trim(), email: email.trim(), phone: phone.trim(), birthDate, gender });
  };

  return (
    <div className="min-h-screen bg-canvas flex flex-col justify-center px-4 py-10">
      <div className="max-w-lg w-full mx-auto">
        <button
          type="button"
          onClick={() => navigate('landing')}
          className="inline-flex items-center gap-2 text-sm font-medium text-ink-muted hover:text-primary mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar para a página inicial</span>
        </button>

        <div className="bg-surface rounded-3xl border border-border p-7 sm:p-9 shadow-[0_14px_40px_rgba(37,35,51,0.06)]">
          <div className="mb-6">
            <span className="font-display text-2xl font-bold text-primary">Lume</span>
            <h1 className="font-display text-2xl font-bold text-ink mt-3">
              Crie sua conta gratuitamente
            </h1>
            <p className="text-sm text-ink-muted mt-1">
              Leva menos de 2 minutos para começar a conhecer pessoas perto de você.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-ink mb-1.5">
                Nome completo
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex.: Ana Clara Oliveira"
                className="w-full min-h-[44px] px-4 rounded-xl border border-border bg-canvas text-sm text-ink focus:outline-none focus:border-primary"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-ink mb-1.5">
                  E-mail
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="voce@email.com"
                  className="w-full min-h-[44px] px-4 rounded-xl border border-border bg-canvas text-sm text-ink focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink mb-1.5">
                  Telefone
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="(11) 99999-9999"
                  className="w-full min-h-[44px] px-4 rounded-xl border border-border bg-canvas text-sm text-ink focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-ink mb-1.5">
                  Data de nascimento
                </label>
                <input
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  className="w-full min-h-[44px] px-4 rounded-xl border border-border bg-canvas text-sm text-ink focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink mb-1.5">
                  Gênero
                </label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value as CurrentUser['gender'])}
                  className="w-full min-h-[44px] px-4 rounded-xl border border-border bg-canvas text-sm text-ink focus:outline-none focus:border-primary"
                >
                  <option value="Feminino">Feminino</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Não-binário">Não-binário</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-ink mb-1.5">
                  Senha
                </label>
                <div className="relative">
                  <input
                    type={showPass ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Mínimo 6 caracteres"
                    className="w-full min-h-[44px] px-4 pr-11 rounded-xl border border-border bg-canvas text-sm text-ink focus:outline-none focus:border-primary"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass((v) => !v)}
                    aria-label="Mostrar senha"
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-ink-muted hover:text-ink"
                  >
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink mb-1.5">
                  Confirmar senha
                </label>
                <input
                  type={showPass ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repita a senha"
                  className="w-full min-h-[44px] px-4 rounded-xl border border-border bg-canvas text-sm text-ink focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            <label className="flex items-start gap-2.5 text-xs text-ink-muted cursor-pointer pt-1">
              <input
                type="checkbox"
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
                className="w-4 h-4 mt-0.5 accent-primary rounded shrink-0"
              />
              <span className="leading-relaxed">
                Li e aceito os Termos de Uso, as Diretrizes da Comunidade e a Política de Privacidade da Lume.
              </span>
            </label>

            {error && <p className="text-xs font-medium text-error">{error}</p>}

            <button
              type="submit"
              className={`w-full min-h-[48px] rounded-xl text-sm ${BUTTON_VARIANTS.primary}`}
            >
              Criar conta
            </button>
          </form>

          <p className="text-center text-xs text-ink-muted mt-6">
            Já possui uma conta?{' '}
            <button
              type="button"
              onClick={() => navigate('login')}
              className="font-semibold text-primary hover:text-primary-dark hover:underline"
            >
              Entrar agora
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
