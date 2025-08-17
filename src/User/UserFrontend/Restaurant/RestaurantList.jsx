import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Restaurants.css";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const res = await fetch(`${BASE_URL}/owner/getAllOwner`); // ✅ env based
        const data = await res.json();
        console.log("API Response:", data);

        // ✅ API returns { Owners: [...] }
        setRestaurants(data.Owners || []);
      } catch (err) {
        console.error("Error fetching restaurants:", err);
      }
    };
    fetchRestaurants();
  }, []);

  return (
    <div className="restaurant-section">
      <h2>🏬 Restaurants</h2>
      <div className="restaurant-list">
        {restaurants.slice(0, 3).map((res, index) => (
          <div
            key={index}
            className="restaurant-card"
            onClick={() => navigate(`/restaurant/${res.restaurantId}`)}
          >
            <img
              src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D"
              alt={res.Restraurant_name}
              className="restaurant-image"
            />
            <p className="restaurant-name">{res.Restraurant_name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantList;
