import React, { useState, useEffect } from 'react';
import { CreditCard, TrendingUp, PieChart } from 'lucide-react';
import { MilesSimulation } from '../../types/travel';

interface Props {
  initialData: MilesSimulation;
  onSimulate: (data: MilesSimulation) => void;
}

export const MilesSimulator: React.FC<Props> = ({ initialData, onSimulate }) => {
  const [simulation, setSimulation] = useState(initialData);

  const cardTypes = [
    { id: 'basic', name: 'Básico', multiplier: 1.5 },
    { id: 'gold', name: 'Gold', multiplier: 2.0 },
    { id: 'platinum', name: 'Platinum', multiplier: 2.5 }
  ];

  const calculateMonthlyMiles = () => {
    const baseMiles = simulation.monthlySpending * simulation.milesMultiplier;
    const categoryBonus = simulation.categories.reduce((acc, category) => {
      const categorySpending = simulation.monthlySpending * (category.percentage / 100);
      return acc + (categorySpending * category.multiplier);
    }, 0);
    return Math.round(baseMiles + categoryBonus);
  };

  useEffect(() => {
    onSimulate(simulation);
  }, [simulation]);

  return (
    <div className="bg-gray-900 rounded-xl p-6 shadow-xl space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">Simulador de Milhas</h2>
        <CreditCard className="w-6 h-6 text-purple-400" />
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Gasto Mensal
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              R$
            </span>
            <input
              type="number"
              value={simulation.monthlySpending}
              onChange={(e) => setSimulation({
                ...simulation,
                monthlySpending: Number(e.target.value)
              })}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 px-8 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Tipo do Cartão
          </label>
          <div className="grid grid-cols-3 gap-2">
            {cardTypes.map((card) => (
              <button
                key={card.id}
                onClick={() => setSimulation({
                  ...simulation,
                  cardType: card.id as MilesSimulation['cardType'],
                  milesMultiplier: card.multiplier
                })}
                className={`py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                  simulation.cardType === card.id
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {card.name}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-300">Milhas por Mês</span>
            <TrendingUp className="w-5 h-5 text-purple-400" />
          </div>
          <p className="text-3xl font-bold text-white">
            {new Intl.NumberFormat('pt-BR').format(calculateMonthlyMiles())}
          </p>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-300">
              Distribuição de Gastos
            </span>
            <PieChart className="w-4 h-4 text-purple-400" />
          </div>
          {simulation.categories.map((category, index) => (
            <div key={index} className="mb-3">
              <div className="flex justify-between text-sm text-gray-400 mb-1">
                <span>{category.name}</span>
                <span>{category.percentage}%</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-2">
                <div
                  className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${category.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};