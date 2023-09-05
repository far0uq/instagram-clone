import { useState, useRef } from "react";
import "./SearchMenu.css";
import {
  handleSearchUsers,
  handleSetSearchedUserToken,
} from "../../api/userAPI";
import PropTypes from "prop-types";

function SearchMenu({ switchProfile }) {
  const [searchResults, setSearchResults] = useState([]);
  const searchRef = useRef();

  const searchUsers = async () => {
    if (searchRef.current.value === "") {
      setSearchResults([]);
    } else {
      const data = await handleSearchUsers(searchRef.current.value);
      setSearchResults(data.result);
    }
  };

  const openProfilePage = async (user) => {
    const data = await handleSetSearchedUserToken(user.email, user.password);
    localStorage.setItem("onProfile", data.searchedUserToken);
    switchProfile();
  };

  return (
    <div>
      <h3>Search</h3>
      <input
        ref={searchRef}
        type="text"
        placeholder="Search"
        onChange={searchUsers}
      />

      <section>
        {searchResults.map((user) => {
          return (
            <div
              className="user-result"
              key={user._id}
              onClick={() => openProfilePage(user)}
            >
              <h3>{user.username}</h3>
              <h4>{user.fullname}</h4>
            </div>
          );
        })}
        ;
      </section>
    </div>
  );
}

export default SearchMenu;

SearchMenu.propTypes = {
  switchProfile: PropTypes.func.isRequired,
};
