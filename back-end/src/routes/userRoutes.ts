import express from 'express';
import User from '../models/user';

const router = express.Router();

const normalizeUserData = (data: any) => {
    return {
      name: data.name?.trim(),
      phone: data.phone?.replace(/\D/g, ''), // Remove caracteres não numéricos do telefone
      age: data.age ? Number(data.age) : undefined,
      monthlyIncome: data.monthlyIncome ? Number(data.monthlyIncome) : undefined,
      fixedExpenses: data.fixedExpenses ? Number(data.fixedExpenses) : undefined,
      variableExpenses: data.variableExpenses ? Number(data.variableExpenses) : undefined,
      creditCard: data.creditCard
        ? {
            uses: Boolean(data.creditCard.uses),
            monthlySpending: data.creditCard.monthlySpending
              ? Number(data.creditCard.monthlySpending)
              : undefined,
          }
        : undefined,
    };
  };

  router.post('/', async (req, res) => {
    try {
      const normalizedData = normalizeUserData(req.body);
      console.log('API post BACK END ESTÁ RECEBENDO ISSO AQUI:', req.body);
  
      const existingUser = await User.findOne({ phone: normalizedData.phone });
      if (existingUser) {
        return res.status(400).json({ error: 'Número de telefone já cadastrado' });
      }
  
      const user = await User.create(normalizedData);
  
      
      const userWithId = { ...user.toObject(), id: user._id };
      delete userWithId._id; 
  
      res.status(201).json(userWithId);
    } catch (err) {
      res.status(400).json({ error: 'Erro ao criar usuário' });
    }
  });
  
  router.get('/all-users', async (req, res) => {
    try {
      const users = await User.find({});
  
      const usersWithId = users.map(user => {
        const userObj = user.toObject();
        return { ...userObj, id: userObj._id };
      });
  
      res.status(200).json(usersWithId);
    } catch (err) {
      res.status(500).json({ error: 'Erro ao buscar usuários' });
    }
  } );

  router.get('/:id', async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });
  
      
      const userWithId = { ...user.toObject(), id: user._id };
      delete userWithId._id;
  
      res.json(userWithId);
    } catch (err) {
      res.status(400).json({ error: 'Erro ao buscar usuário' });
    }
  });

router.put('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const updatedData = req.body;
  
      const user = await User.findByIdAndUpdate(id, updatedData, { new: true });
  
      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }
  
      const userWithId = { ...user.toObject(), id: user._id };
      delete userWithId._id;
  
      res.status(200).json(userWithId);
    } catch (err) {
      res.status(500).json({ error: 'Erro ao atualizar usuário' });
    }
  });
  router.post('/check-phone', async (req, res) => {
    try {
      const normalizedData = normalizeUserData(req.body);
      const { phone } = req.body;
  
      if (!phone) {
        return res.status(400).json({ error: 'Número de telefone é obrigatório' });
      }
  
      const existingUser = await User.findOne({ phone: normalizedData.phone });
      if (existingUser) {
        return res.status(400).json({ error: 'Número de telefone já cadastrado' });
      }
  
      res.status(200).json({ message: 'Número de telefone disponível' });
    } catch (err) {
      res.status(500).json({ error: 'Erro ao verificar o telefone' });
    }
  });


    

export default router;
