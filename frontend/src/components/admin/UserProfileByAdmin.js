import React, { useEffect, useState } from "react";
import axios from "axios";
import {useParams, useHistory } from "react-router-dom";
import "../profile/UserProfile.css"; // Import the CSS file
import ProfileImage from "./next.png"; // Import the male profile image

const UserProfileByAdmin = () => {
    const { userId } = useParams();
    const [profileData, setProfileData] = useState({});
    const [profileImage, setProfileImage] = useState(null);
    const history = useHistory();

    const deleteUserAndRedirect = async (userId) => {
        try {
          // Send a DELETE request to the server
          const accessToken = localStorage.getItem("accessToken");
        const headers = {
          token: `${accessToken}`,
          "Content-Type": "application/json",
        };
        const response = await axios.delete(
            `http://127.0.0.1:8000/delete_user/${userId}`,
            { headers }
          );
         
    
          // Redirect to the all_user_profile page after successful deletion
          history.push('/all_users_profile_pg');
        } catch (error) {
          console.error('Failed to delete user:', error);
          // Optionally, handle the error, e.g., show a message to the user
        }
      };

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const headers = {
          token: `${accessToken}`,
          "Content-Type": "application/json",
        };
        const response = await axios.get(
          `http://localhost:8000/user_profile_by_admin/${userId}`,
          { headers }
        );
        setProfileData(response.data.message);
      } catch (error) {
        console.error("Error fetching users details:", error);
      }
    };

    fetchProfileData();
  }, [history]);


  

//             <p>Gender: {profileData.gender}</p>
//             <p>Email: {profileData.email}</p>
//             <p>Phone: {profileData.phone}</p>
//             <p>State: {profileData.state}</p>
//             <p>Pincode: {profileData.pincode}</p>
//             <p>Address: {profileData.address_detail}</p>
//           </div>
//         </div>
//       </div>
//       <div className="profile-button-container">
//         <button
//           className="profile-button"
//           onClick={() => history.push("/loan-history")}
//         >
//           View Loan History
//         </button>{" "}
//         {/* Apply button styles */}
//         <button
//           className="profile-button"
//           onClick={() => history.push("/update_profile")}
//         >
//           Update User Profile
//         </button>{" "}
//         {/* Apply button styles */}
//       </div>
//     </div>
//   );
// };
 

  return (
    // <div className={`wrapper ${isActive ? 'active' : ''}`}>
      <div className="profile-card-byAdmin js-profile-card">
        <h2 className="loan-details-admin-heading">{profileData.name}'s Profile</h2>
        <div className="profile-card__img">
        {profileImage && (
          <img src={profileImage} alt="Profile" className="profile-image" />
        )}{" "}
        </div>

        <div className="profile-card__cnt js-profile-cnt">
          <div className="profile-card__name">{profileData.name}</div>
        </div>

        <div className="profile-card__container">
         
         <tbody>
            <tr>
              <td className="profile-card__txt">Gender : </td>
              <td className="profile-card__txt">{profileData.gender}</td>
            </tr>
            <tr>
              <td className="profile-card__txt">Mobile : </td>
              <td className="profile-card__txt">{profileData.phone}</td>
            </tr>
            <tr>
              <td className="profile-card__txt">Email : </td>
              <td className="profile-card__txt">{profileData.email}</td>
            </tr>
            <tr>
              <td className="profile-card__txt">Pincode : </td>
              <td className="profile-card__txt">{profileData.pincode}</td>
            </tr>
            <tr>
              <td className="profile-card__txt">State : </td>
              <td className="profile-card__txt">{profileData.state}</td>
            </tr>
            <tr>
              <td className="profile-card__txt">Address : </td>
              <td className="profile-card__txt">{profileData.address_detail}</td>
            </tr>
          </tbody>
        </div>
        
        <div>
          {/* Profile Card Controls */}
          <div className="profile-card-ctr">
            <button className="profile-card__buttonByAdmin button--orange" onClick={() => history.push("/update_profile")}>Update User Profile</button>
            <button className="profile-card__buttonByAdmin button--blue" onClick={() => deleteUserAndRedirect(userId)}>Delete User</button>
            <button className="profile-card__buttonByAdmin button--blue" onClick={() => history.push("/loan-history")}> View Loan History </button>{" "}
          </div>
        </div>

        

      </div>
    // </div>
  );
}


export default UserProfileByAdmin;
