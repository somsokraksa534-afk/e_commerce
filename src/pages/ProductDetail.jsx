import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiShoppingCart,
  FiHeart,
  FiShare2,
  FiMinus,
  FiPlus,
  FiCheck,
  FiTruck,
  FiRefreshCw,
  FiShield,
  FiStar,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useTheme } from "../context/ThemeContext";
import { products, reviews } from "../data/products";
import { formatPrice } from "../utils/helpers";
import toast from "react-hot-toast";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("details");
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [mainImageLoaded, setMainImageLoaded] = useState(false);
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { accentColor } = useTheme();

  useEffect(() => {
    const foundProduct = products.find((p) => p.id === parseInt(id));
    if (foundProduct) {
      setProduct(foundProduct);
      setSelectedSize(foundProduct.sizes[0]);
      setSelectedColor(foundProduct.colors[0].name);
    } else {
      navigate("/shop");
    }
  }, [id, navigate]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600"></div>
      </div>
    );
  }

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

  const getAccentColor = () => {
    switch (accentColor) {
      case "secondary":
        return "text-blue-600 dark:text-blue-400";
      case "accent":
        return "text-orange-600 dark:text-orange-400";
      default:
        return "text-green-600 dark:text-green-400";
    }
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Please select a size");
      return;
    }
    addToCart(product, quantity, selectedSize, selectedColor);
  };

  const handleWishlist = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => Math.max(1, prev - 1));

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setSelectedImage(
      (prev) => (prev - 1 + product.images.length) % product.images.length,
    );
  };

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      {/* Breadcrumb */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-2 text-sm">
            <Link
              to="/"
              className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors"
            >
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <Link
              to="/shop"
              className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors"
            >
              Shop
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 dark:text-white font-medium">
              {product.name}
            </span>
          </div>
        </div>
      </div>

      {/* Main Product Section */}
      <div className="max-w-7xl mx-auto px-4 py-8 lg:py-12">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg group">
              {!mainImageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-700">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
                </div>
              )}
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className={`w-full h-auto object-cover transition-opacity duration-300 ${mainImageLoaded ? "opacity-100" : "opacity-0"}`}
                onLoad={() => setMainImageLoaded(true)}
              />

              {/* Navigation Buttons */}
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 p-2 rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-800 transition-all duration-300 opacity-0 group-hover:opacity-100"
                  >
                    <FiChevronLeft className="w-5 h-5 text-gray-800 dark:text-white" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 p-2 rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-800 transition-all duration-300 opacity-0 group-hover:opacity-100"
                  >
                    <FiChevronRight className="w-5 h-5 text-gray-800 dark:text-white" />
                  </button>
                </>
              )}

              {/* Discount Badge */}
              {product.discount > 0 && (
                <div className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1.5 rounded-full text-sm font-semibold shadow-lg">
                  -{product.discount}% OFF
                </div>
              )}
            </div>

            {/* Thumbnail Images */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`relative rounded-xl overflow-hidden border-2 transition-all duration-300 hover:scale-105 ${
                      selectedImage === idx
                        ? "border-green-500 dark:border-green-400 shadow-lg"
                        : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} view ${idx + 1}`}
                      className="w-full aspect-square object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Brand and Title */}
            <div>
              <p className="text-sm font-medium text-green-600 dark:text-green-400 mb-2">
                {product.brand}
              </p>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  <div className="flex text-yellow-400">
                    {"★".repeat(Math.floor(product.rating))}
                    {"☆".repeat(5 - Math.floor(product.rating))}
                  </div>
                  <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                    {product.rating} out of 5
                  </span>
                </div>
                <span className="text-gray-400">|</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {product.reviews} Reviews
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline space-x-3">
              <span className="text-3xl lg:text-4xl font-bold text-green-600 dark:text-green-400">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-lg text-gray-500 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
              {product.discount > 0 && (
                <span className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-2 py-1 rounded-lg text-sm font-semibold">
                  Save {product.discount}%
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed border-l-4 border-green-500 pl-4 py-2 bg-gray-50 dark:bg-gray-800/50 rounded-r-lg">
              {product.description}
            </p>

            {/* Color Selection */}
            <div>
              <h3 className="font-semibold mb-3 text-gray-900 dark:text-white">
                Color: <span className={getAccentColor()}>{selectedColor}</span>
              </h3>
              <div className="flex flex-wrap gap-3">
                {product.colors.map((color, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedColor(color.name)}
                    className={`relative group`}
                  >
                    <div
                      className={`w-12 h-12 rounded-full border-2 transition-all duration-300 hover:scale-110 ${
                        selectedColor === color.name
                          ? "border-green-500 ring-2 ring-green-500 ring-offset-2 dark:ring-offset-gray-900"
                          : "border-gray-300 dark:border-gray-600"
                      }`}
                      style={{ backgroundColor: color.code }}
                    />
                    {selectedColor === color.name && (
                      <div className="absolute -top-1 -right-1 bg-green-500 rounded-full p-0.5">
                        <FiCheck className="w-3 h-3 text-white" />
                      </div>
                    )}
                    <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-600 dark:text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {color.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Size
                </h3>
                <button
                  onClick={() => setShowSizeGuide(true)}
                  className="text-sm text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 transition-colors"
                >
                  Size Guide
                </button>
              </div>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-[60px] px-4 py-2 border rounded-lg transition-all duration-300 ${
                      selectedSize === size
                        ? `border-green-500 bg-green-50 dark:bg-green-900/20 ${getAccentColor()} font-semibold`
                        : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-green-500 dark:hover:border-green-400"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="font-semibold mb-3 text-gray-900 dark:text-white">
                Quantity
              </h3>
              <div className="flex items-center space-x-4">
                <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
                  <button
                    onClick={decrementQuantity}
                    className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300"
                  >
                    <FiMinus className="w-4 h-4" />
                  </button>
                  <span className="w-16 text-center font-semibold text-gray-900 dark:text-white">
                    {quantity}
                  </span>
                  <button
                    onClick={incrementQuantity}
                    className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300"
                  >
                    <FiPlus className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-sm text-gray-500">In Stock</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={handleAddToCart}
                className={`flex-1 bg-gradient-to-r ${getAccentGradient()} text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl`}
              >
                <FiShoppingCart className="w-5 h-5" />
                <span>Add to Cart</span>
              </button>
              <button
                onClick={handleWishlist}
                className={`px-8 py-4 rounded-xl border-2 transition-all duration-300 flex items-center justify-center space-x-2 ${
                  isInWishlist(product.id)
                    ? "border-red-500 bg-red-50 dark:bg-red-900/20 text-red-500"
                    : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-green-500 dark:hover:border-green-400"
                }`}
              >
                <FiHeart
                  className={`w-5 h-5 ${isInWishlist(product.id) ? "fill-red-500" : ""}`}
                />
                <span>
                  {isInWishlist(product.id)
                    ? "Remove from Wishlist"
                    : "Add to Wishlist"}
                </span>
              </button>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  toast.success("Link copied to clipboard!");
                }}
                className="px-6 py-4 rounded-xl border border-gray-300 dark:border-gray-600 hover:border-green-500 dark:hover:border-green-400 transition-all duration-300 flex items-center justify-center text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400"
              >
                <FiShare2 className="w-5 h-5" />
              </button>
            </div>

            {/* Delivery Info */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-3">
                <FiTruck className="w-6 h-6 text-green-600 dark:text-green-400" />
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    Free Shipping
                  </p>
                  <p className="text-xs text-gray-500">On orders over $50</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <FiRefreshCw className="w-6 h-6 text-green-600 dark:text-green-400" />
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    Easy Returns
                  </p>
                  <p className="text-xs text-gray-500">30-day return policy</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <FiShield className="w-6 h-6 text-green-600 dark:text-green-400" />
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    Secure Payment
                  </p>
                  <p className="text-xs text-gray-500">100% secure checkout</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-16">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <div className="flex flex-wrap gap-8">
              {["details", "size-guide", "shipping", "reviews"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-4 text-lg font-semibold transition-all duration-300 relative ${
                    activeTab === tab
                      ? `${getAccentColor()} border-b-2 border-green-500`
                      : "text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400"
                  }`}
                >
                  {tab === "details" && "Product Details"}
                  {tab === "size-guide" && "Size Guide"}
                  {tab === "shipping" && "Shipping Info"}
                  {tab === "reviews" && `Reviews (${product.reviews})`}
                </button>
              ))}
            </div>
          </div>

          <div className="py-8">
            {activeTab === "details" && (
              <div className="space-y-6 max-w-3xl">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Product Details
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {product.description}
                </p>

                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 space-y-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    Key Features
                  </h4>
                  <ul className="space-y-2">
                    <li className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                      <FiCheck className="w-4 h-4 text-green-500" />
                      <span>Premium quality materials</span>
                    </li>
                    <li className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                      <FiCheck className="w-4 h-4 text-green-500" />
                      <span>Eco-friendly packaging</span>
                    </li>
                    <li className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                      <FiCheck className="w-4 h-4 text-green-500" />
                      <span>Ethically sourced</span>
                    </li>
                    <li className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                      <FiCheck className="w-4 h-4 text-green-500" />
                      <span>Machine washable</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-3 text-gray-900 dark:text-white">
                    Care Instructions
                  </h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
                    <li>Machine wash cold with similar colors</li>
                    <li>Do not bleach</li>
                    <li>Tumble dry low</li>
                    <li>Iron low if needed</li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === "size-guide" && (
              <div className="max-w-2xl">
                <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">
                  Size Guide
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-100 dark:bg-gray-800">
                        <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left text-gray-900 dark:text-white">
                          Size
                        </th>
                        <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left text-gray-900 dark:text-white">
                          Chest (inches)
                        </th>
                        <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left text-gray-900 dark:text-white">
                          Waist (inches)
                        </th>
                        <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left text-gray-900 dark:text-white">
                          Hip (inches)
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-gray-900 dark:text-white font-medium">
                          XS
                        </td>
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-gray-600 dark:text-gray-400">
                          34-36
                        </td>
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-gray-600 dark:text-gray-400">
                          26-28
                        </td>
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-gray-600 dark:text-gray-400">
                          34-36
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-gray-900 dark:text-white font-medium">
                          S
                        </td>
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-gray-600 dark:text-gray-400">
                          36-38
                        </td>
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-gray-600 dark:text-gray-400">
                          28-30
                        </td>
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-gray-600 dark:text-gray-400">
                          36-38
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-gray-900 dark:text-white font-medium">
                          M
                        </td>
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-gray-600 dark:text-gray-400">
                          38-40
                        </td>
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-gray-600 dark:text-gray-400">
                          30-32
                        </td>
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-gray-600 dark:text-gray-400">
                          38-40
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-gray-900 dark:text-white font-medium">
                          L
                        </td>
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-gray-600 dark:text-gray-400">
                          40-42
                        </td>
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-gray-600 dark:text-gray-400">
                          32-34
                        </td>
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-gray-600 dark:text-gray-400">
                          40-42
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-gray-900 dark:text-white font-medium">
                          XL
                        </td>
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-gray-600 dark:text-gray-400">
                          42-44
                        </td>
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-gray-600 dark:text-gray-400">
                          34-36
                        </td>
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-gray-600 dark:text-gray-400">
                          42-44
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-sm text-gray-500 mt-4">
                  *Measurements are in inches. If you're between sizes, we
                  recommend sizing up.
                </p>
              </div>
            )}

            {activeTab === "shipping" && (
              <div className="space-y-6 max-w-2xl">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Shipping Information
                </h3>
                <div className="space-y-4">
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-5">
                    <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">
                      Standard Shipping
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      3-5 business days - $5.99
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Free on orders over $50
                    </p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-5">
                    <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">
                      Express Shipping
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      1-2 business days - $12.99
                    </p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-5">
                    <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">
                      International Shipping
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      5-10 business days - $24.99
                    </p>
                  </div>
                  <div className="mt-4">
                    <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">
                      Order Tracking
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      You'll receive a tracking number via email once your order
                      ships.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="space-y-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                      Customer Reviews
                    </h3>
                    <div className="flex items-center space-x-2">
                      <div className="flex text-yellow-400">
                        {"★".repeat(Math.floor(product.rating))}
                        {"☆".repeat(5 - Math.floor(product.rating))}
                      </div>
                      <span className="text-gray-600 dark:text-gray-400">
                        Based on {product.reviews} reviews
                      </span>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                    Write a Review
                  </button>
                </div>

                <div className="space-y-4">
                  {reviews[product.id]?.map((review) => (
                    <div
                      key={review.id}
                      className="border-b border-gray-200 dark:border-gray-700 pb-6"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white">
                            {review.user}
                          </p>
                          <div className="flex text-yellow-400 text-sm mt-1">
                            {"★".repeat(review.rating)}
                            {"☆".repeat(5 - review.rating)}
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">
                          {review.date}
                        </span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 mt-2">
                        {review.comment}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
              You May Also Like
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  to={`/product/${relatedProduct.id}`}
                  className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={relatedProduct.images[0]}
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                      {relatedProduct.name}
                    </h4>
                    <p className="text-green-600 dark:text-green-400 font-bold">
                      {formatPrice(relatedProduct.price)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Size Guide Modal */}
      {showSizeGuide && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setShowSizeGuide(false)}
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                Size Guide
              </h3>
              <button
                onClick={() => setShowSizeGuide(false)}
                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-700">
                    <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">
                      Size
                    </th>
                    <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">
                      Chest
                    </th>
                    <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">
                      Waist
                    </th>
                    <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">
                      Hip
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-medium">
                      XS
                    </td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                      34-36"
                    </td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                      26-28"
                    </td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                      34-36"
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-medium">
                      S
                    </td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                      36-38"
                    </td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                      28-30"
                    </td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                      36-38"
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-medium">
                      M
                    </td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                      38-40"
                    </td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                      30-32"
                    </td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                      38-40"
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-medium">
                      L
                    </td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                      40-42"
                    </td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                      32-34"
                    </td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                      40-42"
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-medium">
                      XL
                    </td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                      42-44"
                    </td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                      34-36"
                    </td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                      42-44"
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <button
              onClick={() => setShowSizeGuide(false)}
              className="mt-6 w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
