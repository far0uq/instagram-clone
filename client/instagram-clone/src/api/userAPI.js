import axios from "axios";
const API_URL = import.meta.env.VITE_REACT_APP_API_SERVER_URL;

export async function handleTokenValidation(token) {
  const response = await axios.post(
    `${API_URL}/user/token-validation/${token}`
  );
  return response.data;
}

export async function handleSignIn(values) {
  try {
    const response = await axios.post(`${API_URL}/user/login`, values);
    const data = response.data;

    if (data.user) {
      localStorage.setItem("token", data.user);
      localStorage.setItem("onProfile", data.user);
      return true;
    }
    return false;
  } catch (err) {
    throw new Error(
      "Sign up failed due to server connection issue. Could not establish connection to the server."
    );
  }
}

export async function handleSignUp(values) {
  try {
    const response = await axios.post(`${API_URL}/user/signup`, values);
    const data = response.data;
    if (data.status === 201) {
      return true;
    }
    return false;
  } catch (err) {
    throw new Error(
      "Login failed due to server connection issue. Could not establish connection to the server."
    );
  }
}

export async function handleResetPassword(values, token) {
  try {
    const response = await axios.post(
      `${API_URL}/user/reset-password/${token}`,
      values
    );
    const data = response.data;
    if (data.status === 200) {
      return true;
    }
    return false;
  } catch (err) {
    throw new Error(
      "Could not validate you due to failed server connection. Could not establish connection to the server."
    );
  }
}

export async function handleForgotPassword(values) {
  try {
    const response = await axios.post(
      `${API_URL}/user/forgot-password`,
      values
    );
    const data = response.data;
    if (data.status === 200) {
      return true;
    }
    return false;
  } catch (err) {
    throw new Error(
      "There was an error in trying to reach your email. Could not establish connection to the server."
    );
  }
}

export async function handleProfileImageUpload(imageToUpload) {
  try {
    const values = { image: imageToUpload };
    const token = localStorage.getItem("token");
    const response = await axios.post(
      `${API_URL}/user/profile-image-upload/${token}`,
      values
    );
    return response.data;
  } catch (err) {
    throw new Error(
      "Image upload failed. Could not establish connection to the server."
    );
  }
}

export async function fetchProfileInfo() {
  try {
    const token = localStorage.getItem("onProfile");
    const response = await axios.post(
      `${API_URL}/user/fetch-profile-info/${token}`
    );
    return response.data;
  } catch (err) {
    throw new Error("Cannot fetch user info.");
  }
}

export async function fetchProfilePicture() {
  try {
    const token = localStorage.getItem("onProfile");
    const response = await axios.get(
      `${API_URL}/user/fetch-profile-picture/${token}`
    );
    return response.data;
  } catch (err) {
    throw new Error("Cannot fetch user info.");
  }
}

export async function handleSearchUsers(searchQuery) {
  try {
    const search = { searchQuery: searchQuery };
    const response = await axios.post(`${API_URL}/user/search-user`, search);
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
}

export async function handleSetSearchedUserToken(email, password) {
  try {
    const userDetails = {
      email: email,
      pasword: password,
    };
    const response = await axios.post(
      `${API_URL}/user/tokenize-searched-user`,
      userDetails
    );
    return response.data;
  } catch (err) {
    throw new Error("Cannot fetch user info.");
  }
}
