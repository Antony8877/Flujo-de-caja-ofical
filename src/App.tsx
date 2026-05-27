/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { PantallaLaboratorio } from './sanbox/MiLaboratorio';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ScreenType,
  UserRegistrationData,
  Transaction,
  ScreenId,
} from './types';
import LoginScreen from './components/LoginScreen';
import SignupScreen from './components/SignupScreen';
import ConfirmationScreen from './components/ConfirmationScreen';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import RegistroScreen from './components/RegistroScreen';
import AnulacionScreen from './components/AnulacionScreen';
import { PantallaLaboratorio1 } from './sanbox/MiLaboratorio2';

// ─── Seed data ───────────────────────────────────────────────────────────────
const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: 'TRX-00123456',
    concept: 'Pago Proveedor',
    amount: 500.0,
    currency: 'USD',
    date: '25 Octubre 2023',
    account: 'Principal (USD) ••••1234',
    type: 'egreso',
    annulled: false,
  },
  {
    id: 'TRX-00125789',
    concept: 'Venta Suministros Veterinaria',
    amount: 1250.0,
    currency: 'USD',
    date: '20 Octubre 2023',
    account: 'Principal (USD) ••••1234',
    type: 'ingreso',
    annulled: false,
  },
  {
    id: 'TRX-00125790',
    concept: 'Alquiler Motocultor Campo',
    amount: 350.0,
    currency: 'USD',
    date: '18 Octubre 2023',
    account: 'Principal (USD) ••••1234',
    type: 'ingreso',
    annulled: false,
  },
  {
    id: 'TRX-00125791',
    concept: 'Adquisición Alimentos Balanceados',
    amount: 850.0,
    currency: 'USD',
    date: '15 Octubre 2023',
    account: 'Ahorros (USD) ••••5678',
    type: 'egreso',
    annulled: false,
  },
];

// ─── Component ───────────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState<ScreenType>('login');
  const [userData, setUserData] = useState<UserRegistrationData | null>(null);
  const [currentTime, setCurrentTime] = useState('');
  const [transitionType, setTransitionType] = useState<'none' | 'push' | 'push_back'>('none');

  // Dashboard state
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [dashboardScreen, setDashboardScreen] = useState<ScreenId>('registro');
  const [selectedTxId, setSelectedTxId] = useState<string>('TRX-00123456');
  const [navTransition, setNavTransition] = useState<'none' | 'push_back' | 'slide_left'>('none');
  const [searchQuery, setSearchQuery] = useState('');

  // UTC clock
  useEffect(() => {
    const tick = () => {
      const utcString = new Date().toISOString().replace('T', ' ').substring(0, 19);
      setCurrentTime(utcString);
    };
    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, []);

  // ── Auth navigation ───────────────────────────────────────────────────────
  const handleNavigate = (nextScreen: ScreenType) => {
    if (screen === 'login' && nextScreen === 'signup') {
      setTransitionType('push');
    } else if (screen === 'signup' && nextScreen === 'confirmation') {
      setTransitionType('push_back');
    } else {
      setTransitionType('none');
    }
    setScreen(nextScreen);
  };

  const handleRegisterComplete = (data: UserRegistrationData) => {
    setUserData(data);
  };

  // ── Dashboard navigation ──────────────────────────────────────────────────
  const handleDashboardNav = (
    ds: ScreenId,
    transition: 'none' | 'push_back' | 'slide_left'
  ) => {
    setNavTransition(transition);
    setDashboardScreen(ds);
  };

  const handleSaveTransaction = (newTxData: Omit<Transaction, 'id' | 'annulled'>) => {
    const id = `TRX-00${Math.floor(100000 + Math.random() * 900000)}`;
    setTransactions((prev) => [{ ...newTxData, id, annulled: false }, ...prev]);
  };

  const handleAnnulTransaction = (id: string, reason: string) => {
    const formattedDate = new Date().toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    setTransactions((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, annulled: true, annulmentReason: reason, annulmentDate: formattedDate } : t
      )
    );
  };

  const handleSelectToAnnul = (id: string) => {
    setSelectedTxId(id);
    handleDashboardNav('anulacion', 'slide_left');
  };

  // ── Transition settings for dashboard ────────────────────────────────────
  const getDashboardTransition = () => {
    if (navTransition === 'push_back') {
      return {
        initial: { opacity: 0, scale: 0.96, y: 15 },
        animate: { opacity: 1, scale: 1, y: 0 },
        exit: { opacity: 0, scale: 0.94, y: -15 },
        transition: { type: 'spring', stiffness: 380, damping: 32 },
      };
    }
    if (navTransition === 'slide_left') {
      return {
        initial: { opacity: 0, x: 30 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -30 },
        transition: { ease: 'easeInOut', duration: 0.25 },
      };
    }
    return {
      initial: { opacity: 1, x: 0, scale: 1 },
      animate: { opacity: 1, x: 0, scale: 1 },
      exit: { opacity: 1, x: 0, scale: 1 },
      transition: { duration: 0 },
    };
  };

  // ── RENDER: Confirmation (needs isolated DOM hierarchy) ───────────────────
  if (screen === 'confirmation') {
    return <ConfirmationScreen onNavigate={handleNavigate} userData={userData} />;
  }

  // ── RENDER: Dashboard ─────────────────────────────────────────────────────
  if (screen === 'dashboard') {
    const tp = getDashboardTransition();
    return (
      <div className="flex h-screen w-full bg-brand-bg select-none text-brand-text">
        <Sidebar currentScreen={dashboardScreen} onNavigate={handleDashboardNav} />

        <div className="ml-[260px] flex-1 flex flex-col h-screen overflow-y-auto">
          <Header
            currentScreen={dashboardScreen}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />

          <main className="flex-1 overflow-x-hidden relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={dashboardScreen}
                initial={tp.initial}
                animate={tp.animate}
                exit={tp.exit}
                transition={tp.transition as object}
                className="w-full min-h-full"
              >
                {dashboardScreen === 'anulacion' ? (
                  <AnulacionScreen
                    transactions={transactions}
                    selectedTransactionId={selectedTxId}
                    onAnnul={handleAnnulTransaction}
                    onNavigate={handleDashboardNav}
                    onSelectTransaction={setSelectedTxId}
                  />
                ) : (
                  <RegistroScreen
                    onSave={handleSaveTransaction}
                    searchQuery={searchQuery}
                    transactions={transactions}
                    onSelectTransactionToAnnul={handleSelectToAnnul}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    );
  }
  //return <PantallaLaboratorio1 />;

  // ── RENDER: Auth screens (login / signup) ─────────────────────────────────
  return (
    <div
      className="min-h-screen relative flex flex-col justify-between overflow-x-hidden p-4 sm:p-6"
      id="app-viewport"
    >
      
      {/* Background structural network matrix grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(226,232,240,0.6)_1px,transparent_1px),linear-gradient(90deg,rgba(226,232,240,0.6)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(31,81,60,0.02),transparent_50%)] pointer-events-none"></div>

      {/* Top Status Header */}
      <header className="relative w-full max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-black/5 pb-4 mb-4 text-xs font-mono">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-brand-cyan animate-pulse"></div>
          <div>
            <span className="text-brand-text font-bold tracking-wider">PORTAL DE CONTROL AGROVET MANANTIAL</span>
            <span className="text-brand-text-dim mx-2">|</span>
            <span className="text-brand-cyan/85 font-mono">POR UNA VIDA MEJOR</span>
          </div>
        </div>
        <div className="flex items-center gap-4 text-brand-text-dim">
          <div className="hidden md:block">
            <span className="text-[10px] text-brand-text-dim/60 mr-1 font-bold">DESARROLLADOR:</span>
            <span className="text-brand-text">Andromeda Estudios</span>
          </div>
          <div>
            <span className="text-[10px] text-brand-text-dim/60 mr-1 font-bold">FECHA:</span>
            <span className="text-brand-text font-semibold">{currentTime}</span>
          </div>
        </div>
      </header>

      {/* Motion animated render stage */}
      <main className="flex-1 flex items-center justify-center w-full relative">
        <AnimatePresence mode="wait">
          {screen === 'login' ? (
            <motion.div
              key="login"
              initial={transitionType === 'push' ? { opacity: 0, x: -120 } : { opacity: 0 }}
              animate={{ opacity: 1, x: 0 }}
              exit={transitionType === 'push' ? { opacity: 0, x: -120 } : { opacity: 0 }}
              transition={{ duration: transitionType === 'none' ? 0 : 0.35, ease: 'easeInOut' }}
              className="w-full flex items-center"
            >
              <LoginScreen onNavigate={handleNavigate} savedEmail={userData?.email} />
            </motion.div>
          ) : (
            <motion.div
              key="signup"
              initial={transitionType === 'push' ? { opacity: 0, x: 120 } : { opacity: 0 }}
              animate={{ opacity: 1, x: 0 }}
              exit={transitionType === 'push_back' ? { opacity: 0, scale: 0.94 } : { opacity: 0, x: 120 }}
              transition={{ duration: transitionType === 'none' ? 0 : 0.35, ease: 'easeInOut' }}
              className="w-full"
            >
              <SignupScreen onNavigate={handleNavigate} onRegisterComplete={handleRegisterComplete} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-6xl mx-auto border-t border-black/5 mt-12 pt-4 text-[10px] font-mono text-brand-text-dim flex flex-col md:flex-row items-center justify-between gap-2">
        <div>© 2026 Andromeda Systems: flujo de caja. Acceso solo para personal autorizado.</div>
        <div className="flex items-center gap-3">
          <a href="#" className="hover:text-brand-cyan transition-colors">Administracion</a>
          <span>•</span>
          <a href="#" className="hover:text-brand-cyan transition-colors">Operaciones</a>
          <span>•</span>
          <a href="#" className="hover:text-brand-cyan transition-colors">Estrategias</a>
        </div>
      </footer>
    </div>
  );
}
