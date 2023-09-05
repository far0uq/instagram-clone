import axios from "axios";
const API_URL = import.meta.env.VITE_REACT_APP_API_SERVER_URL;

export async function handlePostUpload(PostToUpload) {
  try {
    const token = localStorage.getItem("token");
    const values = { post: PostToUpload };
    const response = await axios.post(
      `${API_URL}/post/post-upload/${token}`,
      values
    );
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
}

export async function handleFetchPosts() {
  try {
    const token = localStorage.getItem("onProfile");
    const response = await axios.get(`${API_URL}/post/post-fetch/${token}`);
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
}
