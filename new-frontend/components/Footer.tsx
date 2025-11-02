"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    about: [
      { name: "درباره مسابقه", href: "#about" },
      { name: "قوانین", href: "#rules" },
      { name: "زمان‌بندی", href: "#timeline" },
      { name: "تیم برگزاری", href: "#team" },
    ],
    support: [
      { name: "مرکز راهنمایی", href: "#" },
      { name: "تماس با ما", href: "#Faq" },
      { name: "سوالات متداول", href: "#faq" },
      { name: "گزارش مشکل", href: "#" },
    ],
    legal: [
      { name: "حریم خصوصی", href: "#" },
      { name: "شرایط استفاده", href: "#" },
      { name: "قوانین مسابقه", href: "#rules" },
      { name: "سیاست کوکی", href: "#" },
    ],
  };

  const socialLinks = [
    { name: "تلگرام", href: "#", icon: "📱" },
    { name: "اینستاگرام", href: "#", icon: "📷" },
    { name: "لینکدین", href: "#", icon: "💼" },
    { name: "توییتر", href: "#", icon: "🐦" },
    { name: "یوتیوب", href: "#", icon: "📺" },
  ];

  return (
    <footer className="bg-primary-700 text-white">
      <div className="container-custom">
        {/* Bottom Footer */}
        <div className="border-t border-primary-600 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-primary-100 text-sm">
              © {currentYear} کدوکدیل. تمام حقوق محفوظ است.
            </div>
            <div className="flex items-center space-x-6 rtl:space-x-reverse text-sm text-primary-100">
              {/* <span>طراحی شده با ❤️ در دانشگاه صنعتی شریف</span> */}
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <motion.button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-8 left-8 w-12 h-12 bg-primary-500 text-white rounded-full shadow-large flex items-center justify-center z-50"
        title="بازگشت به بالا"
        whileHover={{
          scale: 1.1,
          y: -5,
          boxShadow: "0 0 30px rgba(144, 201, 100, 0.6)",
        }}
        whileTap={{ scale: 0.9 }}
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <motion.svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </motion.svg>
      </motion.button>
    </footer>
  );
};

export default Footer;
