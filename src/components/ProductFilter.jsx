import React, { useState } from "react";
import { FiX, FiChevronDown, FiChevronUp } from "react-icons/fi";
import { useTheme } from "../context/ThemeContext";
import {
  allSizes,
  allColors,
  priceRanges,
  ratingOptions,
  categories,
  subCategories,
} from "../data/products";

const ProductFilter = ({ filters, onFilterChange, onClear }) => {
  const [priceRange, setPriceRange] = useState(filters.priceRange || 500);
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    gender: true,
    sizes: true,
    colors: true,
    price: true,
    rating: true,
  });
  const { accentColor } = useTheme();

  const getAccentColor = () => {
    switch (accentColor) {
      case "secondary":
        return "border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400";
      case "accent":
        return "border-orange-500 bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400";
      default:
        return "border-green-500 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400";
    }
  };

  const toggleSection = (section) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section],
    });
  };

  const handleSizeToggle = (size) => {
    const newSizes = filters.sizes?.includes(size)
      ? filters.sizes.filter((s) => s !== size)
      : [...(filters.sizes || []), size];
    onFilterChange({ sizes: newSizes });
  };

  const handleColorToggle = (colorName) => {
    const newColors = filters.colors?.includes(colorName)
      ? filters.colors.filter((c) => c !== colorName)
      : [...(filters.colors || []), colorName];
    onFilterChange({ colors: newColors });
  };

  const handleRatingChange = (rating) => {
    onFilterChange({ rating: rating === filters.rating ? 0 : rating });
  };

  const handleCategoryChange = (category) => {
    onFilterChange({ category: category });
  };

  const handleGenderChange = (gender) => {
    onFilterChange({ gender: gender });
  };

  const handlePriceRangeChange = (range) => {
    onFilterChange({ priceRange: range });
  };

  const SectionHeader = ({ title, section, count }) => (
    <button
      onClick={() => toggleSection(section)}
      className="w-full flex justify-between items-center py-3 text-left font-semibold text-gray-900 dark:text-white hover:text-green-600 dark:hover:text-green-400 transition-colors"
    >
      <span>
        {title} {count !== undefined && `(${count})`}
      </span>
      {expandedSections[section] ? <FiChevronUp /> : <FiChevronDown />}
    </button>
  );

  const activeFiltersCount = [
    filters.category !== "all" && filters.category,
    filters.gender !== "all" && filters.gender,
    filters.sizes?.length,
    filters.colors?.length,
    filters.priceRange !== 500,
    filters.rating > 0,
    filters.onSale,
    filters.inStock,
  ].filter(Boolean).length;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 sticky top-24">
      <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          Filters
        </h3>
        {activeFiltersCount > 0 && (
          <button
            onClick={onClear}
            className="text-sm text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 transition-colors"
          >
            Clear All ({activeFiltersCount})
          </button>
        )}
      </div>

      {/* Categories */}
      <div className="mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
        <SectionHeader title="Categories" section="categories" />
        {expandedSections.categories && (
          <div className="mt-2 space-y-2">
            {categories.map((cat) => (
              <label
                key={cat.value}
                className="flex items-center cursor-pointer group"
              >
                <input
                  type="radio"
                  name="category"
                  value={cat.value}
                  checked={filters.category === cat.value}
                  onChange={() => handleCategoryChange(cat.value)}
                  className="mr-3 text-green-600 focus:ring-green-500"
                />
                <span className="text-gray-700 dark:text-gray-300 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                  {cat.name}
                </span>
                <span className="ml-auto text-xs text-gray-500">
                  ({cat.count})
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Gender */}
      <div className="mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
        <SectionHeader title="Gender" section="gender" />
        {expandedSections.gender && (
          <div className="mt-2 space-y-2">
            <label className="flex items-center cursor-pointer group">
              <input
                type="radio"
                name="gender"
                value="all"
                checked={filters.gender === "all" || !filters.gender}
                onChange={() => handleGenderChange("all")}
                className="mr-3 text-green-600 focus:ring-green-500"
              />
              <span className="text-gray-700 dark:text-gray-300 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                All
              </span>
            </label>
            <label className="flex items-center cursor-pointer group">
              <input
                type="radio"
                name="gender"
                value="Men"
                checked={filters.gender === "Men"}
                onChange={() => handleGenderChange("Men")}
                className="mr-3 text-green-600 focus:ring-green-500"
              />
              <span className="text-gray-700 dark:text-gray-300 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                Men
              </span>
            </label>
            <label className="flex items-center cursor-pointer group">
              <input
                type="radio"
                name="gender"
                value="Women"
                checked={filters.gender === "Women"}
                onChange={() => handleGenderChange("Women")}
                className="mr-3 text-green-600 focus:ring-green-500"
              />
              <span className="text-gray-700 dark:text-gray-300 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                Women
              </span>
            </label>
            <label className="flex items-center cursor-pointer group">
              <input
                type="radio"
                name="gender"
                value="Unisex"
                checked={filters.gender === "Unisex"}
                onChange={() => handleGenderChange("Unisex")}
                className="mr-3 text-green-600 focus:ring-green-500"
              />
              <span className="text-gray-700 dark:text-gray-300 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                Unisex
              </span>
            </label>
          </div>
        )}
      </div>

      {/* Sizes */}
      <div className="mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
        <SectionHeader title="Size" section="sizes" />
        {expandedSections.sizes && (
          <div className="mt-2 flex flex-wrap gap-2">
            {allSizes.map((size) => (
              <button
                key={size}
                onClick={() => handleSizeToggle(size)}
                className={`px-3 py-1.5 border rounded-lg text-sm transition-all ${
                  filters.sizes?.includes(size)
                    ? getAccentColor()
                    : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-green-500 dark:hover:border-green-400"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Colors */}
      <div className="mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
        <SectionHeader title="Color" section="colors" />
        {expandedSections.colors && (
          <div className="mt-2 flex flex-wrap gap-3">
            {allColors.map((color) => (
              <button
                key={color.name}
                onClick={() => handleColorToggle(color.name)}
                className={`w-8 h-8 rounded-full border-2 transition-all ${
                  filters.colors?.includes(color.name)
                    ? "ring-2 ring-offset-2 ring-green-500 dark:ring-offset-gray-800 scale-110"
                    : "border-gray-300 dark:border-gray-600 hover:scale-110"
                }`}
                style={{ backgroundColor: color.code }}
                title={color.name}
              />
            ))}
          </div>
        )}
      </div>

      {/* Price Range */}
      <div className="mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
        <SectionHeader title="Price Range" section="price" />
        {expandedSections.price && (
          <div className="mt-3 space-y-3">
            <input
              type="range"
              min="0"
              max="500"
              value={priceRange}
              onChange={(e) => {
                setPriceRange(e.target.value);
                handlePriceRangeChange(parseInt(e.target.value));
              }}
              className="w-full accent-green-600"
            />
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
              <span>$0</span>
              <span>${priceRange}+</span>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {priceRanges.map((range) => (
                <button
                  key={range.label}
                  onClick={() => handlePriceRangeChange(range.max)}
                  className={`text-xs px-2 py-1 rounded border transition-all ${
                    filters.priceRange === range.max
                      ? "bg-green-600 text-white border-green-600"
                      : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-green-500"
                  }`}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Rating */}
      <div className="mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
        <SectionHeader title="Rating" section="rating" />
        {expandedSections.rating && (
          <div className="mt-2 space-y-2">
            {ratingOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleRatingChange(option.value)}
                className={`flex items-center space-x-2 w-full p-2 rounded transition-all ${
                  filters.rating === option.value
                    ? getAccentColor()
                    : "hover:bg-gray-50 dark:hover:bg-gray-700"
                }`}
              >
                <div className="flex text-yellow-400">
                  {"★".repeat(option.value)}
                  {"☆".repeat(5 - option.value)}
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  & up
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Additional Filters */}
      <div className="mt-4">
        <label className="flex items-center cursor-pointer py-2">
          <input
            type="checkbox"
            checked={filters.onSale || false}
            onChange={(e) => onFilterChange({ onSale: e.target.checked })}
            className="mr-3 text-green-600 focus:ring-green-500 rounded"
          />
          <span className="text-gray-700 dark:text-gray-300">On Sale Only</span>
        </label>
        <label className="flex items-center cursor-pointer py-2">
          <input
            type="checkbox"
            checked={filters.inStock || false}
            onChange={(e) => onFilterChange({ inStock: e.target.checked })}
            className="mr-3 text-green-600 focus:ring-green-500 rounded"
          />
          <span className="text-gray-700 dark:text-gray-300">
            In Stock Only
          </span>
        </label>
      </div>

      {/* Active Filters Display */}
      {activeFiltersCount > 0 && (
        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
          <h4 className="text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">
            Active Filters
          </h4>
          <div className="flex flex-wrap gap-2">
            {filters.category && filters.category !== "all" && (
              <div className="flex items-center bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Category: {filters.category}
                </span>
                <button
                  onClick={() => handleCategoryChange("all")}
                  className="ml-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  <FiX className="w-3 h-3" />
                </button>
              </div>
            )}
            {filters.gender && filters.gender !== "all" && (
              <div className="flex items-center bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Gender: {filters.gender}
                </span>
                <button
                  onClick={() => handleGenderChange("all")}
                  className="ml-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  <FiX className="w-3 h-3" />
                </button>
              </div>
            )}
            {filters.sizes?.map((size) => (
              <div
                key={size}
                className="flex items-center bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded"
              >
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Size: {size}
                </span>
                <button
                  onClick={() => handleSizeToggle(size)}
                  className="ml-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  <FiX className="w-3 h-3" />
                </button>
              </div>
            ))}
            {filters.colors?.map((color) => (
              <div
                key={color}
                className="flex items-center bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded"
              >
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Color: {color}
                </span>
                <button
                  onClick={() => handleColorToggle(color)}
                  className="ml-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  <FiX className="w-3 h-3" />
                </button>
              </div>
            ))}
            {filters.rating > 0 && (
              <div className="flex items-center bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {filters.rating}+ Stars
                </span>
                <button
                  onClick={() => handleRatingChange(0)}
                  className="ml-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  <FiX className="w-3 h-3" />
                </button>
              </div>
            )}
            {filters.onSale && (
              <div className="flex items-center bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  On Sale
                </span>
                <button
                  onClick={() => onFilterChange({ onSale: false })}
                  className="ml-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  <FiX className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductFilter;
