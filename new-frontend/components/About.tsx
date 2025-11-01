"use client";

import { useState, useEffect, useRef } from "react";
import {
  CodeBracketIcon,
  UserGroupIcon,
  TrophyIcon,
  AcademicCapIcon,
} from "@heroicons/react/24/outline";

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: CodeBracketIcon,
      title: "مسائل چالش‌برانگیز",
      description:
        "مسائل متنوع و جذاب در سطوح مختلف برای تقویت مهارت‌های برنامه‌نویسی",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: UserGroupIcon,
      title: "کار تیمی",
      description:
        "فرصت تشکیل تیم و همکاری با سایر برنامه‌نویسان برای حل مسائل",
      color: "from-green-500 to-green-600",
    },
    {
      icon: TrophyIcon,
      title: "جوایز ارزشمند",
      description: "جوایز نقدی و غیرنقدی برای برندگان و شرکت‌کنندگان برتر",
      color: "from-yellow-500 to-yellow-600",
    },
    {
      icon: AcademicCapIcon,
      title: "یادگیری و رشد",
      description: "فرصت یادگیری تکنیک‌های جدید و بهبود مهارت‌های حل مسئله",
      color: "from-purple-500 to-purple-600",
    },
  ];

  const stats = [
    { number: "500+", label: "شرکت‌کننده", suffix: "نفر" },
    { number: "24", label: "ساعت", suffix: "مسابقه" },
    { number: "3", label: "سطح", suffix: "مختلف" },
    { number: "50+", label: "مسئله", suffix: "چالش‌برانگیز" },
  ];

  return (
    <section
      ref={sectionRef}
      id="about"
      className="section-padding bg-gradient-primary"
    >
      <div className="container-custom">
        {/* Section Header */}
        <div
          className={`text-center mb-16 ${
            isVisible ? "animate-fade-in-up" : "opacity-0"
          }`}
        >
          <div className="inline-flex items-center px-4 py-2 bg-primary-100 text-primary-800 rounded-full text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-primary-500 rounded-full mr-2 rtl:ml-2 animate-pulse"></span>
            درباره مسابقه
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            <span className="text-gradient font-potk">مسابقه کدوکدیل</span>
          </h2>
          <p className="text-xl text-neutral-600 mx-auto leading-relaxed text-justify">
            مسابقه‌ی آموزشی کدوکدیل، رقابتی جذاب و فرصت‌ساز برای دانشجویان و
            دانش‌آموزان علاقه‌مند به علوم کامپیوتر و برنامه‌نویسی است. این
            مسابقه در سه سطح Senior ،Junior و Pro برگزار می‌شود. دانشجویان
            رشته‌های مهندسی کامپیوتر، علوم کامپیوتر، مهندسی برق، علوم ریاضی و
            همچنین تمامی دانشجویانی که درس مبانی برنامه‌نویسی را گذرانده‌اند و
            به حوزه‌ی الگوریتم علاقه‌مند هستند، امکان شرکت در این مسابقه را
            دارند. در این رقابت، زبان‌های برنامه‌نویسی C، C++، Java و Python
            توسط سیستم داوری پشتیبانی می‌شوند. پیش از آغاز مسابقه، کارگاه‌های
            آموزشی برگزار می‌شوند تا شرکت‌کنندگان بتوانند مهارت‌های خود را در
            زمینه‌ی الگوریتم تقویت کنند. مرحله‌ی اول مسابقه به صورت مجازی و
            مرحله‌ی دوم به صورت حضوری در دانشگاه صنعتی شریف برگزار می‌شود. شرکت
            در این مسابقه تنها به‌صورت تیم‌های دو نفره ممکن است. در صورتی که
            هم‌تیمی ندارید، می‌توانید از طریق گروه تلگرامی مخصوص شرکت‌کنندگان،
            هم‌تیمی مناسب خود را پیدا کنید. شرکت در مرحله‌ی انتخابی آنلاین
            رایگان است و تیم‌های برتر مسابقه‌ی حضوری علاوه‌بر جوایز نقدی،
            هدایایی نیز دریافت خواهند کرد.
          </p>
        </div>

        {/* Features Grid */}
        {/* <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={`card-hover p-8 text-center group ${
                isVisible ? "animate-fade-in-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div
                className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-medium group-hover:scale-110 transition-transform duration-300`}
              >
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">
                {feature.title}
              </h3>
              <p className="text-neutral-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div> */}

        {/* Main Content */}
        {/* <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center"> */}
        {/* Left Content */}
        {/* <div
            className={`space-y-8 ${
              isVisible ? "animate-fade-in-left" : "opacity-0"
            }`}
          >
            <div>
              <h3 className="text-3xl font-bold text-foreground mb-6">
                چرا در کدوکدیل شرکت کنیم؟
              </h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4 rtl:space-x-reverse">
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-primary-600 font-bold text-sm">
                      1
                    </span>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-2">
                      تقویت مهارت‌های برنامه‌نویسی
                    </h4>
                    <p className="text-neutral-600">
                      با حل مسائل متنوع و چالش‌برانگیز، مهارت‌های برنامه‌نویسی و
                      حل مسئله خود را بهبود دهید.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 rtl:space-x-reverse">
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-primary-600 font-bold text-sm">
                      2
                    </span>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-2">
                      تجربه کار تیمی
                    </h4>
                    <p className="text-neutral-600">
                      با تشکیل تیم و همکاری با سایر برنامه‌نویسان، مهارت‌های کار
                      تیمی خود را تقویت کنید.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 rtl:space-x-reverse">
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-primary-600 font-bold text-sm">
                      3
                    </span>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-2">
                      شبکه‌سازی و ارتباطات
                    </h4>
                    <p className="text-neutral-600">
                      با برنامه‌نویسان دیگر آشنا شوید و شبکه ارتباطی خود را
                      گسترش دهید.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div> */}

        {/* Right Content - Stats */}
        {/* <div
            className={`${isVisible ? "animate-fade-in-right" : "opacity-0"}`}
          >
            <div className="bg-white rounded-3xl p-8 shadow-large">
              <h3 className="text-2xl font-bold text-foreground mb-8 text-center">
                آمار مسابقه
              </h3>
              <div className="grid grid-cols-2 gap-8">
                {stats.map((stat, index) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-4xl font-bold text-gradient mb-2">
                      {stat.number}
                    </div>
                    <div className="text-sm text-neutral-600">
                      {stat.label} {stat.suffix}
                    </div>
                  </div>
                ))}
              </div> */}

        {/* Progress Bar */}
        {/* <div className="mt-8">
                <div className="flex justify-between text-sm text-neutral-600 mb-2">
                  <span>پیشرفت ثبت‌نام</span>
                  <span>75%</span>
                </div>
                <div className="w-full bg-neutral-200 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-primary-500 to-primary-600 h-3 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: isVisible ? "75%" : "0%" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div> */}

        {/* Call to Action */}
        <div
          className={`text-center mt-16 ${
            isVisible ? "animate-fade-in-up" : "opacity-0"
          }`}
        >
          <div className="bg-gradient-to-r from-primary-500 to-primary-700 rounded-3xl p-8 lg:p-8 -mt-8 text-white">
            <h3 className="text-3xl font-bold mb-4">آماده شروع هستید؟</h3>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              همین حالا در مسابقه کدوکدیل ثبت‌نام کنید و خود را برای چالشی بزرگ
              آماده کنید
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn bg-white text-primary-700 hover:bg-neutral-100 btn-lg">
                ثبت‌نام در مسابقه
              </button>
              <button className="btn border-2 border-white text-white hover:bg-white hover:text-primary-700 btn-lg">
                اطلاعات بیشتر
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
