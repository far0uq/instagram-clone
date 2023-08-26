import { useFormik } from "formik";
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import * as Yup from "yup";

import "./AuthForm.css";
import instagram_logo from "../../assets/instagram_logo.png";
import { handleSignIn } from "../../api/userAPI";

function SignIn() {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .matches(
          /^[A-Za-z][A-Za-z0-9_.]*@[A-Za-z]+\.com$/,
          "Invalid Email Format"
        )
        .required("This is a required field"),
      password: Yup.string()
        .min(7, "Password need to be minimum 8 characters")
        .matches(
          /^(?=.+\d)(?=.+[_@.])[A-Za-z0-9_@.]+$/,
          "Invalid Password Format"
        )
        .required("Password is a required field"),
    }),
    onSubmit: async (values) => {
      if (await handleSignIn(values)) {
        toast.success("Login Successful.");
        navigate("/dummy");
      } else {
        toast.error("Invalid Details. Please Check your details");
      }
    },
  });

  return (
    <>
      <ToastContainer />
      <form onSubmit={formik.handleSubmit} className="auth-form">
        <img src={instagram_logo} alt="Instagram Logo" />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        {formik.errors.email && formik.touched.email && (
          <p>{formik.errors.email}</p>
        )}
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        {formik.errors.password && formik.touched.password && (
          <p>{formik.errors.password}</p>
        )}
        <p style={{ color: "blue" }}>
          <Link to="/forgot-password">Forgot Password</Link>
        </p>
        <p>
          Don't have an account? <Link to="/">Sign Up</Link>
        </p>
        <input type="submit" name="submit" value="Login" />
      </form>
    </>
  );
}

export default SignIn;
