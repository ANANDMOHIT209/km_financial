import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Container,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  tableCellClasses,
  TableContainer,
  TableRow,
} from "@mui/material";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { PieChart } from "@mui/x-charts/PieChart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import sampleImage from './/../../assets/images/emi.png'; // replace with your actual image path

const EmiCalculator = () => {
  const history = useHistory();
  const [loanDetails, setLoanDetails] = useState({
    loan_amount: 10000.0,
    annual_interest_rate: 7.5,
    loan_term: 12,
  });
  const [calculationResult, setCalculationResult] = useState(null);

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
      setCalculationResult(response.data);
    } catch (error) {
      alert("Error calculating loan:", error.response.data.detail);
    }
  };

  const generateAmortizationData = () => {
    if (!calculationResult) return [];

    const monthlyInterestRate = loanDetails.annual_interest_rate / 12 / 100;
    const monthlyPayment = calculationResult.monthly_payment;
    let balance = loanDetails.loan_amount;
    const data = [];

    for (let month = 1; month <= loanDetails.loan_term; month++) {
      const interestPayment = balance * monthlyInterestRate;
      const principalPayment = monthlyPayment - interestPayment;
      balance -= principalPayment;
      data.push({
        month,
        principalPayment: principalPayment.toFixed(2),
        interestPayment: interestPayment.toFixed(2),
        balance: balance.toFixed(2),
      });
    }

    return data;
  };

  return (
    <Box
      sx={{
        backgroundColor: "#1a1a1a",
        color: "#fff",
        marginTop: "20px",
        minHeight: "100vh",
        padding: "40px",
      }}
    >
      <Container maxWidth="lg">
      <Typography variant="h1" gutterBottom align="center" sx={{ fontWeight: 'bold',  fontSize: '3rem' }}>
      EMI Calculator
            </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <Paper elevation={3} sx={{ padding: "30px", margin: "60px", backgroundColor: "#fff" }}>
              <Typography variant="h6" gutterBottom align="center" sx={{ fontWeight: 'bold', fontSize: '1.2rem',  paddingBottom: '20px' }}>
              
              </Typography>

              <form onSubmit={handleSubmit}>
                <Grid container spacing={4}>
                  <Grid item xs={12}>
                    <TextField
                      id="loan_amount"
                      name="loan_amount"
                      label="Loan Amount"
                      value={loanDetails.loan_amount}
                      onChange={handleChange}
                      fullWidth
                      placeholder="Rs. 10000"
                      InputLabelProps={{
                        style: { color: "#000" },
                      }}
                      InputProps={{
                        style: { color: "#000" },
                      }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      id="annual_interest_rate"
                      name="annual_interest_rate"
                      label="Annual Interest Rate (%)"
                      value={loanDetails.annual_interest_rate}
                      onChange={handleChange}
                      fullWidth
                      placeholder="5.0"
                      InputLabelProps={{
                        style: { color: "#000" },
                      }}
                      InputProps={{
                        style: { color: "#000" },
                      }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      id="loan_term"
                      name="loan_term"
                      label="Loan Term (months)"
                      value={loanDetails.loan_term}
                      onChange={handleChange}
                      fullWidth
                      placeholder="12"
                      InputLabelProps={{
                        style: { color: "#000" },
                      }}
                      InputProps={{
                        style: { color: "#000" },
                      }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                      Calculate
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6} display="flex" alignItems="center" justifyContent="center">
            <img src={sampleImage} alt="Sample" style={{ width: "100%", height: "auto", paddingBottom: '50px', maxHeight: "150%"  }} />
          </Grid>
        </Grid>

        {calculationResult && (
          <Paper elevation={3} sx={{ padding: "20px", marginTop: "20px", backgroundColor: "#fff", width: "auto" }}>
            <Typography variant="h1" gutterBottom align="center" sx={{ fontWeight: 'bold', marginTop: "20px", fontSize: '1.8rem', paddingBottom: '20px' }}>
              Calculation Result
            </Typography>


            <Grid container spacing={4} justifyContent="center">
              <Grid item xs={12} sm={7} display="flex" justifyContent="center">

                <TableContainer component={Paper} sx={{ backgroundColor: "#1a1a1a", padding: "10px", margin: "10px", maxWidth: "600px", borderRadius: '16px' }}>
                  <Typography variant="h6" gutterBottom align="center" sx={{ fontWeight: 'bold', fontSize: '1.5rem', marginTop: "20px", paddingBottom: '20px', color: 'white' }}>
                    Principal and Interest Summary
                  </Typography>
                  <Table style={{ margin: 'auto', marginBottom: '40px', padding: '10px', maxWidth: '500px', }}>

                    <TableBody>

                      <TableRow>
                        <TableCell align="left" sx={{ backgroundColor: "#ffcccc" }}>Principal</TableCell>
                        <TableCell align="right" sx={{ backgroundColor: "#ffcccc" }}>{calculationResult.principal.toFixed(2)}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell align="left" sx={{ backgroundColor: "#ccccff" }}>Interest</TableCell>
                        <TableCell align="right" sx={{ backgroundColor: "#ccccff" }}>{calculationResult.interest.toFixed(2)}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell align="left" sx={{ backgroundColor: "#ccffcc" }}>Monthly Payment</TableCell>
                        <TableCell align="right" sx={{ backgroundColor: "#ccffcc" }}>{calculationResult.monthly_payment.toFixed(2)}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell align="left" sx={{ backgroundColor: "#ffffcc" }}>Total Repayment</TableCell>
                        <TableCell align="right" sx={{ backgroundColor: "#ffffcc" }}>{calculationResult.total_repayment.toFixed(2)}</TableCell>
                      </TableRow>
                    </TableBody>

                  </Table>

                </TableContainer>
              </Grid>

              <Grid item xs={12} sm={4} display="flex" justifyContent="center">
                <PieChart
                  series={[
                    {
                      data: [
                        { id: 0, value: calculationResult.principal, label: "Principal" },
                        { id: 1, value: calculationResult.interest, label: "Interest" },
                      ],
                      outerRadius: "100%",
                      colors: ["#9FCDFF", "#5284FF"], // Change colors here
                    },
                  ]}
                  width={300}
                  height={300}
                />
              </Grid>
            </Grid>


            <Typography variant="h6" gutterBottom align="center" sx={{ fontWeight: 'bold', fontSize: '1.5rem', marginTop: "20px", padding: '40px' }}>
              Amortization Schedule
            </Typography>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '350px' }}>
              <ResponsiveContainer width="80%" height={300}>
                <LineChart data={generateAmortizationData()}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="principalPayment" stroke="#82ca9d" />
                  <Line type="monotone" dataKey="interestPayment" stroke="#8884d8" />
                  <Line type="monotone" dataKey="balance" stroke="#ff7300" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Paper>
        )}
      </Container>
    </Box>
  );
};

export default EmiCalculator;
