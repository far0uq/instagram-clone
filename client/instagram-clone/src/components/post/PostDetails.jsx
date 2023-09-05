import "./PostDetails.css";
import PropTypes from "prop-types";
import emptyheart_icon from "../../assets/icons/emptyheart_icon50.png";
import fullheart_icon from "../../assets/icons/fullheart_icon50.png";
import cross_icon from "../../assets/icons/cross_icon60.png";
import { useState, useRef } from "react";

function PostDetails({ onClose, selectedPost }) {
  const [liked, setLiked] = useState(false);
  const imgRef = useRef(null);

  const makeLike = () => {
    liked ? setLiked(false) : setLiked(true);
    liked
      ? (imgRef.current.src = emptyheart_icon)
      : (imgRef.current.src = fullheart_icon);
    console.log(imgRef.current);
  };

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
            <img onClick={makeLike} ref={imgRef} src={emptyheart_icon}></img>
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
