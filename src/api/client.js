import axios from "axios";

// Ensure baseURL always ends with /api and is never empty
const getBaseURL = () => {
  const envURL = import.meta.env.VITE_API_URL;
  
  // If VITE_API_URL is provided, ensure it ends with /api
  if (envURL) {
    const trimmed = envURL.trim();
    if (trimmed) {
      // Remove trailing slash, then ensure /api is present
      const withoutTrailing = trimmed.replace(/\/$/, '');
      return withoutTrailing.endsWith('/api') 
        ? withoutTrailing 
        : `${withoutTrailing}/api`;
    }
  }
  
  // Default to Render production backend - ALWAYS use this if env is not set
  return "https://campushub2-1.onrender.com/api";
};

const baseURL = getBaseURL();

// Validate baseURL is set (defensive check)
if (!baseURL || !baseURL.startsWith('http')) {
  console.error('Invalid baseURL:', baseURL);
  throw new Error('API baseURL must be a valid HTTP/HTTPS URL');
}

const api = axios.create({
  baseURL,
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;