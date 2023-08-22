import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { toast, ToastContainer } from "react-toastify";
import * as Yup from "yup";

import "./AuthForm.css";
import instagram_logo from "../../assets/instagram_logo.png";
import { handleResetPassword, handleTokenValidation } from "../../api/userAPI";

function ResetPasswordPage() {
  const navigate = useNavigate();
  const { token } = useParams();

  useEffect(() => {
    if (handleTokenValidation(token) === "failed") {
      navigate("/");
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      password: "",
      confirm_password: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(7, "Password need to be minimum 8 characters")
        .matches(
          /^(?=.+\d)(?=.+[_@.])[A-Za-z0-9_@.]+$/,
          "Invalid Password Format"
        )
        .required("Password is a required field"),
      confirm_password: Yup.string()
        .min(7, "Password need to be minimum 8 characters")
        .matches(
          /^(?=.+\d)(?=.+[_@.])[A-Za-z0-9_@.]+$/,
          "Invalid Password Format"
        )
        .required("Password is a required field"),
    }),
    onSubmit: async (values) => {
      try {
        if (values.password === values.confirm_password) {
          const data = await handleResetPassword(values, token);
          if (data.status === "ok") {
            toast.success("Password reset successfully.");
            setTimeout(() => {
              navigate("/login");
            }, 2000);
          }
        } else toast.error("Passwords don't match.");
        //const data = response.data;
      } catch (err) {
        console.log(err);
      }
    },
  });

  return (
    <>
      <ToastContainer />
      <form onSubmit={formik.handleSubmit} className="auth-form">
        <img src={instagram_logo} alt="Instagram Logo" />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        {formik.errors.password && formik.touched.password ? (
          <p>{formik.errors.password}</p>
        ) : null}
        <input
          type="password"
          name="confirm_password"
          placeholder="Confirm Password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.confirm_password}
        />
        {formik.errors.confirm_password && formik.touched.confirm_password ? (
          <p>{formik.errors.confirm_password}</p>
        ) : null}
        <input type="submit" name="submit" value="Save Changes" />
      </form>
    </>
  );
}

export default ResetPasswordPage;
