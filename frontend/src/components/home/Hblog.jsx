import React from "react";
import "./hblog.css";
import { blog } from "../../dummydata";
import Heading from "../common/heading/Heading";

const Hblog = () => {
  return (
    <section className='hblog-section'>
      <div className='hblog-container'>
        <Heading subtitle='OUR BLOGS' title='Recent Articles' />
        <div className='hblog-grid'>
          {blog.slice(0, 3).map((val, index) => (
            <div className='hblog-item' key={index}>
              <div className='hblog-image'>
                <img src={val.cover} alt='' />
              </div>
              <div className='hblog-text'>
                <div className='hblog-admin flexSB'>
                  <span>
                    <i className='fa fa-user'></i>
                    <label htmlFor=''>{val.type}</label>
                  </span>
                  <span>
                    <i className='fa fa-calendar-alt'></i>
                    <label htmlFor=''>{val.date}</label>
                  </span>
                  <span>
                    <i className='fa fa-comments'></i>
                    <label htmlFor=''>{val.com}</label>
                  </span>
                </div>
                <h2>{val.title}</h2>
                <p>{val.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Hblog;
