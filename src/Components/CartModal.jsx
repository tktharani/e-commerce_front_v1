import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CartModal = ({ cartItems, closeModal }) => {
  const [cart, setCart] = useState(cartItems);
  const navigate = useNavigate(); 

    const calculateTotalPrice = (item) => {
    return item.price * (item.quantity || 1); 
  };

  
  const calculateCartTotal = () => {
    return cart.reduce((total, item) => total + calculateTotalPrice(item), 0);
  };

   const increaseQuantity = (item) => {
    const updatedCart = cart.map((cartItem) => {
      if (cartItem.id === item.id) {
        return { ...cartItem, quantity: (cartItem.quantity || 0) + 1 }; 
       }
      return cartItem;
    });
    setCart(updatedCart);
  };

  // Function to handle quantity decrease
  const decreaseQuantity = (item) => {
    const updatedCart = cart.map((cartItem) => {
      if (cartItem.id === item.id && (cartItem.quantity || 0) > 1) { 
        return { ...cartItem, quantity: (cartItem.quantity || 0) - 1 };
      }
      return cartItem;
    });
    setCart(updatedCart);
  };

  // Function to handle proceed to buy
  const proceedToBuy = () => {
    // Redirect to the login page
    navigate('/login'); 
  };

  return (
    <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Shopping Cart</h5>
            <button type="button" className="btn-close" onClick={closeModal} aria-label="Close"></button>
          </div>
          <div className="modal-body">
            {cart.map((item, index) => (
              <div key={index} className="d-flex align-items-center mb-3">
                <img src={`http://localhost:8080/uploads/${item.image}`} alt={item.name} className="img-fluid me-3" style={{ maxWidth: '50px' }} />
                <div>
                  <h6>{item.name}</h6>
                  <div className="quantity-control">
                    <button className="btn btn-secondary" onClick={() => decreaseQuantity(item)}>-</button>
                    <span className="mx-2">{item.quantity || 1}</span>
                     <button className="btn btn-secondary" onClick={() => increaseQuantity(item)}>+</button>
                  </div>
                  <p>Total Price: ${calculateTotalPrice(item)}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="modal-footer">
            <p>Total Cart Price: ${calculateCartTotal()}</p>
            <button type="button" className="btn btn-secondary" onClick={proceedToBuy}>Proceed to Buy</button>
            <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartModal;
