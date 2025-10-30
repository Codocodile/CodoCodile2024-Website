"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Bars3Icon,
  XMarkIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { useAuth } from "@/contexts/AuthContext";

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
    { name: "تیم", href: "/team" },
    { name: "سوالات متداول", href: "/#faq" },
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
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center shadow-glow">
                <span className="text-white font-bold text-xl">C</span>
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-accent-400 rounded-full animate-pulse"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-gradient">کدوکدیل</span>
              <span className="text-xs text-neutral-600 -mt-1">
                CodoCodile 2025
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8 rtl:space-x-reverse">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-neutral-700 hover:text-primary-600 font-medium transition-colors duration-200 relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-4 rtl:space-x-reverse">
            {isAuthenticated ? (
              <>
                <Link href="/dashboard" className="btn btn-ghost btn-md">
                  داشبورد
                </Link>
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <UserCircleIcon className="w-6 h-6 text-primary-600" />
                  <span className="text-sm font-medium text-foreground">
                    {user?.first_name_persian}
                  </span>
                </div>
                <button
                  onClick={() => {
                    logout();
                    router.push("/");
                  }}
                  className="btn btn-outline btn-md"
                >
                  خروج
                </button>
              </>
            ) : (
              <>
                <Link href="/sign-in" className="btn btn-ghost btn-md">
                  ورود
                </Link>
                <Link href="/sign-up" className="btn btn-primary btn-md">
                  ثبت‌نام
                </Link>
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
