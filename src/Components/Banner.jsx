import React from 'react';
import './Banner.css'; // Import CSS file for styling

const Banner = () => {
  return (
    <div className="banner-container">
      <div className="banner-text">
        <h2>Fresh Fruits and Vegetables</h2>
      </div>
      <div className="banner-image">
        <img src={process.env.PUBLIC_URL + '/images/hero-banner.png'} alt="Hero Banner" />
        <div className="color-animation"></div>
      </div>
    </div>
  );
};

export default Banner;
