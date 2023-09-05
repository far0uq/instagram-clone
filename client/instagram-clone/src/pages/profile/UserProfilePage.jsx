import UserProfileHeader from "../../components/user/UserProfileHeader.jsx";
import EmptyPostSection from "../../components/user/EmptyPostSection.jsx";
import UserPostSection from "../../components/user/UserPostSection.jsx";
import { useState } from "react";
import isCurrentUserAccount from "../../helpers/isCurrentUserAccount.js";
import "./UserProfilePage.css";
import PropTypes from "prop-types";

function UserProfilePage(userChanged) {
  const [postsChanged, setPostsChanged] = useState(true);
  const [postsExist, setPostsExist] = useState(false);

  const profileRefresh = () => {
    postsChanged ? setPostsChanged(false) : setPostsChanged(true);
  };

  const setPostsExistFromChildren = (postNumber) => {
    setPostsExist(postNumber > 0 ? true : false);
  };

  const isLoggedInAccount = isCurrentUserAccount();

  return (
    <>
      <UserProfileHeader
        postsChanged={postsChanged}
        setPostsExistFromChildren={setPostsExistFromChildren}
        userChanged={userChanged}
      />
      {postsExist ? (
        <UserPostSection
          postsChanged={postsChanged}
          profileRefresh={profileRefresh}
          userChanged={userChanged}
        />
      ) : isLoggedInAccount ? (
        <EmptyPostSection profileRefresh={profileRefresh} />
      ) : (
        <p className="true-blank">no posts yet.</p>
      )}
    </>
  );
}

export default UserProfilePage;

UserProfileHeader.propTypes = {
  userChanged: PropTypes.bool,
};
