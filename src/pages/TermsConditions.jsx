import React from "react";
import { motion } from "framer-motion";
import {
  FiFileText,
  FiShoppingBag,
  FiCreditCard,
  FiTruck,
  FiRefreshCw,
  FiAlertCircle,
} from "react-icons/fi";

const TermsConditions = () => {
  const sections = [
    {
      icon: FiFileText,
      title: "Acceptance of Terms",
      content:
        "By accessing and using RaksaStore, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, please do not use our website.",
    },
    {
      icon: FiShoppingBag,
      title: "Product Information",
      content:
        "We strive to display accurate product information, including colors, sizes, and pricing. However, we cannot guarantee that your monitor's display of colors will be accurate. We reserve the right to modify or discontinue products without notice.",
    },
    {
      icon: FiCreditCard,
      title: "Pricing and Payments",
      content:
        "All prices are in USD and are subject to change. We accept major credit cards and PayPal. By placing an order, you authorize us to charge your payment method for the total amount.",
    },
    {
      icon: FiTruck,
      title: "Shipping and Delivery",
      content:
        "We strive to deliver orders within the estimated timeframe. However, we are not liable for delays caused by carriers or circumstances beyond our control. Risk of loss passes to you upon delivery.",
    },
    {
      icon: FiRefreshCw,
      title: "Returns and Refunds",
      content:
        "Our return policy allows returns within 30 days of delivery. Items must be unused with original tags attached. Refunds will be issued to the original payment method within 5-7 business days.",
    },
    {
      icon: FiAlertCircle,
      title: "Limitation of Liability",
      content:
        "To the fullest extent permitted by law, RaksaStore shall not be liable for any indirect, incidental, or consequential damages arising from your use of our products or services.",
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
            Terms & Conditions
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Effective Date: March 25, 2026
          </p>
        </motion.div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-8">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="mb-8 last:mb-0"
            >
              <div className="flex items-center gap-3 mb-3">
                <section.icon className="w-6 h-6 text-green-500" />
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  {section.title}
                </h2>
              </div>
              <p className="text-gray-600 dark:text-gray-400 ml-9">
                {section.content}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-2xl p-6 border border-yellow-200 dark:border-yellow-800">
          <h3 className="font-bold mb-2 text-gray-900 dark:text-white">
            Contact Information
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            For questions regarding these Terms & Conditions, please contact us
            at:
            <br />
            Email: legal@raksastore.com
            <br />
            Address: St:192z, Phnom Penh, Cambodia
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsConditions;
