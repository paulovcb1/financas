import React from 'react';
import { Plane, Tag, Calendar } from 'lucide-react';
import { TravelOffer } from '../../types/travel';

interface Props {
  offer: TravelOffer;
  onSelect: (offer: TravelOffer) => void;
}

export const DestinationCard: React.FC<Props> = ({ offer, onSelect }) => {
  const formatMiles = (miles: number) => {
    return new Intl.NumberFormat('pt-BR').format(miles);
  };

  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(amount);
  };

  return (
    <div 
      className="flex-shrink-0 w-80 bg-gray-900 rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer"
      onClick={() => onSelect(offer)}
    >
      <div className="relative h-48">
        <img
          src={offer.imageUrl}
          alt={offer.destination}
          className="w-full h-full object-cover"
        />
        {offer.discount > 0 && (
          <div className="absolute top-4 right-4 bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
            -{offer.discount}%
          </div>
        )}
      </div>
      
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-white">{offer.destination}</h3>
          <Plane className="w-5 h-5 text-purple-400" />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-gray-300">
            <span>Milhas:</span>
            <span className="font-semibold">{formatMiles(offer.price.miles)}</span>
          </div>
          <div className="flex items-center justify-between text-gray-300">
            <span>Valor:</span>
            <span className="font-semibold">{formatMoney(offer.price.money)}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-400">
          <Calendar className="w-4 h-4" />
          <span>
            {new Date(offer.period.start).toLocaleDateString('pt-BR')} - 
            {new Date(offer.period.end).toLocaleDateString('pt-BR')}
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {offer.tags.map((tag, index) => (
            <div
              key={index}
              className="flex items-center gap-1 bg-gray-800 px-3 py-1 rounded-full text-xs text-purple-300"
            >
              <Tag className="w-3 h-3" />
              {tag}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};