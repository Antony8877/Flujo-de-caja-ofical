import React from 'react';

type ButtonVariant = 'primary' | 'danger' | 'outline' | 'ghost';
type ButtonSize = 'xs' | 'sm' | 'md';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-brand-cyan hover:bg-brand-cyan/90 text-white shadow-[0_4px_12px_rgba(31,81,60,0.12)] hover:shadow-[0_4px_16px_rgba(31,81,60,0.22)]',
  danger: 'bg-rose-700 text-white hover:bg-rose-800 shadow-sm',
  outline:
    'border border-brand-cyan text-brand-cyan hover:bg-brand-cyan/10',
  ghost: 'text-brand-text-dim hover:text-brand-cyan',
};

const sizeStyles: Record<ButtonSize, string> = {
  xs: 'px-2 py-1 text-[10px]',
  sm: 'px-4 py-2 text-xs',
  md: 'px-5 py-2.5 text-xs',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  icon,
  fullWidth = false,
  children,
  className = '',
  ...rest
}: ButtonProps) {
  return (
    <button
      className={`${variantStyles[variant]} ${sizeStyles[size]} rounded-lg font-bold flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer ${fullWidth ? 'w-full' : ''} ${className}`}
      {...rest}
    >
      {icon}
      {children}
    </button>
  );
}
