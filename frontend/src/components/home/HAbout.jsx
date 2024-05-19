import React from "react";
import OnlineCourses from "../allcourses/OnlineCourses";
import Heading from "../common/heading/Heading";
import "./HAbout.css";
import { coursesCard } from "../../dummydata";

const HAbout = () => {
  return (
    <>
      <section className='home-about'>
        <div className='container'>
          <Heading subtitle='Our Products' title='Different loans for your every need' />

          <div className='product-card-container'>
            <div className='grid2'>
              {coursesCard.slice(0, 3).map((val, index) => (
                <div className='product-card-item' key={index}>
                  <div className='product-card-content'>
                    <div className='product-card-left'>
                      <div className='product-card-img'>
                        <img src={val.cover} alt={val.coursesName} />
                      </div>
                    </div>
                    <div className='product-card-right'>
                      <h1 className='product-card-title'>{val.coursesName}</h1>
                      <div className='product-card-rate'>
                        {[...Array(5)].map((_, i) => (
                          <i key={i} className='fa fa-star'></i>
                        ))}
                        <label>(5.0)</label>
                      </div>
                      <div className='product-card-details'>
                        {val.courTeacher.map((details, idx) => (
                          <div className='product-card-teacher' key={idx}>
                            <div className='teacher-img'>
                              <img src={details.dcover} alt={details.name} />
                            </div>
                            <div className='teacher-info'>
                              <h4>{details.name}</h4>
                              <span>{details.totalTime}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <button className='outline-btn'>READ NOW</button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <OnlineCourses />
      </section>
    </>
  );
};

export default HAbout;
