import { create } from 'zustand';
import { ChatState, ChatMessage } from '../types/chat';
import { saveUserData } from '../services/api';

export const useChatStore = create<ChatState>((set, get) => ({
  messages: [],
  userData: {},
  currentStep: 0,
  hasSentWelcomeMessage: false,
  addMessage: (message) => {
    console.log('addMessage chamado com:', message);
    set((state) => ({
      messages: [
        ...state.messages,
        { ...message, id: Math.random().toString(36).substring(7) },
      ],
    }));
  },
  updateUserData: (data) =>
    set((state) => ({
      userData: { ...state.userData, ...data },
    })),
    saveUserDataToDB: async () => {
      const userData = get().userData;
      const normalizedData = {
        phone: userData.phone ? userData.phone : undefined,
        name: userData.name,
        age: userData.age ? Number(userData.age) : undefined,
        monthlyIncome: userData.monthlyIncome ? Number(userData.monthlyIncome) : undefined,
        fixedExpenses: userData.fixedExpenses ? Number(userData.fixedExpenses) : undefined,
        variableExpenses: userData.variableExpenses ? Number(userData.variableExpenses) : undefined,
        creditCard: userData.creditCard
          ? {
              uses: Boolean(userData.creditCard.uses),
              monthlySpending: userData.creditCard.monthlySpending
                ? Number(userData.creditCard.monthlySpending)
                : undefined,
            }
          : undefined,
      };
      console.log('userData antes de salvar (normalizado):', normalizedData);
      if (!normalizedData.name) {
        throw new Error('Nome do usuário é obrigatório para salvar no banco');
      }
      try {
        const savedData = await saveUserData(normalizedData);
        console.log('Dados salvos retornados:', savedData);
        set({ userData: savedData }); // O _id será adicionado aqui pelo backend
      } catch (error) {
        console.error('Failed to save user data:', error);
        throw error;
      }
    },
  nextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),
  resetChat: () => set({ messages: [], userData: {}, currentStep: 0, hasSentWelcomeMessage: false}),
}));