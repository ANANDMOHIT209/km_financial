import React from "react";
import "./CoursesCard.css"; // Updated to reflect new CSS file name
import { coursesCard } from "../../dummydata";

const CoursesCard = () => {
  return (
    <section className='courses-card-section'>
      <div className='container courses-card-container'>
        {coursesCard.map((val, index) => (
          <div className='courses-card-item' key={index}>
            <div className='courses-card-content'>
              <div className='courses-card-left'>
                <img src={val.cover} alt={val.coursesName} className='courses-card-img' />
              </div>
              <div className='courses-card-right'>
                <h1 className='courses-card-title'>{val.coursesName}</h1>
                <div className='courses-card-rate'>
                  {[...Array(5)].map((_, i) => (
                    <i key={i} className='fa fa-star'></i>
                  ))}
                  <label>(5.0)</label>
                </div>
                <div className='courses-card-details'>
                  {val.courTeacher.map((details, idx) => (
                    <div className='courses-card-teacher' key={idx}>
                      <img src={details.dcover} alt={details.name} className='courses-card-teacher-img' />
                      <div className='courses-card-teacher-info'>
                        <h4>{details.name}</h4>
                        <span>{details.totalTime}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <button className='courses-card-btn'>READ NOW</button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CoursesCard;
