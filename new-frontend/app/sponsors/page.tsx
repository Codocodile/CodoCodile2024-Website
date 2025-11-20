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
      "پس از دوازده سال فعالیت دیوار، حالا ما بخشی از زندگی مردم خوب ایران شده‌ایم، آنگونه که حتی در زبان فارسی هم معنای تازه‌ای به واژه‌ٔ «دیوار» داده‌ایم و دیگر کسی از شنیدن «در دیوار بودن» تعجب نمی‌کند. حالا خیلی از ایرانی‌ها وقت خرید و فروش ملک، خودرو یا خدمات در دیوارند و اولین گزینه‌یشان برای پیدا کردن کالاهای دست دوم و نو، دیوار است. حتی در استخدام هم دیوار مهم‌ترین مرجع است و وقت پیدا کردن کار یا کارجو، اغلب ایرانی‌ها در دیوارند. برای آنکه در ذهن مخاطبان و کاربرانمان ظاهری پیوسته‌تر و متناسب‌تر داشته باشیم، همچنین، پویاتر و کاراتر از همیشه پیش برویم، هویت کلامی و بصری برند دیوار را تدوین کرده‌ایم.",
    jobLink: "https://careers.divar.ir/positions", // لینک فرصت‌های شغلی بعداً اضافه می‌شود
    glowColor: "#a62426", // رنگ قرمز تیره دیوار
  },
  {
    id: 2,
    name: "جاباما",
    logo: "/Jabama-Logo.svg",
    description:
      "اگر قصد سفر دارید و به دنبال تجربه شایسته سفر هستید، یافتن اقامتگاهی مناسب از نخستین اقدامات شما باید باشد. جاباما، معتبرترین سامانه رزرو و اجاره اقامتگاه است. در سفرهای داخلی و خارجی، جاباما انتخاب‌های متنوعی را در اختیارتان می‌گذارد. اطلاعات درباره شرایط اقامتگاه، موقعیت مکانی، عکس‌هایی واضح و هزینه اقامت، داده‌هایی است که در جاباما در اختیار شما گذاشته می‌شود تا انتخاب آگاهانه‌ای داشته باشید. علاوه بر این، پوشش سراسری اقامتگاه‌ها در ایران، به شما کمک می‌کند تا با تنوع قابل‌توجهی از اقامتگاه روبه‌رو شوید.",
    jobLink: "https://careers.jabama.com/", // لینک فرصت‌های شغلی بعداً اضافه می‌شود
    glowColor: "#ffa41b", // رنگ نارنجی جاباما
  },
  {
    id: 3,
    name: "اسنپ",
    logo: "/Snapp-Logo-Farsi.svg",
    description:
      "شرکت ایده گزین ارتباطات روماک، با نام تجاری اسنپ، در سال ۱۳۹۳ راه‌اندازی شد. اسنپ شرکتی پویا و مبتنی بر داده است که از ذهن پویا و خلاق جوانان ایران قدرت می‌گیرد. این شرکت به عنوان راهکاری اثربخش برای انجام سفرهای درون شهری، فعالیت خود را با یک تیم کوچک آغاز کرد و در کمتر از چند سال به بزرگ‌ترین سامانه هوشمند حمل‌ونقل در ایران تبدیل شد. دکتر إياد القصار و دکتر محمود فوز هم‌بنیان‌گذاران این شرکت هستند. اپلیکیشن اسنپ بعد از گذشت چهار سال از شروع فعالیتش به سوپراپ تبدیل شد و اکنون خدمات گروه اسنپ در آن ارائه می‌شود. امکان درخواست خودرو، موتور، وانت، سفارش غذا، خدمات پزشکی و مشاوره آنلاین، رزرو هتل و اقامتگاههای ارزان، خرید بلیط هواپیما، اتوبوس و … در این اپلیکیشن جامع به صورت یکجا فراهم است.",
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
        <p className="text-neutral-600 leading-relaxed mb-6 flex-grow text-base text-justify">
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
