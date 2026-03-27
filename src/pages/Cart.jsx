import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiTrash2,
  FiPlus,
  FiMinus,
  FiShoppingBag,
  FiArrowLeft,
} from "react-icons/fi";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../utils/helpers";
import { products } from "../data/products";

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();
  const [promoCode, setPromoCode] = useState("");
  const [shipping, setShipping] = useState(5.99);
  const [discount, setDiscount] = useState(0);


  const subtotal = cart.total;
  const total = subtotal + shipping - discount;

  // Get recommended products (products not in cart)
  const cartProductIds = cart.items.map((item) => item.id);
  const recommendedProducts = products
    .filter((p) => !cartProductIds.includes(p.id))
    .slice(0, 3);

  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center px-4">
          <FiShoppingBag className="w-20 h-20 mx-auto text-gray-400 dark:text-gray-600 mb-4" />
          <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
            Your cart is empty
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Looks like you haven't added anything to your cart yet
          </p>
          <Link
            to="/shop"
            className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header with back button */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Shopping Cart
          </h1>
          <button
            onClick={() => navigate("/shop")}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors"
          >
            <FiArrowLeft className="w-4 h-4" />
            <span>Continue Shopping</span>
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
              <div className="p-6">
                {cart.items.map((item, index) => (
                  <motion.div
                    key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex flex-col sm:flex-row gap-4 py-6 border-b border-gray-200 dark:border-gray-700 last:border-0"
                  >
                    {/* Product Image */}
                    <Link to={`/product/${item.id}`} className="flex-shrink-0">
                      <img
                        src={
                          item.images?.[0] || "https://via.placeholder.com/100"
                        }
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded-lg hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          e.target.src =
                            "https://via.placeholder.com/100?text=No+Image";
                        }}
                      />
                    </Link>

                    {/* Product Details */}
                    <div className="flex-1">
                      <Link to={`/product/${item.id}`}>
                        <h3 className="font-semibold text-gray-900 dark:text-white hover:text-green-600 dark:hover:text-green-400 transition-colors">
                          {item.name}
                        </h3>
                      </Link>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        Size: {item.selectedSize} | Color: {item.selectedColor}
                      </p>
                      <p className="text-green-600 dark:text-green-400 font-semibold mt-2">
                        {formatPrice(item.price)}
                      </p>
                    </div>

                    {/* Quantity and Remove */}
                    <div className="flex items-center justify-between sm:justify-end gap-6">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              item.quantity - 1,
                              item.selectedSize,
                              item.selectedColor,
                            )
                          }
                          className="p-1 border border-gray-300 dark:border-gray-600 rounded hover:border-green-500 dark:hover:border-green-400 transition-colors text-gray-700 dark:text-gray-300"
                        >
                          <FiMinus className="w-4 h-4" />
                        </button>
                        <span className="w-12 text-center font-medium text-gray-900 dark:text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              item.quantity + 1,
                              item.selectedSize,
                              item.selectedColor,
                            )
                          }
                          className="p-1 border border-gray-300 dark:border-gray-600 rounded hover:border-green-500 dark:hover:border-green-400 transition-colors text-gray-700 dark:text-gray-300"
                        >
                          <FiPlus className="w-4 h-4" />
                        </button>
                      </div>
                      <button
                        onClick={() =>
                          removeFromCart(
                            item.id,
                            item.selectedSize,
                            item.selectedColor,
                          )
                        }
                        className="text-red-500 hover:text-red-600 transition-colors p-1"
                      >
                        <FiTrash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Clear Cart Button */}
              {cart.items.length > 0 && (
                <div className="bg-gray-50 dark:bg-gray-900 px-6 py-4 border-t border-gray-200 dark:border-gray-700">
                  <button
                    onClick={clearCart}
                    className="text-red-500 hover:text-red-600 transition-colors text-sm"
                  >
                    Clear Cart
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                Order Summary
              </h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Subtotal ({cart.itemCount} items)</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-{formatPrice(discount)}</span>
                  </div>
                )}
                <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
                  <div className="flex justify-between font-bold text-lg text-gray-900 dark:text-white">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>
              </div>



              <button
                onClick={() => navigate("/checkout")}
                className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors shadow-md hover:shadow-lg font-semibold"
              >
                Proceed to Checkout
              </button>
            </div>

            {/* Recommended Products */}
            {recommendedProducts.length > 0 && (
              <div className="mt-8">
                <h3 className="font-semibold mb-4 text-gray-900 dark:text-white">
                  You might also like
                </h3>
                <div className="space-y-3">
                  {recommendedProducts.map((product) => (
                    <Link
                      key={product.id}
                      to={`/product/${product.id}`}
                      className="flex items-center space-x-3 p-3 bg-white dark:bg-gray-800 rounded-lg hover:shadow-md transition-shadow group"
                    >
                      <img
                        src={
                          product.images?.[0] ||
                          "https://via.placeholder.com/60"
                        }
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded group-hover:scale-105 transition-transform"
                        onError={(e) => {
                          e.target.src =
                            "https://via.placeholder.com/60?text=No+Image";
                        }}
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                          {product.name}
                        </h4>
                        <p className="text-green-600 dark:text-green-400 text-sm">
                          {formatPrice(product.price)}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
