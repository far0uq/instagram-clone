import instagram_logo from "../../assets/instagram_logo_white.png";
import home_logo from "../../assets/icons/home_icon24.png";
import search_logo from "../../assets/icons/search_icon50.png";
import { useNavigate } from "react-router-dom";

import "./MainPage.css";
import UserProfilePage from "../profile/UserProfilePage";
import SearchMenu from "../../components/search/SearchMenu";
import { useState } from "react";

function MainPage() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [userChanged, setUserChanged] = useState(true);
  const navigate = useNavigate();

  const logoutUser = () => {
    localStorage.setItem("token", "");
    navigate("/accounts/login");
  };

  const searchToggle = () => {
    searchOpen ? setSearchOpen(false) : setSearchOpen(true);
  };

  const refreshUser = () => {
    userChanged ? setUserChanged(false) : setUserChanged(true);
  };

  const switchProfile = () => {
    refreshUser();
  };

  const onLoggedUserProfile = () => {
    const token = localStorage.getItem("token");
    localStorage.setItem("onProfile", token);
    refreshUser();
  };

  return (
    <>
      <div className="main-body row d-flex">
        <aside className="col-2">
          {/* Col not being considered here in due to position:fixed */}
          <img className="logo" src={instagram_logo}></img>
          <ul>
            <li className="aside-element">
              <img src={home_logo}></img>
              <span>Home</span>
            </li>
            <li className="aside-element" onClick={searchToggle}>
              <img src={search_logo}></img>
              <span>Search</span>
            </li>
            <li className="aside-element" onClick={onLoggedUserProfile}>
              <span>Profile</span>
            </li>
            <li className="aside-element">
              <span onClick={logoutUser}>Logout</span>
            </li>
          </ul>
        </aside>
        {searchOpen ? (
          <div className="col-2 nav-placeholder"></div>
        ) : (
          <div className="col-3 nav-placeholder"></div>
        )}
        {searchOpen && (
          <div className="search-menu col-2">
            <SearchMenu switchProfile={switchProfile} />
          </div>
        )}
        <div className="col-8">
          <section className="main-content">
            <UserProfilePage userChanged={userChanged} />
          </section>
          <footer></footer>
        </div>
      </div>
    </>
  );
}

export default MainPage;
