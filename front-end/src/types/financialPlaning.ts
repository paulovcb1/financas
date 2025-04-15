export interface FinancialGoal {
  _id: string;
  userId: string;
  name: string;
  targetAmount: number;
  months: number;
  savedAmount: number;
}