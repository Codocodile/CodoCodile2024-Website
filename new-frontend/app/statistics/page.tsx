"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  UserGroupIcon,
  AcademicCapIcon,
  BriefcaseIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { statisticsAPI } from "@/lib/api";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface Statistics {
  total: number;
  senior: number;
  pro: number;
  junior: number;
}

const StatisticsPage = () => {
  const [statistics, setStatistics] = useState<Statistics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStatistics = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await statisticsAPI.getStatistics();
      setStatistics(data);
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          "خطا در دریافت اطلاعات. لطفا دوباره تلاش کنید."
      );
      console.error("Error fetching statistics:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatistics();
  }, []);

  const statCards = [
    {
      id: "total",
      title: "کل شرکت‌کنندگان",
      value: statistics?.total || 0,
      icon: UserGroupIcon,
      color: "from-primary-500 to-primary-600",
      bgColor: "bg-primary-50",
      textColor: "text-primary-700",
      borderColor: "border-primary-200",
      delay: 0.1,
    },
    {
      id: "senior",
      title: "سینیور",
      value: statistics?.senior || 0,
      icon: AcademicCapIcon,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      textColor: "text-purple-700",
      borderColor: "border-purple-200",
      delay: 0.2,
    },
    {
      id: "pro",
      title: "پرو",
      value: statistics?.pro || 0,
      icon: BriefcaseIcon,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      textColor: "text-blue-700",
      borderColor: "border-blue-200",
      delay: 0.3,
    },
    {
      id: "junior",
      title: "جونیور",
      value: statistics?.junior || 0,
      icon: SparklesIcon,
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
      textColor: "text-orange-700",
      borderColor: "border-orange-200",
      delay: 0.4,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const numberVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const AnimatedNumber = ({
    value,
    delay,
  }: {
    value: number;
    delay: number;
  }) => {
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
      setDisplayValue(0);
      const duration = 1500;
      const steps = 60;
      const increment = value / steps;
      let current = 0;
      let step = 0;

      const timer = setInterval(() => {
        step++;
        current = Math.min(increment * step, value);
        setDisplayValue(Math.floor(current));

        if (step >= steps) {
          setDisplayValue(value);
          clearInterval(timer);
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }, [value]);

    return (
      <motion.span
        variants={numberVariants}
        initial="hidden"
        animate="visible"
        custom={delay}
      >
        {displayValue.toLocaleString("fa-IR")}
      </motion.span>
    );
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-primary">
        <section className="section-padding pt-32 pb-20">
          <div className="container-custom">
            {/* Header */}
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center px-4 py-2 bg-primary-100 text-primary-800 rounded-full text-sm font-medium mb-6">
                <span className="w-2 h-2 bg-primary-500 rounded-full mr-2 rtl:ml-2 animate-pulse"></span>
                آمار شرکت‌کنندگان
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                <span className="text-gradient font-potk">آمار زنده</span>
              </h1>
              <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
                تعداد شرکت‌کنندگان مسابقه کدوکدیل به تفکیک سطح
              </p>
            </motion.div>

            {/* Loading State */}
            {loading && (
              <div className="flex flex-col items-center justify-center py-20">
                <motion.div
                  className="w-16 h-16 border-4 border-primary-300 border-t-primary-600 rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                <p className="mt-4 text-lg text-neutral-600">
                  در حال دریافت اطلاعات...
                </p>
              </div>
            )}

            {/* Error State */}
            {error && !loading && (
              <motion.div
                className="max-w-2xl mx-auto mb-8"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6 text-center">
                  <p className="text-red-700 text-lg mb-4">{error}</p>
                  <button
                    onClick={fetchStatistics}
                    className="btn-primary px-6 py-2"
                  >
                    تلاش مجدد
                  </button>
                </div>
              </motion.div>
            )}

            {/* Statistics Cards */}
            {statistics && !loading && (
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {statCards.map((card) => {
                  const Icon = card.icon;
                  return (
                    <motion.div
                      key={card.id}
                      variants={itemVariants}
                      whileHover={{ scale: 1.05, y: -5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div
                        className={`card p-8 ${card.bgColor} ${card.borderColor} border-2 relative overflow-hidden group`}
                      >
                        {/* Gradient Background Effect */}
                        <div
                          className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                        />

                        {/* Icon */}
                        <motion.div
                          className={`relative z-10 w-16 h-16 rounded-2xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-6 shadow-glow`}
                          whileHover={{ rotate: 360, scale: 1.1 }}
                          transition={{ duration: 0.6 }}
                        >
                          <Icon className="w-8 h-8 text-white" />
                        </motion.div>

                        {/* Content */}
                        <div className="relative z-10">
                          <h3
                            className={`text-lg font-semibold ${card.textColor} mb-3`}
                          >
                            {card.title}
                          </h3>
                          <div
                            className={`text-4xl lg:text-5xl font-bold ${card.textColor} font-potk`}
                          >
                            <AnimatedNumber
                              value={card.value}
                              delay={card.delay}
                            />
                          </div>
                        </div>

                        {/* Decorative Elements */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -mr-16 -mt-16" />
                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-5 rounded-full -ml-12 -mb-12" />
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}

            {/* Refresh Button */}
            {statistics && !loading && (
              <motion.div
                className="mt-12 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <button
                  onClick={fetchStatistics}
                  className="btn-secondary px-8 py-3 text-lg"
                  disabled={loading}
                >
                  {loading ? "در حال به‌روزرسانی..." : "به‌روزرسانی آمار"}
                </button>
              </motion.div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default StatisticsPage;
