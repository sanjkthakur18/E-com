/* import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import { isUserAuthenticated } from '../../store/authService';

const PrivateRoute = ({ element, path }) => {
  if (isUserAuthenticated()) {
    return element;
  } else {
    return <Navigate to="/signin" />;
  }
};

export default PrivateRoute; */