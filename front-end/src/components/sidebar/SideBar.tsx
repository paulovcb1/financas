import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Plane, Target } from 'lucide-react';
import { motion } from 'framer-motion';

const Sidebar: React.FC = () => {
  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <Home className="w-5 h-5" /> },
    { name: 'Viagens', path: '/travel', icon: <Plane className="w-5 h-5" /> },
    { name: 'Planejamento', path: '/planning', icon: <Target className="w-5 h-5" /> },
  ];

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className="fixed bottom-0 left-0 w-full bg-gray-900 border-t border-gray-700 shadow-md z-50 md:hidden"
    >
      <nav className="flex justify-around items-center py-2">
        {menuItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center text-xs font-medium px-2 py-1 transition ${
                isActive ? 'text-blue-500' : 'text-gray-400 hover:text-gray-200'
              }`
            }
          >
            {item.icon}
            <span className="mt-1">{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </motion.div>
  );
};

export default Sidebar;