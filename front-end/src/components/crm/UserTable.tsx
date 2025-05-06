import React from 'react';

interface User {
  id: string;
  name: string;
  phone?: string;
  age?: number;
  monthlyIncome?: number;
  fixedExpenses?: number;
  variableExpenses?: number;
  creditCard?: {
    uses: boolean;
    monthlySpending?: number;
  };
}

interface UserTableProps {
  users: User[];
}

export const UserTable: React.FC<UserTableProps> = ({ users }) => {
  return (
    <div className="overflow-x-auto bg-gray-800 rounded-lg shadow-lg p-4">
      <table className="w-full text-left text-gray-300">
        <thead>
          <tr className="border-b border-gray-700">
            <th className="p-4">Nome</th>
            <th className="p-4">Telefone</th>
            <th className="p-4">Idade</th>
            <th className="p-4">Renda Mensal</th>
            <th className="p-4">Despesas Fixas</th>
            <th className="p-4">Despesas Variáveis</th>
            <th className="p-4">Cartão de Crédito</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-b border-gray-700 hover:bg-gray-700 transition-all">
              <td className="p-4">{user.name}</td>
              <td className="p-4">{user.phone || 'N/A'}</td>
              <td className="p-4">{user.age || 'N/A'}</td>
              <td className="p-4">
                {user.monthlyIncome
                  ? `R$ ${user.monthlyIncome.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
                  : 'N/A'}
              </td>
              <td className="p-4">
                {user.fixedExpenses
                  ? `R$ ${user.fixedExpenses.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
                  : 'N/A'}
              </td>
              <td className="p-4">
                {user.variableExpenses
                  ? `R$ ${user.variableExpenses.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
                  : 'N/A'}
              </td>
              <td className="p-4">
                {user.creditCard?.uses
                  ? `Sim (Gasto: R$ ${user.creditCard.monthlySpending?.toLocaleString('pt-BR', {
                      minimumFractionDigits: 2,
                    }) || '0,00'})`
                  : 'Não'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};