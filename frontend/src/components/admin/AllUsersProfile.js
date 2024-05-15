import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
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
    <div className="aup-main-container">
      <div className="aup-loan-history-container">        
        <h1 className="aup-loan-history-header">All Registered Users</h1>
        <div className="aup-loan-history-item">
          <table>
            <thead>
              <tr>
                <th className="aup-table-header">Name</th>
                <th className="aup-table-header">Email ID</th>
                <th className="aup-table-header">Phone Number</th>
                <th className="aup-table-header">Address</th>
                <th className="aup-table-header">State</th>
                <th className="aup-table-header">Details</th>
              </tr>
            </thead>
            <tbody>
              {usersProfile.map((item, index) => (
                <tr key={index}>
                  <td className="aup-table-cell aup-value">{item.name}</td>
                  <td className="aup-table-cell aup-value">{item.email}</td>
                  <td className="aup-table-cell aup-value">{item.phone}</td>
                  <td className="aup-table-cell aup-value">{item.address_detail}</td>
                  <td className="aup-table-cell aup-value">{item.state}</td>
                  <td className="aup-table-cell aup-value">
                    <button className="aup-profile-card__button aup-button-view-detail-blue" onClick={() => history.push(`/userprofilebyadmin/${item.id}`)}>
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="aup-user-container">
        <button className="aup-profile-card__button aup-button--blue" onClick={() => handlePageChange(pagination.page_no - 1)}>Previous Page</button>
        <button className="aup-profile-card__button aup-button--blue" onClick={() => handlePageChange(pagination.page_no + 1)}>Next Page</button>
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
