import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FiMail,
  FiFacebook,
  FiTwitter,
  FiInstagram,
  FiYoutube,
  FiCheckCircle,
} from "react-icons/fi";
import toast from "react-hot-toast";
import { useTheme } from "../context/ThemeContext";
import { sendNewsletterToTelegram } from "../services/telegramBot";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const { accentColor } = useTheme();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter a valid email");
      return;
    }

    setLoading(true);

    try {
      await sendNewsletterToTelegram(email);
      toast.success("Subscribed successfully!");
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    } catch (error) {
      toast.error("Failed to subscribe. Please try again.");
      console.error("Error subscribing:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-800 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Subscribe to Our Newsletter
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Get the latest updates on new products and upcoming sales
          </p>
        </div>

        <form onSubmit={handleSubmit} className="max-w-md mx-auto mb-12">
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white transition-all duration-300"
              required
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || subscribed}
              className={`bg-gradient-to-r ${getAccentGradient()} text-white px-6 py-3 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 shadow-md hover:shadow-lg disabled:opacity-50`}
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : subscribed ? (
                <>
                  <FiCheckCircle className="w-4 h-4" />
                  <span>Subscribed!</span>
                </>
              ) : (
                <>
                  <FiMail className="w-4 h-4" />
                  <span>Subscribe</span>
                </>
              )}
            </button>
          </div>
        </form>

        <div className="text-center">
          <div className="flex justify-center space-x-6 mb-8">
            <a
              href="#"
              className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors"
            >
              <FiFacebook className="w-6 h-6" />
            </a>
            <a
              href="#"
              className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors"
            >
              <FiTwitter className="w-6 h-6" />
            </a>
            <a
              href="#"
              className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors"
            >
              <FiInstagram className="w-6 h-6" />
            </a>
            <a
              href="#"
              className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors"
            >
              <FiYoutube className="w-6 h-6" />
            </a>
          </div>

          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600 dark:text-gray-400">
            <span>✓ Free Shipping on orders over $50</span>
            <span>✓ 30-Day Returns</span>
            <span>✓ Secure Payments</span>
            <span>✓ 24/7 Customer Support</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
