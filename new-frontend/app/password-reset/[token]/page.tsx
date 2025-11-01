"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/Header";

export default function PasswordReset() {
  const params = useParams();
  const token = params?.token as string;
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { resetPassword } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      setError("لینک بازیابی رمز عبور معتبر نیست.");
    }
  }, [token]);

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
    setSuccess(false);

    if (formData.password !== formData.confirmPassword) {
      setError("رمز عبور و تایید رمز عبور مطابقت ندارند");
      return;
    }

    if (formData.password.length < 8) {
      setError("رمز عبور باید حداقل ۸ کاراکتر باشد");
      return;
    }

    setIsLoading(true);

    try {
      await resetPassword(formData.email, token, formData.password);
      setSuccess(true);
      setTimeout(() => {
        router.push("/sign-in");
      }, 3000);
    } catch (error: any) {
      setError(
        error.response?.data?.detail ||
          error.response?.data?.errors?.[0]?.detail ||
          "خطا در تغییر رمز عبور. لطفاً دوباره تلاش کنید."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-gradient-hero">
      <Header />
      <div className="flex-1 pt-16 lg:pt-20 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-foreground">
              تغییر رمز عبور
            </h2>
            <p className="mt-2 text-sm text-neutral-600">
              رمز عبور جدید خود را وارد کنید
            </p>
          </div>

          <div className="card p-8">
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                {error}
              </div>
            )}

            {success && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm">
                رمز عبور شما با موفقیت تغییر یافت. در حال انتقال به صفحه ورود...
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
                  رمز عبور جدید
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
                    placeholder="رمز عبور جدید خود را وارد کنید"
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
                  تایید رمز عبور جدید
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
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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

              <div>
                <button
                  type="submit"
                  disabled={isLoading || success || !token}
                  className="btn btn-primary btn-lg w-full"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2 rtl:ml-2"></div>
                      در حال تغییر...
                    </div>
                  ) : (
                    "تغییر رمز عبور"
                  )}
                </button>
              </div>
            </form>

            <div className="mt-6 text-center">
              <Link
                href="/sign-in"
                className="text-sm font-medium text-primary-600 hover:text-primary-500"
              >
                بازگشت به صفحه ورود
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
