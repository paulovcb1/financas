import React from 'react';
import { Bell, TrendingDown, Clock, Gift } from 'lucide-react';
import { TravelAlert } from '../../types/travel';

interface Props {
  alerts: TravelAlert[];
}

export const TravelAlerts: React.FC<Props> = ({ alerts }) => {
  const getIcon = (type: TravelAlert['type']) => {
    switch (type) {
      case 'price_drop':
        return <TrendingDown className="w-5 h-5 text-green-400" />;
      case 'miles_expiring':
        return <Clock className="w-5 h-5 text-red-400" />;
      case 'promotion':
        return <Gift className="w-5 h-5 text-purple-400" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-900 rounded-xl p-6 shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white">Alertas de Viagem</h2>
        <Bell className="w-6 h-6 text-purple-400" />
      </div>

      <div className="space-y-4">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className="flex items-start gap-4 p-4 rounded-lg bg-gray-800"
          >
            {getIcon(alert.type)}
            <div>
              <h3 className="font-medium text-white">{alert.title}</h3>
              <p className="text-sm text-gray-400">{alert.message}</p>
              {alert.destination && (
                <span className="text-sm text-purple-400">
                  {alert.destination}
                </span>
              )}
              <span className="block text-xs text-gray-500 mt-1">
                {new Date(alert.date).toLocaleDateString('pt-BR', {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};