const API_URL = 'http://localhost:5100/api';

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
