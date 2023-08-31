import UserProfileHeader from "../../components/user/UserProfileHeader.jsx";
// import EmptyPostSection from "../../components/user/EmptyPostSection.jsx";
import UserPostSection from "../../components/user/UserPostSection.jsx";
// import { useState } from "react";

function UserProfilePage() {
  // const [postsExist, setPostsExist] = useState(false);

  // const setPostsExistFromChildren = (postNumber) => {
  //   setPostsExist(postNumber > 0 ? true : false);
  // };
  return (
    <>
      <UserProfileHeader />
      <UserPostSection />
      {/* {postsExist ? (
        <UserPostSection />
      ) : (
        <EmptyPostSection
          setPostsExistFromChildren={setPostsExistFromChildren}
        />
      )} */}
    </>
  );
}

export default UserProfilePage;
