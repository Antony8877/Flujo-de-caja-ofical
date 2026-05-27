import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
  padding?: string;
}

export default function Card({
  children,
  className = '',
  glow = false,
  padding = 'p-6',
}: CardProps) {
  return (
    <div
      className={`bg-brand-surface border border-brand-outline/60 rounded-xl shadow-sm relative overflow-hidden ${padding} ${className}`}
      style={
        glow
          ? {
              boxShadow:
                '0 20px 40px rgba(31,81,60,0.04), inset 0 1px 0 rgba(255,255,255,1)',
            }
          : undefined
      }
    >
      {glow && (
        <div className="absolute top-0 right-0 w-48 h-48 bg-brand-cyan/5 blur-3xl rounded-full pointer-events-none" />
      )}
      {children}
    </div>
  );
}
