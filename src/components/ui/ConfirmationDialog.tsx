import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { BUTTON_VARIANTS } from '../../theme/tokens';
import { Modal } from './Modal';

interface ConfirmationDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  destructive?: boolean;
}

export const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  open,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = 'Confirmar',
  cancelLabel = 'Cancelar',
  destructive = false,
}) => {
  return (
    <Modal open={open} onClose={onClose} maxWidthClass="max-w-md">
      <div className="flex flex-col gap-4">
        <div className="flex items-start gap-3">
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
              destructive ? 'bg-error/10 text-error' : 'bg-lavender text-primary'
            }`}
          >
            <AlertTriangle className="w-5 h-5" aria-hidden="true" />
          </div>
          <div>
            <h3 className="font-display text-lg font-semibold text-ink">{title}</h3>
            <p className="text-sm text-ink-muted mt-1 leading-relaxed">{description}</p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className={`min-h-[44px] px-5 py-2.5 rounded-xl text-sm whitespace-nowrap shrink-0 ${BUTTON_VARIANTS.secondary}`}
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`min-h-[44px] px-5 py-2.5 rounded-xl text-sm whitespace-nowrap shrink-0 ${
              destructive ? BUTTON_VARIANTS.danger : BUTTON_VARIANTS.primary
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </Modal>
  );
};
