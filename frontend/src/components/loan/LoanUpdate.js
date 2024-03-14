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
} from "@mui/material";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";

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
        console.log(response.data.message);
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
        token: `${accessToken}`,
        "Content-Type": "application/json",
      };
      const updateData = loanDetails;
      const response = await axios.put(
        `http://localhost:8000/loan/update/${loanId}`,
        updateData,
        { headers },
      );
      alert("Loan application updated successfully");
      history.push("/loan-history"); // Redirect to home or another page after successful update
    } catch (error) {
      console.error("Error updating loan application:", error);
      alert("Error updating loan application");
    }
  };

  return (
    <Container maxWidth="md" style={{  marginTop: "50px", paddingTop: "30px", backgroundColor: "#f0f0f0" }}>
      <form
        onSubmit={handleSubmit}
        style={{ margin: "0 auto", maxWidth: "100%" }}
      >
        <Typography
          variant="h5"
          style={{ paddingBottom: "25px", paddingTop: "20px" }}
        >
          Update Loan Application
        </Typography>
        <Grid container spacing={2}>
          <Grid item fullWidth sx={{ minWidth: 260 }}>
            <FormControl>
              <TextField
                type="number"
                name="loan_amount"
                label="Loan Amount"
                value={loanDetails.loan_amount}
                onChange={handleChange}
                fullWidth
                style={{ marginBottom: "10px" }}
              />
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl fullWidth sx={{ minWidth: 260 }}>
              <TextField
                type="text"
                id="employment_details"
                value={loanDetails.employment_details}
                select
                label="Select Employment Status"
                onChange={(e) =>
                  handleChange({
                    target: {
                      name: "employment_details",
                      value: e.target.value,
                    },
                  })
                }
                // helperText="Select Employment Type"
              >
                <MenuItem value="" disabled>
                  Select Employment Status
                </MenuItem>
                <MenuItem value="Salaried">Salaried</MenuItem>
                <MenuItem value="Non-Salaried">Non-Salaried</MenuItem>
                <MenuItem value="Unemployed">Unemployed</MenuItem>
                <MenuItem value="Student">Student</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </TextField>
            </FormControl>
          </Grid>
          <Grid item fullWidth sx={{ minWidth: 260 }}>
            <FormControl>
              <TextField
                name="aadhar_no"
                label="Aadhar Number"
                value={loanDetails.aadhar_no}
                onChange={handleChange}
                fullWidth
                style={{ marginBottom: "10px" }}
              />
            </FormControl>
          </Grid>
          <Grid item fullWidth sx={{ minWidth: 260 }}>
            <FormControl>
              <TextField
                name="pan_no"
                label="PAN Number"
                value={loanDetails.pan_no}
                onChange={handleChange}
                fullWidth
                style={{ marginBottom: "10px" }}
              />
            </FormControl>
          </Grid>
          <Grid item fullWidth md={{ minWidth: 350 }}>
            <FormControl>
              <TextField
                name="account_no"
                label="Account Number"
                value={loanDetails.account_no}
                onChange={handleChange}
                fullWidth
                style={{ marginBottom: "10px" }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={18} md={6}>
            <TextField
              name="bank_details"
              label="Bank Details"
              value={loanDetails.bank_details}
              onChange={handleChange}
              fullWidth
              style={{ marginBottom: "10px" }}
            />
          </Grid>

          {/* Other form fields */}
          <Grid item xs={6}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{
                marginBottom: "30",
                marginLeft: "25px",
                padding: "10px 14px",
                fontSize: "1.1rem",
              }}
            >
              Update Loan Application
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default UpdateLoanForm;
