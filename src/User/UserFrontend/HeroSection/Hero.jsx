import React from "react";
import "./Hero.css";

const HeroSection = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Hungry?</h1>
        <p>Order food from your favourite restaurants near you.</p>

        <div className="search-box">
          <input type="text" placeholder="Search for restaurants or dishes..." />
          <button>Search</button>
        </div>
      </div>

      <div className="hero-image">
        <img
          src="https://b.zmtcdn.com/web_assets/81f3ff974d82520780078ba1cfbd453a1583259680.png"
          alt="Food delivery"
        />
      </div>
    </section>
  );
};

export default HeroSection;
