"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/Header";
import RulesModal from "@/components/RulesModal";

export default function SignUp() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    status: "J" as "J" | "S" | "P",
    gender: "M" as "M" | "F",
    university: "",
    nationalCode: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [isRulesModalOpen, setIsRulesModalOpen] = useState(false);
  const { register, isLoading } = useAuth();
  const router = useRouter();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("رمز عبور و تایید رمز عبور مطابقت ندارند");
      return;
    }

    try {
      const registrationData = {
        user: {
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          password: formData.password,
        },
        first_name_persian: formData.firstName,
        last_name_persian: formData.lastName,
        phone_number: formData.phoneNumber,
        status: formData.status,
        gender: formData.gender,
      };

      await register(registrationData);
      router.push("/sign-in");
    } catch (error: any) {
      setError(
        error.response?.data?.detail ||
          error.response?.data?.errors?.[0]?.detail ||
          "خطا در ثبت‌نام. لطفاً دوباره تلاش کنید."
      );
    }
  };

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const steps = [
    {
      number: 1,
      title: "اطلاعات شخصی",
      description: "نام، ایمیل و شماره تلفن",
    },
    { number: 2, title: "اطلاعات تحصیلی", description: "دانشگاه و سطح تحصیلی" },
    { number: 3, title: "تایید اطلاعات", description: "بررسی و تکمیل ثبت‌نام" },
  ];

  return (
    <div className="flex-1 flex flex-col bg-gradient-hero">
      <Header />
      <div className="flex-1 pt-16 lg:pt-20 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Form Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground">
              ثبت‌نام در مسابقه
            </h2>
            <p className="mt-2 text-sm text-neutral-600">
              یا{" "}
              <Link
                href="/sign-in"
                className="font-medium text-primary-600 hover:text-primary-500"
              >
                وارد حساب کاربری خود شوید
              </Link>
            </p>
          </div>

          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-center space-x-4 rtl:space-x-reverse">
              {steps.map((step, index) => (
                <div key={step.number} className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                      currentStep >= step.number
                        ? "bg-primary-500 text-white"
                        : "bg-neutral-200 text-neutral-600"
                    }`}
                  >
                    {step.number}
                  </div>
                  <div className="mr-4 rtl:ml-4">
                    <div className="text-sm font-medium text-foreground">
                      {step.title}
                    </div>
                    <div className="text-xs text-neutral-600">
                      {step.description}
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`w-16 h-1 rounded-full ${
                        currentStep > step.number
                          ? "bg-primary-500"
                          : "bg-neutral-200"
                      }`}
                    ></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="card p-8">
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Step 1: Personal Information */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-foreground mb-4">
                    اطلاعات شخصی
                  </h3>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="firstName"
                        className="block text-sm font-medium text-foreground mb-2"
                      >
                        نام
                      </label>
                      <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="input"
                        placeholder="نام خود را وارد کنید"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="lastName"
                        className="block text-sm font-medium text-foreground mb-2"
                      >
                        نام خانوادگی
                      </label>
                      <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="input"
                        placeholder="نام خانوادگی خود را وارد کنید"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      ایمیل
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="input"
                      placeholder="ایمیل خود را وارد کنید"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phoneNumber"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      شماره تلفن
                    </label>
                    <input
                      id="phoneNumber"
                      name="phoneNumber"
                      type="tel"
                      required
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      className="input"
                      placeholder="09xxxxxxxxx"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium text-foreground mb-2"
                      >
                        رمز عبور
                      </label>
                      <div className="relative">
                        <input
                          id="password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          required
                          value={formData.password}
                          onChange={handleInputChange}
                          className="input pr-10"
                          placeholder="رمز عبور خود را وارد کنید"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                        >
                          {showPassword ? (
                            <EyeSlashIcon className="w-5 h-5" />
                          ) : (
                            <EyeIcon className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="confirmPassword"
                        className="block text-sm font-medium text-foreground mb-2"
                      >
                        تایید رمز عبور
                      </label>
                      <div className="relative">
                        <input
                          id="confirmPassword"
                          name="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          required
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          className="input pr-10"
                          placeholder="رمز عبور را مجدداً وارد کنید"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                        >
                          {showConfirmPassword ? (
                            <EyeSlashIcon className="w-5 h-5" />
                          ) : (
                            <EyeIcon className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Educational Information */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-foreground mb-4">
                    اطلاعات تحصیلی
                  </h3>

                  <div>
                    <label
                      htmlFor="university"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      دانشگاه
                    </label>
                    <input
                      id="university"
                      name="university"
                      type="text"
                      value={formData.university}
                      onChange={handleInputChange}
                      className="input"
                      placeholder="نام دانشگاه خود را وارد کنید"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="status"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      سطح تحصیلی
                    </label>
                    <select
                      id="status"
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      className="input"
                    >
                      <option value="J">Junior - دانش‌آموز</option>
                      <option value="S">
                        Senior - دانشجوی ترم‌های اول و دوم
                      </option>
                      <option value="P">Pro - دانشجوی ترم‌های بالاتر</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="gender"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      جنسیت
                    </label>
                    <select
                      id="gender"
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      className="input"
                    >
                      <option value="M">مرد</option>
                      <option value="F">زن</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="nationalCode"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      کد ملی (اختیاری)
                    </label>
                    <input
                      id="nationalCode"
                      name="nationalCode"
                      type="text"
                      value={formData.nationalCode}
                      onChange={handleInputChange}
                      className="input"
                      placeholder="کد ملی خود را وارد کنید"
                    />
                  </div>
                </div>
              )}

              {/* Step 3: Confirmation */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-foreground mb-4">
                    تایید اطلاعات
                  </h3>

                  <div className="bg-neutral-50 rounded-xl p-6 space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <span className="text-sm font-medium text-neutral-600">
                          نام:
                        </span>
                        <p className="text-foreground">
                          {formData.firstName} {formData.lastName}
                        </p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-neutral-600">
                          ایمیل:
                        </span>
                        <p className="text-foreground">{formData.email}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-neutral-600">
                          تلفن:
                        </span>
                        <p className="text-foreground">
                          {formData.phoneNumber}
                        </p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-neutral-600">
                          دانشگاه:
                        </span>
                        <p className="text-foreground">
                          {formData.university || "وارد نشده"}
                        </p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-neutral-600">
                          سطح:
                        </span>
                        <p className="text-foreground">
                          {formData.status === "J"
                            ? "Junior"
                            : formData.status === "S"
                            ? "Senior"
                            : "Pro"}
                        </p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-neutral-600">
                          جنسیت:
                        </span>
                        <p className="text-foreground">
                          {formData.gender === "M" ? "مرد" : "زن"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <input
                      id="terms"
                      name="terms"
                      type="checkbox"
                      required
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                    />
                    <label
                      htmlFor="terms"
                      className="mr-2 rtl:ml-2 block text-sm text-neutral-700"
                    >
                      <span>قوانین و مقررات مسابقه را مطالعه کرده و می‌پذیرم</span>
                      {" "}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          setIsRulesModalOpen(true);
                        }}
                        className="text-primary-600 hover:text-primary-700 underline font-medium"
                      >
                        (مطالعه قوانین)
                      </button>
                    </label>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6">
                <button
                  type="button"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className="btn btn-outline btn-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  مرحله قبل
                </button>

                {currentStep < 3 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="btn btn-primary btn-md"
                  >
                    مرحله بعد
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="btn btn-primary btn-md"
                  >
                    {isLoading ? (
                      <div className="flex items-center">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2 rtl:ml-2"></div>
                        در حال ثبت‌نام...
                      </div>
                    ) : (
                      "تکمیل ثبت‌نام"
                    )}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
      <RulesModal
        isOpen={isRulesModalOpen}
        onClose={() => setIsRulesModalOpen(false)}
      />
    </div>
  );
}
