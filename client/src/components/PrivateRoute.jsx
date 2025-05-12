import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  // While loading user info (checking token), show nothing (or loader)
  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  // If not logged in (after loading finishes), redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If logged in, show the component
  return children;
};

export default PrivateRoute;
