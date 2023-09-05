import { useEffect, useState } from "react";
import PostsForm from "../post/PostsForm";
import PostsDetails from "../post/PostDetails";
import Modal from "../generic/Modal";
import "./UserPostSection.css";
import { handleFetchPosts } from "../../api/postAPI";
import PropTypes from "prop-types";
import isCurrentUserAccount from "../../helpers/isCurrentUserAccount";

function UserPostSection({ profileRefresh, postsChanged, userChanged }) {
  const [postDetailsOpen, setPostDetailsOpen] = useState(false);
  const [postFormOpen, setPostFormOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    const fetchPostsFromAPI = async () => {
      const data = await handleFetchPosts();
      setPosts(data.posts);
    };
    fetchPostsFromAPI();
    // TODO: Change naming convention of the fetchPost methods to fetch_fromAPI
  }, [postsChanged, userChanged]);

  const handlePostDetailsOpen = (e) => {
    const post = posts.find(
      (post) => post.images[0].image_url === e.target.src
    );
    setSelectedPost(post);
    setPostDetailsOpen(true);
  };

  const isLoggedInAccount = isCurrentUserAccount();
  return (
    <div className="user-post-section">
      {isLoggedInAccount ? (
        <button
          className="add-post-button"
          onClick={() => setPostFormOpen(true)}
        >
          +
        </button>
      ) : (
        <div style={{ marginTop: "50px" }}></div>
      )}

      <section className="images-section">
        {posts.map((post) => {
          return (
            <img
              onClick={handlePostDetailsOpen}
              className="post-image"
              key={post._id}
              src={post.images[0].image_url}
            />
          );
        })}
      </section>

      <Modal open={postDetailsOpen}>
        <PostsDetails
          onClose={() => setPostDetailsOpen(false)}
          selectedPost={selectedPost}
        />
      </Modal>

      <Modal open={postFormOpen}>
        <PostsForm
          onClose={() => setPostFormOpen(false)}
          profileRefresh={profileRefresh}
        />
      </Modal>
    </div>
  );
}

export default UserPostSection;

UserPostSection.propTypes = {
  profileRefresh: PropTypes.func.isRequired,
  postsChanged: PropTypes.bool,
  userChanged: PropTypes.bool,
};
