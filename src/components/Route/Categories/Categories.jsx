import { useNavigate } from "react-router-dom";
import styles from "../../../styles/styles";
import { brandingData, categoriesData } from "../../../static/data";
import { useRef } from "react";

const Categories = () => {
  const navigate = useNavigate();
  const sliderRef = useRef(null);

   // Scroll left/right function for small screens
   const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };
  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Categories Section */}
      <div className={`${styles.section} w-full bg-white mt-5 pt-2 p-0 sm:p-5 rounded-xl mb-6`} id="categories">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 text-center mb-1 sm:mb-6">
          Explore Our Categories
        </h2>
        <div className="hidden sm:grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {categoriesData.map((category) => (
            <div key={category.id} onClick={() => navigate(`/products?category=${category.title}`)}
              className="group relative flex flex-col items-center justify-center p-4 rounded-lg shadow-md cursor-pointer bg-gradient-to-br from-green-400 to-blue-500 text-white transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
              <img src={category.image_Url} alt={category.title} className="sm:w-20 sm:h-20 w-17 h-17 object-cover rounded-full border-2 border-white transition-transform duration-300 group-hover:scale-110"/>
              <h5 className="mt-3 hidden 800px:block text-lg text-center font-medium">{category.title}</h5>
              <div className="absolute inset-0 bg-black bg-opacity-10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          ))}
        </div>

        {/* Horizontal Scroll on Small Screens */}
        <div className="relative sm:hidden">
            <button className="absolute left-0 top-1/2 z-10 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-md hover:bg-gray-600"
              onClick={scrollLeft}>
              ❮
            </button>
            <div ref={sliderRef} className="flex overflow-x-scroll scrollbar-hide space-x-4 p-4">
              {categoriesData.map((category) => (
                <div key={category.id} onClick={() => navigate(`/products?category=${category.title}`)} className="min-w-[150px] flex flex-col items-center bg-gradient-to-br from-green-400 to-blue-500 text-white pb-0 p-4 rounded-lg shadow-md cursor-pointer transition-all duration-300 transform hover:scale-105">
                  <img src={category.image_Url} alt={category.title} className="w-16 h-16 object-cover rounded-full border-2 border-white transition-transform duration-300 hover:scale-110"/>
                  <h5 className="mt-2 text-sm font-medium text-center">{category.title}</h5>
                </div>
              ))}
            </div>
            <button className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-md hover:bg-gray-600"
              onClick={scrollRight}>
              ❯
            </button>
          </div>
      </div>

       {/* Branding Section */}
       <div className={`${styles.section} hidden sm:block`}>
        <div className="branding my-12 flex justify-between w-full shadow-md bg-gradient-to-r from-blue-500 to-indigo-500 p-6 rounded-xl text-white">
          {brandingData.map((item, index) => (
            <div className="flex items-start space-x-3" key={index}>
              <div className="text-3xl">{item.icon}</div>
              <div>
                <h3 className="font-bold text-sm md:text-lg">{item.title}</h3>
                <p className="text-xs md:text-sm opacity-90">{item.Description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Categories;
