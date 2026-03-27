import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const SaleBanner = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const { accentColor, darkMode } = useTheme();

  const getAccentGradient = () => {
    // Light mode gradients
    if (!darkMode) {
      switch (accentColor) {
        case "secondary":
          return "from-blue-500 to-blue-600";
        case "accent":
          return "from-orange-500 to-orange-600";
        default:
          return "from-green-500 to-green-600";
      }
    }
    // Dark mode gradients (darker versions for better contrast)
    switch (accentColor) {
      case "secondary":
        return "#111827";
      case "accent":
        return "#111827";
      default:
        return "#111827";
    }
  };

  const getButtonGradient = () => {
    // Light mode button hover effects
    if (!darkMode) {
      switch (accentColor) {
        case "secondary":
          return "hover:bg-blue-50";
        case "accent":
          return "hover:bg-orange-50";
        default:
          return "hover:bg-green-50";
      }
    }
    // Dark mode button hover effects
    switch (accentColor) {
      case "secondary":
        return "dark:hover:bg-blue-900/30";
      case "accent":
        return "dark:hover:bg-orange-900/30";
      default:
        return "dark:hover:bg-green-900/30";
    }
  };

  useEffect(() => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 7);

    const timer = setInterval(() => {
      const now = new Date();
      const difference = targetDate - now;

      if (difference <= 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
          ),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section
      className={`relative overflow-hidden bg-gradient-to-r ${getAccentGradient()} py-16 my-16 transition-all duration-500`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-white"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Big Sale!</h2>
            <p className="text-2xl mb-6 text-white/90">
              Up to 50% Off Selected Items
            </p>
            <div className="flex space-x-4 mb-8">
              <div className="text-center">
                <div className="bg-white/20 backdrop-blur rounded-lg px-4 py-2 min-w-[70px]">
                  <span className="text-2xl font-bold">{timeLeft.days}</span>
                  <span className="text-sm block">Days</span>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-white/20 backdrop-blur rounded-lg px-4 py-2 min-w-[70px]">
                  <span className="text-2xl font-bold">{timeLeft.hours}</span>
                  <span className="text-sm block">Hours</span>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-white/20 backdrop-blur rounded-lg px-4 py-2 min-w-[70px]">
                  <span className="text-2xl font-bold">{timeLeft.minutes}</span>
                  <span className="text-sm block">Mins</span>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-white/20 backdrop-blur rounded-lg px-4 py-2 min-w-[70px]">
                  <span className="text-2xl font-bold">{timeLeft.seconds}</span>
                  <span className="text-sm block">Secs</span>
                </div>
              </div>
            </div>
            <Link to="/shop?category=sale">
              <button
                className={`bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl ${getButtonGradient()}`}
              >
                Shop Sale
              </button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="relative"
          >
            <img
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600"
              alt="Sale"
              className="rounded-lg shadow-2xl"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SaleBanner;
