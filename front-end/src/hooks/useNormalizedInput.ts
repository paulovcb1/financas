import { useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL

export const useNormalizedInput = () => {
  const [loading, setLoading] = useState(false);

  const normalizeInput = async (input: string) => {
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/normalize`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input }),
      });

      const data = await response.json();
      setLoading(false);
      return data.normalizedValue || input;
    } catch (error) {
      console.error('Erro ao normalizar entrada:', error);
      setLoading(false);
      return input;
    }
  };

  return { normalizeInput, loading };
};