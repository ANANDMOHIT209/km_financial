import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "./Hero.css"

function Hero() {
  const sectionRef = useRef(null);
  const [isInViewport, setIsInViewport] = useState(false);
  const [animationCompleted, setAnimationCompleted] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const { top, bottom } = sectionRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const isVisible = (top > 0 && top < windowHeight) || (bottom > 0 && bottom < windowHeight);
        setIsInViewport(isVisible);
      }
    };

    const debounceScroll = debounce(handleScroll, 100);

    window.addEventListener('scroll', debounceScroll);

    // Trigger the animation and text color change when component mounts
    handleScroll();

    return () => {
      window.removeEventListener('scroll', debounceScroll);
    };
  }, []);

  useEffect(() => {
    if (isInViewport && !animationCompleted) {
      const textAnimation = setTimeout(() => {
        setAnimationCompleted(true);
      }, 2000); // Adjust duration to match your CSS animation duration
      return () => clearTimeout(textAnimation);
    }
  }, [isInViewport, animationCompleted]);

  const debounce = (func, delay) => {
    let timeout;
    return function () {
      const context = this;
      const args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(context, args), delay);
    };
  };

  return (
    <>
      <section className='hero'>
        <div className='container'>
          <div className='row'>
            <div className="section" ref={sectionRef}>
              <h4>
                <p className={`txtSmallTitle ${isInViewport ? 'typing-text' : ''} ${animationCompleted ? 'finished' : ''}`}>Welcome to KM Financial</p>
              </h4>
            </div>
            <div className="gap"></div>
            <h4 style={{ fontSize: '20px', color: '#37322f', textAlign: 'right', marginRight: '55px' }}>Your Gateway To</h4>
            <div className="gap"></div>
            <h2><p className={`txtTitle ${isInViewport ? 'typing-text' : ''} ${animationCompleted ? 'finished' : ''}`}>Fast Loans, Easy Approval</p></h2>
            <div className="gap"></div>
            <h4 style={{ fontSize: '20px', color: '#37322f' }}>Unlock funds effortlessly with our streamlined loan process.</h4>
            <div>
              <Link to="/applyloan" className='primary-btn-hero'>
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

export default Hero;
