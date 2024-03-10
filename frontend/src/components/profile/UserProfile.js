import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const ProfilePage = () => {
 const [profileData,setProfileData] = useState({});
 const history = useHistory();

 useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken"); 
      
        const headers = {
          "token": `${accessToken}`,
          "Content-Type": "application/json",
        };
        
        const response = await axios.get(
          "http://localhost:8000/user_profile", // You might need to adjust this based on your API's requirements
          { headers }, // Pass headers as part of the config object
        );
        setProfileData(response.data.message);
      } catch (error) {
        alert('Error fetching profile data:', error);
        // Handle error, e.g., redirect to login if not authenticated
        // history.push('/signin');
      }
    };

    fetchProfileData();
 }, [history]); // Depend on history to refetch if it changes

 return (
    <div>
      <h2>Profile</h2>
      <p>Name: {profileData.name}</p>
      <p>Email: {profileData.email}</p>
      <p>Phone: {profileData.phone}</p>
      <button onClick={() => history.push('/loan-history')}>View Loan History</button>
      <button onClick={() => history.push('/update_profile')}>Update User Profile</button>
    </div>
 );
};

export default ProfilePage;
