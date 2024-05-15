import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./SignUp.css";
import signupImg from "./signup.png";
import api from "../../api";

const SignUp = () => {
  const history = useHistory();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    gender: "",
    pincode: "",
    state: "",
    address_detail: "",
  });

  const handleChange = (e) => {
    // If the phone field, only allow numbers and limit to 10 characters
    const value =   e.target.name === "phone"  ? e.target.value.replace(/\D/g, "").slice(0, 10)
        : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/signup/", formData);
      alert(response.data.message); // Log the response message
      // Optionally, you can redirect the user to another page or show a success message
      history.push("/signin");
    } catch (error) {
      alert("Error signing up:", error.response.data.detail);
      // Handle error, maybe show an error message to the user
    }
  };

  return (
    <div className="signup-container">
      <div className="signUp-image">
        <img src={signupImg} alt="Sign Up Image" />
      </div>
      <div className="signup-form">
        <h2 className="title-Signup">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group-Signup">
            
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group-Signup gender">
            
            <select name="gender" id="gender" onChange={handleChange} required>
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="input-group-Signup phone">
            
            <input
              type="text"
              name="phone"
              placeholder="Enter your phone number"
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="input-group-Signup email">
            
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group-Signup state">
            
            <select name="state" id="state" onChange={handleChange} required>
              <option value="">Select State</option>
              <option value="Andhra Pradesh">Andhra Pradesh</option>
              <option value="Arunachal Pradesh">Arunachal Pradesh</option>
              <option value="Assam">Assam</option>
              <option value="Bihar">Bihar</option>
              <option value="Chhattisgarh">Chhattisgarh</option>
              <option value="Goa">Goa</option>
              <option value="Gujarat">Gujarat</option>
              <option value="Haryana">Haryana</option>
              <option value="Himachal Pradesh">Himachal Pradesh</option>
              <option value="Jharkhand">Jharkhand</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Kerala">Kerala</option>
              <option value="Madhya Pradesh">Madhya Pradesh</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Manipur">Manipur</option>
              <option value="Meghalaya">Meghalaya</option>
              <option value="Mizoram">Mizoram</option>
              <option value="Nagaland">Nagaland</option>
              <option value="Odisha">Odisha</option>
              <option value="Punjab">Punjab</option>
              <option value="Rajasthan">Rajasthan</option>
              <option value="Sikkim">Sikkim</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
              <option value="Telangana">Telangana</option>
              <option value="Tripura">Tripura</option>
              <option value="Uttar Pradesh">Uttar Pradesh</option>
              <option value="Uttarakhand">Uttarakhand</option>
              <option value="West Bengal">West Bengal</option>
              <option value="Andaman and Nicobar Islands">
                Andaman and Nicobar Islands
              </option>
              <option value="Chandigarh">Chandigarh</option>
              <option value="Dadra and Nagar Haveli">
                Dadra and Nagar Haveli
              </option>
              <option value="Daman and Diu">Daman and Diu</option>
              <option value="Delhi">Delhi</option>
              <option value="Jammu And Kashmir">Jammu And Kashmir</option>
              <option value="Lakshadweep">Lakshadweep</option>
              <option value="Puducherry">Puducherry</option>
            </select>
          </div>
          <div className="input-group-Signup pincode">
           
            <input
              type="text"
              name="pincode"
              placeholder="Pincode"
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group-Signup address">
            
            <input
              type="text"
              name="address_detail"
              placeholder="Address"
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group-Signup">
            
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
              Already have an account? <Link to="/signin/">Sign In</Link>
            </p>
          </div>
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
