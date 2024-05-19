import React from "react";
import styled from "styled-components";
import Heading from "../common/heading/Heading";
import PriceCard from "../pricing/PriceCard";

const Hprice = () => {
  return (
    <>
      <Section className='hprice padding'>
        <Heading 
          subtitle='Apply for KM Finance Loan in 3 easy steps – it’s easy, seamless and quick.' 
          title='How To Apply For a Loan ?' 
        />
        <div className='price container grid'>
          <PriceCard />
        </div>
      </Section>
    </>
  );
};

export default Hprice;

// Styled-components CSS
const Section = styled.section`
  padding: 60px 0;
  background-color: #1a1a1a;

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 15px;
  }

  .grid {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
  }

  @media (max-width: 768px) {

    .grid {
      flex-direction: column;
      align-items: center;
    }
  }

  /* Additional styles for the PriceCard component if needed */
`;
