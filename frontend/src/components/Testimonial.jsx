import React from 'react';
import '../styles/Testimonial.css';

const testimonials = [
  {
    id: 1,
    name: 'Ayush',
    text: 'Great quality products and fantastic customer service!',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    id: 2,
    name: 'Shivani',
    text: 'I love the variety and the fast shipping. Highly recommend!',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    id: 3,
    name: 'Raghav',
    text: 'Best shopping experience I have had online. Will buy again!',
    avatar: 'https://randomuser.me/api/portraits/men/85.jpg',
  },
  {
    id: 4,
    name: 'Ayushi',
    text: 'Friendly staff and quick delivery. Love this store!',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
  },
];

const Testimonial = () => {
  return (
    <section className="testimonial-section">
      <h2>What Our Customers Say</h2>
      <div className="testimonial-grid">
        {testimonials.map(({ id, name, text, avatar }) => (
          <div key={id} className="testimonial-card">
            <img src={avatar} alt={name} className="avatar" />
            <p className="testimonial-text">"{text}"</p>
            <p className="testimonial-name">- {name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonial;
