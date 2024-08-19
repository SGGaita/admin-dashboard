import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectLogin } from './redux/authSlice';

const PublicRoute = () => {
  const { isLoggedIn } = useSelector(selectLogin);
  const location = useLocation();

  if (isLoggedIn) {
    // Redirect to dashboard or another protected route after login
    return <Navigate to="/dashboard" replace />; // Replace with your desired redirect path
  }

  return <Outlet />;
};

export default PublicRoute;
