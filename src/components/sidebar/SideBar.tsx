import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Plane, Menu, X, Target } from 'lucide-react';
import { motion } from 'framer-motion';

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const sidebarVariants = {
    open: { x: 0, transition: { duration: 0.3, ease: 'easeOut' } },
    closed: { x: '-100%', transition: { duration: 0.3, ease: 'easeIn' } },
  };

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <Home className="w-6 h-6" /> },
    { name: 'Viagens', path: '/Travel', icon: <Plane className="w-6 h-6" /> },
    { name: 'Planejamento', path: '/planning', icon: <Target className="w-6 h-6" /> },
  ];

  return (
    <>
      {/* Botão de Menu Mobile */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 p-2 bg-gray-900/80 rounded-full text-white md:hidden"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </motion.button>

      {/* Sidebar */}
      <motion.div
        initial={false}
        animate={isOpen ? 'open' : 'closed'}
        variants={sidebarVariants}
        className="fixed top-0 left-0 h-screen w-64 bg-gray-900/90 backdrop-blur-md border-r border-gray-800/50 text-white p-6 flex flex-col gap-6 z-40 md:static md:translate-x-0"
      >
        <h2 className="text-2xl font-semibold tracking-tight">Educação Financeira</h2>
        <nav className="flex-1">
          <ul className="space-y-4">
            {menuItems.map((item, index) => (
              <li key={`${item.path}-${index}`}> {/* Chave única combinando path e índice */}
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 p-3 rounded-xl transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg'
                        : 'hover:bg-gray-800/70 text-gray-300'
                    }`
                  }
                  onClick={() => setIsOpen(false)}
                >
                  {item.icon}
                  <span className="text-lg">{item.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </motion.div>

      {/* Overlay em Mobile */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black md:hidden z-30"
        />
      )}
    </>
  );
};

export default Sidebar;