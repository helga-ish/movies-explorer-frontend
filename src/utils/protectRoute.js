import React from 'react';
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ loggedIn }) => {
  if (!loggedIn) {
    return <Navigate to="/signin" replace />;
  }
  return <Outlet
  //  to={location.pathname} 
  //  replace
   />;
};

  export default ProtectedRoute;