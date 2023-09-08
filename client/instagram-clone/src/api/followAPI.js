import { axiosConfig } from "../utils/axiosConfig";

export async function handleAddFollower() {
  try {
    const currentUserToken = localStorage.getItem("onProfile");
    const values = {
      currentUserToken: currentUserToken,
    };
    const response = await axiosConfig.post(`/follow/add-follow`, values);
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
}

export async function handleRemoveFollower() {
  try {
    const currentUserToken = localStorage.getItem("onProfile");
    const values = {
      currentUserToken: currentUserToken,
    };
    const response = await axiosConfig.post(`/follow/remove-follow`, values);
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
}

export async function handleFetchFollowStatus() {
  try {
    const currentUserToken = localStorage.getItem("onProfile");
    const values = {
      currentUserToken: currentUserToken,
    };
    const response = await axiosConfig.post(
      `/follow/fetch-follow-status`,
      values
    );
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
}
