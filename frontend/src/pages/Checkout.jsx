import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Checkout.css';

const Checkout = () => {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    address: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.phone || !form.address) {
      alert('Please fill in all fields');
      return;
    }

    localStorage.setItem('checkoutInfo', JSON.stringify(form));

    navigate('/payment');
  };

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>
      <form className="checkout-form" onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={form.name} onChange={handleChange} required />
        </label>

        <label>
          Phone:
          <input type="tel" name="phone" value={form.phone} onChange={handleChange} required />
        </label>

        <label>
          Address:
          <textarea name="address" value={form.address} onChange={handleChange} required />
        </label>

        <button type="submit" className="next-btn">Next: Payment</button>
      </form>
    </div>
  );
};

export default Checkout;
