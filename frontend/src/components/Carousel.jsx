import React, { useState, useEffect } from 'react';
import '../styles/Carousel.css';

const images = [
  '/assets/Banner1.jpg',
  '/assets/Banner2.jpg',
  '/assets/Banner3.jpg',
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className="carousel">
      <button className="carousel-btn prev" onClick={prevSlide} aria-label="Previous Slide">&#10094;</button>
      <img src={images[currentIndex]} alt={`Slide ${currentIndex + 1}`} />
      <button className="carousel-btn next" onClick={nextSlide} aria-label="Next Slide">&#10095;</button>

      <div className="carousel-indicators">
        {images.map((_, idx) => (
          <span
            key={idx}
            className={idx === currentIndex ? 'active' : ''}
            onClick={() => setCurrentIndex(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') setCurrentIndex(idx);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
