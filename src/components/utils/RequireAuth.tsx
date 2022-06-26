import React from "react";
import { Outlet, useLocation, Navigate } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import { selectUser } from "../../store/auth/authSlice";

type Props = { roles: number[] };
const RequireAuth: React.FC<Props> = ({ roles }) => {
  const currentUser = useAppSelector(selectUser);
  const location = useLocation();

  if (!currentUser)
    return <Navigate to="/login" state={{ from: location }} replace />;

  if (!currentUser.roles.some((role) => roles.includes(role))) {
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default RequireAuth;
