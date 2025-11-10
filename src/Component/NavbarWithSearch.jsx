import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, ArrowLeft, ShoppingCart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useDommy } from "../../Store";

const NavbarWithSearch = () => {
  const { value } = useDommy();
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [openSearch, setOpenSearch] = useState(false);
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const containerRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpenSearch(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Filter products
  useEffect(() => {
    if (!query.trim()) {
      setFiltered([]);
      return;
    }

    const results = value.filter((item) =>
      item.title.toLowerCase().includes(query.toLowerCase())
    );

    if (results.length === 0) {
      const randomFew = [...value].sort(() => 0.5 - Math.random()).slice(0, 4);
      setFiltered(randomFew);
    } else {
      setFiltered(results.slice(0, 8));
    }
  }, [query, value]);

  return (
    <div
      ref={containerRef}
      className="fixed top-[70px] left-0 right-0 bg-white/80 backdrop-blur-md shadow-md z-40 px-4 sm:px-5 py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-gray-200 gap-2 sm:gap-0"
    >
      {/* Logo and pages */}
      <div className="flex items-center gap-4 sm:gap-6 w-full sm:w-auto justify-between">
        <Link
          to="/Cart"
          className="text-2xl font-bold text-blue-600 hover:scale-105 transition-transform"
        >
          Shop<span className="text-gray-800">Ease</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-4 text-gray-700 font-medium">
          <Link to="/" className="hover:text-blue-600 transition">
            Home
          </Link>
          <Link to="/storepage" className="hover:text-blue-600 transition">
            Shop
          </Link>
        </div>
      </div>

      {/* Search input */}
      <div className="relative flex-1 max-w-full sm:max-w-lg w-full">
        <motion.div
          animate={{ width: "100%" }}
          transition={{ type: "spring", stiffness: 250, damping: 30 }}
          className="flex items-center bg-gray-100 rounded-full px-3 py-2 border border-gray-200"
        >
          <Search size={18} className="text-gray-600" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search products..."
            value={query}
            onFocus={() => setOpenSearch(true)}
            onChange={(e) => setQuery(e.target.value)}
            className="bg-transparent outline-none text-sm px-3 w-full"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="text-xs text-gray-500 hover:text-gray-700"
            >
              Clear
            </button>
          )}
        </motion.div>

        {/* Search dropdown */}
        <AnimatePresence>
          {openSearch && query && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="absolute left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-200 z-50 sm:max-h-64 max-h-[60vh] overflow-y-auto"
            >
              <div className="p-2">
                {filtered.length > 0 ? (
                  filtered.map((item, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        setQuery("");
                        setOpenSearch(false);
                        navigate(`/details/${item.id}`);
                      }}
                      className="flex items-center justify-between gap-3 px-3 py-2 rounded-md hover:bg-gray-50 cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-10 h-10 object-cover rounded-md"
                          />
                        ) : (
                          <div className="w-10 h-10 bg-gray-100 rounded-md" />
                        )}
                        <div>
                          <div className="text-sm font-medium text-gray-800">
                            {item.title.length > 35
                              ? item.title.slice(0, 35) + "..."
                              : item.title}
                          </div>
                          <div className="text-xs text-gray-500">
                            ₦{item.price}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-sm text-gray-500 text-center py-4">
                    No products found. Showing related ones...
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-1 border px-3 py-2 rounded-lg hover:bg-gray-100 transition text-gray-700"
        >
          <ArrowLeft size={16} />
          Home
        </button>

        <Link
          to="/cartpage"
          className="p-2 border rounded-lg hover:bg-gray-100 transition relative"
        >
          <ShoppingCart size={18} />
        </Link>
      </div>
    </div>
  );
};

export default NavbarWithSearch;
