export const THEME_TOKENS = {
  colors: {
    primary: '#7028E8',
    primaryDark: '#5420B5',
    romanticPink: '#FF4F87',
    coral: '#FF6B81',
    softLavender: '#F0E8F8',
    background: '#FAF9FC',
    surface: '#FFFFFF',
    textPrimary: '#252333',
    textSecondary: '#706B80',
    border: '#E8E4EF',
    success: '#16A34A',
    warning: '#D97706',
    error: '#DC2626',
  },
  radii: {
    card: '1.5rem',
    control: '0.75rem',
    full: '9999px',
  },
} as const;

export const BUTTON_VARIANTS = {
  primary:
    'bg-primary hover:bg-primary-dark text-white font-semibold shadow-[0_8px_20px_rgba(112,40,232,0.2)] active:scale-[0.98] transition-all duration-150',
  romantic:
    'bg-gradient-to-r from-pink to-coral hover:brightness-105 text-white font-semibold shadow-[0_8px_20px_rgba(255,79,135,0.26)] active:scale-[0.98] transition-all duration-150',
  secondary:
    'bg-surface border border-border hover:bg-lavender/60 text-ink font-semibold active:scale-[0.98] transition-all duration-150',
  soft:
    'bg-lavender hover:bg-lavender/80 text-primary-dark font-semibold active:scale-[0.98] transition-all duration-150',
  ghost:
    'text-ink-muted hover:text-ink hover:bg-lavender/50 font-medium transition-colors duration-150',
  danger:
    'bg-error hover:bg-[#B91C1C] text-white font-semibold active:scale-[0.98] transition-all duration-150',
} as const;
