import { useFormik } from "formik";
import { useNavigate, Link } from "react-router-dom";
import { handleSignUp } from "../../api/userAPI";
import { toast, ToastContainer } from "react-toastify";
import * as Yup from "yup";
import "react-toastify/dist/ReactToastify.css"; // Import the CSS

import "./AuthForm.css";
import instagram_logo from "../../assets/instagram_logo.png";

function SignUp() {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      fullname: "",
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .matches(
          /^[A-Za-z][A-Za-z0-9_.]*@[A-Za-z]+\.com$/,
          "Invalid Email Format"
        )
        .required("This is a required field"),

      fullname: Yup.string(),
      username: Yup.string(),
      password: Yup.string()
        .min(7, "Password need to be minimum 8 characters")
        .matches(
          /^(?=.+\d)(?=.+[_@.])[A-Za-z0-9_@.]+$/,
          "Invalid Password Format"
        )
        .required("Password is a required field"),
    }),
    onSubmit: async (values) => {
      if (await handleSignUp(values)) {
        toast.success("Signup Successful.");
        navigate("/dummy");
      } else {
        toast.error("A user with that email already exists.");
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
          type="text"
          name="fullname"
          placeholder="Full Name"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.fullname}
        />
        {formik.errors.fullname && formik.touched.fullname && (
          <p>{formik.errors.fullname}</p>
        )}
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.username}
        />
        {formik.errors.username && formik.touched.username && (
          <p>{formik.errors.username}</p>
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
        <input type="submit" name="submit" value="Sign Up" />
        <p>
          Already a user? <Link to="/login">Log in</Link>
        </p>
      </form>
    </>
  );
}

export default SignUp;
