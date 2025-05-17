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
  try {
    const { userId, cardId } = req.body;

    if (!userId || !cardId) {
      return res.status(400).json({ success: false, message: 'Parâmetros obrigatórios ausentes.' });
    }

    const cardExists = await CreditCard.findById(cardId);
    if (!cardExists) {
      return res.status(404).json({ success: false, message: 'Cartão não encontrado.' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'Usuário não encontrado.' });
    }

    user.selectedCard = cardId;
    await user.save();

    res.json({ success: true, message: 'Cartão selecionado com sucesso.' });
  } catch (error) {
    console.error('Erro ao selecionar cartão:', error);
    res.status(500).json({ success: false, message: 'Erro interno do servidor.' });
  }
});

export default router;