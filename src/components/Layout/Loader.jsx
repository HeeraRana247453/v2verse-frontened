import React from "react";
import Lottie from "lottie-react";
import animationData from "../../Assests/animations/Animation - 2.json";

const Loader = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Lottie
        animationData={animationData}
        loop={true} // Enable looping
        style={{ width: 300, height: 300 }} // Set dimensions
      />
    </div>
  );
};

export default Loader;
