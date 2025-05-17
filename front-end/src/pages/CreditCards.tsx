import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { fetchCards, selectedCard } from '../services/api';
import SearchCard from '../components/creditcard/SearchCard';
import ShowCard from '../components/creditcard/ShowCard';
import ConfirmModal from '../components/creditcard/ConfirmModal';

interface Card {
  _id: string;
  nome: string;
  pontos: number;
}

const CreditCards: React.FC = () => {
  const [nome, setNome] = useState('');
  const [pontos, setPontos] = useState('');
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [pendingCardId, setPendingCardId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome.trim()) {
      setError('Por favor, insira um nome.');
      return;
    }
    if (pontos && isNaN(Number(pontos))) {
      setError('Pontos deve ser um número válido.');
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const data = await fetchCards({ nome, pontos });
      setCards(data as Card[]);
    } catch (error) {
      console.log('Erro ao buscar cartões. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectCard = (cardId: string) => {
    setPendingCardId(cardId);
    setModalOpen(true);
  };

  const confirmSelectCard = async () => {
    if (!pendingCardId) return;
   const userId = Cookies.get('userId'); // Substituir por contexto
    if (!userId) {
      console.log('Usuário não encontrado. Faça login novamente.');
      return;
    }
    try {
      await selectedCard(userId, pendingCardId);
      console.log('Cartão selecionado com sucesso!');
    } catch (error) {
      console.log('Erro ao selecionar cartão');
    } finally {
      setPendingCardId(null);
      setModalOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 pb-20">
      <h1 className="text-2xl font-bold mb-6" id="credit-cards-title">
        Buscar Cartões de Crédito
      </h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <SearchCard
        nome={nome}
        pontos={pontos}
        onNomeChange={setNome}
        onPontosChange={setPontos}
        onSubmit={handleSearch}
        aria-labelledby="credit-cards-title"
      />
      {loading ? (
        <p>Carregando...</p>
      ) : cards.length === 0 ? (
        <p>Nenhum cartão encontrado.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {cards.map((card) => (
            <ShowCard key={card._id} card={card} onSelect={handleSelectCard} />
          ))}
        </div>
      )}
      <ConfirmModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={confirmSelectCard}
        title="Selecionar cartão"
        description="Tem certeza que deseja selecionar este cartão?"
      />
    </div>
  );
};

export default CreditCards;