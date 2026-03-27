import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { products } from "../data/products";
import { useTheme } from "../context/ThemeContext";

const FeaturedCategories = () => {
  const { accentColor } = useTheme();

  const getAccentColor = () => {
    switch (accentColor) {
      case "secondary":
        return "ring-blue-500";
      case "accent":
        return "ring-orange-500";
      default:
        return "ring-green-500";
    }
  };

  // Get category image from products
  const getCategoryImage = (category) => {
    if (category === "All") {
      // For "All" category, use a featured product or hero image
      const featuredProduct = products.find((p) => p.rating >= 4.7);
      return (
        featuredProduct?.images?.[0] ||
        products[0]?.images?.[0] ||
        "https://via.placeholder.com/400x300?text=All+Products"
      );
    }
    const product = products.find((p) => p.category === category);
    return (
      product?.images?.[0] ||
      "https://via.placeholder.com/400x300?text=" + category
    );
  };

  // Get product count per category
  const getCategoryCount = (category) => {
    if (category === "All") {
      return products.length;
    }
    return products.filter((p) => p.category === category).length;
  };

  const categories = [
    {
      id: 1,
      name: "All",
      image: getCategoryImage("All"),
      count: getCategoryCount("All"),
      link: "/shop",
    },
    {
      id: 2,
      name: "Men",
      image: getCategoryImage("Men"),
      count: getCategoryCount("Men"),
      link: "/shop?category=Men",
    },
    {
      id: 3,
      name: "Women",
      image: getCategoryImage("Women"),
      count: getCategoryCount("Women"),
      link: "/shop?category=Women",
    },
    {
      id: 4,
      name: "Unisex",
      image: getCategoryImage("Unisex"),
      count: getCategoryCount("Unisex"),
      link: "/shop?category=Unisex",
    },
  ];

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
          Shop by Category
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Find what you're looking for
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="group relative overflow-hidden rounded-xl shadow-lg cursor-pointer"
          >
            <Link to={category.link}>
              <div className="aspect-[4/3] overflow-hidden bg-gray-100 dark:bg-gray-800">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    e.target.src = `https://via.placeholder.com/400x300?text=${category.name}`;
                  }}
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent group-hover:from-black/80 transition-all duration-300 flex flex-col items-center justify-end p-6">
                <h3 className="text-white text-2xl font-bold mb-2">
                  {category.name}
                </h3>
                <p className="text-white/80 text-sm mb-2">
                  {category.count} Products
                </p>
                <span className="text-white border-b-2 border-white opacity-0 group-hover:opacity-100 transition-opacity">
                  Shop Now
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedCategories;
