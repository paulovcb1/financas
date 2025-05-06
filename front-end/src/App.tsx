import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ChatContainer } from './components/ChatContainer';
import { Dashboard } from './pages/DashBoard';
import LandingPage from './pages/LandingPage';
import Travel from './pages/Travel';
import Sidebar from './components/sidebar/SideBar';
import FinancialPlanning from './pages/FinancialPlaning';
import {CRM} from './pages/CRM';

const App: React.FC = () => {
  const location = useLocation();
  // Sidebar aparece em todas as rotas, exceto "/" e "/chat"
  const showSidebar = !['/', '/chat', '/crm'].includes(location.pathname);

  return (
    <div className="app-container flex min-h-screen bg-black">
      {/* Sidebar aparece exceto na LandingPage e Chat */}
      {showSidebar && <Sidebar />}

      {/* Conteúdo principal da aplicação */}
      <div
        className={`flex-1 w-full transition-all duration-300 ${
          showSidebar ? 'md:pl-64' : ''
        }`}
      >
        <Routes>
          {/* Rota inicial - LandingPage */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/chat" element={<ChatContainer />} />
          {/* Rota para o Dashboard */}
          <Route
            path="/dashboard"
            element={<Dashboard />}
          />
          <Route path="/Travel" element={<Travel />} />
          <Route path="/planning" element={<FinancialPlanning />} />
          {/* Rota para o CRM */}
          <Route path="/crm" element={<CRM />} />
          {/* Rota para página não encontrada (opcional) */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
};

// Componente simples para página não encontrada
const NotFound: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-900 text-gray-100">
      <h1 className="text-2xl">404 - Página Não Encontrada</h1>
    </div>
  );
};

export default App;