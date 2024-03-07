// SignIn.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./SignIn.css";

const SignIn = ({ handleSignIn }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSignIn(formData);
  };

  return (
    <div className="signin-container">
      <div className="signin-form">
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit}>
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
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="signin-footer">
            <p>
              Don't have an account? <Link to="/signup">Sign Up</Link>
            </p>
          </div>
          <button type="submit">Sign In</button>
        </form>
      </div>
      <div className="signin-image">
        {/* Your image component goes here */}
        <img src="img.jpg" alt="Sign Up Image" width="100" height="100" />
      </div>
    </div>
  );
};

export default SignIn;
