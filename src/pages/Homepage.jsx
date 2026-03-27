import React from "react";
import Hero from "../components/Hero";
import FeaturedCategories from "../components/FeaturedCategories";
// Remove: import NewArrivals from '../components/NewArrivals';
import SaleBanner from "../components/SaleBanner";
import Newsletter from "../components/Newsletter";

const Homepage = () => {
  return (
    <div className="overflow-hidden">
      <Hero />
      <div className="bg-white dark:bg-gray-900 transition-colors duration-300">
        <FeaturedCategories />
        {/* Remove: <NewArrivals /> */}
        <SaleBanner />
        <Newsletter />
      </div>
    </div>
  );
};

export default Homepage;
