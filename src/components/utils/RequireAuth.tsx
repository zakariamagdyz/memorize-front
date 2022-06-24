import React from "react";
import { Outlet, useLocation, Navigate } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import { selectUser } from "../../store/auth/authSlice";

const RequireAuth = () => {
  const currentUser = useAppSelector(selectUser);
  const location = useLocation();

  if (!currentUser)
    return <Navigate to="/login" state={{ from: location }} replace />;

  return <Outlet />;
};

export default RequireAuth;
