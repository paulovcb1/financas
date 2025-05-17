import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  age?: number;
  phone?: string;
  monthlyIncome?: number;
  fixedExpenses?: number;
  variableExpenses?: number;
  selectedCard?: string; 
  creditCard?: {
    uses: boolean;
    monthlySpending?: number;
  };
}

const UserSchema = new Schema<IUser>({
    phone: { type: String },
  name: { type: String, required: true },
  age: { type: Number },
  monthlyIncome: { type: Number },
  fixedExpenses: { type: Number },
  variableExpenses: { type: Number },
  creditCard: {
    uses: { type: Boolean },
    monthlySpending: { type: Number },
  },
  selectedCard: { type: mongoose.Schema.Types.ObjectId, ref: 'CreditCard', required: false },
});

export default mongoose.model<IUser>('User', UserSchema);