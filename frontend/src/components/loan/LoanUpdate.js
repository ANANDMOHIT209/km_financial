import React, { useState, useEffect } from "react";
import { TextField, Button, Container, Typography, Grid } from "@mui/material";
import axios from 'axios';
import { useHistory, useParams } from "react-router-dom";

const UpdateLoanForm = () => {
 const { loanId } = useParams();
 const history = useHistory();
 const [loanDetails, setLoanDetails] = useState({
    loan_amount: 0,
    loan_type: "",
    loan_term:0,
    employment_details: "",
    aadhar_no: "",
    pan_no: "",
    bank_details: "",
    account_no: ""
 });
 useEffect(() => {
    const fetchLoanDetails = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const headers = {
          "token": `${accessToken}`,
          "Content-Type": "application/json",
        };
        const response = await axios.get(
          `http://localhost:8000/loan/${loanId}`,
          { headers },
        );
        console.log(response.data.message)
        setLoanDetails(response.data.message);
      } catch (error) {
        console.error("Error fetching loan details:", error);
      }
    };

    fetchLoanDetails();
 }, []);

 const handleChange = (e) => {
    const { name, value } = e.target;
    setLoanDetails({
      ...loanDetails,
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
      const updateData = loanDetails;
      const response = await axios.put(
        `http://localhost:8000/loan/update/${loanId}`,
        updateData,
        { headers },
      );
      alert("Loan application updated successfully");
      history.push("/"); // Redirect to home or another page after successful update
    } catch (error) {
      console.error("Error updating loan application:", error);
      alert("Error updating loan application");
    }
 };

 return (
    <Container maxWidth="md">
      <form onSubmit={handleSubmit}>
        <Typography variant="h5">Update Loan Application</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              type="number"
              name="loan_amount"
              label="Loan Amount"
              value={loanDetails.loan_amount}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              select
              name="loan_type"
              label="Loan Type"
              value={loanDetails.loan_type}
              onChange={handleChange}
              fullWidth
            >
              {/* Assuming you have a list of loan types */}
              <option value="Personal Loans">Personal Loans</option>
              <option value="Home Loans">Home Loans</option>
              {/* Add other loan types as needed */}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="employment_details"
              label="Employment Details"
              value={loanDetails.employment_details}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="aadhar_no"
              label="Aadhar Number"
              value={loanDetails.aadhar_no}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="pan_no"
              label="PAN Number"
              value={loanDetails.pan_no}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="bank_details"
              label="Bank Details"
              value={loanDetails.bank_details}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="account_no"
              label="Account Number"
              value={loanDetails.account_no}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Update Loan Application
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
 );
};

export default UpdateLoanForm;
