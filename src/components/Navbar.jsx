import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom"; // Import Link
import "./Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faTimes,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
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
      navigate("/beatfarm/cart");
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
      navigate("/beatfarm");
    }
  }, [isLoggedIn, location.pathname, navigate]);

  return (
    <div className="navbar">
      <div className="logo">
        <div>Beat Farm</div>
      </div>
      <div className="hamburger" onClick={toggleMenu}>
        <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
      </div>
      <div className={`links ${isMenuOpen ? "active" : ""}`}>
        <Link to="/beatfarm/">Home</Link>
        <Link to="/beatfarm/allbeats">All Beats</Link>
        <Link to="/beatfarm/freebeats">Free Beats</Link>
        <Link to="/beatfarm/premiumbeats">Premium Beats</Link>
        <Link to="/beatfarm/licenceinfo">Licence Info</Link>
        <Link to="/beatfarm/faq">FAQ</Link>
        <Link to="/beatfarm/contact">Contact</Link>
        {isLoggedIn ? (
          <>
            <button
              className="cta-button"
              onClick={handleLoginClick}
              style={{ marginRight: "10px" }}
            >
              <FontAwesomeIcon icon={faShoppingCart} />
            </button>
            <button className="cta-button" onClick={handleLogoutClick}>
              Logout
            </button>
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
