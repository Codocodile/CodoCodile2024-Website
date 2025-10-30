"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronRightIcon, PlayIcon } from "@heroicons/react/24/outline";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden bg-gradient-hero"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Static Background Elements */}
        <div className="absolute top-20 left-10 w-16 h-16 bg-primary-200/30 rounded-2xl rotate-12"></div>
        <div className="absolute top-40 right-20 w-12 h-12 bg-accent-200/30 rounded-xl -rotate-12"></div>
        <div className="absolute bottom-40 left-20 w-20 h-20 bg-primary-300/20 rounded-3xl rotate-45"></div>
        <div className="absolute bottom-20 right-10 w-14 h-14 bg-accent-300/20 rounded-2xl -rotate-12"></div>

        {/* Static Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent-200/20 rounded-full blur-3xl"></div>
      </div>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div
            className={`space-y-8 ${
              isVisible ? "animate-fade-in-up" : "opacity-0"
            }`}
          >
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-primary-100 text-primary-800 rounded-full text-sm font-medium">
              <span className="w-2 h-2 bg-primary-500 rounded-full mr-2 rtl:ml-2 animate-pulse"></span>
              مسابقه 2025 - ثبت‌نام باز است
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight w-full">
                <span className="text-foreground">مسابقه</span>
                <br />
                <span className="text-gradient">کدوکدیل</span>
                <br />
                <span className="text-foreground">را از دست ندهید</span>
              </h1>

              {/* Fixed Subtitle */}
              <div className="h-16 flex items-center">
                <span className="text-xl sm:text-2xl lg:text-3xl text-neutral-600 w-full">
                  در بزرگترین{" "}
                  <span className="text-gradient font-semibold">
                    مسابقه برنامه‌نویسی
                  </span>{" "}
                  دانشگاه صنعتی شریف
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-lg text-neutral-600 leading-relaxed max-w-lg">
              در این مسابقه جذاب، مهارت‌های برنامه‌نویسی و حل مسئله خود را به
              چالش بکشید، با تیم‌های دیگر رقابت کنید و از فرصت‌های یادگیری و رشد
              بهره‌مند شوید.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/sign-up" className="btn btn-primary btn-lg group">
                شروع مسابقه
                <ChevronRightIcon className="w-5 h-5 mr-2 rtl:ml-2 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>

              <button className="btn btn-outline btn-lg group">
                <PlayIcon className="w-5 h-5 mr-2 rtl:ml-2" />
                تماشای ویدیو
              </button>
            </div>

            {/* Stats */}
            {/* <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-gradient">500+</div>
                <div className="text-sm text-neutral-600">شرکت‌کننده</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gradient">24</div>
                <div className="text-sm text-neutral-600">ساعت مسابقه</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gradient">3</div>
                <div className="text-sm text-neutral-600">سطح مختلف</div>
              </div>
            </div> */}
          </div>

          {/* Right Content - Visual */}
          <div
            className={`relative ${
              isVisible ? "animate-fade-in-right" : "opacity-0"
            }`}
            style={{ animationDelay: "0.3s" }}
          >
            <div className="relative w-full h-96 lg:h-[500px]">
              {/* Main Card */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-primary-700 rounded-3xl shadow-glow-lg transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="p-8 h-full flex flex-col justify-between text-white">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                      <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    </div>
                    <div className="text-sm font-mono">CodoCodile 2025</div>
                  </div>

                  {/* Code Preview */}
                  <div className="space-y-4" style={{ direction: "ltr" }}>
                    <div className="text-2xl font-bold">function solve() </div>
                    <div className="space-y-2 text-sm font-mono opacity-90">
                      <div className="flex items-center">
                        <span className="text-accent-300 mr-2 rtl:ml-2">
                          //
                        </span>
                        <span>مسئله الگوریتمی</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-accent-300 mr-2 rtl:ml-2">
                          const
                        </span>
                        <span className="text-accent-400">result</span>
                        <span className="text-white">=</span>
                        <span className="text-accent-400">algorithm</span>
                        <span className="text-white">();</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-accent-300 mr-2 rtl:ml-2">
                          return
                        </span>
                        <span className="text-accent-400">result</span>
                        <span className="text-white">;</span>
                      </div>
                    </div>
                    <div className="text-2xl font-bold"></div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between">
                    <div className="text-sm opacity-75">Status: Ready</div>
                    <div className="flex space-x-2 rtl:space-x-reverse">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <div className="text-xs">Online</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-accent-400 rounded-2xl shadow-medium animate-float"></div>
              <div
                className="absolute -bottom-4 -left-4 w-12 h-12 bg-primary-300 rounded-xl shadow-medium animate-float"
                style={{ animationDelay: "1s" }}
              ></div>
              <div
                className="absolute top-1/2 -left-8 w-8 h-8 bg-accent-500 rounded-lg shadow-medium animate-float"
                style={{ animationDelay: "2s" }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary-300 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary-500 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
