import React from 'react';
import { RotateCcw, Search, SlidersHorizontal } from 'lucide-react';
import { useDating } from '../../context/DatingContext';
import { AVAILABLE_INTERESTS } from '../../data/mockData';
import { BUTTON_VARIANTS } from '../../theme/tokens';
import { Modal } from '../ui/Modal';

interface SearchFiltersProps {
  open: boolean;
  onClose: () => void;
}

export const SearchFilters: React.FC<SearchFiltersProps> = ({ open, onClose }) => {
  const { filters, setFilters, resetFilters } = useDating();

  const toggleInterest = (interest: string) => {
    const exists = filters.interests.includes(interest);
    setFilters({
      interests: exists
        ? filters.interests.filter((i) => i !== interest)
        : [...filters.interests, interest],
    });
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Filtros de Descoberta"
      subtitle="Refine quem aparece no seu feed de conexões"
    >
      <div className="space-y-6">
        {/* Search Query */}
        <div>
          <label className="block text-xs font-semibold text-ink mb-2">
            Buscar por palavra-chave ou bairro
          </label>
          <div className="relative">
            <Search className="w-4 h-4 text-ink-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={filters.query}
              onChange={(e) => setFilters({ query: e.target.value })}
              placeholder="Ex.: Pinheiros, fotografia, arquitetura..."
              className="w-full min-h-[44px] pl-10 pr-4 rounded-xl border border-border bg-canvas text-sm text-ink focus:outline-none focus:border-primary"
            />
          </div>
        </div>

        {/* Distance */}
        <div>
          <div className="flex items-center justify-between text-xs font-semibold text-ink mb-2">
            <span>Distância máxima</span>
            <span className="text-primary tabular-nums">{filters.maxDistanceKm} km</span>
          </div>
          <input
            type="range"
            min={2}
            max={100}
            value={filters.maxDistanceKm}
            onChange={(e) => setFilters({ maxDistanceKm: Number(e.target.value) })}
            className="w-full accent-primary"
          />
        </div>

        {/* Age Range */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-ink mb-1.5">
              Idade mínima ({filters.ageRange[0]})
            </label>
            <input
              type="range"
              min={18}
              max={filters.ageRange[1] - 1}
              value={filters.ageRange[0]}
              onChange={(e) =>
                setFilters({ ageRange: [Number(e.target.value), filters.ageRange[1]] })
              }
              className="w-full accent-primary"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-ink mb-1.5">
              Idade máxima ({filters.ageRange[1]})
            </label>
            <input
              type="range"
              min={filters.ageRange[0] + 1}
              max={60}
              value={filters.ageRange[1]}
              onChange={(e) =>
                setFilters({ ageRange: [filters.ageRange[0], Number(e.target.value)] })
              }
              className="w-full accent-primary"
            />
          </div>
        </div>

        {/* Verified Only */}
        <label className="flex items-center justify-between gap-3 p-3.5 rounded-2xl bg-lavender/45 border border-border cursor-pointer">
          <div>
            <p className="text-sm font-semibold text-ink">Apenas perfis verificados</p>
            <p className="text-xs text-ink-muted">Exibir somente quem validou identidade por selfie</p>
          </div>
          <input
            type="checkbox"
            checked={filters.onlyVerified}
            onChange={(e) => setFilters({ onlyVerified: e.target.checked })}
            className="w-5 h-5 accent-primary rounded"
          />
        </label>

        {/* Interactive Interest Filter Buttons */}
        <div>
          <span className="block text-xs font-semibold text-ink mb-2">
            Interesses em comum
          </span>
          <div className="flex flex-wrap gap-2">
            {AVAILABLE_INTERESTS.slice(0, 12).map((interest) => {
              const active = filters.interests.includes(interest);
              return (
                <button
                  key={interest}
                  type="button"
                  onClick={() => toggleInterest(interest)}
                  className={`min-h-[36px] px-3 py-1.5 rounded-xl text-xs font-semibold border transition-colors whitespace-nowrap ${
                    active
                      ? 'bg-lavender border-primary text-primary-dark'
                      : 'bg-surface border-border text-ink hover:bg-canvas hover:border-primary/40'
                  }`}
                >
                  {interest}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 pt-3 border-t border-border">
          <button
            type="button"
            onClick={resetFilters}
            className={`min-h-[44px] px-4 rounded-xl text-sm inline-flex items-center gap-1.5 ${BUTTON_VARIANTS.ghost}`}
          >
            <RotateCcw className="w-4 h-4" />
            <span>Limpar filtros</span>
          </button>
          <button
            type="button"
            onClick={onClose}
            className={`min-h-[44px] px-6 rounded-xl text-sm inline-flex items-center gap-2 ${BUTTON_VARIANTS.primary}`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Aplicar</span>
          </button>
        </div>
      </div>
    </Modal>
  );
};
