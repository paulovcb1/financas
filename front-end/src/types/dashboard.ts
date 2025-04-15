export interface FinancialSummary {
    availableBalance: number;
    creditLimit: number;
    creditUsed: number;
    loyaltyPoints: number;
  }
  
  export interface Expense {
    category: string;
    amount: number;
    color: string;
  }
  
  export interface FinancialGoal {
    id: string;
    title: string;
    targetAmount: number;
    currentAmount: number;
    deadline: Date;
  }
  
  export interface Notification {
    id: string;
    title: string;
    message: string;
    type: 'info' | 'warning' | 'success';
    date: Date;
  }

  export interface FinancialCardProps {
    title: string;
    value: number;
    icon: React.ReactNode;
    onEdit?: () => void;
  }

  export interface FormData {
    monthlyIncome: string;
    fixedExpenses: string;
    variableExpenses: string;
    creditCardSpending: string;
  }