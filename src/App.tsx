import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ChatContainer } from './components/ChatContainer';
import { Dashboard } from './components/DashBoard';
import LandingPage from './components/LandingPage';

const App: React.FC = () => {
  return (
    <div className="app-container">
      <Routes>
        {/* Rota inicial - ladingPage */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/chat" element={<ChatContainer />} />
        {/* Rota para o Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />
        {/* Rota para página não encontrada (opcional) */}
        <Route path="*" element={<NotFound />} />
      </Routes>
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