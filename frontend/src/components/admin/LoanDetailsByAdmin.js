// LoanDetails.js
import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import "../loan/LoanDetails.css";

const LoanDetailsByAdmin = () => {
  const { loanId } = useParams();
  console.log(loanId)
  const [loan, setLoan] = useState({});
  const history = useHistory();

  const deleteLoanAndRedirect = async (loanId) => {
    try {
      // Send a DELETE request to the server
      const accessToken = localStorage.getItem("accessToken");
      const headers = {
        token: `${accessToken}`,
        "Content-Type": "application/json",
      };
      const response = await axios.delete(
          `http://127.0.0.1:8000/delete_loan/${loanId}`,
          { headers }
        );
     

      // Redirect to the all_user_profile page after successful deletion
      history.push('/all_loan_history_pg');
    } catch (error) {
      console.error('Failed to delete user:', error);
      // Optionally, handle the error, e.g., show a message to the user
    }
  };
  const approveLoanAndRedirect = async (loanId) => {
    try {
      // Retrieve the access token from local storage
      const accessToken = localStorage.getItem("accessToken");
  
      // Define the headers with the access token
      const headers = {
        token: `${accessToken}`,
        "Content-Type": "application/json",
      };
  
      // Construct the URL for the API endpoint
      const url = `http://127.0.0.1:8000/approve_loan/${loanId}`;
  
      // Use the axios configuration object to send the PUT request
      const response = await axios({
        method: 'put',
        url: url,
        headers: headers,
        // Include any additional parameters or data required by the API endpoint
        // params: {}, // Uncomment and fill in if needed
      });
  
      // Redirect to the all_user_profile page after successful approval
      history.push('/all_loan_history_pg');
    } catch (error) {
      console.error('Failed to approve loan:', error);
      // Optionally, handle the error, e.g., show a message to the user
    }
  };
  
  const rejectLoanAndRedirect = async (loanId) => {
    try {
      // Send a DELETE request to the server
      const accessToken = localStorage.getItem("accessToken");
    const headers = {
      token: `${accessToken}`,
      "Content-Type": "application/json",
    };
      const url = `http://127.0.0.1:8000/loan/${loanId}/reject`;
  
      // Use the axios configuration object to send the PUT request
      const response = await axios({
        method: 'put',
        url: url,
        headers: headers,
        // Include any additional parameters or data required by the API endpoint
        // params: {}, // Uncomment and fill in if needed
      });
     

      // Redirect to the all_user_profile page after successful deletion
      history.push('/all_loan_history_pg');
    } catch (error) {
      console.error('Failed to delete user:', error);
      // Optionally, handle the error, e.g., show a message to the user
    }
  };

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
          { headers }
        );
        setLoan(response.data.message);
      } catch (error) {
        console.error("Error fetching loan details:", error);
      }
    };

    fetchLoanDetails();
  }, [history]);

  if (!loan) return <div>Loading...</div>;

  return (
    <div className="loan-details-container">
      <h2 className="loan-details-heading">Loan Details</h2>
      <div className="loan-details-table-container">
        <table className="loan-details-table">
          <tbody>
            <tr>
              <td className="loan-details-label">Loan ID:</td>
              <td className="loan-details-value">{loan.loan_id}</td>
            </tr>
            <tr>
              <td className="loan-details-label">Name:</td>
              <td className="loan-details-value">{loan.name}</td>
            </tr>
            <tr>
              <td className="loan-details-label">Phone:</td>
              <td className="loan-details-value">{loan.phone}</td>
            </tr>
            <tr>
              <td className="loan-details-label">Email:</td>
              <td className="loan-details-value">{loan.email}</td>
            </tr>
            <tr>
              <td className="loan-details-label">Gender:</td>
              <td className="loan-details-value">{loan.gender}</td>
            </tr>
            <tr>
              <td className="loan-details-label">Pincode:</td>
              <td className="loan-details-value">{loan.pincode}</td>
            </tr>
            <tr>
              <td className="loan-details-label">State:</td>
              <td className="loan-details-value">{loan.state}</td>
            </tr>
            <tr>
              <td className="loan-details-label">Address:</td>
              <td className="loan-details-value">{loan.address}</td>
            </tr>
            <tr>
              <td className="loan-details-label">Aadhar Number:</td>
              <td className="loan-details-value">{loan.aadhar_no}</td>
            </tr>
            <tr>
              <td className="loan-details-label">Pan Number:</td>
              <td className="loan-details-value">{loan.pan_no}</td>
            </tr>
            <tr>
              <td className="loan-details-label">Bank name:</td>
              <td className="loan-details-value">{loan.bank_details}</td>
            </tr>
            <tr>
              <td className="loan-details-label">Account Number:</td>
              <td className="loan-details-value">{loan.account_no}</td>
            </tr>
            <tr>
              <td className="loan-details-label">IFSC code:</td>
              <td className="loan-details-value">{loan.ifsc_code}</td>
            </tr>
            <tr>
              <td className="loan-details-label">Loan Amount:</td>
              <td className="loan-details-value">{loan.loan_amount}</td>
            </tr>
            <tr>
              <td className="loan-details-label">Annual Interest rate:</td>
              <td className="loan-details-value">
                {loan.annual_interest_rate}
              </td>
            </tr>
            <tr>
              <td className="loan-details-label">Loan Type:</td>
              <td className="loan-details-value">{loan.loan_type}</td>
            </tr>
            <tr>
              <td className="loan-details-label">Loan Term: (in Months)</td>
              <td className="loan-details-value">{loan.loan_term}</td>
            </tr>
            <tr>
              <td className="loan-details-label">Employment Details:</td>
              <td className="loan-details-value">{loan.employment_details}</td>
            </tr>
            <tr>
              <td className="loan-details-label">Status:</td>
              <td className="loan-details-value">{loan.status}</td>
            </tr>
            <tr>
            <td className="table-cell value">
                <button className="profile-card__button button--blue" onClick={() => approveLoanAndRedirect(loan.loan_id)}>
                      Approved
                </button>
                <button className="profile-card__button button--blue" onClick={() => rejectLoanAndRedirect(loan.loan_id)}>
                      Rejected
                </button>
                <button className="profile-card__button button--blue" onClick={() => deleteLoanAndRedirect(loan.loan_id)}>
                      Delete
                </button>
            </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LoanDetailsByAdmin;
