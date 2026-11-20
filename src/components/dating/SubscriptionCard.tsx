import React from 'react';
import { Check } from 'lucide-react';
import { BUTTON_VARIANTS } from '../../theme/tokens';
import { SubscriptionTier } from '../../types/dating';

interface SubscriptionCardProps {
  id: SubscriptionTier;
  name: string;
  audience: string;
  monthlyPrice: number;
  annualPrice: number;
  billingCycle: 'monthly' | 'annual';
  features: string[];
  highlight?: boolean;
  isCurrentPlan: boolean;
  onSelect: () => void;
}

export const SubscriptionCard: React.FC<SubscriptionCardProps> = ({
  name,
  audience,
  monthlyPrice,
  annualPrice,
  billingCycle,
  features,
  highlight = false,
  isCurrentPlan,
  onSelect,
}) => {
  const displayPrice = billingCycle === 'annual' ? annualPrice : monthlyPrice;

  return (
    <article
      className={`rounded-3xl p-6 flex flex-col justify-between transition-all ${
        highlight
          ? 'bg-surface border-2 border-primary shadow-[0_18px_48px_rgba(112,40,232,0.12)]'
          : 'bg-surface border border-border'
      }`}
    >
      <div>
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-display text-xl font-bold text-ink">{name}</h3>
          {highlight && (
            <span className="text-xs font-semibold text-primary">Mais escolhido</span>
          )}
        </div>
        <p className="text-sm text-ink-muted mt-1">{audience}</p>

        <div className="mt-5 pb-5 border-b border-border">
          {displayPrice === 0 ? (
            <div className="font-display text-3xl font-bold text-ink tabular-nums">
              Grátis
            </div>
          ) : (
            <div className="flex items-baseline gap-1">
              <span className="font-display text-3xl font-bold text-ink tabular-nums">
                R$ {displayPrice.toFixed(2).replace('.', ',')}
              </span>
              <span className="text-xs text-ink-muted">/mês</span>
            </div>
          )}
          {displayPrice > 0 && billingCycle === 'annual' && (
            <p className="text-xs text-success font-medium mt-1">
              Cobrança anual · economia de 30%
            </p>
          )}
        </div>

        <ul className="mt-5 space-y-3">
          {features.map((feat) => (
            <li key={feat} className="flex items-start gap-2.5 text-sm text-ink">
              <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" aria-hidden="true" />
              <span>{feat}</span>
            </li>
          ))}
        </ul>
      </div>

      <button
        type="button"
        disabled={isCurrentPlan}
        onClick={onSelect}
        className={`mt-7 w-full min-h-[46px] px-5 rounded-xl text-sm whitespace-nowrap ${
          isCurrentPlan
            ? 'bg-lavender text-primary-dark font-semibold border border-primary/25 cursor-default'
            : highlight
              ? BUTTON_VARIANTS.primary
              : displayPrice === 0
                ? BUTTON_VARIANTS.secondary
                : 'bg-ink hover:bg-[#3A374E] text-white font-semibold transition-colors'
        }`}
      >
        {isCurrentPlan ? 'Plano atual' : displayPrice === 0 ? 'Continuar no Free' : `Assinar ${name}`}
      </button>
    </article>
  );
};
