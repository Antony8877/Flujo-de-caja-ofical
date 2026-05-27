import React, { useState } from 'react';
import { Calendar, ArrowDown, ArrowUp, Save, CheckCircle2 } from 'lucide-react';
import { Transaction, TransactionType } from '../types';

interface RegistroScreenProps {
  onSave: (transactionData: Omit<Transaction, 'id' | 'annulled'>) => void;
  searchQuery: string;
  transactions: Transaction[];
  onSelectTransactionToAnnul: (id: string) => void;
}

export default function RegistroScreen({
  onSave,
  searchQuery,
  transactions,
  onSelectTransactionToAnnul,
}: RegistroScreenProps) {
  const [date, setDate] = useState('20/09/2024');
  const [type, setType] = useState<TransactionType>('ingreso');
  const [concept, setConcept] = useState('');
  const [entrada, setEntrada] = useState('');
  const [salida, setSalida] = useState('');
  
  const [notification, setNotification] = useState<string | null>(null);

  // Filter transactions for search query
  const filteredTxs = transactions.filter((t) => {
    if (!searchQuery) return true;
    return (
      t.concept.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.amount.toString().includes(searchQuery)
    );
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!concept.trim()) {
      alert('Por favor ingrese un concepto válido.');
      return;
    }

    const amount = type === 'ingreso' ? parseFloat(entrada) || 0 : parseFloat(salida) || 0;
    if (amount <= 0) {
      alert(`Por favor ingrese un monto válido de ${type === 'ingreso' ? 'Entrada' : 'Salida'}.`);
      return;
    }

    onSave({
      concept: concept.trim(),
      amount,
      currency: 'USD',
      date,
      account: 'Principal (USD) ••••1234',
      type,
    });

    // Provide feedback
    setNotification('¡Transacción registrada exitosamente!');
    setTimeout(() => setNotification(null), 3000);

    // Reset fields
    setConcept('');
    setEntrada('');
    setSalida('');
  };

  const handleTypeChange = (newType: TransactionType) => {
    setType(newType);
    if (newType === 'ingreso') {
      setSalida('');
    } else {
      setEntrada('');
    }
  };

  return (
    <div className="max-w-[1000px] mx-auto px-8 py-8 flex flex-col items-center">
      {/* View Title */}
      <div className="w-full max-w-[600px] mb-8 text-center">
        <h2 className="text-3xl font-extrabold text-brand-text">
          Registrar Transacción
        </h2>
        <p className="text-brand-text-dim text-xs font-semibold max-w-sm mx-auto mt-2.5">
          Complete los detalles financieros para el registro oficial en los libros de Agrovet Manantial.
        </p>
      </div>

      {/* Main card */}
      <div className="bg-brand-surface border border-brand-outline/60 rounded-xl w-full max-w-[600px] p-6 shadow-sm">
        
        {notification && (
          <div className="mb-4 p-3 bg-emerald-50 text-emerald-800 text-xs font-bold rounded-lg border border-emerald-200 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-700" />
            {notification}
          </div>
        )}

        <form onSubmit={handleFormSubmit} className="flex flex-col gap-5">
          
          {/* Fecha Input */}
          <div className="flex flex-col gap-1.5 text-left">
            <label className="text-xs font-bold text-brand-text-dim" htmlFor="fecha">
              Fecha
            </label>
            <div className="relative group">
              <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-outline transition-colors group-focus-within:text-brand-cyan" />
              <input
                type="text"
                id="fecha"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-brand-outline/60 focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan transition-all bg-brand-container-lowest text-xs font-semibold focus:outline-none"
              />
            </div>
          </div>

          {/* Cuenta Type Choice */}
          <div className="flex flex-col gap-1.5 text-left">
            <label className="text-xs font-bold text-brand-text-dim">
              Cuenta (Tipo de Registro)
            </label>
            <div className="grid grid-cols-2 gap-4">
              
              <button
                type="button"
                onClick={() => handleTypeChange('ingreso')}
                className={`flex items-center justify-center gap-2.5 p-3.5 rounded-lg border transition-all cursor-pointer ${
                  type === 'ingreso'
                    ? 'bg-brand-cyan/10 border-brand-cyan text-brand-cyan font-bold shadow-sm'
                    : 'bg-brand-surface border-brand-outline/60 text-brand-text-dim hover:border-brand-cyan'
                }`}
              >
                <ArrowDown className="w-4 h-4" />
                <span className="text-xs font-semibold">Ingreso</span>
              </button>

              <button
                type="button"
                onClick={() => handleTypeChange('egreso')}
                className={`flex items-center justify-center gap-2.5 p-3.5 rounded-lg border transition-all cursor-pointer ${
                  type === 'egreso'
                    ? 'bg-rose-50 border-rose-600 text-rose-800 font-bold shadow-sm'
                    : 'bg-brand-surface border-brand-outline/60 text-brand-text-dim hover:border-brand-cyan'
                }`}
              >
                <ArrowUp className="w-4 h-4" />
                <span className="text-xs font-semibold">Egreso</span>
              </button>

            </div>
          </div>

          {/* Concepto Input */}
          <div className="flex flex-col gap-1.5 text-left">
            <label className="text-xs font-bold text-brand-text-dim" htmlFor="concepto">
              Concepto / Glosa
            </label>
            <input
              type="text"
              id="concepto"
              value={concept}
              onChange={(e) => setConcept(e.target.value)}
              placeholder="Ej. Venta de suministros veterinarios"
              className="w-full px-4 py-2.5 rounded-lg border border-brand-outline/60 focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan transition-all bg-brand-container-lowest text-xs font-semibold focus:outline-none"
              required
            />
          </div>

          {/* Double column inputs for amounts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
            
            {/* Entrada Amount */}
            <div className={`flex flex-col gap-1.5 transition-opacity ${type === 'egreso' ? 'opacity-40' : 'opacity-100'}`}>
              <label className="text-xs font-bold text-brand-text-dim" htmlFor="entrada">
                Entrada (Monto recibido)
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-brand-outline">$</span>
                <input
                  type="number"
                  step="0.01"
                  id="entrada"
                  value={entrada}
                  disabled={type === 'egreso'}
                  onChange={(e) => setEntrada(e.target.value)}
                  placeholder="0.00"
                  className="w-full pl-8 pr-4 py-2.5 rounded-lg border border-brand-outline/60 focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan transition-all bg-brand-container-lowest text-xs font-semibold focus:outline-none"
                />
              </div>
            </div>

            {/* Salida Amount */}
            <div className={`flex flex-col gap-1.5 transition-opacity ${type === 'ingreso' ? 'opacity-40' : 'opacity-100'}`}>
              <label className="text-xs font-bold text-brand-text-dim" htmlFor="salida">
                Salida (Monto egresado)
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-brand-outline">$</span>
                <input
                  type="number"
                  step="0.01"
                  id="salida"
                  value={salida}
                  disabled={type === 'ingreso'}
                  onChange={(e) => setSalida(e.target.value)}
                  placeholder="0.00"
                  className="w-full pl-8 pr-4 py-2.5 rounded-lg border border-brand-outline/60 focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan transition-all bg-brand-container-lowest text-xs font-semibold focus:outline-none"
                />
              </div>
            </div>

          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-2.5 bg-brand-cyan hover:bg-brand-cyan/90 text-white py-3 px-6 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-[0_4px_12px_rgba(31,81,60,0.12)] hover:shadow-[0_4px_16px_rgba(31,81,60,0.22)] active:scale-[0.98] cursor-pointer"
            id="save-transaction-btn"
          >
            <Save className="w-4 h-4 text-[#a7f3d0]" />
            Guardar Transacción
          </button>

        </form>
      </div>

      {/* Interactive List of Transactions for searching / inspecting */}
      <div className="w-full max-w-[600px] mt-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xs font-bold text-brand-text uppercase tracking-wider">
            Transacciones Registradas ({filteredTxs.length})
          </h3>
          {searchQuery && (
            <span className="text-[10px] bg-brand-bg text-brand-text-dim px-2 py-0.5 rounded font-bold">
              Filtrado
            </span>
          )}
        </div>

        <div className="bg-brand-surface border border-brand-outline/60 rounded-xl overflow-hidden shadow-sm max-h-[300px] overflow-y-auto">
          {filteredTxs.length > 0 ? (
            <div className="divide-y divide-brand-outline/40">
              {filteredTxs.map((tx) => (
                <div 
                  key={tx.id} 
                  className={`p-4 flex items-center justify-between text-xs font-semibold group hover:bg-brand-bg transition-colors ${
                    tx.annulled ? 'opacity-50 line-through bg-brand-bg/50' : ''
                  }`}
                >
                  <div className="text-left">
                    <span className="text-[10px] font-mono text-brand-text-dim block leading-none mb-1">
                      {tx.id} • {tx.date}
                    </span>
                    <span className="text-brand-text text-xs font-bold">{tx.concept}</span>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <span className={`text-xs font-bold ${
                      tx.annulled 
                        ? 'text-brand-text-dim' 
                        : tx.type === 'ingreso' 
                          ? 'text-brand-cyan' 
                          : 'text-rose-600'
                    }`}>
                      {tx.type === 'ingreso' ? '+' : '-'} {tx.currency === 'USD' ? '$' : 'S/'}
                      {tx.amount.toFixed(2)}
                    </span>

                    {!tx.annulled && (
                      <button
                        onClick={() => onSelectTransactionToAnnul(tx.id)}
                        className="text-[10px] bg-rose-50 text-rose-700 px-2 py-1 border border-rose-200 rounded hover:bg-rose-700 hover:text-white transition-all cursor-pointer opacity-0 group-hover:opacity-100 focus:opacity-100"
                        title="Ir a anular esta transacción"
                      >
                        Anular
                      </button>
                    )}
                    
                    {tx.annulled && (
                      <span className="text-[10px] bg-rose-50 text-rose-700 px-2 py-0.5 rounded border border-rose-200 font-bold whitespace-nowrap">
                        Anulada
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-xs text-brand-text-dim font-semibold">
              No se encontraron transacciones elegibles.
            </div>
          )}
        </div>
      </div>

      {/* Decorative Context Card (Bento Style) */}
      <div className="w-full max-w-[600px] mt-8">
        <div className="relative w-full aspect-[16/6] rounded-xl overflow-hidden group shadow-sm border border-brand-outline/60">
          <img
            alt="Agrovet Context"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            src="https://lh3.googleusercontent.com/aida/ADBb0ujfvYoAjb4GNlGGgHLiYFMF8cpPZzTemeVs1qSfAsM7TsQ39XlGlqUCWrUv7_2FnHwphc0hpYUolKC0-xl-19OjjPeRCz5F-KG02HrktPJDimIfPgi8HVo4EFKs9t7I_SE1Qx008yyk6P-RHNdaiFyX_2Aag2YqOfGv3glJb9iFWdh1c4ygXP9VXha0dOfF5xxebB7pMebPuqVJWgBs1NtrB9rTvf-AN07oDqBp5b618v3fLPrEptaVW0uj"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-cyan/80 via-brand-cyan/25 to-transparent flex items-end p-5">
            <p className="text-white text-xs font-semibold italic">
              "Precisión en cada dato, crecimiento para el campo."
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
