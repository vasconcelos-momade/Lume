import React, { useState } from 'react';
import {
  ArrowRight,
  ChevronDown,
  Heart,
  Lock,
  MessageCircle,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { useDating } from '../context/DatingContext';
import { SUBSCRIPTION_PLANS } from '../data/mockData';
import { BUTTON_VARIANTS } from '../theme/tokens';
import { PORTRAIT_GALLERY } from '../utils/editorialPortraits';
import { SubscriptionCard } from '../components/dating/SubscriptionCard';
import { Modal } from '../components/ui/Modal';

const FAQS = [
  {
    q: 'Como funciona a verificação de perfis na Lume?',
    a: 'Todos os novos membros podem validar a identidade enviando uma selfie em tempo real com orientação guiada. Perfis aprovados recebem o selo de verificação, reduzindo perfis falsos e aumentando a segurança nas conversas.',
  },
  {
    q: 'Posso usar a plataforma gratuitamente?',
    a: 'Sim. O plano Free permite criar seu perfil completo, receber curtidas, fazer matches mútuos e conversar livremente após o match sem custo algum.',
  },
  {
    q: 'Como funciona o cálculo de compatibilidade?',
    a: 'Combinamos seus interesses, objetivos de relacionamento, hábitos de estilo de vida e proximidade geográfica para priorizar pessoas com maior afinidade real no seu feed de descoberta.',
  },
  {
    q: 'Consigo pausar ou excluir minha conta quando quiser?',
    a: 'Sim. Em Configurações você pode ocultar seu perfil temporariamente das descobertas ou encerrar sua conta de forma definitiva com um clique.',
  },
];

const TESTIMONIALS = [
  {
    name: 'Mariana & Thiago Almeida',
    location: 'Pinheiros, São Paulo',
    role: 'Arquiteta e Engenheiro Civil',
    photo: PORTRAIT_GALLERY.camila1,
    quote:
      'Antes passávamos semanas em conversas sem propósito. Na primeira semana na Lume, a afinidade em arquitetura e cafés nos levou a um encontro na Vila Madalena — estamos juntos há 11 meses.',
  },
  {
    name: 'Henrique & Júlia Costa',
    location: 'Botafogo, Rio de Janeiro',
    role: 'Produtor Musical e Médica',
    photo: PORTRAIT_GALLERY.beatriz1,
    quote:
      'O filtro de intenções claras economizou muito tempo e desgaste. Sabíamos exatamente o que buscávamos desde a primeira mensagem.',
  },
];

export const LandingPage: React.FC = () => {
  const { navigate, isAuthenticated } = useDating();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [legalModal, setLegalModal] = useState<'privacy' | 'terms' | null>(null);

  return (
    <div className="min-h-screen bg-canvas text-ink">
      {/* Strict 3-Zone Top Bar Contract */}
      <header className="sticky top-0 z-40 bg-surface/95 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-8">
          <a
            href="#landing"
            onClick={(e) => {
              e.preventDefault();
              navigate('landing');
            }}
            className="font-display text-xl font-bold tracking-tight text-primary whitespace-nowrap shrink-0"
          >
            Lume
          </a>

          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-ink-muted">
            <a
              href="#como-funciona"
              className="hover:text-primary transition-colors whitespace-nowrap shrink-0"
            >
              Como funciona
            </a>
            <a
              href="#historias"
              className="hover:text-primary transition-colors whitespace-nowrap shrink-0"
            >
              Histórias
            </a>
            <a
              href="#planos"
              className="hover:text-primary transition-colors whitespace-nowrap shrink-0"
            >
              Planos
            </a>
            <a
              href="#duvidas"
              className="hover:text-primary transition-colors whitespace-nowrap shrink-0"
            >
              Dúvidas
            </a>
          </nav>

          <button
            type="button"
            onClick={() => navigate(isAuthenticated ? 'discover' : 'register')}
            className={`min-h-[40px] px-5 py-2 rounded-xl text-sm whitespace-nowrap shrink-0 ${BUTTON_VARIANTS.primary}`}
          >
            Começar agora
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 pt-12 pb-16 lg:pt-20 lg:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          <div className="lg:col-span-6 flex flex-col justify-center">
            <p className="text-sm font-semibold text-pink mb-3">
              Relacionamentos com intenção real
            </p>
            <h1
              className="font-display font-bold tracking-tight text-ink leading-[1.08]"
              style={{ fontSize: 'clamp(2.25rem, 4vw, 3.75rem)', textWrap: 'balance' }}
            >
              Encontre pessoas que combinam com você.
            </h1>
            <p className="mt-5 text-base sm:text-lg text-ink-muted leading-relaxed max-w-xl">
              Descubra conexões autênticas perto de você com perfis verificados, compatibilidade por interesses reais e conversas fluidas sem ruído.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <button
                type="button"
                onClick={() => navigate(isAuthenticated ? 'discover' : 'register')}
                className={`min-h-[48px] px-7 py-3 rounded-xl text-sm inline-flex items-center justify-center gap-2 whitespace-nowrap shrink-0 ${BUTTON_VARIANTS.primary}`}
              >
                <span>Começar agora</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => navigate('login')}
                className={`min-h-[48px] px-7 py-3 rounded-xl text-sm whitespace-nowrap shrink-0 ${BUTTON_VARIANTS.secondary}`}
              >
                Já tenho uma conta
              </button>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="h-full rounded-3xl overflow-hidden border border-border bg-lavender/40 relative shadow-[0_14px_38px_rgba(37,35,51,0.06)]">
              <img
                src={PORTRAIT_GALLERY.heroCouple}
                alt="Casal conversando e sorrindo em um café ao entardecer"
                referrerPolicy="no-referrer"
                className="w-full h-full min-h-[320px] lg:h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Full-Width 4-Column Proof Strip */}
        <div className="mt-12 pt-8 border-t border-border grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <p className="font-display text-2xl sm:text-3xl font-bold text-ink tabular-nums">
              94%
            </p>
            <p className="text-xs sm:text-sm text-ink-muted mt-1">
              Perfis com verificação facial ativa no Brasil
            </p>
          </div>
          <div>
            <p className="font-display text-2xl sm:text-3xl font-bold text-ink tabular-nums">
              1,8M+
            </p>
            <p className="text-xs sm:text-sm text-ink-muted mt-1">
              Matches mútuos formados nos últimos 12 meses
            </p>
          </div>
          <div>
            <p className="font-display text-2xl sm:text-3xl font-bold text-ink tabular-nums">
              4,9 / 5
            </p>
            <p className="text-xs sm:text-sm text-ink-muted mt-1">
              Avaliação média de segurança e conversa
            </p>
          </div>
          <div>
            <p className="font-display text-2xl sm:text-3xl font-bold text-ink tabular-nums">
              3,2 dias
            </p>
            <p className="text-xs sm:text-sm text-ink-muted mt-1">
              Tempo médio até o primeiro encontro marcado
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="como-funciona" className="bg-lavender/45 py-16 lg:py-24 border-y border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-ink">
              Da afinidade à conversa em três etapas simples
            </h2>
            <p className="text-base text-ink-muted mt-2">
              Cada detalhe foi pensado para eliminar perfis genéricos e aproximar pessoas com objetivos compatíveis.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-7 rounded-3xl bg-surface border border-border">
              <span className="font-display text-sm font-bold text-primary">01.</span>
              <h3 className="font-display text-xl font-semibold text-ink mt-3">
                Crie um perfil autêntico
              </h3>
              <p className="text-sm text-ink-muted mt-2 leading-relaxed">
                Compartilhe suas fotos favoritas, estilo de vida, interesses e o tipo de relacionamento que você procura hoje.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-surface border border-border">
              <span className="font-display text-sm font-bold text-pink">02.</span>
              <h3 className="font-display text-xl font-semibold text-ink mt-3">
                Explore com critério
              </h3>
              <p className="text-sm text-ink-muted mt-2 leading-relaxed">
                Deslize para curtir ou envie um Super Like com nota personalizada. Nosso índice destaca quem realmente combina com você.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-surface border border-border">
              <span className="font-display text-sm font-bold text-coral">03.</span>
              <h3 className="font-display text-xl font-semibold text-ink mt-3">
                Converse em tempo real
              </h3>
              <p className="text-sm text-ink-muted mt-2 leading-relaxed">
                Quando há interesse mútuo, o chat abre instantaneamente com fotos, confirmação de leitura e zero distrações.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Benefits (Asymmetric Bento) */}
      <section className="max-w-7xl mx-auto px-6 py-16 lg:py-24">
        <div className="max-w-2xl mb-10">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-ink">
            Construída para encontros melhores, não deslizes infinitos
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 p-8 rounded-3xl bg-lavender/50 border border-border flex flex-col justify-between">
            <div className="w-11 h-11 rounded-2xl bg-surface border border-border text-primary flex items-center justify-center mb-6">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-display text-xl font-bold text-ink">
                Verificação biométrica e moderação ativa 24h
              </h3>
              <p className="text-sm sm:text-base text-ink-muted mt-2 max-w-xl leading-relaxed">
                Validamos selfies em tempo real e monitoramos comportamentos abusivos antes mesmo que cheguem à sua caixa de entrada. Você controla quem vê sua distância e status online.
              </p>
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-surface border border-border flex flex-col justify-between">
            <div className="w-11 h-11 rounded-2xl bg-pink/12 text-pink flex items-center justify-center mb-6">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-display text-xl font-bold text-ink">
                Afinidade transparente
              </h3>
              <p className="text-sm text-ink-muted mt-2 leading-relaxed">
                Saiba antes de curtir quais interesses, valores e objetivos vocês compartilham.
              </p>
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-surface border border-border flex flex-col justify-between">
            <div className="w-11 h-11 rounded-2xl bg-coral/12 text-coral flex items-center justify-center mb-6">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-display text-xl font-bold text-ink">
                Privacidade sob seu controle
              </h3>
              <p className="text-sm text-ink-muted mt-2 leading-relaxed">
                Modo discreto, bloqueio imediato e visibilidade configurável em um toque.
              </p>
            </div>
          </div>

          <div className="md:col-span-2 p-8 rounded-3xl bg-ink text-white flex flex-col justify-between">
            <div className="w-11 h-11 rounded-2xl bg-white/10 text-[#FF9EC0] flex items-center justify-center mb-6">
              <MessageCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-display text-xl font-bold">
                Mensagens pensadas para quebrar o gelo
              </h3>
              <p className="text-sm sm:text-base text-white/80 mt-2 max-w-xl leading-relaxed">
                Envie um comentário direto junto com seu interesse ou responda às preferências do perfil para iniciar diálogos que realmente saem do “oi, tudo bem?”.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories & Testimonials */}
      <section id="historias" className="bg-lavender/40 py-16 lg:py-24 border-y border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-ink">
                Histórias que começaram por aqui
              </h2>
              <p className="text-base text-ink-muted mt-2">
                Casais reais que saíram da tela para a vida fora do aplicativo.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {TESTIMONIALS.map((item) => (
              <blockquote
                key={item.name}
                className="p-7 rounded-3xl bg-surface border border-border flex flex-col justify-between gap-6"
              >
                <p className="text-base text-ink leading-relaxed">“{item.quote}”</p>
                <footer className="flex items-center gap-3.5 pt-4 border-t border-border">
                  <img
                    src={item.photo}
                    alt={item.name}
                    referrerPolicy="no-referrer"
                    className="w-12 h-12 rounded-full object-cover border border-border shrink-0"
                  />
                  <div>
                    <p className="font-display text-sm font-semibold text-ink">
                      {item.name}
                    </p>
                    <p className="text-xs text-ink-muted">
                      {item.role} · {item.location}
                    </p>
                  </div>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* Subscription Plans Preview */}
      <section id="planos" className="max-w-7xl mx-auto px-6 py-16 lg:py-24">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-ink">
            Escolha o ritmo certo para a sua busca
          </h2>
          <p className="text-base text-ink-muted mt-2">
            Comece gratuitamente e faça upgrade apenas quando quiser ampliar seu alcance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SUBSCRIPTION_PLANS.map((plan) => (
            <SubscriptionCard
              key={plan.id}
              {...plan}
              billingCycle="monthly"
              isCurrentPlan={false}
              onSelect={() => navigate(isAuthenticated ? 'subscription' : 'register')}
            />
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section id="duvidas" className="bg-lavender/40 py-16 lg:py-24 border-t border-border">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-ink text-center mb-10">
            Dúvidas frequentes
          </h2>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={faq.q}
                  className="rounded-2xl bg-surface border border-border overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full min-h-[56px] px-6 py-4 flex items-center justify-between gap-4 text-left hover:bg-lavender/30 transition-colors"
                  >
                    <span className="font-display text-sm sm:text-base font-semibold text-ink">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-ink-muted shrink-0 transition-transform ${
                        isOpen ? 'rotate-180 text-primary' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5 text-sm text-ink-muted leading-relaxed border-t border-border/70 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-surface border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-pink fill-current" />
              <span className="font-display text-lg font-bold text-ink">Lume</span>
            </div>
            <p className="text-xs text-ink-muted mt-2">
              © 2026 Lume Conexões Ltda. Todos os direitos reservados.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs font-medium text-ink-muted">
            <button
              type="button"
              onClick={() => setLegalModal('privacy')}
              className="hover:text-primary transition-colors"
            >
              Política de Privacidade
            </button>
            <button
              type="button"
              onClick={() => setLegalModal('terms')}
              className="hover:text-primary transition-colors"
            >
              Termos de Uso
            </button>
            <button
              type="button"
              onClick={() => navigate('login')}
              className="hover:text-primary transition-colors"
            >
              Entrar
            </button>
            <button
              type="button"
              onClick={() => navigate('discover')}
              className="hover:text-primary transition-colors"
            >
              Explorar App
            </button>
            <button
              type="button"
              onClick={() => navigate('admin')}
              className="hover:text-primary transition-colors"
            >
              Painel Admin
            </button>
          </div>
        </div>
      </footer>

      <Modal
        open={legalModal !== null}
        onClose={() => setLegalModal(null)}
        title={legalModal === 'privacy' ? 'Política de Privacidade' : 'Termos de Uso'}
      >
        <div className="space-y-3 text-sm text-ink-muted leading-relaxed">
          <p>
            A Lume protege seus dados pessoais em conformidade com a Lei Geral de Proteção de Dados (LGPD). Suas fotos, localização aproximada e preferências são utilizadas exclusivamente para sugerir conexões compatíveis.
          </p>
          <p>
            Você pode exportar, ocultar ou excluir permanentemente sua conta e todo o histórico de mensagens a qualquer momento nas configurações do perfil.
          </p>
        </div>
      </Modal>
    </div>
  );
};
