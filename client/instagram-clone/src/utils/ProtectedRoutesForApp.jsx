import { Outlet, Navigate } from "react-router-dom";

function ProtectedRoutesForApp() {
  const auth = localStorage.getItem("auth");
  return (
    <>{auth === "true" ? <Outlet /> : <Navigate to="/accounts/login" />}</>
  );
}

export default ProtectedRoutesForApp;
