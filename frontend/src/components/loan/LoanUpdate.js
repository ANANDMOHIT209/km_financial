import React, { useState, useEffect } from "react";
import {
  InputLabel,
  FormControl,
  TextField,
  Button,
  Container,
  Typography,
  Grid,
  MenuItem,
  Select,
  Paper,
  Box,
} from "@mui/material";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import "./LoanDetails.css";

const UpdateLoanForm = () => {
  const { loanId } = useParams();
  const history = useHistory();
  const [loanDetails, setLoanDetails] = useState({
    loan_amount: 0,
    loan_type: "",
    loan_term: 0,
    employment_details: "",
    aadhar_no: "",
    pan_no: "",
    bank_details: "",
    account_no: "",
  });

  useEffect(() => {
    const fetchLoanDetails = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const headers = {
          token: `${accessToken}`,
          "Content-Type": "application/json",
        };
        const response = await axios.get(
          `http://localhost:8000/loan/${loanId}`,
          { headers },
        );
        setLoanDetails(response.data.message);
      } catch (error) {
        console.error("Error fetching loan details:", error);
      }
    };

    fetchLoanDetails();
  }, [loanId]);

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
        token: `${accessToken}`,
        "Content-Type": "application/json",
      };
      const updateData = loanDetails;
      await axios.put(
        `http://localhost:8000/loan/update/${loanId}`,
        updateData,
        { headers },
      );
      alert("Loan application updated successfully");
      history.push("/loan-history");
    } catch (error) {
      console.error("Error updating loan application:", error);
      alert("Error updating loan application");
    }
  };

  return (
    <Container maxWidth="md" style={{ marginTop: "50px" }}>
      <Paper elevation={3} style={{ padding: "30px", backgroundColor: "#f0f0f0" }}>
        <h1 className="title-update-loan">
          Update Loan Application
        </h1>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField      
                name="loan_amount"
                label="Loan Amount"
                value={loanDetails.loan_amount}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                InputProps={{ style: { height: 56 } }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="employment-details-label">Employment Status</InputLabel>
                <Select
                  labelId="employment-details-label"
                  id="employment_details"
                  name="employment_details"
                  value={loanDetails.employment_details}
                  onChange={handleChange}
                  label="Employment Status"
                  style={{ height: 56 }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="Salaried">Salaried</MenuItem>
                  <MenuItem value="Non-Salaried">Non-Salaried</MenuItem>
                  <MenuItem value="Unemployed">Unemployed</MenuItem>
                  <MenuItem value="Student">Student</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="aadhar_no"
                label="Aadhar Number"
                value={loanDetails.aadhar_no}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                InputProps={{ style: { height: 56 } }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="pan_no"
                label="PAN Number"
                value={loanDetails.pan_no}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                InputProps={{ style: { height: 56 } }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="account_no"
                label="Account Number"
                value={loanDetails.account_no}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                InputProps={{ style: { height: 56 } }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="bank_details"
                label="Bank Details"
                value={loanDetails.bank_details}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                InputProps={{ style: { height: 56 } }}
              />
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" justifyContent="flex-end">
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  style={{ padding: "10px 20px", fontSize: "1rem" }}
                >
                  Update Loan Application
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default UpdateLoanForm;
