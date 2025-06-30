import React, { useState } from 'react';
import api from '../services/api'; 
import '../styles/ContactUs.css';

function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitted(false);

    try {
      await api.post('/admin/message', formData);
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        message: ''
      });
    } catch (err) {
      console.error('Error submitting form:', err);
      setError('Failed to send message. Please try again later.');
    }
  };

  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      <div className="contact-content">
        <form className="contact-form" onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Your full name"
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="your.email@example.com"
          />

          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            required
            placeholder="Write your message here..."
          />

          <button type="submit">Submit</button>

          {submitted && (
            <p className="success-message">
              Thank you! Your message has been sent.
            </p>
          )}
          {error && <p className="error-message">{error}</p>}
        </form>

        <div className="contact-details">
          <h2>Our Contact Details</h2>
          <p>
            <strong>Address:</strong> 1234 Main Street, Tokyo, Japan
          </p>
          <p>
            <strong>Email:</strong>{' '}
            <a href="mailto:support@sakuracommerce.com">
              support@sakuracommerce.com
            </a>
          </p>
          <p>
            <strong>Phone:</strong> 080-1000-0000
          </p>
          <p>
            <strong>Working Hours:</strong> Mon - Fri, 9:00 AM - 6:00 PM
          </p>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
