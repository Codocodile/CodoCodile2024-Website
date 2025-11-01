"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Dashboard() {
  const { user, isLoading, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/sign-in");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-neutral-600">در حال بارگذاری...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex-1 flex flex-col bg-gradient-hero">
      <Header />

      <main className="flex-1 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Welcome Section */}
          <div className="text-center mb-12 mt-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              خوش آمدید، {user?.first_name_persian} {user?.last_name_persian}
            </h1>
            <p className="text-xl text-neutral-600">
              به پنل کاربری کدوکدیل خوش آمدید
            </p>
          </div>

          {/* Status Cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="card p-6 text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📋</span>
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">
                وضعیت ثبت‌نام
              </h3>
              <p
                className={`text-sm font-medium ${
                  user?.is_confirmed ? "text-green-600" : "text-orange-600"
                }`}
              >
                {user?.is_confirmed ? "تایید شده" : "در انتظار تایید"}
              </p>
            </div>

            <div className="card p-6 text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏆</span>
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">سطح</h3>
              <p className="text-sm text-neutral-600">
                {user?.status === "J"
                  ? "Junior"
                  : user?.status === "S"
                  ? "Senior"
                  : "Pro"}
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-1 gap-6">
            <div className="card p-8">
              <h3 className="text-xl font-bold text-foreground mb-4">
                اقدامات سریع
              </h3>
              <div className="space-y-4">
                <a
                  href="/dashboard/team"
                  className="btn btn-primary btn-md w-full block text-center"
                >
                  مدیریت تیم
                </a>
                <a
                  href="/profile"
                  className="btn btn-outline btn-md w-full block text-center"
                >
                  ویرایش پروفایل
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
