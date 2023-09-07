import axios from "axios";
const API_URL = import.meta.env.VITE_REACT_APP_API_SERVER_URL;

export async function handleSubmitComment(commentContent, postId) {
  try {
    const token = localStorage.getItem("token");
    const values = { commentContent: commentContent, postId: postId };
    const response = await axios.post(
      `${API_URL}/comment/submit-comment/${token}`,
      values
    );
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
}

export async function handleFetchComments(postId) {
  try {
    const values = { postId: postId };
    const response = await axios.post(
      `${API_URL}/comment/fetch-comments`,
      values
    );
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
}
