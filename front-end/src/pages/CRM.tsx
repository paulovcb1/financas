import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchAllUsers } from '../services/api';
import { UserTable } from '../components/crm/UserTable';
import { SalesFunnel } from '../components/crm/SalesFunnel';

export const CRM: React.FC = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await fetchAllUsers();
        setUsers(data);
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
      }
    };

    loadUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <header className="mb-8 flex justify-between items-center">
        <h1 className="text-4xl font-bold text-blue-500">CRM - Gestão de Usuários</h1>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg shadow-lg hover:shadow-xl transition-all"
        >
          Voltar para Landing Page
        </button>
      </header>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold text-gray-200 mb-4">Lista de Usuários</h2>
        <UserTable users={users} />
      </section>

      <section>
        <h2 className="text-3xl font-semibold text-gray-200 mb-4">Funil de Vendas</h2>
        <SalesFunnel users={users} />
      </section>
    </div>
  );
};