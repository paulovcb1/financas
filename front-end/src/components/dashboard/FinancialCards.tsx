import React from 'react';
import { Edit2 } from 'lucide-react';
import { FinancialCardProps } from '../../types/dashboard';



export const FinancialCard: React.FC<FinancialCardProps> = ({ title, value, icon, onEdit }) => (
  <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-400 text-sm">{title}</p>
        <p className="text-2xl font-semibold">
          R$ {value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
        </p>
      </div>
      <div className="flex items-center gap-2">
        {icon}
        {onEdit && (
          <button onClick={onEdit} className="p-2 hover:bg-gray-700 rounded-full">
            <Edit2 className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  </div>
);