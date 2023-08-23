import "./UserProfile.css";
import { useRef } from "react";
import default_user from "../assets/icons/default_user.jpg";

function UserProfile() {
  const imageUploadRef = useRef(null);

  const triggerImageUpload = () => {
    console.log(imageUploadRef);
    imageUploadRef.current.click();
  };

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
      />
    </div>
  );
}

export default UserProfile;
