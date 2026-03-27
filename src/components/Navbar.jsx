import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import {
  FiShoppingBag,
  FiHeart,
  FiUser,
  FiMenu,
  FiX,
  FiSun,
  FiMoon,
  FiSearch,
  FiLogOut,
  FiSettings,
} from "react-icons/fi";
import { products } from "../data/products";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showColorMenu, setShowColorMenu] = useState(false);
  const { cart } = useCart();
  const { wishlist } = useWishlist();
  const { darkMode, toggleTheme, accentColor, changeAccentColor } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (searchQuery.length > 1) {
      const results = products
        .filter(
          (p) =>
            p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.brand.toLowerCase().includes(searchQuery.toLowerCase()),
        )
        .slice(0, 5);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const handleSearch = (productId) => {
    setSearchOpen(false);
    setSearchQuery("");
    navigate(`/product/${productId}`);
  };

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    navigate("/");
  };

  const getAccentGradient = () => {
    switch (accentColor) {
      case "secondary":
        return "from-blue-500 to-blue-600";
      case "accent":
        return "from-orange-500 to-orange-600";
      default:
        return "from-green-500 to-green-600";
    }
  };

  const getAccentTextColor = () => {
    switch (accentColor) {
      case "secondary":
        return "text-blue-600 dark:text-blue-400";
      case "accent":
        return "text-orange-600 dark:text-orange-400";
      default:
        return "text-green-600 dark:text-green-400";
    }
  };

  const accentColors = [
    {
      name: "Green",
      value: "primary",
      color: "#22c55e",
      gradient: "from-green-500 to-green-600",
    },
    {
      name: "Blue",
      value: "secondary",
      color: "#3b82f6",
      gradient: "from-blue-500 to-blue-600",
    },
    {
      name: "Orange",
      value: "accent",
      color: "#f97316",
      gradient: "from-orange-500 to-orange-600",
    },
  ];

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "Sale", path: "/shop?category=sale" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/95 dark:bg-[#0f172a]/95 backdrop-blur-md shadow-lg"
            : "bg-white dark:bg-[#0f172a]"
        } border-b border-gray-200 dark:border-gray-800`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 font-bold">
            {/* Logo */}
            <Link
              to="/"
              className={`text-xl sm:text-2xl font-bold bg-gradient-to-r ${getAccentGradient()} bg-clip-text text-transparent transition-all duration-300`}
            >
              RAKSA STORE
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-300 text-sm xl:text-base"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Icons */}
            <div className="flex items-center space-x-1 sm:space-x-2">
              {/* Search */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-1.5 sm:p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-all duration-300 hover:scale-110"
                aria-label="Search"
              >
                <FiSearch className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-1.5 sm:p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-all duration-300 hover:scale-110"
                aria-label="Toggle theme"
              >
                {darkMode ? (
                  <FiSun className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />
                ) : (
                  <FiMoon className="w-4 h-4 sm:w-5 sm:h-5" />
                )}
              </button>

              {/* Accent Color Picker */}
              <div className="relative hidden sm:block">
                <button
                  onClick={() => setShowColorMenu(!showColorMenu)}
                  className="p-1.5 sm:p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-all duration-300 hover:scale-110"
                  aria-label="Change accent color"
                >
                  <FiSettings
                    className={`w-4 h-4 sm:w-5 sm:h-5 ${getAccentTextColor()}`}
                  />
                </button>

                {showColorMenu && (
                  <div className="absolute right-0 mt-2 w-40 sm:w-48 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl py-2 z-50 border border-gray-200 dark:border-gray-700 animate-fade-in">
                    <div className="px-3 sm:px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                      <p className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white">
                        Accent Color
                      </p>
                    </div>
                    {accentColors.map((color) => (
                      <button
                        key={color.value}
                        onClick={() => {
                          changeAccentColor(color.value);
                          setShowColorMenu(false);
                        }}
                        className="w-full px-3 sm:px-4 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-2 sm:gap-3 group"
                      >
                        <div
                          className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-gradient-to-r ${color.gradient} shadow-md group-hover:scale-110 transition-transform`}
                        ></div>
                        <span className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                          {color.name}
                        </span>
                        {accentColor === color.value && (
                          <svg
                            className="ml-auto w-3 h-3 sm:w-4 sm:h-4 text-green-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 13l4 4L19 7"
                            ></path>
                          </svg>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Wishlist */}
              <Link
                to="/wishlist"
                className="relative p-1.5 sm:p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-all duration-300 hover:scale-110"
                aria-label="Wishlist"
              >
                <FiHeart className="w-4 h-4 sm:w-5 sm:h-5" />
                {wishlist.items.length > 0 && (
                  <span
                    className={`absolute -top-1 -right-1 bg-gradient-to-r ${getAccentGradient()} text-white text-[10px] sm:text-xs rounded-full min-w-[16px] sm:min-w-[18px] h-4 sm:h-[18px] flex items-center justify-center px-1 animate-pulse-slow`}
                  >
                    {wishlist.items.length}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <Link
                to="/cart"
                className="relative p-1.5 sm:p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-all duration-300 hover:scale-110"
                aria-label="Cart"
              >
                <FiShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
                {cart.itemCount > 0 && (
                  <span
                    className={`absolute -top-1 -right-1 bg-gradient-to-r ${getAccentGradient()} text-white text-[10px] sm:text-xs rounded-full min-w-[16px] sm:min-w-[18px] h-4 sm:h-[18px] flex items-center justify-center px-1 animate-pulse-slow`}
                  >
                    {cart.itemCount}
                  </span>
                )}
              </Link>

              {/* User Menu */}
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="p-1.5 sm:p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-all duration-300 hover:scale-110"
                  aria-label="User menu"
                >
                  {user ? (
                    <img
                      src={
                        user.profilePicture ||
                        `https://ui-avatars.com/api/?background=22c55e&color=fff&size=32&name=${user.name}`
                      }
                      alt={user.name}
                      className="w-4 h-4 sm:w-5 sm:h-5 rounded-full object-cover ring-2 ring-green-500"
                    />
                  ) : (
                    <FiUser className="w-4 h-4 sm:w-5 sm:h-5" />
                  )}
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 sm:w-56 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl py-2 z-50 border border-gray-200 dark:border-gray-700 animate-fade-in">
                    {user ? (
                      <>
                        <div className="px-3 sm:px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                          <p className="font-semibold text-xs sm:text-sm text-gray-900 dark:text-white truncate">
                            {user.name}
                          </p>
                          <p className="text-[10px] sm:text-xs text-gray-500 truncate">
                            {user.email}
                          </p>
                        </div>
                        <Link
                          to="/profile"
                          onClick={() => setShowUserMenu(false)}
                          className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                          <FiUser className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span>My Profile</span>
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left"
                        >
                          <FiLogOut className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span>Logout</span>
                        </button>
                      </>
                    ) : (
                      <>
                        <Link
                          to="/login"
                          onClick={() => setShowUserMenu(false)}
                          className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                          <FiUser className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span>Sign In</span>
                        </Link>
                        <Link
                          to="/register"
                          onClick={() => setShowUserMenu(false)}
                          className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                          <FiUser className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span>Sign Up</span>
                        </Link>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden p-1.5 sm:p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-all duration-300"
                aria-label="Menu"
              >
                {isOpen ? (
                  <FiX className="w-4 h-4 sm:w-5 sm:h-5 font-bold" />
                ) : (
                  <FiMenu className="w-4 h-4 sm:w-5 sm:h-5 font-bold" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Search Overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-16 left-0 right-0 bg-white dark:bg-gray-900 shadow-2xl z-40 border-b border-gray-200 dark:border-gray-800"
          >
            <div className="max-w-2xl mx-auto px-4 py-3 sm:py-4">
              <input
                type="text"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-800 dark:text-white transition-all duration-300"
                autoFocus
              />
              {searchResults.length > 0 && (
                <div className="mt-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                  {searchResults.map((product) => (
                    <button
                      key={product.id}
                      onClick={() => handleSearch(product.id)}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center space-x-3"
                    >
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-8 h-8 sm:w-10 sm:h-10 object-cover rounded-lg"
                      />
                      <div>
                        <p className="text-sm sm:text-base font-medium text-gray-900 dark:text-white">
                          {product.name}
                        </p>
                        <p className="text-xs sm:text-sm text-gray-500">
                          ${product.price}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="fixed top-16 left-0 bottom-0 w-72 sm:w-80 bg-white dark:bg-gray-900 shadow-2xl z-40 lg:hidden overflow-y-auto"
          >
            <div className="flex flex-col p-4 sm:p-6 space-y-3 sm:space-y-4 font-bold">
              {/* Navigation Links */}
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="py-2 text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors text-base sm:text-lg"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}

              {/* Accent Color Picker for Mobile */}
              <div className="pt-3 border-t border-gray-200 dark:border-gray-800">
                <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  Accent Color
                </p>
                <div className="flex gap-3">
                  {accentColors.map((color) => (
                    <button
                      key={color.value}
                      onClick={() => {
                        changeAccentColor(color.value);
                        setIsOpen(false);
                      }}
                      className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r ${color.gradient} shadow-md hover:scale-110 transition-transform ${
                        accentColor === color.value
                          ? "ring-2 ring-offset-2 ring-green-500"
                          : ""
                      }`}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>

              {/* User Auth Links */}
              {!user ? (
                <>
                  <div className="border-t border-gray-200 dark:border-gray-800 pt-3"></div>
                  <Link
                    to="/login"
                    className="py-2 text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors text-base sm:text-lg"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="py-2 text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors text-base sm:text-lg"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              ) : (
                <>
                  <div className="border-t border-gray-200 dark:border-gray-800 pt-3"></div>
                  <div className="flex items-center gap-3 py-2">
                    <img
                      src={
                        user.profilePicture ||
                        `https://ui-avatars.com/api/?background=22c55e&color=fff&size=40&name=${user.name}`
                      }
                      alt={user.name}
                      className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold text-sm sm:text-base text-gray-900 dark:text-white">
                        {user.name}
                      </p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                  </div>
                  <Link
                    to="/profile"
                    className="py-2 text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors text-base sm:text-lg"
                    onClick={() => setIsOpen(false)}
                  >
                    My Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="py-2 text-left text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors text-base sm:text-lg"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
