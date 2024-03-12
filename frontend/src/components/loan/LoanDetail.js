// LoanDetails.js
import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

const LoanDetails = () => {
 const { loanId } = useParams();
 const [loan, setLoan] = useState({});
 const history = useHistory();
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
          {headers},
         );
        setLoan(response.data.message);
      } catch (error) {
        console.error('Error fetching loan details:', error);
      }
    };

    fetchLoanDetails();
 }, [history]);

 if (!loan) return <div>Loading...</div>;

 return (
    <div>
      <h2>Loan Details</h2>
      <p>Loan ID: {loan.loan_id}</p>
      <p>Name: {loan.name}</p>
      <p>Phone: {loan.phone}</p>
      <p>Email: {loan.email}</p>
      <p>Gender: {loan.gender}</p>
      <p>Pincode: {loan.pincode}</p>
      <p>State: {loan.state}</p>
      <p>Address: {loan.address}</p>
      <p>Aadhar Number: {loan.aadhar_no}</p>
      <p>Pan Number: {loan.pan_no}</p>
      <p>Bank name: {loan.bank_details}</p>
      <p>Account Number: {loan.account_no}</p>
      <p>IFSC code: {loan.ifsc_code}</p>
      <p>Loan Amount: {loan.loan_amount}</p>
      <p>annual Interest rate: {loan.annual_interest_rate}</p>
      <p>Loan Type: {loan.loan_type}</p>
      <p>Loan Term: {loan.loan_term}</p>
      <p>Employment Details: {loan.employment_details}</p>
      <p>Status: {loan.status}</p>
      
    </div>
 );
};

export default LoanDetails;
