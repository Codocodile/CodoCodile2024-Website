"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/Header";

export default function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const { login, isLoading } = useAuth();
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

    try {
      await login(formData.email, formData.password);
      router.push("/dashboard");
    } catch (error: any) {
      setError(
        error.response?.data?.detail || "خطا در ورود. لطفاً دوباره تلاش کنید."
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header />
      <div className="pt-16 lg:pt-20 flex items-center justify-center min-h-[calc(100vh-4rem)] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          {/* Form Header */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-foreground">
              ورود به حساب کاربری
            </h2>
            <p className="mt-2 text-sm text-neutral-600">
              یا{" "}
              <Link
                href="/sign-up"
                className="font-medium text-primary-600 hover:text-primary-500"
              >
                حساب جدید ایجاد کنید
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

            <form className="space-y-6" onSubmit={handleSubmit}>
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

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                  />
                  <label
                    htmlFor="remember-me"
                    className="mr-2 rtl:ml-2 block text-sm text-neutral-700"
                  >
                    مرا به خاطر بسپار
                  </label>
                </div>

                <div className="text-sm">
                  <Link
                    href="/forgot-password"
                    className="font-medium text-primary-600 hover:text-primary-500"
                  >
                    رمز عبور را فراموش کرده‌اید؟
                  </Link>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn btn-primary btn-lg w-full"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2 rtl:ml-2"></div>
                      در حال ورود...
                    </div>
                  ) : (
                    "ورود"
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Additional Info */}
          <div className="text-center">
            <p className="text-sm text-neutral-600">
              با ورود به حساب کاربری، شما{" "}
              <Link
                href="/privacy"
                className="text-primary-600 hover:text-primary-500"
              >
                قوانین و مقررات
              </Link>{" "}
              را می‌پذیرید
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
