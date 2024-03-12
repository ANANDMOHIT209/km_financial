import React, { useState, useEffect } from "react";
import { TextField, Button, Container, Typography, Grid } from "@mui/material";
import axios from 'axios';
import { useHistory } from "react-router-dom";

const UpdateProfile = () => {
 const [profile, setProfile] = useState({  
            name: "",
            gender: "",
            pincode: "",
            state: "",
            address_detail: "",
});
 const history = useHistory();

 useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const headers = {
          "token": `${accessToken}`,
          "Content-Type": "application/json",
        };
        const response = await axios.get(
          "http://localhost:8000/user_profile",
          { headers },
        );
        setProfile(response.data.message);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
 }, []);

 const handleChange = (e) => {
  const { name, value } = e.target;
  setProfile({
    ...profile,
    [name]: value,
  });
 };

 const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const accessToken = localStorage.getItem("accessToken");
      const headers = {
        "token": `${accessToken}`,
        "Content-Type": "application/json",
      };
      const profileData = profile;
      const response = await axios.put(
        "http://localhost:8000/update_profile",
        profileData,
        { headers },
      );
      alert(response.data.message.name);
      history.push("/"); // Redirect to home or another page after successful update
    } catch (error) {
      alert("Error updating profile:", error.response.data.detail);
    }
 };

 return (
    <Container maxWidth="md">
      <form onSubmit={handleSubmit}>
        <Typography variant="h5">Update Profile</Typography>
        <Grid container spacing={2}>
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
        <Grid item xs={12}>
        <TextField
          type="text"
          id="gender"
          name="gender"
          label="Gender"
          value={profile.gender}
          onChange={handleChange}
          fullWidth
          required
        />
        </Grid>
        <Grid item xs={12}>
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
        <Grid item xs={12}>
        <TextField
          type="text"
          id="state"
          name="state"
          label="State"
          value={profile.state}
          onChange={handleChange}
          fullWidth
          required
        />
        </Grid>
        <Grid item xs={12}>
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
        <button>
          Update Profile
        </button>
      </form>
    </Container>
 );
};

export default UpdateProfile;
