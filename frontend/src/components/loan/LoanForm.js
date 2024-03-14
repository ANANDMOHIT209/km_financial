import React, { useState } from "react";
import {
  FormControl,
  TextField,
  Button,
  Grid,
  Typography,
  Container,
  MenuItem,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { useHistory } from "react-router-dom";
import axios from "axios";

// #F5DD61
// #FAA300

const LoanForm = () => {
  const history = useHistory();
  const [formData, setFormData] = useState({
    applicant_name: "Yash Anand",
    aadhar_no: "250825082508",
    pan_no: "DDKLT5840M",
    bank_details: "Axis Bank, Patna",
    account_no: "1234567890",
    ifsc_code: "AXIS0002541",
    loan_amount: "50000.00",
    loan_type: "Other Loans",
    annual_interest_rate: "5.0",
    loan_term: "12",
    employment_details: "Others",
  });
  const [agree, setAgree] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAgreeChange = (e) => {
    setAgree(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!agree) {
      alert("Please agree to the terms and conditions.");
      return;
    }
    try {
      const accessToken = localStorage.getItem("accessToken");
      const headers = {
        token: `${accessToken}`,
        "Content-Type": "application/json",
      };

      const response = await axios.post(
        "http://localhost:8000/apply-loan",
        formData,
        { headers }
      );

      if (agree) {
        alert(response.data.message);
        history.push("/loan-history");
      } else {
        alert("Failed to submit loan application: " + response.data.message);
      }
    } catch (error) {
      alert("Error submitting loan application: " + error.response.data.detail);
    }
  };

  const loanTypes = [
    "Business Loans",
    "Personal Loans",
    "Home Loans",
    "Vehicle Loans",
    "Education Loans",
    "Other Loans",
  ];

  const employmentTypes = [
    "Salaried",
    "Non-Salaried",
    "Unemployed",
    "Student",
    "Others",
  ];

  return (
    <Container
      maxWidth="md"
      style={{
        marginTop: "50px",
        paddingTop: "30px",
        backgroundColor: "#f0f0f0",
      }}
    >
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom>
              Loan Application Form
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
                type="text"
                id="applicant_name"
                name="applicant_name"
                label="Applicant Name"
                value={formData.applicant_name}
                onChange={handleChange}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <TextField
                select
                id="loan_type"
                name="loan_type"
                label="Loan Type"
                value={formData.loan_type}
                onChange={handleChange}
              >
                {loanTypes.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <TextField
                type="text"
                id="loan_amount"
                name="loan_amount"
                label="Loan Amount"
                value={formData.loan_amount}
                onChange={handleChange}
                placeholder="Rs. 10000"
                InputProps={{
                  inputMode: "numeric",
                  pattern: "[0-9]*",
                  maxLength: 8,
                }}
                inputProps={{
                  min: 1000,
                  max: 99999999,
                }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <TextField
                type="text"
                id="aadhar_no"
                name="aadhar_no"
                label="Aadhar Number"
                value={formData.aadhar_no}
                onChange={handleChange}
                fullWidth
                inputProps={{ maxLength: 12 }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <TextField
                type="text"
                id="pan_no"
                name="pan_no"
                label="PAN Number"
                value={formData.pan_no}
                onChange={handleChange}
                fullWidth
                inputProps={{ maxLength: 10 }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <TextField
                select
                id="employment_details"
                name="employment_details"
                label="Employment Status"
                value={formData.employment_details}
                onChange={handleChange}
                fullWidth
              >
                {employmentTypes.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <TextField
                type="text"
                id="bank_details"
                name="bank_details"
                label="Bank Name"
                value={formData.bank_details}
                onChange={handleChange}
                fullWidth
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <TextField
                type="text"
                id="account_no"
                name="account_no"
                label="Account Number"
                value={formData.account_no}
                onChange={handleChange}
                fullWidth
                inputProps={{ maxLength: 15 }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <TextField
                type="text"
                id="ifsc_code"
                name="ifsc_code"
                label="Bank IFSC Code"
                value={formData.ifsc_code}
                onChange={handleChange}
                fullWidth
                inputProps={{ maxLength: 12 }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <TextField
                type="text"
                id="annual_interest_rate"
                name="annual_interest_rate"
                label="Annual Interest Rate"
                value={formData.annual_interest_rate}
                onChange={handleChange}
                fullWidth
                inputProps={{ maxLength: 10 }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <TextField
                type="text"
                id="loan_term"
                name="loan_term"
                label="Loan Term (in Months)"
                value={formData.loan_term}
                onChange={handleChange}
                fullWidth
                inputProps={{ maxLength: 10 }}
              />
            </FormControl>
          </Grid>
          {/* Other Grid items */}

          <Grid item xs={6} style={{ textAlign: "left" }}>
            <FormControlLabel
              fullWidth
              control={
                <Checkbox checked={agree} onChange={handleAgreeChange} />
              }
              label="I agree to the terms and conditions"
            />
          </Grid>
          <Grid item xs={6} style={{ textAlign: "right" }}>
            <FormControl>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={!agree}
                style={{
                  marginBottom: "25px",
                  padding: "10px 14px",
                  fontSize: "1.1rem",
                }}
              >
                Apply Loan
              </Button>
            </FormControl>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default LoanForm;
