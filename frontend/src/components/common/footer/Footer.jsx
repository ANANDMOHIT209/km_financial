import React from "react";
import { blog } from "../../../dummydata";
import "./footer.css";
import Newsletter from "./Newsletter";

const Footer = () => {
  return (
    <>
      <Newsletter/>
      <footer>
        <div className='container'>
          <div className='box logo'>
            <h1>KM Financial</h1>
            <span>Fast Loans, Easy Approval</span>
            <p>Take Loans effortlessly with our fast and streamlined loan process</p>
            <i className='fab fa-facebook-f icon'></i>
            <i className='fab fa-instagram icon'></i>            
            <i className='fab fa-whatsapp icon'></i>
          </div>
          <div className='box link'>
            <h3>Explore</h3>
            <ul>
              <li>Blog</li>
              <li>Apply Loan</li>
              <li>Types of Loans</li>
              <li>Credit Score</li>
              <li>EMI Calculator</li>
              <li>Banking Partner</li>  
            </ul>
          </div>
          <div className='box link'>
            <h3>Quick Links</h3>
            <ul>
              <li>Careers</li>              
              <li>Privacy</li>
              <li>Terms & Conditions</li>
              <li>Contact Us</li>                     
              <li>Feedback</li>
            </ul>
          </div>
          {/* <div className='box'>
            <h3>Recent Post</h3>
            {blog.slice(0, 3).map((val) => (
              <div className='items flexSB' key={val.id}>
                <div className='img'>
                  <img src={val.cover} alt='' />
                </div>
                <div className='text'>
                  <span>
                    <i className='fa fa-calendar-alt'></i>
                    <label>{val.date}</label>
                  </span>
                  <span>
                    <i className='fa fa-user'></i>
                    <label>{val.type}</label>
                  </span>
                  <h4>{val.title.slice(0, 40)}...</h4>
                </div>
              </div>
            ))}
          </div> */}
          <div className='box last'>
            <h3>Have a Questions?</h3>
            <ul>
              <li>
                <i className='fa fa-map'></i>
                Nagpur, Maharashtra, India 
              </li>
              <li>
                <i className='fa fa-phone-alt'></i>
                +91 1234567890
              </li>
              <li>
                <i className='fa fa-paper-plane'></i>
                info@kmfinance.com
              </li>
            </ul>
          </div>
        </div>
      </footer>
      <div className='legal'>
        <p>
          &copy; 2024 KM FINANCIAL Technologies Pvt. Ltd. All rights reserved 
        </p>
      </div>
    </>
  );
};

export default Footer;
