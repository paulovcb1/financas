import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  phone:{
    type: String,
    required: false,
  },
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  monthlyIncome: {
    type: Number,
    required: false,
  },
  fixedExpenses: {
    type: Number,
    required: false,
  },
  variableExpenses: {
    type: Number,
    required: false,
  },
  creditCard: {
    uses: {
      type: String,
      default: true,
    },
    monthlySpending: {
      type: Number,
      required: false,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model('User', userSchema);

export { User };