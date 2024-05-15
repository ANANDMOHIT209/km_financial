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
              <Link to='/applyloan'>Apply Loan</Link>
            </li>
            <li className="dropdown">
              <span className="dropdown-btn">Calculators</span>
              <div className="dropdown-content">
                <Link to='/emicalculator'>EMI Calculator</Link>
                <Link to='/fdcalculator'>FD Calculator</Link>
                <Link to='/sipcalculator'>SIP Calculator</Link>
              </div>
            </li>
            <li>
              <Link to='/about'>About Us</Link>
            </li>
            <li>
              <Link to='/contact'>Contact</Link>
            </li>
            <li>
              <Link to='/loan-process'>Loan Process</Link>
            </li>
            <li>
              <Link to='/blogs'>Blogs</Link>
            </li>            
          </ul>
          <div className="right">
            {!isAuthenticated ? (
              <>
                <div className='start'>
                 <div className='profile-card__buton button--blue' onClick={() => handleRedirect('signup')}>SIGN UP</div>
                </div>
                <div className='start'>
                 <div className='profile-card__buton button--orange' onClick={() => handleRedirect('signin')}>Log In</div>
                </div>
              </>
            ) : (
              <>
                <div className='start'>
                 <div className='profile-card__buton button--profile' onClick={() => handleRedirect('profile')}>Profile</div>
                </div>
                <div className='start'>
                 <div className='profile-card__buton button--logout' onClick={logout}>Logout</div>
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
