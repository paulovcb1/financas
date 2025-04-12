import React from 'react';
import { MessageCircle, Bot } from 'lucide-react';
import { ChatMessage as ChatMessageType } from '../types/chat';

interface Props {
  message: ChatMessageType;
  onOptionSelect?: (option: string) => void;
}

export const ChatMessage: React.FC<Props> = ({ message, onOptionSelect }) => {
  const isBot = message.type === 'bot';

  return (
    <div
      className={`flex gap-3 ${
        isBot ? 'justify-start' : 'justify-end'
      } mb-4`}
    >
      {isBot && (
        <div className="w-10 h-10 rounded-2xl glass-effect shadow-lg shadow-blue-500/10 flex items-center justify-center">
          <Bot className="w-6 h-6 text-blue-500" />
        </div>
      )}
      <div
        className={`max-w-[80%] rounded-2xl p-4 shadow-lg ${
          isBot
            ? 'glass-effect text-gray-800 shadow-gray-500/5'
            : 'bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-blue-500/20'
        }`}
      >
        <p className="text-[15px] leading-relaxed">{message.content}</p>
        {message.options && (
          <div className="mt-4 flex flex-col gap-2">
            {message.options.map((option) => (
              <button
                key={option}
                onClick={() => onOptionSelect?.(option)}
                className="text-sm glass-effect px-6 py-3 rounded-2xl hover:bg-white/30 transition-colors text-gray-800 shadow-sm"
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
      {!isBot && (
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-500/20 flex items-center justify-center">
          <MessageCircle className="w-6 h-6 text-white" />
        </div>
      )}
    </div>
  );
};