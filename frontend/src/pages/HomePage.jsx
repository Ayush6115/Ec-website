import React from 'react';
import Search from '../components/Search';
import Carousel from '../components/Carousel';
import FeaturedSectionCards from '../components/FeaturedSectionCards';
import Testimonial from '../components/Testimonial';

const HomePage = () => {
  return (
    <div>
      <Search />
      <Carousel />
      <FeaturedSectionCards/>
      <Testimonial/>
    </div>
  );
};

export default HomePage
