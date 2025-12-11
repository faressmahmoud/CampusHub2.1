import api from './client';

/**
 * Register a new user
 */
export const register = async (userData) => {
  const response = await api.post('/auth/register', userData);
  return response.data;
};

/**
 * Login user
 */
export const login = async (email, password) => {
  const response = await api.post('/auth/login', { email, password });
  return response.data;
};

/**
 * Get current user
 */
export const getMe = async () => {
  const response = await api.get('/auth/me');
  return response.data;
};

