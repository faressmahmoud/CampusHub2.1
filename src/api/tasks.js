import api from './client';

/**
 * Get all tasks
 */
export const getTasks = async () => {
  const response = await api.get('/tasks');
  return response.data;
};

/**
 * Get single task
 */
export const getTask = async (id) => {
  const response = await api.get(`/tasks/${id}`);
  return response.data;
};

/**
 * Create task
 */
export const createTask = async (taskData) => {
  const response = await api.post('/tasks', taskData);
  return response.data;
};

/**
 * Update task
 */
export const updateTask = async (id, taskData) => {
  const response = await api.put(`/tasks/${id}`, taskData);
  return response.data;
};

/**
 * Delete task
 */
export const deleteTask = async (id) => {
  const response = await api.delete(`/tasks/${id}`);
  return response.data;
};

