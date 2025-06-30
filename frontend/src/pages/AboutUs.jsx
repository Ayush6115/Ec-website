import React from 'react';
import '../styles/AboutUs.css';

function AboutUs() {
  return (
    <div className="about-container">
      <h1>About Us</h1>
      
      <section className="about-section">
        <h2>Our Mission</h2>
        <p>
          At Sakura E-commerce, our mission is to provide high-quality products that bring joy and satisfaction to our customers. We strive to offer exceptional service and an outstanding shopping experience.
        </p>
      </section>

      <section className="about-section">
        <h2>Our Story</h2>
        <p>
          Founded in 2024, we started as a small online store with a passion for fashion and quality. Over time, we have grown to serve thousands of happy customers, always committed to excellence and innovation.
        </p>
      </section>

      <section className="about-section">
        <h2>Why Choose Us?</h2>
        <ul>
          <li>Wide selection of products</li>
          <li>Competitive prices</li>
          <li>Customer-first support</li>
          <li>Fast and reliable shipping</li>
        </ul>
      </section>

      <section className="about-section">
        <h2>Contact Us</h2>
        <p>
          Have questions or feedback? Feel free to reach out via email at <a href="mailto:support@sakuracommerce.com">mailto:support@sakuracommerce.com</a> or call us at 080-1000-0000.
        </p>
      </section>
    </div>
  );
}

export default AboutUs;
