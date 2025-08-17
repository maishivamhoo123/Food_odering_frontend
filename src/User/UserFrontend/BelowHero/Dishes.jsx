import React, { useEffect, useState } from "react";
import "./Dishes.css";
import FoodModal from "./FoodModal";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const FoodList = () => {
  const [foods, setFoods] = useState([]);
  const [visibleCount, setVisibleCount] = useState(5);
  const [selectedFood, setSelectedFood] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const res = await fetch(`${BASE_URL}/food/getAllFood`);
        const data = await res.json();
        setFoods(data.foods || []);
      } catch (err) {
        console.error("Error fetching foods:", err);
      }
    };
    fetchFoods();
  }, []);

  const showMore = () => {
    setVisibleCount((prev) => prev + 5);
  };

  const handleFoodClick = (food) => {
    setSelectedFood(food);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedFood(null);
  };

  return (
    <div className="food-section">
      <h2>🍕 Popular Foods</h2>
      <div className="food-list">
        {foods.slice(0, visibleCount).map((food, index) => (
          <div
            key={index}
            className="food-card"
            onClick={() => handleFoodClick(food)}
          >
            <img
              src={
                food.image && food.image !== "false"
                  ? food.image
                  : "https://source.unsplash.com/200x200/?food"
              }
              alt={food.name}
              className="food-image"
            />
            <p className="food-name">{food.name}</p>
            <p className="food-price">₹{food.price}</p>
          </div>
        ))}
      </div>

      {visibleCount < foods.length && (
        <button onClick={showMore} className="show-more-btn">
          Show More
        </button>
      )}

      {/* Render modal only when isModalOpen is true and food is selected */}
      {isModalOpen && selectedFood && (
        <FoodModal food={selectedFood} onClose={closeModal} />
      )}
    </div>
  );
};

export default FoodList;
