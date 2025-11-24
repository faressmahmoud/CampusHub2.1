// Authentication utility functions for localStorage

/**
 * Get the currently logged-in user from localStorage
 * @returns {Object|null} User object or null if not logged in
 */
export const getCurrentUser = () => {
  const user = localStorage.getItem('currentUser');
  return user ? JSON.parse(user) : null;
};

/**
 * Set the currently logged-in user in localStorage
 * @param {Object} user - User object to set as current user
 */
export const setCurrentUser = (user) => {
  localStorage.setItem('currentUser', JSON.stringify(user));
};

/**
 * Clear the current user from localStorage (logout)
 */
export const clearCurrentUser = () => {
  localStorage.removeItem('currentUser');
};

/**
 * Register a new user
 * @param {Object} userData - User registration data
 * @returns {boolean} True if registration successful, false if user already exists
 */
export const registerUser = (userData) => {
  const users = getUsers();
  const existingUser = users.find(u => u.email === userData.email);
  
  if (existingUser) {
    return false; // User already exists
  }
  
  users.push(userData);
  localStorage.setItem('users', JSON.stringify(users));
  return true;
};

/**
 * Get all registered users
 * @returns {Array} Array of user objects
 */
export const getUsers = () => {
  const users = localStorage.getItem('users');
  return users ? JSON.parse(users) : [];
};

/**
 * Authenticate a user (check if email and password match)
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Object|null} User object if authenticated, null otherwise
 */
export const authenticateUser = (email, password) => {
  const users = getUsers();
  const user = users.find(u => u.email === email && u.password === password);
  return user || null;
};

/**
 * Get user-specific data key
 * @param {string} dataType - Type of data (tasks, notes, links)
 * @param {string} email - User email
 * @returns {string} localStorage key
 */
export const getUserDataKey = (dataType, email) => {
  return `${dataType}_${email}`;
};

/**
 * Get user-specific data
 * @param {string} dataType - Type of data (tasks, notes, links)
 * @param {string} email - User email
 * @returns {Array} Array of data items
 */
export const getUserData = (dataType, email) => {
  const key = getUserDataKey(dataType, email);
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};

/**
 * Save user-specific data
 * @param {string} dataType - Type of data (tasks, notes, links)
 * @param {string} email - User email
 * @param {Array} data - Array of data items to save
 */
export const saveUserData = (dataType, email, data) => {
  const key = getUserDataKey(dataType, email);
  localStorage.setItem(key, JSON.stringify(data));
};

