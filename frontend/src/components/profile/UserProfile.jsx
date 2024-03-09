// UserProfile.jsx
import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode'; // Update the import statement
import './UserProfile.css';

const UserProfile = () => {
  const [email, setEmail] = useState("");

  useEffect(() => {
    // Fetch the access token from local storage
    const accessToken = localStorage.getItem("accessToken");

    // Decode the access token to get user information
    if (accessToken) {
      const decodedToken = jwtDecode(accessToken); // Update the function call
      const userEmail = decodedToken.email;

      // Set the email in the component state
      setEmail(userEmail);
    }
  }, []);

  return (
    <div className="user-profile">
      <div className="profile-details">
        <p><strong>Email:</strong> {email}</p>
      </div>
    </div>
  );
};

export default UserProfile;
