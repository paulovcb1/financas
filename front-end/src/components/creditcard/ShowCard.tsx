import React from 'react';

interface Props {
  card: any;
  onSelect?: (id: string) => void;
}

const ShowCard: React.FC<Props> = ({ card, onSelect }) => (
  <div className="bg-gray-800 p-6 rounded-xl shadow-lg flex flex-col gap-2">
    <div className="flex items-center justify-between mb-2">
      <h2 className="text-lg font-semibold text-purple-400">{card.nome}</h2>
      {onSelect && (
        <button
          onClick={() => onSelect(card._id)}
          className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded transition text-sm"
        >
          Selecionar
        </button>
      )}
    </div>
    <p className="text-gray-400 text-sm mb-2">
      Anuidade: <span className="font-medium text-white">{card.anuidade}</span>
    </p>
    <div className="space-y-1 text-sm">
      <p>
        <span className="font-semibold text-gray-300">Pontos:</span>{' '}
        <span className="text-gray-400">{card.beneficios?.pontos}</span>
      </p>
      <p>
        <span className="font-semibold text-gray-300">Salas VIP:</span>{' '}
        <span className="text-gray-400">{card.beneficios?.salas_vip}</span>
      </p>
      <p>
        <span className="font-semibold text-gray-300">Outros Benefícios:</span>{' '}
        <span className="text-gray-400">{card.beneficios?.outros_beneficios}</span>
      </p>
    </div>
  </div>
);

export default ShowCard;