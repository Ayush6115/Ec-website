import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import '../styles/Payment.css';

const Payment = () => {
  const [method, setMethod] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!method) {
      alert('Please select a payment method');
      return;
    }

    const shippingInfo = JSON.parse(localStorage.getItem('checkoutInfo'));
    if (!shippingInfo) {
      alert('Shipping information missing. Please complete checkout again.');
      navigate('/checkout');
      return;
    }

    setLoading(true);

    try {
      await api.post('/order', {
        shippingInfo,
        paymentMethod: method,
      });

      localStorage.removeItem('checkoutInfo');
      navigate('/order-success');
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to place order');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payment-container">
      <h1>Select Payment Method</h1>
      <form className="payment-form" onSubmit={handleSubmit}>
        <label className="payment-option">
          <input
            type="radio"
            name="payment"
            value="UPI"
            checked={method === 'UPI'}
            onChange={(e) => setMethod(e.target.value)}
            disabled={loading}
          />
          UPI
        </label>

        <label className="payment-option">
          <input
            type="radio"
            name="payment"
            value="COD"
            checked={method === 'COD'}
            onChange={(e) => setMethod(e.target.value)}
            disabled={loading}
          />
          Cash on Delivery (COD)
        </label>

        <button type="submit" className="pay-btn" disabled={loading}>
          {loading ? 'Placing Order...' : 'Place Order'}
        </button>
      </form>
    </div>
  );
};

export default Payment;
