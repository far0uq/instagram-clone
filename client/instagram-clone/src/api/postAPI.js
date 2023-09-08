import { axiosConfig } from "../utils/axiosConfig";

export async function handlePostUpload(PostToUpload) {
  try {
    const values = { post: PostToUpload };
    const response = await axiosConfig.post(`/post/post-upload`, values);
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
}

export async function handleFetchPosts() {
  try {
    const token = localStorage.getItem("onProfile");
    const response = await axiosConfig.get(`/post/post-fetch/${token}`);
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
}

export async function handleToggleLike(liked, selectedPostId) {
  try {
    const values = {
      liked: liked,
      postId: selectedPostId,
    };
    const response = await axiosConfig.post(`/post/toggle-like`, values);
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
}

export async function handleDeletePost(selectedPostId) {
  try {
    const response = await axiosConfig.delete(`/post/post-delete/${selectedPostId}`);
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
}
