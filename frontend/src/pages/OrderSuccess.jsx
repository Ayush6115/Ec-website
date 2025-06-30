import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/OrderSuccess.css';

const OrderSuccess = () => {
  return (
    <div className="success-container">
      <h1>🎉 Order Placed Successfully!</h1>
      <p>Thank you for your purchase. Your order has been received and is being processed.</p>
      <Link to="/" className="home-link">Go to Home</Link>
    </div>
  );
};

export default OrderSuccess;
