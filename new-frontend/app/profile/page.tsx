"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { challengerAPI } from "@/lib/api";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

export default function Profile() {
  const {
    user,
    isLoading: authLoading,
    isAuthenticated,
    updateProfile,
    requestConfirmationCode,
  } = useAuth();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    first_name_persian: "",
    last_name_persian: "",
    email: "",
    phone_number: "",
    status: "J" as "J" | "S" | "P",
    gender: "M" as "M" | "F",
    bio: "",
    university: "",
    national_code: "",
  });

  const [confirmationCode, setConfirmationCode] = useState("");
  const [showVerification, setShowVerification] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [cvUploaded, setCvUploaded] = useState(false);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/sign-in");
    }
  }, [authLoading, isAuthenticated, router]);

  useEffect(() => {
    if (user) {
      setFormData({
        first_name: user.user?.first_name || "",
        last_name: user.user?.last_name || "",
        first_name_persian: user.first_name_persian || "",
        last_name_persian: user.last_name_persian || "",
        email: user.user?.email || "",
        phone_number: user.phone_number || "",
        status: user.status || "J",
        gender: user.gender || "M",
        bio: user.bio || "",
        university: user.university || "",
        national_code: user.national_code || "",
      });
      setCvUploaded(!!user.cv_file);
    }
  }, [user]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    if (name === "first_name" || name === "last_name") {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
    setError("");
  };

  const handleRequestVerification = async () => {
    try {
      await requestConfirmationCode();
      setShowVerification(true);
      setError("");
    } catch (error: any) {
      setError(
        error.response?.data?.detail ||
          error.response?.data?.errors?.[0]?.detail ||
          "خطا در ارسال کد تایید"
      );
    }
  };

  const handleVerifyCode = async () => {
    try {
      const { confirmAccount } = await import("@/lib/api").then(
        (m) => m.authAPI
      );
      await confirmAccount(confirmationCode);
      setShowVerification(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      // Reload user data
      window.location.reload();
    } catch (error: any) {
      setError(
        error.response?.data?.detail ||
          error.response?.data?.errors?.[0]?.detail ||
          "کد تایید نادرست است"
      );
    }
  };

  const handleCVUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files.length) return;

    const file = e.target.files[0];
    if (file.type !== "application/pdf") {
      setError("فایل باید PDF باشد");
      return;
    }

    try {
      await challengerAPI.uploadCV(file, formData.phone_number);
      setCvUploaded(true);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error: any) {
      setError(
        error.response?.data?.detail ||
          error.response?.data?.errors?.[0]?.detail ||
          "خطا در آپلود فایل"
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setIsLoading(true);

    try {
      const updateData = {
        user: {
          first_name: formData.first_name,
          last_name: formData.last_name,
        },
        first_name_persian: formData.first_name_persian,
        last_name_persian: formData.last_name_persian,
        status: formData.status,
        gender: formData.gender,
        bio: formData.bio,
        national_code: formData.national_code,
        university: formData.university,
      };

      await updateProfile(updateData);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error: any) {
      setError(
        error.response?.data?.detail ||
          error.response?.data?.errors?.[0]?.detail ||
          "خطا در بروزرسانی پروفایل"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToLinkedIn = () => {
    if (!user?.id) return;
    const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
    const certUrl = encodeURIComponent(
      `${API_URL}/api/get-cert/?user_id=${user.id}`
    );
    const url = `https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=3rd+Codocodile+Contest&organizationId=98884196&issueYear=2025&issueMonth=11`;
    window.open(url, "_blank");
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-neutral-600">در حال بارگذاری...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className="flex-1 flex flex-col bg-gradient-hero">
      <Header />
      <main className="flex-1 pt-16 lg:pt-20 container-custom py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              پروفایل کاربری
            </h1>
            <p className="text-neutral-600">
              اطلاعات شخصی خود را مشاهده و ویرایش کنید
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
                پروفایل با موفقیت بروزرسانی شد!
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    نام (انگلیسی)
                  </label>
                  <input
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleInputChange}
                    className="input"
                    placeholder="نام"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    نام خانوادگی (انگلیسی)
                  </label>
                  <input
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleInputChange}
                    className="input"
                    placeholder="نام خانوادگی"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    نام (فارسی)
                  </label>
                  <input
                    type="text"
                    name="first_name_persian"
                    value={formData.first_name_persian}
                    onChange={handleInputChange}
                    className="input"
                    placeholder="نام فارسی"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    نام خانوادگی (فارسی)
                  </label>
                  <input
                    type="text"
                    name="last_name_persian"
                    value={formData.last_name_persian}
                    onChange={handleInputChange}
                    className="input"
                    placeholder="نام خانوادگی فارسی"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  ایمیل
                </label>
                <div className="flex gap-2">
                  <input
                    type="email"
                    value={formData.email}
                    disabled
                    className="input flex-1"
                  />
                  {!user.is_confirmed && (
                    <button
                      type="button"
                      onClick={handleRequestVerification}
                      className="btn btn-outline"
                    >
                      ارسال کد تایید
                    </button>
                  )}
                </div>
                {showVerification && !user.is_confirmed && (
                  <div className="mt-4 flex gap-2">
                    <input
                      type="text"
                      value={confirmationCode}
                      onChange={(e) => setConfirmationCode(e.target.value)}
                      className="input flex-1"
                      placeholder="کد تایید"
                    />
                    <button
                      type="button"
                      onClick={handleVerifyCode}
                      className="btn btn-primary"
                    >
                      تایید
                    </button>
                  </div>
                )}
                {user.is_confirmed && (
                  <p className="mt-2 text-sm text-green-600">
                    ✓ ایمیل شما تایید شده است
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  شماره تلفن
                </label>
                <input
                  type="tel"
                  value={formData.phone_number}
                  disabled
                  className="input"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  بیوگرافی
                </label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  rows={4}
                  className="input"
                  placeholder="درباره خود بنویسید"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    دانشگاه
                  </label>
                  <input
                    type="text"
                    name="university"
                    value={formData.university}
                    onChange={handleInputChange}
                    className="input"
                    placeholder="نام دانشگاه"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    کد ملی
                  </label>
                  <input
                    type="text"
                    name="national_code"
                    value={formData.national_code}
                    onChange={handleInputChange}
                    className="input"
                    placeholder="کد ملی"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    سطح
                  </label>
                  <select
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
                  <label className="block text-sm font-medium text-foreground mb-2">
                    جنسیت
                  </label>
                  <select
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

              <div className="border-t pt-6 space-y-4">
                <button
                  type="button"
                  onClick={handleAddToLinkedIn}
                  className="btn btn-outline w-full flex items-center justify-center gap-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-linkedin"
                    viewBox="0 0 16 16"
                  >
                    <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
                  </svg>
                  افزودن گواهینامه به LinkedIn
                </button>

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className={`btn btn-outline w-full flex items-center justify-center gap-2 ${
                    cvUploaded ? "text-green-600" : ""
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                    />
                  </svg>
                  {cvUploaded ? "رزومه آپلود شده" : "آپلود رزومه"}
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="application/pdf"
                  onChange={handleCVUpload}
                  className="hidden"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="btn btn-primary btn-lg w-full"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2 rtl:ml-2"></div>
                    در حال بروزرسانی...
                  </div>
                ) : (
                  "ذخیره تغییرات"
                )}
              </button>
            </form>
          </div>

          {/* Dashboard Button */}
          <div className="mt-8">
            <button
              type="button"
              onClick={() => router.push("/dashboard")}
              className="btn btn-primary btn-lg w-full"
            >
              ورود به داشبورد
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
