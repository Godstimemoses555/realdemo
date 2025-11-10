import React from "react";
import { Heart, Home, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useDommy } from "../../Store";

const Navbar = ({ product }) => {
  const { addToFavorite } = useDommy();

  const handleAddFavorite = () => {
    if (product) {
      addToFavorite(product);
      console.log("Added to favorites:", product);
      // Optional: show a toast or alert
      alert(`${product.title} added to favorites!`);
    }
  };

  return (
    <nav className="bg-white shadow-md px-6 py-3 flex justify-between items-center">
      {/* Logo / Brand */}
      <div className="text-2xl font-bold text-gray-800">ShopEase</div>

      {/* Navigation Links */}
      <ul className="flex space-x-6 items-center">
        <li>
          <Link
            to="/"
            className="flex items-center gap-1 text-gray-700 hover:text-gray-900 transition-colors"
          >
            <Home size={20} /> Home
          </Link>
        </li>
        <li>
          <Link
            to="/store"
            className="flex items-center gap-1 text-gray-700 hover:text-gray-900 transition-colors"
          >
            Store
          </Link>
        </li>
        <li>
          <Link
            to="/cart"
            className="flex items-center gap-1 text-gray-700 hover:text-gray-900 transition-colors"
          >
            <ShoppingCart size={20} /> Cart
          </Link>
        </li>

        {/* Favorite Heart Icon - No routing */}
        <li>
          <Heart
            size={24}
            className="text-red-500 cursor-pointer hover:scale-110 transition-transform"
            onClick={handleAddFavorite}
          />
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
