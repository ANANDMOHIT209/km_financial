import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './Admin.css';
import adminImage from './/../../assets/images/admin.png';

const Admin = () => {
  const history = useHistory();
  const [hoveredCard, setHoveredCard] = useState(null);

  const handleCardClick = (cardNumber) => {
    if (cardNumber === 1) {
      history.push('/all_users_profile_pg');
    } else if (cardNumber === 2) {
      history.push('/all_loan_history_pg');
    }
  };

  return (
    <div className="admin-container">
      <h1 className="admin-heading">Admin Page</h1>
      <div className="admin-content">
      <div className="small-admin-heading">
        <div className="admin-cards-container">
          <div
            className={`admin-card ${hoveredCard === 1 ? 'hover' : ''}`}
            onClick={() => handleCardClick(1)}
            onMouseEnter={() => setHoveredCard(1)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <p>All Registered User</p>
          </div>
          <div
            className={`admin-card ${hoveredCard === 2 ? 'hover' : ''}`}
            onClick={() => handleCardClick(2)}
            onMouseEnter={() => setHoveredCard(2)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <p>Loan Applied History</p>
          </div>
        </div>
        
      </div>
      <div className="admin-image" >
            <img  src={adminImage} alt="Admin" />
      </div>
      </div>
    </div>
  );
};

export default Admin;


// import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom'; // Import useHistory from react-router-dom
// import './Admin.css'; // Import the CSS file
// import adminImage from './/../../assets/images/admin.svg';

// const Admin = () => {
//   const history = useHistory(); // Get history object from useHistory hook
//   const [hoveredCard, setHoveredCard] = useState(null);

//   const handleCardClick = (cardNumber) => {
//     if (cardNumber === 1) {
//       history.push('/all_users_profile_pg'); // Redirect to all_users_profile_pg component
//     } else if (cardNumber === 2) {
//       history.push('/all_loan_history_pg'); // Redirect to all_loan_history_pg component
//     }
//   };

//   return (
//     <div className="admin-container">
//       <h1 className="admin-heading">Admin Page</h1>
//       <div className="small-admin-heading">
//         <div className="admin-cards-container">
//           <div
//             className={`admin-card ${hoveredCard === 1 ? 'hover' : ''}`}
//             onClick={() => handleCardClick(1)}
//             onMouseEnter={() => setHoveredCard(1)}
//             onMouseLeave={() => setHoveredCard(null)}
//           >
//             <p>All Registered User</p>
//           </div>
//           <div
//             className={`admin-card ${hoveredCard === 2 ? 'hover' : ''}`}
//             onClick={() => handleCardClick(2)}
//             onMouseEnter={() => setHoveredCard(2)}
//             onMouseLeave={() => setHoveredCard(null)}
//           >
//             <p>Loan Applied History</p>
//           </div>
//         </div>
        
//       </div>
//       <div >
//             <img className="admin-image" src={adminImage} alt="Admin" />
//       </div>
//     </div>
//   );
// };

// export default Admin;
