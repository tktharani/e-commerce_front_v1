import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer" style={{ backgroundColor: 'yellowgreen' }}>
      <div className="container-fluid">
        <div className="footer-top">
          <div className="footer-left">
            <h3 style={{ color: 'black' }}>Farm Fresh Organic</h3>
            <p style={{ color: 'black' }}>Eat Your Greens for a Healthy Sheen Fruit Power: Fuel for Life Veggies: Nature's Superheroes Juicy and Delicious: Fruits for Every Occasion</p>
            <ul className="social-icons my-2">
              <a href="#" className='my-2'><FaFacebookF /></a>
              <a href="#" className='my-2'><FaTwitter /></a>
              <a href="#" className='my-2'><FaInstagram /></a>
              <a href="#"><FaLinkedinIn /></a>
            </ul>
          </div>
          <div className="footer-center">
            <h3 style={{ color: ' black' }}>Quick Links</h3>
            <ul className="footer-links">
              <li><a href="#" style={{ color: 'black' }}>Home</a></li>
              <li><a href="#" style={{ color: 'black' }}>Shop</a></li>
              <li><a href="#" style={{ color: 'black' }}>Categories</a></li>
              <li><a href="#" style={{ color: 'black' }}>About Us</a></li>
              <li><a href="#" style={{ color: 'black' }}>Contact Us</a></li>
            </ul>
          </div>
          <div className="footer-right">
            <h3 style={{ color: 'black' }}>Contact Us</h3>
            <p style={{ color: 'black' }}>Email: info@example.com</p>
            <p style={{ color: 'black' }}>Phone: +1234567890</p>
            <p style={{ color: 'black' }}>123 Street, City, Country</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p style={{ color: 'black' }}>&copy; 2024 Farm Fresh. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
