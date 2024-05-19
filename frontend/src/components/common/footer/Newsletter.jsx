import React from 'react';
import './Newsletter.css';

const Newsletter = () => {
  return (
    <div className="newsletter-section">
      <h1 className="newsletter-header">Stay Updated</h1>
      <p className="newsletter-description">
        Sign Up for Our Newsletter Today! Your loan journey simplified in easy, manageable steps
      </p>
      <form className="newsletter-form">
        <input
          type="email"
          placeholder="Enter your email"
          className="newsletter-input"
          required
        />
        <button type="submit" className="newsletter-button">
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default Newsletter;
