import "./PostDetails.css";
import PropTypes from "prop-types";
import emptyheart_icon from "../../assets/icons/emptyheart_icon50.png";
import fullheart_icon from "../../assets/icons/fullheart_icon50.png";
import cross_icon from "../../assets/icons/cross_icon60.png";
import { useEffect, useState, useRef } from "react";
import { handleDeletePost, handleToggleLike } from "../../api/postAPI";
import { fetchUserId } from "../../api/userAPI";
import { handleFetchComments, handleSubmitComment } from "../../api/commentAPI";
import Comment from "../../components/comment/Comment";
import { ToastContainer, toast } from "react-toastify";
import isCurrentUserAccount from "../../helpers/isCurrentUserAccount";
function PostDetails({ onClose, selectedPost, profileRefresh }) {
  const [liked, setLiked] = useState(false);
  const [likedCount, setLikedCount] = useState(selectedPost.liked_by.length);
  const [isCommentEmpty, setIsCommentEmpty] = useState(true);
  const [comments, setComments] = useState([]);
  const commentRef = useRef();

  const makeLike = () => {
    liked ? setLiked(false) : setLiked(true);
  };

  const isLoggedInAccount = isCurrentUserAccount();

  const checkCommentInput = (e) => {
    if (e.target.value !== "") {
      setIsCommentEmpty(false);
    } else {
      setIsCommentEmpty(true);
    }
  };

  const fetchComments = async () => {
    const data = await handleFetchComments(selectedPost._id);
    setComments(data.comments);
  };

  const deletePost = async () => {
    try {
      const data = await handleDeletePost(selectedPost._id);

      if (data.status === 200) {
        toast.success("Post deleted Successfully");
        profileRefresh();
        onClose();
      } else {
        toast.error("Could not delete post.");
      }
    } catch (err) {
      toast.error("Could not delete post.");
    }
  };

  const submitComment = async () => {
    const data = await handleSubmitComment(
      commentRef.current.value,
      selectedPost._id
    );
    if (data.status === 200) {
      toast.success("Comment Made Successfully");
      commentRef.current.value = "";
      await fetchComments();
    } else {
      toast.error("Could not submit comment");
    }
  };

  useEffect(() => {
    const refreshLikeCount = async () => {
      const data = await fetchUserId();
      selectedPost.liked_by.includes(data.userId)
        ? setLiked(true)
        : setLiked(false);
    };
    refreshLikeCount();
  }, []);

  useEffect(() => {
    const toggleLike = async () => {
      const data = await handleToggleLike(liked, selectedPost._id);
      setLikedCount(data.count);
    };
    toggleLike();
  }, [liked]);

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <>
      <ToastContainer />
      <div className="overlay"></div>
      <div className="close-btn" onClick={onClose}>
        <img src={cross_icon} />
      </div>
      <div className="post-details d-flex container">
        <section className="image-section col-8 d-flex align-items-center justify-content-center">
          <img src={selectedPost.images[0].image_url}></img>
        </section>
        <aside className="col-4">
          {isLoggedInAccount && (
            <div className="post-options d-flex justify-content-around">
              <button>Edit</button>
              <button onClick={deletePost}>Delete</button>
            </div>
          )}
          <div className="comment-section d-flex justify-content-center flex-column">
            {comments.length > 0 ? (
              comments.map((comment) => {
                return (
                  <Comment
                    key={comment._id}
                    createdByUsername={comment.created_by.username}
                    createdAt={comment.created_at}
                    commentContent={comment.comment_content}
                    likedBy={comment.liked_by}
                  />
                );
              })
            ) : (
              <div>
                <h1>No comments yet.</h1>
                <h2>Start the conversation</h2>
              </div>
            )}
          </div>
          <div className="likes-section">
            {liked ? (
              <img onClick={makeLike} src={fullheart_icon}></img>
            ) : (
              <img onClick={makeLike} src={emptyheart_icon}></img>
            )}
            <p>{likedCount} Likes</p>
          </div>
          <div className="comment-form">
            <form>
              <input
                type="text"
                id="comment-content"
                placeholder="Add a comment..."
                onChange={checkCommentInput}
                ref={commentRef}
              ></input>
              {isCommentEmpty ? (
                <input type="submit" value="Post"></input>
              ) : (
                <input
                  type="button"
                  style={{ color: "rgb(0, 162, 255)" }}
                  onClick={() => submitComment()}
                  value="Post"
                ></input>
              )}
            </form>
          </div>
        </aside>
      </div>
    </>
  );
}

export default PostDetails;

PostDetails.propTypes = {
  onClose: PropTypes.func.isRequired,
  selectedPost: PropTypes.object,
  profileRefresh: PropTypes.func,
};
