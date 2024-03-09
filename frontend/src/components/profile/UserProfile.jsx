// UserProfile.jsx
import React from 'react';
import './UserProfile.css';
import { useLocation } from 'react-router-dom';

const UserProfile = () => {
  const location = useLocation();
  const { email } = location.state;

  return (
    <div className="user-profile">
      <div className="profile-details">
        <p><strong>user:</strong> {email}</p>
      </div>
    </div>
  );
};

export default UserProfile;
