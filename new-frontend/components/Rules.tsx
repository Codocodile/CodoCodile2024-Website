"use client";

import { useState, useEffect, useRef } from "react";
import {
  ChevronDownIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

const Rules = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [openRule, setOpenRule] = useState<number | null>(null);
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

  const rules = [
    {
      id: 1,
      title: "شرایط عمومی شرکت",
      icon: CheckCircleIcon,
      content: [
        "شرکت‌کنندگان باید دانشجو یا دانش‌آموز باشند",
        "حداقل سن شرکت‌کنندگان 16 سال است",
        "هر شرکت‌کننده فقط یک بار می‌تواند ثبت‌نام کند",
        "اطلاعات ارائه شده باید صحیح و کامل باشد",
        "شرکت‌کنندگان باید قوانین مسابقه را بپذیرند",
      ],
      important: false,
    },
    {
      id: 2,
      title: "تشکیل تیم",
      icon: CheckCircleIcon,
      content: [
        "هر تیم حداکثر 2 نفر می‌تواند داشته باشد",
        "تشکیل تیم اختیاری است و می‌توان به صورت انفرادی شرکت کرد",
        "اعضای تیم باید در همان سطح (Junior/Senior/Pro) باشند",
        "تغییر اعضای تیم بعد از شروع مسابقه مجاز نیست",
        "هر فرد فقط می‌تواند عضو یک تیم باشد",
      ],
      important: true,
    },
    {
      id: 3,
      title: "قوانین مسابقه",
      icon: ExclamationTriangleIcon,
      content: [
        "مسابقه 24 ساعت به طول می‌انجامد",
        "استفاده از اینترنت و منابع آموزشی مجاز است",
        "کپی کردن کد از سایر شرکت‌کنندگان ممنوع است",
        "ارسال پاسخ‌ها باید در زمان مقرر انجام شود",
        "در صورت تقلب، شرکت‌کننده از مسابقه حذف می‌شود",
      ],
      important: true,
    },
    {
      id: 4,
      title: "سطح‌بندی مسابقه",
      icon: CheckCircleIcon,
      content: [
        "سطح Junior: برای مبتدیان و دانش‌آموزان",
        "سطح Senior: برای دانشجویان ترم‌های اول و دوم",
        "سطح Pro: برای دانشجویان ترم‌های بالاتر و حرفه‌ای‌ها",
        "انتخاب سطح بر اساس تجربه و مهارت انجام می‌شود",
        "تغییر سطح بعد از ثبت‌نام امکان‌پذیر نیست",
      ],
      important: false,
    },
    {
      id: 5,
      title: "جوایز و امتیازدهی",
      icon: CheckCircleIcon,
      content: [
        "امتیازدهی بر اساس تعداد مسائل حل شده و زمان حل",
        "جوایز نقدی برای سه تیم برتر هر سطح",
        "گواهی شرکت برای تمام شرکت‌کنندگان",
        "امتیاز اضافی برای حل مسائل در زمان کمتر",
        "در صورت تساوی، زمان ارسال ملاک برتری است",
      ],
      important: false,
    },
    {
      id: 6,
      title: "تعهدات شرکت‌کنندگان",
      icon: ExclamationTriangleIcon,
      content: [
        "رعایت اخلاق حرفه‌ای و احترام به سایر شرکت‌کنندگان",
        "عدم استفاده از روش‌های غیرقانونی یا غیراخلاقی",
        "همکاری با تیم برگزاری در صورت نیاز",
        "پذیرش تصمیمات نهایی هیئت داوران",
        "رعایت قوانین و مقررات دانشگاه صنعتی شریف",
      ],
      important: true,
    },
  ];

  const toggleRule = (ruleId: number) => {
    setOpenRule(openRule === ruleId ? null : ruleId);
  };

  return (
    <section ref={sectionRef} id="rules" className="section-padding bg-white">
      <div className="container-custom">
        {/* Section Header */}
        <div
          className={`text-center mb-16 ${
            isVisible ? "animate-fade-in-up" : "opacity-0"
          }`}
        >
          <div className="inline-flex items-center px-4 py-2 bg-primary-100 text-primary-800 rounded-full text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-primary-500 rounded-full mr-2 rtl:ml-2 animate-pulse"></span>
            قوانین و مقررات
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            <span className="text-gradient font-potk">قوانین مسابقه</span>
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
            برای شرکت در مسابقه کدوکدیل، لطفاً قوانین و مقررات زیر را به دقت
            مطالعه کنید
          </p>
        </div>

        {/* Rules List */}
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {rules.map((rule, index) => (
              <div
                key={rule.id}
                className={`card transition-all duration-300 ${
                  openRule === rule.id
                    ? "shadow-medium"
                    : "shadow-soft hover:shadow-medium"
                } ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <button
                  onClick={() => toggleRule(rule.id)}
                  className="w-full p-6 text-right flex items-center justify-between hover:bg-neutral-50 transition-colors duration-200"
                >
                  <div className="flex items-center space-x-4 rtl:space-x-reverse">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        rule.important
                          ? "bg-red-100 text-red-600"
                          : "bg-primary-100 text-primary-600"
                      }`}
                    >
                      <rule.icon className="w-6 h-6" />
                    </div>
                    <div className="text-right">
                      <h3 className="text-xl font-bold text-foreground mb-1">
                        {rule.title}
                      </h3>
                      {rule.important && (
                        <span className="text-sm text-red-600 font-medium">
                          مهم - حتماً مطالعه شود
                        </span>
                      )}
                    </div>
                  </div>
                  <ChevronDownIcon
                    className={`w-6 h-6 text-neutral-400 transition-transform duration-200 ${
                      openRule === rule.id ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Rule Content */}
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openRule === rule.id
                      ? "max-h-96 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-6 pb-6 border-t border-neutral-200">
                    <ul className="space-y-3 pt-4">
                      {rule.content.map((item, itemIndex) => (
                        <li
                          key={itemIndex}
                          className="flex items-start space-x-3 rtl:space-x-reverse"
                        >
                          <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-neutral-700 leading-relaxed">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Important Notice */}
        <div
          className={`mt-16 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
        >
          <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-2xl p-8">
            <div className="flex items-start space-x-4 rtl:space-x-reverse">
              <ExclamationTriangleIcon className="w-8 h-8 text-red-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-red-800 mb-3">
                  نکات مهم
                </h3>
                <div className="space-y-2 text-red-700">
                  <p>
                    • لطفاً قبل از ثبت‌نام، تمام قوانین را به دقت مطالعه کنید
                  </p>
                  <p>
                    • در صورت عدم رعایت قوانین، امکان حذف از مسابقه وجود دارد
                  </p>
                  <p>• برای سوالات بیشتر، با تیم برگزاری تماس بگیرید</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        {/* <div
          className={`text-center mt-16 ${
            isVisible ? "animate-fade-in-up" : "opacity-0"
          }`}
        >
          <div className="bg-gradient-to-r from-primary-500 to-primary-700 rounded-3xl p-8 lg:p-12 text-white">
            <h3 className="text-3xl font-bold mb-4">قوانین را مطالعه کردید؟</h3>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              حالا می‌توانید با اطمینان در مسابقه کدوکدیل ثبت‌نام کنید
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn bg-white text-primary-700 hover:bg-neutral-100 btn-lg">
                ثبت‌نام در مسابقه
              </button>
              <button className="btn border-2 border-white text-white hover:bg-white hover:text-primary-700 btn-lg">
                دانلود قوانین کامل
              </button>
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default Rules;
