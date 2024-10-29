import React from 'react'
import HeroSection from './HeroSection'
import SearchBar from './SearchBar'
import FilterTags from './FilterTags'
import BeatList from './BeatList'

const Home = ({ cart, setCart, isLoggedIn }) => {
    return (
      <div>
        <HeroSection />
        <SearchBar />
        <FilterTags />
        <BeatList cart={cart} setCart={setCart} isLoggedIn={isLoggedIn} />
      </div>
    );
  };

export default Home
