import React from 'react';
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ isTokenRight }) => {
  if (!isTokenRight) {
    return <Navigate to="/signin" replace />;
  }
  return <Outlet />;
};

  export default ProtectedRoute;