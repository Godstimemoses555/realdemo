import React from "react";
import Slider from "react-slick";

const Hero = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    autoplay: true,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="w-full flex flex-col lg:flex-row items-center gap-6 px-4 lg:px-10 mt-20">

      {/* ✅ Left: Slider */}
      <div className="w-full lg:w-1/2 overflow-hidden rounded-xl">
        <Slider {...settings}>
          <div>
            <div className="h-[300px] md:h-[400px] bg-red-500 text-white flex items-center justify-center text-3xl font-bold rounded-xl">
              Slide 1
            </div>
          </div>
          <div>
            <div className="h-[300px] md:h-[400px] bg-blue-500 text-white flex items-center justify-center text-3xl font-bold rounded-xl">
              Slide 2
            </div>
          </div>
          <div>
            <div className="h-[300px] md:h-[400px] bg-green-500 text-white flex items-center justify-center text-3xl font-bold rounded-xl">
              Slide 3
            </div>
          </div>
        </Slider>
      </div>

      {/* ✅ Right: Equal width div */}
      <div className="w-full lg:w-1/2 h-[300px] md:h-[400px] bg-gray-900 rounded-xl flex items-center justify-center text-white">
        <div className="text-center px-6">
          <h1 className="text-3xl md:text-5xl font-bold leading-tight">
            Powerful Store UI
          </h1>
          <p className="mt-3 text-gray-300">
            Modern tech ecommerce UI with slick slider hero.
          </p>
          <button className="mt-6 bg-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
            Shop Now
          </button>
        </div>
      </div>

    </div>
  );
};

export default Hero;
