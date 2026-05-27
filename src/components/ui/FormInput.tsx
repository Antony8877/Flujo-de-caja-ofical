import React from 'react';

interface FormInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label: string;
  icon?: React.ReactNode;
  rightElement?: React.ReactNode;
  prefixText?: string;
  variant?: 'dashboard' | 'auth';
}

export default function FormInput({
  label,
  icon,
  rightElement,
  prefixText,
  variant = 'dashboard',
  className = '',
  id,
  ...inputProps
}: FormInputProps) {
  const isAuth = variant === 'auth';

  const labelClass = isAuth
    ? 'block text-xs font-mono font-medium text-brand-text-dim uppercase tracking-wider mb-1.5'
    : 'text-xs font-bold text-brand-text-dim';

  const paddingLeft = icon
    ? isAuth ? 'pl-9' : 'pl-10'
    : prefixText
      ? 'pl-8'
      : isAuth ? 'px-3' : 'px-4';

  const inputClass = isAuth
    ? `w-full bg-brand-container-lowest border border-brand-outline rounded-lg ${paddingLeft} ${rightElement ? 'pr-10' : 'pr-3'} py-2 text-sm focus:outline-none focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan text-brand-text transition-all font-mono placeholder:text-brand-text-dim/30`
    : `w-full ${paddingLeft} pr-4 py-2.5 rounded-lg border border-brand-outline/60 focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan transition-all bg-brand-container-lowest text-xs font-semibold focus:outline-none`;

  return (
    <div className={`flex flex-col gap-1.5 text-left ${className}`}>
      <label className={labelClass} htmlFor={id}>
        {label}
      </label>
      <div className="relative group">
        {icon && (
          <span className={`absolute ${isAuth ? 'left-3 top-2.5' : 'left-3.5 top-1/2 -translate-y-1/2 transition-colors group-focus-within:text-brand-cyan'} text-brand-outline`}>
            {icon}
          </span>
        )}
        {prefixText && !icon && (
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-brand-outline">
            {prefixText}
          </span>
        )}
        <input id={id} className={inputClass} {...inputProps} />
        {rightElement && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2">
            {rightElement}
          </span>
        )}
      </div>
    </div>
  );
}
