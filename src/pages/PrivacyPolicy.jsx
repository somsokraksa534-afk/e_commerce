import React from "react";
import { motion } from "framer-motion";
import {
  FiShield,
  FiLock,
  FiEye,
  FiDatabase,
  FiMail,
  FiGlobe,
} from "react-icons/fi";

const PrivacyPolicy = () => {
  const sections = [
    {
      icon: FiShield,
      title: "Information We Collect",
      content:
        "We collect information you provide directly to us, such as when you create an account, make a purchase, or contact customer service. This may include your name, email address, shipping address, payment information, and communication preferences.",
    },
    {
      icon: FiDatabase,
      title: "How We Use Your Information",
      content:
        "We use your information to process orders, communicate with you about your purchases, personalize your shopping experience, improve our services, and send marketing communications (with your consent).",
    },
    {
      icon: FiLock,
      title: "Data Security",
      content:
        "We implement industry-standard security measures to protect your personal information. This includes SSL encryption for data transmission, secure servers, and regular security audits. However, no method of transmission over the Internet is 100% secure.",
    },
    {
      icon: FiEye,
      title: "Your Privacy Rights",
      content:
        "You have the right to access, correct, or delete your personal information. You can also opt-out of marketing communications at any time. To exercise these rights, please contact our privacy team.",
    },
    {
      icon: FiMail,
      title: "Cookies & Tracking",
      content:
        "We use cookies and similar technologies to enhance your browsing experience, analyze site traffic, and personalize content. You can control cookie settings through your browser preferences.",
    },
    {
      icon: FiGlobe,
      title: "International Data Transfers",
      content:
        "Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your data during such transfers.",
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
            Privacy Policy
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Last Updated: 25-March-2026
          </p>
        </motion.div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-8">
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            At RaksaStore, we take your privacy seriously. This Privacy Policy
            explains how we collect, use, disclose, and safeguard your
            information when you visit our website.
          </p>

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

        <div className="bg-green-50 dark:bg-green-900/20 rounded-2xl p-6 border border-green-200 dark:border-green-800">
          <h3 className="font-bold mb-2 text-gray-900 dark:text-white">
            Contact Us
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            If you have any questions about this Privacy Policy, please contact
            us at:
            <br />
            Email: privacy@raksastore.com
            <br />
            Address: St:192z, Phnom Penh, Cambodia
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
