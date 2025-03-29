import { create } from 'zustand';
import { ChatState, ChatMessage } from '../types/chat';
import { saveUserData } from '../services/api';

export const useChatStore = create<ChatState>((set, get) => ({
  messages: [],
  userData: {},
  currentStep: 0,
  addMessage: (message) =>
    set((state) => ({
      messages: [
        ...state.messages,
        { ...message, id: Math.random().toString(36).substring(7) },
      ],
    })),
  updateUserData: async (data) => {
    const newUserData = { ...get().userData, ...data };
    set({ userData: newUserData });
    
    // Save to MongoDB when we have all required fields
    if (newUserData.name && newUserData.age) {
      try {
        await saveUserData(newUserData);
      } catch (error) {
        console.error('Failed to save user data:', error);
      }
    }
  },
  nextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),
  resetChat: () => set({ messages: [], userData: {}, currentStep: 0 }),
}));