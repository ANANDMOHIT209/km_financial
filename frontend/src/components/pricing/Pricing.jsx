import React from "react";
import Back from "../common/back/Back";
import PriceCard from "./PriceCard";
import "./price.css";
import Faq from "./Faq";

const Pricing = () => {
  return (
    <>
      <section className='pricing-section padding'>
        <section className="pricing-page-header">
          <h1 className="title">How To Apply <br />For A Loan</h1>
          <h2 className="baseline">Apply Loans Easily.</h2>
        </section>
        <div className='pricing-container grid'>
          <PriceCard />
        </div>
      </section>
      <Faq />
    </>
  );
};

export default Pricing;
