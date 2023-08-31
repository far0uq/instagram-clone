import instagram_logo from "../../assets/instagram_logo_white.png";
import home_logo from "../../assets/icons/home_icon24.png";
import search_logo from "../../assets/icons/search_icon50.png";
import hamburger_logo from "../../assets/icons/hamburger_icon50.png";

import "./MainPage.css";
import UserProfilePage from "../profile/UserProfilePage";

function MainPage() {
  return (
    <>
      <div className="main-body row">
        <aside className="col-2">
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
              <img src={hamburger_logo}></img>
              <span>More</span>
            </li>
          </ul>
        </aside>
        <div className="col-10">
          <section>
            <UserProfilePage />
          </section>
          <footer></footer>
        </div>
      </div>
    </>
  );
}

export default MainPage;
