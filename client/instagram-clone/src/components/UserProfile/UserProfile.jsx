import "./UserProfile.css";
import { useRef, useState, useEffect } from "react";
import default_user from "../../assets/icons/default_user.jpg";
import { handleImageUpload } from "../../api/userAPI";

function UserProfile() {
  const imageUploadRef = useRef(null);
  const [currentImage, setCurrentImage] = useState("");

  const triggerImageUpload = () => {
    imageUploadRef.current.click();
  };

  const blankifyImageSelect = (event) => {
    event.target.value = "";
  };

  const handleImageSwitch = (event) => {
    const profilePic = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(profilePic);
    reader.onloadend = () => {
      setCurrentImage(reader.result);
    };
  };

  useEffect(() => {
    if (currentImage) {
      handleImageUpload(currentImage);
    }
  }, [currentImage]);

  return (
    <div className="profile d-flex">
      <aside>
        <img src={default_user} onClick={triggerImageUpload} />
      </aside>
      <section className="profile-stats">
        <ul>
          <li>
            <p>[Username]</p>
          </li>
          <li className="d-flex justify-content-between">
            <p>
              <b>0</b> posts
            </p>
            <p>
              <b>0</b> followers
            </p>
            <p>
              <b>0</b> following
            </p>
          </li>
          <li>
            <p>[Fullname]</p>
          </li>
        </ul>
      </section>

      <input
        type="file"
        ref={imageUploadRef}
        accept=".jpg, .jpeg, .png"
        style={{ display: "none" }}
        onChange={handleImageSwitch}
        onClick={blankifyImageSelect}
      />
    </div>
  );
}

export default UserProfile;
