import React, { useState } from "react";
import "./Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes, faShoppingCart } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLoginClick = () => {
    setIsLoggedIn(true); 
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
        <button className="cta-button" onClick={handleLoginClick}>
          {isLoggedIn ? <FontAwesomeIcon icon={faShoppingCart} /> : "Sign Up / Log In"}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
