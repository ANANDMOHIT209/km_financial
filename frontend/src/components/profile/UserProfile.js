import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "./UserProfile.css"; // Import the CSS file
import ProfileImage from "./next.png"; // Import the male profile image

const ProfilePage = () => {

  const [isActive, setIsActive] = useState(false);

  const toggleMessage = () => {
    setIsActive(!isActive);
  };

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
        
      } catch (error) {
        alert("Error fetching profile data:", error);
        // Handle error, e.g., redirect to login if not authenticated
        // history.push('/signin');
      }
    };

    fetchProfileData();
  }, [history]); // Depend on history to refetch if it changes


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
    <div className={`wrapper ${isActive ? 'active' : ''}`}>
      <div className="profile-card js-profile-card">
      <h2 className="loan-details-admin-heading">{profileData.name} your profile</h2>
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
            <button className="profile-card__button button--orange" onClick={() => history.push("/update_profile")}>Update User Profile</button>
            <button className="profile-card__button button--blue" onClick={() => history.push("/loan-history")}> View Loan History </button>{" "}
          </div>
        </div>

        

      </div>
    </div>
  );
}


export default ProfilePage;
