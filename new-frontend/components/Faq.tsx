"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

const Faq = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [openId, setOpenId] = useState<number | null>(null);

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

  const faqs = [
    {
      id: 1,
      question: "سطح‌بندی مسابقات به چه صورت است؟",
      answer:
        "مسابقات در سه سطح Junior و Senior و Pro برگزار می‌شود. سطح Junior مخصوص دانش‌آموزان، سطح Senior مخصوص دانشجویان و سطح Pro ویژه‌ی مدال‌آوران المپیاد کامپیوتر و مسابقه‌ی ICPC می‌باشد.",
    },
    {
      id: 2,
      question: "دانشجویان چه رشته‌هایی امکان شرکت در مسابقه را دارند؟",
      answer:
        "دانشجویان رشته‌های مهندسی کامپیوتر، علوم کامپیوتر، مهندسی برق، علوم ریاضی و تمامی دانشجویانی که حداقل به یک زبان برنامه‌نویسی مسلط هستند، می‌توانند در این مسابقه شرکت کنند.",
    },
    {
      id: 3,
      question: "از کدام زبان‌های برنامه‌نویسی می‌توان در مسابقه استفاده کرد؟",
      answer:
        "زبان‌های C، C++، Java و Python توسط سیستم‌ داوری پشتیبانی می‌شوند و شما می‌توانید از آن‌ها استفاده کنید.",
    },
    {
      id: 4,
      question: "قبل از مسابقه کارگاه آموزشی برگزار می‌شود؟",
      answer:
        "بله، قبل از شروع مسابقه کارگاه‌های آموزشی توسط تیم کدوکدیل برگزار برگزار می‌شوند تا مهارت شما را در کدنویسی الگوریتمی افزایش دهند.",
    },
    {
      id: 5,
      question: "مسابقه به صورت مجازی برگزار می‌شود یا حضوری؟",
      answer:
        "مسابقه دو مرحله دارد؛ مرحله‌ی اول آن در تاریخ ۱۱ آبان و به صورت مجازی برگزار می‌شود، سپس تیم‌های برتر مسابقه‌ی مجازی، در تاریخ ۲ آذر به صورت حضوری و در دانشگاه صنعتی شریف به رقابت می‌پردازند.",
    },
    {
      id: 6,
      question: "مسابقه به صورت گروهی برگزار می‌شود یا فردی؟",
      answer: "مسابقه به صورت گروهی و در قالب تیم‌های دو نفره برگزار می‌شود.",
    },
    {
      id: 7,
      question: "در صورت نداشتن هم‌تیمی چطور می‌توانم هم‌تیمی پیدا کنم؟",
      answer:
        "برگزارکنندگان مسابقه، گروهی تلگرامی ویژه شرکت‌کنندگان ایجاد کرده‌اند که از طریق آن می‌توانید هم‌تیمی خود را پیدا کنید.",
    },
    {
      id: 8,
      question: "آیا به تیم‌های برتر جایزه‌ای تعلق خواهد گرفت؟",
      answer:
        "به تیم‌های برتر مسابقه حضوری علاوه بر جوایز نقدی، هدایایی نیز تقدیم خواهد شد.",
    },
  ];

  const toggle = (id: number) => setOpenId((prev) => (prev === id ? null : id));

  // const contactInfo = [
  //   {
  //     icon: EnvelopeIcon,
  //     title: "ایمیل",
  //     value: "info@codocodile.ir",
  //     description: "برای سوالات عمومی و اطلاعات بیشتر",
  //   },
  //   {
  //     icon: PhoneIcon,
  //     title: "تلفن",
  //     value: "021-6616-4000",
  //     description: "پاسخگویی از 9 صبح تا 5 بعدازظهر",
  //   },
  //   {
  //     icon: MapPinIcon,
  //     title: "آدرس",
  //     value: "دانشگاه صنعتی شریف",
  //     description: "تهران، خیابان آزادی، دانشگاه صنعتی شریف",
  //   },
  //   {
  //     icon: ClockIcon,
  //     title: "ساعات کاری",
  //     value: "شنبه تا چهارشنبه",
  //     description: "9:00 صبح تا 17:00 بعدازظهر",
  //   },
  // ];

  const socialLinks = [
    { name: "تلگرام", href: "#", icon: "📱" },
    { name: "اینستاگرام", href: "#", icon: "📷" },
    { name: "لینکدین", href: "#", icon: "💼" },
    { name: "توییتر", href: "#", icon: "🐦" },
  ];

  return (
    <section
      ref={sectionRef}
      id="faq"
      className="section-padding bg-gradient-primary"
    >
      <div className="container-custom">
        {/* Section Header */}
        {/* <div
          className={`text-center mb-16 ${
            isVisible ? "animate-fade-in-up" : "opacity-0"
          }`}
        >
          <div className="inline-flex items-center px-4 py-2 bg-primary-100 text-primary-800 rounded-full text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-primary-500 rounded-full mr-2 rtl:ml-2 animate-pulse"></span>
            تماس با ما
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            در <span className="text-gradient">تماس</span> باشید
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
            سوالی دارید؟ با تیم کدوکدیل در تماس باشید. ما آماده پاسخگویی به شما
            هستیم
          </p>
        </div> */}

        {/* <div className="grid lg:grid-cols-2 gap-12 lg:gap-16"> */}
        {/* Contact Information */}
        {/* <div
            className={`space-y-8 ${
              isVisible ? "animate-fade-in-left" : "opacity-0"
            }`}
          >
            <div>
              <h3 className="text-3xl font-bold text-foreground mb-6">
                اطلاعات تماس
              </h3>
              <p className="text-lg text-neutral-600 leading-relaxed mb-8">
                برای دریافت اطلاعات بیشتر درباره مسابقه کدوکدیل یا پاسخ به
                سوالات خود، می‌توانید از طریق راه‌های زیر با ما در تماس باشید.
              </p>
            </div>

            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <div
                  key={info.title}
                  className="flex items-start space-x-4 rtl:space-x-reverse"
                >
                  <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <info.icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-1">
                      {info.title}
                    </h4>
                    <p className="text-primary-600 font-medium mb-1">
                      {info.value}
                    </p>
                    <p className="text-sm text-neutral-600">
                      {info.description}
                    </p>
                  </div>
                </div>
              ))}
            </div> */}

        {/* Social Links */}
        {/* <div className="pt-8">
              <h4 className="text-xl font-bold text-foreground mb-4">
                شبکه‌های اجتماعی
              </h4>
              <div className="flex space-x-4 rtl:space-x-reverse">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className="w-12 h-12 bg-white rounded-xl flex items-center justify-center hover:bg-primary-50 transition-colors duration-200 shadow-soft hover:shadow-medium"
                  >
                    <span className="text-xl">{social.icon}</span>
                  </a>
                ))}
              </div>
            </div>
          </div> */}

        {/* Contact Form */}
        {/* <div
            className={`${isVisible ? "animate-fade-in-right" : "opacity-0"}`}
          >
            <div className="card p-8">
              <h3 className="text-2xl font-bold text-foreground mb-6">
                ارسال پیام
              </h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      نام و نام خانوادگی
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="input"
                      placeholder="نام خود را وارد کنید"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      ایمیل
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="input"
                      placeholder="ایمیل خود را وارد کنید"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    موضوع
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="input"
                    placeholder="موضوع پیام خود را وارد کنید"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    پیام
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="input resize-none"
                    placeholder="پیام خود را اینجا بنویسید..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary btn-lg w-full"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2 rtl:ml-2"></div>
                      در حال ارسال...
                    </div>
                  ) : (
                    "ارسال پیام"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div> */}

        {/* FAQ Section */}
        <div
          className={`mt-20 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
        >
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-foreground mb-2">
              سوالات متداول
            </h3>
            <p className="text-lg text-neutral-600">
              پاسخ سوالات رایج درباره مسابقه کدوکدیل
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((item) => (
              <div
                key={item.id}
                className="border border-neutral-200 rounded-2xl bg-white/90 backdrop-blur-sm"
              >
                <button
                  type="button"
                  onClick={() => toggle(item.id)}
                  className="w-full flex items-center justify-between gap-4 px-4 sm:px-6 py-4 text-right"
                  aria-expanded={openId === item.id}
                >
                  <span className="text-sm sm:text-base font-semibold text-foreground">
                    {item.question}
                  </span>
                  <ChevronDownIcon
                    className={`w-5 h-5 text-neutral-500 transition-transform duration-200 ${
                      openId === item.id ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`px-4 sm:px-6 overflow-hidden transition-all duration-200 ${
                    openId === item.id ? "max-h-64 pb-4" : "max-h-0"
                  }`}
                >
                  <p className="text-sm sm:text-base text-neutral-700 leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faq;
