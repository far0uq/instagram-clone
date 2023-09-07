import emptyheart_icon from "../../assets/icons/emptyheart_icon50.png";
import PropTypes from "prop-types";
import "./Comment.css";
import { useState, useEffect } from "react";

function Comment({ createdByUsername, createdAt, commentContent, likedBy }) {
  const [commentAge, setCommentAge] = useState("");
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
          <img src={emptyheart_icon} className="col-1" />
        </div>
      </div>
      <div className="d-flex container">
        <p className="col-3 comment-age">
          {commentAge}
        </p>
        <p className="col-3 comment-likes">{likedBy.length} likes</p>
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
};
