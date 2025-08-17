import React, { useState, useEffect } from "react";
import axios from "axios";
import "./FoodList.css";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const FoodList = () => {
  const [foods, setFoods] = useState([]);
  const [formData, setFormData] = useState({
    Food_Id: "",
    Food_name: "",
    description: "",
    image: "",
    price: "",
    category: "",
  });
  const [editingFoodId, setEditingFoodId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const token = localStorage.getItem("token"); // JWT token stored in localStorage

  // Fetch all foods
  const fetchFoods = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/food/getFoods`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setFoods(res.data.foods);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  // Handle form changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add or Update food
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingFoodId) {
        await axios.put(
          `${BASE_URL}/food/updateFood`,
          { ...formData, foodId: editingFoodId },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        await axios.post(
          `${BASE_URL}/food/addFood`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
      setShowForm(false);
      setFormData({ Food_Id: "", Food_name: "", description: "", image: "", price: "", category: "" });
      setEditingFoodId(null);
      fetchFoods();
    } catch (err) {
      console.error(err);
    }
  };

  // Delete food
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this food?")) return;
    try {
      await axios.delete(`${BASE_URL}/food/deleteFood`, {
        headers: { Authorization: `Bearer ${token}` },
        data: { foodId: id },
      });
      fetchFoods();
    } catch (err) {
      console.error(err);
    }
  };

  // Start editing
  const handleEdit = (food) => {
    setEditingFoodId(food._id);
    setFormData(food);
    setShowForm(true);
  };

  return (
    <div className="food-list-container">
      <h2>My Foods</h2>
      <button className="btn add-btn" onClick={() => setShowForm(true)}>Add New Food</button>

      {showForm && (
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <input name="Food_Id" placeholder="Food ID" value={formData.Food_Id} onChange={handleChange} required />
            <input name="Food_name" placeholder="Food Name" value={formData.Food_name} onChange={handleChange} required />
            <input name="description" placeholder="Description" value={formData.description} onChange={handleChange} />
            <input name="image" placeholder="Image URL" value={formData.image} onChange={handleChange} />
            <input name="price" placeholder="Price" type="number" value={formData.price} onChange={handleChange} required />
            <input name="category" placeholder="Category" value={formData.category} onChange={handleChange} />
            <button type="submit" className="btn submit-btn">{editingFoodId ? "Update" : "Add"}</button>
            <button type="button" className="btn cancel-btn" onClick={() => { setShowForm(false); setEditingFoodId(null); }}>Cancel</button>
          </form>
        </div>
      )}

      <table className="food-table">
        <thead>
          <tr>
            <th>Food ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {foods.map((food) => (
            <tr key={food._id}>
              <td>{food.Food_Id}</td>
              <td>{food.Food_name}</td>
              <td>{food.description}</td>
              <td>{food.price}</td>
              <td>{food.category}</td>
              <td>
                <button className="btn edit-btn" onClick={() => handleEdit(food)}>Edit</button>
                <button className="btn delete-btn" onClick={() => handleDelete(food._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FoodList;
