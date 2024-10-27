import "./App.css";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import SearchBar from "./components/SearchBar";
import FilterTags from "./components/FilterTags";

function App() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <SearchBar/>
      <FilterTags/>
    </>
  );
}

export default App;
