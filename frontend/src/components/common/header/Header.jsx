// import React, { useState } from "react"
// import { Link } from "react-router-dom"
// import { useHistory } from 'react-router-dom';
// import Head from "./Head"
// import "./header.css"

// const Header = () => {
//   const [click, setClick] = useState(false)
  
//   const history = useHistory();

//   const handleRedirect = (page) => {
//     history.push(`/${page}`);
//   };

//   return (
//     <>
//       <Head />
//       <header>
//         <nav className='flexSB'>
//           <ul className={click ? "mobile-nav" : "flexSB "} onClick={() => setClick(false)}>
//             <li>
//               <Link to='/'>Home</Link>
//             </li>
//             <li>
//               <Link to='/courses'>All Courses</Link>
//             </li>
//             <li>
//               <Link to='/about'>About</Link>
//             </li>
//             <li>
//               <Link to='/team'>Team</Link>
//             </li>
//             <li>
//               <Link to='/pricing'>Pricing</Link>
//             </li>
//             <li>
//               <Link to='/journal'>Journal</Link>
//             </li>
//             <li>
//               <Link to='/contact'>Contact</Link>
//             </li>
//           </ul>
//              <div className="right">
//                 <div className='start'>
//                <div className='button' onClick={() => handleRedirect('signup')}>SIGN UP</div>               
//              </div>
//              <div className='start'>
//                <div className='button' onClick={() => handleRedirect('signin')}>SIGN IN</div>               
//              </div>
//              <div className='start'>
//                <div className='button' onClick={() => handleRedirect('profile')}>Profile</div>               
//              </div>
//              <button className='toggle' onClick={() => setClick(!click)}>
//                {click ? <i className='fa fa-times'> </i> : <i className='fa fa-bars'></i>}
//              </button>
//              </div>
//         </nav>
//       </header>
//     </>
//   )
// }

// export default Header

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import Head from "./Head";
import "./header.css";

const Header = () => {
 const [click, setClick] = useState(false);
 const [isAuthenticated, setIsAuthenticated] = useState(false); // State to track authentication
 const history = useHistory();

 useEffect(() => {
    // Check for accessToken in local storage
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      setIsAuthenticated(true); // User is authenticated
    } else {
      setIsAuthenticated(false); // User is not authenticated
    }
 }, []); // Empty dependency array means this effect runs once on mount

 const handleRedirect = (page) => {
    history.push(`/${page}`);
 };

 const logout = () => {
  localStorage.removeItem("accessToken");
  setIsAuthenticated(false);
  history.push("/signin");
};

 return (
    <>
      <Head />
      <header>
        <nav className='flexSB'>
          <ul className={click ? "mobile-nav" : "flexSB "} onClick={() => setClick(false)}>
          <li>
               <Link to='/'>Home</Link>
             </li>
             <li>
               <Link to='/courses'>All Courses</Link>
           </li>
             <li>
               <Link to='/about'>About</Link>
             </li>
             <li>
               <Link to='/team'>Team</Link>
             </li>
             <li>
               <Link to='/pricing'>Pricing</Link>
             </li>
             <li>
               <Link to='/journal'>Journal</Link>
             </li>
             <li>
               <Link to='/contact'>Contact</Link>
             </li>
          </ul>
          <div className="right">
            {!isAuthenticated && (
              <>
                <div className='start'>
                 <div className='button' onClick={() => handleRedirect('signup')}>SIGN UP</div>
                </div>
                <div className='start'>
                 <div className='button' onClick={() => handleRedirect('signin')}>SIGN IN</div>
                </div>
              </>
            )}
            {isAuthenticated && (
              <>
                <div className='start'>
                 <div className='button' onClick={() => handleRedirect('profile')}>Profile</div>
                </div>
                <div className='start'>
                 <div className='button' onClick={logout}>Logout</div>
                </div>
              </>
             
            )}
            <button className='toggle' onClick={() => setClick(!click)}>
              {click ? <i className='fa fa-times'> </i> : <i className='fa fa-bars'></i>}
            </button>
          </div>
        </nav>
      </header>
    </>
 );
};

export default Header;
