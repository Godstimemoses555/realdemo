import React, { useState } from "react";
import { Heart, ShoppingCart, Menu, X, ArrowLeft } from "lucide-react";
import { useDommy } from "../../Store";
import { useNavigate, Link } from "react-router-dom";

const Navbar = () => {
  const { Favorites, Cart } = useDommy();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md border-b border-gray-200 z-50">
      <div className="flex justify-between items-center px-6 py-3">
        {/* Left: Logo */}
        <h1
          className="text-2xl font-bold cursor-pointer text-gray-800 hover:text-blue-600 transition"
          onClick={() => navigate("/")}
        >
          ShopEase
        </h1>

        {/* Center: Links (Desktop) */}
        <div className="hidden md:flex items-center gap-6 text-gray-700 font-medium">
          <Link to="/" className="hover:text-blue-600 transition">Home</Link>
          <Link to="/storepage" className="hover:text-blue-600 transition">Shop</Link>
          <Link to="/cart" className="hover:text-blue-600 transition">Cart</Link>
        </div>

        {/* Right: Icons + Hamburger */}
        <div className="flex items-center gap-4">
          {/* Favorite Heart */}
          <button className="relative" onClick={() => navigate("/favorites")}>
            <Heart
              size={26}
              className="text-red-500 hover:scale-110 transition-transform"
            />
            {Favorites.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {Favorites.length}
              </span>
            )}
          </button>

          {/* Cart Icon */}
          <button className="relative" onClick={() => navigate("/cart")}>
            <ShoppingCart
              size={26}
              className="text-blue-600 hover:scale-110 transition-transform"
            />
            {Cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {Cart.length}
              </span>
            )}
          </button>

          {/* Mobile Hamburger */}
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={30} /> : <Menu size={30} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden flex flex-col items-center justify-center bg-white border-t border-gray-200 px-6 py-4 gap-4">
          {/* Back to Home Button */}
          <button
            onClick={() => { navigate("/"); setMenuOpen(false); }}
            className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition"
          >
            <ArrowLeft size={16} /> Back to Home
          </button>

          {/* Mobile Links */}
          <Link to="/storepage" onClick={() => setMenuOpen(false)} className="hover:text-blue-600 transition">
            Shop
          </Link>
          <Link to="/cart" onClick={() => setMenuOpen(false)} className="hover:text-blue-600 transition">
            Cart
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
