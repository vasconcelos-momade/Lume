import React, { useState } from 'react';
import { Check, CreditCard, QrCode, Smartphone } from 'lucide-react';
import { useDating } from '../context/DatingContext';
import { SUBSCRIPTION_PLANS } from '../data/mockData';
import { BUTTON_VARIANTS } from '../theme/tokens';
import { SubscriptionTier } from '../types/dating';
import { SubscriptionCard } from '../components/dating/SubscriptionCard';
import { AppShell } from '../components/layout/AppShell';
import { Modal } from '../components/ui/Modal';

const COMPARISON_ROWS = [
  { label: 'Curtidas diárias', free: '15 por dia', premium: 'Ilimitadas', vip: 'Ilimitadas' },
  { label: 'Ver quem curtiu você', free: '1 prévia', premium: 'Todos liberados', vip: 'Todos + alertas' },
  { label: 'Desfazer último deslize', free: 'Indisponível', premium: 'Ilimitado', vip: 'Ilimitado' },
  { label: 'Super Likes inclusos', free: '1 / semana', premium: '5 / semana', vip: 'Ilimitados' },
  { label: 'Filtros avançados', free: 'Básicos', premium: 'Completos', vip: 'Completos + afinidade' },
  { label: 'Prioridade na descoberta', free: 'Padrão', premium: '2x visibilidade', vip: 'Topo da região' },
];

export const SubscriptionPage: React.FC = () => {
  const { currentUser, subscribeToPlan } = useDating();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>(currentUser.billingCycle);
  const [checkoutTier, setCheckoutTier] = useState<SubscriptionTier | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'pix' | 'wallet'>('card');
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8821');
  const [cardName, setCardName] = useState(currentUser.name);

  const selectedPlanObj = SUBSCRIPTION_PLANS.find((p) => p.id === checkoutTier);
  const finalMonthly = selectedPlanObj
    ? billingCycle === 'annual'
      ? selectedPlanObj.annualPrice
      : selectedPlanObj.monthlyPrice
    : 0;
  const totalCharge = billingCycle === 'annual' ? finalMonthly * 12 : finalMonthly;

  const handleSelectPlan = (tier: SubscriptionTier) => {
    if (tier === 'free') {
      subscribeToPlan('free', billingCycle);
      return;
    }
    setCheckoutTier(tier);
  };

  const handleConfirmPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkoutTier) return;
    subscribeToPlan(checkoutTier, billingCycle);
    setCheckoutTier(null);
  };

  return (
    <AppShell
      title="Assinatura e Planos"
      subtitle={`Seu plano atual: ${currentUser.tier.toUpperCase()}`}
    >
      <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto space-y-10">
        {/* Billing Toggle */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl font-bold text-ink">
              Amplie suas chances de encontrar o par ideal
            </h2>
            <p className="text-sm text-ink-muted mt-1">
              Cancele quando quiser, sem fidelidade obrigatória.
            </p>
          </div>

          <div className="inline-flex items-center gap-1 p-1 rounded-xl bg-surface border border-border self-start">
            <button
              type="button"
              onClick={() => setBillingCycle('monthly')}
              className={`min-h-[40px] px-4 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap ${
                billingCycle === 'monthly'
                  ? 'bg-lavender text-primary-dark'
                  : 'text-ink-muted hover:text-ink'
              }`}
            >
              Cobrança Mensal
            </button>
            <button
              type="button"
              onClick={() => setBillingCycle('annual')}
              className={`min-h-[40px] px-4 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap ${
                billingCycle === 'annual'
                  ? 'bg-lavender text-primary-dark'
                  : 'text-ink-muted hover:text-ink'
              }`}
            >
              Anual · -30%
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SUBSCRIPTION_PLANS.map((plan) => (
            <SubscriptionCard
              key={plan.id}
              {...plan}
              billingCycle={billingCycle}
              isCurrentPlan={currentUser.tier === plan.id}
              onSelect={() => handleSelectPlan(plan.id)}
            />
          ))}
        </div>

        {/* Comparison Matrix */}
        <section className="rounded-3xl border border-border bg-surface overflow-hidden">
          <div className="px-6 py-5 border-b border-border">
            <h3 className="font-display text-lg font-bold text-ink">
              Comparação completa de recursos
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border bg-canvas text-xs font-semibold text-ink-muted">
                  <th className="py-3.5 px-6">Recurso</th>
                  <th className="py-3.5 px-4">Free</th>
                  <th className="py-3.5 px-4 text-primary">Premium</th>
                  <th className="py-3.5 px-4 text-pink">VIP</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-sm">
                {COMPARISON_ROWS.map((row) => (
                  <tr key={row.label} className="hover:bg-lavender/25 transition-colors">
                    <td className="py-3.5 px-6 font-medium text-ink">{row.label}</td>
                    <td className="py-3.5 px-4 text-ink-muted">{row.free}</td>
                    <td className="py-3.5 px-4 font-semibold text-primary">{row.premium}</td>
                    <td className="py-3.5 px-4 font-semibold text-ink">{row.vip}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      {/* Payment Method Modal */}
      <Modal
        open={checkoutTier !== null}
        onClose={() => setCheckoutTier(null)}
        title={`Finalizar assinatura ${selectedPlanObj?.name ?? ''}`}
        subtitle={
          billingCycle === 'annual'
            ? `Cobrança anual de R$ ${totalCharge.toFixed(2).replace('.', ',')}`
            : `Cobrança mensal de R$ ${totalCharge.toFixed(2).replace('.', ',')}`
        }
      >
        <form onSubmit={handleConfirmPayment} className="space-y-5">
          <div>
            <span className="block text-xs font-semibold text-ink mb-2">
              Método de pagamento
            </span>
            <div className="grid grid-cols-3 gap-2.5">
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`min-h-[54px] p-2.5 rounded-xl border text-xs font-semibold flex flex-col items-center justify-center gap-1 transition-colors ${
                  paymentMethod === 'card'
                    ? 'bg-lavender border-primary text-primary-dark'
                    : 'bg-canvas border-border text-ink hover:border-primary/40'
                }`}
              >
                <CreditCard className="w-4 h-4" />
                <span>Cartão</span>
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod('pix')}
                className={`min-h-[54px] p-2.5 rounded-xl border text-xs font-semibold flex flex-col items-center justify-center gap-1 transition-colors ${
                  paymentMethod === 'pix'
                    ? 'bg-lavender border-primary text-primary-dark'
                    : 'bg-canvas border-border text-ink hover:border-primary/40'
                }`}
              >
                <QrCode className="w-4 h-4" />
                <span>PIX</span>
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod('wallet')}
                className={`min-h-[54px] p-2.5 rounded-xl border text-xs font-semibold flex flex-col items-center justify-center gap-1 transition-colors ${
                  paymentMethod === 'wallet'
                    ? 'bg-lavender border-primary text-primary-dark'
                    : 'bg-canvas border-border text-ink hover:border-primary/40'
                }`}
              >
                <Smartphone className="w-4 h-4" />
                <span>Apple / Google</span>
              </button>
            </div>
          </div>

          {paymentMethod === 'card' && (
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-ink mb-1">
                  Número do cartão
                </label>
                <input
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className="w-full min-h-[44px] px-4 rounded-xl border border-border bg-canvas text-sm font-mono text-ink focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-ink mb-1">
                  Nome impresso
                </label>
                <input
                  type="text"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  className="w-full min-h-[44px] px-4 rounded-xl border border-border bg-canvas text-sm text-ink focus:outline-none focus:border-primary"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  defaultValue="09/30"
                  aria-label="Validade"
                  className="min-h-[44px] px-4 rounded-xl border border-border bg-canvas text-sm font-mono text-ink focus:outline-none focus:border-primary"
                />
                <input
                  type="text"
                  defaultValue="842"
                  aria-label="CVV"
                  className="min-h-[44px] px-4 rounded-xl border border-border bg-canvas text-sm font-mono text-ink focus:outline-none focus:border-primary"
                />
              </div>
            </div>
          )}

          {paymentMethod === 'pix' && (
            <div className="p-4 rounded-2xl bg-lavender/50 border border-border text-sm text-ink-muted space-y-2">
              <p className="font-semibold text-ink">Pagamento instantâneo via PIX</p>
              <p className="text-xs leading-relaxed">
                Ao confirmar, sua assinatura é liberada na hora e o código PIX Copia e Cola é validado automaticamente.
              </p>
            </div>
          )}

          {paymentMethod === 'wallet' && (
            <div className="p-4 rounded-2xl bg-lavender/50 border border-border text-sm text-ink-muted">
              Autenticação biométrica pronta com carteira digital vinculada ao dispositivo.
            </div>
          )}

          <button
            type="submit"
            className={`w-full min-h-[48px] rounded-xl text-sm inline-flex items-center justify-center gap-2 ${BUTTON_VARIANTS.primary}`}
          >
            <Check className="w-4 h-4" />
            <span>
              Confirmar assinatura · R$ {totalCharge.toFixed(2).replace('.', ',')}
            </span>
          </button>
        </form>
      </Modal>
    </AppShell>
  );
};
