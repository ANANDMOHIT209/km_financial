import React, { useState, useEffect } from "react";
import {
  TextField,
  InputLabel,
  Button,
  Container,
  Typography,
  Grid,
  Select,
  MenuItem,
} from "@mui/material";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "./UpdateProfile.css"; // Import your CSS file

const UpdateProfile = () => {
  const [profile, setProfile] = useState({
    name: "",
    gender: "",
    pincode: "",
    state: "",
    address_detail: "",
  });
  const [selectedState, setSelectedState] = useState("");
  const history = useHistory();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const headers = {
          token: `${accessToken}`,
          "Content-Type": "application/json",
        };
        const response = await axios.get("http://localhost:8000/user_profile", {
          headers,
        });
        setProfile(response.data.message);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

 const handleChange = (e) => {
   const { name, value } = e.target;

   if (name === "gender" || name === "state") {
     // Handle Select components separately
     setProfile((prevProfile) => ({
       ...prevProfile,
       [name]: value,
     }));
   } else {
     // Handle other input fields
     setProfile({
       ...profile,
       [name]: value,
     });
   }
 };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const accessToken = localStorage.getItem("accessToken");
      const headers = {
        token: `${accessToken}`,
        "Content-Type": "application/json",
      };
      const profileData = profile;
      const response = await axios.put(
        "http://localhost:8000/update_profile",
        profileData,
        { headers }
      );
      alert(`${response.data.message.name} your profile has been updated Successfully.`); // Display success message
      history.push("/profile"); // Redirect to home or another page after successful update
    } catch (error) {
      alert("Error updating profile:", error.response.data.detail);
    }
  };

  return (
    <Container maxWidth="md" className="update-profile-container">
      <form onSubmit={handleSubmit} className="update-profile-form">
        <Typography className="update-profile-title" variant="h5">
          Update Profile
        </Typography>
        <Grid container spacing={2} style={{ marginBottom: "25px" }}>
          <Grid item xs={12}>
            <TextField
              type="text"
              id="name"
              name="name"
              label="Name"
              value={profile.name}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            {" "}
            {/* Adjusted grid layout for pincode */}
            <TextField
              type="text"
              id="pincode"
              name="pincode"
              label="Pincode"
              value={profile.pincode}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            {" "}
            {/* Adjusted grid layout for gender */}
            <InputLabel id="gender-label">Gender</InputLabel>
            <Select
              labelId="gender-label"
              id="gender"
              value={profile.gender}
              onChange={(e) =>
                handleChange({
                  target: { name: "gender", value: e.target.value },
                })
              }
              fullWidth
              required
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12} sm={6}>
            {" "}
            {/* Adjusted grid layout for state */}
            <InputLabel id="state-label">State</InputLabel>
            <Select
              labelId="state-label"
              id="state"
              value={profile.state}
              onChange={(e) =>
                handleChange({
                  target: { name: "state", value: e.target.value },
                })
              }
              fullWidth
              required
            >
              <MenuItem value="">Select a state</MenuItem>
              <MenuItem value="Andhra Pradesh">Andhra Pradesh</MenuItem>
              <MenuItem value="Arunachal Pradesh">Arunachal Pradesh</MenuItem>
              <MenuItem value="Assam">Assam</MenuItem>
              <MenuItem value="Bihar">Bihar</MenuItem>
              <MenuItem value="Chhattisgarh">Chhattisgarh</MenuItem>
              <MenuItem value="Goa">Goa</MenuItem>
              <MenuItem value="Gujarat">Gujarat</MenuItem>
              <MenuItem value="Haryana">Haryana</MenuItem>
              <MenuItem value="Himachal Pradesh">Himachal Pradesh</MenuItem>
              <MenuItem value="Jharkhand">Jharkhand</MenuItem>
              <MenuItem value="Karnataka">Karnataka</MenuItem>
              <MenuItem value="Kerala">Kerala</MenuItem>
              <MenuItem value="Madhya Pradesh">Madhya Pradesh</MenuItem>
              <MenuItem value="Maharashtra">Maharashtra</MenuItem>
              <MenuItem value="Manipur">Manipur</MenuItem>
              <MenuItem value="Meghalaya">Meghalaya</MenuItem>
              <MenuItem value="Mizoram">Mizoram</MenuItem>
              <MenuItem value="Nagaland">Nagaland</MenuItem>
              <MenuItem value="Odisha">Odisha</MenuItem>
              <MenuItem value="Punjab">Punjab</MenuItem>
              <MenuItem value="Rajasthan">Rajasthan</MenuItem>
              <MenuItem value="Sikkim">Sikkim</MenuItem>
              <MenuItem value="Tamil Nadu">Tamil Nadu</MenuItem>
              <MenuItem value="Telangana">Telangana</MenuItem>
              <MenuItem value="Tripura">Tripura</MenuItem>
              <MenuItem value="Uttarakhand">Uttarakhand</MenuItem>
              <MenuItem value="Uttar Pradesh">Uttar Pradesh</MenuItem>
              <MenuItem value="West Bengal">West Bengal</MenuItem>
              <MenuItem value="Andaman and Nicobar Islands">
                Andaman and Nicobar Islands
              </MenuItem>
              <MenuItem value="Chandigarh">Chandigarh</MenuItem>
              <MenuItem value="Dadra and Nagar Haveli">
                Dadra and Nagar Haveli
              </MenuItem>
              <MenuItem value="Daman and Diu">Daman and Diu</MenuItem>
              <MenuItem value="Delhi">Delhi</MenuItem>
              <MenuItem value="Jammu and Kashmir">Jammu and Kashmir</MenuItem>
              <MenuItem value="Lakshadweep">Lakshadweep</MenuItem>
              <MenuItem value="Puducherry">Puducherry</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12} style={{ marginTop: "20px" }}>
            <TextField
              type="text"
              id="address_detail"
              name="address_detail"
              label="Address"
              value={profile.address_detail}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
        </Grid>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className="update-profile-button"
            style={{ width: "50%", height: "50px" }}
          >
            Update Profile
          </Button>
        </div>
      </form>
    </Container>
  );
};

export default UpdateProfile;
