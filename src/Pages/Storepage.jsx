import React, { useEffect } from "react";
import { useDommy } from "../../Store";
import Navbar from "../Component/Navbar";
import NavbarWithSearch from "../Component/NavbarWithSearch";
import Api from "../Component/Api";
import Footer from "../Component/Footer";
import Totop from "../Component/Totop";
import { Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const StorePage = () => {
  const {
    value,
    Fetchdata,
    addToCart,
    removeFromCart,
    addToFavorite,
    Favorites,
  } = useDommy();

  useEffect(() => {
    Fetchdata();
  }, []);

  const favoriteItems = Array.isArray(Favorites) ? Favorites : [];
  const isFavorite = (item) => favoriteItems.some((fav) => fav.id === item.id);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* ✅ Fixed Navbar (untouched, same as your original) */}
      <Navbar />

      {/* ✅ Add a spacer div to create space for fixed navbar height */}
      <div className="h-[70px]"></div>

      {/* ✅ NavbarWithSearch appears right below main navbar */}
      <div className="sticky top-[70px] z-40 bg-white shadow-md border-t border-gray-200">
        <NavbarWithSearch />
      </div>

      {/* ✅ Push content below both navbars */}
      <div className="pt-5 px-5">
        <h2 className="text-3xl font-bold mb-5 text-gray-800">
          Shop Products
        </h2>

        <div className="flex flex-wrap justify-center gap-6">
          {value.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-3 border border-gray-100 rounded-lg p-4 shadow-sm w-full sm:w-[48%] md:w-[30%] lg:w-[22%] relative bg-white"
            >
              {/* ❤️ Favorite Icon */}
              <AnimatePresence>
                <motion.button
                  onClick={() => addToFavorite(item)}
                  initial={{ scale: 1 }}
                  animate={{ scale: isFavorite(item) ? 1.3 : 1 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 500, damping: 20 }}
                  className={`absolute top-2 right-2 z-20 p-1 rounded-full shadow transition-transform ${
                    isFavorite(item) ? "bg-red-500" : "bg-white"
                  }`}
                >
                  <Heart
                    size={20}
                    className={isFavorite(item) ? "text-white" : "text-red-500"}
                  />
                </motion.button>
              </AnimatePresence>

              {/* Product Display */}
              <Api data1={item} />

              {/* Cart Buttons */}
              <div className="flex gap-3 mt-2">
                <button
                  onClick={() => addToCart(item)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Add to Cart
                </button>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
      <Totop />
    </div>
  );
};

export default StorePage;
