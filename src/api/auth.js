import api from './client';

/**
 * Register a new user
 */
export const register = async (userData) => {
  const response = await api.post('/auth/register', userData, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

/**
 * Login user
 * @route POST /api/auth/login
 * Final URL: baseURL + '/auth/login' = https://campushub2-1.onrender.com/api/auth/login
 */
export const login = async (email, password) => {
  // CRITICAL: Path must start with '/' to be absolute, not relative
  // This ensures it combines with baseURL correctly
  const response = await api.post('/auth/login', { email, password }, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

/**
 * Get current user
 */
export const getMe = async () => {
  const response = await api.get('/auth/me');
  return response.data;
};

