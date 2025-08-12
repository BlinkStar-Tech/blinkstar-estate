import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    // Redirect to signin if not authenticated
    return <Navigate to="/signin" replace />;
  }

  return children;
};

export default PrivateRoute; 