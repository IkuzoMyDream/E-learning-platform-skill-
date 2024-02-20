import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./auth/Auth.context";

export default function PrivateRoutes({ allowedRole }) {
  const { state } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);
  const location = useLocation();

  useEffect(() => {
    if (state) {
      setUserRole(state?.user?.role);
      setIsLoading(false);
    } else {
      setUserRole(undefined);
    }
  }, [state]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (userRole === allowedRole)  ? <Outlet /> : <>not allowed</>;
}
