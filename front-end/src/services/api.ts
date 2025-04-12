const API_URL = 'http://localhost:5100/api';

export const saveUserData = async (userData: any) => {
  try {
    console.log('Sending user data:', userData);
    
    const method = userData._id ? 'PUT' : 'POST'; // Usa PUT se _id existir
    const url = userData._id ? `${API_URL}/users/${userData._id}` : `${API_URL}/users`;
    
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to save user data');
    }
    
    return data;
  } catch (error) {
    console.error('Error saving user data:', error);
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
