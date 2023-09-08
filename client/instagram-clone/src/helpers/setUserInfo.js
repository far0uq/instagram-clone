import { fetchProfileInfo, fetchProfilePicture } from "../api/userAPI";
import { toast } from "react-toastify";

export const setUserInfo = async (
  setProfilePicture,
  setUsername,
  setFullname,
  setFollowersCount,
  setFollowingCount,
  setPostCount
) => {
  let image_data = await fetchProfilePicture();
  if (image_data.status === 200) {
    setProfilePicture(image_data.display_picture);
  } else {
    toast.error(image_data.message);
  }

  let data = await fetchProfileInfo();
  if (data.status === 200) {
    setUsername(data.username);
    setFullname(data.fullname);
    setFollowersCount(data.followers);
    setFollowingCount(data.following);
    setPostCount(data.postCount);
  } else {
    toast.error(data.message);
  }
};
