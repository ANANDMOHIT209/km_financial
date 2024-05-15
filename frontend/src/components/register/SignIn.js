import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./SignIn.css";
import api from "../../api";
import loginImg from "./login.svg";
import UserProfile from "../profile/UserProfile";
import CustomAlert from "../common/customAlert"; // Import the custom alert component

const SignIn = () => {
  const history = useHistory();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/login", formData);
      const { access_token } = response.data.message;
      localStorage.setItem("accessToken", access_token);
      setAlertMessage("Successfully Login"); // Set the alert message
      setShowAlert(true); // Show the alert
      history.push("/");
    } catch (error) {
      setAlertMessage(`Error login: ${error.response.data.detail}`); // Set the alert message
      setShowAlert(true); // Show the alert
    }
  };

  return (
    <div className="signin-container">
      {showAlert && (
        <CustomAlert message={alertMessage} onClose={() => setShowAlert(false)} />
      )} {/* Render the custom alert */}
      <div className="signin-image">
        {/* Your image component goes here */}
        <img src={loginImg} alt="Sign Up Image" width="600" height="400" />
      </div>
      <div className="signin-form">
        <h2 className="title-Login">Log In</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
            />
          </div>

          <div className="my-container">
            <div className="my-checkbox-group">
              <div>
                <input type="checkbox" id="flexCheckDefault" className="my-checkbox" />
                <label htmlFor="flexCheckDefault" className="my-label">Remember me</label>
              </div>
              <a href="!#" className="my-forgot-password">Forgot password?</a>
            </div>
          </div>

          <div className="signin-footer">
            <p>
              Don't have an account? <Link to="/signup/">Sign Up</Link>
            </p>
          </div>
          <button type="submit">Log In</button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;