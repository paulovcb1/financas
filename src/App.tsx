import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ChatContainer } from './components/ChatContainer';
import { Dashboard } from './components/DashBoard';
import LandingPage from './components/LandingPage';
import Travel from './pages/Travel';
import Sidebar from './components/sidebar/SideBar';
import FinancialPlanning from './pages/FinancialPlaning';

const App: React.FC = () => {
  const location = useLocation();
  // Sidebar aparece em todas as rotas, exceto "/" e "/chat"
  const showSidebar = !['/', '/chat'].includes(location.pathname);

  return (
    <div className="app-container flex min-h-screen bg-black">
      {/* Sidebar aparece exceto na LandingPage e Chat */}
      {showSidebar && <Sidebar />}

      {/* Conteúdo Principal */}
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