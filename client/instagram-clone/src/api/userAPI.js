import axios from "axios";

export async function handleTokenValidation(token) {
  console.log(token);
  const response = await axios.post(
    `http://127.0.0.1:5000/api/token-validation/${token}`
  );
  const { result } = response;
  return result;
}

export async function handleSignIn(values) {
  try {
    const response = await axios.post(
      "http://127.0.0.1:5000/api/login",
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
      "http://127.0.0.1:5000/api/signup",
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
