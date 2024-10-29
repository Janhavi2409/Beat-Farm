import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import Login from "./Login";

const Navbar = ({ cart, setCart, isLoggedIn, setIsLoggedIn }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLoginClick = () => {
    if (isLoggedIn) {
      navigate("/cart");
    } else {
      setShowLogin(true);
    }
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setShowLogin(false);
  };

  const handleLogoutClick = () => {
    setIsLoggedIn(false);
    setCart([]);
  };

  useEffect(() => {
    if (!isLoggedIn && location.pathname === "/cart") {
      navigate("/");
    }
  }, [isLoggedIn, location.pathname, navigate]);

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
        {isLoggedIn ? (
          <>
            <button className="cta-button" onClick={handleLoginClick} style={{ marginRight: "10px" }}>
              <FontAwesomeIcon icon={faShoppingCart} />
            </button>
            <button className="cta-button" onClick={handleLogoutClick}>Logout</button>
          </>
        ) : (
          <button className="cta-button" onClick={handleLoginClick}>
            Sign Up / Log In
          </button>
        )}
      </div>
      {showLogin && <Login onSuccess={handleLoginSuccess} />}
    </div>
  );
};

export default Navbar;
