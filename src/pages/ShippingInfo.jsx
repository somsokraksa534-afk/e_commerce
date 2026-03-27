import React from "react";
import { motion } from "framer-motion";
import {
  FiTruck,
  FiClock,
  FiGlobe,
  FiPackage,
  FiDollarSign,
  FiMapPin,
} from "react-icons/fi";

const ShippingInfo = () => {
  const shippingMethods = [
    {
      name: "Standard Shipping",
      time: "3-5 Business Days",
      cost: "$5.99",
      free: "Free on orders over $50",
      icon: FiTruck,
    },
    {
      name: "Express Shipping",
      time: "1-2 Business Days",
      cost: "$12.99",
      free: "Not available for free shipping",
      icon: FiClock,
    },
    {
      name: "Overnight Shipping",
      time: "Next Day Delivery",
      cost: "$24.99",
      free: "Not available for free shipping",
      icon: FiPackage,
    },
    {
      name: "International Shipping",
      time: "5-10 Business Days",
      cost: "$24.99",
      free: "Free on orders over $100",
      icon: FiGlobe,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Shipping Information
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Everything you need to know about our shipping policies
          </p>
        </motion.div>

        {/* Shipping Methods */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {shippingMethods.map((method, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <method.icon className="w-12 h-12 text-green-500 mb-4" />
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                {method.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-2">
                Delivery: {method.time}
              </p>
              <p className="text-gray-600 dark:text-gray-400 mb-2">
                Cost: {method.cost}
              </p>
              <p className="text-sm text-green-600 dark:text-green-400">
                {method.free}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Shipping Policies */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
            Shipping Policies
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white flex items-center gap-2">
                <FiMapPin className="text-green-500" />
                Order Processing Time
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Orders are processed within 1-2 business days (excluding
                weekends and holidays). You will receive a confirmation email
                once your order has been shipped.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white flex items-center gap-2">
                <FiDollarSign className="text-green-500" />
                Free Shipping
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                We offer free standard shipping on all domestic orders over $50.
                International orders over $100 qualify for free standard
                shipping.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white flex items-center gap-2">
                <FiGlobe className="text-green-500" />
                International Shipping
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                We ship to over 100 countries worldwide. International shipping
                times vary by location. Customs fees and import duties may apply
                and are the responsibility of the customer.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white flex items-center gap-2">
                <FiPackage className="text-green-500" />
                Tracking Your Order
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Once your order ships, you'll receive a tracking number via
                email. You can track your package directly through our website
                or the carrier's website.
              </p>
            </div>
          </div>
        </div>

        {/* Delivery Areas */}
        <div className="bg-green-50 dark:bg-green-900/20 rounded-2xl p-8 border border-green-200 dark:border-green-800">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            Delivery Areas
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            We currently ship to the following regions:
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              "United States",
              "Canada",
              "United Kingdom",
              "Australia",
              "Germany",
              "France",
              "Japan",
              "Brazil",
              "Mexico",
              "Spain",
              "Italy",
              "Netherlands",
            ].map((country) => (
              <div
                key={country}
                className="flex items-center gap-2 text-gray-600 dark:text-gray-400"
              >
                <FiMapPin className="w-3 h-3 text-green-500" />
                <span>{country}</span>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-4">
            *Additional countries may be available upon request
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShippingInfo;
