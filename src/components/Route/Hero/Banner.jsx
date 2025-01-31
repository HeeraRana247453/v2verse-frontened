import { useState, useEffect, useRef } from "react";

const images = [
  "https://res.cloudinary.com/dmvmebkrr/image/upload/v1738259108/banner6_j0hyje.webp",
  "https://res.cloudinary.com/dmvmebkrr/image/upload/v1738259109/banner9_scrhsq.webp",
  "https://res.cloudinary.com/dmvmebkrr/image/upload/v1738259108/banner7_qg4x15.webp",
  "https://res.cloudinary.com/dmvmebkrr/image/upload/v1738259109/banner8_hcxehh.webp",
  "https://res.cloudinary.com/dmvmebkrr/image/upload/v1738259108/banner5_dpqqbc.webp",
  "https://res.cloudinary.com/dmvmebkrr/image/upload/v1738259108/banner10_fnbdht.webp",
];

const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(1); // Start from the first actual slide
  const totalSlides = images.length;
  const transitionRef = useRef(true);

  // Create an extended list of slides (last -> original slides -> first)
  const extendedSlides = [images[totalSlides - 1], ...images, images[0]];

  // Auto-slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  // Next Slide (Loop seamlessly)
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  // Previous Slide
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => prevIndex - 1);
  };

  // Reset position when reaching the fake last or first slide
  useEffect(() => {
    if (currentIndex === totalSlides + 1) {
      setTimeout(() => {
        transitionRef.current = false; // Disable transition for instant reset
        setCurrentIndex(1);
      }, 500);
    } else if (currentIndex === 0) {
      setTimeout(() => {
        transitionRef.current = false; // Disable transition for instant reset
        setCurrentIndex(totalSlides);
      }, 500);
    } else {
      transitionRef.current = true; // Enable transition normally
    }
  }, [currentIndex]);

  return (
    <div className="relative w-full sm:h-[550px] h-[275px] mx-auto overflow-hidden">
      <div className={`flex ${transitionRef.current ? "transition-transform duration-700 ease-in-out" : ""}`} style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {extendedSlides.map((src, index) => (
          <img key={index} src={src} className="w-[100vw] sm:h-[550px] h-[270px] object-fill flex-shrink-0" alt={`Slide ${index}`} />
        ))}
      </div>

      {/* Navigation Buttons */}
      <button onClick={prevSlide} className="absolute top-1/2 left-4 transform -translate-y-1/2 sm:bg-gray-800 text-white p-2 rounded-full sm:hover:bg-gray-600">
        ❮
      </button>
      <button onClick={nextSlide} className="absolute top-1/2 right-4 transform -translate-y-1/2 sm:bg-gray-800 text-white p-2 rounded-full sm:hover:bg-gray-600">
        ❯
      </button>

      {/* Dots Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button key={index} onClick={() => setCurrentIndex(index + 1)} className={` rounded-full sm:w-3 sm:h-3 w-3 h-2 transition-all duration-300 ${currentIndex === index + 1 ? "bg-green-500" : "bg-gray-400"}`}></button>
        ))}
      </div>
    </div>
  );
};

export default Banner;
