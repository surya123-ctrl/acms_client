import React, { useState, useEffect } from "react";
import slide1 from "../assets/slide-1.jpg";
import slide2 from "../assets/slide-2.jpg";
import slide3 from "../assets/slide-3.jpg";

const ImageSlider = () => {
  const imagesArray = [slide1, slide2, slide3];
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        prevIndex === imagesArray.length - 1 ? 0 : prevIndex + 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="slider w-full max-w-4xl">
      <img
        src={imagesArray[currentIndex]}
        alt="slide"
        className="slider-image"
      />
    </div>
  );
};

export default ImageSlider;
