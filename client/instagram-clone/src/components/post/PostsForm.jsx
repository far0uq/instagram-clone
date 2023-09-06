import { useState, useRef } from "react";
import "./PostsForm.css";
import { ToastContainer, toast } from "react-toastify";
import { handlePostUpload } from "../../api/postAPI";
import PropTypes from "prop-types";
import back_icon from "../../assets/icons/arrow_icon30.png";
import empty_form_icon from "../../assets/icons/emptyform_icon.png";

function PostsForm({ onClose, profileRefresh }) {
  const imageUploadRef = useRef(null);
  const [postList, setPostList] = useState(null);

  const triggerImageWindow = () => {
    imageUploadRef.current.click();
  };

  const handleInputChange = (e) => {
    const filesArray = [...e.target.files];

    let postListOld = postList ? [...postList] : null;

    const imagePromises = [];

    filesArray.forEach((file) => {
      const reader = new FileReader();
      const imageFilePromise = new Promise((resolve) => {
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          resolve(reader.result);
        };
      });
      imagePromises.push(imageFilePromise);
    });

    Promise.all(imagePromises)
      .then((values) => {
        postListOld = postList ? [...postListOld, ...values] : [...values];
        setPostList(postListOld);
      })
      .catch((error) => {
        throw new Error(error);
      });
  };
  // TODO: Fix why change in state is not causing a re-render

  const triggerPostUpload = async () => {
    const data = await handlePostUpload(postList);
    if (data.status === 201) toast.success("Post Made!");
    else toast.error("Could not make post, please try again in a bit.");
    profileRefresh();
    console.log(typeof profileRefresh);
    onClose();
  };

  const blankifyImageSelect = (event) => {
    event.target.value = "";
  };

  const removeImage = (index) => {
    const postListModified = [...postList];
    postListModified.splice(index, 1);
    setPostList(postListModified);
  };

  return (
    <>
      <div className="overlay" />
      <div className="post-form">
        <ToastContainer />
        <h1>Create new post</h1>
        <hr></hr>

        {!postList && (
          <div style={{ display: "block" }}>
            <img id="empty-form-icon" src={empty_form_icon} />
          </div>
        )}

        <section className="post-images d-flex justify-content-around">
          {postList &&
            postList.map((postImage, index) => {
              return (
                <img
                  key={index}
                  src={postImage}
                  onClick={() => removeImage(index)}
                />
              );
            })}
        </section>

        <section className="button-section d-flex justify-content-between">
          <div onClick={onClose}>
            <img src={back_icon}></img>
          </div>
          <button
            className="select-button post-button"
            onClick={triggerImageWindow}
          >
            Select from Computer
          </button>
          <button
            className="post-button submit-button"
            onClick={triggerPostUpload}
          >
            Post
          </button>
        </section>

        <input
          type="file"
          ref={imageUploadRef}
          accept=".jpg, .jpeg, .png"
          style={{ display: "none" }}
          multiple="multiple"
          onChange={handleInputChange}
          onClick={blankifyImageSelect}
        />
      </div>
    </>
  );
}

export default PostsForm;

PostsForm.propTypes = {
  onClose: PropTypes.func.isRequired,
  profileRefresh: PropTypes.func,
};
