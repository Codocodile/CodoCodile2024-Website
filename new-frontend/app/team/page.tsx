"use client";

import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type SpecialRole = "دبیر" | "نایب دبیر" | null;

type Member = {
  id: string;
  fullName: string;
  team: string;
  role?: string; // نقش
  isHead: boolean; // هد تیم
  specialRole: SpecialRole; // دبیر | نایب دبیر | null
  avatarUrl?: string;
};

// نمونه داده اولیه (بعدا می‌توان از API پر کرد)
const members: Member[] = [
  {
    id: "1",
    fullName: "علی مقدسی",
    team: "",
    role: "دبیر",
    isHead: false,
    specialRole: "دبیر",
    avatarUrl: "/staff-pics/ali-moghadasi.jpg",
  },
  {
    id: "2",
    fullName: "پارسا فرج‌پور",
    team: "",
    role: "نایب دبیر",
    isHead: false,
    specialRole: "نایب دبیر",
    avatarUrl: "/staff-pics/parsa-farajpour.jpg",
  },
  {
    id: "3",
    fullName: "کیمیا قدیر",
    team: "اجرایی",
    isHead: false,
    specialRole: null,
    avatarUrl: "/staff-pics/kimia-ghadir.jpg",
  },
  {
    id: "4",
    fullName: "آیین کریمیان",
    team: "اسپانسرشیپ",
    isHead: false,
    specialRole: null,
    avatarUrl: "/staff-pics/aeen-karimian.jpg",
  },
  {
    id: "5",
    fullName: "علیرضا رحیمی",
    team: "علمی",
    isHead: true,
    specialRole: null,
    avatarUrl: "/staff-pics/alireza-rahimi.jpg",
  },
  {
    id: "6",
    fullName: "امیرحسین ملک",
    team: "مدیا",
    isHead: false,
    specialRole: null,
    avatarUrl: "/staff-pics/amir-hossein-maleck.jpg",
  },
  {
    id: "7",
    fullName: "امیر وحیدی‌تبار",
    team: "علمی",
    isHead: false,
    specialRole: null,
    avatarUrl: "/staff-pics/amir-vahidi-tabar.jpg",
  },
  {
    id: "8",
    fullName: "امیرحسین فرخنده‌فر",
    team: "علمی",
    isHead: false,
    specialRole: null,
    avatarUrl: "/staff-pics/amirhosein-farkhondehfar.jpg",
  },
  {
    id: "9",
    fullName: "آرش اکبری",
    team: "اجرایی",
    isHead: false,
    specialRole: null,
    avatarUrl: "/staff-pics/arash-akbari.jpg",
  },
  {
    id: "10",
    fullName: "ارقوان تاجیک",
    team: "اجرایی",
    isHead: false,
    specialRole: null,
    avatarUrl: "/staff-pics/arqavan-tajik.jpg",
  },
  {
    id: "11",
    fullName: "آریانا زال‌نژاد",
    team: "اسپانسرشیپ",
    isHead: false,
    specialRole: null,
    avatarUrl: "/staff-pics/aryana-zalnejad.jpg",
  },
  {
    id: "12",
    fullName: "بهار برقبانی",
    team: "اسپانسرشیپ",
    isHead: true,
    specialRole: null,
    avatarUrl: "/staff-pics/bahar-barghbani.jpg",
  },
  {
    id: "13",
    fullName: "فراز تهرانی",
    team: "اجرایی",
    isHead: false,
    specialRole: null,
    avatarUrl: "/staff-pics/faraz-tehrani.jpg",
  },
  {
    id: "14",
    fullName: "فواد خیرآبادی",
    team: "اجرایی",
    isHead: false,
    specialRole: null,
    avatarUrl: "/staff-pics/foad-kheirabady.jpg",
  },
  {
    id: "15",
    fullName: "هادی عمادی",
    team: "اجرایی",
    isHead: false,
    specialRole: null,
    avatarUrl: "/staff-pics/hadi-emadi.jpg",
  },
  {
    id: "16",
    fullName: "حامد علینژاد",
    team: "اجرایی",
    isHead: false,
    specialRole: null,
    avatarUrl: "/staff-pics/hamed-alinezhad.jpg",
  },
  {
    id: "17",
    fullName: "حسین خوانسری",
    team: "مدیا",
    isHead: true,
    specialRole: null,
    avatarUrl: "/staff-pics/hosein-khansari.jpg",
  },
  {
    id: "18",
    fullName: "حسنا شاه حیدری",
    team: "اجرایی",
    isHead: false,
    specialRole: null,
    avatarUrl: "/staff-pics/hosna-shah-heidari.jpg",
  },
  {
    id: "19",
    fullName: "ایلیا سردار",
    team: "علمی",
    isHead: false,
    specialRole: null,
    avatarUrl: "/staff-pics/Ilia-sardar.jpg",
  },
  {
    id: "20",
    fullName: "خورشید باهوش",
    team: "اسپانسرشیپ",
    isHead: false,
    specialRole: null,
    avatarUrl: "/staff-pics/khorshid-bahoosh.jpg",
  },
  {
    id: "21",
    fullName: "کیارش صانعی",
    team: "اجرایی",
    isHead: true,
    specialRole: null,
    avatarUrl: "/staff-pics/kiarash-sanei.jpg",
  },
  {
    id: "22",
    fullName: "مائده حیدری",
    team: "فنی",
    isHead: false,
    specialRole: null,
    avatarUrl: "/staff-pics/maedeh-heidari.jpg",
  },
  {
    id: "23",
    fullName: "مهدی آبوطالبی",
    team: "اجرایی",
    isHead: false,
    specialRole: null,
    avatarUrl: "/staff-pics/mahdi-abootalebi.jpg",
  },
  {
    id: "24",
    fullName: "مهدیار مستشار",
    team: "اسپانسرشیپ",
    isHead: false,
    specialRole: null,
    avatarUrl: "/staff-pics/mahdyar-mostashar.jpg",
  },
  {
    id: "25",
    fullName: "محمدحسین سورانی",
    team: "مدیا",
    isHead: false,
    specialRole: null,
    avatarUrl: "/staff-pics/mohammad-hossein-surani.jpg",
  },
  {
    id: "26",
    fullName: "محسن صالح",
    team: "اجرایی",
    isHead: false,
    specialRole: null,
    avatarUrl: "/staff-pics/mohsen-salah.jpg",
  },
  {
    id: "27",
    fullName: "مشتاق معتضدیان",
    team: "اجرایی",
    isHead: false,
    specialRole: null,
    avatarUrl: "/staff-pics/moshtagh-motazedian.jpg",
  },
  {
    id: "28",
    fullName: "نازنین غفاری",
    team: "مدیا",
    isHead: false,
    specialRole: null,
    avatarUrl: "/staff-pics/nazanin-ghaffari.jpg",
  },
  {
    id: "29",
    fullName: "پریسا جلالی",
    team: "مدیا",
    isHead: false,
    specialRole: null,
    avatarUrl: "/staff-pics/parisa-jalali.jpg",
  },
  {
    id: "30",
    fullName: "پارسا عدل‌پروار",
    team: "علمی",
    isHead: false,
    specialRole: null,
    avatarUrl: "/staff-pics/parsa-adlparvar.jpg",
  },
  {
    id: "31",
    fullName: "پارسا حاجی‌قاسمی",
    team: "فنی",
    isHead: true,
    specialRole: null,
    avatarUrl: "/staff-pics/parsa-hajighasemi.jpg",
  },
  {
    id: "32",
    fullName: "پارسا ملکیان",
    team: "مدیا",
    isHead: false,
    specialRole: null,
    avatarUrl: "/staff-pics/parsa-malekian.jpg",
  },
  {
    id: "33",
    fullName: "رادین جریره",
    team: "اسپانسرشیپ",
    isHead: false,
    specialRole: null,
    avatarUrl: "/staff-pics/radin-jarireh.jpg",
  },
  {
    id: "34",
    fullName: "رایا جنت‌آبادی",
    team: "اسپانسرشیپ",
    isHead: false,
    specialRole: null,
    avatarUrl: "/staff-pics/raya-jannat.jpg",
  },
  {
    id: "35",
    fullName: "سارا قضاوی",
    team: "مالی",
    isHead: true,
    specialRole: null,
    avatarUrl: "/staff-pics/sara-ghazavi.jpg",
  },
  {
    id: "36",
    fullName: "سپهر رمضانی",
    team: "علمی",
    isHead: false,
    specialRole: null,
    avatarUrl: "/staff-pics/sepehr-ramezani.jpg",
  },
  {
    id: "37",
    fullName: "سبحان آقاسی‌زاده",
    team: "مدیا",
    isHead: false,
    specialRole: null,
    avatarUrl: "/staff-pics/sobhan-aghasi.jpg",
  },
  {
    id: "38",
    fullName: "سهیل محمدخانی",
    team: "علمی",
    isHead: false,
    specialRole: null,
    avatarUrl: "/staff-pics/soheil-mohammadkhani.jpg",
  },
  {
    id: "39",
    fullName: "سروش داوران",
    team: "اجرایی",
    isHead: false,
    specialRole: null,
    avatarUrl: "/staff-pics/soroosh-davaran.jpg",
  },
  {
    id: "40",
    fullName: "سروش حامدی‌فر",
    team: "اجرایی",
    isHead: false,
    specialRole: null,
    avatarUrl: "/staff-pics/soroosh-hamedifar.jpg",
  },
  {
    id: "41",
    fullName: "یاسمن کاویان‌پور",
    team: "اسپانسرشیپ",
    isHead: false,
    specialRole: null,
    avatarUrl: "/staff-pics/yasaman-kavianpour.jpg",
  },
  {
    id: "42",
    fullName: "زهرا قصابی",
    team: "سوشال",
    isHead: true,
    specialRole: null,
    avatarUrl: "/staff-pics/zahra-ghassabi.jpg",
  },
  {
    id: "43",
    fullName: "پارسا علی‌زاده",
    team: "علمی",
    isHead: false,
    specialRole: null,
    avatarUrl: "/staff-pics/parsa-alizadeh.jpg",
  },
  {
    id: "44",
    fullName: "امیرمحمد شاه‌رضایی",
    team: "علمی",
    isHead: false,
    specialRole: null,
    avatarUrl: "/staff-pics/amir-mohammad-shah-rezai.jpg",
  },
  {
    id: "45",
    fullName: "سپهر کاردل",
    team: "سوشال",
    isHead: false,
    specialRole: null,
    avatarUrl: "/staff-pics/sepehr-kardel.jpg",
  },
  {
    id: "46",
    fullName: "علیرضا صمیمی",
    team: "فنی",
    isHead: false,
    specialRole: null,
    avatarUrl: "/staff-pics/alireza-samimi.jpg",
  },
  {
    id: "47",
    fullName: "علی صفر",
    team: "علمی",
    isHead: false,
    specialRole: null,
    avatarUrl: "/staff-pics/ali-safar.jpg",
  },
  {
    id: "48",
    fullName: "رایان حدیدی",
    team: "اجرایی",
    isHead: false,
    specialRole: null,
    avatarUrl: "/staff-pics/rayan-hadidi.jpg",
  },
];

function classNames(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function RoleBadge({
  specialRole,
  isHead,
}: {
  specialRole: SpecialRole;
  isHead: boolean;
}) {
  if (specialRole === "دبیر") {
    return (
      <span className="inline-flex items-center rounded-full bg-primary-600 text-white px-3 py-1 text-xs font-semibold shadow-sm">
        دبیر
      </span>
    );
  }
  if (specialRole === "نایب دبیر") {
    return (
      <span className="inline-flex items-center rounded-full bg-primary-500/10 text-primary-700 px-3 py-1 text-xs font-semibold border border-primary-500/30">
        نایب دبیر
      </span>
    );
  }
  if (isHead) {
    return (
      <span className="inline-flex items-center rounded-full bg-accent-100 text-accent-800 px-2.5 py-1 text-xs font-medium border border-accent-200">
        هد تیم
      </span>
    );
  }
  return null;
}

function Avatar({
  member,
  size = "md",
}: {
  member: Member;
  size: "md" | "lg";
}) {
  const base = size === "lg" ? "size-40" : "size-24";
  const isSecretary = member.specialRole === "دبیر";
  const isDeputy = member.specialRole === "نایب دبیر";
  const isHead = member.isHead && !isSecretary && !isDeputy;

  // Use member's avatarUrl if available, otherwise fallback to default
  const imageSrc = member.avatarUrl || "/staff-pics/ali-moghadasi.jpg";

  return (
    <div
      className={classNames(
        "shrink-0 rounded-2xl overflow-hidden",
        base,
        isSecretary && "ring-4 ring-primary-600",
        isDeputy && "ring-4 ring-primary-500",
        isHead && "ring-2 ring-accent-400",
        !isSecretary && !isDeputy && !isHead && "ring-2 ring-primary-400"
      )}
    >
      <img
        src={imageSrc}
        alt={member.fullName}
        className="w-full h-full object-cover"
        onError={(e) => {
          // Fallback to initials if image fails to load
          const target = e.target as HTMLImageElement;
          target.style.display = "none";
          const parent = target.parentElement;
          if (parent) {
            parent.innerHTML = `<div class="w-full h-full flex items-center justify-center text-white font-bold ${
              size === "lg" ? "text-2xl" : "text-base"
            } ${
              isSecretary
                ? "bg-primary-600"
                : isDeputy
                ? "bg-primary-500"
                : isHead
                ? "bg-accent-400 text-accent-950"
                : "bg-primary-400"
            }">${member.fullName[0]}</div>`;
          }
        }}
      />
    </div>
  );
}

function TeamCard({ member }: { member: Member }) {
  const isSecretary = member.specialRole === "دبیر";
  const isDeputy = member.specialRole === "نایب دبیر";
  const isHead = member.isHead && !isSecretary && !isDeputy;

  return (
    <div
      className={classNames(
        "group relative rounded-2xl p-6 transition-shadow duration-200 border",
        "bg-white/80 backdrop-blur-md",
        isSecretary &&
          "border-primary-600 shadow-[0_8px_30px_rgba(50,129,77,0.25)]",
        isDeputy &&
          "border-primary-400/60 shadow-[0_8px_30px_rgba(50,129,77,0.15)]",
        isHead && "border-accent-200 shadow-sm",
        !isSecretary && !isDeputy && !isHead && "border-neutral-200 shadow-sm"
      )}
    >
      <div className="flex flex-col items-center text-center gap-4">
        <Avatar member={member} size="lg" />
        <div className="w-full">
          <div className="flex items-center justify-center gap-3">
            <h3 className="text-lg font-bold text-foreground truncate max-w-[16rem]">
              {member.fullName}
            </h3>
            <RoleBadge
              specialRole={member.specialRole}
              isHead={member.isHead}
            />
          </div>
          <div className="mt-1 text-sm text-neutral-600">
            {member.role && (
              <span className="font-medium text-neutral-800">نقش: </span>
            )}
            {member.role}
          </div>
          {/* <div className="mt-1 text-sm text-neutral-600">
            <span className="font-medium text-neutral-800">تیم: </span>
            {member.team || "—"}
          </div> */}
        </div>
      </div>
    </div>
  );
}

function FeaturedCard({ member, label }: { member: Member; label: string }) {
  return (
    <div className="rounded-3xl p-6 border border-primary-500/30 bg-white shadow-[0_12px_40px_rgba(50,129,77,0.18)]">
      <div className="flex flex-col items-center text-center">
        <Avatar member={member} size="lg" />
        <div className="mt-4 flex items-center gap-2">
          <h3 className="text-xl sm:text-2xl font-extrabold text-foreground">
            {member.fullName}
          </h3>
          <span className="inline-flex items-center rounded-full bg-primary-600 text-white px-3 py-1 text-xs font-semibold">
            {label}
          </span>
        </div>
        <div className="mt-2 text-sm text-neutral-600">
          <span className="font-medium text-neutral-800">نقش: </span>
          {member.role}
        </div>
      </div>
    </div>
  );
}

export default function TeamPage() {
  // تفکیک دبیر و نایب دبیر
  const secretary = members.find((m) => m.specialRole === "دبیر") || null;
  const deputy = members.find((m) => m.specialRole === "نایب دبیر") || null;
  const others = members.filter((m) => m.specialRole === null);

  // گروه‌بندی بر اساس تیم
  const teams = others.reduce<Record<string, Member[]>>((acc, m) => {
    acc[m.team] = acc[m.team] || [];
    acc[m.team].push(m);
    return acc;
  }, {});

  // در هر تیم، اول هد و بعد بقیه
  const sortTeam = (arr: Member[]) => {
    const head = arr.find((m) => m.isHead);
    const rest = arr.filter((m) => !m.isHead);
    return head ? [head, ...rest] : rest;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16 lg:pt-20">
        <section className="container-custom py-16">
          <header className="mb-10">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground">
              تیم برگزارکننده
            </h1>
            <p className="mt-3 text-neutral-600">
              اعضای تیم‌های مختلف کدوکدیل به همراه نقش‌ها. دبیر و نایب دبیر به
              صورت ویژه نمایش داده شده‌اند.
            </p>
          </header>

          {/* ویژه: دبیر و نایب دبیر */}
          {(secretary || deputy) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
              {secretary && <FeaturedCard member={secretary} label="دبیر" />}
              {deputy && <FeaturedCard member={deputy} label="نایب دبیر" />}
            </div>
          )}

          {/* تیم‌ها */}
          <div className="space-y-12">
            {Object.entries(teams).map(([teamName, teamMembers]) => {
              const ordered = sortTeam(teamMembers);
              const head = ordered[0]?.isHead ? ordered[0] : null;
              const rest = head ? ordered.slice(1) : ordered;
              return (
                <section
                  key={teamName}
                  className="border border-neutral-200 rounded-3xl p-6 bg-white/60 backdrop-blur-sm"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl sm:text-2xl font-extrabold text-foreground">
                      تیم {teamName}
                    </h2>
                  </div>
                  {/* هد تیم */}
                  {head && (
                    <div className="mb-6">
                      <TeamCard member={head} />
                    </div>
                  )}
                  {/* سایر اعضا */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {rest.map((m) => (
                      <TeamCard key={m.id} member={m} />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
