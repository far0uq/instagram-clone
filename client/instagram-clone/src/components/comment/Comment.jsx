import emptyheart_icon from "../../assets/icons/emptyheart_icon50.png";
import fullheart_icon from "../../assets/icons/fullheart_icon50.png";
import PropTypes from "prop-types";
import "./Comment.css";
import { useState, useEffect } from "react";
import { handleToggleCommentLike } from "../../api/commentAPI";
import { fetchUserId } from "../../api/userAPI";

function Comment({
  commentId,
  createdByUsername,
  createdAt,
  commentContent,
  likedBy,
}) {
  const [commentAge, setCommentAge] = useState("");
  const [liked, setLiked] = useState("");
  const [commentLikedCount, setCommentLikedCount] = useState(likedBy.length);

  const makeLike = () => {
    liked ? setLiked(false) : setLiked(true);
  };

  const fetchCommentsLikes = async () => {
    const data = await handleFetchCommentLikes(commentId);
    setLikedCount(data.count);
  };

  useEffect(() => {
    const refreshLikeCount = async () => {
      const data = await fetchUserId();
      likedBy.includes(data.userId) ? setLiked(true) : setLiked(false);
    };
    refreshLikeCount();
  }, []);

  useEffect(() => {
    const toggleCommentLike = async () => {
      const data = await handleToggleCommentLike(commentId, liked);
      setCommentLikedCount(data.count);
    };
    toggleCommentLike();
    fetchCommentsLikes();
  }, [liked]);

  useEffect(() => {
    calculateAge(createdAt);
  }, []);

  const calculateAge = (time) => {
    const commentTime = new Date(time);
    const currentTime = new Date();
    const difference = Math.floor((currentTime - commentTime) / 60000);
    console.log(
      "🚀 ~ file: Comment.jsx:16 ~ calculateAge ~ difference:",
      difference
    );
    if (difference >= 1) {
      setCommentAge(`${difference} min ago`);
    } else {
      setCommentAge("just now");
    }
  };
  return (
    <div className="comment">
      <div className="d-flex container">
        <h6 className="col-2">{createdByUsername}</h6>
        <p className="col-9 comment-content">{commentContent}</p>
        <div>
          {liked ? (
            <img
              onClick={makeLike}
              src={fullheart_icon}
              className="col-1"
            ></img>
          ) : (
            <img
              onClick={makeLike}
              src={emptyheart_icon}
              className="col-1"
            ></img>
          )}
        </div>
      </div>
      <div className="d-flex container">
        <p className="col-3 comment-age">{commentAge}</p>
        <p className="col-3 comment-likes">{commentLikedCount} likes</p>
      </div>
    </div>
  );
}

export default Comment;

Comment.propTypes = {
  createdByUsername: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  commentContent: PropTypes.string.isRequired,
  likedBy: PropTypes.any,
  commentId: PropTypes.string,
};
