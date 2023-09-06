import axios from "axios";
const API_URL = import.meta.env.VITE_REACT_APP_API_SERVER_URL;

export async function handleAddFollower() {
  try {
    const loggedInUserToken = localStorage.getItem("token");
    const currentUserToken = localStorage.getItem("onProfile");
    const values = {
      loggedInUserToken: loggedInUserToken,
      currentUserToken: currentUserToken,
    };
    const response = await axios.post(`${API_URL}/follow/add-follow`, values);
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
}

export async function handleRemoveFollower() {
  try {
    const loggedInUserToken = localStorage.getItem("token");
    const currentUserToken = localStorage.getItem("onProfile");
    const values = {
      loggedInUserToken: loggedInUserToken,
      currentUserToken: currentUserToken,
    };
    const response = await axios.post(
      `${API_URL}/follow/remove-follow`,
      values
    );
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
}

export async function handleFetchFollowStatus() {
  try {
    const loggedInUserToken = localStorage.getItem("token");
    const currentUserToken = localStorage.getItem("onProfile");
    const values = {
      loggedInUserToken: loggedInUserToken,
      currentUserToken: currentUserToken,
    };
    const response = await axios.post(
      `${API_URL}/follow/fetch-follow-status`,
      values
    );
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
}
