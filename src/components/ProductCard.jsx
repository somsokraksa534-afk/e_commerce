import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiHeart, FiShoppingCart, FiEye, FiX } from "react-icons/fi";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useTheme } from "../context/ThemeContext";
import { formatPrice } from "../utils/helpers";

const defaultImage =
  "https://via.placeholder.com/400x400?text=No+Image+Available";

const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showQuickView, setShowQuickView] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { accentColor } = useTheme();

  const liked = isInWishlist(product.id);

  // Get the current image URL with fallback
  const currentImage = () => {
    if (imageError) return defaultImage;
    if (product.images && product.images[selectedImage]) {
      return product.images[selectedImage];
    }
    return defaultImage;
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const handleWishlist = () => {
    if (liked) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleAddToCart = () => {
    addToCart(
      product,
      1,
      product.sizes?.[0] || "M",
      product.colors?.[0]?.name || "Default",
    );
  };

  const getAccentGradient = () => {
    switch (accentColor) {
      case "secondary":
        return "from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700";
      case "accent":
        return "from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700";
      default:
        return "from-green-500 to-green-600 hover:from-green-600 hover:to-green-700";
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

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative overflow-hidden bg-gray-100 dark:bg-gray-700">
          <Link to={`/product/${product.id}`}>
            <img
              src={currentImage()}
              alt={product.name || "Product Image"}
              className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              onError={handleImageError}
            />
          </Link>

          {/* Quick Actions */}
          <div
            className={`absolute top-4 right-4 flex flex-col space-y-2 transition-all duration-300 ${isHovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"}`}
          >
            <button
              onClick={handleWishlist}
              className="bg-white dark:bg-gray-800 p-2.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
              aria-label="Add to wishlist"
            >
              <FiHeart
                className={`w-5 h-5 transition-colors ${liked ? "fill-red-500 text-red-500" : "text-gray-600 dark:text-gray-400 hover:text-red-500"}`}
              />
            </button>
            <button
              onClick={() => setShowQuickView(true)}
              className="bg-white dark:bg-gray-800 p-2.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
              aria-label="Quick view"
            >
              <FiEye className="w-5 h-5 text-gray-600 dark:text-gray-400 hover:text-blue-500" />
            </button>
          </div>

          {/* Discount Badge */}
          {product.discount > 0 && (
            <div className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1.5 rounded-full text-sm font-semibold shadow-lg animate-pulse-slow">
              -{product.discount}% OFF
            </div>
          )}

          {/* New Badge */}
          {product.id <= 4 && (
            <div className="absolute top-4 left-4 bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-1.5 rounded-full text-sm font-semibold shadow-lg">
              NEW
            </div>
          )}

          {/* Color Swatches - Only show if colors exist */}
          {product.colors && product.colors.length > 0 && (
            <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
              {product.colors.slice(0, 4).map((color, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-8 h-8 rounded-full border-2 transition-all duration-300 hover:scale-110 ${
                    selectedImage === idx
                      ? "border-white ring-2 ring-offset-2 ring-green-500 dark:ring-offset-gray-800 scale-110"
                      : "border-transparent hover:border-white"
                  }`}
                  style={{ backgroundColor: color.code || "#cccccc" }}
                  title={color.name || `Color ${idx + 1}`}
                  aria-label={`Select color ${color.name || idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        <div className="p-5">
          <Link to={`/product/${product.id}`}>
            <h3 className="text-lg font-semibold mb-1 hover:text-green-600 dark:hover:text-green-400 transition-colors line-clamp-1 text-gray-900 dark:text-white">
              {product.name || "Product Name"}
            </h3>
          </Link>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
            {product.brand || "Brand"}
          </p>

          <div className="flex items-center justify-between mb-4">
            <div>
              <span className={`text-xl font-bold ${getAccentTextColor()}`}>
                {formatPrice(product.price || 0)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-gray-500 line-through ml-2">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
            <div className="flex items-center bg-yellow-50 dark:bg-yellow-900/30 px-2 py-1 rounded-lg">
              <span className="text-yellow-500 text-sm">★</span>
              <span className="text-sm font-semibold ml-1 text-gray-900 dark:text-white">
                {product.rating || 0}
              </span>
            </div>
          </div>

          {/* Buttons Container */}
          <div className="flex gap-2">
            <Link
              to={`/product/${product.id}`}
              className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-2.5 rounded-xl 
                       hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <FiEye className="w-4 h-4" />
              <span className="font-medium">View Details</span>
            </Link>
            <button
              onClick={handleAddToCart}
              className={`flex-1 bg-gradient-to-r ${getAccentGradient()} text-white py-2.5 rounded-xl 
                         transition-all duration-300 flex items-center justify-center space-x-2 
                         shadow-md hover:shadow-xl hover:scale-105 active:scale-95`}
            >
              <FiShoppingCart className="w-4 h-4" />
              <span className="font-medium">Add</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Quick View Modal with Exit Button */}
      {showQuickView && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in p-4"
          onClick={() => setShowQuickView(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white dark:bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Exit Button - Close Modal */}
            <button
              onClick={() => setShowQuickView(false)}
              className="absolute top-4 right-4 z-10 bg-white dark:bg-gray-700 p-2 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-300 hover:scale-110"
              aria-label="Close modal"
            >
              <FiX className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            </button>

            <div className="grid md:grid-cols-2 gap-6 p-6">
              <div>
                <img
                  src={product.images?.[0] || defaultImage}
                  alt={product.name}
                  className="w-full rounded-xl shadow-lg"
                  onError={(e) => {
                    e.target.src = defaultImage;
                  }}
                />
                {product.images && product.images.length > 1 && (
                  <div className="flex gap-2 mt-4">
                    {product.images.slice(0, 3).map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        alt=""
                        className="w-20 h-20 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                        onError={(e) => {
                          e.target.src = defaultImage;
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
                  {product.name}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-2">
                  {product.brand}
                </p>
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    {"★".repeat(Math.floor(product.rating || 0))}
                    {"☆".repeat(5 - Math.floor(product.rating || 0))}
                  </div>
                  <span className="ml-2 text-sm text-gray-500">
                    ({product.reviews || 0} reviews)
                  </span>
                </div>
                <div className="mb-4">
                  <span
                    className={`text-2xl font-bold ${getAccentTextColor()}`}
                  >
                    {formatPrice(product.price || 0)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-gray-500 line-through ml-2">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-6 line-clamp-3">
                  {product.description || "No description available"}
                </p>
                <div className="flex gap-3">
                  <Link
                    to={`/product/${product.id}`}
                    className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-3 rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300 flex items-center justify-center space-x-2"
                    onClick={() => setShowQuickView(false)}
                  >
                    <FiEye className="w-5 h-5" />
                    <span>View Full Details</span>
                  </Link>
                  <button
                    onClick={() => {
                      handleAddToCart();
                      setShowQuickView(false);
                    }}
                    className={`flex-1 bg-gradient-to-r ${getAccentGradient()} text-white py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg`}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default ProductCard;
