import instagram_logo from "../../assets/instagram_logo_white.png";
import home_logo from "../../assets/icons/home_icon24.png";
import search_logo from "../../assets/icons/search_icon50.png";
import { navigate } from "react-router-dom";

import "./MainPage.css";
import UserProfilePage from "../profile/UserProfilePage";

function MainPage() {
  const logoutUser = () => {
    localStorage.setItem("token", "");
    navigate("/accounts/login");
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
            <li className="aside-element">
              <img src={search_logo}></img>
              <span>Search</span>
            </li>
            <li className="aside-element">
              <span>Profile</span>
            </li>
            <li className="aside-element">
              <span onClick={logoutUser}>Logout</span>
            </li>
          </ul>
        </aside>
        <div className="col-2 nav-placeholder"></div>
        <div className="col-10">
          <section className="main-content">
            <UserProfilePage />
          </section>
          <footer></footer>
        </div>
      </div>
    </>
  );
}

export default MainPage;
