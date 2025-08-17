import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./login.css";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  // Update form data
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle login submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting formData:", formData);

    try {
      const { data } = await axios.post(
        `${BASE_URL}/user/userSignIn`,
        formData,
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("Login successful:", data);

      // Save JWT + user
      localStorage.setItem("token", data.token);
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      setMessage(data.msg);

      // Redirect to user dashboard
      navigate("/user-dashboard");
    } catch (error) {
      console.error(
        "Login failed:",
        error.response?.data?.msg || error.message
      );
      setMessage(error.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className="login-container">
      <form className="login-box" onSubmit={handleSubmit}>
        <h2>User Login</h2>
        {message && <p className="login-message">{message}</p>}

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

        <div className="signup-link">
          OR
          <button type="button" onClick={() => navigate("/userSignUP")}>
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
