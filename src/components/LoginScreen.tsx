/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Terminal, Shield, Cpu, Activity, Server, Eye, EyeOff, CheckCircle, Database, User, Lock } from 'lucide-react';
import { ScreenType } from '../types';

interface LoginScreenProps {
  onNavigate: (screen: ScreenType) => void;
  savedEmail?: string;
}

export default function LoginScreen({ onNavigate, savedEmail = '' }: LoginScreenProps) {
  const [email, setEmail] = useState(savedEmail || '');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedNode, setSelectedNode] = useState('US-EAST-PRIMARY-X1');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMessage('Ambos campos son requeridos');
      return;
    }
    setLoading(true);
    setErrorMessage('');
    setTimeout(() => {
      setLoading(false);
      setLoginSuccess(true);
      setTimeout(() => {
        setLoginSuccess(false);
        onNavigate('dashboard');
      }, 1500);
    }, 1200);
  };

  const systemNodes = [
    { id: 'US-EAST-PRIMARY-X1', status: 'Online', load: '12%' },
    { id: 'EU-WEST-STAGING-S4', status: 'Online', load: '45%' },
    { id: 'AP-SOUTH-EDGE-E9', status: 'Standby', load: '0%' }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 items-center" id="login-container">
      {/* Visual System Hero Frame */}
      <div className="md:col-span-5 space-y-4 text-left" id="login-hero-info">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-brand-cyan/10 border border-brand-cyan/20 text-brand-cyan text-xs font-mono tracking-wider uppercase mb-2">
          <Activity size={14} className="animate-pulse" />
          Terminal Activa: TIENDA 1
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-brand-text leading-tight">
          Flujo de caja <span className="text-brand-cyan"> AGROVET MANANTIAL</span>
        </h1>
        
        <p className="text-sm text-brand-text-dim leading-relaxed">
          Acceda a su cuenta segun a su rol correspondiente
        </p>

        <div className="pt-4 border-t border-black/5 space-y-3">
          <span className="text-[11px] font-mono uppercase text-brand-cyan/60 tracking-widest block font-bold">Nodos de Red Activos</span>
        </div>
      </div>

      {/* Main Glass Login Card */}
      <div 
        className="md:col-span-7 backdrop-blur-md bg-brand-surface border border-brand-outline/60 rounded-xl p-6 sm:p-8 shadow-xl relative overflow-hidden flex flex-col justify-between"
        id="login-card"
        style={{
          boxShadow: '0 20px 40px rgba(31,81,60,0.04), inset 0 1px 0 rgba(255,255,255,1)'
        }}
      >
        {/* Glow accent */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-brand-cyan/5 blur-3xl rounded-full pointer-events-none"></div>
        
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold text-brand-text font-sans flex items-center gap-2">
              <Shield size={18} className="text-brand-cyan" />
              VERIFICACION DE CREDENCIALES
            </h2>
            <span className="text-xs font-mono text-brand-text-dim">v4.8.1-PROD</span>
          </div>
          <p className="text-xs text-brand-text-dim">Ingrese sus credenciales de ingreso</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          {errorMessage && (
            <div className="p-3 rounded bg-red-50 border border-red-200 text-red-700 text-xs font-mono" id="login-error">
              ❌ ERROR_CODE_AUTH_FAIL: {errorMessage}
            </div>
          )}

          {loginSuccess && (
            <div className="p-3 rounded bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-mono flex items-center gap-2" id="login-success">
              <CheckCircle size={14} className="text-emerald-600 animate-bounce" />
              SESSION_INIT: Conexión segura establecida en {selectedNode}.
            </div>
          )}

          <div>
            <label className="block text-xs font-mono font-medium text-brand-text-dim uppercase tracking-wider mb-1.5">
              Nombre de usuario
            </label>
            <div className="relative">
              <User size={16} className="absolute left-3 top-2.5 text-brand-outline" />
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="user998 por ejemplo"
                className="w-full bg-brand-container-lowest border border-brand-outline rounded-lg px-3 py-2 pl-9 text-sm focus:outline-none focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan text-brand-text transition-all font-mono placeholder:text-brand-text-dim/30"
                id="login-email"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono font-medium text-brand-text-dim uppercase tracking-wider mb-1.5">
              Contraseña 
            </label>
            
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-2.5 text-brand-outline" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-brand-container-lowest border border-brand-outline rounded-lg px-3 py-2 pl-9 pr-10 text-sm focus:outline-none focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan text-brand-text transition-all font-mono placeholder:text-brand-text-dim/30"
                id="login-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-brand-outline hover:text-brand-cyan transition-colors"
                id="toggle-pass-visibility"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs pt-1">
            <label className="flex items-center gap-2 text-brand-text-dim cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded bg-brand-bg border-brand-outline text-brand-cyan focus:ring-0 focus:ring-offset-0" />
              <span>Recordar siempre al iniciar sesion</span>
            </label>
            <a href="#" className="text-brand-cyan hover:underline hover:text-brand-cyan/80">
              ¿Olvidó su clave?
            </a>
          </div>

          <button
            type="submit"
            disabled={loading || loginSuccess}
            className={`w-full py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
              loading 
                ? 'bg-brand-cyan/50 text-white cursor-not-allowed' 
                : loginSuccess 
                ? 'bg-emerald-600 text-white' 
                : 'bg-brand-cyan hover:bg-brand-cyan/90 text-white active:scale-[0.98] shadow-[0_4px_12px_rgba(31,81,60,0.12)] hover:shadow-[0_4px_16px_rgba(31,81,60,0.22)]'
            }`}
            id="login-submit"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Verificando credenciales
              </>
            ) : loginSuccess ? (
              'Ingreso Autorizado'
            ) : (
              <>
              <Terminal size={16} />
                Iniciar sesion
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-black/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
          <span className="text-brand-text-dim">¿Aún no has creado tu cuenta?</span>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('signup');
            }}
            className="px-4 py-1.5 rounded-full border border-brand-cyan/20 bg-brand-cyan/5 text-brand-cyan hover:bg-brand-cyan hover:text-white hover:border-brand-cyan transition-all duration-200"
            id="goto-signup"
          >
            Crear cuenta nueva
          </a>
        </div>
      </div>
    </div>
  );
}
