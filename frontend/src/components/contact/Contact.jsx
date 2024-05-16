import React from "react";
import Back from "../common/back/Back";
import "./contact.css";

const Contact = () => {

  const map = 'https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3721.4236740821652!2d79.0781234!3d21.1355312!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjHCsDA4JzA3LjkiTiA3OcKwMDQnNDEuMiJF!5e0!3m2!1sen!2sin!4v1715864802204!5m2!1sen!2sin';
  return (
    <>
      <Back title='Contact Us' />
      <div className='ContactUs-div'>
        <section className='ContactUs padding'>
          <div className='container shadow flexSB'>
            <div className='ContactUs-left row'>
              <h1 style={{ textAlign: 'center', fontSize: '64px', fontWeight: '600', paddingBottom: '25px' }}>Contact Us</h1>

              <div className='ContactUs-items grid2'>
                <div className='ContactUs-box'>
                  <h4>Address:</h4>
                  <p>198 West 21th Street, Suite 721 New York NY 10016</p>
                </div>
                <div className='ContactUs-box'>
                  <h4>Email Address:</h4>
                  <p>info@yoursite.com</p>
                </div>
                <div className='ContactUs-box'>
                  <h4>Mobile Number:</h4>
                  <p>+91 1235235598</p>
                </div>
              </div>

              <form>
                <div className='flexSB'>
                  <input type='text' placeholder='Name' />
                  <input type='email' placeholder='Email' />
                </div>
                <input type='text' placeholder='Subject' />
                <textarea cols='5' rows='2' placeholder='Create a message here...'></textarea>
                <button className='primary-btn'>SEND MESSAGE</button>
              </form>
            </div>
            <div className='ContactUs-right row'>
              <iframe
                src={map}
                width="500"
                height="600"
                style={{ border: '1px solid black', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="New Map"
                scrolling="no"
              ></iframe>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Contact;
