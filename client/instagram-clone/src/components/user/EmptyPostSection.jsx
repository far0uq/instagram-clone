import { useState } from "react";

import "./EmptyPostSection.css";
import camera_logo from "../../assets/icons/camera_icon50.png";
import PostsForm from "../post/PostsForm";
import Modal from "../generic/Modal";

function EmptyPostSection() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="empty-post-section">
      <div className="empty-ps-image-div">
        <img src={camera_logo} />
      </div>
      <h1 className="mt-3">Share Photos</h1>
      <h3 className="mt-3">
        When you share photos, they will appear on your profile.
      </h3>
      <button className="mt-3" onClick={() => setIsOpen(true)}>
        Share your first photo.
      </button>

      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        <PostsForm />
      </Modal>
    </div>
  );
}

export default EmptyPostSection;
