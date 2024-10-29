// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./Navbar.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faBars, faTimes, faShoppingCart } from "@fortawesome/free-solid-svg-icons";

// const Navbar = ({ cart, setCart, isLoggedIn, setIsLoggedIn }) => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const navigate = useNavigate();

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

// const handleLoginClick = () => {
//   if (isLoggedIn) {
//     navigate("/cart");
//   } else {
//     // alert("Please log in to view your cart.");
//     setIsLoggedIn(true);
//   }
// };


//   return (
//     <div className="navbar">
//       <div className="logo">
//         <p>Beat Farm</p>
//       </div>
//       <div className="hamburger" onClick={toggleMenu}>
//         <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
//       </div>
//       <div className={`links ${isMenuOpen ? "active" : ""}`}>
//         <a href="/">All Beats</a>
//         <a href="/">Free Beats</a>
//         <a href="/">Premium Beats</a>
//         <a href="/">Licence Info</a>
//         <a href="/">FAQ</a>
//         <a href="/">Contact</a>
//         <button className="cta-button" onClick={handleLoginClick}>
//           {isLoggedIn ? <FontAwesomeIcon icon={faShoppingCart} /> : "Sign Up / Log In"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Navbar;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import Login from "./Login"; // Import the Login component

const Navbar = ({ cart, setCart, isLoggedIn, setIsLoggedIn }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false); // State for showing the login dialog
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLoginClick = () => {
    if (isLoggedIn) {
      navigate("/cart");
    } else {
      setShowLogin(true); // Show login dialog if not logged in
    }
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setShowLogin(false); // Close the login dialog after successful login
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
      {showLogin && <Login onSuccess={handleLoginSuccess} />} {/* Render Login component conditionally */}
    </div>
  );
};

export default Navbar;
