"use client";

import { useState, useEffect, useRef } from "react";
import {
  CalendarDaysIcon,
  ClockIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { motion, useScroll, useTransform } from "framer-motion";

const Timeline = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activePhase, setActivePhase] = useState(0);
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

  const phases = [
    {
      id: 1,
      title: "شروع ثبت‌نام",
      date: "30 آبان 1404",
      time: "10:00",
      description: "شروع ثبت‌نام آنلاین در وب‌سایت مسابقه",
      status: "current",
      icon: CheckCircleIcon,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      textColor: "text-green-700",
      borderColor: "border-green-200",
    },
    {
      id: 2,
      title: "پایان ثبت‌نام",
      date: "06 آذر 1404",
      time: "23:59",
      description: "آخرین مهلت ثبت‌نام و تشکیل تیم",
      status: "upcoming",
      icon: ClockIcon,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      textColor: "text-blue-700",
      borderColor: "border-blue-200",
    },
    {
      id: 3,
      title: "آزمون اولیه",
      date: "07 آذر 1404",
      time: "18:00",
      description: "آزمون آنلاین برای تعیین سطح شرکت‌کنندگان",
      status: "upcoming",
      icon: CalendarDaysIcon,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      textColor: "text-purple-700",
      borderColor: "border-purple-200",
    },
    {
      id: 4,
      title: "مسابقه حضوری",
      date: "14 آذر 1404",
      time: "08:00 صبح",
      description: "شروع مسابقه حضوری کدوکدیل",
      status: "upcoming",
      icon: CalendarDaysIcon,
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
      textColor: "text-orange-700",
      borderColor: "border-orange-200",
    },
    // {
    //   id: 5,
    //   title: "پایان مسابقه",
    //   date: "13 بهمن 1402",
    //   time: "08:00 صبح",
    //   description: "پایان مسابقه و ارسال نتایج نهایی",
    //   status: "upcoming",
    //   icon: CheckCircleIcon,
    //   color: "from-red-500 to-red-600",
    //   bgColor: "bg-red-50",
    //   textColor: "text-red-700",
    //   borderColor: "border-red-200",
    // },
    // {
    //   id: 6,
    //   title: "اعلام نتایج",
    //   date: "15 بهمن 1402",
    //   time: "16:00 بعدازظهر",
    //   description: "اعلام نتایج و معرفی برندگان",
    //   status: "upcoming",
    //   icon: CheckCircleIcon,
    //   color: "from-indigo-500 to-indigo-600",
    //   bgColor: "bg-indigo-50",
    //   textColor: "text-indigo-700",
    //   borderColor: "border-indigo-200",
    // },
  ];

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "تکمیل شده";
      case "current":
        return "در حال انجام";
      case "upcoming":
        return "آینده";
      default:
        return "";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "current":
        return "bg-blue-100 text-blue-800";
      case "upcoming":
        return "bg-gray-100 text-gray-800";
      default:
        return "";
    }
  };

  return (
    <section
      ref={sectionRef}
      id="timeline"
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
            زمان‌بندی مسابقه
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            <span className="text-gradient font-potk">برنامه زمانی</span>
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
            مراحل مختلف مسابقه کدوکدیل و زمان‌بندی دقیق هر مرحله
          </p>
        </div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Animated Timeline Line */}
            <div className="absolute right-8 top-0 bottom-0 w-1 bg-neutral-200 rounded-full overflow-hidden">
              <motion.div
                className="absolute top-0 right-0 w-full bg-gradient-to-b from-primary-300 via-primary-400 to-primary-500 rounded-full"
                initial={{ height: "0%" }}
                animate={isVisible ? { height: "100%" } : {}}
                transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
              />
            </div>

            {/* Timeline Items */}
            <div className="space-y-8">
              {phases.map((phase, index) => (
                <motion.div
                  key={phase.id}
                  className="relative flex items-center"
                  initial={{ opacity: 0, x: -50 }}
                  animate={isVisible ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  whileHover={{ x: 10 }}
                >
                  {/* Timeline Dot */}
                  <div className="relative z-10 flex-shrink-0">
                    <motion.div
                      className={`w-16 h-16 rounded-full bg-gradient-to-br ${phase.color} flex items-center justify-center shadow-glow`}
                      initial={{ scale: 0 }}
                      animate={isVisible ? { scale: 1 } : {}}
                      transition={{
                        duration: 0.5,
                        delay: index * 0.15 + 0.3,
                        type: "spring",
                      }}
                      whileHover={{ scale: 1.15, rotate: 360 }}
                    >
                      <phase.icon className="w-8 h-8 text-white" />
                    </motion.div>
                    {phase.status === "current" && (
                      <motion.div
                        className="absolute inset-0 rounded-full bg-gradient-to-br from-primary-300 to-primary-500"
                        animate={{ scale: [1, 1.5, 1], opacity: [0.7, 0, 0.7] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}
                  </div>

                  {/* Timeline Content */}
                  <motion.div
                    className="mr-8 rtl:ml-8 flex-1"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isVisible ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: index * 0.15 + 0.2 }}
                  >
                    <motion.div
                      className={`card p-6 transition-all duration-300 ${
                        phase.status === "current"
                          ? "ring-2 ring-primary-300 shadow-glow-primary"
                          : ""
                      }`}
                      whileHover={{ scale: 1.02, y: -5 }}
                      initial={{ y: 20, opacity: 0 }}
                      animate={isVisible ? { y: 0, opacity: 1 } : {}}
                      transition={{ duration: 0.5, delay: index * 0.15 + 0.4 }}
                    >
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                        <div>
                          <motion.h3
                            className="text-xl font-bold text-foreground mb-2"
                            initial={{ opacity: 0 }}
                            animate={isVisible ? { opacity: 1 } : {}}
                            transition={{
                              duration: 0.5,
                              delay: index * 0.15 + 0.5,
                            }}
                          >
                            {phase.title}
                          </motion.h3>
                          <div className="flex items-center space-x-4 rtl:space-x-reverse text-sm text-neutral-600">
                            <motion.span
                              className="flex items-center"
                              initial={{ opacity: 0, x: -10 }}
                              animate={isVisible ? { opacity: 1, x: 0 } : {}}
                              transition={{
                                duration: 0.4,
                                delay: index * 0.15 + 0.6,
                              }}
                            >
                              <CalendarDaysIcon className="w-4 h-4 mr-1 rtl:ml-1" />
                              {phase.date}
                            </motion.span>
                            <motion.span
                              className="flex items-center"
                              initial={{ opacity: 0, x: -10 }}
                              animate={isVisible ? { opacity: 1, x: 0 } : {}}
                              transition={{
                                duration: 0.4,
                                delay: index * 0.15 + 0.7,
                              }}
                            >
                              <ClockIcon className="w-4 h-4 mr-1 rtl:ml-1" />
                              {phase.time}
                            </motion.span>
                          </div>
                        </div>
                        <motion.div
                          className="mt-4 lg:mt-0"
                          initial={{ scale: 0 }}
                          animate={isVisible ? { scale: 1 } : {}}
                          transition={{
                            duration: 0.3,
                            delay: index * 0.15 + 0.8,
                            type: "spring",
                          }}
                        >
                          <span
                            className={`badge ${getStatusColor(phase.status)}`}
                          >
                            {getStatusText(phase.status)}
                          </span>
                        </motion.div>
                      </div>
                      <motion.p
                        className="text-neutral-600 leading-relaxed"
                        initial={{ opacity: 0 }}
                        animate={isVisible ? { opacity: 1 } : {}}
                        transition={{
                          duration: 0.5,
                          delay: index * 0.15 + 0.9,
                        }}
                      >
                        {phase.description}
                      </motion.p>
                    </motion.div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Current Phase Highlight */}
        {/* <div
          className={`mt-16 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
        >
          <div className="bg-gradient-to-r from-primary-500 to-primary-700 rounded-3xl p-8 lg:p-12 text-white">
            <div className="text-center">
              <h3 className="text-3xl font-bold mb-4">
                مرحله فعلی: پایان ثبت‌نام
              </h3>
              <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                تا پایان مهلت ثبت‌نام فقط چند روز باقی مانده است. همین حالا
                ثبت‌نام کنید و خود را برای چالشی بزرگ آماده کنید.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="btn bg-white text-primary-700 hover:bg-neutral-100 btn-lg">
                  ثبت‌نام فوری
                </button>
                <button className="btn border-2 border-white text-white hover:bg-white hover:text-primary-700 btn-lg">
                  یادآوری برای من
                </button>
              </div>
            </div>
          </div>
        </div> */}

        {/* Countdown Timer */}
        {/* <div
          className={`mt-12 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
        >
          <div className="bg-white rounded-2xl p-8 shadow-large">
            <h3 className="text-2xl font-bold text-center text-foreground mb-8">
              زمان باقی‌مانده تا پایان ثبت‌نام
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: "روز", value: "15" },
                { label: "ساعت", value: "12" },
                { label: "دقیقه", value: "45" },
                { label: "ثانیه", value: "30" },
              ].map((item, index) => (
                <div key={item.label} className="text-center">
                  <div className="text-4xl font-bold text-gradient mb-2">
                    {item.value}
                  </div>
                  <div className="text-sm text-neutral-600">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default Timeline;
