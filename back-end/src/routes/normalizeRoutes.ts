import express from 'express';
import axios from 'axios';

const router = express.Router();

router.post('/', async (req, res) => {
  const { input } = req.body;


  if (!input) {
    return res.status(400).json({ error: 'Input is required' });
  }

  try {
   
    
    const response = await axios.get('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, 
      },
      data: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'Você é um assistente que converte entradas de usuários em números válidos.' },
          { role: 'user', content: `Converta isso para um número: "${input}" e me retorne apenas o número convertido e nada mais` },
        ],
        max_tokens: 10,
      }),
    });

    console.log(response);
    

    const data = response.data;
    const normalizedValue = data.choices?.[0]?.message?.content?.trim();

    res.json({ normalizedValue: normalizedValue || input });
  } catch (error) {
    console.error('Erro ao normalizar entrada:', error);
    res.status(500).json({ error: 'Erro ao normalizar entrada' });
  }
});

export default router;