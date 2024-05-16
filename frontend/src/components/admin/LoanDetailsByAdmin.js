import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import "./LoanDetailsByAdmin.css";

const LoanDetailsByAdmin = () => {
  const { loanId } = useParams();
  const [loan, setLoan] = useState({});
  const history = useHistory();

  const handleLoanAction = async (action) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const headers = {
        token: `${accessToken}`,
        "Content-Type": "application/json",
      };
      const url = `http://127.0.0.1:8000/${action}_loan/${loanId}`;
      await axios.put(url, null, { headers });
      history.push('/all_loan_history_pg');
    } catch (error) {
      console.error(`Failed to ${action} loan:`, error);
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
  }, [loanId]);

  if (!loan) return <div>Loading...</div>;

  return (
    <div className="loan-details-admin-container">
      <h2 className="loan-details-admin-heading">Loan Details</h2>
      <div className="loan-details-admin-table-container">
        <table className="loan-details-admin-table">
          <tbody>
            <tr>
              <td className="loan-details-admin-label" colSpan="2.5">Loan ID:</td>
              <td className="loan-details-admin-value">{loan.loan_id}</td>
              
            </tr>
            <tr> 
             <td className="loan-details-admin-label">Name:</td>
              <td className="loan-details-admin-value">{loan.name}</td>             
              <td className="loan-details-admin-label">Gender:</td>
              <td className="loan-details-admin-value">{loan.gender}</td>              
            </tr>
            <tr>
              <td className="loan-details-admin-label">Phone:</td>
              <td className="loan-details-admin-value">{loan.phone}</td>
              <td className="loan-details-admin-label"  >Email:</td>
              <td className="loan-details-admin-value">{loan.email}</td>
            </tr>
            <tr>
              
            </tr>
            <tr>
              <td className="loan-details-admin-label">State:</td>
              <td className="loan-details-admin-value">{loan.state}</td>
              <td className="loan-details-admin-label">Pincode:</td>
              <td className="loan-details-admin-value">{loan.pincode}</td>
            </tr>
            <tr>
              <td className="loan-details-admin-label">Aadhar Number:</td>
              <td className="loan-details-admin-value">{loan.aadhar_no}</td>
              <td className="loan-details-admin-label">Pan Number:</td>
              <td className="loan-details-admin-value">{loan.pan_no}</td>
            </tr>            
            <tr>
              <td className="loan-details-admin-label">Address:</td>
              <td className="loan-details-admin-value">{loan.address}</td>
              <td className="loan-details-admin-label">Bank name:</td>
              <td className="loan-details-admin-value">{loan.bank_details}</td>
            </tr>
            <tr>
              <td className="loan-details-admin-label">Account Number:</td>
              <td className="loan-details-admin-value">{loan.account_no}</td>
              <td className="loan-details-admin-label">Loan Amount:</td>
              <td className="loan-details-admin-value">{loan.loan_amount}</td>
            </tr>
            <tr>
              <td className="loan-details-admin-label">IFSC code:</td>
              <td className="loan-details-admin-value">{loan.ifsc_code}</td>
              <td className="loan-details-admin-label">Annual Interest rate:</td>
              <td className="loan-details-admin-value">{loan.annual_interest_rate}</td>
            </tr>
            <tr>
             
            </tr>
            <tr>
              <td className="loan-details-admin-label">Loan Type:</td>
              <td className="loan-details-admin-value">{loan.loan_type}</td>
              <td className="loan-details-admin-label">Loan Term: (in Months)</td>
              <td className="loan-details-admin-value">{loan.loan_term}</td>
            </tr>
            <tr>
              <td className="loan-details-admin-label">Employment Details:</td>
              <td className="loan-details-admin-value">{loan.employment_details}</td>
              <td className="loan-details-admin-label">Status:</td>
              <td className="loan-details-admin-value">{loan.status}</td>
            </tr>
            
            <tr>
              <td className="loan-details-admin-actions" colSpan="4">
                <button className="loan-details-admin-button loan-details-admin-button-approve" onClick={() => handleLoanAction('approve')}>
                  Approve
                </button>
                <button className="loan-details-admin-button loan-details-admin-button-reject" onClick={() => handleLoanAction('reject')}>
                  Reject
                </button>
                <button className="loan-details-admin-button loan-details-admin-button-delete" onClick={() => handleLoanAction('delete')}>
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
