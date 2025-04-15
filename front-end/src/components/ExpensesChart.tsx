import React from 'react';
import { PieChart } from 'lucide-react';
import { Expense } from '../types/dashboard'; // Assumindo que o tipo Expense está definido

interface Props {
  expenses: Expense[];
}

export const ExpensesChart: React.FC<Props> = ({ expenses }) => {
  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div className="bg-gray-900/80 rounded-xl p-6 shadow-lg border border-gray-800/50 backdrop-blur-md">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white">Gastos por Categoria</h2>
        <PieChart className="w-6 h-6 text-gray-400" />
      </div>

      <div className="space-y-4">
        {expenses.length > 0 ? (
          expenses.map((expense, index) => (
            <div key={index} className="flex items-center">
              <div className="w-full">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-gray-300">
                    {expense.category}
                  </span>
                  <span className="text-sm text-gray-400">
                    {new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    }).format(expense.amount)}
                  </span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                  <div
                    className="h-2 rounded-full transition-all duration-500"
                    style={{
                      width: `${(expense.amount / total) * 100}%`,
                      backgroundColor: expense.color,
                    }}
                  />
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-sm">Nenhuma despesa registrada ainda.</p>
        )}
      </div>
    </div>
  );
};

export default ExpensesChart;