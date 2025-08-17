import React, { useState } from "react";
import axios from "axios";
import "./signUp.css"; // import the CSS file

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    vehicleNo: "",
    address: "",
  });

  // ✅ Use env variable (fallback to localhost for dev)
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${API_URL}/partner/signUpPrtner`,
        formData
      );

      console.log("Signup successful:", data.msg);

      // ✅ Save token + partner details
      if (data.token) {
        localStorage.setItem("token", data.token);
      }
      if (data.partner) {
        localStorage.setItem("user", JSON.stringify(data.partner)); // keep same key "user" for Navbar
      }

      alert("Signup successful!");
    } catch (error) {
      console.error("Bad response from Signup route", error);
      alert(
        error.response?.data?.message ||
          "Signup failed! Check console for details."
      );
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Delivery Partner Signup</h2>

        <input
          type="text"
          name="name"
          placeholder="Name"
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

        <input
          type="text"
          name="vehicleNo"
          placeholder="Vehicle Number"
          value={formData.vehicleNo}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          required
        />

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
