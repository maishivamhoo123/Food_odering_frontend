import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Restaurants.css";
import Navbar from "../NavBar/Navbar";
import Footer from "./Footer/Footer";
import FoodModal from "../BelowHero/FoodModal";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const RestaurantFoods = () => {
  const { id } = useParams(); // restaurantId from URL
  const [foods, setFoods] = useState([]);
  const [selectedFood, setSelectedFood] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const res = await fetch(`${BASE_URL}/food/getAllFood`); // ✅ env based
        const data = await res.json();

        // Filter foods by restaurantId
        const filtered = data.foods.filter(
          (food) => food.restaurantId?.toString() === id
        );
        setFoods(filtered);
      } catch (err) {
        console.error("Error fetching foods:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFoods();
  }, [id]);

  return (
    <div className="restaurant-foods">
      <Navbar />

      <h2>🍴 Foods from this Restaurant</h2>

      <div className="food-list">
        {loading ? (
          <p>Loading...</p>
        ) : foods.length > 0 ? (
          foods.map((food, index) => (
            <div
              key={index}
              className="food-card"
              onClick={() => setSelectedFood(food)}
            >
              <img
                src={
                  food.image && food.image !== "false"
                    ? food.image
                    : "https://source.unsplash.com/200x200/?food"
                }
                alt={food.name || "Food"}
                className="food-image"
              />
              <p className="food-name">{food.name || "Food"}</p>
              <p className="food-price">₹{food.price || 0}</p>
            </div>
          ))
        ) : (
          <p>No foods found for this restaurant.</p>
        )}
      </div>

      {/* Modal renders only if a food is selected */}
      {selectedFood && (
        <FoodModal food={selectedFood} onClose={() => setSelectedFood(null)} />
      )}

      <Footer />
    </div>
  );
};

export default RestaurantFoods;
