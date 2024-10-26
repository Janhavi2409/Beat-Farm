import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./HeroSection.css";
import image1 from "../assets/midnightlofi.jpg";
import image2 from "../assets/afrobeats.jpg";
import image3 from "../assets/spooky.jpg";

const HeroSection = () => {
  return (
    <div className="hero-section">
      <div className="headline">
        <p>FRESH Packs Hot Off The Ranch</p>
      </div>
      <Carousel
        showThumbs={false}
        autoPlay
        infiniteLoop
        showStatus={false}
        interval={4000}
        stopOnHover
      >
        <div className="carousel-slide">
          <img src={image1} alt="Beat Pack 1" />
          <div className="overlay">
            <p>Midnight Vibes</p>
          </div>
        </div>
        <div className="carousel-slide">
          <img src={image2} alt="Beat Pack 2" />
          <div className="overlay">
            <p>Afro Beats</p>
          </div>
        </div>
        <div className="carousel-slide">
          <img src={image3} alt="Beat Pack 3" />
          <div className="overlay">
            <p>Spooky Sounds</p>
          </div>
        </div>
      </Carousel>
      <button className="cta-button">Check Out All Packs</button>
    </div>
  );
};

export default HeroSection;
