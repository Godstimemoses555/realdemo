import React from "react";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";



const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-20">
      <div className="max-w-6xl mx-auto px-6 md:px-10 text-center md:text-left grid md:grid-cols-3 gap-8">

        {/* Logo or Brand */}
        <div className="flex flex-col items-center md:items-start">
          <h1 className="text-2xl font-bold text-blue-500">
            Shop<span className="text-white">Ease</span>
          </h1>
          <p className="text-sm text-gray-400 mt-2 max-w-xs">
            Your one-stop online store for quality products at affordable prices.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-lg font-semibold mb-3 text-white">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-blue-400 transition">Home</a></li>
            <li><a href="/store" className="hover:text-blue-400 transition">Store</a></li>
            <li><a href="/details" className="hover:text-blue-400 transition">Details</a></li>
            <li><a href="/checkout" className="hover:text-blue-400 transition">Checkout</a></li>
          </ul>
        </div>

        {/* Social Links */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-lg font-semibold mb-3 text-white">Follow Us</h3>
          <div className="flex items-center gap-5">
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition transform hover:scale-110"
            >
              <Twitter size={20} />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition transform hover:scale-110"
            >
              <Facebook size={20} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-500 transition transform hover:scale-110"
            >
              <Instagram size={20} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500 transition transform hover:scale-110"
            >
              <Linkedin size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom line */}
      <div className="border-t border-gray-700 mt-10 pt-4 text-center">
        <p className="text-sm text-gray-400">
          © {new Date().getFullYear()} Design by <span className="text-blue-400 font-semibold">MosTech</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
