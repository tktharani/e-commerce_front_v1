import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-grey">
      <div className="container">
        <Link  className="navbar-brand" to="/">
        <img src={process.env.PUBLIC_URL + '/logo2.avif'} alt="Logo" className="navbar-logo"
        style={{ width: '90px', height: 'auto' }}  />
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
          aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse d-flex justify-content-end animated-nav" id="navbarNav">
          <ul className="navbar-nav ">  
           {/* <li className="nav-item">
              <Link className="nav-link text-dark" to="/about">About</Link>
            </li> */}
            <li className="nav-item">
              <Link className="nav-link text-dark" to="/">Home</Link>
            </li>
            <li className="nav-item text-dark">
              <Link className="nav-link text-primary " to="/login">Login</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
