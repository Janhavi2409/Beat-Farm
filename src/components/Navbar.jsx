import React, { useState } from "react";
import "./Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="navbar">
      <div className="logo">
        <p>Beat Farm</p>
      </div>
      <div className="hamburger" onClick={toggleMenu}>
        <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
      </div>
      <div className={`links ${isMenuOpen ? "active" : ""}`}>
        <a href="/">All Beats</a>
        <a href="/">Free Beats</a>
        <a href="/">Premium Beats</a>
        <a href="/">Licence Info</a>
        <a href="/">FAQ</a>
        <a href="/">Contact</a>
        <button className="cta-button">Sign Up / Log In</button>
      </div>
    </div>
  );
};

export default Navbar;
