import React from "react";
import "./OnlineCourses.css";
import { online } from "../../dummydata";
import Heading from "../common/heading/Heading";

const OnlineCourses = () => {
  return (
    <section className='online-courses'>
      <div className='container'>
        <Heading subtitle='Explore' title='Browse Our Products' />
        <div className='online-courses-content'>
          {online.map((val, index) => (
            <div className='online-courses-box' key={index}>
              <div className='online-courses-img'>
                <img src={val.cover} alt={val.loanTypes} />
              </div>
              <h1 className='online-courses-title'>{val.loanTypes}</h1>
              <h5 className='online-courses-subtitle'>{val.description}</h5>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OnlineCourses;
