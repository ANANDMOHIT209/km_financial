import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "./UserProfile.css"; // Import the CSS file
import maleProfileImage from "./maleImg.svg"; // Import the male profile image
import femaleProfileImage from "./femaleImg.svg"; // Import the female profile image

const ProfilePage = () => {
  const [profileData, setProfileData] = useState({});
  const [profileImage, setProfileImage] = useState(null); // State to store the profile image
  const history = useHistory();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");

        const headers = {
          token: `${accessToken}`,
          "Content-Type": "application/json",
        };

        const response = await axios.get(
          "http://localhost:8000/user_profile", // You might need to adjust this based on your API's requirements
          { headers } // Pass headers as part of the config object
        );
        setProfileData(response.data.message);

        // Determine the profile image based on gender
        if (response.data.message.gender === "Male") {
          setProfileImage(maleProfileImage); // Set the male profile image
        } else if (response.data.message.gender === "Female") {
          setProfileImage(femaleProfileImage); // Set the female profile image
        } else {
          setProfileImage(maleProfileImage);
        }
      } catch (error) {
        alert("Error fetching profile data:", error);
        // Handle error, e.g., redirect to login if not authenticated
        // history.push('/signin');
      }
    };

    fetchProfileData();
  }, [history]); // Depend on history to refetch if it changes

  return (
    <div>
      <div className="profile-container">
        {" "}
        {/* Apply container styles */}
        <h2 className="profile-heading">Profile</h2>{" "}
        {/* Apply heading styles */}
        {profileImage && (
          <img src={profileImage} alt="Profile" className="profile-image" />
        )}{" "}
        {/* Display profile image if available */}
        <div className="profile-data">
          <div className="profile-data-div" >
            {" "}
            {/* Apply profile data styles */}
            <p>Name: {profileData.name}</p>
            <p>Gender: {profileData.gender}</p>
            <p>Email: {profileData.email}</p>
            <p>Phone: {profileData.phone}</p>
            <p>State: {profileData.state}</p>
            <p>Pincode: {profileData.pincode}</p>
            <p>Address: {profileData.address_detail}</p>
          </div>
        </div>
      </div>
      <div className="profile-button-container">
        <button
          className="profile-button"
          onClick={() => history.push("/loan-history")}
        >
          View Loan History
        </button>{" "}
        {/* Apply button styles */}
        <button
          className="profile-button"
          onClick={() => history.push("/update_profile")}
        >
          Update User Profile
        </button>{" "}
        {/* Apply button styles */}
      </div>
    </div>
  );
};

export default ProfilePage;
