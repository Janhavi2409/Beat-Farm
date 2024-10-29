import React, { useState } from "react";
import "./SearchBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    if (!searchTerm) return;
    const elements = document.querySelectorAll("body *");
    for (const element of elements) {
      if (element.textContent.toLowerCase().includes(searchTerm.toLowerCase())) {
        
        element.scrollIntoView({ behavior: "smooth", block: "center" });
        break;
      }
    }
  };

  return (
    <div className="search-bar-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="search-button" onClick={handleSearch}>
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
