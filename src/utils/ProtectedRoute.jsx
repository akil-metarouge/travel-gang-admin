import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const authUser = JSON.parse(localStorage.getItem("user"));
  const authToken = localStorage.getItem("token");
  const isAuthenticated =
    authUser?.email && authUser?.role === "admin" && authToken;

  return isAuthenticated ? children : <Navigate to="/signin" />;
};

export default ProtectedRoute;
