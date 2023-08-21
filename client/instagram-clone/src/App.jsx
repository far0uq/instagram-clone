import { Routes, Route } from "react-router-dom";

import SignUp from "./pages/auth/SignUp";
import Dummy from "./pages/test/dummy";
import SignIn from "./pages/auth/SignIn";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";

function App() {
  {
    /*TODO: Implement Protected Routes*/
  }
  return (
    <>
      <Routes>
        <Route path="/" element={<SignUp />}></Route>
        <Route path="/login" element={<SignIn />}></Route>
        <Route path="/dummy" element={<Dummy />}></Route>
        <Route path="/forgot-password" element={<ForgotPasswordPage />}></Route>
        <Route
          path="/reset-password/:token"
          element={<ResetPasswordPage />}
        ></Route>
      </Routes>
    </>
  );
}

export default App;
