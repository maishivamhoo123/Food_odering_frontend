// src/components/Footer.jsx
import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Logo */}
        <div className="footer-logo">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/1/13/Swiggy_logo.png" // Swiggy logo
            alt="App Logo"
          />
          {/* Or use Zomato logo:
          https://upload.wikimedia.org/wikipedia/commons/7/75/Zomato_logo.png
          */}
        </div>

        {/* Info */}
        <div className="footer-info">
          <p>
            Your favorite food delivery platform. Order from top restaurants and
            get your food delivered hot & fresh 🍴
          </p>
          <p>© {new Date().getFullYear()} Food Delivery App. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
