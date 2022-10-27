import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const useAuth = () => {
  const token = useSelector((state) => state.user.token);
  if (token) return true;
  else return false;
};

function ProtectedRoutes() {
  const auth = useAuth();

  return auth ? <Outlet /> : <Navigate to="/JeremiePiard_13_21092022/login" />;
}

export default ProtectedRoutes;
