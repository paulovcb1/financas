import React from 'react';

interface Props {
  nome: string;
  pontos: string;
  onNomeChange: (value: string) => void;
  onPontosChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const SearchCard: React.FC<Props> = ({
  nome,
  pontos,
  onNomeChange,
  onPontosChange,
  onSubmit,
}) => (
  <form
    onSubmit={onSubmit}
    className="bg-gray-900 p-4 rounded-xl shadow flex flex-col md:flex-row gap-3 mb-6 items-center justify-center"
    style={{ maxWidth: 480, margin: '0 auto' }}
    aria-label="Busca de cartões de crédito"
  >
    <input
      type="text"
      placeholder="Nome do cartão"
      value={nome}
      onChange={e => onNomeChange(e.target.value)}
       className="bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-500 transition w-64 md:w-80"
      aria-label="Nome do cartão"
      autoComplete="off"
    />
    <input
      type="text"
      placeholder="Pontos"
      value={pontos}
      onChange={e => onPontosChange(e.target.value)}
       className="bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-500 transition w-64 md:w-80"
      aria-label="Pontos"
      autoComplete="off"
    />
    <button
      type="submit"
      className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded text-white font-semibold shadow transition"
    >
      Buscar
    </button>
  </form>
);

export default SearchCard;