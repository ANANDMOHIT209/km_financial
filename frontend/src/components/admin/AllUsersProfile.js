import React, { useState } from 'react';
import axios from 'axios'; // Assuming you're using Axios for HTTP requests

const AllUsersProfile = () => {
  const [usersProfile, setUsersProfile] = useState([]);
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

  const fetchUsersProfile = async () => {
    try {
        const accessToken = localStorage.getItem("accessToken");
        const headers = {
          token: `${accessToken}`,
          "Content-Type": "application/json",
        };
        const response = await axios.post(
            'http://localhost:8000/all_users_profile_pg', // Adjusted to use relative path
            pagination,
            { headers }
          );
      setUsersProfile(response.data.users);
    } catch (error) {
      console.error('Error fetching users profile:', error);
    }
  };

  // Example usage of pagination controls
  return (
    <div>
      <select onChange={handleSortChange}>
        <option value="id">ID</option>
        <option value="name">Name</option>
      </select>
      <select onChange={handleOrderChange}>
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
      <button onClick={() => handlePageChange(pagination.page_no + 1)}>Next Page</button>
      <button onClick={() => handlePageChange(pagination.page_no - 1)}>Previous Page</button>
      <input type="number" value={pagination.limit} onChange={(e) => handleLimitChange(parseInt(e.target.value))} />
      <button onClick={fetchUsersProfile}>Fetch Users Profile</button>

      {/* Render users profile */}
      <ul>
        {usersProfile.map(user => (
            <li key={user.id}>
            {Object.entries(user).map(([key, value]) => (
                <p key={key}>{`${key}: ${value}`}</p>
            ))}
            </li>
        ))}
      </ul>

    </div>
  );
};

export default AllUsersProfile;
