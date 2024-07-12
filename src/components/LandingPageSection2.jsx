import React from "react";
import Slide1 from "../assets/slide-1.jpg";
import Slide2 from "../assets/slide-2.jpg";
import Slide3 from "../assets/slide-3.jpg";
import Slide4 from "../assets/slide-4.jpg";
import Slide5 from "../assets/slide-5.jpg";
import Slide6 from "../assets/slide-6.jpg";
const LandingPageSection2 = () => {
  const images = [Slide1, Slide2, Slide3, Slide4, Slide5, Slide6];
  return (
    <div className="slider-container overflow-hidden">
      <div className="slider flex animate-scroll">
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Slide ${index}`}
            className="w-1/10 h-48 object-cover" // Adjust the height as needed
          />
        ))}
        {images.map((src, index) => (
          <img
            key={`duplicate-${index}`}
            src={src}
            alt={`Slide duplicate ${index}`}
            className="w-1/10 h-48 object-cover" // Adjust the height as needed
          />
        ))}
      </div>
    </div>
  );
};

export default LandingPageSection2;
