import React from 'react';
import { Pencil } from 'lucide-react';
import { Transaction } from '../../types';

interface TransactionRowProps {
  transaction: Transaction;
  onEdit?: (id: string) => void;
  onAnnul?: (id: string) => void;
}

export default function TransactionRow({
  transaction: tx,
  onEdit,
  onAnnul,
}: TransactionRowProps) {
  return (
    <div
      className={`p-4 flex items-center justify-between text-xs font-semibold hover:bg-brand-bg transition-colors ${
        tx.annulled ? 'opacity-50 line-through bg-brand-bg/50' : ''
      }`}
    >
      <div className="text-left">
        <span className="text-[10px] font-mono text-brand-text-dim block leading-none mb-1">
          {tx.id} • {tx.date}
        </span>
        <span className="text-brand-text text-xs font-bold">
          {tx.concept}
        </span>
      </div>

      <div className="flex items-center gap-3">
        <span
          className={`text-xs font-bold ${
            tx.annulled
              ? 'text-brand-text-dim'
              : tx.type === 'ingreso'
                ? 'text-brand-cyan'
                : 'text-rose-600'
          }`}
        >
          {tx.type === 'ingreso' ? '+' : '-'}{' '}
          {tx.currency === 'USD' ? '$' : 'S/'}
          {tx.amount.toFixed(2)}
        </span>

        {!tx.annulled && (
          <div className="flex items-center gap-1.5">
            {onEdit && (
              <button
                onClick={() => onEdit(tx.id)}
                className="text-[10px] bg-brand-cyan/10 text-brand-cyan px-2 py-1 border border-brand-cyan/30 rounded hover:bg-brand-cyan hover:text-white transition-all cursor-pointer flex items-center gap-1"
                title="Editar esta transacción"
              >
                <Pencil className="w-3 h-3" />
                Editar
              </button>
            )}
            {onAnnul && (
              <button
                onClick={() => onAnnul(tx.id)}
                className="text-[10px] bg-rose-50 text-rose-700 px-2 py-1 border border-rose-200 rounded hover:bg-rose-700 hover:text-white transition-all cursor-pointer"
                title="Anular esta transacción"
              >
                Anular
              </button>
            )}
          </div>
        )}

        {tx.annulled && (
          <span className="text-[10px] bg-rose-50 text-rose-700 px-2 py-0.5 rounded border border-rose-200 font-bold whitespace-nowrap">
            Anulada
          </span>
        )}
      </div>
    </div>
  );
}
