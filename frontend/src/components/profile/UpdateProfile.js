import React, { useState, useEffect } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import axios from 'axios';
import { useHistory } from "react-router-dom";

const UpdateProfile = () => {
 const [name, setName] = useState("");
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
        setName(response.data.message.name);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
 }, []);

 const handleChange = (e) => {
    setName(e.target.value);
 };

 const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const accessToken = localStorage.getItem("accessToken");
      const headers = {
        "token": `${accessToken}`,
        "Content-Type": "application/json",
      };
      const profileData = { name };
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
        <TextField
          type="text"
          id="name"
          name="name"
          label="Name"
          value={name}
          onChange={handleChange}
          fullWidth
          required
        />
        <button>
          Update Profile
        </button>
      </form>
    </Container>
 );
};

export default UpdateProfile;
