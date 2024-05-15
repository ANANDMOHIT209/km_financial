import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import "./AllLoansDetails.css";

const UpdatedLoanHistory = () => {
  const [loanHistory, setLoanHistory] = useState([]);
  const [pagination, setPagination] = useState({
    sort_by: 'id',
    sort_order: 'asc',
    page_no: 0,
    limit: 5,
  });
  const history = useHistory();

  const handleSortChange = (e) => {
    setPagination({ ...pagination, sort_by: e.target.value });
  };

  const handleOrderChange = (e) => {
    setPagination({ ...pagination, sort_order: e.target.value });
  };

  const handlePageChange = (page_no) => {
    setPagination((prevState) => ({ ...prevState, page_no }));
  };

  const handleLimitChange = (limit) => {
    setPagination({ ...pagination, limit });
  };

  const fetchLoanHistory = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const headers = {
        token: `${accessToken}`,
        "Content-Type": "application/json",
      };
      const response = await axios.post(
        'http://localhost:8000/all_loan_history_pg',
        pagination,
        { headers }
      );
      setLoanHistory(response.data.loans);
    } catch (error) {
      console.error('Error fetching loan history:', error);
    }
  };

  useEffect(() => {
    fetchLoanHistory();
  }, [pagination]);

  const deleteLoanAndRedirect = async (loanId) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const headers = {
        token: `${accessToken}`,
        "Content-Type": "application/json",
      };
      await axios.delete(`http://127.0.0.1:8000/delete_loan/${loanId}`, { headers });
      history.push('/all_loan_history_pg');
    } catch (error) {
      console.error('Failed to delete loan:', error);
    }
  };

  const approveLoanAndRedirect = async (loanId) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const headers = {
        token: `${accessToken}`,
        "Content-Type": "application/json",
      };
      await axios.put(`http://127.0.0.1:8000/approve_loan/${loanId}`, null, { headers });
      history.push('/all_loan_history_pg');
    } catch (error) {
      console.error('Failed to approve loan:', error);
    }
  };

  const rejectLoanAndRedirect = async (loanId) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const headers = {
        token: `${accessToken}`,
        "Content-Type": "application/json",
      };
      await axios.put(`http://127.0.0.1:8000/loan/${loanId}/reject`, null, { headers });
      history.push('/all_loan_history_pg');
    } catch (error) {
      console.error('Failed to reject loan:', error);
    }
  };

  return (
    <div className="updated-main-container">
      <div className="updated-loan-history-container">
        <h1 className="updated-loan-history-header">Loan History</h1>
        <div className="updated-loan-history-item">
          <table>
            <thead>
              <tr>
                <th className="updated-table-header">Loan Id</th>
                <th className="updated-table-header">PAN Number</th>
                <th className="updated-table-header">Aadhar Number</th>
                <th className="updated-table-header">Loan Amount</th>
                <th className="updated-table-header">Loan Status</th>
                <th className="updated-table-header">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loanHistory.map((item, index) => (
                <tr key={index}>
                  <td className="updated-value">{item.id}</td>
                  <td className="updated-value">{item.pan_no}</td>
                  <td className="updated-value">{item.aadhar_no}</td>
                  <td className="updated-value">{item.loan_amount}</td>
                  <td className="updated-value">{item.status}</td>
                  <td className="updated-value">
                    <button
                      className="updated-profile-card__button updated-button--blue"
                      onClick={() => history.push(`/loandetailsbyadmin/${item.id}`)}
                    >
                      View Details
                    </button>
                    <button
                      className="updated-profile-card__button updated-button--green"
                      onClick={() => approveLoanAndRedirect(item.id)}
                    >
                      Approved
                    </button>
                    <button
                      className="updated-profile-card__button updated-button--red"
                      onClick={() => rejectLoanAndRedirect(item.id)}
                    >
                      Rejected
                    </button>
                    <button
                      className="updated-profile-card__button updated-button--orange"
                      onClick={() => deleteLoanAndRedirect(item.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="updated-user-container">
        <button
          className="updated-profile-card__button updated-button--blue updated-nxt-btn"
          onClick={() => handlePageChange(pagination.page_no - 1)}
        >
          Previous Page
        </button>
        <button
          className="updated-profile-card__button updated-button--blue updated-nxt-btn"
          onClick={() => handlePageChange(pagination.page_no + 1)}
        >
          Next Page
        </button>
        <input
          type="number"
          value={pagination.limit}
          onChange={(e) => handleLimitChange(parseInt(e.target.value))}
          onWheel={(e) => e.currentTarget.blur()} // Prevent scroll behavior on mouse wheel
        />
      </div>
    </div>
  );
};

export default UpdatedLoanHistory;
