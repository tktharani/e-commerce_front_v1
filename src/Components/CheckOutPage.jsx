import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';

const CheckoutPage = ({ cartItems }) => {
  const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    address: '',
    city: '',
    pinCode: '',
    country: '',
    paymentMethod: 'CreditCard', 
  });

  const navigate = useNavigate(); 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo({ ...shippingInfo, [name]: value });
  };

  const handlePaymentMethodChange = (e) => {
    setShippingInfo({ ...shippingInfo, paymentMethod: e.target.value });
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    
    alert('Order placed successfully!');  };

  const proceedToBuy = () => {
    
    navigate('/login');
  };

  return (
    <div className="container">
      <NavBar />
      <h1>Checkout</h1>
      <form onSubmit={handleSubmitOrder}>
        <div className="mb-3">
          <label htmlFor="fullName" className="form-label">Full Name</label>
          <input type="text" className="form-control" id="fullName" name="fullName" value={shippingInfo.fullName} onChange={handleInputChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">Address</label>
          <input type="text" className="form-control" id="address" name="address" value={shippingInfo.address} onChange={handleInputChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="city" className="form-label">City</label>
          <input type="text" className="form-control" id="city" name="city" value={shippingInfo.city} onChange={handleInputChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="pinCode" className="form-label">Pin Code</label>
          <input type="text" className="form-control" id="pinCode" name="pinCode" value={shippingInfo.pinCode} onChange={handleInputChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Payment Method</label>
          <div className="form-check">
            <input className="form-check-input" type="radio" name="paymentMethod" value="CreditCard" checked={shippingInfo.paymentMethod === 'CreditCard'} onChange={handlePaymentMethodChange} />
            <label className="form-check-label">Credit Card</label>
          </div>
          
        </div>
        <button type="submit" className="btn btn-primary">Place Order</button>
        <button type="button" className="btn btn-secondary" onClick={proceedToBuy}>Proceed to Buy</button>
      </form>
      
    </div>
  );
};

export default CheckoutPage;
