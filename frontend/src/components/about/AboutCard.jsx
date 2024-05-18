import React from "react"
import Heading from "../common/heading/Heading"
import "./about.css"
import { homeAbout } from "../../dummydata"
import Awrapper from "./Awrapper"

const AboutCard = () => {
  return (
    <>
      <section className='aboutHome'>
        <div className='container flexSB'>
          <div className='left row'>
            <img src='./images/front-design.svg' alt='' />
          </div>

          <div className='right row'>
            <div className='items'>
              <Heading subtitle='Safest and Fastest way to get Loans' title='Benefits for choosing us' />
              {homeAbout.map((val) => {
                return (
                  <div className='item-container'>
                    <div className='item-content flexSB'>
                      <div className='item-img'>
                        <img src={val.cover} alt='' />
                      </div>
                      <div className='item-text'>
                        <h2>{val.title}</h2>
                        <p>{val.desc}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>
      <Awrapper />
    </>
  )
}

export default AboutCard
