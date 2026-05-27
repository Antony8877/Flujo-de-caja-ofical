import React from 'react';
import { CheckCircle2, AlertTriangle, Info } from 'lucide-react';

type AlertType = 'success' | 'error' | 'warning';

interface AlertProps {
  type: AlertType;
  message: string;
  onDismiss?: () => void;
}

const alertConfig: Record<
  AlertType,
  { bg: string; text: string; border: string; Icon: React.ComponentType<{ className?: string }> }
> = {
  success: {
    bg: 'bg-emerald-50',
    text: 'text-emerald-800',
    border: 'border-emerald-200',
    Icon: CheckCircle2,
  },
  error: {
    bg: 'bg-red-50',
    text: 'text-red-700',
    border: 'border-red-200',
    Icon: AlertTriangle,
  },
  warning: {
    bg: 'bg-amber-50',
    text: 'text-amber-800',
    border: 'border-amber-200',
    Icon: Info,
  },
};

export default function Alert({ type, message, onDismiss }: AlertProps) {
  const { bg, text, border, Icon } = alertConfig[type];
  return (
    <div
      className={`p-3 ${bg} ${text} ${border} border text-xs font-bold rounded-lg flex items-center gap-2`}
    >
      <Icon className="w-4 h-4 shrink-0" />
      <span className="flex-1">{message}</span>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="font-bold hover:opacity-70 transition-opacity cursor-pointer"
        >
          ×
        </button>
      )}
    </div>
  );
}
