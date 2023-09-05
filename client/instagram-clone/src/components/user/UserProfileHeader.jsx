import "./UserProfileHeader.css";
import { useRef, useState, useEffect } from "react";
import default_user from "../../assets/icons/default_user.jpg";
import { handleProfileImageUpload } from "../../api/userAPI";
import { ToastContainer } from "react-toastify";
import PropTypes from "prop-types";
import isCurrentUserAccount from "../../helpers/isCurrentUserAccount";
import { setUserInfo } from "../../helpers/setUserInfo";

function UserProfileHeader({
  postsChanged,
  setPostsExistFromChildren,
  userChanged,
}) {
  const imageUploadRef = useRef(null);
  const [followers, setFollowers] = useState("");
  const [following, setFollowing] = useState("");
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [postCount, setPostCount] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [intialRender, setInitialRender] = useState(true);

  useEffect(() => {}, [postsChanged]);

  const triggerImageUpload = () => {
    imageUploadRef.current.click();
  };

  const blankifyImageSelect = (event) => {
    event.target.value = "";
  };

  const handleImageSwitch = (event) => {
    intialRender && setInitialRender(false);
    const profilePic = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(profilePic);
    reader.onloadend = () => {
      setProfilePicture(reader.result);
    };
  };

  useEffect(() => {
    if (profilePicture && !intialRender) {
      handleProfileImageUpload(profilePicture);
    }
  }, [profilePicture]);

  useEffect(() => {
    setUserInfo(
      setProfilePicture,
      setUsername,
      setFullname,
      setFollowers,
      setFollowing,
      setPostCount
    );
  }, [postsChanged, userChanged]);

  useEffect(() => {
    setPostsExistFromChildren(postCount);
  }, [postCount]);

  const isLoggedInAccount = isCurrentUserAccount();

  return (
    <>
      <div className="profile d-flex">
        <ToastContainer />
        <aside>
          {profilePicture ? (
            isLoggedInAccount ? ( //TT
              <img
                src={profilePicture}
                onClick={triggerImageUpload}
                onError={() => {
                  setProfilePicture(null);
                }}
                alt="filled_display_picture"
              />
            ) : (
              //TF
              <img
                src={profilePicture}
                onError={() => {
                  setProfilePicture(null);
                }}
                alt="filled_display_picture"
              />
            )
          ) : isLoggedInAccount ? ( //FT
            <img
              src={default_user}
              onClick={triggerImageUpload}
              alt="default_display_picture"
            />
          ) : (
            //FF
            <img src={default_user} alt="default_display_picture" />
          )}
        </aside>
        <section className="profile-stats">
          <ul>
            <li className="d-flex">
              <p>{username}</p>
              {!isLoggedInAccount ? (
                <div className="follow-section">
                  <button className="follow-btn">Follow</button>
                </div>
              ) : (
                <div className="follow-section"></div>
              )}
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
    </>
  );
}

export default UserProfileHeader;

UserProfileHeader.propTypes = {
  postsChanged: PropTypes.bool,
  setPostsExistFromChildren: PropTypes.func,
  userChanged: PropTypes.bool,
};
