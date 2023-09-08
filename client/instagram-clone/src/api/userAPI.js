import { axiosConfig } from "../utils/axiosConfig";

export async function handleTokenValidation() {
  try {
    console.log("in the api");
    const response = await axiosConfig.post(`/user/token-validation`);
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
}

export async function handleSignIn(values) {
  try {
    const response = await axiosConfig.post("/user/login", values);
    const data = response.data;
    console.log("🚀 ~ file: userAPI.js:16 ~ handleSignIn ~ data:", data);

    if (data.user) {
      console.log("executed 1");
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
    const response = await axiosConfig.post("/user/signup", values);
    const data = response.data;

    if (data.user) {
      console.log("executed 2");
      localStorage.setItem("token", data.user);
      localStorage.setItem("onProfile", data.user);
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
    const response = await axiosConfig.post(
      `/user/reset-password/${token}`,
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
    const response = await axiosConfig.post(`/user/forgot-password`, values);
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
    const response = await axiosConfig.post(
      `/user/profile-image-upload`,
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
    const response = await axiosConfig.post(
      `/user/fetch-profile-info/${token}`
    );
    return response.data;
  } catch (err) {
    throw new Error("Cannot fetch user info.");
  }
}

export async function fetchProfilePicture() {
  try {
    const token = localStorage.getItem("onProfile");
    const response = await axiosConfig.get(
      `/user/fetch-profile-picture/${token}`
    );
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
}

export async function handleSearchUsers(searchQuery) {
  try {
    const search = { searchQuery: searchQuery };
    const response = await axiosConfig.post(`/user/search-user`, search);
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
    const response = await axiosConfig.post(
      `/user/tokenize-searched-user`,
      userDetails
    );
    return response.data;
  } catch (err) {
    throw new Error("Cannot fetch user info.");
  }
}

export async function fetchUserId() {
  try {
    const response = await axiosConfig.get(`/user/fetch-user-id`);
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
}
