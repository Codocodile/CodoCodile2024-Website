"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/Header";

export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { requestPasswordReset } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setIsLoading(true);

    try {
      await requestPasswordReset(email);
      setSuccess(true);
      setTimeout(() => {
        router.push("/");
      }, 3000);
    } catch (error: any) {
      setError(
        error.response?.data?.detail ||
          error.response?.data?.errors?.[0]?.detail ||
          "خطا در ارسال ایمیل. لطفاً دوباره تلاش کنید."
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
              بازیابی رمز عبور
            </h2>
            <p className="mt-2 text-sm text-neutral-600">
              ایمیل خود را وارد کنید تا لینک بازیابی رمز عبور برای شما ارسال شود
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
                لینک بازیابی رمز عبور به ایمیل شما ارسال شد. لطفاً صندوق ورودی
                ایمیل خود را بررسی کنید.
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input"
                  placeholder="ایمیل خود را وارد کنید"
                />
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading || success}
                  className="btn btn-primary btn-lg w-full"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2 rtl:ml-2"></div>
                      در حال ارسال...
                    </div>
                  ) : (
                    "ارسال لینک بازیابی"
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
