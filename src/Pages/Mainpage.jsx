import React, { useEffect, useState } from "react";
import { useDommy } from "../../Store";
import "../App.css";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import slickimg from "../assets/slickimg.jpg";
import slickimg2 from "../assets/slickimg2.png";
import slickimg3 from "../assets/slickimg3.jpg";
import Api from "../Component/Api";
import Navbar from "../Component/Navbar";
import Footer from "../Component/Footer";
import Totop from "../Component/Totop";
import { Heart } from "lucide-react";

const MainPage = () => {
  const [data1, setData] = useState([]);
  const { value, Fetchdata } = useDommy();

  const settings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    arrows: false,
  };

  useEffect(() => {
    Fetchdata();
  }, []);

  return (
    <div className="pt-[90px]">
      <Navbar />

      {/* ✅ HERO SECTION */}
      <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-10 mt-10 px-5">
        {/* LEFT SIDE TEXT */}
        <div className="flex flex-col text-center lg:text-left gap-4 w-full lg:w-1/2">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl text-gray-900 leading-tight">
            It's Powerful <br /> It's{" "}
            <span className="font-bold text-[38px] sm:text-[44px] lg:text-[50px] text-blue-600">
              CyberStore
            </span>
          </h1>
          <p className="text-gray-600 text-sm sm:text-base lg:text-lg max-w-[500px] mx-auto lg:mx-0">
            Explore premium tech gadgets and accessories built for speed, power,
            and style.
          </p>

          {/* ✅ SHOP NOW BUTTON */}
          <div className="mt-3">
            <Link
              to="/storepage"
              className="inline-block bg-blue-600 text-white px-5 py-2 text-sm sm:text-base rounded-full hover:bg-blue-700 transition w-auto mx-auto lg:mx-0"
            >
              Shop Now
            </Link>
          </div>
        </div>

        {/* RIGHT SIDE SLIDER */}
        <div className="w-full sm:w-[90%] md:w-[500px] h-[220px] sm:h-[280px] md:h-[300px] flex items-center justify-center">
          <div className="slider-container w-full h-full overflow-hidden rounded-2xl shadow-md">
            <Slider {...settings}>
              {[slickimg, slickimg2, slickimg3].map((img, i) => (
                <div
                  key={i}
                  className="flex items-center justify-center w-full h-full"
                >
                  <img
                    src={img}
                    alt={`slide-${i}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>

      {/* ✅ PRODUCTS SECTION */}
      <div className="mt-12 px-5">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center lg:text-left">
          Featured Products
        </h2>

        <div className="flex flex-wrap justify-center lg:justify-start gap-6">
          {value.slice(0, 8).map((item, index) => (
            <div
              key={index}
              className="w-[90%] sm:w-[45%] md:w-[30%] lg:w-[22%] flex justify-center relative"
            >
              {/* ❤️ Heart Icon on top */}
              <Link
                to="/favorites"
                className="absolute top-2 right-2 z-20 bg-white p-1 rounded-full shadow hover:scale-110 transition-transform"
              >
                <Heart size={20} className="text-red-500" />
              </Link>

              {/* Product component */}
              <Api data1={item} />
            </div>
          ))}
        </div>
      </div>

      <Footer />
      <Totop />
    </div>
  );
};

export default MainPage;
