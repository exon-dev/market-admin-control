
import React from "react";
import { Navigate } from "react-router-dom";

// Redirect the index page to the Dashboard using Navigate
const Index = () => {
  return <Navigate to="/" replace />;
};

export default Index;
