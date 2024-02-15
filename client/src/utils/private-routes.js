import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./auth/Auth.context";

export default function PrivateRoutes({
  allowedRole,
  dataprovider: DataProvider,
}) {

  const { state } = useContext(AuthContext)
  const location = useLocation();
  console.log(state)
  return state == allowedRole ? (
    <DataProvider>
      <Outlet />
    </DataProvider>
  ) : (
    <Navigate to={"/login"} state={{ from: location }} replace />
  );
}