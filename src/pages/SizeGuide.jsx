import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiUser, FiDroplet, FiMaximize2, FiBarChart2 } from "react-icons/fi";

const SizeGuide = () => {
  const [gender, setGender] = useState("women");

  const womenSizes = [
    {
      size: "XS",
      bust: "32-33",
      waist: "24-25",
      hip: "34-35",
      us: "0-2",
      uk: "4-6",
    },
    {
      size: "S",
      bust: "34-35",
      waist: "26-27",
      hip: "36-37",
      us: "4-6",
      uk: "8-10",
    },
    {
      size: "M",
      bust: "36-37",
      waist: "28-29",
      hip: "38-39",
      us: "8-10",
      uk: "12-14",
    },
    {
      size: "L",
      bust: "38-40",
      waist: "30-32",
      hip: "40-42",
      us: "12-14",
      uk: "16-18",
    },
    {
      size: "XL",
      bust: "41-43",
      waist: "33-35",
      hip: "43-45",
      us: "16-18",
      uk: "20-22",
    },
  ];

  const menSizes = [
    {
      size: "XS",
      chest: "34-36",
      waist: "28-30",
      neck: "14-14.5",
      sleeve: "32-33",
    },
    {
      size: "S",
      chest: "36-38",
      waist: "30-32",
      neck: "15-15.5",
      sleeve: "33-34",
    },
    {
      size: "M",
      chest: "38-40",
      waist: "32-34",
      neck: "16-16.5",
      sleeve: "34-35",
    },
    {
      size: "L",
      chest: "40-42",
      waist: "34-36",
      neck: "17-17.5",
      sleeve: "35-36",
    },
    {
      size: "XL",
      chest: "42-44",
      waist: "36-38",
      neck: "18-18.5",
      sleeve: "36-37",
    },
  ];

  const measurements = [
    {
      name: "Bust/Chest",
      icon: FiUser,
      description: "Measure around the fullest part of your chest",
    },
    {
      name: "Waist",
      icon: FiDroplet,
      description: "Measure around the narrowest part of your waist",
    },
    {
      name: "Hip",
      icon: FiBarChart2,
      description: "Measure around the fullest part of your hips",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="max-w-5xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Size Guide
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Find your perfect fit with our comprehensive size guide
          </p>
        </motion.div>

        {/* Gender Toggle */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setGender("women")}
            className={`px-6 py-2 rounded-lg font-semibold transition-all ${gender === "women" ? "bg-green-600 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"}`}
          >
            Women's Sizing
          </button>
          <button
            onClick={() => setGender("men")}
            className={`px-6 py-2 rounded-lg font-semibold transition-all ${gender === "men" ? "bg-green-600 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"}`}
          >
            Men's Sizing
          </button>
        </div>

        {/* Size Tables */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              {gender === "women" ? "Women's Size Chart" : "Men's Size Chart"}
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-700">
                    <th className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-left text-gray-900 dark:text-white">
                      Size
                    </th>
                    {gender === "women" ? (
                      <>
                        <th className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-left text-gray-700 dark:text-gray-300">
                          Bust (in)
                        </th>
                        <th className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-left text-gray-700 dark:text-gray-300">
                          Waist (in)
                        </th>
                        <th className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-left text-gray-700 dark:text-gray-300">
                          Hip (in)
                        </th>
                        <th className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-left text-gray-700 dark:text-gray-300">
                          US Size
                        </th>
                        <th className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-left text-gray-700 dark:text-gray-300">
                          UK Size
                        </th>
                      </>
                    ) : (
                      <>
                        <th className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-left text-gray-700 dark:text-gray-300">
                          Chest (in)
                        </th>
                        <th className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-left text-gray-700 dark:text-gray-300">
                          Waist (in)
                        </th>
                        <th className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-left text-gray-700 dark:text-gray-300">
                          Neck (in)
                        </th>
                        <th className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-left text-gray-700 dark:text-gray-300">
                          Sleeve (in)
                        </th>
                      </>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {(gender === "women" ? womenSizes : menSizes).map(
                    (size, idx) => (
                      <tr
                        key={idx}
                        className="hover:bg-gray-50 dark:hover:bg-gray-700"
                      >
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 font-semibold text-gray-900 dark:text-white">
                          {size.size}
                        </td>
                        {gender === "women" ? (
                          <>
                            <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-gray-600 dark:text-gray-400">
                              {size.bust}
                            </td>
                            <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-gray-600 dark:text-gray-400">
                              {size.waist}
                            </td>
                            <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-gray-600 dark:text-gray-400">
                              {size.hip}
                            </td>
                            <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-gray-600 dark:text-gray-400">
                              {size.us}
                            </td>
                            <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-gray-600 dark:text-gray-400">
                              {size.uk}
                            </td>
                          </>
                        ) : (
                          <>
                            <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-gray-600 dark:text-gray-400">
                              {size.chest}
                            </td>
                            <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-gray-600 dark:text-gray-400">
                              {size.waist}
                            </td>
                            <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-gray-600 dark:text-gray-400">
                              {size.neck}
                            </td>
                            <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-gray-600 dark:text-gray-400">
                              {size.sleeve}
                            </td>
                          </>
                        )}
                      </tr>
                    ),
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* How to Measure */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
            How to Measure
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {measurements.map((item, idx) => (
              <div key={idx} className="text-center">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">
                  {item.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-8 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <p className="text-center text-gray-600 dark:text-gray-400 text-sm">
              💡 Tip: If you are between sizes, we recommend ordering the larger
              size for a more comfortable fit.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SizeGuide;
