import { Outlet, Navigate } from "react-router-dom";
import { validateAuthentication } from "../helpers/validateAuthentication";

function ProtectedRoutes() {
  const auth = validateAuthentication();
  return <>{auth ? <Outlet /> : <Navigate to="/accounts/login" />}</>;
}

export default ProtectedRoutes;
