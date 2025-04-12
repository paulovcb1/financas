import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DollarSign, CreditCard, TrendingUp, PieChart, Edit2 } from 'lucide-react';
import { useChatStore } from '../store/chatStore';
import { UserData } from '../types/chat';
import { FormData } from '../types/dashboard';
import { FinancialCard } from '../components/dashboard/FinancialCards'; 
import { EditModal } from '../components/dashboard/EditModal'; 



export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { userData, updateUserData } = useChatStore();
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState<'income' | 'expenses' | null>(null); 
  const [formData, setFormData] = useState<FormData>({
    monthlyIncome: userData.monthlyIncome?.toString() || '',
    fixedExpenses: userData.fixedExpenses?.toString() || '',
    variableExpenses: userData.variableExpenses?.toString() || '',
    creditCardSpending: userData.creditCard?.monthlySpending?.toString() || '',
  });

  useEffect(() => {
    setLoading(false);
  }, [userData]);

  const handleOpenModal = (section: 'income' | 'expenses') => {
    setModalOpen(section);
    setFormData({ 
      monthlyIncome: userData.monthlyIncome?.toString() || '',
      fixedExpenses: userData.fixedExpenses?.toString() || '',
      variableExpenses: userData.variableExpenses?.toString() || '',
      creditCardSpending: userData.creditCard?.monthlySpending?.toString() || '',
    });
  };

  const handleCloseModal = () => {
    setModalOpen(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    const { saveUserDataToDB } = useChatStore.getState();
    const updatedData: Partial<UserData> = {};
    if (modalOpen === 'income') {
      updatedData.monthlyIncome = formData.monthlyIncome ? parseFloat(formData.monthlyIncome) : undefined;
    } else if (modalOpen === 'expenses') {
      updatedData.fixedExpenses = formData.fixedExpenses ? parseFloat(formData.fixedExpenses) : undefined;
      updatedData.variableExpenses = formData.variableExpenses ? parseFloat(formData.variableExpenses) : undefined;
      if (userData.creditCard?.uses) {
        updatedData.creditCard = {
          ...userData.creditCard,
          monthlySpending: formData.creditCardSpending ? parseFloat(formData.creditCardSpending) : undefined,
        };
      }
    }

    try {
      updateUserData(updatedData);
      await saveUserDataToDB();
      setModalOpen(null);
    } catch (error) {
      console.error('Erro ao salvar no dashboard:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900 text-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!userData || !userData.name) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900 text-gray-100 px-4">
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-semibold mb-4">🚧 Dados incompletos</h2>
          <p className="text-gray-300 mb-6">
            Parece que você ainda não completou o início da conversa. Para visualizar suas informações financeiras, por favor, retorne ao chat e forneça seus dados básicos.
          </p>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-200"
          >
            Voltar para o início
          </button>
        </div>
      </div>
    );
  }

  const fixedExpensesNum = formData.fixedExpenses ? parseFloat(formData.fixedExpenses) : userData.fixedExpenses || 0;
  const variableExpensesNum = formData.variableExpenses ? parseFloat(formData.variableExpenses) : userData.variableExpenses || 0;
  const creditCardSpendingNum = formData.creditCardSpending
    ? parseFloat(formData.creditCardSpending)
    : userData.creditCard?.monthlySpending || 0;
  const monthlyIncomeNum = formData.monthlyIncome ? parseFloat(formData.monthlyIncome) : userData.monthlyIncome || 0;

  const totalExpenses = fixedExpensesNum + variableExpensesNum + creditCardSpendingNum;
  const availableIncome = monthlyIncomeNum - totalExpenses;
  const spendingPercentage = monthlyIncomeNum && totalExpenses > 0
    ? ((totalExpenses / monthlyIncomeNum) * 100).toFixed(1)
    : '0';

  const getModalFields = () => {
    if (modalOpen === 'income') {
      return [{ label: 'Renda Mensal (R$)', name: 'monthlyIncome', value: formData.monthlyIncome }];
    } else if (modalOpen === 'expenses') {
      const fields = [
        { label: 'Despesas Fixas (R$)', name: 'fixedExpenses', value: formData.fixedExpenses },
        { label: 'Despesas Variáveis (R$)', name: 'variableExpenses', value: formData.variableExpenses },
      ];
      if (userData.creditCard?.uses) {
        fields.push({ label: 'Gastos com Cartão (R$)', name: 'creditCardSpending', value: formData.creditCardSpending });
      }
      return fields;
    }
    return [];
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6 pb-24">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Olá, {userData.name}!</h1>
        <p className="text-gray-400">Seu Dashboard Financeiro</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <FinancialCard
          title="Renda Mensal"
          value={monthlyIncomeNum}
          icon={<DollarSign className="w-8 h-8 text-green-500" />}
          onEdit={() => handleOpenModal('income')}
        />
        <FinancialCard
          title="Despesas Totais"
          value={totalExpenses}
          icon={<CreditCard className="w-8 h-8 text-red-500" />}
        />
        <FinancialCard
          title="Renda Disponível"
          value={availableIncome}
          icon={<TrendingUp className="w-8 h-8 text-blue-500" />}
        />

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

      <div className="mt-8 bg-gray-800 p-6 rounded-xl shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Detalhamento de Despesas</h2>
          <button onClick={() => handleOpenModal('expenses')} className="p-2 hover:bg-gray-700 rounded-full">
            <Edit2 className="w-5 h-5" />
          </button>
        </div>
        <div className="space-y-2">
          <p className="text-gray-300">
            Despesas Fixas: R$ {fixedExpensesNum.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </p>
          <p className="text-gray-300">
            Despesas Variáveis: R$ {variableExpensesNum.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </p>
          {userData.creditCard?.uses && (
            <p className="text-gray-300">
              Cartão de Crédito: R$ {creditCardSpendingNum.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </p>
          )}
        </div>
      </div>

      <div className="mt-8 bg-gray-800 p-6 rounded-xl shadow-lg ">
        <h2 className="text-xl font-semibold mb-4">Dica Financeira</h2>
        <p className="text-gray-300">
          {totalExpenses > 0
            ? Number(spendingPercentage) > 50
              ? "Você está gastando mais da metade da sua renda. Considere reduzir despesas para ter mais controle financeiro!"
              : "Ótimo trabalho mantendo os gastos sob controle!"
            : "Você não registrou despesas ainda. Continue monitorando seus gastos!"}
        </p>
      </div>

      {modalOpen && (
        <EditModal
          title={modalOpen === 'income' ? 'Editar Renda Mensal' : 'Editar Despesas'}
          fields={getModalFields()}
          onChange={handleInputChange}
          onSave={handleSave}
          onCancel={handleCloseModal}
        />
      )}
    </div>
  );
};