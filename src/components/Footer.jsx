import React from "react";
import { Link } from "react-router-dom";
import {
  FiMapPin,
  FiPhone,
  FiMail,
  FiClock,
  FiFacebook,
  FiTwitter,
  FiInstagram,
  FiYoutube,
  FiSend,
  FiHeart,
} from "react-icons/fi";
import { useTheme } from "../context/ThemeContext";

const Footer = () => {
  const { accentColor } = useTheme();
  const currentYear = new Date().getFullYear();

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

  const socialLinks = [
    {
      icon: FiFacebook,
      name: "Facebook",
      url: "https://facebook.com",
      color: "hover:bg-[#1877f2]",
    },
    {
      icon: FiTwitter,
      name: "Twitter",
      url: "https://twitter.com",
      color: "hover:bg-[#1da1f2]",
    },
    {
      icon: FiInstagram,
      name: "Instagram",
      url: "https://instagram.com",
      color: "hover:bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045]",
    },
    {
      icon: FiYoutube,
      name: "YouTube",
      url: "https://youtube.com",
      color: "hover:bg-[#ff0000]",
    },
  ];

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "New Arrivals", path: "/shop?category=new" },
    { name: "Sale", path: "/shop?category=sale" },
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const customerService = [
    { name: "Shipping Info", path: "/shipping" },
    { name: "Returns & Exchanges", path: "/returns" },
    { name: "Size Guide", path: "/size-guide" },
    { name: "FAQs", path: "/faq" },
    { name: "Privacy Policy", path: "/privacy" },
    { name: "Terms & Conditions", path: "/terms" },
  ];

  const contactInfo = [
    { icon: FiMapPin, text: "St:192z, Phnom Penh, Cambodia" },
    { icon: FiPhone, text: "+855 85 217 721", href: "+855 85 217 721" },
    {
      icon: FiMail,
      text: "support@raksastore.com",
      href: "mailto:support@raksastore.com",
    },
    { icon: FiClock, text: "Mon - Fri: 9:00 AM - 6:00 PM" },
  ];

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-green-500 to-green-600 bg-clip-text text-transparent">
              RaksaStore
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your one-stop destination for modern fashion. We bring you the
              latest trends with premium quality and sustainable materials.
            </p>

            {/* Social Media Icons */}
            <div className="flex space-x-3 pt-2">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group relative w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-700 transition-all duration-300 flex items-center justify-center hover:scale-110 hover:shadow-lg`}
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-300" />
                  <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    {social.name}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white relative inline-block">
              Quick Links
              <span
                className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r ${getAccentGradient()} rounded-full`}
              ></span>
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-white transition-colors duration-300 text-sm flex items-center group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-green-500 mr-0 group-hover:mr-2 transition-all duration-300"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white relative inline-block">
              Customer Service
              <span
                className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r ${getAccentGradient()} rounded-full`}
              ></span>
            </h4>
            <ul className="space-y-2">
              {customerService.map((service, index) => (
                <li key={index}>
                  <Link
                    to={service.path}
                    className="text-gray-400 hover:text-white transition-colors duration-300 text-sm flex items-center group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-green-500 mr-0 group-hover:mr-2 transition-all duration-300"></span>
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white relative inline-block">
              Contact Us
              <span
                className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r ${getAccentGradient()} rounded-full`}
              ></span>
            </h4>
            <ul className="space-y-3">
              {contactInfo.map((info, index) => (
                <li key={index} className="flex items-start space-x-3 group">
                  <info.icon className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                  {info.href ? (
                    <a
                      href={info.href}
                      className="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
                    >
                      {info.text}
                    </a>
                  ) : (
                    <span className="text-gray-400 text-sm">{info.text}</span>
                  )}
                </li>
              ))}
            </ul>

            {/* Newsletter Subscription */}
            <div className="mt-6">
              <p className="text-sm text-gray-400 mb-2">
                Subscribe to our newsletter
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-l-lg text-sm text-white focus:outline-none focus:border-green-500 transition-colors"
                />
                <button
                  className={`bg-gradient-to-r ${getAccentGradient()} px-3 py-2 rounded-r-lg hover:shadow-lg transition-all duration-300`}
                >
                  <FiSend className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <div className="flex flex-wrap justify-center items-center gap-6">
            <span className="text-gray-500 text-sm">
              Secure Payment Methods:
            </span>
            <img
              src="https://cdn-icons-png.flaticon.com/512/196/196578.png"
              alt="Visa"
              className="h-8 w-auto opacity-70 hover:opacity-100 transition-opacity"
            />
            <img
              src="https://cdn-icons-png.flaticon.com/512/196/196561.png"
              alt="Mastercard"
              className="h-8 w-auto opacity-70 hover:opacity-100 transition-opacity"
            />
            <img
              src="https://cdn-icons-png.flaticon.com/512/196/196539.png"
              alt="PayPal"
              className="h-8 w-auto opacity-70 hover:opacity-100 transition-opacity"
            />
            <img
              src="https://cdn-icons-png.flaticon.com/512/196/196566.png"
              alt="American Express"
              className="h-8 w-auto opacity-70 hover:opacity-100 transition-opacity"
            />
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <p className="text-gray-500 text-sm">
                © {currentYear} RAKSA STORE. All rights reserved. Made with{" "}
                <FiHeart className="inline-block w-3 h-3 text-red-500 animate-pulse" />{" "}
                by RAKSA STORE
              </p>
            </div>

            <div className="flex space-x-6">
              <Link
                to="/privacy"
                className="text-gray-500 hover:text-white text-sm transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="text-gray-500 hover:text-white text-sm transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                to="/sitemap"
                className="text-gray-500 hover:text-white text-sm transition-colors"
              >
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
