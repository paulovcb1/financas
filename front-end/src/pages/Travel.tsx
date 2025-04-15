import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { DestinationCard } from '../components/travel/DestinationCard';
import { MilesSimulator } from '../components/travel/MilesSimulator';
import { TravelAlerts } from '../components/travel/TravelAlerts';
import { TravelOffer, MilesSimulation, TravelAlert } from '../types/travel';

const mockOffers: TravelOffer[] = [
  {
    id: '1',
    destination: 'Paris, França',
    imageUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34',
    price: {
      miles: 150000,
      money: 2500,
    },
    discount: 15,
    period: {
      start: new Date('2024-06-01'),
      end: new Date('2024-06-30'),
    },
    tags: ['Primeira Classe', 'Direto', 'Flexível'],
  },
  {
    id: '2',
    destination: 'Nova York, EUA',
    imageUrl: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9',
    price: {
      miles: 120000,
      money: 2000,
    },
    discount: 20,
    period: {
      start: new Date('2024-07-01'),
      end: new Date('2024-07-31'),
    },
    tags: ['Executiva', 'Milhas + Dinheiro'],
  },
  {
    id: '3',
    destination: 'Tóquio, Japão',
    imageUrl: 'https://images.unsplash.com/photo-1536098561742-ca998e48cbcc',
    price: {
      miles: 200000,
      money: 3500,
    },
    discount: 10,
    period: {
      start: new Date('2024-08-01'),
      end: new Date('2024-08-31'),
    },
    tags: ['Premium', 'Primeira Classe', 'Direto'],
  },
];

const initialSimulation: MilesSimulation = {
  monthlySpending: 5000,
  cardType: 'gold',
  milesMultiplier: 2.0,
  categories: [
    { name: 'Restaurantes', percentage: 30, multiplier: 3 },
    { name: 'Supermercados', percentage: 40, multiplier: 2 },
    { name: 'Outros', percentage: 30, multiplier: 1 },
  ],
};
const mockAlerts: TravelAlert[] = [
  {
    id: '1',
    type: 'price_drop',
    title: 'Queda de Preço!',
    message: 'Passagens para Paris com 25% de desconto',
    date: new Date(),
    destination: 'Paris, França',
  },
  {
    id: '2',
    type: 'miles_expiring',
    title: 'Milhas a Vencer',
    message: '50.000 milhas expiram em 30 dias',
    date: new Date(),
  },
  {
    id: '3',
    type: 'promotion',
    title: 'Promoção Relâmpago',
    message: 'Ganhe 5x mais milhas em passagens internacionais',
    date: new Date(),
  },
];

 const Travel: React.FC = () => {
  const [selectedOffer, setSelectedOffer] = useState<TravelOffer | null>(null);

  const handleSimulation = (data: MilesSimulation) => {
    console.log('Simulation updated:', data);
  };

  return (
    <div className="min-h-screen bg-gray-950 p-4 md:p-6 pb-24">
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Oportunidades de Viagem
          </h1>
          <p className="text-gray-400">
            Descubra destinos incríveis e aproveite suas milhas
          </p>
        </div>

        {/* Destinos em Destaque */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white">
              Destinos em Destaque
            </h2>
            <button className="text-purple-400 hover:text-purple-300 flex items-center gap-1">
              Ver todos
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
            {mockOffers.map((offer) => (
              <DestinationCard
                key={offer.id}
                offer={offer}
                onSelect={setSelectedOffer}
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <MilesSimulator
            initialData={initialSimulation}
            onSimulate={handleSimulation}
          />
          <TravelAlerts alerts={mockAlerts} />
        </div>
      </div>
    </div>
  );
};

export default Travel;