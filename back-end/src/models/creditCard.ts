import mongoose from 'mongoose';

const CreditCardSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  anuidade: { type: String, required: true },
  beneficios: {
    pontos: { type: String },
    salas_vip: { type: String },
    outros_beneficios: { type: String },
  },
}, { collection: 'cards' });

const CreditCard = mongoose.model('CreditCard', CreditCardSchema);

export default CreditCard;
