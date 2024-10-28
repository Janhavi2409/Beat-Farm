import "./App.css";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import SearchBar from "./components/SearchBar";
import FilterTags from "./components/FilterTags";
import BeatList from "./components/BeatList";

function App() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <SearchBar/>
      <FilterTags/>
      <BeatList/>
    </>
  );
}

export default App;
