import React from "react";
import "./SearchBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const SearchBar = () => {
  return (
    <div className="search-bar-container">
      <div className="search-bar">
        <input type="text" placeholder="Search..." className="search-input" />
        <button className="search-button">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </div>
      <a href="#guide" className="search-guide">
        Quick guide to search
      </a>
    </div>
  );
};

export default SearchBar;
