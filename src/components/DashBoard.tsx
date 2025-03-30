import React, { useEffect, useState } from 'react';
import { DollarSign, CreditCard, TrendingUp, PieChart, Edit2 } from 'lucide-react';
import { useChatStore } from '../store/chatStore';
import { UserData } from '../types/chat';

export const Dashboard: React.FC = () => {
  const { userData, updateUserData } = useChatStore();
  const [financialData, setFinancialData] = useState<Partial<UserData> | null>(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState<'income' | 'expenses' | 'creditCard' | null>(null);
  const [formData, setFormData] = useState({
    monthlyIncome: userData.monthlyIncome || 0,
    fixedExpenses: userData.fixedExpenses || 0,
    variableExpenses: userData.variableExpenses || 0,
    creditCardSpending: userData.creditCard?.monthlySpending || 0,
  });

  useEffect(() => {
    const fetchFinancialData = async () => {
      try {
        setLoading(true);
        setFinancialData(userData);
        setFormData({
          monthlyIncome: userData.monthlyIncome || 0,
          fixedExpenses: userData.fixedExpenses || 0,
          variableExpenses: userData.variableExpenses || 0,
          creditCardSpending: userData.creditCard?.monthlySpending || 0,
        });
      } catch (error) {
        console.error('Error fetching financial data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFinancialData();
  }, [userData]);

  const handleOpenModal = (section: 'income' | 'expenses' | 'creditCard') => {
    setModalOpen(section);
  };

  const handleCloseModal = () => {
    setModalOpen(null);
    // Reseta o formData para os valores originais ao cancelar
    setFormData({
      monthlyIncome: financialData?.monthlyIncome || 0,
      fixedExpenses: financialData?.fixedExpenses || 0,
      variableExpenses: financialData?.variableExpenses || 0,
      creditCardSpending: financialData?.creditCard?.monthlySpending || 0,
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value === '' ? 0 : parseFloat(value) || 0,
    }));
  };

  const handleSave = async () => {
    const { saveUserDataToDB } = useChatStore.getState();
    const updatedData: Partial<UserData> = {};
    if (modalOpen === 'income') updatedData.monthlyIncome = formData.monthlyIncome;
    else if (modalOpen === 'expenses') {
      updatedData.fixedExpenses = formData.fixedExpenses;
      updatedData.variableExpenses = formData.variableExpenses;
    } else if (modalOpen === 'creditCard' && financialData?.creditCard?.uses) {
      updatedData.creditCard = { ...financialData.creditCard, monthlySpending: formData.creditCardSpending };
    }
  
    try {
      updateUserData(updatedData);
      await saveUserDataToDB(); // Agora usa PUT se _id existir
      setModalOpen(null);
    } catch (error) {
      console.error('Erro ao salvar no dashboard:', error);
      // Opcional: Adicione feedback ao usuário
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900 text-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!financialData || !financialData.name) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900 text-gray-100">
        <p>Nenhum dado financeiro disponível. Complete o chat inicial primeiro.</p>
      </div>
    );
  }

  const fixedExpenses = formData.fixedExpenses;
  const variableExpenses = formData.variableExpenses;
  const creditCardSpending = financialData.creditCard?.uses ? formData.creditCardSpending : 0;
  const totalExpenses = fixedExpenses + variableExpenses + creditCardSpending;
  const availableIncome = financialData.monthlyIncome ? formData.monthlyIncome - totalExpenses : 0;
  const spendingPercentage = financialData.monthlyIncome && totalExpenses > 0
    ? ((totalExpenses / formData.monthlyIncome) * 100).toFixed(1)
    : '0';

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Olá, {financialData.name}!</h1>
        <p className="text-gray-400">Seu Dashboard Financeiro</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Income Card */}
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Renda Mensal</p>
              <p className="text-2xl font-semibold">
                R$ {formData.monthlyIncome.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="w-8 h-8 text-green-500" />
              <button onClick={() => handleOpenModal('income')} className="p-2 hover:bg-gray-700 rounded-full">
                <Edit2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Total Expenses Card */}
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Despesas Totais</p>
              <p className="text-2xl font-semibold">
                R$ {totalExpenses.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
            </div>
            <CreditCard className="w-8 h-8 text-red-500" />
          </div>
        </div>

        {/* Available Income Card */}
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Renda Disponível</p>
              <p className="text-2xl font-semibold">
                R$ {availableIncome.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
            </div>
            <TrendingUp className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        {/* Spending Distribution */}
        {totalExpenses > 0 && (
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg col-span-1 md:col-span-2">
            <div className="flex items-center gap-4">
              <PieChart className="w-8 h-8 text-purple-500" />
              <div>
                <p className="text-gray-400 text-sm">Distribuição de Gastos</p>
                <p className="text-xl font-semibold">
                  {spendingPercentage}% da renda em despesas
                </p>
                <div className="mt-2 bg-gray-700 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-purple-500 h-full transition-all duration-500"
                    style={{ width: `${spendingPercentage}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Detailed Expenses */}
      <div className="mt-8 bg-gray-800 p-6 rounded-xl shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Detalhamento de Despesas</h2>
          <button onClick={() => handleOpenModal('expenses')} className="p-2 hover:bg-gray-700 rounded-full">
            <Edit2 className="w-5 h-5" />
          </button>
        </div>
        <div className="space-y-2">
          <p className="text-gray-300">
            Despesas Fixas: R$ {fixedExpenses.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </p>
          <p className="text-gray-300">
            Despesas Variáveis: R$ {variableExpenses.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </p>
          {financialData.creditCard?.uses && (
            <div className="flex justify-between items-center">
              <p className="text-gray-300">
                Cartão de Crédito: R$ {creditCardSpending.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
              <button onClick={() => handleOpenModal('creditCard')} className="p-2 hover:bg-gray-700 rounded-full">
                <Edit2 className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Financial Tips */}
      <div className="mt-8 bg-gray-800 p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Dica Financeira</h2>
        <p className="text-gray-300">
          {totalExpenses > 0
            ? Number(spendingPercentage) > 50
              ? "Você está gastando mais da metade da sua renda. Considere reduzir despesas para ter mais controle financeiro!"
              : "Ótimo trabalho mantendo os gastos sob controle!"
            : "Você não registrou despesas ainda. Continue monitorando seus gastos!"}
        </p>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">
              {modalOpen === 'income' ? 'Editar Renda Mensal' : 
               modalOpen === 'expenses' ? 'Editar Despesas' : 
               'Editar Gastos com Cartão'}
            </h3>
            <div className="space-y-4">
              {modalOpen === 'income' && (
                <div>
                  <label className="text-gray-300">Renda Mensal (R$)</label>
                  <input
                    type="number"
                    name="monthlyIncome"
                    value={formData.monthlyIncome}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 text-gray-100 border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}
              {modalOpen === 'expenses' && (
                <>
                  <div>
                    <label className="text-gray-300">Despesas Fixas (R$)</label>
                    <input
                      type="number"
                      name="fixedExpenses"
                      value={formData.fixedExpenses}
                      onChange={handleInputChange}
                      className="w-full bg-gray-700 text-gray-100 border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="text-gray-300">Despesas Variáveis (R$)</label>
                    <input
                      type="number"
                      name="variableExpenses"
                      value={formData.variableExpenses}
                      onChange={handleInputChange}
                      className="w-full bg-gray-700 text-gray-100 border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </>
              )}
              {modalOpen === 'creditCard' && financialData.creditCard?.uses && (
                <div>
                  <label className="text-gray-300">Gastos com Cartão (R$)</label>
                  <input
                    type="number"
                    name="creditCardSpending"
                    value={formData.creditCardSpending}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 text-gray-100 border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}
            </div>
            <div className="mt-6 flex justify-end gap-4">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};