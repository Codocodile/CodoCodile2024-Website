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

          {/* Form */}
          <div className="card p-8">
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information Section */}
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

              {/* Educational Information Section */}
              <div className="space-y-6 pt-6 border-t border-neutral-200">
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

                <div className="grid md:grid-cols-2 gap-6">
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
                      <option value="J">Junior - دانش‌آموز‌ها</option>
                      <option value="S">Senior - دانشجو‌ها</option>
                      <option value="P">Pro - المپیادی‌ها</option>
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

              {/* Terms and Conditions */}
              <div className="pt-6 border-t border-neutral-200">
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
                    <span>
                      قوانین و مقررات مسابقه را مطالعه کرده و می‌پذیرم
                    </span>{" "}
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

              {/* Submit Button */}
              <div className="flex justify-end pt-6">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn btn-primary btn-md w-full md:w-auto"
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
