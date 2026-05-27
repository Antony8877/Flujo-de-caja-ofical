import React from 'react';
import { 
  Home, 
  ArrowLeftRight, 
  Landmark, 
  FolderIcon, 
  BarChart3, 
  Settings, 
  Ban, 
  User 
} from 'lucide-react';
import { ScreenId } from '../types';

interface SidebarProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId, transition: 'none' | 'push_back' | 'slide_left') => void;
}

export default function Sidebar({ currentScreen, onNavigate }: SidebarProps) {
  return (
    <aside className="fixed left-0 top-0 h-full w-[260px] bg-brand-surface border-r border-brand-outline/60 flex flex-col py-6 px-3 z-50">
      {/* Branding */}
      <div className="mb-8 px-3">
        <h1 className="text-xl font-bold text-brand-text leading-tight">
          Agrovet Manantial
        </h1>
        <p className="text-xs text-brand-text-dim font-medium tracking-wide">
          Gestión Financiera
        </p>
      </div>

      {/* Navigation list */}
      <nav className="flex-1 flex flex-col gap-1 overflow-y-auto pr-1">
        
        {/* Navigation Item: Inicio */}
        <button
          onClick={() => {}}
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-brand-text-dim hover:bg-brand-bg transition-colors w-full text-left cursor-pointer"
          id="nav-inicio"
        >
          <Home className="w-[18px] h-[18px] opacity-70" />
          <span className="text-xs font-semibold">Inicio</span>
        </button>

        {/* Navigation Item: Transacciones */}
        <a
          href="#transacciones"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('registro', 'none');
          }}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all w-full text-left cursor-pointer group ${
            currentScreen === 'registro'
              ? 'text-brand-cyan font-bold border-l-4 border-brand-cyan bg-brand-cyan/10'
              : 'text-brand-text-dim hover:bg-brand-bg hover:text-brand-cyan'
          }`}
          id="nav-transacciones"
        >
          <ArrowLeftRight className="w-[18px] h-[18px]" />
          <span className="text-xs font-semibold">Transacciones</span>
        </a>

        {/* Navigation Item: Cuentas */}
        <button
          onClick={() => {}}
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-brand-text-dim hover:bg-brand-bg transition-colors w-full text-left cursor-pointer"
          id="nav-cuentas"
        >
          <Landmark className="w-[18px] h-[18px] opacity-70" />
          <span className="text-xs font-semibold">Cuentas</span>
        </button>

        {/* Navigation Item: Conceptos */}
        <button
          onClick={() => {}}
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-brand-text-dim hover:bg-brand-bg transition-colors w-full text-left cursor-pointer"
          id="nav-conceptos"
        >
          <FolderIcon className="w-[18px] h-[18px] opacity-70" />
          <span className="text-xs font-semibold">Conceptos</span>
        </button>

        {/* Navigation Item: Reportes */}
        <button
          onClick={() => {}}
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-brand-text-dim hover:bg-brand-bg transition-colors w-full text-left cursor-pointer"
          id="nav-reportes"
        >
          <BarChart3 className="w-[18px] h-[18px] opacity-70" />
          <span className="text-xs font-semibold">Reportes</span>
        </button>

        {/* Navigation Item: Configuración */}
        <button
          onClick={() => {}}
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-brand-text-dim hover:bg-brand-bg transition-colors w-full text-left cursor-pointer"
          id="nav-configuracion"
        >
          <Settings className="w-[18px] h-[18px] opacity-70" />
          <span className="text-xs font-semibold">Configuración</span>
        </button>

        {/* Navigation Item: Transacciones Anuladas */}
        <a
          href="#anuladas"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('anulacion', 'none');
          }}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all w-full text-left cursor-pointer group ${
            currentScreen === 'anulacion'
              ? 'text-brand-cyan font-bold border-l-4 border-brand-cyan bg-brand-cyan/10'
              : 'text-brand-text-dim hover:bg-brand-bg hover:text-brand-cyan'
          }`}
          id="nav-anuladas"
        >
          <Ban className="w-[18px] h-[18px] text-rose-600" />
          <span className="text-xs font-semibold">Transacciones Anuladas</span>
        </a>

      </nav>

      {/* User Perfil */}
      <div className="mt-auto border-t border-brand-outline/60 pt-4 px-1">
        <button
          onClick={() => {}}
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-brand-text-dim hover:bg-brand-bg transition-colors w-full text-left cursor-pointer"
          id="nav-perfil"
        >
          <User className="w-[18px] h-[18px] opacity-70" />
          <span className="text-xs font-semibold">Perfil</span>
        </button>
      </div>
    </aside>
  );
}
