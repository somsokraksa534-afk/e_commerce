import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiChevronDown,
  FiPackage,
  FiTruck,
  FiRefreshCw,
  FiCreditCard,
  FiUser,
  FiHeart,
  FiShield,
} from "react-icons/fi";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      category: "Orders",
      icon: FiPackage,
      questions: [
        {
          q: "How do I track my order?",
          a: "Once your order ships, you will receive a confirmation email with a tracking number. You can also track your order by logging into your account and viewing your order history.",
        },
        {
          q: "Can I change or cancel my order?",
          a: "Orders can be changed or canceled within 1 hour of placement. Please contact our customer service team immediately for assistance.",
        },
        {
          q: "What payment methods do you accept?",
          a: "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, Apple Pay, and Google Pay.",
        },
      ],
    },
    {
      category: "Shipping",
      icon: FiTruck,
      questions: [
        {
          q: "How long does shipping take?",
          a: "Standard shipping takes 3-5 business days, Express shipping takes 1-2 business days, and Overnight shipping delivers the next business day.",
        },
        {
          q: "Do you ship internationally?",
          a: "Yes, we ship to over 100 countries worldwide. International shipping typically takes 5-10 business days.",
        },
        {
          q: "Is free shipping available?",
          a: "Yes, we offer free standard shipping on all domestic orders over $50 and international orders over $100.",
        },
      ],
    },
    {
      category: "Returns",
      icon: FiRefreshCw,
      questions: [
        {
          q: "What is your return policy?",
          a: "We offer a 30-day return policy. Items must be unused, unworn, and in original packaging with all tags attached.",
        },
        {
          q: "How do I initiate a return?",
          a: "To initiate a return, log into your account, go to order history, select the item you wish to return, and follow the instructions.",
        },
        {
          q: "How long does it take to get a refund?",
          a: "Refunds are processed within 5-7 business days after we receive your return. The refund will be issued to your original payment method.",
        },
      ],
    },
    {
      category: "Products",
      icon: FiHeart,
      questions: [
        {
          q: "How do I find my size?",
          a: "Check our Size Guide page for detailed measurements and fit recommendations. We also provide size recommendations on each product page.",
        },
        {
          q: "Are your products sustainable?",
          a: "Yes, we are committed to sustainable fashion. Many of our products use eco-friendly materials and ethical manufacturing processes.",
        },
        {
          q: "How do I care for my items?",
          a: "Care instructions are provided on each product page and on the garment tags. We recommend following these instructions to maintain quality.",
        },
      ],
    },
    {
      category: "Account",
      icon: FiUser,
      questions: [
        {
          q: "How do I create an account?",
          a: 'Click the user icon in the top right corner and select "Sign Up". Fill in your details to create a free account.',
        },
        {
          q: "How do I reset my password?",
          a: 'On the login page, click "Forgot Password" and enter your email address. You will receive instructions to reset your password.',
        },
        {
          q: "How do I update my account information?",
          a: "Log into your account and go to the Profile section. You can update your personal information, shipping addresses, and payment methods.",
        },
      ],
    },
    {
      category: "Payment",
      icon: FiCreditCard,
      questions: [
        {
          q: "Is my payment information secure?",
          a: "Yes, we use industry-standard SSL encryption to protect your payment information. We never store your full credit card details.",
        },
        {
          q: "Do you offer afterpay or installment payments?",
          a: "Yes, we offer installment payment options through Klarna and Afterpay. Select these options at checkout.",
        },
        {
          q: "Will I be charged customs fees?",
          a: "International orders may be subject to customs fees and import duties. These charges are the responsibility of the customer.",
        },
      ],
    },
  ];

  const toggleQuestion = (categoryIndex, questionIndex) => {
    const key = `${categoryIndex}-${questionIndex}`;
    setOpenIndex(openIndex === key ? null : key);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Frequently Asked Questions
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Find answers to common questions about UrbanStyle
          </p>
        </motion.div>

        {faqs.map((category, catIdx) => (
          <div key={catIdx} className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <category.icon className="w-6 h-6 text-green-500" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {category.category}
              </h2>
            </div>
            <div className="space-y-3">
              {category.questions.map((faq, qIdx) => {
                const key = `${catIdx}-${qIdx}`;
                const isOpen = openIndex === key;
                return (
                  <div
                    key={qIdx}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden"
                  >
                    <button
                      onClick={() => toggleQuestion(catIdx, qIdx)}
                      className="w-full px-6 py-4 flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <span className="font-semibold text-left text-gray-900 dark:text-white">
                        {faq.q}
                      </span>
                      <FiChevronDown
                        className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-4 text-gray-600 dark:text-gray-400 border-t border-gray-100 dark:border-gray-700 pt-3">
                            {faq.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {/* Still Have Questions */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-8 text-center mt-12">
          <FiShield className="w-12 h-12 text-white mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">
            Still Have Questions?
          </h2>
          <p className="text-white/90 mb-6">
            Our customer service team is here to help
          </p>
          <button className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
