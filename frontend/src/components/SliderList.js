import React, { useState } from "react";
import Slider from "react-slick"; // Install 'react-slick' package for carousel functionality

const SliderList = ({ items }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: Math.min(3, items.length), // Maximum 3 items in the slide frame
    slidesToScroll: 1,
    beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex),
  };

  return (
    <div>
      <h1>List with Slider</h1>
      <div className="list-container">
        <Slider {...settings}>
          {items.map((item, index) => (
            <div>
              <h2>{item.title}</h2>
            </div>
          ))}
        </Slider>
      </div>
      <div>
        <p>
          Current Slide: {currentSlide + 1} of {items.length}
        </p>
      </div>
    </div>
  );
};

export default SliderList;