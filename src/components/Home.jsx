import React from 'react'
import HeroSection from './HeroSection'
import BeatList from './BeatList'

const Home = ({ cart, setCart, isLoggedIn }) => {
    return (
      <div>
        <HeroSection />
        <BeatList cart={cart} setCart={setCart} isLoggedIn={isLoggedIn} />
      </div>
    );
  };

export default Home
