import React, { useEffect, useState } from "react";
import { Trash2, Plus, Minus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navy = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [userInfo, setUserInfo] = useState({ name: "", address: "" });

  // ✅ Fetch cart items + favorites
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products?limit=3");
        const data = await res.json();

        // Base cart items from API
        const itemsWithQty = data.map((item) => ({
          id: item.id,
          name: item.title,
          price: Math.floor(item.price * 1500),
          image: item.image,
          quantity: 1,
        }));

        // ✅ Get favorites from localStorage
        const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];

        // Convert favorites to same structure as cart items
        const favItems = savedFavorites.map((item) => ({
          id: item.id,
          name: item.title,
          price: Math.floor(item.price * 1500),
          image: item.image,
          quantity: 1,
          isFavorite: true, // helps identify favorites
        }));

        // ✅ Merge both without duplicates
        const merged = [
          ...itemsWithQty,
          ...favItems.filter(
            (fav) => !itemsWithQty.some((cartItem) => cartItem.id === fav.id)
          ),
        ];

        setCartItems(merged);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, []);

  // ✅ Quantity functions
  const increaseQty = (id) =>
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );

  const decreaseQty = (id) =>
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );

  const removeItem = (id) => {
    // ✅ Remove from cart list
    setCartItems((prev) => prev.filter((item) => item.id !== id));

    // ✅ Also remove from favorites in localStorage if it exists there
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const updatedFavorites = savedFavorites.filter((item) => item.id !== id);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // ✅ Handle payment
  const handlePayment = () => {
    if (!userInfo.name || !userInfo.address) {
      alert("Please fill out your details before making payment.");
      return;
    }
    alert(`Payment of ₦${totalAmount.toLocaleString()} successful!`);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 flex flex-col lg:flex-row gap-8 lg:justify-center">
      {/* 🛒 Cart Items */}
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full lg:w-[60%]">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
          <h2 className="text-2xl font-semibold text-gray-800">Your Cart</h2>

          <button
            onClick={() => navy("/StorePage")}
            className="bg-blue-600 text-white text-sm sm:text-base px-4 py-2 rounded-lg hover:bg-blue-700 transition w-full sm:w-auto"
          >
            ← Back to Shop
          </button>
        </div>

        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-gray-200 py-4 gap-4"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 rounded-xl object-contain"
                />
                <div>
                  <h3 className="text-base sm:text-lg font-medium text-gray-800">
                    {item.name}
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base">
                    ₦{item.price.toLocaleString()}
                  </p>
                  {item.isFavorite && (
                    <p className="text-red-500 text-xs font-semibold mt-1">
                      ❤️ Added from Favorites
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-4">
                <div className="flex items-center gap-2 sm:gap-3">
                  <button
                    onClick={() => decreaseQty(item.id)}
                    className="p-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="px-2 font-semibold text-gray-700">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => increaseQty(item.id)}
                    className="p-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                  >
                    <Plus size={16} />
                  </button>
                </div>

                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-500 hover:text-red-600 transition"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600 text-center py-10">
            Your cart is currently empty.
          </p>
        )}
      </div>

      {/* 💳 Checkout */}
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full lg:w-[30%] h-fit">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Payment Details
        </h2>

        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Full Name"
            value={userInfo.name}
            onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
            className="border border-gray-300 rounded-lg px-4 py-2 text-sm sm:text-base focus:ring-2 focus:ring-blue-400 outline-none"
          />

          <textarea
            placeholder="Address"
            rows="3"
            value={userInfo.address}
            onChange={(e) =>
              setUserInfo({ ...userInfo, address: e.target.value })
            }
            className="border border-gray-300 rounded-lg px-4 py-2 text-sm sm:text-base focus:ring-2 focus:ring-blue-400 outline-none"
          />

          <div className="flex justify-between items-center mt-4">
            <h3 className="text-lg font-semibold text-gray-700">Total:</h3>
            <p className="text-xl font-bold text-blue-600">
              ₦{totalAmount.toLocaleString()}
            </p>
          </div>

          <button
            onClick={handlePayment}
            className="mt-4 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition text-sm sm:text-base"
          >
            Make Payment
          </button>

          {/* ✅ Continue Shopping Link */}
          <button
            onClick={() => navy("/StorePage")}
            className="text-blue-600 text-sm sm:text-base mt-3 underline hover:text-blue-800 transition mx-auto block"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
