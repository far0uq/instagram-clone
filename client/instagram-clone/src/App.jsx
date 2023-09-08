import { Routes, Route } from "react-router-dom";
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";

import { useState } from "react";
import SignUp from "./pages/auth/SignUp";
import SignIn from "./pages/auth/SignIn";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";
import MainPage from "./pages/main/MainPage";

import ProtectedRoutesForApp from "./utils/ProtectedRoutesForApp";
import ProtectedRoutesForAuth from "./utils/ProtectedRoutesForAuth";
import ErrorPage from "./pages/error/ErrorPage";

function App() {
  const [refreshRoutes, setRefreshRoutes] = useState(false);

  const triggerRefreshRoutes = () => {
    refreshRoutes ? setRefreshRoutes(false) : setRefreshRoutes(true);
  };

  return (
    <>
      <Routes>
        <Route
          element={
            <ProtectedRoutesForApp
              triggerRefreshRoutes={triggerRefreshRoutes}
            />
          }
        >
          <Route
            path="/"
            element={<MainPage isCurrentAccount={false} />}
          ></Route>
        </Route>

        <Route
          element={
            <ProtectedRoutesForAuth
              triggerRefreshRoutes={triggerRefreshRoutes}
            />
          }
        >
          <Route path="/accounts/signup" element={<SignUp />}></Route>
          <Route path="/accounts/login" element={<SignIn />}></Route>
          <Route
            path="/forgot-password"
            element={<ForgotPasswordPage />}
          ></Route>
          <Route
            path="/reset-password/:token"
            element={<ResetPasswordPage />}
          ></Route>
        </Route>

        <Route path="*" element={<ErrorPage />}></Route>
      </Routes>
    </>
  );
}

export default App;
