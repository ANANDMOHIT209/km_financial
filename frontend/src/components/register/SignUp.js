// SignUp.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./SignUp.css";

const SignUp = ({ handleSignUp }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSignUp(formData);
  };

  return (
    <div className="signup-container">
      <div className="signup-form">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label>Phone</label>
            <input
              type="text"
              name="phone"
              placeholder="Enter your phone number"
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              onChange={handleChange}
              required
            />
          </div>
          <div className="signup-footer">
            <p>
              Already have an account? <Link to="/signin">Sign In</Link>
            </p>
          </div>
          <button type="submit">Sign Up</button>
        </form>
      </div>
      <div className="signup-image">
        {/* Your image component goes here */}
        <img src="img.jpg" alt="Sign Up Image" width="200" height="150" />
      </div>
    </div>
  );
};

export default SignUp;
