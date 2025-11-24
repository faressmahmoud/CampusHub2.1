import { Navigate } from 'react-router-dom';
import { getCurrentUser } from '../utils/auth';

/**
 * ProtectedRoute component - redirects to login if user is not authenticated
 */
const ProtectedRoute = ({ children }) => {
  const currentUser = getCurrentUser();
  
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

export default ProtectedRoute;

