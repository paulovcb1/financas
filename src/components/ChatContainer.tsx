import React, { useEffect, useRef } from 'react';
import { Inbox, Send } from 'lucide-react';
import { ChatMessage } from './ChatMessage';
import { useChatStore } from '../store/chatStore';
import { useNormalizedInput } from "../hooks/useNormalizedInput";



export const ChatContainer: React.FC = () => {
  const [input, setInput] = React.useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { messages, addMessage, currentStep, nextStep, updateUserData } = useChatStore();
  const { normalizeInput } = useNormalizedInput();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (messages.length === 0) {
      addMessage({
        type: 'bot',
        content: 'Olá! Sou seu assistente financeiro. Como posso te chamar?',
      });
    }
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;

    addMessage({
      type: 'user',
      content: input,
    });

    switch (currentStep) {
      case 0: //nome 
      const nome = input.trim();
        if (!isNaN(Number(nome))) {
          addMessage({ type: 'bot', content: 'Por favor, insira um nome válido.' });
          setInput('');
          return;
        }
        updateUserData({ name: input.trim() });
        addMessage({
          type: 'bot',
          content: `Prazer em conhecer você, ${input.trim()}! Qual é a sua idade?`
        });
        break;

      case 1: // idade  normalizacao via api open ia
        let age = parseInt(input);
        if (isNaN(age) || age <= 0) {
          const normalizedInput = await normalizeInput(input);
          age = parseInt(normalizedInput);

          if (isNaN(age)) {
            addMessage({
              type: "bot",
              content: "Não entendi sua idade. Por favor, digite apenas números.",
            });
            return;
          }

          addMessage({
            type: "bot",
            content: `Vou considerar que você tem ${age} anos!`,
          });
        }

        updateUserData({ age });
        addMessage({
          type: "bot",
          content: "Qual é a sua renda mensal?",
        });
        break;

      case 2: // Renda Mensal // normalizacao via api open ia
        let monthlyIncome = parseFloat(input);
        if (isNaN(monthlyIncome) || monthlyIncome <= 0) {
          const normalizedInput = await normalizeInput(input);
          monthlyIncome = parseFloat(normalizedInput);

          if (isNaN(monthlyIncome)) {
            addMessage({
              type: "bot",
              content: "Não entendi sua renda mensal. Por favor, digite apenas números.",
            });
            return;
          }

          addMessage({
            type: "bot",
            content: `Vou considerar que você ganha R$ ${monthlyIncome} por mês!`,
          });
        }

        updateUserData({ monthlyIncome });
        addMessage({
          type: 'bot',
          content: `Ótimo! Agora, você tem cartão de crédito? (sim/não)`,
        });

        break;
      case 3: // Cartão de Crédito
        if (input.trim().toLocaleLowerCase() === 'sim') {
          addMessage({
            type: 'bot',
            content: 'Ótimo! Agora, qual é o seu gasto mensal com cartão de crédito?',
          });
        } else if (input.trim().toLowerCase() === 'não' || input.trim().toLowerCase() === 'nao') {
          updateUserData({ creditCard: { uses: false } });
          addMessage({
            type: 'bot',
            content: 'Muito obrigado! Espero que goste do nosso app.',
          });
        } else {
          addMessage({
            type: 'bot',
            content: 'Por favor, responda com "sim" ou "não".',
          });
        }
        break;
      case 4: //gasto cartao de credito mensal
        {
          const creditCardExpenses = parseFloat(input);
          if (isNaN(creditCardExpenses) || creditCardExpenses <= 0) {
            addMessage({
              type: 'bot',
              content: 'Por favor, digite apenas números para suas despesas com cartão de crédito.',
            });
            return;
          }
          updateUserData({ creditCard: { uses: true, monthlySpending: creditCardExpenses } });
          break;
        }
    }

    nextStep();
    setInput('');
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-gray-100">
      <div className="p-4 bg-gray-800 border-b border-gray-700">
        <h1 className="text-xl font-semibold">Assistente Financeiro</h1>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-2xl mx-auto">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message}
              onOptionSelect={(option) => {
                addMessage({
                  type: 'user',
                  content: option,
                });
              }}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className="p-4 bg-gray-800 border-t border-gray-700">
        <div className="max-w-2xl mx-auto">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Digite sua mensagem..."
              className="flex-1 px-6 py-3 rounded-2xl bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100 placeholder-gray-400"
            />
            <button
              onClick={handleSend}
              className="p-3 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/30 active:scale-95 transform duration-200"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
