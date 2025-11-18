"use client";

import React from "react";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

const sponsors = [
  {
    id: 1,
    name: "دیوار",
    logo: "/DivarLogo.svg",
    description:
      "دیوار یکی از بزرگ‌ترین پلتفرم‌های خرید و فروش آنلاین در ایران است که در سال ۲۰۱۲ تأسیس شده است. این پلتفرم به کاربران امکان می‌دهد به‌صورت رایگان آگهی‌های خود را در حوزه‌های مختلفی از جمله املاک، وسایل نقلیه، کالاهای دیجیتال و خدمات ثبت کنند.",
    jobLink: "https://careers.divar.ir/positions", // لینک فرصت‌های شغلی بعداً اضافه می‌شود
    glowColor: "#a62426", // رنگ قرمز تیره دیوار
  },
  {
    id: 2,
    name: "جاباما",
    logo: "/Jabama-Logo.svg",
    description:
      "جاباما یک پلتفرم آنلاین برای رزرو اقامتگاه‌های متنوع در سراسر ایران است که در سال ۲۰۱۶ تأسیس شده است. این شرکت با ارائه گزینه‌های متنوع از هتل‌ها تا اقامتگاه‌های بوم‌گردی، به مسافران کمک می‌کند تا تجربه‌ای به‌یادماندنی از سفرهای خود داشته باشند.",
    jobLink: "https://careers.jabama.com/", // لینک فرصت‌های شغلی بعداً اضافه می‌شود
    glowColor: "#ffa41b", // رنگ نارنجی جاباما
  },
  {
    id: 3,
    name: "اسنپ",
    logo: "/Snapp-Logo-Farsi.svg",
    description:
      "اسنپ اولین و بزرگ‌ترین سامانه هوشمند حمل‌ونقل در ایران است که در سال ۲۰۱۴ تأسیس شده است. این شرکت خدماتی مانند درخواست خودرو، پیک موتوری، سفارش غذا و خرید از سوپرمارکت را ارائه می‌دهد و با هدف تسهیل زندگی روزمره مردم، به‌سرعت به یکی از برندهای محبوب در کشور تبدیل شده است.",
    jobLink: "https://career.snapp.ir/", // لینک فرصت‌های شغلی بعداً اضافه می‌شود
    glowColor: "#00E261", // رنگ سبز اسنپ
  },
];

function SponsorCard({
  sponsor,
  index,
}: {
  sponsor: (typeof sponsors)[0];
  index: number;
}) {
  // تبدیل رنگ hex به rgba برای استفاده در استایل
  const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="flex flex-col items-center text-center p-8 rounded-3xl border border-neutral-200 transition-all duration-300 h-full relative overflow-hidden bg-white"
      style={{
        boxShadow: `0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06), 0 0 0 1px rgba(0, 0, 0, 0.05), 0 0 50px -15px ${hexToRgba(
          sponsor.glowColor,
          0.4
        )}, inset 0 0 80px -30px ${hexToRgba(sponsor.glowColor, 0.15)}`,
      }}
      whileHover={{
        boxShadow: `0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06), 0 0 0 1px rgba(0, 0, 0, 0.05), 0 0 60px -10px ${hexToRgba(
          sponsor.glowColor,
          0.5
        )}, inset 0 0 100px -20px ${hexToRgba(sponsor.glowColor, 0.2)}`,
      }}
    >
      {/* Background gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(to bottom, ${hexToRgba(
            sponsor.glowColor,
            0.08
          )}, ${hexToRgba(sponsor.glowColor, 0.04)}, transparent)`,
        }}
      />

      {/* Content wrapper */}
      <div className="relative z-10 flex flex-col items-center text-center w-full h-full">
        {/* Logo */}
        <motion.div
          className="mb-6 relative w-48 h-32 flex items-center justify-center"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <Image
            src={sponsor.logo}
            alt={`لوگوی ${sponsor.name}`}
            width={200}
            height={120}
            className="object-contain max-w-full max-h-full"
          />
        </motion.div>

        {/* Name */}
        <h2 className="text-2xl font-bold text-foreground mb-4">
          {sponsor.name}
        </h2>

        {/* Description */}
        <p className="text-neutral-600 leading-relaxed mb-6 flex-grow text-base">
          {sponsor.description}
        </p>

        {/* Job Opportunities Button */}
        <motion.a
          href={sponsor.jobLink}
          className="btn btn-primary btn-md w-full max-w-xs"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          فرصت‌های شغلی
        </motion.a>
      </div>
    </motion.div>
  );
}

export default function SponsorsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="">
        <section className="container-custom py-16 lg:py-24">
          {/* Header */}
          <motion.header
            className="mb-12 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-5xl font-potk text-foreground mb-4">
              معرفی حامیان رویداد
            </h1>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              با تشکر از حامیان گرامی که در برگزاری این رویداد ما را همراهی
              می‌کنند
            </p>
          </motion.header>

          {/* Sponsors Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {sponsors.map((sponsor, index) => (
              <SponsorCard key={sponsor.id} sponsor={sponsor} index={index} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
