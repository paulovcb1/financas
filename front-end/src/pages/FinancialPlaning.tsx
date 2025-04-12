import React, { useState, useEffect } from 'react';
import { Target, Plus, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';
import { useChatStore } from '../store/chatStore';
import { FinancialGoal } from '../types/financialPlaning'; // Ajuste o caminho conforme necessário
import axios from 'axios';


const FinancialPlanning: React.FC = () => {
  const { userData } = useChatStore();
  const [goals, setGoals] = useState<FinancialGoal[]>([]);
  const [newGoal, setNewGoal] = useState({ name: '', targetAmount: 0, months: 0 });

  const monthlyIncome = userData.monthlyIncome || 0;
  const totalExpenses = userData.creditCard?.monthlySpending || 0;
  const availableIncome = monthlyIncome - totalExpenses;

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/financial-goals', {  // essa API ainda nao existe
          params: { userId: userData.id },
        });
        setGoals(response.data);
      } catch (error) {
        console.error('Error fetching goals:', error);
      }
    };
    if (userData.id) fetchGoals();
  }, [userData.id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewGoal((prev) => ({ ...prev, [name]: name === 'name' ? value : Number(value) || 0 }));
  };

  const addGoal = async () => {
    if (newGoal.name && newGoal.targetAmount > 0 && newGoal.months > 0) {
      try {
        const response = await axios.post('http://localhost:5000/api/financial-goals', {
          userId: userData.id,
          name: newGoal.name,
          targetAmount: newGoal.targetAmount,
          months: newGoal.months,
        });
        setGoals([...goals, response.data]);
        setNewGoal({ name: '', targetAmount: 0, months: 0 });
      } catch (error) {
        console.error('Error adding goal:', error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans p-6 pb-24">
      <header className="mb-12">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
          Planejamento Financeiro, {userData.name || 'Usuário'}!
        </h1>
        <p className="mt-2 text-gray-400">Defina suas metas e acompanhe seu progresso</p>
      </header>

      <div className="bg-gray-900/80 p-6 rounded-xl backdrop-blur-md shadow-lg border border-gray-800/50 mb-12">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm">Renda Disponível Mensal</p>
            <p className="text-2xl font-semibold">
              R$ {availableIncome.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </p>
          </div>
          <DollarSign className="w-8 h-8 text-green-400" />
        </div>
      </div>

      <div className="bg-gray-900/80 p-6 rounded-xl backdrop-blur-md shadow-lg border border-gray-800/50 mb-12">
        <h2 className="text-xl font-semibold mb-4">Adicionar Nova Meta</h2>
        <div className="space-y-4">
          <div>
            <label className="text-gray-300 text-sm">Nome da Meta</label>
            <input
              type="text"
              name="name"
              value={newGoal.name}
              onChange={handleInputChange}
              placeholder="Ex.: Viagem ao Japão"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="text-gray-300 text-sm">Valor Total (R$)</label>
              <input
                type="number"
                name="targetAmount"
                value={newGoal.targetAmount || ''}
                onChange={handleInputChange}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>
            <div className="flex-1">
              <label className="text-gray-300 text-sm">Prazo (meses)</label>
              <input
                type="number"
                name="months"
                value={newGoal.months || ''}
                onChange={handleInputChange}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>
          </div>
          <button
            onClick={addGoal}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center"
          >
            <Plus className="w-5 h-5 inline mr-2" />
            Adicionar Meta
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {goals.length > 0 ? (
          goals.map((goal) => {
            const monthlySavings = goal.targetAmount / goal.months;
            const progress = goal.savedAmount ? (goal.savedAmount / goal.targetAmount) * 100 : 0;

            return (
              <div
                key={goal._id}
                className="bg-gray-900/80 p-6 rounded-xl backdrop-blur-md shadow-lg border border-gray-800/50"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">{goal.name}</h3>
                  <Target className="w-6 h-6 text-blue-400" />
                </div>
                <p className="text-gray-400 text-sm">
                  Meta: R$ {goal.targetAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
                <p className="text-gray-400 text-sm">Prazo: {goal.months} meses</p>
                <p className="text-gray-300 mt-2">
                  Economizar por mês: R$ {monthlySavings.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
                <div className="mt-4 bg-gray-700 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-blue-500 h-full transition-all duration-500 ease-out"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="text-gray-400 text-sm mt-2">
                  Progresso: R$ {goal.savedAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} ({progress.toFixed(1)}%)
                </p>
              </div>
            );
          })
        ) : (
          <p className="text-gray-400 text-center">Nenhuma meta adicionada ainda.</p>
        )}
      </div>
    </div>
  );
};

export default FinancialPlanning;