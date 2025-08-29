import React, { useState } from 'react';
import axios from 'axios';
import './signup.css';

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const Signup = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${BASE_URL}/user/userSignUP`,
        formData,
        { headers: { "Content-Type": "application/json" } }
      );

      setMessage(data.msg);
      setFormData({ name: "", email: "", password: "" });
    } catch (error) {
      console.error("Signup failed:", error);
      setMessage(error.response?.data?.msg || "Something went wrong");
    }
  };

  return (
    <div className="signup-container">
      <h1>User SignUp</h1>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit} className="signup-form">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
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
        <button type="submit">Sign Up</button>
      </form>
    </div>
  
  );
};

export default Signup;
