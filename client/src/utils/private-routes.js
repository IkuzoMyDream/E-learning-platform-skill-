import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./auth/Auth.context";
import useSessionStorage from "./use-session-storage";

export default function PrivateRoutes({ allowedRole }) {
  const jwt = sessionStorage.getItem("auth.jwt");
  const userRole = sessionStorage.getItem("auth.role");

  const location = useLocation();

  return userRole === allowedRole ? <Outlet /> : <Navigate to={"/"}/>;
}
