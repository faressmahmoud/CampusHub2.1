import api from './client';

/**
 * Get all links
 */
export const getLinks = async () => {
  const response = await api.get('/links');
  return response.data;
};

/**
 * Get single link
 */
export const getLink = async (id) => {
  const response = await api.get(`/links/${id}`);
  return response.data;
};

/**
 * Create link
 */
export const createLink = async (linkData) => {
  const response = await api.post('/links', linkData);
  return response.data;
};

/**
 * Update link
 */
export const updateLink = async (id, linkData) => {
  const response = await api.put(`/links/${id}`, linkData);
  return response.data;
};

/**
 * Delete link
 */
export const deleteLink = async (id) => {
  const response = await api.delete(`/links/${id}`);
  return response.data;
};

