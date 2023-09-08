import { Outlet, Navigate } from "react-router-dom";

function ProtectedRoutesForAuth() {
  const auth = localStorage.getItem("auth");
  return <>{!(auth === "true") ? <Outlet /> : <Navigate to="/" />}</>;
}

export default ProtectedRoutesForAuth;
