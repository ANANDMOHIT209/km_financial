import React from "react";
import Heading from "../common/heading/Heading";
import "./about.css";
import { homeAbout } from "../../dummydata";
import Awrapper from "./Awrapper";

const AboutCard = () => {
  return (
    <>
      <section className='about-home'>
        <div className='about-container about-flexSB'>
          <div className='about-left about-row'>
            <img src='./images/front-design.svg' alt='' />
          </div>

          <div className='about-right about-row'>
            <div className='about-items'>
              <Heading subtitle='Safest and Fastest way to get Loans' title='Benefits for choosing us' />
              {homeAbout.map((val) => {
                return (
                  <div className='about-item-container' key={val.title}>
                    <div className='about-item-content about-flexSB'>
                      <div className='about-item-img'>
                        <img src={val.cover} alt={val.title} />
                      </div>
                      <div className='about-item-text'>
                        <h2>{val.title}</h2>
                        <p>{val.desc}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
      <Awrapper />
    </>
  );
};

export default AboutCard;
