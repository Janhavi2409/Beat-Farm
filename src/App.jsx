import React, { useState, useRef } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Cart from "./components/Cart";
import BeatList from "./components/BeatList"; 
import Navbar from "./components/Navbar";
import "./App.css";
import PricingCard from "./components/PricingCard";
import LicenseInfo from "./components/LicenseInfo";
import FAQ from "./components/FAQ";
import ContactForm from "./components/ContactForm";

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
        <Route path="/beatfarm/" element={<Home cart={cart} setCart={setCart} isLoggedIn={isLoggedIn} />} />
        <Route path="/beatfarm/cart" element={<Cart cart={cart} setCart={setCart} playingIndex={playingIndex} toggleAudio={toggleAudio} />} />
        <Route path="/beatfarm/allbeats" element={<BeatList cart={cart} setCart={setCart} isLoggedIn={isLoggedIn} />} />
        <Route path="/beatfarm/freebeats" element={<BeatList cart={cart} setCart={setCart} isLoggedIn={isLoggedIn} />} /> 
        <Route path="/beatfarm/premiumbeats" element={<PricingCard />} /> 
        <Route path="/beatfarm/licenceinfo" element={<LicenseInfo />} /> 
        <Route path="/beatfarm/faq" element={<FAQ />} /> 
        <Route path="/beatfarm/contact" element={<ContactForm />} /> 
      </Routes>
    </Router>
  );
};

export default App;
