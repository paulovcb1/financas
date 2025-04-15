import React, { useEffect, useRef } from 'react';
import { Inbox, Send } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChatMessage } from './ChatMessage';
import { useChatStore } from '../store/chatStore';
import { useNormalizedInput } from '../hooks/useNormalizedInput';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ChatContainer: React.FC = () => {
  const [input, setInput] = React.useState('');
  const [isTyping, setIsTyping] = React.useState(false); // Estado para controlar a animação de "digitando"
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { messages, addMessage, currentStep, nextStep, updateUserData, saveUserDataToDB, userData } = useChatStore();
  const initialMessageSentRef = useRef(false);
  const { normalizeInput } = useNormalizedInput();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (!initialMessageSentRef.current && messages.length === 0) {
      initialMessageSentRef.current = true;
  
      const phone = location.state?.phone || userData.phone;
      updateUserData({ phone });
      if (phone) {
        addMessage({
          type: 'bot',
          content: `Olá! Recebemos seu telefone ${phone}. Como posso te chamar?`,
        });
      } else {
        addMessage({
          type: 'bot',
          content: 'Olá! Sou seu assistente financeiro. Como posso te chamar?',
        });
      }
    }
  }, [messages.length, location.state, userData.phone, addMessage]);

  const simulateBotTyping = async (callback: () => void) => {
    setIsTyping(true); // Mostra a animação de "digitando"
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Delay de 1 segundo (ajustável)
    setIsTyping(false); // Esconde a animação
    callback(); // Executa a ação do bot após o delay
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    addMessage({ type: 'user', content: input });

    try {
      switch (currentStep) {
        case 0: // Nome
          const nome = input.trim();
          if (!isNaN(Number(nome))) {
            simulateBotTyping(() => {
              addMessage({ type: 'bot', content: 'Por favor, insira um nome válido.' });
            });
            setInput('');
            return;
          }
          updateUserData({ name: nome });
          simulateBotTyping(() => {
            addMessage({
              type: 'bot',
              content: `Prazer em conhecer você, ${nome}! Qual é a sua idade?`,
            });
          });
          break;

          case 1: // Idade
          let age = parseInt(input);
        
          
          if (isNaN(age) || age <= 0) {
            const normalizedInput = await normalizeInput(input);
            age = parseInt(normalizedInput);
        
            if (isNaN(age) || age <= 0) {
              simulateBotTyping(() => {
                addMessage({
                  type: 'bot',
                  content: 'Não entendi sua idade. Por favor, digite apenas números.',
                });
              });
              return;
            }
          }
        
          updateUserData({ age });
        
          simulateBotTyping(() => {
            addMessage({
              type: 'bot',
              content: `Vou considerar que você tem ${age} anos!`,
            });
          });
        
          simulateBotTyping(() => {
            addMessage({
              type: 'bot',
              content: 'Qual é a sua renda mensal?',
            });
          });
          break;
        

        case 2: // Renda Mensal
          let monthlyIncome = parseFloat(input);
          if (isNaN(monthlyIncome) || monthlyIncome <= 0) {
            const normalizedInput = await normalizeInput(input);
            simulateBotTyping(() => {
              addMessage({
                type: 'bot',
                content: `Vou considerar que você ganha R$ ${monthlyIncome} por mês!`,
              });
            });
            monthlyIncome = parseFloat(normalizedInput);
            if (isNaN(monthlyIncome)) {
              simulateBotTyping(() => {
                addMessage({
                  type: 'bot',
                  content: 'Não entendi sua renda mensal. Por favor, digite apenas números.',
                });
              });
              return;
            }
          }
          updateUserData({ monthlyIncome });
          simulateBotTyping(() => {
            addMessage({
              type: 'bot',
              content: 'Ótimo! Agora, você tem cartão de crédito? (sim/não)',
            });
          });
          break;

        case 3: // Cartão de Crédito
          if (input.trim().toLowerCase() === 'sim') {
            updateUserData({ creditCard: { uses: true } });
            simulateBotTyping(() => {
              addMessage({
                type: 'bot',
                content: 'Ótimo! Agora, qual é o seu gasto mensal com cartão de crédito?',
              });
            });
          } else if (input.trim().toLowerCase() === 'não' || input.trim().toLowerCase() === 'nao') {
            updateUserData({ creditCard: { uses: false } });
            await saveUserDataToDB();
            simulateBotTyping(() => {
              addMessage({
                type: 'bot',
                content: 'Muito obrigado! Veja seu dashboard financeiro!',
              });
              setTimeout(() => navigate('/dashboard'), 1000);
            });
          } else {
            simulateBotTyping(() => {
              addMessage({
                type: 'bot',
                content: 'Por favor, responda com "sim" ou "não".',
              });
            });
            return;
          }
          break;

        case 4: // Gasto com cartão de crédito
          let creditCardExpenses = parseFloat(input);
          if (isNaN(creditCardExpenses) || creditCardExpenses <= 0) {
            const normalizedInput = await normalizeInput(input);
            simulateBotTyping(() => {
              addMessage({
                type: 'bot',
                content: `Vou considerar que você gasta R$ ${normalizedInput} por mês com seu cartão de credito!`,
              });
            });
            creditCardExpenses = parseFloat(normalizedInput);
            if (isNaN(creditCardExpenses) || creditCardExpenses <= 0) {
              simulateBotTyping(() => {
                addMessage({
                  type: 'bot',
                  content: 'Por favor, digite apenas números para suas despesas com cartão de crédito.',
                });
              });
              return;
            }
          }
          updateUserData({ creditCard: { uses: true, monthlySpending: creditCardExpenses } });
          await saveUserDataToDB();
          simulateBotTyping(() => {
            addMessage({
              type: 'bot',
              content: 'Muito obrigado! Veja seu dashboard financeiro!',
            });
            setTimeout(() => navigate('/dashboard'), 1000);
          });
          break;
      }
      nextStep();
    } catch (error) {
      console.error('Erro ao salvar no ChatContainer:', error);
      simulateBotTyping(() => {
        addMessage({ type: 'bot', content: 'Erro ao salvar os dados. Tente novamente.' });
      });
    }
    setInput('');
  };

  return (
    <div className="flex flex-col h-screen bg-black text-white font-sans">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="p-4 bg-gray-900/80 border-b border-gray-800/50 backdrop-blur-md"
      >
        <h1 className="text-xl font-semibold tracking-tight">Assistente Financeiro</h1>
      </motion.div>

      {/* Área de Mensagens */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-2xl mx-auto space-y-4">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <ChatMessage
                message={message}
                onOptionSelect={(option) => {
                  addMessage({
                    type: 'user',
                    content: option,
                  });
                }}
              />
            </motion.div>
          ))}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-1 text-gray-400"
            >
              <motion.span
                animate={{ y: [0, -3, 0] }}
                transition={{ repeat: Infinity, duration: 0.5, ease: 'easeInOut' }}
              >
                .
              </motion.span>
              <motion.span
                animate={{ y: [0, -3, 0] }}
                transition={{ repeat: Infinity, duration: 0.5, delay: 0.1, ease: 'easeInOut' }}
              >
                .
              </motion.span>
              <motion.span
                animate={{ y: [0, -3, 0] }}
                transition={{ repeat: Infinity, duration: 0.5, delay: 0.2, ease: 'easeInOut' }}
              >
                .
              </motion.span>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="p-6 bg-gray-900/80 border-t border-gray-800/50 backdrop-blur-md"
      >
        <div className="max-w-2xl mx-auto">
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Digite sua mensagem..."
              className="flex-1 px-6 py-4 bg-gray-800 border border-gray-700 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSend}
              className="p-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all"
            >
              <Send className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};