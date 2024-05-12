import React, { useState } from 'react';
import axios from 'axios'; // Assuming you're using Axios for HTTP requests

const AllLoanHistory = () => {
  const [loanHistory, setLoanHistory] = useState([]);
  const [pagination, setPagination] = useState({
    sort_by: 'id',
    sort_order: 'desc',
    page_no: 0,
    limit: 50
  });

  const handleSortChange = (e) => {
    setPagination({...pagination, sort_by: e.target.value });
  };

  const handleOrderChange = (e) => {
    setPagination({...pagination, sort_order: e.target.value });
  };

  const handlePageChange = (page_no) => {
    setPagination({...pagination, page_no });
  };

  const handleLimitChange = (limit) => {
    setPagination({...pagination, limit });
  };

  const fetchLoanHistory = async () => {
    try {
        const accessToken = localStorage.getItem("accessToken");
        const headers = {
          token: `${accessToken}`,
          "Content-Type": "application/json",
        };
        const response = await axios.post(
            'http://localhost:8000/all_loan_history_pg', // Adjusted to use the new endpoint
            pagination,
            { headers }
          );
      setLoanHistory(response.data.loans);
    } catch (error) {
      console.error('Error fetching loan history:', error);
    }
  };

  // Example usage of pagination controls
  return (
    <div>
      <select onChange={handleSortChange}>
        <option value="id">ID</option>
        <option value="loan_amount">Loan Amount</option>
        {/* Add other fields as needed */}
      </select>
      <select onChange={handleOrderChange}>
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
      <button onClick={() => handlePageChange(pagination.page_no + 1)}>Next Page</button>
      <button onClick={() => handlePageChange(pagination.page_no - 1)}>Previous Page</button>
      <input type="number" value={pagination.limit} onChange={(e) => handleLimitChange(parseInt(e.target.value))} />
      <button onClick={fetchLoanHistory}>Fetch Loan History</button>

      {/* Render loan history */}
      <ul>
        {loanHistory.map(loan => (
            <li key={loan.id}>
            {Object.entries(loan).map(([key, value]) => (
                <p key={key}>{`${key}: ${value}`}</p>
            ))}
            </li>
        ))}
      </ul>
    </div>
  );
};

export default AllLoanHistory;
