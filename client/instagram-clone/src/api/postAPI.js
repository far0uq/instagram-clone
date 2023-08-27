import axios from "axios";
const API_URL = import.meta.env.VITE_REACT_APP_API_SERVER_URL;

export async function handlePostUpload(PostToUpload) {
  try {
    const values = { post: PostToUpload };
    const response = await axios.post(`${API_URL}/post/image-upload`, values);
    return response.data;
  } catch (err) {
    throw new Error(
      "Post creation failed. Could not establish connection to the server."
    );
  }
}
