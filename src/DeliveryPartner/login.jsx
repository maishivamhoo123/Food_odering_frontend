import axios from "axios";
import React, { useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  // Base URL from .env (fallback to localhost for dev)
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${API_URL}/partner/loginPartner`,
        formData
      );
      console.log("Login successful", data);

      // Save JWT
      localStorage.setItem("token", data.token);

      // Redirect after login
      navigate("/partner-dashboard");
    } catch (error) {
      console.error(
        "Login failed:",
        error.response?.data?.message || error.message
      );
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="login-container">
      <form className="login-box" onSubmit={handleSubmit}>
        <h2>Owner Login</h2>

        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Login</button>
        OR
        <button type="button" onClick={() => navigate("/partnerSignUp")}>
          SignUp
        </button>
      </form>
    </div>
  );
};

export default Login;
