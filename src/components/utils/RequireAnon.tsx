import { Outlet, Navigate } from "react-router-dom";

import React from "react";
import { selectUser } from "../../store/auth/authSlice";
import { useAppSelector } from "../../store/hooks";

const RequireAnon = () => {
  const currentUser = useAppSelector(selectUser);
  if (currentUser) return <Navigate to="/home" replace />;
  return <Outlet />;
};

export default RequireAnon;
