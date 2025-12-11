import axios from 'axios';

// Ensure baseURL always ends with /api
const getBaseURL = () => {
  const envURL = import.meta.env.VITE_API_URL;
  if (envURL) {
    // If VITE_API_URL is provided, ensure it ends with /api
    return envURL.endsWith('/api') ? envURL : `${envURL.replace(/\/$/, '')}/api`;
  }
  // Default to Render production backend
  return 'https://campushub2-1.onrender.com/api';
};

const api = axios.create({
  baseURL: getBaseURL(),
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;

