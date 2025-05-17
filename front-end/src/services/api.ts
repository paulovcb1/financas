const API_URL = import.meta.env.VITE_API_URL

export const createUser = async (userData: any) => {
    try {
      console.log('POST: ', userData);
  
      const response = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.error || 'Failed to create user');
      }
  
      return data;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  };

  export const updateUser = async (userId: string, userData: any) => {
    try {
      console.log('PUT COM ID:', userId, 'e dados:', userData);
  
      const response = await fetch(`${API_URL}/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.error || 'Failed to update user');
      }
  
      return data;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  };

export const getUserData = async (userId: string) => {
  try {
    const response = await fetch(`${API_URL}/users/${userId}`);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to fetch user data');
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};

export const checkPhoneNumber = async (phone: string) => {
    try {
      const response = await fetch(`${API_URL}/users/check-phone`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.error || 'Erro ao verificar o telefone');
      }
  
      return data;
    } catch (error) {
      console.error('Erro ao verificar o telefone:', error);
      throw error; // Lança o erro para ser tratado na LandingPage
    }
  };


  export const fetchAllUsers = async () => {
    const response = await fetch(`${API_URL}/users/All-users`);
    if (!response.ok) {
      throw new Error('Erro ao buscar usuários');
    }
    return response.json();
  };

  export const fetchCards = async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const response = await fetch(`${API_URL}/card/search?${query}`);
    if (!response.ok) throw new Error('Erro ao buscar cartões');
    return response.json();
  }

  export const selectedCard = async (userId: string, cardId: string) => {
    try {
      const response = await fetch(`${API_URL}/card/user/select-card`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, cardId }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.error || 'Erro ao selecionar cartão');
      }
  
      return data;
    } catch (error) {
      console.error('Erro ao selecionar cartão:', error);
      throw error;
    }
  }