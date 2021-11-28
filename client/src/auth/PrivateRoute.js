import React from "react";
import { isAuthenticated } from "./isAuthenticated";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ Component, ...props }) => {
  if (!isAuthenticated()) {
    return <Navigate to={"/"} />;
  }

  return <Component {...props} />;
};

export default PrivateRoute;
