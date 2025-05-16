import React, { useState } from 'react';
import { fetchCards } from '../services/api';
import SearchCard from '../components/creditcard/SearchCard';
import ShowCard from '../components/creditcard/ShowCard';
import axios from 'axios';

const CreditCards: React.FC = () => {
  const [nome, setNome] = useState('');
  const [pontos, setPontos] = useState('');
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await fetchCards({ nome, pontos });
      setCards(data);
    } catch (error) {
      alert('Erro ao buscar cartões');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectCard = async (cardId: string) => {
  try {
    // Substitua pelo endpoint correto e envie o ID do usuário se necessário
    await axios.post('/api/user/select-card', { cardId });
    alert('Cartão selecionado com sucesso!');
  } catch (error) {
    alert('Erro ao selecionar cartão');
  }
};

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 pb-20">
      <h1 className="text-2xl font-bold mb-6">Buscar Cartões de Crédito</h1>
      <SearchCard
        nome={nome}
        pontos={pontos}
        onNomeChange={setNome}
        onPontosChange={setPontos}
        onSubmit={handleSearch}
      />
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {cards.map((card: any) => (
            <ShowCard key={card._id} card={card} onSelect={handleSelectCard} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CreditCards;