import { useState, useRef, useEffect } from "react";
import "./PostsForm.css";
import { ToastContainer, toast } from "react-toastify";
import { handlePostUpload } from "../../api/postAPI";

function PostsForm() {
  const imageUploadRef = useRef(null);
  const [postList, setPostList] = useState([]);
  const [postsChanged, setPostChanged] = useState(false);

  const triggerImageWindow = () => {
    imageUploadRef.current.click();
  };

  const handleInputChange = (e) => {
    if (e.target.files.length + postList.length > 10) {
      toast.error("Can only add 10 images to a post.");
    } else {
      const filesArray = [...e.target.files];

      let postListOld = [...postList];

      filesArray.forEach((file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          postListOld.push(reader.result);
        };
      });
      setPostList(postListOld);
    }
  };

  const triggerPostUpload = () => {
    handlePostUpload(postList);
  };

  useEffect(() => {
    postsChanged ? setPostChanged(false) : setPostChanged(true);
    console.log(
      "🚀 ~ file: PostsForm.jsx:35 ~ useEffect ~ postsChanged:",
      postsChanged
    );
  }, [postList]);

  const blankifyImageSelect = (event) => {
    event.target.value = "";
  };

  return (
    <div className="post-form">
      <ToastContainer />
      <h1>Create new post</h1>
      <hr></hr>

      <section>
        {console.log("UPDATED VALUE")};
        {console.log(
          "🚀 ~ file: PostsForm.jsx:58 ~ {postList.map ~ postList:",
          postList
        )}
        {postList.map((postImage, index) => {
          return <img key={index} src={postImage} />;
        })}
      </section>

      <button onClick={triggerImageWindow}>Select from Computer</button>
      <button onClick={triggerPostUpload}>Post</button>

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
  );
}

export default PostsForm;
