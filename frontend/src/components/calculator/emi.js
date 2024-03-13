import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Container,
  Box,
} from "@mui/material";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { PieChart } from "@mui/x-charts/PieChart";

const EmiCalculator = () => {
  const history = useHistory();
  const [loanDetails, setLoanDetails] = useState({
    loan_amount: 10000.0,
    annual_interest_rate: 7.5,
    loan_term: 12,
  });
  const [calculationResult, setCalculationResult] = useState(null); // State to store calculation result

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
      const response = await axios.post(
        "http://localhost:8000/loan/calculate",
        loanDetails,
        { headers }
      );
      console.log(response.data);
      setCalculationResult(response.data); // Store calculation result
    } catch (error) {
      alert("Error calculating loan:", error.response.data.detail);
    }
  };

  return (
    <Container maxWidth="md">
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={6}>
          <form onSubmit={handleSubmit}>
            <Grid
              container
              spacing={4}
              sx={{
                padding: "20px",
                marginTop: "20px",
                backgroundColor: "#f0f0f0",
              }}
            >
              <Grid item xs={12}>
                <Typography variant="h5">EMI Calculator</Typography>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  type="number"
                  id="loan_amount"
                  name="loan_amount"
                  label="Loan Amount"
                  value={loanDetails.loan_amount}
                  onChange={handleChange}
                  fullWidth
                  placeholder="Rs. 10000"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  type="number"
                  id="annual_interest_rate"
                  name="annual_interest_rate"
                  label="Annual Interest Rate (%)"
                  value={loanDetails.annual_interest_rate}
                  onChange={handleChange}
                  fullWidth
                  placeholder="5.0"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  type="number"
                  id="loan_term"
                  name="loan_term"
                  label="Loan Term (months)"
                  value={loanDetails.loan_term}
                  onChange={handleChange}
                  fullWidth
                  placeholder="12"
                />
              </Grid>

              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary">
                  Calculate
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>

        {calculationResult && (
          <Grid item xs={6}>
            <Box
              sx={{
                padding: "20px",
                margin: "20px",
                backgroundColor: "#f0f0f0",
              }}
            >
              <Typography variant="h6">Calculation Result</Typography>
              <Typography>
                Monthly Payment: {calculationResult.principal}
              </Typography>
              <Typography>
                Total Repayment: {calculationResult.interest}
              </Typography>
              <Typography>
                Monthly Payment: {calculationResult.monthly_payment}
              </Typography>
              <Typography>
                Total Repayment: {calculationResult.total_repayment}
              </Typography>

              <PieChart
                series={[
                  {
                    data: [
                      {
                        id: 0,
                        value: calculationResult.principal,
                        label: "Principal",
                      },
                      {
                        id: 1,
                        value: calculationResult.interest,
                        label: "Interest",
                      },
                    ],
                  },
                ]}
                width={300}
                height={150}
              />
            </Box>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default EmiCalculator;
