import React from "react"
import { testimonal } from "../../../dummydata"
import Heading from "../../common/heading/Heading"
import "./style.css"

const Testimonal = () => {
  return (
    <>
      <section className='testimonials padding'>
        <div className='testimonials-container'>
          <Heading subtitle='TESTIMONIAL' title='What our Customers say about us' />

          <div className='testimonials-content'>
            {testimonal.map((val, index) => (
              <div className='testimonials-item shadow' key={index}>
                <div className='testimonials-box flex'>
                  <div className='testimonials-img'>
                    <img src={val.cover} alt={val.name} />
                    <i className='fa fa-quote-left testimonials-icon'></i>
                  </div>
                  <div className='testimonials-name'>
                    <h2>{val.name}</h2>
                    <span>{val.post}</span>
                  </div>
                </div>
                <p className='testimonials-desc'>{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default Testimonal
