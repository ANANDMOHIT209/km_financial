import React from "react"
import { Link } from 'react-router-dom';
import Heading from "../../common/heading/Heading"
import "./Hero.css"

const Hero = () => {
  return (
    <>
      <section className='hero'>
        <div className='container'>
          <div className='row'>
            <Heading subtitle='WELCOME TO KM Financial' title='Fast Loans, Easy Approval' />
            <p>Unlock funds effortlessly with our streamlined loan process.</p>
            <div>
              {/* Wrapped button in Link component */}
              <Link to="/apply" className='primary-btn-hero'>
                GET LOAN NOW <i className='fa fa-long-arrow-alt-right'></i>
              </Link>              
            </div>
          </div>
        </div>
      </section>
      <div className='margin'></div>
    </>
  )
}

export default Hero

