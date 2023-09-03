import "./UserProfileHeader.css";
import { useRef, useState, useEffect } from "react";
import default_user from "../../assets/icons/default_user.jpg";
import {
  handleProfileImageUpload,
  fetchProfileInfo,
  fetchProfilePicture,
} from "../../api/userAPI";
import { ToastContainer, toast } from "react-toastify";
import PropTypes from "prop-types";

function UserProfileHeader(postsChanged) {
  const imageUploadRef = useRef(null);
  const [followers, setFollowers] = useState("");
  const [following, setFollowing] = useState("");
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [postCount, setPostCount] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);

  useEffect(() => {}, [postsChanged]);

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
      setProfilePicture(reader.result);
    };
  };

  useEffect(() => {
    if (profilePicture) {
      handleProfileImageUpload(profilePicture);
    }
  }, [profilePicture]);

  useEffect(() => {
    const setUserInfo = async () => {
      const image_data = await fetchProfilePicture();
      if (image_data.status === 200) {
        setProfilePicture(image_data.display_picture);
      } else {
        toast.error(data.message);
      }

      const data = await fetchProfileInfo();
      if (data.status === 200) {
        setUsername(data.username);
        setFullname(data.fullname);
        setFollowers(data.followers);
        setFollowing(data.following);
        setPostCount(data.postCount);
      } else {
        toast.error(data.message);
      }
    };
    setUserInfo();
  }, [postsChanged]);

  return (
    <div className="profile d-flex">
      <ToastContainer />
      <aside>
        {profilePicture ? (
          <img
            src={profilePicture}
            onClick={triggerImageUpload}
            onError={() => {
              setProfilePicture(null);
            }}
          />
        ) : (
          <img src={default_user} onClick={triggerImageUpload} />
        )}
      </aside>
      <section className="profile-stats">
        <ul>
          <li>
            <p>{username}</p>
          </li>
          <li className="d-flex justify-content-between">
            <p>
              <b>{postCount}</b> posts
            </p>
            <p>
              <b>{followers}</b> followers
            </p>
            <p>
              <b>{following}</b> following
            </p>
          </li>
          <li>
            <p>{fullname}</p>
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

export default UserProfileHeader;

UserProfileHeader.propTypes = {
  postsChanged: PropTypes.bool,
};
