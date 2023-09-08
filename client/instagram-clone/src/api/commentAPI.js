import { axiosConfig } from "../utils/axiosConfig";

export async function handleSubmitComment(commentContent, postId) {
  try {
    const values = { commentContent: commentContent, postId: postId };
    const response = await axiosConfig.post(`/comment/submit-comment`, values);
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
}

export async function handleFetchComments(postId) {
  try {
    const values = { postId: postId };
    const response = await axiosConfig.post(`/comment/fetch-comments`, values);
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
}

export async function handleToggleCommentLike(commentId, liked) {
  try {
    const values = {
      liked: liked,
      commentId: commentId,
    };
    const response = await axiosConfig.post(
      `/comment/toggle-comment-like`,
      values
    );
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
}

export async function handleFetchCommentLikes(commentId) {
  try {
    const response = await axiosConfig.get(
      `/comment/fetch-comment-likes/${commentId}`
    );
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
}
