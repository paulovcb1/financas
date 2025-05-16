import express from 'express';
import CreditCard from '../models/creditCard';
import User from '../models/user';

const router = express.Router();

// GET CARDS
router.get('/', async (req, res) => {
  try {
    const cards = await CreditCard.find();
    res.json(cards);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar cartões de crédito.' });
  }
});

router.get('/search', async (req, res) => {
  try {
    const { nome, pontos } = req.query;
    const query: any = {};
    if (nome) {
      query.nome = { $regex: nome, $options: 'i' };
    } 
    if(pontos) {
      query['beneficios.pontos'] = { $regex: pontos, $options: 'i' }; 
    }
    const cards = await CreditCard.find(query);
    res.json(cards);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar cartões de crédito.' });
  }
});

// POST /api/user/select-card
router.post('/user/select-card', async (req, res) => {
  const { userId, cardId } = req.body;

  await User.findByIdAndUpdate(userId, { selectedCard: cardId });
  res.json({ success: true });
});

export default router;