"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Bars3Icon,
  XMarkIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { useAuth } from "@/contexts/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigation = [
    { name: "خانه", href: "/" },
    { name: "درباره مسابقه", href: "/#about" },
    { name: "قوانین", href: "/#rules" },
    { name: "زمان‌بندی", href: "/#timeline" },
    { name: "سوالات متداول", href: "/#faq" },
    { name: "تیم", href: "/team" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-soft border-b border-neutral-200"
          : "bg-transparent"
      }`}
    >
      <nav className="container-custom">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <motion.div
              className="relative"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <motion.div
                className="w-12 h-12 flex items-center justify-center"
                animate={{
                  scale: [1, 1.03, 1],
                  rotate: [0, 2, -2, 0],
                }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <Image
                  src="/Logo.svg"
                  alt="لوگوی کدوکدیل"
                  width={90}
                  height={62}
                  priority
                  className="w-12 h-auto"
                />
              </motion.div>
              {/* <motion.div
                className="absolute -top-1 -right-1 w-4 h-4 bg-accent-400 rounded-full"
                animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              /> */}
            </motion.div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-gradient font-potk">
                کدوکدیل
              </span>
              {/* <span className="text-xs text-neutral-600 -mt-1">
                CodoCodile 2025
              </span> */}
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8 rtl:space-x-reverse">
            {navigation.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  href={item.href}
                  className="text-neutral-700 hover:text-primary-600 font-medium transition-colors duration-200 relative group"
                >
                  <motion.span whileHover={{ y: -2 }}>{item.name}</motion.span>
                  <motion.span
                    className="absolute -bottom-1 left-0 h-0.5 bg-primary-500"
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              </motion.div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-4 rtl:space-x-reverse">
            {isAuthenticated ? (
              <>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link href="/dashboard" className="btn btn-ghost btn-md">
                    داشبورد
                  </Link>
                </motion.div>
                <motion.div
                  className="flex items-center space-x-2 rtl:space-x-reverse"
                  whileHover={{ scale: 1.05 }}
                >
                  <UserCircleIcon className="w-6 h-6 text-primary-600" />
                  <span className="text-sm font-medium text-foreground">
                    {user?.first_name_persian}
                  </span>
                </motion.div>
                <motion.button
                  onClick={() => {
                    logout();
                    router.push("/");
                  }}
                  className="btn btn-outline btn-md"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  خروج
                </motion.button>
              </>
            ) : (
              <>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link href="/sign-in" className="btn btn-ghost btn-md">
                    ورود
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="/sign-up"
                    className="btn btn-primary btn-md relative overflow-hidden"
                  >
                    <motion.span
                      className="absolute inset-0 bg-white/20"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.5 }}
                    />
                    <span className="relative z-10">ثبت‌نام</span>
                  </Link>
                </motion.div>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-neutral-700 hover:bg-neutral-100 transition-colors duration-200"
          >
            {isMenuOpen ? (
              <XMarkIcon className="w-6 h-6" />
            ) : (
              <Bars3Icon className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white/95 backdrop-blur-md rounded-2xl mt-2 shadow-large border border-neutral-200">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-4 py-3 text-neutral-700 hover:text-primary-600 hover:bg-primary-50 rounded-xl font-medium transition-all duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-neutral-200">
                <div className="flex flex-col space-y-2 px-4">
                  {isAuthenticated ? (
                    <>
                      <Link
                        href="/dashboard"
                        className="btn btn-ghost btn-md w-full justify-center"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        داشبورد
                      </Link>
                      <button
                        onClick={() => {
                          logout();
                          router.push("/");
                          setIsMenuOpen(false);
                        }}
                        className="btn btn-outline btn-md w-full justify-center"
                      >
                        خروج
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/sign-in"
                        className="btn btn-ghost btn-md w-full justify-center"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        ورود
                      </Link>
                      <Link
                        href="/sign-up"
                        className="btn btn-primary btn-md w-full justify-center"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        ثبت‌نام
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
