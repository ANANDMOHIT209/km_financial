import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Assuming you're using Axios for HTTP requests
import "./AllLoansDetails.css";

const AllLoanHistory = () => {
  const [loanHistory, setLoanHistory] = useState([]);
  const [pagination, setPagination] = useState({
    sort_by: 'id',
    sort_order: 'desc',
    page_no: 0,
    limit: 2,
  });

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
  }, [pagination]); // Fetch data whenever pagination changes

  return (
    <div className="main-container">
      <div className="loan-history-container">
        {loanHistory.map((loan, index) => (
          <div key={index} className="loan-history-item">
            <table>
              <tbody>
                {Object.entries(loan).map(([key, value]) => (
                  <tr key={key} className="key-value-pair">
                    <td className="key">{key}:</td>
                    <td className="value">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>

      <div className="container">
        {/* <select className="select-box" onChange={handleSortChange}>
          <option value="id">ID</option>
          <option value="loan_amount">Loan Amount</option>          
        </select>
        <select className="select-box" onChange={handleOrderChange}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select> */}
        <button className="profile-card__button button--blue" onClick={() => handlePageChange(pagination.page_no - 1)}>Previous Page</button>
        <button className="profile-card__button button--blue" onClick={() => handlePageChange(pagination.page_no + 1)}>Next Page</button>
        <input
          type="number"
          value={pagination.limit}
          onChange={(e) => handleLimitChange(parseInt(e.target.value))}
          onWheel={(e) => e.currentTarget.blur()} // Prevent scroll behavior on mouse wheel
        />
        {/* <button onClick={fetchLoanHistory}>Fetch Loan History</button> */}
      </div>
    </div>
  );
};

export default AllLoanHistory;
