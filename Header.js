import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { Logo_link } from "../utils/common";

const Heading = () => {
  const cartItems = useSelector((store) => store.cart.items);

  return (
    <div className="flex flex-wrap justify-between items-center sticky top-0 z-20 bg-white shadow-md border-b border-gray-300 h-24 px-6">
      <a href="/">
        <img src={Logo_link} alt="Logo" className="w-24 h-24 object-contain" />
      </a>
      <div className="flex flex-wrap items-center">
        <ul className="flex gap-8">
          <li>
            <Link
              className="text-lg font-semibold text-gray-800 hover:text-black transition-colors duration-200"
              to="/"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              className="text-lg font-semibold text-gray-800 hover:text-black transition-colors duration-200"
              to="/about"
            >
              About Us
            </Link>
          </li>
          <li>
            <Link
              className="text-lg font-semibold text-gray-800 hover:text-black transition-colors duration-200"
              to="/contact"
            >
              Contact Us
            </Link>
          </li>
          <li>
            <Link
              className="text-lg font-semibold text-gray-800 hover:text-black transition-colors duration-200 flex items-center"
              to="/cart"
            >
              <FontAwesomeIcon icon={faShoppingCart} />
              <span className="ml-2">{cartItems.length}</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Heading;
