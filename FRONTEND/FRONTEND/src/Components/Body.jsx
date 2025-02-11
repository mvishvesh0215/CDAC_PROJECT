import React from 'react'
//import logo from '../logo.png';
import pipe1 from '../pipe1.jpeg';
//import pipe2 from '../pip2.jpeg';
import pipe3 from '../images.jpeg';
//import pipe4 from '../pipe4.jpeg';
import '../Style/Body.css';
import SubBody from './SubBody';
//import SubBody from '../Components/SubBody.jsx';
function Body() {
  return (
    <div className='parent'>
    <div className="bod container d-flex justify-content-center mt-5">
      <div
        id="customCarousel"
        className="carousel slide"
        data-bs-ride="carousel"
        style={{ width: "100vw" }} // 1/4th of the page width
      >
        {/* Indicators
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#customCarousel"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#customCarousel"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#customCarousel"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div> */}

        {/* Carousel Items */}
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src={pipe1}
              className="d-block w-100"
              alt="Slide 1"
              style={{height:"20vw"}}
            />
          </div>
          {/* <div className="carousel-item">
            <img
              src={pipe2}
              className="d-block w-100 h-25"
              alt="Slide 2"
            />
          </div> */}
          <div className="carousel-item">
            <img
              src={pipe3}
              className="d-block w-100"
              alt="Slide 3"
            />
          </div>
          {/* <div className="carousel-item">
            <img
              src={pipe4}
              className="d-block w-100"
              alt="Slide 3"
            />
          </div> */}
        </div>
      </div>
    </div>
    <SubBody/>
    </div>
  );
};


export default Body