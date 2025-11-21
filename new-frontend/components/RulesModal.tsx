"use client";

import { Fragment } from "react";
import {
  XMarkIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";

interface Rule {
  id: number;
  title: string;
  icon: typeof CheckCircleIcon;
  content: string[];
  important: boolean;
}

interface RulesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RulesModal = ({ isOpen, onClose }: RulesModalProps) => {
  const rules: Rule[] = [
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
        "سطح Junior: برای دانش‌آموز‌ها",
        "سطح Senior: برای دانشجو‌ها",
        "سطح Pro: برای المپیادی‌ها",
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

  return (
    <AnimatePresence>
      {isOpen && (
        <Fragment>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[200] bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-[201] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-neutral-200">
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <div className="w-10 h-10 rounded-xl bg-primary-100 text-primary-600 flex items-center justify-center">
                    <CheckCircleIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">
                      قوانین و مقررات مسابقه
                    </h2>
                    <p className="text-sm text-neutral-600 mt-1">
                      لطفاً قوانین را به دقت مطالعه کنید
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="w-10 h-10 rounded-xl hover:bg-neutral-100 flex items-center justify-center text-neutral-600 hover:text-neutral-900 transition-colors"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6">
                <div className="space-y-4">
                  {rules.map((rule, index) => (
                    <motion.div
                      key={rule.id}
                      className={`card p-6 ${
                        rule.important
                          ? "border-2 border-red-200 bg-red-50/50"
                          : "border border-neutral-200"
                      }`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <div className="flex items-start space-x-4 rtl:space-x-reverse mb-4">
                        <div
                          className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                            rule.important
                              ? "bg-red-100 text-red-600"
                              : "bg-primary-100 text-primary-600"
                          }`}
                        >
                          <rule.icon className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
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
                      <ul className="space-y-3 pr-16 rtl:pl-16">
                        {rule.content.map((item, itemIndex) => (
                          <li
                            key={itemIndex}
                            className="flex items-start space-x-3 rtl:space-x-reverse"
                          >
                            <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0" />
                            <span className="text-neutral-700 leading-relaxed">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>

                {/* Important Notice */}
                <div className="mt-6 bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-2xl p-6">
                  <div className="flex items-start space-x-4 rtl:space-x-reverse">
                    <ExclamationTriangleIcon className="w-8 h-8 text-red-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xl font-bold text-red-800 mb-3">
                        نکات مهم
                      </h3>
                      <div className="space-y-2 text-red-700">
                        <p>
                          • لطفاً قبل از ثبت‌نام، تمام قوانین را به دقت مطالعه
                          کنید
                        </p>
                        <p>
                          • در صورت عدم رعایت قوانین، امکان حذف از مسابقه وجود
                          دارد
                        </p>
                        <p>• برای سوالات بیشتر، با تیم برگزاری تماس بگیرید</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-neutral-200 bg-neutral-50">
                <button
                  onClick={onClose}
                  className="btn btn-primary btn-lg w-full"
                >
                  مطالعه کردم و می‌پذیرم
                </button>
              </div>
            </motion.div>
          </motion.div>
        </Fragment>
      )}
    </AnimatePresence>
  );
};

export default RulesModal;
