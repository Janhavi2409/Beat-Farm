import React, { useState, useRef } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Cart from "./components/Cart";
import Navbar from "./components/Navbar";
import "./App.css";

const App = () => {
  const [cart, setCart] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const audioRef = useRef(new Audio());
  const [playingIndex, setPlayingIndex] = useState(null);

  const toggleAudio = (index, track) => {
    if (playingIndex === index) {
      audioRef.current.pause();
      setPlayingIndex(null);
    } else {
      audioRef.current.src = track;
      audioRef.current.play();
      setPlayingIndex(index);

      audioRef.current.onended = () => {
        setPlayingIndex(null);
      };
    }
  };

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route
          path="/"
          element={
            <Home cart={cart} setCart={setCart} isLoggedIn={isLoggedIn} />
          }
        />
        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              setCart={setCart}
              playingIndex={playingIndex}
              toggleAudio={toggleAudio}
            />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
