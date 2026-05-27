/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { CheckCircle2, Cpu, ArrowRight, Check } from 'lucide-react';
import { UserRegistrationData, ScreenType } from '../types';

interface ConfirmationScreenProps {
  onNavigate: (screen: ScreenType) => void;
  userData: UserRegistrationData | null;
}

export default function ConfirmationScreen({ onNavigate, userData }: ConfirmationScreenProps) {
  const user = userData || {
    fullname: 'DNI No Registrado',
    email: '',
    role: 'Operador',
    systemNode: 'TIENDA 1',
    experienceLevel: 'Estándar',
    acceptTerms: true
  };

  return (
    <>
      {/* 
        This screen corresponds to 'Confirmación de Registro - Escritorio'.
        To satisfy the exact XPath requirement: body/main[1]/div[2]/div[4]/button[1]
        Under main#root, we will render:
        1. div[1] (decoration/grid node)
        2. div[2] (this card wrapper container)
           Inside div[2]:
           - div[1]: branding & status title
           - div[2]: core success animation & badge
           - div[3]: detail parameters / metadata fields
           - div[4]: actions panel (which must contain a submit/login button as button[1])
      */}

      {/* div[1] under main */}
      <div 
        className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(31,81,60,0.02)_0%,transparent_70%)] pointer-events-none" 
        id="confirmation-bg-decorator"
      ></div>

      {/* div[2] under main */}
      <div 
        className="w-full max-w-md mx-auto backdrop-blur-md bg-brand-surface border border-brand-outline/60 rounded-xl p-8 shadow-xl relative overflow-hidden text-left"
        id="confirmation-main-card"
        style={{
          boxShadow: '0 20px 40px rgba(31,81,60,0.04), inset 0 1px 0 rgba(255,255,255,1)'
        }}
      >
        {/* Glow accent corners as span elements to not interfere with div index counts */}
        <span className="absolute -top-32 -left-32 w-64 h-64 bg-brand-cyan/5 blur-3xl rounded-full block pointer-events-none"></span>
        <span className="absolute -bottom-32 -right-32 w-64 h-64 bg-emerald-500/5 blur-3xl rounded-full block pointer-events-none"></span>

        {/* Inner div[1] of div[2] - Branding & Top indicator */}
        <div className="mb-6 flex items-center justify-between border-b border-black/5 pb-4" id="confirmation-inner-1">
          <div className="flex items-center gap-2">
            <Cpu className="text-brand-cyan animate-pulse" size={20} />
            <span className="text-xs font-bold font-mono text-brand-text tracking-widest uppercase">Agrovet Manantial</span>
          </div>
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-mono px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1 font-semibold">
            <Check size={10} strokeWidth={3} />
            ACTIVO
          </div>
        </div>

        {/* Inner div[2] of div[2] - Success Message */}
        <div className="text-center py-4" id="confirmation-inner-2">
          <div className="inline-flex items-center justify-center p-3 bg-emerald-50 border border-emerald-200 rounded-full text-emerald-600 mb-3 shadow-[0_4px_12px_rgba(16,185,129,0.05)]">
            <CheckCircle2 size={36} className="stroke-[2]" />
          </div>
          <h3 className="text-xl font-bold tracking-tight text-brand-text mb-2 uppercase">¡Registro Confirmado!</h3>
          <p className="text-xs text-brand-text-dim max-w-sm mx-auto leading-relaxed">
            Su cuenta ha sido creada con éxito en el sistema. Ya puede acceder utilizando sus credenciales.
          </p>
        </div>

        {/* Inner div[3] of div[2] - Simple Registered DNI Info */}
        <div className="bg-brand-container-lowest border border-brand-outline/60 rounded-lg p-4 space-y-2 font-mono text-xs my-5" id="confirmation-inner-3">
          <div className="text-[10px] uppercase text-brand-cyan tracking-wider font-bold mb-1 pb-1 border-b border-black/5">
            Información de la Cuenta
          </div>
          <div>
            <span className="text-brand-text-dim block text-[10px] uppercase">Usuario (DNI):</span>
            <span className="text-brand-text font-bold text-sm tracking-wider">{user.fullname}</span>
          </div>
          <div>
            <span className="text-brand-text-dim block text-[10px] uppercase">Estado de Acceso:</span>
            <span className="text-emerald-600 font-semibold text-xs">Autorizado</span>
          </div>
        </div>

        {/* Inner div[4] of div[2] - Actions panel */}
        <div className="flex items-center justify-between gap-4 pt-4 border-t border-black/5" id="confirmation-inner-4">
          <button
            onClick={() => onNavigate('login')}
            className="w-full px-5 py-2.5 rounded-lg bg-brand-cyan hover:bg-brand-cyan/90 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-[0_4px_12px_rgba(31,81,60,0.12)] hover:shadow-[0_4px_16px_rgba(31,81,60,0.22)] active:scale-[0.98]"
            id="confirmation-signin-btn"
          >
            Iniciar Sesión
            <ArrowRight size={14} />
          </button>
        </div>

      </div>
    </>
  );
}
