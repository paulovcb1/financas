import { useState } from "react";

export const useNormalizedInput = () => {
  const [loading, setLoading] = useState(false);

  const normalizeInput = async (input: string) => {
    setLoading(true);


    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`, 
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            { role: "system", content: "Você é um assistente que converte entradas de usuários em números válidos." },
            { role: "user", content: `Converta isso para um número: "${input}" e me retorne apenas o numero convertido e nada mais` },
          ],
          max_tokens: 10,
        }),
      });

      const data = await response.json();
      const normalizedValue = data.choices?.[0]?.message?.content?.trim();

      setLoading(false);
      return normalizedValue || input; 
    } catch (error) {
      console.error("Erro ao normalizar entrada:", error);
      setLoading(false);
      return input;
    }
  };

  return { normalizeInput, loading };
};
