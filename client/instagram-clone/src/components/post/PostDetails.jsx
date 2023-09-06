import "./PostDetails.css";
import PropTypes from "prop-types";
import emptyheart_icon from "../../assets/icons/emptyheart_icon50.png";
import fullheart_icon from "../../assets/icons/fullheart_icon50.png";
import cross_icon from "../../assets/icons/cross_icon60.png";
import { useEffect, useState } from "react";
import { handleToggleLike } from "../../api/postAPI";
import { fetchUserId } from "../../api/userAPI";

function PostDetails({ onClose, selectedPost }) {
  const [liked, setLiked] = useState(false);
  const [likedCount, setLikedCount] = useState(selectedPost.liked_by.length);

  const makeLike = () => {
    liked ? setLiked(false) : setLiked(true);
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

  return (
    <>
      <div className="overlay"></div>
      <div className="close-btn" onClick={onClose}>
        <img src={cross_icon} />
      </div>
      <div className="post-details d-flex container">
        <section className="image-section col-8 d-flex align-items-center justify-content-center">
          <img src={selectedPost.images[0].image_url}></img>
        </section>
        <aside className="col-4">
          <div className="comment-section d-flex justify-content-center flex-column">
            <h1>No comments yet.</h1>
            <h2>Start the conversation</h2>
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
              ></input>
              <input type="submit" value="Post"></input>
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
};
