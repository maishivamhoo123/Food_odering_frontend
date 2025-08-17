import React, { useEffect, useState } from "react";
import "./NavBar.css";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [location, setLocation] = useState("Select Location");

  useEffect(() => {
    // Safe parse for user
    const storedUser = localStorage.getItem("user");
    if (storedUser && storedUser !== "undefined") {
      try {
        setUser(JSON.parse(storedUser));
      } catch (err) {
        console.error("Error parsing user:", err);
      }
    }

    // Safe parse for cart
    const storedCart = localStorage.getItem("cart");
    if (storedCart && storedCart !== "undefined") {
      try {
        setCartItems(JSON.parse(storedCart));
      } catch (err) {
        console.error("Error parsing cart:", err);
      }
    }
  }, []); // ✅ run only on mount

  // ✅ keep this outside useEffect
  const handleLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setLocation(`Lat: ${latitude.toFixed(2)}, Lng: ${longitude.toFixed(2)}`);
        },
        (err) => {
          console.error("Location error:", err);
          setLocation("Permission denied");
        }
      );
    } else {
      setLocation("Not supported");
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h2>Food Delivery</h2>
      </div>

      <div className="navbar-right">
        <button className="location-btn" onClick={handleLocation}>
          📍 {location}
        </button>

        <div className="cart">🛒 Cart ({cartItems.length})</div>

        <div className="profile">👤 {user?.name || "Guest"}</div>
      </div>
    </nav>
  );
};

export default Navbar;
