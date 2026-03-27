import React from "react";
import { motion } from "framer-motion";
import {
  FiRefreshCw,
  FiCheckCircle,
  FiClock,
  FiMail,
  FiPackage,
  FiDollarSign,
} from "react-icons/fi";

const Returns = () => {
  const steps = [
    {
      icon: FiMail,
      title: "Contact Us",
      description:
        "Email us at returns@raksastore.com with your order number and reason for return",
    },
    {
      icon: FiPackage,
      title: "Pack Your Item",
      description: "Pack the item in original packaging with all tags attached",
    },
    {
      icon: FiRefreshCw,
      title: "Ship It Back",
      description:
        "Ship the package to our returns center using the provided label",
    },
    {
      icon: FiCheckCircle,
      title: "Get Refund",
      description: "We'll process your refund within 5-7 business days",
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
            Returns & Exchanges
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Hassle-free returns within 30 days of purchase
          </p>
        </motion.div>

        {/* Return Policy */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <FiRefreshCw className="w-8 h-8 text-green-500" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              30-Day Return Policy
            </h2>
          </div>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            We want you to love your purchase! If you're not completely
            satisfied, you can return any item within 30 days of delivery for a
            full refund or exchange.
          </p>
          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
            <p className="text-green-700 dark:text-green-300 font-medium">
              ✓ Free returns on all domestic orders
            </p>
            <p className="text-green-700 dark:text-green-300">
              ✓ No restocking fees
            </p>
          </div>
        </div>

        {/* Return Steps */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
            How to Return an Item
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 text-center"
              >
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <step.icon className="w-6 h-6 text-green-500" />
                </div>
                <div className="text-2xl font-bold text-green-500 mb-2">
                  {index + 1}
                </div>
                <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Return Conditions */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
            Return Conditions
          </h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <FiCheckCircle className="w-5 h-5 text-green-500 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Item Condition
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Items must be unused, unworn, and in original packaging with
                  all tags attached.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <FiClock className="w-5 h-5 text-green-500 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Time Frame
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Returns must be initiated within 30 days of delivery date.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <FiDollarSign className="w-5 h-5 text-green-500 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Refund Method
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Refunds will be issued to the original payment method within
                  5-7 business days of receiving the return.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Non-Returnable Items */}
        <div className="bg-red-50 dark:bg-red-900/20 rounded-2xl p-8 border border-red-200 dark:border-red-800">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            Non-Returnable Items
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
            <li>Final sale items</li>
            <li>Intimate apparel (underwear, swimwear)</li>
            <li>Customized or personalized items</li>
            <li>Gift cards</li>
            <li>Items damaged by improper use</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Returns;
