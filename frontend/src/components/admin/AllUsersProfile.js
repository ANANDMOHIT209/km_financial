import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./AllUsersProfile.css";

const AllUsersProfile = () => {
  const [usersProfile, setUsersProfile] = useState([]);
  const [pagination, setPagination] = useState({
    sort_by: 'id',
    sort_order: 'asc',
    page_no: 0,
    limit: 5,
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

  const fetchUsersProfile = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const headers = {
        token: `${accessToken}`,
        "Content-Type": "application/json",
      };
      const response = await axios.post(
        'http://localhost:8000/all_users_profile_pg',
        pagination,
        { headers }
      );
      setUsersProfile(response.data.users);
    } catch (error) {
      console.error('Error fetching users profile:', error);
    }
  };

  useEffect(() => {
    fetchUsersProfile(); // Fetch data when component mounts or pagination changes
  }, [pagination]); // Watch for changes in pagination state

  return (
    <div className="main-container">
      <div className="loan-history-container">        
  <h1 className="loan-history-header">Users</h1>
  <div className="loan-history-item">
    <table>
      <thead>
        <tr>
          <th className="table-header">Name</th>
          <th className="table-header">Email ID</th>
          <th className="table-header">Phone Number</th>
          <th className="table-header">Address</th>
          <th className="table-header">State</th>
          <th className="table-header">Details</th>
        </tr>
      </thead>
      <tbody>
        {usersProfile.map((item, index) => (
          <tr key={index}>
            <td className="table-cell value">{item.name}</td>
            <td className="table-cell value">{item.email}</td>
            <td className="table-cell value">{item.phone}</td>
            <td className="table-cell value">{item.address_detail}</td>
            <td className="table-cell value">{item.state}</td>
            <td className="table-cell value">
              <button className="profile-card__button button--blue">
                View Details
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
      <div className="usercontainer">
        <button className="profile-card__button button--blue" onClick={() => handlePageChange(pagination.page_no - 1)}>Previous Page</button>
        <button className="profile-card__button button--blue" onClick={() => handlePageChange(pagination.page_no + 1)}>Next Page</button>
        <input
          type="number"
          value={pagination.limit}
          onChange={(e) => handleLimitChange(parseInt(e.target.value))}
          onWheel={(e) => e.currentTarget.blur()}
        />
      </div>
    </div>
  );
};

export default AllUsersProfile;
