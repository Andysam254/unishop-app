import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faSignInAlt,
  faUserCircle,
  faListAlt,
  faHeart,
  faQuestionCircle,
  faLifeRing,
  faShoppingBag,
  faCreditCard,
  faTruck,
  faUndo,
  faShieldAlt,
  faComments,
  faShoppingCart,
  faSearch,
  faChevronDown,
  faSignOutAlt, // Add this icon for logout
} from '@fortawesome/free-solid-svg-icons';
import { useUser } from '../context/UserContext'; // Import the useUser hook

export default function Navbar() {
  const { user, isAuthenticated, logout } = useUser(); // Get user, isAuthenticated, and logout from UserContext
  const navigate = useNavigate(); // Initialize useNavigate

  // Handle logout
  const handleLogout = () => {
    logout(); // Call the logout function from UserContext
    navigate('/login'); // Redirect to the login page
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-600 border-b border-gray-200 shadow-lg">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Left: App Name */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              {/* Replace with your logo if needed */}
              <FontAwesomeIcon icon={faUser} className="text-white text-2xl" />
              <span className="ml-2 text-xl font-bold text-white">Unishop</span>
            </Link>
          </div>
          {/* Center: Search Bar */}
          <div className="flex-1 mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products across categories..."
                className="w-full border border-gray-300 rounded-full py-3 pl-6 pr-16 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button className="absolute inset-y-0 right-0 flex items-center px-6 bg-blue-500 text-white rounded-r-full hover:bg-blue-600 transition-colors duration-300">
                <FontAwesomeIcon icon={faSearch} className="text-lg" />
              </button>
            </div>
          </div>
          {/* Right: Account, Help, Cart */}
          <div className="flex items-center space-x-6">
            {/* Account Dropdown */}
            <div className="relative group">
              <button className="flex items-center focus:outline-none">
                <FontAwesomeIcon icon={faUser} className="text-white" />
                <span className="ml-1 text-white">Account</span>
                <FontAwesomeIcon icon={faChevronDown} className="ml-1 text-white" />
              </button>
              {/* Dropdown Menu */}
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-300 z-50">
                <ul className="py-1">
                  {!isAuthenticated ? (
                    <>
                      <li>
                        <Link
                          to="/signin"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <FontAwesomeIcon icon={faSignInAlt} className="mr-2" />
                          Sign Up
                        </Link>
                      </li>
                      <hr className="border-gray-200" />
                      <li>
                        <Link
                          to="/login"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <FontAwesomeIcon icon={faUserCircle} className="mr-2" />
                          login
                        </Link>
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        <Link
                          to="/account"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <FontAwesomeIcon icon={faUserCircle} className="mr-2" />
                          My Account
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/orders"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <FontAwesomeIcon icon={faListAlt} className="mr-2" />
                          Orders
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/wishlist"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <FontAwesomeIcon icon={faHeart} className="mr-2" />
                          Wishlist
                        </Link>
                      </li>
                      <li>
                        <button
                          onClick={handleLogout} // Use the handleLogout function
                          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                          Logout
                        </button>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
            {/* Help Dropdown */}
            <div className="relative group">
              <button className="flex items-center focus:outline-none">
                <FontAwesomeIcon icon={faQuestionCircle} className="text-white" />
                <span className="ml-1 text-white">Help</span>
                <FontAwesomeIcon icon={faChevronDown} className="ml-1 text-white" />
              </button>
              {/* Dropdown Menu */}
              <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-300 z-50">
                <ul className="py-1">
                  <li>
                    <Link
                      to="/help-center"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <FontAwesomeIcon icon={faLifeRing} className="mr-2" />
                      Help Center
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/place-order"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <FontAwesomeIcon icon={faShoppingBag} className="mr-2" />
                      Place Your Order
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/payment-options"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <FontAwesomeIcon icon={faCreditCard} className="mr-2" />
                      Payment Options
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/delivery-timeline"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <FontAwesomeIcon icon={faTruck} className="mr-2" />
                      Delivery Timeline &amp; Track Your Order
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/returns-refunds"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <FontAwesomeIcon icon={faUndo} className="mr-2" />
                      Returns &amp; Refunds
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/warranty"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <FontAwesomeIcon icon={faShieldAlt} className="mr-2" />
                      Warranty
                    </Link>
                  </li>
                </ul>
                <div className="border-t border-gray-200">
                  <Link
                    to="/livechat"
                    className="flex items-center justify-center px-4 py-2 text-sm text-blue-600 hover:bg-gray-100"
                  >
                    <FontAwesomeIcon icon={faComments} className="mr-2" />
                    Live Chat
                  </Link>
                </div>
              </div>
            </div>
            {/* Cart */}
            <Link to="/cart" className="flex items-center">
              <FontAwesomeIcon icon={faShoppingCart} className="text-white" />
              <span className="ml-1 text-white">Cart</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}