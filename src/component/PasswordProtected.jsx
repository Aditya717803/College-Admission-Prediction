// component/ProtectedRoute.js
import { Navigate } from 'react-router-dom';

// This component checks if the user is logged in (i.e., if a token exists in localStorage).
const ProtectedRoute = ({ element }) => {
  const token = localStorage.getItem('token'); // Check for a valid token

  // If no token is found, redirect to the login page
  if (!token) {
    return <Navigate to="/login" />;
  }

  // If token exists, allow access to the protected route (e.g., Dashboard)
  return element;
};

export default ProtectedRoute;
