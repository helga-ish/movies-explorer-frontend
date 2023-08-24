import React from 'react';
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = (props) => {
  return props.loggedIn ? <Outlet /> : <Navigate to="/signin" replace/>;
  };

  export default ProtectedRoute;