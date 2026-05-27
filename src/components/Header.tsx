import React from 'react';
import { Bell, HelpCircle, ChevronRight, Search } from 'lucide-react';
import { ScreenId } from '../types';

interface HeaderProps {
  currentScreen: ScreenId;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function Header({ currentScreen, searchQuery, setSearchQuery }: HeaderProps) {
  return (
    <header className="sticky top-0 right-0 w-full bg-brand-bg/90 backdrop-blur-md z-40 border-b border-brand-outline/60 flex items-center justify-between px-8 py-3.5">
      {/* Search Bar or Breadcrumb based on Screen */}
      <div className="flex items-center gap-4 flex-1">
        {currentScreen === 'anulacion' ? (
          <nav className="flex items-center text-brand-text-dim text-xs font-medium gap-1.5">
            <span className="hover:text-brand-cyan cursor-pointer transition-colors">Inicio</span>
            <ChevronRight className="w-3.5 h-3.5 text-brand-outline" />
            <span className="hover:text-brand-cyan cursor-pointer transition-colors">Transacciones</span>
            <ChevronRight className="w-3.5 h-3.5 text-brand-outline" />
            <span className="text-brand-text font-bold">Anular</span>
          </nav>
        ) : (
          <div className="flex items-center gap-2 bg-white border border-brand-outline/60 px-4 py-1.5 rounded-full w-full max-w-sm transition-all focus-within:border-brand-cyan focus-within:ring-1 focus-within:ring-brand-cyan">
            <Search className="w-4 h-4 text-brand-outline" />
            <input
              type="text"
              placeholder="Buscar transacción..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none text-xs font-medium w-full focus:outline-none focus:ring-0 text-brand-text placeholder-brand-text-dim/40 py-0"
              id="global-search"
            />
          </div>
        )}
      </div>

      {/* Right Tools & User avatar */}
      <div className="flex items-center gap-5">
        <button 
          className="text-brand-text-dim hover:text-brand-cyan transition-colors relative cursor-pointer"
          id="header-notifications"
          title="Notificaciones"
        >
          <Bell className="w-[18px] h-[18px]" />
          <span className="absolute top-0.5 right-0.5 w-[6px] h-[6px] bg-rose-600 rounded-full"></span>
        </button>
        
        <button 
          className="text-brand-text-dim hover:text-brand-cyan transition-colors cursor-pointer"
          id="header-help"
          title="Ayuda"
        >
          <HelpCircle className="w-[18px] h-[18px]" />
        </button>

        {/* User profile container */}
        <div className="flex items-center gap-2.5 pl-1 border-l border-brand-outline/60">
          <div className="w-9 h-9 rounded-full bg-brand-cyan/10 flex items-center justify-center overflow-hidden border border-brand-outline/60 shadow-inner">
            <img
              alt="Usuario Perfil"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC4m29EseL_V6xyaM32Znk38yYUYB6HAy0ogSZ5jPz6escgVIF4_K41-rzP7yid7vozIQRKO8dQ3QGFknbAr6W7s4gyYh7NLWiNqJ-bpfkouZ-g6LOuzpooyuooZGAaxteQQQ6MQfD2Qq2dr9rhda2tG5BboPebkAXQ2djPVNip1WGTFTiDf_tbJfkA5YcFkF5wKgX6jf9b0qzm2ja2yUugwFLpjHmv4TIWOfYphCwBCHWM1aN5Dl7uTYJLCgRMQFN4dh30XbfFFAqm"
            />
          </div>
          <div className="hidden md:block text-left">
            <p className="text-xs font-bold text-brand-text leading-none">A. Calderón</p>
            <p className="text-[10px] text-brand-text-dim font-semibold leading-none mt-0.5">Finanzas</p>
          </div>
        </div>
      </div>
    </header>
  );
}
