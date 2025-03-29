export interface UserData {
  name: string;
  age: number;
  monthlyIncome: number;
  fixedExpenses: number;
  variableExpenses: number;
  creditCard: {
    uses: boolean;
    monthlySpending?: number;
  };
}

export interface ChatMessage {
  id: string;
  type: 'user' | 'bot';
  content: string;
  options?: string[];
}

export interface ChatState {
  messages: ChatMessage[];
  userData: Partial<UserData>;
  currentStep: number;
  addMessage: (message: Omit<ChatMessage, 'id'>) => void;
  updateUserData: (data: Partial<UserData>) => void;
  nextStep: () => void;
  resetChat: () => void;
}