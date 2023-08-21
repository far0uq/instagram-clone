import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

import "./AuthForm.css";
import instagram_logo from "../../assets/instagram_logo.png";

function ForgotPasswordPage() {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .matches(
          /^[A-Za-z][A-Za-z0-9_.]*@[A-Za-z]+\.com$/,
          "Invalid Email Format"
        )
        .required("This is a required field"),
    }),
    onSubmit: async (values) => {
      try {
        //const response =
        const response = await axios.post(
          "http://127.0.0.1:5000/api/forgot-password",
          values
        );
        const data = response.data;
        if (data.status === "ok") {
          toast.success("Email Sent!");
          formik.values.email = "";
          setTimeout(() => {
            navigate("/login");
          }, 3000);
        } else
          toast.error(
            "Please enter an email that is associated with an account."
          );
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
          type="email"
          name="email"
          placeholder="Email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        {formik.errors.email && formik.touched.email ? (
          <p>{formik.errors.email}</p>
        ) : null}
        <input type="submit" name="submit" value="Reset Password" />
      </form>
    </>
  );
}

export default ForgotPasswordPage;
