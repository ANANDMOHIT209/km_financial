import React from "react";
import { Link } from "react-router-dom";
import './priceCard.css';
import pricingDesignImage from './pricing-design.svg';

const PriceCard = () => {
  return (
    <div className="container-price">
      <div className="image-container">
        <img
          src={pricingDesignImage}
          alt="How to apply?"
          width="600"
          height="450"
        />
      </div>
      <div className="text-container">
        <ul className="steps__list">
          <li>
            <h3 className="steps__count">Step 01 </h3>
            <div className="steps__text">Verify personal details</div>
          </li>
          <li>
            <h3 className="steps__count">Step 02</h3>
            <div className="steps__text">Choose your loan amount and tenure; confirm your bank details</div>
          </li>
          <li>
            <h3 className="steps__count">Step 03 </h3>
            <div className="steps__text">Receive the loan amount in your bank account</div>
          </li>
        </ul>
        <div className="button-container">
            <Link to="/applyloan" className="button-know">Apply Now</Link>
          </div>
      </div>
    </div>
  );
};

export default PriceCard;
