import { create } from 'zustand';
import Cookies from 'js-cookie'; // Importar js-cookie
import { ChatState } from '../types/chat';
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
      userData: { ...state.userData, ...data },
    })),
  saveUserDataToDB: async () => {
    const userData = get().userData;

   

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

      if (savedData.id) {
        Cookies.set('userId', savedData.id, { expires: 7, path: '/', secure: true }); // Salvar userId no cookie
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
      set({ userData: data });
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    }
  },
  nextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),
  resetChat: () =>
    set({ messages: [], userData: {}, currentStep: 0, hasSentWelcomeMessage: false }),
}));