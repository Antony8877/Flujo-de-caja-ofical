import React, { useState } from 'react';
import { Info, Check } from 'lucide-react';
import { Transaction, ScreenId } from '../types';

interface AnulacionScreenProps {
  transactions: Transaction[];
  selectedTransactionId: string;
  onAnnul: (id: string, reason: string) => void;
  onNavigate: (screen: ScreenId, transition: 'none' | 'push_back' | 'slide_left') => void;
  onSelectTransaction: (id: string) => void;
}

export default function AnulacionScreen({
  transactions,
  selectedTransactionId,
  onAnnul,
  onNavigate,
  onSelectTransaction,
}: AnulacionScreenProps) {
  const [reason, setReason] = useState('');
  const [isErrorShake, setIsErrorShake] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const activeTransactions = transactions.filter((t) => !t.annulled);
  const annulledTransactions = transactions.filter((t) => t.annulled);

  let currentTx = transactions.find((t) => t.id === selectedTransactionId);
  if (!currentTx || currentTx.annulled) {
    currentTx = activeTransactions[0] || undefined;
  }

  const handleConfirmAnnulment = () => {
    if (!currentTx) return;
    if (!reason.trim()) {
      setIsErrorShake(true);
      setTimeout(() => setIsErrorShake(false), 800);
      return;
    }
    onAnnul(currentTx.id, reason);
    setIsSuccess(true);
    setReason('');
    setTimeout(() => setIsSuccess(false), 3000);
  };

  return (
    <div className="max-w-[1000px] mx-auto px-8 py-8">
      {/* Title block */}
      <div className="mb-6">
        <h2 className="text-3xl font-extrabold text-brand-text tracking-tight">
          Anular Transacción
        </h2>
        <p className="text-xs text-brand-text-dim font-semibold mt-1">
          Proceso riguroso de cancelación y reversión para libros de Agrovet Manantial.
        </p>
      </div>

      {/* Main card */}
      <div className="bg-brand-surface border border-brand-outline/60 rounded-xl overflow-hidden shadow-sm mb-6">

        {/* Card Header with choice of active transactions */}
        <div className="p-6 border-b border-brand-outline/60 bg-brand-bg">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-brand-text">
                Detalles de la Transacción a Anular
              </h3>
              <p className="text-xs text-brand-text-dim font-semibold mt-0.5">
                Seleccione de la lista o complete el formulario de motivo para proceder.
              </p>
            </div>

            {activeTransactions.length > 1 && (
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-brand-text-dim">Transacción:</span>
                <select
                  value={currentTx?.id || ''}
                  onChange={(e) => onSelectTransaction(e.target.value)}
                  className="bg-brand-surface border border-brand-outline/60 rounded-lg px-2.5 py-1 text-xs font-semibold text-brand-text focus:outline-none focus:border-brand-cyan cursor-pointer"
                  id="transaction-selector"
                >
                  {activeTransactions.map((tx) => (
                    <option key={tx.id} value={tx.id}>
                      {tx.concept} - {tx.currency === 'USD' ? '$' : 'S/'}
                      {tx.amount.toFixed(2)}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {currentTx ? (
            <div className="flex flex-wrap justify-between items-end mt-6 pt-4 border-t border-brand-outline/40">
              <div>
                <p className="text-xs font-medium text-brand-text-dim">Concepto</p>
                <p className="text-base font-bold text-brand-text">{currentTx.concept}</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-medium text-brand-text-dim">Monto</p>
                <p className="text-2xl font-extrabold text-brand-cyan">
                  {currentTx.currency === 'USD' ? '$' : 'S/'}
                  {currentTx.amount.toFixed(2)} {currentTx.currency}
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center py-4 text-xs font-semibold text-rose-600">
              No hay transacciones activas disponibles para anular. Registre una nueva primero.
            </div>
          )}
        </div>

        {/* Card columns */}
        {currentTx && (
          <div className="grid grid-cols-1 md:grid-cols-2">

            {/* Left Details Pane */}
            <div className="p-6 border-r border-brand-outline/60 space-y-4 bg-brand-surface">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-brand-text-dim">
                  Fecha original
                </span>
                <p className="text-sm font-semibold text-brand-text mt-0.5">{currentTx.date}</p>
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-brand-text-dim">
                  Cuenta origen
                </span>
                <p className="text-sm font-semibold text-brand-text mt-0.5">{currentTx.account}</p>
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-brand-text-dim">
                  ID de Auditoría
                </span>
                <p className="text-sm font-mono text-brand-text-dim mt-0.5">{currentTx.id}</p>
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-brand-text-dim">
                  Tipo de flujo
                </span>
                <span className={`inline-block text-[10px] font-bold uppercase tracking-wide px-2.5 py-0.5 rounded-full ml-2 ${
                  currentTx.type === 'ingreso'
                    ? 'bg-brand-cyan/10 text-brand-cyan'
                    : 'bg-rose-50 text-rose-700'
                }`}>
                  {currentTx.type}
                </span>
              </div>
            </div>

            {/* Right Form Pane */}
            <div className="p-6 flex flex-col justify-between bg-brand-surface">
              <div>
                <label
                  className="block text-md font-bold text-brand-text mb-2"
                  htmlFor="motivo"
                >
                  Motivo de la anulación
                </label>

                <div className="relative">
                  <textarea
                    id="motivo"
                    maxLength={500}
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="Explique el motivo de la anulación..."
                    className={`w-full min-h-[140px] p-4 bg-brand-container-lowest border rounded-lg text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-brand-cyan focus:border-brand-cyan transition-all resize-none ${
                      isErrorShake ? 'border-rose-600 animate-bounce' : 'border-brand-outline/60'
                    }`}
                  ></textarea>

                  <div
                    className={`absolute bottom-3 right-3 text-[10px] font-bold px-1.5 py-0.5 rounded ${
                      reason.length > 450 ? 'text-rose-600 bg-rose-50' : 'text-brand-text-dim'
                    }`}
                    id="char-count"
                  >
                    {reason.length}/500
                  </div>
                </div>
              </div>

              <p className="text-[11px] text-brand-text-dim font-medium mt-2">
                Por favor, proporcione una explicación clara. Esta descripción formará parte del registro permanente de auditoría fiscal.
              </p>
            </div>

          </div>
        )}

        {/* Action Footer */}
        <div className="p-6 bg-brand-bg flex flex-wrap items-center justify-between gap-4 border-t border-brand-outline/60">
          {isSuccess ? (
            <div className="flex items-center gap-2 text-emerald-800 text-xs font-bold bg-emerald-50 px-4 py-2 rounded-lg border border-emerald-200">
              <Check className="w-4 h-4 text-emerald-700" />
              ¡Transacción anulada correctamente en el sistema!
            </div>
          ) : (
            <div className="text-xs text-brand-text-dim font-semibold">
              * Todos los campos son requeridos para fines contables.
            </div>
          )}

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('registro', 'push_back')}
              className="px-5 py-2.5 border border-brand-cyan text-brand-cyan rounded-lg text-xs font-bold hover:bg-brand-cyan/10 transition-colors active:scale-95 cursor-pointer"
              id="cancel-annulment-btn"
            >
              Cancelar
            </button>

            {currentTx && (
              <button
                onClick={handleConfirmAnnulment}
                className="px-5 py-2.5 bg-rose-700 text-white hover:bg-rose-800 rounded-lg text-xs font-bold flex items-center gap-2 transition-all shadow-sm active:scale-95 cursor-pointer"
                id="confirm-annulment-btn"
              >
                <span>Confirmar Anulación</span>
              </button>
            )}
          </div>
        </div>

      </div>

      {/* Warning irreversible banner */}
      <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl flex gap-3.5 items-start shadow-sm mb-8">
        <Info className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
        <div>
          <h4 className="text-xs font-bold text-rose-700">
            Acción irreversible
          </h4>
          <p className="text-xs text-rose-600/90 font-medium mt-1 leading-relaxed">
            Una vez confirmada la anulación, esta transacción pasará al historial de transacciones anuladas y no podrá ser restaurada. Los fondos serán revertidos a la cuenta de origen automáticamente.
          </p>
        </div>
      </div>

      {/* Annulled transactions log */}
      {annulledTransactions.length > 0 && (
        <div className="mt-4 mb-8">
          <h3 className="text-sm font-bold text-brand-text uppercase tracking-wider mb-4">
            Historial de Transacciones Anuladas ({annulledTransactions.length})
          </h3>
          <div className="bg-brand-surface border border-brand-outline/60 rounded-xl overflow-hidden shadow-sm">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-brand-bg border-b border-brand-outline/60 text-brand-text-dim font-bold text-[11px] uppercase tracking-wider">
                  <th className="p-3">ID</th>
                  <th className="p-3">Concepto Original</th>
                  <th className="p-3">Monto Revertido</th>
                  <th className="p-3">Fecha de Anulación</th>
                  <th className="p-3">Motivo</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-outline/40 text-xs font-semibold text-brand-text">
                {annulledTransactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-brand-bg/50 transition-colors">
                    <td className="p-3 font-mono text-brand-text-dim">{tx.id}</td>
                    <td className="p-3">{tx.concept}</td>
                    <td className="p-3 text-rose-600">
                      {tx.currency === 'USD' ? '$' : 'S/'}
                      {tx.amount.toFixed(2)} {tx.currency}
                    </td>
                    <td className="p-3 font-medium text-brand-text-dim">{tx.annulmentDate}</td>
                    <td className="p-3 max-w-[280px] truncate text-brand-text-dim" title={tx.annulmentReason}>
                      {tx.annulmentReason}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
