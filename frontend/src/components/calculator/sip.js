import React, { useState } from "react";
import { TextField, Button, Grid, Typography, Container, Box } from "@mui/material";
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { PieChart } from '@mui/x-charts/PieChart';

const SIPCalculator = () => {
 const history = useHistory();
 const [loanDetails, setLoanDetails] = useState({
    principal: 10000,
    interest_rate: 5.0,
    tenure: 12,
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
        "token": `${accessToken}`,
        "Content-Type": "application/json",
      };
      const response = await axios.post(
        "http://localhost:8000/loan/sipcalculate",
        loanDetails,
        { headers }
      );
      console.log(response.data)
      setCalculationResult(response.data); // Store calculation result
    } catch (error) {
      alert("Error calculating loan:", error.response.data.detail);
    }
 };

 
 return (
    <Container maxWidth="md">
      <form onSubmit={handleSubmit}>
        <Grid container spacing={4} sx={{ padding: "20px", margin: "20px", backgroundColor: "#f0f0f0" }}>
          <Grid item xs={12}>
            <Typography variant="h5">SIP Calculator</Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="number"
              id="principal"
              name="principal"
              label="Monthly Investment"
              value={loanDetails.principal}
              onChange={handleChange}
              fullWidth
              placeholder="Rs. 10000"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="number"
              id="interest_rate"
              name="interest_rate"
              label="Interest Rate (%)"
              value={loanDetails.interest_rate}
              onChange={handleChange}
              fullWidth
              placeholder="5.0"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="number"
              id="tenure"
              name="tenure"
              label="Tenure (years)"
              value={loanDetails.tenure}
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
      
      {/* Display calculation result */}
      {calculationResult && (
        <Grid container spacing={4}>
          <Grid item xs={6}>
            <Box sx={{ padding: "20px", margin: "20px"}}>
              <Typography variant="h6">Calculation Result</Typography>
              <Typography>Invested Amount: {calculationResult.principal}</Typography>
              <Typography>Estimated Return: {calculationResult.estimatate_return}</Typography>
              <Typography>Total Return: {calculationResult.total_return}</Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box sx={{ padding: "20px", margin: "20px"}}>
              <PieChart
                series={[
                  {
                    data: [
                      { id: 0, value: calculationResult.principal, label: 'Invested Amount' },
                      { id: 1, value: calculationResult.estimatate_return, label: 'Estimated Return' },
                    ],
                  },
                ]}
                width={400}
                height={200}
              />
            </Box>
          </Grid>
        </Grid>
      )}
    </Container>
 );
};

export default SIPCalculator;
