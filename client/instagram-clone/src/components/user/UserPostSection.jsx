import { useEffect, useState } from "react";
import PostsForm from "../post/PostsForm";
import PostsDetails from "../post/PostDetails";
import Modal from "../generic/Modal";
import "./UserPostSection.css";
import { handleFetchPosts } from "../../api/postAPI";
import PropTypes from "prop-types";

function UserPostSection({ profileRefresh, postsChanged }) {
  const [postDetailsOpen, setPostDetailsOpen] = useState(false);
  const [postFormOpen, setPostFormOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    const fetchPostsFromAPI = async () => {
      const data = await handleFetchPosts();
      console.log(
        "🚀 ~ file: UserPostSection.jsx:14 ~ fetchPostsFromAPI ~ data:",
        data
      );
      setPosts(data.posts);
    };
    fetchPostsFromAPI();
    // TODO: Change naming convention of the fetchPost methods to fetch_fromAPI
  }, [postsChanged]);

  useEffect(() => {
    console.log(posts);
  }, [posts]);

  const handlePostDetailsOpen = (e) => {
    const post = posts.find(
      (post) => post.images[0].image_url === e.target.src
    );
    setSelectedPost(post);
    setPostDetailsOpen(true);
  };

  return (
    <div className="user-post-section">
      <button className="add-post-button" onClick={() => setPostFormOpen(true)}>
        +
      </button>

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
};
