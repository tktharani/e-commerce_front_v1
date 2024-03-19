
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
import HeroSection from './HeroSection';
import Footer from './Footer';

const CartSummaryPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { product } = location.state;
  const [quantity, setQuantity] = useState(1);
  const [subtotal, setSubtotal] = useState(product.price * quantity);

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity > 0) {
      setQuantity(newQuantity);
      setSubtotal(product.price * newQuantity);
    }
  };

  const handleBackToCart = () => {
    navigate('/');
  };

  const handleProceedToBuy = () => {
    navigate('/checkout');
  };

  return (
    <div>
      <NavBar />
      
      <div className="container mt-5">
        <h1 className="mb-4">Cart Summary</h1>
        <div className="row">
          <div className="col-md-4">
            <img src={`http://localhost:8080/uploads/${product.image}`} alt={product.name} className="img-fluid" />
          </div>
          <div className="col-md-8">
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <div className="d-flex align-items-center mb-3">
              <button className="btn btn-outline-dark me-2" onClick={() => handleQuantityChange(-1)}>-</button>
              <span>{quantity}</span>
              <button className="btn btn-outline-dark ms-2" onClick={() => handleQuantityChange(1)}>+</button>
            </div>
            <p>Subtotal: Rs.{subtotal}</p>
            <button className="btn btn-primary me-2" onClick={handleProceedToBuy}>Proceed to Buy</button>
            <button className="btn btn-secondary" onClick={handleBackToCart}>Back to Cart</button>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default CartSummaryPage;
