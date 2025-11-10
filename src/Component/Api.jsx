import React from "react";
import shoppingcart from "../assets/shoppingcart.png";
import { useNavigate } from "react-router-dom";
import { useDommy } from "../../Store"; // ✅ import your Zustand store

const Api = ({ data1 }) => {
  const navme = useNavigate();
  const { addToCart } = useDommy(); // ✅ get addToCart function from Zustand

  // ✅ Handle add-to-cart click
  const handleAddToCart = (item) => {
    addToCart(item);         // adds the item to Zustand + localStorage
    alert("✅ Item added to cart!"); // optional feedback (you can remove)
  };

  return (
    <div>
      <div className="flex flex-col gap-2.5 lg:h-[400px] lg:w-[300px] p-2.5 shadow-md bg-gray-100 items-center justify-center rounded-xl">
        {/* Product Image */}
        <img
          className="lg:w-[200px] lg:h-[200px] object-contain"
          src={data1.image}
          alt={data1.title}
        />

        {/* Product Details */}
        <h1 className="text-xl font-semibold">{data1.category}</h1>
        <h4 className="text-gray-700">${data1.price}</h4>

        {/* Rating + Cart Icon */}
        <div className="flex items-center justify-between w-[200px] mt-2">
          <p>{data1.rating?.rate} ⭐⭐</p>

          {/* ✅ This icon now adds to cart */}
          <img
            onClick={() => handleAddToCart(data1)}
            src={shoppingcart}
            alt="Add to cart"
            className="w-[35px] h-[35px] object-contain cursor-pointer hover:scale-110 transition-transform"
          />
        </div>

        {/* Optional: Click to view details */}
        <button
          onClick={() => navme("/Detail", { state: data1 })}
          className="mt-3 bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 transition"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default Api;
