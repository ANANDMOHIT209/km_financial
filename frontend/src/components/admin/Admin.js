import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Admin = () => {
  const [usersData, setUsersData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState("id");
  const [sortOrder, setSortOrder] = useState("desc");
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    fetchUsersData();
  }, [currentPage, sortBy, sortOrder, limit]);

  const fetchUsersData = async () => {
    try {
      const response = await axios.post('http://localhost:8000/all_users_profile_pg', {
        params: {
          sort_by: sortBy,
          sort_order: sortOrder,
          page_no: currentPage,
          limit : limit
        }
      });
      setUsersData(response.data.users);
      setTotalPages(response.data.total_pages);
    } catch (error) {
      console.error('Error fetching users data:', error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSortChange = (e) => {
    const { value } = e.target;
    const [sortByValue, sortOrderValue] = value.split('_');
    setSortBy(sortByValue);
    setSortOrder(sortOrderValue);
  };

  return (
    <div>
      <h1>All Users Profile Page</h1>
      <select value={`${sortBy}_${sortOrder}`} onChange={handleSortChange}>
        <option value="id_desc">ID (Descending)</option>
        <option value="id_asc">ID (Ascending)</option>
        {/* Add more options for other fields */}
      </select>
      <ul>
        {usersData.map(user => (
          <li key={user.id}>
            <div>ID: {user.id}</div>
            <div>Name: {user.name}</div>
            {/* Add more user details as needed */}
          </li>
        ))}
      </ul>
      <div>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(page => (
          <button key={page} onClick={() => handlePageChange(page)}>{page}</button>
        ))}
      </div>
    </div>
  );
};

export default Admin;