import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, CreditCard, Plane, Award } from 'lucide-react';
import { motion } from 'framer-motion';

const LandingPage: React.FC = () => {
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  
  const validatePhone = (input: string) => {
    const phoneRegex = /^\(\d{2}\)\s\d{5}-\d{4}$/;
    return phoneRegex.test(input);
  };

  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formattedPhone = phone.replace(/\D/g, '').replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    setPhone(formattedPhone);

    if (validatePhone(formattedPhone)) {
      setError('');
      setTimeout(() => navigate('/chat', { state: { phone: formattedPhone } }), 300); // Transição suave
    } else {
      setError('Use o formato (XX) XXXXX-XXXX');
    }
  };

  // Máscara de entrada e validação em tempo real
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);
    value = value.replace(/(\d{2})(\d)/, '($1) $2').replace(/(\d{5})(\d)/, '$1-$2');
    setPhone(value);
    setError(validatePhone(value) || value === '' ? '' : 'Formato inválido');
  };

  // Variantes de animação
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans flex flex-col items-center justify-between overflow-hidden">
      {/* Hero Section */}
      <motion.header
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="w-full max-w-5xl mx-auto pt-20 px-6 text-center relative"
      >
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
          Viaje Mais e Pague Menos com Inteligência Financeira
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
          Aprenda a maximizar milhas e recompensas do seu cartão de crédito.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => document.getElementById('phone-form')?.scrollIntoView({ behavior: 'smooth' })}
          className="mt-8 px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white font-medium shadow-lg hover:shadow-xl transition-all"
        >
          Comece Sua Jornada
        </motion.button>
        {/* Ilustração estilizada */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mt-12"
        >
          <svg className="w-40 h-40 mx-auto text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M5 6h14M7 14h10M9 18h6" />
          </svg>
        </motion.div>
      </motion.header>

      {/* Benefícios */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        className="w-full max-w-5xl mx-auto py-20 px-6 grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        <motion.div
          whileHover={{ y: -5 }}
          className="p-6 bg-gray-900/80 rounded-xl backdrop-blur-md shadow-lg border border-gray-800/50"
        >
          <Award className="w-10 h-10 mb-4 text-yellow-400" />
          <h3 className="text-xl font-medium">Recompensas Inteligentes</h3>
          <p className="mt-2 text-gray-400">Acumule milhas e pontos com estratégias eficazes.</p>
        </motion.div>
        <motion.div
          whileHover={{ y: -5 }}
          className="p-6 bg-gray-900/80 rounded-xl backdrop-blur-md shadow-lg border border-gray-800/50"
        >
          <Plane className="w-10 h-10 mb-4 text-purple-400" />
          <h3 className="text-xl font-medium">Viagens Mais Baratas</h3>
          <p className="mt-2 text-gray-400">Otimize gastos e resgate passagens com facilidade.</p>
        </motion.div>
        <motion.div
          whileHover={{ y: -5 }}
          className="p-6 bg-gray-900/80 rounded-xl backdrop-blur-md shadow-lg border border-gray-800/50"
        >
          <CreditCard className="w-10 h-10 mb-4 text-blue-400" />
          <h3 className="text-xl font-medium">Cartão Ideal</h3>
          <p className="mt-2 text-gray-400">Escolha o cartão que maximiza seus benefícios.</p>
        </motion.div>
      </motion.section>

      {/* Formulário */}
      <motion.section
        id="phone-form"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        className="w-full max-w-md mx-auto px-6 py-20"
      >
        <div className="bg-gray-900/90 p-8 rounded-2xl shadow-xl backdrop-blur-md border border-gray-800/50">
          <h2 className="text-2xl font-semibold text-center mb-4">Fale com o Especialista</h2>
          <p className="text-center mb-6 text-gray-400">Insira seu telefone para começar.</p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                value={phone}
                onChange={handlePhoneChange}
                placeholder="(XX) XXXXX-XXXX"
                maxLength={15}
                className="w-full pl-12 p-4 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
              {error && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-400 text-sm mt-2"
                >
                  {error}
                </motion.p>
              )}
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 py-4 rounded-lg text-white font-medium shadow-lg hover:shadow-xl transition-all"
            >
              Iniciar Agora
            </motion.button>
          </form>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="w-full py-6 text-center text-gray-600 text-sm">
        <p>© 2025 Educação Financeira. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default LandingPage;