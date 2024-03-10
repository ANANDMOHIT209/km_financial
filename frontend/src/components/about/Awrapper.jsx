import React from "react";
import { awrapper } from "../../dummydata";
import "./about.css"; // Import your CSS file

const Awrapper = () => {
  return (
    <section className='awrapper-container'>
      <div className="awrapper-content">
        {awrapper.map((val, index) => (
          <div className='awrapper-box' key={index}>
            <div className='awrapper-img'>
              <img src={val.cover} alt='' />
            </div>
            <div className='awrapper-text'>
              <h1>{val.data}</h1>
              <h3>{val.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Awrapper;
