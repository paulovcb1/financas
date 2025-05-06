import React from 'react';

interface User {
  id: string;
  name: string;
  phone?: string;
  stage: 'lead' | 'opportunity' | 'customer'; // Estágio do funil
}

interface SalesFunnelProps {
  users: User[];
}

export const SalesFunnel: React.FC<SalesFunnelProps> = ({ users }) => {
  const leads = users.filter((user) => user.stage === 'lead');
  const opportunities = users.filter((user) => user.stage === 'opportunity');
  const customers = users.filter((user) => user.stage === 'customer');

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Leads */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-white mb-4">Leads</h2>
        {leads.length > 0 ? (
          leads.map((user) => (
            <div key={user.id} className="bg-blue-700 p-4 rounded-lg mb-2 text-white">
              <p><strong>Nome:</strong> {user.name}</p>
              <p><strong>Telefone:</strong> {user.phone || 'N/A'}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-300">Nenhum lead disponível.</p>
        )}
      </div>

      {/* Oportunidades */}
      <div className="bg-gradient-to-r from-yellow-600 to-yellow-800 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-white mb-4">Oportunidades</h2>
        {opportunities.length > 0 ? (
          opportunities.map((user) => (
            <div key={user.id} className="bg-yellow-700 p-4 rounded-lg mb-2 text-white">
              <p><strong>Nome:</strong> {user.name}</p>
              <p><strong>Telefone:</strong> {user.phone || 'N/A'}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-300">Nenhuma oportunidade disponível.</p>
        )}
      </div>

      {/* Clientes */}
      <div className="bg-gradient-to-r from-green-600 to-green-800 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-white mb-4">Clientes</h2>
        {customers.length > 0 ? (
          customers.map((user) => (
            <div key={user.id} className="bg-green-700 p-4 rounded-lg mb-2 text-white">
              <p><strong>Nome:</strong> {user.name}</p>
              <p><strong>Telefone:</strong> {user.phone || 'N/A'}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-300">Nenhum cliente disponível.</p>
        )}
      </div>
    </div>
  );
};