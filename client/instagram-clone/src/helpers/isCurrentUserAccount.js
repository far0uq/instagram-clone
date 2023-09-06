export default function isCurrentUserAccount() {
  const token = localStorage.getItem("token");
  const searchedUserToken = localStorage.getItem("onProfile");

  if (token === searchedUserToken) return true;
  return false;
}
