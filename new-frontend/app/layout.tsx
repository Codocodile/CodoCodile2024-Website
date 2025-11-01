import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";

const iranSans = localFont({
  src: [
    {
      path: "../public/fonts/IRANSansXThin.ttf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../public/fonts/IRANSansXUltraLight.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../public/fonts/IRANSansXLight.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/IRANSansXRegular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/IRANSansXMedium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/IRANSansXDemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/IRANSansXBold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/IRANSansXExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../public/fonts/IRANSansXBlack.ttf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-iran-sans",
  display: "swap",
});

const potk = localFont({
  src: [
    {
      path: "../public/fonts/Potk.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-potk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "کدوکدیل 2025 | مسابقه برنامه‌نویسی",
  description:
    "مسابقه‌ی آموزشی کدوکدیل - رقابتی جذاب و فرصت‌ساز برای دانشجویان و دانش‌آموزان علاقه‌مند به برنامه‌نویسی و الگوریتم",
  keywords: [
    "کدوکدیل",
    "مسابقه برنامه‌نویسی",
    "الگوریتم",
    "دانشگاه صنعتی شریف",
    "programming contest",
  ],
  authors: [{ name: "Codocodile Team" }],
  openGraph: {
    title: "کدوکدیل 2025 | مسابقه برنامه‌نویسی",
    description:
      "رقابتی جذاب و فرصت‌ساز برای علاقه‌مندان به برنامه‌نویسی و الگوریتم",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" className="h-full">
      <body
        className={`${iranSans.variable} ${potk.variable} antialiased h-full flex flex-col`}
      >
        <AuthProvider>
          <div className="flex-1 flex flex-col">{children}</div>
        </AuthProvider>
      </body>
    </html>
  );
}
