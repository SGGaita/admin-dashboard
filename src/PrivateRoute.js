import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectLogin } from './redux/authSlice';

const PrivateRoute = () => {
  const { isLoggedIn } = useSelector(selectLogin);
  const location = useLocation();

  if (!isLoggedIn) {
    // Redirect to login page with current path as query parameter
    return <Navigate to={`/?returnUrl=${location.pathname}`} replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
