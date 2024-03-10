import React from "react"
import { blog } from "../../../dummydata"
import "./footer.css"

const Footer = () => {
  return (
    <>
      <section className='newletter'>
        <div className='container flexSB'>
          <div className='left row'>
            <h1>Stay Updated: Sign Up for Our Newsletter Today!</h1>
            <span>Your loan journey simplified in easy, manageable steps</span>
          </div>
          <div className='right row'>
            <input type='text' placeholder='Enter email address' />
            <i className='fa fa-paper-plane'></i>
          </div>
        </div>
      </section>
      <footer>
        <div className='container padding'>
          <div className='box logo'>
            <h1>KM Financial</h1>
            <span>Fast Loans, Easly Approval</span>
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
              <li>Carrers</li>              
              <li>Privacy</li>
              <li>Terms & Conditions</li>
              <li>Contact Us</li>                     
              <li>Feedbacks</li>
            </ul>
          </div>
          <div className='box'>
            <h3>Recent Post</h3>
            {blog.slice(0, 3).map((val) => (
              <div className='items flexSB'>
                <div className='img'>
                  <img src={val.cover} alt='' />
                </div>
                <div className='text'>
                  <span>
                    <i className='fa fa-calendar-alt'></i>
                    <label htmlFor=''>{val.date}</label>
                  </span>
                  <span>
                    <i className='fa fa-user'></i>
                    <label htmlFor=''>{val.type}</label>
                  </span>
                  <h4>{val.title.slice(0, 40)}...</h4>
                </div>
              </div>
            ))}
          </div>
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
          Copyright ©2024 KM FINANCIAL Technologies Pvt. Ltd. All rights reserved 
        </p>
      </div>
    </>
  )
}

export default Footer
