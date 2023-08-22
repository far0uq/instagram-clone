import axios from "axios";

export async function handleTokenValidation(token) {
  const response = await axios.post(
    `http://127.0.0.1:5000/api/user/token-validation/${token}`
  );
  const { result } = response;
  return result;
}

export async function handleSignIn(values) {
  try {
    const response = await axios.post(
      "http://127.0.0.1:5000/api/user/login",
      values
    );
    const data = response.data;

    if (data.user) {
      localStorage.setItem("token", data.user);
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
  }
}

export async function handleSignUp(values) {
  try {
    const response = await axios.post(
      "http://127.0.0.1:5000/api/user/signup",
      values
    );
    const data = response.data;
    if (data.status === "ok") {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
  }
}

//TODO: fix up these api calls. Take out all other code than api request to express server.

export async function handleResetPassword(values, token) {
  try {
    const response = await axios.post(
      `http://127.0.0.1:5000/api/user/reset-password/${token}`,
      values
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
}

export async function handleForgotPassword(values) {
  try {
    const response = await axios.post(
      "http://127.0.0.1:5000/api/user/forgot-password",
      values
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
}
