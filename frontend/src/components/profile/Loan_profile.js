import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "./UserProfile.css"; // Import your CSS file

const LoanHistory = () => {
  const [loanHistory, setLoanHistory] = useState([]);
  const history = useHistory();
  useEffect(() => {
    const loadLoanHistory = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");

        const headers = {
          token: `${accessToken}`,
          "Content-Type": "application/json",
        };

        const response = await axios.get(
          "http://localhost:8000/loan/history", // You might need to adjust this based on your API's requirements
          { headers } // Pass headers as part of the config object
        );
        setLoanHistory(response.data);
      } catch (error) {
        alert("Error fetching profile data:", error);
        // Handle error, e.g., redirect to login if not authenticated
        // history.push('/signin');
      }
    };
    loadLoanHistory();
  }, [history]);

  return (
    <div className="loan-history-container">
      <h2 className="loan-history-heading">Loan History</h2>
      {loanHistory.length === 0 ? (
        <div className="loan-history-message">
          <p>No loan history found. Apply for a new loan now!</p>
          <button onClick={() => history.push("/applyloan")}>
            Apply for a Loan
          </button>
        </div>
      ) : (
        <table className="loan-history-table">
          <thead>
            <tr>
              <th>Loan ID</th>
              <th>Name</th>
              <th>Loan Amount</th>
              <th>Loan Type</th>
              <th>Status</th>
              <th>View Details</th>
              <th>Update Details</th>
            </tr>
          </thead>
          <tbody>
            {loanHistory.map((loan) => (
              <tr key={loan.loan_id}>
                <td>{loan.loan_id}</td>
                <td>{loan.name}</td>
                <td>{loan.loan_amount}</td>
                <td>{loan.loan_type}</td>
                <td>{loan.status}</td>
                <td>
                  <button
                    className="view-details-btn"
                    onClick={() => history.push(`/loan/${loan.loan_id}`)}
                  >
                    View Details
                  </button>
                </td>
                <td>
                  <button
                    className="update-details-btn"
                    onClick={() => history.push(`/loan-update/${loan.loan_id}`)}
                  >
                    Update Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default LoanHistory;
