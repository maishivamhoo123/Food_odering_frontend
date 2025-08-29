import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './OwnerSignUp.css'; // Import the corresponding CSS file

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const OwnerSignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    Restraurant_name: "",
    owner_name: "",
    password: "",
    restaurantId: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post(
        `${BASE_URL}/owner/AddOwner`,
        formData
      );

      console.log("SignUp response:", data);

      if (data.success) {
        alert("SignUp Successful!");
        navigate("/ownerLogin");
      } else {
        alert(data.message || "SignUp failed");
      }
    } catch (error) {
      console.error(
        "Error occurred during signup:",
        error.response?.data?.message || error.message
      );
      alert(error.response?.data?.message || "SignUp failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-page-container">
      <div className="signup-card">
        <div className="signup-header">
          <h2>Create Your Account</h2>
          <p>Join us and start managing your restaurant</p>
        </div>

        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <input
              type="text"
              name="owner_name"
              placeholder="Owner Name"
              value={formData.owner_name}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="Restraurant_name"
              placeholder="Restaurant Name"
              value={formData.Restraurant_name}
              onChange={handleChange}
              required
            />
          </div>

          <input
            type="text"
            name="restaurantId"
            placeholder="Restaurant ID"
            value={formData.restaurantId}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default OwnerSignUp;
