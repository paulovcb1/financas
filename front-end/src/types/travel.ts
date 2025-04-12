export interface TravelOffer {
    id: string;
    destination: string;
    imageUrl: string;
    price: {
      miles: number;
      money: number;
    };
    discount: number;
    period: {
      start: Date;
      end: Date;
    };
    tags: string[];
  }
  
  export interface MilesSimulation {
    monthlySpending: number;
    cardType: 'basic' | 'gold' | 'platinum';
    milesMultiplier: number;
    categories: {
      name: string;
      percentage: number;
      multiplier: number;
    }[];
  }
  
  export interface TravelAlert {
    id: string;
    type: 'price_drop' | 'miles_expiring' | 'promotion';
    title: string;
    message: string;
    date: Date;
    destination?: string;
  }