import { create } from 'zustand';
import { ChatState, ChatMessage } from '../types/chat';
import { updateUser, createUser, getUserData } from '../services/api';


export const useChatStore = create<ChatState>((set, get) => ({
  messages: [],
  userData: {},
  currentStep: 0,
  hasSentWelcomeMessage: false,
  addMessage: (message) => {
    set((state) => ({
      messages: [
        ...state.messages,
        { ...message, id: Math.random().toString(36).substring(7) },
      ],
    }));
  },
  updateUserData: (data) =>
    set((state) => ({
      userData: { ...state.userData, ...data }, // Combina os campos existentes com os editados
    })),
    saveUserDataToDB: async () => {
      const userData = get().userData;
    
      // Combine os campos existentes com os campos editados
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
    
      try {
        let savedData;
        if (userData.id) {
          // Atualiza o usuário existente
          savedData = await updateUser(userData.id, userData);
        } else {
          // Cria um novo usuário
          savedData = await createUser(userData);
        }
    
        console.log('Dados salvos retornados:', savedData);
    
        // Atualiza o estado com os dados retornados, incluindo o id
        set((state) => ({
          userData: { ...state.userData, ...savedData },
        }));
    
        // Salva o ID no localStorage
        if (savedData.id) {
          localStorage.setItem('userId', savedData.id);
        }
      } catch (error) {
        console.error('Failed to save user data:', error);
        throw error;
      }
    },
    fetchUserData: async (userId: string) => {
      try {
        const data = await getUserData(userId);
        console.log('Dados carregados no Zustand:', data); 
        set({ userData: data }); // Atualiza o estado global com os dados do usuário, incluindo o id
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    },
  nextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),
  resetChat: () => set({ messages: [], userData: {}, currentStep: 0, hasSentWelcomeMessage: false}),
}));
