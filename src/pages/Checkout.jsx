import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { formatPrice } from "../utils/helpers";
import { FiCreditCard, FiSmartphone, FiPackage, FiCheck, FiGift } from "react-icons/fi";
import { sendOrderToTelegram } from "../services/telegramBot";
import toast from "react-hot-toast";
import { useTheme } from "../context/ThemeContext";

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [shippingMethod, setShippingMethod] = useState("standard");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [loading, setLoading] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState(null);
  const { accentColor } = useTheme();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Check if cart is empty and redirect
  useEffect(() => {
    if (cart.items.length === 0) {
      navigate("/cart");
    }
  }, [cart.items.length, navigate]);

  if (cart.items.length === 0) {
    return null;
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

  const shippingCost = {
    standard: 5.99,
    express: 12.99,
    overnight: 24.99,
  };

  const subtotal = cart.total;
  const shipping = shippingCost[shippingMethod];

  // Calculate discount based on promo code
  const calculateDiscount = () => {
    if (!appliedPromo) return 0;
    if (appliedPromo.code === "RAKSA168") {
      return subtotal * 0.8; // 80% discount
    }
    if (appliedPromo.code === "FREESHIP") {
      return 0;
    }
    return 0;
  };

  const discount = calculateDiscount();
  const finalShipping = appliedPromo?.code === "FREESHIP" ? 0 : shipping;
  const total = subtotal + finalShipping - discount;

  // Handle promo code application
  const handleApplyPromo = () => {
    const promoCodeUpper = promoCode.toUpperCase();
    if (promoCodeUpper === "RAKSA168") {
      setAppliedPromo({ code: "RAKSA168", discount: 80, type: "percentage" });
      toast.success("🎉 80% discount applied! Great savings!", { duration: 4000 });
      setPromoCode("");
    } else if (promoCodeUpper === "FREESHIP") {
      setAppliedPromo({
        code: "FREESHIP",
        discount: shipping,
        type: "shipping",
      });
      toast.success("🚚 Free shipping applied!", { duration: 4000 });
      setPromoCode("");
    } else {
      toast.error("Invalid promo code. Try RAKSA168 or FREESHIP");
    }
  };

  // Handle remove promo code
  const handleRemovePromo = () => {
    setAppliedPromo(null);
    toast.success("Promo code removed");
  };

  const onSubmit = async (data) => {
    if (step === 1) {
      // Validate shipping form
      if (
        !data.firstName ||
        !data.lastName ||
        !data.email ||
        !data.address ||
        !data.city ||
        !data.state ||
        !data.zip ||
        !data.phone
      ) {
        toast.error("Please fill in all shipping information");
        return;
      }
      setStep(2);
    } else if (step === 2) {
      // Validate payment
      if (paymentMethod === "card") {
        if (!data.cardNumber || !data.expiry || !data.cvv) {
          toast.error("Please fill in all card details");
          return;
        }
      }
      setStep(3);
    } else {
      setLoading(true);
      try {
        const orderData = {
          items: cart.items,
          subtotal: subtotal,
          shipping: finalShipping,
          discount: discount,
          total: total,
          email: data.email,
          phone: data.phone,
          address: data.address,
          city: data.city,
          state: data.state,
          zip: data.zip,
          shippingMethod: shippingMethod,
          paymentMethod: paymentMethod,
          promoCode: appliedPromo?.code || null,
          discountAmount: discount,
          discountPercentage: appliedPromo?.code === "RAKSA168" ? 80 : 0,
          firstName: data.firstName,
          lastName: data.lastName,
        };

        await sendOrderToTelegram(orderData, user);
        toast.success("Order placed successfully! Thank you for shopping with us! 🎉");
        clearCart();
        navigate("/");
      } catch (error) {
        toast.error("Failed to place order. Please try again.");
        console.error("Error placing order:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen pt-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
          Checkout
        </h1>

        {/* Steps */}
        <div className="flex justify-between mb-8">
          {[1, 2, 3].map((num) => (
            <div key={num} className="flex-1 text-center">
              <div
                className={`w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center transition-all duration-300 ${
                  step >= num
                    ? "bg-green-600 text-white"
                    : "bg-gray-300 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                }`}
              >
                {step > num ? <FiCheck className="w-4 h-4" /> : num}
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {num === 1 && "Shipping"}
                {num === 2 && "Payment"}
                {num === 3 && "Confirm"}
              </span>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Form Fields */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                {/* Step 1: Shipping Information */}
                {step === 1 && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                      Shipping Information
                    </h2>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                          First Name *
                        </label>
                        <input
                          {...register("firstName", { required: true })}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                          Last Name *
                        </label>
                        <input
                          {...register("lastName", { required: true })}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                        Email *
                      </label>
                      <input
                        type="email"
                        {...register("email", { required: true })}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white transition-all"
                        defaultValue={user?.email || ""}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                        Address *
                      </label>
                      <input
                        {...register("address", { required: true })}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white transition-all"
                      />
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                          City *
                        </label>
                        <input
                          {...register("city", { required: true })}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                          State *
                        </label>
                        <input
                          {...register("state", { required: true })}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                          ZIP Code *
                        </label>
                        <input
                          {...register("zip", { required: true })}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                        Phone *
                      </label>
                      <input
                        type="tel"
                        {...register("phone", { required: true })}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                        Shipping Method
                      </label>
                      <div className="space-y-3">
                        <label className="flex items-center p-3 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                          <input
                            type="radio"
                            name="shipping"
                            value="standard"
                            checked={shippingMethod === "standard"}
                            onChange={(e) => setShippingMethod(e.target.value)}
                            className="mr-3 text-green-600"
                          />
                          <div className="flex-1">
                            <div className="font-semibold text-gray-900 dark:text-white">
                              Standard Shipping
                            </div>
                            <div className="text-sm text-gray-500">
                              3-5 business days
                            </div>
                          </div>
                          <div className="font-semibold text-gray-900 dark:text-white">
                            $5.99
                          </div>
                        </label>
                        <label className="flex items-center p-3 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                          <input
                            type="radio"
                            name="shipping"
                            value="express"
                            checked={shippingMethod === "express"}
                            onChange={(e) => setShippingMethod(e.target.value)}
                            className="mr-3 text-green-600"
                          />
                          <div className="flex-1">
                            <div className="font-semibold text-gray-900 dark:text-white">
                              Express Shipping
                            </div>
                            <div className="text-sm text-gray-500">
                              1-2 business days
                            </div>
                          </div>
                          <div className="font-semibold text-gray-900 dark:text-white">
                            $12.99
                          </div>
                        </label>
                        <label className="flex items-center p-3 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                          <input
                            type="radio"
                            name="shipping"
                            value="overnight"
                            checked={shippingMethod === "overnight"}
                            onChange={(e) => setShippingMethod(e.target.value)}
                            className="mr-3 text-green-600"
                          />
                          <div className="flex-1">
                            <div className="font-semibold text-gray-900 dark:text-white">
                              Overnight Shipping
                            </div>
                            <div className="text-sm text-gray-500">
                              Next day delivery
                            </div>
                          </div>
                          <div className="font-semibold text-gray-900 dark:text-white">
                            $24.99
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Payment Method */}
                {step === 2 && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                      Payment Method
                    </h2>

                    <div className="space-y-3">
                      <label className="flex items-center p-3 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <input
                          type="radio"
                          name="payment"
                          value="card"
                          checked={paymentMethod === "card"}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="mr-3 text-green-600"
                        />
                        <FiCreditCard className="mr-3 text-gray-500" />
                        <span className="text-gray-900 dark:text-white">
                          Credit / Debit Card
                        </span>
                      </label>
                      <label className="flex items-center p-3 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <input
                          type="radio"
                          name="payment"
                          value="paypal"
                          checked={paymentMethod === "paypal"}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="mr-3 text-green-600"
                        />
                        <FiSmartphone className="mr-3 text-gray-500" />
                        <span className="text-gray-900 dark:text-white">
                          PayPal
                        </span>
                      </label>
                    </div>

                    {paymentMethod === "card" && (
                      <div className="space-y-4 mt-4">
                        <div>
                          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                            Card Number *
                          </label>
                          <input
                            {...register("cardNumber", {
                              required: paymentMethod === "card",
                            })}
                            placeholder="1234 5678 9012 3456"
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white transition-all"
                          />
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                              Expiry Date *
                            </label>
                            <input
                              {...register("expiry", {
                                required: paymentMethod === "card",
                              })}
                              placeholder="MM/YY"
                              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white transition-all"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                              CVV *
                            </label>
                            <input
                              {...register("cvv", {
                                required: paymentMethod === "card",
                              })}
                              placeholder="123"
                              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white transition-all"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Step 3: Confirm Order */}
                {step === 3 && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                      Confirm Order
                    </h2>
                    <div className="space-y-4">
                      <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                        <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">
                          Order Summary
                        </h3>
                        <div className="space-y-2">
                          {cart.items.map((item) => (
                            <div
                              key={item.id}
                              className="flex justify-between text-sm text-gray-600 dark:text-gray-400"
                            >
                              <span>
                                {item.name} x {item.quantity}
                              </span>
                              <span>
                                {formatPrice(item.price * item.quantity)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                        <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">
                          Shipping Address
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Will be confirmed at final step
                        </p>
                      </div>
                      {appliedPromo && (
                        <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 p-4 rounded-lg border border-green-200 dark:border-green-800">
                          <h3 className="font-semibold mb-2 text-green-700 dark:text-green-400 flex items-center gap-2">
                            <FiGift className="w-4 h-4" />
                            Promo Code Applied
                          </h3>
                          <p className="text-sm text-green-600 dark:text-green-400">
                            {appliedPromo.code === "RAKSA168"
                              ? "🎉 80% OFF Discount Applied! You saved " + formatPrice(discount)
                              : "🚚 Free Shipping Applied! You saved $" + shipping.toFixed(2)}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8">
                  {step > 1 && (
                    <button
                      type="button"
                      onClick={() => setStep(step - 1)}
                      className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300"
                    >
                      Back
                    </button>
                  )}
                  <button
                    type="submit"
                    disabled={loading}
                    className={`ml-auto bg-gradient-to-r ${getAccentGradient()} text-white px-6 py-2 rounded-lg transition-colors shadow-md hover:shadow-lg disabled:opacity-50 flex items-center gap-2`}
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>Processing...</span>
                      </>
                    ) : (
                      <span>{step === 3 ? "Place Order" : "Continue"}</span>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Order Summary Sidebar - Visible on all steps with promo code section */}
            <div>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 sticky top-24">
                <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                  Order Summary
                </h2>

                <div className="space-y-3 mb-4 max-h-96 overflow-y-auto">
                  {cart.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex space-x-3 p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    >
                      <img
                        src={
                          item.images?.[0] || "https://via.placeholder.com/60"
                        }
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded"
                        onError={(e) => {
                          e.target.src =
                            "https://via.placeholder.com/60?text=No+Image";
                        }}
                      />
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-900 dark:text-white line-clamp-1">
                          {item.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          Size: {item.selectedSize} | Color:{" "}
                          {item.selectedColor}
                        </p>
                        <p className="text-xs text-gray-500">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <p className="text-sm font-semibold text-green-600 dark:text-green-400">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Promo Code Section - Always visible on all steps */}
                <div className="mb-4 pt-2 border-t border-gray-200 dark:border-gray-700">
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <FiGift className="w-4 h-4" />
                    Promo Code
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Enter code"
                      className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white transition-all text-sm"
                      disabled={!!appliedPromo}
                    />
                    {!appliedPromo ? (
                      <button
                        type="button"
                        onClick={handleApplyPromo}
                        className="bg-gray-900 dark:bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors text-sm whitespace-nowrap"
                      >
                        Apply
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handleRemovePromo}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors text-sm whitespace-nowrap"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  {!appliedPromo && (
                    <div className="mt-2">
                      <p className="text-xs text-gray-500">
                        ✨ Try{" "}
                        <span className="font-bold text-green-600">
                          "RAKSA168"
                        </span>{" "}
                        for 80% OFF! 🎉
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        🚚 Or{" "}
                        <span className="font-bold text-green-600">
                          "FREESHIP"
                        </span>{" "}
                        for free shipping
                      </p>
                    </div>
                  )}
                  {appliedPromo && appliedPromo.code === "RAKSA168" && (
                    <div className="mt-2 p-2 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/50 dark:to-emerald-900/50 rounded-lg border border-green-300 dark:border-green-700">
                      <p className="text-xs text-green-700 dark:text-green-300 flex items-center gap-1">
                        <FiCheck className="w-3 h-3" />
                        <span className="font-semibold">🎉 80% OFF applied! You saved {formatPrice(discount)}</span>
                      </p>
                    </div>
                  )}
                  {appliedPromo && appliedPromo.code === "FREESHIP" && (
                    <div className="mt-2 p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg border border-blue-200 dark:border-blue-800">
                      <p className="text-xs text-blue-700 dark:text-blue-300 flex items-center gap-1">
                        <FiCheck className="w-3 h-3" />
                        <span className="font-semibold">🚚 Free shipping applied! You saved ${shipping.toFixed(2)}</span>
                      </p>
                    </div>
                  )}
                </div>

                {/* Order Totals - Updated in real-time */}
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-2">
                  <div className="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>Subtotal ({cart.itemCount} items)</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>Shipping</span>
                    <span>
                      {finalShipping === 0
                        ? "Free"
                        : formatPrice(finalShipping)}
                    </span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600 font-semibold">
                      <span>
                        Discount{" "}
                        {appliedPromo?.code === "RAKSA168" ? "(80% OFF)" : ""}
                      </span>
                      <span>-{formatPrice(discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-200 dark:border-gray-700">
                    <span className="text-gray-900 dark:text-white">Total</span>
                    <span className="text-green-600 dark:text-green-400 text-xl">
                      {formatPrice(total)}
                    </span>
                  </div>
                </div>

                {/* Payment Security Badge */}
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                    <FiPackage className="w-4 h-4" />
                    <span>Secure Payment</span>
                    <span>•</span>
                    <span>SSL Encrypted</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;