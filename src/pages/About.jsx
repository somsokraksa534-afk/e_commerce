import React from "react";
import { motion } from "framer-motion";
import {
  FiUsers,
  FiTruck,
  FiHeart,
  FiAward,
  FiGlobe,
  FiClock,
} from "react-icons/fi";
import { useTheme } from "../context/ThemeContext";

const About = () => {
  const { accentColor } = useTheme();

  const getAccentGradient = () => {
    switch (accentColor) {
      case "secondary":
        return "from-blue-500 to-blue-600";
      case "accent":
        return "from-orange-500 to-orange-600";
      default:
        return "from-green-500 to-green-600";
    }
  };

  const getAccentColor = () => {
    switch (accentColor) {
      case "secondary":
        return "text-blue-500";
      case "accent":
        return "text-orange-500";
      default:
        return "text-green-500";
    }
  };

  const stats = [
    {
      icon: FiUsers,
      value: "50K+",
      label: "Happy Customers",
      color: "text-blue-500",
    },
    {
      icon: FiTruck,
      value: "100+",
      label: "Countries Served",
      color: "text-green-500",
    },
    {
      icon: FiHeart,
      value: "10K+",
      label: "Products Sold",
      color: "text-red-500",
    },
    {
      icon: FiAward,
      value: "5+",
      label: "Years Experience",
      color: "text-yellow-500",
    },
  ];

  const values = [
    {
      title: "Quality First",
      description:
        "We source only the finest materials and work with skilled artisans to create products that last.",
      icon: FiAward,
    },
    {
      title: "Sustainable Fashion",
      description:
        "Committed to eco-friendly practices, using sustainable materials and reducing our carbon footprint.",
      icon: FiGlobe,
    },
    {
      title: "Customer Centric",
      description:
        "Your satisfaction is our priority. We provide exceptional service and support.",
      icon: FiHeart,
    },
    {
      title: "Fast Delivery",
      description:
        "Quick and reliable shipping to get your orders to you as soon as possible.",
      icon: FiClock,
    },
  ];


  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-gray-900 to-gray-800 text-white py-20">
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            About RAKSA STORE
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-300 max-w-2xl mx-auto"
          >
            Redefining fashion with quality, sustainability, and style
          </motion.p>
        </div>
      </div>

      {/* Story Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
              Our Story
            </h2>
            <div className="w-20 h-1 bg-green-500 mb-6"></div>
            <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
              Founded in 2019, RaksaStore began with a simple mission: to make
              premium fashion accessible to everyone. What started as a small
              boutique has grown into a global brand, but our core values remain
              the same.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
              We believe that style should not come at the expense of ethics or
              the environment. That is why we are committed to sustainable
              practices, ethical sourcing, and creating pieces that you will
              love for years to come.
            </p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Today, RaksaStore serves customers in over 100 countries, offering
              carefully curated collections that blend timeless elegance with
              contemporary trends.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="relative"
          >
            <img
              src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800"
              alt="Our Story"
              className="rounded-2xl shadow-2xl"
            />
            <div
              className={`absolute -bottom-6 -right-6 bg-gradient-to-r ${getAccentGradient()} p-4 rounded-2xl shadow-lg`}
            >
              <p className="text-white font-bold text-2xl">5+ Years</p>
              <p className="text-white text-sm">Of Excellence</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white dark:bg-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <stat.icon className={`w-12 h-12 mx-auto mb-3 ${stat.color}`} />
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-gray-600 dark:text-gray-400">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
            Our Values
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            The principles that guide everything we do
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <value.icon className={`w-12 h-12 ${getAccentColor()} mb-4`} />
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                {value.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
